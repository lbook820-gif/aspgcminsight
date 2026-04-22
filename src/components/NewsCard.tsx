import { ExternalLink } from 'lucide-react';
import type { NewsItem } from '@/types';

// 简单的 Markdown 渲染函数
function renderMarkdown(text: string) {
  // 处理粗体 **text**
  let result = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // 处理换行
  result = result.replace(/\n/g, '<br />');
  return result;
}

export default function NewsCard({ news }: { news: NewsItem }) {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow duration-200">
      <div className="border-l-[3px] border-l-[#dc2626]">
        <div className="p-6">
          {/* Header Row */}
          <div className="flex items-center gap-3 flex-wrap mb-3">
            {news.isNew && (
              <span className="bg-[#dc2626] text-white text-xs font-semibold px-2 py-0.5 rounded">
                NEW
              </span>
            )}
            <span className="text-xs text-[#737373]">{news.source}</span>
            <span className="text-xs text-[#737373]">{news.date}</span>
            <span
              className={`text-xs font-medium ${
                news.heat >= 8 ? 'text-[#dc2626]' : 'text-[#737373]'
              }`}
            >
              热度 {news.heat}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-[#171717] leading-snug mb-3">
            {news.title}
          </h3>

          {/* Summary */}
          <p className="text-sm text-[#525252] leading-relaxed mb-4">
            {news.summary}
          </p>

          {/* Overall Impact Block */}
          <div className="bg-[#eff6ff] border border-[#dbeafe] rounded-lg p-4 mb-3">
            <div className="inline-block bg-[#2563eb] text-white text-xs font-medium px-2 py-0.5 rounded mb-2">
              整体影响
            </div>
            <p className="text-sm text-[#525252] leading-relaxed">
              {news.overallImpact}
            </p>
          </div>

          {/* Industry Impact Block - 支持 Markdown 渲染 */}
          <div className="bg-[#fff7ed] border border-[#ffedd5] rounded-lg p-4 mb-4">
            <div className="inline-block bg-[#f97316] text-white text-xs font-medium px-2 py-0.5 rounded mb-2">
              行业影响
            </div>
            <div 
              className="text-sm text-[#525252] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(news.industryImpact) }}
            />
          </div>

          {/* Footer Row */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              {news.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#f5f5f5] text-[#404040] text-xs px-2.5 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            {news.link && (
              <a
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-[#525252] hover:text-[#2563eb] transition-colors duration-150"
              >
                原文链接
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
