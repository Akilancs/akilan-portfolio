import { useEffect, useRef, useCallback } from 'react';
import { useWorldState } from '../state/useWorldState';
import { useCursorState } from '../state/useCursorState';
import { getPerformanceConfig } from '../state/usePerformance';
import { ParticleSystem } from './ParticleSystem';
import { StarField } from './StarField';
import { GlitchSystem } from './GlitchSystem';
import { MotionTrails } from './MotionTrails';
import bgImage from '../assets/background/bg.jpg';

export const CanvasRenderer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Read world state into refs so the RAF loop never triggers re-renders
  const worldRef = useRef({
    currentSection: 'boot' as string,
    scrollVelocity: 0,
    performanceTier: 'high' as string,
    isReducedMotion: false,
    climaxActive: false,
  });

  const { currentSection, scrollVelocity, performanceTier, isReducedMotion, climaxActive } =
    useWorldState();
  const cursor = useCursorState();
  const cursorRef = useRef(cursor);

  // Sync into refs on every render (cheap, no side-effects)
  worldRef.current.currentSection = currentSection;
  worldRef.current.scrollVelocity = scrollVelocity;
  worldRef.current.performanceTier = performanceTier;
  worldRef.current.isReducedMotion = isReducedMotion;
  worldRef.current.climaxActive = climaxActive;
  cursorRef.current = cursor;

  // Load background image
  const bgRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const img = new Image();
    img.src = bgImage;
    img.onload = () => { bgRef.current = img; };
  }, []);

  const engineRef = useRef<{
    particles: ParticleSystem;
    stars: StarField;
    glitch: GlitchSystem;
    trails: MotionTrails;
    lastTime: number;
    initialized: boolean;
  } | null>(null);

  const getEngine = useCallback(() => {
    if (!engineRef.current) {
      engineRef.current = {
        particles: new ParticleSystem(),
        stars: new StarField(),
        glitch: new GlitchSystem(),
        trails: new MotionTrails(),
        lastTime: performance.now(),
        initialized: false,
      };
    }
    return engineRef.current;
  }, []);

  // Single stable useEffect — runs ONCE
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const engine = getEngine();

    const handleResize = () => {
      // Use 1x DPR for performance; the canvas is background ambiance, not text
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      const config = getPerformanceConfig(
        worldRef.current.performanceTier as 'high' | 'medium' | 'low',
      );
      engine.particles.init(config.particleCount, w, h);
      engine.stars.init(config.starCount, w, h);
      engine.initialized = true;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    let rafId: number;

    const render = (time: number) => {
      const dt = Math.min(time - engine.lastTime, 50);
      engine.lastTime = time;

      if (!engine.initialized) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const w = worldRef.current;
      const c = cursorRef.current;
      const config = getPerformanceConfig(w.performanceTier as 'high' | 'medium' | 'low');

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // --- Update ---
      engine.stars.update(dt, w.scrollVelocity);
      if (!w.isReducedMotion) {
        engine.particles.update(dt, w.scrollVelocity, c.x, c.y);
        if (config.enableTrails) {
          engine.trails.update(dt, centerX, centerY);
        }
      }
      if (config.enableGlitch) {
        engine.glitch.update(dt, w.climaxActive ? 1.0 : 0.05);
      }

      // --- Draw ---
      // 1. Solid black base
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // 2. Background image — subtle texture
      if (bgRef.current) {
        ctx.globalAlpha = 0.06;
        ctx.drawImage(bgRef.current, 0, 0, width, height);
        ctx.globalAlpha = 1;
      }

      // 3. Stars
      engine.stars.draw(ctx, w.scrollVelocity);

      // 4. Particles + trails
      if (!w.isReducedMotion) {
        if (config.enableTrails) engine.trails.draw(ctx);
        engine.particles.draw(ctx);
      }

      // 5. Subtle vignette
      const vignette = ctx.createRadialGradient(
        centerX, centerY, height * 0.3,
        centerX, centerY, height * 0.9,
      );
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.5)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // 6. Glitch (rare)
      if (config.enableGlitch) {
        engine.glitch.drawCanvas(ctx, width, height, w.climaxActive ? 1.0 : 0.05);
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [getEngine]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};
