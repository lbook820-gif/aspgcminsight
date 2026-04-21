import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e5e5e5]">
      <div className="max-w-[800px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left: Platform Info */}
          <div className="md:w-[60%]">
            <h3 className="text-base font-semibold text-[#171717] mb-3">
              欧洲移动应用合规洞察平台
            </h3>
            <p className="text-sm text-[#525252] leading-relaxed">
              专注于欧盟移动应用市场合规情报收集与分析，为开发者和决策者提供专业、及时、全面的合规洞察服务。
            </p>
          </div>

          {/* Right: Links & Contact */}
          <div className="md:w-[40%] flex flex-col gap-6">
            <div>
              <h4 className="text-sm font-semibold text-[#171717] mb-2">快速链接</h4>
              <div className="flex flex-col gap-1">
                <Link
                  to="/"
                  className="text-sm text-[#525252] hover:text-[#2563eb] transition-colors duration-150"
                >
                  首页
                </Link>
                <Link
                  to="/laws"
                  className="text-sm text-[#525252] hover:text-[#2563eb] transition-colors duration-150"
                >
                  法律法规
                </Link>
                <Link
                  to="/enforcement"
                  className="text-sm text-[#525252] hover:text-[#2563eb] transition-colors duration-150"
                >
                  执法动态
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#171717] mb-2">联系我们</h4>
              <p className="text-sm text-[#737373]">compliance@insights.eu</p>
              <p className="text-sm text-[#737373] mt-1">Brussels, Belgium</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#e5e5e5]">
          <p className="text-xs text-[#737373]">
            &copy; 2026 欧洲移动应用合规洞察平台. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
