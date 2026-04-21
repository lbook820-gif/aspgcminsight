import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import SearchSection from '@/components/SearchSection';
import NewsCard from '@/components/NewsCard';
import type { NewsItem, DynamicCard } from '@/types';

const weeklyNews: NewsItem[] = [
  {
    id: '1',
    source: 'Reuters / TechCrunch',
    date: '2026-04-20',
    heat: 9,
    title: '欧盟委员会对苹果开出5亿欧元罚单，指控App Store阻碍开发者公平竞争',
    summary:
      '欧盟委员会于2026年4月20日宣布对苹果公司处以5亿欧元罚款，指控其违反《数字市场法》(DMA)。监管机构认为苹果通过App Store的替代支付条款限制了应用开发者的商业自由，未能允许开发者自由引导用户至外部支付渠道。苹果被要求在未来30天内整改其App Store政策，否则将面临进一步处罚。这是DMA生效以来针对苹果的最大一笔罚款。',
    overallImpact:
      '此次罚款标志着欧盟对DMA执法进入实质性阶段，向所有守门人平台传递了强烈信号：反垄断规则不再停留在纸面。对全球应用商店运营商而言，苹果案将成为合规整改的标杆案例，可能加速推动开放支付和降低佣金比例的全球趋势。',
    industryImpact:
      '对中国应用出海企业而言，苹果被罚意味着未来在欧盟区可能获得更自由的支付渠道选择权和更低的平台佣金成本。开发者和发行商应密切关注苹果整改方案，提前评估绕过App Store内购的可行性及其对收入模型的影响。',
    tags: ['苹果', 'DMA', 'App Store', '数字市场法'],
    isNew: true,
  },
  {
    id: '2',
    source: 'Bloomberg',
    date: '2026-04-18',
    heat: 8,
    title: '谷歌同意修改欧盟Android默认搜索引擎机制，以解决DMA合规争议',
    summary:
      '谷歌于2026年4月18日宣布将修改其在欧盟的Android默认搜索引擎选择机制，以回应欧盟委员会对其违反DMA的调查。新机制将让欧盟用户在设备首次设置时更明显地看到搜索引擎选项，并简化切换流程。谷歌同时承诺放宽对预装应用和第三方应用商店的限制，允许更多替代应用分发渠道。',
    overallImpact:
      '谷歌的让步表明DMA执法正在产生实质性市场效果。搜索引擎选择权机制的修改可能影响谷歌在欧盟的移动搜索市场份额，为Bing、DuckDuckGo等竞争对手创造机会。Android生态的进一步开放也将为第三方应用商店和替代支付系统创造更大空间。',
    industryImpact:
      '中国手机厂商和第三方应用商店在欧盟市场可能迎来新的发展机遇。更开放的Android默认设置机制意味着华为AppGallery等替代商店可能被更多用户发现和选择。建议相关方积极评估欧盟市场的预装和分发策略调整。',
    tags: ['谷歌', 'Android', 'DMA', '搜索引擎'],
    isNew: true,
  },
  {
    id: '3',
    source: 'The Verge / EUobserver',
    date: '2026-04-16',
    heat: 7,
    title: '欧盟数据保护委员会发布AI应用数据处理新指引，强化用户同意要求',
    summary:
      '欧洲数据保护委员会(EDPB)于2026年4月15日发布关于AI应用中个人数据处理的新指引文件，明确要求AI驱动的移动应用在处理用户数据时必须获得"具体、知情且自由"的同意。指引特别强调，用于训练AI模型的数据收集不能隐藏在通用服务条款中，必须单独明确告知用户。违反新规的应用可能面临GDPR框架下最高全球营收4%的罚款。',
    overallImpact:
      '新指引显著提高了AI应用在欧盟市场的合规门槛。使用机器学习或生成式AI功能的应用需要重新审视其数据处理流程和用户同意机制。这一规定将影响全球范围内面向欧盟用户的AI驱动应用，包括个性化推荐、智能助手、AI生成内容等功能。',
    industryImpact:
      '对于出海欧盟的中国AI应用开发者，需要立即审查产品中的数据收集点和同意流程。建议在应用内设置独立的AI数据处理同意弹窗，并确保用户可以随时撤回同意。合规成本可能上升，但早期整改有助于避免高额罚款。',
    tags: ['GDPR', 'AI', '数据保护', 'EDPB'],
    isNew: true,
  },
  {
    id: '4',
    source: 'Financial Times',
    date: '2026-04-14',
    heat: 8,
    title: 'Meta因定向广告数据处理违规被爱尔兰DPC罚款3.2亿欧元',
    summary:
      '爱尔兰数据保护委员会(DPC)于2026年4月14日宣布对Meta Platforms处以3.2亿欧元罚款，指控其在Facebook和Instagram应用中处理用户个人数据用于定向广告时违反GDPR规定。DPC认定Meta未能充分证明其"合法利益"作为数据处理的法律依据，且用户对广告投放的数据使用缺乏足够控制权。Meta表示将对裁决提出上诉。',
    overallImpact:
      '此案再次确认了GDPR对数字广告商业模式的严格约束，特别是"合法利益"这一法律依据的适用边界被进一步收窄。依赖广告变现的应用和平台需要重新评估其数据收集和使用策略，确保拥有充分法律依据。这一趋势可能推动更多平台转向基于同意或更少依赖个人数据的广告模式。',
    industryImpact:
      '采用广告变现模式的中国出海应用需密切关注此案进展。建议在欧盟区实施更透明的广告数据使用说明，并考虑提供用户退出定向广告的明确选项。长期来看，探索不依赖个人数据追踪的替代广告方案有助于降低合规风险。',
    tags: ['Meta', 'GDPR', '定向广告', 'DPC'],
    isNew: true,
  },
  {
    id: '5',
    source: '9to5Google / XDA Developers',
    date: '2026-04-12',
    heat: 6,
    title: 'Google Play更新开发者政策：强化儿童应用数据收集限制与内容审核',
    summary:
      'Google于2026年4月11日发布Google Play开发者政策更新，进一步收紧对儿童应用(面向13岁以下用户)的数据收集要求。新规要求所有儿童应用必须在Play Store详情页明确披露数据收集类型和目的，且禁止向儿童展示个性化广告。同时，Google加强了对应用内购买和订阅的审核，要求面向儿童的应用不得包含诱导性消费设计。',
    overallImpact:
      'Google Play的儿童应用政策更新反映了全球对儿童数字隐私保护的强化趋势。这一变化将迫使大量面向儿童的应用进行合规整改，包括教育应用、游戏和娱乐平台。不合规应用可能面临下架风险。同时，禁止个性化广告和诱导消费将显著影响儿童应用的商业模式。',
    industryImpact:
      '开发儿童或青少年应用的中国出海企业应立即审查产品在欧盟和全球的合规状况。建议进行全面的数据收集审计，移除儿童用户的个性化广告，并确保应用内购买流程透明无诱导。家长控制功能和年龄验证机制也需要同步升级。',
    tags: ['Google Play', '儿童隐私', '应用政策', '数据收集'],
    isNew: true,
  },
  {
    id: '5a',
    source: 'Reuters / Financial Times',
    date: '2026-03-30',
    heat: 8,
    title: '英国OFSI对苹果子公司罚款39万英镑，因违反俄罗斯金融制裁规定',
    summary:
      '英国金融制裁执行办公室(OFSI)于2026年3月19日对苹果欧洲子公司Apple Distribution International处以39万英镑罚款。该公司在2022年6月至7月期间通过英国银行向俄罗斯流媒体平台Okko支付了总计63.5万英镑，而当时Okko的母公司JSC New Opportunities已于2022年6月29日被列入英国制裁名单。苹果称发现违规后已主动向英国政府报告，但仍因依赖第三方合规筛查、未能及时识别所有权变更而被处罚。这是OFSI首次通过和解程序解决的处罚案件。',
    overallImpact:
      '此案是OFSI首次通过2026年2月新引入的和解框架处理的金融制裁处罚案件，具有重要的程序性意义。罚款金额虽相对较小（从基准60万英镑经35%折扣后降至39万英镑），但传递了明确的合规信号：即使是无意违规，只要未建立充分的制裁筛查机制，仍将被追究责任。此案也凸显跨国企业在复杂制裁环境下的合规挑战，尤其是依赖集团内部流程和第三方筛查工具时的风险。',
    industryImpact:
      '对出海欧洲的中国科技企业而言，此案警示即使非英国公司，只要通过英国银行系统处理支付，就必须遵守英国制裁法规。建议所有在欧洲运营的移动应用企业：建立自主的制裁筛查机制，而非仅依赖第三方工具或开发者自证；持续监控合作方的所有权变更，尤其是在高风险司法管辖区；确保有实时制裁名单更新系统，能够在指定生效后立即触发支付暂停流程。',
    tags: ['苹果', 'OFSI', '俄罗斯制裁', '金融制裁'],
    isNew: true,
  },
  {
    id: '6',
    source: 'AppleInsider / Reuters',
    date: '2026-04-10',
    heat: 7,
    title: 'Apple宣布欧盟区开发者可使用外部支付链接，佣金降至12%',
    summary:
      '苹果公司于2026年4月10日宣布，为响应DMA合规要求，自2026年5月起允许欧盟区iOS应用向用户提供外部支付链接。同时，通过外部支付完成的交易佣金将从原来的27%降至12%。苹果还简化了申请外部支付链接的流程，开发者无需再提交详细的平台替代方案说明。新政策目前仅适用于在欧盟经济区上架的应用。',
    overallImpact:
      '苹果大幅降低外部支付佣金是应用商店经济学的重大转折，将直接提升开发者利润率并可能拉低应用和服务在欧盟区的定价。其他市场(如美国、日韩)的监管机构可能借此施压，要求苹果在全球范围内实施类似政策。第三方支付服务商将迎来显著增长机会。',
    industryImpact:
      '在欧盟区运营的iOS应用开发者和发行商应立即评估启用外部支付链接的成本收益。12%佣金相比30%内购费率具有明显优势，但需要额外集成第三方支付和承担支付处理风险。建议先在高ARPU应用中试点，逐步扩展至全线产品。',
    tags: ['苹果', '支付佣金', 'DMA', '外部支付'],
    isNew: true,
  },
];

