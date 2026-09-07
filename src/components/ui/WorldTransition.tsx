import { useWorldState } from '../../state/useWorldState';

export function WorldTransition() {
  const { currentSection } = useWorldState();

  // Show a darker overlay during transitions between major sections
  const transitioning = currentSection === 'void';
  const opacity = transitioning ? 0.6 : 0;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[2] transition-opacity duration-1000"
      style={{
        opacity,
        background: 'linear-gradient(to bottom, #000 0%, #050507 50%, #0a0a0f 100%)',
      }}
      aria-hidden="true"
    />
  );
}
