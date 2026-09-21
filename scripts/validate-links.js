#!/usr/bin/env node

/**
 * 链接有效性验证工具
 * 用于验证新闻条目中的链接是否有效
 *
 * 用法：
 *   node scripts/validate-links.js              # 全量验证
 *   node scripts/validate-links.js --limit 20   # 只验证前 20 条（冒烟测试）
 *   node scripts/validate-links.js --only 2026-09
 *   node scripts/validate-links.js --concurrency 8
 *   node scripts/validate-links.js --update-baseline   # 重算基线（有脑合并，见 mergeBaseline）
 *
 * 覆盖数据源（新增新闻位置变更时请同步维护 SCAN_TARGETS）：
 *   - src/data/news/*.ts       主新闻流
 *   - src/pages/Enforcement.tsx 执法动态
 *   - src/pages/DPAs.tsx        各国监管局
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

// 需要扫描的文件（glob 目录 + 单文件）
const SCAN_TARGETS = [
  { type: 'dir', target: path.join(ROOT, 'src/data/news'), filter: (f) => f.endsWith('.ts') && f !== 'index.ts' },
  { type: 'file', target: path.join(ROOT, 'src/pages/Enforcement.tsx') },
  { type: 'file', target: path.join(ROOT, 'src/pages/DPAs.tsx') },
];

// 配置
const CONFIG = {
  timeout: 12000,
  maxRedirects: 5,
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
  retries: 2,
  retryDelay: 2000,
  concurrency: 6,
  delayMs: 300,
};

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// ---------- CLI 参数 ----------
function parseArgs(argv) {
  const opts = { limit: Infinity, only: null, concurrency: CONFIG.concurrency, updateBaseline: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--limit') opts.limit = parseInt(argv[++i], 10);
    else if (a === '--only') opts.only = argv[++i];
    else if (a === '--concurrency') opts.concurrency = parseInt(argv[++i], 10);
    else if (a === '--update-baseline') opts.updateBaseline = true;
  }
  return opts;
}

// ---------- 已知失效链接基线（技术债看板） ----------
// 历史遗留的失效链接登记在这里，验证时不再阻断提交，但会在报告中单独列出。
// 任何「不在基线内」的新失效链接都会导致退出码 1 —— 基线只能缩小，不能扩大。
const BASELINE_PATH = path.join(__dirname, 'link-baseline.json');

function loadBaseline() {
  if (!fs.existsSync(BASELINE_PATH)) return { knownBroken: [] };
  try {
    return JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf-8'));
  } catch {
    log('yellow', '⚠️  link-baseline.json 解析失败，按空基线处理');
    return { knownBroken: [] };
  }
}

function saveBaseline(invalid) {
  const data = {
    _comment:
      '已知失效链接基线。仅用于隔离历史技术债：新增的失效链接不在其中，会导致 validate-links.js 退出码 1。修好一条请删一条。',
    updatedAt: new Date().toISOString(),
    count: invalid.length,
    knownBroken: invalid.map((it) => ({
      url: it.link,
      ids: it.ids,
      files: it.files,
      reason: it.message,
    })),
  };
  fs.writeFileSync(BASELINE_PATH, JSON.stringify(data, null, 2) + '\n');
  log('cyan', `\n📝 基线已更新: ${BASELINE_PATH}（${invalid.length} 条）\n`);
}

/**
 * 合并新旧基线，保证基线单调（只可能因「实测已修好」而缩小）。
 *  - 本轮判定为失效的链接        → 写入
 *  - 旧基线中本轮实测 2xx 的链接 → 剔除（真修好了）
 *  - 旧基线中本轮疑似/超时/未覆盖 → 保留（结论未知，不能丢）
 */
function mergeBaseline(invalid, baseline, validUrls) {
  const merged = [];
  const seen = new Set();
  for (const it of invalid) {
    merged.push({ link: it.link, ids: it.ids, files: it.files, message: it.message });
    seen.add(it.link);
  }
  for (const b of baseline.knownBroken || []) {
    if (seen.has(b.url) || validUrls.has(b.url)) continue;
    merged.push({ link: b.url, ids: b.ids || [], files: b.files || [], message: b.reason || '未复核' });
  }
  return merged;
}

