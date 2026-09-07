import React, { useMemo } from 'react';
import ProceduralPlaceholder from './ProceduralPlaceholder';

export interface AssetDefinition {
  id: string;
  category: string;
  src: string;
  position: { x: number; y: number };
  parallax: number;
  scale?: number;
  opacity?: number;
  blur?: number;
  rotation?: number;
}

interface AssetLayerProps {
  assets: AssetDefinition[];
  scrollProgress: number;
  cursorX: number;
  cursorY: number;
}

export default function AssetLayer({ assets, scrollProgress, cursorX, cursorY }: AssetLayerProps) {
  const normCursorX = useMemo(() => (cursorX / (typeof window !== 'undefined' ? window.innerWidth : 1000)) - 0.5, [cursorX]);
  const normCursorY = useMemo(() => (cursorY / (typeof window !== 'undefined' ? window.innerHeight : 800)) - 0.5, [cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {assets.map((asset) => {
        const yOffset = scrollProgress * asset.parallax * 100;
        const cursorOffsetX = normCursorX * asset.parallax * 50;
        const cursorOffsetY = normCursorY * asset.parallax * 50;
        
        return (
          <div
            key={asset.id}
            className="absolute transition-transform duration-75 ease-out will-change-transform"
            style={{
              left: `${asset.position.x}%`,
              top: `${asset.position.y}%`,
              transform: `translate3d(calc(-50% + ${cursorOffsetX}px), calc(-50% + ${yOffset}px + ${cursorOffsetY}px), 0) rotate(${asset.rotation || 0}deg) scale(${asset.scale || 1})`,
              opacity: asset.opacity ?? 0.8,
              filter: asset.blur ? `blur(${asset.blur}px)` : 'none',
            }}
          >
            <AssetImage asset={asset} />
          </div>
        );
      })}
    </div>
  );
}

function AssetImage({ asset }: { asset: AssetDefinition }) {
  const [error, setError] = React.useState(false);

  if (error || !asset.src) {
    return <ProceduralPlaceholder category={asset.category as any} width={200} height={200} />;
  }

  return (
    <img 
      src={asset.src} 
      alt="" 
      className="max-w-none select-none object-contain" 
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}
