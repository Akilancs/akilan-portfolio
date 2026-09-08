import { useEffect, useRef, useCallback } from 'react';
import { useWorldState } from '../state/useWorldState';
import { useCursorState } from '../state/useCursorState';
import { getPerformanceConfig } from '../state/usePerformance';
import { ParticleSystem } from './ParticleSystem';
import { StarField } from './StarField';
import { GravitationalDistortion } from './GravitationalDistortion';
import { AtmosphericHaze } from './AtmosphericHaze';
import { GlitchSystem } from './GlitchSystem';
import { MotionTrails } from './MotionTrails';
import bgImage from '../assets/background/bg.jpg';

export const CanvasRenderer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Read world state into refs so the RAF loop never causes a re-render
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

  // Sync state into refs (no re-render triggered)
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

  // Stable init — only runs once
  const engineRef = useRef<{
    particles: ParticleSystem;
    stars: StarField;
    distortion: GravitationalDistortion;
    haze: AtmosphericHaze;
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
        distortion: new GravitationalDistortion(),
        haze: new AtmosphericHaze(),
        glitch: new GlitchSystem(),
        trails: new MotionTrails(),
        lastTime: performance.now(),
        initialized: false,
      };
    }
    return engineRef.current;
  }, []);

  // Single stable useEffect — NO dynamic deps, runs once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const engine = getEngine();

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5); // cap DPR for perf
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);

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
    let frameSkip = 0;

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

      // Skip every other frame on low tier
      if (w.performanceTier === 'low') {
        frameSkip++;
        if (frameSkip % 2 !== 0) {
          rafId = requestAnimationFrame(render);
          return;
        }
      }

      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      // Update
      if (!w.isReducedMotion) {
        engine.particles.update(dt, w.scrollVelocity, c.x, c.y);
        engine.distortion.update(
          dt,
          Math.abs(w.scrollVelocity) * 0.01 + (w.climaxActive ? 1 : 0),
        );
        engine.haze.update(dt);
        if (config.enableTrails) {
          engine.trails.update(dt, centerX, centerY);
        }
      }
      engine.stars.update(dt, w.scrollVelocity);

      if (config.enableGlitch) {
        engine.glitch.update(dt, w.climaxActive ? 1.0 : 0.1);
      }

      // Draw
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform for clear
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      // Draw background image if loaded
      if (bgRef.current) {
        ctx.globalAlpha = 0.08; // very subtle
        ctx.drawImage(bgRef.current, 0, 0, width, height);
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fillRect(0, 0, width, height);

      engine.haze.draw(ctx, width, height, w.currentSection, c.x, c.y);
      engine.stars.draw(ctx, w.scrollVelocity);

      if (!w.isReducedMotion) {
        if (config.enableTrails) engine.trails.draw(ctx);
        engine.particles.draw(ctx);
        engine.distortion.draw(
          ctx,
          centerX,
          centerY,
          width,
          height,
          w.climaxActive ? 1.0 : Math.min(Math.abs(w.scrollVelocity) * 0.001, 0.5),
        );
      }

      if (config.enableGlitch) {
        engine.glitch.drawCanvas(ctx, width, height, w.climaxActive ? 1.0 : 0.1);
      }

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [getEngine]); // stable dep — never changes

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
