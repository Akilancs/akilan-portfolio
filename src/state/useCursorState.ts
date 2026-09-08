import { useEffect, useRef } from 'react';

export interface CursorState {
  x: number;
  y: number;
  nx: number; // normalized -1 to 1
  ny: number;
  vx: number;
  vy: number;
  isTouch: boolean;
}

const INITIAL: CursorState = { x: 0, y: 0, nx: 0, ny: 0, vx: 0, vy: 0, isTouch: false };

/**
 * Tracks cursor position via a mutable ref.
 * Returns the ref object directly — components that need live cursor data
 * should read from the ref inside their animation loop, not via React state.
 * This eliminates per-frame React re-renders caused by mouse movement.
 */
export const useCursorState = (): CursorState => {
  const stateRef = useRef<CursorState>({ ...INITIAL });
  const lastRef = useRef({ x: 0, y: 0, time: performance.now() });

  useEffect(() => {
    let pending = false;

    const flush = (clientX: number, clientY: number, isTouch: boolean) => {
      const now = performance.now();
      const dt = Math.max(now - lastRef.current.time, 1);
      const vx = (clientX - lastRef.current.x) / dt;
      const vy = (clientY - lastRef.current.y) / dt;

      stateRef.current.x = clientX;
      stateRef.current.y = clientY;
      stateRef.current.nx = (clientX / window.innerWidth) * 2 - 1;
      stateRef.current.ny = (clientY / window.innerHeight) * 2 - 1;
      stateRef.current.vx = vx;
      stateRef.current.vy = vy;
      stateRef.current.isTouch = isTouch;

      lastRef.current = { x: clientX, y: clientY, time: now };
      pending = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => flush(e.clientX, e.clientY, false));
    };
    const onTouchMove = (e: TouchEvent) => {
      if (pending || e.touches.length === 0) return;
      pending = true;
      requestAnimationFrame(() => flush(e.touches[0].clientX, e.touches[0].clientY, true));
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  // Return the mutable ref's current object — the CanvasRenderer reads it via cursorRef
  return stateRef.current;
};
