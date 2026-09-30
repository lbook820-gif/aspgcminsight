#!/usr/bin/env node

/**
 * 服务端兜底更新（GitHub Actions 专用）
 *
 * 定位：本地 WorkBuddy 自动化仍是内容主力（负责研究、撰写影响分析）。
 *       本脚本只在「本地流程断更超过阈值」时启动，从**官方源**收录事实条目，
 *       保证站点不断更。它只搬运官方原文，不做解读、不编造分析。
 *
 * 用法：
 *   node scripts/fallback-update.mjs                    # 默认**只预演**，不写文件
 *   node scripts/fallback-update.mjs --apply            # 真正写入（必须在 CI 里显式声明）
 *   node scripts/fallback-update.mjs --apply --force    # 忽略断更阈值，强制执行
 *   node scripts/fallback-update.mjs --apply --hours 30 # 断更阈值（小时，默认 30）
 *   node scripts/fallback-update.mjs --apply --window 3 # 只收最近 N 天的官方动态（默认 3）
 *   node scripts/fallback-update.mjs --apply --max 3    # 单次最多收录条数（默认 3）
 *   node scripts/fallback-update.mjs --verbose          # 打印被过滤条目的明细
 *
 * 安全设计：不传 --apply 一律按预演处理。这个脚本会改仓库里的内容文件，
 * 必须显式声明才能落盘，避免被误调用（手动 import、调度器手滑等）造成脏提交。
 *
 * 退出码：0 = 正常（含「内容新鲜，跳过」）；1 = 出错（不得提交）
 */

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const NEWS_DIR = path.join(ROOT, 'src/data/news');
const INDEX_FILE = path.join(NEWS_DIR, 'index.ts');
const RESULT_PATH = path.join(__dirname, '.fallback-result.json');
const CANDIDATES_PATH = path.join(__dirname, '.fallback-candidates.json');

// ── 参数 ────────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const out = { hours: 30, window: 3, max: 3, apply: false, dryRun: false, force: false, verbose: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--apply') out.apply = true;
    else if (a === '--dry-run') out.dryRun = true;
    else if (a === '--force') out.force = true;
    else if (a === '--verbose') out.verbose = true;
    else if (a === '--hours') out.hours = Number(argv[++i]);
    else if (a === '--window') out.window = Number(argv[++i]);
    else if (a === '--max') out.max = Number(argv[++i]);
  }
  return out;
}
const OPTS = parseArgs(process.argv.slice(2));

// ── 官方源 ──────────────────────────────────────────────────────────────
// 只登记**实测可用**的源。新增源前必须先 curl 验证，否则等于每天空跑。
const SOURCES = [
  {
    id: 'ec-presscorner',
    name: '欧盟委员会新闻中心',
    type: 'rss',
    url: 'https://ec.europa.eu/commission/presscorner/api/rss?language=en',
  },
  {
    id: 'ec-digital-strategy',
    name: '欧盟委员会数字战略总司',
    type: 'rss',
    url: 'https://digital-strategy.ec.europa.eu/en/rss.xml',
  },
  {
    id: 'edpb',
    name: '欧洲数据保护委员会(EDPB)',
    type: 'rss',
    url: 'https://www.edpb.europa.eu/rss.xml',
  },
  {
    id: 'cnil',
    name: '法国国家信息与自由委员会(CNIL)',
    type: 'rss',
    url: 'https://www.cnil.fr/en/rss.xml',
  },
  {
    id: 'adlc',
    name: '法国竞争管理局',
    type: 'rss',
    url: 'https://www.autoritedelaconcurrence.fr/en/rss.xml',
  },
  {
    id: 'cma',
    name: '英国竞争与市场管理局(CMA)',
    type: 'rss',
    url: 'https://www.gov.uk/search/news-and-communications.atom?organisations%5B%5D=competition-and-markets-authority',
  },
  {
    id: 'dsit',
    name: '英国科学创新与技术部(DSIT)',
    type: 'rss',
    url: 'https://www.gov.uk/search/news-and-communications.atom?organisations%5B%5D=department-for-science-innovation-and-technology',
  },
  {
    id: 'dpc',
    name: '爱尔兰数据保护委员会(DPC)',
    type: 'html',
    url: 'https://www.dataprotection.ie/en/news-media/latest-news',
    base: 'https://www.dataprotection.ie',
    linkPattern: /href="(\/en\/news-media\/latest-news\/[^"#?]+)"/g,
  },
];

