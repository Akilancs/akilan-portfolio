// Helper seeded random
const seededRandom = (s: number) => {
  let seed = s;
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
};

export class StarField {
  private stars: Array<{
    x: number;
    y: number;
    size: number;
    brightness: number;
    depth: number;
    twinklePhase: number;
    twinkleSpeed: number;
  }> = [];
  private height: number = 0;
  private time: number = 0;

  public init(count: number, width: number, height: number) {
    
    this.height = height;
    const random = seededRandom(42);
    
    this.stars = Array.from({ length: count }, () => {
      const depth = random();
      return {
        x: random() * width,
        y: random() * height,
        size: (random() * 1.5 + 0.5) * (1 - depth),
        brightness: random() * 0.8 + 0.2,
        depth,
        twinklePhase: random() * Math.PI * 2,
        twinkleSpeed: random() * 0.05 + 0.01
      };
    });
  }



  public update(dt: number, scrollVelocity: number) {
    this.time += dt;
    for (let star of this.stars) {
      star.twinklePhase += star.twinkleSpeed;
      // Parallax scroll
      star.y -= scrollVelocity * 0.1 * (1 - star.depth) * (dt / 16);
      
      // Wrap around
      if (star.y < 0) star.y += this.height;
      if (star.y > this.height) star.y -= this.height;
    }
  }

  public draw(ctx: CanvasRenderingContext2D, scrollVelocity: number) {
    ctx.fillStyle = '#ffffff';
    const streakLength = Math.abs(scrollVelocity) * 0.05;

    for (const star of this.stars) {
      const alpha = star.brightness * (0.5 + 0.5 * Math.sin(star.twinklePhase));
      ctx.globalAlpha = alpha * (1 - star.depth * 0.5);
      
      if (streakLength > 1) {
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x, star.y + streakLength * (scrollVelocity > 0 ? -1 : 1) * (1 - star.depth));
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = star.size;
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1.0;
  }
}
