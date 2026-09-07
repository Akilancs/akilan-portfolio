import { useMemo } from 'react';
import type { Section } from '../../types/world';

interface EyeProps {
  id: string;
  position: { x: number; y: number };
  section: Section;
  cursorX: number;
  cursorY: number;
  visibility: number;
}

export default function Eye({ position, cursorX, cursorY, visibility }: EyeProps) {
  const dx = cursorX - position.x;
  const dy = cursorY - position.y;
  
  const angle = useMemo(() => Math.atan2(dy, dx), [dx, dy]);
  
  const pupilDistance = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.05, 4);
  const pupilX = Math.cos(angle) * pupilDistance;
  const pupilY = Math.sin(angle) * pupilDistance;

  return (
    <div
      className="absolute flex items-center justify-center transition-opacity duration-1000"
      style={{
        left: position.x,
        top: position.y,
        opacity: Math.max(0, Math.min(visibility, 0.4)),
        width: 24,
        height: 12,
      }}
    >
      <div className="relative w-full h-full border border-ghost rounded-[50%] overflow-hidden flex items-center justify-center">
        <div
          className="absolute w-2.5 h-2.5 bg-slate rounded-full shadow-[inset_0_0_2px_#1a1a24] flex items-center justify-center transition-transform duration-75 ease-linear"
          style={{ transform: `translate(${pupilX}px, ${pupilY}px)` }}
        >
          <div className="w-1 h-1 bg-phantom rounded-full" />
        </div>
      </div>
    </div>
  );
}
