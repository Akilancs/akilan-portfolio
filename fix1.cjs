const fs = require('fs');
const path = require('path');

function replaceInFile(file, replacements) {
  const p = path.join(process.cwd(), 'src', file);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf-8');
  for (const [search, replace] of replacements) {
    content = content.replace(search, replace);
  }
  fs.writeFileSync(p, content, 'utf-8');
}

// Artifact.tsx
replaceInFile('components/artifacts/Artifact.tsx', [
  [/import React from 'react';\n/, ''],
  [/import \{ ProjectData \}/, 'import type { ProjectData }'],
  [/orbitalTime }: ArtifactProps/, '}: ArtifactProps'],
  [/project\.theme/g, 'project.infrastructureTheme'],
  [/project\.title/g, 'project.name'],
  [/'in-progress'/g, "'IN_PROGRESS'"]
]);

// ArtifactHUD.tsx
replaceInFile('components/artifacts/ArtifactHUD.tsx', [
  [/import React from 'react';\n/, ''],
  [/import \{ ProjectData \}/, 'import type { ProjectData }'],
  [/project\.title/g, 'project.name'],
  [/'in-progress'/g, "'IN_PROGRESS'"]
]);

// OrbitalRing.tsx & Singularity.tsx
replaceInFile('components/artifacts/OrbitalRing.tsx', [[/import React from 'react';\n/, '']]);
replaceInFile('components/artifacts/Singularity.tsx', [[/import React from 'react';\n/, '']]);

// Cat.tsx
replaceInFile('components/entities/Cat.tsx', [
  [/import \{ Section \}/, 'import type { Section }'],
  [/'HOME'/g, "'home'"]
]);

// Eye.tsx
replaceInFile('components/entities/Eye.tsx', [
  [/import React, \{ useMemo \} from 'react';\n/, "import { useMemo } from 'react';\n"],
  [/import \{ Section \}/, 'import type { Section }'],
  [/\{ id, position, section, /g, '{ position, ']
]);

// SecretReveal.tsx
replaceInFile('components/entities/SecretReveal.tsx', [
  [/import React, \{ useEffect \} from 'react';\n/, "import { useEffect } from 'react';\n"],
  [/import \{ SecretData \}/, 'import type { SecretData }'],
  [/secret\.description/g, 'secret.content']
]);

// Navigation files
replaceInFile('components/navigation/NavigationGlyph.tsx', [[/import React from 'react';\n/, '']]);
replaceInFile('components/navigation/VoidNavigation.tsx', [
  [/import React from 'react';\n/, ''],
  [/import \{ Section \}/, 'import type { Section }']
]);

// StarField.ts
replaceInFile('engine/StarField.ts', [
  [/_width/g, 'width'],
  [/this\.width = width;/, '']
]);

// useScrollController.ts
replaceInFile('state/useScrollController.ts', [
  [/_currentSectionIndex/g, 'currentSectionIndex']
]);

console.log('Fixed batch 1');
