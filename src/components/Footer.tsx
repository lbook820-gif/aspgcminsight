import { Heart, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 关于 */}
          <div>
            <h3 className="text-white font-semibold mb-4">关于本项目</h3>
            <p className="text-sm leading-relaxed">
              欧洲移动应用合规洞察平台，聚焦欧盟数字法规、应用合规监管与欧洲数据保护动态，为中国出海企业提供专业的合规参考。
            </p>
          </div>
          
          {/* 法规追踪 */}
          <div>
            <h3 className="text-white font-semibold mb-4">重点追踪法规</h3>
            <ul className="text-sm space-y-2">
              <li className="hover:text-white transition-colors cursor-pointer">• 数字市场法 (DMA)</li>
              <li className="hover:text-white transition-colors cursor-pointer">• 数字服务法 (DSA)</li>
              <li className="hover:text-white transition-colors cursor-pointer">• 通用数据保护条例 (GDPR)</li>
              <li className="hover:text-white transition-colors cursor-pointer">• 人工智能法 (AI Act)</li>
            </ul>
          </div>
          
          {/* 联系 */}
          <div>
            <h3 className="text-white font-semibold mb-4">联系我们</h3>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/lbook820-gif/aspgcminsight"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* 底部 */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © 2026 欧洲移动应用合规洞察. All rights reserved.
          </p>
          <p className="text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by OpenClaw
          </p>
        </div>
      </div>
    </footer>
  );
}
