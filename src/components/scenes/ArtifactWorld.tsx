import { useMemo } from 'react';
import { useWorldState } from '../../state/useWorldState';
import { projects } from '../../data/projects';
import { Artifact } from '../artifacts/Artifact';
import { Singularity } from '../artifacts/Singularity';
import { ArtifactHUD } from '../artifacts/ArtifactHUD';
import { OrbitalRing } from '../artifacts/OrbitalRing';

export function ArtifactWorld() {
  const { currentSection, sectionProgress, selectedArtifact: activeArtifactId, selectArtifact, deselectArtifact } = useWorldState();

  const active = currentSection === 'artifacts';
  if (!active) return null;

  const p = sectionProgress;
  const fadeIn = Math.min(p / 0.1, 1);
  const fadeOut = p > 0.9 ? (p - 0.9) / 0.1 : 0;
  const opacity = fadeIn * (1 - fadeOut);

  const orbitalTime = p * Math.PI * 4;
  const isClimax = p > 0.9;

  const activeProject = useMemo(
    () => projects.find(proj => proj.id === activeArtifactId),
    [activeArtifactId],
  );

  return (
    <section
      id="artifacts"
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ opacity, zIndex: 20 }}
      onClick={() => activeArtifactId && deselectArtifact()}
    >
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 font-mono tracking-[0.5em] text-phantom text-sm pointer-events-none"
        style={{ opacity: p > 0.05 && p < 0.9 ? 1 : 0 }}
      >
        ARTIFACTS
      </div>

      <div className="relative w-[600px] h-[600px] flex items-center justify-center">
        <OrbitalRing time={orbitalTime} />
        <Singularity isClimax={isClimax} />

        {projects.map((project, i) => {
          const angle = (i / projects.length) * Math.PI * 2 + orbitalTime;
          const radius = isClimax ? 50 : 250 + Math.sin(orbitalTime + i) * 30;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <Artifact
              key={project.id}
              project={project}
              position={{ x, y }}
              isSelected={activeArtifactId === project.id}
              onSelect={() => selectArtifact(project.id)}
              scrollProgress={p}
              orbitalTime={orbitalTime}
            />
          );
        })}
      </div>

      {activeProject && (
        <div className="pointer-events-auto absolute right-12 top-1/2 -translate-y-1/2 max-w-sm w-full z-50">
          <ArtifactHUD project={activeProject} onClose={deselectArtifact} />
        </div>
      )}
    </section>
  );
}
