export class ParticleSystem {
  private particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    depth: number;
    life: number;
    maxLife: number;
    color: string;
  }> = [];
  private width: number = 0;
  private height: number = 0;

  public init(count: number, width: number, height: number) {
    this.width = width;
    this.height = height;
    this.particles = Array.from({ length: count }, () => this.createParticle());
  }

  public resize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  private createParticle() {
    const colors = ['#252530', '#35354a', '#121218', '#4a4a65', '#4466aa'];
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.1,
      depth: Math.random(),
      life: 0,
      maxLife: Math.random() * 200 + 100,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  }

  public update(dt: number, scrollVelocity: number, cursorX: number, cursorY: number) {
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    
    for (let p of this.particles) {
      // Gravitational attraction toward singularity
      const dx = centerX - p.x;
      const dy = centerY - p.y;
      const pull = 0.0001 / p.depth;
      
      p.vx += dx * pull;
      p.vy += dy * pull;

      // Scroll affects vertical speed
      p.vy -= scrollVelocity * 0.001 * (1 - p.depth);

      // Cursor displacement
      const cdx = p.x - cursorX;
      const cdy = p.y - cursorY;
      const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
      if (cdist < 150) {
        const force = (150 - cdist) / 150;
        p.vx += (cdx / cdist) * force * 0.5;
        p.vy += (cdy / cdist) * force * 0.5;
      }

      // Friction
      p.vx *= 0.98;
      p.vy *= 0.98;

      p.x += p.vx * (dt / 16);
      p.y += p.vy * (dt / 16);

      p.life++;

      if (p.life >= p.maxLife || p.x < 0 || p.x > this.width || p.y < 0 || p.y > this.height) {
        Object.assign(p, this.createParticle());
      }
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    for (const p of this.particles) {
      const alpha = p.opacity * Math.sin((p.life / p.maxLife) * Math.PI);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (1 + p.depth), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;
  }
}
