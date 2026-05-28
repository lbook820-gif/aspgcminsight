import { useState, useMemo } from 'react';
import HeroSection from '@/components/HeroSection';
import NewsCard from '@/components/NewsCard';
import type { NewsItem } from '@/types';

const dpaUpdates: NewsItem[] = [
  {
    id: 'dpa-ie-008',
    source: 'Ireland DPC (爱尔兰数据保护委员会)',
    date: '2026-05-08',
    heat: 8,
    title: '爱尔兰 DPC 对 Permanent TSB 数据泄露事件开出 27.75 万欧元罚单',
    summary:
      '2026年5月8日，爱尔兰数据保护委员会（DPC）公布了对 Permanent TSB（PTSB）数据泄露事件的最终调查决定。事件源于2022年5月起PTSB报告的一系列数据泄露，恶意分子通过致电PTSB的"Open24联系中心"，冒充客户获取账户访问权限并更改账户信息。DPC认定PTSB违反GDPR第5(1)(f)条（完整性与保密性原则）、第32(1)条（安全措施义务），对其处以25万欧元罚款；同时因未在72小时内及时通知DPC，违反第33(1)条，额外处以2.75万欧元罚款，合计27.75万欧元。',
    overallImpact:
      '此案是DPC对金融机构数据安全管控的重要执法行动，强调了银行等金融机构必须实施充分的技术和组织措施保护客户数据。该案例对中国出海金融科技企业具有重要警示意义：数据安全漏洞不仅导致罚款，还会严重损害用户信任和品牌声誉。',
    industryImpact:
      '中国出海金融科技和电商企业需注意：\n\n1. 技术安全措施：必须实施严格的身份验证机制，包括多因素认证，防止社会工程学攻击。\n2. 应急响应机制：发现数据泄露后须在72小时内向DPC报告（GDPR第33条）。\n3. 风险提示：金融机构的数据安全违规可能导致数据安全措施和未及时通知的双重叠加罚款。',
    tags: ['DPC', 'Permanent TSB', '数据泄露', 'GDPR', '爱尔兰', '金融机构'],
    link: 'https://www.dataprotection.ie/en/news-media/press-releases/data-protection-commission-announces-decision-in-pemanent-tsb-inquiry',
    isNew: true,
  },
  {
    id: 'dpa-ie-007',
    source: 'Ireland DPC (爱尔兰数据保护委员会)',
    date: '2026-05-05',
    heat: 10,
    title: '爱尔兰 DPC 对 SHEIN Ireland 发起正式调查，聚焦欧盟用户数据跨境传输至中国',
    summary:
      '2026年5月5日，爱尔兰数据保护委员会（DPC）宣布对 SHEIN 爱尔兰子公司（Infinite Styles Services Co. Ltd.）发起正式调查。调查核心是 SHEIN Ireland 将欧盟/欧洲经济区数据主体的个人数据传输至中国是否遵守 GDPR 相关规定。DPC 的副专员 Graham Doyle 表示："当个人数据被传输到欧盟以外的国家时，GDPR 要求这些个人数据应获得与欧盟内部实质同等的保护水平。DPC 近期的执法行动以及向其他欧洲监管机构提出的投诉，已将数据向中国传输的问题置于聚光灯下。"调查涉及 GDPR 第5条（数据处理原则）、第13条（透明度义务）以及第五章的数据跨境传输要求。DPC 强调此次调查是重要的战略优先事项，并将与欧洲同行监管机构密切合作。',
    overallImpact:
      'DPC 明确将中国方向的数据跨境传输列为当前战略优先监管领域。此案与 DPC 此前的 TikTok 调查形成呼应，中国互联网企业的数据跨境传输面临欧盟监管的集中审查。DPC 强调没有充分性认定的第三国数据传输需要额外保障措施。',
    industryImpact:
      '中国出海电商及科技企业需立即自查：\n\n1. 数据跨境传输审计：欧盟用户数据是否存储在境内？是否有传输至第三国的情况？\n2. 法律依据审查：是否签署了最新版标准合同条款（SCC）？是否进行了传输影响评估（TIA）？\n3. 补充措施：是否实施了端到端加密、假名化等技术保护手段？\n4. 透明度义务：隐私政策是否充分披露了数据跨境传输的事实和保障措施？\n\n建议将欧盟用户数据优先本地化存储于欧盟境内，确保数据保护水平不因跨境传输而降低。',
    tags: ['DPC', 'SHEIN', '数据跨境传输', 'GDPR', '爱尔兰', '中国'],
    link: 'https://www.dataprotection.ie/en/news-media/dpc-opens-inquiry-infinite-styles-services-co-ltd-shein-ireland',
    isNew: true,
  },
  {
    id: 'dpa-ie-009',
    source: 'Ireland Coimisiún na Meán (爱尔兰媒体委员会)',
    date: '2026-05-06',
    heat: 9,
    title: '爱尔兰媒体委员会调查Meta算法操控：暗黑模式涉嫌违反DSA',
    summary:
      '2026年5月6日，爱尔兰媒体委员会(Coimisiún na Meán)宣布对Meta旗下Facebook和Instagram正式展开两项调查，重点审查其是否通过算法设计和"暗黑模式"操控用户选择，涉嫌违反DSA。调查核心在于：根据DSA规定，大型在线平台必须为用户提供至少一种不基于用户画像的内容推荐选项。数字服务专员John Evans强调，算法可能通过反复推送有害内容对儿童和青少年造成潜在伤害。若认定违规，Meta将面临最高全球年营业额6%的罚款。',
    overallImpact:
      '这是爱尔兰过去六个月针对大型科技平台的系列DSA执法行动最新一例，标志着DSA执法从内容审核深入到产品交互设计层面。',
    industryImpact:
      '出海平台需自查推荐系统是否提供同等醒目的非个性化选项，确保不存在暗黑模式设计。',
    tags: ['Coimisiún na Meán', 'Meta', '暗黑模式', 'DSA', '算法', '爱尔兰'],
    link: 'https://finance.sina.cn/usstock/mggd/2026-05-06/detail-inhwwvwx6177004.d.html',
    isNew: true,
  },
  {
    id: 'dpa-tr-003',
    source: 'Turkey RK (土耳其竞争管理局)',
    date: '2026-04-26',
    heat: 8,
    title: '土耳其 RK 启动人工智能生态系统反垄断行业调查',
    summary:
      '土耳其竞争管理局 (RK) 于 2026 年 4 月 26 日发布公告，正式启动对生成式 AI 领域的深度行业调查。调查重点在于大型科技平台是否利用其在算力、算法和数据方面的优势实施封锁竞争对手的行为。',
    overallImpact:
      '这表明非欧盟国家正加速跟进 AI 领域的竞争监管。RK 可能会要求大型 AI 服务商实施更透明的资源分配机制。',
    industryImpact:
      '在土耳其开展 AI 业务的中国企业需做好应对反垄断合规审计的准备，特别是涉及算力租赁和 API 授权的环节。',
    tags: ['RK', '人工智能', '反垄断', '土耳其'],
    link: 'https://www.rekabet.gov.tr/en',
    isNew: true,
  },
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
    id: 'dpa-eu-011',
    source: 'EDPB (欧洲数据保护委员会)',
    date: '2026-04-16',
    heat: 9,
    title: 'EDPB 加速匿名化指南终稿、明确科研数据处理规则，批准首个欧洲数据保护印章用于跨境传输',
    summary:
      '2026年4月16日，欧洲数据保护委员会（EDPB）在4月全体会议上取得多项里程碑进展：1）加速完成匿名化指南（Anonymisation Guidelines）终稿，为企业和机构提供区分匿名化与假名化的明确标准；2）发布声明为科研数据处理提供清晰的合规指引，明确GDPR第9(2)(j)条科研豁免的适用条件与扩展数据再使用场景的范围；3）批准首个欧洲数据保护印章（European Data Protection Seal）用于跨境数据传输——这是GDPR框架下跨境传输合规工具的重要补充，有望成为SCC和BCR之外的第三种选择。',
    overallImpact:
      '这是GDPR发布十周年（2026年4月27日纪念活动）前夕EDPB最具实践意义的一组决议。匿名化指南将解决长期困扰企业的"何种程度的去标识化构成匿名"争议；科研数据处理指引将对医疗AI、药物研发等领域的欧盟合作产生重大利好；数据保护印章则为企业跨境传输提供了全新工具。',
    industryImpact:
      '对出海企业的三重影响：\n\n1. 匿名化合规：EDPB指南将为数据产品的匿名化处理提供法定参照标准，建议对照终稿审查数据分析产品的合规性\n2. 科研数据合规：医疗AI、生物科技等领域可研究GDPR科研豁免条款的适用范围，简化研究数据处理合规路径\n3. 跨境传输新工具：首个欧洲数据保护印章获批，可作为SCC（标准合同条款）和BCR（有约束力的公司规则）之外的第三种跨境传输合规机制，建议法务团队评估其适用性',
    tags: ['EDPB', '匿名化', '科研数据处理', '数据保护印章', '跨境传输', 'GDPR'],
    link: 'https://www.edpb.europa.eu/news/news/2026/edpb-brings-clarity-data-processing-scientific-research-speeds-finalisation-anonymisation_en',
    isNew: true,
  },
    {
    id: 'dpa-eu-014',
    source: 'European Commission (欧盟委员会)',
    date: '2026-05-24',
    heat: 10,
    title: '欧盟评估将ChatGPT纳入DSA监管：1.204亿月活远超VLOP门槛，AI大模型首入平台监管视野',
    summary:
      '2026年5月，欧盟委员会发言人托马斯·雷尼尔证实，欧盟正评估将OpenAI旗下ChatGPT纳入《数字服务法》（DSA）管辖范围。OpenAI公布的数据显示截至2025年9月的6个月期间，ChatGPT在欧盟月均活跃用户约1.204亿，远超4500万VLOP认定门槛。认定将基于服务功能定量和定性评估及成员国协商。若被指定为VLOP，ChatGPT须履行DSA最严格合规义务：系统性风险评估、年度外部审计、算法透明度、非法内容管控、研究人员数据访问等。这是AI对话产品首次面临VLOP级别平台监管。',
    overallImpact:
      '这是DSA监管范围的里程碑式扩展——从社交媒体、电商正式扩展至生成式AI领域。ChatGPT若被指定为VLOP将成为全球首个被纳入平台监管框架的AI大模型，迫使AI服务商建立与社交平台同等级的内容审核和风险管理体系。',
    industryImpact:
      'AI出海企业需关注：1）月活超4500万的AI对话产品需提前准备VLOP合规方案；2）VLOP义务要求设立欧盟本地法律代表和接受年度外部审计；3）ChatGPT案为Claude、Grok、Gemini等后续认定提供先例；4）AI产品需同时满足AI Act和DSA双重合规要求。',
    tags: ['ChatGPT', 'DSA', 'VLOP', 'AI大模型', 'OpenAI', '欧盟', '生成式AI'],
    link: 'https://www.163.com/dy/article/KQDQS7E10511BE1V.html',
    isNew: true,
  },
  {
    id: 'dpa-eu-013',
    source: 'BEUC (欧洲消费者组织)',
    date: '2026-05-21',
    heat: 9,
    title: 'BEUC联合29国消费者机构依DSA投诉谷歌、Meta、TikTok纵容金融诈骗广告',
    summary:
      '2026年5月21日，欧洲消费者组织（BEUC）联合27国29个成员机构，依据DSA向欧盟委员会正式投诉谷歌、Meta和TikTok，指其未有效防范平台金融诈骗广告。BEUC去年12月至今年3月举报近900条诈骗广告，平台仅删除27%，52%被拒绝或未处理。BEUC总干事批评平台不仅未主动清理诈骗广告，接到举报后应对也严重滞后。若认定违规，三家平台最高可面临全球年营业额6%罚款。谷歌声称投放前已拦截99%违规广告，Meta称已移除超1.59亿条诈骗广告（92%在举报前清除），TikTok未回应。',
    overallImpact:
      '这是DSA框架下规模最大的消费者组织集体投诉行动。若转化为正式调查，将是对DSA广告审核义务执行的全面检验，推动整个在线广告行业审核标准提升。',
    industryImpact:
      '出海广告平台需审视金融广告审核：1）建立投放前严格合规审查机制；2）完善用户举报响应流程；3）加强AI自动化审核与人工复核协同。',
    tags: ['BEUC', '金融诈骗', 'DSA', '谷歌', 'Meta', 'TikTok', '广告审核'],
    link: 'https://finance.sina.com.cn/stock/usstock/c/2026-05-21/doc-inhyshrk5764081.shtml',
    isNew: true,
  },
  {
    id: 'dpa-eu-012',
    source: 'ENISA (欧洲网络安全局)',
    date: '2026-05-06',
    heat: 6,
    title: 'ENISA 新增四家 CVE 编号授权机构，欧洲漏洞管理体系迈出关键一步',
    summary:
      '2026年5月6日，ENISA宣布四家组织正式加入通用漏洞与暴露（CVE™）计划，成为ENISA Root下属的CVE编号授权机构（CNA）。截至目前，已有七家欧洲CNA从MITRE Root迁移至ENISA Root，加上新加入的四家机构，ENISA正在加速构建欧洲自主的漏洞管理能力。ENISA首席网络安全与运营官Hans de Vries表示，前沿AI模型正在加速漏洞发现和利用，欧洲的漏洞管理能力必须同步提升。',
    overallImpact:
      'ENISA作为欧洲CVE Root的角色进一步强化，为欧盟成员国提供了更可靠的漏洞识别和协调机制。随着数字监管框架（如NIS2、DORA）要求关键基础设施运营商加强漏洞管理，ENISA的CNA网络将为合规审计提供标准化的漏洞数据基础。',
    industryImpact:
      '在欧洲运营的云服务商和关键基础设施企业需关注：1）ENISA Root下的CVE编号管理体系将提升漏洞披露的时效性和协调性；2）欧盟网络安全监管（NIS2、DORA）对漏洞管理的合规要求将逐步细化；3）建议将ENISA CVE体系融入企业内部漏洞管理流程。',
    tags: ['ENISA', 'CVE', '漏洞管理', '网络安全', '欧洲'],
    link: 'https://www.enisa.europa.eu/news/new-cve-numbering-authorities-under-enisa-root',
    isNew: true,
  },
  {
    id: 'dpa-eu-016',
    source: 'European Commission (欧盟委员会)',
    date: '2026-05-28',
    heat: 10,
    title: '欧盟委员会依DSA对Temu开出2亿欧元创纪录罚单，认定风险评估严重不足',
    summary:
      '2026年5月28日，欧盟委员会宣布对中国跨境电商平台Temu处以2亿欧元罚款，理由是Temu未能有效遏制平台上非法商品销售，违反DSA。这是DSA框架下开出的第二张也是金额最高罚单。委员会认定Temu的风险评估"低估了具体风险、内容过于模糊、不完整"。调查还涉及推荐算法和网红推广项目放大非法商品风险。Temu表示不同意处罚并考虑上诉。欧盟要求8月28日前提交整改行动计划。',
    overallImpact:
      '这是DSA执法史上的里程碑，也是对中国跨境电商平台最严厉的DSA处罚。欧盟数字事务负责人明确表示"现在是Temu遵守法律的时候了"。与匈牙利GVH处罚和关税改革形成叠加监管效应。',
    industryImpact:
      '中国跨境电商核心警示：DSA风险评估必须实质性、数据驱动；非法商品管控须升级；算法风险纳入审查；8月28日前整改窗口期。',
    tags: ['欧盟委员会', 'Temu', 'DSA', '罚款', '跨境电商', '非法商品'],
    link: 'https://ishare.ifeng.com/c/s/v002exCtFEx5VnGjLJWEX1ci--3KZ5Z-_pxFmp1NSlTSItC0U__',
    isNew: true,
  },
  {
    id: 'dpa-eu-015',
    source: 'ENISA (欧洲网络安全局)',
    date: '2026-05-26',
    heat: 8,
    title: 'NIS合作组就网络安全事件报告通用模板达成一致，NIS2合规进入实操阶段',
    summary:
      '2026年5月26日，由欧盟成员国、欧盟委员会及ENISA组成的NIS合作组就网络安全事件报告通用模板达成一致。根据NIS2指令，关键基础设施和数字服务提供商须在发现重大事件后分步报告：24小时内早期预警、72小时内事件通知、1个月内最终报告。统一模板将大幅降低跨国企业在不同成员国运营时的合规复杂性，是NIS2全面实施前的关键基础设施准备。',
    overallImpact:
      '统一报告模板的落地标志着NIS2从立法框架进入实操合规阶段。对于在能源、交通、医疗、金融和数字基础设施领域运营的企业，这意味着必须按照统一格式和时间窗口建立网络安全事件响应和报告流程。ENISA将基于统一模板编制欧盟网络安全状况报告，为政策制定者提供数据基础。',
    industryImpact:
      '欧盟范围内的云服务商、托管服务商和数字平台提供商应立即：1）按统一模板审查现有事件响应流程；2）建立24/7安全监控和早期预警机制；3）配置跨成员国的合规报告通道。',
    tags: ['ENISA', 'NIS2', '网络安全', '事件报告', 'ENISA', '关键基础设施'],
    link: 'https://digital-strategy.ec.europa.eu/en/news',
    isNew: true,
  },
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
    id: 'dpa-eu-007',
    source: 'European Commission (欧盟委员会)',
    date: '2026-04-29',
    heat: 10,
    title: '欧盟初步认定Meta违反DSA，Instagram和Facebook未能阻止13岁以下未成年人访问',
    summary:
      '2026年4月29日，欧盟委员会发布初步调查结果，认定Meta旗下Instagram和Facebook违反DSA。欧盟技术主权事务执行副主席汉娜·维尔库宁指出Meta"几乎没有采取任何措施"阻止未达年龄限制的儿童访问平台。调查显示欧盟约10%至12%的13岁以下儿童仍在使用这两个平台。Meta的举报工具被批需多达七次点击才能报告未成年人用户。同日欧盟呼吁成员国推广EU年龄验证应用，并成立专家小组监督儿童网络安全。若违规确认，Meta面临最高全球年营收6%罚款（约121亿美元）。',
    overallImpact:
      '这是DSA最具代表性的未成年人保护执法，从事前预防和事后补救双维度施压，与冯德莱恩宣布的《数字公平法案》形成政策叠加。',
    industryImpact:
      '出海企业需升级年龄验证技术、优化举报机制、建立主动检测机制，并关注欧盟年龄验证应用技术标准。',
    tags: ['欧盟委员会', 'Meta', 'DSA', '未成年人保护', '年龄验证'],
    link: 'https://finance.sina.cn/usstock/mggd/2026-04-29/detail-inhwczpe7772974.d.html',
    isNew: true,
  },
  {
    id: 'dpa-eu-008',
    source: 'European Commission (欧盟委员会)',
    date: '2026-05-18',
    heat: 7,
    title: '欧盟委员会启动版权框架现代化公众咨询，涉及AI训练数据与数字平台内容规则',
    summary:
      '2026年5月18日，欧盟委员会发布公众咨询，就欧盟版权框架现代化征集意见。重点包括AI训练中受版权保护内容的使用规则、数字平台内容版权责任、在线内容聚合法律定位。咨询截止2026年8月。此举旨在确保版权框架与DSA、AI Act等新法规的衔接。',
    overallImpact:
      '版权改革是欧盟数字监管版图重要拼图。AI训练数据版权与AI Act形成交叉监管，数字平台内容责任与DSA内容审核制度密切相关。',
    industryImpact:
      '出海AI企业需建训练数据版权追溯机制，内容平台需重新评估欧洲内容采买模式。',
    tags: ['欧盟委员会', '版权', 'AI训练数据', 'DSA', '公众咨询'],
    link: 'https://digital-strategy.ec.europa.eu/en/news/commission-launches-call-evidence-modernise-eu-copyright-framework',
    isNew: true,
  },
  {
    id: 'dpa-eu-009',
    source: 'European AI Office (欧洲人工智能办公室)',
    date: '2026-05-19',
    heat: 9,
    title: '欧盟委员会/AI Office发布高风险AI系统分类指南草案，明确AI Act高风险认定标准与实践案例',
    summary:
      '2026年5月19日，欧盟委员会与AI Office联合发布高风险AI系统分类指南草案，提供详细的分类标准和丰富的实践案例，涵盖附件三所列的生物识别、关键基础设施、教育、就业、公共服务、执法、移民和司法等高风险领域。草案目前处于征求意见阶段。该指南的发布标志着AI Act高风险条款实施准备进入实质性阶段，为企业判定AI系统风险等级提供了明确的操作依据。',
    overallImpact:
      'AI Act高风险系统分类指南是欧盟AI监管落地的关键里程碑。指南为企业提供了明确的合规判定依据，帮助开发者在产品设计阶段即评估风险等级。',
    industryImpact:
      '中国AI出海企业需根据指南草案对自身AI系统进行风险等级判定，对照附件三清单和案例提前准备合规方案。各成员国须在5月31日前建成AI监管沙盒，建议优先利用沙盒进行合规测试。',
    tags: ['AI Office', 'AI Act', '高风险系统', '人工智能', '分类指南'],
    link: 'https://digital-strategy.ec.europa.eu/en/news',
    isNew: true,
  },
  {
    id: 'dpa-eu-010',
    source: 'European Commission (欧盟委员会)',
    date: '2026-05-19',
    heat: 8,
    title: '欧盟委员会启动反网络欺凌行动计划，推出EU-wide举报应用保护青少年',
    summary:
      '2026年5月19日，欧盟委员会宣布启动反网络欺凌行动计划（Action Plan Against Cyberbullying），基于对6000多名儿童的针对性咨询制定。三大支柱：推出EU-wide反网络欺凌举报应用；协调各国应对在线有害行为；通过良好数字实践预防网络欺凌。该计划建立在DSA等现有法规基础上。',
    overallImpact:
      '反网络欺凌行动计划与DSA未成年人保护条款、DFA成瘾性设计禁令形成“三位一体”青少年数字保护体系，进一步强化了平台责任。',
    industryImpact:
      '出海平台需升级举报机制，确保清晰的网络欺凌举报通道；加强AI驱动的主动检测和预防能力。',
    tags: ['欧盟委员会', '反网络欺凌', '未成年人保护', '青少年', 'DSA'],
    link: 'https://digital-strategy.ec.europa.eu/en',
    isNew: true,
  },
  {
    id: 'dpa-eu-006',
    source: 'European Commission (欧盟委员会)',
    date: '2026-05-05',
    heat: 8,
    title: '欧盟与日本签署数字平台监管合作协议，DSA执法扩展至亚太',
    summary:
      '2026年5月5日，欧盟委员会与日本总务省签署合作协议，在数字平台监管执法领域建立正式的国际合作机制。同日双方宣布加速在AI、数据、量子计算和芯片领域的合作。这是欧盟首次与亚太主要经济体建立正式的DSA监管执法协作机制，涵盖跨境数据共享、联合风险评估、执法信息互通等方面。此举标志着欧盟数字监管标准正向全球输出，可能形成"布鲁塞尔效应"的亚太版。',
    overallImpact:
      '欧盟的数字监管标准正在通过双边协议向全球输出。日欧合作可能推动亚太地区数字监管标准趋于一致，对在亚太运营的科技企业构成更复杂的合规环境。',
    industryImpact:
      '同时在欧盟和日本运营的出海企业需关注合规标准的趋同趋势，建议提前建立统一的跨境合规策略，特别是在数据保护、内容审核和AI治理领域。',
    tags: ['欧盟', '日本', 'DSA', '数字平台监管', '国际合作'],
    link: 'https://digital-strategy.ec.europa.eu/en',
    isNew: true,
  },
  {
    id: 'dpa-eu-005',
    source: 'European Commission (欧盟委员会)/新华网',
    date: '2026-05-14',
    heat: 10,
    title: 'WhatsApp VLOP合规截止期至5月中旬，通讯平台纳入DSA最严格监管',
    summary:
      '2026年1月27日被欧盟正式指定为VLOP的WhatsApp，须在5月中旬前全面履行DSA最严格的合规义务。这是第三个Meta旗下平台进入VLOP名单，也是首个以"频道"功能用户数达标的通讯应用。WhatsApp新增义务包括：系统性风险评估、年度外部审计、透明的内容审核、非法内容举报、限制基于用户画像的定向广告、允许用户退出推荐系统和特征分析等。欧盟明确表示以"用户规模"而非"平台类型"为VLOP认定标准，通讯平台不再豁免。',
    overallImpact:
      '这是DSA监管从社交媒体向通讯领域扩展的标志性事件。WhatsApp的合规方案对全球通讯应用具有标杆意义。端到端加密与内容审核义务之间的平衡将是核心挑战。',
    industryImpact:
      '用户量接近4500万的通讯类应用需提前准备VLOP合规方案，特别是内容审核与端到端加密的平衡策略。建议在欧盟用户数接近门槛时主动与DSA监管机构沟通。',
    tags: ['WhatsApp', 'VLOP', 'DSA', 'Meta', '合规截止'],
    link: 'https://www.news.cn/world/20260127/1e0c18d2d0ca42e4a740a15c20e76d13/c.html',
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
