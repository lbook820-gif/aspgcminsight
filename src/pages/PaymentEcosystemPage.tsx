import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, TrendingUp, Minus, TrendingDown, Search } from 'lucide-react';
import { paymentEcosystemNews } from '../data/newsData';

// 热门搜索关键词
const hotKeywords = ['佣金', 'IAP', '第三方支付', 'Google Play', 'App Store', '韩国'];

export default function PaymentEcosystemPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  // 搜索过滤
  const filteredNews = searchQuery.trim()
    ? paymentEcosystemNews.filter(
        (news) =>
          news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          news.source.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : paymentEcosystemNews;

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    setShowResults(true);
  };

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
    <main className="min-h-screen pt-16 bg-white">
      {/* Header */}
      <div className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm">
            <Link to="/" className="hover:text-black">首页</Link>
            <span>/</span>
            <span className="text-black">支付生态新闻</span>
          </div>
          <h1 className="font-bold mb-2 text-gray-900 text-xl md:text-2xl">
            支付生态新闻
          </h1>
          <p className="text-gray-600">
            支付政策、佣金调整、第三方支付动态
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8 relative">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索支付生态新闻..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(e.target.value.trim().length > 0);
              }}
              onBlur={() => {
                setTimeout(() => setShowResults(false), 200);
              }}
              onFocus={() => {
                if (searchQuery.trim()) setShowResults(true);
              }}
              className="w-full pl-12 pr-4 py-3 md:py-4 focus:outline-none bg-white border border-gray-200 rounded-lg focus:border-black text-sm"
            />

            {/* Search Results Dropdown */}
            {showResults && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden max-h-72 overflow-y-auto z-50">
                {filteredNews.length > 0 ? (
                  filteredNews.map((news) => (
                    <button
                      key={news.id}
                      onClick={() => {
                        setSearchQuery('');
                        setShowResults(false);
                        const element = document.getElementById(`news-${news.id}`);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <p className="font-medium text-gray-900 text-sm">{news.title}</p>
                      <p className="text-gray-500 mt-1 text-xs">{news.source} · {news.publishDate}</p>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 text-sm">未找到相关新闻</div>
                )}
              </div>
            )}
          </div>

          {/* Hot Keywords */}
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
        </div>

        {/* News List */}
        <div className="space-y-4 md:space-y-6">
          {filteredNews.map((news) => (
            <article
              key={news.id}
              id={`news-${news.id}`}
              className="bg-white p-4 md:p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              {/* Top: Title & Meta */}
              <div className="mb-3 md:mb-4">
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
                  {news.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

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
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">未找到相关新闻</p>
          </div>
        )}
      </div>
    </main>
  );
}
