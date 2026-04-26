import { useState, useMemo } from 'react';
import HeroSection from '@/components/HeroSection';
import NewsCard from '@/components/NewsCard';
import type { NewsItem } from '@/types';

const dpaUpdates: NewsItem[] = [
  {
    id: 'dpa-uk-002',
    source: 'UK ICO (英国信息专员办公室)',
    date: '2026-04-26',
    heat: 9,
    title: '英国 ICO 发布“设计即隐私”审计报告，严厉打击移动应用“暗黑模式”',
    summary:
      '2026年4月26日，英国 ICO 发布报告批评部分移动应用利用“暗黑模式”诱导用户同意数据收集。报告强调，交互设计必须遵循“默认隐私”原则，否则将面临正式执法行动。',
    overallImpact:
      'ICO 正在将监管重点转向用户交互设计，这对所有面向英国用户的应用提出了新的 UI 合规要求。',
    industryImpact:
      '开发者需审计其 Cookie 弹窗和注销流程，确保没有任何诱导性设计。',
    tags: ['ICO', '隐私设计', '暗黑模式', '英国'],
    link: 'https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/',
    isNew: true,
  },
  // ==================== 欧盟级别机构 ====================
  {
    id: 'dpa-eu-001',
    source: 'EDPB (欧洲数据保护委员会)',
    date: '2026-03-19',
    heat: 10,
    title: 'EDPB 启动 2026 年度协同执法行动，聚焦 GDPR 透明度义务',
    summary:
      '2026年3月19日，EDPB 宣布启动本年度协同执法框架（CEF）行动。本次行动由 25 个成员国监管机构参与，重点审计企业是否履行了 GDPR 第 12-14 条规定的透明度和信息告知义务。调查范围涵盖移动应用、在线平台及智能硬件。',
    overallImpact:
      '这是全欧盟范围内的"大考"。透明度不仅仅是写好隐私政策，还包括交互设计是否让用户真正理解数据流向。',
    industryImpact:
      '出海企业需自查：隐私通知是否简洁明了？是否在收集数据时即时告知？对第三方 SDK 的穿透式告知是否合规？',
    tags: ['EDPB', '透明度', '协同执法', 'GDPR'],
    link: 'https://www.edpb.europa.eu/news/news_en?news_type=1',
    isNew: true,
  },
  {
    id: 'dpa-eu-002',
    source: 'European AI Office (欧洲人工智能办公室)',
    date: '2026-04-01',
    heat: 9,
    title: '欧洲 AI 办公室发布《AI Act 高风险系统合规指南》草案',
    summary:
      '随着 2026 年 8 月 2 日高风险 AI 系统合规死线的临近,欧洲 AI 办公室发布了针对开发者和部署者的详细指南。指南明确了生物识别、关键基础设施及教育就业领域 AI 系统的具体技术文档要求和风险评估标准。',
    overallImpact:
      'AI Office 正在从政策制定转向硬性监督。该指南是企业通过合规审计的"标准答案",不符合要求的系统将被禁止在欧盟上线。',
    industryImpact:
      '涉及高风险场景的中国 AI 企业(如智能安防、人力资源软件)必须对照指南进行技术对标,确保 8 月前完成所有合规准备。',
    tags: ['AI Office', 'AI Act', '高风险系统', '人工智能'],
    link: 'https://digital-strategy.ec.europa.eu/en/policies/ai-office',
    isNew: true,
  },
  {
    id: 'dpa-eu-003',
    source: 'ENISA (欧洲网络安全局)',
    date: '2026-04-10',
    heat: 8,
    title: 'ENISA 发布 NCAF 2.0 框架,协助成员国评估 NIS2 成熟度',
    summary:
      '为确保 NIS2 指令在各国的统一度,ENISA 发布了国家能力评估框架 (NCAF 2.0)。该框架为各国关键基础设施运营商(含数字服务提供商)设定了网络安全成熟度基准。',
    overallImpact:
      '这强化了欧盟网络安全的底层一致性。对于在多个欧盟国家运营的服务商,意味着合规门槛正趋于统一。',
    industryImpact:
      '云服务、在线市场及社交平台提供商应关注所在国依据 NCAF 2.0 制定的国家标准,加强网络安全韧性建设。',
    tags: ['ENISA', 'NIS2', '网络安全', 'NCAF'],
    link: 'https://www.enisa.europa.eu/news',
    isNew: true,
  },
  {
    id: 'dpa-eu-004',
    source: 'EBA (欧洲银行管理局)',
    date: '2026-02-15',
    heat: 9,
    title: 'EBA 发布 DORA 指令 Q&A,明确第三方信息登记簿 (RoI) 报送要求',
    summary:
      '欧洲银行管理局 (EBA) 联合其他监管机构发布了 DORA 指令的最新问答,详细说明了金融机构在 2026 年初必须提交的第三方服务信息登记簿 (RoI) 格式。重点强调了对支撑关键功能的云服务商的监控责任。',
    overallImpact:
      'DORA 进入实操监管阶段。金融机构与技术服务商的边界被打破,技术服务商将直接暴露在金融监管的穿透式审计之下。',
    industryImpact:
      '为欧洲银行提供技术服务的中国支付、云服务企业,必须配合银行客户完成 RoI 登记,并证明自身的业务连续性及风险管理能力。',
    tags: ['EBA', 'DORA', '金融科技', '第三方风险'],
    link: 'https://www.eba.europa.eu/news-press',
    isNew: true,
  },

  // ==================== 国家级别机构 ====================
  {
    id: 'dpa-ie-001',
    source: 'Ireland DPC (爱尔兰数据保护委员会)',
    date: '2025-07-10',
    heat: 10,
    title: '爱尔兰DPC对TikTok启动新调查,涉数据存储于中国服务器',
    summary:
      '2025年7月10日,爱尔兰数据保护委员会(DPC)宣布对TikTok Technology Limited启动新的调查。此次调查源于DPC在2025年4月30日的决定,当时TikTok声称欧洲用户数据仅通过远程访问方式传输至中国,并未存储在中国服务器上。然而,2025年4月TikTok通知DPC,发现部分欧洲用户数据实际上存储在了中国服务器,与其此前陈述不符。',
    overallImpact:
      'DPC对此表示深切关注,认为TikTok在之前的调查中提交了不准确信息。DPC正在考虑采取进一步的监管行动。新调查将审查TikTok是否遵守了GDPR关于数据跨境传输的规定,包括GDPR第5(2)条(问责制)、第13(1)(f)条(透明度义务)、第31条(配合监管机构的义务)以及第五章(数据跨境传输)。',
    industryImpact:
      '对企业数据跨境传输的合规要求:\n\n**透明度与诚实义务**:\n- 必须如实向监管机构披露数据处理情况\n- 不得隐瞒数据存储地点\n- 及时纠正错误陈述\n\n**数据跨境传输合规**:\n- 确保数据接收国具有与欧盟实质等同的保护水平\n- 采用标准合同条款(SCCs)时需进行传输影响评估\n- 建立数据本地化存储机制\n\n**风险提示**:向监管机构提供虚假信息可能导致更严重的处罚,企业需建立完善的合规审计机制。',
    tags: ['DPC', 'TikTok', '数据跨境', 'GDPR', '爱尔兰', '中国'],
    link: 'https://www.dataprotection.ie/en/news-media/press-releases/dpc-announces-inquiry-tiktok-technology-limiteds-transfers-eea-users-personal-data-servers-located',
    isNew: true,
  },
  {
    id: 'dpa-ie-002',
    source: 'Ireland DPC (爱尔兰数据保护委员会)',
    date: '2026-02-17',
    heat: 9,
    title: '爱尔兰DPC对X平台启动调查,涉数据保护合规',
    summary:
      '2026年2月17日,爱尔兰数据保护委员会(DPC)宣布根据《2018年数据保护法》第110条对X Internet Unlimited Company(XIUC)启动调查。DPC将审查X平台是否遵守了GDPR的相关规定,包括数据处理合法性、透明度义务、用户权利保障等方面。',
    overallImpact:
      '这是DPC对社交媒体平台的又一重要执法行动。X平台(前Twitter)在欧盟拥有大量用户,DPC的调查将对其他社交媒体平台产生示范效应。',
    industryImpact:
      '对社交媒体平台的合规要求:\n\n**数据处理合法性**:\n- 确保数据处理有明确的法律依据\n- 获得用户的有效同意\n- 遵守数据最小化原则\n\n**透明度义务**:\n- 清晰告知用户数据处理目的\n- 提供易于理解的隐私政策\n- 及时回应用户的数据访问请求\n\n**风险提示**:DPC对大型科技平台的监管持续加强,企业需建立完善的GDPR合规体系。',
    tags: ['DPC', 'X平台', 'Twitter', 'GDPR', '爱尔兰', '社交媒体'],
    link: 'https://www.dataprotection.ie/en/news-media/press-releases/data-protection-commission-opens-investigation-x-xiuc',
    isNew: true,
  },
  {
    id: 'dpa-ie-003',
    source: 'Ireland DPC (爱尔兰数据保护委员会)',
    date: '2025-08-14',
    heat: 8,
    title: '爱尔兰DPC对儿童健康爱尔兰启动调查,涉儿童健康记录安全',
    summary:
      '2025年8月14日,爱尔兰数据保护委员会(DPC)宣布对Children\'s Health Ireland(CHI)启动调查,涉及Tallaght University Hospital(TUH)特定设施内儿童健康记录的物理安全和安保问题。DPC将审查CHI是否采取了适当的技术和组织措施来保护儿童的健康数据。',
    overallImpact:
      '此次调查凸显了DPC对儿童数据保护的高度重视。儿童健康数据属于特殊类别的个人数据,需要更高水平的保护。DPC的行动向医疗机构发出了明确信号:必须确保儿童健康记录的物理安全和安保。',
    industryImpact:
      '对医疗机构的合规要求:\n\n**儿童数据保护**:\n- 采取更严格的安全措施保护儿童数据\n- 确保物理存储设施的安全性\n- 建立专门的儿童数据保护政策\n\n**医疗数据安全**:\n- 实施适当的技术和组织措施\n- 定期进行安全风险评估\n- 建立数据泄露应急响应机制\n\n**风险提示**:儿童数据泄露可能导致严重后果,医疗机构需高度重视数据安全。',
    tags: ['DPC', '儿童数据', '医疗数据', 'GDPR', '爱尔兰', '数据安全'],
    link: 'https://www.dataprotection.ie/en/news-media/press-releases/data-protection-commission-opens-inquiry-childrens-health-ireland',
    isNew: true,
  },
  {
    id: 'dpa-ie-004',
    source: 'Ireland DPC (爱尔兰数据保护委员会)',
    date: '2026-03-02',
    heat: 7,
    title: '爱尔兰DPC对利默里克大学处以9.8万欧元罚款,因数据泄露违规',
    summary:
      '2026年3月2日,爱尔兰数据保护委员会(DPC)公布了对利默里克大学(University of Limerick)的最终决定。该决定源于DPC对2018年11月至2020年1月期间发生的一系列个人数据泄露事件的自主调查。DPC认定利默里克大学违反了GDPR多项规定,包括未实施适当的技术和组织措施确保个人数据安全、未及时通知高风险数据泄露的受影响人员、未及时向DPC报告数据泄露等。',
    overallImpact:
      '此次处罚凸显了DPC对数据安全义务的严格执行。即使是教育机构,也必须确保数据安全措施的充分性,并及时履行数据泄露通知义务。DPC对利默里克大学的配合态度表示认可,最终罚款反映了该校接受大部分调查发现并主动改进系统的努力。',
    industryImpact:
      '对教育机构和数据控制者的合规要求:\n\n**数据安全措施**:\n- 实施适当的技术和组织措施(GDPR第5、32条)\n- 确保个人数据的保密性、完整性、可用性\n- 定期评估和更新安全措施\n\n**数据泄露应对**:\n- 及时向DPC报告数据泄露(72小时内)\n- 及时通知高风险数据泄露的受影响人员\n- 记录所有数据泄露事件\n\n**记录保存义务**:\n- 维护完整的处理活动记录(GDPR第30条)\n- 确保记录的准确性和完整性\n\n**风险提示**:数据泄露不仅导致罚款,还会损害机构声誉。教育机构需建立完善的数据保护管理体系。',
    tags: ['DPC', '数据泄露', '教育机构', 'GDPR', '爱尔兰', '数据安全'],
    link: 'https://www.dataprotection.ie/en/news-media/latest-news/data-protection-commission-publishes-final-decision-following-inquiry-university-limerick',
    isNew: true,
  },
  {
    id: 'dpa-ie-005',
    source: 'Ireland DPC (爱尔兰数据保护委员会)',
    date: '2026-02-27',
    heat: 6,
    title: '爱尔兰DPC欢迎爱尔兰国家数字与AI战略2030发布',
    summary:
      '2026年2月27日,爱尔兰数据保护委员会(DPC)作为数字监管机构集团(DRG)成员,欢迎爱尔兰政府发布《数字爱尔兰——连接人民,保障未来》国家数字与AI战略2030。该战略旨在推动爱尔兰数字化转型,同时确保数据保护和AI伦理。',
    overallImpact:
      '该战略体现了爱尔兰在推动数字创新与数据保护之间的平衡。作为欧盟主要数据保护监管机构,DPC将在国家数字战略实施中发挥重要作用,确保AI和数字技术的发展符合GDPR要求。',
    industryImpact:
      '对在爱尔兰运营的企业的启示:\n\n**数字战略机遇**:\n- 爱尔兰将继续作为欧盟数字创新中心\n- 企业可利用政策支持推动数字化转型\n- 需确保创新符合数据保护要求\n\n**AI合规要求**:\n- AI系统开发需符合GDPR原则\n- 进行数据保护影响评估(DPIA)\n- 确保AI决策的透明度和可解释性\n\n**监管趋势**:\n- DPC将加强对AI技术的监管\n- 数字监管机构集团将协调跨部门监管\n- 企业需关注监管动态,及时调整合规策略',
    tags: ['DPC', '数字战略', 'AI', '爱尔兰', '数字化转型'],
    link: 'https://www.dataprotection.ie/en/news-media/latest-news/digital-regulators-group-drg-welcomes-publication-digital-ireland-connecting-our-people-securing-our',
    isNew: true,
  },
  {
    id: 'dpa-ie-006',
    source: 'Ireland DPC (爱尔兰数据保护委员会)',
    date: '2026-02-20',
    heat: 7,
    title: '爱尔兰DPC欢迎EDPB发布"被遗忘权"CEF实施报告',
    summary:
      '2026年2月20日,爱尔兰数据保护委员会(DPC)欢迎欧洲数据保护委员会(EDPB)发布关于"被遗忘权"(删除权)协同执法框架(CEF)行动的实施报告。该报告总结了欧盟各监管机构对GDPR第17条删除权执行情况的调查结果和建议。',
    overallImpact:
      '该报告为企业在欧盟范围内统一理解和执行删除权提供了重要指导。DPC作为主要监管机构,将根据报告建议加强对删除权执行的监督,确保数据主体权利得到有效保护。',
    industryImpact:
      '对企业的合规要求:\n\n**删除权执行**:\n- 建立完善的删除请求处理流程\n- 在法定期限内(通常30天)响应删除请求\n- 确保删除的彻底性,包括备份和第三方\n\n**例外情形处理**:\n- 明确删除权的合法例外情形\n- 记录拒绝删除请求的理由\n- 向数据主体说明拒绝原因\n\n**技术实现**:\n- 建立数据删除的技术机制\n- 确保删除操作的不可逆性\n- 保留删除操作的审计记录\n\n**风险提示**:删除权是数据主体的基本权利,企业需建立高效的响应机制,避免因处理不当引发投诉。',
    tags: ['DPC', 'EDPB', '被遗忘权', '删除权', 'GDPR', '协同执法'],
    link: 'https://www.dataprotection.ie/en/news-media/latest-news/dpc-welcomes-publication-edpb-cef-implementation-report-right-be-forgotten',
    isNew: true,
  },
  {
    id: 'dpa-uk-001',
    source: 'UK ICO (英国信息专员办公室)',
    date: '2026-03-25',
    heat: 9,
    title: '英国 ICO 就"年龄保证"机制发布最后通牒,要求平台 4 月底前提交方案',
    summary:
      '英国 ICO 联合 Ofcom 发布声明,要求社交媒体及视频平台必须采取严于"自我声明"的年龄验证手段。所有受监管平台必须在 2026 年 4 月 30 日前提交具体整改报告,否则将面临正式执法。',
    overallImpact:
      '英国在未成年人保护上采取了比欧盟更激进的节奏。年龄验证不再是"勾选框",而是需要实名或技术识别的"硬门槛"。',
    industryImpact:
      '中国短视频及社交应用在英国必须立即上线可靠的年龄验证技术,否则将面临类似 TikTok 在美英遭遇的高压监管风险。',
    tags: ['ICO', '未成年人保护', '年龄验证', '英国'],
    link: 'https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/',
    isNew: true,
  },
  {
    id: 'dpa-ch-001',
    source: 'Switzerland FDPIC (瑞士联邦数据保护与信息专员)',
    date: '2026-04-05',
    heat: 7,
    title: '瑞士 FDPIC 发布可穿戴设备隐私风险提示与合规指南',
    summary:
      '瑞士 FDPIC 针对日益普及的智能手表、健身追踪器发布指南,强调生物识别数据的高度敏感性,要求厂商必须默认关闭敏感权限,并提供详尽的数据本地化处理选项。',
    overallImpact:
      '瑞士虽非欧盟成员,但其 FADP 法律体系与 GDPR 高度对齐。其对硬件隐私的关注代表了非传统互联网设备监管的新趋势。',
    industryImpact:
      '中国智能穿戴硬件商在瑞士及周边市场应强化"默认隐私"设计,并确保存储在云端的数据符合瑞士跨境传输要求。',
    tags: ['FDPIC', '智能硬件', '隐私设计', '瑞士'],
    link: 'https://www.edoeb.admin.ch/edoeb/en/home/the-fdpic/links/news.html',
    isNew: true,
  },
  {
    id: 'dpa-de-001',
    source: 'Germany BfDI (德国联邦数据保护局)',
    date: '2026-03-26',
    heat: 8,
    title: '德国通过《数据法》执行法案,确立 BfDI 与联邦网络局的双轨执法',
    summary:
      '德国联邦议院通过 DADG 法案,明确联邦网络局 (BNetzA) 负责《数据法》(Data Act) 的合规监督,而 BfDI 保持对涉及个人数据的跨领域监管权。',
    overallImpact:
      '德国监管架构的复杂化对企业提出了更高要求。同一数据处理行为可能需要向两个不同的联邦机构报备。',
    industryImpact:
      '在德经营的中国企业(如联网汽车、工业互联网商)需建立跨部门合规团队,同时对接数据流通监管与个人隐私监管。',
    tags: ['BfDI', 'Data Act', '德国', '执法协作'],
    link: 'https://www.bfdi.bund.de/EN/Service/Press/Press_node.html',
    isNew: true,
  },
  {
    id: 'dpa-tr-001',
    source: 'Turkey KVKK (土耳其个人数据保护局)',
    date: '2026-04-15',
    heat: 8,
    title: '土耳其 KVKK 发布"智能体 AI (Agentic AI)"数据保护指南',
    summary:
      '土耳其 KVKK 发布专门指南,明确 Agentic AI 系统在自主决策过程中的问责机制。强调了对衍生数据、推断数据的处理必须具备明确法律依据,且开发者需承担穿透式责任。',
    overallImpact:
      '土耳其正在迅速对齐全球最前沿的 AI 监管趋势。这对于在土运营的 AI 应用商设定了清晰的合规底线。',
    industryImpact:
      '中国 AI 企业进入土耳其市场需特别关注其对"推断数据"的严苛定义,确保算法透明度符合 KVKK 的最新解释。',
    tags: ['KVKK', 'Agentic AI', '人工智能', '土耳其'],
    link: 'https://www.kvkk.gov.tr/En/',
    isNew: true,
  },
  {
    id: 'dpa-tr-002',
    source: 'Turkey RK (土耳其竞争管理局)',
    date: '2026-04-20',
    heat: 7,
    title: '土耳其 RK 扩大对大型科技平台捆绑销售行为的调查',
    summary:
      '土耳其 RK(竞争管理局)宣布对多家跨国科技平台展开新调查,重点审查其利用主导地位在土耳其市场实施的应用预装和数据强行共享行为。',
    overallImpact:
      '土耳其正效仿欧盟 DMA,通过竞争法手段对大厂生态实施拆解和限制。',
    industryImpact:
      '中国手机厂商及软件分发商在土耳其市场需审视预装协议,避免被认定为损害市场公平竞争的行为。',
    tags: ['RK', '反垄断', '土耳其', '应用分发'],
    link: 'https://www.rekabet.gov.tr/en',
    isNew: true,
  },
];