// ---------- 链接检查 ----------
/**
 * 请求一个 URL。method 为 HEAD 时若返回 403/405/501 等（很多站点拒绝 HEAD），
 * 自动降级为 GET（只取前 1KB）重试，避免误报无效链接。
 */
function request(url, method, retries) {
  return new Promise((resolve) => {
    let settled = false;
    const done = (r) => {
      if (settled) return;
      settled = true;
      resolve(r);
    };

    let protocol;
    try {
      protocol = url.startsWith('https') ? https : http;
      // eslint-disable-next-line no-new
      new URL(url);
    } catch {
      done({ url, status: 0, isValid: false, message: 'Invalid URL' });
      return;
    }

    const req = protocol.request(
      url,
      {
        method,
        timeout: CONFIG.timeout,
        headers: {
          'User-Agent': CONFIG.userAgent,
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8',
          ...(method === 'GET' ? { Range: 'bytes=0-1024' } : {}),
        },
      },
      (res) => {
        const code = res.statusCode;

        // HEAD 被拒或不支持 → 降级 GET（很多站点对 HEAD 直接返回 400/403/405/501）
        if (method === 'HEAD' && (code === 400 || code === 403 || code === 405 || code === 501)) {
          res.resume();
          request(url, 'GET', retries).then(done);
          return;
        }

        // 重定向
        if (code >= 300 && code < 400 && res.headers.location) {
          let next = res.headers.location;
          if (!/^https?:/i.test(next)) {
            try {
              next = new URL(next, url).toString();
            } catch {
              /* 保持原样 */
            }
          }
          res.resume();
          request(next, method, retries).then(done);
          return;
        }

        res.resume();
        // 分类（判定标准集中在这里，便于维护）：
        //  2xx                → 有效
        //  404 / 410          → 失效（页面确已不存在，必须修）
        //  其余非 2xx         → 疑似受限/不稳定，需人工复核
        //                       （401/403/418/429 反爬，5xx 网关或服务端异常）
        // 这样设计的原因：自动化每日运行，必须只对「确定已死」的链接硬失败，
        // 否则被瞬时 502/超时误伤会导致流水线长期红灯而失去意义。
        const isValid = code >= 200 && code < 300;
        const gone = code === 404 || code === 410;
        done({
          url,
          status: code,
          isValid,
          suspect: !isValid && !gone,
          message: isValid ? 'OK' : `HTTP ${code}`,
        });
      }
    );

    req.on('error', (error) => {
      if (retries > 0) {
        setTimeout(() => request(url, method, retries - 1).then(done), CONFIG.retryDelay);
      } else {
        // 域名无法解析 = 站点确实不存在 → 失效；其余（连接被拒/重置等）可能是瞬时或网络限制 → 需复核
        const gone = error.code === 'ENOTFOUND';
        done({ url, status: 0, isValid: false, suspect: !gone, message: error.message });
      }
    });

    req.on('timeout', () => {
      req.destroy();
      if (retries > 0) {
        setTimeout(() => request(url, method, retries - 1).then(done), CONFIG.retryDelay);
      } else {
        // 超时多为网络抖动或慢站点，不硬判失效
        done({ url, status: 0, isValid: false, suspect: true, message: 'Timeout' });
      }
    });

    req.end();
  });
}

// ---------- 单链接校验 ----------
/**
 * HEAD 结果非 2xx 时用 GET 复核原始 URL。
 * 很多站点（如德国政府站点）对 HEAD 返回 303 重定向到 /error_path/400.html，
 * 若直接跟进重定向会把有效链接误判为失效。GET 复核可消除这类假阴性。
 */
