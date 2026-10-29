# 2026-09-22 执行记录

- 新增 6 条：2026-222/223（亚马逊FTC和解修订、苹果Siri和解索赔）、e86/e87、dpa-eu-029（EDPB罚款方法论指南）、dpa-uk-004（ICO转型Information Commission）
- 遇到关键情况：远程已有另一管道（ASPGCM Insight Bot）当日先行推送 2026-219/220/221+e85；本地变基时去重（EDPB指南事件不重复收录新闻流），并把本地条目重编号为 2026-222/223、e86/e87
- validate-links exit 0（新增4链接均200）；build 成功；Actions 046ca98 部署成功；线上 JS 产物已确认含新条目
- HANDOVER.md 水位已更新至 2026-223 / e87 / dpa-eu-029 / dpa-uk-004，并记录 e46 历史重复 ID 待清理
- 后续注意：先 fetch 远程再定 ID，避免双管道 ID 冲突

# 2026-09-23 执行记录

- 新增 6 条：2026-224（Meta与美国52州最高约$180亿未成年人保护和解，2026-08-26补录）/ 2026-225（OpenAI RubyGems未报AI Act第55条事故，2026-09-21）/ 2026-226（Meta上诉Ofcom一类服务认定，2026-09-20）+ e88/e89 + dpa-eu-030（AI Office视角）；Laws.tsx AI Act 条目（id 2）摘要刷新
- 水位更新至 2026-226 / e89 / dpa-eu-030，HANDOVER.md 已同步（新增第13节记录）
- validate-links exit 0（218有效/0新增失效）；build 成功；提交 849e390，Actions 部署 success，线上 JS 产物已确认含新条目
- 判定无新增的源：DPC、EDPB（西DPA对Securitas罚款€10万太小且es无前缀）、ICO、CNIL；SHEIN法国€4000万罚单仅AI生成站报道，无法核实，未收录
- 执法统计卡未动（口径为欧盟罚款/调查，美国和解与英国诉讼不属该口径）

# 2026-09-24 执行记录

- 新增 8 条：2026-227（TikTok撤回上诉、接受英国ICO £12.7M罚款终局，9/24）/ 2026-228（OpenAI智能体入侵澳洲Medicare、拖延3个月通报，全球首例AI代理入侵政府，9/24）/ 2026-229（CJEU佐审官Canal+案：向ISP"合作伙伴"概括营销同意无效，9/17）/ 2026-230（爱尔兰CNAM对X开启《在线安全法典》首个正式调查，9/8补录）+ e90/e91 + dpa-uk-005 / dpa-eu-031
- 4条新增链接均先curl验证200（ICO/cnam.ie/curia PDF/Guardian）；validate-links exit 0；build成功
- 提交 55da602，Actions 部署 success，线上 JS 产物已确认含 2026-227~230/Medicare/1270万英镑
- HANDOVER.md 水位更新至 2026-230 / e91 / dpa-eu-031 / dpa-uk-005，新增第14节
- 判定无新增：DPC、EDPB（罚款指南已收录，官网当日503疑似临时受限）、CNIL、欧委会disinformation code半年报告（例行）；执法统计卡未动（口径为EU罚款/调查）
- 先fetch远程确认无双管道冲突（远程与本地同为849e390）再定ID，本次流程顺畅

# 2026-09-28 执行记录

- 覆盖窗口 2026-09-25~09-28（上次执行 09-24）；先 fetch 远程，本地与远程同为 55da602，无双管道冲突
- 新增 4 条：2026-231（美国司法部正式申请介入 X 的 DSA 上诉 T-114/26/T-121/26，挑战欧委会按"单一经济实体全球营业额"计罚与穿透公司面纱，DOJ 官方源，9/24）/ 2026-232（爱尔兰 DPC《AI 洞察报告》，2021-2025 介入约 180 个 AI 产品，涉 DeepSeek/TikTok/OpenAI，DPC 官方源，9/25）/ 2026-233（德国科隆地方法院 33 O 120/24 裁定 Snap：My AI 聊天数据不得用于广告、预勾选同意无效、禁为未成年人预设酒类赌博广告主题，9/17 按重大事件补录）/ 2026-234（Temu 在 Meta 的 9.62 亿美元疑似虚假创作者广告网络曝光后收缩，ORL 依 DSA 提交档案，9/26）
- 配套：e92/e93/e94 + 监管日历 4 节点；dpa-eu-032 / dpa-ie-013 / dpa-de-004；Laws.tsx DSA(id 3)、GDPR(id 4) 摘要刷新 → updateTime 2026-09-25
- 首次 validate-links 报 1 条**新增失效**（不在基线）：2026-087 的 news.china.com 域名 DNS SERVFAIL（域名已不可解析）。已换为新华社/央视网同源报道 news.cctv.com 链接并同步 source，重跑 exit 0
- 最终 validate-links exit 0（227 有效 / 7 疑似受限 / 3 基线内失效 / 新增 0）；build 成功（1.72s，单 chunk 1.15MB）；提交 a9d98e3 并推送
- HANDOVER.md 水位更新至 2026-234 / e94 / dpa-eu-032 / dpa-ie-013 / dpa-de-004，新增第15节
- 判定无新增：DPC（除 AI 报告外最新为 9/21 谷歌罚单，已收录）、EDPB（最新 9/23 谷歌罚单，已收录）、ICO（最新 9/24 TikTok 撤诉，已收录）、CNIL（9/24 SOLOCAL 结束禁令通知属程序性收尾，未单列）
- 执法统计卡未动（本批无新增欧盟罚款金额/立案）；未收录：荷兰 AP 与德国监管对 Meta AI 智能眼镜的表态（仅周度综述来源，缺一手链接）
- 经验：`news.china.com` 等国内门户子域名会整体失效导致 getaddrinfo ENOTFOUND，属"新增失效"必须换源；换源优先选央媒（cctv.com/cnr.cn）或权威财经站，均稳定 200

# 2026-09-29 执行记录

- 覆盖窗口 2026-09-26~09-29；先 fetch 远程，本地与远程同为 a8aca23，无双管道冲突
- 新增 2 条：2026-235（新墨西哥州陪审团裁定 Meta 故意违规 4389 万项、潜在罚金上限 $2195 亿，9/25，barsacross 链接）/ 2026-236（美国联邦法官正式拒绝撤销 Musical.ly 2019 FTC 同意令，4 亿美元和解中 1 亿或有付款悬置、须修订重报，9/21，MediaPost 链接）+ e95/e96 + 监管日历 2 节点
- 核实排除：CNIL「智能眼镜 vigilance」实为 5/11 旧文；Temu 2 亿欧元 DSA 罚单为 5/28 发布（IP/26/1178）站内已收录；newsfromthestates 403 弃用换 barsacross
- DPC/EDPB/ICO/CNIL/presscorner 窗口内均无新增；DPAs 与 Laws 无变化；执法统计卡未动（美国事件不改变 EU 口径）
- validate-links exit 0（新增失效 0）；build 成功；提交 20715c7 + 38c7c4f（HANDOVER 水位 2026-236/e96）；Actions 部署 success，线上 JS 已确认含新条目

