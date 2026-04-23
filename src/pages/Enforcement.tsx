import HeroSection from '@/components/HeroSection';
import NewsCard from '@/components/NewsCard';
import type { NewsItem, RegulatoryEvent } from '@/types';

const enforcementStats = [
  { value: '€ 28.5亿', label: '累计罚款金额 (2024-2026)' },
  { value: '48', label: '已完成调查案件' },
  { value: '12', label: '正在进行中的调查' },
];

const enforcementCases: NewsItem[] = [
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
          </h2>
          <div className="flex flex-col gap-6">
            {enforcementCases.map((news) => (
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
          </h2>
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-6">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[68px] top-0 bottom-0 w-px bg-[#e5e5e5]" />

              <div className="flex flex-col gap-6">
                {regulatoryCalendar.map((event, index) => (
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
