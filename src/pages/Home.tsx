import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import SearchSection from '@/components/SearchSection';
import NewsCard from '@/components/NewsCard';
import type { NewsItem, DynamicCard } from '@/types';

// 当日新增快讯 - 2026年4月22日检索更新（已验证原文链接）
const todayNews: NewsItem[] = [
  {
    id: '1',
    source: '欧盟委员会 / 36氪',
    date: '2026-04-23',
    heat: 10,
    title: '欧盟首次动用DMA开出7亿欧元罚单，苹果5亿欧元、Meta2亿欧元',
    summary:
      '2026年4月23日，欧盟委员会宣布根据《数字市场法案》(DMA)对苹果和Meta分别处以5亿欧元和2亿欧元罚款，总计7亿欧元。这是DMA自2024年3月生效以来开出的首张罚单。苹果因App Store违反DMA引导限制条款被罚，欧盟调查显示苹果设置多重限制致使开发者无法自由告知用户其他付费渠道。Meta则因"同意数据收集或付费订阅"二选一模式违反DMA规定。',
    overallImpact:
      '此次处罚标志着DMA执法进入实质性阶段，向所有守门人平台传递强烈信号。欧盟委员会强调处罚旨在确保科技巨头遵守DMA规则，维护数字市场公平竞争环境。这是继2024年3月DMA全面实施后，欧盟首次对违规企业开出罚单，具有里程碑意义。',
    industryImpact:
      '对中国出海企业的关键影响：\n\n**战略层面**：\n- 苹果被罚意味着App Store引导限制被认定违法，开发者可更自由地告知用户替代支付渠道\n- Meta的"付费或同意"模式被否定，广告变现模式需重新设计\n- 建议评估在欧盟区的商业模式是否符合DMA要求\n\n**技术层面**：\n- iOS应用可考虑添加外部支付引导功能\n- 广告系统需提供"低数据使用量广告服务"选项\n- 数据收集需获得用户明确同意\n\n**合规层面**：\n- 审查App Store应用是否符合引导条款要求\n- 评估广告系统的数据使用模式\n- 关注欧盟委员会后续执法动态\n\n**风险提示**：DMA违规最高可处全球年营业额10%罚款，重复违规可达20%，需高度重视合规风险。',
    tags: ['DMA', '苹果', 'Meta', '欧盟委员会', '数字市场法'],
    link: 'https://www.36kr.com/p/3263607955078913',
    isNew: true,
  },
  {
    id: '2',
    source: '腾讯新闻',
    date: '2026-04-22',
    heat: 9,
    title: '两年被罚70亿美元！特朗普政府怒斥欧盟罚款是"对美国科技巨头的关税"',
    summary:
      '据腾讯新闻报道，欧盟在过去两年内对美国科技巨头开出的罚单总额已超过60亿欧元（约合70亿美元）。特朗普政府官员怒斥这些罚款实质上是"对美国科技巨头的关税"。美国驻欧盟大使直言，欧盟"不能一边过度监管、一边随意移动监管红线、一边对企业开出巨额罚单"。',
    overallImpact:
      '美欧在科技监管领域的博弈持续升级。欧盟坚持执行DMA、GDPR等法规，而美国政府则认为这些罚款具有歧视性。这种政治紧张局势可能影响跨大西洋贸易关系，但短期内不太可能改变欧盟的执法立场。',
    industryImpact:
      '对中国出海企业的启示：\n\n**战略层面**：\n- 欧盟监管不会因政治压力而放松，需做好长期合规准备\n- 美欧博弈可能为中国企业提供一定的战略窗口期\n- 建议建立专门的欧盟合规团队\n\n**技术层面**：\n- 持续关注DMA、GDPR、AI Act等法规的实施细则\n- 建立灵活的产品架构，便于根据监管要求调整\n- 投资合规技术工具，降低合规成本\n\n**风险提示**：政治因素不会成为合规的"护身符"，反而可能使监管更严格。中国企业应避免被卷入美欧监管博弈。',
    tags: ['欧盟', '美国', '科技监管', '罚款', '贸易摩擦'],
    link: 'https://news.qq.com/rain/a/20260411A003EH',
    isNew: true,
  },
  {
    id: '3',
    source: '中国经济网',
    date: '2026-04-22',
    heat: 8,
    title: '中国反垄断监管出手：苹果应用商店佣金降至全球最低水平',
    summary:
      '据中国经济网报道，经过中国反垄断监管机构的努力，苹果应用商店在中国的佣金费率已调整为标准企业25%、小型企业12%，降幅显著，基本达到全球范围内的最低水平。报道指出，欧盟构建了全球最严格的应用商店佣金监管体系，美国则以司法诉讼主导渐进式改革，而中国的监管成效已显现。',
    overallImpact:
      '中国反垄断监管在应用商店领域取得实质性突破，苹果在中国的佣金费率已低于欧盟(17%+核心技术费)和美国(加权后仍较高)。这为全球应用商店经济学的变革提供了中国样本，也可能影响其他国家和地区的监管政策。',
    industryImpact:
      '对中国开发者的直接影响：\n\n**收益分析**：\n- 标准企业佣金从30%降至25%，节省5个百分点\n- 小型企业佣金从15%降至12%，节省3个百分点\n- 以100万元年收入为例，标准企业可多获5万元利润\n\n**战略建议**：\n- 重新评估iOS应用的定价策略\n- 考虑将节省的佣金成本让利给用户，提升竞争力\n- 关注后续是否有进一步降费的可能\n\n**技术准备**：\n- 了解苹果新费率的适用条件和申请流程\n- 评估是否符合小型企业资格\n- 准备相关财务证明材料\n\n**风险提示**：费率调整可能伴随其他条件变化，需仔细阅读苹果的最新政策条款。',
    tags: ['苹果', '应用商店', '佣金', '反垄断', '中国监管'],
    link: 'http://m.ce.cn/bwzg/202603/t20260313_2826823.shtml',
    isNew: true,
  },
  {
    id: '4',
    source: '复旦大学复旦发展研究院',
    date: '2026-04-22',
    heat: 8,
    title: '欧盟《人工智能法》首次修法：高风险AI义务延期至2027-2028年',
    summary:
      '2026年3月26日，欧洲议会以569票赞成、45票反对、23票弃权通过《人工智能数字综合法案》一读立场。三方一致同意将高风险AI系统合规期限延后：独立高风险AI系统延至2027年12月2日，产品内嵌式高风险AI系统延至2028年8月2日。原定2026年8月2日的全面适用日期不再维持。',
    overallImpact:
      '此次修法为全球AI企业提供了更长的合规缓冲期，但也意味着监管框架仍在持续调整中。延期主要为配套标准制定、监管机构建设及企业合规准备预留充足时间，同时适度简化合规流程、减轻企业负担。',
    industryImpact:
      '对中国AI出海企业的影响：\n\n**时间窗口**：\n- 独立高风险AI系统(生物识别、教育、就业、执法等)：延期约16个月\n- 产品内嵌高风险AI系统(医疗器械、机械等)：延期约24个月\n- 利用这段时间完成合规体系建设\n\n**合规准备清单**：\n1. **风险分类**：确定产品是否属于高风险AI系统\n2. **技术文档**：准备符合AI Act要求的技术文档\n3. **风险评估**：建立风险管理体系\n4. **人工监督**：设计人工监督机制\n5. **数据治理**：确保训练数据符合要求\n\n**生成式AI特别要求**：\n- 以机器可读格式标注AI生成内容\n- 发布训练数据摘要\n- 遵守欧盟版权法\n\n**风险提示**：延期不等于豁免，建议提前完成合规准备，避免临近截止日期时仓促应对。',
    tags: ['AI Act', '人工智能法', '欧盟', '高风险AI', '合规延期'],
    link: 'https://fddi.fudan.edu.cn/d4/48/c18965a775240/page.htm',
    isNew: true,
  },
  {
    id: '5',
    source: 'CSDN / 中央网信办',
    date: '2026-04-22',
    heat: 9,
    title: '中国2026年个人信息保护专项行动启动：七大战役严打数据违规',
    summary:
      '2026年4月7日，中央网信办、工信部、公安部联合印发通知，开展2026年个人信息保护专项治理行动，时间为4月15日至12月15日。行动聚焦App、SDK、广告联盟、在线教育、互联网医疗、金融科技、网约车/出行七大领域，严厉打击强制收集非必要信息、隐蔽数据倒卖、内部人员泄密三类突出问题。',
    overallImpact:
      '这是自2022年"清朗·算法综合治理"、2024年"数据安全专项"之后，又一场覆盖全行业的深度合规大考。《个人信息保护法》已运行四年有余，监管正从"基本框架搭建"转向"深层次问题整治"。',
    industryImpact:
      '对互联网企业的合规要求：\n\n**重点整治领域**：\n- App违规收集个人信息\n- SDK超范围收集数据\n- 广告联盟数据滥用\n- 在线教育/医疗敏感数据处理\n- 金融科技数据安全\n- 网约车出行数据保护\n\n**三类突出问题**：\n1. **强制收集**：从"不同意就不让用"演变为"诱导点击、捆绑授权、默认勾选、频繁弹窗"\n2. **数据倒卖**：隐蔽的数据交易链条\n3. **内鬼泄密**：内部人员非法出售用户数据\n\n**处罚力度**：\n- 最高可处上一年度营业额5%的罚款或5000万元\n- 涉及犯罪的移送司法机关\n\n**合规建议**：\n- 全面审查数据收集点，确保"最小必要"\n- 完善用户同意机制，杜绝诱导授权\n- 加强内部数据权限管理\n- 建立数据泄露应急响应机制',
    tags: ['个人信息保护', '中国监管', '数据安全', 'App合规', '专项整治'],
    link: 'https://blog.csdn.net/xixixi7777/article/details/159977277',
    isNew: true,
  },
  {
    id: '6',
    source: 'CSDN / Google Play',
    date: '2026-04-22',
    heat: 7,
    title: 'Google Play年龄信号新规2026年1月生效：出海游戏必须接入Age Signals API',
    summary:
      'Google Play的Age Signals API政策已于2026年1月1日正式生效。新规要求面向美国相关州用户的游戏和应用，必须接入Age Signals API进行年龄验证，不得使用SDK推断用户年龄、私自收集生日信息或通过模型猜测年龄。该API目前处于beta阶段，2026年1月1日起返回实时数据。',
    overallImpact:
      'Google Play的政策旨在满足美国多州法律要求，同时减少开发者自行收集年龄数据带来的隐私风险。通过统一的Age Signals API，将年龄识别流程标准化，借助AI验证、证件核验等方式确保数据真实性。',
    industryImpact:
      '对出海美国市场的影响：\n\n**适用范围**：\n- 面向美国相关州用户的游戏和应用\n- 涉及广告展示、内购、社交互动等需区分年龄的场景\n- 无论是否刻意分年龄层，只要涉及上述场景就必须接入\n\n**禁止行为**：\n- 用SDK推断用户年龄\n- 私自收集生日信息\n- 通过模型猜测年龄\n- 依赖第三方数据区分年龄段\n\n**技术要求**：\n1. 集成Age Signals API\n2. 根据返回的年龄信号调整应用行为\n3. 确保年龄验证流程符合Google政策\n\n**合规建议**：\n- 立即启动API集成测试\n- 评估应用是否涉及需年龄验证的功能\n- 准备合规文档以应对审核\n\n**风险提示**：未接入API可能导致应用被下架或限制在美国市场的分发。',
    tags: ['Google Play', '年龄验证', 'Age Signals', '美国市场', '应用政策'],
    link: 'https://blog.csdn.net/u012565335/article/details/155857931',
    isNew: true,
  },
];

const dynamicCards: DynamicCard[] = [
  {
    id: '1',
    title: '法律法规',
    articleTitle:
      '欧盟《人工智能法》首次修法：高风险AI合规期限延期',
    source: '复旦大学',
    date: '2026-04-22',
    heat: 8,
    link: '/laws',
  },
  {
    id: '2',
    title: '行业动态',
    articleTitle:
      '中国反垄断监管成效显现：苹果应用商店佣金降至全球最低',
    source: '中国经济网',
    date: '2026-04-22',
    heat: 8,
    link: '/laws',
  },
  {
    id: '3',
    title: '执法动态',
    articleTitle:
      '欧盟首次动用DMA开出7亿欧元罚单，苹果Meta双双被罚',
    source: '欧盟委员会',
    date: '2026-04-23',
    heat: 10,
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
    return filterNews(todayNews, searchKeyword);
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

      {/* Today's News */}
      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center justify-between pb-3 border-b border-[#e5e5e5]">
            <h2 className="text-xl font-bold text-[#171717]">
              当日新增快讯
            </h2>
            <span className="text-xs text-[#737373]">
              更新于 2026年4月22日
            </span>
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
