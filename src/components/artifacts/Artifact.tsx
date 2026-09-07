import type { ProjectData } from '../../types/projects';

interface ArtifactProps {
  project: ProjectData;
  position: { x: number, y: number };
  isSelected: boolean;
  onSelect: () => void;
  scrollProgress: number;
  orbitalTime: number;
}

export function Artifact({ project, position, isSelected, onSelect, scrollProgress, }: ArtifactProps) {
  const isVisible = scrollProgress > 0.05 && scrollProgress < 0.95;
  const baseOpacity = isVisible ? Math.min((scrollProgress - 0.05) * 5, 1) : 0;
  
  const themeColors: Record<string, string> = {
    'ai': 'rgba(102, 136, 204, 0.4)',
    'systems': 'rgba(68, 102, 170, 0.4)',
    'data': 'rgba(170, 102, 68, 0.4)',
    'web': 'rgba(170, 170, 204, 0.4)'
  };
  
  const color = themeColors[project.infrastructureTheme] || 'rgba(170,170,204,0.4)';
  
  const x = isSelected ? 0 : position.x;
  const y = isSelected ? 0 : position.y;
  const scale = isSelected ? 1.5 : (isVisible ? 1 : 0);
  const zIndex = isSelected ? 50 : 10;
  const opacity = isSelected ? 1 : baseOpacity;

  return (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={`absolute flex flex-col items-center justify-center gap-2 transition-all duration-700 ease-out group ${isSelected ? 'pointer-events-none' : 'cursor-pointer hover:scale-110'}`}
      style={{
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        zIndex,
        opacity,
        filter: isSelected ? 'none' : `blur(${Math.max(0, (1 - opacity) * 5)}px)`
      }}
      aria-label={`View project: ${project.name}`}
    >
      <div 
        className={`w-16 h-16 rounded-sm border flex items-center justify-center transition-all ${project.status === 'IN_PROGRESS' ? 'animate-pulse' : ''}`}
        style={{
          borderColor: color,
          background: `linear-gradient(45deg, transparent, ${color})`,
          boxShadow: isSelected ? `0 0 30px ${color}` : 'none'
        }}
      >
        <div className="w-8 h-8 rounded-sm mix-blend-overlay" style={{ background: color }}></div>
      </div>
      <span className="font-mono text-xs text-ghost tracking-widest group-hover:text-bright transition-colors">
        {project.shortName}
      </span>
      {project.status === 'IN_PROGRESS' && (
        <span className="w-1.5 h-1.5 rounded-full bg-accent-warm animate-ping"></span>
      )}
    </button>
  );
}
