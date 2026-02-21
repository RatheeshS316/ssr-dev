import FadeInSection from '../components/FadeInSection';
import TeamCard from '../components/TeamCard';

const TEAM = [
  { name: 'Ratheesh S',     role: 'Full Stack Developer', avatar: 'https://i.pravatar.cc/150?img=11' },
  { name: 'Suyambu Raja A', role: 'Full Stack Developer', avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Sanjay Ram A S', role: 'Backend Developer',    avatar: 'https://i.pravatar.cc/150?img=13' },
];

const SKILLS = ['React', 'Node.js', 'MongoDB', 'Python', 'PostgreSQL', 'Next.js', 'FastAPI', 'Docker', 'AWS', 'TypeScript'];

const TeamPage = () => (
  <div className="page-container pt-16 pb-24">
    <FadeInSection>
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight mb-3">
          Meet Our <span className="gradient-text">Experts</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          A small but mighty team dedicated to delivering exceptional digital experiences.
        </p>
      </div>
    </FadeInSection>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {TEAM.map((member, i) => (
        <FadeInSection key={member.name} delay={i * 100}>
          <TeamCard member={member} size="lg" />
        </FadeInSection>
      ))}
    </div>

    {/* Tech Stack */}
    <FadeInSection delay={60}>
      <div className="bg-surface border border-slate-800 rounded-2xl p-7">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">Our Tech Stack</h2>
        <div className="flex flex-wrap gap-2.5">
          {SKILLS.map(skill => (
            <span
              key={skill}
              className="tech-chip px-3.5 py-1.5 text-[11px] transition-colors duration-150 hover:bg-brand/20 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </FadeInSection>
  </div>
);

export default TeamPage;
