import { RefreshCw } from 'lucide-react';

export default function RefreshButton() {
  const handleRefresh = () => {
    // 先滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // 延迟后重新加载，让用户看到滚动效果
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <button
      onClick={handleRefresh}
      className="w-12 h-12 bg-black text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 active:bg-gray-700 transition-colors"
      title="刷新页面"
    >
      <RefreshCw className="w-5 h-5" />
    </button>
  );
}