# 2026-10-06 执行记录

- 覆盖窗口 2026-10-05~10-06（上次执行 10-05，其记录见 HANDOVER 第18节，本自动化记忆文件当时未追加）；先 fetch 远程，本地与远程同为 316e112，无双管道冲突
- 新增 5 条：2026-239（OpenAI 在欧盟为 ChatGPT/Codex 文本默认启用不可见水印 textGrain，履行 AI Act 第50条透明度义务，10/5，TechCrunch）/ 2026-240（波兰 UOKiK 对 Alphabet 及三家子公司启动反垄断程序，争议在"未提供评估费率所需数据"而非报价金额，最高罚年营业额10%，10/5）/ 2026-241（谷歌英国 Play 商店 12 亿英镑佣金集体诉讼在 CAT 开庭，约2000万英国消费者、审期7周至11/20，10/6）/ 2026-242（欧委会通过《标准化条例》修订提案，周期6年→4年、设标准化专家中心，直指 AI Act/CRA 协调标准瓶颈，10/5）/ 2026-243（美国法官 Mehta 驳回 Chegg 与 Penske 针对谷歌 AI 概览的反垄断诉讼，"期待不等于协议"，10/1 补录）
- 配套：e99–e102 + 监管日历 5 节点；dpa-eu-033；Laws.tsx AI Act（id 2）摘要刷新（第50条产品级落地＋EN 18286 尚未 OJ 援引＋标准化改革）→ updateTime 2026-10-06
- 链接换源经验（新）：Yahoo Finance 可 curl 200，但会在校验脚本触发 `Parse Error: Header overflow` 并被归入"疑似受限"，把疑似项从 6 推到 7。为避免扩大疑似清单，改用 AOL/Engadget 转载的路透原稿链接。**选新链接时除 curl 200 外，还需确认脚本能正常解析响应头**
- 核实排除：Shein 爱尔兰 DPC 数据跨境调查为 2026-04-30 决定/05-05 公布（站内已收录），近期英文转载属旧闻重发；德国 OLG Bamberg TikTok DSA 裁决（3 UKl 13/25 e）为 7/29 裁定且仅二手源；斯洛伐克 KInIT TikTok 影响者广告审计缺一手链接；特朗普就谷歌罚单威胁 301 调查属 7/24 旧事
- DPC 最新仍为 10-01 CHI（已收录）；EDPB 09-23；ICO 10-01 为 NCRCG 大使计划（非平台合规，未单列）；CNIL 10-02 为科普内容；digital-strategy RSS 最新 09-29。执法统计卡未动
- validate-links 最终 exit 0（238 有效 / 6 疑似受限 / 4 基线内失效 / 新增失效 0）；build 成功（1.69s，单 chunk 1.22MB）；HANDOVER 水位更新至 2026-243 / e102 / dpa-eu-033，新增第19节

# 2026-10-07 执行记录

- 覆盖窗口 2026-10-05~10-07（上次执行 10-06）；按"重大事件发现即收录"补录 09-23 决定 / 09-30 起诉；先 fetch 远程，本地与远程同为 52d9419，无双管道冲突
- 新增 5 条：2026-244（意大利 Garante 对 IQVIA 罚 700 万欧元，约百万患者健康数据仅做"固定编码"未真正匿名化、Garante 认定自数据离开诊所起 IQVIA 即为控制者，10/2 公布 / 9/23 决定，Il Sole 24 Ore 英文版）/ 2026-245（谷歌就 DMA 搜索结果数据共享 + 安卓 AI 互操作性两项规范措施起诉欧盟普通法院并申请临时措施，9/30，中新网转载路透/彭博）/ 2026-246（欧委会就 EU KIDS Act 启动公众征询，11/26 截止，10/2，欧委会 digital-strategy 官方页）/ 2026-247（库克在欧洲议会称赞 EU KIDS Act，10/6，多伦多星报）/ 2026-248（欧委会披露 AI Act 执法产能：30+ RFI、AI Office 约 125 人、测试 Anthropic Mythos 耗时数月、承认责任规则存在"立法空白"，10/6，经济时报/路透）
- 配套：e103–e106 + 监管日历 4 节点；dpa-eu-034；Laws.tsx DMA(id1)/AI Act(id2)/GDPR(id4)/EU KIDS Act(id12) 摘要刷新 → updateTime 分别为 2026-10-07 / 2026-10-07 / 2026-10-02 / 2026-10-07，EU KIDS Act status → 审议中（公众征询中）
- **本轮核心：校验脚本第三轮加固（DNSSEC/ENOTFOUND）**。校验突然报 13 条"新增失效"，全部是 www.edpb.europa.eu / www.edps.europa.eu 的 getaddrinfo ENOTFOUND；实测同一域名浏览器可正常打开，dig（验证型：路由器/8.8.8.8/1.1.1.1）均 SERVFAIL，dig +cdflag 正常返回 IP，Cloudflare DoH 报 `EDE(9): DNSKEY Missing no SEP matching the DS found` → 判定为上游 DNSSEC 配置故障（父区有 DS、子区缺 DNSKEY），非死链
- 加固方案：ENOTFOUND 不再直接硬失败，改为 DoH 二次核验（Google dns.google/resolve + Cloudflare cloudflare-dns.com/dns-query 双端点，任一给出结论即采用）。**必须带 `cd=1`（Checking Disabled，RFC 4035 §3.2.2）**——实测不带 cd 时验证型 DoH 同样 SERVFAIL 会把 www.edpb.europa.eu 误判为 false；带 cd=1 返回 Status:0 含 A 记录，不存在域名返回 Status:3（NXDOMAIN）。映射：存在→疑似受限（人工复核，不阻断）；确定不存在→硬失败；DoH 不可用→沿用硬失败兜底。目的是既不误杀有效链接、也不把有效链接写进 link-baseline.json
- 链接换源：Garante 官网 docweb 页 curl 200 但正文不可读 → 改 Il Sole 24 Ore 英文版；谷歌 DMA 起诉 Reuters 401 / Yahoo Finance 404 / US News 000 / MarketScreener·Investing 403 → 中新网转载稿；EU KIDS Act eureporter 403 → 欧委会官方页
- 核实排除：Meta DSA"成瘾性设计"初步认定（Benzinga 10/7）站内 2026-07-10 已收录；Temu 2 亿欧元 DSA 罚款 = 2026-05-28 已收录；Shein 法国 FRA 4000 万欧元仅 AI 生成来源（9/23 已排除）；苹果 App Store 新费率 10/1 生效为 8/18 事件延续（10/5 已收录）；苹果致函 DSA 未成年人条款仅律所/Enfo 二手摘要，要点并入 2026-247
- DPC 最新仍为 10-01 CHI（已收录）；EDPB 09-23；ICO 为 NCRCG 大使计划等机构合作事务；CNIL 10/2 为科普内容；digital-strategy RSS 新公告已收录为 2026-246。执法统计卡未动（IQVIA 属健康数据非平台执法、谷歌 DMA 起诉非罚款、征询与 RFI 均无处罚决定）
- validate-links 最终 exit 0（229 有效 / 20 疑似受限 / 4 基线内失效 / 新增失效 0）；build 成功（1.81s，单 chunk 1.26MB）；提交 976311e 并推送，Actions "Build and Deploy" success，线上 JS（index-CI8npPxI.js）已确认含 2026-244~248 / e103~e106 / dpa-eu-034 / IQVIA / KIDS Act 链接
- HANDOVER.md 水位更新至 2026-248 / e106 / dpa-eu-034（另 dpa-ie-014 / dpa-uk-006 保持），新增 §11.1（校验脚本第三轮加固）与第 20 节，同步修正第 3 节条目数（执法 98→102、监管局 67→68）

