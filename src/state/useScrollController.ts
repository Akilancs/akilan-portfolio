import { useEffect, useRef } from 'react';
import { useWorldState } from './useWorldState';
import type { Section } from '../types/world';

const SECTIONS: { name: Section; start: number; end: number }[] = [
  { name: 'boot', start: 0, end: 0.12 },
  { name: 'home', start: 0.12, end: 0.22 },
  { name: 'about', start: 0.22, end: 0.35 },
  { name: 'artifacts', start: 0.35, end: 0.65 },
  { name: 'stack', start: 0.65, end: 0.78 },
  { name: 'education', start: 0.78, end: 0.87 },
  { name: 'contact', start: 0.87, end: 0.97 },
  { name: 'void', start: 0.97, end: 1.0 },
];

/**
 * Listens to scroll events (passive, throttled via rAF) and updates
 * the world-state context with current section + progress.
 * Uses refs internally to avoid re-creating the listener.
 */
export const useScrollController = () => {
  const { setSection, setScrollState } = useWorldState();

  // Store callbacks in refs so the scroll handler never goes stale
  const cbRef = useRef({ setSection, setScrollState });
  cbRef.current.setSection = setSection;
  cbRef.current.setScrollState = setScrollState;

  const scrollDataRef = useRef({
    lastPosition: 0,
    lastTime: performance.now(),
    velocity: 0,
  });

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const maxScroll = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1,
        );
        const scrollY = window.scrollY;
        const now = performance.now();
        const data = scrollDataRef.current;
        const dt = Math.max(now - data.lastTime, 1);

        const dy = scrollY - data.lastPosition;
        const velocity = data.velocity * 0.7 + (dy / dt) * 0.3;
        const acceleration = (velocity - data.velocity) / dt;
        const direction: 'up' | 'down' = dy >= 0 ? 'down' : 'up';
        const normalized = Math.max(0, Math.min(1, scrollY / maxScroll));

        data.lastPosition = scrollY;
        data.lastTime = now;
        data.velocity = velocity;

        // Determine current section
        let sectionName: Section = 'boot';
        let sectionProgress = 0;

        for (const section of SECTIONS) {
          if (normalized >= section.start && normalized <= section.end) {
            sectionName = section.name;
            const range = section.end - section.start;
            sectionProgress = range > 0 ? (normalized - section.start) / range : 0;
            break;
          }
        }

        cbRef.current.setScrollState(scrollY, velocity, direction, acceleration);
        cbRef.current.setSection(sectionName, sectionProgress);
        ticking = false;
      });
    };

    // Fire once immediately so initial state is set
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []); // empty deps — runs once, never re-attaches
};
