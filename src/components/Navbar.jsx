import { useState, useEffect } from 'react';
import { Code2, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home',      page: 'home'      },
  { label: 'Portfolio', page: 'portfolio' },
  { label: 'History',   page: 'history'   },
  { label: 'Reviews',   page: 'review'    },
  { label: 'Team',      page: 'team'      },
];

const Navbar = ({ currentPage, handlePageChange }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (page) => { handlePageChange(page); setMobileOpen(false); };

  return (
    <>
      {/* ── Sticky header ───────────────────────────────── */}
      <header
        role="banner"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg/90 border-b border-slate-800/60 backdrop-blur-xl'
            : 'bg-bg/60 border-b border-slate-800/20 backdrop-blur-lg'
        }`}
      >
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="page-container flex items-center h-16 gap-6"
        >
          {/* Brand */}
          <button
            onClick={() => navigate('home')}
            aria-label="Go to home"
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <div className="p-1.5 bg-surface2 border border-brand/30 rounded-lg group-hover:border-brand/60 transition-colors">
              <Code2 className="w-[18px] h-[18px] text-brand" />
            </div>
            <span className="text-[20px] font-extrabold text-white tracking-tight">
              SSR<span className="text-brand">Dev</span>
            </span>
          </button>

          {/* Desktop nav links — push right of brand */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {NAV_LINKS.map(({ label, page }) => {
              const active = currentPage === page;
              return (
                <button
                  key={page}
                  onClick={() => navigate(page)}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-3.5 py-1.5 rounded-lg text-sm font-semibold
                    transition-colors duration-200
                    ${active ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  {label}
                  {active && (
                    <span className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-brand rounded-t" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop right controls */}
          <div className="hidden md:flex items-center gap-3 ml-auto shrink-0">
            <button
              onClick={() => navigate('admin')}
              aria-current={currentPage === 'admin' ? 'page' : undefined}
              className={`text-sm font-semibold transition-colors duration-200
                ${currentPage === 'admin' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Admin Panel
            </button>
            <button
              onClick={() => navigate('login')}
              aria-current={currentPage === 'login' ? 'page' : undefined}
              className="btn-ghost !py-2 !px-5 !rounded-full"
            >
              Login
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-auto p-1.5 text-slate-400 hover:text-white transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* ── Mobile drawer ───────────────────────────────── */}
      <div
        aria-hidden={!mobileOpen}
        className={`md:hidden fixed top-16 inset-x-0 z-40 bg-surface/95 backdrop-blur-2xl
          border-b border-slate-800/60 overflow-hidden transition-all duration-300
          ${mobileOpen ? 'max-h-[480px] opacity-100 py-3' : 'max-h-0 opacity-0'}`}
      >
        <div className="page-container flex flex-col gap-1 pb-4 pt-1">
          {[...NAV_LINKS, { label: 'Admin Panel', page: 'admin' }].map(({ label, page }) => {
            const active = currentPage === page;
            return (
              <button
                key={page}
                onClick={() => navigate(page)}
                className={`text-left px-4 py-3 rounded-xl text-[15px] font-semibold transition-all duration-150
                  ${active
                    ? 'bg-brand/10 text-brand'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
              >
                {label}
              </button>
            );
          })}
          <div className="h-px bg-slate-800/60 my-1" />
          <button onClick={() => navigate('login')} className="btn-primary !rounded-full mx-1">Login</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
