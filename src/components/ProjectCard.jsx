import { ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, demoUrl = '#' }) => {
  const { title, client, img, tech } = project;

  return (
    <article className="flex flex-col h-full bg-surface border border-slate-800 rounded-2xl
      overflow-hidden group transition-all duration-300
      hover:border-brand/30 hover:shadow-2xl hover:shadow-brand/5 hover:-translate-y-1">

      {/* Thumbnail */}
      <div className="h-44 overflow-hidden relative">
        <img
          src={img}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3 className="text-[16px] font-bold text-slate-100 mb-1">{title}</h3>
          {client && <p className="text-xs text-slate-500">{client}</p>}
        </div>

        {/* Tech chips */}
        {tech && (
          <div className="flex flex-wrap gap-1.5">
            {(Array.isArray(tech) ? tech : [tech]).map(t => (
              <span key={t} className="tech-chip">{t}</span>
            ))}
          </div>
        )}

        {/* CTA */}
        <a
          href={demoUrl}
          aria-label={`View live demo of ${title}`}
          className="mt-auto flex items-center justify-center gap-2 py-2.5 rounded-xl
            bg-blue-900/25 border border-brand/25 text-brand-light text-[13px] font-bold
            transition-all duration-200 hover:bg-brand hover:text-white hover:border-brand"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Live Demo
        </a>
      </div>
    </article>
  );
};

export default ProjectCard;
