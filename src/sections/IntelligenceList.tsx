import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, TrendingUp, Minus, TrendingDown } from 'lucide-react';
import { sortedNewsData } from '../data/newsData';

// 热门搜索关键词
const hotKeywords = ['DMA', 'Google Play', 'App Store', '反垄断', '支付', 'Epic Games', 'WhatsApp', 'Meta'];

export default function IntelligenceList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    setShowResults(true);
  };

  // 搜索功能
  const searchResults = searchQuery.trim()
    ? sortedNewsData.filter(
        (news) =>
          news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          news.source.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const getScoreIcon = (score: number) => {
    if (score >= 8) return <TrendingUp className="w-4 h-4" />;
    if (score >= 6) return <Minus className="w-4 h-4" />;
    return <TrendingDown className="w-4 h-4" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="font-bold text-gray-900 mb-2 text-xl md:text-2xl">
            全部动态
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            聚焦欧盟DMA政策、应用商店监管与欧洲数字市场动态
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="搜索新闻关键词..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(e.target.value.trim().length > 0);
            }}
            onBlur={() => {
              setTimeout(() => setShowResults(false), 200);
            }}
            className="w-full px-4 py-3 focus:outline-none bg-white border border-gray-200 rounded-lg focus:border-black text-sm"
          />
          
          {/* Search Results Dropdown */}
          {showResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden max-h-72 overflow-y-auto z-50">
              {searchResults.length > 0 ? (
                searchResults.map((news) => (
                  <a
                    key={news.id}
                    href={`#news-${news.id}`}
                    onClick={() => setShowResults(false)}
                    className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <p className="font-medium text-gray-900 text-sm">{news.title}</p>
                    <p className="text-gray-500 mt-1 text-xs">{news.source} · {news.publishDate}</p>
                  </a>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 text-sm">未找到相关新闻</div>
              )}
            </div>
          )}

          {/* Hot Keywords */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400">热门搜索：</span>
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
        </div>

        {/* News List */}
        <div className="space-y-4">
          {sortedNewsData.map((news) => (
            <article
              key={news.id}
              id={`news-${news.id}`}
              className="bg-white p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              {/* Top: Title & Meta */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 font-medium rounded-full text-xs">
                    {news.source}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {news.publishDate}
                  </span>
                  <span className={`flex items-center gap-1 px-2 py-0.5 rounded font-medium text-xs ${getScoreColor(news.score)}`}>
                    {getScoreIcon(news.score)}
                    评分 {news.score}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-base md:text-lg">
                  {news.title}
                </h3>
              </div>

              {/* Summary */}
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                {news.summary}
              </p>

              {/* AI Comment */}
              <div className="space-y-2 mb-4">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <span className="inline-block px-2 py-0.5 bg-blue-500 text-white rounded mb-1 text-xs">
                    整体影响
                  </span>
                  <p className="text-gray-700 text-sm md:text-base">
                    {news.aiComment.overallImpact}
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-100 rounded-lg p-3">
                  <span className="inline-block px-2 py-0.5 bg-orange-500 text-white rounded mb-1 text-xs">
                    对华为的影响
                  </span>
                  <p className="text-gray-700 text-sm md:text-base">
                    {news.aiComment.huaweiImpact}
                  </p>
                </div>
              </div>

              {/* Bottom: Tags & Action */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {news.tags.map((tag) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
