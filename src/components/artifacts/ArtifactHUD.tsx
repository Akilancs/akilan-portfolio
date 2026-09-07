import type { ProjectData } from '../../types/projects';

interface ArtifactHUDProps {
  project: ProjectData;
  onClose: () => void;
}

export function ArtifactHUD({ project, onClose }: ArtifactHUDProps) {
  return (
    <div className="flex flex-col gap-6 p-6 border border-graphite bg-charcoal/80 backdrop-blur-md animate-fade-in font-sans text-left">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-bright tracking-tight uppercase">{project.name}</h2>
        <button onClick={onClose} className="text-ghost hover:text-bright p-1" aria-label="Close details">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div className="font-mono text-xs tracking-widest flex items-center gap-2">
        <span className="text-phantom">STATUS:</span>
        <span className={project.status === 'IN_PROGRESS' ? 'text-accent-warm animate-pulse' : 'text-accent-cold'}>
          {project.status === 'IN_PROGRESS' ? 'ACTIVE' : 'STABLE'}
        </span>
      </div>

      <p className="text-whisper text-sm leading-relaxed">
        {project.description}
      </p>

      <div>
        <h3 className="font-mono text-xs text-phantom mb-2 tracking-widest">ARCHITECTURE</h3>
        <ul className="flex flex-col gap-1 font-mono text-sm text-ghost">
          {project.technicalConcepts?.map((concept, i) => (
            <li key={i} className={i < 2 ? 'text-whisper' : ''}>
              &gt; {concept}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {project.stack.map(tech => (
          <span key={tech} className="font-mono text-[10px] px-2 py-1 bg-graphite text-whisper border border-slate rounded-sm">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
