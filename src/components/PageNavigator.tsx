import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function PageNavigator() {
  const navigate = useNavigate();
  const location = useLocation();

  // 只在非首页显示导航按钮
  if (location.pathname === '/') {
    return null;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="fixed bottom-6 left-4 z-50 flex flex-col gap-3">
      <button
        onClick={handleGoBack}
        className="w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-700 active:bg-gray-600 transition-colors"
        title="返回上一页"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleGoHome}
        className="w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-700 active:bg-gray-600 transition-colors"
        title="回到主页"
      >
        <Home className="w-5 h-5" />
      </button>
    </div>
  );
}
