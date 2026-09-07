export interface ProjectData {
  id: string;
  title: string;
  orbitalRadius?: number;
  orbitalOffset?: number;
}

export interface OrbitalNode {
  id: string;
  x: number;
  y: number;
  angle: number;
  scale: number;
  opacity: number;
  isSelected: boolean;
  isCollapsing: boolean;
}

export class OrbitalSystem {
  private projects: ProjectData[] = [];
  private baseRadius: number = 300;
  
  public init(projects: ProjectData[]) {
    this.projects = projects;
  }

  public update(dt: number, orbitalTime: number, selectedId: string | null, isClimax: boolean = false, width: number, height: number): OrbitalNode[] {
    const centerX = width / 2;
    const centerY = height / 2;
    
    return this.projects.map((proj, i) => {
      const isSelected = proj.id === selectedId;
      const angleOffset = proj.orbitalOffset || (i * (Math.PI * 2) / this.projects.length);
      const radiusOffset = proj.orbitalRadius || 1.0;
      
      let currentRadius = this.baseRadius * radiusOffset;
      let currentAngle = angleOffset + orbitalTime * 0.1 * (1 / radiusOffset);
      
      let scale = 1.0;
      let opacity = 1.0;
      
      if (selectedId) {
        if (isSelected) {
          scale = 1.2;
          // Pull forward, slow down orbit
          currentRadius *= 1.1;
        } else {
          scale = 0.8;
          opacity = 0.3;
          currentRadius *= 0.9;
        }
      }
      
      if (isClimax) {
        // Collapse to center
        currentRadius *= Math.exp(-dt * 0.001); // simplistic collapse logic for illustration
        opacity *= 0.99;
      }
      
      const x = centerX + Math.cos(currentAngle) * currentRadius;
      const y = centerY + Math.sin(currentAngle) * currentRadius * 0.4; // elliptical perspective
      
      return {
        id: proj.id,
        x,
        y,
        angle: currentAngle,
        scale,
        opacity,
        isSelected,
        isCollapsing: isClimax
      };
    });
  }
}
