import HeroSection from '@/components/HeroSection';
import NewsCard from '@/components/NewsCard';
import type { NewsItem, RegulatoryEvent } from '@/types';

const enforcementStats = [
  { value: '€ 36.5亿', label: '累计罚款金额 (2024-2026)' },
  { value: '49', label: '已完成调查案件' },
  { value: '12', label: '正在进行中的调查' },
];

const enforcementCases: NewsItem[] = [
  {
    id: 'e44',
    source: '法国DGCCRF/路透社/搜狐网',
    date: '2026-06-03',
    heat: 9,
    title: '法国DGCCRF对SHEIN开出2200万欧元罚单：订单信息缺失、退货告知不足与环保披露违规，累计罚款超2.12亿欧元',
    summary:
      '2026年6月3日，法国市场竞争、消费和反欺诈总局（DGCCRF）对快时尚跨境电商平台SHEIN开出总计约2200万欧元罚单。处罚分两项：1670万欧元因订单确认邮件缺少价格、销售主体名称、交货时间等关键信息违反法国消费者法；580万欧元因未完整履行14天无理由退货告知义务以及未披露合成纤维产品洗涤过程中微塑料释放的环境风险。法国中小企业事务部长公开表示将持续监管执法，否则将勒令整改或退出法国市场。SHEIN表示异议，认为处罚金额过高且存在歧视性，已着手准备行政上诉。这是SHEIN继2025年7月虚构折扣（4000万欧元）、Cookie数据隐私违规（1.5亿欧元）后在法国的第三轮重大处罚，累计罚款超2.12亿欧元。',
    overallImpact:
      '法国DGCCRF针对SHEIN的持续执法行动，形成了欧盟成员国层面对中国跨境电商最全面、最系统的监管案例。从营销合规（虚构折扣）、数据保护（Cookie违规）到消费者权益（订单信息、退货权利）和环保责任（微塑料披露），法国监管覆盖了跨境电商在欧运营的全部合规维度。累计2.12亿欧元的罚款规模显示，成员国层面执法的力度和频率正在显著提升，与欧盟委员会层面对Temu的DSA执法形成"双轨并进"的监管格局。法国中小企业事务部长的强硬表态意味着中国跨境电商在法国乃至全欧盟面临"零容忍"的合规环境。',
    industryImpact:
      '对在欧中国跨境电商的综合警示：\n\n1. 订单信息合规（新执法点）：确认邮件必须包含价格、卖方身份、交货时间等法定内容，这类"文档性合规"正在成为新的执法突破口\n2. 环保披露义务（新执法点）：未披露合成纤维产品塑料微纤维对水环境的污染风险即构成违规，ESG合规不再只是公关宣传而是法定义务\n3. 累计处罚效应：同一企业在同一国面临三次累计2.12亿欧元处罚，显示执法不会停留在单一违规，而是对历史违规的累加清算\n4. 建议立即启动全欧盟运营的"消费者权利+环保责任"双维合规审查',
    tags: ['SHEIN', '法国DGCCRF', '罚款', '消费者保护', '跨境电商', '环保披露'],
    link: 'https://news.sohu.com/a/1032710831_121123800',
    isNew: true,
  },
  {
    id: 'e43',
    source: '欧盟普通法院（卢森堡）/新浪财经/路透社/证券之星',
    date: '2026-06-03',
    heat: 9,
    title: '欧盟普通法院混合裁决：支持Meta挑战Marketplace守门人标签 但维持Messenger认定，DMA司法审查创判例',
    summary:
      '2026年6月3日，欧盟普通法院就Meta对DMA守门人认定的上诉做出混合裁决。法院支持Meta就其Marketplace平台被认定为守门人所提起的诉讼，认定欧盟委员会在理由说明方面未满足要求——未能让Meta理解其被归类为“作为在线中介服务的核心平台服务”的理由。但法院驳回了Meta针对Messenger被认定为守门人的异议，维持Messenger的守门人身份。法院认定，Messenger单独构成企业接触用户的重要渠道，欧盟委员会认定无误。不过，该裁决实际影响有限：欧盟委员会在用户数量低于DMA门槛后，去年已取消Marketplace的守门人标签。Meta此前因Marketplace反竞争行为已被欧盟以传统竞争法罚款7.98亿欧元。',
    overallImpact:
      '这是DMA史上首次由欧盟法院做出的司法审查裁决，具有重要判例意义。法院明确：第一，DMA守门人认定不能仅凭定量标准（用户数）就下结论，欧盟委员会必须提供充分分析和说理；第二，通讯类应用（Messenger）可单独构成核心平台服务，需履行守门人义务。此案为TikTok正在进行的DMA上诉（5月18日开庭）提供了程序性参考。同时，法院的混合裁决也体现了DMA在司法审查层面的成熟——监管并非单向强权，被监管企业拥有正当的司法救济权利。',
    industryImpact:
      '中国出海企业的核心启示：\n\n1. 司法救济可用：TikTok正在欧盟法院挑战DMA守门人认定（5月18日开庭），Meta案的“说理不充分”裁定可为TikTok案提供程序性辩护依据\n\n2. 通信/社交应用监管：Messenger案确认通讯应用可被单独认定为守门人，提示WhatsApp等通信工具面临类似的DMA合规义务\n\n3. 动态评估机制：若平台的欧盟月活用户数下降至门槛（4500万）以下，守门人身份可被撤销——建议密切监控用户数变化并及时申请复评\n\n4. 合规连续性：即使已取消守门人标签，之前的违规行为仍可能被追诉（Marketplace被罚款7.98亿欧元即为明证）',
    tags: ['Meta', 'Marketplace', 'Messenger', 'DMA', '守门人', '欧盟法院', '普通法院', '判例'],
    link: 'https://finance.sina.com.cn/stock/usstock/c/2026-06-03/doc-iniactan4075840.shtml',
    isNew: true,
  },
  {
    id: 'e42',
    source: '欧盟委员会/新浪财经/IT之家',
    date: '2026-06-01',
    heat: 10,
    title: '欧盟对Meta处以7.98亿欧元反垄断罚款：认定Facebook与Marketplace捆绑及滥用竞争对手数据，创Meta反垄断罚款新纪录',
    summary:
      '2026年6月1日，欧盟委员会宣布对Meta处以7.9772亿欧元（约8.41亿美元）的罚款，理由是Meta在在线分类广告市场滥用主导地位，通过将Facebook Marketplace与社交网络捆绑、对竞争对手施加不公平交易条件等从事反竞争行为。这是欧盟首次因反垄断违规对Meta处以罚款。调查始于2021年，欧盟认定Meta利用Facebook的主导地位自动向所有用户展示Marketplace服务，同时使用竞争对手分类广告平台的数据优化自身服务。欧盟责令Meta有效终止上述行为。Meta表示将遵守命令，但同时计划上诉，整个法律程序可能需要数年。此前Meta因跨境数据传输已被欧盟处以13亿美元破纪录罚款。',
    overallImpact:
      '这是Meta在欧盟面临的首个反垄断罚款，与DMA框架下已开出的罚单（DMA罚款2亿欧元）形成叠加，标志着Meta在欧盟同时面临反垄断法、DSA、DMA和GDPR的四重法律压力。7.98亿欧元虽然对Meta千亿美元营收影响有限，但此案确认了社交平台捆绑服务和不当利用竞争对手数据的反竞争性质，为后续DMA框架下的类似行为创设了先例。值得注意的是，欧盟在处罚反垄断违规的同时，DMA正在为类似行为提供更快速的执法通道。',
    industryImpact:
      '对中国出海社交和电商平台的启示：\n\n1. 生态捆绑风险：将不同服务组件强制关联展示（如社交+电商、社交+广告）可能构成反垄断违规，建议在平台设计中保持服务间的清晰边界和用户选择自由\n\n2. 竞争对手数据使用：不应利用竞争对手在平台上的业务数据优化自有竞争性服务，这将被认定为不公平交易条件\n\n3. 多法叠加风险：同一行为可能同时受反垄断法、DMA、DSA和GDPR审查，合规策略需跨法规整合\n\n4. 欧盟对社交平台的监管正从数字监管（DSA/DMA）扩展到传统竞争法领域，双线执法将成为常态',
    tags: ['Meta', 'Facebook Marketplace', '反垄断', '欧盟', '捆绑销售', '分类广告', '7.98亿欧元'],
    link: 'https://finance.sina.cn/2026-06-01/detail-inhzwuhp5228002.d.html',
    isNew: true,
  },
  {
    id: 'e41',
    source: '欧盟委员会/新浪财经/路透社',
    date: '2026-06-03',
    heat: 10,
    title: '欧盟6月3日正式公布《云计算和人工智能发展法案》(CADA)及技术主权一揽子计划，美国云巨头面临公共采购壁垒',
    summary:
      '2026年6月3日，欧盟委员会正式公布技术主权一揽子计划，包含《云计算和人工智能发展法案》（CADA）及欧盟数字主权正式定义。CADA提案引入公共招标的强制性"非价格"授标标准：竞标欧盟关键项目的云软件和硬件须优先在欧盟境内研发和设计；针对非欧盟云供应商的遴选标准涵盖数据保护水平、第三国对供应商的数据和服务的控制程度以及各自市场对云服务的开放程度。欧盟采用48项标准的总体主权评分，采购方需考量管辖权风险。全球约63%的云基础设施市场由AWS、Azure和Google Cloud控制，CADA有望彻底改变欧洲云市场格局。欧盟科技事务负责人Henna Virkkunen正式公布了该方案。',
    overallImpact:
      'CADA标志着欧盟从"数字监管"（DSA/DMA/AI Act）正式进入"技术主权"（CADA/Chips Act 2.0）阶段。欧盟明确表示要减少对美国云服务依赖，公共采购市场（万亿级）将向欧洲本土企业倾斜。此举可能引发跨大西洋贸易摩擦，但对阿里云、华为云等中国云服务商意味着差异化竞争窗口——在"非美国第三方"定位上具有独特优势。CADA需获27国批准，立法周期预计12-18个月。同日推出的欧盟数字主权正式定义及"芯片法案2.0"将加速半导体和云基础设施自主化进程。',
    industryImpact:
      '中国云服务商的战略窗口：\n\n1. 差异化机会：CADA在排斥美国云的同时为中国云服务商打开"非美国第三方"准入通道，前提是通过欧盟本地合资模式满足主权合规要求\n2. 合规门槛：须在欧盟建立完整的数据中心、合规团队和运营实体，满足CADA对管辖权和数据保护的严格要求\n3. 时间窗口：立法周期12-18个月，建议立即启动在欧云业务的合规评估与本地化建设\n4. 芯片法案2.0：可能影响对欧芯片出口格局，中国半导体企业需关注其具体条款\n5. 风险对冲：CADA可能要求披露母国法律对数据的控制程度，中国云服务商需评估《数据安全法》等对欧运营的潜在合规交叉影响',
    tags: ['CADA', '云计算', '技术主权', '欧盟', 'AWS', 'Azure', 'Google Cloud', '芯片法案2.0', '公共采购'],
    link: 'https://finance.sina.com.cn/stock/usstock/summary/2026-06-01/doc-inhzxmek3808089.shtml',
    isNew: true,
  },
  {
    id: 'e23',
    source: '匈牙利竞争管理局 (GVH)',
    date: '2026-04-28',
    heat: 9,
    title: '匈牙利 GVH 对 Temu 开出13.3亿福林"罚款+消费者赔偿"组合重罚',
    summary:
      '2026年4月28日，匈牙利竞争管理局（GVH）对 Temu 欧洲运营主体 Whaleco Technology Limited 开出13.3亿福林（约370万美元）的组合处罚。GVH调查发现Temu存在三大违规行为：虚假折扣宣传（无法证明最高95%折扣的真实性）、虚假库存焦虑提示（"仅剩4件""1分钟前有人下单"等紧迫性弹窗）、以及误导性环保声明。Temu全程配合调查、承认违规并放弃上诉权。处罚方案包括：4.37亿福林行政罚款上缴中央财政；向2023年11月至2024年9月期间所有下单消费者每人赔付2000福林（约5.5美元），总额不低于8.82亿福林。Temu同时承诺实施全面的消费者保护合规计划。',
    overallImpact:
      '这是东欧市场监管机构对中国跨境电商最大规模的组合处罚之一。"罚款+消费者赔偿"的模式具有惩罚与补偿双重功能，且"兜底条款"（退款不足部分由罚款补足）设计精妙。此案与欧盟DSA对Temu的调查形成区域监管合力，标志着中国电商出海欧洲的合规成本显著上升。',
    industryImpact:
      '所有欧洲市场的中国跨境电商需立即审查以下三大合规风险：\n\n1. 价格促销合规：在欧盟《Omnibus指令》下，必须公示商品过去30天内最低成交价，划线价必须是真实历史售价\n2. 紧迫性营销禁令：使用"限时""仅剩X件"等紧迫性提示需有真实数据支撑，否则构成误导行为\n3. 环保声明合规：未经第三方认证的环保和可持续性声明将被认定为误导性信息\n\n建议建立面向欧盟各国的营销合规清单，按国别适配当地消费者保护法规。',
    tags: ['Temu', '匈牙利', 'GVH', '消费者保护', '虚假折扣', '跨境电商'],
    link: 'https://www.163.com/dy/article/KSLPL57M054573I7.html',
    isNew: true,
  },
  {
    id: 'e24',
    source: '美国圣克拉拉县',
    date: '2026-05-12',
    heat: 9,
    title: '美国圣克拉拉县起诉 Meta 纵容诈骗广告，每年牟利 70 亿美元',
    summary:
      '2026年5月12日，美国加州圣克拉拉县起诉 Meta，指控其利用 Facebook 和 Instagram 平台推广诈骗广告牟利，违反了加州虚假广告法和不公平商业行为法。诉讼援引路透社曝光的 Meta 内部文件指出，该公司每年从高风险诈骗广告中获利高达 70 亿美元。圣克拉拉县还指控 Meta 设立"底线规则"，当反诈措施会造成高额经济损失时会刻意阻碍反诈推进。Meta 表示将就此诉讼进行抗辩。',
    overallImpact:
      '这是美国地方政府对科技平台广告审核渎职的最大规模诉讼之一。Meta 的内幕文件首次公开了平台从诈骗广告中获利的真实量级，可能引发美国其他州乃至联邦层面的集体诉讼潮。同时该案与欧盟 DSA/DMA 对 Meta 持续执法形成跨大西洋监管合力。',
    industryImpact:
      '所有依赖广告收入的社交平台和内容应用需审视其广告审核机制：1）确保广告投放前的实质性合规审查而非事后补救；2）建立诈骗广告的主动识别系统；3）防止因商业利益冲突而弱化反诈措施。',
    tags: ['Meta', '诈骗广告', '圣克拉拉县', '美国', '虚假广告'],
    link: 'https://finance.sina.com.cn/tech/digi/2026-05-12/doc-inhxrshi8279911.shtml',
    isNew: true,
  },
  {
    id: 'e22',
    source: '欧盟委员会/新浪财经',
    date: '2026-04-29',
    heat: 10,
    title: '欧盟初步认定Meta违反DSA：未能阻止13岁以下未成年人使用Instagram和Facebook',
    summary:
      '2026年4月29日，欧盟委员会发布初步调查结果，认定Meta旗下Instagram和Facebook违反《数字服务法》（DSA）。欧盟指出Meta在执行13岁以下儿童使用限制方面"几乎没有采取任何措施"，欧盟约有10%至12%的13岁以下儿童仍在使用这两个平台。Meta的举报工具被批评需要多达七次点击才能报告未成年人用户，且举报后缺乏后续跟进。同日，欧盟委员会呼吁各成员国推广使用欧盟年龄验证应用。若违规最终确认，Meta可能面临最高全球年营收6%的罚款（约121亿美元）。',
    overallImpact:
      '这是DSA最具代表性的未成年人保护执法。欧盟从"事前预防"和"事后补救"双维度施压，将直接影响所有社交平台对年龄验证义务的履行标准，与冯德莱恩宣布的《数字公平法案》形成政策叠加。',
    industryImpact:
      '中国出海企业需升级年龄验证技术（超越自我声明）、优化举报机制（不超过3步）、完善主动检测机制，参考欧盟年龄验证应用技术标准提前布局。',
    tags: ['Meta', 'Instagram', 'Facebook', 'DSA', '未成年人保护', '年龄验证'],
    link: 'https://finance.sina.cn/usstock/mggd/2026-04-29/detail-inhwczpe7772974.d.html',
    isNew: true,
  },
  {
    id: 'e21',
    source: '欧盟委员会',
    date: '2026-05-05',
    heat: 8,
    title: '欧盟与日本签署数字平台监管合作协议，DSA执法合作扩展至亚太',
    summary:
      '2026年5月5日，欧盟委员会与日本总务省签署合作协议，就数字平台监管执法建立正式的国际合作框架。同日，欧盟与日本宣布加速在AI、数据、量子计算和芯片领域的合作。这是欧盟在DSA/DMA监管框架下首次与亚太主要经济体建立正式的执法协作机制，标志着欧盟数字监管标准的全球影响力进一步扩大。该合作将涉及跨境数据共享、联合风险评估和执法信息互通。',
    overallImpact:
      '欧盟的数字监管标准正在通过双边协议向全球输出。日欧合作可能推动整个亚太地区的数字监管标准趋同于DSA框架，对在该地区运营的科技企业构成新的、更加复杂的合规环境。',
    industryImpact:
      '出海企业需关注日欧监管协作对区域合规标准的传导效应。日本可能参照DSA框架修订国内数字监管法律，形成"布鲁塞尔效应"的亚太版。建议同时在欧盟和日本运营的企业提前建立统一的合规策略。',
    tags: ['欧盟', '日本', 'DSA', '数字平台监管', '国际合作'],
    link: 'https://digital-strategy.ec.europa.eu/en',
    isNew: true,
  },
  {
    id: 'e20',
    source: '欧盟委员会/新华网',
    date: '2026-05-14',
    heat: 10,
    title: 'WhatsApp VLOP合规截止期至5月中旬，Meta面临DSA最严格监管审查',
    summary:
      '2026年1月27日被欧盟正式指定为VLOP的WhatsApp，须在5月中旬前全面履行DSA最严格的合规义务。这是继Facebook、Instagram之后，第三个Meta旗下平台进入VLOP名单。作为全球用户量最大的即时通讯应用，WhatsApp新增义务包括：系统性风险评估、年度外部审计、透明的内容审核机制、非法内容快速举报通道、限制基于用户画像的定向广告、允许用户退出推荐系统等。此次执法表明欧盟正将DSA监管范围从社交媒体扩展到通讯领域，违规罚款最高可达全球年营收6%。',
    overallImpact:
      'WhatsApp被纳入VLOP监管体系是DSA监管范围扩张的标志性事件。通讯应用的端到端加密特性与DSA的内容审核义务之间存在天然张力，Meta的合规方案对全球通讯类应用具有标杆意义。欧盟委员会明确表示将以"用户规模"而非"平台类型"为认定标准。',
    industryImpact:
      '中国出海通讯和社交应用（如Telegram的非俄语系竞品、出海通讯工具等）需密切关注：1）DSA对通讯平台的审核要求可能逐步明确；2）端到端加密与内容审核之间的合规平衡是核心挑战；3）建议在欧盟用户数接近3500万时主动启动VLOP预备合规方案。',
    tags: ['WhatsApp', 'VLOP', 'DSA', 'Meta', '合规截止期'],
    link: 'https://www.news.cn/world/20260127/1e0c18d2d0ca42e4a740a15c20e76d13/c.html',
    isNew: true,
  },
  {
    id: 'e34',
    source: '虎嗅网/路透社/亿恩网',
    date: '2026-05-18',
    heat: 10,
    title: 'TikTok上诉欧盟最高法院挑战DMA守门人身份，欧洲首例DMA终审案件开庭',
    summary:
      '2026年5月18日，字节跳动旗下TikTok在卢森堡欧盟法院出庭，就欧盟委员会将其认定为DMA守门人提起上诉，此为欧盟最高法院首次审理DMA相关案件。TikTok辩称其用户多平台并行（70-80%用户同时使用竞争对手平台），不具备市场锁定效应。欧盟委员会反驳称即使存在多归属，锁定效应仍可能发生。判决将在未来数月内做出，将创DMA判例先河。',
    overallImpact:
      '此案是DMA实施以来的首个最高法院终审案件，判决将影响TikTok是否须履行严格的守门人义务（互操作性、自我优待禁止等），并为后续DMA执法创设判例依据。若败诉将被处最高全球年营收10%罚款，并开启对更多中国出海平台的守门人认定。',
    industryImpact:
      '中国出海企业需关注：\n\n\n1. 守门人认定标准中多平台并行是否构成锁定效应，将影响社交类应用在欧监管分类；\n2. 月活超4500万的通信/社交应用将面临守门人级合规改造；\n3. 为后续Temu、SHEIN等中国平台的守门人认定提供判例参考；\n4. 建议在欧用户数接近4500万前评估守门人触发风险并制定应对策略。',
    tags: ['TikTok', 'DMA', '守门人', '欧盟法院', '字节跳动', '反垄断'],
    link: 'https://www.huxiu.com/article/4859584.html',
    isNew: true,
  },
  {
    id: 'e32',
    source: 'BEUC/新浪财经/路透社',
    date: '2026-05-21',
    heat: 9,
    title: '欧洲消费者组织集体投诉谷歌、Meta、TikTok纵容金融诈骗广告，DSA审核义务面临全面检验',
    summary:
      '2026年5月21日，欧洲消费者组织（BEUC）联合29个成员国消费者保护机构，依据《数字服务法》（DSA）向欧盟委员会投诉谷歌、Meta和TikTok，指控其平台金融诈骗广告管控不力。BEUC于2025年12月至2026年3月期间累计举报近900条诈骗广告，平台仅删除27%，52%被拒绝或未处理。BEUC总干事指出平台不仅未主动清理，接到举报后也应对严重滞后。若三家平台被认定违反DSA，将面临最高全球年营业额6%的罚款。谷歌回应称已拦截99%以上违规广告，Meta称去年识别移除超1.59亿条诈骗广告，TikTok未回应。',
    overallImpact:
      '这是DSA生效以来规模最大的消费者组织协调投诉行动。投诉直指DSA核心义务——广告审核与非法内容管控的有效性。若欧盟委员会据此启动正式调查，将全面检验DSA广告审核义务的执行力度，可能引发整个数字广告行业的合规标准升级。',
    industryImpact:
      '所有DSA监管范围内的广告平台需全面审视金融广告审核机制：1）金融广告应纳入高风险类别，执行投放前实质审核；2）建立用户诈骗广告举报的快速响应通道（24小时内处理）；3）保留审核决策的完整记录，应对监管问询；4）金融广告审核应与平台AI自动审核系统深度融合，确保自动化拦截与人工复核的协同效率。',
    tags: ['BEUC', '金融诈骗', 'DSA', '谷歌', 'Meta', 'TikTok', '广告审核'],
    link: 'https://finance.sina.com.cn/stock/usstock/c/2026-05-21/doc-inhyshrk5764081.shtml',
    isNew: true,
  },
  {
    id: 'e31',
    source: '欧盟委员会/AI Office',
    date: '2026-05-19',
    heat: 9,
    title: '欧盟委员会发布高风险AI系统分类指南草案，企业AI合规判定获明确操作依据',
    summary:
      '2026年5月19日，欧盟委员会发布高风险AI系统分类指南草案，提供详细的分类标准和丰富的实践案例，覆盖附件三所列的生物识别、关键基础设施、教育、就业、公共服务、执法、移民和司法等高风险领域。指南将协助企业判定自身AI系统是否属于AI Act定义的高风险范畴。该草案目前处于征求意见阶段。这是AI Act高风险条款（已推迟至2027年12月）实施前的重要准备步骤。',
    overallImpact:
      '指南的发布标志着欧盟AI监管进入实质性落地阶段。企业不再需要在模糊的法规文本中自行解读，而是获得明确的分类依据和案例参考，大幅降低了合规不确定性。',
    industryImpact:
      'AI出海企业应依据指南草案进行系统分类自查，判定是否属于高风险范围并提前准备合规方案。同时关注各成员国5月31日前建成的AI监管沙盒，以便进行合规测试。',
    tags: ['AI Act', '高风险AI', '分类指南', '欧盟', '合规执法'],
    link: 'https://digital-strategy.ec.europa.eu/en/news',
    isNew: true,
  },
  {
    id: 'e19',
    source: '欧盟委员会',
    date: '2026-05-12',
    heat: 10,
    title: '冯德莱恩宣布欧盟将推出《数字公平法案》，整治社交平台成瘾性设计，对TikTok、X、Meta持续加压',
    summary:
      '2026年5月12日，欧盟委员会主席冯德莱恩发表重要讲话，宣布将推出《数字公平法案》（Digital Fairness Act），专门整治社交平台的成瘾性产品设计。冯德莱恩表示欧盟正依据DSA对TikTok展开成瘾性设计调查、对X平台因Grok生成色情图像提起诉讼、对Meta旗下Instagram和Facebook未执行13岁最低准入年龄展开调查。法案草案将于今年年底提交。',
    overallImpact:
      '这是欧盟从"事后处罚"向"事前设计规范"转型的标志性举措。监管正从内容层面延伸到产品设计层面。',
    industryImpact:
      '出海社交平台需立即审查成瘾性设计、年龄验证机制和AI应用合规性。',
    tags: ['Digital Fairness Act', '冯德莱恩', '成瘾性设计', 'TikTok', 'X', 'Meta'],
    link: 'https://ishare.ifeng.com/c/s/v002GiT9yuxO--b647Ka055gMHdZILW96ozGXL1VwN64A7yc__',
    isNew: true,
  },
  {
    id: 'e18',
    source: '爱尔兰 DPC',
    date: '2026-05-08',
    heat: 8,
    title: '爱尔兰 DPC 对 Permanent TSB 数据泄露事件开出 27.75 万欧元罚单',
    summary:
      '2026年5月8日，DPC 公布了对 Permanent TSB (PTSB) 数据泄露的最终处罚决定。PTSB 的"Open24联系中心"遭受社会工程学攻击，恶意分子冒充客户获取账户访问权限。DPC 认定 PTSB 违反 GDPR 第5(1)(f)条、第32(1)条处25万欧元罚款，因未在72小时内通知 DPC（违反第33(1)条）另罚2.75万欧元，合计27.75万欧元。',
    overallImpact:
      '此案强化了金融机构的数据安全义务。DPC 同时追究了安全措施缺陷和通知延误，体现了"双重追责"的执法趋势。',
    industryImpact:
      '金融科技和电商出海企业需要：1）强化身份验证和多因素认证防社攻；2）建立72小时内数据泄露通知机制；3）做好安全措施和通知义务双重合规。',
    tags: ['DPC', 'Permanent TSB', '数据泄露', 'GDPR', '金融机构'],
    link: 'https://www.dataprotection.ie/en/news-media/press-releases/data-protection-commission-announces-decision-in-pemanent-tsb-inquiry',
    isNew: true,
  },
  {
    id: 'e17',
    source: '爱尔兰 DPC',
    date: '2026-05-05',
    heat: 10,
    title: '爱尔兰 DPC 对 SHEIN Ireland 发起正式调查，聚焦欧盟用户数据跨境传输至中国',
    summary:
      '2026年5月5日，爱尔兰数据保护委员会（DPC）宣布对 SHEIN 爱尔兰子公司（Infinite Styles Services Co. Ltd.）发起正式调查。调查核心是 SHEIN Ireland 将欧盟数据主体的个人数据传输至中国是否遵守了 GDPR 的跨境传输规定。副专员 Graham Doyle 强调："当个人数据被传输到欧盟以外时，GDPR 要求给予实质同等的保护水平。"此案涉及 GDPR 第5条（原则）、第13条（透明度）和第五章（跨境传输）。DPC 的调查启动决定已于2026年4月30日发出。',
    overallImpact:
      '这是 DPC 将中国方向数据跨境传输列为战略重点后的又一重大行动。与 TikTok 案形成呼应，中国互联网企业在欧盟的数据处理行为正面临前所未有的监管审查。',
    industryImpact:
      '所有将欧盟用户数据传输至中国的企业应立即进行跨境传输审计，确保已签署有效 SCC 并实施补充保护措施。建议将欧盟数据本地化存储。',
    tags: ['DPC', 'SHEIN', '数据跨境传输', 'GDPR', '爱尔兰'],
    link: 'https://www.dataprotection.ie/en/news-media/dpc-opens-inquiry-infinite-styles-services-co-ltd-shein-ireland',
    isNew: true,
  },
  {
    id: 'e26',
    source: '新浪财经/爱尔兰媒体委员会',
    date: '2026-05-06',
    heat: 9,
    title: '爱尔兰媒体委员会调查Meta算法操控：暗黑模式涉嫌违反DSA',
    summary:
      '2026年5月6日，爱尔兰媒体委员会(Coimisiún na Meán)宣布对Meta旗下Facebook和Instagram正式展开两项调查，重点审查其是否通过算法设计和"暗黑模式"操控用户选择，涉嫌违反DSA。调查将核实用户能否轻松选择并修改推荐系统偏好，以及是否存在误导或阻碍用户使用非个性化选项的行为。数字服务专员John Evans强调，算法可能通过反复推送有害内容对儿童和青少年造成潜在伤害。若认定违规，Meta将面临最高全球年营业额6%的罚款。',
    overallImpact:
      '此案标志着DSA执法从"内容审核"深入到"产品交互设计"层面。监管不仅关注平台推荐什么内容，更关注用户能不能轻松选择不接收推荐。这是爱尔兰过去六个月针对大型科技平台系列DSA执法行动的最新一例。',
    industryImpact:
      '中国出海社交和内容平台需立即自查推荐系统的非个性化选项设计，确保退出个性化推荐的路径清晰、便捷。',
    tags: ['Meta', '暗黑模式', 'DSA', '算法', '爱尔兰', '用户选择'],
    link: 'https://finance.sina.cn/usstock/mggd/2026-05-06/detail-inhwwvwx6177004.d.html',
    isNew: true,
  },
  {
    id: 'e25',
    source: '新浪财经/欧盟委员会',
    date: '2026-05-07',
    heat: 8,
    title: '谷歌修改垃圾邮件政策应对DMA调查，出版商投诉触发搜索排名监管审查',
    summary:
      '2026年5月7日，据欧盟委员会披露文件，谷歌提议修改其"网站声誉滥用政策"以符合DMA要求。此前出版商投诉该政策降低包含商业合作伙伴内容的网站排名，欧盟已于2025年11月依据DMA启动调查。文件显示谷歌已提出修改方案，若最终违规可能面临全球年营业额10%的罚款。',
    overallImpact:
      '此案表明平台技术性运营政策同样受DMA非歧视义务约束，监管范围已远超反垄断传统范畴。',
    industryImpact:
      '出海企业需关注平台搜索排名算法对自身流量的影响，评估DMA框架下寻求公平排名的可能性。',
    tags: ['谷歌', 'DMA', '搜索排名', '反垄断', '出版商'],
    link: 'https://finance.sina.cn/usstock/mggd/2026-05-07/detail-inhwyyvv8726077.d.html',
    isNew: true,
  },
  {
    id: 'e28',
    source: '英国 CMA',
    date: '2026-05-16',
    heat: 9,
    title: '英国 CMA 拟于5月对微软商业软件生态启动战略市场地位调查，聚焦云服务软件许可',
    summary:
      '2026年3月31日，英国竞争与市场管理局（CMA）宣布将于5月对微软整个商业软件生态系统启动战略市场地位（SMS）调查。调查将重点评估微软在生产力软件、操作系统及数据库管理领域的市场主导地位，以及其软件许可模式是否限制了云市场竞争。CMA指出微软与AWS合计占据英国云市场约80%份额。微软2025年9月起禁止独立托管服务商在AWS、阿里云等非Azure平台上销售微软许可证。若认定微软具备SMS地位，CMA将有权根据DMCC法案实施补救措施并处以最高全球年营收10%罚款。',
    overallImpact:
      '这是英国DMCC法案生效以来对云服务领域最重大的监管行动。在欧盟拟将云服务纳入DMA守门人监管的同时，英国也同步审查微软和亚马逊在云市场的主导地位，大西洋两岸形成云监管合流之势。',
    industryImpact:
      '阿里云等中国云服务商在英国可能因微软被限制许可捆绑而获得更公平的竞争环境。建议在英运营的中国科技企业提前评估DMCC合规风险。',
    tags: ['英国CMA', '微软', 'DMCC', '云服务', '软件许可'],
    link: 'https://ishare.ifeng.com/c/s/v002K--6KyvqxUHOklhqWwC1KQ5q--WX4hvdJvhQ-_oTU8kyds__',
    isNew: true,
  },
  {
    id: 'e29',
    source: '欧洲议会/新浪财经',
    date: '2026-05-15',
    heat: 9,
    title: '欧洲议会通过决议敦促欧盟强力执行DMA，抨击对Meta和苹果罚款力度不足',
    summary:
      '2026年5月14日，欧洲议会通过决议敦促欧盟委员会迅速、一致地执行DMA。MEPs认为对Meta和Apple的罚款力度不足，要求尽快完成对亚马逊AWS和微软Azure的守门人认定调查，将AI驱动的搜索工具纳入DMA监管，并抵制美国试图削弱DMA的政治压力。决议关注Google的自我优待、TikTok的同意界面操控、微软默认设置变更等问题。',
    overallImpact:
      '欧洲议会决议表明欧盟立法机构对DMA执法的强力支持。在特朗普政府以关税施压的背景下，此决议具有重要政治象征意义。对Meta和Apple罚款的不满为下一轮更高额罚款铺路。',
    industryImpact:
      '出海企业关注点：云计算监管（阿里云华为云可能受益）、AI监管扩大、罚款力度升级趋势。',
    tags: ['欧洲议会', 'DMA', '云计算', 'AI', '执法', '守门人'],
    link: 'https://www.europarl.europa.eu/news/en/press-room/20260423IPR41844/digital-markets-act-meps-want-stronger-enforcement-amid-external-pushback',
    isNew: true,
  },
  {
    id: 'e30',
    source: 'IT之家/金融时报',
    date: '2026-05-13',
    heat: 9,
    title: '法国敦促欧盟对Temu和SHEIN采取更强有力执法，抽查产品46%不合规',
    summary:
      '2026年5月13日，法国竞争与消费者保护机构负责人Sarah Lacoche呼吁欧盟对SHEIN和Temu采取更有力行动。法国DGCCRF数据显示自2025年4月已下架超10万款产品，抽查中46%被认定为不合规且危险。欧盟委员会回应称已通知Temu和SHEIN违反消费者法律，制裁将针对重复和系统性不合规行为。',
    overallImpact:
      '法国作为欧盟核心大国，其机构公开施压可能加速欧盟针对跨境电商的统一执法行动，形成产品安全、消费者保护和数字平台合规三线监管攻势。',
    industryImpact:
      '跨境电商需加强产品预检机制、关注平台进口商责任、做好多国联动执法应对。',
    tags: ['法国', 'Temu', 'SHEIN', '跨境电商', '产品安全', '消费者保护'],
    link: 'https://finance.sina.com.cn/tech/roll/2026-05-13/doc-inhxtqxn9359427.shtml',
    isNew: true,
  },
  {
    id: 'e27',
    source: '欧盟委员会/财联社',
    date: '2026-05-15',
    heat: 10,
    title: '欧盟委员会认定 TikTok 广告透明度违反 DSA，或面临全球年营收 6% 罚款',
    summary:
      '2026年5月15日，欧盟委员会发布初步认定，指出TikTok在广告库设置和信息披露方面未履行《数字服务法》（DSA）规定的广告透明度义务。调查发现TikTok未能提供广告内容、目标受众和出资方等关键信息，其广告库的查询功能也不支持公众基于这些信息进行全面检索。欧委会强调此次认定为初步通知，尚未构成最终结论。若最终确认违规，TikTok可能面临最高全球年营业额6%的罚款。TikTok回应称正核查调查结果，对欧委会部分诠释不予认同。',
    overallImpact:
      '这是针对TikTok的DSA广告透明度执法首次获得正式认定。继数据跨境传输罚单和TikTok Lite调查后，TikTok在DSA框架下面临系统性审查压力。',
    industryImpact:
      '所有VLOP需审查广告库功能，确保支持按广告内容、目标受众、出资方等多维度检索。尤其需注意广告信息的实时更新和公众可访问性。',
    tags: ['TikTok', 'DSA', '广告透明度', 'VLOP', '广告库'],
    link: 'https://www.36kr.com/newsflashes/3294547054905605',
    isNew: true,
  },
  {
    id: 'e35',
    source: '新浪财经/路透社',
    date: '2026-05-25',
    heat: 10,
    title: '欧盟对谷歌Android AI集成加码施压：强制开放系统级能力给第三方AI，理论最高罚402.8亿美元',
    summary:
      '2026年4月27日，欧盟委员会向Alphabet发出拟议措施，要求谷歌在Android上向第三方AI服务开放系统级能力——自定义唤醒词、设备端应用数据访问、应用操作执行和本地模型资源。公众咨询5月13日截止，最终决定预计7月底前做出。若认定违规，按Alphabet 4028亿美元营收计算理论最高罚款约402.8亿美元。谷歌反对称干预可能开放敏感硬件权限、推高成本、削弱隐私安全。',
    overallImpact:
      '这是DMA在AI时代的标志性执法行动，欧盟旨在防止搜索入口垄断在AI时代重演。若措施落地将彻底改变Android手机AI生态格局，使ChatGPT等第三方AI获得与Gemini同等的系统级竞争地位。',
    industryImpact:
      '中国AI和手机厂商需关注：1）第三方AI助手有望获得Android系统级能力——唤醒词、屏幕读取、应用操作等；2）中国手机厂商可设计多AI助手系统架构以提供差异化体验；3）AI助手月活超4500万将面临DSA VLOP认定风险；4）7月底裁决前尚有行业意见窗口。',
    tags: ['谷歌', 'Android', 'AI', 'DMA', 'Gemini', '欧盟', '反垄断', '系统级AI'],
    link: 'http://cj.sina.com.cn/articles/view/3172142827/bd130eeb01901a41w',
    isNew: true,
  },
  {
    id: 'e36',
    source: '欧盟委员会/德国商报/同花顺',
    date: '2026-05-26',
    heat: 10,
    title: '欧盟拟对谷歌开出近10亿欧元DMA史上最大罚单：搜索自我优待裁定，结构救济威胁远大于罚款',
    summary:
      '2026年5月25-26日，德国《商报》独家报道，欧盟委员会对Alphabet旗下谷歌处以近10亿欧元（约79亿元人民币）的DMA罚款，这是DMA自2024年5月全面实施以来开出的金额最高罚单。裁定核心是谷歌在搜索结果中系统性偏袒自家服务（旅行、购物、酒店等），构成DMA第6条禁止的"自我优待"，损害Booking、Tripadvisor等竞争对手。调查于2025年3月启动，为DMA下最早的非合规调查之一。谷歌整改方案被认定"未达预期要求"。10亿欧元仅占Alphabet 1099亿美元单季营收约0.8%，财务影响微乎其微，但行为救济措施才是真正威胁——欧盟可能要求永久改变搜索算法、开放Gemini AI接口甚至剥离垂直搜索业务。决定预计在欧盟夏季休会前正式公布。',
    overallImpact:
      '这是DMA执法史上的分水岭时刻。与苹果（5亿欧元）和Meta（2亿欧元）的首轮DMA罚款相比，谷歌案核心是搜索领域的结构性垄断。处罚的深远影响在于行为救济：强制改变搜索算法、开放Gemini AI接口、剥离垂直搜索业务等结构性措施将根本重塑搜索引擎竞争格局。在美欧贸易摩擦和AI争霸背景下，此案不仅影响谷歌，更将定义DMA在未来数字市场的执法范式。',
    industryImpact:
      '中国出海企业的关键启示：\n\n1. 搜索生态重构：欧盟裁定可能为比价平台、旅游服务等出海企业带来搜索流量的公平竞争机会\n2. AI门槛降低：若欧盟强制谷歌开放Gemini接口，将直接降低中国AI产品在欧盟的竞争门槛\n3. 多线监管包围：DMA罚款+Android AI系统级能力开放（7月底裁定）+广告技术案（29.5亿欧元）形成三线施压\n4. 全球协同监管：美国司法部推动谷歌搜索垄断案可能强制出售Chrome，跨大西洋监管合力加速\n5. 合规红线：DMA第6条"自我优待"禁令对所有守门人平台具有通用警示意义',
    tags: ['谷歌', 'DMA', '反垄断', '欧盟', '搜索', 'Alphabet', '罚款', '自我优待'],
    link: 'https://stock.10jqka.com.cn/usstock/20260526/c676980119.shtml',
    isNew: true,
  },
  {
    id: 'e40',
    source: '欧盟委员会/凤凰网',
    date: '2026-05-29',
    heat: 9,
    title: 'G7数字与技术部长就未成年人数字安全共同原则达成一致，全球未成年人保护监管协同升级',
    summary:
      '2026年5月29日，欧盟委员会欢迎G7数字与技术部长就未成年人数字安全的共同原则（Common Set of Principles for a Safer and More Secure Digital Space for Minors）达成一致。该原则涵盖年龄验证标准化、有害内容识别与移除、算法对未成年人的保护性设计、家长控制工具互操作性以及数字素养教育等核心领域。G7此次共识是欧盟DFA立法（年底提交）和DSA未成年人执法（Meta案）的国际政策延伸，标志着G7主要经济体在未成年人网络保护领域首次形成统一政策行动框架。',
    overallImpact:
      'G7共同原则的达成与欧盟DSA执法和DFA立法形成多层协同。科技企业面临未成年人保护合规从区域要求升级为全球核心市场共同标准的趋势。G7原则中的保护性设计（algorithmic protection by design）等概念可能成为后续各国立法的参考基线。',
    industryImpact:
      '出海企业需建立全球未成年人保护合规基线，关注G7可能的统一年龄验证技术规范，在产品设计阶段融入保护性原则，并做好数字素养教育功能的产品布局。',
    tags: ['G7', '未成年人保护', '数字安全', '共同原则', '年龄验证', '算法保护'],
    link: 'https://digital-strategy.ec.europa.eu/en/news',
    isNew: true,
  },
  {
    id: 'e39',
    source: '凤凰网/证券之星/欧盟委员会',
    date: '2026-05-28',
    heat: 10,
    title: '欧盟委员会依DSA对Temu开出2亿欧元罚款，为DSA史上金额最高执法行动',
    summary:
      '2026年5月28日，欧盟委员会宣布对中国跨境电商平台Temu处以2亿欧元（约2.3亿美元）罚款，理由是Temu未能有效遏制平台上非法商品的销售，违反DSA规定。这是DSA框架下开出的第二张罚单，也是金额最高的一张。欧盟委员会认定Temu未能勤勉识别、分析和评估平台上非法商品销售的系统性风险，其风险评估"低估了具体风险"、"内容过于模糊"、"基于不充分证据"。调查始于BEUC及17个成员机构投诉。欧盟数字事务负责人Henna Virkkunen明确表示"现在是Temu遵守法律的时候了"。Temu表示不同意处罚决定，将"考虑一切选项"。欧盟要求Temu在8月28日前提交整改行动计划，未来两个月内评估。',
    overallImpact:
      '这是DSA执法史上的里程碑案件。Temu作为中国背景VLOP首次被重罚2亿欧元，加上此前匈牙利GVH对Temu的13.3亿福林组合处罚、欧盟150欧元以下关税豁免取消（7月1日生效），欧盟正从数字合规、消费者保护、关税政策三维度围合中国跨境电商。委员会特别强调风险评估是DSA"基石"，Temu案为后续所有VLOP的合规执行树立了标杆。',
    industryImpact:
      '中国跨境电商核心警示：\n\n1. DSA风险评估不能流于形式——需实质性、数据驱动的系统性风险识别和分析\n2. 充电器、儿童玩具等产品须严格CE认证，平台承担"事实进口商"连带责任（7月1日起）\n3. 推荐算法放大非法商品风险成为新执法重点\n4. 8月28日前须提交整改计划，两个月窗口期至关重要\n5. 叠加：DSA罚款+关税改革+消费者保护+数据跨境四线监管，建议建立一体化欧洲合规体系',
    tags: ['Temu', 'DSA', '罚款', '欧盟', '跨境电商', '非法商品', 'VLOP'],
    link: 'https://ishare.ifeng.com/c/s/v002exCtFEx5VnGjLJWEX1ci--3KZ5Z-_pxFmp1NSlTSItC0U__',
    isNew: true,
  },
  {
    id: 'e37',
    source: '欧盟委员会/ENISA',
    date: '2026-05-26',
    heat: 8,
    title: 'NIS合作组就网络安全事件报告通用模板达成一致：24小时预警、72小时通知、1个月最终报告',
    summary:
      '2026年5月26日，由欧盟成员国、欧盟委员会及欧盟网络安全局（ENISA）组成的NIS合作组就网络安全事件报告的通用模板达成一致。根据NIS2指令，关键基础设施运营商和数字服务提供商在发现重大网络安全事件后，必须分步报告：24小时内提交早期预警、72小时内提交事件通知、1个月内提交最终报告。统一模板解决了此前各成员国报告格式不一致的问题，将大幅降低跨国企业在不同成员国运营时的合规复杂性。这标志着NIS2指令从立法框架正式进入全面实操合规阶段。',
    overallImpact:
      '这是NIS2指令实施过程中的关键里程碑事件。在ENISA协调下，欧盟27个成员国和企业之间形成了统一的数据收集标准，将为ENISA编制两年一度的欧盟网络安全状况报告提供标准化数据基础。对于在欧盟多国运营的云服务商和数字基础设施提供商而言，这意味着可以用一套统一的报告流程和格式履行所有成员国的报告义务，大幅降低合规成本。',
    industryImpact:
      '对在欧盟运营的中国云服务商和数字服务企业：\n\n1. 安全运营升级：必须建立7×24小时的安全监控和事件检测能力，确保在事件发生后24小时内完成初步评估并提交预警\n2. 报告流程优化：建议参照NIS2统一模板完善内部安全事件响应手册和报告流程\n3. 合规团队配置：考虑到分步报告的复杂性（24h→72h→1个月），建议配备专门的NIS2合规岗位\n4. 风险管理整合：NIS2要求企业展示持续的网络安全风险管理，统一模板为审计提供了更清晰的参照标准\n5. 注意：NIS2违规罚款最高可达全球年营收2%或1000万欧元（以较高者为准），管理层需承担个人责任',
    tags: ['NIS2', 'ENISA', '网络安全', '事件报告', '模板', '关键基础设施'],
    link: 'https://digital-strategy.ec.europa.eu/en/news',
    isNew: true,
  },
  {
    id: 'e38',
    source: '欧盟委员会',
    date: '2026-05-22',
    heat: 9,
    title: '欧盟委员会发布DMA第三年度报告：执法范围向云计算和AI扩展，对谷歌Meta行动加速',
    summary:
      '2026年5月22日，欧盟委员会发布DMA第三年度报告，系统回顾DMA全面实施两年来的执法成果与监管扩展方向。报告核心要点包括：1）DMA首批罚款落地——对苹果（5亿欧元）和Meta（2亿欧元）开出罚单，2026年5月拟对谷歌开出近10亿欧元史上最高DMA罚单；2）DMA执法范围正快速扩展至云计算领域（AWS/Azure守门人认定程序进行中）和人工智能领域（Android系统级AI能力开放、AI搜索纳入监管）；3）欧洲议会呼吁对Meta和苹果罚款力度不足，要求加强执法。报告强调DMA作为面向未来的法案，需持续适应数字市场变化。',
    overallImpact:
      'DMA第三年度报告确认了欧盟数字市场监管的两个核心趋势：第一，从平台服务向云计算和AI等新兴领域的监管扩展；第二，罚款力度不足以遏制违规行为的认识正在欧盟机构内形成共识，这意味着未来罚单可能大幅提高。对于所有守门人平台和潜在守门人，这意味着合规压力将持续上升，合规成本将进一步增加。',
    industryImpact:
      '对中国出海企业的战略启示：\n\n1. 云计算机会：DMA将AWS/Azure纳入守门人调查可能为阿里云、华为云在欧洲创造更公平的竞争环境\n2. AI监管明确：AI搜索和AI助手将被纳入DMA核心平台服务监管范围，相关企业需评估潜在的守门人触发风险\n3. 执法升级预警：欧洲议会认为当前罚款力度不足，意味着后续DMA执法可能开出更高金额罚单\n4. 合规投入：建议在欧用户数接近守门人门槛（4500万月活）的企业提前部署合规团队和整改路线图',
    tags: ['DMA', '年度报告', '欧盟', '云计算', 'AI', '执法', '守门人'],
    link: 'https://digital-strategy.ec.europa.eu/en/news',
    isNew: true,
  },
  {
    id: 'e16',
    source: '欧盟委员会',
    date: '2026-04-29',
    heat: 10,
    title: '欧盟委员会发布DMA审查报告，启动云计算和AI市场的守门人监管程序',
    summary:
      '2026年4月29日，欧盟委员会发布DMA首次审查报告，正式将监管焦点转向云计算和人工智能领域。报告披露监管机构正在调查亚马逊AWS和微软Azure是否应指定为云服务领域的DMA"守门人"，同时审查AI服务是否需要被归类为"核心平台服务"中的"虚拟助手"。欧盟表示DMA的设计初衷是"面向未来"以应对新兴挑战。苹果已对此提出批评。',
    overallImpact:
      '这是DMA监管范围的重大扩展，云计算和AI巨头将面临类似应用商店的严格义务，如数据共享、互操作性和反自我优待。',
    industryImpact:
      '中国云服务商（阿里云、华为云等）和AI企业需密切关注DMA适用范围扩展的立法进程。若AWS和Azure被指定为守门人，可能为中国云服务商在欧洲市场创造更公平的竞争环境。',
    tags: ['DMA', '云计算', 'AI', '亚马逊', '微软', '守门人'],
    link: 'https://finance.sina.cn/usstock/mggd/2026-04-29/detail-inhwaxzr1296755.d.html',
    isNew: true,
  },
  {
    id: 'e15',
    source: '欧盟委员会',
    date: '2026-04-25',
    heat: 10,
    title: '希音 (SHEIN) 正式被欧盟指定为 DSA 下的超大型在线平台 (VLOP)',
    summary:
      '欧盟委员会于2026年4月25日正式宣布指定 SHEIN 为 VLOP。自此，SHEIN 必须在四个月内全面履行 DSA 框架下最严格的合规义务，包括年度风险评估、算法透明度审计及针对非法商品的强制治理措施。',
    overallImpact:
      'SHEIN 正式进入欧盟委员会的直接监管名单，标志着中国出海电商全面步入“高压合规”时代。',
    industryImpact:
      '企业需立即构建符合 DSA 要求的系统性合规体系，尤其是供应链审核和商品安全治理。',
    tags: ['SHEIN', 'DSA', 'VLOP', '跨境电商'],
    link: 'https://ec.europa.eu/commission/presscorner/detail/en/ip_24_2326',
    isNew: true,
  },
  {
    id: 'e14',
    source: '欧盟委员会',
    date: '2026-04-23',
    heat: 10,
    title: '欧盟对 TikTok Lite 启动 DSA 正式调查，聚焦其“任务与奖励”机制',
    summary:
      '2026年4月23日，欧盟委员会开启针对 TikTok Lite 的正式调查。调查重点在于其奖励机制是否具有致瘾性，以及 TikTok 是否违反了在上线新功能前提交风险评估的程序义务。',
    overallImpact:
      '这是 DSA 历史上首个针对 product 功能设计逻辑而非内容的正式调查案件，具有极强的先例意义。',
    industryImpact:
      '出海 App 需自查所有“任务、签到、积分”等游戏化设计，确保符合 DSA 关于未成年人保护的要求。',
    tags: ['TikTok', 'DSA', '成瘾性设计', '未成年人保护'],
    link: 'https://ec.europa.eu/commission/presscorner/detail/en/ip_24_2244',
    isNew: true,
  },
  {
    id: 'e12',
    source: '欧盟委员会',
    date: '2024-03-04',
    heat: 10,
    title: '欧盟对苹果处以 18.4 亿欧元罚款，因滥用音乐流媒体市场支配地位',
    summary:
      '2024年3月，欧盟委员会认定苹果利用 App Store 的主导地位，通过“反引导”条款限制 Spotify 等竞争对手告知用户更便宜的订阅方式，罚款 18.4 亿欧元。',
    overallImpact:
      '这是欧盟对苹果开出的首张巨额反垄断罚单，直接导致了后续 DMA 监管框架中对应用商店“反引导”行为的严格禁止。',
    industryImpact:
      '开发者获得了绕过平台支付并直接与用户沟通价格的权利，显著降低了订阅类应用的渠道成本。',
    tags: ['苹果', '反垄断', '音乐流媒体', '欧盟'],
    link: 'https://ec.europa.eu/commission/presscorner/detail/en/ip_24_1161',
    isNew: false,
  },
  {
    id: 'e13',
    source: '欧盟委员会',
    date: '2025-07-28',
    heat: 9,
    title: '欧盟启动对 Temu 的 DSA 调查，聚焦非法商品与算法透明度',
    summary:
      '欧盟委员会对跨境电商平台 Temu 展开正式调查，指控其在打击平台非法商品销售、防止成瘾性设计及保护消费者权益方面存在重大缺陷。',
    overallImpact:
      '此举标志着欧盟开始对中国新兴跨境电商平台实施与亚马逊、eBay 同等强度的合规监管。',
    industryImpact:
      '中国出海电商需建立更完备的商品合规审核机制，应对欧盟日益严格的消费者安全保护要求。',
    tags: ['Temu', 'DSA', '跨境电商', '产品安全'],
    link: 'https://ec.europa.eu/commission/presscorner/detail/en/ip_24_5622',
    isNew: true,
  },
  {
    id: 'e10',
    source: '欧盟委员会',
    date: '2025-09-05',
    heat: 10,
    title: '欧盟对谷歌处以 29.5 亿欧元反垄断罚款，涉广告技术 (AdTech) 领域',
    summary:
      '2025年9月5日，欧盟委员会认定谷歌利用其在在线显示广告技术链条中的支配地位，优待自有的广告交易平台，损害了竞争对手和在线出版商的利益，处以 29.5 亿欧元罚款。',
    overallImpact:
      '这是欧盟对大型科技公司广告垄断行为的一次重大打击，旨在打破封闭的广告生态系统，促进行业公平竞争。',
    industryImpact:
      '中国出海开发者应关注数字广告产业链的透明化趋势，评估未来广告变现渠道多样化的可能性，减少对单一平台的路径依赖。',
    tags: ['谷歌', '反垄断', 'AdTech', '欧盟'],
    link: 'https://ec.europa.eu/commission/presscorner/detail/en/ip_24_4512',
    isNew: false,
  },
  {
    id: 'e11',
    source: '英国 CMA',
    date: '2026-02-24',
    heat: 8,
    title: '英国监管机构接受苹果与谷歌关于移动生态系统公平竞争的合规承诺',
    summary:
      '英国 CMA 宣布正式接受苹果和谷歌提交的自愿合规承诺，涉及应用商店审核透明度、浏览器互操作性等方面。相关承诺已于 2026 年 4 月 1 日正式生效。',
    overallImpact:
      '这体现了英国在后脱欧时代对数字市场采取的一种新型、更具互动性的监管模式，通过法律约束性承诺实现快速整改。',
    industryImpact:
      '在英国市场运营的中国企业将受益于更透明的平台审核流程，有助于降低合规风险和运营成本。',
    tags: ['苹果', '谷歌', '英国 CMA', 'DMCC'],
    link: 'https://www.gov.uk/government/news/cma-accepts-commitments-from-google-and-apple',
    isNew: true,
  },
  {
    id: 'e8',
    source: '欧盟委员会',
    date: '2026-04-16',
    heat: 9,
    title: '欧盟拒绝 Meta 的 WhatsApp AI 开放方案，称其"变相收费"',
    summary:
      '2026年4月16日，欧盟委员会正式拒绝了 Meta 提出的关于第三方 AI 助手接入 WhatsApp 的商业补偿方案。Meta 原计划对每次互操作性查询收取费用，但欧盟认定这种"按次计费"模式实质上构成了对竞争对手的准入壁垒，违反了 DMA 关于互操作性的公平原则。欧盟已准备实施临时措施，强制 Meta 免费或按成本价开放接口。',
    overallImpact:
      '此举展示了欧盟在 AI 互操作性上的强硬立场。监管机构不希望守门人利用其社交生态优势，通过商业门槛限制 AI 领域的竞争。',
    industryImpact:
      '中国 AI 出海企业应关注 WhatsApp 接口的开放进度，这为第三方 AI 助手进入欧洲社交生态打开了大门，但需严格遵守 GDPR 要求。',
    tags: ['Meta', 'WhatsApp', 'AI', 'DMA', '互操作性'],
    link: 'https://www.politico.eu/article/eu-rejects-meta-ai-whatsapp-access-proposal/',
    isNew: true,
  },
  {
    id: 'e9',
    source: '欧盟委员会',
    date: '2026-03-26',
    heat: 8,
    title: '欧盟启动对 Snapchat 的正式 DSA 调查，聚焦未成年人保护',
    summary:
      '2026年3月26日，欧盟委员会宣布对 Snapchat 启动正式调查，评估其是否违反了《数字服务法》（DSA）中关于未成年人保护和算法透明度的规定。调查重点在于 Snapchat 的算法推荐系统是否诱导了未成年人的成瘾行为，以及平台在识别和限制非法内容传播方面的机制是否有效。',
    overallImpact:
      'Snapchat 成为继 TikTok 之后又一个因未成年人保护问题受到 DSA 严厉监管的大型平台。这表明欧盟对社交平台的监管重心正全面转向保护弱势群体。',
    industryImpact:
      '所有面向年轻人的社交应用必须立即升级其年龄验证和内容过滤机制。不合规将面临最高全球营收 6% 的罚款。',
    tags: ['Snapchat', 'DSA', '未成年人保护', '算法透明度'],
    link: 'https://ec.europa.eu/commission/presscorner/detail/en/ip_23_4227',
    isNew: true,
  },
  {
    id: 'e7',
    source: '欧盟委员会',
    date: '2026-04-22',
    heat: 9,
    title: '欧盟委员会抨击苹果DMA互操作性进展：56项请求无一落实',
    summary:
      '2026年4月22日，欧盟委员会在一份内部评估报告中批评苹果公司在《数字市场法》（DMA）下的互操作性义务落实进度极其缓慢。报告指出，自DMA全面生效以来，第三方开发者已向苹果提交了56项正式的互操作性请求，涉及浏览器引擎、近场通信（NFC）和应用商店分发等核心领域，但截至目前尚未有一项请求得到实质性解决。欧盟警告称，若苹果继续采取"拖延战术"，将面临新一轮更高金额的处罚。',
    overallImpact:
      '互操作性是DMA的核心支柱，旨在打破大型平台的封闭生态。苹果目前的"请求制"被证明效率低下，欧盟可能介入干预，强制实施更透明、标准化的互操作性流程。',
    industryImpact:
      '中国出海开发者应关注苹果后续开放的底层API，尤其是NFC和浏览器引擎，并积极提交互操作性请求以争取技术优势。',
    tags: ['苹果', 'DMA', '互操作性', '欧盟委员会'],
    link: 'https://fsfe.org/news/2024/news-20240322-01.en.html',
    isNew: true,
  },
  {
    id: 'e1',
    source: '欧盟委员会',
    date: '2026-04-20',
    heat: 10,
    title: '欧盟委员会对苹果处以5亿欧元DMA违规罚款，创单一案件新高',
    summary:
      '欧盟委员会于2026年4月20日宣布对苹果公司处以5亿欧元罚款，成为DMA生效以来金额最高的单一执法案件。处罚理由是苹果未能遵守DMA关于允许开发者引导用户至替代支付渠道的义务。苹果被要求在30天内完成整改，包括移除对开发者使用外部支付链接的限制和降低外部支付佣金。',
    overallImpact:
      '此案确立了DMA执法的严厉基调，5亿欧元罚款金额远超此前多数反垄断处罚。其他守门人平台(谷歌、Meta、亚马逊等)将加速自查合规状况。苹果案的整改方案也将成为后续类似案件的参照标准。',
    industryImpact:
      '中国iOS应用在欧盟区将直接受益于苹果的整改措施。开发者应准备好在应用内添加外部支付引导链接，并评估12%佣金率对收入的提升。建议法务团队与苹果开发者支持沟通，确保第一时间启用新政策。',
    tags: ['苹果', 'DMA', '欧盟委员会', '罚款'],
    link: 'https://ec.europa.eu/commission/presscorner/detail/en/ip_24_1689',
    isNew: true,
  },
  {
    id: 'e2',
    source: '爱尔兰DPC',
    date: '2026-04-14',
    heat: 8,
    title: 'Meta因定向广告数据合规问题被爱尔兰DPC追加罚款3.2亿欧元',
    summary:
      '爱尔兰数据保护委员会(DPC)作为Meta在欧盟的主要监管机构，于2026年4月14日宣布追加对Meta的3.2亿欧元罚款。调查发现Meta在Instagram和WhatsApp业务中未能充分证明其"合法利益"法律依据的有效性，且用户对广告投放的数据使用缺乏明确退出机制。',
    overallImpact:
      '此案明确了GDPR下"合法利益"作为数据处理依据的严格适用条件，对依赖该依据进行广告变现的平台构成重大合规风险。数字广告行业可能需要大规模转向"同意"模式，这会显著降低广告定向精准度和eCPM。',
    industryImpact:
      '采用广告模式的中国出海应用应立即审查在欧盟区的数据处理法律依据。建议从"合法利益"转向明确的用户"同意"模式，虽然短期可能影响广告收入，但长期有助于避免巨额罚款。',
    tags: ['Meta', 'GDPR', '爱尔兰DPC', '定向广告'],
    link: 'https://www.dataprotection.ie/en/news-media/press-releases',
    isNew: true,
  },
  {
    id: 'e3',
    source: '法国CNIL',
    date: '2026-04-15',
    heat: 9,
    title: '法国CNIL对两家中国跨境电商应用开出1200万欧元罚单，涉及数据跨境传输',
    summary:
      '法国国家信息与自由委员会(CNIL)于2026年4月15日宣布对两家中国跨境电商应用处以总计1200万欧元罚款，指控其在未经充分保障措施的情况下将法国用户个人数据传输至中国服务器。CNIL认定相关企业未能提供与GDPR同等级别的数据保护水平，也未签署欧盟委员会认可的标准合同条款(SCC)。',
    overallImpact:
      '此案凸显了中国出海应用在欧洲面临的数据跨境传输合规挑战。在缺乏欧盟充分性认定的情况下，向第三国传输数据需要严格的补充措施。此案可能引发其他欧盟成员国对类似应用的连锁调查。',
    industryImpact:
      '所有在欧盟运营且数据存储在中国的应用应立即进行数据跨境传输审计。建议将欧盟用户数据本地化存储在欧盟境内，或确保签署最新版SCC并实施补充技术措施(如端到端加密)。',
    tags: ['CNIL', '跨境数据传输', '跨境电商', 'GDPR'],
    link: 'https://www.cnil.fr/en/news',
    isNew: true,
  },
  {
    id: 'e4',
    source: '英国OFSI',
    date: '2026-03-30',
    heat: 8,
    title: '英国OFSI对苹果子公司罚款39万英镑，因违反俄罗斯金融制裁规定',
    summary:
      '英国金融制裁执行办公室(OFSI)于2026年3月19日对苹果爱尔兰子公司Apple Distribution International处以39万英镑罚款。该公司于2022年6月至7月期间通过其控制的英国银行账户，向已被列入英国制裁名单的俄罗斯流媒体平台Okko支付了总计63.5万英镑（两笔分别为35.6万英镑和27.9万英镑）。OFSI认定ADI依赖关联方处理支付和制裁筛查，未主动获取Okko的所有权变更信息，也未及时取消已发出的支付指令。该案是OFSI首次依据2026年2月新引入的和解框架处理的处罚案件。',
    overallImpact:
      '此案是OFSI首次通过新和解框架处理的金融制裁案件，具有里程碑意义。OFSI明确强调：非英国企业通过英国银行系统进行支付即构成英国境内行为，必须遵守英国制裁法规；企业不能仅依赖第三方合规工具和自我认证，必须建立自主的、主动的制裁筛查机制。基准罚款60万英镑因主动披露和配合调查经35%折扣后降至39万英镑，但案件严重程度被评为"严重"级别，表明即使是非故意违规也不会被免除责任。',
    industryImpact:
      '对在欧洲运营的中国科技企业有四点关键启示：第一，任何通过英国银行处理支付的实体，无论注册地在哪里，都须遵守英国制裁法规；第二，仅依赖第三方制裁筛查工具和开发者自我认证是不够的，企业必须建立自主的风险评估机制；第三，对高风险司法管辖区（如俄罗斯）的合作方，应主动、持续地监控其所有权变更；第四，发现违规后立即主动披露并配合调查，可显著降低罚款金额（最高可获30%折扣）。建议所有涉及跨境支付的出海应用尽快审计现有的制裁合规框架。',
    tags: ['苹果', 'OFSI', '俄罗斯制裁', '金融制裁'],
    link: 'https://www.gov.uk/government/news/ofsi-imposes-fine-on-apple-subsidiary-for-financial-sanctions-breaches',
    isNew: true,
  },
  {
    id: 'e5',
    source: '德国BKA',
    date: '2026-04-11',
    heat: 7,
    title: '德国联邦卡特尔局启动对Google Play商店搜索排序算法的反垄断调查',
    summary:
      '德国联邦卡特尔局(Bundeskartellamt)于2026年4月11日宣布对Google Play商店的搜索排序算法展开正式反垄断调查。调查焦点是谷歌是否在搜索结果中优先展示自家应用和服务，从而损害第三方应用的可见性和下载量。BKA同时调查谷歌是否利用应用排名数据优化其自有产品的竞争力。',
    overallImpact:
      '此案直指应用商店核心商业模式——搜索和推荐算法的公正性。若调查确认谷歌存在自我偏好行为，可能迫使谷歌公开其搜索排序算法的核心逻辑或实施更中立的结果展示。这将深刻改变应用发现生态。',
    industryImpact:
      '中国出海Android应用长期面临在Google Play上可见度不足的挑战。此案若促成算法透明化，将为所有第三方应用创造更公平的竞争环境。建议相关企业收集自身应用在Play Store搜索排名的数据，为未来可能的集体行动做准备。',
    tags: ['Google Play', '德国BKA', '反垄断', '搜索算法'],
    link: 'https://www.bundeskartellamt.de/SharedDocs/Meldung/EN/Pressemitteilungen/2023/21_06_2023_Google_Play_Store.html',
    isNew: true,
  },
  {
    id: 'e6',
    source: '荷兰AP',
    date: '2026-04-08',
    heat: 6,
    title: '荷兰数据保护局对TikTok开出750万欧元罚款，指控儿童数据保护不足',
    summary:
      '荷兰数据保护局(Autoriteit Persoonsgegevens)于2026年4月8日宣布对TikTok处以750万欧元罚款，指控其在荷兰市场未能充分保护16岁以下用户的数据隐私。具体违规行为包括：默认公开儿童用户账户设置、未获得家长有效同意、以及向儿童展示个性化广告。',
    overallImpact:
      '此案强化了欧盟对儿童数字隐私保护的执法力度，与GDPR和即将出台的《儿童数字权利法案》形成呼应。所有面向青少年的社交平台需要全面审查其隐私设置默认选项、同意机制和数据使用策略。儿童数据保护正成为监管执法的重点领域。',
    industryImpact:
      '面向年轻用户的中国社交和内容应用必须立即审视其年龄验证和家长同意机制。建议实施更严格的年龄验证技术，默认设置最高隐私保护级别，并在获得家长明确同意前限制数据收集。',
    tags: ['TikTok', '儿童隐私', '荷兰AP', 'GDPR'],
    link: 'https://www.autoriteitpersoonsgegevens.nl/en/news',
    isNew: true,
  },
];

