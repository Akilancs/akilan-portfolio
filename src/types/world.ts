/* ============================================
   AKILAN PORTFOLIO — Core Type Definitions
   ============================================ */

export type Section = 
  | 'boot' 
  | 'home' 
  | 'about' 
  | 'artifacts' 
  | 'stack' 
  | 'education' 
  | 'contact' 
  | 'void';

export type ProjectStatus = 'IN_PROGRESS' | 'COMPLETED';

export type ProjectProminence = 'major' | 'standard';

export type PerformanceTier = 'high' | 'medium' | 'low';

export type SkillCategory = 
  | 'languages' 
  | 'ml-dl' 
  | 'cybersecurity-systems' 
  | 'tooling-infrastructure';

export interface WorldState {
  currentSection: Section;
  sectionProgress: number; // 0-1 within current section
  scrollPosition: number; // absolute px
  scrollVelocity: number;
  scrollDirection: 'up' | 'down' | 'idle';
  bootCompleted: boolean;
  bootSkipped: boolean;
  menuOpen: boolean;
  selectedArtifact: string | null;
  artifactHUDVisible: boolean;
  orbitalTime: number;
  secretsDiscovered: string[];
  performanceTier: PerformanceTier;
  isReducedMotion: boolean;
  isReturningVisitor: boolean;
  isMobile: boolean;
  climaxActive: boolean;
  transitionProgress: number; // 0-1 between sections
}

export interface ScrollState {
  position: number;
  velocity: number;
  direction: 'up' | 'down' | 'idle';
  acceleration: number;
  normalized: number; // 0-1 of total scroll height
  sectionIndex: number;
  sectionProgress: number; // 0-1 within section
}

export interface CursorState {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
  velocityX: number;
  velocityY: number;
  isActive: boolean;
  isTouch: boolean;
}

export interface SectionConfig {
  id: Section;
  label: string;
  scrollStart: number; // normalized 0-1
  scrollEnd: number;   // normalized 0-1
  height: number;      // vh units
}
