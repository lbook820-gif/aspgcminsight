import { HashRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './sections/Navbar';
import HomePage from './pages/HomePage';
import AppEcosystemPage from './pages/AppEcosystemPage';
import PaymentEcosystemPage from './pages/PaymentEcosystemPage';
import SummitPage from './pages/SummitPage';
import PrivacyPage from './pages/PrivacyPage';
import MetaAnalysisPage from './pages/MetaAnalysisPage';
import Footer from './sections/Footer';
import RefreshButton from './components/RefreshButton';
import DisplayModeToggle from './components/DisplayModeToggle';
import PageNavigator from './components/PageNavigator';

function AppContent() {
  const { displayMode } = useTheme();

  // 根据显示模式动态设置 html 元素的 class
  useEffect(() => {
    const html = document.documentElement;
    if (displayMode === 'large') {
      html.classList.add('large-text');
    } else {
      html.classList.remove('large-text');
    }
  }, [displayMode]);

  return (
    <HashRouter>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/app-ecosystem" element={<AppEcosystemPage />} />
          <Route path="/payment-ecosystem" element={<PaymentEcosystemPage />} />
          <Route path="/summit" element={<SummitPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/meta-analysis" element={<MetaAnalysisPage />} />
        </Routes>
        <Footer />
        <PageNavigator />
        <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3">
          <DisplayModeToggle />
          <RefreshButton />
        </div>
      </div>
    </HashRouter>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
