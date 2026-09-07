# AKILAN Portfolio — Asset Documentation

> Every raster asset listed below has a procedural CSS/Canvas placeholder that fits the dark-fantasy visual language. You can replace any placeholder by dropping the final artwork into the specified path. No code changes required.

## Asset Pipeline Structure

```
public/assets/
├── entities/
│   ├── cats/
│   │   ├── cat-01.webp    — Dark silhouette cat watching from partial cover
│   │   ├── cat-02.webp    — Cat silhouette behind mechanical infrastructure
│   │   ├── cat-03.webp    — Distant cat barely visible in void
│   │   └── cat-04.webp    — Cat silhouette crossing the contact void
│   └── eyes/
│       ├── eye-01.webp    — Single eye entity partially hidden in haze
│       ├── eye-02.webp    — Distant watching eye in deep void layer
│       ├── eye-03.webp    — Eye entity near artifact orbital ring
│       └── eye-04.webp    — Barely visible eye in the final void
├── environment/
│   ├── void/
│   │   ├── void-fragment-01.webp  — Deep void fragment with atmospheric haze
│   │   ├── void-fragment-02.webp  — Void layer with faint cosmic formations
│   │   └── void-fragment-03.webp  — Terminal void fragment for ending
│   ├── mechanical/
│   │   ├── mechanical-01.webp     — Cables and infrastructure fragments
│   │   ├── mechanical-02.webp     — Fragmented architecture, impossible structures
│   │   ├── mechanical-03.webp     — Distant mechanical formations
│   │   └── mechanical-04.webp     — Close mechanical infrastructure with depth
│   ├── cosmic/
│   │   ├── cosmic-layer-01.webp   — Deep cosmic background, faint stars + nebula
│   │   ├── cosmic-layer-02.webp   — Mid-depth cosmic layer
│   │   └── cosmic-layer-03.webp   — Outer cosmic layer
│   └── corruption/
│       ├── glitch-fragment-01.webp — Corruption fragment for transition effects
│       ├── glitch-fragment-02.webp — Secondary corruption fragment
│       └── distortion-01.webp      — Spatial distortion texture
├── artifacts/
│   ├── nids.webp          — Abstract NIDS: network structures + neural patterns
│   ├── fuzzer.webp        — Abstract fuzzer: fractured executable geometry
│   ├── log-analyzer.webp  — Abstract log analyzer: streams + timeline fragments
│   ├── docverify.webp     — Abstract DocVerify: cryptographic seal + geometry
│   └── network-cli.webp   — Abstract Network CLI: routing paths + topology
└── ui/
    ├── noise.webp         — Tileable noise texture for grain overlay
    ├── grain.webp         — Tileable grain texture
    └── mask.webp          — Vignette/mask for depth compositing
```

---

## Detailed Asset Specifications

### Entity Assets

| Asset | Dimensions | Format | Transparent | Priority | Description |
|-------|-----------|--------|-------------|----------|-------------|
| cat-01.webp | 512×512 | WebP | ✅ Yes | Secondary | Dark cat silhouette watching from partial cover. Minimal detail, strong negative space. |
| cat-02.webp | 512×512 | WebP | ✅ Yes | Lazy | Cat hiding behind infrastructure. Only ears and outline visible. |
| cat-03.webp | 512×512 | WebP | ✅ Yes | Lazy | Very distant cat, almost invisible. Atmospheric depth. |
| cat-04.webp | 512×512 | WebP | ✅ Yes | Lazy | Cat silhouette mid-stride, crossing the void. |
| eye-01.webp | 256×256 | WebP | ✅ Yes | Secondary | Single eye partially obscured by haze. Subtle iris detail. |
| eye-02.webp | 256×256 | WebP | ✅ Yes | Lazy | Deep-layer eye. Almost entirely dark, faint highlight on iris. |
| eye-03.webp | 256×256 | WebP | ✅ Yes | Lazy | Eye near orbital ring. May have mechanical border elements. |
| eye-04.webp | 256×256 | WebP | ✅ Yes | Lazy | Barely visible. Only the faintest outline. |

### Environment Assets

