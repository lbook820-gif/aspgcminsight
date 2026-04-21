// 新闻数据 - 所有新闻均来自可靠来源
// 按日期降序排列（最新的在前）

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  sourceUrl: string;
  summary: string;
  aiComment: {
    overallImpact: string;
    huaweiImpact: string;
  };
  publishDate: string;
  score: number;
  category: string;
  tags: string[];
}

export const newsData: NewsItem[] = [
  {
    id: '40',
    title: 'Aptoide起诉Google垄断Android应用分发，指控其"反竞争封锁"',
    source: 'Reuters / Benzinga',
    sourceUrl: 'https://www.benzinga.com/news/legal/26/04/51822171/android-app-store-provider-hits-google-with-fresh-lawsuit-alleging-monopoly-and-anticompetitive-chokehold-on-rivals',
    summary: '葡萄牙第三方应用商店Aptoide于2026年4月14日在旧金山联邦法院对Google提起反垄断诉讼，指控Google非法垄断Android应用分发和应用内支付系统。Aptoide声称Google的做法造成了"反竞争封锁"，限制了竞争对手的竞争能力。Google被指控通过OEM独家协议、与开发者的独家协议以及为替代平台设置人为壁垒来维持其垄断地位。Aptoide拥有超过4.3亿用户和100万+应用，是全球第三大Android应用商店。',
    aiComment: {
      overallImpact: '这是继Epic Games之后，又一家大型应用商店对Google提起的反垄断诉讼。Aptoide的诉讼利用了Epic案的判决先例，可能进一步迫使Google开放Android生态系统。如果Aptoide胜诉，将加速第三方应用商店的合法化进程，为更多替代商店打开市场。欧盟委员会此前已对Google处以43.4亿欧元罚款，Aptoide也是该案的原告之一。',
      huaweiImpact: 'Aptoide对Google的诉讼对华为AppGallery具有直接参考价值。如果Aptoide胜诉，将进一步削弱Google Play的市场控制力，为华为等第三方商店创造更有利的竞争环境。华为可以密切关注此案进展，同时借鉴Aptoide的法律策略，为未来可能的维权行动做准备。',
    },
    publishDate: '2026-04-14',
    score: 9,
    category: 'googleplay',
    tags: ['Aptoide', 'Google', '反垄断', 'Android', '第三方商店', '垄断'],
  },
  {
    id: '38',
    title: 'Apple将Epic诉讼案上诉至最高法院，寻求推翻外部支付零佣金裁决',
    source: 'TechCrunch / AppleInsider',
    sourceUrl: 'https://techcrunch.com/2026/04/06/apple-epic-games-lawsuit-supreme-court-appeal-app-store-commission/',
    summary: 'Apple于2026年4月6日向美国最高法院提交上诉，寻求审查其与Epic Games关于App Store费用的长期诉讼案。Apple希望最高法院能够暂停第九巡回上诉法院2025年12月的裁决，该裁决认定Apple对外部支付收取27%佣金违反了2021年的反引导禁令。Apple认为降低佣金将"严重影响其商业模式和投资回报能力"。Epic Games CEO Tim Sweeney批评Apple此举"只是为了拖延"。',
    aiComment: {
      overallImpact: '这是Apple与Epic长达六年法律纠纷的最新篇章。若最高法院受理此案，将对整个移动应用生态产生深远影响。Apple试图维持对外部支付的控制权，而开发者则希望获得真正的支付自由。此案结果可能重塑应用商店 economics，影响全球数十亿用户的应用获取成本。',
      huaweiImpact: 'Apple与Epic的诉讼结果为华为AppGallery提供了重要参考。若Apple最终被迫接受零佣金外部支付，将削弱其价格优势，为华为等第三方商店创造机会。华为应密切关注案件进展，同时完善自身支付系统的合规性和竞争力。',
    },
    publishDate: '2026-04-06',
    score: 9,
    category: 'appstore',
    tags: ['Apple', 'Epic Games', 'App Store', '最高法院', '外部支付'],
  },
  {
    id: '39',
    title: 'Google Play Store v51.0发布：AI评论摘要反馈、游戏玩家资料、无需安装游戏',
    source: '9to5Google',
    sourceUrl: 'https://9to5google.com/2026/04/13/april-2026-google-system-updates/',
    summary: 'Google于2026年4月13日发布Google Play Store v51.0更新。新功能包括：用户现在可以针对AI生成的评论摘要提供反馈；可直接从"You"标签页创建游戏玩家资料；可在"You"标签页直接玩部分游戏，无需安装。此外，Google Play services v26.13还带来了设备连接新开发者功能、位置共享API优化、车载系统QR码登录显示设备名称等改进。',
    aiComment: {
      overallImpact: 'Google Play Store的AI功能升级体现了Google在AI应用领域的持续投入。AI评论摘要反馈机制有助于提升摘要质量；游戏玩家资料功能强化了Play Games的社交属性；无需安装游戏则降低了用户体验新游戏的门槛。这些变化将进一步提升Google Play的用户粘性和开发者吸引力。',
      huaweiImpact: '华为AppGallery可以借鉴Google Play的AI功能策略，考虑在应用商店中引入AI驱动的内容推荐和摘要功能。同时，无需安装游戏的体验模式也值得华为学习，可以降低用户尝试新应用的门槛，提升平台活跃度。',
    },
    publishDate: '2026-04-14',
    score: 7,
    category: 'googleplay',
    tags: ['Google Play', 'AI', '游戏', '应用商店', '用户体验'],
  },
  {
    id: '1',
    title: 'Epic Games Store移动端本周免费《Dumb Ways to Die 2》，4月2日起可领取',
    source: 'Epic Games Store',
    sourceUrl: 'https://store.epicgames.com/en-US/news/dumb-ways-to-die-2-the-games-free-april-2-epic-games-store-mobile',
    summary: 'Epic Games Store宣布从4月2日至9日，移动端用户可以免费下载《Dumb Ways to Die 2: The Games》。该游戏支持全球Android设备和欧盟地区iOS设备。这是Epic Games Store移动端每周免费游戏计划的最新一期，延续了其在移动游戏分发领域的积极布局。',
    aiComment: {
      overallImpact: 'Epic Games Store通过持续的免费游戏策略吸引用户，巩固其在移动端第三方应用商店的地位。这一策略与Google Play和App Store形成差异化竞争，有助于培养用户习惯并扩大市场份额。',
      huaweiImpact: 'Epic的免费游戏策略对华为AppGallery具有借鉴意义。华为可考虑引入类似的限时免费或独家优惠机制，吸引用户关注并提升平台活跃度。',
    },
    publishDate: '2026-04-02',
    score: 5,
    category: 'thirdparty',
    tags: ['Epic Games', '免费游戏', '移动游戏', '游戏分发'],
  },
  {
    id: '2',
    title: 'Meta发布2026年DMA合规报告：WhatsApp互操作进展、广告透明度提升等六大举措',
    source: 'Meta / EU Digital Markets Act Compliance',
    sourceUrl: 'https://digital-markets-act.ec.europa.eu/meta-commits-give-eu-users-choice-personalised-ads-under-digital-markets-act-2025-12-08_en',
    summary: 'Meta发布2026年DMA合规进展报告，详细披露六大核心举措：WhatsApp与Messenger第三方互操作性（首批BirdyChat、Haiket已接入）、Facebook Marketplace买家保护机制、广告透明度提升（新增广告定位信息）、数据可携带性增强、禁止利用竞争对手数据、以及为欧盟用户提供更多选择权。Meta同时推出"隐私中心"新界面，方便用户管理数据偏好。',
    aiComment: {
      overallImpact: 'Meta作为首个发布完整DMA合规报告的"守门人"平台，为行业树立了标杆。其六大举措涵盖互操作性、广告透明度、数据可携带性等核心领域，展示了大型平台如何在监管压力下进行系统性调整。这一报告为其他平台（如苹果、谷歌）的合规工作提供了参考框架。',
      huaweiImpact: 'Meta的合规实践为华为提供了重要参考。华为若未来进入欧洲市场，需提前研究DMA合规要求。WhatsApp互操作机制的技术实现细节对华为消息应用（畅连）具有借鉴价值。',
    },
    publishDate: '2026-03-10',
    score: 9,
    category: 'dma',
    tags: ['Meta', 'DMA', '合规报告', 'WhatsApp', '互操作性', '广告透明度'],
  },
  {
    id: '3',
    title: 'WhatsApp在欧盟启用与第三方应用互操作，BirdyChat和Haiket首批接入',
    source: 'Engadget / Mobile World Live',
    sourceUrl: 'https://www.engadget.com/apps/whatsapp-enables-interoperability-with-two-other-messengers-in-the-eu-140000835.html',
    summary: 'Meta宣布WhatsApp在欧洲启用与第三方消息应用的互操作性，以符合欧盟DMA要求。BirdyChat（拉脱维亚）和Haiket成为首批接入的两款应用。用户可选择启用"第三方聊天"功能，与这两款应用的用户发送消息、图片、语音、视频和文件，所有通信均使用端到端加密。群聊功能将在后续推出。',
    aiComment: {
      overallImpact: '这是DMA实施后首个大型消息平台开放互操作的实际案例，标志着欧盟监管政策开始产生实质性影响。Signal Protocol成为事实上的行业标准。这为其他被认定为"守门人"的平台（如苹果的iMessage）树立了先例，预示着数字生态系统可能从封闭走向开放。',
      huaweiImpact: '华为消息应用（如畅连）未来若进入欧洲市场，理论上也可申请与WhatsApp互操作。这为华为提供了一个绕过GMS限制、直接进入主流消息生态的潜在路径。华为应密切关注Meta的互操作技术标准和审核流程，为未来合规做准备。',
    },
    publishDate: '2025-11-14',
    score: 9,
    category: 'dma',
    tags: ['WhatsApp', 'DMA', 'BirdyChat', 'Haiket', '互操作性', '欧盟'],
  },
  {
    id: '4',
    title: 'Epic Games裁员20%，CEO Tim Sweeney承认扩张过度',
    source: 'CBS News / PC Gamer',
    sourceUrl: 'https://www.cbsnews.com/news/epic-games-layoffs-1000-workers-fortnite-ai/',
    summary: 'Epic Games宣布裁员约1000人，占公司员工总数的20%。CEO Tim Sweeney在内部备忘录中表示，公司扩张过度，支出远超收入。裁员主要影响非核心团队，目的是每年节省约5亿美元运营成本。此次裁员也波及子公司Mediatonic（《糖豆人》开发商）。',
    aiComment: {
      overallImpact: 'Epic Games裁员反映了游戏行业在后疫情时代的调整。Fortnite收入下降、元宇宙项目投入过大是主要原因。此次裁员可能影响Epic Games Store的发展节奏，但核心游戏业务预计不受影响。',
      huaweiImpact: 'Epic的收缩可能减缓其与Google的竞争步伐，为华为等第三方应用商店争取更多时间。华为可关注Epic裁员后的人才流动，吸纳相关技术人才。',
    },
    publishDate: '2026-03-30',
    score: 7,
    category: 'thirdparty',
    tags: ['Epic Games', '裁员', 'Fortnite', '游戏行业'],
  },
  {
    id: '5',
    title: '苹果App Store新增医疗应用标识要求，EEA/UK/US开发者须申报',
    source: 'Apple Developer',
    sourceUrl: 'https://developer.apple.com/news/?id=nyqbfz1y',
    summary: '苹果宣布自2026年3月26日起，App Store将在欧洲经济区(EEA)、英国和美国的产品页面显示应用是否为受监管医疗设备。健康健身类或医疗类应用开发者须在App Store Connect中申报其监管状态，并提供相关监管机构信息（如FDA）。未申报者将在2027年初前无法提交应用更新。',
    aiComment: {
      overallImpact: '这是苹果加强健康医疗应用监管的重要举措，旨在提高用户透明度和安全性。该要求仅针对特定健康医疗类应用，对普通应用无影响。开发者需要额外投入合规成本，可能影响小型医疗应用开发团队。',
      huaweiImpact: '华为AppGallery目前尚无类似的医疗应用标识机制。华为可考虑引入类似功能，提升平台健康应用的可信度，同时借助华为在健康领域的技术积累（如华为健康App）打造差异化优势。',
    },
    publishDate: '2026-03-26',
    score: 6,
    category: 'appstore',
    tags: ['苹果', 'App Store', '医疗应用', '监管合规'],
  },

  {
    id: '6',
    title: 'Fortnite重返Google Play全球上架，Epic与Google和解正式生效',
    source: 'Game Developer',
    sourceUrl: 'https://www.gamedeveloper.com/business/fortnite-back-on-google-play-worldwide-after-epic-and-google-settle',
    summary: '在Epic Games与Google达成和解后，Fortnite正式重返Google Play Store全球上架，结束了近六年的缺席。Epic正在通过"邀请好友"功能推广回归，用户发送邀请可获得专属皮肤奖励。此次和解标志着双方长期法律纠纷的正式结束。',
    aiComment: {
      overallImpact: 'Fortnite重返Google Play是Epic与Google和解的标志性成果。这不仅让Epic重新获得Google Play的庞大用户群，也为其他开发者通过谈判争取更公平的分发条件树立了先例。预计将有更多开发者受益于新的20%佣金政策。',
      huaweiImpact: 'Fortnite的回归主要影响游戏分发领域，对华为直接影响有限。但Epic Games Store作为第三方商店的成功案例，可为华为AppGallery的海外推广提供参考。华为需关注游戏开发者对新政策的反应。',
    },
    publishDate: '2026-03-20',
    score: 8,
    category: 'thirdparty',
    tags: ['Fortnite', 'Epic Games', 'Google Play', '游戏分发'],
  },
  {
    id: '7',
    title: '苹果限制"Vibe Coding"AI编程应用上架，开发者称遭遇审核阻力',
    source: '9to5Mac / The Information',
    sourceUrl: 'https://9to5mac.com/2026/03/18/apple-pushing-back-on-vibe-coding-iphone-apps-developers-say/',
    summary: '据The Information报道，苹果正在阻止Replit、Vibecode等AI辅助编程（"Vibe Coding"）应用在App Store发布更新。苹果援引App Store指南2.5.2条款，称这些应用允许用户通过AI生成可改变应用功能的代码，违反了"应用不能运行改变其自身或其他应用功能的代码"的规定。',
    aiComment: {
      overallImpact: '苹果此举反映了其对AI生成内容监管的早期态度。虽然苹果声称依据的是现有规则而非新政策，但这可能对AI辅助开发工具的创新形成抑制。开发者可能需要调整产品形态或转向Web应用分发以规避限制。',
      huaweiImpact: '苹果对AI编程应用的限制为华为AppGallery提供了差异化机会。华为可借助自身AI芯片和鸿蒙生态优势，吸引这类创新开发者入驻，打造"AI友好型"应用商店的品牌形象。',
    },
    publishDate: '2026-03-18',
    score: 7,
    category: 'appstore',
    tags: ['苹果', 'App Store', 'AI编程', 'Vibe Coding', '审核政策'],
  },
  {
    id: '8',
    title: 'F-Droid警告：谷歌开发者验证计划对开源应用商店构成"生存威胁"',
    source: 'The New Stack',
    sourceUrl: 'https://thenewstack.io/f-droid-says-googles-android-developer-verification-plan-is-an-existential-threat-to-alternative-app-stores/',
    summary: '开源应用商店F-Droid警告，谷歌计划从2026年9月起要求所有侧载应用必须由验证开发者签名。开发者需提供政府ID、支付25美元费用并提交签名密钥给谷歌。F-Droid董事会成员Marc Prud\'hommeaux表示，这一政策可能"杀死F-Droid"，因为该商店目前使用自己的签名分发应用。',
    aiComment: {
      overallImpact: '这一政策标志着Android生态从"开放"向"可控开放"转变。虽然谷歌声称此举为提升安全，但批评者认为这是对匿名开发和开源分发的打击。EFF、软件自由保护协会等组织已签署公开信反对该计划。',
      huaweiImpact: '华为设备主要依赖侧载和第三方商店分发应用，此政策将直接影响华为海外用户的应用获取体验。若华为无法以验证开发者身份参与，其应用分发能力将进一步受限。',
    },
    publishDate: '2026-03-14',
    score: 8,
    category: 'developer',
    tags: ['F-Droid', '开源', '开发者验证', '隐私', '侧载'],
  },
  {
    id: '9',
    title: '苹果App Store中国区佣金下调，标准费率从30%降至25%',
    source: 'Apple Developer / TidBITS',
    sourceUrl: 'https://developer.apple.com/news/?id=dadukodv',
    summary: '苹果宣布自2026年3月15日起调整中国区App Store佣金费率。标准应用内购买和付费应用交易佣金从30%降至25%；小型企业计划和迷你应用合作伙伴计划，以及订阅第一年后的自动续订佣金从15%降至12%。苹果表示此举是与中方监管机构讨论后的结果。',
    aiComment: {
      overallImpact: '这是苹果首次在没有监管强制的情况下主动降低佣金费率，标志着其对中国市场的策略调整。与欧盟DMA框架下的被动合规形成鲜明对比。降价后中国开发者成本降低约16%，但苹果仍保留对支付渠道的控制权。',
      huaweiImpact: '苹果在中国区的降价可能加剧与华为AppGallery的竞争。华为需重新评估其15%佣金策略的竞争力，并考虑是否进一步降价以维持对开发者的吸引力。',
    },
    publishDate: '2026-03-15',
    score: 7,
    category: 'appstore',
    tags: ['苹果', 'App Store', '中国区', '佣金调整'],
  },
  {
    id: '10',
    title: 'Google Play将标记高耗电应用，3月1日起实施电池警告政策',
    source: 'Jerusalem Post / Android Central',
    sourceUrl: 'https://www.jpost.com/business-and-innovation/tech-and-start-ups/article-873752',
    summary: '谷歌宣布自2026年3月1日起，Google Play将对高耗电Android应用实施警告标签。如果应用在24小时内保持设备唤醒超过2小时，将显示"此应用可能更快耗尽手机电池"的警告，并可能在Play Store搜索排名中下降。该政策基于谷歌与三星合作开发的"过度部分唤醒锁"（Excessive Partial Wake Lock）指标。',
    aiComment: {
      overallImpact: '这是Google Play首次对应用电池消耗进行公开标记，标志着平台对应用质量和用户体验的重视程度提升。开发者需要优化后台任务管理，避免不必要的唤醒锁。音乐播放、用户发起的下载等提供用户价值的功能不计入统计。',
      huaweiImpact: '华为AppGallery目前尚无类似的电池警告机制。华为可考虑引入类似功能，提升平台应用质量，同时借助自家电池管理技术优势，打造差异化竞争力。',
    },
    publishDate: '2026-03-01',
    score: 6,
    category: 'googleplay',
    tags: ['Google Play', '电池优化', '应用质量', '用户体验'],
  },
  {
    id: '11',
    title: '苹果App Store搜索广告扩展：3月起搜索结果将显示多个广告位',
    source: '9to5Mac / Search Engine Land',
    sourceUrl: 'https://9to5mac.com/2026/01/22/app-store-search-ads-more-ads-march/',
    summary: '苹果宣布自2026年3月3日起，App Store搜索结果将从单一顶部广告位扩展为多个广告位。首批在英国和日本推出，月底覆盖全球市场。新广告位将出现在搜索结果列表中，不仅限于顶部。苹果称65%的应用下载来自搜索，此举将为开发者提供更多曝光机会。',
    aiComment: {
      overallImpact: '这是App Store广告系统自推出以来最大规模的扩展。更多广告位意味着开发者获客成本可能上升，同时自然搜索结果的可见性将下降。苹果正将服务业务作为重要收入来源，广告收入预计将进一步增长。',
      huaweiImpact: '华为AppGallery的广告系统相对简单，苹果的广告扩展为其提供了参考方向。华为可考虑优化自身广告平台，吸引更多开发者投放广告，增加收入来源。',
    },
    publishDate: '2026-03-03',
    score: 6,
    category: 'appstore',
    tags: ['苹果', 'App Store', '搜索广告', '广告扩展'],
  },
  {
    id: '12',
    title: '谷歌正式推出"Registered App Stores"程序，开放第三方应用商店生态',
    source: 'Google Developers Blog',
    sourceUrl: 'https://android-developers.googleblog.com/2026/03/a-new-era-for-choice-and-openness.html',
    summary: '谷歌在与Epic Games和解后，正式推出"注册应用商店计划"。该计划允许符合条件的第三方应用商店在Android设备上获得更简化的侧载安装流程，减少用户安装时的安全警告和确认步骤，实现"公平竞争"。该计划将率先在美国以外地区推出。',
    aiComment: {
      overallImpact: '这是Android生态系统的重大变革，标志着谷歌从"封闭花园"向"开放平台"的战略转变。Epic Games Store、三星Galaxy Store等主流第三方商店有望受益。预计2026年底随Android重大版本更新上线。',
      huaweiImpact: '华为AppGallery理论上可申请参与该计划，若获批将大幅简化华为设备上的应用安装流程。但审批标准和地缘政治因素可能影响华为的申请结果。',
    },
    publishDate: '2026-03-04',
    score: 9,
    category: 'googleplay',
    tags: ['Google Play', '第三方商店', 'Epic Games', '政策变革'],
  },
  {
    id: '13',
    title: 'Google Play商店佣金降至20%，订阅服务仅收10%',
    source: 'TechCrunch',
    sourceUrl: 'https://techcrunch.com/2026/03/04/google-settles-with-epic-games-drops-its-play-store-commissions-to-20/',
    summary: '谷歌宣布取消传统的30%应用商店抽成，引入更低佣金。应用内购买标准费用降至20%，订阅服务降至10%。使用Google Play结算系统的开发者需额外支付5%费用。参与Apps Experience Program的开发者可进一步降至15%。',
    aiComment: {
      overallImpact: '此举将显著提升开发者收入，可能吸引更多优质应用回归Play Store。与苹果的15-30%抽成相比更具竞争力。预计2026年6月30日起在美国、欧洲经济区、英国生效，2027年9月30日全球推广。',
      huaweiImpact: '佣金降低可能促使部分开发者重新考虑Play Store作为主要分发渠道，对华为AppGallery的开发者招募形成一定压力。但华为15%的佣金仍具价格优势。',
    },
    publishDate: '2026-03-04',
    score: 8,
    category: 'googleplay',
    tags: ['Google Play', '佣金调整', '开发者政策'],
  },
  {
    id: '14',
    title: 'Epic Games Store确认参与谷歌注册应用商店计划',
    source: 'Epic Games / PocketGamer',
    sourceUrl: 'https://www.pocketgamer.biz/epic-games-store-gm-says-google-deal-marks-a-meaningful-reset-for-mobile-market/',
    summary: 'Epic Games CEO Tim Sweeney确认Epic Games Store将参与谷歌的Registered App Stores程序。Fortnite等游戏将可以直接从Epic Games Store安装，无需经过Google Play。Epic Games Store总经理Steve Allison称此为移动市场的"有意义重置"。',
    aiComment: {
      overallImpact: 'Epic Games是此次政策变革的最大受益者之一。Sweeney表示"Android终于成为一个真正开放的平台"。这标志着Epic与Google长达数年的法律纠纷正式结束，也将推动更多开发者考虑替代分发渠道。',
      huaweiImpact: 'Epic Games Store的成功参与为其他第三方商店树立了先例。华为可借鉴Epic的策略，但需解决GMS依赖和地缘政治障碍。',
    },
    publishDate: '2026-03-04',
    score: 8,
    category: 'thirdparty',
    tags: ['Epic Games', '第三方商店', 'Fortnite', '游戏分发'],
  },
  {
    id: '15',
    title: 'Google Play系统更新：重新启用Play Integrity API检查，AAB大小限制提升至200MB',
    source: 'UBOS Tech / Android Police',
    sourceUrl: 'https://ubos.tech/news/google-play-system-update-january-2026-brings-back-november-2025-features/',
    summary: 'Google Play系统2026年1月更新带来多项变化：重新启用2025年11月临时放宽的Play Integrity API检查、后台位置和麦克风权限更细粒度控制、AAB大小限制从150MB提升至200MB。动态功能模块现已全面可用。',
    aiComment: {
      overallImpact: 'Play Integrity API的收紧可能影响部分侧载和修改版应用的使用。AAB大小限制提升利好媒体密集型应用。动态功能模块支持按需下载，有助于减少初始安装包大小。',
      huaweiImpact: 'Play Integrity API的收紧对华为设备影响有限，因为华为已建立自己的安全检测体系。但AAB大小限制提升对华为应用市场的开发者同样是利好消息。',
    },
    publishDate: '2026-01-15',
    score: 6,
    category: 'googleplay',
    tags: ['Google Play', 'Play Integrity', 'AAB', '安全更新'],
  },
  {
    id: '16',
    title: '苹果在欧盟推行CTC模式，取代核心技术费CTF',
    source: 'Apple Developer / NeonPay',
    sourceUrl: 'https://www.neonpay.com/blog/apple-app-store-alternative-payment-fees-what-developers-pay-in-2026',
    summary: '苹果宣布自2026年1月1日起在欧盟市场全面推行"核心技术佣金"（CTC）模式，取代原有的每安装0.5欧元核心技术费（CTF）。CTC为数字商品交易收取5%佣金，与收入挂钩而非安装量。开发者使用外部支付链接需支付三笔费用：Store Services Fee（5%-13%）、Initial Acquisition Fee（2%）、CTC（5%）。',
    aiComment: {
      overallImpact: '从CTF到CTC的转变回应了开发者对"免费应用也可能产生高额费用"的担忧。新模式与收入挂钩更加公平，但总成本仍高达12%-20%。苹果正试图在监管压力与商业利益间寻找平衡。',
      huaweiImpact: '苹果费用结构的复杂性可能促使更多开发者寻求替代方案，为华为AppGallery吸引开发者提供机会。但华为在欧洲市场同样面临监管和竞争挑战。',
    },
    publishDate: '2026-01-01',
    score: 7,
    category: 'appstore',
    tags: ['苹果', 'CTC', 'CTF', '欧盟政策', 'DMA'],
  },
  {
    id: '17',
    title: '日本《移动软件竞争法》生效，苹果宣布iOS调整方案',
    source: 'Apple Newsroom / Xsolla',
    sourceUrl: 'https://www.apple.com/newsroom/2025/12/apple-announces-changes-to-ios-in-japan/',
    summary: '日本《移动软件竞争法》（MSCA）于2025年12月18日正式生效。苹果宣布调整iOS系统以符合法规要求，包括允许第三方应用商店和外部支付方式。苹果同时引入Notarization审核流程和年龄验证机制，以降低新法规带来的隐私和安全风险。',
    aiComment: {
      overallImpact: '日本成为继欧盟之后第二个强制苹果开放应用商店的重大市场。苹果的新条款包括10-21%佣金、5%支付处理费、5%核心技术费和15%商店服务佣金。虽然形式上开放，但经济负担仍可能阻碍第三方商店发展。',
      huaweiImpact: '日本市场的开放为华为等第三方应用商店提供了新的机会。华为可考虑在日本推出AppGallery服务，但需解决本地化合规和生态系统建设问题。',
    },
    publishDate: '2025-12-18',
    score: 7,
    category: 'dma',
    tags: ['日本', 'MSCA', '苹果', '第三方商店'],
  },
  {
    id: '18',
    title: '欧盟委员会对苹果处以5亿欧元罚款，指控其违反DMA反引导条款',
    source: 'TechCrunch / European Commission',
    sourceUrl: 'https://techcrunch.com/2025/07/07/apple-appeals-eus-e500m-fine-over-app-store-payment-restraints/',
    summary: '欧盟委员会以"阻碍开发者引导用户选择替代支付渠道"为由，对苹果处以5亿欧元罚款，并要求60天内完成整改，否则面临每日最高5000万欧元追加处罚。苹果已提出上诉，称处罚"远超法律要求"。',
    aiComment: {
      overallImpact: '这是DMA生效以来最严厉的执法行动之一。欧盟竞争事务专员强调处罚"传递出强烈且明确的信息"。苹果随后宣布政策调整，但业界普遍认为其仍在寻找合规与商业利益之间的平衡点。',
      huaweiImpact: '欧盟对苹果的持续施压为第三方应用商店创造了更有利的监管环境。华为AppGallery在欧洲的推广可能间接受益，但仍需面对自身GMS缺失的挑战。',
    },
    publishDate: '2025-04-23',
    score: 8,
    category: 'dma',
    tags: ['DMA', '欧盟', '反垄断', '苹果罚款'],
  },
  {
    id: '19',
    title: 'AI应用2024年下载量突破15亿次，第三方商店成新增长前沿',
    source: 'Mintegral / BusinessToday',
    sourceUrl: 'https://www.businesstoday.com.my/2025/10/19/ai-short-drama-and-third-party-stores-drive-mobile-growth-heading-into-2025/',
    summary: 'Mintegral报告显示，2024年消费者AI应用下载量达15亿次，收入13亿美元。AI聊天机器人同比增长119%，AI艺术生成器增长21%。同时，第三方Android商店正成为广告主获取低成本用户的新渠道，CPI低至0.26-0.42美元。',
    aiComment: {
      overallImpact: 'AI应用已成为移动生态的新增长点。第三方商店（小米、亚马逊、三星、OPPO/vivo、华为等）CPI显著低于主流商店，日安装量2000-5000次。建议开发者多元化分发渠道。',
      huaweiImpact: '华为AppGallery在AI应用分发领域具有潜力。华为可借助自身AI芯片优势，吸引AI应用开发者入驻，打造差异化竞争力。',
    },
    publishDate: '2025-10-14',
    score: 6,
    category: 'developer',
    tags: ['AI应用', '第三方商店', '用户获取', '市场趋势'],
  },
  {
    id: '20',
    title: '苹果计划允许外部AI聊天机器人接入CarPlay，Siri面临开放竞争',
    source: 'Reuters / Bloomberg',
    sourceUrl: 'https://www.reuters.com/business/apple-plans-allow-external-voice-controlled-ai-chatbots-carplay-bloomberg-news-2026-02-06/',
    summary: '据彭博社报道，苹果正计划允许第三方语音控制的AI聊天机器人接入CarPlay系统。这一举措将使ChatGPT、Gemini等外部AI助手能够在驾驶场景中与Siri共存，用户可通过语音指令直接调用。苹果预计将在2026年WWDC上公布相关开发者接口和审核标准。',
    aiComment: {
      overallImpact: '这是苹果在AI领域最重大的开放举措之一。允许外部AI进入CarPlay标志着苹果从封闭生态向"有限开放"的战略转变，可能是对Siri竞争力不足的补充。这也为第三方AI开发者提供了巨大的车载场景市场，预计将推动车载AI应用的创新浪潮。',
      huaweiImpact: '华为小艺助手在车载场景已有布局，苹果的开放举措为华为提供了参考。若华为鸿蒙车机系统也能开放接入第三方AI，将有助于丰富生态并吸引更多开发者。同时，华为也需关注苹果设定的安全与隐私审核标准，为未来可能的国际市场拓展做准备。',
    },
    publishDate: '2026-02-06',
    score: 7,
    category: 'appstore',
    tags: ['苹果', 'CarPlay', 'AI聊天机器人', 'Siri', '车载系统'],
  },
  {
    id: '21',
    title: 'Apple发布App Store Connect 3.2，新增11种语言支持',
    source: 'Apple Developer',
    sourceUrl: 'https://developer.apple.com/help/app-store-connect/release-notes/',
    summary: 'Apple于2026年4月1日发布App Store Connect 3.2更新。新版本为开发者带来多项改进：支持11种新语言（包括孟加拉语、古吉拉特语、卡纳达语等印度语言）用于应用推广；改进VoiceOver和VoiceControl的无障碍功能；简化TestFlight反馈筛选流程；以及稳定性提升和错误修复。',
    aiComment: {
      overallImpact: 'App Store Connect的语言扩展反映了苹果对印度等新兴市场的重视。新增印度语言支持将帮助开发者更好地本地化应用推广，扩大用户覆盖范围。无障碍功能的改进也体现了苹果对包容性开发的承诺。',
      huaweiImpact: '华为AppGallery在语言支持和无障碍功能方面可以借鉴苹果的做法。随着华为在印度等市场的拓展，增加本地语言支持将是提升用户体验的关键举措。',
    },
    publishDate: '2026-04-01',
    score: 5,
    category: 'appstore',
    tags: ['苹果', 'App Store Connect', '本地化', '无障碍'],
  },
  {
    id: '22',
    title: 'Google Play系统更新发布，包含4月安全补丁',
    source: 'Google / Jetstream Blog',
    sourceUrl: 'https://jetstream.blog/en/android-google-play-system-update-20260401/',
    summary: 'Google于2026年4月1日发布Google Play系统更新，作为每月"Google系统更新"的一部分。本次更新是2026年2月版本的首次小更新，主要包含安全补丁和错误修复。Mainline服务应用版本保持v2026-02-01S+不变。用户可通过设置 > 安全与隐私 > 系统与更新 > Google Play系统更新检查更新。',
    aiComment: {
      overallImpact: 'Google Play系统更新是Android安全架构的重要组成部分，通过独立于系统更新的方式快速推送安全补丁。这有助于缩小Android生态系统的安全漏洞窗口期，提升整体安全性。',
      huaweiImpact: '华为设备由于无法使用Google Play服务，依赖华为自家的安全更新机制。华为需要确保HMS Core和AppGallery的安全更新频率与Google相当，以维持用户信任。',
    },
    publishDate: '2026-04-01',
    score: 5,
    category: 'googleplay',
    tags: ['Google Play', '安全更新', 'Android'],
  },
  {
    id: '23',
    title: 'Meta提交2026年DMA合规报告，确认WhatsApp广告即将登陆欧盟',
    source: 'Meta / PPC Land',
    sourceUrl: 'https://ppc.land/metas-2026-dma-report-reveals-whatsapp-ads-a-eu200m-fine-and-a-defiant-stance-on-personalized-advertising/',
    summary: 'Meta于2026年3月6日向欧盟委员会提交第三份年度DMA合规报告，长达79页。报告确认WhatsApp Channels和Status广告将在"未来几周"内在欧盟推出。报告还披露Meta正在就2025年4月收到的2亿欧元罚款提出上诉。Meta同时发布了消费者画像技术审计的非机密摘要，详细说明了广告拍卖机制、用户同意流程、数据可携带工具和消息互操作性的改进。',
    aiComment: {
      overallImpact: 'Meta的DMA合规报告展示了大型平台如何在监管压力下调整商业模式。WhatsApp广告的推出标志着Meta开始在其消息平台上变现，这可能改变消息应用的商业模式。同时，Meta对罚款的上诉显示其与监管机构之间的持续博弈。',
      huaweiImpact: 'Meta在消息应用变现方面的探索为华为畅连提供了参考。华为可以观察WhatsApp广告的接受度和监管反应，为未来可能的商业化做准备。同时，Meta的合规实践也为华为进入欧洲市场提供了参考框架。',
    },
    publishDate: '2026-03-10',
    score: 8,
    category: 'dma',
    tags: ['Meta', 'DMA', 'WhatsApp', '广告', '合规'],
  },
  {
    id: '24',
    title: 'Meta将停用Nielsen DMA，汽车广告需迁移至Comscore Markets',
    source: 'Meta / Daily.dev',
    sourceUrl: 'https://business.daily.dev/resources/meta-drops-nielsen-dma-targeting-automotive-ads-comscore-markets/',
    summary: 'Meta宣布将于2026年6月22日起停用Nielsen DMA（指定市场区域）定位，汽车模型广告需迁移至Comscore Markets。关键时间节点：3月23日起可开始更新Feed；4月20日起未更新的广告将收到警告；6月22日起使用旧dma_code的广告将停止投放。Meta表示此次转变是为了提供更可持续和可扩展的合作伙伴解决方案。',
    aiComment: {
      overallImpact: 'Meta从Nielsen DMA转向Comscore Markets反映了数字广告行业测量标准的变化。随着媒体消费从传统电视向数字平台转移，Comscore在数字广告定位领域的能力更受青睐。汽车广告主需要及时调整Feed格式，避免广告投放中断。',
      huaweiImpact: '华为Ads平台在地理定位方面可以参考这一转变。随着华为广告业务的发展，采用行业标准的测量工具将有助于提升广告主信心。同时，这也提醒华为需要持续关注广告技术生态的变化。',
    },
    publishDate: '2026-03-16',
    score: 6,
    category: 'appstore',
    tags: ['Meta', '广告', 'Comscore', '汽车行业'],
  },
  {
    id: '25',
    title: '苹果宣布4月28日起App Store提交必须使用Xcode 26',
    source: 'Apple Developer',
    sourceUrl: 'https://developer.apple.com/news/upcoming-requirements/',
    summary: 'Apple宣布自2026年4月28日起，所有提交到App Store Connect的应用必须使用Xcode 26或更高版本构建，并包含iOS 26、iPadOS 26、tvOS 26、visionOS 26或watchOS 26的最新SDK。这一要求适用于新应用提交和更新。watchOS应用还需支持64位架构。开发者需要提前升级开发环境，测试应用在最新SDK上的兼容性。',
    aiComment: {
      overallImpact: 'Apple的年度SDK更新要求是其保持生态系统现代化的重要手段。这一变化将推动开发者采用最新技术，确保应用能够利用新平台功能。对于维护多个应用的开发团队，需要协调升级计划，避免提交受阻。',
      huaweiImpact: '华为AppGallery虽然没有类似的强制SDK要求，但可以借鉴苹果的年度升级节奏，鼓励开发者使用最新的HarmonyOS SDK。这有助于提升应用质量和用户体验，同时推动生态系统向前发展。',
    },
    publishDate: '2026-04-03',
    score: 7,
    category: 'appstore',
    tags: ['苹果', 'App Store', 'Xcode', '开发者'],
  },
  {
    id: '26',
    title: 'Google Play重大变革：佣金降至20%，允许第三方支付和外部链接',
    source: 'Google / Android Developers Blog',
    sourceUrl: 'https://android-developers.googleblog.com/2026/03/a-new-era-for-choice-and-openness.html',
    summary: 'Google宣布与Epic Games达成全球和解，推出"选择与开放的新时代"政策。核心变化包括：应用内购买佣金从30%降至20%（新安装）和25%（现有安装）；订阅服务佣金降至10%；开发者可使用自有支付系统或引导用户至外部网站完成购买；推出Registered App Stores计划简化第三方商店安装。使用Google Play Billing需额外支付5%处理费。外部链接购买24小时内完成的交易收取20%服务费。',
    aiComment: {
      overallImpact: '这是Android生态系统的历史性变革，标志着Google从"封闭花园"向"开放平台"的战略转变。佣金降低将直接提升开发者收入，而支付选择的放开可能重塑移动应用商业模式。与Epic的和解也结束了长达数年的法律纠纷，为行业树立了新的合作范式。',
      huaweiImpact: 'Google的政策变化对华为既是机遇也是挑战。一方面，华为AppGallery可作为Registered App Store参与计划，获得更简化的安装流程；另一方面，Google的佣金降低（20% vs 华为15%）缩小了价格优势。华为需要加快生态建设，提升服务质量以保持竞争力。',
    },
    publishDate: '2026-03-04',
    score: 10,
    category: 'googleplay',
    tags: ['Google Play', '佣金', '第三方支付', 'Epic Games', '政策变革'],
  },
  {
    id: '27',
    title: 'Apple App Store欧盟新费用结构：DMA后开发者面临复杂选择',
    source: 'FunnelFox / NeonPay',
    sourceUrl: 'https://blog.funnelfox.com/apple-app-store-fees-2026-eu-dma/',
    summary: '欧盟DMA实施后，Apple App Store费用结构从简单的15-30%佣金转变为多层模块化收费体系。新费用包括：Store Services Fee（5%或13%，取决于服务层级）、Initial Acquisition Fee（2%，新用户前6个月）、Core Technology Fee（5%，安装后12个月内）。外部支付并非免费退出，最全面的设置下总费用可达约20%。此外还需承担工程 overhead、法律合规负担和UX摩擦成本。',
    aiComment: {
      overallImpact: 'Apple的新费用结构表面上响应了DMA的开放要求，实际上通过复杂性增加了开发者的决策成本和合规负担。虽然提供了更多选择，但每种选择都有隐藏成本，实际节省可能远低于预期。这种"菜单式"定价策略可能是Apple在监管压力下保护收入的防御性举措。',
      huaweiImpact: 'Apple费用结构的复杂性为华为AppGallery提供了差异化机会。华为可以主打简单透明的定价策略（15%统一佣金），吸引那些不愿应对Apple复杂费用体系的开发者。同时，华为也需关注欧盟监管趋势，为未来可能的合规要求做准备。',
    },
    publishDate: '2026-03-05',
    score: 9,
    category: 'appstore',
    tags: ['苹果', 'App Store', 'DMA', '佣金', '欧盟'],
  },
  {
    id: '28',
    title: '全球应用内购买市场2026年达3228亿美元，订阅模式占主导',
    source: 'The Business Research Company',
    sourceUrl: 'https://www.thebusinessresearchcompany.com/report/in-app-purchase-global-market-report',
    summary: '根据市场研究报告，全球应用内购买市场2025年价值2558.4亿美元，2026年预计增长至3228.1亿美元，年复合增长率26.2%。预计到2035年将达到8089.3亿美元。订阅模式占据53.7%市场份额，成为主导收入模式。iOS平台以64.4%份额领先，反映其用户更强的付费意愿。亚太地区是最大且增长最快的市场。主要趋势包括AI欺诈检测、生物识别认证、区块链支付和开放银行API的集成。',
    aiComment: {
      overallImpact: '应用内购买市场的强劲增长验证了移动应用商业模式的成功。订阅模式的主导地位表明用户更愿意为持续价值付费而非一次性购买。iOS的高份额凸显了平台用户质量对收入的重要性。新兴技术如AI和区块链正在重塑支付生态，为开发者提供新的变现机会。',
      huaweiImpact: '华为AppGallery在应用内购买领域仍有巨大增长空间。随着HarmonyOS生态的成熟，华为可以借鉴iOS的成功经验，通过提升用户付费意愿和优化支付体验来增加收入。同时，订阅模式的流行也提醒华为需要为开发者提供更好的订阅管理工具。',
    },
    publishDate: '2026-03-05',
    score: 7,
    category: 'developer',
    tags: ['应用内购买', '市场报告', '订阅', '移动支付'],
  },
  {
    id: '29',
    title: '日本《移动软件竞争法》生效：允许第三方支付，费率21%起',
    source: 'Apple Developer / NeonPay',
    sourceUrl: 'https://www.apple.com/newsroom/2025/12/apple-announces-changes-to-ios-in-japan/',
    summary: '日本《移动软件竞争法》（MSCA）于2025年12月18日正式生效。Apple允许开发者在应用内使用自有支付系统（21%费率）、链接至网站（15%费率）或通过替代应用商店（5%费率）。7天规则：用户点击链接后7天内完成的购买按15%收费。开发者需在2026年3月17日前同意新条款。这是继欧盟之后第二个强制Apple开放支付的主要市场。',
    aiComment: {
      overallImpact: '日本MSCA的生效标志着亚洲监管机构也开始挑战应用商店的垄断地位。虽然Apple开放了支付选择，但21%的费率仍然较高，且7天规则增加了复杂性。这为其他亚洲国家（如韩国、中国）的监管提供了参考，可能引发区域性的政策变革浪潮。',
      huaweiImpact: '日本市场的开放为华为AppGallery提供了新的机会。华为可以考虑在日本推出服务，利用其15%的佣金优势吸引开发者。同时，华为也需关注日本用户对第三方支付的接受度，以及监管对数据安全和隐私的要求。',
    },
    publishDate: '2026-03-17',
    score: 8,
    category: 'dma',
    tags: ['日本', 'MSCA', '第三方支付', '苹果', '监管'],
  },
  {
    id: '30',
    title: 'Google Play美国替代支付政策：开发者需在1月28日前完成注册',
    source: 'Neon Commerce',
    sourceUrl: 'https://www.neonpay.com/blog/google-plays-new-u-s.-billing-linking-policies-what-game-developers-need-to-know',
    summary: 'Google通知美国开发者，必须在2026年1月28日前注册Alternative Billing Program或External Content Links Program，才能继续使用替代支付或应用内链接至外部商店。替代支付需集成Google的API处理信息屏幕、家长控制和交易报告；外部链接需遵守用户保护要求。Google表示"打算"收取服务费，但具体费率尚未确定，可能受Epic v. Google案件后续裁决影响。',
    aiComment: {
      overallImpact: 'Google美国替代支付政策的推出是Epic诉讼结果的直接产物。虽然提供了更多选择，但强制使用Google API和不确定的费率增加了开发者的合规负担。"打算收费"的模糊表述也表明政策可能随法律进展而调整，给开发者带来不确定性。',
      huaweiImpact: 'Google美国政策的收紧可能影响华为设备上的应用分发。华为需要密切关注政策细节，确保其应用商店和支付系统符合Google的要求。同时，这也提醒华为在拓展海外市场时需要考虑当地的监管和法律环境。',
    },
    publishDate: '2026-01-28',
    score: 7,
    category: 'googleplay',
    tags: ['Google Play', '替代支付', '美国', 'Epic', '合规'],
  },
  {
    id: '31',
    title: '韩国第三方支付政策：Apple收取26%佣金，限定四家PSP',
    source: 'Apple Developer / NeonPay',
    sourceUrl: 'https://www.neonpay.com/blog/apple-app-store-alternative-payment-fees-what-developers-pay-in-2026',
    summary: '韩国《电信商业法》修正案要求Apple允许第三方支付。Apple规定：佣金为26%（含增值税），开发者需自行处理增值税的收取和汇缴。批准的支付服务提供商（PSP）仅限四家：KCP、Inicis、Toss、NICE。关键限制：同一应用不能同时使用Apple IAP和第三方支付。开发者需每月在Apple财政月结束后15天内提交交易报告。',
    aiComment: {
      overallImpact: '韩国政策展示了监管强制开放后的实际执行情况。26%的佣金仅比标准30%低4个百分点，且不能与Apple IAP共存，大大降低了吸引力。限定四家PSP也限制了开发者的选择。这表明即使监管强制开放，平台仍可通过技术和商业手段维持控制力。',
      huaweiImpact: '韩国经验为华为提供了重要参考。如果华为进入韩国市场，需要了解当地PSP格局并与批准的提供商合作。同时，华为也应关注韩国开发者对第三方支付的接受度，评估在该市场推广自有支付系统的可行性。',
    },
    publishDate: '2026-03-01',
    score: 7,
    category: 'appstore',
    tags: ['韩国', '第三方支付', 'Apple', 'PSP', '监管'],
  },
  {
    id: '32',
    title: 'Epic Games Store春季促销开启，数百款游戏折扣最高75%',
    source: 'IGN India',
    sourceUrl: 'https://in.ign.com/stellar-blade/257108/news/epic-games-spring-sale-2026-is-live-right-now-with-discounts-on-hundreds-of-titles-such-as-expeditio',
    summary: 'Epic Games Store春季促销活动于2026年4月6日开启，持续至4月13日。数百款热门游戏参与折扣，包括《Red Dead Redemption 2》（75% off，₹1,249.75）、《Cyberpunk 2077》（65% off，₹1,121.75）、《God of War》（60% off，₹1,319.60）、《Assassin\'s Creed Shadows》（50% off，₹2,449.50）等。此外，Epic每周继续提供免费游戏领取。',
    aiComment: {
      overallImpact: 'Epic Games Store的春季促销展示了其在PC游戏分发市场的持续竞争力。大幅折扣策略有助于吸引用户、提升平台活跃度，同时也给Steam带来竞争压力。免费游戏和深度折扣的组合是Epic扩大市场份额的核心策略。',
      huaweiImpact: 'Epic的促销策略为华为AppGallery游戏分发提供了参考。华为可以借鉴Epic的折扣和免费游戏模式，在特定节日或活动期间推出类似促销，吸引用户并提升平台活跃度。同时，华为也需关注Epic与游戏开发商的合作模式。',
    },
    publishDate: '2026-04-06',
    score: 6,
    category: 'thirdparty',
    tags: ['Epic Games', '游戏促销', '折扣', 'PC游戏'],
  },
  {
    id: '33',
    title: 'WhatsApp被欧盟列为超大型在线平台，需在2026年5月前完成DSA合规',
    source: 'Business Verge',
    sourceUrl: 'https://businessvergeng.com/eu-gives-whatsapp-until-may-2026-to-comply-with-digital-services-act-rules/',
    summary: '欧盟委员会确认WhatsApp Channels月均活跃用户达5170万，超过DSA（数字服务法）4500万的VLOP（超大型在线平台）门槛。WhatsApp需在2026年5月前完成DSA合规，包括进行系统性风险评估、实施非法内容缓解措施、保护基本权利和隐私等。违规可能面临高达Meta全球年营业额6%的罚款。此认定仅适用于Channels功能，核心端到端加密私聊不在监管范围内。',
    aiComment: {
      overallImpact: 'WhatsApp被认定为VLOP标志着欧盟对消息平台监管的重大升级。DSA合规要求将迫使Meta投入大量资源进行平台治理，包括内容审核、透明度报告和风险评估。这也为其他消息平台（如Telegram、Signal）的监管提供了先例。',
      huaweiImpact: '华为畅连等消息服务如果进入欧盟市场，也可能面临类似的VLOP认定和DSA合规要求。华为需要提前准备内容审核机制、透明度报告流程和风险评估体系，以应对潜在的监管挑战。同时，这也提醒华为在拓展海外市场时需密切关注当地数字法规。',
    },
    publishDate: '2026-01-27',
    score: 8,
    category: 'dma',
    tags: ['WhatsApp', 'DSA', '欧盟', 'VLOP', '监管'],
  },
  {
    id: '34',
    title: 'Google Play Store v50.9更新：广告显示下载量、Play Games联赛功能上线',
    source: '9to5Google',
    sourceUrl: 'https://9to5google.com/2026/04/06/april-2026-google-system-updates/',
    summary: 'Google于2026年4月6日发布Google Play Store v50.9更新。主要新功能包括：应用广告现在显示下载量，帮助用户做出更明智的安装决策；用户可直接从"You"标签页加入和参与Play Games联赛，简化竞技游戏体验。此外，Google Play services v26.13还带来了设备连接新开发者功能、位置共享API优化、车载系统QR码登录显示设备名称等改进。',
    aiComment: {
      overallImpact: 'Google Play Store的更新体现了Google在提升用户体验和开发者支持方面的持续投入。下载量显示功能增加了应用广告的透明度，有助于用户识别优质应用；Play Games联赛功能则强化了Google在游戏社交领域的布局。这些变化将进一步巩固Google Play在Android生态中的核心地位。',
      huaweiImpact: '华为AppGallery可以借鉴Google Play的透明度策略，考虑在应用展示中增加更多用户决策信息（如下载量、评分分布等）。同时，华为也需要加强游戏社交功能，提升用户粘性。这些功能改进为华为提供了明确的竞争对标方向。',
    },
    publishDate: '2026-04-07',
    score: 6,
    category: 'googleplay',
    tags: ['Google Play', '应用商店', '游戏', '广告'],
  },
  {
    id: '35',
    title: '欧洲消费者组织BEUC：Meta最新广告同意模式仍违反DMA和GDPR',
    source: 'BEUC',
    sourceUrl: 'https://www.beuc.eu/press-releases/metas-latest-consent-ads-model-still-unlawful-according-consumer-groups-analysis',
    summary: '欧洲消费者组织（BEUC）发布分析报告指出，Meta于2026年1月推出的最新广告同意模式（付费无广告、个性化广告、低个性化广告三选一）仍违反欧盟数字市场法（DMA）、通用数据保护条例（GDPR）和不公平商业行为指令（UCPD）。BEUC指出，新模型仍未能让用户自由、明确、知情且毫不含糊地同意个性化广告，且Meta使用非中性语言引导用户选择完全个性化广告选项。BEUC呼吁欧盟委员会确保Meta迅速合规，并在必要时处以定期罚款。',
    aiComment: {
      overallImpact: 'BEUC的报告揭示了Meta与欧盟监管机构之间持续的合规博弈。即使Meta多次调整其广告同意模式，仍未能满足DMA和GDPR的要求。这表明大型科技平台在适应欧盟严格的数据保护法规方面面临巨大挑战，也预示着未来可能有更多罚款和监管行动。',
      huaweiImpact: '华为在开发广告业务时需要深入研究欧盟的数据保护法规，确保广告模式从设计之初就符合GDPR和DMA要求。BEUC对Meta的批评为华为提供了反面教材，提醒华为在进入欧洲市场时必须将用户隐私和选择权置于核心位置。',
    },
    publishDate: '2026-03-17',
    score: 8,
    category: 'dma',
    tags: ['Meta', 'DMA', 'GDPR', '广告', '隐私', '欧盟'],
  },
  {
    id: '37',
    title: 'Apple发布Hello Developer April 2026：App Store Connect Analytics新增100+指标',
    source: 'Notebookcheck / Apple Developer',
    sourceUrl: 'https://www.notebookcheck.net/Apple-s-April-2026-Hello-Developer-highlights-WWDC26-and-App-Store-analytics.1269091.0.html',
    summary: 'Apple于2026年4月8日发布Hello Developer: April 2026开发者简报，重点介绍WWDC26准备材料、新示例代码、最新设计资源，以及App Store Connect Analytics的重大更新。Analytics新增100多个指标，支持同时应用最多7个过滤器，并新增App Store Analytics Guide指南。Apple还表示，Sales and Trends中的数据将逐步迁移至Analytics，迁移将于2026年中期开始，预计2027年完成。',
    aiComment: {
      overallImpact: 'App Store Connect Analytics的重大更新为开发者提供了更强大的数据分析能力，100多个新指标和多重过滤器功能将帮助开发者更深入地了解应用表现和用户行为。Sales and Trends向Analytics的迁移也表明Apple正在统一其数据分析平台，简化开发者工作流程。',
      huaweiImpact: '华为AppGallery的开发者分析工具可以借鉴Apple的做法，增加更多维度的指标和灵活的过滤功能，提升开发者体验。同时，华为也应考虑统一其数据分析平台，减少开发者在不同工具间切换的成本。',
    },
    publishDate: '2026-04-08',
    score: 6,
    category: 'appstore',
    tags: ['苹果', 'App Store', '开发者', '数据分析', 'WWDC'],
  },
  {
    id: '36',
    title: 'App Store 2026政策更新：Xcode 26强制要求、年龄验证与替代市场',
    source: 'Super Apps AI',
    sourceUrl: 'https://super-apps.ai/blog/navigating-app-store-policy-changes-strategies-for-2026-compliance/',
    summary: 'Apple 2026年App Store政策迎来重大更新。自4月28日起，所有提交应用必须使用Xcode 26或更高版本，目标SDK为iOS 26、iPadOS 26等。年龄验证方面，Texas州法律SB2420要求应用市场实施年龄验证（执行暂缓），Utah和Louisiana也将于2026年晚些时候实施类似要求。Apple提供Declared Age Range API和PermissionKit的Significant Change API帮助开发者合规。欧盟和日本方面，iOS 26.2启用替代应用市场分发和第三方支付处理，Apple通过公证系统和市场授权流程维护安全标准。',
    aiComment: {
      overallImpact: 'Apple 2026年政策更新涵盖开发工具、年龄验证和替代市场三大领域。Xcode 26强制要求推动开发者采用最新技术；年龄验证要求响应美国各州法规；替代市场开放则是对欧盟DMA和日本法规的合规。这些变化将显著影响开发者的工作流程和应用分发策略。',
      huaweiImpact: '华为需要关注Apple在年龄验证方面的做法，为未来可能的中国或海外市场年龄验证要求做准备。同时，Apple的替代市场机制也为华为提供了参考，如果未来需要开放第三方应用市场，可以借鉴Apple的公证和授权模式平衡安全与开放。',
    },
    publishDate: '2026-03-10',
    score: 7,
    category: 'appstore',
    tags: ['苹果', 'App Store', '政策', 'Xcode', '年龄验证', '替代市场'],
  },
];

// 按日期降序排序（最新的在前）
export const sortedNewsData = [...newsData].sort((a, b) => {
  return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
});

// 支付生态相关新闻（佣金、支付、第三方支付等）
export const paymentEcosystemNews = sortedNewsData.filter((item) => {
  const paymentKeywords = ['佣金', '支付', 'IAP', '计费', '费率', '费用', 'price', 'fee', 'commission'];
  const text = (item.title + item.summary + item.tags.join(' ')).toLowerCase();
  return paymentKeywords.some(kw => text.includes(kw.toLowerCase()));
});

// 应用生态相关新闻（其他所有新闻）
export const appEcosystemNews = sortedNewsData.filter((item) => {
  return !paymentEcosystemNews.find(p => p.id === item.id);
});

// 获取最近一个月的新闻（用于最新动态）
export const getLatestNews = (days: number = 30) => {
  const now = new Date('2026-04-07');
  const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  return sortedNewsData.filter((item) => {
    const itemDate = new Date(item.publishDate);
    return itemDate >= cutoffDate;
  });
};

// 获取当日新增新闻（用于首页当日新增版块）
export const getTodayNews = (today: string = '2026-04-07') => {
  return sortedNewsData.filter((item) => item.publishDate === today);
};
