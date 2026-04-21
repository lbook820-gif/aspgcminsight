import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Database, User, Mail } from 'lucide-react';

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen pt-16 bg-white">
      {/* Hero */}
      <div className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm">
            <Link to="/" className="hover:text-black">首页</Link>
            <span>/</span>
            <span className="text-black">隐私声明</span>
          </div>
          <h1 className="font-bold mb-2 text-gray-900 text-xl md:text-2xl">
            关于移动应用生态洞察与隐私的声明
          </h1>
          <p className="text-gray-600">
            更新日期：2026.3.20
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="mb-8">
          <p className="leading-relaxed mb-4 text-gray-700">
            移动应用生态洞察 是由 <strong>李晓晴</strong>（以下简称"我们"）为您提供的，用于新闻聚合分析的元服务。本隐私声明由我们为处理您的个人信息而制定。
          </p>
          <p className="leading-relaxed text-gray-700">
            我们非常重视您的个人信息和隐私保护，将会按照法律要求和业界成熟的安全标准，为您的个人信息提供相应的安全保护措施。
          </p>
        </div>

        {/* Section 1 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-black rounded-lg">
              <Shield className="text-white w-5 h-5" />
            </div>
            <h2 className="font-bold text-gray-900 text-lg">
              1. 我们如何收集和使用您的个人信息
            </h2>
          </div>
          <div className="pl-14">
            <p className="leading-relaxed text-gray-700">
              我们仅在有合法性基础的情形下才会使用您的个人信息。根据适用的法律，我们可能会基于您的同意、为履行/订立您与我们的合同所必需、履行法定义务所必需等合法性基础，使用您的个人信息。
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-black rounded-lg">
              <User className="text-white w-5 h-5" />
            </div>
            <h2 className="font-bold text-gray-900 text-lg">
              2. 管理您的个人信息
            </h2>
          </div>
          <div className="pl-14">
            <p className="leading-relaxed text-gray-700">
              关于您的个人信息，可通过本声明中"如何联系我们"章节中所述方式与我们取得联系，并行使您的查阅、复制、更正、删除等法定权利。
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-black rounded-lg">
              <Database className="text-white w-5 h-5" />
            </div>
            <h2 className="font-bold text-gray-900 text-lg">
              3. 信息存储地点及期限
            </h2>
          </div>
          <div className="space-y-4 pl-14">
            <p className="leading-relaxed text-gray-700">
              <strong>3.1</strong> 我们承诺，除法律法规另有规定外，我们对您的信息的保存期限应当为实现处理目的所必要的最短时间。
            </p>
            <p className="leading-relaxed text-gray-700">
              <strong>3.2</strong> 上述信息将会传输并保存至中国的服务器。
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-black rounded-lg">
              <Mail className="text-white w-5 h-5" />
            </div>
            <h2 className="font-bold text-gray-900 text-lg">
              4. 如何联系我们
            </h2>
          </div>
          <div className="space-y-4 pl-14">
            <div className="bg-gray-50 rounded-lg p-4 md:p-5">
              <p className="font-semibold mb-2 text-black">欧洲移动应用生态洞察平台</p>
              <p className="text-gray-600">电子邮箱：lbook820@gmail.com</p>
              <p className="text-gray-600">地址：Dublin, Ireland</p>
            </div>
            <p className="leading-relaxed text-gray-700">
              如果您对我们的回复不满意，特别是当个人信息处理行为损害了您的合法权益时，您还可以通过向有管辖权的人民法院提起诉讼、向行业自律协会或政府相关管理机构投诉等外部途径进行解决。您也可以向我们了解可能适用的相关投诉途径的信息。
            </p>
          </div>
        </section>

        {/* Footer Note */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            <strong>生效日期：2026.3.20</strong>
          </p>
        </div>
      </div>
    </main>
  );
}
