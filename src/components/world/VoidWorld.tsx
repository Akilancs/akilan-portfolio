import { useScrollController } from '../../state/useScrollController';
import { BootSequence } from '../scenes/BootSequence';
import { HomeScene } from '../scenes/HomeScene';
import { AboutScene } from '../scenes/AboutScene';
import { ArtifactWorld } from '../scenes/ArtifactWorld';
import { StackScene } from '../scenes/StackScene';
import { EducationScene } from '../scenes/EducationScene';
import { ContactScene } from '../scenes/ContactScene';
import { SkipControl } from '../ui/SkipControl';

export function VoidWorld() {
  // This hook drives EVERYTHING: updates scrollPosition, velocity,
  // direction, acceleration, currentSection, and sectionProgress in the context
  useScrollController();

  return (
    <div className="relative w-full bg-void text-whisper font-sans selection:bg-ghost selection:text-void"
         style={{ height: '2100vh' }}>
      {/* Noise / grain overlays */}
      <div className="noise-overlay fixed inset-0 pointer-events-none z-[60]" />
      <div className="grain-overlay fixed inset-0 pointer-events-none z-[59]" />

      {/* All scenes render as fixed overlays; their visibility is driven by
          currentSection + sectionProgress from the context */}
      <BootSequence />
      <HomeScene />
      <AboutScene />
      <ArtifactWorld />
      <StackScene />
      <EducationScene />
      <ContactScene />
      <SkipControl />
    </div>
  );
}
