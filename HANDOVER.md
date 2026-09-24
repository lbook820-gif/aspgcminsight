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
| `/laws` | `src/pages/Laws.tsx` | 法规库（14 部：DMA、AI Act、DSA、GDPR、NIS2、CRA、Data Act、CADA…） | 14 |
| `/enforcement` | `src/pages/Enforcement.tsx` | 执法动态（含顶部统计卡 + 监管事件时间线） | 73 |
| `/dpas` | `src/pages/DPAs.tsx` | 各国监管局（支持关键词搜索 + 机构筛选） | 42 |

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

| 数据源 | 格式 | 当前最大（2026-09-23） |
|---|---|---|
| 主新闻流 | `2026-NNN` | **2026-230** |
| 执法动态 | `eN` | **e91** |
| 各国监管局 | `dpa-{eu\|ie\|uk\|tr\|fr\|de\|ch}-NNN` | dpa-eu-031 / dpa-ie-012 / dpa-de-003 / dpa-ch-004 / dpa-fr-002 / dpa-uk-005 / dpa-tr-003 |
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
