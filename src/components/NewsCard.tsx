import { ExternalLink, TrendingUp, Clock, Building2 } from 'lucide-react';
import type { NewsItem } from '@/types';

// 简单的 Markdown 渲染函数
function renderMarkdown(text: string) {
  let result = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
  result = result.replace(/\n/g, '<br />');
  return result;
}

// 热度指示器组件
function HeatIndicator({ heat }: { heat: number }) {
  const getColor = () => {
    if (heat >= 9) return 'bg-red-500';
    if (heat >= 7) return 'bg-orange-500';
    if (heat >= 5) return 'bg-yellow-500';
    return 'bg-gray-400';
  };
  
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-1 h-${i + 2} rounded-full transition-all ${
              i <= Math.ceil(heat / 3) ? getColor() : 'bg-gray-200'
            }`}
            style={{ height: `${(i * 3) + 2}px` }}
          />
        ))}
      </div>
      <span className={`text-xs font-medium ${heat >= 8 ? 'text-red-600' : 'text-gray-500'}`}>
        {heat}
      </span>
    </div>
  );
}

export default function NewsCard({ news }: { news: NewsItem }) {
  return (
    <article className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* 左侧热度指示条 */}
      <div 
        className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-1.5 ${
          news.heat >= 9 ? 'bg-gradient-to-b from-red-500 to-orange-500' :
          news.heat >= 7 ? 'bg-gradient-to-b from-orange-500 to-yellow-500' :
          'bg-gradient-to-b from-blue-500 to-cyan-500'
        }`}
      />
      
      <div className="pl-5 pr-6 py-5">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 flex-wrap">
            {news.isNew && (
              <span className="relative inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white shadow-lg shadow-red-500/25">
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-400 rounded-full animate-ping" />
                <span className="relative">NEW</span>
              </span>
            )}
            <div className="flex items-center gap-1.5 text-gray-500">
              <Building2 size={14} />
              <span className="text-xs font-medium">{news.source}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <Clock size={14} />
              <span className="text-xs">{news.date}</span>
            </div>
          </div>
          <HeatIndicator heat={news.heat} />
        </header>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors">
          {news.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {news.summary}
        </p>

        {/* Impact Sections */}
        <div className="space-y-3 mb-4">
          {/* Overall Impact */}
          <details className="group/impact bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl overflow-hidden">
            <summary className="flex items-center gap-2 px-4 py-3 cursor-pointer select-none hover:bg-blue-100/50 transition-colors">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold">
                <TrendingUp size={12} />
                整体影响
              </span>
              <span className="text-xs text-gray-500 group-open/impact:hidden">点击展开</span>
              <svg className="w-4 h-4 ml-auto text-gray-400 transition-transform group-open/impact:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                {news.overallImpact}
              </p>
            </div>
          </details>

          {/* Industry Impact */}
          <details className="group/impact bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl overflow-hidden" open>
            <summary className="flex items-center gap-2 px-4 py-3 cursor-pointer select-none hover:bg-amber-100/50 transition-colors">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-500 text-white text-xs font-semibold">
                🎯 行业影响
              </span>
              <span className="text-xs text-gray-500 group-open/impact:hidden">点击展开</span>
              <svg className="w-4 h-4 ml-auto text-gray-400 transition-transform group-open/impact:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pb-4">
              <div 
                className="text-sm text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(news.industryImpact) }}
              />
            </div>
          </details>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between gap-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 flex-wrap">
            {news.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
            {news.tags.length > 4 && (
              <span className="text-xs text-gray-400">+{news.tags.length - 4}</span>
            )}
          </div>
          
          {news.link && (
            <a
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-blue-600 hover:text-white hover:bg-blue-600 bg-blue-50 transition-all duration-200"
            >
              查看原文
              <ExternalLink size={14} />
            </a>
          )}
        </footer>
      </div>
    </article>
  );
}
