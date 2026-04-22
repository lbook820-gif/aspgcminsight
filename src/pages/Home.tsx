import { useState, useMemo } from 'react';
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
      '对中国应用出海企业而言，苹果被罚意味着未来在欧盟区可能获得更自由的支付渠道选择权和更低的平台佣金成本。开发者和发行商应重点关注以下方面：\n\n**战略层面**：重新评估iOS应用在欧盟区的收入模型，测算12%佣金与30%内购费率的差异对利润的影响；考虑在欧盟区率先试点外部支付，积累经验后推广至其他市场。\n\n**技术层面**：调研Stripe、Adyen等第三方支付SDK的集成成本和技术难度；评估支付风控、退款处理、用户支持等运营能力的准备情况。\n\n**合规层面**：密切关注苹果整改方案的具体细节，确保外部支付链接的设计符合苹果新规要求；同时关注欧盟委员会后续执法动态，避免因过渡期违规而遭受处罚。\n\n**风险提示**：外部支付虽降低佣金，但也带来支付成功率下降、欺诈风险上升等挑战，需建立完善的支付监控和风控体系。',
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
      '中国手机厂商和第三方应用商店在欧盟市场可能迎来新的发展机遇。更开放的Android默认设置机制意味着华为AppGallery等替代商店可能被更多用户发现和选择。\n\n**对手机厂商的建议**：\n- 华为、小米、OPPO、vivo等中国品牌应积极评估在欧盟设备上预装自有应用商店的可行性\n- 与谷歌协商获取更多预装权限，争取在设备首次启动时展示自有服务的选项\n- 关注谷歌整改时间表，提前做好技术和商务准备\n\n**对应用开发者的建议**：\n- 评估在华为AppGallery、三星Galaxy Store等替代渠道上架的成本收益\n- 注意不同应用商店的用户画像差异，制定差异化的运营策略\n- 关注替代应用商店的支付政策，可能获得比Google Play更优惠的佣金费率\n\n**风险提示**：替代应用商店的用户活跃度和付费意愿可能与Google Play存在差距，需谨慎评估投入产出比。',
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
      '对于出海欧盟的中国AI应用开发者，需要立即审查产品中的数据收集点和同意流程。\n\n**合规整改清单**：\n1. **数据映射**：全面梳理AI功能涉及的个人数据类型、来源、用途和存储位置\n2. **同意机制重构**：\n   - 将AI数据处理同意从通用条款中分离，设置独立的同意弹窗\n   - 明确告知用户数据将用于AI训练的目的、方式和期限\n   - 提供细粒度的同意选项（如：仅同意功能使用，不同意训练用途）\n   - 确保用户可随时撤回同意，并提供便捷的撤回入口\n3. **技术措施**：\n   - 实施数据最小化原则，仅收集AI功能必需的数据\n   - 考虑采用联邦学习、差分隐私等技术减少数据暴露\n   - 建立数据保留期限自动删除机制\n4. **文档准备**：\n   - 更新隐私政策，详细说明AI数据处理细节\n   - 准备数据保护影响评估(DPIA)报告\n   - 建立与监管机构沟通的预案\n\n**成本估算**：合规整改可能增加10-30%的开发成本，但相比GDPR最高4%全球营收的罚款，这是必要的投资。',
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
      '采用广告变现模式的中国出海应用需密切关注此案进展，并做好以下准备：\n\n**法律依据重新评估**：\n- "合法利益"在广告定向场景下的适用空间已非常有限\n- 建议将广告数据处理的法律依据转向"同意"\n- 对于必须使用"合法利益"的场景，需进行严格的利益平衡测试并留存文档\n\n**产品设计调整**：\n1. **同意管理平台(CMP)升级**：\n   - 提供清晰的广告数据使用同意选项\n   - 支持用户对不同类型的定向广告分别授权\n   - 确保同意是主动的、知情的、可撤回的\n2. **广告系统改造**：\n   - 开发基于上下文(Contextual)而非用户画像的广告投放能力\n   - 探索群组定向(Cohort-based)等隐私友好的广告技术\n   - 准备无个性化广告的兜底方案\n3. **用户体验优化**：\n   - 提供直观的广告偏好管理界面\n   - 允许用户查看和删除广告相关的数据\n   - 设置"不追踪"选项并切实执行\n\n**收入影响预估**：\n- 从个性化广告转向非个性化广告，eCPM可能下降30-50%\n- 需重新评估欧盟市场的广告收入预期\n- 考虑通过订阅等非广告模式补充收入',
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
      '开发儿童或青少年应用的中国出海企业应立即审查产品在欧盟和全球的合规状况。\n\n**合规整改要点**：\n\n1. **数据收集审计**：\n   - 全面梳理应用收集的儿童数据类型\n   - 评估每项数据收集的必要性\n   - 移除非功能必需的数据收集点\n   - 在Play Store后台填写完整的数据安全披露表\n\n2. **广告系统调整**：\n   - 立即停止向儿童用户展示个性化广告\n   - 使用Google AdMob的儿童导向广告功能\n   - 确保广告内容适合儿童观看\n   - 考虑完全移除儿童应用的广告，转向订阅或家长付费模式\n\n3. **应用内购买合规**：\n   - 移除任何可能诱导儿童消费的设计元素\n   - 确保购买流程需要家长授权\n   - 避免使用"限时优惠"、"最后机会"等紧迫感营销语言\n   - 提供清晰的退款政策\n\n4. **年龄验证与家长控制**：\n   - 实施可靠的年龄验证机制\n   - 为家长提供完整的控制面板\n   - 支持家长设置使用时长限制\n   - 提供儿童活动报告功能\n\n5. **内容审核**：\n   - 确保所有内容适合目标年龄段\n   - 建立内容审核流程\n   - 对用户生成内容实施严格过滤\n\n**商业模式转型建议**：\n- 从"免费+广告/IAP"转向"家长订阅制"\n- 开发教育价值高的功能，支撑付费意愿\n- 考虑与学校/教育机构合作的B2B模式',
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
      '对出海欧洲的中国科技企业而言，此案提供了重要的合规教训：\n\n**案件关键要点**：\n1. 苹果违规的根本原因是过度依赖第三方合规工具和开发者自我声明\n2. Okko的母公司被制裁后，苹果未能及时更新其风险评估\n3. 已发出的支付指令在制裁生效后未被及时撤销\n4. OFSI明确指出：企业必须建立"主动的、自主的"制裁筛查机制\n\n**合规建议**：\n\n1. **制裁筛查机制建设**：\n   - 不能仅依赖第三方筛查服务，必须建立内部复核流程\n   - 对高风险司法管辖区（俄罗斯、伊朗、朝鲜等）的合作方实施加强尽职调查\n   - 建立合作方所有权结构的持续监控机制\n   - 订阅制裁名单实时更新服务，确保T+0更新\n\n2. **支付流程管控**：\n   - 对跨境支付实施制裁名单二次核查\n   - 建立支付冻结机制，一旦触发风险信号立即暂停\n   - 保留完整的支付审批记录，便于事后追溯\n\n3. **应急响应预案**：\n   - 制定制裁名单变更后的应急响应流程\n   - 明确各部门职责分工\n   - 定期进行桌面演练\n\n4. **主动披露策略**：\n   - 发现潜在违规后应立即启动内部调查\n   - 评估是否需要主动向监管机构报告\n   - 主动披露可获得最高35%的罚款折扣\n\n**对中国企业的特殊提醒**：\n- 即使公司注册地不在英国，只要使用英国银行系统处理支付，就受英国制裁法规管辖\n- 中国企业可能面临更复杂的国际制裁环境，需同时关注美、英、欧等多方制裁名单\n- 建议聘请专业的制裁合规律师团队进行定期审查',
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
      '在欧盟区运营的iOS应用开发者和发行商应立即评估启用外部支付链接的成本收益。\n\n**收益分析**：\n- 佣金从30%降至12%，节省18个百分点\n- 以100万欧元年收入为例，可节省约18万欧元佣金\n- 第三方支付服务商费率通常为2.9%+0.30欧元，综合成本约15%\n\n**实施方案**：\n\n1. **技术准备**：\n   - 选择支付服务商：Stripe、Adyen、Paddle等均支持欧盟区\n   - 集成支付SDK，处理订阅、一次性购买等多种场景\n   - 开发支付状态同步机制，确保用户权益实时更新\n   - 建立支付失败重试和异常处理流程\n\n2. **合规要求**：\n   - 在App Store Connect中申请外部支付链接权限\n   - 确保应用内的支付引导符合苹果设计规范\n   - 保留完整的交易记录，应对苹果审计\n\n3. **运营调整**：\n   - 建立独立的客服团队处理支付相关问题\n   - 开发退款和纠纷处理流程\n   - 准备多币种、多支付方式的用户支持\n\n4. **风险管理**：\n   - 评估支付成功率下降的风险（外部支付可能比内购低5-10%）\n   - 建立欺诈检测和防范机制\n   - 准备支付服务商故障的应急预案\n\n**分阶段推进建议**：\n- 第一阶段：在新应用或小体量应用中试点\n- 第二阶段：收集数据，优化转化率\n- 第三阶段：逐步推广至主力应用\n- 第四阶段：根据效果决定是否全量切换\n\n**注意事项**：\n- 外部支付政策仅适用于欧盟经济区，需做好地区判断\n- 用户可能对外部支付链接感到陌生，需做好引导和教育\n- 保持内购通道作为备选，为不愿使用外部支付的用户提供选择',
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

