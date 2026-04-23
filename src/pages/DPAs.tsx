import HeroSection from '@/components/HeroSection';
import NewsCard from '@/components/NewsCard';
import type { NewsItem } from '@/types';

const dpaUpdates: NewsItem[] = [
  {
    id: 'dpa-001',
    source: 'Irish DPC',
    date: '2026-04-12',
    heat: 9,
    title: '爱尔兰 DPC 对 X (原 Twitter) 启动新一轮数据处理安全调查',
    summary:
      '2026年4月12日，爱尔兰数据保护委员会 (DPC) 宣布对 X 平台启动正式调查。调查重点在于该平台在处理数千万欧洲用户个人数据时，是否采取了足够的技术和组织措施来应对日益严峻的网络安全威胁。DPC 指出，此前发现的多起小规模漏洞可能暗示其核心架构存在系统性合规风险。',
    overallImpact:
      '爱尔兰 DPC 作为众多大厂在欧盟的领先监管机构，其执法风向标作用显著。此案可能引发对大厂"降本增效"下合规投入是否缩水的全行业审计。',
    industryImpact:
      '中国社交媒体和内容出海企业应以此为鉴，在欧洲运营时必须确保安全基建的持续投入。建议定期进行第三方合规审计，并向监管机构主动报备重大架构调整。',
    tags: ['爱尔兰 DPC', 'X', '数据安全', 'GDPR'],
    isNew: true,
  },
  {
    id: 'dpa-002',
    source: 'French CNIL',
    date: '2026-04-05',
    heat: 8,
    title: '法国 CNIL 启动 2026 年度协同执法：聚焦透明度与信息告知义务',
    summary:
      '配合欧洲数据保护委员会 (EDPB) 的统一部署，法国国家信息与自由委员会 (CNIL) 于2026年4月5日正式启动年度协同执法行动。本次行动将针对移动应用中的隐私政策、数据收集知情权及第三方 SDK 告知义务进行大规模审计。CNIL 明确表示，透明度是 GDPR 的基石，不完整的告知将面临重罚。',
    overallImpact:
      '全欧盟范围内的协同执法意味着监管尺度将高度统一。针对透明度的专项整治将迫使大量应用更新其隐私协议，并规范第三方代码的数据收集行为。',
    industryImpact:
      '出海应用需立即自查：1. 隐私政策是否包含所有必要的告知项；2. 告知语言是否简洁明了；3. 对第三方 SDK 的数据处理行为是否做到了穿透式披露。',
    tags: ['CNIL', '透明度', '协同执法', 'GDPR'],
    isNew: true,
  },
  {
    id: 'dpa-003',
    source: 'Spanish AEPD',
    date: '2026-04-18',
    heat: 7,
    title: '西班牙 AEPD 针对中小企业数据违规开出多笔高额罚单',
    summary:
      '西班牙数据保护局 (AEPD) 在2026年4月中旬公布了多起执法结果，与以往聚焦大厂不同，本次处罚涉及多个行业的非科技类中小企业。处罚原因多为缺乏合法的处理依据以及在未获得用户同意的情况下进行营销电话拨打。AEPD 强调，GDPR 的合规义务不分企业规模。',
    overallImpact:
      '这标志着监管颗粒度正向全行业、各规模企业渗透。不仅是大厂，所有在西班牙经营的实体都必须建立基础的合规防火墙。',
    industryImpact:
      '中小规模出海企业（如电商卖家、小型 SaaS）不可抱有侥幸心理。应至少完成用户同意管理系统 (CMP) 的部署，并确保所有营销活动都有明确的法律依据记录。',
    tags: ['AEPD', '西班牙', '营销合规', '中小企业'],
    isNew: true,
  },
  {
    id: 'dpa-004',
    source: 'EDPB / 各国监管机构',
    date: '2026-04-20',
    heat: 10,
    title: '数据跨境传输新红线：TRAs 风险评估成为强制审计重点',
    summary:
      '2026年4月，欧盟各主要监管机构（包括爱尔兰、法国、西班牙）在联合声明中明确：所有涉及向非充分性认定国家（如中国、美国、印度等）传输数据的行为，必须具备书面且详尽的传输风险评估 (TRA)。监管机构指出，单纯签署标准合同条款 (SCCs) 而未进行实地风险评估的行为，将被视为严重不合规。',
    overallImpact:
      '数据跨境的门槛实质性抬高。TRAs 不再是可选项，而是必须随时备查的法律文档。这增加了跨国运营的合规文书成本和技术对标压力。',
    industryImpact:
      '中国出海企业核心动作：1. 建立完善的 TRA 模板和评估流程；2. 针对中国服务器存储的数据，必须实施端到端加密、去标识化等补充技术措施；3. 确保一旦监管机构调阅，能立即提供完整的合规链条证明。',
    tags: ['数据跨境', 'TRA', 'SCCs', '传输风险评估'],
    isNew: true,
  },
];

export default function DPAs() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <HeroSection
        title="各国数据保护局动态"
        subtitle="Data Protection Authorities (DPAs) Updates"
        description="追踪欧盟各国监管机构（爱尔兰 DPC、法国 CNIL、西班牙 AEPD 等）的最新执法趋势与合规要求"
      />

      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-xl font-bold text-[#171717] pb-3 border-b border-[#e5e5e5] mb-6">
            最新动态与执法快讯
            <span className="text-sm font-normal text-[#737373] ml-2">
              共 {dpaUpdates.length} 条
            </span>
          </h2>

          <div className="mt-6 flex flex-col gap-6">
            {dpaUpdates.map((update) => (
              <NewsCard key={update.id} news={update} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
