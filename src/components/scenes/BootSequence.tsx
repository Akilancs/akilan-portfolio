import { useWorldState } from '../../state/useWorldState';

export function BootSequence() {
  const { currentSection, sectionProgress, bootCompleted, completeBoot } = useWorldState();

  const active = currentSection === 'boot';
  const p = active ? sectionProgress : (bootCompleted ? 1 : 0);

  // Complete boot when section scrolls past
  if (p >= 0.98 && !bootCompleted) {
    completeBoot();
  }

  // Phase timing within section progress
  const phase1 = p > 0.1 ? Math.min((p - 0.1) / 0.15, 1) : 0;   // init text
  const phase2 = p > 0.25 ? Math.min((p - 0.25) / 0.15, 1) : 0;  // geometric shapes
  const phase3 = p > 0.4 ? Math.min((p - 0.4) / 0.2, 1) : 0;     // name reveal
  const phase4 = p > 0.6 ? Math.min((p - 0.6) / 0.15, 1) : 0;    // tagline
  const fadeOut = p > 0.8 ? Math.min((p - 0.8) / 0.2, 1) : 0;     // fade out

  const opacity = active ? 1 - fadeOut : 0;

  if (!active && bootCompleted) return null;

  return (
    <section
      id="boot"
      aria-label="Boot Sequence"
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ opacity, zIndex: 40 }}
    >
      {/* System init text */}
      <div className="absolute inset-0 flex flex-col justify-between p-8 font-mono text-[10px] text-phantom opacity-50">
        <div style={{ opacity: phase1, transform: `translateY(${(1 - phase1) * 10}px)` }}>
          INITIALIZING SYSTEM... [OK]
        </div>
        <div className="text-right" style={{ opacity: phase1, transform: `translateY(${(1 - phase1) * -10}px)` }}>
          LOADING VOID / {Math.floor(p * 100)}%
        </div>
      </div>

      {/* Geometric circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-64 h-64 border border-ghost rounded-full mix-blend-screen"
          style={{ opacity: phase2 * 0.2, transform: `scale(${0.5 + phase2 * 0.5})` }}
        />
      </div>

      {/* Name + tagline */}
      <div className="flex flex-col items-center justify-center relative">
        <h1
          className="text-7xl md:text-9xl font-bold tracking-tight text-bright"
          style={{
            opacity: phase3,
            filter: `blur(${(1 - phase3) * 20}px)`,
            transform: `scale(${1 + (1 - phase3)})`,
          }}
        >
          AKILAN
        </h1>
        <p
          className="text-xl md:text-2xl font-light text-ghost mt-4 tracking-widest"
          style={{
            opacity: phase4,
            transform: `translateY(${(1 - phase4) * 20}px)`,
            clipPath: `inset(0 ${100 - phase4 * 100}% 0 0)`,
          }}
        >
          I build things until I understand how they break.
        </p>
      </div>
    </section>
  );
}
