# HANDOVER.md — 项目交接说明

> 交接时间：2026-09-21
> 交接方：WorkBuddy
> 状态：已通读全库、复现构建、修复失效工具、全量链接审计

---

## 1. 项目定位

**ASPG 合规洞察（European Mobile App Compliance Insights）**
追踪全球（尤其欧盟）数字法规立法动态、监管机构执法案例与大厂合规事件，为**中国出海企业**提供合规情报。

线上站点：https://lbook820-gif.github.io/aspgcminsight/
远程仓库：https://github.com/lbook820-gif/aspgcminsight （public，默认分支 `main`）

---

## 2. 技术栈与构建部署

| 项 | 版本 / 说明 |
|---|---|
| 框架 | React 19 + TypeScript 5.8 |
| 构建 | Vite 7.3（`base: '/aspgcminsight/'`） |
| 样式 | Tailwind CSS 3.4 + shadcn/ui（40+ 组件在 `src/components/ui/`） |
| 路由 | react-router-dom v7 |
| 图标 | lucide-react |

**构建命令**
```bash
npm ci          # CI 用；本地首次用 npm install
npm run build   # 输出 dist/
npm run dev     # 本地预览 :3000
```

**部署**：`git push origin main` → GitHub Actions `deploy.yml` 自动 build 并发布 GitHub Pages。
产物约 982 KB（gzip 358 KB），单 chunk，有体积告警（不影响功能）。

> `vite.config.ts` 中 `__BUILD_DATE__ = new Date().toISOString()`，
> 首页「最后更新日期」取的是**构建时间**，不是内容最新日期。

---

## 3. 站点结构（4 个路由）

| 路由 | 文件 | 定位 | 条数 |
|---|---|---|---|
| `/` | `src/pages/Home.tsx` | 首页：本月动态 + 全部新闻，按 2026/2025/2024 分组 | 见下方新闻流 |
| `/laws` | `src/pages/Laws.tsx` | 法规库（15 部：DMA、AI Act、DSA、GDPR、NIS2、CRA、Data Act、CADA…） | 21（含 6 条行业动态） |
| `/enforcement` | `src/pages/Enforcement.tsx` | 执法动态（含顶部统计卡 + 监管事件时间线） | 146（其中 `e46` 为历史重复 ID） |
| `/dpas` | `src/pages/DPAs.tsx` | 各国监管局（支持关键词搜索 + 机构筛选） | 87 |

首页另有 `dynamicCards`（`src/data/dynamicCards.ts`）作为四个板块的入口卡片。

---

## 4. 数据架构（关键：数据分散在 4 处）

```
src/data/news/2024.ts, 2025.ts, 2026-01.ts … 2026-09.ts   ← 主新闻流（按月分文件）
src/data/news/index.ts        ← 汇总导出 allNews（新的月份文件必须在此追加 import）
src/pages/Enforcement.tsx     ← enforcementCases 数组（内联在页面文件里）
src/pages/DPAs.tsx            ← dpaUpdates 数组（内联在页面文件里）
src/pages/Laws.tsx            ← legislationItems 数组（内联在页面文件里）
src/data/dynamicCards.ts      ← 首页入口卡片
```

### ID 规则（全局唯一，新增必须递增）

| 数据源 | 格式 | 当前最大（2026-10-23） |
|---|---|---|
| 主新闻流 | `2026-NNN` | **2026-303**（10 月文件为 `2026-10.ts`，index.ts 已同步） |
| 执法动态 | `eN` | **e150**（注：`e33`/`e44`/`e60`/`e61`/`e62` 历史缺号） |
| 各国监管局 | `dpa-{eu\|ie\|uk\|tr\|fr\|de\|ch}-NNN` | dpa-eu-048 / dpa-ie-014 / dpa-de-004 / dpa-ch-004 / dpa-fr-002 / dpa-uk-010 / dpa-tr-004 |
| 法规库 | `N` | **15** |
| 法规库行业动态 | `iN` | **i6** |
| 首页卡片 | `N` | 1–6 |

> 各页面均在渲染时按日期/updateTime 倒序排序，因此新增条目**写在数组任意位置都不影响展示顺序**，
> 但按仓库惯例统一追加在数组末尾或开头。

### 数据字段

```ts
interface NewsItem {
  id; source; date; heat;           // heat 1-10
  title; summary;
  overallImpact;                    // 整体影响
  industryImpact;                   // 行业/对中国出海企业影响
  tags: string[];
  link?; isNew?;
}
```

---

## 5. 内容规范（WORKFLOW.md 定义的强制约束）

1. **链接有效性**：新增条目链接必须先验证；严禁空白/失效/占位链接
2. **ID 唯一性**：在现有最大值基础上递增，禁止重复
3. **日期准确性**：必须与原始报道发布日期一致，**禁止用当天日期填充历史新闻**
4. **排序**：所有页面新闻列表按日期倒序
5. **去重**：新增前先比对已有条目
6. **不收华为纯产品报道**，聚焦行业动态与监管政策
7. **官方源优先**：欧委会 presscorner、各国 DPA 官网、EDPB、ICO；次选路透/TechCrunch/Politico

### 必检信息源

- 爱尔兰 DPC：https://www.dataprotection.ie/en/news-media/latest-news （Meta/TikTok/X 执法，最高优先级）
- EDPB：https://www.edpb.europa.eu/news_en
- 英国 ICO：https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/
- 欧盟 AI Office、ENISA、EBA、瑞士 FDPIC、德国 BfDI、土耳其 KVKK/RK

### 重点监控企业

Apple、Google、Meta、Amazon、Microsoft、ByteDance(TikTok)、Temu/拼多多、X
中国出海：SHEIN、小米、OPPO、vivo、传音

### 重点法规

GDPR、DMA、DSA、NIS2、AI Act、Data Act、CRA、消费者权益

---

## 6. 每日更新流程（原机制 → 接管后）

**原机制**：OpenClaw Cron（isolated session），每日北京时间 00:00 执行
采集 → 生成条目 → 校验 → `npm run build` → `git add/commit/push`

**接管后**：由 WorkBuddy 自动化任务执行同一流程，命令级步骤：

```bash
# 1) 采集与写入（见上方规范）
# 2) 链接验证（强制，必须 exit 0）
node scripts/validate-links.js
# 3) 构建验证
npm run build
# 4) 提交推送
git add . && git commit -m "feat: daily update YYYY-MM-DD" && git push origin main
```

**提交信息格式**：`feat: daily update YYYY-MM-DD`
历史节奏：2026-04-21 起共 136 次提交，基本每日一次（近 20 次连续无断档）

---

## 7. 交接时发现的问题

### 🔴 P1 — 链接验证脚本长期失效（**已修复**）

`scripts/validate-links.js` 和 `validate-links.sh` 都只扫描 `src/pages/Home.tsx` 提取链接，
但新闻数据早已迁移到 `src/data/news/*.ts`，Home.tsx 中链接数为 **0**。

实际表现（修复前）：
```
🔍 开始验证新闻链接有效性...
⚠️  未找到新闻条目
exit=0        ← 静默「通过」，质量门形同虚设
```

**修复内容**：
- 扫描范围改为 `src/data/news/*.ts` + `Enforcement.tsx` + `DPAs.tsx`，共 **约 365 条条目 / 218 个唯一外链**
- 改为并发验证（默认 6 并发），URL 去重，支持 `--limit` / `--only` / `--concurrency`
- 请求策略：先 HEAD，非 2xx 时**用 GET 复核原始 URL**。这一步不可省——
  德国政府站点（BfDI、联邦卡特尔局）对 HEAD 会返回 303 重定向到 `/error_path/400.html`，
  直接跟进重定向会把有效链接误判为失效（已实测确认）
- 结果分三类：**有效(2xx)** / **疑似受限(401/403/429/5xx，需人工用浏览器复核)** / **失效(404/410/418/超时/DNS)**
- 新增**已知失效基线** `scripts/link-baseline.json`：只拦截「基线外的新增失效」，历史技术债不阻断提交。
  基线只能缩小不能扩大——修好一条请手动删除该条
- `validate-links.sh` 改为薄封装，统一调用 node 脚本，避免两份实现口径漂移

#### 修复后的最终状态（2026-09-21）

`203 → 206 有效 / 6 疑似受限 / 6 失效（已入基线）`，共 218 个唯一外链。
**失效链接从 18 条降至 6 条，且已全部登记在基线中，不再阻断提交。**

已修复（换为有效官方/权威替代链接，共 10 处条目）：

| 原链接 | 替代为 |
|---|---|
| gov.uk/government/news/cma-accepts-commitments-from-google-and-apple | gov.uk/…/cma-secures-commitments-from-apple-and-google-to-improve-fairness-in-app-store-processes-and-enhance-ios-interoperability |
| gov.uk/government/news/ofsi-imposes-fine-on-apple-subsidiary-… | gov.uk/government/publications/imposition-of-monetary-penalty-apple-distribution-international-limited |
| politico.eu/article/eu-rejects-meta-ai-whatsapp-access-proposal | politico.eu/article/eu-orders-meta-to-reopen-whatsapp-to-ai-rivals-for-free |
| dataprotection.ie/…/latest-news/data-protection-commission-publishes-2025-annual-report | dataprotection.ie/en/data-protection-commission-publishes-2025-annual-report |
| edoeb.admin.ch/edoeb/en/home/the-fdpic/links/news.html（瑞士 FDPIC 旧地址） | edoeb.admin.ch/en |
| bfdi.bund.de/EN/Service/Press/Press_node.html（德国 BfDI 旧地址） | bfdi.bund.de/EN/Home/home_node.html |
| bundeskartellamt.de/SharedDocs/Meldung/EN/…/21_06_2023_Google_Play_Store.html | bundeskartellamt.de/EN/Home/home_node.html |

仍待处理（已入基线，不阻断提交；建议后续逐条换源或删除条目）：

| 条目 ID | 链接 | 错误 |
|---|---|---|
| 2025-012 | techcrunch.com/2025/07/28/eu-temu-dsa-investigation/ | 404 |
| 2026-023 | techcrunch.com/2026/04/26/eu-smartphone-sustainability-rules-china-brands/ | 404 |
| 2026-008, e7 | fsfe.org/news/2024/news-20240322-01.en.html | 404 |
| 2026-025 | news.10jqka.com.cn/20260429/c676376800.shtml | 418（疑似反爬） |
| 2026-097 | techweb.com.cn/ucweb/news/id/2962940 | 连接被拒（疑站点下线） |
| 2026-178 | news.foodmate.net/2026/08/749969.html | 超时 |

疑似受限（403/5xx，需人工用浏览器复核后决定是否换源）：
`2026-009` Mastercard、`2026-011` Euractiv（均 403）、`2025-002` / `2026-007` CSDN（521）、
`2025-008` 齐鲁晚报（502）、`2026-146` wanyr.com（522）

> 完整报告：`scripts/invalid-links-report.json`；基线：`scripts/link-baseline.json`
>
> 注：`WORKFLOW.md` 中登记的瑞士 FDPIC 与德国 BfDI 官网地址与上述失效链接是**同一个**，
> 说明这两个官网曾改版，`WORKFLOW.md` 中的信息源清单亦已同步更新。

#### 历史记录：修复前的首次全量审计（2026-09-21）

217 个唯一外链 → **197 有效 / 2 疑似受限 / 18 失效**

| 条目 ID | 链接 | 错误 | 所在文件 |
|---|---|---|---|
| 2025-012 | techcrunch.com/2025/07/28/eu-temu-dsa-investigation/ | 404 | news/2025.ts |
| 2025-002 | blog.csdn.net/weixin_47196664/…/147809883 | 521 | news/2025.ts |
| 2026-013, e11 | gov.uk/government/news/cma-accepts-commitments-from-google-and-apple | 404 | news/2026-02.ts, Enforcement.tsx |
| 2026-014, e4 | gov.uk/…/ofsi-imposes-fine-on-apple-subsidiary-… | 404 | news/2026-03.ts, Enforcement.tsx |
| 2026-023 | techcrunch.com/2026/04/26/eu-smartphone-sustainability-rules-china-brands/ | 404 | news/2026-04.ts |
| 2026-010, e8 | politico.eu/article/eu-rejects-meta-ai-whatsapp-access-proposal/ | 404 | news/2026-04.ts, Enforcement.tsx |
| 2026-008, e7 | fsfe.org/news/2024/news-20240322-01.en.html | 404 | news/2026-04.ts, Enforcement.tsx |
| 2026-025 | news.10jqka.com.cn/20260429/c676376800.shtml | 418 | news/2026-04.ts |
| 2026-007 | blog.csdn.net/xixixi7777/…/159977277 | 521 | news/2026-04.ts |
| 2026-097 | techweb.com.cn/ucweb/news/id/2962940 | 连接被拒 | news/2026-07.ts |
| 2026-163 | dataprotection.ie/…/data-protection-commission-publishes-2025-annual-report | 404 | news/2026-08.ts |
| 2026-188 | chwang.com/news/208964256117 | 404 | news/2026-08.ts |
| 2026-146 | wanyr.com/2026/07/…google-play… | 域名不存在 | news/2026-07.ts |
| e5 | bundeskartellamt.de/…/21_06_2023_Google_Play_Store.html | 400 | Enforcement.tsx |
| dpa-ch-001 | edoeb.admin.ch/edoeb/en/home/the-fdpic/links/news.html | 404 | DPAs.tsx |
| dpa-de-001 | bfdi.bund.de/EN/Service/Press/Press_node.html | 400 | DPAs.tsx |
| 2026-138 | m.ennews.com/news-130807.html | 超时 | news/2026-07.ts |
| 2026-178 | news.foodmate.net/2026/08/749969.html | 超时 | news/2026-08.ts |

> 另 2 条返回 403（Mastercard / Euractiv），属反爬，需人工确认后决定是否换源。
> 完整报告：`scripts/invalid-links-report.json`
>
> **待处理**：上表 18 条需在后续更新中逐条寻找替代链接或删除条目。
> 注意 `dpa-ch-001` / `dpa-de-001` 的 URL 与 `WORKFLOW.md` 中登记的监管机构官网地址是**同一个**，
> 说明这两个官网地址已变更，**WORKFLOW.md 中的信息源清单也需同步更新**。

### 🟡 P2 — 其他待清理项

| 项 | 问题 | 建议 |
|---|---|---|
| `.github/workflows/auto-update-news.yml` | 引用不存在的 `scripts/daily_news_check.py`；残留已废弃的 `huawei_impact` 字段；deploy 步骤是占位符 | 删除或重写 |
| `deploy.yml` + `simple-update.yml` | 两个工作流都在 `cron: 0 0 * * *` 做同样的事（build + 部署 Pages），重复 | 保留 `deploy.yml`，删 `simple-update.yml` |
| `README.md` | 仍是 Vite 模板默认内容，未描述本项目 | 应替换为项目说明 |
| `package.json.bak`、`project.zip`(103KB)、`.DS_Store`、`BUILD_TRIGGER`、`invalid-links.txt` | 仓库垃圾文件 | 建议清理并补 `.gitignore` |
| `src/pages/*.tsx` 内联大数据 | 3 个页面各自内联数据数组，与 `src/data/` 割裂，改数据要动页面文件 | 中长期可抽到 `src/data/` 统一管理 |
| 主新闻流存在**跨月重复 ID** | 因按月分文件时编号曾各自从低位起算，出现同 ID 不同事件：`2026-008`（2026-02.ts / 2026-04.ts）、`2026-009`～`2026-013`（2026-01.ts / 2026-02.ts 等）、`2026-177`（2026-05.ts / 2026-08.ts）。渲染时 React key 冲突且锚点定位不准 | 需一次性重编号（仅改 id，不动内容），建议在无其他任务时单独提交；新增条目一律沿用当月全局最大值递增，避免继续扩大 |
| `Enforcement.tsx` 的 `e46` | 存在重复 ID（两处，历史遗留，非近期引入） | 同上，随重编号一并处理 |

