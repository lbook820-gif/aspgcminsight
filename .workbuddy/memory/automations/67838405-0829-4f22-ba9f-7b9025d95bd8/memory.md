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
