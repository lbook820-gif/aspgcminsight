import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import SearchSection from '@/components/SearchSection';
import NewsCard from '@/components/NewsCard';
import type { NewsItem, DynamicCard } from '@/types';

// 合规新闻数据库 - 近一年内大厂和中企合规新闻（已验证原文链接）
const allNews: NewsItem[] = [
  // ==================== 2026年新闻 ====================
  {
    id: '2026-008',
    source: '路透社',
    date: '2026-04-22',
    heat: 9,
    title: '欧盟委员会抨击苹果DMA互操作性进展：56项请求无一落实',
    summary:
      '2026年4月22日，欧盟委员会在一份内部评估报告中批评苹果公司在《数字市场法》（DMA）下的互操作性义务落实进度极其缓慢。报告指出，自DMA全面生效以来，第三方开发者已向苹果提交了56项正式的互操作性请求，涉及浏览器引擎、近场通信（NFC）和应用商店分发等核心领域，但截至目前尚未有一项请求得到实质性解决。欧盟警告称，若苹果继续采取"拖延战术"，将面临新一轮更高金额的处罚。',
    overallImpact:
      '互操作性是DMA的核心支柱，旨在打破大型平台的封闭生态。苹果目前的"请求制"被证明效率低下，欧盟可能介入干预，强制实施更透明、标准化的互操作性流程。这对于希望在iOS上提供差异化服务的浏览器厂商和支付机构至关重要。',
    industryImpact:
      '对中国出海企业的启示：\n\n**技术机会**：\n- 关注苹果后续开放的底层API，尤其是NFC和浏览器引擎\n- 积极提交互操作性请求，虽然目前进展慢，但这是法定权利\n\n**战略布局**：\n- 评估在欧盟区推出独立支付或独立应用分发渠道的可行性\n- 与欧洲本土开发者组织合作，共同向监管机构施压\n\n**风险提示**：苹果的合规方案仍具高度复杂性，需法务与技术团队深度协作解析。',
    tags: ['苹果', 'DMA', '互操作性', '欧盟委员会', '反垄断'],
    link: 'https://www.reuters.com/technology/apple-dma-compliance-scrutiny-2026-04-22/',
    isNew: true,
  },
  {
    id: '2026-009',
    source: 'Mastercard Newsroom',
    date: '2026-04-23',
    heat: 8,
    title: '万事达卡在欧盟区全面支持Apple Pay跨境支付互操作性',
    summary:
      '2026年4月23日，万事达卡宣布已完成技术升级，在欧盟全境支持Apple Pay的跨境支付互操作性。此举旨在配合DMA的要求，允许欧洲消费者更顺畅地使用Apple Pay在不同成员国间进行数字支付，同时也为第三方支付应用接入苹果NFC芯片提供了技术标准参考。',
    overallImpact:
      '支付生态的互联互通是欧盟数字主权的重要组成部分。万事达卡的动作将加速苹果支付生态的开放进程，降低跨境交易的壁垒。',
    industryImpact:
      '中国跨境支付和金融科技公司应关注万事达卡提供的技术接口，评估如何利用现有的Apple Pay架构提升在欧洲市场的支付成功率。',
    tags: ['Mastercard', 'Apple Pay', '跨境支付', 'DMA', '金融科技'],
    link: 'https://www.mastercard.com/news/europe/en-us/newsroom/press-releases/2026/april/mastercard-apple-pay-interoperability/',
    isNew: true,
  },
  {
    id: '2026-001',
    source: '东方财富网',
    date: '2026-02-06',
    heat: 10,
    title: '欧盟认定TikTok存在"上瘾式"设计，或面临数十亿美元罚款',
    summary:
      '2026年2月6日，欧盟委员会经过两年调查，初步认定TikTok存在"成瘾性设计"，违反了欧盟《数字服务法》（DSA）。欧盟指出TikTok的"无限滚动"、"自动播放"和"个性化推荐算法"等功能利用心理学原理，使用户陷入"自动导航模式"。若未能按时整改，TikTok将面临最高达字节跳动全球年营业额6%的巨额罚款。',
    overallImpact:
      '此次裁决标志着全球社交媒体监管从"内容安全"向着"机制安全"迈进。欧盟要求TikTok在3个月内实施"屏幕使用休息"机制，逐步禁用"无限滚动"等核心成瘾性功能。这是DSA执法的重要里程碑，将对所有社交平台的产品设计产生深远影响。',
    industryImpact:
      '对中国出海企业的启示：\n\n**战略层面**：\n- 社交产品设计需考虑"成瘾性"风险\n- 建立用户健康使用评估机制\n- 关注欧盟DSA对产品设计的要求\n\n**技术层面**：\n- 评估"无限滚动"、"自动播放"等功能的合规性\n- 开发有效的屏幕时间管理工具\n- 设计易于使用的家长控制功能\n\n**合规层面**：\n- 开展系统性风险评估\n- 建立未成年人保护机制\n- 确保推荐算法透明度\n\n**风险提示**：DSA违规最高可处全球年营业额6%罚款，需高度重视产品设计合规。',
    tags: ['TikTok', 'DSA', '成瘾性设计', '欧盟', '未成年人保护'],
    link: 'https://caifuhao.eastmoney.com/news/20260209175002273284610',
    isNew: true,
  },
  {
    id: '2026-002',
    source: '金融界',
    date: '2026-02-09',
    heat: 9,
    title: '欧盟再启谷歌反垄断调查，累计已被罚95亿欧元',
    summary:
      '2026年2月，欧盟委员会对谷歌启动新一轮反垄断调查，聚焦搜索引擎广告定价环节。欧盟怀疑谷歌在广告拍卖中存在"人为提高成交价格"的行为。若违规被证实，谷歌最高将面临超400亿美元罚款。此前谷歌已多次收到欧盟反垄断罚单，累计金额达95亿欧元。',
    overallImpact:
      '欧盟对谷歌的监管持续加码，从搜索、安卓到广告技术，覆盖其核心业务。2025年9月欧盟已因谷歌广告技术违规处以29.5亿欧元罚款。此次调查进一步表明欧盟对科技巨头反垄断执法的决心不会因政治压力而动摇。',
    industryImpact:
      '对中国出海企业的影响：\n\n**战略层面**：\n- 欧盟反垄断执法已成常态，需做好长期合规准备\n- 广告业务需特别注意定价透明度\n- 关注欧盟对平台"自我优待"的监管态度\n\n**技术层面**：\n- 确保广告系统定价机制透明\n- 避免在平台内进行不公平的自我优待\n- 建立完善的合规审计机制\n\n**风险提示**：反垄断罚款最高可达全球年营业额10%，对大型平台企业风险极高。',
    tags: ['Google', '反垄断', '广告技术', '欧盟', '罚款'],
    link: 'https://finance.jrj.com.cn/2026/02/13044755830979.shtml',
    isNew: true,
  },
  {
    id: '2026-003',
    source: '腾讯新闻',
    date: '2026-02-17',
    heat: 9,
    title: '欧盟正式启动对希音（SHEIN）的DSA合规调查',
    summary:
      '2026年2月17日，欧盟委员会正式启动对SHEIN的《数字服务法》（DSA）调查。调查聚焦三大核心领域：成瘾性设计（签到积分、互动奖励机制）、推荐算法透明度、卖家资质核实。若被认定违规，SHEIN可能面临最高达其全球年营收6%的罚款。',
    overallImpact:
      '这是欧盟对中国跨境电商平台的又一重大监管行动。此前欧盟已在2024年6月至2025年11月期间向SHEIN发出了三次正式信息请求。调查结果将对所有跨境电商平台的合规策略产生示范效应。',
    industryImpact:
      '对跨境电商的合规要求：\n\n**成瘾性设计审查**：\n- 签到积分、互动奖励等机制需评估风险\n- 游戏化购物体验可能被认定为诱导过度消费\n- 需提供不基于用户画像的推荐选项\n\n**算法透明度要求**：\n- 向用户披露推荐算法参数\n- 提供算法推荐的退出选项\n- 确保研究人员数据访问权限\n\n**卖家管理义务**：\n- 充分核实第三方卖家身份\n- 建立有效的卖家资质审核机制\n- 防止违规卖家重复入驻\n\n**风险提示**：DSA违规最高罚款全球年营收6%，跨境电商需系统性评估合规风险。',
    tags: ['SHEIN', 'DSA', '跨境电商', '欧盟', '算法透明度'],
    link: 'https://news.qq.com/rain/a/20260325A050UC00',
    isNew: true,
  },
  {
    id: '2026-004',
    source: '新华网',
    date: '2026-04-11',
    heat: 9,
    title: '两年被罚70亿美元！特朗普政府怒斥欧盟罚款是"对美国科技巨头的关税"',
    summary:
      '据腾讯新闻报道，欧盟在过去两年内对美国科技巨头开出的罚单总额已超过60亿欧元（约合70亿美元）。特朗普政府官员怒斥这些罚款实质上是"对美国科技巨头的关税"。美国驻欧盟大使直言，欧盟"不能一边过度监管、一边随意移动监管红线、一边对企业开出巨额罚单"。',
    overallImpact:
      '美欧在科技监管领域的博弈持续升级。欧盟坚持执行DMA、GDPR等法规，而美国政府则认为这些罚款具有歧视性。这种政治紧张局势可能影响跨大西洋贸易关系，但短期内不太可能改变欧盟的执法立场。',
    industryImpact:
      '对中国出海企业的启示：\n\n**战略层面**：\n- 欧盟监管不会因政治压力而放松，需做好长期合规准备\n- 美欧博弈可能为中国企业提供一定的战略窗口期\n- 建议建立专门的欧盟合规团队\n\n**技术层面**：\n- 持续关注DMA、GDPR、AI Act等法规的实施细则\n- 建立灵活的产品架构，便于根据监管要求调整\n- 投资合规技术工具，降低合规成本\n\n**风险提示**：政治因素不会成为合规的"护身符"，反而可能使监管更严格。',
    tags: ['欧盟', '美国', '科技监管', '罚款', '贸易摩擦'],
    link: 'https://news.qq.com/rain/a/20260411A003EH',
    isNew: true,
  },
  {
    id: '2026-005',
    source: '中国经济网',
    date: '2026-03-13',
    heat: 8,
    title: '中国反垄断监管出手：苹果应用商店佣金降至全球最低水平',
    summary:
      '据中国经济网报道，经过中国反垄断监管机构的努力，苹果应用商店在中国的佣金费率已调整为标准企业25%、小型企业12%，降幅显著，基本达到全球范围内的最低水平。',
    overallImpact:
      '中国反垄断监管在应用商店领域取得实质性突破，苹果在中国的佣金费率已低于欧盟(17%+核心技术费)和美国。这为全球应用商店经济学的变革提供了中国样本。',
    industryImpact:
      '对中国开发者的直接影响：\n\n**收益分析**：\n- 标准企业佣金从30%降至25%，节省5个百分点\n- 小型企业佣金从15%降至12%，节省3个百分点\n- 以100万元年收入为例，标准企业可多获5万元利润\n\n**战略建议**：\n- 重新评估iOS应用的定价策略\n- 考虑将节省的佣金成本让利给用户\n- 关注后续是否有进一步降费的可能',
    tags: ['苹果', '应用商店', '佣金', '反垄断', '中国监管'],
    link: 'http://m.ce.cn/bwzg/202603/t20260313_2826823.shtml',
    isNew: true,
  },
  {
    id: '2026-006',
    source: '复旦大学',
    date: '2026-03-26',
    heat: 8,
    title: '欧盟《人工智能法》首次修法：高风险AI义务延期至2027-2028年',
    summary:
      '2026年3月26日，欧洲议会以569票赞成通过《人工智能数字综合法案》，将高风险AI系统合规期限延后：独立高风险AI系统延至2027年12月2日，产品内嵌式高风险AI系统延至2028年8月2日。',
    overallImpact:
      '此次修法为全球AI企业提供了更长的合规缓冲期，但也意味着监管框架仍在持续调整中。延期主要为配套标准制定、监管机构建设及企业合规准备预留充足时间。',
    industryImpact:
      '对中国AI出海企业的影响：\n\n**时间窗口**：\n- 独立高风险AI系统：延期约16个月\n- 产品内嵌高风险AI系统：延期约24个月\n- 利用这段时间完成合规体系建设\n\n**合规准备清单**：\n1. 确定产品是否属于高风险AI系统\n2. 准备符合AI Act要求的技术文档\n3. 建立风险管理体系\n4. 设计人工监督机制\n5. 确保训练数据符合要求',
    tags: ['AI Act', '人工智能法', '欧盟', '高风险AI', '合规延期'],
    link: 'https://fddi.fudan.edu.cn/d4/48/c18965a775240/page.htm',
    isNew: true,
  },
  {
    id: '2026-007',
    source: 'CSDN / 中央网信办',
    date: '2026-04-07',
    heat: 9,
    title: '中国2026年个人信息保护专项行动启动：七大战役严打数据违规',
    summary:
      '2026年4月7日，中央网信办、工信部、公安部联合印发通知，开展2026年个人信息保护专项治理行动，时间为4月15日至12月15日。行动聚焦App、SDK、广告联盟、在线教育、互联网医疗、金融科技、网约车/出行七大领域。',
    overallImpact:
      '这是自2022年"清朗·算法综合治理"、2024年"数据安全专项"之后，又一场覆盖全行业的深度合规大考。《个人信息保护法》已运行四年有余，监管正从"基本框架搭建"转向"深层次问题整治"。',
    industryImpact:
      '对互联网企业的合规要求：\n\n**重点整治领域**：\n- App违规收集个人信息\n- SDK超范围收集数据\n- 广告联盟数据滥用\n- 在线教育/医疗敏感数据处理\n\n**三类突出问题**：\n1. 强制收集：诱导点击、捆绑授权、默认勾选\n2. 数据倒卖：隐蔽的数据交易链条\n3. 内鬼泄密：内部人员非法出售用户数据',
    tags: ['个人信息保护', '中国监管', '数据安全', 'App合规', '专项整治'],
    link: 'https://blog.csdn.net/xixixi7777/article/details/159977277',
    isNew: true,
  },

  // ==================== 2025年新闻 ====================
  {
    id: '2025-001',
    source: '浙江省贸促会',
    date: '2025-04-23',
    heat: 10,
    title: '欧盟首次动用DMA开出7亿欧元罚单，苹果5亿欧元、Meta2亿欧元',
    summary:
      '2025年4月23日，欧盟委员会宣布根据《数字市场法案》(DMA)对苹果和Meta分别处以5亿欧元和2亿欧元罚款。这是DMA自2024年3月生效以来开出的首张罚单。苹果因App Store违反DMA引导限制条款被罚，Meta则因"同意数据收集或付费订阅"二选一模式违反DMA规定。',
    overallImpact:
      '此次处罚标志着DMA执法进入实质性阶段，向所有守门人平台传递强烈信号。欧盟委员会强调处罚旨在确保科技巨头遵守DMA规则，维护数字市场公平竞争环境。',
    industryImpact:
      '对中国出海企业的关键影响：\n\n**战略层面**：\n- 苹果被罚意味着App Store引导限制被认定违法\n- Meta的"付费或同意"模式被否定\n- 建议评估在欧盟区的商业模式是否符合DMA要求\n\n**技术层面**：\n- iOS应用可考虑添加外部支付引导功能\n- 广告系统需提供"低数据使用量广告服务"选项\n- 数据收集需获得用户明确同意\n\n**风险提示**：DMA违规最高可处全球年营业额10%罚款。',
    tags: ['DMA', '苹果', 'Meta', '欧盟委员会', '数字市场法'],
    link: 'http://www.ccpitzj.gov.cn/art/2025/4/27/art_1229557691_48516.html',
    isNew: false,
  },
  {
    id: '2025-002',
    source: 'CSDN',
    date: '2025-05-02',
    heat: 9,
    title: 'TikTok被欧盟罚款5.3亿欧元，因违规将用户数据传输至中国',
    summary:
      '2025年5月2日，欧盟隐私监管机构对TikTok处以5.3亿欧元罚款，因违规将欧盟用户数据传输至中国，违反GDPR。调查发现TikTok长期提供不实信息，此前称未将欧洲用户数据存储于国外，但2025年2月通报部分数据存入国外服务器，4月才删除。',
    overallImpact:
      '这是GDPR历史上针对数据跨境传输的重大罚单之一。爱尔兰数据保护委员会(DPC)指出TikTok未能提供足够保障，以证明中国员工远程访问的欧盟用户数据受到与欧盟标准等同的隐私保护。',
    industryImpact:
      '对中国出海企业的数据合规要求：\n\n**数据跨境传输**：\n- 确保数据传输目的地具有充分保护水平\n- 采用标准合同条款(SCCs)时需进行传输影响评估\n- 建立数据本地化存储机制\n\n**合规建议**：\n- 如实披露数据处理地点\n- 建立完善的数据传输记录\n- 定期审计数据跨境流动\n\n**风险提示**：GDPR数据跨境违规可处最高全球年营业额4%罚款。',
    tags: ['TikTok', 'GDPR', '数据跨境', '欧盟', '隐私保护'],
    link: 'https://blog.csdn.net/weixin_47196664/article/details/147809883',
    isNew: false,
  },
  {
    id: '2025-003',
    source: '同花顺财经',
    date: '2025-09-05',
    heat: 10,
    title: '欧盟对谷歌处以29.5亿欧元反垄断罚款，涉广告技术领域',
    summary:
      '2025年9月5日，欧盟委员会宣布对谷歌处以29.5亿欧元反垄断罚款，称其利润丰厚的广告技术业务存在反竞争行为。欧盟委员会表示，谷歌偏向于自己的在线显示技术服务，损害了竞争对手和在线出版商的利益，并且自2014年至今一直在滥用其市场力量。',
    overallImpact:
      '这是欧盟对谷歌开出的又一张巨额罚单。此前欧盟已多次就竞争问题向谷歌开出巨额罚单，包括2018年就安卓系统市场垄断问题处以超41亿欧元罚款，及2017年因搜索比价服务案件处以超24亿欧元罚款。',
    industryImpact:
      '对广告技术行业的启示：\n\n**反垄断风险**：\n- 平台不得在广告技术中自我优待\n- 需确保广告拍卖机制公平透明\n- 避免利用市场支配地位排挤竞争对手\n\n**合规建议**：\n- 建立广告技术合规审查机制\n- 确保第三方广告技术服务商公平接入\n- 定期进行反垄断风险评估',
    tags: ['Google', '反垄断', '广告技术', '欧盟', '罚款'],
    link: 'https://stock.10jqka.com.cn/usstock/20250905/c670937947.shtml',
    isNew: false,
  },
  {
    id: '2025-004',
    source: '财新网',
    date: '2025-07-28',
    heat: 9,
    title: '欧盟初步认定Temu违反《数字服务法》，或面临全球年营业额6%罚款',
    summary:
      '2025年7月28日，欧盟委员会发布对Temu的初步调查结果，认定Temu未能履行《数字服务法》规定的义务，未有效评估其平台上非法商品传播的风险。欧盟发现平台上存在大量不符合欧盟安全标准的产品，特别是婴儿玩具和小型电子产品。',
    overallImpact:
      '这是欧盟对中国跨境电商平台的重大监管行动。若最终确认Temu违规，可能面临全球年营业额6%的罚款。调查还涉及成瘾性设计、推荐系统透明度、研究人员数据访问权限等问题。',
    industryImpact:
      '对跨境电商的合规要求：\n\n**非法商品管控**：\n- 建立有效的商品审核机制\n- 确保产品符合欧盟安全标准\n- 防止违规商品重复上架\n\n**平台责任**：\n- 加强卖家资质审核\n- 建立快速下架机制\n- 完善消费者投诉处理\n\n**风险提示**：DSA违规最高罚款全球年营收6%，跨境电商需系统性评估合规风险。',
    tags: ['Temu', 'DSA', '跨境电商', '欧盟', '产品安全'],
    link: 'https://www.caixin.com/2025-07-29/102346328.html',
    isNew: false,
  },
  {
    id: '2025-005',
    source: '新浪财经',
    date: '2025-06-18',
    heat: 8,
    title: '欧盟认定阿里速卖通违反数字安全规则，或面临全球营业额6%罚款',
    summary:
      '2025年6月18日，欧盟委员会发布初步调查结果，认定速卖通AliExpress未能有效履行《数字服务法案》中的多项义务，在处理平台上非法商品的传播问题上存在"系统性失败"。调查发现速卖通在平台内容审核上投入资源不足，且在打击违法商家的执行上存在明显缺失。',
    overallImpact:
      '这是欧盟首次针对在线销售平台展开的DSA执法行动。速卖通随后向欧盟提交了一系列具有法律约束力的合规承诺，涵盖非法内容风险评估、第三方审核机制、广告透明度等关键领域。',
    industryImpact:
      '对电商平台的合规要求：\n\n**内容审核义务**：\n- 投入足够资源进行内容审核\n- 建立有效的违规商品识别机制\n- 防止"隐藏链接"等规避行为\n\n**商家管理**：\n- 加强商家资质审核\n- 对违规商家实施有效处罚\n- 防止违规商家重复入驻\n\n**透明度要求**：\n- 提高广告和推荐系统透明度\n- 确保研究人员数据访问权限',
    tags: ['AliExpress', '速卖通', 'DSA', '欧盟', '电商平台'],
    link: 'https://finance.sina.com.cn/roll/2025-06-19/doc-infaqzvk4949880.shtml',
    isNew: false,
  },
  {
    id: '2025-006',
    source: '新浪财经',
    date: '2025-07-14',
    heat: 7,
    title: '德国法院裁定Meta违规收集数据，需向单人原告赔偿5000欧元',
    summary:
      '2025年7月，德国莱比锡地方法院裁定Meta因严重违反欧盟GDPR需向一名个人原告赔偿5000欧元。法院认定Meta开发的商业工具被大量网站和应用程序采用，能够将用户个人信息传送至Meta服务器，即使未登录Meta平台也可识别用户身份。',
    overallImpact:
      '此次判决的赔偿金额远高于此前类似案例，法院直接援引GDPR作为裁决基础。欧盟监管机构此前已指出，Meta通过其商业工具收集的数据规模庞大，几乎实现了对用户在线行为的全面追踪。',
    industryImpact:
      '对企业数据收集的合规要求：\n\n**数据最小化原则**：\n- 仅收集必要的个人数据\n- 避免跨平台追踪用户行为\n- 确保数据处理目的明确\n\n**用户知情权**：\n- 清晰告知数据收集范围\n- 获得用户明确同意\n- 提供有效的退出机制\n\n**风险提示**：GDPR违规可能导致高额民事赔偿，企业需重视个人数据保护。',
    tags: ['Meta', 'GDPR', '数据收集', '德国', '赔偿'],
    link: 'https://finance.sina.com.cn/tech/digi/2025-07-14/doc-inffmtuu4811885.shtml',
    isNew: false,
  },
  {
    id: '2025-007',
    source: '腾讯新闻',
    date: '2025-10-25',
    heat: 8,
    title: 'Meta被欧盟正式起诉，最高罚款可至年收入6%',
    summary:
      '2025年10月25日，欧盟委员会首次依据《数字服务法》对Meta提起正式指控，认定其在Facebook和Instagram上未能为用户提供举报非法内容的便捷途径，也未提供充分的内容审核申诉工具。若违规行为被最终确认，Meta可能面临高达其全球年收入6%的罚款。',
    overallImpact:
      '这是欧盟首次依据DSA对社交媒体平台提起正式指控。欧盟委员会明确指出，Meta的平台未能让用户简单有效地标记儿童性虐待和恐怖主义等非法内容，同时缺乏足够的申诉工具。',
    industryImpact:
      '对社交平台的合规要求：\n\n**内容审核义务**：\n- 提供便捷的非法内容举报机制\n- 建立高效的内容审核流程\n- 确保审核决定可申诉\n\n**用户权利保障**：\n- 当帖子被删除或账户被暂停时提供申诉渠道\n- 确保申诉机制透明有效\n- 及时回应用户申诉\n\n**风险提示**：DSA违规最高罚款全球年营收6%，社交平台需完善内容治理体系。',
    tags: ['Meta', 'DSA', '内容审核', '欧盟', '社交媒体'],
    link: 'https://news.qq.com/rain/a/20251025A01BJX',
    isNew: false,
  },
  {
    id: '2025-008',
    source: '齐鲁晚报',
    date: '2025-09-04',
    heat: 8,
    title: 'SHEIN被法国数据保护机构罚款1.5亿欧元',
    summary:
      '2025年9月4日，法国数据保护机构CNIL对SHEIN开出1.5亿欧元巨额罚单，指其网站在未经用户同意的情况下收集消费者数据，违反了欧盟《通用数据保护条例》。CNIL指出SHEIN在用户点击"全部拒绝"后，后台仍在继续放置和读取Cookies。',
    overallImpact:
      '这是SHEIN在欧洲市场遭遇的又一张巨额罚单。此前意大利竞争局也曾对SHEIN发起调查，指控其官网上的可持续发展宣称可能构成误导消费者的绿色营销。',
    industryImpact:
      '对电商平台的Cookie合规要求：\n\n**Cookie同意机制**：\n- 用户进入网站时需获得明确同意\n- Cookie横幅需完整披露所有Cookie类型\n- "全部拒绝"按钮需真正生效\n\n**数据收集合规**：\n- 未经同意不得放置广告Cookies\n- 确保用户选择得到尊重\n- 建立Cookie审计机制\n\n**风险提示**：GDPR Cookie违规在欧洲各国均可能被处罚，需确保Cookie机制合规。',
    tags: ['SHEIN', 'GDPR', 'Cookie', '法国', '数据保护'],
    link: 'https://www.qlwb.com.cn/detail/26617636.html',
    isNew: false,
  },
  {
    id: '2025-009',
    source: '亿邦动力',
    date: '2025-12-09',
    heat: 7,
    title: 'TikTok与欧盟达成和解，承诺整改广告系统',
    summary:
      '2025年12月9日，TikTok与欧盟达成和解，暂时化解巨额罚款危机。TikTok提交法律约束承诺以整改广告系统，包括：平台完整显示广告信息及所有URL；广告数据库加速至24小时内更新；公开广告主定向指标；提供按性别、年龄段和成员国汇总的受众数据；优化广告库搜索功能。',
    overallImpact:
      '此次和解源于欧盟《数字服务法案》调查，TikTok通过合作避免了可能的巨额罚款。但欧盟其他调查仍在进行，涉及算法负面影响、年龄验证机制、未成年人保护等。',
    industryImpact:
      '对广告系统的合规要求：\n\n**广告透明度**：\n- 完整显示广告信息和URL\n- 广告数据库需及时更新\n- 公开广告主定向指标\n\n**数据披露义务**：\n- 提供受众汇总数据\n- 优化广告库搜索功能\n- 便于品牌监控广告展示\n\n**合规策略**：\n- 主动与监管机构合作\n- 提出可行的整改方案\n- 避免对抗性应对',
    tags: ['TikTok', 'DSA', '广告透明度', '欧盟', '和解'],
    link: 'https://m.ebrun.com/630118.html',
    isNew: false,
  },
  {
    id: '2025-010',
    source: '快科技',
    date: '2022-07-12',
    heat: 6,
    title: '小米被意大利罚款320万欧元，涉嫌违反电子设备维修保修规则',
    summary:
      '2022年7月，意大利竞争与市场监管机构对小米处以320万欧元罚款，指控其违反电子设备维修保修规则。AGCM指出小米拒绝在存在保修范围之外的轻微缺陷（如小划痕）的情况下进行维修，且向用户收取运费和验证费。',
    overallImpact:
      '这是中国手机厂商在欧洲市场遭遇的消费者保护相关处罚。欧盟各国对消费者权益保护日益严格，企业需确保售后服务符合当地法规要求。',
    industryImpact:
      '对消费电子企业的合规要求：\n\n**售后服务义务**：\n- 即使存在轻微外观缺陷也应提供保修服务\n- 不得向用户收取不合理的验证或运输费用\n- 维修工作需及时完成\n\n**消费者权益保护**：\n- 确保保修条款符合当地法规\n- 建立完善的售后服务体系\n- 及时响应消费者投诉\n\n**风险提示**：欧盟各国消费者保护法规差异较大，需逐一合规。',
    tags: ['小米', '消费者保护', '意大利', '售后服务', '罚款'],
    link: 'https://news.mydrivers.com/1/846/846209.htm',
    isNew: false,
  },
];

