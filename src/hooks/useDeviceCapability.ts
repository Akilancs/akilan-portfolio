import { useState, useEffect, useCallback, useRef } from 'react';
import type { PerformanceTier } from '../types/world';

export function useDeviceCapability(): {
  tier: PerformanceTier;
  isMobile: boolean;
  isTouch: boolean;
  pixelRatio: number;
} {
  const fpsHistory = useRef<number[]>([]);
  const lastFrame = useRef<number>(0);
  const [tier, setTier] = useState<PerformanceTier>('high');
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const detectDevice = useCallback(() => {
    const mobile = window.innerWidth < 768;
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsMobile(mobile);
    setIsTouch(touch);

    // Initial tier estimate
    if (mobile) {
      setTier('low');
    } else if (window.devicePixelRatio > 2 || navigator.hardwareConcurrency <= 2) {
      setTier('medium');
    }
  }, []);

  useEffect(() => {
    detectDevice();
    window.addEventListener('resize', detectDevice);

    // FPS monitoring for adaptive quality
    let rafId: number;
    const measureFPS = (timestamp: number) => {
      if (lastFrame.current > 0) {
        const delta = timestamp - lastFrame.current;
        const fps = 1000 / delta;
        fpsHistory.current.push(fps);

        if (fpsHistory.current.length > 60) {
          fpsHistory.current.shift();
          const avgFps = fpsHistory.current.reduce((a, b) => a + b, 0) / fpsHistory.current.length;

          if (avgFps < 24) {
            setTier('low');
          } else if (avgFps < 45) {
            setTier('medium');
          }
          // Don't upgrade tier after downgrade (hysteresis)
        }
      }
      lastFrame.current = timestamp;
      rafId = requestAnimationFrame(measureFPS);
    };

    rafId = requestAnimationFrame(measureFPS);

    return () => {
      window.removeEventListener('resize', detectDevice);
      cancelAnimationFrame(rafId);
    };
  }, [detectDevice]);

  return { tier, isMobile, isTouch, pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1 };
}
