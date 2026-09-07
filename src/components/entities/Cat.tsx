import React, { useMemo } from 'react';
import { useWorldState } from '../../state/useWorldState';
import type { Section } from '../../types/world';

interface CatProps {
  id: string;
  position: { x: number; y: number };
  section: Section;
  cursorX: number;
  cursorY: number;
}

export default function Cat({ id, position, section, cursorX, cursorY }: CatProps) {
  const { discoverSecret, state } = useWorldState();
  const { currentSection } = state;

  const dx = cursorX - position.x;
  const dy = cursorY - position.y;
  const distance = useMemo(() => Math.sqrt(dx * dx + dy * dy), [dx, dy]);
  
  const isClose = distance < 200;
  const isVeryClose = distance < 100;

  React.useEffect(() => {
    if (isVeryClose && currentSection === section) {
      discoverSecret(`cat-${id}`);
    }
  }, [isVeryClose, id, section, currentSection, discoverSecret]);

  if (currentSection !== section && section !== 'home') return null;

  return (
    <div
      className={`absolute w-12 h-12 transition-all duration-1000 ease-in-out ${isClose ? 'opacity-60 translate-y-[-2px]' : 'opacity-30'}`}
      style={{ left: position.x, top: position.y }}
    >
      <div className="relative w-full h-full bg-transparent">
        <div className="absolute bottom-0 left-2 w-8 h-6 bg-charcoal rounded-t-full rounded-b-lg" />
        <div className="absolute bottom-4 left-3 w-5 h-5 bg-charcoal rounded-full" />
        <div className="absolute bottom-7 left-3 w-0 h-0 border-l-[3px] border-r-[3px] border-b-[6px] border-l-transparent border-r-transparent border-b-charcoal rotate-[-15deg]" />
        <div className="absolute bottom-7 left-6 w-0 h-0 border-l-[3px] border-r-[3px] border-b-[6px] border-l-transparent border-r-transparent border-b-charcoal rotate-[15deg]" />
        <div className={`absolute bottom-0 right-1 w-1.5 h-6 bg-charcoal rounded-full origin-bottom transition-transform duration-700 ${isClose ? 'rotate-12' : '-rotate-12'}`} />
        <div className={`absolute bottom-6 left-4 w-0.5 h-0.5 bg-accent-cold rounded-full transition-opacity duration-300 ${isClose ? 'opacity-80 shadow-[0_0_2px_#4466aa]' : 'opacity-0'}`} />
        <div className={`absolute bottom-6 left-6 w-0.5 h-0.5 bg-accent-cold rounded-full transition-opacity duration-300 ${isClose ? 'opacity-80 shadow-[0_0_2px_#4466aa]' : 'opacity-0'}`} />
      </div>
    </div>
  );
}
