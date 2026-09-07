import type { SkillData } from '../../types/projects';

interface SkillNodeProps {
  skill: SkillData;
  isHighlighted: boolean;
  isSelected: boolean;
  position: { x: number; y: number };
  onSelect: (skill: SkillData) => void;
}

export default function SkillNode({ skill, isHighlighted, isSelected, position, onSelect }: SkillNodeProps) {
  const isCore = skill.category === 'LANGUAGE' || skill.category === 'ML_DL';
  
  const baseClasses = "absolute flex items-center justify-center rounded-full transition-all duration-500 cursor-pointer focus:outline-none";
  
  let sizeClasses = isCore ? "w-4 h-4" : "w-2.5 h-2.5";
  let bgClasses = isSelected ? "bg-accent-cold shadow-[0_0_15px_#4466aa]" : 
                 isHighlighted ? "bg-bright shadow-[0_0_8px_#eeeeff]" : 
                 "bg-ghost hover:bg-phantom";
                 
  let textClasses = isCore ? "text-sm" : "text-xs";
  let textColorClasses = isSelected ? "text-accent-cold font-bold" :
                         isHighlighted ? "text-bright" :
                         isCore ? "text-whisper" : "text-ghost";

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${bgClasses}`}
      style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)' }}
      onClick={() => onSelect(skill)}
      aria-label={`Skill: ${skill.name}`}
    >
      <span 
        className={`absolute top-full mt-2 font-mono whitespace-nowrap transition-all duration-300 ${textClasses} ${textColorClasses}`}
      >
        {skill.name}
      </span>
      {isSelected && skill.relatedProjects && (
        <div className="absolute top-full mt-7 flex flex-col items-center gap-1 min-w-max pointer-events-none">
          {skill.relatedProjects.map(proj => (
            <span key={proj} className="text-[10px] font-mono text-accent-signal opacity-80 uppercase tracking-widest">
              {proj}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