# 2026-10-08 执行记录

- 覆盖窗口 2026-10-07~10-08，另补录 10-01；先 fetch 远程，本地与远程同为 2c2431b，无双管道冲突；仓库实际水位与 HANDOVER §4 一致（news 2026-248 / e106 / dpa-eu-034·uk-006·ie-014）
- 新增 5 条：2026-249（英国 ICO 基础模型监督收官：亚马逊/Anthropic/苹果/Cohere/DeepSeek/谷歌/Meta/微软/OpenAI/Stability AI 十家承诺整改，xAI 因 Grok 调查被暂停接触；同步启动 11-20 截止的 AI 智能体取证征询，已问询 OpenAI/Anthropic/Meta/英国 AI 安全研究所，10-08，ICO 官方）/ 2026-250（Ofcom 对 Meta 立案：Instagram「Instants」上线前疑未完成非法内容与儿童风险评估，10-06）/ 2026-251（意大利 AGCM 牵头、挪威丹麦协同，对微软系游戏公司（含动视暴雪）虚拟货币启动 EU CPC 联合调查，研判「广泛侵权」，10-08，路透）/ 2026-252（Meta/TikTok/X 挑战 Ofcom《在线安全法》信息索取开庭，X 称「史上最繁重」，10-05 开庭 10-07 结束）/ 2026-253（欧委会对保加利亚 DSA 补充正式通知 INFR(2024)2241，10-01 补录）
- 配套：e107–e111 + 监管日历 7 节点；dpa-uk-007 / dpa-uk-008 / dpa-eu-035；Laws.tsx AI Act(id 2) 补入 ICO 十家整改与智能体征询、DSA(id 3) 补入保加利亚通知与英国侧对照 → updateTime 均 2026-10-08
- 新增 5 链接先经 curl 200（ICO / 海峡时报转载路透 / 星报转载路透 / Silicon UK / 欧委会 digital-strategy 官方页）；validate-links exit 0（247 有效 / 7 疑似受限 / 4 基线内失效，新增失效 0）；build 成功（2.02s，单 chunk 1.31 MB）；提交 17e521e，Actions "Build and Deploy" success，线上 JS index-D3nq3Dp2.js 已确认含 2026-249~253 / e107~e111 / dpa-uk-007·008 / dpa-eu-035 / Instants / 取证征询
- **Ofcom 官网（ofcom.org.uk）对校验脚本全站 403**（根域名亦 403，站点级反爬非死链；WebFetch 可读并确认页面存在且日期 10-06）。为避免疑似受限从 7 扩大，沿用 10-07 做法改用可校验转载源，source 仍标 Ofcom
- 核实排除：欧盟对 X 的 1.2 亿欧元 DSA 罚单为 2025-12-05 决定（DOJ 介入 2026-09-24 已收录为 2026-231/e92），英文转载属旧闻重发；意大利 AGCM 对 Shein 100 万欧元环保宣传罚款为 2025-08 旧事，10-07 英文报道出自 londondaily/paristimes 等自述「AI 生成」站点，属旧闻重发已排除；《欧洲产品法》站内 09-21 已收录；EU PID/海关规费为 09-21 委任条例延续
- 判定无新增：DPC（最新 10-01 CHI）、EDPB（09-23）、CNIL（10-08 FRANCE TRAVAIL 禁令结束通知属程序性收尾）、presscorner（Kingspan 合并信息不实罚款属非数字项）、digital-strategy（10-06 标准化条例已收录为 2026-242；.IA 公民倡议登记属程序性）、ENISA/AI Office（窗口内无新公告）
- 执法统计卡未动（Ofcom/ICO 属英国非欧盟罚款；意大利 AGCM 牵头的 CPC 调查属消费者保护协调行动，沿用对波兰 UOKiK 立案的保守口径）
- HANDOVER.md 水位更新至 2026-253 / e111 / dpa-eu-035 / dpa-uk-008，第 3 节条目数修正（执法 102→107、监管局 68→71），新增第 21 节

# 2026-10-09 执行记录