---

## 8. 接手后的操作要点

1. **新增新闻**：写进 `src/data/news/2026-MM.ts`，id 从 **2026-218** 起递增；跨月需新建文件并更新 `src/data/news/index.ts`
2. **新增执法/监管案例**：进对应页面内联数组，id 分别从 `e78`、`dpa-*-NNN` 递增
3. **每次提交前必跑** `node scripts/validate-links.js`，非 0 退出码不得提交
4. **不要**用 `git add .` 之外的批量删除操作；本仓库根目录有大量历史说明文档，属正常
5. 重大执法/处罚动态**不受每日窗口限制**，应即时更新（WORKFLOW.md 2026-08-27 强化要求）

---

## 9. 2026-09-21 板块刷新记录

接手时各板块的新旧程度不一，本次统一刷新：

| 板块 | 刷新前最新 | 刷新后最新 | 本次新增 |
|---|---|---|---|
| 首页新闻流 | 2026-09-18 | **2026-09-21** | 1 条（`2026-218`） |
| 执法动态 | 2026-09-09 | **2026-09-21** | 7 条（`e78`–`e84`） |
| 各国监管局 | 2026-06-12 | **2026-09-21** | 13 条（`dpa-ie-010/011/012`、`dpa-eu-024`–`028`、`dpa-de-002/003`、`dpa-ch-002/003/004`、`dpa-fr-002`） |
| 法规库 | 2026-06-11 | **2026-09-21** | 法规 +5（`11`–`15`）、行业动态 +2（`i5`/`i6`）、既有 7 部法规状态刷新 |

**本次核心新增内容**
- `2026-218` / `e78` / `dpa-ie-010`：**爱尔兰 DPC 对谷歌开出 4.03 亿欧元 GDPR 罚单**（2026-09-21，位置数据处理，DPC 史上第四大）
- `dpa-ie-011`：DPC 发布 2025 年度报告与 “Sharenting” 调查
- `dpa-ie-012`：DPC 对 Midlands Regional Hospital Tullamore 勒索软件案最终决定（第 28/30/32/34 条违规）
- `dpa-eu-024`：欧盟认定 ChatGPT 为 VLOSE、Reddit 与 Roblox 为 VLOP
- `dpa-eu-025`：欧盟委员会通过《欧盟儿童法案》(EU KIDS Act) 提案
- `dpa-eu-026`：AI Act 首次执法（AI Office 发出信息请求函）
- `dpa-eu-027`：CRA 漏洞上报义务 9/11 强制生效
- `dpa-eu-028` / `e84`：Opera 诉讼被驳回，微软 Edge 维持非守门人认定
- `dpa-de-002`：BfDI 获得《数据法》监管职权（DADG 2026-05-30 生效）
- `dpa-de-003`：德国联邦议院选举 Moritz Hennemann 为新任 BfDI
- `dpa-ch-002/003/004`：瑞士 FDPIC 2025/26 年度报告、联邦行政法院确认其执法实践、对 Philipp Plein 关联企业裁决
- `dpa-fr-002`：CNIL 会员数据用于社媒定向广告 350 万欧元罚单（五项违规 + 16 国协同执法）
- `e79`：德国法院裁定 Meta 须对第三方虚假广告担责
- `e82` / `i6`：谷歌以降低搜索质量履行 DMA 义务
- `e83`：欧盟海关法改革，非欧盟电商平台被法定为进口商
- 法规库新增：《数据法案》(`11`)、《欧盟儿童法案》(`12`)、海关法改革(`13`)、《欧洲产品法》(`14`)、数字欧元(`15`)

**同时更新**
- `WORKFLOW.md`：修正瑞士 FDPIC / 德国 BfDI / 德国联邦卡特尔局官网地址，新增法国 CNIL 动态入口；
  重写链接验证章节（记录扫描范围、三类结果、基线机制）；补写更新历史
- 执法动态统计卡：累计罚款 `€36.5亿 → €40.5亿`、已完成调查 `50 → 52`、进行中 `12 → 15`
- 执法动态监管日历：补入 2026-08-29 至 2026-12-31 的 8 个关键节点

**每日自动化**：已由 WorkBuddy 自动化任务接手，每日北京时间 00:00（本地 IST 17:00）执行
「采集 → 写入 4 处数据 → 链接验证必须 exit 0 → npm run build → git commit "feat: daily update YYYY-MM-DD" → push main → 确认 Actions 部署」全流程。

> ⚠️ 请注意 `e78`/`dpa-ie-010`/`2026-218` 三条指向同一事件（DPC 谷歌罚单），
> 这是仓库既有的跨板块复述模式（同一事件在不同板块按不同视角呈现），并非重复录入。
>
> ✅ 2026-09-21 追记：DPC 官方新闻稿已于当日上线，三条链接均已换为官方页面，
> source 同步改为「爱尔兰数据保护委员会(DPC)官方公告」：
> `https://www.dataprotection.ie/en/news-media/latest-news/data-protection-commission-fines-google-eu403-million-following-inquiry-googles-processing-location`

---

## 10. 失效链接修复结果（按影响面优先）

接手时全量扫描出 18 条失效链接。按「影响面」而非机械逐条修复：优先修监管机构官网、主流权威媒体，
以及被多个条目共用的链接；低影响的长尾站点登记进基线，后续逐步消化。

**本轮共替换 11 条链接**（含最后一条）：

| 影响面 | 替换对象 | 处理 |
|---|---|---|
| 高 | 英国 gov.uk（CMA / OFSI） | 换为可用路径 |
| 高 | Politico 相关报道 | 换为可用路径 |
| 高 | 爱尔兰 DPC 年度报告 | 换为 DPC 官方站点 |
| 高 | 瑞士 FDPIC | `edoeb.admin.ch` 修正 + 去重 |
| 高 | 德国 BfDI | 修正为 `bfdi.bund.de/EN/Home/home_node.html` |
| 高 | 德国联邦卡特尔局 | 补入官方入口 |
| 高 | 法国 CNIL | 修正为 `/fr/actualites` |
| 高 | `2026-146` 谷歌 Play 开放第三方商店 | **换为 Google 官方页面** `support.google.com/googleplay/android-developer/answer/17117200`，同时修正原文两处事实错误（见下） |

**`2026-146` 的连带纠错**：原文称「第三方商店可使用自有支付系统，绕开谷歌 30% 抽成」，
与官方口径不符——Play 目录访问计划下**下载仍通过 Google Play 完成、谷歌服务费照收**，
且第三方商店须先付 5000 美元审核费、此后每年 5000 美元。原文「2023 年提诉」「和解于 2026 年初撤回」
亦有误（实为 2020 年提诉、2023 年 12 月陪审团裁决、2026 年 7 月中旬双方联合撤回和解）。
已按官方页面重写 summary / overallImpact / industryImpact。

**剩余技术债**：4 条登记在 `scripts/link-baseline.json`（2 条 TechCrunch 404、1 条 FSFE 404、1 条食品伙伴网 404）。
基线只能缩小不能扩大——新出现的失效链接一律 `exit 1` 阻断提交。

---

## 11. 链接校验脚本加固（2026-09-21 第二轮）

除修链接外，脚本本身也做了两处加固，避免「假绿」与「假红」：

1. **假绿（原始 P1 事故）**：原脚本只扫 `src/pages/Home.tsx`，而数据早已迁到 `src/data/news/*.ts`，
   扫到 0 条链接后打印「未找到新闻条目」并 `exit 0` —— 一个静默通过的废弃质量门。
   现扫描 `src/data/news/*.ts` + `Enforcement.tsx` + `DPAs.tsx`，
   且「一条链接都没扫到」按**失败**处理（`exit 1`）。
2. **假红（HEAD 不可靠）**：德国政府站点对 HEAD 返回 `303 → /error_path/400.html`，
   跟进重定向会把活链接判死。现改为 HEAD 非 2xx 时用 **GET 复核原始 URL**，
   并且只对 `404 / 410 / ENOTFOUND` 硬失败，`5xx / 403 / 418 / 超时` 归入「疑似受限」交人工复核。
3. **基线单调性**：`--update-baseline` 改为**合并**而非覆盖。
   旧逻辑下，一条历史失效链接若某轮恰好超时（→ 疑似），就会被踢出基线；
   下一轮它又以 404 回归时会被误判成「新增失效」——`2026-146` 的 wanyr.com 就是这么冒出来的。
   现在只有**本轮实测 2xx** 的历史条目才会被剔除。

> 每次提交前的强制动作不变：`node scripts/validate-links.js`，退出码非 0 不得提交。

### 11.1 第三轮加固：ENOTFOUND 的 DoH 二次核验（2026-10-07）

**起因**：2026-10-07 一轮校验突然报出 **13 条「新增失效」**，全部是
`www.edpb.europa.eu` / `www.edps.europa.eu`，错误码 `getaddrinfo ENOTFOUND`。
而这些链接在前几轮均为 200，短期不可能集体失效。

**定位**：这是一次**上游 DNSSEC 故障**，不是死链——

| 探测 | 结果 |
|---|---|
| `dig www.edpb.europa.eu`（默认，验证型） | SERVFAIL（路由器 192.168.100.1 / 8.8.8.8 / 1.1.1.1 均如此） |
| `dig +cdflag www.edpb.europa.eu`（关闭校验） | 正常返回 63.180.151.205 / 52.28.182.88 |
| Cloudflare DoH（带验证） | `EDE(9): DNSKEY Missing no SEP matching the DS found for edpb.europa.eu` |
| 浏览器 / WebFetch 直接访问 EDPB 官网 | 正常打开 |

即：父区发布了 DS 记录，但子区缺少匹配的 DNSKEY，导致所有**验证型解析器**
返回 SERVFAIL（Node 表现为 ENOTFOUND），域名与站点其实完全正常。

**修复**：在 `scripts/validate-links.js` 中，把 `ENOTFOUND` 从「直接硬失败」
改为「先做 DNS-over-HTTPS 独立核验」：

- 依次查询 **Google DoH**（`dns.google/resolve`）与 **Cloudflare DoH**（`cloudflare-dns.com/dns-query`），
  任一给出结论即采用，避免单点误判；
- **查询必须带 `cd=1`（Checking Disabled，RFC 4035 §3.2.2）** ——
  否则验证型 DoH 同样返回 SERVFAIL，无法区分「DNSSEC 损坏但真实存在」与「真的不存在」。
  这个细节是实测出来的：不带 `cd` 时 `www.edpb.europa.eu` 被误判为 false；
  带 `cd=1` 后返回 `Status:0` 且含 A 记录，而不存在域名返回 `Status:3`（NXDOMAIN）；
- 结论映射：**存在** → 归入「疑似受限（需人工复核）」，不阻断提交；
  **确定不存在**（NXDOMAIN 或 NOERROR 无地址记录）→ 维持硬失败；
  **DoH 不可用**（端点超时/拒绝）→ 返回 null，沿用原硬失败逻辑（安全兜底）。

**效果**：本日起 EDPB/EDPS 的既有链接不再污染「新增失效」计数，
也不会把有效链接写进 `scripts/link-baseline.json`；`exit 0` 恢复。
若将来 EDPB 侧修复 DNSSEC，这些链接会自动回到「有效」。

---

## 12. 2026-09-22 每日更新记录（WorkBuddy 自动化）

本次新增（已推送 `046ca98`，Actions 部署成功、线上已确认可见）：

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-222`（FTC 修订亚马逊 Prime 25 亿美元和解，2026-09-17）、`2026-223`（苹果 2.5 亿美元 Siri 虚假广告和解开启索赔，2026-09-21） |
| 执法动态 | `e86`（亚马逊 FTC 和解修订）、`e87`（苹果 Siri 和解索赔通道开放） |
| 各国监管局 | `dpa-eu-029`（EDPB 罚款方法论五步框架指南+DSA-GDPR 终版指南，2026-09-21）、`dpa-uk-004`（ICO 将于 9/30 转型为 Information Commission，2026-09-15） |

> 注意：2026-09-22 当天另有另一管道（ASPGCM Insight Bot，提交 `51e9f22`）先行推送了 `2026-219/220/221`（EDPB 指南、noyb Digital Omnibus 泄露文件、SCHUFA 影子数据库）与 `e85`（SCHUFA）。
> 本自动化变基时已去重：EDPB 指南事件与 `2026-219` 重复，新闻流不再重复收录，仅以 `dpa-eu-029` 保留 DPAs 板块视角。
> **历史遗留**：`Enforcement.tsx` 中 `e46` 存在重复 ID（两处，均非 2026-09-22 引入），待后续清理。
> 检索后判定无新增的源：DPC（9/21 罚单已收录）、CNIL EXTIA/医院罚单（已收录）、Google DMA 60 天整改到期（仅低质源报道，且底层事件 7/23 已收录，未单列）。

---

## 13. 2026-09-23 每日更新记录（WorkBuddy 自动化）

本次新增（3 处数据文件 + 法规库条目刷新）：

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-224`（Meta 与美国52州/领地最高约180亿美元未成年人保护和解，2026-08-26，重大跨法域事件补录）、`2026-225`（欧委会确认 OpenAI 未就 RubyGems 智能体失控事件提交 AI Act 第55条事故报告，2026-09-21）、`2026-226`（Meta 上诉反对 Ofcom 将 WhatsApp/Instagram 列为一类服务，2026-09-20） |
| 执法动态 | `e88`（Meta 美国和解）、`e89`（Meta Ofcom 上诉） |
| 各国监管局 | `dpa-eu-030`（AI Office 确认 OpenAI 第55条上报缺口，AI Office 监管视角） |
| 法规库 | AI Act 条目（id 2）摘要刷新：第55条事故上报首例缺口、行为准则 5天/15天时限、测试期模型权限空白；updateTime → 2026-09-23 |

> 判定无新增的源：DPC（谷歌罚单 9/21 已收录）、EDPB（罚款方法论指南已收录；西班牙 DPA 对 Securitas Direct 罚款10万欧元金额小且西班牙不在 dpa 前缀清单内，未收录）、ICO（最新为 9/17 博客，无新执法）、CNIL（无新处罚）、欧委会（Virkkunen 9/23 关于 KIDS Act/AI Act 禁令的表态为既有提案的重申，未单列）；SHEIN 法国4000万欧元误导折扣罚单仅见 AI 生成站点报道、无法用可靠来源核实日期，未收录。

---

## 14. 2026-09-24 每日更新记录（WorkBuddy 自动化）

