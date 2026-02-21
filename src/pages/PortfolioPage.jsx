import { useState } from 'react';
import FadeInSection from '../components/FadeInSection';
import ProjectCard from '../components/ProjectCard';

const ALL_PROJECTS = [
  { id: 1, category: 'web', title: 'E-Commerce Platform',       client: 'ABC Store',       img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600', tech: ['React', 'Node', 'MongoDB'] },
  { id: 2, category: 'ai',  title: 'AI Chatbot',                client: 'Internal Product', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600', tech: ['Python', 'FastAPI', 'OpenAI'] },
  { id: 3, category: 'web', title: 'College Management System', client: 'XYZ College',     img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600', tech: ['MERN Stack'] },
  { id: 4, category: 'web', title: 'Restaurant Booking App',    client: 'Spice Garden',    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600', tech: ['Next.js', 'Prisma', 'PostgreSQL'] },
  { id: 5, category: 'ai',  title: 'Resume Analyzer AI',        client: 'HR Tech Startup', img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600', tech: ['Python', 'LangChain', 'React'] },
  { id: 6, category: 'web', title: 'Real Estate Portal',        client: 'PropFind',        img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600', tech: ['React', 'Node', 'MySQL'] },
];

const FILTERS = [
  { label: 'All',     value: 'all' },
  { label: 'Web',     value: 'web' },
  { label: 'AI / ML', value: 'ai'  },
];

const PortfolioPage = () => {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.category === active);

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

      {/* Filter tabs */}
      <FadeInSection delay={80}>
        <div role="tablist" aria-label="Filter by category"
          className="flex justify-center gap-2 mb-10">
          {FILTERS.map(({ label, value }) => {
            const isActive = active === value;
            return (
              <button
                key={value}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(value)}
                className={`px-5 py-2 rounded-full text-[13px] font-bold border transition-all duration-200
                  ${isActive
                    ? 'border-brand bg-brand/15 text-brand-light'
                    : 'border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </FadeInSection>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((project, i) => (
          <FadeInSection key={project.id} delay={i * 70}>
            <ProjectCard project={project} />
          </FadeInSection>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