// ── 相关性过滤 ──────────────────────────────────────────────────────────
// 强信号：命中**标题**里的强信号词，才算数字监管类动态
const STRONG_TERMS = [
  'digital services act', 'digital markets act', 'gdpr',
  'general data protection regulation', 'data protection', 'personal data',
  'artificial intelligence act', 'ai act', 'gpai', 'data act', 'cyber resilience act',
  'privacy', 'gatekeeper', 'vlop', 'vlose', 'online platform', 'online platforms',
  'content moderation', 'dark pattern', 'consumer protection', 'interoperability',
  'data sharing', 'digital fairness', 'artificial intelligence', 'age assurance',
  'children', 'minors', 'deepfake', 'disinformation', 'online safety',
  'video game', 'gamer', 'in-game', 'loot box', 'digital euro', 'net neutrality',
  'open internet', 'foreign subsidies', 'product liability', 'cloud',
];
const SHORT_STRONG = ['dsa', 'dma', 'cra', 'psd2'];
const WEAK_TERMS = ['antitrust', 'competition', 'merger', 'acquisition', 'dominance', 'abuse'];

// 与本站定位无关的公告，直接排除
const OUT_OF_SCOPE = [
  'home upgrade', 'net zero', 'energy price', 'energy market', 'grocery', 'supermarket',
  'railway', 'water company', 'postal', 'agricultur', 'fisher', 'freight', 'bus route',
  'road ', 'aviation', 'pharmaceutical', 'defence procurement',
];

const COMPANY_NAMES = [
  'Google', 'Alphabet', 'Meta', 'Facebook', 'Apple', 'Amazon', 'TikTok', 'ByteDance',
  'Microsoft', 'OpenAI', 'Temu', 'Shein', 'AliExpress', 'Booking', 'Reddit', 'Roblox',
  'X Corp', 'Twitter', 'Netflix', 'Uber', 'Anthropic', 'Snapchat', 'LinkedIn',
];

const EXCLUDE_PATTERNS = [
  'speech by', 'opening remarks', 'closing remarks', 'keynote', 'calendar of',
  'press briefing', 'readout of', 'agenda of', 'weekly agenda',
];

const TAG_RULES = [
  [/GDPR|General Data Protection Regulation|data protection|personal data/i, 'GDPR'],
  [/Digital Services Act|\bDSA\b|VLOP|VLOSE/i, 'DSA'],
  [/Digital Markets Act|\bDMA\b|gatekeeper/i, 'DMA'],
  [/AI Act|GPAI|artificial intelligence/i, 'AI Act'],
  [/Data Act/i, '数据法案'],
  [/Cyber Resilience|\bCRA\b/i, 'CRA'],
  [/child|minor|age assurance/i, '未成年人保护'],
  [/antitrust|competition/i, '反垄断'],
  [/consumer protection|CPC Network|unfair commercial/i, '消费者保护'],
  [/video game|gamer|in-game|loot box/i, '游戏'],
  [/online safety|Online Safety Act/i, '在线安全'],
  [/fine|penalt|sanction|infringement/i, '处罚'],
];

// 事件指纹：用于识别「同一事件被不同官方源重复发布」
const FP_TOKENS = [
  'gdpr', 'dsa', 'dma', 'ai act', 'data act', 'cra', 'privacy', 'data protection',
  'vlop', 'vlose', 'gatekeeper', 'dark pattern', 'consumer protection', 'online safety',
];

// ── 工具函数 ────────────────────────────────────────────────────────────
const log = (msg) => console.log(msg);

function decodeEntities(s) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&amp;/g, '&');
}

