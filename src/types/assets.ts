/* ============================================
   AKILAN PORTFOLIO — Asset Type Definitions
   ============================================ */

export type AssetCategory = 
  | 'entity-cat'
  | 'entity-eye'
  | 'env-void'
  | 'env-mechanical'
  | 'env-cosmic'
  | 'env-corruption'
  | 'artifact'
  | 'ui';

export type LoadPriority = 'critical' | 'secondary' | 'lazy';

export interface AssetDefinition {
  id: string;
  src: string;
  category: AssetCategory;
  depth: number;         // 0 = closest, 10 = farthest
  opacity: number;       // 0-1
  scale: number;
  rotation?: number;     // degrees
  parallax?: number;     // multiplier, 0 = no parallax, 1 = max
  blur?: number;         // px
  sections?: string[];   // which sections this appears in
  interactive?: boolean;
  loadPriority: LoadPriority;
  dimensions?: { width: number; height: number };
  transparent?: boolean;
  description?: string;
}

export interface AssetManifestEntry {
  id: string;
  path: string;
  category: AssetCategory;
  loadPriority: LoadPriority;
  description: string;
  recommendedDimensions: string;
  format: string;
  transparent: boolean;
  usedIn: string[];
}
