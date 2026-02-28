import { useState, useEffect } from 'react';
import { AlertCircle, ExternalLink } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';
import api from '../services/api';

const FALLBACK_PROJECTS = [
  { id: 1, title: 'E-Commerce Platform',       clientName: 'ABC Store',       image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600', technologies: ['React', 'Node', 'MongoDB'] },
  { id: 2, title: 'AI Chatbot',                clientName: 'Internal Product', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600', technologies: ['Python', 'FastAPI', 'OpenAI'] },
  { id: 3, title: 'College Management System', clientName: 'XYZ College',     image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600', technologies: ['MERN Stack'] },
  { id: 4, title: 'Restaurant Booking App',    clientName: 'Spice Garden',    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600', technologies: ['Next.js', 'Prisma', 'PostgreSQL'] },
  { id: 5, title: 'Resume Analyzer AI',        clientName: 'HR Tech Startup', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600', technologies: ['Python', 'LangChain', 'React'] },
  { id: 6, title: 'Real Estate Portal',        clientName: 'PropFind',        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600', technologies: ['React', 'Node', 'MySQL'] },
];

const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setError(null);
        const res = await api.get('/api/projects/portfolio');
        if (res.data.success) {
          setProjects(res.data.data && res.data.data.length > 0 ? res.data.data : FALLBACK_PROJECTS);
        } else {
          setProjects(FALLBACK_PROJECTS);
        }
      } catch (err) {
        console.error('Failed to fetch portfolio projects:', err);
        setProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const displayProjects = projects.length > 0 ? projects : FALLBACK_PROJECTS;

  return (
    <div className="page-container pt-16 pb-24">

      <FadeInSection>
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight mb-3">
            Our <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            A selection of projects we've built with passion, precision, and modern technology.
          </p>
        </div>
      </FadeInSection>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12 text-slate-400">
          Loading portfolio projects...
        </div>
      )}

      {/* Error State */}
      {error && (
        <FadeInSection>
          <div className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-700/50 rounded-lg text-red-300 mb-8">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>Failed to load projects: {error}</p>
          </div>
        </FadeInSection>
      )}

      {/* Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayProjects.map((project, i) => (
            <FadeInSection key={project.id} delay={i * 70}>
              <div className="group bg-surface border border-slate-800/50 rounded-2xl overflow-hidden hover:border-brand/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand/20">
                {/* Image */}
                {(project.image || project.images?.[0]) && (
                  <div className="relative h-40 bg-surface2 overflow-hidden">
                    <img
                      src={project.image || project.images?.[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-brand transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">
                    {project.clientName || project.client}
                  </p>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {project.description || 'A professional project built with modern technologies.'}
                  </p>

                  {/* Technologies */}
                  {(project.technologies || project.tech) && (
                    <div className="flex flex-wrap gap-1.5">
                      {(project.technologies || project.tech).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-brand/10 text-brand text-xs rounded border border-brand/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Project Link */}
                  {project.projectLink && (
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-brand hover:text-blue-300 mt-3 text-xs font-medium"
                    >
                      View Project
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