function stripTags(s) {
  return s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function clean(s) {
  return stripTags(decodeEntities(s || '')).trim();
}

async function fetchText(url, timeoutMs = 25000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

// 统一折算成北京时间的日期（仓库惯例：日期与原始报道一致，按中国时区记）
function toBeijingDate(value) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return new Date(d.getTime() + 8 * 3600 * 1000).toISOString().slice(0, 10);
}

const MONTHS = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

// 官方页面上的日期写法五花八门，逐个试
function extractDateFromText(text) {
  const t = String(text).replace(/\s+/g, ' ');
  let m = t.match(/\b(20\d{2})-(\d{2})-(\d{2})\b/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  // "21st September 2026" / "21 September 2026"
  m = t.match(
    /\b(\d{1,2})(?:st|nd|rd|th)?\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(20\d{2})\b/i
  );
  if (m) return `${m[3]}-${String(MONTHS[m[2].toLowerCase()]).padStart(2, '0')}-${m[1].padStart(2, '0')}`;
  m = t.match(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(20\d{2})\b/i
  );
  if (m) return `${m[3]}-${String(MONTHS[m[1].toLowerCase()]).padStart(2, '0')}-${m[2].padStart(2, '0')}`;
  m = t.match(/\b(\d{1,2})\/(\d{1,2})\/(20\d{2})\b/);
  if (m) return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
  return null;
}

// ── RSS / Atom 解析 ─────────────────────────────────────────────────────
function pickTag(block, tag) {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return m ? m[1] : null;
}

function pickLink(block) {
  // Atom：优先 rel="alternate"
  const alternates = [...block.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]);
  for (const tag of alternates) {
    if (/rel=["']alternate["']/i.test(tag) || !/rel=/i.test(tag)) {
      const href = tag.match(/href=["']([^"']+)["']/i);
      if (href) return href[1];
    }
  }
  const plain = pickTag(block, 'link');
  return plain ? clean(plain) : null;
}

function pickDate(block) {
  for (const tag of ['pubDate', 'dc:date', 'published', 'updated', 'date']) {
    const v = pickTag(block, tag);
    const d = toBeijingDate(clean(v));
    if (d) return d;
  }
  return null;
}

function parseFeed(xml, source) {
  const blocks =
    xml.match(/<item\b[\s\S]*?<\/item>/gi) || xml.match(/<entry\b[\s\S]*?<\/entry>/gi) || [];
  const items = [];
  for (const b of blocks) {
    const title = clean(pickTag(b, 'title'));
    const link = pickLink(b);
    if (!title || !link) continue;
    const descRaw =
      pickTag(b, 'description') || pickTag(b, 'summary') || pickTag(b, 'content') || '';
    items.push({
      sourceId: source.id,
      sourceName: source.name,
      title,
      link: link.trim(),
      date: pickDate(b),
      description: clean(descRaw).slice(0, 600),
    });
  }
  return items;
}

// HTML 列表页（DPC 等无 RSS 的监管机构）：列表页拿链接，详情页拿标题与日期
async function parseHtmlSource(source, limit = 6) {
  const html = await fetchText(source.url);
  const links = [];
  const seen = new Set();
  for (const m of html.matchAll(source.linkPattern)) {
    const url = source.base + m[1];
    if (seen.has(url)) continue;
    seen.add(url);
    links.push(url);
    if (links.length >= limit) break;
  }

  const items = [];
  for (const url of links) {
    try {
      const detail = await fetchText(url);
      const h1 = detail.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      const titleTag = detail.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const title = clean(h1 ? h1[1] : titleTag ? titleTag[1] : '');

      // 日期优先取「class 含 date 的元素」。直接全文找日期会把正文里提到的
      // 历史日期（如 GDPR 生效日 2018-05-25）当成发布日期，是实测踩过的坑。
      let date = null;
      const dateEl = detail.match(
        /<[a-z]+[^>]*class=["'][^"']*date[^"']*["'][^>]*>([\s\S]{0,80}?)<\/[a-z]+>/i
      );
      if (dateEl) date = extractDateFromText(clean(dateEl[1]));
      if (!date && h1 && h1.index !== undefined) {
        // 退路：只看 h1 之后 700 字符（署名行区域）
        date = extractDateFromText(clean(detail.slice(h1.index, h1.index + 700)));
      }
      if (!title || !date) {
        log(`    ⚠️ 跳过（缺标题或日期）${url}`);
        continue;
      }

      let desc = '';
      const body = detail.match(/field--name-body[\s\S]{0,400}?<p>([\s\S]*?)<\/p>/i);
      if (body) desc = clean(body[1]);
      if (!desc) {
        const meta = detail.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
        if (meta) desc = clean(meta[1]);
      }

      items.push({
        sourceId: source.id,
        sourceName: source.name,
        title: title.replace(/\s*\|\s*Data Protection Commission\s*$/i, '').trim(),
        link: url,
        date,
        description: desc.slice(0, 600),
      });
    } catch (e) {
      log(`    ⚠️ 详情页抓取失败 ${url} — ${e.message}`);
    }
  }
  return items;
}

// ── 现有内容扫描（去重 + 取号） ──────────────────────────────────────────
function listNewsFiles() {
  return fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith('.ts') && f !== 'index.ts')
    .map((f) => path.join(NEWS_DIR, f));
}

function scanExisting() {
  const links = new Set();
  const titles = new Set();
  const events = []; // { date, companies:Set, tokens:Set } 用于事件级去重
  let maxId = 0;
  const files = [...listNewsFiles(), path.join(ROOT, 'src/pages/Enforcement.tsx'), path.join(ROOT, 'src/pages/DPAs.tsx')];
  for (const f of files) {
    if (!fs.existsSync(f)) continue;
    const text = fs.readFileSync(f, 'utf8');
    for (const m of text.matchAll(/link:\s*'([^']+)'/g)) links.add(m[1].trim());
    for (const m of text.matchAll(/title:\s*'((?:[^'\\]|\\.)*)'/g)) {
      titles.add(normalizeTitle(m[1]));
    }
    for (const m of text.matchAll(/id:\s*'2026-(\d{3})'/g)) {
      maxId = Math.max(maxId, Number(m[1]));
    }
    // 条目块：形如 "  {\n    id: ...\n  },"
    for (const m of text.matchAll(/^ {2}\{[\s\S]*?^ {2}\},?$/gm)) {
      const block = m[0];
      const date = block.match(/date:\s*'(\d{4}-\d{2}-\d{2})'/);
      const title = block.match(/title:\s*'((?:[^'\\]|\\.)*)'/);
      if (!date || !title) continue;
      events.push({ date: date[1], ...fingerprint(`${title[1]} ${block.slice(0, 1200)}`) });
    }
  }
  return { links, titles, events, maxId };
}

