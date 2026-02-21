import { useState, useEffect } from 'react';
import { Code2 } from 'lucide-react';

const STAGES = [
  { pct: 20,  text: 'Initializing System...' },
  { pct: 45,  text: 'Syncing Data...'         },
  { pct: 75,  text: 'Optimizing View...'      },
  { pct: 100, text: 'Ready!'                  },
];

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = STAGES.map((s, i) =>
      setTimeout(() => { setProgress(s.pct); setStage(i); }, i * 400)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      role="status"
      aria-label="Loading SSRDev"
      className="fixed inset-0 z-[1000] bg-bg flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-80 h-80 rounded-full pointer-events-none
        bg-[radial-gradient(circle,rgba(59,130,246,0.2)_0%,transparent_70%)]
        animate-pulse-glow" />

      {/* Logo */}
      <div className="relative mb-8">
        <div className="absolute inset-0 -m-2 rounded-2xl bg-brand/15 blur-xl animate-pulse-glow" />
        <div className="relative bg-surface2 border border-slate-700 rounded-2xl p-5">
          <Code2 className="w-11 h-11 text-brand" />
        </div>
      </div>

      {/* Brand name */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          SSR<span className="text-brand">Dev</span>
        </h1>
        <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-semibold mt-2">
          Digital Excellence
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-56 space-y-3">
        <div className="h-[3px] bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full progress-shimmer transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[11px] text-brand-light text-center uppercase tracking-widest font-mono">
          {STAGES[stage].text}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
