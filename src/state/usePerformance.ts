import type { PerformanceTier } from '../types/world';

export interface PerformanceConfig {
  particleCount: number;
  starCount: number;
  blurLevels: number;
  distortionComplexity: number;
  layerCount: number;
  enableGlitch: boolean;
  enableTrails: boolean;
}

export const getPerformanceConfig = (tier: PerformanceTier): PerformanceConfig => {
  switch (tier) {
    case 'high':
      return {
        particleCount: 120,
        starCount: 200,
        blurLevels: 2,
        distortionComplexity: 2,
        layerCount: 3,
        enableGlitch: true,
        enableTrails: true
      };
    case 'medium':
      return {
        particleCount: 60,
        starCount: 100,
        blurLevels: 1,
        distortionComplexity: 1,
        layerCount: 2,
        enableGlitch: false,
        enableTrails: false
      };
    case 'low':
      return {
        particleCount: 25,
        starCount: 50,
        blurLevels: 0,
        distortionComplexity: 0,
        layerCount: 1,
        enableGlitch: false,
        enableTrails: false
      };
    default:
      return getPerformanceConfig('high');
  }
};

export const usePerformance = (tier: PerformanceTier) => {
  return getPerformanceConfig(tier);
};
