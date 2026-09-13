import { useWorldState } from '../../state/useWorldState';

export function BootSequence() {
  const { currentSection, sectionProgress, bootCompleted, completeBoot } = useWorldState();

  const active = currentSection === 'boot';
  const p = active ? sectionProgress : (bootCompleted ? 1 : 0);

  // Complete boot when section scrolls past
  if (p >= 0.98 && !bootCompleted) {
    completeBoot();
  }

  // Phase timing — AKILAN is visible immediately (progress=0)
  const nameOpacity = Math.min(1, 0.6 + p * 0.4); // starts at 0.6, goes to 1
  const nameBlur = Math.max(0, (0.3 - p) * 15);   // slight blur fades quickly
  const taglineOpacity = p > 0.15 ? Math.min((p - 0.15) / 0.2, 1) : 0;
  const sysTextOpacity = p > 0.05 ? Math.min((p - 0.05) / 0.1, 1) : 0;
  const circleOpacity = p > 0.1 ? Math.min((p - 0.1) / 0.2, 1) * 0.2 : 0;
  const fadeOut = p > 0.75 ? Math.min((p - 0.75) / 0.25, 1) : 0;

  const opacity = active ? 1 - fadeOut : 0;

  if (!active && bootCompleted) return null;

  return (
    <section
      id="boot"
      aria-label="Boot Sequence"
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ opacity, zIndex: 40 }}
    >
      {/* System init text — appears shortly after scroll begins */}
      <div className="absolute inset-0 flex flex-col justify-between p-8 font-mono text-[10px] text-phantom opacity-50">
        <div style={{ opacity: sysTextOpacity, transform: `translateY(${(1 - sysTextOpacity) * 10}px)` }}>
          INITIALIZING SYSTEM... [OK]
        </div>
        <div className="text-right" style={{ opacity: sysTextOpacity }}>
          LOADING VOID / {Math.floor(p * 100)}%
        </div>
      </div>

      {/* Geometric circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-64 h-64 border border-ghost rounded-full mix-blend-screen"
          style={{ opacity: circleOpacity, transform: `scale(${0.5 + p * 0.5})` }}
        />
      </div>

      {/* Name — VISIBLE IMMEDIATELY */}
      <div className="flex flex-col items-center justify-center relative">
        <h1
          className="text-7xl md:text-9xl font-bold tracking-tight text-bright"
          style={{
            opacity: nameOpacity,
            filter: `blur(${nameBlur}px)`,
            transform: `scale(${1 + nameBlur * 0.03})`,
          }}
        >
          AKILAN
        </h1>

        {/* Tagline — fades in as you start scrolling */}
        <p
          className="text-lg md:text-2xl font-light text-ghost mt-4 tracking-widest"
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${(1 - taglineOpacity) * 20}px)`,
          }}
        >
          I build things until I understand how they break.
        </p>

        {/* Scroll hint — visible at start, fades as you scroll */}
        <div
          className="absolute -bottom-24 flex flex-col items-center gap-2 font-mono text-[10px] text-phantom tracking-widest"
          style={{ opacity: Math.max(0, 1 - p * 5) }}
        >
          <span>SCROLL</span>
          <span className="animate-bounce">↓</span>
        </div>
      </div>
    </section>
  );
}