| Asset | Dimensions | Format | Transparent | Priority | Description |
|-------|-----------|--------|-------------|----------|-------------|
| void-fragment-01.webp | 1920×1080 | WebP | ❌ No | **Critical** | Deep void with atmospheric haze. Near-black gradients. Used in boot/home. |
| void-fragment-02.webp | 1920×1080 | WebP | ❌ No | **Critical** | Void with faint cosmic formations emerging. Used in home/about. |
| void-fragment-03.webp | 1920×1080 | WebP | ❌ No | Secondary | Terminal void for ending. Subtle traces of the journey. |
| mechanical-01.webp | 1024×1024 | WebP | ✅ Yes | Secondary | Cables, connectors, infrastructure fragments. Dark metallic tones. |
| mechanical-02.webp | 1024×1024 | WebP | ✅ Yes | Secondary | Fragmented architecture. Impossible angles. |
| mechanical-03.webp | 1024×1024 | WebP | ✅ Yes | Lazy | Distant formations dissolving into darkness. |
| mechanical-04.webp | 1024×1024 | WebP | ✅ Yes | Lazy | Close infrastructure. Visible detail, strong depth. |
| cosmic-layer-01.webp | 1920×1080 | WebP | ❌ No | **Critical** | Deepest cosmic layer. Very faint stars, nebula wisps. |
| cosmic-layer-02.webp | 1920×1080 | WebP | ❌ No | Secondary | Mid-depth formations. More visible cosmic elements. |
| cosmic-layer-03.webp | 1920×1080 | WebP | ❌ No | Lazy | Outer cosmic. Sparse, atmospheric. |
| glitch-fragment-01.webp | 512×512 | WebP | ✅ Yes | Lazy | Corruption texture. Color-shifted blocks, scan artifacts. |
| glitch-fragment-02.webp | 512×512 | WebP | ✅ Yes | Lazy | Secondary corruption. Different pattern from fragment-01. |
| distortion-01.webp | 512×512 | WebP | ✅ Yes | Lazy | Spatial warp texture. Displacement map style. |

### Artifact Assets

| Asset | Dimensions | Format | Transparent | Priority | Description |
|-------|-----------|--------|-------------|----------|-------------|
| nids.webp | 800×800 | WebP | ✅ Yes | **Critical** | Network structures + intrusion fractures + neural/temporal patterns. Abstract. |
| fuzzer.webp | 800×800 | WebP | ✅ Yes | **Critical** | Fractured executable geometry + mutation paths + crash motifs. Abstract. |
| log-analyzer.webp | 800×800 | WebP | ✅ Yes | **Critical** | Streams + timeline fragments + clustered signals. Abstract. |
| docverify.webp | 800×800 | WebP | ✅ Yes | Secondary | Cryptographic seal + mathematical geometry. Abstract. |
| network-cli.webp | 800×800 | WebP | ✅ Yes | Secondary | Routing paths + network topology + diagnostic traces. Abstract. |

### UI Assets

| Asset | Dimensions | Format | Transparent | Priority | Description |
|-------|-----------|--------|-------------|----------|-------------|
| noise.webp | 256×256 | WebP | ❌ No | **Critical** | Tileable noise texture. Very subtle grain. |
| grain.webp | 256×256 | WebP | ❌ No | Secondary | Tileable film grain texture. |
| mask.webp | 1920×1080 | WebP | ✅ Yes | Secondary | Vignette mask. Dark edges, transparent center. |

---

## Art Direction Guidelines

All assets must belong to the same visual universe:

- **Color palette**: Abyssal black, near-black, charcoal, graphite, dark metallic tones, atmospheric grays
- **Style**: Dark fantasy, cosmic emptiness, mechanical infrastructure, subtle corruption
- **Composition**: Strong negative space, partial forms, obscured edges, atmospheric haze
- **Avoid**: Stock imagery, cyberpunk neon, cartoon art, cute illustrations, sci-fi clichés

### Replacing Assets

1. Create artwork matching the specifications above
2. Save as WebP (optimized, quality 80-90)
3. Drop into the specified path under `public/assets/`
4. No code changes needed — the asset manifest handles all references

The procedural placeholders will automatically be replaced when the real asset file exists at the expected path.