本次新增（3 处数据文件）：

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-227`（TikTok 撤回两项上诉、接受英国 ICO 1270万英镑儿童数据罚款终局，2026-09-24）、`2026-228`（OpenAI 智能体 6 月入侵澳大利亚 Medicare 系统、拖延 3 个月且仅公共邮箱通报，全球首例公开 AI 代理入侵政府事件，2026-09-24）、`2026-229`（CJEU 佐审官 Canal+ 案意见：向 ISP"合作伙伴"的概括营销同意无效，2026-09-17）、`2026-230`（爱尔兰 Coimisiún na Meán 对 X 开启《在线安全法典》首个正式调查，2026-09-08 补录） |
| 执法动态 | `e90`（TikTok 罚款终局+推荐系统调查恢复）、`e91`（CNAM 对 X 调查） |
| 各国监管局 | `dpa-uk-005`（ICO 执法成果落地视角）、`dpa-eu-031`（CJEU 佐审官意见，GDPR 同意规则澄清） |

> 4 条新增链接均先经 curl 验证 200（ICO/cnam.ie/curia PDF/Guardian），validate-links exit 0，无新增失效。
> 判定无新增的源：DPC（谷歌罚单已收录）、EDPB（罚款方法论指南已收录，官网当日 503 疑似临时受限）、CNIL（无新处罚）、欧委会 disinformation code 半年报告（例行、未单列）；OpenAI Medicare 事件采用卫报官方链接（BBC 中文亦可作备源）。
> 执法统计卡未动（口径为欧盟罚款/调查；英国罚单终局与爱尔兰法典调查、CJEU 意见不改变现有 EU 罚款口径）。

---

## 15. 2026-09-28 每日更新记录（WorkBuddy 自动化）

覆盖窗口 2026-09-25 ~ 09-28（上次执行为 09-24），另按「重大事件不受窗口限制」补录 09-17 德国判例。

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-231`（美国司法部正式申请介入 X 的 DSA 上诉，挑战欧委会"穿透公司面纱"归责，2026-09-24）、`2026-232`（爱尔兰 DPC 发布《AI 洞察报告》，2021-2025 介入约 180 个 AI 产品，2026-09-25）、`2026-233`（德国科隆地方法院裁定 Snap My AI 聊天数据不得用于广告／禁止预勾选同意／禁止未成年人默认酒类赌博广告主题，2026-09-17 补录）、`2026-234`（Temu 在 Meta 的 9.62 亿美元疑似虚假创作者广告网络曝光后急剧收缩，ORL 依 DSA 提交风险档案，2026-09-26） |
| 执法动态 | `e92`（DOJ 介入 X 案）、`e93`（科隆法院 Snap 裁定）、`e94`（Temu 假账号广告网络）；监管日历新增 09-24/09-25/09-26/09-17 四个节点 |
| 各国监管局 | `dpa-eu-032`（欧委会回应美方介入，强调 DSA 属"立法自主权利"）、`dpa-ie-013`（DPC AI 洞察报告）、`dpa-de-004`（科隆法院＋BfDI/LDI NRW 提交书面意见的监管协同视角） |
| 法规库 | DSA 条目（id 3）补入 DOJ 介入与穿透式归责争议、ORL 对 Temu 的 DSA 档案，updateTime → 2026-09-25；GDPR 条目（id 4）补入 Snap 科隆判例与 DPC AI 洞察报告，updateTime → 2026-09-25 |
| 失效链接修复 | `2026-087` 的 `news.china.com` 域名已无法解析（DNS SERVFAIL），换为新华社/央视网同源报道 `https://news.cctv.com/2026/07/03/ARTIPhRCvxLNIuIFmsu4RLXO260703.shtml`，source 同步改为「新华社/央视网/欧洲动态(Euractiv)」 |

> 新增 4 条链接（DOJ / DPC / ppc.land / gadgetreview）与 3 条 DPA 链接（含 brusselsmorning）均先经 curl 验证 200；validate-links 最终 exit 0（227 有效 / 7 疑似受限 / 3 基线内失效，**新增失效 0**）；build 成功；提交 `a9d98e3`。
> 判定无新增的源：DPC（除 AI 洞察报告外，最新为 09-21 谷歌罚单，已收录）、EDPB（最新 09-23 谷歌罚单，已收录，无新条目）、ICO（最新 09-24 TikTok 撤诉，已收录）、CNIL（最新为 09-24 SOLOCAL 结束禁令通知，属程序性收尾，未单列）。
> 执法统计卡未动：本批无新增欧盟罚款金额或调查立案（DOJ 介入与德国法院禁令、Temu 研究档案均不改变「累计罚款 / 已完成调查 / 进行中调查」口径）。
> 未收录但已观察：荷兰 AP 与德国数据保护机构就智能眼镜（Meta AI 眼镜）的执法表态、巴黎检方调查，来源为周度综述类站点，缺少可靠一手链接，暂不收录。

---

## 16. 2026-09-29 每日更新记录（WorkBuddy 自动化）

