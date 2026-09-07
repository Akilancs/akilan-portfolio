import { useEffect, useRef, useCallback } from 'react';
import { useWorldState } from './useWorldState';
import type { Section } from '../types/world';

export interface ScrollState {
  position: number;
  velocity: number;
  direction: 'up' | 'down';
  acceleration: number;
  normalized: number;
  sectionIndex: number;
  sectionProgress: number;
}

const SECTIONS: { name: Section; start: number; end: number }[] = [
  { name: 'boot', start: 0, end: 0.12 },
  { name: 'home', start: 0.12, end: 0.22 },
  { name: 'about', start: 0.22, end: 0.35 },
  { name: 'artifacts', start: 0.35, end: 0.65 },
  { name: 'stack', start: 0.65, end: 0.78 },
  { name: 'education', start: 0.78, end: 0.87 },
  { name: 'contact', start: 0.87, end: 0.97 },
  { name: 'void', start: 0.97, end: 1.0 }
];

export const useScrollController = () => {
  const { setSection, setScrollState } = useWorldState();
  const scrollRef = useRef({
    position: 0,
    velocity: 0,
    lastTime: performance.now(),
    lastPosition: 0,
    acceleration: 0
  });

  const updateScroll = useCallback(() => {
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const scrollY = window.scrollY;
    const now = performance.now();
    const dt = Math.max(now - scrollRef.current.lastTime, 1);
    
    const dy = scrollY - scrollRef.current.lastPosition;
    let velocity = dy / dt;
    // Smooth velocity
    velocity = scrollRef.current.velocity * 0.8 + velocity * 0.2;
    
    const acceleration = (velocity - scrollRef.current.velocity) / dt;
    const direction = velocity > 0 ? 'down' : 'up';
    const normalized = Math.max(0, Math.min(1, scrollY / maxScroll));

    let currentSectionProgress = 0;
    let currentSectionName: Section = 'boot';

    for (let i = 0; i < SECTIONS.length; i++) {
      const section = SECTIONS[i];
      if (normalized >= section.start && normalized <= section.end) {
        currentSectionName = section.name;
        const sectionRange = section.end - section.start;
        currentSectionProgress = sectionRange > 0 ? (normalized - section.start) / sectionRange : 0;
        break;
      }
    }

    setScrollState(scrollY, velocity, direction, acceleration);
    setSection(currentSectionName, currentSectionProgress);

    scrollRef.current = {
      position: scrollY,
      velocity,
      lastTime: now,
      lastPosition: scrollY,
      acceleration
    };

  }, [setScrollState, setSection]);

  useEffect(() => {
    let rafId: number;
    const loop = () => {
      updateScroll();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafId);
  }, [updateScroll]);

  return null;
};
