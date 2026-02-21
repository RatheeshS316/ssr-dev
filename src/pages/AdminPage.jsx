import { FolderOpen, Users, Star, IndianRupee, LogOut, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';
import StatCard from '../components/StatCard';

const STATS = [
  { icon: <FolderOpen   className="w-5 h-5 text-blue-400"   />, value: '20+',   label: 'Total Projects'  },
  { icon: <Users        className="w-5 h-5 text-green-400"  />, value: '10+',   label: 'Happy Clients'   },
  { icon: <Star         className="w-5 h-5 text-yellow-400" />, value: '4.9',   label: 'Avg Rating'      },
  { icon: <IndianRupee  className="w-5 h-5 text-purple-400" />, value: '₹2.5L', label: 'Revenue Earned'  },
];

const ACTIVITY = [
  { project: 'E-Commerce Platform',   client: 'ABC Store',       status: 'Completed',   date: 'Jan 2026' },
  { project: 'College Management',    client: 'XYZ College',     status: 'Completed',   date: 'Dec 2025' },
  { project: 'Resume Analyzer AI',    client: 'HR Tech Startup', status: 'In Progress', date: 'Feb 2026' },
  { project: 'Restaurant Booking App', client: 'Spice Garden',   status: 'Completed',   date: 'Nov 2025' },
];

const STATUS_MAP = {
  'Completed':   { Icon: CheckCircle2, cls: 'badge-green'  },
  'In Progress': { Icon: Clock,        cls: 'badge-yellow' },
  'On Hold':     { Icon: AlertCircle,  cls: 'badge-red'    },
};
const StatusBadge = ({ status }) => {
  const { Icon, cls } = STATUS_MAP[status] || STATUS_MAP['Completed'];
  return <span className={cls}><Icon className="w-3 h-3" />{status}</span>;
};

const AdminPage = ({ handlePageChange }) => (
  <div className="page-container pt-10 pb-24">

    {/* Header */}
    <FadeInSection>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight mb-1">Admin Dashboard</h1>
          <p className="text-sm text-slate-500">Welcome back! Here's an overview of SSRDev.</p>
        </div>
        <button
          onClick={() => handlePageChange('home')}
          aria-label="Logout"
          className="btn-ghost !py-2 !px-4 !text-sm flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </FadeInSection>

    {/* Stats */}
    <FadeInSection delay={60}>
      <section aria-label="Dashboard stats"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((s, i) => <StatCard key={i} {...s} />)}
      </section>
    </FadeInSection>

    {/* Recent activity table */}
    <FadeInSection delay={120}>
      <section aria-label="Recent project activity" className="mb-8">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Recent Activity</h2>
        <div className="bg-surface2 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[400px]">
              <thead>
                <tr className="bg-surface border-b border-slate-800">
                  {['Project', 'Client', 'Status', 'Date'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ACTIVITY.map((row, i) => (
                  <tr key={i} className="border-b border-slate-800/50 hover:bg-surface transition-colors">
                    <td className="px-5 py-3.5 text-sm font-semibold text-slate-200">{row.project}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-400">{row.client}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={row.status} /></td>
                    <td className="px-5 py-3.5 text-sm text-slate-500">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </FadeInSection>

    {/* Quick actions */}
    <FadeInSection delay={180}>
      <section aria-label="Quick actions">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-2.5">
          {[
            { label: 'View Portfolio',  page: 'portfolio' },
            { label: 'Project History', page: 'history'   },
            { label: 'Client Reviews',  page: 'review'    },
            { label: 'Our Team',        page: 'team'      },
          ].map(({ label, page }) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className="px-4 py-2 rounded-xl text-sm font-semibold
                bg-surface2 border border-slate-800 text-slate-400
                hover:text-white hover:border-slate-600 hover:bg-brand/8 transition-all duration-150"
            >
              {label}
            </button>
          ))}
        </div>
      </section>
    </FadeInSection>

  </div>
);

export default AdminPage;
