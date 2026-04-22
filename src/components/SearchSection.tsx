import { useState } from 'react';
import { Search, X } from 'lucide-react';

const hotTags = [
  'DMA',
  'GDPR',
  '数字市场法',
  '数据保护',
  '反垄断',
  'App Store',
  'Google Play',
];

interface SearchSectionProps {
  onSearchChange?: (keyword: string) => void;
  searchValue?: string;
}

export default function SearchSection({ onSearchChange, searchValue = '' }: SearchSectionProps) {
  const [internalSearchValue, setInternalSearchValue] = useState(searchValue);
  
  // 使用外部控制或内部控制
  const currentValue = onSearchChange ? searchValue : internalSearchValue;
  const setCurrentValue = onSearchChange 
    ? onSearchChange 
    : setInternalSearchValue;

  const handleClear = () => {
    setCurrentValue('');
  };

  const handleTagClick = (tag: string) => {
    setCurrentValue(tag);
  };

  return (
    <section className="bg-[#fafafa] px-6 pb-6">
      <div className="max-w-[800px] mx-auto">
        {/* Search Input */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]"
          />
          <input
            type="text"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            placeholder="搜索合规关键词..."
            className="w-full h-12 pl-11 pr-10 bg-white border border-[#e5e5e5] rounded-lg text-sm text-[#171717] placeholder:text-[#a3a3a3] focus:outline-none focus:border-[#2563eb] transition-colors duration-200"
          />
          {currentValue && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#737373] hover:text-[#171717] transition-colors duration-150"
              title="清除搜索"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Hot Search Tags */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <span className="text-xs text-[#737373]">热门搜索：</span>
          {hotTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors duration-150 ${
                currentValue === tag
                  ? 'bg-[#2563eb] text-white'
                  : 'bg-[#f5f5f5] text-[#404040] hover:bg-[#e5e5e5]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
