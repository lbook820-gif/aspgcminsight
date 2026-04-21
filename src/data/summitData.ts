// 生态峰会动态数据
// 按时间顺序排列（2026年4月-10月）

export interface Summit {
  id: string;
  name: string;           // 主题/名称
  date: string;           // 时间
  location: string;       // 地点
  coreAreas: string[];    // 核心领域
  highlights: string;     // 看点
  sourceUrl: string;      // 信息来源链接
  sourceName: string;     // 来源名称
}

export const summitData: Summit[] = [
  // 2026年4月
  {
    id: '1',
    name: 'MIT AI Conference (Paris Edition)',
    date: '2026年4月14日',
    location: '法国巴黎',
    coreAreas: ['人工智能', '技术战略', '数字化未来'],
    highlights: '由麻省理工学院工业联络计划（ILP）主办，侧重于学术前沿与企业应用的结合，适合寻找AI领域技术趋势和战略洞察的专业人士。',
    sourceUrl: 'https://business20channel.tv/top-10-ai-events-in-2026-leading-conferences-in-london-uk-europe-us-saudi-arabia-singapore-dubai-china-and-germany-3-december-2025',
    sourceName: 'Business 2.0 Channel',
  },
  {
    id: '2',
    name: 'infra/CAPITAL 2026',
    date: '2026年4月15-16日',
    location: '美国',
    coreAreas: ['超大规模AI基础设施', '数据中心', '云基础设施投资', '数字连接'],
    highlights: '该会议汇聚了全球顶尖的AI算力提供商、云服务运营商以及数字基础设施投资者，是探讨"AI如何重塑数据中心与云架构"的绝佳平台。',
    sourceUrl: 'https://www.ctomagazine.com/top-fintech-conferences-2026/',
    sourceName: 'CTO Magazine',
  },
  {
    id: '3',
    name: 'The IFD 2026 Meetings',
    date: '2026年4月15日',
    location: '待定',
    coreAreas: ['金融创新', '支付', '金融科技'],
    highlights: '由Finance Innovation组织，通常涵盖金融科技（FinTech）领域的最新趋势，包括支付技术革新和银行数字化转型。',
    sourceUrl: 'https://www.ctomagazine.com/top-fintech-conferences-2026/',
    sourceName: 'CTO Magazine',
  },
  {
    id: '4',
    name: 'Money 20/20 Asia',
    date: '2026年4月21-23日',
    location: '泰国曼谷',
    coreAreas: ['东盟实时支付', '数字钱包', '超级应用', '跨境商务'],
    highlights: '亚洲领先的金融科技峰会，聚焦东南亚支付生态、数字钱包创新和跨境支付解决方案。',
    sourceUrl: 'https://www.ctomagazine.com/top-fintech-conferences-2026/',
    sourceName: 'CTO Magazine',
  },

  // 2026年5月
  {
    id: '5',
    name: 'Machine Learning Prague 2026',
    date: '2026年5月4-6日',
    location: '捷克布拉格',
    coreAreas: ['机器学习', '深度学习', '负责任AI'],
    highlights: '欧洲知名机器学习会议，强调应用机器学习、深度学习和负责任AI。技术研讨会和专家讲座吸引从业者和研究人员。',
    sourceUrl: 'https://ainextconference.com/top-ai-conferences-to-attend-in-2026/',
    sourceName: 'AI Next Conference',
  },
  {
    id: '6',
    name: 'IEEE AI 2026',
    date: '2026年5月8-10日',
    location: '西班牙格拉纳达',
    coreAreas: ['学术研究', '伦理AI系统', '下一代算法'],
    highlights: 'IEEE AI 2026强调学术研究、伦理AI系统和下一代算法。吸引研究人员、政策专家和技术人员从事基础AI挑战和长期创新。',
    sourceUrl: 'https://ainextconference.com/top-ai-conferences-to-attend-in-2026/',
    sourceName: 'AI Next Conference',
  },
  {
    id: '7',
    name: 'Dubai FinTech Summit 2026',
    date: '2026年5月11-12日',
    location: '阿联酋迪拜',
    coreAreas: ['数字资产', '支付与跨境走廊', '嵌入式金融', 'AI与数据决策', '财富科技'],
    highlights: '由迪拜国际金融中心（DIFC）主办，汇聚金融机构、金融科技初创公司、投资者和监管机构。探讨数字银行、区块链、AI金融、开放银行等前沿话题。',
    sourceUrl: 'https://dubaifintechsummit.com/',
    sourceName: 'Dubai FinTech Summit',
  },
  {
    id: '8',
    name: 'Google I/O 2026',
    date: '2026年5月19-20日',
    location: '美国加州山景城',
    coreAreas: ['Gemini AI', 'Android', 'AI突破', '开发者工具'],
    highlights: 'Google年度开发者大会，预计发布新一代Gemini AI模型、Android更新和AI产品路线图。主题演讲、产品演示和开发者工具更新。',
    sourceUrl: 'https://blog.google/innovation-and-ai/technology/developers-tools/io-2026-save-the-date/',
    sourceName: 'Google Blog',
  },

  // 2026年6月
  {
    id: '9',
    name: 'Money 20/20 Europe',
    date: '2026年6月2-4日',
    location: '荷兰阿姆斯特丹',
    coreAreas: ['欧洲金融科技', '合作伙伴关系', '高管网络'],
    highlights: '欧洲领先的金融科技活动，汇聚C级高管、银行家和金融科技领袖，探讨支付创新、开放银行和数字金融。',
    sourceUrl: 'https://www.ctomagazine.com/top-fintech-conferences-2026/',
    sourceName: 'CTO Magazine',
  },
  {
    id: '10',
    name: 'Apple WWDC 2026',
    date: '2026年6月8-12日',
    location: '美国加州库比蒂诺',
    coreAreas: ['iOS 27', 'macOS 27', 'AI创新', 'Siri与Gemini集成'],
    highlights: 'Apple全球开发者大会，预计发布iOS 27、macOS 27等新版操作系统，展示AI平台创新、开发者工具和新功能。重点关注Siri与Google Gemini的集成进展。',
    sourceUrl: 'https://www.thurrott.com/apple/334090/apples-wwdc-2026-developer-conference-will-kick-off-on-june-8',
    sourceName: 'Thurrott',
  },
  {
    id: '11',
    name: 'Visa Payments Forum',
    date: '2026年6月9-11日',
    location: '美国旧金山',
    coreAreas: ['支付基础设施', '嵌入式支付', '卡网络'],
    highlights: '汇聚2000+支付和基础设施领导者，聚焦支付底层技术架构。了解Visa和更广泛的支付生态系统正在构建的路线图。',
    sourceUrl: 'https://www.loanpro.io/blog/7-fintech-conferences-in-2026-you-cant-afford-to-miss/',
    sourceName: 'LoanPro',
  },
  {
    id: '12',
    name: 'The AI Summit London',
    date: '2026年6月10-11日',
    location: '英国伦敦',
    coreAreas: ['企业AI', 'AI战略', '欧洲AI治理', 'AI伦理'],
    highlights: '伦敦科技周旗舰AI活动，汇聚4500+与会者、300+演讲者。欧洲视角下的AI治理和伦理框架，适合全球组织了解欧洲AI政策。',
    sourceUrl: 'https://www.straiker.ai/blog/your-guide-to-must-attend-ai-and-cybersecurity-conferences-in-2025-2026',
    sourceName: 'Straiker',
  },
  {
    id: '13',
    name: 'SuperAI 2026',
    date: '2026年6月10-11日',
    location: '新加坡',
    coreAreas: ['亚太AI创新', '生成式AI', '跨行业协作'],
    highlights: '聚焦亚太AI创新，突出初创企业、生成式AI突破和跨行业协作。特别适合了解新兴和快速增长市场中的AI应用。',
    sourceUrl: 'https://ainextconference.com/top-ai-conferences-to-attend-in-2026/',
    sourceName: 'AI Next Conference',
  },

  // 2026年7月
  {
    id: '14',
    name: 'AI for Good Global Summit 2026',
    date: '2026年7月7-10日',
    location: '瑞士日内瓦',
    coreAreas: ['AI可持续发展', '医疗AI', '气候行动', '教育AI'],
    highlights: '联合国主办的AI峰会，汇聚技术专家、政策制定者、人道主义组织和研究人员。聚焦AI在医疗、气候行动、教育和灾害响应中的应用。',
    sourceUrl: 'https://business20channel.tv/top-10-ai-events-in-2026-leading-conferences-in-london-uk-europe-us-saudi-arabia-singapore-dubai-china-and-germany-3-december-2025',
    sourceName: 'Business 2.0 Channel',
  },

  // 2026年9月
  {
    id: '15',
    name: 'FinovateFall',
    date: '2026年9月9-11日',
    location: '美国纽约',
    coreAreas: ['银行创新', '7分钟现场演示', '投资者会议'],
    highlights: 'Finovate标志性7分钟现场演示形式，汇聚高级银行决策者和技术实施者。',
    sourceUrl: 'https://www.ctomagazine.com/top-fintech-conferences-2026/',
    sourceName: 'CTO Magazine',
  },
  {
    id: '16',
    name: 'Money20/20 Middle East',
    date: '2026年9月14-16日',
    location: '沙特阿拉伯利雅得',
    coreAreas: ['区域金融创新', 'CBDC', '加密支付'],
    highlights: '中东地区金融科技峰会，聚焦区域金融创新、央行数字货币（CBDC）和加密支付。',
    sourceUrl: 'https://www.ctomagazine.com/top-fintech-conferences-2026/',
    sourceName: 'CTO Magazine',
  },
  {
    id: '17',
    name: 'Sibos 2026',
    date: '2026年9月28日-10月1日',
    location: '美国迈阿密海滩',
    coreAreas: ['跨境支付', '银行创新', '全球金融社区'],
    highlights: '全球金融社区顶级盛会，聚焦跨境支付、银行创新和金融基础设施。',
    sourceUrl: 'https://www.ctomagazine.com/top-fintech-conferences-2026/',
    sourceName: 'CTO Magazine',
  },

  // 2026年10月
  {
    id: '18',
    name: 'World Summit AI 2026',
    date: '2026年10月7-8日',
    location: '荷兰阿姆斯特丹',
    coreAreas: ['生成式AI', 'AI治理', 'AI伦理', '大规模部署'],
    highlights: '全球知名AI平台，聚焦生成式AI、AI治理、伦理和大规模部署。吸引政策制定者、全球企业和AI思想领袖。',
    sourceUrl: 'https://ainextconference.com/top-ai-conferences-to-attend-in-2026/',
    sourceName: 'AI Next Conference',
  },
  {
    id: '19',
    name: 'Money 20/20 USA',
    date: '2026年10月18-21日',
    location: '美国拉斯维加斯',
    coreAreas: ['北美金融科技', '银行', '支付', '投资'],
    highlights: '北美最大的金融科技盛会，汇聚银行、支付、科技和投资领域的领导者。',
    sourceUrl: 'https://www.ctomagazine.com/top-fintech-conferences-2026/',
    sourceName: 'CTO Magazine',
  },
];

// 按日期排序
export const sortedSummitData = [...summitData];