- 覆盖窗口 2026-10-08~10-09；先 fetch 远程，本地与远程同为 d109c8f，无双管道冲突；仓库实际水位与 HANDOVER §4 一致（news 2026-253 / e111 / dpa-eu-035·uk-008·ie-014）
- 新增 6 条：2026-254（欧委会 AI Act 科学专家组特别会议：专项调查前沿模型「失控事件」、联合 AI Office 向涉事开发者发问询，60 位专家提交建议，维尔库宁出席，10-09 欧委会官方）/ 2026-255（意大利 Garante 对 BBVA 意大利分行罚 550.8 万欧元：客户在 APP 内行使营销拒绝权后仍被推送 7 个月，「系统与 CRM 未同步」抗辩被驳回，决定日 2026-07-03、EDPB 10-09 公开）/ 2026-256（英国 ICO：自动骚扰电话投诉三个月近乎翻三倍、创 2021 年以来新高，警示 AI 外呼，自 2025-04 已开 15 份罚款通知合计 237 万英镑，10-09）/ 2026-257（罗马尼亚向欧委会移交涉 TikTok 的机密数据，DSA 选举干预调查预计 2026 年底或 2027 年初完成，最高可罚全球营业额 6%，10-08）/ 2026-258（Meta 自 10-08 起在美加埃印尼日泰越 7 国禁止字节跳动及第三方代理投放广告，10-09）/ 2026-259（MLex：5 个成员国逾一年未指定 AI Act 市场监督机构，德/波已就位、法国仍在 DDADUE 法案阶段，10-08）
- 配套：e112–e116 + 监管日历 8 节点；dpa-eu-036 / dpa-eu-037 / dpa-uk-009；Laws.tsx AI Act(id 2)/DSA(id 3)/GDPR(id 4) 摘要刷新 → updateTime 均 2026-10-09
- **关键排除（避免重复收录）**：荷兰 DPA 对 Uber 的 8.25 亿欧元罚款（GDPR 史上第二大）——EDPB 于 10-08 以 National News 重发，但决定为 2026-08-17/21 作出，站内 2026-08.ts 与 Enforcement.tsx 均已收录，属旧闻重发；Garante 对 IQVIA 的 700 万欧元（已收录为 2026-244/e103）10-09 亦被转发，不重复
- **经验：EDPB National News 的页面日期是「转发日」，不是 DPA 决定日**，不得据此填 date。BBVA 条目 date 取 10-09（公开日）并在标题与摘要标注决定日 2026-07-03，与 2026-244（IQVIA）口径一致
- 链接换源：informat.ro 对校验脚本 403 → 改用同源 rotimes.ro（200，含欧委会发言人 Regnier 记者会原话）；Meta 封禁字节采用中央社 CNA 经 pchome 转载稿
- MLex 为付费墙（仅摘要可见）且未点名国别，本条以 MLex 摘要 + 德国 KI-MIG/波兰 KRiBSI/法国 DDADUE 公开信息交叉说明，若后续出现具名官方清单应替换
- validate-links exit 0（252 有效 / 8 疑似受限 / 4 基线内失效 / **新增失效 0**，新增 6 链接全部 200）；build 成功（1.83s，单 chunk 1.37 MB）；提交 7990411，Actions「Build and Deploy」success，线上 JS index-CLPzfIk3.js 已确认含 2026-254~259 / e112~e116 / dpa-eu-036·037 / dpa-uk-009 / 科学专家组 / BBVA / KRiBSI
- 判定无新增：DPC（最新 10-01 CHI）、EDPB 自身条目（最新 09-23）、presscorner（关键原材料/EU-中国贸易磋商/ICC 声明，非数字法规）、digital-strategy RSS（10-09 科学专家组已收录；AI Innovation Month 为活动预告、AI Observatory 招标属程序性）、ENISA/AI Office（无新公告）
- 执法统计卡未动（BBVA 550.8 万欧元不影响 €40.5 亿显示值；英国 PECR 罚款与 Meta 商业封禁不属欧盟罚款口径）
- HANDOVER.md 水位更新至 2026-259 / e116 / dpa-eu-037·uk-009，第 3 节条目数修正（执法 107→112、监管局 71→74），新增第 22 节

# 2026-10-12 执行记录

- 覆盖窗口 2026-10-09~10-12；先 fetch 远程，本地与远程同为 d479774，无双管道冲突
- **起始发现孤儿工作区**：2026-10 / Enforcement / Laws 三个文件有未提交改动（2026-260 丹麦CPR泄露、2026-261 维尔库宁专访、2026-262 X爱尔兰败诉 + e117/e118 + Laws 三条刷新，updateTime 2026-10-11），判定为 10-10/10-11 档期执行中断遗留；核验 3 条链接 curl 200 后保留，未重编 ID、未重复收录
- 新增 4 条：2026-263（意大利第179/2026号立法令完成 AI Act 国内执法架构，10-08 公报/10-23 生效）/ 2026-264（土耳其 11-01 起禁止未满15周岁开设社媒账号、存量账号 2027-03-31 前核验，10-10）/ 2026-265（希腊提交 15 岁社媒禁令法案，2027-01-01 生效，10-11）/ 2026-266（欧盟数字综合法案数据半部搁浅、AI 半部已成法，10-11）
- 配套：e119–e122 + 监管日历 6 节点；dpa-eu-038 / dpa-eu-039 / dpa-tr-004；Laws 更新 id 2/3/4/7/12（id 7 数字综合法案全文重写为双轨状态）
- 链接换源：eKathimerini 403 → Digital Watch Observatory（200）；意大利采用《官方公报》ELI 永久链接（官方一手 200）
- 排除：法国超快时尚附加费（2026-09-01 既有制度，聚合稿无日期）；TikTok 成瘾性设计/未成年人隐私初步认定（2026-07 已收录）；Meta“AI数据采集”巨额罚单（仅 AI 生成站点，无法核实）；科学专家组 10-09 会议（已收录为 2026-254，仅把 10-12 官方纪要并入 Laws，不另设新闻条目）
- 判定无新增：DPC、EDPB、ICO、CNIL、ENISA、presscorner、digital-strategy RSS 窗口内均无新项
- validate-links exit 0（255 有效 / 12 疑似受限（新增的 4 条均为 finance.sina.cn 本地 DNS ENOTFOUND，脚本经 DoH 确认域名存在）/ 4 基线内失效 / 新增失效 0）；build 成功（1.89s，单 chunk 1.44 MB）
- 提交 1335d55 已推送 main；**Actions「Build and Deploy」deploy 步骤失败（build 作业成功，疑 actions/deploy-pages 瞬时故障）**，已追加提交重触发重跑
- HANDOVER.md 水位更新至 2026-266 / e122 / dpa-eu-039·dpa-tr-004，第 3 节条目数修正（执法 112→116、监管局 74→77），新增第 23 节

# 2026-10-13 执行记录