const dynamicCards: DynamicCard[] = [
  {
    id: '1',
    title: '法律法规',
    articleTitle:
      '欧盟通过《人工智能法》最终文本，移动AI应用面临严格合规审查',
    source: 'EUobserver',
    date: '2026-04-19',
    heat: 8,
    link: '/laws',
  },
  {
    id: '2',
    title: '行业动态',
    articleTitle:
      '欧洲第三方支付平台Adyen推出应用内支付SDK，支持替代应用商店',
    source: 'TechCrunch',
    date: '2026-04-17',
    heat: 6,
    link: '/laws',
  },
  {
    id: '3',
    title: '执法动态',
    articleTitle:
      '法国CNIL对两家中国电商应用开出1200万欧元罚单，指控跨境数据传输违规',
    source: 'Le Monde',
    date: '2026-04-15',
    heat: 9,
    link: '/enforcement',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <HeroSection
        title="欧洲移动应用合规洞察"
        subtitle="European Mobile App Compliance Insights"
        description="聚焦欧盟数字法规、应用合规监管与欧洲数据保护动态"
        updateDate="2026年4月22日"
      />

      <SearchSection />

      {/* Weekly News */}
      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-xl font-bold text-[#171717] pb-3 border-b border-[#e5e5e5]">
            上周快讯一览
          </h2>
          <div className="mt-6 flex flex-col gap-6">
            {weeklyNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Dynamics */}
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
