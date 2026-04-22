import { Shield, Globe, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  updateDate?: string;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  updateDate,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24 pb-12 px-6">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
      
      {/* 网格背景 */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      <div className="relative max-w-4xl mx-auto">
        {/* 徽章 */}
        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-medium text-cyan-300">合规洞察平台</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-medium text-blue-300">聚焦欧盟</span>
          </div>
        </div>
        
        {/* 主标题 */}
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          {title}
        </h1>
        
        {/* 副标题 */}
        <p className="text-lg text-blue-200 font-medium tracking-wide mb-4">
          {subtitle}
        </p>
        
        {/* 描述 */}
        <p className="text-base text-gray-300 leading-relaxed max-w-2xl">
          {description}
        </p>
        
        {/* 更新时间 & 统计 */}
        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/10">
          {updateDate && (
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-gray-400">
                更新于 <span className="text-white font-medium">{updateDate}</span>
              </span>
            </div>
          )}
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>📚 <span className="text-white font-medium">17</span> 条新闻</span>
            <span>🏢 <span className="text-white font-medium">10+</span> 家企业</span>
            <span>📅 <span className="text-white font-medium">2025-2026</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