// 监管机构列表
const REGULATORY_AGENCIES = [
  { id: 'all', name: '全部机构', region: '' },
  { id: 'EDPB', name: 'EDPB', fullName: '欧洲数据保护委员会', region: '欧盟' },
  { id: 'AI Office', name: 'AI Office', fullName: '欧洲人工智能办公室', region: '欧盟' },
  { id: 'ENISA', name: 'ENISA', fullName: '欧洲网络安全局', region: '欧盟' },
  { id: 'EBA', name: 'EBA', fullName: '欧洲银行管理局', region: '欧盟' },
  { id: 'DPC', name: 'DPC', fullName: '爱尔兰数据保护委员会', region: '爱尔兰' },
  { id: 'ICO', name: 'ICO', fullName: '英国信息专员办公室', region: '英国' },
  { id: 'FDPIC', name: 'FDPIC', fullName: '瑞士联邦数据保护与信息专员', region: '瑞士' },
  { id: 'BfDI', name: 'BfDI', fullName: '德国联邦数据保护局', region: '德国' },
  { id: 'KVKK', name: 'KVKK', fullName: '土耳其个人数据保护局', region: '土耳其' },
  { id: 'RK', name: 'RK', fullName: '土耳其竞争管理局', region: '土耳其' },
];

// 搜索过滤函数
function filterDPAUpdates(
  updates: NewsItem[],
  keyword: string,
  agency: string
): NewsItem[] {
  let filtered = updates;

  // 按机构筛选
  if (agency && agency !== 'all') {
    filtered = filtered.filter((item) => {
      return item.source.includes(agency) || item.tags.includes(agency);
    });
  }

  // 按关键词搜索
  if (keyword.trim()) {
    const lowerKeyword = keyword.toLowerCase();
    filtered = filtered.filter((item) => {
      if (item.title.toLowerCase().includes(lowerKeyword)) return true;
      if (item.summary.toLowerCase().includes(lowerKeyword)) return true;
      if (item.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword))) return true;
      if (item.source.toLowerCase().includes(lowerKeyword)) return true;
      if (item.overallImpact.toLowerCase().includes(lowerKeyword)) return true;
      if (item.industryImpact.toLowerCase().includes(lowerKeyword)) return true;
      return false;
    });
  }

  return filtered;
}

