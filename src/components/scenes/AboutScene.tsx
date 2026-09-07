import { useWorldState } from '../../state/useWorldState';

export function AboutScene() {
  const { currentSection, sectionProgress } = useWorldState();

  const active = currentSection === 'about';
  if (!active) return null;

  const p = sectionProgress;
  const fadeIn = Math.min(p / 0.2, 1);
  const fadeOut = p > 0.8 ? (p - 0.8) / 0.2 : 0;
  const opacity = fadeIn * (1 - fadeOut);
  const translateY = (0.5 - p) * 80;
  const blur = fadeIn < 1 ? (1 - fadeIn) * 10 : fadeOut * 10;

  return (
    <section
      id="about"
      aria-label="About"
      className="fixed inset-0 flex items-center justify-center px-6 pointer-events-none"
      style={{ zIndex: 25 }}
    >
      <div
        className="max-w-2xl text-left"
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          filter: `blur(${blur}px)`,
        }}
      >
        <p className="text-2xl md:text-4xl font-light leading-relaxed text-whisper">
          I study systems by dismantling them.
          Currently building intrusion detection models, fuzzers, and diagnostic tools — each one an excuse to understand another layer of how things fail.
        </p>
        <div className="mt-12 font-mono text-sm text-phantom flex flex-col gap-2">
          <span className="uppercase tracking-widest text-ghost">Computer Science and Engineering</span>
          <span>Expected 2027</span>
        </div>
      </div>
    </section>
  );
}
