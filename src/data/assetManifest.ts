import type { AssetDefinition, AssetManifestEntry } from '../types/assets';

/* ============================================
   CENTRALIZED ASSET MANIFEST
   Replace any asset file without code changes.
   ============================================ */

// Runtime asset definitions for the 2.5D compositing system
export const assetDefinitions: AssetDefinition[] = [
  // --- Cats ---
  { id: 'cat-01', src: '/assets/entities/cats/cat-01.webp', category: 'entity-cat', depth: 3, opacity: 0.6, scale: 0.4, parallax: 0.3, sections: ['about', 'artifacts'], interactive: true, loadPriority: 'secondary' },
  { id: 'cat-02', src: '/assets/entities/cats/cat-02.webp', category: 'entity-cat', depth: 5, opacity: 0.4, scale: 0.35, parallax: 0.5, sections: ['stack'], interactive: true, loadPriority: 'lazy' },
  { id: 'cat-03', src: '/assets/entities/cats/cat-03.webp', category: 'entity-cat', depth: 7, opacity: 0.3, scale: 0.3, parallax: 0.7, sections: ['artifacts'], interactive: true, loadPriority: 'lazy' },
  { id: 'cat-04', src: '/assets/entities/cats/cat-04.webp', category: 'entity-cat', depth: 2, opacity: 0.5, scale: 0.45, parallax: 0.2, sections: ['contact'], interactive: true, loadPriority: 'lazy' },

  // --- Eyes ---
  { id: 'eye-01', src: '/assets/entities/eyes/eye-01.webp', category: 'entity-eye', depth: 6, opacity: 0.15, scale: 0.2, parallax: 0.6, sections: ['about', 'artifacts'], interactive: true, loadPriority: 'secondary' },
  { id: 'eye-02', src: '/assets/entities/eyes/eye-02.webp', category: 'entity-eye', depth: 8, opacity: 0.1, scale: 0.15, parallax: 0.8, sections: ['artifacts', 'stack'], interactive: true, loadPriority: 'lazy' },
  { id: 'eye-03', src: '/assets/entities/eyes/eye-03.webp', category: 'entity-eye', depth: 4, opacity: 0.2, scale: 0.25, parallax: 0.4, sections: ['artifacts'], interactive: true, loadPriority: 'lazy' },
  { id: 'eye-04', src: '/assets/entities/eyes/eye-04.webp', category: 'entity-eye', depth: 9, opacity: 0.08, scale: 0.1, parallax: 0.9, sections: ['contact'], interactive: true, loadPriority: 'lazy' },

  // --- Void Fragments ---
  { id: 'void-01', src: '/assets/environment/void/void-fragment-01.webp', category: 'env-void', depth: 10, opacity: 0.3, scale: 1.5, parallax: 0.9, sections: ['boot', 'home'], loadPriority: 'critical' },
  { id: 'void-02', src: '/assets/environment/void/void-fragment-02.webp', category: 'env-void', depth: 9, opacity: 0.25, scale: 1.2, parallax: 0.85, sections: ['home', 'about'], loadPriority: 'critical' },
  { id: 'void-03', src: '/assets/environment/void/void-fragment-03.webp', category: 'env-void', depth: 8, opacity: 0.2, scale: 1.0, parallax: 0.7, sections: ['contact', 'void'], loadPriority: 'secondary' },

  // --- Mechanical ---
  { id: 'mech-01', src: '/assets/environment/mechanical/mechanical-01.webp', category: 'env-mechanical', depth: 4, opacity: 0.35, scale: 0.8, parallax: 0.4, blur: 1, sections: ['artifacts'], loadPriority: 'secondary' },
  { id: 'mech-02', src: '/assets/environment/mechanical/mechanical-02.webp', category: 'env-mechanical', depth: 5, opacity: 0.3, scale: 0.7, parallax: 0.5, sections: ['artifacts', 'stack'], loadPriority: 'secondary' },
  { id: 'mech-03', src: '/assets/environment/mechanical/mechanical-03.webp', category: 'env-mechanical', depth: 6, opacity: 0.25, scale: 0.6, parallax: 0.6, sections: ['stack'], loadPriority: 'lazy' },
  { id: 'mech-04', src: '/assets/environment/mechanical/mechanical-04.webp', category: 'env-mechanical', depth: 3, opacity: 0.4, scale: 0.9, parallax: 0.3, sections: ['artifacts'], loadPriority: 'lazy' },

  // --- Cosmic ---
  { id: 'cosmic-01', src: '/assets/environment/cosmic/cosmic-layer-01.webp', category: 'env-cosmic', depth: 10, opacity: 0.15, scale: 2.0, parallax: 0.95, sections: ['boot', 'home', 'about'], loadPriority: 'critical' },
  { id: 'cosmic-02', src: '/assets/environment/cosmic/cosmic-layer-02.webp', category: 'env-cosmic', depth: 9, opacity: 0.12, scale: 1.8, parallax: 0.9, sections: ['artifacts', 'stack'], loadPriority: 'secondary' },
  { id: 'cosmic-03', src: '/assets/environment/cosmic/cosmic-layer-03.webp', category: 'env-cosmic', depth: 8, opacity: 0.1, scale: 1.5, parallax: 0.8, sections: ['education', 'contact'], loadPriority: 'lazy' },

  // --- Corruption ---
  { id: 'glitch-01', src: '/assets/environment/corruption/glitch-fragment-01.webp', category: 'env-corruption', depth: 2, opacity: 0.0, scale: 0.5, sections: ['artifacts'], loadPriority: 'lazy' },
  { id: 'glitch-02', src: '/assets/environment/corruption/glitch-fragment-02.webp', category: 'env-corruption', depth: 3, opacity: 0.0, scale: 0.4, sections: ['artifacts'], loadPriority: 'lazy' },
  { id: 'distortion-01', src: '/assets/environment/corruption/distortion-01.webp', category: 'env-corruption', depth: 1, opacity: 0.0, scale: 0.6, sections: ['artifacts'], loadPriority: 'lazy' },

  // --- Artifacts ---
  { id: 'artifact-nids', src: '/assets/artifacts/nids.webp', category: 'artifact', depth: 2, opacity: 0.7, scale: 0.6, parallax: 0.2, sections: ['artifacts'], interactive: true, loadPriority: 'critical' },
  { id: 'artifact-fuzzer', src: '/assets/artifacts/fuzzer.webp', category: 'artifact', depth: 2, opacity: 0.7, scale: 0.55, parallax: 0.2, sections: ['artifacts'], interactive: true, loadPriority: 'critical' },
  { id: 'artifact-log', src: '/assets/artifacts/log-analyzer.webp', category: 'artifact', depth: 2, opacity: 0.7, scale: 0.55, parallax: 0.2, sections: ['artifacts'], interactive: true, loadPriority: 'critical' },
  { id: 'artifact-docverify', src: '/assets/artifacts/docverify.webp', category: 'artifact', depth: 3, opacity: 0.6, scale: 0.5, parallax: 0.25, sections: ['artifacts'], interactive: true, loadPriority: 'secondary' },
  { id: 'artifact-netcli', src: '/assets/artifacts/network-cli.webp', category: 'artifact', depth: 3, opacity: 0.6, scale: 0.5, parallax: 0.25, sections: ['artifacts'], interactive: true, loadPriority: 'secondary' },

  // --- UI ---
  { id: 'ui-noise', src: '/assets/ui/noise.webp', category: 'ui', depth: 0, opacity: 0.03, scale: 1.0, loadPriority: 'critical' },
  { id: 'ui-grain', src: '/assets/ui/grain.webp', category: 'ui', depth: 0, opacity: 0.015, scale: 1.0, loadPriority: 'secondary' },
  { id: 'ui-mask', src: '/assets/ui/mask.webp', category: 'ui', depth: 0, opacity: 0.1, scale: 1.0, loadPriority: 'secondary' },
];

