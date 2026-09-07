import { useMemo, useState } from 'react';
import SkillNode from './SkillNode';
import type { SkillData } from '../../types/projects';
import { skills } from '../../data/skills';

interface Position {
  x: number;
  y: number;
}

function calculateSkillPositions(skillsList: SkillData[], width: number, height: number): Record<string, Position> {
  const positions: Record<string, Position> = {};
  const centers = {
    'languages': { x: width * 0.25, y: height * 0.4 },
    'ml-dl': { x: width * 0.75, y: height * 0.3 },
    'cybersecurity-systems': { x: width * 0.7, y: height * 0.7 },
    'tooling-infrastructure': { x: width * 0.3, y: height * 0.8 },
  };

  const categoryCounts: Record<string, number> = {};
  
  skillsList.forEach((skill: SkillData) => {
    const cat = skill.category;
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    const center = centers[cat as keyof typeof centers] || { x: width / 2, y: height / 2 };
    
    const angle = (categoryCounts[cat] * Math.PI * 2) / 8 + Math.random();
    const radius = 60 + Math.random() * 80;
    
    positions[skill.id] = {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
    };
  });

  return positions;
}

export default function SkillConstellation() {
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  
  const width = 1000;
  const height = 800;

  const positions = useMemo(() => calculateSkillPositions(skills, width, height), []);
  const selectedSkill = skills.find((s: SkillData) => s.id === selectedSkillId);

  const lines = useMemo(() => {
    const connections: {x1: number, y1: number, x2: number, y2: number, active: boolean}[] = [];
    
    skills.forEach((s1: SkillData, i: number) => {
      skills.forEach((s2: SkillData, j: number) => {
        if (i >= j) return;
        
        const sameCategory = s1.category === s2.category;
        const sharedProject = s1.relatedProjects?.some((p: string) => s2.relatedProjects?.includes(p));
        
        if (sameCategory || sharedProject) {
          const isActive = selectedSkillId === s1.id || selectedSkillId === s2.id;
          const p1 = positions[s1.id];
          const p2 = positions[s2.id];
          if (!p1 || !p2) return;
          
          const dist = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
          if (dist < 250) {
             connections.push({
               x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
               active: isActive
             });
          }
        }
      });
    });
    return connections;
  }, [positions, selectedSkillId]);

  return (
    <div className="relative w-full h-[600px] md:h-screen min-h-[500px] overflow-hidden flex items-center justify-center bg-void">
      <div className="relative w-full max-w-[1200px] aspect-[5/4] md:aspect-video scale-75 md:scale-100">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${width} ${height}`}>
          {lines.map((line, i) => (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={line.active ? "#4466aa" : "#35354a"}
              strokeWidth={line.active ? 1 : 0.5}
              strokeOpacity={line.active ? 0.6 : 0.15}
              className="transition-all duration-700"
            />
          ))}
        </svg>

        <div className="absolute left-[20%] top-[35%] font-mono text-xs text-ash tracking-[0.3em] opacity-40">LANGUAGES</div>
        <div className="absolute right-[20%] top-[25%] font-mono text-xs text-ash tracking-[0.3em] opacity-40">ML/DL</div>
        <div className="absolute right-[25%] bottom-[25%] font-mono text-xs text-ash tracking-[0.3em] opacity-40">SECURITY</div>
        <div className="absolute left-[25%] bottom-[15%] font-mono text-xs text-ash tracking-[0.3em] opacity-40">TOOLING</div>

        {skills.map((skill: SkillData) => {
          const pos = positions[skill.id];
          if (!pos) return null;
          
          const isSelected = selectedSkillId === skill.id;
          const isHighlighted = Boolean(selectedSkill && (
            selectedSkill.category === skill.category || 
            selectedSkill.relatedProjects?.some((p: string) => skill.relatedProjects?.includes(p))
          ));

          return (
            <SkillNode
              key={skill.id}
              skill={skill}
              position={pos}
              isSelected={isSelected}
              isHighlighted={isHighlighted}
              onSelect={(s: SkillData) => setSelectedSkillId(s.id === selectedSkillId ? null : s.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