async function checkLink(url) {
  const head = await request(url, 'HEAD', CONFIG.retries);
  if (head.isValid) return head;

  const get = await request(url, 'GET', CONFIG.retries);
  if (get.isValid) return get;

  // 两者都失败时，优先相信「确定已失效」的结果（非 suspect 的非有效结果）
  const hardFail = (r) => !r.isValid && !r.suspect;
  if (hardFail(get)) return get;
  if (hardFail(head)) return head;
  return get;
}

// ---------- 数据提取 ----------
const newsRegex = /{\s*id:\s*['"]([^'"]+)['"],[\s\S]*?link:\s*['"]([^'"]+)['"]/g;

function extractFromContent(content, fileLabel) {
  const items = [];
  let match;
  newsRegex.lastIndex = 0;
  while ((match = newsRegex.exec(content)) !== null) {
    items.push({ id: match[1], link: match[2], file: fileLabel });
  }
  return items;
}

function collectNewsItems() {
  const all = [];
  for (const t of SCAN_TARGETS) {
    if (t.type === 'file') {
      if (!fs.existsSync(t.target)) continue;
      const content = fs.readFileSync(t.target, 'utf-8');
      all.push(...extractFromContent(content, path.relative(ROOT, t.target)));
    } else {
      if (!fs.existsSync(t.target)) continue;
      for (const f of fs.readdirSync(t.target).sort()) {
        if (!t.filter(f)) continue;
        const full = path.join(t.target, f);
        const content = fs.readFileSync(full, 'utf-8');
        all.push(...extractFromContent(content, path.relative(ROOT, full)));
      }
    }
  }
  return all;
}

// ---------- 并发池 ----------
async function runPool(items, worker, concurrency) {
  let cursor = 0;
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (cursor < items.length) {
      const idx = cursor++;
      await worker(items[idx], idx);
      if (CONFIG.delayMs) await new Promise((r) => setTimeout(r, CONFIG.delayMs));
    }
  });
  await Promise.all(runners);
}

