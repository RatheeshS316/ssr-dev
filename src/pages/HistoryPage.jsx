import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';
import api from '../services/api';

const DEFAULT_HISTORY = {
  aboutTitle: 'About SSR Dev',
  missionStatement: 'To deliver high-quality, scalable, and innovative software solutions that transform digital landscapes.',
  visionStatement: 'To be the trusted technology partner for businesses seeking excellence in digital innovation.',
  foundingYear: 2023,
  achievements: [
    'Delivered 20+ successful projects across MERN, Django, and AI/ML technologies',
    'Built team of 3 full-stack developers with expertise in modern web technologies',
    'Achieved 100% client satisfaction rate with on-time project delivery',
    'Specialized in e-commerce, AI integration, and enterprise solutions',
  ],
};

const FALLBACK_HISTORY = [
  { clientName: 'ABC Store',      title: 'E-Commerce Website',       technologies: 'React, Node.js, MongoDB', category: 'Web Development', completionDate: 'Jan 2026' },
  { clientName: 'XYZ College',   title: 'College Management System', technologies: 'MERN Stack', category: 'Enterprise', completionDate: 'Dec 2025' },
  { clientName: 'Spice Garden',  title: 'Restaurant Booking App',    technologies: 'Next.js, Prisma, PostgreSQL', category: 'Web Development', completionDate: 'Nov 2025' },
  { clientName: 'HR Tech Startup', title: 'Resume Analyzer AI',      technologies: 'Python, LangChain, React', category: 'AI/ML', completionDate: 'Feb 2026' },
  { clientName: 'PropFind',      title: 'Real Estate Portal',        technologies: 'React, Node, MySQL', category: 'Web Development', completionDate: 'Oct 2025' },
];

const HistoryPage = () => {
  const [companyHistory, setCompanyHistory] = useState(DEFAULT_HISTORY);
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        // Fetch company history
        const historyRes = await api.get('/api/company-history');
        if (historyRes.data.success) {
          setCompanyHistory(historyRes.data.data || DEFAULT_HISTORY);
        }

        // Fetch recent projects
        const projectsRes = await api.get('/api/projects/recent');
        if (projectsRes.data.success) {
          setRecentProjects(projectsRes.data.data || FALLBACK_HISTORY);
        } else {
          setRecentProjects(FALLBACK_HISTORY);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayProjects = recentProjects.length > 0 ? recentProjects : FALLBACK_HISTORY;

  return (
    <div>
      <FadeInSection>
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight mb-3">
            Our <span className="gradient-text">Journey</span>
          </h1>
          <p className="text-sm text-slate-400">Learn about SSR Dev and our mission to deliver excellence.</p>
        </div>
      </FadeInSection>

      {/* Error Message */}
      {error && (
        <FadeInSection>
          <div className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-700/50 rounded-lg text-red-300 mb-8">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>Failed to load company history: {error}</p>
          </div>
        </FadeInSection>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12 text-slate-400">
          Loading company information...
        </div>
      )}

      {!loading && (
        <>
          {/* Company Info Section */}
          <FadeInSection delay={80}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Left: Mission & Vision */}
              <div className="space-y-6">
                <div className="bg-surface border border-slate-800/50 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                  <p className="text-slate-300 leading-relaxed">
                    {companyHistory.missionStatement || DEFAULT_HISTORY.missionStatement}
                  </p>
                </div>

                <div className="bg-surface border border-slate-800/50 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
                  <p className="text-slate-300 leading-relaxed">
                    {companyHistory.visionStatement || DEFAULT_HISTORY.visionStatement}
                  </p>
                </div>
              </div>

              {/* Right: Stats & Founding */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-brand/20 to-brand/10 border border-brand/30 rounded-2xl p-6">
                  <h3 className="text-3xl font-bold text-brand mb-2">
                    {companyHistory.foundingYear || DEFAULT_HISTORY.foundingYear}
                  </h3>
                  <p className="text-slate-400">Year Founded</p>
                </div>

                <div className="bg-surface border border-slate-800/50 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Key Achievements</h2>
                  <ul className="space-y-3">
                    {(companyHistory.achievements || DEFAULT_HISTORY.achievements).map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                        <span className="text-brand font-bold mt-1">✓</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Recent Projects Table */}
          <FadeInSection delay={100}>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Our Recent Projects</h2>
              <div className="bg-surface2 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-surface border-b border-slate-800">
                        {['#', 'Client', 'Project Title', 'Technologies', 'Completion Date'].map(h => (
                          <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {displayProjects.map((project, i) => (
                        <tr key={i}
                          className="border-b border-slate-800/50 transition-colors hover:bg-surface">
                          <td className="px-5 py-4 text-xs text-slate-600 font-mono">{String(i + 1).padStart(2, '0')}</td>
                          <td className="px-5 py-4 text-sm font-semibold text-slate-300">{project.clientName || project.client}</td>
                          <td className="px-5 py-4 text-sm text-slate-200">{project.title}</td>
                          <td className="px-5 py-4 text-xs text-slate-500 font-mono">
                            {(project.technologies || project.tech || '').slice(0, 40)}...
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-500">{project.completionDate || project.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary row */}
                <div className="flex flex-wrap gap-5 px-5 py-3.5 border-t border-slate-800 text-xs text-slate-500">
                  <span>Total: <strong className="text-slate-400">{displayProjects.length}</strong></span>
                  <span>Recent Projects: <strong className="text-green-400">{displayProjects.length}</strong></span>
                </div>
              </div>
            </div>
          </FadeInSection>
        </>
      )}
    </div>
  );
};

export default HistoryPage;
