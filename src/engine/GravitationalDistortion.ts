export class GravitationalDistortion {
  private time: number = 0;

  public update(dt: number, intensity: number) {
    this.time += dt * 0.001 * Math.max(0.1, intensity);
  }

  public draw(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, width: number, height: number, intensity: number) {
    if (intensity <= 0.01) return;

    const radius = Math.min(width, height) * 0.4 * intensity;
    
    // Draw pure black at center radiating out
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
    gradient.addColorStop(0.2, 'rgba(5, 5, 7, 0.7)');
    gradient.addColorStop(0.5, 'rgba(10, 10, 15, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    // Spiraling inward lines
    ctx.strokeStyle = 'rgba(68, 102, 170, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      let r = radius;
      let angle = this.time + (Math.PI * 2 * i) / 5;
      ctx.moveTo(centerX + Math.cos(angle) * r, centerY + Math.sin(angle) * r);
      
      for (let j = 0; j < 50; j++) {
        r *= 0.9;
        angle -= 0.1;
        ctx.lineTo(centerX + Math.cos(angle) * r, centerY + Math.sin(angle) * r);
      }
    }
    ctx.stroke();
  }
}
