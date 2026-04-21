import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: '首页', href: '/' },
    { name: '应用生态', href: '/app-ecosystem' },
    { name: '支付生态', href: '/payment-ecosystem' },
    { name: '生态峰会', href: '/summit' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About Column */}
          <div className="md:col-span-2">
            <Link to="/" className="font-bold mb-4 block text-xl">
              欧洲移动应用生态洞察平台
            </Link>
            <p className="leading-relaxed max-w-md text-gray-600 text-sm">
              专注于欧美移动应用市场情报收集与分析，为开发者和决策者提供专业、及时、全面的生态洞察服务。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">
              快速链接
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-black text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">
              联系我们
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="text-gray-400 w-5 h-5" />
                <a href="mailto:lbook820@gmail.com" className="text-gray-600 text-sm">
                  lbook820@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-gray-400 w-5 h-5" />
                <span className="text-gray-600 text-sm">Dublin, Ireland</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            © 2026 欧洲移动应用生态洞察平台. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-gray-500 hover:text-black text-sm">
              隐私政策
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