// 事件指纹 = 涉及的大厂 + 涉及的法规主题，用于识别「同一事件被不同源重复发布」
function fingerprint(text) {
  const low = text.toLowerCase();
  const companies = new Set(COMPANY_NAMES.filter((c) => new RegExp(`\\b${c}\\b`, 'i').test(text)).map((c) => c.toLowerCase()));
  const tokens = new Set(FP_TOKENS.filter((t) => low.includes(t)));
  return { companies, tokens };
}

function isDuplicateEvent(cand, existingEvents, windowDays = 5) {
  const fp = fingerprint(`${cand.title} ${cand.description}`);
  if (fp.companies.size === 0) return false;
  const candTs = new Date(`${cand.date}T00:00:00Z`).getTime();
  for (const ev of existingEvents) {
    const diff = Math.abs(candTs - new Date(`${ev.date}T00:00:00Z`).getTime()) / 86400000;
    if (diff > windowDays) continue;
    const sameCompany = [...fp.companies].some((c) => ev.companies.has(c));
    const sameToken = [...fp.tokens].some((t) => ev.tokens.has(t));
    if (sameCompany && sameToken) return true;
  }
  return false;
}

function normalizeTitle(t) {
  return decodeEntities(t)
    .replace(/\\'/g, "'")
    .replace(/[^\p{L}\p{N}]+/gu, '')
    .toLowerCase();
}

// ── 断更判断 ────────────────────────────────────────────────────────────
// 用「内容文件最后一次提交」而非「最新条目日期」判断：
// 条目记录的往往是前一天的新闻，用日期判断会误判。
function contentCommitTime() {
  const paths = ['src/data/news', 'src/pages/Enforcement.tsx', 'src/pages/DPAs.tsx', 'src/pages/Laws.tsx'];
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%ct', '--', ...paths], {
      cwd: ROOT,
      encoding: 'utf8',
    }).trim();
    if (!out) return null;
    return Number(out) * 1000;
  } catch {
    return null;
  }
}

