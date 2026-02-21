import { useState, useEffect } from 'react';

import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage      from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import HistoryPage   from './pages/HistoryPage';
import ReviewPage    from './pages/ReviewPage';
import TeamPage      from './pages/TeamPage';
import AdminPage     from './pages/AdminPage';

const PAGES = {
  home:      HomePage,
  portfolio: PortfolioPage,
  history:   HistoryPage,
  review:    ReviewPage,
  team:      TeamPage,
  admin:     AdminPage,
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  /* Initial splash */
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  /* Page transition */
  const handlePageChange = (page) => {
    const p = page.toLowerCase();
    if (p === currentPage) return;
    setIsLoading(true);
    setCurrentPage(p);
    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 900);
  };

  if (isLoading) return <LoadingScreen />;

  const PageComponent = PAGES[currentPage] || HomePage;

  return (
    <div className="min-h-screen bg-bg text-slate-200 overflow-x-hidden relative">

      {/* Fixed decorative background */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-left glow */}
        <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full
          bg-[radial-gradient(circle,rgba(59,130,246,0.09)_0%,transparent_65%)]" />
        {/* Bottom-right glow */}
        <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] rounded-full
          bg-[radial-gradient(circle,rgba(139,92,246,0.07)_0%,transparent_65%)]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-grid opacity-70" />
      </div>

      {/* Navbar */}
      <Navbar currentPage={currentPage} handlePageChange={handlePageChange} />

      {/* Page content */}
      <main id="main-content" role="main" className="relative z-10 min-h-[70vh]">
        <PageComponent handlePageChange={handlePageChange} />
      </main>

      {/* Footer */}
      <Footer handlePageChange={handlePageChange} />
    </div>
  );
};

export default App;
