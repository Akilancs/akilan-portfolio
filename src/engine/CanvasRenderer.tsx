import React, { useEffect, useRef } from 'react';
import { useWorldState } from '../state/useWorldState';
import { useCursorState } from '../state/useCursorState';
import { usePerformance } from '../state/usePerformance';
import { ParticleSystem } from './ParticleSystem';
import { StarField } from './StarField';
import { GravitationalDistortion } from './GravitationalDistortion';
import { AtmosphericHaze } from './AtmosphericHaze';
import { GlitchSystem } from './GlitchSystem';
import { MotionTrails } from './MotionTrails';

export const CanvasRenderer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentSection, scrollVelocity, performanceTier, isReducedMotion, climaxActive } = useWorldState();
  const cursor = useCursorState();
  const perfConfig = usePerformance(performanceTier);
  
  const engineRef = useRef({
    particles: new ParticleSystem(),
    stars: new StarField(),
    distortion: new GravitationalDistortion(),
    haze: new AtmosphericHaze(),
    glitch: new GlitchSystem(),
    trails: new MotionTrails(),
    lastTime: performance.now()
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const engine = engineRef.current;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      engine.particles.init(perfConfig.particleCount, canvas.width, canvas.height);
      engine.stars.init(perfConfig.starCount, canvas.width, canvas.height);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    let rafId: number;

    const render = (time: number) => {
      const dt = Math.min(time - engine.lastTime, 50);
      engine.lastTime = time;

      const { width, height } = canvas;
      const centerX = width / 2;
      const centerY = height / 2;

      // Update
      if (!isReducedMotion) {
        engine.particles.update(dt, scrollVelocity, cursor.x, cursor.y);
        engine.distortion.update(dt, Math.abs(scrollVelocity) * 0.01 + (climaxActive ? 1 : 0));
        engine.haze.update(dt);
        if (perfConfig.enableTrails) {
          engine.trails.update(dt, centerX, centerY);
        }
      }
      engine.stars.update(dt, scrollVelocity);
      
      if (perfConfig.enableGlitch) {
        engine.glitch.update(dt, climaxActive ? 1.0 : 0.1);
      }

      // Draw
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      engine.haze.draw(ctx, width, height, currentSection, cursor.x, cursor.y);
      engine.stars.draw(ctx, scrollVelocity);
      
      if (!isReducedMotion) {
        if (perfConfig.enableTrails) engine.trails.draw(ctx);
        engine.particles.draw(ctx);
        engine.distortion.draw(ctx, centerX, centerY, width, height, climaxActive ? 1.0 : Math.min(Math.abs(scrollVelocity) * 0.001, 0.5));
      }

      if (perfConfig.enableGlitch) {
        engine.glitch.drawCanvas(ctx, width, height, climaxActive ? 1.0 : 0.1);
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [perfConfig, isReducedMotion, climaxActive, currentSection, scrollVelocity, cursor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -1
      }}
    />
  );
};