function stalenessHours() {
  const ts = contentCommitTime();
  if (!ts) return { hours: Infinity, since: null, source: 'git 不可用' };
  return {
    hours: (Date.now() - ts) / 3600000,
    since: new Date(ts).toISOString(),
    source: 'git 最后一次内容提交',
  };
}

// ── 候选筛选 ────────────────────────────────────────────────────────────
// 收录规则（宁缺毋滥，避免把无关公告灌进站点）：
//   A. 标题命中 ≥2 个强信号词
//   B. 标题命中 ≥1 个强信号词，且正文提到本站关注的大厂
//   C. 正文提到大厂，且正文命中强信号词或 ≥2 个弱信号词（并购/竞争类）
function evaluateRelevance(title, description) {
  const t = title.toLowerCase();
  const all = `${title} ${description}`.toLowerCase();
  const countStrong = (s) =>
    STRONG_TERMS.filter((x) => s.includes(x)).length +
    SHORT_STRONG.filter((x) => new RegExp(`\\b${x}\\b`).test(s)).length;

  const strongTitle = countStrong(t);
  const strongAll = countStrong(all);
  const companies = COMPANY_NAMES.filter((c) => new RegExp(`\\b${c}\\b`, 'i').test(`${title} ${description}`));
  const weakScore = WEAK_TERMS.filter((x) => all.includes(x)).length;
  const outOfScope = OUT_OF_SCOPE.some((x) => all.includes(x));

  if (outOfScope) return { accept: false, reason: 'out-of-scope' };
  if (strongTitle >= 2) return { accept: true, score: strongTitle * 2 + companies.length };
  if (strongTitle >= 1 && companies.length >= 1) return { accept: true, score: strongTitle * 2 + companies.length };
  if (companies.length >= 1 && (strongAll >= 1 || weakScore >= 2)) {
    return { accept: true, score: 2 + companies.length };
  }
  return { accept: false, reason: strongTitle ? 'insufficient-signal' : 'no-signal' };
}

function isExcluded(title) {
  const low = title.toLowerCase();
  return EXCLUDE_PATTERNS.some((p) => low.includes(p));
}

function buildTags(text) {
  const tags = ['自动收录', '官方公告'];
  for (const [re, tag] of TAG_RULES) {
    if (re.test(text) && !tags.includes(tag)) tags.push(tag);
  }
  for (const c of COMPANY_NAMES) {
    if (new RegExp(`\\b${c}\\b`, 'i').test(text) && !tags.includes(c)) tags.push(c);
  }
  return tags.slice(0, 7);
}

