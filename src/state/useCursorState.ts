import { useEffect, useState, useRef } from 'react';

export interface CursorState {
  x: number;
  y: number;
  nx: number; // normalized -1 to 1
  ny: number;
  vx: number;
  vy: number;
  isTouch: boolean;
}

export const useCursorState = (): CursorState => {
  const [state, setState] = useState<CursorState>({ x: 0, y: 0, nx: 0, ny: 0, vx: 0, vy: 0, isTouch: false });
  const lastState = useRef({ x: 0, y: 0, time: performance.now() });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleMove = (clientX: number, clientY: number, isTouch: boolean) => {
      if (rafId.current !== null) return;
      
      rafId.current = requestAnimationFrame(() => {
        const now = performance.now();
        const dt = Math.max(now - lastState.current.time, 1);
        const vx = (clientX - lastState.current.x) / dt;
        const vy = (clientY - lastState.current.y) / dt;

        setState({
          x: clientX,
          y: clientY,
          nx: (clientX / window.innerWidth) * 2 - 1,
          ny: (clientY / window.innerHeight) * 2 - 1,
          vx,
          vy,
          isTouch
        });

        lastState.current = { x: clientX, y: clientY, time: now };
        rafId.current = null;
      });
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY, false);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY, true);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return state;
};
