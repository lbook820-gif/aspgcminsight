import HeroSection from '@/components/HeroSection';
import NewsCard from '@/components/NewsCard';
import type { LegislationItem, NewsItem } from '@/types';

const legislationItems: LegislationItem[] = [
  {
    id: '1',
    name: '《数字市场法》(DMA) — 守门人合规义务',
    status: '已生效',
    summary:
      '2024年3月起全面生效，针对苹果、谷歌、Meta等守门人平台设定一系列开放义务，包括允许第三方应用商店、开放支付渠道、禁止自我偏好等。违反者最高可处全球营收10%罚款。',
    impactScope: '所有在欧盟运营的应用商店、社交媒体平台、搜索引擎',
    updateTime: '2026-04-20',
  },
  {
    id: '2',
    name: '《人工智能法》(AI Act) — AI应用合规框架',
    status: '分阶段生效',
    summary:
      '2026年2月起高风险AI系统禁令生效。虽然原定2026年8月全面适用，但受"数字综合法案"（Digital Omnibus）修法影响，合规期限可能延后至2027年。对移动应用中使用的AI功能(推荐算法、内容审核等)设定分级监管要求。',
    impactScope: '所有在欧盟提供AI功能的移动应用',
    updateTime: '2026-04-23',
  },
  {
    id: '3',
    name: '《数字服务法》(DSA) — 内容审核与平台责任',
    status: '已生效',
    summary:
      '2024年2月起全面适用，要求大型在线平台建立内容审核机制、广告透明度系统和风险管理体系。移动应用作为内容传播渠道，需建立投诉处理机制和非法内容报告系统。',
    impactScope: '社交媒体、内容平台、电商应用',
    updateTime: '2026-04-15',
  },
  {
    id: '4',
    name: '《通用数据保护条例》(GDPR) — 数据保护基线',
    status: '已生效',
    summary:
      '2018年生效的数据保护基石法规，要求所有处理欧盟居民数据的移动应用具备合法处理依据、用户同意机制、数据最小化原则和跨境传输保障措施。违规罚款最高可达全球营收4%。',
    impactScope: '所有处理欧盟用户数据的应用',
    updateTime: '2026-04-12',
  },
  {
    id: '5',
    name: '《数字市场、竞争和消费者法案》(DMCC) — 英国科技监管新标杆',
    status: '已生效',
    summary:
      '2026年4月正式通过。赋予英国 CMA 直接监管具有“战略市场地位”企业的权力，违规处罚最高可达全球营收的 10%。重点针对应用商店、搜索引擎及在线广告的竞争公平性。',
    impactScope: '所有在英国拥有重要市场地位的科技巨头及其生态系统',
    updateTime: '2026-04-25',
  },
  {
    id: '6',
    name: '《维修权指令》（Right to Repair） — 硬件可持续性新规',
    status: '已生效',
    summary:
      '2026年4月正式通过。要求电子产品制造商在保修期后仍需提供平价维修服务，并推动零部件市场的开放。旨在打击计划性报废，促进绿色循环经济。',
    impactScope: '所有在欧盟销售的消费电子硬件厂商',
    updateTime: '2026-04-24',
  },
  {
    id: '7',
    name: '《数字综合法案》（Digital Omnibus） — 监管简化框架',
    status: '审议中',
    summary:
      '2026年4月披露细节，旨在整合 GDPR、Data Act 和 AI Act 的重叠合规要求。目前处于三方会谈（Trilogue）阶段，重点解决跨法规的数据使用冲突和重复审计问题，以减轻中小企业负担。',
    impactScope: '所有在欧盟运营并涉及多项数字法规合规的企业',
    updateTime: '2026-04-18',
  },
];