// ── 写入新闻文件 ────────────────────────────────────────────────────────
const q = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ').trim()}'`;

function renderEntry(entry) {
  const tags = entry.tags.map(q).join(', ');
  return `  {
    id: ${q(entry.id)},
    source: ${q(entry.source)},
    date: ${q(entry.date)},
    heat: ${entry.heat},
    title: ${q(entry.title)},
    summary:
      ${q(entry.summary)},
    overallImpact:
      ${q(entry.overallImpact)},
    industryImpact:
      ${q(entry.industryImpact)},
    tags: [${tags}],
    link: ${q(entry.link)},
    isNew: true,
  },`;
}

function monthFile(dateStr) {
  return path.join(NEWS_DIR, `${dateStr.slice(0, 7)}.ts`);
}

function ensureMonthFile(dateStr) {
  const file = monthFile(dateStr);
  const key = dateStr.slice(0, 7).replace(/-/g, '');
  const exportName = `news${key}`;
  if (fs.existsSync(file)) return { file, exportName };

  fs.writeFileSync(
    file,
    `import type { NewsItem } from '@/types';\n\nexport const ${exportName}: NewsItem[] = [\n];\n`,
    'utf8'
  );

  let index = fs.readFileSync(INDEX_FILE, 'utf8');
  index = index.replace(
    /^import type \{ NewsItem \} from '@\/types';\n/m,
    `import type { NewsItem } from '@/types';\nimport { ${exportName} } from './${dateStr.slice(0, 7)}';\n`
  );
  index = index.replace(
    /export const allNews: NewsItem\[\] = \[\n/,
    `export const allNews: NewsItem[] = [\n  ...${exportName},\n`
  );
  fs.writeFileSync(INDEX_FILE, index, 'utf8');
  log(`  📄 新建月份文件 src/data/news/${dateStr.slice(0, 7)}.ts 并接入 index.ts`);
  return { file, exportName };
}

function appendEntries(entries) {
  // 按月份分组，同月合并写入一次
  const byMonth = new Map();
  for (const e of entries) {
    const m = e.date.slice(0, 7);
    if (!byMonth.has(m)) byMonth.set(m, []);
    byMonth.get(m).push(e);
  }
  for (const [month, list] of byMonth) {
    const { file } = ensureMonthFile(`${month}-01`);
    let text = fs.readFileSync(file, 'utf8');
    const block = list.map(renderEntry).join('\n');
    const close = text.lastIndexOf('];');
    if (close === -1) throw new Error(`${file} 中找不到数组结尾 ];`);
    text = `${text.slice(0, close)}${block}\n${text.slice(close)}`;
    fs.writeFileSync(file, text, 'utf8');
    log(`  ✍️  写入 ${list.length} 条 → src/data/news/${month}.ts`);
  }
}

// ── 结果输出 ────────────────────────────────────────────────────────────
function finish(result) {
  fs.writeFileSync(RESULT_PATH, JSON.stringify(result, null, 2) + '\n', 'utf8');
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(
      process.env.GITHUB_OUTPUT,
      `action=${result.action}\ncount=${result.count || 0}\nreason=${result.reason}\n`
    );
  }
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, renderSummary(result));
  }
  log(`\n结论：${result.action} — ${result.reason}`);
  return result;
}

function renderSummary(r) {
  const lines = ['## 服务端兜底更新', '', `- 结论：**${r.action}**`, `- 原因：${r.reason}`];
  if (r.staleness) lines.push(`- 断更时长：${r.staleness.hours.toFixed(1)} 小时（阈值 ${r.hours} 小时）`);
  if (r.count) lines.push(`- 收录条数：${r.count}`);
  if (r.entries?.length) {
    lines.push('', '| 日期 | 来源 | 标题 |', '| --- | --- | --- |');
    for (const e of r.entries) lines.push(`| ${e.date} | ${e.sourceName} | ${e.title} |`);
  }
  lines.push('');
  return lines.join('\n');
}

// ── 主流程 ──────────────────────────────────────────────────────────────
async function main() {
  log('── 服务端兜底更新 ──');
  const stale = stalenessHours();
  log(`断更判断：${stale.hours === Infinity ? '无法判断（无 git 记录）' : stale.hours.toFixed(1) + ' 小时'}（阈值 ${OPTS.hours} 小时）`);

  if (!OPTS.force && stale.hours < OPTS.hours) {
    return finish({
      action: 'skipped',
      count: 0,
      reason: `内容新鲜（距上次内容提交 ${stale.hours.toFixed(1)} 小时 < ${OPTS.hours} 小时），无需兜底`,
      staleness: stale,
      hours: OPTS.hours,
    });
  }

  const existing = scanExisting();
  log(`现有链接 ${existing.links.size} 条，最大 ID 2026-${String(existing.maxId).padStart(3, '0')}`);

  log('\n抓取官方源…');
  const collected = [];
  for (const src of SOURCES) {
    try {
      const items = src.type === 'html' ? await parseHtmlSource(src) : parseFeed(await fetchText(src.url), src);
      log(`  ${src.name}：${items.length} 条`);
      collected.push(...items);
    } catch (e) {
      log(`  ⚠️ ${src.name} 抓取失败：${e.message}（跳过，不影响其他源）`);
    }
  }

  const cutoff = new Date(Date.now() - OPTS.window * 86400000).toISOString().slice(0, 10);
  const candidates = [];
  const localTitles = new Set();
  const rejected = { outOfScope: 0, weakSignal: 0, excluded: 0, duplicate: 0, tooOld: 0, sameLink: 0 };
  const rejectedDetail = [];
  const reject = (kind, it) => {
    rejected[kind]++;
    if (OPTS.verbose) rejectedDetail.push({ kind, date: it.date, source: it.sourceName, title: it.title });
  };
  for (const it of collected) {
    if (!it.date || it.date < cutoff) { reject('tooOld', it); continue; }
    if (existing.links.has(it.link)) { reject('sameLink', it); continue; }
    if (isExcluded(it.title)) { reject('excluded', it); continue; }
    const nt = normalizeTitle(it.title);
    if (existing.titles.has(nt) || localTitles.has(nt)) { reject('duplicate', it); continue; }
    const rel = evaluateRelevance(it.title, it.description);
    if (!rel.accept) {
      reject(rel.reason === 'out-of-scope' ? 'outOfScope' : 'weakSignal', it);
      continue;
    }
    // 同一事件已被其他源报道过（例如 EDPB 转发 DPC 的谷歌罚单）
    if (isDuplicateEvent(it, existing.events)) { reject('duplicate', it); continue; }
    localTitles.add(nt);
    candidates.push({ ...it, score: rel.score });
  }
  candidates.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.score - a.score));
  const picked = candidates.slice(0, OPTS.max);

  fs.writeFileSync(
    CANDIDATES_PATH,
    JSON.stringify({ rejected, rejectedDetail, candidates, picked }, null, 2) + '\n',
    'utf8'
  );
  log(`\n候选 ${candidates.length} 条 → 取前 ${picked.length} 条`);
  log(`  过滤统计：超窗 ${rejected.tooOld} / 同链 ${rejected.sameLink} / 低相关 ${rejected.weakSignal} / 超范围 ${rejected.outOfScope} / 重复事件 ${rejected.duplicate} / 噪音标题 ${rejected.excluded}`);
  if (OPTS.verbose && rejectedDetail.length) {
    log('\n  被过滤明细：');
    for (const r of rejectedDetail) log(`    [${r.kind}] ${r.date} ${r.title.slice(0, 80)}`);
  }

  if (picked.length === 0) {
    return finish({
      action: 'empty',
      count: 0,
      reason: `虽然断更 ${stale.hours.toFixed(1)} 小时，但官方源近 ${OPTS.window} 天内没有可收录的新动态`,
      staleness: stale,
      hours: OPTS.hours,
    });
  }

  let nextId = existing.maxId;
  const entries = picked.map((c) => {
    nextId += 1;
    return {
      id: `2026-${String(nextId).padStart(3, '0')}`,
      source: `${c.sourceName}（官方公告·服务端自动收录）`,
      date: c.date,
      heat: c.score >= 4 ? 6 : 5,
      title: `[自动收录] ${c.title}`,
      summary: `【本条由服务端兜底流程自动收录：当日定时更新未执行，为避免站点断更而直接收录官方公告，仅保留官方原文信息，未做解读】${c.description || c.title}`,
      overallImpact:
        '本条为断更兜底自动收录条目，未做影响分析。待本地/人工流程恢复后补写完整解读。',
      industryImpact:
        '本条为断更兜底自动收录条目，对中国出海企业的影响分析待补写。',
      tags: buildTags(`${c.title} ${c.description}`),
      link: c.link,
      sourceName: c.sourceName,
    };
  });

  log('\n将收录：');
  for (const e of entries) log(`  ${e.date}  [${e.sourceName}]  ${e.title.slice(0, 70)}`);

  // 没显式 --apply 就只预演，绝不落盘
  if (!OPTS.apply || OPTS.dryRun) {
    return finish({
      action: 'dry-run',
      count: entries.length,
      reason: OPTS.apply ? '指定了 --dry-run，仅预演' : '未指定 --apply，仅预演（如需写入请加 --apply）',
      staleness: stale,
      hours: OPTS.hours,
      entries,
    });
  }

  appendEntries(entries);
  return finish({
    action: 'applied',
    count: entries.length,
    reason: `断更 ${stale.hours.toFixed(1)} 小时，已收录 ${entries.length} 条官方公告`,
    staleness: stale,
    hours: OPTS.hours,
    entries,
  });
}

main().catch((e) => {
  console.error(`\n❌ 兜底流程失败：${e.stack || e.message}`);
  process.exit(1);
});
