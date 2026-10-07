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
| `/enforcement` | `src/pages/Enforcement.tsx` | 执法动态（含顶部统计卡 + 监管事件时间线） | 102（其中 `e46` 为历史重复 ID） |
| `/dpas` | `src/pages/DPAs.tsx` | 各国监管局（支持关键词搜索 + 机构筛选） | 68 |

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

| 数据源 | 格式 | 当前最大（2026-10-07） |
|---|---|---|
| 主新闻流 | `2026-NNN` | **2026-248**（10 月起新建 `2026-10.ts`，index.ts 已同步） |
| 执法动态 | `eN` | **e106** |
| 各国监管局 | `dpa-{eu\|ie\|uk\|tr\|fr\|de\|ch}-NNN` | dpa-eu-034 / dpa-ie-014 / dpa-de-004 / dpa-ch-004 / dpa-fr-002 / dpa-uk-006 / dpa-tr-003 |
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
