export class MotionTrails {
  private trails: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    color: string;
  }> = [];

  public addTrail(x: number, y: number, vx: number, vy: number, color: string = 'rgba(68, 102, 170, 0.5)') {
    this.trails.push({
      x, y, vx, vy, life: 0, maxLife: 50, color
    });
  }

  public update(dt: number, centerX: number, centerY: number) {
    for (let i = this.trails.length - 1; i >= 0; i--) {
      const t = this.trails[i];
      t.life += dt * 0.05;
      
      // Gravitational curve
      const dx = centerX - t.x;
      const dy = centerY - t.y;
      const pull = 0.0005;
      t.vx += dx * pull;
      t.vy += dy * pull;
      
      t.x += t.vx;
      t.y += t.vy;
      
      if (t.life >= t.maxLife) {
        this.trails.splice(i, 1);
      }
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    for (const t of this.trails) {
      const alpha = 1 - (t.life / t.maxLife);
      ctx.fillStyle = t.color;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;
  }
}
