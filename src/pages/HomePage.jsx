import { useState, useEffect } from 'react';
import { FileText, Users, TrendingUp, Code2, Cpu } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';
import StatCard from '../components/StatCard';
import ProjectCard from '../components/ProjectCard';
import TeamCard from '../components/TeamCard';
import ReviewCard from '../components/ReviewCard';

const RECENT_PROJECTS = [
  { id: 1, title: 'E-Commerce Platform',       client: 'ABC Store',        img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600', tech: ['React', 'Node', 'MongoDB'] },
  { id: 2, title: 'AI Chatbot',                client: 'Internal Product', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600', tech: ['Python', 'FastAPI', 'OpenAI'] },
  { id: 3, title: 'College Management System', client: 'XYZ College',      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600', tech: ['MERN Stack'] },
];

const TEAM = [
  { name: 'Ratheesh S',     role: 'Full Stack Developer', avatar: 'https://i.pravatar.cc/150?img=11' },
  { name: 'Suyambu Raja A', role: 'Full Stack Developer', avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Sanjay Ram A S', role: 'Backend Developer',    avatar: 'https://i.pravatar.cc/150?img=13' },
];

const REVIEWS = [
  { name: 'John Doe',    role: 'CEO, ABC Corp',       rating: 5, quote: 'Professional team delivered our project on time and beyond expectations!' },
  { name: 'Sarah Smith', role: 'Product Manager',     rating: 5, quote: 'Excellent code quality, great communication, and top-notch support throughout.' },
  { name: 'Michael Lee', role: 'Startup Founder',     rating: 5, quote: 'Modern, clean design and rock-solid implementation. Highly recommended!' },
];

const SectionHeader = ({ title, barClass }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-white mb-2.5">{title}</h2>
    <div className="flex items-center">
      <div className={`h-[3px] w-24 rounded-full ${barClass || 'bg-gradient-to-r from-brand to-blue-400'}`} />
      <div className="flex-1 h-px bg-slate-800/70" />
    </div>
  </div>
);

/* ── Animated terminal widget ────────────────────────── */
const TERMINAL_STEPS = [
  { delay: 0,    line: '> npm run deploy',          color: '#60a5fa' },  // blue prompt
  { delay: 1200, line: 'Building optimized assets...', color: '#e2e8f0' }, // white
  { delay: 2600, line: 'Deployment successful! ✓',  color: '#60a5fa' },  // blue
];

function TerminalWidget() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [showCursor, setShowCursor]     = useState(true);

  // Reveal each line at its configured delay, then loop after 5s
  useEffect(() => {
    let mounted = true;

    const run = () => {
      setVisibleLines([]);
      TERMINAL_STEPS.forEach(({ delay, line, color }) => {
        setTimeout(() => {
          if (mounted) setVisibleLines(prev => [...prev, { line, color }]);
        }, delay + 400); // +400ms initial pause
      });
    };

    run();
    const loop = setInterval(() => { run(); }, 5000);

    // blinking cursor
    const cursor = setInterval(() => setShowCursor(v => !v), 530);

    return () => { mounted = false; clearInterval(loop); clearInterval(cursor); };
  }, []);

  return (
    <div
      style={{
        background: 'rgba(8, 13, 26, 0.95)',
        border: '1px solid rgba(51, 65, 85, 0.6)',
        borderRadius: '14px',
        overflow: 'hidden',
      }}
    >
      {/* Title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px',
        borderBottom: '1px solid rgba(51, 65, 85, 0.4)',
        background: 'rgba(11, 17, 32, 0.8)',
      }}>
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 6 }}>
          {['#f87171', '#fbbf24', '#4ade80'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.85 }} />
          ))}
        </div>
        {/* Tab title */}
        <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.04em' }}>
          bash&nbsp;&nbsp;~&nbsp;&nbsp;deploy
        </span>
        <div style={{ width: 46 }} /> {/* spacer to center title */}
      </div>

      {/* Terminal body */}
      <div style={{ padding: '14px 16px', minHeight: 90, fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>
        {visibleLines.map(({ line, color }, i) => {
          const isLast = i === visibleLines.length - 1;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 6, lineHeight: 1.5 }}>
              <span style={{ color, whiteSpace: 'pre' }}>{line}</span>
              {/* Blinking cursor only on the last visible line */}
              {isLast && (
                <span style={{
                  display: 'inline-block', width: 8, height: 15, marginLeft: 2,
                  background: '#60a5fa',
                  opacity: showCursor ? 1 : 0,
                  borderRadius: 1,
                  verticalAlign: 'middle',
                  transition: 'opacity 0.1s',
                }} />
              )}
            </div>
          );
        })}
        {/* Empty state placeholder so box doesn't collapse */}
        {visibleLines.length === 0 && (
          <span style={{ color: '#60a5fa', fontFamily: 'JetBrains Mono, monospace' }}>
            <span style={{ opacity: showCursor ? 1 : 0 }}>█</span>
          </span>
        )}
      </div>
    </div>
  );
}

/* ── Home page ────────────────────────────────────────── */
const HomePage = ({ handlePageChange }) => (
  <div className="page-container pt-10 pb-20 space-y-20">

    {/* ══ HERO ════════════════════════════════════════════ */}
    <section
      aria-label="Hero"
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[420px]"
    >
      {/* Left: copy */}
      <div className="flex flex-col items-start max-w-2xl">
        <FadeInSection delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6
            border border-brand/30 bg-brand/5 text-xs font-bold text-blue-300">
            <Code2 className="w-3.5 h-3.5" />
            Freelance Full-Stack Team
          </div>
        </FadeInSection>

        <FadeInSection delay={100}>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[64px] font-black
            text-slate-100 leading-[1.08] tracking-tight mb-5">
            We Build Digital
            <br />
            <span className="gradient-text">Solutions</span>{' '}For Your
            <br />
            Business
          </h1>
        </FadeInSection>

        <FadeInSection delay={200}>
          <p className="text-base text-slate-400 leading-relaxed max-w-lg mb-8">
            A team of <strong className="text-white font-bold">3 freelance developers</strong> delivering
            modern web applications, AI-powered tools, and scalable backend systems — on time, every time.
          </p>
        </FadeInSection>

        <FadeInSection delay={300}>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => handlePageChange('portfolio')} className="btn-primary px-7 py-3">
              View Portfolio
            </button>
            <button className="btn-ghost px-7 py-3">
              Contact Us
            </button>
          </div>
        </FadeInSection>
      </div>

      {/* Right: decorative UI card */}
      <FadeInSection delay={150} className="flex justify-center lg:justify-end">
        <div className="relative w-full max-w-md lg:max-w-full">
          {/* Ambient glow */}
          <div className="absolute inset-0 -m-8 pointer-events-none
            bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12)_0%,rgba(139,92,246,0.07)_60%,transparent_80%)]
            blur-2xl" />

          <div className="relative bg-surface border border-slate-800/80 rounded-3xl p-6 shadow-2xl">
            {/* Top row: stat + CPU icon */}
            <div className="flex justify-between items-start mb-5">
              <div className="bg-surface2 border border-slate-700 rounded-xl px-5 py-3 text-center">
                <p className="text-2xl font-black text-brand leading-none">100%</p>
                <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-1 font-bold">Uptime</p>
              </div>
              <div className="w-11 h-11 rounded-full bg-purple-900/30 border border-purple-500/25
                flex items-center justify-center">
                <Cpu className="w-5 h-5 text-purple-400" />
              </div>
            </div>

            {/* Grid area with pulse dot */}
            <div className="relative bg-grid rounded-xl min-h-[110px] mb-5 flex items-center justify-center overflow-hidden">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-brand/25 rounded-full animate-ping opacity-60" />
                <div className="absolute inset-2 bg-brand rounded-full shadow-lg shadow-brand/50" />
              </div>
            </div>

            {/* ── Animated terminal ── */}
            <TerminalWidget />
          </div>
        </div>
      </FadeInSection>
    </section>

    {/* ══ STATS ═══════════════════════════════════════════ */}
    <FadeInSection>
      <section aria-label="Statistics" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<FileText   className="w-5 h-5 text-blue-400"   />} value="20+" label="Projects Completed" />
        <StatCard icon={<Users      className="w-5 h-5 text-cyan-400"   />} value="10+" label="Happy Clients"       />
        <StatCard icon={<TrendingUp className="w-5 h-5 text-purple-400" />} value="5★"  label="Client Rating"       />
        <StatCard icon={<Users      className="w-5 h-5 text-pink-400"   />} value="3"   label="Team Members"        />
      </section>
    </FadeInSection>

    {/* ══ RECENT PROJECTS ═════════════════════════════════ */}
    <section>
      <SectionHeader title="Recent Projects" barClass="bg-gradient-to-r from-brand to-blue-400" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {RECENT_PROJECTS.map((project, i) => (
          <FadeInSection key={project.id} delay={i * 100}>
            <ProjectCard project={project} />
          </FadeInSection>
        ))}
      </div>
    </section>

    {/* ══ OUR TEAM ════════════════════════════════════════ */}
    <section>
      <SectionHeader title="Our Team" barClass="bg-gradient-to-r from-purple-500 to-purple-400" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TEAM.map((member, i) => (
          <FadeInSection key={member.name} delay={i * 100}>
            <TeamCard member={member} />
          </FadeInSection>
        ))}
      </div>
    </section>

    {/* ══ REVIEWS ═════════════════════════════════════════ */}
    <section>
      <SectionHeader title="Customer Reviews" barClass="bg-gradient-to-r from-yellow-500 to-yellow-400" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {REVIEWS.map((review, i) => (
          <FadeInSection key={review.name} delay={i * 100}>
            <ReviewCard review={review} />
          </FadeInSection>
        ))}
      </div>
    </section>

  </div>
);

export default HomePage;