// ---------- 主流程 ----------
async function validateLinks() {
  const opts = parseArgs(process.argv.slice(2));

  log('cyan', '\n🔍 开始验证新闻链接有效性...\n');

  let newsItems = collectNewsItems();

  // 跳过站内相对链接（如 /laws）
  const internal = newsItems.filter((n) => !/^https?:/i.test(n.link));
  newsItems = newsItems.filter((n) => /^https?:/i.test(n.link));

  if (opts.only) {
    newsItems = newsItems.filter((n) => n.file.includes(opts.only) || n.id.includes(opts.only));
  }

  // 同一 URL 去重，避免重复请求
  const byUrl = new Map();
  for (const item of newsItems) {
    if (!byUrl.has(item.link)) byUrl.set(item.link, { link: item.link, ids: [], files: new Set() });
    const e = byUrl.get(item.link);
    e.ids.push(item.id);
    e.files.add(item.file);
  }
  let uniq = [...byUrl.values()].map((e) => ({ ...e, files: [...e.files] }));
  if (Number.isFinite(opts.limit)) uniq = uniq.slice(0, opts.limit);

  log('blue', `📋 共 ${newsItems.length} 条新闻条目 / ${byUrl.size} 个唯一外链` + (internal.length ? ` （另有 ${internal.length} 条站内链接已跳过）` : ''));
  log('blue', `🚀 待验证 ${uniq.length} 个，并发 ${opts.concurrency}\n`);

  if (uniq.length === 0) {
    log('yellow', '⚠️  未找到可验证的外链');
    process.exit(1);
  }

  const results = { valid: [], invalid: [], suspect: [] };
  let finished = 0;

  await runPool(
    uniq,
    async (entry) => {
      const r = await checkLink(entry.link);
      finished++;
      const label = `[${String(finished).padStart(String(uniq.length).length)}/${uniq.length}] ${entry.ids.slice(0, 3).join(',')}`;
      if (r.isValid) {
        results.valid.push({ ...entry, status: r.status });
        log('green', `${label} ✅ ${r.status}`);
      } else if (r.suspect) {
        results.suspect.push({ ...entry, status: r.status, message: r.message });
        log('yellow', `${label} ⚠️  ${r.message} (存在但限制访问)`);
      } else {
        results.invalid.push({ ...entry, status: r.status, message: r.message });
        log('red', `${label} ❌ ${r.message}  ${entry.link}`);
      }
    },
    opts.concurrency
  );

  // 按基线切分：已知技术债 vs 新增失效
  const baseline = loadBaseline();
  const baselineUrls = new Set((baseline.knownBroken || []).map((b) => b.url));
  const knownBroken = results.invalid.filter((it) => baselineUrls.has(it.link));
  const newBroken = results.invalid.filter((it) => !baselineUrls.has(it.link));
  // 只有「本轮实测 2xx」才算真修好，可以清理；本轮疑似/超时/未覆盖的一律保留，
  // 否则网络抖动会把历史失效链接从基线里挤出去，下次它以 404 形态回归时就会被误判成「新增失效」。
  const validUrls = new Set(results.valid.map((it) => it.link));
  const fixedInBaseline = [...baselineUrls].filter((u) => validUrls.has(u));

  if (opts.updateBaseline) {
    saveBaseline(mergeBaseline(results.invalid, baseline, validUrls));
  }

  console.log('\n' + '='.repeat(80));
  log('cyan', '\n📊 验证结果统计\n');
  log('green', `✅ 有效链接: ${results.valid.length}`);
  log('yellow', `⚠️  疑似受限（403/429 等）: ${results.suspect.length}`);
  log('red', `❌ 失效链接: ${results.invalid.length}  （新增 ${newBroken.length} / 基线内 ${knownBroken.length}）`);

  if (results.suspect.length > 0) {
    log('yellow', '\n⚠️  需人工复核的链接（可能是反爬，用浏览器打开确认）:\n');
    for (const it of results.suspect) {
      log('yellow', `  [${it.ids.join(', ')}] ${it.link}  └─ ${it.message}`);
    }
  }

  if (newBroken.length > 0) {
    log('red', '\n❌ 新增失效链接（必须修复，不在基线内）:\n');
    for (const it of newBroken) {
      log('yellow', `  [${it.ids.join(', ')}] ${it.link}`);
      log('red', `    └─ ${it.message}  ← ${it.files.join(', ')}`);
    }
  }

  if (knownBroken.length > 0) {
    log('yellow', '\n📋 历史遗留失效链接（已登记在基线，不阻断提交）:\n');
    for (const it of knownBroken) {
      log('yellow', `  [${it.ids.join(', ')}] ${it.link}  └─ ${it.message}`);
    }
  }

  if (fixedInBaseline.length > 0) {
    log('green', `\n🎉 基线中有 ${fixedInBaseline.length} 条已经修好，可以清理 link-baseline.json:\n`);
    for (const u of fixedInBaseline) log('green', `  ${u}`);
  }

  if (results.invalid.length > 0 || results.suspect.length > 0) {
    const reportPath = path.join(__dirname, 'invalid-links-report.json');
    fs.writeFileSync(
      reportPath,
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          totalItems: newsItems.length,
          totalUniqueUrls: uniq.length,
          valid: results.valid.length,
          suspect: results.suspect.length,
          invalid: results.invalid.length,
          newBroken: newBroken.length,
          knownBroken: knownBroken.length,
          invalidLinks: results.invalid,
          newBrokenLinks: newBroken,
          suspectLinks: results.suspect,
        },
        null,
        2
      )
    );
    log('cyan', `\n📄 详细报告已保存至: ${reportPath}`);
  }

  if (newBroken.length > 0) {
    log('red', `\n❌ 存在 ${newBroken.length} 条新增失效链接，验证未通过。\n`);
    process.exit(1);
  }

  log('green', '\n✅ 无新增失效链接，验证通过。\n');
  process.exit(0);
}

validateLinks().catch((error) => {
  log('red', `\n❌ 验证过程出错: ${error.message}`);
  process.exit(1);
});