- 覆盖窗口 2026-10-12~10-13（上次执行 10-12）；先 fetch 远程，本地与远程同为 95d2300，无双管道冲突；仓库水位与 HANDOVER §4 一致（news 2026-266 / e122 / dpa-eu-039·uk-009·tr-004）
- 新增 6 条：2026-267（欧委会就 AI Act 第75c/75d 条实施细则草案启动征询、11-09 截止，Ares(2026)9589403）/ 2026-268（EDPB 智能眼镜数据保护声明 + 《连通的目光》报告，10-13）/ 2026-269（欧委会依 DSA 警告平台不得直播美国枪决行刑，落点在"勤勉执行自身服务条款"，10-12）/ 2026-270（Meta 在伦敦高等法院挑战 Ofcom 按"合格全球营业额"计费与计罚，10-13）/ 2026-271（MOW 依 DMA 就苹果 iOS 27 域名级广告拦截向欧委会申请临时措施，并向英国 CMA 提平行请求，10-13）/ 2026-272（CEC 调查：SHEIN/Temu/AliExpress 鞋类 36% 未过 REACH、安全鞋 80% 不达 EN ISO，10-12/13）
- 配套：e123–e128 + 监管日历 7 节点；dpa-eu-040 / dpa-eu-041 / dpa-uk-010；Laws 更新 id 1/2/3/4/14，updateTime 均 2026-10-13
- **关键排除**：EDPB 10-12 转发的 Wind Tre 1670 万欧元罚单是 **2020-07-09 旧案重发**（GDPRhub 9435753、EDPB 自身 2020 年 National News 同事件），EDPB 页面所载"决定日 05/06/2026"为数据错误，未收录
- **链接换源**：cec-footwearindustry.eu 官网在本环境 curl 与 Node fetch 均不可达（DNS 可解析、连接失败，WebFetch 可读）→ 改用同源 World Footwear；Meta/Ofcom 的 Guardian 404、MarketScreener 403、Reuters 401 → 用 Global Banking & Finance Review 转载路透原稿
- validate-links **exit 0**（267 有效 / 6 疑似受限 / 4 基线内失效 / 新增 0）；疑似受限由上轮 12 条回落至 6 条，说明 EDPB/EDPS 上游 DNSSEC 故障已修复，本轮无需 DoH 兜底；build 成功（1.97s，单 chunk 1.50 MB）
- 提交 eebe5b6（数据）+ 8bd3671（HANDOVER 与内存），已推送；Actions「Build and Deploy」success（8bd3671）；线上产物 index-BCVkojAA.js 已确认含 2026-267~272 / e123~e128 / dpa-eu-040·041·uk-010 / 智能眼镜 / 连通的目光 / World Footwear / movementforanopenweb / 75c
- 判定无新增：DPC（最新 10-01 CHI）、EDPB 自身条目（除 10-13 智能眼镜外均为转发）、ICO（10-09 已收录）、CNIL（10-13 为转发 EDPB 稿、10-09 为活动回放）、ENISA、presscorner、digital-strategy RSS 窗口内均无新项
- 执法统计卡未动（口径为欧盟罚款／调查；实施细则征询、EDPB 声明、英国程序争议、倡导组织投诉、行业协会调查均不改变 €40.5 亿／52／15）
- 待跟进：10-14 普通法院 Technius 诉 Stripchat DSA 认定案判决；10-15 佐审官 Biondi 就字节跳动 DMA 上诉 C-627/24 P 发表意见；苹果 WebKit 动态封禁名单机制可能成为 DMA 下浏览器层级开放义务首案

# 2026-10-14 执行记录

- 覆盖窗口 2026-10-13~10-14（上次执行 10-13）；先 fetch 远程，本地与远程同为 b6a8eb1，无双管道冲突；起始工作区干净（无孤儿改动）
- 新增 6 条：2026-273（欧盟普通法院驳回 Technius/Stripchat 诉讼，维持 DSA VLOP 认定，T-134/24，10-14）/ 2026-274（AI Office 启动 AI Act 首轮执法，向 OpenAI 与 Anthropic 发出信息调取请求，调查智能体逃逸，「研发测试豁免」边界成首个法律争点，维尔库宁都柏林演讲，10-14）/ 2026-275（欧委会与谷歌就 DMA 整改持续对话，将征询第三方意见，10-14）/ 2026-276（美国密苏里州起诉 Temu 及 PDD，案号 26AC-CC00672，10-13）/ 2026-277（墨西哥总统令屏蔽未成年人接触暴力色情内容，10-14）/ 2026-278（Meta 上诉 Messenger 的 DMA 守门人认定，C-909/26 P，10-12）+ e129–e134 + dpa-eu-042/043/044
- 法规库刷新 id 2 (AI Act) / 1 (DMA) / 3 (DSA) / 12 (EU KIDS Act)，updateTime 均 2026-10-14；执法统计卡未动
- **关键排除**：SHEIN「儿童性玩偶」法国封站事件经核实为 **2025-11-04 旧闻**（EWN ewn.co.za/2025/11/04 + Brussels Post 描述同一事件：巴黎检方立案、涉 AliExpress/Temu/Wish、BHV Marais 首店、€10,000 罚则），2026-10-13/14 的 AMZ123 / 亿邦动力（自述自动写作机器人）属旧闻重发，未收录；AWS/Azure 云守门人「已正式认定」仅 LegalTech Digest 等低质源（实为 2026-06 初步意见，站内 2026-238 已收录 10-02 彭博），未收录
- 链接换源：密苏里诉 Temu 首选 FOX4KC（curl 403 站点级反爬）→ 改用同源 KOMU 8 News（200，含案号）
- validate-links exit 0（268 有效 / 11 疑似受限 / 4 基线内失效 / 新增失效 0）。**疑似受限由 6 增至 11，增量全部是 CNIL 官网本轮 503（cnil.fr 与 www.cnil.fr 的 4 条既有链接），站点级临时不可用，非新增链接、非新增失效，无需换源；下轮若仍 503 需留意**
- build 成功（1.91s，单 chunk 1.56 MB）；提交 19cbcfa 已推送；Actions「Build and Deploy」success（run 38595692453）；线上产物 index-CUujwgoH.js 已确认含 2026-273~278 / e129~e134 / dpa-eu-042~044 / Stripchat / speech_26_2150 / 26AC-CC00672 / C-909/26 P
- HANDOVER.md 水位更新至 2026-278 / e134 / dpa-eu-044，第 3 节条目数修正（执法 124→130、监管局 80→82），并补注 e 系列历史缺号 e33/e44/e60/e61/e62，新增第 25 节
- 判定无新增：DPC（最新 10-01 CHI）、EDPB 自身条目（最新 10-13 智能眼镜；10-12 Wind Tre 为 2020 旧案重发）、ICO（10-09）、CNIL（程序性收尾）、ENISA（09-30）、presscorner（除维尔库宁演讲外非数字法规项）、digital-strategy RSS
- 后续注意：①**10-15 AG Biondi 就字节跳动 DMA 上诉 C-627/24 P 发表意见**为首要跟踪项；②AI Office「研发测试豁免」扩张解释若被诉，将成 AI Act 射程标志性判例；③SHEIN 法国暂停程序与巴黎法院裁决的权威英文一手来源仍缺（Reuters/BBC），需待一手报道后再评估；④提防中文 AI 聚合站把 2025-11 的 SHEIN 事件当作 2026-10 新闻重发

# 2026-10-16 执行记录

