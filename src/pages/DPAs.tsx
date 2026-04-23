import HeroSection from '@/components/HeroSection';
import NewsCard from '@/components/NewsCard';
import type { NewsItem } from '@/types';

const dpaUpdates: NewsItem[] = [
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
      '这是全欧盟范围内的“大考”。透明度不仅仅是写好隐私政策，还包括交互设计是否让用户真正理解数据流向。',
    industryImpact:
      '出海企业需自查：隐私通知是否简洁明了？是否在收集数据时即时告知？对第三方 SDK 的穿透式告知是否合规？',
    tags: ['EDPB', '透明度', '协同执法', 'GDPR'],
    link: 'https://www.edpb.europa.eu/news/news/2024/edpb-launches-coordinated-enforcement-transparency_en',
    isNew: true,
  },
  {
    id: 'dpa-eu-002',
    source: 'European AI Office (欧洲人工智能办公室)',
    date: '2026-04-01',
    heat: 9,
    title: '欧洲 AI 办公室发布《AI Act 高风险系统合规指南》草案',
    summary:
      '随着 2026 年 8 月 2 日高风险 AI 系统合规死线的临近，欧洲 AI 办公室发布了针对开发者和部署者的详细指南。指南明确了生物识别、关键基础设施及教育就业领域 AI 系统的具体技术文档要求和风险评估标准。',
    overallImpact:
      'AI Office 正在从政策制定转向硬性监督。该指南是企业通过合规审计的“标准答案”，不符合要求的系统将被禁止在欧盟上线。',
    industryImpact:
      '涉及高风险场景的中国 AI 企业（如智能安防、人力资源软件）必须对照指南进行技术对标，确保 8 月前完成所有合规准备。',
    tags: ['AI Office', 'AI Act', '高风险系统', '人工智能'],
    link: 'https://digital-strategy.ec.europa.eu/en/policies/ai-office',
    isNew: true,
  },
  {
    id: 'dpa-eu-003',
    source: 'ENISA (欧洲网络安全局)',
    date: '2026-04-10',
    heat: 8,
    title: 'ENISA 发布 NCAF 2.0 框架，协助成员国评估 NIS2 成熟度',
    summary:
      '为确保 NIS2 指令在各国的统一度，ENISA 发布了国家能力评估框架 (NCAF 2.0)。该框架为各国关键基础设施运营商（含数字服务提供商）设定了网络安全成熟度基准。',
    overallImpact:
      '这强化了欧盟网络安全的底层一致性。对于在多个欧盟国家运营的服务商，意味着合规门槛正趋于统一。',
    industryImpact:
      '云服务、在线市场及社交平台提供商应关注所在国依据 NCAF 2.0 制定的国家标准，加强网络安全韧性建设。',
    tags: ['ENISA', 'NIS2', '网络安全', 'NCAF'],
    link: 'https://www.enisa.europa.eu/news',
    isNew: true,
  },
  {
    id: 'dpa-eu-004',
    source: 'EBA (欧洲银行管理局)',
    date: '2026-02-15',
    heat: 9,
    title: 'EBA 发布 DORA 指令 Q&A，明确第三方信息登记簿 (RoI) 报送要求',
    summary:
      '欧洲银行管理局 (EBA) 联合其他监管机构发布了 DORA 指令的最新问答，详细说明了金融机构在 2026 年初必须提交的第三方服务信息登记簿 (RoI) 格式。重点强调了对支撑关键功能的云服务商的监控责任。',
    overallImpact:
      'DORA 进入实操监管阶段。金融机构与技术服务商的边界被打破，技术服务商将直接暴露在金融监管的穿透式审计之下。',
    industryImpact:
      '为欧洲银行提供技术服务的中国支付、云服务企业，必须配合银行客户完成 RoI 登记，并证明自身的业务连续性及风险管理能力。',
    tags: ['EBA', 'DORA', '金融科技', '第三方风险'],
    link: 'https://www.eba.europa.eu/news-press',
    isNew: true,
  },

  // ==================== 国家级别机构 ====================
  {
    id: 'dpa-uk-001',
    source: 'UK ICO (英国信息专员办公室)',
    date: '2026-03-25',
    heat: 9,
    title: '英国 ICO 就“年龄保证”机制发布最后通牒，要求平台 4 月底前提交方案',
    summary:
      '英国 ICO 联合 Ofcom 发布声明，要求社交媒体及视频平台必须采取严于“自我声明”的年龄验证手段。所有受监管平台必须在 2026 年 4 月 30 日前提交具体整改报告，否则将面临正式执法。',
    overallImpact:
      '英国在未成年人保护上采取了比欧盟更激进的节奏。年龄验证不再是“勾选框”，而是需要实名或技术识别的“硬门槛”。',
    industryImpact:
      '中国短视频及社交应用在英国必须立即上线可靠的年龄验证技术，否则将面临类似 TikTok 在美英遭遇的高压监管风险。',
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
      '瑞士 FDPIC 针对日益普及的智能手表、健身追踪器发布指南，强调生物识别数据的高度敏感性，要求厂商必须默认关闭敏感权限，并提供详尽的数据本地化处理选项。',
    overallImpact:
      '瑞士虽非欧盟成员，但其 FADP 法律体系与 GDPR 高度对齐。其对硬件隐私的关注代表了非传统互联网设备监管的新趋势。',
    industryImpact:
      '中国智能穿戴硬件商在瑞士及周边市场应强化“默认隐私”设计，并确保存储在云端的数据符合瑞士跨境传输要求。',
    tags: ['FDPIC', '智能硬件', '隐私设计', '瑞士'],
    link: 'https://www.edoeb.admin.ch/edoeb/en/home/the-fdpic/links/news.html',
    isNew: true,
  },
  {
    id: 'dpa-de-001',
    source: 'Germany BfDI (德国联邦数据保护局)',
    date: '2026-03-26',
    heat: 8,
    title: '德国通过《数据法》执行法案，确立 BfDI 与联邦网络局的双轨执法',
    summary:
      '德国联邦议院通过 DADG 法案，明确联邦网络局 (BNetzA) 负责《数据法》(Data Act) 的合规监督，而 BfDI 保持对涉及个人数据的跨领域监管权。',
    overallImpact:
      '德国监管架构的复杂化对企业提出了更高要求。同一数据处理行为可能需要向两个不同的联邦机构报备。',
    industryImpact:
      '在德经营的中国企业（如联网汽车、工业互联网商）需建立跨部门合规团队，同时对接数据流通监管与个人隐私监管。',
    tags: ['BfDI', 'Data Act', '德国', '执法协作'],
    link: 'https://www.bfdi.bund.de/EN/Service/Press/Press_node.html',
    isNew: true,
  },
  {
    id: 'dpa-tr-001',
    source: 'Turkey KVKK (土耳其个人数据保护局)',
    date: '2026-04-15',
    heat: 8,
    title: '土耳其 KVKK 发布“智能体 AI (Agentic AI)”数据保护指南',
    summary:
      '土耳其 KVKK 发布专门指南，明确 Agentic AI 系统在自主决策过程中的问责机制。强调了对衍生数据、推断数据的处理必须具备明确法律依据，且开发者需承担穿透式责任。',
    overallImpact:
      '土耳其正在迅速对齐全球最前沿的 AI 监管趋势。这对于在土运营的 AI 应用商设定了清晰的合规底线。',
    industryImpact:
      '中国 AI 企业进入土耳其市场需特别关注其对“推断数据”的严苛定义，确保算法透明度符合 KVKK 的最新解释。',
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
      '土耳其 RK（竞争管理局）宣布对多家跨国科技平台展开新调查，重点审查其利用主导地位在土耳其市场实施的应用预装和数据强行共享行为。',
    overallImpact:
      '土耳其正效仿欧盟 DMA，通过竞争法手段对大厂生态实施拆解和限制。',
    industryImpact:
      '中国手机厂商及软件分发商在土耳其市场需审视预装协议，避免被认定为损害市场公平竞争的行为。',
    tags: ['RK', '反垄断', '土耳其', '应用分发'],
    link: 'https://www.rekabet.gov.tr/en',
    isNew: true,
  },
];

export default function DPAs() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <HeroSection
        title="各国监管机构动态"
        subtitle="Regulatory Authorities Directory & Updates"
        description="一站式追踪欧盟级别（EDPB, AI Office, ENISA, EBA）及各国（英国 ICO, 瑞士 FDPIC, 德国 BfDI, 土耳其 KVKK 等）监管机构的最新政策与执法风向"
      />

      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-xl font-bold text-[#171717] pb-3 border-b border-[#e5e5e5] mb-6">
            机构动态与政策快讯
            <span className="text-sm font-normal text-[#737373] ml-2">
              共 {dpaUpdates.length} 条
            </span>
          </h2>

          <div className="flex flex-col gap-6">
            {[...dpaUpdates].sort((a, b) => b.date.localeCompare(a.date)).map((update) => (
              <NewsCard key={update.id} news={update} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
