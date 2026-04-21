import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type DisplayMode = 'clean' | 'large';

interface ThemeContextType {
  displayMode: DisplayMode;
  toggleDisplayMode: () => void;
  setDisplayMode: (mode: DisplayMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  displayMode: 'clean',
  toggleDisplayMode: () => {},
  setDisplayMode: () => {},
});

const STORAGE_KEY = 'dma-intel-display-mode';

export function ThemeProvider({ children }: { children: ReactNode }) {
  // 从 localStorage 读取初始设置，默认为清爽模式
  const [displayMode, setDisplayModeState] = useState<DisplayMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'large' || saved === 'clean') {
        return saved;
      }
    }
    return 'clean';
  });

  // 包装 setDisplayMode，同时更新状态和 localStorage
  const setDisplayMode = (mode: DisplayMode) => {
    setDisplayModeState(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, mode);
    }
  };

  const toggleDisplayMode = () => {
    const newMode = displayMode === 'clean' ? 'large' : 'clean';
    setDisplayMode(newMode);
  };

  // 监听 storage 事件，处理多标签页同步
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        if (e.newValue === 'large' || e.newValue === 'clean') {
          setDisplayModeState(e.newValue);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ displayMode, toggleDisplayMode, setDisplayMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
