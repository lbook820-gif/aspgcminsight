import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Calendar, MapPin, Tag } from 'lucide-react';
import { sortedSummitData } from '../data/summitData';

export default function SummitPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 按月份分组
  const groupedSummits = sortedSummitData.reduce((acc, summit) => {
    const month = summit.date.match(/(\d{4}年\d{1,2}月)/)?.[1] || '其他';
    if (!acc[month]) acc[month] = [];
    acc[month].push(summit);
    return acc;
  }, {} as Record<string, typeof sortedSummitData>);

  const monthOrder = [
    '2026年4月', '2026年5月', '2026年6月', '2026年7月',
    '2026年8月', '2026年9月', '2026年10月'
  ];

  return (
    <main className="min-h-screen pt-16 bg-white">
      {/* Header */}
      <div className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm">
            <Link to="/" className="hover:text-black">首页</Link>
            <span>/</span>
            <span className="text-black">生态峰会动态</span>
          </div>
          <h1 className="font-bold mb-2 text-gray-900 text-xl md:text-2xl">
            生态峰会动态
          </h1>
          <p className="text-gray-600">
            未来6个月互联网、AI、支付领域欧美及亚太峰会一览
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 统计信息 */}
        <div className="mb-8 bg-white rounded-lg border border-gray-200 p-4 md:p-6">
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="text-center">
              <p className="font-bold text-gray-900 text-2xl">{sortedSummitData.length}</p>
              <p className="text-gray-500 text-sm">场峰会</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900 text-2xl">7</p>
              <p className="text-gray-500 text-sm">个月份</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900 text-2xl">3</p>
              <p className="text-gray-500 text-sm">大领域</p>
            </div>
          </div>
        </div>

        {/* 峰会列表 */}
        <div className="space-y-8 md:space-y-10">
          {monthOrder.map((month) => {
            const summits = groupedSummits[month];
            if (!summits || summits.length === 0) return null;

            return (
              <div key={month}>
                {/* 月份标题 */}
                <div className="mb-4 md:mb-6 border-b border-gray-200 pb-2">
                  <h2 className="font-bold text-gray-900 text-lg">
                    {month}
                  </h2>
                </div>

                {/* 该月份的峰会 */}
                <div className="space-y-4 md:space-y-6">
                  {summits.map((summit) => (
                    <article
                      key={summit.id}
                      className="bg-white p-4 md:p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      {/* 标题 */}
                      <h3 className="font-bold text-gray-900 mb-3 md:mb-4 text-base md:text-lg">
                        {summit.name}
                      </h3>

                      {/* 时间和地点 */}
                      <div className="flex flex-wrap gap-4 mb-3 md:mb-4">
                        <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{summit.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{summit.location}</span>
                        </div>
                      </div>

                      {/* 核心领域 */}
                      <div className="mb-3 md:mb-4">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Tag className="w-4 h-4" />
                          <span className="text-gray-500 text-xs">核心领域</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {summit.coreAreas.map((area) => (
                            <span
                              key={area}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 看点 */}
                      <div className="mb-4 md:mb-5 bg-gray-50 rounded-lg p-3 md:p-4">
                        <p className="text-gray-500 mb-1 md:mb-2 text-xs">看点</p>
                        <p className="text-gray-700 text-sm md:text-base">
                          {summit.highlights}
                        </p>
                      </div>

                      {/* 来源链接 */}
                      <a
                        href={summit.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700 text-sm"
                      >
                        信息来源：{summit.sourceName}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
