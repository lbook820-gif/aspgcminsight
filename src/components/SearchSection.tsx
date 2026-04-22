import { Search, X, TrendingUp } from 'lucide-react';

interface SearchSectionProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const hotKeywords = [
  { text: 'TikTok', icon: '🔥' },
  { text: 'Meta', icon: '📱' },
  { text: 'Google', icon: '🔍' },
  { text: '苹果', icon: '🍎' },
  { text: 'SHEIN', icon: '🛍️' },
  { text: 'Temu', icon: '📦' },
  { text: 'DSA', icon: '📋' },
  { text: 'GDPR', icon: '🔒' },
];

export default function SearchSection({ searchValue, onSearchChange }: SearchSectionProps) {
  return (
    <section className="sticky top-16 z-20 bg-white/80 backdrop-blur-lg border-b border-gray-200 px-6 py-4">
      <div className="max-w-4xl mx-auto">
        {/* 搜索框 */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索新闻、企业、法规..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
          />
          {searchValue && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
        
        {/* 热门搜索 */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
            <TrendingUp className="w-3.5 h-3.5" />
            热门搜索
          </span>
          {hotKeywords.map((keyword) => (
            <button
              key={keyword.text}
              onClick={() => onSearchChange(keyword.text)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                searchValue === keyword.text
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{keyword.icon}</span>
              {keyword.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