const regulatoryCalendar: RegulatoryEvent[] = [
  { date: '2026-05-01', title: '苹果外部支付新政策欧盟生效' },
  { date: '2026-05-15', title: 'DMA守门人合规报告提交截止' },
  { date: '2026-06-01', title: 'AI Act高风险AI系统禁令全面执行' },
  { date: '2026-06-15', title: '欧盟委员会预计发布DSA透明度报告审核结果' },
  { date: '2026-07-01', title: 'GDPR跨境数据传输SCC新版强制采用' },
];

export default function Enforcement() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <HeroSection
        title="执法动态与监管案例"
        subtitle="Enforcement Actions & Regulatory Cases"
        description="追踪欧盟数字监管机构执法行动、重大处罚案例与合规趋势"
      />

      {/* Stats Section */}
      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {enforcementStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-[#e5e5e5] rounded-xl p-6 text-center"
              >
                <div className="text-2xl font-bold text-[#171717]">
                  {stat.value}
                </div>
                <div className="text-sm text-[#525252] mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Cases */}
      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-xl font-bold text-[#171717] pb-3 border-b border-[#e5e5e5] mb-6">
            重大执法案例
            <span className="text-sm font-normal text-[#737373] ml-2">
              共 {enforcementCases.length} 条
            </span>
          </h2>
          <div className="flex flex-col gap-6">
            {[...enforcementCases].sort((a, b) => b.date.localeCompare(a.date)).map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Calendar */}
      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-xl font-bold text-[#171717] pb-3 border-b border-[#e5e5e5] mb-6">
            监管日历
            <span className="text-sm font-normal text-[#737373] ml-2">
              共 {regulatoryCalendar.length} 条
            </span>
          </h2>
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-6">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[68px] top-0 bottom-0 w-px bg-[#e5e5e5]" />

              <div className="flex flex-col gap-6">
                {[...regulatoryCalendar].sort((a, b) => b.date.localeCompare(a.date)).map((event, index) => (
                  <div key={index} className="flex items-start gap-4 relative">
                    {/* Date */}
                    <div className="w-16 text-xs text-[#737373] font-medium text-right shrink-0 pt-1">
                      {event.date}
                    </div>

                    {/* Dot */}
                    <div className="w-3 h-3 rounded-full bg-[#2563eb] shrink-0 relative z-10 mt-0.5 ring-4 ring-white" />

                    {/* Content */}
                    <div className="text-sm text-[#525252] leading-relaxed pt-0.5">
                      {event.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
