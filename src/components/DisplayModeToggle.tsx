import { useTheme } from '../context/ThemeContext';
import { Type, Minus } from 'lucide-react';

export default function DisplayModeToggle() {
  const { displayMode, toggleDisplayMode } = useTheme();

  return (
    <button
      onClick={toggleDisplayMode}
      className="w-12 h-12 bg-black text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 active:bg-gray-700 transition-colors"
      title={displayMode === 'clean' ? '切换到大字体模式' : '切换到清爽模式'}
    >
      {displayMode === 'clean' ? (
        <Type className="w-5 h-5" />
      ) : (
        <Minus className="w-5 h-5" />
      )}
    </button>
  );
}