export default function DPAs() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedAgency, setSelectedAgency] = useState('all');

  const filteredUpdates = useMemo(() => {
    return filterDPAUpdates(dpaUpdates, searchKeyword, selectedAgency);
  }, [searchKeyword, selectedAgency]);

  // 按日期倒序排序
  const sortedUpdates = [...filteredUpdates].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <HeroSection
        title="各国监管机构动态"
        subtitle="Regulatory Authorities Directory & Updates"
        description="一站式追踪欧盟级别(EDPB, AI Office, ENISA, EBA)及各国(英国 ICO, 瑞士 FDPIC, 德国 BfDI, 土耳其 KVKK 等)监管机构的最新政策与执法风向"
      />

      {/* 搜索和筛选区域 */}
      <section className="bg-white border-b border-[#e5e5e5] px-6 py-4 sticky top-0 z-10">
        <div className="max-w-[800px] mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* 关键词搜索 */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="搜索新闻标题、摘要、标签..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full px-4 py-2 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
              />
            </div>

            {/* 机构筛选 */}
            <div className="sm:w-64">
              <select
                value={selectedAgency}
                onChange={(e) => setSelectedAgency(e.target.value)}
                className="w-full px-4 py-2 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent bg-white"
              >
                {REGULATORY_AGENCIES.map((agency) => (
                  <option key={agency.id} value={agency.id}>
                    {agency.name}
                    {agency.fullName && ` - ${agency.fullName}`}
                    {agency.region && ` (${agency.region})`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 快捷筛选标签 */}
          <div className="flex flex-wrap gap-2 mt-3">
            {REGULATORY_AGENCIES.slice(1, 7).map((agency) => (
              <button
                key={agency.id}
                onClick={() => setSelectedAgency(agency.id)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  selectedAgency === agency.id
                    ? 'bg-[#2563eb] text-white border-[#2563eb]'
                    : 'bg-white text-[#525252] border-[#e5e5e5] hover:border-[#2563eb] hover:text-[#2563eb]'
                }`}
              >
                {agency.name}
              </button>
            ))}
            {selectedAgency !== 'all' && (
              <button
                onClick={() => setSelectedAgency('all')}
                className="px-3 py-1 text-sm text-[#737373] hover:text-[#2563eb]"
              >
                清除筛选 ×
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center justify-between pb-3 border-b border-[#e5e5e5] mb-6">
            <h2 className="text-xl font-bold text-[#171717]">
              机构动态与政策快讯
            </h2>
            <span className="text-sm text-[#737373]">
              共 {sortedUpdates.length} 条
              {selectedAgency !== 'all' && (
                <span className="ml-2 text-[#2563eb]">
                  · {REGULATORY_AGENCIES.find(a => a.id === selectedAgency)?.name}
                </span>
              )}
            </span>
          </div>

          {sortedUpdates.length > 0 ? (
            <div className="flex flex-col gap-6">
              {sortedUpdates.map((update) => (
                <NewsCard key={update.id} news={update} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-[#737373] mb-3">
                未找到相关新闻
                {searchKeyword && ` (关键词: "${searchKeyword}")`}
                {selectedAgency !== 'all' && ` (机构: ${REGULATORY_AGENCIES.find(a => a.id === selectedAgency)?.name})`}
              </p>
              <button
                onClick={() => {
                  setSearchKeyword('');
                  setSelectedAgency('all');
                }}
                className="text-sm text-[#2563eb] hover:underline"
              >
                清除所有筛选
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