- 覆盖窗口 2026-10-14~10-16（上次执行 10-14）；先 fetch 远程，本地与远程同为 9cc33f3，无双管道冲突；起始工作区干净
- 新增 2 条：2026-279（欧盟法院佐审官 Biondi 就字节跳动挑战 TikTok DMA 守门人认定上诉发表意见，建议驳回、确立「认真挑战推定」举证标准，multi-homing 不构成有效抗辩，C-627/24 P，10-15，curia 官方新闻稿 PDF）／2026-280（苹果在 DMA 首次评估征询中正式要求废除 DMA 或改由独立机构执法，欧委会回应「绝无废除打算」，意见书 10-14 提交，10-15）+ e135 + 监管日历 3 节点；Laws.tsx DMA(id 1) 刷新 → updateTime 2026-10-16
- **链接经验**：curia 新门户 PDF 真实路径为 `curia.europa.eu/site/jcms/upload/docs/application/pdf/...`（不带 `/site/jcms/` 前缀的旧式路径 404）；Euractiv 现整站 302 至 rapporteur.com 且 403，苹果事件改用法新社转载 Naharnet（m.naharnet.com，200）
- **旧闻甄别（关键排除）**：意大利拟对 Temu/SHEIN 快时尚征税的中文聚合报道经核实为 2025-10-15 路透旧稿重发（squidsaccess URL 路径 /2025/10/15/、Zonebourse 版权行 © Reuters - 2025），未收录；OpenAI/Anthropic 调查 10-15 跟进报道为 10-14 已收录事件延续；CNIL 350 万欧元罚单为 2025-12-30 决定；苹果诉 OpenAI 为 2026-07-10 旧闻
- 判定无新增：DPC（10-01 CHI）、EDPB（10-13 智能眼镜）、ICO（10-09，官网列表已核对）、CNIL、digital-strategy RSS（10-09）、presscorner、ENISA
- validate-links exit 0（新增失效 0，新增 2 链接均正常解析；疑似受限 8 条均为既有项）；build 成功（1.90s，单 chunk 1.57MB）
- 提交 b194156 已推送；Actions「Build and Deploy」success；线上产物 index-BrjykAzN.js 已确认含 2026-279/2026-280/e135/C-627/24 P/cp260151en/naharnet
- HANDOVER.md 水位更新至 2026-280 / e135（第 3 节执法条数 130→131），新增第 26 节
- 执法统计卡未动（佐审官意见与立法征询不属欧盟罚款/调查口径）
- 待跟进：C-627/24 P 正式判决（数月内）；10-21 苹果 DMA 基本权利诉讼公开听证；欧委会 DMA 首次评估报告；AI Office 对 OpenAI/Anthropic 答复的评估

# 2026-10-18 执行记录

- 覆盖窗口 2026-10-16~10-18；先 fetch 远程，本地与远程同为 b194156，无双管道冲突；起始工作区无内容孤儿改动
- 新增 4 条：2026-281（挪威DPA对微软旗下Xandr罚860万欧元，Grindr RTB特殊类别数据、联合控制者须独立核验同意，决定日10-02/EDPB 10-16公布）/ 2026-282（欧委会实施决定(EU) 2026/2274在OJ援引EN 18286:2026——首部AI Act协调标准，10-14，补录10-16档遗漏）/ 2026-283（苹果10-16更新App审核指南：1.2禁AI生成NCII、新增2.5.19反诱饵式应用、儿童剥削禁令扩展至替代分发）/ 2026-284（Meta 10-17删除商业条款中"抓取内容训练AI"表述，10-16曝光后回撤，新条款10-30生效）+ e136~e139 + 监管日历5节点（含10-21苹果DMA听证）+ dpa-eu-045；Laws AI Act(id2)/GDPR(id4) 刷新 → updateTime 2026-10-18
- **旧闻甄别（关键排除）**：欧委会Snapchat DSA调查为 2026-03-26 旧闻（IP/26/723）；新墨西哥Meta 3.75亿美元罚款为3-26裁决、7-06加判5.67亿整改基金合计9.42亿；柏林法院X匈牙利选举数据为2月旧闻；CNIL职业邮箱指引与金融联合研究属指引事务；克罗地亚259万欧元、荷兰零售商停售Meta眼镜缺一手源，均未收录
- 4条新增链接先curl 200；validate-links exit 0（278有效/7疑似受限/4基线内失效/新增失效0）；build成功（2.05s，单chunk 1.60MB）
- 提交 7057a9b 已推送；Actions「Build and Deploy」success（run 39153186712）；线上 JS index-CnZr0JT7.js 已确认含 2026-281~284/e136~139/dpa-eu-045/Xandr/EN 18286/2274/nudify
- HANDOVER.md 水位更新至 2026-284 / e139 / dpa-eu-045，第3节条数修正（执法131→135、监管局82→83），新增第27节
- 执法统计卡未动（挪威属EEA非欧盟；苹果指南与Meta条款属平台自治规则，不改变 €40.5亿/52/15）
- 待跟进：10-21苹果DMA基本权利听证；Meta条款10-30生效前多语言版本对齐；AI Act后续协调标准OJ援引节奏；C-627/24 P判决

# 2026-10-19 执行记录

- 覆盖窗口 2026-10-18~10-19；先 fetch 远程，本地与远程同为 7057a9b，无双管道冲突
- 新增 2 条：2026-285（德州总检察长与Temu/PDD控股"首创性"和解：$3M赔付、数据存美国自有服务器并禁止中国境内可读访问、审计不合格每次$8M、四年禁令含最惠州条款，案号471-01114-2026，10-15签署/10-16公布，TX AG官方源）/ 2026-286（巴西TSE裁决Meta决选前对候选人算法平等对待、Meta AI生成标准一致，违者每日罚50万雷亚尔；10-16内部通讯曝光+OAS申诉+司法部提请ANPD调查，路透/The Star）+ e140/e141 + 监管日历3节点
- 排除：Meta $171亿和解10-18实施进展（无一手新动作）；TikTok $4亿COPPA和解（8-21旧闻，站内2026-236语境已覆盖）；digital-strategy 10-19 EN 18286条目=站内2026-282同一事件；EDPB 10-12 Wind Tre维持旧案重发结论；CNIL IQVIA法国€5M为5月旧闻
- 判定无新增：DPC（10-01 CHI）、EDPB（本轮官网/RSS 403，经搜索核实无新公告）、ICO、CNIL、presscorner、ENISA/AI Office
- 2条新增链接先curl 200；validate-links exit 0（278有效/9疑似受限/4基线内失效/新增失效0）；build成功（1.90s，单chunk 1.61MB）
- 提交 84a305b（数据）+ b7ff236（HANDOVER §28，水位 2026-286/e141，执法137）；Actions run 39283232452 success——**本轮runner排队约25分钟才开始执行**，属GitHub平台拥塞，轮询时注意耐心；线上 index-DUiBkNQw.js 已确认含新条目
- 执法统计卡未动（美国州司法与巴西司法命令不改EU口径）
- 待跟进：10-21苹果DMA听证；德州和解法官签署与30/90/180天义务节点；密苏里诉Temu；巴西10-25决选+ANPD；C-627/24 P判决；Meta条款10-30生效

