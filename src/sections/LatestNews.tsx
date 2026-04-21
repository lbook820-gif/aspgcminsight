import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Search } from 'lucide-react';
import { getLatestNews, sortedNewsData } from '../data/newsData';

// 热门搜索关键词
const hotKeywords = ['DMA', 'Google Play', 'App Store', '反垄断', 'Epic Games', 'WhatsApp', 'Meta'];

export default function LatestNews() {
  const [searchQuery, setSearchQuery] = useState('');

  // 获取上周快讯（4月8日-4月14日）
  const lastWeekNews = sortedNewsData.filter(news => {
    const date = new Date(news.publishDate);
    return date >= new Date('2026-04-08') && date <= new Date('2026-04-14');
  }).sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  // 获取近期动态（最近5条，排除上周新闻）
  const recentNews = getLatestNews(30).filter(news => {
    const date = new Date(news.publishDate);
    return date < new Date('2026-04-08') || date > new Date('2026-04-14');
  }).slice(0, 5);

  // 搜索功能 - 实时筛选
  const searchResults = searchQuery.trim()
    ? sortedNewsData.filter(
        (news) =>
          news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          news.source.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // 渲染新闻卡片
  const renderNewsCard = (news: typeof sortedNewsData[0], showNewBadge: boolean = false) => (
    <article
      key={news.id}
      className="bg-white p-4 md:p-6 border-l-4 border-black rounded-r-lg shadow-sm"
    >
      {/* Top: Title & Meta */}
      <div className="mb-3 md:mb-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {showNewBadge && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs md:text-sm font-bold rounded">
              NEW
            </span>
          )}
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
            {news.source}
          </span>
          <span className="text-gray-400 text-xs">
            {news.publishDate}
          </span>
          <span className={`px-2 py-0.5 rounded font-medium text-xs ${
            news.score >= 8 ? 'text-green-600 bg-green-50' :
            news.score >= 6 ? 'text-amber-600 bg-amber-50' :
            'text-red-600 bg-red-50'
          }`}>
            热度 {news.score}
          </span>
        </div>
        <h3 className="font-bold text-gray-900 text-base md:text-lg">
          {news.title}
        </h3>
      </div>

      {/* Summary */}
      <p className="text-gray-600 mb-4 md:mb-5 text-sm md:text-base">
        {news.summary}
      </p>

      {/* AI Comment */}
      <div className="space-y-2 md:space-y-3 mb-4 md:mb-5">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 md:p-4">
          <span className="inline-block px-2 py-0.5 bg-blue-500 text-white rounded mb-1 md:mb-2 text-xs">
            整体影响
          </span>
          <p className="text-gray-700 text-sm md:text-base">
            {news.aiComment.overallImpact}
          </p>
        </div>

        <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 md:p-4">
          <span className="inline-block px-2 py-0.5 bg-orange-500 text-white rounded mb-1 md:mb-2 text-xs">
            对华为的影响
          </span>
          <p className="text-gray-700 text-sm md:text-base">
            {news.aiComment.huaweiImpact}
          </p>
        </div>
      </div>

      {/* Bottom: Tags & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 md:pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {news.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* 详细分析按钮 - 仅Meta新闻显示 */}
          {news.id === '2' && (
            <Link
              to="/meta-analysis"
              className="inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700 text-sm"
            >
              详细分析
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
          <a
            href={news.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-black text-sm"
          >
            原文链接
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="font-bold text-gray-900 mb-1 md:mb-2 text-xl md:text-2xl">
            欧洲移动应用生态洞察
          </h2>
          <p className="text-gray-500 mb-1 text-sm">
            European Mobile App Ecosystem Insights
          </p>
          <p className="text-gray-500 text-sm mt-2">
            聚焦欧盟DMA政策、应用商店监管与欧洲数字市场动态
          </p>
          <p className="mt-2 text-gray-400 text-xs">
            网站更新于：2026年4月15日
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索新闻关键词..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 md:py-4 focus:outline-none bg-white border border-gray-200 rounded-lg focus:border-black text-sm"
            />
            {/* 清除按钮 */}
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Hot Keywords */}
          {!searchQuery && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-gray-400 text-xs">热门搜索：</span>
              {hotKeywords.map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => handleKeywordClick(keyword)}
                  className="px-2.5 py-1 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 text-xs"
                >
                  {keyword}
                </button>
              ))}
            </div>
          )}

          {/* 搜索结果统计 */}
          {searchQuery && (
            <div className="mt-3 flex items-center justify-between">
              <span className="text-gray-600 text-sm">
                找到 <strong>{searchResults.length}</strong> 条相关新闻
              </span>
              <button
                onClick={clearSearch}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                清除搜索
              </button>
            </div>
          )}
        </div>

        {/* 搜索结果列表 */}
        {searchQuery && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
              <h3 className="font-bold text-lg">
                搜索结果
              </h3>
            </div>

            {searchResults.length > 0 ? (
              <div className="space-y-4 md:space-y-6">
                {searchResults.map((news) => renderNewsCard(news, false))}
              </div>
            ) : (
              <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500">
                  未找到相关新闻
                </p>
              </div>
            )}
          </div>
        )}

        {/* 上周快讯一览 - 仅在无搜索时显示 */}
        {!searchQuery && (
          <div className="mb-10">
            <div className="mb-4 border-b border-gray-200 pb-2">
              <h3 className="font-bold text-lg">
                上周快讯一览
              </h3>
            </div>

            {lastWeekNews.length > 0 ? (
              <div className="space-y-4 md:space-y-6">
                {lastWeekNews.map((news) => renderNewsCard(news, true))}
              </div>
            ) : (
              <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500">
                  上周无快讯
                </p>
              </div>
            )}
          </div>
        )}

        {/* 近期动态 - 仅在无搜索时显示 */}
        {!searchQuery && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
              <h3 className="font-bold text-lg">
                近期动态
              </h3>
              <div className="flex gap-2">
                <Link
                  to="/app-ecosystem"
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md font-medium transition-colors text-sm"
                >
                  应用生态
                </Link>
                <Link
                  to="/payment-ecosystem"
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md font-medium transition-colors text-sm"
                >
                  支付生态
                </Link>
                <Link
                  to="/summit"
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md font-medium transition-colors text-sm"
                >
                  峰会动态
                </Link>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              {recentNews.map((news) => renderNewsCard(news, false))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
