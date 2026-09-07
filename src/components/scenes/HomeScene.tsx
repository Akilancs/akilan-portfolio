import { useWorldState } from '../../state/useWorldState';

export function HomeScene() {
  const { currentSection, sectionProgress } = useWorldState();

  const active = currentSection === 'home';
  if (!active) return null;

  const p = sectionProgress;
  const fadeIn = Math.min(p / 0.3, 1);
  const fadeOut = p > 0.7 ? (p - 0.7) / 0.3 : 0;
  const opacity = fadeIn * (1 - fadeOut);

  return (
    <section
      id="home"
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ opacity, zIndex: 35 }}
    >
      <div className="relative text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-bright">AKILAN</h1>
        <p
          className="text-lg md:text-xl font-light text-whisper mt-4"
          style={{
            opacity: 1 - fadeOut * 2,
            transform: `translateY(${fadeOut * 50}px)`,
          }}
        >
          I build things until I understand how they break.
        </p>
      </div>
    </section>
  );
}