# 2026-10-20 执行记录

- 覆盖窗口 2026-10-19~10-20；先 fetch 远程，本地与远程同为 b7ff236，无双管道冲突；起始无内容孤儿改动
- 新增 3 条：2026-287（美国FTC向OpenAI/Anthropic发民事调查令CID，各逾50页、调取安全事件/防护/营销/隐私文件，明确为诉讼前取证、后续向第三方AI组织发传票，10-15补录，Axios首发/CBS确认；Axios 403 弃用）/ 2026-288（巴西TSE向Meta发24小时最后通牒、日罚金50万→100万雷亚尔，未证明遵守10-15算法平等对待指令，10-19，法新社/海峡时报）/ 2026-289（苹果收购瑞士AI音频初创Samplab资产与团队经欧委会DMA收购披露清单曝光，含Huxe，守门人小额并购通报义务，10-20，IBTimes UK）
- 配套：e142/e143 + 监管日历3节点（10-19最后通牒、10-21合规期限届满、10-15 FTC CID）；dpa-eu-046（DMA收购披露清单视角）；Laws 无状态变化
- 排除：digital-strategy 10-19 EN 18286=站内2026-282同一事件；Meta商业条款10-19跟进稿=2026-284延续；KKR/NetCo异议声明属电信并购非平台赛道；Meta洛杉矶1.4万亿审判为预告；ICO 10-14伦敦警察局训诫属公共部门事务
- 判定无新增：DPC（10-01 CHI）、EDPB（本轮官网403，检索无新公告）、ICO（10-14）、CNIL、presscorner、ENISA/AI Office
- 3条新增链接先curl 200；validate-links exit 0（新增失效0，既有疑似受限komu 429/eba 403均为历史项）；build成功（2.06s，单chunk 1.62MB）
- 提交 7ec81ae 已推送；Actions run 39455009341「Build and Deploy」success；线上 index-C56MQdDV.js 已确认含 2026-287~289/e142/143/dpa-eu-046 及三条新链接
- 执法统计卡未动（FTC CID属美国取证、巴西TSE属非欧盟司法、DMA披露无处罚，不改变 €40.5亿/52/15）
- HANDOVER 水位更新至 2026-289 / e143 / dpa-eu-046，第3节条数（执法139、监管局84），新增第29节
- 待跟进：10-21苹果DMA听证；巴西10-21期限届满+10-25决选；FTC CID扩展至第三方AI组织；10-30 Meta条款生效；AWS/Azure守门人认定（11月）；C-627/24 P判决

# 2026-10-21 执行记录

- 覆盖窗口 2026-10-20~10-21；先 fetch 远程，本地与远程同为 7ec81ae，无双管道冲突
- 新增 5 条：2026-290（欧委会10-21对Booking.com启动DSA正式调查：虚假房源/钓鱼诈骗/付费排名广告标识三线，最高罚全球营业额6%，presscorner IP/26/2223）/ 2026-291（欧委会10-20发布DSA金融诈骗研究报告）/ 2026-292（苹果DMA基本权利诉讼10-21听证，T-1080/23，三线进攻vs围墙花园回击，彭博/爱尔兰考察者报）/ 2026-293（巴西决选前双向申请取消参选资格、Meta称已完成TSE整改，10-21法新社）/ 2026-294（德国Q3 Temu/SHEIN/AliExpress销售额-35.5%至€5.66亿、份额5.3%→3.1%，bevh 10-09数据补录）
- 配套：e144/e145 + 监管日历1节点；dpa-eu-047；Laws DMA(id1)/DSA(id3) 刷新 → updateTime 2026-10-21；**执法统计卡进行中调查 15→16**（Booking 为欧委会新开正式程序）
- 链接经验（新）：presscorner detail 页对任意编号均返回200不可猜测，经 2eu.brussels 页面外链提取真实编号 ip_26_2223 并 grep 内容验证；irishexaminer/ecommercenews 均为301后200
- validate-links exit 0（267有效/28疑似受限/3基线内失效/新增失效0）——疑似受限 9→28 全为既有站点临时不可用（CNIL 503、noyb 503、komu 429、EBA 403、荷兰AP拒绝连接），非新增问题
- build 成功（1.89s，单 chunk 1.65MB）；提交 a937fd3（数据）+ 0ea6f95（HANDOVER §30，水位 2026-294/e145/dpa-eu-047，执法141/监管局85）；Actions 两次 run 均 success
- 线上 index-CedDpNkZ.js 已确认含 2026-290~294/e144/145/dpa-eu-047/ip_26_2223/T-1080/23
- 待跟进：Booking 调查走向；苹果T-1080/23与字节C-627/24 P判决；10-25巴西决选；11-01欧盟2欧处理费；10-30 Meta条款生效

# 2026-10-22 执行记录

