import { useWorldState } from '../../state/useWorldState';

export function EducationScene() {
  const { currentSection, sectionProgress } = useWorldState();

  const active = currentSection === 'education';
  if (!active) return null;

  const p = sectionProgress;
  const fadeIn = Math.min(p / 0.25, 1);
  const fadeOut = p > 0.75 ? (p - 0.75) / 0.25 : 0;
  const opacity = fadeIn * (1 - fadeOut);
  const translateY = (0.5 - p) * 100;

  return (
    <section
      id="education"
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ opacity, zIndex: 10 }}
    >
      <div className="text-center" style={{ transform: `translateY(${translateY}px)` }}>
        <h2 className="font-mono text-xs tracking-[0.5em] text-phantom mb-8 uppercase">
          Education
        </h2>
        <h3 className="text-2xl md:text-3xl font-light text-whisper mb-2">
          Computer Science and Engineering
        </h3>
        <p className="font-mono text-sm text-ghost">Expected Graduation 2027</p>
      </div>
    </section>
  );
}
