import { useState } from 'react';
import { Search } from 'lucide-react';
import { sortedNewsData } from '../data/newsData';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onSearch?: (query: string) => void;
}

const hotKeywords = ['DMA', 'Google Play', 'App Store', 'Epic Games', '佣金', '互操作性'];

export default function Hero({ onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const searchResults = searchQuery.trim()
    ? sortedNewsData.filter(
        (news) =>
          news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
    if (query.trim()) {
      navigate('/intelligence');
      setTimeout(() => {
        const searchInput = document.getElementById('intelligence-search');
        if (searchInput) {
          (searchInput as HTMLInputElement).value = query;
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }, 100);
    }
  };

  const handleKeywordClick = (keyword: string) => {
    handleSearch(keyword);
  };

  const handleResultClick = (newsId: string) => {
    setSearchQuery('');
    setShowResults(false);
    navigate('/intelligence');
    setTimeout(() => {
      const element = document.getElementById(`news-${newsId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <section
      id="hero"
      className="relative bg-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Main Content */}
        <div className="text-center mb-12">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            欧洲移动应用生态洞察平台
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl text-white/70 font-light tracking-wide"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            一览全球应用生态 · 深度分析解读
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
              onFocus={() => {
                if (searchQuery.trim()) setShowResults(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(searchQuery);
                }
              }}
              className="w-full pl-12 pr-4 py-3 sm:py-4 text-sm sm:text-base bg-white border-0 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-900 placeholder-gray-400 transition-all"
            />
            
            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden max-h-72 overflow-y-auto z-50">
                {searchResults.length > 0 ? (
                  searchResults.map((news) => (
                    <button
                      key={news.id}
                      onClick={() => handleResultClick(news.id)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{news.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{news.source} · {news.publishDate}</p>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500">未找到相关新闻</div>
                )}
              </div>
            )}
          </div>

          {/* Hot Keywords */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <span className="text-xs sm:text-sm text-white/60">热门搜索：</span>
            {hotKeywords.map((keyword) => (
              <button
                key={keyword}
                onClick={() => handleKeywordClick(keyword)}
                className="px-3 py-1 text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
