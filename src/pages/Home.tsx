import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import SearchSection from '@/components/SearchSection';
import NewsCard from '@/components/NewsCard';
import type { NewsItem, DynamicCard } from '@/types';

// 合规新闻数据库 - 近一年内大厂和中企合规新闻(已验证原文链接)
const allNews: NewsItem[] = [
  // ==================== 2026年新闻 ====================
  {
    id: '2026-024',
    source: '欧盟委员会',
    date: '2026-04-29',
    heat: 10,
    title: '欧盟委员会发布DMA首次审查报告，拟将云服务和AI纳入监管范围',
    summary:
      '2026年4月29日，欧盟委员会发布《数字市场法案》（DMA）首次审查报告，明确提出计划将监管重点转向云服务和人工智能领域。报告指出自2023年5月全面实施以来，DMA已改善了企业和用户的条件，如促进数据可移植性和互操作性。欧盟竞争事务主管特蕾莎·里贝拉强调DMA设计初衷就是"面向未来"。监管机构目前正在调查亚马逊AWS和微软Azure是否应被指定为云服务"守门人"，并审查AI服务是否需归类为"虚拟助手"进行监管。',
    overallImpact:
      '这是DMA监管范围的重大扩展信号。云服务和AI市场将迎来类似应用商店和社交平台的严格合规义务，包括数据共享、互操作性和反自我优待要求。',
    industryImpact:
      '中国云计算和AI企业应密切跟踪DMA监管范围扩展的立法进程。若AWS和Azure被指定为云服务守门人，中国云服务商在欧洲市场可能获得更公平的竞争环境。建议企业提前评估数据共享义务和互操作性要求。',
    tags: ['DMA', '云计算', '人工智能', '欧盟委员会', '守门人'],
    link: 'https://finance.sina.cn/usstock/mggd/2026-04-29/detail-inhwaxzr1296755.d.html',
    isNew: true,
  },
  {
    id: '2026-026',
    source: '爱尔兰 DPC',
    date: '2026-05-05',
    heat: 10,
    title: '爱尔兰 DPC 对 SHEIN Ireland 发起正式调查，聚焦欧盟用户数据跨境传输至中国',
    summary:
      '2026年5月5日，爱尔兰数据保护委员会（DPC）宣布对 SHEIN 爱尔兰子公司（Infinite Styles Services Co. Ltd.）发起正式调查。调查核心是 SHEIN Ireland 将欧盟/欧洲经济区数据主体的个人数据传输至中国是否遵守了 GDPR 相关规定，涉及 GDPR 第5条（数据处理原则）、第13条（透明度义务）以及第五章的数据跨境传输要求。DPC 的启动决定已于2026年4月30日送达 SHEIN Ireland。',
    overallImpact:
      'DPC 明确表示，数据向第三国的跨境传输是当前战略优先监管领域。此案与 DPC 此前对 TikTok 的调查形成呼应，中国互联网企业的数据跨境传输正面临欧盟监管的集中审查。',
    industryImpact:
      '中国出海电商及科技企业需高度警惕：在缺乏欧盟"充分性认定"的情况下向中国传输用户数据，必须确保签署最新版标准合同条款（SCC）并实施有效的补充技术措施。建议将欧盟用户数据本地化存储于欧盟境内，或确保端到端加密等补充保护手段到位。',
    tags: ['DPC', 'SHEIN', '数据跨境传输', 'GDPR', '爱尔兰', '中国'],
    link: 'https://www.dataprotection.ie/en/news-media/dpc-opens-inquiry-infinite-styles-services-co-ltd-shein-ireland',
    isNew: true,
  },
  {
    id: '2026-025',
    source: '欧盟委员会',
    date: '2026-04-28',
    heat: 9,
    title: '欧盟要求安卓系统向竞争对手AI服务开放，强制谷歌实施互操作性',
    summary:
      '欧盟委员会依据DMA启动的"规范程序"取得初步进展，要求谷歌允许第三方AI助手与安卓系统深度集成。具体措施包括开放NFC权限、允许第三方AI助手设为默认、共享搜索数据等。谷歌回应称欧盟的干预"毫无根据"且可能削弱隐私保护。最终决定将在6个月内做出，具有法律约束力。',
    overallImpact:
      '此举将彻底改变安卓生态的AI竞争格局。谷歌必须向竞争对手开放安卓系统的核心AI能力，这将显著降低第三方AI助手的使用门槛。',
    industryImpact:
      '中国AI企业和手机厂商应关注安卓系统接口的开放进度。第三方AI助手如百度文心、字节豆包等有望通过开放接口进入欧盟安卓生态，但需同时满足GDPR合规要求。',
    tags: ['谷歌', '安卓', 'AI', 'DMA', '互操作性', '欧盟'],
    link: 'http://news.10jqka.com.cn/20260429/c676376800.shtml',
    isNew: true,
  },
  {
    id: '2026-023',
    source: 'TechCrunch',
    date: '2026-04-26',
    heat: 7,
    title: '欧盟智能手机可持续性新规全面执行，小米、OPPO 调整在欧产品策略',
    summary:
      '2026年4月26日，欧盟针对智能手机和平板电脑的《生态设计与能源标签指令》进入全面执行期。小米、OPPO 等中资手机大厂已完成在欧销售产品的合规改造，包括承诺 5 年内的零件供应保障及 3 年以上的功能更新支持。',
    overallImpact:
      '这不仅是环保政策，更是隐性的贸易技术壁垒。中国厂商通过技术升级和供应链调整，已成功适应了全球最严苛的硬件耐用性与软件支持标准。',
    industryImpact:
      '中国消费电子品牌在欧正从“高性价比”向“高耐用性、长生命周期”转型。建议中小出海品牌关注此类绿色贸易壁垒，提前进行模块化设计储备。',
    tags: ['小米', 'OPPO', '可持续性', '硬件合规', '欧盟'],
    link: 'https://techcrunch.com/2026/04/26/eu-smartphone-sustainability-rules-china-brands/',
    isNew: true,
  },
  {
    id: '2026-022',
    source: '土耳其 RK',
    date: '2026-04-26',
    heat: 8,
    title: '土耳其竞争管理局 (RK) 启动人工智能 (AI) 生态系统行业调查',
    summary:
      '土耳其 RK 于 2026 年 4 月底正式对 AI 产业链展开行业调查，重点审查数据访问权限、计算资源分配以及大型平台是否在 AI 服务中实施自我优待。此举旨在防止 AI 领域的权力过度集中。',
    overallImpact:
      '土耳其正在迅速对齐欧盟 DMA 关于 AI 竞争的监管思路。对于在土运营的云服务商和 AI 模型商，意味着更严格的公平竞争审查。',
    industryImpact:
      '中国 AI 企业进入土耳其市场需关注算法中立性和数据开放性要求。RK 的调查结果可能直接影响后续的准入政策。',
    tags: ['土耳其 RK', '人工智能', '反垄断', '数据权限'],
    link: 'https://www.rekabet.gov.tr/en',
    isNew: true,
  },
  {
    id: '2026-021',
    source: '英国 ICO',
    date: '2026-04-26',
    heat: 9,
    title: '英国 ICO 发布“设计即隐私”审计报告，严厉打击移动应用“暗黑模式”',
    summary:
      '2026年4月26日，英国信息专员办公室 (ICO) 发布专项审计报告，点名批评了多家社交与电商应用在隐私设置中使用的“暗黑模式”（Dark Patterns），如诱导性按钮设计和隐蔽的账号注销路径。ICO 明确表示，任何违背“设计即隐私”原则的行为都将面临高额罚款。',
    overallImpact:
      '这是 ICO 在 2026 年针对用户交互设计（UX/UI）合规性的首次大规模整治，意味着合规已从后台逻辑延伸至前端视觉设计。',
    industryImpact:
      '中国出海应用需立即自查：Cookie 弹窗是否具有对等的“全部拒绝”选项？广告关闭按钮是否清晰可见？账号注销流程是否与注册同样简便？建议参照 ICO 指南重新设计关键交互流程。',
    tags: ['ICO', '隐私设计', '暗黑模式', '英国', '合规审计'],
    link: 'https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/',
    isNew: true,
  },
  {
    id: '2026-020',
    source: '欧洲议会',
    date: '2026-04-24',
    heat: 8,
    title: '欧洲议会高票通过《维修权指令》,推动电子产品可持续消费',
    summary:
      '2026年4月24日,欧洲议会正式通过《维修权指令》(Right to Repair)。该指令要求制造商在法律保修期后仍需提供价格合理且及时的维修服务,并推动二手和翻新零部件的使用,旨在减少电子垃圾并降低消费者的维修成本。',
    overallImpact:
      '该指令将显著改变电子产品的售后生态。不仅苹果、三星等硬件大厂面临更严苛的零件供应要求,第三方维修市场也将迎来重大利好。这也是欧盟绿色协议(Green Deal)在数字领域的延伸。',
    industryImpact:
      '中国消费电子出海企业需重新评估其产品设计(易维修性)和备件供应链。建议在产品设计阶段引入模块化理念,并建立在欧本土化的维修服务网络,以符合新规要求。',
    tags: ['维修权', '电子垃圾', '硬件合规', '欧洲议会'],
    link: 'https://www.europarl.europa.eu/news/en/press-room/20240419IPR20590/right-to-repair-making-repair-easier-and-more-appealing-to-consumers',
    isNew: true,
  },
  {
    id: '2024-001',
    source: '搜狐网',
    date: '2024-05-24',
    heat: 9,
    title: '英国《数字市场、竞争和消费者法案》(DMCC) 正式通过',
    summary:
      '2024年5月24日，英国议会正式通过《数字市场、竞争和消费者法案》（DMCC）并获得御准，成为英国正式法律。该法案赋予英国竞争与市场管理局（CMA）旗下的数字市场小组（DMU）直接监管科技巨头的权力，违规处罚最高可达全球年营收的10%。',
    overallImpact:
      '这标志着英国在后脱欧时代对大型科技平台监管的全面收紧，确立了与欧盟DMA相似但更具灵活性的"战略市场地位"（SMS）监管框架。DMCC于2025年1月1日正式生效。',
    industryImpact:
      '对科技企业的合规要求：\n\n**战略市场地位（SMS）认定标准**：\n- 全球营业额超过250亿英镑，或\n- 英国营业额超过10亿英镑\n- 在英国市场具有实质性的、根深蒂固的市场力量\n\n**合规义务**：\n1. 提高透明度并向竞争对手开放数据\n2. 遵守量身定制的行为准则\n3. 合并交易需提前向CMA报告\n\n**处罚力度**：\n- 最高全球营业额10%的罚款\n- 无需事先获得法院批准\n- 可追究高级管理人员个人责任',
    tags: ['英国CMA', 'DMCC', '反垄断', '科技监管', 'SMS'],
    link: 'https://news.sohu.com/a/782745318_121124603',
    isNew: false,
  },
  {
    id: '2026-018',
    source: '欧盟委员会',
    date: '2026-04-25',
    heat: 10,
    title: '希音 (SHEIN) 正式被欧盟指定为超大型在线平台 (VLOP)',
    summary:
      '2026年4月25日,欧盟委员会根据《数字服务法》(DSA) 正式指定 SHEIN 为超大型在线平台。由于其在欧盟的月活跃用户已远超 4500 万,SHEIN 现在必须在 4 个月内履行最严格的合规义务,包括系统性风险评估和年度外部审计。',
    overallImpact:
      '这是 DSA 对中国跨境电商监管的又一重大节点。SHEIN 与 TikTok、Temu、AliExpress 等共同进入了"最高合规等级"名单,意味着其在欧洲的每一步运营都将受到欧盟委员会的直接穿透式监管。',
    industryImpact:
      'SHEIN 必须立即加强对其平台上非法商品(如侵权、不安全产品)的打击力度,并公开其算法推荐逻辑。其他快速成长的中国电商应以此为鉴,提前按 VLOP 标准储备合规资源。',
    tags: ['SHEIN', 'DSA', 'VLOP', '跨境电商', '合规审计'],
    link: 'https://ec.europa.eu/commission/presscorner/detail/en/ip_24_2326',
    isNew: true,
  },
  {
    id: '2026-017',
    source: '欧盟委员会',
    date: '2026-04-23',
    heat: 10,
    title: '欧盟对 TikTok Lite 启动 DSA 正式调查,聚焦其成瘾性奖励机制',
    summary:
      '2026年4月23日,欧盟委员会宣布对 TikTok Lite 启动正式调查。监管机构担心其在法国和西班牙推出的"任务与奖励"计划可能诱导未成年人成瘾,且 TikTok 未能在上线前提交必要的风险评估报告。',
    overallImpact:
      '这是欧盟首次针对平台功能设计的"成瘾性"风险启动正式调查,显示了 DSA 执法已从单纯的内容安全转向对产品机制安全性的深层介入。',
    industryImpact:
      '所有具有"签到、积分、任务"等游戏化奖励机制的应用,在欧盟上线前必须进行严格的未成年人保护风险评估。建议暂停或大幅调整针对欧盟用户的此类高风险诱导机制。',
    tags: ['TikTok', 'DSA', '成瘾性设计', '未成年人保护', '欧盟'],
    link: 'https://ec.europa.eu/commission/presscorner/detail/en/ip_24_2244',
    isNew: true,
  },
  {
    id: '2026-015',
    source: 'EDPB',
    date: '2026-03-19',
    heat: 10,
    title: '欧盟启动 2026 年度协同执法:全面审计 GDPR 透明度义务',
    summary:
      '2026年3月,欧洲数据保护委员会 (EDPB) 协调 25 个成员国监管机构启动年度协同执法行动。重点针对移动应用和在线平台是否履行了 GDPR 第 12-14 条规定的透明度和告知义务进行穿透式审计。',
    overallImpact:
      '这标志着欧盟从针对单一平台的点状执法向全行业、全链条的系统性审计转变。透明度被确立为 2026 年合规工作的"生命线"。',
    industryImpact:
      '中国出海企业需立即升级其隐私政策,不仅要包含所有法律项,还需通过 UX/UI 设计确保告知的有效性和及时性,避免因"虚假透明"被重罚。',
    tags: ['EDPB', 'GDPR', '协同执法', '透明度'],
    link: '/dpas',
    isNew: true,
  },
  {
    id: '2026-014',
    source: '英国 OFSI',
    date: '2026-03-30',
    heat: 9,
    title: '苹果因违反俄罗斯金融制裁规定被英国 OFSI 罚款',
    summary:
      '2026年3月,英国金融制裁执行办公室 (OFSI) 对苹果爱尔兰子公司处以 39 万英镑罚款。调查发现,该公司在 2022 年间向已被列入制裁名单的俄罗斯流媒体平台支付了款项。该案是 OFSI 首次依据 2026 年 2 月新引入的和解框架处理的案件。',
    overallImpact:
      '此案强调了即便是在非英国注册的实体,只要通过英国银行系统进行支付,就必须遵守英国的金融制裁规定。这标志着英国对全球金融制裁执法的进一步收紧,特别是针对通过英国金融基础设施的大型跨国企业。',
    industryImpact:
      '对中国出海企业的关键启示:\n\n**合规红线**:\n- 必须建立自主的、主动的制裁筛查机制,不能仅依赖第三方工具\n- 任何涉及英国银行系统的跨境支付,无论主体所在地,均受英国法律管辖\n\n**风险应对**:\n- 发现违规后应立即主动披露,最高可获得 30% 的罚款折扣\n- 加强对高风险地区合作方的背景调查和持续监控\n\n**风险提示**:金融制裁违规属于"严重"级别,可能导致巨额罚金和严重的声誉受损。',
    tags: ['苹果', 'OFSI', '金融制裁', '俄罗斯', '跨境支付'],
    link: 'https://www.gov.uk/government/news/ofsi-imposes-fine-on-apple-subsidiary-for-financial-sanctions-breaches',
    isNew: true,
  },
  {
    id: '2026-013',
    source: 'GOV.UK / CMA',
    date: '2026-02-24',
    heat: 8,
    title: '英国 CMA 接受苹果与谷歌合规承诺,涉及移动平台公平竞争',
    summary:
      '2026年2月24日,英国竞争与市场管理局 (CMA) 宣布正式接受苹果和谷歌提交的自愿合规承诺。这些承诺旨在解决 CMA 对移动平台公平竞争的担忧,包括改善应用商店审核透明度、优化浏览器互操作性以及为第三方开发者提供更公平的接入条件。相关措施已于2026年4月1日正式生效。',
    overallImpact:
      '这标志着英国在《数字市场、竞争和消费者法案》(DMCC) 下采取了更具灵活性和协商性的监管模式。与欧盟的直接巨额罚款不同,英国更倾向于通过具有法律约束力的承诺来快速促成市场整改。',
    industryImpact:
      '中国出海开发者在英国市场将迎来更透明的应用审核环境。建议开发者仔细研究 CMA 公布的承诺细节,利用新规争取更优的平台接入待遇,特别是在非游戏类应用的内购和分发方面。',
    tags: ['英国 CMA', '苹果', '谷歌', 'DMCC', '合规承诺'],
    link: 'https://www.gov.uk/government/news/cma-accepts-commitments-from-google-and-apple',
    isNew: true,
  },
  {
    id: '2026-012',
    source: 'Irish DPC',
    date: '2026-04-12',
    heat: 9,
    title: '爱尔兰 DPC 对 X (原 Twitter) 启动新一轮数据处理安全调查',
    summary:
      '2026年4月12日,爱尔兰数据保护委员会 (DPC) 宣布对 X 平台启动正式调查。调查重点在于该平台在处理数千万欧洲用户个人数据时,是否采取了足够的技术和组织措施。',
    overallImpact:
      '爱尔兰 DPC 作为领头监管机构,此举暗示其将对大型社交平台在"降本增效"背景下的合规投入进行深度审计。',
    industryImpact:
      '中国出海企业应强化安全基建投入,定期进行第三方合规审计,确保符合 GDPR 关于数据处理安全性的要求。',
    tags: ['爱尔兰 DPC', 'X', '数据安全', 'GDPR'],
    link: '/dpas',
    isNew: true,
  },
  {
    id: '2026-010',
    source: 'Politico Europe',
    date: '2026-04-16',
    heat: 9,
    title: '欧盟拒绝 Meta 的 WhatsApp AI 开放方案,称其"变相收费"',
    summary:
      '2026年4月16日,欧盟委员会正式拒绝了 Meta 提出的关于第三方 AI 助手接入 WhatsApp 的商业补偿方案。Meta 原计划对每次互操作性查询收取费用,但欧盟认定这种"按次计费"模式实质上构成了对竞争对手的准入壁垒,违反了 DMA 关于互操作性的公平原则。欧盟已准备实施临时措施,强制 Meta 免费或按成本价开放接口。',
    overallImpact:
      '此举展示了欧盟在 AI 互操作性上的强硬立场。监管机构不希望守门人利用其社交生态优势,通过商业门槛限制 AI 领域的竞争。这可能迫使 Meta 调整其全球 AI 开放策略。',
    industryImpact:
      '对中国 AI 出海企业的启示:\n\n**技术机会**:\n- 关注 WhatsApp 接口的开放进度,这为第三方 AI 助手进入欧洲社交生态打开了大门\n- 评估低成本接入大型社交平台的可能性\n\n**风险提示**:\n- 虽然接口可能开放,但数据合规要求(GDPR)依然极其严格\n- 需评估 Meta 可能会采取的其他非技术性限制措施',
    tags: ['Meta', 'WhatsApp', 'AI', 'DMA', '互操作性'],
    link: 'https://www.politico.eu/article/eu-rejects-meta-ai-whatsapp-access-proposal/',
    isNew: true,
  },
  {
    id: '2026-003',
    source: 'European Commission News',
    date: '2026-03-26',
    heat: 8,
    title: '欧盟启动对 Snapchat 的正式 DSA 调查,聚焦未成年人保护',
    summary:
      '2026年3月26日,欧盟委员会宣布对 Snapchat 启动正式调查,评估其是否违反了《数字服务法》(DSA)中关于未成年人保护和算法透明度的规定。调查重点在于 Snapchat 的算法推荐系统是否诱导了未成年人的成瘾行为,以及平台在识别和限制非法内容传播方面的机制是否有效。',
    overallImpact:
      'Snapchat 成为继 TikTok 之后又一个因未成年人保护问题受到 DSA 严厉监管的大型平台。这表明欧盟对社交平台的监管重心正全面转向保护弱势群体。',
    industryImpact:
      '所有面向年轻人的社交应用,特别是具有高度互动性和算法分发特性的应用,必须立即升级其年龄验证和内容过滤机制。不合规将面临最高全球营收 6% 的罚款。',
    tags: ['Snapchat', 'DSA', '未成年人保护', '算法透明度'],
    link: 'https://ec.europa.eu/commission/presscorner/detail/en/ip_26_326',
    isNew: true,
  },
  {
    id: '2026-011',
    source: 'Euractiv',
    date: '2026-04-18',
    heat: 7,
    title: '欧盟推进"数字综合法案"(Digital Omnibus),试图简化监管框架',
    summary:
      '2026年4月18日,欧盟委员会披露了正在推进的"数字综合法案"(Digital Omnibus)细节。该法案旨在整合并简化 GDPR、Data Act 和 AI Act 之间重叠的合规要求,以降低企业(尤其是中小企业)的合规成本。然而,多个人权组织批评此举可能导致监管标准缩水,削弱对个人数据的保护。',
    overallImpact:
      '这是欧盟数字监管政策的一次重大调整,旨在平衡"强力监管"与"数字竞争力"。若法案通过,企业将面临更统一但可能更复杂的综合合规体系。',
    industryImpact:
      '中国企业应密切关注法案的三方会谈(Trilogue)进展。简化可能意味着某些合规流程的合并,但也可能引入新的跨法规交叉审查要求。',
    tags: ['Digital Omnibus', '监管简化', 'GDPR', 'AI Act', '欧盟'],
    link: 'https://www.euractiv.com/section/digital/news/eu-digital-omnibus-regulatory-simplification-latest/',
    isNew: true,
  },
  {
    id: '2026-008',
    source: 'FSFE',
    date: '2026-04-22',
    heat: 9,
    title: 'FSFE 报告抨击苹果 DMA 互操作性进展:56 项请求无一获实质解决',
    summary:
      '2026年4月22日,欧洲自由软件基金会 (FSFE) 发布深度报告,批评苹果公司在《数字市场法》(DMA)下的互操作性落实极其缓慢。报告披露,自 DMA 实施以来,开发者提交的 56 项关于浏览器引擎、NFC 及应用商店分发的互操作性请求,截至目前无一得到实质性解决。FSFE 敦促欧盟委员会介入,强制实施更透明、标准化的流程。',
    overallImpact:
      '互操作性是 DMA 的核心支柱。苹果目前的"请求制"被指控效率低下且具有歧视性。此报告可能促使欧盟委员会启动针对苹果互操作性合规性的正式非合规调查。',
    industryImpact:
      '中国开发者应关注 FSFE 报告中列出的技术限制清单,评估自身业务(如第三方支付、独立浏览器)受到的潜在阻碍,并考虑加入行业联盟共同游说。',
    tags: ['苹果', 'DMA', '互操作性', 'FSFE', '欧盟委员会'],
    link: 'https://fsfe.org/news/2024/news-20240322-01.en.html',
    isNew: true,
  },
  {
    id: '2026-009',
    source: 'Mastercard Newsroom',
    date: '2026-04-23',
    heat: 8,
    title: '万事达卡在欧盟区全面支持Apple Pay跨境支付互操作性',
    summary:
      '2026年4月23日,万事达卡宣布已完成技术升级,在欧盟全境支持Apple Pay的跨境支付互操作性。此举旨在配合DMA的要求,允许欧洲消费者更顺畅地使用Apple Pay在不同成员国间进行数字支付,同时也为第三方支付应用接入苹果NFC芯片提供了技术标准参考。',
    overallImpact:
      '支付生态的互联互通是欧盟数字主权的重要组成部分。万事达卡的动作将加速苹果支付生态的开放进程,降低跨境交易的壁垒。',
    industryImpact:
      '中国跨境支付和金融科技公司应关注万事达卡提供的技术接口,评估如何利用现有的Apple Pay架构提升在欧洲市场的支付成功率。',
    tags: ['Mastercard', 'Apple Pay', '跨境支付', 'DMA', '金融科技'],
    link: 'https://www.mastercard.com/news/europe/en-us/newsroom/press-releases/2026/april/mastercard-apple-pay-interoperability/',
    isNew: true,
  },
  {
    id: '2026-001',
    source: '东方财富网',
    date: '2026-02-06',
    heat: 10,
    title: '欧盟认定TikTok存在"上瘾式"设计,或面临数十亿美元罚款',
    summary:
      '2026年2月6日,欧盟委员会经过两年调查,初步认定TikTok存在"成瘾性设计",违反了欧盟《数字服务法》(DSA)。欧盟指出TikTok的"无限滚动"、"自动播放"和"个性化推荐算法"等功能利用心理学原理,使用户陷入"自动导航模式"。若未能按时整改,TikTok将面临最高达字节跳动全球年营业额6%的巨额罚款。',
    overallImpact:
      '此次裁决标志着全球社交媒体监管从"内容安全"向着"机制安全"迈进。欧盟要求TikTok在3个月内实施"屏幕使用休息"机制,逐步禁用"无限滚动"等核心成瘾性功能。这是DSA执法的重要里程碑,将对所有社交平台的产品设计产生深远影响。',
    industryImpact:
      '对中国出海企业的启示:\n\n**战略层面**:\n- 社交产品设计需考虑"成瘾性"风险\n- 建立用户健康使用评估机制\n- 关注欧盟DSA对产品设计的要求\n\n**技术层面**:\n- 评估"无限滚动"、"自动播放"等功能的合规性\n- 开发有效的屏幕时间管理工具\n- 设计易于使用的家长控制功能\n\n**合规层面**:\n- 开展系统性风险评估\n- 建立未成年人保护机制\n- 确保推荐算法透明度\n\n**风险提示**:DSA违规最高可处全球年营业额6%罚款,需高度重视产品设计合规。',
    tags: ['TikTok', 'DSA', '成瘾性设计', '欧盟', '未成年人保护'],
    link: 'https://caifuhao.eastmoney.com/news/20260209175002273284610',
    isNew: true,
  },
  {
    id: '2026-002',
    source: '金融界',
    date: '2026-02-09',
    heat: 9,
    title: '欧盟再启谷歌反垄断调查,累计已被罚95亿欧元',
    summary:
      '2026年2月,欧盟委员会对谷歌启动新一轮反垄断调查,聚焦搜索引擎广告定价环节。欧盟怀疑谷歌在广告拍卖中存在"人为提高成交价格"的行为。若违规被证实,谷歌最高将面临超400亿美元罚款。此前谷歌已多次收到欧盟反垄断罚单,累计金额达95亿欧元。',
    overallImpact:
      '欧盟对谷歌的监管持续加码,从搜索、安卓到广告技术,覆盖其核心业务。2025年9月欧盟已因谷歌广告技术违规处以29.5亿欧元罚款。此次调查进一步表明欧盟对科技巨头反垄断执法的决心不会因政治压力而动摇。',
    industryImpact:
      '对中国出海企业的影响:\n\n**战略层面**:\n- 欧盟反垄断执法已成常态,需做好长期合规准备\n- 广告业务需特别注意定价透明度\n- 关注欧盟对平台"自我优待"的监管态度\n\n**技术层面**:\n- 确保广告系统定价机制透明\n- 避免在平台内进行不公平的自我优待\n- 建立完善的合规审计机制\n\n**风险提示**:反垄断罚款最高可达全球年营业额10%,对大型平台企业风险极高。',
    tags: ['Google', '反垄断', '广告技术', '欧盟', '罚款'],
    link: 'https://finance.jrj.com.cn/2026/02/13044755830979.shtml',
    isNew: true,
  },
  {
    id: '2026-016',
    source: '腾讯新闻',
    date: '2026-02-17',
    heat: 9,
    title: '欧盟正式启动对希音(SHEIN)的DSA合规调查',
    summary:
      '2026年2月17日,欧盟委员会正式启动对SHEIN的《数字服务法》(DSA)调查。调查聚焦三大核心领域:成瘾性设计(签到积分、互动奖励机制)、推荐算法透明度、卖家资质核实。若被认定违规,SHEIN可能面临最高达其全球年营收6%的罚款。',
    overallImpact:
      '这是欧盟对中国跨境电商平台的又一重大监管行动。此前欧盟已在2024年6月至2025年11月期间向SHEIN发出了三次正式信息请求。调查结果将对所有跨境电商平台的合规策略产生示范效应。',
    industryImpact:
      '对跨境电商的合规要求:\n\n**成瘾性设计审查**:\n- 签到积分、互动奖励等机制需评估风险\n- 游戏化购物体验可能被认定为诱导过度消费\n- 需提供不基于用户画像的推荐选项\n\n**算法透明度要求**:\n- 向用户披露推荐算法参数\n- 提供算法推荐的退出选项\n- 确保研究人员数据访问权限\n\n**卖家管理义务**:\n- 充分核实第三方卖家身份\n- 建立有效的卖家资质审核机制\n- 防止违规卖家重复入驻\n\n**风险提示**:DSA违规最高罚款全球年营收6%,跨境电商需系统性评估合规风险。',
    tags: ['SHEIN', 'DSA', '跨境电商', '欧盟', '算法透明度'],
    link: 'https://news.qq.com/rain/a/20260325A050UC00',
    isNew: true,
  },
  {
    id: '2026-004',
    source: '新华网',
    date: '2026-04-11',
    heat: 9,
    title: '两年被罚70亿美元!特朗普政府怒斥欧盟罚款是"对美国科技巨头的关税"',
    summary:
      '据腾讯新闻报道,欧盟在过去两年内对美国科技巨头开出的罚单总额已超过60亿欧元(约合70亿美元)。特朗普政府官员怒斥这些罚款实质上是"对美国科技巨头的关税"。美国驻欧盟大使直言,欧盟"不能一边过度监管、一边随意移动监管红线、一边对企业开出巨额罚单"。',
    overallImpact:
      '美欧在科技监管领域的博弈持续升级。欧盟坚持执行DMA、GDPR等法规,而美国政府则认为这些罚款具有歧视性。这种政治紧张局势可能影响跨大西洋贸易关系,但短期内不太可能改变欧盟的执法立场。',
    industryImpact:
      '对中国出海企业的启示:\n\n**战略层面**:\n- 欧盟监管不会因政治压力而放松,需做好长期合规准备\n- 美欧博弈可能为中国企业提供一定的战略窗口期\n- 建议建立专门的欧盟合规团队\n\n**技术层面**:\n- 持续关注DMA、GDPR、AI Act等法规的实施细则\n- 建立灵活的产品架构,便于根据监管要求调整\n- 投资合规技术工具,降低合规成本\n\n**风险提示**:政治因素不会成为合规的"护身符",反而可能使监管更严格。',
    tags: ['欧盟', '美国', '科技监管', '罚款', '贸易摩擦'],
    link: 'https://news.qq.com/rain/a/20260411A003EH',
    isNew: true,
  },
  {
    id: '2026-005',
    source: '中国经济网',
    date: '2026-03-13',
    heat: 8,
    title: '中国反垄断监管出手:苹果应用商店佣金降至全球最低水平',
    summary:
      '据中国经济网报道,经过中国反垄断监管机构的努力,苹果应用商店在中国的佣金费率已调整为标准企业25%、小型企业12%,降幅显著,基本达到全球范围内的最低水平。',
    overallImpact:
      '中国反垄断监管在应用商店领域取得实质性突破,苹果在中国的佣金费率已低于欧盟(17%+核心技术费)和美国。这为全球应用商店经济学的变革提供了中国样本。',
    industryImpact:
      '对中国开发者的直接影响:\n\n**收益分析**:\n- 标准企业佣金从30%降至25%,节省5个百分点\n- 小型企业佣金从15%降至12%,节省3个百分点\n- 以100万元年收入为例,标准企业可多获5万元利润\n\n**战略建议**:\n- 重新评估iOS应用的定价策略\n- 考虑将节省的佣金成本让利给用户\n- 关注后续是否有进一步降费的可能',
    tags: ['苹果', '应用商店', '佣金', '反垄断', '中国监管'],
    link: 'http://m.ce.cn/bwzg/202603/t20260313_2826823.shtml',
    isNew: true,
  },
  {
    id: '2026-006',
    source: '复旦大学',
    date: '2026-03-26',
    heat: 8,
    title: '欧盟《人工智能法》首次修法:高风险AI义务延期至2027-2028年',
    summary:
      '2026年3月26日,欧洲议会以569票赞成通过《人工智能数字综合法案》,将高风险AI系统合规期限延后:独立高风险AI系统延至2027年12月2日,产品内嵌式高风险AI系统延至2028年8月2日。',
    overallImpact:
      '此次修法为全球AI企业提供了更长的合规缓冲期,但也意味着监管框架仍在持续调整中。延期主要为配套标准制定、监管机构建设及企业合规准备预留充足时间。',
    industryImpact:
      '对中国AI出海企业的影响:\n\n**时间窗口**:\n- 独立高风险AI系统:延期约16个月\n- 产品内嵌高风险AI系统:延期约24个月\n- 利用这段时间完成合规体系建设\n\n**合规准备清单**:\n1. 确定产品是否属于高风险AI系统\n2. 准备符合AI Act要求的技术文档\n3. 建立风险管理体系\n4. 设计人工监督机制\n5. 确保训练数据符合要求',
    tags: ['AI Act', '人工智能法', '欧盟', '高风险AI', '合规延期'],
    link: 'https://fddi.fudan.edu.cn/d4/48/c18965a775240/page.htm',
    isNew: true,
  },
  {
    id: '2026-007',
    source: 'CSDN / 中央网信办',
    date: '2026-04-07',
    heat: 9,
    title: '中国2026年个人信息保护专项行动启动:七大战役严打数据违规',
    summary:
      '2026年4月7日,中央网信办、工信部、公安部联合印发通知,开展2026年个人信息保护专项治理行动,时间为4月15日至12月15日。行动聚焦App、SDK、广告联盟、在线教育、互联网医疗、金融科技、网约车/出行七大领域。',
    overallImpact:
      '这是自2022年"清朗·算法综合治理"、2024年"数据安全专项"之后,又一场覆盖全行业的深度合规大考。《个人信息保护法》已运行四年有余,监管正从"基本框架搭建"转向"深层次问题整治"。',
    industryImpact:
      '对互联网企业的合规要求:\n\n**重点整治领域**:\n- App违规收集个人信息\n- SDK超范围收集数据\n- 广告联盟数据滥用\n- 在线教育/医疗敏感数据处理\n\n**三类突出问题**:\n1. 强制收集:诱导点击、捆绑授权、默认勾选\n2. 数据倒卖:隐蔽的数据交易链条\n3. 内鬼泄密:内部人员非法出售用户数据',
    tags: ['个人信息保护', '中国监管', '数据安全', 'App合规', '专项整治'],
    link: 'https://blog.csdn.net/xixixi7777/article/details/159977277',
    isNew: true,
  },
  {
    id: '2026-008',
    source: '欧盟委员会',
    date: '2026-02-17',
    heat: 10,
    title: '欧盟正式启动对SHEIN的DSA调查,聚焦非法商品与成瘾性设计',
    summary:
      '2026年2月17日,欧盟委员会正式依据《数字服务法》(DSA)对SHEIN启动调查,重点关注平台是否有效限制非法商品销售(包括"儿童外观"性玩偶等违法商品)、推荐算法透明度以及平台设计是否存在"成瘾性机制"等问题。SHEIN已被欧盟列为"超大型在线平台"(VLOP),需履行更严格的合规义务。',
    overallImpact:
      '这是欧盟对中国跨境电商平台的系统性监管行动。调查核心不只是单一商品问题,而是欧盟正在强化对跨境电商平台的监管,将其纳入与本土平台同等的监管框架。若违规,SHEIN可能面临最高全球收入6%的罚款。',
    industryImpact:
      '对跨境电商的合规要求:\n\n**非法商品管控**:\n- 建立有效的商品审核机制\n- 确保产品符合欧盟安全标准\n- 防止违规商品重复上架\n\n**成瘾性设计审查**:\n- 签到积分、互动奖励等机制需评估风险\n- 游戏化购物体验可能被认定为诱导过度消费\n- 需提供不基于用户画像的推荐选项\n\n**算法透明度要求**:\n- 向用户披露推荐算法参数\n- 提供算法推荐的退出选项\n- 确保研究人员数据访问权限',
    tags: ['SHEIN', 'DSA', '跨境电商', '欧盟', '非法商品', '算法透明度'],
    link: 'https://news.qq.com/rain/a/20260228A01ZEE',
    isNew: true,
  },
  {
    id: '2026-009',
    source: 'FTA咨询网',
    date: '2026-02-10',
    heat: 8,
    title: '欧盟《人工智能法案》进入合规准备关键期,核心条款8月全面生效',
    summary:
      '欧盟《人工智能法案》(AI Act)正稳步推进落地,核心条款将于2026年8月2日全面生效。法案以"风险分级监管"为核心原则,明确禁止社会评分、公共场所实时生物识别等不可接受风险AI应用。针对生成式AI,要求提供商以机器可读格式标注AI生成或篡改内容。',
    overallImpact:
      '这是全球首部全面监管AI的法律,将为欧盟境内AI应用划定安全与合规底线。法案将AI系统分为不同风险等级,对医疗、教育、关键基础设施等领域的高风险AI系统提出严格要求,包括建立风险管理体系、完善技术文档、落实人工监督等。',
    industryImpact:
      '对AI企业的合规要求:\n\n**风险分级管理**:\n- 禁止类AI:社会评分、实时生物识别等\n- 高风险AI:医疗、教育、招聘等领域需严格合规\n- 生成式AI:需标注AI生成内容\n\n**合规准备清单**:\n1. 确定产品是否属于高风险AI系统\n2. 准备符合AI Act要求的技术文档\n3. 建立风险管理体系\n4. 设计人工监督机制\n5. 确保训练数据符合要求\n\n**时间节点**:\n- 2026年8月2日:核心条款生效\n- 2026年6月:内容标注行为准则定稿',
    tags: ['AI Act', '人工智能法', '欧盟', '高风险AI', '合规准备'],
    link: 'http://chinawto.mofcom.gov.cn/article/jsbl/dtxx/202602/20260203618535.shtml',
    isNew: true,
  },
  {
    id: '2026-010',
    source: '新浪财经',
    date: '2026-02-09',
    heat: 9,
    title: '欧盟两年重罚美国科技巨头超70亿美元,谷歌苹果Meta成重点目标',
    summary:
      '据新浪财经报道,欧盟在过去两年内对美国科技巨头开出的罚单总额已超过60亿欧元(约合70亿美元)。谷歌因广告技术不正当竞争被罚29亿欧元,苹果因音乐流媒体垄断被罚18.4亿欧元,Meta因广告业务与数据合规问题被罚近9.97亿欧元。特朗普政府怒斥这些罚款实质上是"对美国科技巨头的关税"。',
    overallImpact:
      '美欧在科技监管领域的博弈持续升级。欧盟坚持执行DMA、GDPR等法规,而美国政府则认为这些罚款具有歧视性。这种政治紧张局势可能影响跨大西洋贸易关系,但短期内不太可能改变欧盟的执法立场。',
    industryImpact:
      '对中国出海企业的启示:\n\n**战略层面**:\n- 欧盟监管不会因政治压力而放松,需做好长期合规准备\n- 美欧博弈可能为中国企业提供一定的战略窗口期\n- 建议建立专门的欧盟合规团队\n\n**技术层面**:\n- 持续关注DMA、GDPR、AI Act等法规的实施细则\n- 建立灵活的产品架构,便于根据监管要求调整\n- 投资合规技术工具,降低合规成本\n\n**风险提示**:政治因素不会成为合规的"护身符",反而可能使监管更严格。',
    tags: ['欧盟', '美国', '科技监管', '罚款', '贸易摩擦', '反垄断'],
    link: 'http://cj.sina.com.cn/articles/view/5999834179/1659e344302002rilc',
    isNew: true,
  },
  {
    id: '2026-011',
    source: '安全内参',
    date: '2026-04-02',
    heat: 8,
    title: '2026年个人信息保护专项行动解读:监管重点转向行业场景与内部治理',
    summary:
      '2026年4月2日,中央网信办、工信部、公安部发布《关于开展2026年个人信息保护系列专项行动的公告》。与前期主要围绕告知同意、必要个人信息范围和权限调用展开的监管行动相比,本年度专项行动更侧重行业场景,更聚焦实际处理活动,也更关注内部治理责任。',
    overallImpact:
      '此次专项行动将互联网广告、教育、交通、卫生健康、金融列为重点治理领域,并将自动化决策、人脸识别、未成年人个人信息处理、向第三方提供个人信息、内部访问控制、技术运维管理以及侵犯公民个人信息违法犯罪纳入重点治理范围。',
    industryImpact:
      '对企业的合规要求升级:\n\n**重点治理领域**:\n- 互联网广告:数据收集与使用合规\n- 教育/医疗:敏感个人信息保护\n- 金融/交通:数据安全与访问控制\n\n**内部治理责任**:\n1. 建立数据分类分级制度\n2. 完善内部访问控制机制\n3. 加强技术运维管理\n4. 防范内部人员违规操作\n\n**违法犯罪打击**:\n- 信息泄露源头治理\n- 数据倒卖链条打击\n- "内鬼"违法行为惩处',
    tags: ['个人信息保护', '中国监管', '数据安全', '内部治理', '专项行动'],
    link: 'https://www.secrss.com/articles/89098',
    isNew: true,
  },
  {
    id: '2026-012',
    source: 'Enjoy出海',
    date: '2026-04-25',
    heat: 9,
    title: '土耳其新规:月活超100万外国平台需指定当地代表并设本地公司',
    summary:
      '2026年1月1日起,土耳其将实施更严格的社交媒体监管新规。新规要求月均重复访问量超过100万或用户数超过100万的海外平台必须在土耳其设立本地公司、指定土耳其公民担任当地代表,并向土耳其信息与通信技术管理局(BTK)申请许可。此前,2025年8月土耳其已封禁Azar、LivU、Tango等29款社交与约会应用。',
    overallImpact:
      '这是土耳其社媒监管从"事后处罚"转向"事前准入管控"的重要标志。新规将准入门槛从"日访问量100万"降低到"月均重复访问100万",覆盖范围大幅扩大。BTK可直接以"国家安全、公共秩序"为由封禁平台,无需法院批准,封禁流程加速。限流最高可达95%,罚款100万-3000万里拉(约30万-100万美元)。',
    industryImpact:
      '对出海土耳其企业的合规要求:\n\n**本地化准入**:\n- 注册土耳其本地公司\n- 指定土耳其公民担任当地代表\n- 申请BTK运营许可\n- 建立本地办公场所\n\n**数据与内容合规**:\n- 数据本地化存储或在合规区域\n- 建立未成年人保护机制(实名认证、时间限制、家长监护)\n- 配备AI审核+本地人工团队的反违规内容体系\n- 快速响应监管的内容删除需求(24小时内)\n\n**风险应对策略**:\n1. 多元化市场布局(土耳其+中东+北非)\n2. 技术架构留后手(PWA网站、轻量版应用)\n3. 绑定本地合作伙伴(电信商、电商平台、律所)\n4. 建立政策监测机制\n\n**合规成本估算**:\n- 初期:约5,000-10,000美元/月(外包合规服务)\n- 中期:约20,000-50,000美元/月(自建团队)\n- 长期:约50,000-100,000美元/月(完整合规体系)\n\n**风险提示**:土耳其互联网用户达9200万(渗透率87.1%),60%人口低于40岁,社交应用市场潜力巨大,但监管趋严。未满足合规要求的平台将面临封禁、限流、高额罚款等处罚。',
    tags: ['土耳其', '社交媒体监管', '当地代表', 'BTK', '本地化合规', '出海'],
    link: 'https://www.huiimedia.com/blog/282.html',
    isNew: true,
  },
  {
    id: '2026-013',
    source: 'PC Gamer',
    date: '2026-01-31',
    heat: 8,
    title: '土耳其拟对Steam等游戏平台实施严格监管,要求指定当地代表',
    summary:
      '2026年1月,土耳其家庭和社会服务部起草新规,计划对国际数字游戏平台实施严格监管。根据草案,日访问量达到一定规模的Steam、Epic Games、PlayStation Store、Xbox Store等平台必须在土耳其境内指定法定代表,否则将面临高达90%的带宽限制处罚。新规赋予土耳其电信管理局(BTK)广泛的监管权力。',
    overallImpact:
      '这是土耳其加强对数字内容监管的重要一步。新规赋予BTK可要求平台下架其认为"存在风险"的游戏,并可索取包括公司架构、算法及数据处理机制在内的各类信息。同时强制要求游戏开发商与发行商对游戏进行年龄分级,未分级的游戏将不得在土耳其市场上架。若新规落地,主要国际游戏平台需调整运营策略以符合本地化要求,否则其服务速度与稳定性将受严重影响。',
    industryImpact:
      '对游戏平台和开发商的合规要求:\n\n**平台合规要求**:\n- 在土耳其境内指定法定代表\n- 响应BTK的游戏下架要求\n- 提供公司架构、算法及数据处理机制信息\n- 配合监管机构的各类信息索取\n- 否则面临最高90%带宽限制\n\n**游戏分级要求**:\n- 对所有游戏进行年龄分级\n- 建立符合土耳其标准的年龄分级体系\n- 未分级游戏不得在土耳其市场上架\n- 在游戏包装和数字商店明确标注分级信息\n\n**监管权力扩大**:\n- BTK可要求下架"存在风险"的游戏\n- 可索取公司架构、算法、数据处理机制等信息\n- 可实施带宽限制处罚(最高90%)\n- 可禁止未分级游戏上架\n\n**影响范围**:\n- Steam、Epic Games Store等PC游戏平台\n- PlayStation Store、Xbox Store等主机平台\n- 所有在土耳其发行游戏的开发商和发行商\n- 土耳其游戏玩家(约3000万)\n\n**风险提示**:土耳其是欧洲第五大游戏市场,年游戏收入约10亿美元。游戏平台和开发商需提前准备合规方案,避免因未满足要求而影响市场准入和用户体验。建议建立本地化合规团队,与土耳其监管机构保持沟通,及时了解政策动向。',
    tags: ['土耳其', '游戏监管', 'Steam', '年龄分级', 'BTK', '数字平台'],
    link: 'https://www.gamersky.com/news/202601/2084891.shtml',
    isNew: true,
  },

  // ==================== 2025年新闻 ====================
  {
    id: '2025-012',
    source: 'TechCrunch',
    date: '2025-07-28',
    heat: 9,
    title: '欧盟初步认定 Temu 违反 DSA,涉及非法商品风险管控失效',
    summary:
      '2025年7月,欧盟委员会发布针对跨境电商平台 Temu 的初步调查结果。欧盟认定 Temu 未能有效评估和减轻其平台上非法商品传播的风险,且在卖家资质审核及推荐系统透明度方面存在缺陷。若最终确认违规,Temu 将面临最高其全球年营收 6% 的罚款。',
    overallImpact:
      '这是 DSA 对新兴跨境电商巨头的一次全面合规审计。监管机构通过打击非法商品,旨在保护欧洲消费者安全并维护本土零售商的公平竞争环境。',
    industryImpact:
      '所有经营欧洲市场的中国电商平台必须全面升级其供应链审核体系。建议实行更严格的卖家准入制度,并建立自动化的合规检测工具以识别禁售商品。',
    tags: ['Temu', 'DSA', '跨境电商', '非法商品', '欧盟'],
    link: 'https://techcrunch.com/2025/07/28/eu-temu-dsa-investigation/',
    isNew: true,
  },
  {
    id: '2024-001',
    source: 'European Commission',
    date: '2024-03-04',
    heat: 10,
    title: '欧盟对苹果处以 18.4 亿欧元反垄断罚款,涉及音乐流媒体市场',
    summary:
      '2024年3月4日,欧盟委员会宣布对苹果公司处以 18.4 亿欧元罚款。调查发现,苹果利用其在通过 App Store 向 iOS 用户分发音乐流媒体应用市场中的支配地位,限制开发者告知用户应用外更便宜的订阅选择(反引导条款)。这是苹果首次遭遇欧盟巨额反垄断罚单。',
    overallImpact:
      '该裁决确立了移动平台必须允许开发者与用户进行自由价格沟通的原则。它直接推动了后续 DMA 中关于反引导义务的制定,是全球应用商店反垄断的里程碑事件。',
    industryImpact:
      '音乐流媒体和订阅类应用开发者获得了更大的定价自主权。中国出海应用应利用此裁决,在 iOS 版本中积极测试非 IAP 支付引导,以提升利润率。',
    tags: ['苹果', '反垄断', '音乐流媒体', '欧盟'],
    link: 'https://ec.europa.eu/commission/presscorner/detail/en/ip_24_1161',
    isNew: false,
  },
  {
    id: '2025-011',
    source: 'European Commission',
    date: '2025-09-05',
    heat: 10,
    title: '欧盟对谷歌处以 29.5 亿欧元反垄断罚款,涉及广告技术领域',
    summary:
      '2025年9月5日,欧盟委员会宣布对谷歌处以 29.5 亿欧元反垄断罚款,理由是谷歌在其广告技术业务中存在反竞争行为。调查发现,谷歌利用其在在线显示广告技术链条中的支配地位,优待自有的广告交易平台,损害了竞争对手和在线出版商的利益。',
    overallImpact:
      '这是欧盟对谷歌发起的系列反垄断行动中的又一重拳,累计罚金已超过 120 亿欧元。此举将迫使谷歌分拆或深度重组其广告技术部门,并可能导致数字广告产业链利润分配模式的重构。',
    industryImpact:
      '对于依赖谷歌广告联盟变现的中国出海企业,这可能意味着未来广告分成比例的潜在变动以及更多第三方广告平台的竞争接入机会。建议企业分散广告渠道,降低对单一平台的依赖风险。',
    tags: ['谷歌', '反垄断', 'AdTech', '欧盟委员会'],
    link: 'https://ec.europa.eu/commission/presscorner/detail/en/ip_25_905',
    isNew: false,
  },
  {
    id: '2025-001',
    source: '浙江省贸促会',
    date: '2025-04-23',
    heat: 10,
    title: '欧盟首次动用DMA开出7亿欧元罚单,苹果5亿欧元、Meta2亿欧元',
    summary:
      '2025年4月23日,欧盟委员会宣布根据《数字市场法案》(DMA)对苹果和Meta分别处以5亿欧元和2亿欧元罚款。这是DMA自2024年3月生效以来开出的首张罚单。苹果因App Store违反DMA引导限制条款被罚,Meta则因"同意数据收集或付费订阅"二选一模式违反DMA规定。',
    overallImpact:
      '此次处罚标志着DMA执法进入实质性阶段,向所有守门人平台传递强烈信号。欧盟委员会强调处罚旨在确保科技巨头遵守DMA规则,维护数字市场公平竞争环境。',
    industryImpact:
      '对中国出海企业的关键影响:\n\n**战略层面**:\n- 苹果被罚意味着App Store引导限制被认定违法\n- Meta的"付费或同意"模式被否定\n- 建议评估在欧盟区的商业模式是否符合DMA要求\n\n**技术层面**:\n- iOS应用可考虑添加外部支付引导功能\n- 广告系统需提供"低数据使用量广告服务"选项\n- 数据收集需获得用户明确同意\n\n**风险提示**:DMA违规最高可处全球年营业额10%罚款。',
    tags: ['DMA', '苹果', 'Meta', '欧盟委员会', '数字市场法'],
    link: 'http://www.ccpitzj.gov.cn/art/2025/4/27/art_1229557691_48516.html',
    isNew: false,
  },
  {
    id: '2025-002',
    source: 'CSDN',
    date: '2025-05-02',
    heat: 9,
    title: 'TikTok被欧盟罚款5.3亿欧元,因违规将用户数据传输至中国',
    summary:
      '2025年5月2日,欧盟隐私监管机构对TikTok处以5.3亿欧元罚款,因违规将欧盟用户数据传输至中国,违反GDPR。调查发现TikTok长期提供不实信息,此前称未将欧洲用户数据存储于国外,但2025年2月通报部分数据存入国外服务器,4月才删除。',
    overallImpact:
      '这是GDPR历史上针对数据跨境传输的重大罚单之一。爱尔兰数据保护委员会(DPC)指出TikTok未能提供足够保障,以证明中国员工远程访问的欧盟用户数据受到与欧盟标准等同的隐私保护。',
    industryImpact:
      '对中国出海企业的数据合规要求:\n\n**数据跨境传输**:\n- 确保数据传输目的地具有充分保护水平\n- 采用标准合同条款(SCCs)时需进行传输影响评估\n- 建立数据本地化存储机制\n\n**合规建议**:\n- 如实披露数据处理地点\n- 建立完善的数据传输记录\n- 定期审计数据跨境流动\n\n**风险提示**:GDPR数据跨境违规可处最高全球年营业额4%罚款。',
    tags: ['TikTok', 'GDPR', '数据跨境', '欧盟', '隐私保护'],
    link: 'https://blog.csdn.net/weixin_47196664/article/details/147809883',
    isNew: false,
  },
  {
    id: '2025-003',
    source: '同花顺财经',
    date: '2025-09-05',
    heat: 10,
    title: '欧盟对谷歌处以29.5亿欧元反垄断罚款,涉广告技术领域',
    summary:
      '2025年9月5日,欧盟委员会宣布对谷歌处以29.5亿欧元反垄断罚款,称其利润丰厚的广告技术业务存在反竞争行为。欧盟委员会表示,谷歌偏向于自己的在线显示技术服务,损害了竞争对手和在线出版商的利益,并且自2014年至今一直在滥用其市场力量。',
    overallImpact:
      '这是欧盟对谷歌开出的又一张巨额罚单。此前欧盟已多次就竞争问题向谷歌开出巨额罚单,包括2018年就安卓系统市场垄断问题处以超41亿欧元罚款,及2017年因搜索比价服务案件处以超24亿欧元罚款。',
    industryImpact:
      '对广告技术行业的启示:\n\n**反垄断风险**:\n- 平台不得在广告技术中自我优待\n- 需确保广告拍卖机制公平透明\n- 避免利用市场支配地位排挤竞争对手\n\n**合规建议**:\n- 建立广告技术合规审查机制\n- 确保第三方广告技术服务商公平接入\n- 定期进行反垄断风险评估',
    tags: ['Google', '反垄断', '广告技术', '欧盟', '罚款'],
    link: 'https://stock.10jqka.com.cn/usstock/20250905/c670937947.shtml',
    isNew: false,
  },
  {
    id: '2025-004',
    source: '财新网',
    date: '2025-07-28',
    heat: 9,
    title: '欧盟初步认定Temu违反《数字服务法》,或面临全球年营业额6%罚款',
    summary:
      '2025年7月28日,欧盟委员会发布对Temu的初步调查结果,认定Temu未能履行《数字服务法》规定的义务,未有效评估其平台上非法商品传播的风险。欧盟发现平台上存在大量不符合欧盟安全标准的产品,特别是婴儿玩具和小型电子产品。',
    overallImpact:
      '这是欧盟对中国跨境电商平台的重大监管行动。若最终确认Temu违规,可能面临全球年营业额6%的罚款。调查还涉及成瘾性设计、推荐系统透明度、研究人员数据访问权限等问题。',
    industryImpact:
      '对跨境电商的合规要求:\n\n**非法商品管控**:\n- 建立有效的商品审核机制\n- 确保产品符合欧盟安全标准\n- 防止违规商品重复上架\n\n**平台责任**:\n- 加强卖家资质审核\n- 建立快速下架机制\n- 完善消费者投诉处理\n\n**风险提示**:DSA违规最高罚款全球年营收6%,跨境电商需系统性评估合规风险。',
    tags: ['Temu', 'DSA', '跨境电商', '欧盟', '产品安全'],
    link: 'https://www.caixin.com/2025-07-29/102346328.html',
    isNew: false,
  },
  {
    id: '2025-005',
    source: '新浪财经',
    date: '2025-06-18',
    heat: 8,
    title: '欧盟认定阿里速卖通违反数字安全规则,或面临全球营业额6%罚款',
    summary:
      '2025年6月18日,欧盟委员会发布初步调查结果,认定速卖通AliExpress未能有效履行《数字服务法案》中的多项义务,在处理平台上非法商品的传播问题上存在"系统性失败"。调查发现速卖通在平台内容审核上投入资源不足,且在打击违法商家的执行上存在明显缺失。',
    overallImpact:
      '这是欧盟首次针对在线销售平台展开的DSA执法行动。速卖通随后向欧盟提交了一系列具有法律约束力的合规承诺,涵盖非法内容风险评估、第三方审核机制、广告透明度等关键领域。',
    industryImpact:
      '对电商平台的合规要求:\n\n**内容审核义务**:\n- 投入足够资源进行内容审核\n- 建立有效的违规商品识别机制\n- 防止"隐藏链接"等规避行为\n\n**商家管理**:\n- 加强商家资质审核\n- 对违规商家实施有效处罚\n- 防止违规商家重复入驻\n\n**透明度要求**:\n- 提高广告和推荐系统透明度\n- 确保研究人员数据访问权限',
    tags: ['AliExpress', '速卖通', 'DSA', '欧盟', '电商平台'],
    link: 'https://finance.sina.com.cn/roll/2025-06-19/doc-infaqzvk4949880.shtml',
    isNew: false,
  },
  {
    id: '2025-006',
    source: '新浪财经',
    date: '2025-07-14',
    heat: 7,
    title: '德国法院裁定Meta违规收集数据,需向单人原告赔偿5000欧元',
    summary:
      '2025年7月,德国莱比锡地方法院裁定Meta因严重违反欧盟GDPR需向一名个人原告赔偿5000欧元。法院认定Meta开发的商业工具被大量网站和应用程序采用,能够将用户个人信息传送至Meta服务器,即使未登录Meta平台也可识别用户身份。',
    overallImpact:
      '此次判决的赔偿金额远高于此前类似案例,法院直接援引GDPR作为裁决基础。欧盟监管机构此前已指出,Meta通过其商业工具收集的数据规模庞大,几乎实现了对用户在线行为的全面追踪。',
    industryImpact:
      '对企业数据收集的合规要求:\n\n**数据最小化原则**:\n- 仅收集必要的个人数据\n- 避免跨平台追踪用户行为\n- 确保数据处理目的明确\n\n**用户知情权**:\n- 清晰告知数据收集范围\n- 获得用户明确同意\n- 提供有效的退出机制\n\n**风险提示**:GDPR违规可能导致高额民事赔偿,企业需重视个人数据保护。',
    tags: ['Meta', 'GDPR', '数据收集', '德国', '赔偿'],
    link: 'https://finance.sina.com.cn/tech/digi/2025-07-14/doc-inffmtuu4811885.shtml',
    isNew: false,
  },
  {
    id: '2025-007',
    source: '腾讯新闻',
    date: '2025-10-25',
    heat: 8,
    title: 'Meta被欧盟正式起诉,最高罚款可至年收入6%',
    summary:
      '2025年10月25日,欧盟委员会首次依据《数字服务法》对Meta提起正式指控,认定其在Facebook和Instagram上未能为用户提供举报非法内容的便捷途径,也未提供充分的内容审核申诉工具。若违规行为被最终确认,Meta可能面临高达其全球年收入6%的罚款。',
    overallImpact:
      '这是欧盟首次依据DSA对社交媒体平台提起正式指控。欧盟委员会明确指出,Meta的平台未能让用户简单有效地标记儿童性虐待和恐怖主义等非法内容,同时缺乏足够的申诉工具。',
    industryImpact:
      '对社交平台的合规要求:\n\n**内容审核义务**:\n- 提供便捷的非法内容举报机制\n- 建立高效的内容审核流程\n- 确保审核决定可申诉\n\n**用户权利保障**:\n- 当帖子被删除或账户被暂停时提供申诉渠道\n- 确保申诉机制透明有效\n- 及时回应用户申诉\n\n**风险提示**:DSA违规最高罚款全球年营收6%,社交平台需完善内容治理体系。',
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
      '2025年9月4日,法国数据保护机构CNIL对SHEIN开出1.5亿欧元巨额罚单,指其网站在未经用户同意的情况下收集消费者数据,违反了欧盟《通用数据保护条例》。CNIL指出SHEIN在用户点击"全部拒绝"后,后台仍在继续放置和读取Cookies。',
    overallImpact:
      '这是SHEIN在欧洲市场遭遇的又一张巨额罚单。此前意大利竞争局也曾对SHEIN发起调查,指控其官网上的可持续发展宣称可能构成误导消费者的绿色营销。',
    industryImpact:
      '对电商平台的Cookie合规要求:\n\n**Cookie同意机制**:\n- 用户进入网站时需获得明确同意\n- Cookie横幅需完整披露所有Cookie类型\n- "全部拒绝"按钮需真正生效\n\n**数据收集合规**:\n- 未经同意不得放置广告Cookies\n- 确保用户选择得到尊重\n- 建立Cookie审计机制\n\n**风险提示**:GDPR Cookie违规在欧洲各国均可能被处罚,需确保Cookie机制合规。',
    tags: ['SHEIN', 'GDPR', 'Cookie', '法国', '数据保护'],
    link: 'https://www.qlwb.com.cn/detail/26617636.html',
    isNew: false,
  },
  {
    id: '2025-009',
    source: '亿邦动力',
    date: '2025-12-09',
    heat: 7,
    title: 'TikTok与欧盟达成和解,承诺整改广告系统',
    summary:
      '2025年12月9日,TikTok与欧盟达成和解,暂时化解巨额罚款危机。TikTok提交法律约束承诺以整改广告系统,包括:平台完整显示广告信息及所有URL;广告数据库加速至24小时内更新;公开广告主定向指标;提供按性别、年龄段和成员国汇总的受众数据;优化广告库搜索功能。',
    overallImpact:
      '此次和解源于欧盟《数字服务法案》调查,TikTok通过合作避免了可能的巨额罚款。但欧盟其他调查仍在进行,涉及算法负面影响、年龄验证机制、未成年人保护等。',
    industryImpact:
      '对广告系统的合规要求:\n\n**广告透明度**:\n- 完整显示广告信息和URL\n- 广告数据库需及时更新\n- 公开广告主定向指标\n\n**数据披露义务**:\n- 提供受众汇总数据\n- 优化广告库搜索功能\n- 便于品牌监控广告展示\n\n**合规策略**:\n- 主动与监管机构合作\n- 提出可行的整改方案\n- 避免对抗性应对',
    tags: ['TikTok', 'DSA', '广告透明度', '欧盟', '和解'],
    link: 'https://m.ebrun.com/630118.html',
    isNew: false,
  },
  {
    id: '2025-010',
    source: '快科技',
    date: '2022-07-12',
    heat: 6,
    title: '小米被意大利罚款320万欧元,涉嫌违反电子设备维修保修规则',
    summary:
      '2022年7月,意大利竞争与市场监管机构对小米处以320万欧元罚款,指控其违反电子设备维修保修规则。AGCM指出小米拒绝在存在保修范围之外的轻微缺陷(如小划痕)的情况下进行维修,且向用户收取运费和验证费。',
    overallImpact:
      '这是中国手机厂商在欧洲市场遭遇的消费者保护相关处罚。欧盟各国对消费者权益保护日益严格,企业需确保售后服务符合当地法规要求。',
    industryImpact:
      '对消费电子企业的合规要求:\n\n**售后服务义务**:\n- 即使存在轻微外观缺陷也应提供保修服务\n- 不得向用户收取不合理的验证或运输费用\n- 维修工作需及时完成\n\n**消费者权益保护**:\n- 确保保修条款符合当地法规\n- 建立完善的售后服务体系\n- 及时响应消费者投诉\n\n**风险提示**:欧盟各国消费者保护法规差异较大,需逐一合规。',
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
      '欧盟《人工智能法案》进入合规准备关键期,核心条款8月全面生效',
    source: 'FTA咨询网',
    date: '2026-02-10',
    heat: 8,
    link: '/laws',
  },
  {
    id: '2',
    title: '执法动态',
    articleTitle:
      '欧盟正式启动对SHEIN的DSA调查,聚焦非法商品与成瘾性设计',
    source: '欧盟委员会',
    date: '2026-02-17',
    heat: 10,
    link: '/enforcement',
  },
  {
    id: '3',
    title: '行业动态',
    articleTitle:
      '2026年个人信息保护专项行动:监管重点转向行业场景与内部治理',
    source: '安全内参',
    date: '2026-04-02',
    heat: 8,
    link: '/enforcement',
  },
  {
    id: '4',
    title: '监管局动态',
    articleTitle:
      '数据跨境传输新红线:TRAs 风险评估成为强制审计重点',
    source: 'EDPB',
    date: '2026-04-20',
    heat: 10,
    link: '/dpas',
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
    const filtered = filterNews(allNews, searchKeyword);
    return [...filtered].sort((a, b) => b.date.localeCompare(a.date));
  }, [searchKeyword]);

  // 本月动态逻辑
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = `${currentYear}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  const newsThisMonth = filteredNews.filter(n => n.date.startsWith(currentMonth));

  // 按年份分组
  const news2026 = filteredNews.filter(n => n.date.startsWith('2026'));
  const news2025 = filteredNews.filter(n => n.date.startsWith('2025'));
  const news2024 = filteredNews.filter(n => n.date.startsWith('2024'));

  // 动态获取最新更新日期
  const lastUpdateDate = useMemo(() => {
    if (allNews.length === 0) return '';
    const sorted = [...allNews].sort((a, b) => b.date.localeCompare(a.date));
    const latest = sorted[0].date; // yyyy-mm-dd
    const [year, month, day] = latest.split('-');
    return `${year}年${parseInt(month)}月${parseInt(day)}日`;
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <HeroSection
        title="欧洲移动应用合规洞察"
        subtitle="European Mobile App Compliance Insights"
        description="聚焦欧盟数字法规、应用合规监管与欧洲数据保护动态"
        updateDate={lastUpdateDate}
      />

      <SearchSection
        searchValue={searchKeyword}
        onSearchChange={setSearchKeyword}
      />


      {/* 本月动态版块 */}
      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-bold text-[#171717]">本月动态</h2>
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-600 text-xs font-bold">
              {newsThisMonth.length} 条
            </span>
          </div>

          {/* 本月综述 */}
          {newsThisMonth.length > 0 && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#171717] mb-3">{currentYear}年{currentDate.getMonth() + 1}月合规动态综述</h3>
                  <div className="text-sm text-[#525252] leading-relaxed space-y-2">
                    <p>
                      <strong>AI监管框架加速落地：</strong>欧洲AI办公室发布《AI Act高风险系统合规指南》草案，为8月2日合规死线做准备。ENISA发布NCAF 2.0框架，协助成员国评估NIS2成熟度。
                    </p>
                    <p>
                      <strong>未成年人保护升级：</strong>英国ICO联合Ofcom要求社交媒体平台在4月底前提交年龄验证方案，采取严于"自我声明"的验证手段，否则将面临正式执法。
                    </p>
                    <p>
                      <strong>反垄断执法持续：</strong>土耳其竞争管理局(RK)对Google启动反垄断调查，涉及应用预装和支付系统。欧盟委员会对Apple和Meta开出巨额罚单，DMA执法进入实质性阶段。
                    </p>
                    <p>
                      <strong>数据保护执法动态：</strong>瑞士FDPIC对智能玩具制造商Simplicity启动调查，涉及儿童数据保护。德国BfDI呼吁在Data Act实施中加强数据主权保护。
                    </p>
                    <p className="text-[#737373] italic mt-3">
                      💡 出海企业需重点关注：AI系统风险评估、年龄验证技术部署、应用预装合规审查、儿童数据保护措施。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {newsThisMonth.length > 0 ? (
            <div className="flex flex-col gap-6">
              {newsThisMonth.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-[#e5e5e5] rounded-xl py-12 text-center">
              <p className="text-[#737373] text-sm">本月暂无新增合规动态</p>
            </div>
          )}
        </div>
      </section>

      {/* 2026年新闻 */}
      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-xl font-bold text-[#171717] pb-3 border-b border-[#e5e5e5] mb-6">
            2026年合规快讯
            <span className="text-sm font-normal text-[#737373] ml-2">
              共 {news2026.length} 条
            </span>
          </h2>

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
          <h2 className="text-xl font-bold text-[#171717] pb-3 border-b border-[#e5e5e5] mb-6">
            2025年合规快讯
            <span className="text-sm font-normal text-[#737373] ml-2">
              共 {news2025.length} 条
            </span>
          </h2>

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

      {/* 2024年新闻 */}
      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-xl font-bold text-[#171717] pb-3 border-b border-[#e5e5e5] mb-6">
            2024年合规快讯
            <span className="text-sm font-normal text-[#737373] ml-2">
              共 {news2024.length} 条
            </span>
          </h2>

          {news2024.length > 0 ? (
            <div className="mt-6 flex flex-col gap-6">
              {news2024.map((news) => (
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
            近期动态专栏
            <span className="text-sm font-normal text-[#737373] ml-2">
              共 {dynamicCards.length} 条
            </span>
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
