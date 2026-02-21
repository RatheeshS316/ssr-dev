import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';

const HISTORY = [
  { client: 'ABC Store',      title: 'E-Commerce Website',       tech: 'React, Node.js, MongoDB',     status: 'Completed',   date: 'Jan 2026' },
  { client: 'XYZ College',   title: 'College Management System', tech: 'MERN Stack',                 status: 'Completed',   date: 'Dec 2025' },
  { client: 'Spice Garden',  title: 'Restaurant Booking App',    tech: 'Next.js, Prisma, PostgreSQL', status: 'Completed',   date: 'Nov 2025' },
  { client: 'HR Tech Startup', title: 'Resume Analyzer AI',      tech: 'Python, LangChain, React',   status: 'In Progress', date: 'Feb 2026' },
  { client: 'PropFind',      title: 'Real Estate Portal',        tech: 'React, Node, MySQL',          status: 'Completed',   date: 'Oct 2025' },
];

const STATUS_MAP = {
  'Completed':   { Icon: CheckCircle2, cls: 'badge-green'  },
  'In Progress': { Icon: Clock,        cls: 'badge-yellow' },
  'On Hold':     { Icon: AlertCircle,  cls: 'badge-red'    },
};

const StatusBadge = ({ status }) => {
  const { Icon, cls } = STATUS_MAP[status] || STATUS_MAP['Completed'];
  return (
    <span className={cls}>
      <Icon className="w-3 h-3" /> {status}
    </span>
  );
};

const HistoryPage = () => (
  <div className="page-container pt-16 pb-24">

    <FadeInSection>
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight mb-3">
          Project <span className="gradient-text">History</span>
        </h1>
        <p className="text-sm text-slate-400">A complete record of our past and ongoing projects.</p>
      </div>
    </FadeInSection>

    <FadeInSection delay={80}>
      <div className="bg-surface2 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-surface border-b border-slate-800">
                {['#', 'Client', 'Project Title', 'Technology', 'Status', 'Date'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HISTORY.map((row, i) => (
                <tr key={i}
                  className="border-b border-slate-800/50 transition-colors hover:bg-surface">
                  <td className="px-5 py-4 text-xs text-slate-600 font-mono">{String(i + 1).padStart(2, '0')}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-300">{row.client}</td>
                  <td className="px-5 py-4 text-sm text-slate-200">{row.title}</td>
                  <td className="px-5 py-4 text-xs text-slate-500 font-mono">{row.tech}</td>
                  <td className="px-5 py-4"><StatusBadge status={row.status} /></td>
                  <td className="px-5 py-4 text-sm text-slate-500">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary row */}
        <div className="flex flex-wrap gap-5 px-5 py-3.5 border-t border-slate-800 text-xs text-slate-500">
          <span>Total: <strong className="text-slate-400">{HISTORY.length}</strong></span>
          <span>Completed: <strong className="text-green-400">{HISTORY.filter(h => h.status === 'Completed').length}</strong></span>
          <span>In Progress: <strong className="text-yellow-400">{HISTORY.filter(h => h.status === 'In Progress').length}</strong></span>
        </div>
      </div>
    </FadeInSection>
  </div>
);

export default HistoryPage;
