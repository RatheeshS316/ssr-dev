import { Github, Linkedin } from 'lucide-react';

const TeamCard = ({ member, size = 'sm' }) => {
  const { name, role, avatar, github = '#', linkedin = '#' } = member;
  const imgSize = size === 'lg' ? 'w-28 h-28' : 'w-24 h-24';

  return (
    <article className="flex flex-col items-center text-center bg-surface2 border border-slate-800
      rounded-3xl p-8 transition-all duration-300
      hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/5 hover:-translate-y-1.5 group">

      {/* Avatar with gradient ring */}
      <div className="relative mb-5">
        <div className="absolute inset-0 -m-1 rounded-full bg-gradient-to-br from-brand to-purple-500 opacity-40" />
        <img
          src={avatar}
          alt={name}
          loading="lazy"
          className={`${imgSize} rounded-full object-cover border-[3px] border-surface2 relative z-10`}
        />
      </div>

      {/* Name & role */}
      <h3 className={`font-extrabold text-slate-100 mb-2 ${size === 'lg' ? 'text-xl' : 'text-lg'}`}>{name}</h3>
      <span className="inline-block px-3.5 py-1 rounded-full
        bg-brand/10 border border-brand/20 text-[10px] font-bold text-brand-light
        uppercase tracking-widest mb-6">{role}</span>

      {/* Divider */}
      <div className="w-full h-px bg-slate-800 mb-5" />

      {/* Social links */}
      <div className="flex gap-2.5">
        {[
          { href: linkedin, Icon: Linkedin, label: `${name} LinkedIn` },
          { href: github,   Icon: Github,   label: `${name} GitHub`   },
        ].map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="flex items-center justify-center w-9 h-9 rounded-xl
              bg-surface3 border border-slate-700 text-slate-500
              transition-all duration-200 hover:text-white hover:border-slate-500 hover:scale-110"
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </article>
  );
};

export default TeamCard;
