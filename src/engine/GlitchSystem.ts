export class GlitchSystem {
  private time: number = 0;
  private nextGlitchTime: number = 0;
  private isGlitching: boolean = false;
  private glitchDuration: number = 0;

  public update(dt: number, intensityLevel: number) {
    this.time += dt;

    if (this.time > this.nextGlitchTime) {
      this.isGlitching = true;
      this.glitchDuration = Math.random() * 200 + 50 * intensityLevel;
      
      // Organic trigger intervals
      let intervalBase = 5000;
      if (intensityLevel > 0.8) intervalBase = 500;
      else if (intensityLevel > 0.4) intervalBase = 2000;
      
      this.nextGlitchTime = this.time + intervalBase + Math.random() * intervalBase;
    }

    if (this.isGlitching) {
      this.glitchDuration -= dt;
      if (this.glitchDuration <= 0) {
        this.isGlitching = false;
      }
    }
  }

  public drawCanvas(ctx: CanvasRenderingContext2D, width: number, height: number, intensityLevel: number) {
    if (!this.isGlitching || intensityLevel <= 0) return;

    const strength = intensityLevel * (Math.random() * 0.5 + 0.5);
    
    // Scanlines
    ctx.fillStyle = `rgba(255, 255, 255, ${strength * 0.05})`;
    for (let i = 0; i < height; i += 4) {
      if (Math.random() > 0.5) {
        ctx.fillRect(0, i, width, 1);
      }
    }

    // Color channel offset (simulated via composite and translation)
    if (Math.random() > 0.8) {
      const sliceY = Math.random() * height;
      const sliceH = Math.random() * 50 + 10;
      const offset = (Math.random() - 0.5) * 50 * strength;
      
      try {
        const slice = ctx.getImageData(0, sliceY, width, sliceH);
        ctx.putImageData(slice, offset, sliceY);
      } catch (e) {
        // Handle cross-origin issues or zero size if canvas is tainted/empty
      }
    }
  }

  public getCSSGlitch(intensityLevel: number) {
    if (!this.isGlitching || intensityLevel <= 0) return {};
    
    const x = (Math.random() - 0.5) * 10 * intensityLevel;
    const y = (Math.random() - 0.5) * 10 * intensityLevel;
    const skew = (Math.random() - 0.5) * 5 * intensityLevel;
    
    return {
      transform: `translate(${x}px, ${y}px) skew(${skew}deg)`,
      filter: `hue-rotate(${Math.random() * 90}deg) contrast(1.2)`,
      opacity: Math.random() > 0.9 ? 0.8 : 1
    };
  }
}
