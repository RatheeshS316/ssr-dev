import { Code2, Github, Linkedin, Instagram, Mail } from 'lucide-react';

const SOCIAL = [
  { Icon: Github,    href: '#', label: 'GitHub',    hoverClass: 'hover:text-white hover:border-white'           },
  { Icon: Linkedin,  href: '#', label: 'LinkedIn',  hoverClass: 'hover:text-[#0077b5] hover:border-[#0077b5]' },
  { Icon: Instagram, href: '#', label: 'Instagram', hoverClass: 'hover:text-pink-500 hover:border-pink-500'   },
  { Icon: Mail,      href: '#', label: 'Email',     hoverClass: 'hover:text-brand hover:border-brand'         },
];

const NAV = [
  { label: 'Home',      page: 'home'      },
  { label: 'Portfolio', page: 'portfolio' },
  { label: 'History',   page: 'history'   },
  { label: 'Reviews',   page: 'review'    },
  { label: 'Team',      page: 'team'      },
];

const Footer = ({ handlePageChange }) => (
  <footer role="contentinfo" className="mt-20 border-t border-slate-800/40
    bg-gradient-to-b from-surface/30 to-bg">
    <div className="page-container py-14">

      {/* Top row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
        {/* Brand */}
        <div>
          <button
            onClick={() => handlePageChange('home')}
            className="flex items-center gap-2.5 mb-4 group"
          >
            <div className="p-1.5 bg-surface2 border border-brand/30 rounded-lg">
              <Code2 className="w-[18px] h-[18px] text-brand" />
            </div>
            <span className="text-[19px] font-extrabold text-white tracking-tight">
              SSR<span className="text-brand">Dev</span>
            </span>
          </button>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
            A team of 3 passionate freelance developers delivering modern web apps and AI solutions.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">Navigation</h3>
          <ul className="space-y-2.5">
            {NAV.map(({ label, page }) => (
              <li key={page}>
                <button
                  onClick={() => handlePageChange(page)}
                  className="text-sm text-slate-500 hover:text-white transition-colors duration-200 font-medium"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">Contact</h3>
          <p className="text-sm text-slate-500 mb-2">ssrdev@example.com</p>
          <p className="text-sm text-slate-500">Tamil Nadu, India</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-800/50 mb-6" />

      {/* Bottom row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} SSRDev. All rights reserved.
        </p>
        <div className="flex gap-2.5">
          {SOCIAL.map(({ Icon, href, label, hoverClass }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className={`flex items-center justify-center w-9 h-9 rounded-lg
                bg-surface2 border border-slate-800 text-slate-500
                transition-all duration-200 hover:-translate-y-0.5 ${hoverClass}`}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
