/* ============================================
   AKILAN PORTFOLIO — Project Type Definitions
   ============================================ */

import type { ProjectStatus, ProjectProminence } from './world';

export interface ProjectData {
  id: string;
  name: string;
  shortName: string;
  status: ProjectStatus;
  statusLabel: string;
  prominence: ProjectProminence;
  stack: string[];
  description: string;
  technicalConcepts: string[];
  /** Infrastructure visual theme for cybernetic structures */
  infrastructureTheme: string;
  sourceUrl?: string;
  demoUrl?: string;
  /** Orbital position offset in radians */
  orbitalOffset: number;
  /** Orbital radius multiplier */
  orbitalRadius: number;
}

export interface SkillData {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  relatedProjects: string[];
  prominence: 'core' | 'secondary';
}

export interface SecretData {
  id: string;
  /** Brief technical detail revealed */
  content: string;
  /** Which section this secret appears in */
  section: string;
  /** Discovery method description */
  discoveryHint: string;
  /** Position bias: normalized x,y in the section */
  position: { x: number; y: number };
  /** Associated entity type */
  entityType?: 'cat' | 'eye' | 'anomaly' | 'particle' | 'mechanical';
}

export interface IdentityData {
  name: string;
  tagline: string;
  degree: string;
  expectedGraduation: string;
  email: string;
  github: string;
  linkedin: string;
  institution?: string;
  resumeUrl?: string;
}