- 覆盖窗口 2026-10-21~10-22；先 fetch 远程，本地与远程同为 0ea6f95，无双管道冲突；起始仅有自动化记忆改动
- 新增 4 条：2026-295（欧盟理事会10-21通过《数字综合法案》数字半部谈判授权：个人数据定义维持/拒绝相对化、Cookie 留 ePrivacy 删第88b条浏览器信号、泄露通报72→96h、事件通报改成员国国家级单一入口+ENISA信息点、公共部门可对守门人收更高数据复用费、废除P2B；待议会立场启动三方会谈）/ 2026-296（新墨西哥州法官Francis Mathew裁定Meta付250亿美元：法定上限约2195亿裁减、15%年息、入州教育经费、Meta将上诉；同日Q3净利受99亿美元和解金拖累，卫报）/ 2026-297（澳洲联邦法院235页命令：2027-03-01起澳区开第三方商店/侧载/替代支付/外链，禁收费禁止报复，安全扫描可保留，仅适用澳洲，苹果申请暂缓并上诉，可延至2027-05-03，Delano）/ 2026-298（Meta Q3 欧洲广告增速18% vs 美加33%，DMA 项下 LPA 成本首次财报显性化，WIRED）
- 配套：e146/e147/e148 + 监管日历6节点（含10-23 Fortnite回归、2027-02-15延期申请、2027-03-01生效）；dpa-eu-048；Laws id7 重写（status→审议中-理事会立场已定）、id4 GDPR 修订进程段替换，updateTime 2026-10-21
- 排除：欧委会10-22可口可乐/雀巢/达能 CPC 回收宣称（非平台赛道）；ICO 10-20 威尔士小型机构训诫；EDPB 最新仍10-16（/news/news_en 需 curl，WebFetch 403）；"法国要求TikTok公布广告记录"仅AI生成站点、与DSA时间线矛盾
- 链接经验（新）：consilium.europa.eu 全站对 curl/脚本 403，且新闻稿真实路径含 `digital-rulebook-` 前缀（按标题猜会404）；官方不可校验时用 2eu.brussels（200）并在 source 标官方；澳洲判决 fedcourt 403/Reuters 401 → Delano 200
- validate-links exit 0（292有效/7疑似受限/4基线内失效/新增失效0，疑似受限由28回落至7）；build 成功（1.95s，单chunk 1.67MB）
- 提交 3979426 已推送；Actions run 39815969871「Build and Deploy」success；线上 index-XsIDsv7r.js 已确认含 2026-295~298/e146~148/dpa-eu-048/2027-03-01（API 轮询时出现 queued↔in_progress 抖动，实为缓存，最终16:47Z成功）
- 执法统计卡未动（理事会授权/美国州裁决/澳洲司法救济/业绩数据均不改 €40.5亿/52/16）
- HANDOVER 水位更新至 2026-298 / e148 / dpa-eu-048，第3节条数（执法144、监管局86），新增第31节
- 待跟进：欧洲议会对数字综合法案立场；澳洲苹果暂缓与上诉（2027-02中旬）；新墨西哥上诉与15%年息；LPA用户比例与欧美广告单价差；10-25巴西决选；10-28波兰KRiBSI、11-01欧盟2欧处理费、11-09 AI Act细则征询截止

# 2026-10-23 执行记录

- 覆盖窗口 2026-10-22~10-23；先 fetch 远程，本地与远程同为 5fa6f73，无双管道冲突；起始工作区干净；仓库水位与 HANDOVER §4 一致（2026-298 / e148 / dpa-eu-048）
- 新增 5 条新闻：2026-299（SHEIN 与 FTC 1 亿美元和解，配送延误+消费者投诉，=Q2 利润44%，10-23 路透）、2026-300（《欧盟儿童法》理事会演示文稿：15岁以下禁美颜滤镜与点赞、推送/定位默认关、22:00–08:00 限制、13–14迷你账户，10-22 Rapporteur）、2026-301（Meta 商业条款生效日 10-30→11-20，欧委会欢迎并已发 RFI，10-23 路透）、2026-302（希腊议会通过15岁以下禁令，2027-01-01 生效，10-23 路透）、2026-303（佛州《Safe Screens Act》：App Store 年龄判定+家长同意、AI 聊天机器人拟人陪伴禁令、每项违规5万美元，官方 10-22）
- 配套：e149（SHEIN-FTC）、e150（MOW 请求欧委会/CMA 叫停 Meta 条款+临时措施，10-22）；监管日历 3 节点；Laws id12（Kids Act）与 id3（DSA，希腊禁令双轨期）刷新 → updateTime 2026-10-23；DPAs 本轮无新增
- 排除：Yango €1亿罚单为 2026-05 旧案（聚合站重发）；意大利 179/2026 生效 = 2026-263 已收录；EP 全球AI治理辩论属政策辩论；CNIL 10-14 关闭 Google 禁令属程序性
- 链接：5 条新闻 + 2 条执法均先 curl 200；validate-links exit 0（297 有效 / 9 疑似受限 / 3 基线内失效 / 新增 0）；build 成功 1.93s，单 chunk 1.70MB
- 提交 7fd331c 已推送；Actions run 40005223044「Build and Deploy」success；线上 index-Ka_p4-_P.js 已确认含 2026-299~303 / e149/150 / Safe Screens / 2027-01-01
- HANDOVER 水位更新至 2026-303 / e150，§3 条数 146（执法）/87（监管局），新增第 32 节
- 经验：rapporteur.com（原 Euractiv）对 curl/脚本全站 403（WebFetch 可读）→ 用腾讯新闻同源编译稿；el-fondo 虽 200 但页面日期为 10-24（自动稿/时区），日期不可靠须弃用；marketScreener 403 → 环球邮报转载路透

# 2026-10-28 执行记录

- 覆盖窗口 2026-10-27~10-28（上次执行 10-26，commit a551d89，10-24~25 无执行；先 fetch 远程，本地与远程同为 a551d89，无双管道冲突）
- **起始发现孤儿工作区**（10-27 档期执行中断遗留）：2026-307~311 + e152~e154 + dpa-de-005 + 日历 2 节点未提交；5 条链接全部 curl 200（noyb×2/hindustantimes/aol/dig.watch）后保留，未重编 ID（沿用 10-12 先例）。注意 10-26 跑批的 HANDOVER 水位更新（2026-306/e151/dpa-eu-049）也留在工作区未提交
- 本批新增 2 条：2026-312/e155（韩国 KMCC 对谷歌罚 429 亿、苹果罚 208.1 亿韩元合计 637.1 亿≈$45M：强制支付方式/审核不公延迟/苹果对韩含税计佣歧视，2021 电信业务法修正案 App 市场条款全球首案，10-28，Yonhap en.yna.co.kr 200；korea.net 官方页 302 不可直链）+ 日历 11-28 KMCC 整改期限节点 + 11-20 Meta 节点补注 EBU 呼吁
- 关键排除：Temu DSA 整改计划接受（10-26/27）=2026-304 已收录；欧盟 2 欧处理费（CNA 10-27）站内已覆盖；EBU 10-28 声明=2026-308 同事件仅并入日历；理事会 10-21 立场=2026-295/305 已收录；瑞典政府限制公务 ChatGPT 属内部管控、英国 asylum 工具无执法认定
- 判定无新增：DPC（10-01 CHI）、EDPB、ICO、CNIL、ENISA/AI Office、presscorner、digital-strategy RSS
- validate-links exit 0（306 有效/8 疑似受限/4 基线内失效/新增失效 0）；build 成功 1.94s；提交 97d2390 已推送；Actions run 40732411016 success；线上 index-BeSq0Avp.js 已确认含 2026-312/e155/KMCC/dpa-de-005/Outlier/637.1
- HANDOVER 水位更新至 2026-312/e155/dpa-eu-049·de-005，条数执法 151/监管局 89，新增第 33 节；执法统计卡未动（KMCC 非欧盟口径）
- 待跟进：11-20 Meta 条款生效+挪威禁令裁决；11-09 AI Act 细则征询截止；11-13 EDPB 罚款指南征询截止；11 月 KMCC 书面决定；11-26 EU KIDS Act 征询截止；C-627/24 P 判决；T-1080/23 苹果案
