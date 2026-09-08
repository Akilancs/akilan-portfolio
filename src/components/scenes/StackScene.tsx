import { useState } from 'react';
import { useWorldState } from '../../state/useWorldState';
import { skills, skillCategories } from '../../data/skills';
import { skillIconMap } from '../../data/iconMap';

export function StackScene() {
  const { currentSection, sectionProgress } = useWorldState();
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const active = currentSection === 'stack';
  if (!active) return null;

  const p = sectionProgress;
  const fadeIn = Math.min(p / 0.15, 1);
  const fadeOut = p > 0.85 ? (p - 0.85) / 0.15 : 0;
  const opacity = fadeIn * (1 - fadeOut);

  return (
    <section
      id="stack"
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ opacity, zIndex: 15 }}
    >
      <div className="absolute top-12 left-12 font-mono tracking-[0.5em] text-phantom text-sm">
        STACK
      </div>

      <div className="relative w-full max-w-4xl px-6 pointer-events-auto">
        <ul className="flex flex-wrap justify-center gap-12 gap-y-16">
          {skillCategories.map(cat => (
            <li key={cat.id} className="flex flex-col items-center">
              <span className="font-mono text-xs text-ghost mb-6 tracking-widest uppercase">
                {cat.label}
              </span>
              <ul className="flex flex-wrap justify-center gap-3 max-w-md">
                {skills
                  .filter(s => s.category === cat.id)
                  .map(skill => {
                    const icon = skillIconMap[skill.id];
                    const isActive = activeSkill === skill.id;
                    return (
                      <li key={skill.id}>
                        <button
                          onMouseEnter={() => setActiveSkill(skill.id)}
                          onMouseLeave={() => setActiveSkill(null)}
                          className={`font-mono text-sm px-3 py-1.5 flex items-center gap-2 transition-all duration-300 border ${
                            isActive
                              ? 'border-bright text-bright bg-graphite'
                              : skill.prominence === 'core'
                                ? 'border-slate text-whisper hover:border-ghost'
                                : 'border-transparent text-phantom hover:text-ghost'
                          }`}
                        >
                          {icon && (
                            <img
                              src={icon}
                              alt=""
                              className={`w-4 h-4 transition-opacity duration-300 ${
                                isActive ? 'opacity-100' : 'opacity-50'
                              }`}
                              style={{ filter: isActive ? 'none' : 'grayscale(1) brightness(0.7)' }}
                            />
                          )}
                          {skill.name}
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
