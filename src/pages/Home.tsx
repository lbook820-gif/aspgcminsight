// 声明由 Vite 注入的全局变量
declare const __BUILD_DATE__: string;

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import SearchSection from '@/components/SearchSection';
import NewsCard from '@/components/NewsCard';
import type { NewsItem } from '@/types';
import { allNews, dynamicCards } from '@/data';

// 搜索过滤函数
function filterNews(news: NewsItem[], keyword: string): NewsItem[] {
  if (!keyword.trim()) return news;

  const lowerKeyword = keyword.toLowerCase();
  return news.filter((item) => {
    if (item.title.toLowerCase().includes(lowerKeyword)) return true;
    if (item.summary.toLowerCase().includes(lowerKeyword)) return true;
    if (item.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword))) return true;
    if (item.source.toLowerCase().includes(lowerKeyword)) return true;
    if (item.overallImpact.toLowerCase().includes(lowerKeyword)) return true;
    if (item.industryImpact.toLowerCase().includes(lowerKeyword)) return true;

    return false;
  });
}

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState('');

  const filteredNews = useMemo(() => {
    const filtered = filterNews(allNews, searchKeyword);
    return [...filtered].sort((a, b) => b.date.localeCompare(a.date));
  }, [searchKeyword]);

  // 本月动态逻辑
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = `${currentYear}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  const newsThisMonth = filteredNews.filter(n => n.date.startsWith(currentMonth));

  // 按年份分组
  const news2026 = filteredNews.filter(n => n.date.startsWith('2026'));
  const news2025 = filteredNews.filter(n => n.date.startsWith('2025'));
  const news2024 = filteredNews.filter(n => n.date.startsWith('2024'));

  // 获取构建时的日期（即最后一次检索/更新的日期）
  const lastUpdateDate = useMemo(() => {
    const date = new Date(__BUILD_DATE__);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <HeroSection
        title="欧洲移动应用合规洞察"
        subtitle="European Mobile App Compliance Insights"
        description="聚焦欧盟数字法规、应用合规监管与欧洲数据保护动态"
        updateDate={lastUpdateDate}
      />

      <SearchSection
        searchValue={searchKeyword}
        onSearchChange={setSearchKeyword}
      />


      {/* 本月动态版块 */}
      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-bold text-[#171717]">本月动态</h2>
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-600 text-xs font-bold">
              {newsThisMonth.length} 条
            </span>
          </div>

          {/* 本月综述 */}
          {newsThisMonth.length > 0 && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#171717] mb-3">{currentYear}年{currentDate.getMonth() + 1}月合规动态综述</h3>
                  <div className="text-sm text-[#525252] leading-relaxed space-y-2">
                    <p>
                      <strong>Google Play全球降佣至10%并开放第三方支付（6月30日）：</strong>历史性变革——首100万美元佣金仅10%，全面开放替代计费和外部链接支付。"注册应用商店"计划使第三方侧载体验大幅简化。Android生态从"30%抽成"迈入"开放竞争"新时代。
                    </p>
                    <p>
                      <strong>DMA首次覆盖云服务：</strong>欧盟委员会6月25日初步认定AWS和Azure为DMA守门人，突破量化标准以质化认定——云计算正式进入DMA监管体系。意大利AGCM于6月16日首次启用国家DMA执法权，调查苹果iCloud系统级备份特权排斥第三方云服务，云服务互操作性成为DMA执法新战场。
                    </p>
                    <p>
                      <strong>欧盟法院终审维持谷歌41亿欧元安卓反垄断罚款（7月2日）：</strong>持续八年的安卓反垄断拉锯战尘埃落定，确认预装协议构成滥用市场支配地位。同日，欧盟拟于9月出台未成年人社交媒体禁令（冯德莱恩"盟情咨文"），法国/英国/西班牙已率先行动。
                    </p>
                    <p>
                      <strong>Chat Control 2.0快速通过（7月6日）：</strong>欧盟理事会以书面程序通过"聊天管控2.0"法规，强制对端到端加密通信进行无差别内容扫描。Signal和WhatsApp此前公开表示可能退出欧洲市场，加密通信隐私保护面临最大挑战。
                    </p>
                    <p>
                      <strong>数字欧元关键立法推进：</strong>ECON委员会6月23日以43票赞成通过数字欧元规则草案，支持在线+离线双轨支付，离线模式下完全匿名。2027年试点/2029年发行计划不变，目标打破Visa和万事达欧洲零售支付垄断地位。
                    </p>
                    <p className="text-[#737373] italic mt-3">
                      💡 7月出海企业重点关注：社媒年龄验证技术部署（9月禁令预期）、端到端加密合规方案、AWS/Azure守门人认定云市场机会、数字欧元支付系统对接预研、Chat Control 2.0立法跟踪。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {newsThisMonth.length > 0 ? (
            <div className="flex flex-col gap-6">
              {newsThisMonth.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-[#e5e5e5] rounded-xl py-12 text-center">
              <p className="text-[#737373] text-sm">本月暂无新增合规动态</p>
            </div>
          )}
        </div>
      </section>

      {/* 2026年新闻 */}
      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-xl font-bold text-[#171717] pb-3 border-b border-[#e5e5e5] mb-6">
            2026年合规快讯
            <span className="text-sm font-normal text-[#737373] ml-2">
              共 {news2026.length} 条
            </span>
          </h2>

          {news2026.length > 0 ? (
            <div className="mt-6 flex flex-col gap-6">
              {news2026.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          ) : (
            <div className="mt-6 py-8 text-center">
              <p className="text-[#737373]">未找到相关新闻</p>
            </div>
          )}
        </div>
      </section>

      {/* 2025年新闻 */}
      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-xl font-bold text-[#171717] pb-3 border-b border-[#e5e5e5] mb-6">
            2025年合规快讯
            <span className="text-sm font-normal text-[#737373] ml-2">
              共 {news2025.length} 条
            </span>
          </h2>

          {news2025.length > 0 ? (
            <div className="mt-6 flex flex-col gap-6">
              {news2025.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          ) : (
            <div className="mt-6 py-8 text-center">
              <p className="text-[#737373]">未找到相关新闻</p>
            </div>
          )}
        </div>
      </section>

      {/* 2024年新闻 */}
      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-xl font-bold text-[#171717] pb-3 border-b border-[#e5e5e5] mb-6">
            2024年合规快讯
            <span className="text-sm font-normal text-[#737373] ml-2">
              共 {news2024.length} 条
            </span>
          </h2>

          {news2024.length > 0 ? (
            <div className="mt-6 flex flex-col gap-6">
              {news2024.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          ) : (
            <div className="mt-6 py-8 text-center">
              <p className="text-[#737373]">未找到相关新闻</p>
            </div>
          )}
        </div>
      </section>

      {/* 搜索无结果 */}
      {filteredNews.length === 0 && (
        <section className="bg-[#fafafa] px-6 py-12">
          <div className="max-w-[800px] mx-auto text-center">
            <p className="text-[#737373]">未找到与"{searchKeyword}"相关的新闻</p>
            <button
              onClick={() => setSearchKeyword('')}
              className="mt-3 text-sm text-[#2563eb] hover:underline"
            >
              清除搜索
            </button>
          </div>
        </section>
      )}

      {/* 近期动态 */}
      <section className="bg-[#fafafa] px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-xl font-bold text-[#171717] pb-3 border-b border-[#e5e5e5] mb-6">
            近期动态专栏
            <span className="text-sm font-normal text-[#737373] ml-2">
              共 {dynamicCards.length} 条
            </span>
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