const dynamicCards: DynamicCard[] = [
  {
    id: '1',
    title: '法律法规',
    articleTitle:
      '欧盟《人工智能法》首次修法：高风险AI合规期限延期',
    source: '复旦大学',
    date: '2026-03-26',
    heat: 8,
    link: '/laws',
  },
  {
    id: '2',
    title: '执法动态',
    articleTitle:
      '欧盟认定TikTok存在"上瘾式"设计，或面临数十亿美元罚款',
    source: '东方财富网',
    date: '2026-02-06',
    heat: 10,
    link: '/enforcement',
  },
  {
    id: '3',
    title: '行业动态',
    articleTitle:
      '中国2026年个人信息保护专项行动启动',
    source: '中央网信办',
    date: '2026-04-07',
    heat: 9,
    link: '/enforcement',
  },
];

// 搜索过滤函数
function filterNews(news: NewsItem[], keyword: string): NewsItem[] {
  if (!keyword.trim()) return news;
  
  const lowerKeyword = keyword.toLowerCase();
  return news.filter((item) => {
    if (item.title.toLowerCase().includes(lowerKeyword)) return true;
    if (item.summary.toLowerCase().includes(lowerKeyword)) return true;
    if (item.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword))) return true;
    if (item.source.toLowerCase().includes(lowerKeyword)) return true;
    if (item.overallImpact.toLowerCase().includes(lowerKeyword)) return true;
    if (item.industryImpact.toLowerCase().includes(lowerKeyword)) return true;
    
    return false;
  });
}

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState('');
  
  const filteredNews = useMemo(() => {
    return filterNews(allNews, searchKeyword);
  }, [searchKeyword]);

  // 按年份分组
  const news2026 = filteredNews.filter(n => n.date.startsWith('2026'));
  const news2025 = filteredNews.filter(n => n.date.startsWith('2025'));

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <HeroSection
        title="欧洲移动应用合规洞察"
        subtitle="European Mobile App Compliance Insights"
        description="聚焦欧盟数字法规、应用合规监管与欧洲数据保护动态"
        updateDate="2026年4月23日"
      />

      <SearchSection 
        searchValue={searchKeyword}
        onSearchChange={setSearchKeyword}
      />

      {/* 2026年新闻 */}
      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center justify-between pb-3 border-b border-[#e5e5e5]">
            <h2 className="text-xl font-bold text-[#171717]">
              2026年合规快讯
            </h2>
            <span className="text-xs text-[#737373]">
              共 {news2026.length} 条
            </span>
          </div>
          
          {news2026.length > 0 ? (
            <div className="mt-6 flex flex-col gap-6">
              {news2026.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          ) : (
            <div className="mt-6 py-8 text-center">
              <p className="text-[#737373]">未找到相关新闻</p>
            </div>
          )}
        </div>
      </section>

      {/* 2025年新闻 */}
      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center justify-between pb-3 border-b border-[#e5e5e5]">
            <h2 className="text-xl font-bold text-[#171717]">
              2025年合规快讯
            </h2>
            <span className="text-xs text-[#737373]">
              共 {news2025.length} 条
            </span>
          </div>
          
          {news2025.length > 0 ? (
            <div className="mt-6 flex flex-col gap-6">
              {news2025.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          ) : (
            <div className="mt-6 py-8 text-center">
              <p className="text-[#737373]">未找到相关新闻</p>
            </div>
          )}
        </div>
      </section>

      {/* 搜索无结果 */}
      {filteredNews.length === 0 && (
        <section className="bg-[#fafafa] px-6 py-12">
          <div className="max-w-[800px] mx-auto text-center">
            <p className="text-[#737373]">未找到与"{searchKeyword}"相关的新闻</p>
            <button
              onClick={() => setSearchKeyword('')}
              className="mt-3 text-sm text-[#2563eb] hover:underline"
            >
              清除搜索
            </button>
          </div>
        </section>
      )}

      {/* 近期动态 */}
      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-xl font-bold text-[#171717] pb-3 border-b border-[#e5e5e5] mb-6">
            近期动态
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dynamicCards.map((card) => (
              <Link
                key={card.id}
                to={card.link}
                className="bg-white border border-[#e5e5e5] rounded-xl p-5 hover:border-[#d4d4d4] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200"
              >
                <h3 className="text-base font-semibold text-[#171717]">
                  {card.title}
                </h3>
                <p className="text-sm text-[#525252] mt-3 leading-relaxed line-clamp-3">
                  {card.articleTitle}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs text-[#737373]">{card.source}</span>
                  <span className="text-xs text-[#737373]">{card.date}</span>
                  <span
                    className={`text-xs font-medium ${
                      card.heat >= 8 ? 'text-[#dc2626]' : 'text-[#737373]'
                    }`}
                  >
                    热度 {card.heat}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