// Documentation manifest for ASSET_README.md
export const assetManifest: AssetManifestEntry[] = [
  { id: 'cat-01', path: '/assets/entities/cats/cat-01.webp', category: 'entity-cat', loadPriority: 'secondary', description: 'Dark silhouette of a cat watching from partial cover', recommendedDimensions: '512x512', format: 'WebP', transparent: true, usedIn: ['about', 'artifacts'] },
  { id: 'cat-02', path: '/assets/entities/cats/cat-02.webp', category: 'entity-cat', loadPriority: 'lazy', description: 'Cat silhouette hiding behind mechanical infrastructure', recommendedDimensions: '512x512', format: 'WebP', transparent: true, usedIn: ['stack'] },
  { id: 'cat-03', path: '/assets/entities/cats/cat-03.webp', category: 'entity-cat', loadPriority: 'lazy', description: 'Distant cat silhouette barely visible in void', recommendedDimensions: '512x512', format: 'WebP', transparent: true, usedIn: ['artifacts'] },
  { id: 'cat-04', path: '/assets/entities/cats/cat-04.webp', category: 'entity-cat', loadPriority: 'lazy', description: 'Cat silhouette crossing the contact void', recommendedDimensions: '512x512', format: 'WebP', transparent: true, usedIn: ['contact'] },
  { id: 'eye-01', path: '/assets/entities/eyes/eye-01.webp', category: 'entity-eye', loadPriority: 'secondary', description: 'Single eye entity partially hidden in haze', recommendedDimensions: '256x256', format: 'WebP', transparent: true, usedIn: ['about', 'artifacts'] },
  { id: 'eye-02', path: '/assets/entities/eyes/eye-02.webp', category: 'entity-eye', loadPriority: 'lazy', description: 'Distant watching eye in deep void layer', recommendedDimensions: '256x256', format: 'WebP', transparent: true, usedIn: ['artifacts', 'stack'] },
  { id: 'eye-03', path: '/assets/entities/eyes/eye-03.webp', category: 'entity-eye', loadPriority: 'lazy', description: 'Eye entity near artifact orbital ring', recommendedDimensions: '256x256', format: 'WebP', transparent: true, usedIn: ['artifacts'] },
  { id: 'eye-04', path: '/assets/entities/eyes/eye-04.webp', category: 'entity-eye', loadPriority: 'lazy', description: 'Barely visible eye in the final void', recommendedDimensions: '256x256', format: 'WebP', transparent: true, usedIn: ['contact'] },
  { id: 'void-fragment-01', path: '/assets/environment/void/void-fragment-01.webp', category: 'env-void', loadPriority: 'critical', description: 'Deep void fragment with atmospheric haze', recommendedDimensions: '1920x1080', format: 'WebP', transparent: false, usedIn: ['boot', 'home'] },
  { id: 'void-fragment-02', path: '/assets/environment/void/void-fragment-02.webp', category: 'env-void', loadPriority: 'critical', description: 'Void layer with faint cosmic formations', recommendedDimensions: '1920x1080', format: 'WebP', transparent: false, usedIn: ['home', 'about'] },
  { id: 'void-fragment-03', path: '/assets/environment/void/void-fragment-03.webp', category: 'env-void', loadPriority: 'secondary', description: 'Terminal void fragment for the ending', recommendedDimensions: '1920x1080', format: 'WebP', transparent: false, usedIn: ['contact', 'void'] },
  { id: 'mechanical-01', path: '/assets/environment/mechanical/mechanical-01.webp', category: 'env-mechanical', loadPriority: 'secondary', description: 'Mechanical cables and infrastructure fragments', recommendedDimensions: '1024x1024', format: 'WebP', transparent: true, usedIn: ['artifacts'] },
  { id: 'mechanical-02', path: '/assets/environment/mechanical/mechanical-02.webp', category: 'env-mechanical', loadPriority: 'secondary', description: 'Fragmented architecture and impossible structures', recommendedDimensions: '1024x1024', format: 'WebP', transparent: true, usedIn: ['artifacts', 'stack'] },
  { id: 'mechanical-03', path: '/assets/environment/mechanical/mechanical-03.webp', category: 'env-mechanical', loadPriority: 'lazy', description: 'Distant mechanical formations disappearing into dark', recommendedDimensions: '1024x1024', format: 'WebP', transparent: true, usedIn: ['stack'] },
  { id: 'mechanical-04', path: '/assets/environment/mechanical/mechanical-04.webp', category: 'env-mechanical', loadPriority: 'lazy', description: 'Close mechanical infrastructure with depth', recommendedDimensions: '1024x1024', format: 'WebP', transparent: true, usedIn: ['artifacts'] },
  { id: 'cosmic-layer-01', path: '/assets/environment/cosmic/cosmic-layer-01.webp', category: 'env-cosmic', loadPriority: 'critical', description: 'Deep cosmic background with faint stars and nebula traces', recommendedDimensions: '1920x1080', format: 'WebP', transparent: false, usedIn: ['boot', 'home', 'about'] },
  { id: 'cosmic-layer-02', path: '/assets/environment/cosmic/cosmic-layer-02.webp', category: 'env-cosmic', loadPriority: 'secondary', description: 'Mid-depth cosmic layer with spatial formations', recommendedDimensions: '1920x1080', format: 'WebP', transparent: false, usedIn: ['artifacts', 'stack'] },
  { id: 'cosmic-layer-03', path: '/assets/environment/cosmic/cosmic-layer-03.webp', category: 'env-cosmic', loadPriority: 'lazy', description: 'Outer cosmic layer for education and contact', recommendedDimensions: '1920x1080', format: 'WebP', transparent: false, usedIn: ['education', 'contact'] },
  { id: 'glitch-fragment-01', path: '/assets/environment/corruption/glitch-fragment-01.webp', category: 'env-corruption', loadPriority: 'lazy', description: 'Corruption fragment for transition glitch effects', recommendedDimensions: '512x512', format: 'WebP', transparent: true, usedIn: ['artifacts'] },
  { id: 'glitch-fragment-02', path: '/assets/environment/corruption/glitch-fragment-02.webp', category: 'env-corruption', loadPriority: 'lazy', description: 'Secondary corruption fragment', recommendedDimensions: '512x512', format: 'WebP', transparent: true, usedIn: ['artifacts'] },
  { id: 'distortion-01', path: '/assets/environment/corruption/distortion-01.webp', category: 'env-corruption', loadPriority: 'lazy', description: 'Spatial distortion texture for warping effects', recommendedDimensions: '512x512', format: 'WebP', transparent: true, usedIn: ['artifacts'] },
  { id: 'nids', path: '/assets/artifacts/nids.webp', category: 'artifact', loadPriority: 'critical', description: 'Abstract NIDS representation: network structures + intrusion fractures + neural/temporal patterns', recommendedDimensions: '800x800', format: 'WebP', transparent: true, usedIn: ['artifacts'] },
  { id: 'fuzzer', path: '/assets/artifacts/fuzzer.webp', category: 'artifact', loadPriority: 'critical', description: 'Abstract fuzzer: fractured executable geometry + mutation patterns + crash motifs', recommendedDimensions: '800x800', format: 'WebP', transparent: true, usedIn: ['artifacts'] },
  { id: 'log-analyzer', path: '/assets/artifacts/log-analyzer.webp', category: 'artifact', loadPriority: 'critical', description: 'Abstract log analyzer: streams + timeline fragments + clustered anomalies', recommendedDimensions: '800x800', format: 'WebP', transparent: true, usedIn: ['artifacts'] },
  { id: 'docverify', path: '/assets/artifacts/docverify.webp', category: 'artifact', loadPriority: 'secondary', description: 'Abstract DocVerify: cryptographic seal + mathematical geometry', recommendedDimensions: '800x800', format: 'WebP', transparent: true, usedIn: ['artifacts'] },
  { id: 'network-cli', path: '/assets/artifacts/network-cli.webp', category: 'artifact', loadPriority: 'secondary', description: 'Abstract Network CLI: routing paths + network topology + diagnostic traces', recommendedDimensions: '800x800', format: 'WebP', transparent: true, usedIn: ['artifacts'] },
  { id: 'noise', path: '/assets/ui/noise.webp', category: 'ui', loadPriority: 'critical', description: 'Tileable noise texture for grain overlay', recommendedDimensions: '256x256', format: 'WebP', transparent: false, usedIn: ['global overlay'] },
  { id: 'grain', path: '/assets/ui/grain.webp', category: 'ui', loadPriority: 'secondary', description: 'Tileable grain texture', recommendedDimensions: '256x256', format: 'WebP', transparent: false, usedIn: ['global overlay'] },
  { id: 'mask', path: '/assets/ui/mask.webp', category: 'ui', loadPriority: 'secondary', description: 'Vignette/mask for depth compositing', recommendedDimensions: '1920x1080', format: 'WebP', transparent: true, usedIn: ['global overlay'] },
];

// Helper to get asset by ID
export function getAsset(id: string): AssetDefinition | undefined {
  return assetDefinitions.find(a => a.id === id);
}

// Helper to get assets by category
export function getAssetsByCategory(category: AssetDefinition['category']): AssetDefinition[] {
  return assetDefinitions.filter(a => a.category === category);
}

// Helper to get assets by section
export function getAssetsBySection(section: string): AssetDefinition[] {
  return assetDefinitions.filter(a => a.sections?.includes(section));
}

// Helper to get critical assets for initial load
export function getCriticalAssets(): AssetDefinition[] {
  return assetDefinitions.filter(a => a.loadPriority === 'critical');
}
