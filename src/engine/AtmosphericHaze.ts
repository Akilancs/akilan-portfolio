export class AtmosphericHaze {
  private time: number = 0;

  public update(dt: number) {
    this.time += dt * 0.0005;
  }

  public draw(ctx: CanvasRenderingContext2D, width: number, height: number, section: string, cursorX: number, cursorY: number) {
    // Determine color based on section
    let colorStart, colorEnd;
    switch (section) {
      case 'boot':
      case 'home':
        colorStart = 'rgba(18, 18, 24, 0.8)';
        colorEnd = 'rgba(5, 5, 7, 0.95)';
        break;
      case 'artifacts':
        colorStart = 'rgba(37, 37, 48, 0.7)';
        colorEnd = 'rgba(10, 10, 15, 0.9)';
        break;
      case 'void':
        colorStart = 'rgba(0, 0, 0, 0.95)';
        colorEnd = 'rgba(0, 0, 0, 1)';
        break;
      default:
        colorStart = 'rgba(26, 26, 36, 0.75)';
        colorEnd = 'rgba(10, 10, 15, 0.9)';
        break;
    }

    // Base background layer
    ctx.fillStyle = colorEnd;
    ctx.fillRect(0, 0, width, height);

    // Dynamic gradient
    const xOffset = Math.sin(this.time) * 100;
    const yOffset = Math.cos(this.time * 0.8) * 100;

    const grad = ctx.createRadialGradient(
      width / 2 + xOffset, height / 2 + yOffset, 0,
      width / 2, height / 2, Math.max(width, height)
    );
    grad.addColorStop(0, colorStart);
    grad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Cursor clearing effect
    if (cursorX > 0 && cursorY > 0) {
      const cursorGrad = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, 300);
      cursorGrad.addColorStop(0, 'rgba(0, 0, 0, 0.2)');
      cursorGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = cursorGrad;
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, 300, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    }
  }
}
