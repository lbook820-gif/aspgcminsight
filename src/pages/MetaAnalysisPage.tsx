import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, Database, MessageSquare, ShoppingCart, Scale } from 'lucide-react';

export default function MetaAnalysisPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen pt-16 bg-white">
      {/* Header */}
      <div className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
            <Link to="/" className="hover:text-black">首页</Link>
            <span>/</span>
            <Link to="/intelligence" className="hover:text-black">全部动态</Link>
            <span>/</span>
            <span className="text-black">Meta DMA合规详细分析</span>
          </div>
          <h1 className="font-bold mb-2 text-xl md:text-2xl">
            Meta 2026 DMA合规报告详细分析
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            报告提交时间：2026年3月6日
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Background */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="font-bold text-lg md:text-xl">
              背景与整体立场
            </h2>
          </div>
          <div className="space-y-4 pl-14">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="font-semibold mb-2 text-blue-900">报告时间</p>
              <p className="text-gray-700">2026年3月6日提交给欧盟委员会</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <p className="font-semibold mb-2 text-amber-900">Meta的立场</p>
              <p className="text-gray-700">
                声称其合规解决方案自2024年3月以来一直<strong>完全符合DMA要求</strong>，
                但对欧盟委员会的部分决定存在<strong>根本分歧</strong>（特别是关于"无广告订阅"模式的
                <span className="text-red-600 font-semibold">2亿欧元罚款</span>决定已提出上诉）
              </p>
            </div>
          </div>
        </section>

        {/* Five Core Areas */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="font-bold text-lg md:text-xl">
              五大核心合规领域
            </h2>
          </div>

          {/* 1. Personalized Ads */}
          <div className="mb-8 pl-4 border-l-4 border-red-400">
            <h3 className="font-bold mb-3 flex items-center gap-2 text-base md:text-lg">
              <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-sm">最大争议点</span>
              1. 个性化广告同意模式（Article 5(2)）
            </h3>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold mb-2">"付费或同意"模式</p>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700">
                  <li>Meta推出了"无广告订阅"（每月€5.99-€7.99）</li>
                  <li>以及"免费带广告"两种选择</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold mb-2">新增"低个性化广告"选项</p>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700">
                  <li>2024年11月起，选择免费广告的用户还可进一步选择</li>
                  <li>"个性化广告"或"低个性化广告"</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold mb-2">强制更新</p>
                <p className="text-sm md:text-base text-gray-700">2026年1月起，所有用户必须重新选择，且该选择流程不可跳过</p>
              </div>
            </div>
          </div>

          {/* 2. Data Portability */}
          <div className="mb-8 pl-4 border-l-4 border-blue-400">
            <h3 className="font-bold mb-3 text-base md:text-lg">
              2. 数据可携带工具（Article 6(9)）
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  导出您的信息(EYI)
                </p>
                <p className="text-sm text-gray-700">整合之前的下载和转移功能</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold mb-2">支持15个第三方目的地</p>
                <p className="text-sm text-gray-700">Google Drive、Dropbox等</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold mb-2">自动定期传输</p>
                <p className="text-sm text-gray-700">支持设置自动备份</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold mb-2">开发者门户</p>
                <p className="text-sm text-gray-700">为第三方开发者提供专门入口</p>
              </div>
            </div>
          </div>

          {/* 3. Messaging Interoperability */}
          <div className="mb-8 pl-4 border-l-4 border-green-400">
            <h3 className="font-bold mb-3 flex items-center gap-2 text-base md:text-lg">
              <MessageSquare className="w-5 h-5" />
              3. 消息互操作性（Article 7）
            </h3>
            <div className="space-y-3">
              <div className="bg-green-50 rounded-lg p-4">
                <p className="font-semibold mb-2 text-green-900">WhatsApp合作进展</p>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700">
                  <li><strong>BirdyChat</strong>：已完全上线</li>
                  <li><strong>Haiket</strong>：高级测试版阶段</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold mb-2">Facebook Messenger</p>
                <p className="text-sm md:text-base text-gray-700">同样实现互操作功能</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold mb-2">技术方案</p>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700">
                  <li>"客户端-服务器-客户端"（推荐架构）</li>
                  <li>"代理服务器"（备选方案）</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold mb-2">用户控制</p>
                <p className="text-sm md:text-base text-gray-700">需用户主动选择加入，可选择将第三方聊天合并或分离显示</p>
              </div>
            </div>
          </div>

          {/* 4. Marketplace */}
          <div className="mb-8 pl-4 border-l-4 border-purple-400">
            <h3 className="font-bold mb-3 flex items-center gap-2 text-base md:text-lg">
              <ShoppingCart className="w-5 h-5" />
              4. Facebook Marketplace去指定化
            </h3>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm md:text-base text-gray-700">
                2025年4月23日，欧盟委员会<strong>取消</strong>了对Facebook Marketplace的
                核心平台服务指定。Meta表示虽投入大量资源开发合规方案，但暂时保留这些方案。
              </p>
            </div>
          </div>

          {/* 5. Other Measures */}
          <div className="mb-8 pl-4 border-l-4 border-gray-400">
            <h3 className="font-bold mb-3 text-base md:text-lg">
              5. 其他关键合规措施
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left font-semibold">条款</th>
                    <th className="px-4 py-2 text-left font-semibold">核心要求</th>
                    <th className="px-4 py-2 text-left font-semibold">Meta的解决方案</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 font-medium">Article 5(8)</td>
                    <td className="px-4 py-3 text-gray-700">不得强制用户注册其他服务</td>
                    <td className="px-4 py-3 text-gray-700">各服务独立注册，Messenger可无Facebook账户使用</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Article 5(9)/5(10)</td>
                    <td className="px-4 py-3 text-gray-700">广告价格和报酬透明</td>
                    <td className="px-4 py-3 text-gray-700">Ads Manager提供350+数据点，支持广告商和发布商互选披露粒度</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Article 6(2)</td>
                    <td className="px-4 py-3 text-gray-700">不得利用商业用户数据与其竞争</td>
                    <td className="px-4 py-3 text-gray-700">建立技术防护措施和预发布审查流程</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Article 6(5)</td>
                    <td className="px-4 py-3 text-gray-700">自家产品推广须公平排名</td>
                    <td className="px-4 py-3 text-gray-700">所有跨产品推广通过盲拍广告机制进行</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Article 6(8)</td>
                    <td className="px-4 py-3 text-gray-700">提供广告效果测量工具</td>
                    <td className="px-4 py-3 text-gray-700">提供Ads Manager和Monetization Manager，获MRC独立认证</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Article 6(10)</td>
                    <td className="px-4 py-3 text-gray-700">商业用户数据访问权</td>
                    <td className="px-4 py-3 text-gray-700">通过Insights工具提供数百项指标</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Article 6(12)</td>
                    <td className="px-4 py-3 text-gray-700">公平合理无歧视(FRAND)接入条件</td>
                    <td className="px-4 py-3 text-gray-700">免费创建主页/专业账户，设立替代争议解决机制(ADSM)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Governance Structure */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Scale className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="font-bold text-lg md:text-xl">
              合规治理结构
            </h2>
          </div>
          <div className="pl-14">
            <p className="mb-4 text-gray-700">Meta建立了<strong>"三道防线"</strong>模式：</p>
            <div className="space-y-3">
              <div className="flex items-start gap-4 bg-indigo-50 rounded-lg p-4">
                <span className="text-white w-8 h-8 flex items-center justify-center font-bold shrink-0 bg-indigo-600 rounded-full">1</span>
                <div>
                  <p className="font-semibold">第一道防线</p>
                  <p className="text-sm md:text-base text-gray-700">产品、政策和运营团队（风险管理）</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-indigo-50 rounded-lg p-4">
                <span className="text-white w-8 h-8 flex items-center justify-center font-bold shrink-0 bg-indigo-600 rounded-full">2</span>
                <div>
                  <p className="font-semibold">第二道防线</p>
                  <p className="text-sm md:text-base text-gray-700">DMA合规职能部门（独立监督，直接向董事会独立委员会汇报）</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-indigo-50 rounded-lg p-4">
                <span className="text-white w-8 h-8 flex items-center justify-center font-bold shrink-0 bg-indigo-600 rounded-full">3</span>
                <div>
                  <p className="font-semibold">第三道防线</p>
                  <p className="text-sm md:text-base text-gray-700">内部审计（独立保证）</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Disputes */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Scale className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="font-bold text-lg md:text-xl">
              关键争议与Meta的态度
            </h2>
          </div>
          <div className="space-y-4 pl-14">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="font-semibold mb-2 text-red-900">对欧盟委员会的不满</p>
              <p className="text-gray-700">
                Meta明确表示对"无广告订阅"模式的罚款决定<strong>"根本不同意"</strong>并已上诉，
                但为避免更高罚款仍进行了建设性对话。
              </p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4">
              <p className="font-semibold mb-2 text-amber-900">"超越法律要求"的叙事</p>
              <p className="text-gray-700">多次强调其方案<strong>"远超DMA的最低要求"</strong></p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="font-semibold mb-2 text-blue-900">即将推出的变化</p>
              <p className="text-gray-700">预告将在WhatsApp频道和状态功能中推出广告，并设计相应的选择流程</p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gray-800 rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-bold text-lg md:text-xl">
              总结评价
            </h2>
          </div>
          <div className="pl-14">
            <div className="bg-gray-900 text-white rounded-lg p-6">
              <p>
                这份报告展现了Meta在监管压力下的<strong>防御性合规策略</strong>——
                一方面积极配合实施技术解决方案，另一方面通过法律挑战和公关话语维护其商业模式。
              </p>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-sm md:text-base text-gray-300">
                  <strong>核心矛盾：</strong>DMA要求给予用户"真正的选择自由"，
                  而Meta的"付费或同意"模式被欧盟委员会认定为实质上强迫用户同意数据使用。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Back Button */}
        <div className="pt-6 border-t border-gray-200">
          <Link
            to="/intelligence"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            返回全部动态
          </Link>
        </div>
      </div>
    </main>
  );
}
