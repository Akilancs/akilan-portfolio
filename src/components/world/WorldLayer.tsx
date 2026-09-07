import type { ReactNode } from 'react';

interface WorldLayerProps {
  depth: number;
  children: ReactNode;
  className?: string;
  parallax?: number;
  interactive?: boolean;
}

export default function WorldLayer({ depth, children, className = '', parallax: _parallax = 0, interactive = false }: WorldLayerProps) {
  const zIndex = Math.max(0, Math.min(50, Math.floor(depth / 2)));
  
  const pointerEvents = interactive ? 'auto' : 'none';

  return (
    <div
      className={`absolute inset-0 will-change-transform ${className}`}
      style={{
        zIndex,
        pointerEvents: pointerEvents as any,
      }}
    >
      {children}
    </div>
  );
}