const industryNews: NewsItem[] = [
  {
    id: 'i1',
    source: 'TechCrunch',
    date: '2026-04-17',
    heat: 6,
    title: '欧洲第三方支付平台Adyen推出应用内支付SDK，支持替代应用商店',
    summary:
      'Adyen于2026年4月17日发布专为替代应用商店设计的应用内支付SDK，支持欧盟区开发者绕过苹果和谷歌的官方支付系统。新SDK集成了SEPA直接扣款、欧洲本地钱包和分期付款选项，手续费率为2.9% + \u20ac0.30。',
    overallImpact:
      'Adyen的举措填补了DMA开放支付要求背后的基础设施缺口，为第三方应用商店提供了完整的支付解决方案。这可能加速替代应用商店的商业可行性，降低对苹果谷歌支付的依赖。',
    industryImpact:
      '中国出海开发者可以考虑集成Adyen等欧洲本地支付方案，在欧盟区提供更有竞争力的支付体验和更低的交易成本。',
    tags: ['Adyen', '第三方支付', 'DMA', '应用商店'],
    link: 'https://www.adyen.com/newsroom',
    isNew: true,
  },
  {
    id: 'i2',
    source: 'Sifted',
    date: '2026-04-13',
    heat: 7,
    title: '欧洲游戏开发者联盟发起请愿，要求统一应用商店佣金上限为15%',
    summary:
      '欧洲游戏开发者联盟(EGDF)于2026年4月13日向欧盟委员会提交正式请愿书，要求通过DMA修正案或新法规将应用商店佣金上限统一设定为15%。请愿书获得超过200家欧洲游戏工作室签署，指出当前30%的佣金比例严重挤压中小型开发者的利润空间。',
    overallImpact:
      '若请愿获得立法支持，将根本性重塑应用商店经济学。15%佣金上限可能迫使苹果和谷歌大幅降低全球费率，或至少在欧洲区实施差异化定价。这将显著提升开发者利润率，但可能减少平台投入生态建设的资源。',
    industryImpact:
      '中国游戏出海企业应密切关注此立法动向。15%佣金上限若实现，将显著提升在欧盟区的游戏发行利润率。建议相关企业参与或支持类似的行业倡议，同时评估不同佣金率对定价策略的影响。',
    tags: ['游戏开发者', '应用商店佣金', 'EGDF', 'DMA'],
    link: 'https://www.egdf.eu/news/',
    isNew: true,
  },
  {
    id: 'i3',
    source: 'The Guardian',
    date: '2026-04-09',
    heat: 6,
    title: '欧盟推动儿童数字权利法案，限制应用内购买和个性化内容',
    summary:
      '欧盟委员会正在起草一项专门针对儿童数字权利的新法案，预计2026年下半年提交审议。草案内容包括：禁止16岁以下用户使用应用内购买、限制对儿童用户的个性化算法推荐、强制所有儿童应用提供"数字健康"使用时长提醒。',
    overallImpact:
      '儿童数字权利法案若通过，将对儿童应用和泛娱乐应用产生深远影响。应用内购买禁令可能影响儿童游戏和教育应用的主要商业模式；推荐算法限制将降低用户粘性；数字健康功能增加了开发成本。预计全球其他市场将跟进类似立法。',
    industryImpact:
      '面向儿童或青少年的中国出海应用需要提前评估业务模式转型。建议探索基于订阅(家长付费)的模式替代应用内购买，并研发不依赖个性化推荐的内容发现机制。',
    tags: ['儿童数字权利', '应用内购买', '数字健康', '欧盟立法'],
    link: 'https://ec.europa.eu/commission/presscorner/detail/en/ip_24_1689',
    isNew: true,
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case '已生效':
      return 'bg-green-100 text-green-700';
    case '分阶段生效':
      return 'bg-amber-100 text-amber-700';
    case '审议中':
      return 'bg-blue-100 text-blue-700';
    case '即将生效':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export default function Laws() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <HeroSection
        title="法律法规与行业动态"
        subtitle="Laws, Regulations & Industry Trends"
        description="追踪欧盟数字法规立法进程、政策解读与行业影响分析"
      />

      {/* Featured Legislation */}
      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-xl font-bold text-[#171717] pb-3 border-b border-[#e5e5e5] mb-6">
            关键法规概览
            <span className="text-sm font-normal text-[#737373] ml-2">
              共 {legislationItems.length} 条
            </span>
          </h2>
          <div className="flex flex-col gap-4">
            {[...legislationItems].sort((a, b) => b.updateTime.localeCompare(a.updateTime)).map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#e5e5e5] rounded-xl p-6 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow duration-200"
              >
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <h3 className="text-base font-semibold text-[#171717]">
                    {item.name}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-[#525252] leading-relaxed mb-3">
                  {item.summary}
                </p>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#737373]">
                      影响范围：{item.impactScope}
                    </span>
                  </div>
                  <span className="text-xs text-[#737373]">
                    更新时间：{item.updateTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Trends */}
      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-xl font-bold text-[#171717] pb-3 border-b border-[#e5e5e5] mb-6">
            行业动态
            <span className="text-sm font-normal text-[#737373] ml-2">
              共 {industryNews.length} 条
            </span>
          </h2>
          <div className="flex flex-col gap-6">
            {[...industryNews].sort((a, b) => b.date.localeCompare(a.date)).map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