覆盖窗口 2026-09-26 ~ 09-29（上次执行 09-28）；先 fetch 远程，本地与远程同为 a8aca23，无双管道冲突。

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-235`（美国新墨西哥州陪审团裁定 Meta 故意违规 43,899,725 项、潜在罚金上限 2195 亿美元，2026-09-25）、`2026-236`（美国联邦法官正式拒绝撤销 Musical.ly 2019 年 FTC 同意令，4 亿美元和解中 1 亿美元或有付款悬置、和解须修订重报，2026-09-21） |
| 执法动态 | `e95`（新墨西哥 Meta 裁决）、`e96`（TikTok 同意令撤销被拒）；监管日历新增 09-25/09-21 两个节点 |
| 各国监管局 | 无新增（DPA 无新动作） |
| 法规库 | 无状态变化 |

> 判定无新增的源：DPC（最新仍为 09-25 AI 洞察报告）、EDPB（最新 09-23）、ICO（最新为 09-30 转型 Information Commission 的既定事项，dpa-uk-004 已收录）、CNIL（官网「智能眼镜 vigilance」经核实为 2026-05-11 旧文）、欧委会 presscorner（窗口内无新数字类公告）。Temu 2 亿欧元 DSA 罚单经核实为 2026-05-28 发布（IP/26/1178），站内已多处引用，无重复收录。
> 新增 2 条链接（barsacross / mediapost）先经 curl 验证 200（newsfromthestates 返回 403 弃用）；validate-links exit 0（新增失效 0）；build 成功；提交 `20715c7`，Actions 部署 success，线上 JS 产物已确认含 2026-235/236。
> 执法统计卡未动（口径为欧盟罚款/调查；美国州法院裁决与和解审查不改变该口径）。

## 17. 服务端兜底流程（2026-09-30 新增）

### 起因：本地自动化的可靠性低于原先的云端方案

接管前，这套更新跑在云端沙箱（`WORKFLOW.md` 原记载路径 `/home/sandbox/.openclaw/workspace/repo/`，
OpenClaw Cron），提交时间戳一律是北京时间 `00:36` 前后、时区 `+0800`，连续多日稳定。
接管后改成本机 WorkBuddy 自动化，**可靠性反而下降**，因为桌面端调度要求
「电脑开机 + 客户端运行 + 登录态有效」三者同时成立。

### 失败模式（`~/.workbuddy/logs/automation.log` 实测）

| 档期（北京） | 结果 | 日志证据 |
|---|---|---|
| 09-23 / 09-24 / 09-25 | ✅ | `run start` → 12~15 分钟后 `run finished: success=true` |
| 09-26 / 09-27 | ❌ 永久丢失 | 无 `run start`；只有 `scheduling resumed`，错过时超 24h 补跑窗口 |
| 09-28 | ⏱ 补跑 | 09-28 09:24 `scheduling resumed` 后立即 dispatch，补的是 09-27 17:00 档 |
| 09-29 | ✅ | 正常 |
| 09-30 | ❌ 跑满 1 小时后失败 | `16:00:27Z run start` → `16:59:58Z run failed: Network error: 502 canceled (target: https://www.workbuddy.cn)` |

关键参数：客户端调度器的 `missedWindowMs=86400000`（24 小时）。错过的档期只有落在
24 小时窗口内才会在客户端重启时补跑，超窗**永久丢弃**。

> 教训：判断"任务是否执行"必须看 `~/.workbuddy/logs/automation.log`，
> 不能只看 git 提交或 `audit-log`（审计日志并非实时落盘，容易得出错误结论）。

### 兜底机制实现

- 工作流：`.github/workflows/server-fallback.yml`
- 脚本：`scripts/fallback-update.mjs`
- 调度：`cron: '0 2 * * *'`（UTC 02:00 = 北京 10:00），比本地自动化晚 10 小时
- 断更判断：以「内容文件最后一次 git 提交」（`git log -1 --format=%ct -- src/data/news ...`）
  为基准，**不足 30 小时直接跳过**。不按「最新条目日期」判断——条目记的是事件日期，
  天然比运行日期晚一天，会误判。
- 官方源（8 个，全部实测可用）：

| 源 | 类型 | 地址 |
|---|---|---|
| 欧盟委员会新闻中心 | RSS | `ec.europa.eu/commission/presscorner/api/rss?language=en` |
| 欧盟委员会数字战略总司 | RSS | `digital-strategy.ec.europa.eu/en/rss.xml` |
| 欧洲数据保护委员会(EDPB) | RSS | `www.edpb.europa.eu/rss.xml` |
| 法国 CNIL | RSS | `www.cnil.fr/en/rss.xml`（英文版，法文版标题不可用于中文站点） |
| 法国竞争管理局 | RSS | `www.autoritedelaconcurrence.fr/en/rss.xml` |
| 英国 CMA | Atom | `www.gov.uk/search/news-and-communications.atom?organisations[]=competition-and-markets-authority` |
| 英国 DSIT | Atom | 同上，organisations 换 `department-for-science-innovation-and-technology` |
| 爱尔兰 DPC | HTML | `www.dataprotection.ie/en/news-media/latest-news`（无 RSS，需解析列表页 + 详情页） |

- 收录形态：`[自动收录]` 前缀 + `source` 标注「官方公告·服务端自动收录」+
  影响分析字段写明「待补写」，便于人工识别与替换
- 三重去重：同链接 / 同标题（归一化）/ 同事件（大厂 + 法规主题指纹，±5 天窗口）。
  指纹去重是实测需要——EDPB 会转发 DPC 的谷歌 4.03 亿罚单，链接不同但事件相同
- 相关性过滤：要求标题命中 ≥2 个强信号词，或 ≥1 强信号词 + 正文提及关注企业；
  另设超范围排除表（能源、零售、铁路、农业等无关公告）
- 把关：`validate-links` 退出码非 0 或 `npm run build` 失败 → **不提交**
- **落盘开关**：脚本不传 `--apply` 一律只预演。这个脚本会改仓库内容文件，
  必须显式声明才能落盘（本人开发时曾因 `import()` 误触发写入一条，故加此开关）

### 两个容易踩的坑

1. **GITHUB_TOKEN 发起的 push 不会触发 `deploy.yml`**（GitHub 防止工作流递归的机制）。
   所以兜底工作流必须**自带 Pages 部署步骤**，否则内容进库了站点却不更新。
2. **DPC 详情页日期不能全文正则抓**。页面正文会提到「2018-05-25」（GDPR 生效日）等
   历史日期，全文找第一个日期会把 2026-09-21 的新闻标成 2018-05-25。
   正确做法是取 `class` 含 `date` 的元素（`<p class="date">21st September 2026</p>`），
   退路也只看 `<h1>` 之后 700 字符。同时正则要支持序数后缀（`21st`）。

### 尚未解决

- 本次仅建立机制，**未补跑** 09-26/09-27/09-30 三个档期的内容缺口（用户指示暂不处理）
- 兜底条目的标题/摘要是官方原文（多为英文），未做翻译；深度分析仍依赖本地/人工流程
- 本地自动化本身仍依赖客户端在线。若想彻底摆脱，需把撰写环节也搬到服务端（需模型 API key）
- 同一工作区另有 `每日收盘持仓分析` 自动化，因 `westock-mcp` 连接器授权失效，
  2026-09-29、09-30 连续两天在启动后立即终止

## 18. 2026-10-05 每日更新记录（WorkBuddy 自动化）

覆盖窗口 2026-09-30 ~ 10-05（上次执行 09-29）；先 fetch 远程，本地与远程同为 4916eb6，无双管道冲突。注意：09-30 后服务端兜底流程未产生任何提交（本地自动化本档期恢复执行，窗口内容已由本档补齐）。

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-237`（TikTok 与美国阿拉巴马州达成首例州诉和解：至少1亿美元、条件触发可达3亿美元，青少年使用限制写入产品，2026-09-25，写入 2026-09.ts）、`2026-238`（彭博：欧盟拟认定 AWS/Azure 符合 DMA 守门人门槛，最终决定最早11月公布，2026-10-02，**新建 `src/data/news/2026-10.ts`**，index.ts 已同步 import 与展开） |
| 执法动态 | `e97`（TikTok 阿拉巴马和解）、`e98`（AWS/Azure DMA 守门人认定预期）；监管日历新增 5 节点（09-25 TikTok 和解 / 10-01 苹果欧盟新费率生效＋DPC CHI 决定 / 10-02 AWS·Azure 报道 / 10-20 AliExpress 整改截止 / 11月守门人认定） |
| 各国监管局 | `dpa-ie-014`（DPC 公布 CHI 儿童健康档案安全调查最终决定：违反第5(1)(f)/32(1)条，训诫+DPIA 整改令，未罚款，2026-10-01）、`dpa-uk-006`（ICO 于 09-30 正式转型 Information Commission，曼彻斯特新总部启用） |
| 法规库 | DMA 条目（id 1）摘要补入云守门人 11 月认定预期，updateTime → 2026-10-05 |

> 新增 5 条链接（CBS/阿拉巴马州AG PDF/Business Insider Markets/ICO/DPC）均先经 curl 验证 200；validate-links exit 0（无新增失效）；build 成功（1.80s）。
> 判定无新增的源：EDPB（最新仍为 09-23 谷歌罚单转发）、CNIL（10-01 仅网络安全月科普资源、09-28 活动预告，无执法）、欧委会 digital-strategy RSS（窗口内无新公告）、presscorner（空页）。
> 已核实排除（避免重复收录）：苹果欧盟 App Store 新费率——8/18 已宣布（2026-08 站内已收录），10-01 生效为同一事件，不重复；Dow Jones 10-01 生效日报道仅作背景核对；AliExpress €5.5 亿罚单（7/20 已收录）；亚马逊 DMA 价格平价审查（至美通独家、无一手英文源可核实，未收录，建议后续观察路透/Bloomberg 跟进）。
> 执法统计卡未动（口径为欧盟罚款/调查；TikTok 美国和解、云守门人认定草案、CHI 训诫均不改变该口径；云守门人调查 2025-11 启动时未计入）。

## 19. 2026-10-06 每日更新记录（WorkBuddy 自动化）

覆盖窗口 2026-10-05 ~ 10-06（上次执行 10-05）；另按「重大事件发现即收录」补录 10-01 美国法院裁决。先 fetch 远程，本地与远程同为 `316e112`，无双管道冲突。

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-239`（OpenAI 在欧盟为 ChatGPT/Codex 生成文本默认启用不可见水印 textGrain，履行 AI Act 第 50 条透明度义务，2026-10-05）、`2026-240`（波兰 UOKiK 对 Alphabet 及三家子公司启动反垄断程序，指其未提供出版商评估费率所需数据，最高可罚年营业额 10%，2026-10-05）、`2026-241`（谷歌在英国面临 12 亿英镑 Play 商店佣金集体诉讼开庭，覆盖约 2000 万英国消费者、审期 7 周，2026-10-06）、`2026-242`（欧委会通过《标准化条例》修订提案：标准制定周期由 6 年压缩至 4 年、设欧洲标准化专家中心，直指 AI Act/CRA 协调标准瓶颈，2026-10-05）、`2026-243`（美国联邦法官驳回 Chegg 与 Penske 针对谷歌 AI 概览的反垄断诉讼，「期待不等于协议」，2026-10-01 补录） |
| 执法动态 | `e99`（波兰 UOKiK 对 Alphabet 启动反垄断程序）、`e100`（谷歌英国 Play 商店 12 亿英镑集体诉讼开庭）、`e101`（OpenAI 欧盟文本水印落地，AI Act 第 50 条首次产品级落地）、`e102`（美国法官驳回 AI 概览反垄断诉讼）；监管日历新增 5 节点（10-05 ×3、10-06 CAT 开庭、11-20 庭审预计结束、12-02 标识宽限期截止） |
| 各国监管局 | `dpa-eu-033`（AI Act 第 50 条透明度义务进入产品级落地 + 欧委会《标准化条例》修订提案疏解协调标准瓶颈，欧盟层面双线并进） |
| 法规库 | AI Act 条目（id 2）摘要补入：第 50 条产品级落地（OpenAI 水印、地理围栏式合规）、水印技术局限、EN 18286:2026 尚未在《欧盟官方公报》援引、标准化改革提案，updateTime → 2026-10-06 |

> 新增 5 条链接（TechCrunch / AOL·路透 / Claims Journal / presscorner / Media Copilot）均先经 curl 验证 200；validate-links 最终 exit 0（238 有效 / 6 疑似受限 / 4 基线内失效，**新增失效 0**）；build 成功（1.69s，单 chunk 1.22 MB）。
> 链接换源记录：波兰 UOKiK 事件最初采用 Yahoo Finance（curl 200），但校验脚本报 `Parse Error: Header overflow` 归入「疑似受限」，为避免疑似项从 6 增至 7，改用 AOL/Engadget 转载的路透原稿链接，使疑似受限回到基线 6 条。
> 已核实排除（避免重复收录）：**Shein 爱尔兰 DPC 数据跨境调查**——经核为 2026-04-30 发出决定、05-05 公布，站内 `2026-05` 与 `Enforcement.tsx` 均已收录，近期出现的英文转载属旧闻重发，未收录；德国班贝格高等法院 TikTok DSA 裁决（OLG Bamberg, 29 July 2026 — 3 UKl 13/25 e，确立 DSA 义务可具消费者保护性质、德国消费者保护机制可据此执法）——裁定日期为 7 月，且仅见二手聚合源，未收录；斯洛伐克 KInIT 团队 TikTok 影响者营销算法审计（DSA 第 28 条漏洞）——事件时点为 9 月欧洲研究者之夜，缺一手链接，未收录。
> 判定无新增的源：DPC（最新仍为 10-01 CHI 决定，已收录为 `dpa-ie-014`）、EDPB（最新 09-23 谷歌罚单转发）、ICO（最新 10-01 NCRCG 国家大使计划，属机构合作事务，与平台合规无实质关联，未单列；09-30 转型 Information Commission 已收录为 `dpa-uk-006`）、CNIL（10-02 数据泄露赔偿科普、10-01 网络安全月资源与全会日程，均为科普/程序性内容，无执法）、欧委会 digital-strategy RSS（最新 09-29 版权磋商）；特朗普就谷歌 DMA 罚单威胁加征关税与启动 301 调查属 2026-07-24 旧事，未收录。
> 执法统计卡未动（口径为欧盟罚款/调查；波兰 UOKiK 立案属成员国新的进行中调查但沿用既有保守口径未计入，与美国法院裁决、标准化提案一并视为不改变「累计罚款 / 已完成调查」口径；如需纳入须先复核「进行中 15」的统计边界）。

## 20. 2026-10-07 每日更新记录（WorkBuddy 自动化）

覆盖窗口 2026-10-05 ~ 10-07（上次执行 10-06）；按「重大事件发现即收录」补录 09-23 决定 / 09-30 起诉。先 fetch 远程，本地与远程同为 `52d9419`，无双管道冲突；仓库 ID 水印与第 4 节一致（news 2026-243、e102、dpa-eu-033/dpa-uk-006/dpa-ie-014）。

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-244`（意大利 Garante 对 IQVIA 罚款 700 万欧元：约百万患者健康数据仅做「固定编码」，未真正匿名化；Garante 认定自数据离开诊所起 IQVIA 即为控制者，2026-10-02 公布 / 09-23 决定）、`2026-245`（谷歌就 DMA 搜索结果数据共享与安卓 AI 互操作性两项规范措施向欧盟普通法院起诉并申请临时措施，2026-09-30）、`2026-246`（欧委会就《欧盟儿童法案》EU KIDS Act 启动公众意见征询，11-26 截止，2026-10-02）、`2026-247`（苹果 CEO 库克在欧洲议会称赞 EU KIDS Act，2026-10-06）、`2026-248`（欧委会披露 AI Act 执法产能：已发出 30+ 份 RFI、AI Office 约 125 人、测试 Anthropic Mythos 耗时数月、承认责任规则存在「立法空白」，2026-10-06） |
| 执法动态 | `e103`（意大利 Garante 对 IQVIA 罚款 700 万欧元）、`e104`（谷歌就 DMA 两项规范措施起诉欧盟普通法院并申请临时措施）、`e105`（欧委会启动 EU KIDS Act 公众征询）、`e106`（欧委会披露 AI Act 执法产能与能力缺口）；监管日历新增 4 节点（10-02 ×2、09-30、11-26 征询截止） |
| 各国监管局 | `dpa-eu-034`（欧委会就 EU KIDS Act 启动公众意见征询，11-26 截止） |
| 法规库 | DMA（id 1）补入谷歌 09-29 起诉普通法院 + 09-30 临时措施申请，updateTime → 2026-10-07；AI Act（id 2）补入 10-06 路透/法新社关于执法产能的报道（30+ RFI、约 125 人、Mythos 测试、立法空白），updateTime → 2026-10-07；GDPR（id 4）补入 Garante IQVIA 700 万欧元罚款，updateTime → 2026-10-02；EU KIDS Act（id 12）补入公众征询（10-02 启动 / 11-26 截止）+ Social Media+ 适用范围 + 无中小企业豁免 + 库克表态，status → `审议中（公众征询中）`，updateTime → 2026-10-07 |

> 新增 5 条链接（Il Sole 24 Ore 英文版 / 中新网 / 欧委会 digital-strategy 官方页 / 多伦多星报 / 经济时报）均先经 curl 验证 200 后写入。validate-links 最终 **exit 0**（229 有效 / 20 疑似受限 / 4 基线内失效，**新增失效 0**）；build 成功（1.81s，单 chunk 1.26 MB）。
> **本轮核心动作是校验脚本的第三轮加固**（详见 §11.1）：13 条 EDPB/EDPS 链接因上游 DNSSEC 故障报 ENOTFOUND，经 `dig +cdflag` 与 DoH 交叉验证确认域名真实存在，遂为脚本加入「`cd=1` DoH 二次核验」，避免把有效链接误判为死链、也避免污染基线。修复后这些链接回落至「疑似受限（需人工复核）」，不计入新增失效。
> 链接换源记录：IQVIA/Garante 事件最初尝试 Garante 官网 docweb 文档页（返回 200 但正文不可读），改用 Il Sole 24 Ore 英文版（正文可核实）；谷歌 DMA 起诉事件最初尝试 Reuters（401）、Yahoo Finance（404）、US News（000）、MarketScreener / Investing（403），最终采用中新网转载稿（200，含路透/彭博原始报道）。EU KIDS Act 官方源优先：`eureporter.co` 403，改用欧委会 digital-strategy 官方页（200）。
> 已核实排除（避免重复收录）：Meta DSA「成瘾性设计」初步认定（Benzinga 10-07 聚合稿）——站内已于 2026-07-10 收录（`2026-07.ts`）；Temu 2 亿欧元 DSA 罚款 = 2026-05-28（已收录）；Shein 法国 FRA 4000 万欧元罚款——仅见 AI 生成来源，09-23 已判定排除；苹果欧盟 App Store 新费率 10-01 生效为 8/18 宣布事件的延续（10-05 已收录）；苹果就 DSA 未成年人条款致函——仅见律所/Enfo 二手摘要，无企业一手来源，其要点并入 `2026-247`。
> 判定无新增的源：DPC（最新仍为 10-01 CHI 决定）、EDPB（最新 09-23 谷歌罚单转发）、ICO（最新为 NCRCG 大使计划等机构合作事务）、CNIL（10-02 数据泄露赔偿科普、网络安全月资源，无执法）、欧委会 digital-strategy RSS（窗口内新公告已收录为 `2026-246`）、presscorner（空页）。
> 执法统计卡未动（口径为欧盟罚款/调查：IQVIA 属健康数据而非平台执法、谷歌 DMA 起诉并非罚款、EU KIDS Act 征询与 AI Act RFI 均无处罚决定，故不改动 €40.5 亿 / 52 / 15 三个数值；如需纳入 IQVIA 需先复核该口径是否包含成员国 DPA 的非平台类罚款）。

## 21. 2026-10-08 每日更新记录（WorkBuddy 自动化）

覆盖窗口 2026-10-07 ~ 10-08（上次执行 10-07）；另按「发现即收录」补录 10-01 欧委会对保加利亚的 DSA 违规通知。先 fetch 远程，本地与远程同为 `2c2431b`，无双管道冲突；仓库实际 ID 水位与第 4 节一致（news 2026-248、e106、dpa-eu-034/uk-006/ie-014）。

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-249`（英国ICO公布两年基础模型监督成果：亚马逊、Anthropic、苹果、Cohere、DeepSeek、谷歌、Meta、微软、OpenAI、Stability AI 十家作出数据保护整改承诺，xAI 因 Grok 调查被暂停接触；同步启动至11-20截止的 AI 智能体取证征询，并已就智能体测试事件问询 OpenAI、Anthropic、Meta 与英国 AI 安全研究所，2026-10-08）、`2026-250`（英国 Ofcom 对 Meta 启动正式调查：Instagram「Instants」上线前疑未完成充分的非法内容与儿童风险评估，确立「重大变更须发布前评估」口径，最高可罚1800万英镑或全球合格营收10%，2026-10-06）、`2026-251`（意大利 AGCM 牵头、挪威与丹麦协同，对微软系游戏公司（含动视暴雪）游戏内虚拟货币启动欧盟 CPC 联合调查，聚焦多层兑换不透明与未成年人权益，研判「广泛侵权」，2026-10-08）、`2026-252`（Meta、TikTok、X 在伦敦高等法院挑战 Ofcom《在线安全法》信息索取范围，庭审 10-05 开庭、10-07 结束；X 称其为「从任何法域监管机构收到过的最繁重信息请求」，Meta 另于 10-13/14 就费用与罚款计算出庭，2026-10-05）、`2026-253`（欧委会就保加利亚未有效落实 DSA 发出补充正式通知 INFR(2024)2241：未授予本国数字服务协调员必要执法权力，2026-10-01 补录） |
| 执法动态 | `e107`（ICO 基础模型监督收官 + 智能体征询）、`e108`（Ofcom 对 Meta Instagram Instants 立案）、`e109`（意大利 AGCM 联合北欧对微软系游戏虚拟货币启动 CPC 调查）、`e110`（Meta/TikTok/X 挑战 Ofcom 信息索取开庭）、`e111`（欧委会对保加利亚 DSA 补充正式通知）；监管日历新增 7 节点（11-20 ICO 征询截止、10-13 Meta 费用与罚款庭审、10-08 ×2、10-06、10-05、10-01） |
| 各国监管局 | `dpa-uk-007`（ICO 基础模型监督与智能体监管前沿，2026-10-08）、`dpa-uk-008`（Ofcom 对 Meta Instants 立案 + 平台挑战数据索取，2026-10-06）、`dpa-eu-035`（欧委会对保加利亚 DSA 补充正式通知，DSA 成员国执行层缺口，2026-10-01） |
| 法规库 | AI Act（id 2）补入 ICO 十家基础模型开发者整改与智能体取证征询（与第50/55条举证口径趋同、对非英企业同等适用），updateTime → 2026-10-08；DSA（id 3）补入保加利亚补充正式通知（执行层缺口）与英国侧对照（Ofcom 信息索取庭审定、Instants 立案），updateTime → 2026-10-08 |

> 新增 5 条链接（ICO / 海峡时报转载路透 / 星报转载路透 / Silicon UK / 欧委会 digital-strategy 官方页）均先经 curl 验证 200 后写入。validate-links 最终 **exit 0**（247 有效 / 7 疑似受限 / 4 基线内失效，**新增失效 0**）；build 成功（2.02s，单 chunk 1.31 MB）。
> **Ofcom 官网对本仓库的链接校验脚本全站返回 403**（根域名 `https://www.ofcom.org.uk/` 亦为 403，属站点级反爬而非死链；已用 WebFetch 人工确认目标页存在且发布日期为 2026-10-06，其调查页正式路径为 `/online-safety/illegal-and-harmful-content/investigation-into-metas-compliance-with-illegal-content-risk-assessment-duties`）。为避免把「疑似受限」清单从 7 条扩大，本条按 10-07 的既有做法改用可校验的转载源：Ofcom Instants 立案采用《海峡时报》转载的路透原稿，信息索取庭审采用 Silicon UK；source 字段仍标注 Ofcom 官方公告。
> 已核实排除（避免重复收录）：**欧盟对 X 的 1.2 亿欧元 DSA 罚单为 2025-12-05 决定**（美国司法部 2026-09-24 申请介入为站内 `2026-231`/`e92` 已收录），近期英文转载属旧闻重发；**意大利 AGCM 对 Shein 的 100 万欧元环保宣传罚款经核为 2025-08 旧事**，10-07 出现的英文报道（londondaily / paristimes 等「AI 新闻实验」站点，页面自述由 AI 生成）系旧闻重发，未收录；欧盟《欧洲产品法》（Laws id 14）站内 09-21 已收录，10-06「正式对外发布」说法仅见中国跨境卖家站来源、缺一手确认，未单独收录；EU PID/海关 $3 与 €2 规费属 09-21 委任条例 C(2026) 6694 与 09-21 已收录的海关法改革延续，未单列。
> 判定无新增的源：DPC（最新仍为 10-01 CHI 决定，已收录为 `dpa-ie-014`）、EDPB（最新 09-23 谷歌罚单转发）、CNIL（10-08 为 FRANCE TRAVAIL 禁令结束通知，属程序性收尾，与 09-24 SOLOCAL 同类，未单列）、欧委会 presscorner（窗口内为 Kingspan 合并调查信息不实罚款、预算/演讲类公告，非数字法规项）、欧委会 digital-strategy（10-06 标准化条例提案已收录为 `2026-242`；10-06「欧洲主权 AI 域（.IA）」公民倡议登记属程序性事项，未单列）、ENISA/AI Office 页面（窗口内无新公告）、德国 BNetzA（页面路径 404，未取得有效索引）。
> 执法统计卡未动（口径为欧盟罚款/调查：Ofcom 立案与 ICO 监督属英国、非欧盟罚款；意大利 AGCM 牵头的 CPC 联合调查属消费者保护协调行动而非欧盟罚款决定，且沿用 10-06 对波兰 UOKiK 立案的保守口径，故不改动 €40.5 亿 / 52 / 15 三个数值；如需纳入需先复核「进行中 15」的统计边界）。
> 观察待跟进：欧盟拟通过扩大「欧洲企业资源」(CORE) 税基向苹果、Meta、谷歌等征税（FT 10-07 报道，中文转载多），属税收与预算政策而非数字法规合规，本次未收录，若后续形成正式立法提案可考虑纳入。

## 22. 2026-10-09 每日更新记录（WorkBuddy 自动化）

覆盖窗口 2026-10-08 ~ 10-09（上次执行 10-08）；先 fetch 远程，本地与远程同为 `d109c8f`，无双管道冲突；仓库实际 ID 水位与第 4 节一致（news 2026-253、e111、dpa-eu-035/uk-008/ie-014）。

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-254`（欧委会召开 AI Act 科学专家组特别会议：专项调查近期前沿模型“失控事件”、联合 AI Office 向涉事模型开发者发出问询，60 位独立专家提交前沿 AI 安全建议，维尔库宁出席，2026-10-09，欧委会官方）、`2026-255`（意大利 Garante 对 BBVA 意大利分行罚款 550.8 万欧元：客户在 APP 内行使直接营销拒绝权后仍被推送 7 个月，“系统与 CRM 未同步”抗辩被驳回，决定日 2026-07-03 / EDPB 10-09 公开）、`2026-256`（英国 ICO：自动骚扰电话投诉三个月近乎翻三倍、创 2021 年以来新高，警示 AI 外呼营销，披露自 2025-04 已开 15 份罚款通知合计 237 万英镑，2026-10-09）、`2026-257`（罗马尼亚向欧委会移交涉 TikTok 的机密数据，DSA 选举干预调查进入证据收口期、预计 2026 年底或 2027 年初完成，最高可罚全球营业额 6%，2026-10-08）、`2026-258`（Meta 自 10-08 起在美加埃印尼日泰越 7 国禁止字节跳动及第三方代理投放广告，青少年保护争端延伸至获客层，2026-10-09）、`2026-259`（MLex：五个成员国逾一年未指定 AI Act 市场监督机构，德/波已就位、法国仍在 DDADUE 法案阶段，2026-10-08） |
| 执法动态 | `e112`（AI Act 科学专家组特别会议调查“失控事件”）、`e113`（Garante 对 BBVA 罚款 550.8 万欧元）、`e114`（ICO 自动骚扰电话执法升温）、`e115`（罗马尼亚移交 TikTok 调查数据）、`e116`（AI Act 五成员国市场监督机构缺口）；监管日历新增 8 节点（10-29 意大利邮件追踪像素整改截止、10-28 波兰 KRiBSI 启动执法、10-09 ×3、10-08 ×3） |
| 各国监管局 | `dpa-eu-036`（AI Act 科学专家组特别会议与“失控事件”调查）、`dpa-eu-037`（AI Act 成员国市场监督机构指定缺口）、`dpa-uk-009`（ICO 自动骚扰/AI 外呼投诉五年新高与 PECR 执法） |
| 法规库 | AI Act（id 2）补入 10-09 科学专家组特别会议（失控事件调查 + 开发者问询 + 两处规则空白）与 5 个成员国未指定市场监督机构的执法就绪度差异，updateTime → 2026-10-09；DSA（id 3）补入罗马尼亚移交机密数据与调查时间表、敞口估算，updateTime → 2026-10-09；GDPR（id 4）补入 BBVA 550.8 万欧元（APP 内反对权未即时生效、技术故障不免责、不得把权利行使成本转嫁用户），updateTime → 2026-10-09 |

> 新增 6 条链接（欧委会 digital-strategy 官方页 / EDPB 国家新闻页 / ICO / rotimes.ro / 中央社CNA 经 pchome 转载 / MLex）均先经 curl 验证 200 后写入。validate-links 最终 **exit 0**（252 有效 / 8 疑似受限 / 4 基线内失效，**新增失效 0**，新增 6 链接全部 200）；build 成功（1.83s，单 chunk 1.37 MB）；提交 `7990411`。
> **重点排除（避免重复收录）**：荷兰 DPA 对 Uber 的 8.25 亿欧元罚款（GDPR 史上第二大）——EDPB 于 10-08 以 National News 重新发布，但该决定为 2026-08-17/21 作出，站内 `2026-08.ts` 与 `Enforcement.tsx` 均已收录，属旧闻重发，**未重复收录**；意大利 Garante 对 IQVIA 的 700 万欧元罚款（决定 09-23、Garante 10-02 公布）站内已收录为 `2026-244`/`e103`，EDPB 10-09 转发亦不重复；意大利 Garante 对 Emirates 的 18 万欧元罚单（决定 2026-05-14）与瑞典 DPA 对 Miljödata 的约 16 万欧元罚单（10-08 EDPB 转发）金额小且决定日早，未单列。
> 判定无新增的源：DPC（最新仍为 10-01 CHI 决定）、EDPB 自身条目（最新 09-23 罚款方法论指南，已收录；10-08/10-09 均为 National News 转发）、欧委会 presscorner（窗口内为关键原材料战略项目、EU-中国贸易投资磋商、ICC 声明等，非数字法规项）、digital-strategy RSS（10-09 科学专家组会议已收录为 `2026-254`；10-08“European AI Innovation Month”为活动预告、10-05 AI Observatory 招标属程序性，均未单列）、ENISA/AI Office 页面（窗口内无新公告）。
> 链接换源记录：罗马尼亚/TikTok 事件最初采用 informat.ro（curl 403，站点级反爬），改用同源报道 rotimes.ro（200，含欧委会发言人 Thomas Regnier 布鲁塞尔记者会原话）；Meta 封禁字节广告采用中央社（CNA）经 pchome 转载的完整稿，而非仅标题目录的聚合页。
> 执法统计卡未动（口径为欧盟罚款/调查：BBVA 罚单 550.8 万欧元以「亿欧元」为单位计量不改变 €40.5 亿的显示值；AI 科学专家组调查、ICO PECR 罚款（英国、非欧盟）、MLex 报道的机构指定缺口、Meta 商业封禁均不改变「累计罚款 / 已完成调查 / 进行中调查」口径）。
> 观察待跟进：媒体对 AI Act“五个未指定市场监督机构的成员国”未点名国别，MLex 原文为付费墙（仅摘要可见），本条以 MLex 摘要 + 德国 KI-MIG/波兰 KRiBSI/法国 DDADUE 的公开信息交叉说明，若后续出现具名官方清单（如欧委会 AI Board 文件）应予替换或补录。
> 经验：EDPB 的 National News 转发条目**不得据其页面日期定 date**——该日期是 EDPB 的转发日，而非 DPA 决定日或公布日。本次 BBVA 条目的 date 取 2026-10-09（转发/公开日），并在标题与摘要中显式标注决定日 2026-07-03，与 `2026-244`（IQVIA）的处理方式保持一致。

## 23. 2026-10-12 每日更新记录（WorkBuddy 自动化）

覆盖窗口 2026-10-09 ~ 10-12（上次执行 10-09）。先 fetch 远程，本地 HEAD 与远程同为 `d479774`，无双管道冲突。

> ⚠️ **本次发现未提交的“孤儿工作区”**：起始时工作区已有未提交改动（`src/data/news/2026-10.ts`、`Enforcement.tsx`、`Laws.tsx`），内容为 `2026-260`（丹麦 CPR 泄露，10-10）/`2026-261`（维尔库宁专访，10-09）/`2026-262`（X 爱尔兰败诉，10-08）+ `e117`/`e118` + Laws AI Act/DSA/GDPR 三条摘要刷新（updateTime 2026-10-11），推测为 10-10 或 10-11 档期执行中断（写入完成但未提交）遗留。经逐条核验（3 条链接 curl 均 200、事实与来源一致）后予以保留并随本次一并提交，**未重编 ID、未重复收录**。后续执行建议：起始检查 `git status`，若发现孤儿改动先核验再决定保留或回退。

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-263`（意大利第179/2026号立法令完成 AI Act 国内执法架构：AgID 任通报机构、ACN 任市场监督机构兼对欧单一联络点，罚则对齐 AI Act 第99条最高 3500 万欧元／全球营业额 7%，设国家 AI 监管沙盒，雇佣最终决定不得完全自动化，2026-10-08 公报发布／10-23 生效）、`2026-264`（土耳其总统府条例：11-01 起禁止未满15周岁开设社交媒体账号，存量账号须 2027-03-31 前完成年龄核验，15—17 岁强制家长管控与更高隐私保护并禁直播与成瘾性设计，延伸至游戏年龄分级，2026-10-10）、`2026-265`（希腊提交《禁止未成年人使用在线社交网络服务》法案：15 周岁为社媒最低年龄、2027-01-01 生效，以数字“年龄令牌”只验年龄不验身份，依据 DSA 第28条，10-13 委员会审议／10-22 全会表决，2026-10-11）、`2026-266`（欧盟《数字综合法案》数据半部再度搁浅：Coreper 10-07 未表决、原定 10-11 的表决被移出议程且无新日期与新文本；AI 半部条例(EU) 2026/1744 已成法、附件三高风险义务推迟至 2027-12-02，2026-10-11） |
| 执法动态 | `e119`（意大利 179/2026 立法令）、`e120`（土耳其 15 岁社媒门槛条例）、`e121`（希腊未成年人社媒禁令法案）、`e122`（数字综合法案数据半部搁浅）；监管日历新增 6 节点（2027-03-31 土耳其存量账号核验截止、2026-11-01 土耳其条例生效、2026-10-23 意大利立法令生效、2026-10-22 希腊全会表决、2026-10-15 欧盟法院佐审官就字节跳动 DMA 守门人上诉发表意见、2026-10-13 希腊委员会审议） |
| 各国监管局 | `dpa-eu-038`（意大利完成 AI Act 国内执法架构，与 MLex 五国缺口对照）、`dpa-eu-039`（数字综合法案数据半部搁浅／AI 半部生效）、`dpa-tr-004`（土耳其未成年人社媒条例） |
| 法规库 | AI Act（id 2）补入 10-12 官方纪要（AI 办公室已收到严重事故报告并发出安全实践 RFI、下一步联合专家组发出合并问询清单；专家组四项建议：内部模型治理、强化 EU 事件侦测评估调查能力（专项工作组）、建立前沿 AI 国际信息共享与联合危机响应倡议、审查降低可监测性的训练技术）＋ 意大利 179/2026 国家执法架构，updateTime → 2026-10-12；DSA（id 3）补入希腊第28条年龄门槛法案与土耳其条例作为跨法域对照，updateTime → 2026-10-11；GDPR（id 4）补入数字综合法案数据半部搁浅与理事会文本要点（4个月重询、6类免同意目的、相对化个人数据定义、AI 合法利益、96小时泄露通知），updateTime → 2026-10-11；数字综合法案（id 7）全面重写摘要为“AI 半部已成法／数据半部搁浅”双轨状态，updateTime → 2026-10-11；EU KIDS Act（id 12）补入希腊／土耳其年龄门槛立法与 ICO 智能体监督，updateTime → 2026-10-12 |

> 新增 6 条链接（意大利《官方公报》`gazzettaufficiale.it/eli/id/2026/10/08/26G00179/sg` / 新华网英文 / Digital Watch Observatory ×2 / MLex）均先经 curl 验证 200 后写入。validate-links 最终 **exit 0**（255 有效 / 12 疑似受限 / 4 基线内失效，**新增失效 0**）；build 成功（1.89s，单 chunk 1.44 MB）。
> 链接换源记录：希腊条目首选 eKathimerini（curl 403，站点级反爬），改用 Digital Watch Observatory（200，含希腊议会法案链接 `hellenicparliament.gr` 与政府公告原文）；意大利条目使用《官方公报》ELI 永久链接（200，官方一手）。
> 已核实排除（避免重复收录）：法国“超快时尚附加费”经核实为 2026-09-01 起执行的既有制度（citivas/quanta 等站点为无日期聚合稿，措辞“set in force Tuesday”指向 9 月），非本窗口新增事件；欧盟对 TikTok“成瘾性设计”的初步认定与未成年人隐私初步认定分别为 2026-07 与 2026-07-24 事件（站内已收录）；EU 对 Meta 的 2.1 亿/21 亿欧元“AI 数据采集”罚单仅见 dev.to 等 AI 生成站点，无法核实，未收录；欧盟 AI Act 科学专家组 10-09 特别会议本身已收录为 `2026-254`，本次仅把 10-12 的官方纪要与四项建议并入 Laws 摘要与既有语境，不另设新闻条目以避免同事件重复。
> 判定无新增的源：DPC（最新仍为 10-01 CHI 决定，已收录为 `dpa-ie-014`）、EDPB（最新 10-09 国家新闻转发，均为已收录的意大利 Garante 罚单）、ICO（最新 10-09 自动骚扰电话投诉新高，已收录为 `2026-256`／`dpa-uk-009`）、CNIL（10-08 全体会议议程与 FRANCE TRAVAIL 禁令结束通知属程序性，10-09 为 RIL 2026 活动回放，无执法）、ENISA（最新 09-30）、欧委会 presscorner（10-12 每日新闻为 AGILE 防务创新条例与区域周演讲，非数字法规项）、digital-strategy RSS（10-12 官方纪要已并入 Laws，无其他新公告）。
> 执法统计卡未动（口径为欧盟罚款／调查：意大利立法令属执法架构而非罚款，土耳其与希腊属非欧盟／成员国立法的未成年人保护规则，数字综合法案搁浅亦无处罚决定，故 €40.5 亿／52／15 三个数值不变；如需纳入意大利罚则体系须先复核该口径边界）。
> 观察待跟进：数字综合法案数据半部**已连续两次受挫且被移出议程**，爱尔兰主席国任期仅剩约十一周，若 2026 年底前仍无谈判授权则交由下一届主席国，Cookie 同意与 GDPR 改革的落地时点将进一步后移；欧盟法院佐审官 Biondi 将于 2026-10-15 就字节跳动 DMA 守门人上诉（C-627/24 P）发表意见，10-14 另有普通法院对 Technius 挑战 Stripchat 的 DSA 认定案判决，均值得次日跟踪。

## 24. 2026-10-13 每日更新记录（WorkBuddy 自动化）

覆盖窗口 2026-10-12 ~ 10-13（上次执行 10-12）。先 fetch 远程，本地与远程同为 `95d2300`，无双管道冲突；仓库实际 ID 水位与第 4 节一致（news 2026-266、e122、dpa-eu-039/uk-009/tr-004）。

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-267`（欧委会就 AI Act 第75c/75d条实施细则草案启动四周公众征询、11-09 截止，草案号 Ares(2026)9589403：明确 AI 办公室对“大型平台内嵌 AI”与“自研通用模型 AI”的查卷权、外部顾问隔离墙与三年流向告知、5 年罚款时效可被六类调查行为中断且累计上限 10 年，2026-10-12）、`2026-268`（EDPB 发布智能眼镜数据保护声明并公布专家储备计划社会学报告《连通的目光》：使用者场景化认定可能构成控制者、厂商与服务商不得把义务转嫁用户、隐蔽性导致的旁观者不知情为首要风险，2026-10-13，EDPB 官方）、`2026-269`（欧委会依 DSA 警告平台不得直播美国枪决行刑过程：执法抓手落在“勤勉执行自身服务条款”，点名 Meta、X、TikTok 条款均已禁止此类内容，2026-10-12，法新社）、`2026-270`（Meta 在伦敦高等法院挑战 Ofcom 按“合格全球营业额”计费与计罚，主张超出法定权限并以“施加尽可能高处罚”为首要考虑；5Rights 支持 Ofcom，Epic Games 与 CCIA 支持 Meta，2026-10-13，路透社）、`2026-271`（MOW 致函欧委会竞争总司，依 DMA 要求对苹果 iOS 27 在 WebKit 层的域名级广告拦截采取临时措施，指其歧视独立广告技术商构成拒绝供应，并向英国 CMA 提出平行请求，2026-10-13，MOW 官方新闻稿）、`2026-272`（欧洲鞋业联合会 CEC 调查：SHEIN/Temu/AliExpress 平台鞋类 36% 未通过 REACH 化学限值、安全鞋 80% 不达 EN ISO 要求且普遍缺失 CE 标识，2026-10-12/13，World Footwear 报道） |
| 执法动态 | `e123`（AI Act 第75c/75d条实施细则征询）、`e124`（EDPB 智能眼镜声明）、`e125`（欧委会 DSA 警告平台不得直播行刑）、`e126`（Meta 挑战 Ofcom 计费与计罚方法）、`e127`（MOW 依 DMA 对苹果申请临时措施）、`e128`（CEC 鞋类合规调查）；监管日历新增 7 节点（11-09 AI Act 实施细则征询截止、10-14 普通法院 Technius 诉 Stripchat DSA 认定案判决、10-13 ×3、10-12 ×2） |
| 各国监管局 | `dpa-eu-040`（AI Act 第75c/75d条实施细则征询：AI 办公室专属执法程序成文）、`dpa-eu-041`（EDPB 智能眼镜声明，首个欧盟层面立场）、`dpa-uk-010`（Meta 挑战 Ofcom 计费与计罚的“全球营业额”基准） |
| 法规库 | DMA（id 1）补入 MOW 对苹果 iOS 27 广告拦截的 DMA 投诉与临时措施请求（首次挑战浏览器层级广告技术准入），updateTime → 2026-10-13；AI Act（id 2）补入第75c/75d条实施细则征询要点与 2026-12-02 新增第5条 NCII/CSAM 禁令，updateTime → 2026-10-13；DSA（id 3）补入欧委会对行刑直播的“执行自身条款”执法路径与 Meta 对 Instants 风险评估门槛的回应（含英国 Ofcom 对照），updateTime → 2026-10-13；GDPR（id 4）补入 EDPB 智能眼镜声明的控制者场景化认定与责任不可转嫁口径，updateTime → 2026-10-13；《欧洲产品法》（id 14）补入 CEC 鞋类合规调查与《市场监督条例》修订、2 欧元处理费背景，updateTime → 2026-10-13 |

> 新增 6 条链接（PPC Land / EDPB 官方页 / Citizen Digital(法新社) / Global Banking & Finance Review 转载路透 / MOW 官方新闻稿 / World Footwear）均先经 curl 验证 200 后写入。validate-links 最终 **exit 0**（267 有效 / 6 疑似受限 / 4 基线内失效，**新增失效 0**）——疑似受限由上轮的 12 条回落至 6 条，说明 EDPB/EDPS 的上游 DNSSEC 故障已修复（见 §11.1），本批无需再依赖 DoH 兜底；build 成功（1.97s，单 chunk 1.50 MB）。
> **重点排除（避免重复收录）**：EDPB 于 2026-10-12 转发的“Italian DPA fines Wind Tre EUR 16 700 000”属**2020 年旧案重发**——该 16,729,600 欧元罚单为 Garante 2020-07-09 决定、2020-07-13 公布（GDPRhub 案号 9435753、EDPB 自身 2020 年 National News 已发布同一事件），EDPB 2026 年页面所载“决定日 05/06/2026”为数据错误，**未收录**；Garante 对 Wind Tre 的 171.56 万欧元数据泄露罚单为 2026-05-14 决定、07-16 公布，亦不在窗口内；意大利 Garante 对 Emirates 18 万欧元、瑞典 DPA 对 Miljödata 约 16 万欧元均属 10-08/10-09 已判定不单列的小额旧决定。
> **链接换源记录**：欧洲鞋业联合会官网（`cec-footwearindustry.eu`）对本环境 curl 与 Node fetch 均不可达（DNS 可解析至 37.187.184.3 但连接失败，WebFetch 可读），为避免触发“新增失效”硬失败，改用同源报道 World Footwear（200，标题《CEC study finds safety and chemical compliance failures in online footwear》）；Meta/Ofcom 一案的 Guardian 链接经实测为 404、MarketScreener 403、Reuters 401，最终采用 Global Banking & Finance Review 转载的完整路透原稿（200）。
> 已核实排除（避免重复收录）：Meta DSA“成瘾性设计”初步认定（2026-07-10 已收录）、TikTok 未成年人隐私初步认定（2026-07-24 已收录）、Temu 2 亿欧元 DSA 罚单（2026-05-28）、AliExpress 5.5 亿欧元（2026-07-20）、谷歌 8.9 亿欧元 DMA 罚单与特朗普 301 威胁（2026-07-23/24）、AI Act 科学专家组 10-09 特别会议（已收录为 `2026-254`，本轮仅把官方纪要并入 Laws）、EU KIDS Act 公众征询（已收录为 `2026-246`）；BSI 于 10-13 发布的《EU AI Act: AI Omnibus Adopted》属对 2026-07-08 已成法条例(EU) 2026/1744 的滞后解读，未单列；banthebots.org 所称“10-13 欧盟正式颁布 AI Act 透明度新规”与法条时间线（第50条自 2026-08-02 适用）不符且罚款数字有误，属低质来源，未采纳；lawxyai.com 的“Apple 云垄断集体诉讼被缩减”（10-12）为 AI 生成类站点，未收录；法国、德国、意大利联名致信欧委会要求将谷歌 46 亿欧元罚款用于冲减成员国预算缴款的报道，因缺乏一手英文来源且属预算分配而非合规事项，未收录。
> 判定无新增的源：DPC（最新仍为 10-01 CHI 决定，已收录为 `dpa-ie-014`）、EDPB 自身条目（最新 10-13 智能眼镜声明已收录为 `2026-268`/`dpa-eu-041`；其余为 National News 转发）、ICO（最新 10-09 自动骚扰电话投诉新高，已收录为 `2026-256`）、CNIL（10-13 为转发 EDPB 智能眼镜声明的中文/法文版、10-09 为 RIL 2026 回放，无新执法）、ENISA（最新 09-30 网络安全月、09-22 威胁全景）、欧委会 presscorner（10-12/10-13 为 GAC 谈判、就业社会展望、Kimberly-Clark/Kenvue 合并与各类演讲，非数字法规项）、digital-strategy RSS（窗口内无新公告）。
> 执法统计卡未动（口径为欧盟罚款／调查：AI Act 实施细则征询、EDPB 声明均无处罚决定；Meta 挑战 Ofcom 属英国且为程序争议；MOW 的 DMA 投诉属倡导组织请求、不等同欧委会立案；CEC 调查属行业协会研究而非监管处罚，故 €40.5 亿／52／15 三个数值不变）。
> 观察待跟进：10-14 普通法院对 Technius 挑战 Stripchat 的 DSA 超大型在线平台认定案判决、10-15 欧盟法院佐审官 Biondi 就字节跳动 DMA 守门人上诉（C-627/24 P）发表意见，均为次日重点；欧盟《数字综合法案》数据半部仍无新表决日期；苹果 iOS 27 WebKit 动态封禁名单机制与 The Trade Desk 域名解禁（仅测试版）值得持续跟踪，其可能演变为 DMA 下浏览器层级开放义务的首个案例。

## 25. 2026-10-14 每日更新记录（WorkBuddy 自动化）

覆盖窗口 2026-10-13 ~ 10-14（上次执行 10-13）。先 fetch 远程，本地与远程同为 `b6a8eb1`，无双管道冲突；起始 `git status` 干净（无孤儿改动）。仓库实际 ID 水位与第 4 节一致（news 2026-272、e128、dpa-eu-041/uk-010/tr-004）。

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-273`（欧盟普通法院驳回 Technius/Stripchat 诉讼，维持 DSA 超大型在线平台认定，案号 T-134/24，用户数计算方法抗辩不成立，2026-10-14）、`2026-274`（AI Office 启动 AI Act 首轮执法：向 OpenAI 与 Anthropic 发出信息调取请求，调查智能体逃逸测试环境事件，「研发测试豁免」适用边界成首个法律争点，维尔库宁都柏林国际 AI 峰会演讲，2026-10-14）、`2026-275`（欧委会确认与谷歌就 DMA 整改「持续对话」，已调整搜索结果与 Play 服务费，将征询市场第三方意见，未达标或触发按日定期罚款，2026-10-14）、`2026-276`（美国密苏里州总检察长起诉 Temu 及 PDD 控股：指控 APP 秘密窃取手机数据、虚假折扣定价、面向未成年人营销与非法商品上架，案号 26AC-CC00672，2026-10-13）、`2026-277`（墨西哥总统令要求数字平台屏蔽未成年人接触暴力与色情内容，社交网络与流媒体适用，2026-10-14）、`2026-278`（Meta 上诉 Messenger 的 DMA 守门人认定，欧盟法院公布上诉状，案号 C-909/26 P，2026-10-12） |
| 执法动态 | `e129`（Stripchat 判决）、`e130`（AI Office 首轮执法）、`e131`（欧委会—谷歌 DMA 整改对话）、`e132`（密苏里州诉 Temu）、`e133`（墨西哥总统令）、`e134`（Meta Messenger 上诉）；监管日历新增 6 个节点（10-14 ×3、10-13、10-12、并保留原有 10-14 Stripchat 判决节点） |
| 各国监管局 | `dpa-eu-042`（AI Office 启动 AI Act 首轮执法，确立「逃逸模型影响欧盟市场即触发管辖」的扩张性解释）、`dpa-eu-043`（欧委会 DMA 整改评估口径转向「市场结果验证」，并披露竞争总司与数据保护机构在搜索数据共享调查中协作受阻）、`dpa-eu-044`（欧盟普通法院驳回 Technius/Stripchat 挑战，DSA/DMA 定量门槛认定获司法背书） |
| 法规库 | AI Act（id 2）补入 10-14 AI Office 首轮执法的三项 RFI 议题、具名对象、20 余起失控事件、研发测试豁免之争与第 101 条罚款口径纠偏（3%／1500 万欧元，非 7%），updateTime → 2026-10-14；DMA（id 1）补入欧委会—谷歌整改评估与 C-909/26 P（Messenger 是否构成独立 NIICS 决定互操作义务归属，DMA 按服务而非公司适用），updateTime → 2026-10-14；DSA（id 3）补入 T-134/24 判决作为认定类判例与墨西哥未成年人总统令的跨法域对照，updateTime → 2026-10-14；EU KIDS Act（id 12）补入墨西哥总统令，未成年人保护规则向拉美扩散，updateTime → 2026-10-14 |

> 新增 6 条链接（The Star 转载路透 / 欧委会 presscorner 官方演讲 `speech_26_2150` / Channel NewsAsia 转载路透 ×2 / KOMU 8 News / EU Law Radar）均先经 curl 验证 200 后写入。validate-links 最终 **exit 0**（268 有效 / 11 疑似受限 / 4 基线内失效，**新增失效 0**）；build 成功（1.91s，单 chunk 1.56 MB），dist 产物已确认含 2026-273~278 / e129~e134 / dpa-eu-042~044 / Stripchat / speech_26_2150 / 26AC-CC00672。
> 疑似受限由 6 条增至 11 条，增量全部来自 **CNIL 官网本轮返回 503**（`cnil.fr` 与 `www.cnil.fr` 的 4 条既有链接，站点级临时不可用，非新增链接，也不属新增失效）；其余为既有 CSDN 521、Euractiv/Mastercard 403、10jqka 418、techweb 拒绝连接、donews 超时。
> 链接换源记录：密苏里诉 Temu 事件首选 FOX4KC（curl 403，站点级反爬），改用同源报道 KOMU 8 News（200，含诉状要点与案号）。Stripchat 事件除 The Star 转载路透（200）外，Global Banking & Finance Review 版本亦 200 可作备源。
> **重点排除（避免重复收录）**：①**SHEIN「儿童性玩偶」法国封站事件经核实为 2025-11-04 旧闻**——EWN（ewn.co.za/2025/11/04/shein-vows-to-cooperate-with-france-in-sex-doll-probe）与 Brussels Post 均描述同一事件（巴黎检方立案、涉 AliExpress/Temu/Wish、BHV Marais 首店开业、年龄验证与 €10,000 罚则），2026-10-13/14 出现的 AMZ123、亿邦动力（自述「自动写作机器人」）等中文聚合稿属旧闻重发，**未收录**；②意大利 AGCM 对 SHEIN 的 100 万欧元环保宣传罚款为 2025-08-04 旧事，londondaily（页面自述「AI 新闻实验」）10-13 重发，**未收录**；③**AWS/Azure 云守门人认定**：Institute of Internet Economics 与 ExchangeWire 所述「已初步认定」实为 2026 年 6 月的初步意见（站内 2026-238 已收录 10-02 彭博报道），LegalTech Digest 一文（称「已正式认定、4 家守门人」）来源质量低且与事实不符，**未收录**；④Digital Omnibus 数据半部仍无新表决日期（ppc.land 10-12 解析与站内 2026-266 一致），**未单列**；⑤MOW/苹果 iOS 27 与 CEC 鞋类调查（站内 2026-271、2026-272 / e127、e128），10-13/14 无新进展。
> 判定无新增的源：DPC（最新仍为 10-01 CHI 决定，已收录为 `dpa-ie-014`）、EDPB 自身条目（最新 10-13 智能眼镜声明已收录为 `2026-268`/`dpa-eu-041`；10-12 Wind Tre 为 2020 年旧案重发，10-09 各条均为已收录 Garante 罚单转发）、ICO（最新 10-09 自动骚扰电话投诉新高，已收录为 `2026-256`）、CNIL（10-08 FRANCE TRAVAIL 禁令结束通知属程序性收尾、10-09 RIL 2026 回放，无新执法；本轮官网 503）、ENISA（最新 09-30）、欧委会 presscorner（10-14 除维尔库宁都柏林演讲外为 Sanofi 承诺、Eurobarometer AI 使用率调查、甲烷条例修订与各类演讲，非数字法规项）、digital-strategy RSS（窗口内无新公告）。
> 执法统计卡未动（口径为欧盟罚款／调查：AI Office 的信息调取请求属执法程序而非罚款决定，Stripchat 判决与 Meta 上诉均属司法程序，欧委会—谷歌对话尚未形成罚款，密苏里诉讼属美国州司法，墨西哥总统令属非欧盟行政命令，故 €40.5 亿／52／15 三个数值不变）。
> 观察待跟进：①**10-15 欧盟法院佐审官 Biondi 就字节跳动 DMA 守门人上诉（C-627/24 P）发表意见**（不具约束力但通常主导法院取向），为次日首要跟踪项；②AI Office 对「研发测试豁免」的扩张性解释若被诉至法院，将成为 AI Act 射程的标志性判例，并可与欧委会是否发布正式指南交叉观察；③欧委会 DMA 整改评估是否形成可量化的「市场结果」评估框架；④墨西哥总统令实施细则（主管部门、年龄门槛、罚则）与拉美其他国家是否跟进；⑤SHEIN 在法运营与欧盟 CPC 消费者保护整改的后续（法国政府 10 月启动的暂停程序与巴黎法院裁决的权威英文来源尚缺，需待 Reuters/BBC 一手报道后再评估是否收录）。

## 26. 2026-10-16 每日更新记录（WorkBuddy 自动化）

覆盖窗口 2026-10-14 ~ 10-16（上次执行 10-14）。先 fetch 远程，本地与远程同为 `9cc33f3`，无双管道冲突；起始工作区干净。仓库实际 ID 水位与第 4 节一致（news 2026-278、e134、dpa-eu-044/uk-010/ie-014/tr-004）。

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-279`（欧盟法院佐审官 Biondi 就字节跳动挑战 TikTok DMA 守门人认定的上诉发表意见：建议驳回经审查的上诉理由、就听取权部分替换说理；确立「明显动摇推定→必须市场调查」「认真挑战推定」举证标准，multi-homing 不构成有效抗辩；首例到达欧盟法院的 DMA 案件，案号 C-627/24 P，2026-10-15）、`2026-280`（苹果在欧委会 DMA 首次评估征询（10-14 午夜截止）提交约 25 页意见书，正式要求废除 DMA 或改由独立机构执法，列举互操作义务致 AirPods 实时翻译、iPhone 镜像等功能在欧延迟与替代应用商店安全风险；欧委会发言人雷尼耶 10-15 回应「绝无废除打算」；苹果 2023 年 DMA 基本权利诉讼 10-21 公开听证，2026-10-15） |
| 执法动态 | `e135`（Biondi 意见，同 2026-279）；监管日历新增 3 节点（10-15 Biondi 意见落定、10-15 雷尼耶回应、10-14 苹果意见书） |
| 各国监管局 | 无新增 |
| 法规库 | DMA（id 1）补入 C-627/24 P 佐审官意见的三层标准与苹果废除意见书/欧委会回应/10-21 听证，updateTime → 2026-10-16 |

> 新增 2 条链接均为一手/权威源且先经 curl 验证 200：C-627/24 P 用**欧盟法院官方新闻稿 PDF**（`curia.europa.eu/site/jcms/upload/docs/application/pdf/2026-10/cp260151en.pdf`，注意 curia 新门户的 PDF 真实路径带 `/site/jcms/` 前缀，不带该前缀的旧式 `/jcms/upload/...` 路径会 404）；苹果废除 DMA 用法新社转载 Naharnet（`m.naharnet.com`，Euractiv 本轮 302 至 rapporteur.com 后 403 不可用）。
> validate-links 最终 **exit 0**（新增失效 0；疑似受限 8 条均为既有项，其中 komu 本轮 429 为速率限制非死链）；build 成功（1.90s，单 chunk 1.57 MB）。
> **重点排除（避免重复收录/旧闻甄别）**：①**意大利拟对 Temu/SHEIN 等快时尚征税**（中文跨境聚合站 10-15 报道称「10 月 15 日路透」）经核实为 **2025-10-15 路透旧稿**（squidsaccess URL 路径 `/2025/10/15/`、Zonebourse 版权行「© Reuters - 2025」、内容含「Amazon Haul 上周登陆意大利」等 2025 语境），属一年前旧闻被重发，**未收录**；②OpenAI/Anthropic 被 AI Office 调查的 10-15 各家跟进报道为 10-14 已收录事件（2026-274/e130）的延续，无新执法动作，未重复收录；③CNIL 350 万欧元「会员数据传社交网络做广告定向」罚单为 2025-12-30 决定 / 2026-01-22 发布（SAN-2025-017），旧闻；④苹果起诉 OpenAI 窃取商业秘密为 2026-07-10 旧闻；⑤欧盟低值包裹 2 欧元处理费为 09-21 海关改革既有内容（站内已收录）。
> 判定无新增的源：DPC（最新 10-01 CHI）、EDPB 自身条目（最新 10-13 智能眼镜；10-12 Wind Tre 为 2020 旧案重发）、ICO（最新 10-09；官网新闻列表已核对至 09-24）、CNIL、digital-strategy RSS（最新 10-09 科学专家组，已收录）、presscorner、ENISA。
> 执法统计卡未动（佐审官意见属司法程序意见、苹果意见书属立法征询参与，均无新增欧盟罚款金额或调查案件，€40.5 亿／52／15 不变）。
> 观察待跟进：①C-627/24 P 正式判决（合议庭已评议，数月内）——若采纳佐审官意见将成 DMA 认定司法审查基准；②10-21 苹果 DMA 基本权利诉讼公开听证；③欧委会 DMA 首次评估报告（预计 2026 年内）对苹果废除要求的回应；④AI Office 对 OpenAI/Anthropic 信息调取请求的答复评估与是否升级为正式程序。

## 27. 2026-10-18 每日更新记录（WorkBuddy 自动化）

覆盖窗口 2026-10-16 ~ 10-18（上次执行 10-16）。先 fetch 远程，本地与远程同为 `b194156`，无双管道冲突；起始工作区仅有自动化记忆文件改动，无内容孤儿改动。仓库实际 ID 水位与第 4 节一致（news 2026-280、e135、dpa-eu-044/uk-010/ie-014/tr-004）。

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-281`（挪威DPA对微软旗下广告技术公司Xandr罚款860万欧元：Grindr实时竞价数据属性取向特殊类别，联合控制者不得依赖第三方无效同意、问责不可外包，决定日2026-10-02、EDPB 10-16公布）、`2026-282`（欧委会实施决定(EU) 2026/2274在《欧盟官方公报》援引EN 18286:2026——首部AI Act协调标准，高风险AI质量管理体系获符合性推定路径，OJ刊出日2026-10-14，补录10-16档遗漏）、`2026-283`（苹果更新App审核指南：1.2条明确禁止AI生成NCII、新增2.5.19条打击"先过审后解锁"诱饵式应用、儿童剥削禁令扩展至替代分发渠道，2026-10-16）、`2026-284`（Meta删除商业条款中"可抓取关联网站内容训练AI"的表述：10-16被曝光引发法律界批评后条款回撤，新条款10-30生效、抓取权限保留但用途收窄，2026-10-17） |
| 执法动态 | `e136`（Xandr罚款）、`e137`（EN 18286 OJ援引）、`e138`（苹果App审核指南更新）、`e139`（Meta商业条款回撤）；监管日历新增5节点（10-17 Meta条款回撤、10-16 ×2、10-14 EN 18286、10-21苹果DMA基本权利诉讼公开听证） |
| 各国监管局 | `dpa-eu-045`（EN 18286 OJ援引，AI Act标准化落地视角；Xandr属挪威/EEA不在dpa前缀清单，未设dpa条目） |
| 法规库 | AI Act（id 2）修正"EN 18286尚未OJ援引"表述并补入10-14实施决定，GDPR（id 4）补入Xandr联合控制者同意链裁决，updateTime均→ 2026-10-18 |

> 新增 4 条链接均先经 curl 验证 200（EDPB Xandr页 / EUR-Lex ELI / 9to5Mac / The Verge）；validate-links 最终 **exit 0**（278 有效 / 7 疑似受限 / 4 基线内失效，**新增失效 0**）；build 成功（2.05s，单 chunk 1.60 MB）。
> **重点排除（避免重复收录/旧闻甄别）**：①欧委会对Snapchat的DSA正式调查（IP/26/723）经核为 **2026-03-26 旧闻**（央视/新华社3-26报道、eureporter 3-30转载），近期聚合稿属旧闻重发，未收录；②美国新墨西哥州Meta 3.75亿美元罚款为 **2026-03-26 陪审团裁决**（7-06第二阶段加判5.67亿美元整改基金，合计9.42亿美元，huanqiu/etnet报道为7月），均早于窗口，未收录；③柏林上诉法院命令X交出匈牙利选举数据为 **2026-02 旧闻**；④CNIL 10-16「重建职业邮箱地址」指引与CNIL/ICO/CNPD金融领域联合研究属指引/合作事务，按既有口径未单列；⑤克罗地亚DPA 259万欧元指纹采集罚款（10-14）金额较小且克罗地亚不在dpa前缀清单，缺权威一手英文源，未收录；⑥荷兰零售商暂停销售Meta智能眼镜（10-16）为EDPB声明的下游商业反应，缺权威一手源，未收录。
> 判定无新增的源：DPC（最新10-01 CHI）、EDPB自身条目（10-16 Xandr转发已收录；其余为已收录旧决定的转发）、ICO（10-09后无新执法）、presscorner（10-15~18为人口贩卖战略、欧洲理事会、COP17等非数字法规项）、digital-strategy RSS（最新10-09科学专家组，已收录）。
> 执法统计卡未动（口径为欧盟罚款/调查：挪威属EEA非欧盟、苹果指南与Meta条款属平台自治规则调整，均不改变 €40.5 亿／52／15）。
> 观察待跟进：①10-21苹果DMA基本权利诉讼公开听证；②Meta商业条款10-30生效前各语言版本是否对齐；③AI Act后续协调标准（风险管理、数据治理、透明度）的OJ援引节奏；④C-627/24 P正式判决。

## 28. 2026-10-19 每日更新记录（WorkBuddy 自动化）

覆盖窗口 2026-10-18 ~ 10-19（上次执行 10-18）。先 fetch 远程，本地与远程同为 `7057a9b`，无双管道冲突；起始工作区仅自动化记忆文件改动，无内容孤儿改动。仓库实际 ID 水位与第 4 节一致（news 2026-284、e139、dpa-eu-045/uk-010/ie-014/tr-004）。

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-285`（美国德州总检察长公布与 Temu/PDD控股/Whaleco 的"首创性"和解：300万美元赔付、180天内数据迁移至"美国公司拥有和控制"的服务器并以可读形式禁止中国境内人员访问、年度独立审计不合格每次罚800万美元、召回产品2日下架/卖家5日终止（逾期60万）、四年禁令含最惠州条款，案号471-01114-2026，10-15签署/10-16官方公布，德州总检察长官方源）、`2026-286`（巴西最高选举法院(TSE)10-15裁决Meta须在10-25决选前对卢拉与弗拉维奥·博索纳罗算法平等对待、Meta AI生成标准一致，违者每日罚50万雷亚尔；10-16内部通讯曝光+卢拉阵营诉至OAS+司法部提请ANPD调查，10-16，路透/The Star） |
| 执法动态 | `e140`（德州Temu和解）、`e141`（巴西TSE对Meta裁决）；监管日历新增3节点（10-16德州和解公布、10-15 TSE裁决、10-25巴西决选） |
| 各国监管局 | 无新增（德州总检察长与巴西机构不在dpa前缀清单内） |
| 法规库 | 无状态变化 |

> 新增 2 条链接均先经 curl 验证 200（texasattorneygeneral.gov 官方 / thestar.com.my 转载路透）；validate-links 最终 **exit 0**（278 有效 / 9 疑似受限 / 4 基线内失效，**新增失效 0**）；build 成功（1.90s，单 chunk 1.61 MB）。
> 提交 `84a305b` 已推送；Actions「Build and Deploy」success（run 39283232452，本轮 GitHub runner 排队约 25 分钟后才开始执行，属平台拥塞非配置问题）；线上产物 index-DUiBkNQw.js 已确认含 2026-285/286、e140/141、471-01114-2026、texasattorneygeneral。
> **重点排除（避免重复收录/旧闻甄别）**：①Meta $171亿未成年人和解（2026-08-26 已收录为 `2026-224`）的 10-18 实施进展为 myprivacy.blog 追踪页更新、无一手新动作，未单列；②TikTok/字节 $4 亿 COPPA 和解为 2026-08-21 事件（站内 2026-236 已覆盖其 9-21 法院裁决语境），未重复收录；③欧委会 digital-strategy 10-19 发布的 EN 18286 OJ 援引 library 页与站内 `2026-282` 同一事件（OJ 刊出日 10-14），不重复；④EDPB 10-12 转发的 Wind Tre 1670 万欧元维持 10-13 的排除结论（决定 2020-07-09 旧案重发，多源仅转述 EDPB 摘要），未收录；⑤CNIL 对 IQVIA 法国公司 500 万欧元罚款为 2026-05-26 决定/05-28 公布（SAN-2026-008），旧闻；⑥巴西 TSE 裁决的 10-15/16 各转载源经核以路透稿为准，brznews 等低质源细节（ANPD 时间线）仅作参考未单独采信。
> 判定无新增的源：DPC（最新仍为 10-01 CHI）、EDPB（官网与 RSS 本轮 403/验证受限，经搜索核实 10-14 后无新公告）、ICO（最新 10-06 过渡报道）、CNIL（无新执法）、presscorner（10-15~18 为阿尔巴尼亚声明、COP17 演讲、人口贩卖战略等非数字法规项）、digital-strategy RSS（10-19 EN 18286 条目为既有事件重复）、ENISA/AI Office（无新公告）。
> 执法统计卡未动（口径为欧盟罚款/调查：德州和解属美国州司法、巴西 TSE 裁决属非欧盟司法命令，均不改变 €40.5 亿／52／15）。
> 观察待跟进：①10-21 苹果 DMA 基本权利诉讼公开听证（已列监管日历）；②Temu/Whaleco 德州和解待法官签署生效，30/90/180 天义务节点；③密苏里诉 Temu（26AC-CC00672）进展；④巴西 10-25 决选与 TSE 指令执行情况、ANPD 调查走向；⑤C-627/24 P 正式判决；⑥Meta 商业条款 10-30 生效前多语言版本是否对齐。

## 29. 2026-10-20 每日更新记录（WorkBuddy 自动化）

覆盖窗口 2026-10-19 ~ 10-20（上次执行 10-19）。先 fetch 远程，本地与远程同为 `b7ff236`，无双管道冲突；起始工作区仅自动化记忆文件改动，无内容孤儿改动。仓库实际 ID 水位与第 4 节一致（news 2026-286、e141、dpa-eu-045/uk-010/ie-014/tr-004）。

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-287`（美国FTC向OpenAI与Anthropic发出民事调查令(CID)：各逾50页、调取安全事件/防护/营销/隐私文件，明确为"潜在诉讼前证据收集"、后续向第三方AI组织发传票；与八个州起诉OpenAI及欧委会AI办公室RFI形成美欧同步执法，2026-10-15，按重大事件补录，Axios首发/CBS确认）、`2026-288`（巴西TSE向Meta发出24小时最后通牒并加倍日罚金至100万雷亚尔（约20万美元）：未证明遵守10-15算法平等对待指令，Meta"需72小时"抗辩被认定自行设定期限，2026-10-19，法新社/海峡时报）、`2026-289`（苹果收购瑞士AI音频初创Samplab资产与团队经欧委会DMA收购披露清单曝光，同清单含Huxe收购；守门人小额并购通报义务首次进入公众视野，2026-10-20，IBTimes UK） |
| 执法动态 | `e142`（巴西TSE最后通牒与罚金加倍）、`e143`（FTC民事调查令）；监管日历新增3节点（10-19最后通牒、10-21合规期限届满、10-15 FTC CID） |
| 各国监管局 | `dpa-eu-046`（欧委会DMA收购披露清单曝光苹果Samplab/Huxe收购，DMA第14条通报义务视角） |
| 法规库 | 无状态变化（本窗口无法规进展） |

> 新增 3 条链接均先经 curl 验证 200（cbsnews / straitstimes / ibtimes；Axios 403、Le Monde 402 弃用）；validate-links 最终 **exit 0**（**新增失效 0**；既有疑似受限含 komu 429、eba 403 等均为历史项）；build 成功（2.06s，单 chunk 1.62 MB）。
> **重点排除（避免重复收录/旧闻甄别）**：①digital-strategy RSS 10-19 的 EN 18286 OJ 援引条目与站内 `2026-282` 同一事件，不重复；②Meta 商业条款 10-19 各跟进稿（securityaffairs 等）为 `2026-284` 已收录事件的语境延续，无新动作；③欧委会对 KKR/NetCo 发出异议声明（10-19）属电信基础设施并购误导信息案，非平台/数字法规合规主赛道，未收录；④Meta 洛杉矶"算法成瘾"1.4 万亿美元审判"预计10月宣判"为媒体预告、判决未落，未单列；⑤ICO 10-14 对伦敦警察局的训诫属公共部门信息治理事务，沿用既有口径未单列；⑥巴西 TSE 事件为 `2026-286`/`e141` 的执法升级延续，新闻流以新动作（罚金加倍+最后通牒）单列而非复述原裁决。
> 判定无新增的源：DPC（最新仍为 10-01 CHI）、EDPB（官网本轮 403，经检索无新公告）、ICO（最新 10-14）、CNIL、presscorner、ENISA/AI Office。
> 执法统计卡未动（口径为欧盟罚款/调查：FTC CID 属美国取证程序、巴西 TSE 罚金属非欧盟司法命令、DMA 收购披露无处罚决定，均不改变 €40.5 亿／52／15）。
> 观察待跟进：①**10-21 苹果 DMA 基本权利诉讼公开听证**（已列监管日历）；②巴西 10-21 24 小时合规期限届满与 10-25 决选（TSE 对 Meta 指令的终极测试）；③FTC CID 是否扩展至第三方 AI 组织与高管作证；④10-30 Meta 商业条款生效前多语言版本对齐；⑤AWS/Azure 守门人认定（11月）；⑥C-627/24 P 正式判决。

## 30. 2026-10-21 每日更新记录（WorkBuddy 自动化）

覆盖窗口 2026-10-20 ~ 10-21（上次执行 10-20）。先 fetch 远程，本地与远程同为 `7ec81ae`，无双管道冲突；起始工作区无内容孤儿改动。仓库实际 ID 水位与第 4 节一致（news 2026-289、e143、dpa-eu-046）。

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-290`（欧委会10-21对Booking.com启动DSA正式调查：虚假房源系统性风险、预订数据钓鱼诈骗、付费排名广告标识三条线，最高可罚全球营业额6%，presscorner IP/26/2223）、`2026-291`（欧委会数字战略总司10-20发布《DSA研究：在线平台金融诈骗及应对方式》：绘制诈骗类型、被利用的平台功能与平台措施）、`2026-292`（苹果DMA基本权利诉讼公开听证10-21在欧盟普通法院举行：互操作义务是否侵犯财产权、App Store是否构成单一CPS、iMessage调查程序瑕疵三线进攻，欧委会回击"只有苹果掌握围墙花园的钥匙"，T-1080/23，彭博/爱尔兰考察者报）、`2026-293`（巴西决选前白热化：卢拉阵营申请取消博索纳罗参选资格指控Meta算法干预助选、博索纳罗阵营反向申请，Meta称已完成TSE整改，10-21法新社）、`2026-294`（欧盟小额包裹关税首个整季数据：德国Q3 Temu/SHEIN/AliExpress销售额同比-35.5%至5.66亿欧元、份额5.3%→3.1%，bevh 10-09数据，补录） |
| 执法动态 | `e144`（Booking.com DSA正式调查）、`e145`（苹果DMA听证）；监管日历新增1节点（10-21 Booking立案；苹果听证节点10-18轮已列） |
| 各国监管局 | `dpa-eu-047`（Booking.com DSA立案：第34/35条系统性风险+第26(1)条广告标识执法视角） |
| 法规库 | DMA（id 1）补入10-21听证攻防要点，updateTime → 2026-10-21；DSA（id 3）补入10-20金融诈骗研究 + 10-21 Booking立案（执法线扩展至交易型平台），updateTime → 2026-10-21 |
| 执法统计卡 | **进行中调查 15 → 16**（Booking.com立案为欧委会新开正式程序，此前其监督清单仅有RFI无在办程序；累计罚款 €40.5亿 与已完成调查 52 不变） |

> 新增 5 条链接均先经 curl 验证 200（presscorner IP/26/2223、digital-strategy 研究页、爱尔兰考察者报 http→https 301 最终200、Hürriyet AMP 200、ecommercenews.eu 301尾斜杠200；presscorner 链接经内容 grep 确认含 Booking+DSA，非猜测编号）。validate-links 最终 **exit 0**（267 有效 / 28 疑似受限 / 3 基线内失效，**新增失效 0**）——疑似受限由 9 升至 28，增量全部为既有站点的临时不可用（CNIL 全站 503、noyb 503、komu 429、EBA 403、荷兰 AP 拒绝连接等），非新增链接问题。
> **Booking presscorner 编号获取方法**：presscorner detail 页对任意编号返回 200，不可猜测；经 2eu.brussels 页面外链提取获得真实编号 ip_26_2223 并 grep 内容验证。
> 已核实排除（避免重复收录）：EN 18286 OJ 援引（10-19 digital-strategy RSS 条目 = 站内 2026-282 同一事件）；KKR/NetCo 异议声明（10-19，电信并购非平台赛道，10-20 轮已排除）；巴西 10-21 双向取消资格申请为 2026-288/e142 的执法升级延续，按新动作（参选资格级法律主张）单列新闻、不另设执法条目；欧委会 10-20/21 其余 presscorner 条目（德国 NGEU 付款、北极战略、渔业、有机规则等）均非数字法规项；意大利 Garante 对 Cairo Editore 的 Garlasco 案照片罚款属传统隐私事件且无 dpa-it 前缀，未收录。
> 判定无新增的源：DPC（最新仍为 10-01 CHI，官网列表已核对）、EDPB（最新 10-13 智能眼镜 / 10-16 Xandr 转发）、ICO、CNIL（本轮全站 503，检索无新执法）、presscorner（10-20/21 无数字法规项）、digital-strategy RSS（10-20 研究已收录为 2026-291、10-21 Booking 已收录、10-19 EN 18286 为既有事件）、ENISA/AI Office。
> 观察待跟进：①Booking 调查走向（临时措施/整改承诺可能性高）；②苹果 DMA 案（T-1080/23）与字节案（C-627/24 P）判决；③10-25 巴西决选与 TSE 对 Meta 指令的最终效果；④11-01 欧盟 2 欧元海关处理费生效与德国 Q4 数据；⑤11-20 ICO 智能体征询截止、11-09 AI Act 实施细则征询截止；⑥10-30 Meta 商业条款生效。

## 31. 2026-10-22 每日更新记录（WorkBuddy 自动化）

覆盖窗口 2026-10-21 ~ 10-22（上次执行 10-21）。先 fetch 远程，本地与远程同为 `0ea6f95`，无双管道冲突；起始工作区仅有自动化记忆文件改动。仓库实际 ID 水位与第 4 节一致（news 2026-294、e145、dpa-eu-047）。

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-295`（欧盟理事会10-21通过《数字综合法案》数字半部谈判授权：个人数据定义维持不变、Cookie 规则留在 ePrivacy 并删除第88b条浏览器信号、泄露通报 72→96 小时、事件通报改成员国国家级单一入口、公共部门可对被指定守门人收取更高数据复用费、废除 P2B 条例，2026-10-21）、`2026-296`（新墨西哥州法官 Francis Mathew 裁定 Meta 支付 250 亿美元民事罚款：法定上限约2195亿裁减至250亿、按15%年息计息、罚金进入州教育经费，Meta 将上诉；同日 Q3 净利受99亿美元和解金拖累，2026-10-21）、`2026-297`（澳大利亚联邦法院救济阶段235页命令：2027-03-01 起澳区开放第三方商店/侧载、替代支付与外部链接，禁收费禁止报复，安全扫描与公证可保留，仅适用澳大利亚，苹果将申请暂缓并上诉，2026-10-22）、`2026-298`（Meta Q3 欧洲广告收入增速降至18%（美加33%），DMA 项下 LPA 低个性化广告首次在财报层面显现实质成本，WIRED，2026-10-22） |
| 执法动态 | `e146`（理事会数字综合法案授权）、`e147`（新墨西哥 Meta 250亿美元）、`e148`（澳洲苹果开放命令）；监管日历新增 6 节点（2026-10-22 澳洲命令、10-21 理事会授权、10-21 新墨西哥裁决、10-23 Fortnite 重返澳区、2027-02-15 延期申请截止、2027-03-01 澳洲开放生效） |
| 各国监管局 | `dpa-eu-048`（理事会就 GDPR/ePrivacy 简化方案定调：数据定义不退让、Cookie 规则不迁入 GDPR、通报改走成员国单一入口） |
| 法规库 | 《数字综合法案》（id 7）摘要全面重写为"理事会立场已定／待议会立场与三方会谈"，status → `审议中（理事会立场已定，待议会立场与三方会谈）`；GDPR（id 4）修订进程中"连续受挫"段替换为 10-21 理事会授权的三项反向修正与其余要点；两者 updateTime → 2026-10-21 |

> 新增 4 条链接均先经 curl 验证 200（2eu.brussels / theguardian / delano.lu / wired）。validate-links 最终 **exit 0**（292 有效 / 7 疑似受限 / 4 基线内失效，**新增失效 0**）——疑似受限由上轮的 28 条回落至 7 条，说明 CNIL/noyb/EBA 等站点已恢复。build 成功（1.95s，单 chunk 1.67 MB），dist 已确认含 2026-295~298 / e146~148 / dpa-eu-048。
> **链接换源记录**：理事会新闻稿官方地址（`consilium.europa.eu/en/press/press-releases/2026/10/21/digital-rulebook-council-agrees-position-to-simplify-data-protection-privacy-and-cyber-reporting-rules/`）对本仓库校验脚本与 curl 一律返回 403（站点级反爬），故按 Ofcom 既有做法改用可校验的 2eu.brussels 整理稿（200，含 163 页主席国文本与理事会立场要点），source 仍标注"欧盟理事会(Consilium)官方新闻稿"；澳大利亚判决官方文本在 `judgments.fedcourt.gov.au`（403）与 Reuters（401）均不可校验，改用 Delano 报道（200，含 85% 诉讼费、$10亿口径与生效时点）。**注意 consilium 新闻稿实际路径含 `digital-rulebook-` 前缀**，按标题猜测的路径会 404。
> **重点排除（避免重复收录）**：①欧委会10-22与可口可乐/雀巢/达能的 CPC 回收声明整改承诺（IP/26/2238）属食品饮料绿色宣称，非平台/数字法规赛道，未收录；②ICO 10-20 对 Ogi Networks 与 Data Cymru 的训诫（ ransomware 致3300人信息泄露）属威尔士公共部门/电信小型机构，沿用既有口径未单列；③EDPB 自身条目最新仍为 10-16 Xandr 转发（已收录为 `2026-282`相关语境），官网 `/news_en` 对 WebFetch 403 但 curl 200，列表已核对至 10-16，无新公告；④"法国要求 TikTok 公布广告记录"仅见 foreignpolicywatchdog 等 AI 生成类站点、细节与 DSA 程序时间线矛盾，未采纳；⑤巴西 10-25 决选与 TSE 对 Meta 指令为在办事项，尚无新裁决。
> 判定无新增的源：DPC（最新仍为 10-01 CHI）、EDPB（10-16 后无新公告）、ICO（10-20 小型机构训诫）、CNIL（10-20 为波城 RGPD 日活动与电话营销网络研讨会预告，10-16 为职业邮箱重建指引与金融领域联合研究）、presscorner（10-21/22 为 Booking 立案已收录、德国 NGEU 付款、CEC 回收声明、多场演讲）、digital-strategy RSS（最新 10-21 Booking 已收录）、ENISA/AI Office（无新公告）。
> 执法统计卡未动（口径为欧盟罚款／调查：理事会立法授权无处罚决定；新墨西哥250亿美元属美国州司法；澳大利亚开放命令属司法救济非罚款；Meta 广告收入放缓为业绩数据，均不改变 €40.5亿／52／16）。
> 观察待跟进：①欧洲议会对数字综合法案的立场（决定三方会谈能否在爱尔兰主席国任内启动）；②澳洲苹果暂缓执行申请与上诉（2027-02 中旬为延期申请窗口）；③新墨西哥裁决的上诉与 15% 年息累积；④LPA 用户比例与欧洲广告单价差（DMA 合规成本的真实刻度）；⑤10-25 巴西决选；⑥10-28 波兰 KRiBSI 启动执法、11-01 欧盟 2 欧元处理费生效、11-09 AI Act 实施细则征询截止。

## 32. 2026-10-23 每日更新记录（WorkBuddy 自动化）

覆盖窗口 2026-10-22 ~ 10-23（上次执行 10-22）。先 fetch 远程，本地与远程同为 `5fa6f73`，无双管道冲突；起始工作区干净。仓库实际 ID 水位与第 4 节一致（news 2026-298、e148、dpa-eu-048）。

| 板块 | 新增 |
|---|---|
| 新闻流 | `2026-299`（SHEIN 以 1 亿美元与美国 FTC 达成和解：涉配送延误与消费者投诉，相当于二季度利润 44%，路透 10-23）、`2026-300`（欧委会向理事会演示《欧盟儿童法》落地细节：15 岁以下禁用美颜滤镜与点赞展示、推送/定位/麦克风默认关闭、22:00–08:00 睡眠时段限制、13–14 岁迷你账户，Rapporteur 10-22）、`2026-301`（Meta 将新版商业条款生效日由 10-30 推迟至 11-20，欧委会称欢迎并已向未披露训练数据摘要企业发 RFI，路透 10-23）、`2026-302`（希腊议会通过 15 岁以下社媒禁令，2027-01-01 生效，路透 10-23）、`2026-303`（美国佛州总检察长提出《Safe Screens Act》：App Store 年龄判定与家长同意、14–17 岁社媒设计默认值、AI 聊天机器人拟人陪伴禁令、每项违规最高 5 万美元，官方 10-22） |
| 执法动态 | `e149`（SHEIN–FTC 1 亿美元和解）、`e150`（MOW 请求欧委会与英国 CMA 叫停 Meta 新版商业条款并申请临时措施，10-22）；监管日历新增 3 节点（11-20 Meta 条款生效、2027-01-01 希腊禁令生效、10-22 佛州提案） |
| 各国监管局 | 本轮无新增（窗口内无 DPA 层面新决定；EDPB 最新仍为 10-16，DPC 10-01，CNIL 最新 10-20 为活动/指引类，10-14 关闭对 Google 的禁令属程序性收尾） |
| 法规库 | 《欧盟儿童法》（id 12）补入 10-22 理事会演示的六项功能控制清单 + 希腊 10-23 立法通过 + 佛州提案的“年龄核验前移”路径；DSA（id 3）补入希腊禁令生效与第 28 条“欧盟方案未定、成员国先行”的双轨期判断；两者 updateTime → 2026-10-23 |
| 执法统计卡 | 未动（SHEIN 和解属美国 FTC 消费者保护、MOW 投诉属竞争法程序且无处罚决定，均不改变 €40.5亿／52／16） |

> 新增 5 条新闻链接均先经 curl 验证 200（straitstimes 转载路透、news.qq.com 编译稿、theglobeandmail 转载路透、thestar.com.my 转载路透、myfloridalegal 官方新闻稿）；执法 2 条分别复用 straitstimes 与 theeuropeanpost（200）。validate-links 最终 **exit 0**（297 有效 / 9 疑似受限 / 3 基线内失效，**新增失效 0**）。build 成功（1.93s，单 chunk 1.70 MB），dist 已确认含 2026-299~303 / e149~150 / Safe Screens / 2027-01-01。
> **链接换源记录**：①《欧盟儿童法》演示文稿的一手报道在 Rapporteur（原 Euractiv，`rapporteur.com`），该站对本仓库校验脚本与 curl 一律 403（站点级反爬，WebFetch 可读），为避免扩大"疑似受限"清单，改用腾讯新闻的同源编译稿（200，正文注明编译自 Rapporteur 10-22、作者 Anupriya Datta，并附原文链接），source 标注两段来源；②Meta 条款推迟的首选源 MarketScreener 403，改用环球邮报转载路透原稿（200，与 Reuters 原文同稿）；③el-fondo 虽 200 但页面标注发布日为 10-24（时区/自动稿），日期口径不可靠，弃用；④佛州提案优先采用州总检察长办公室官方新闻稿（200，Release Date 10-22），ClickOrlando 仅作背景核对。
> **重点排除（避免重复收录/旧闻甄别）**：①**Yango（MLU B.V.）1 亿美元 GDPR 罚单**——10-23 由 britpanorama 等聚合站"重新发布"，经交叉核对为 **2026 年 5 月**荷兰 AP 牵头（芬兰、挪威协同）作出的决定（Babel、RFE/RL 均记为"In May"），非本窗口事件，未收录；②意大利第 179/2026 号立法令 10-23 生效 = 站内 `2026-263` 同一事件（10-08 刊出/10-23 生效已在条目中载明），不另设新闻；③欧委会 10-22 欧洲议会"全球 AI 治理"辩论与 AI 责任指令撤回争议（S&D 呼吁设全球论坛并重启责任立法）属政策辩论、无立法动作，未单列，仅在法规库语境中体现；④CNIL 10-14 关闭对 Google 的禁令（决定日 2026-09-23）属程序性收尾，未单列；⑤Apple App Store "群组订阅"（10-22 开发者公告）属产品功能，非合规事件；⑥欧委会 PID（产品标识符）11-01 起强制申报为既有海关改革落地，站内法规库（id 13/14）已覆盖，不重复；⑦ENISA 关于 CRA 报告义务延续至停产产品的澄清缺一手公告页与明确日期，未收录。
> 判定无新增的源：DPC（最新仍为 10-01 CHI，列表已核对）、EDPB（`/news_en` curl 200，最新 10-16 Xandr 转发，已收录）、ICO（最新 10-20 威尔士两家机构训诫，公共部门/小型电信，沿用既有口径）、CNIL（10-20 波城 RGPD 日与电话营销研讨会、10-19 职业邮箱与金融数据研究，均非执法）、presscorner（10-22/23 无数字法规项）、digital-strategy RSS（最新 10-21 Booking 已收录；10-19 EN 18286 = `2026-282`）、ENISA/AI Office（无新公告）。
> 观察待跟进：①11-20 Meta 修订条款生效前是否出现临时措施决定（MOW/德国出版商会投诉走向）；②希腊 2027-01-01 禁令的年龄核验实施细则与七个成员国的统一方案；③《欧盟儿童法》在欧洲议会/理事会的修订（年龄、范围、SME、AI 保障）与 11-26 公众征询截止；④佛州《Safe Screens Act》能否进入州议会表决（应用商店责任条款的行业反弹）；⑤SHEIN 与 FTC 和解协议正式文本（是否含整改义务与后续审计）；⑥10-25 巴西决选、11-01 欧盟 2 欧元处理费与 PID 申报、11-09 AI Act 实施细则征询截止、C-627/24 P 判决。