// 搜索过滤函数
function filterNews(news: NewsItem[], keyword: string): NewsItem[] {
  if (!keyword.trim()) return news;
  
  const lowerKeyword = keyword.toLowerCase();
  return news.filter((item) => {
    // 搜索标题
    if (item.title.toLowerCase().includes(lowerKeyword)) return true;
    // 搜索摘要
    if (item.summary.toLowerCase().includes(lowerKeyword)) return true;
    // 搜索标签
    if (item.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword))) return true;
    // 搜索来源
    if (item.source.toLowerCase().includes(lowerKeyword)) return true;
    // 搜索整体影响
    if (item.overallImpact.toLowerCase().includes(lowerKeyword)) return true;
    // 搜索行业影响
    if (item.industryImpact.toLowerCase().includes(lowerKeyword)) return true;
    
    return false;
  });
}

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // 使用 useMemo 优化过滤性能
  const filteredNews = useMemo(() => {
    return filterNews(weeklyNews, searchKeyword);
  }, [searchKeyword]);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <HeroSection
        title="欧洲移动应用合规洞察"
        subtitle="European Mobile App Compliance Insights"
        description="聚焦欧盟数字法规、应用合规监管与欧洲数据保护动态"
        updateDate="2026年4月22日"
      />

      <SearchSection 
        searchValue={searchKeyword}
        onSearchChange={setSearchKeyword}
      />

      {/* Weekly News */}
      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center justify-between pb-3 border-b border-[#e5e5e5]">
            <h2 className="text-xl font-bold text-[#171717]">
              上周快讯一览
            </h2>
            {searchKeyword && (
              <span className="text-sm text-[#525252]">
                找到 {filteredNews.length} 条相关新闻
              </span>
            )}
          </div>
          
          {filteredNews.length > 0 ? (
            <div className="mt-6 flex flex-col gap-6">
              {filteredNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          ) : (
            <div className="mt-6 py-12 text-center">
              <p className="text-[#737373]">未找到与"{searchKeyword}"相关的新闻</p>
              <button
                onClick={() => setSearchKeyword('')}
                className="mt-3 text-sm text-[#2563eb] hover:underline"
              >
                清除搜索
              </button>
            </div>
          )}
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
