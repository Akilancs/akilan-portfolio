import { useEffect } from 'react';
import type { SecretData } from '../../types/projects';

interface SecretRevealProps {
  secret: SecretData | null;
  onDismiss: () => void;
}

export default function SecretReveal({ secret, onDismiss }: SecretRevealProps) {
  useEffect(() => {
    if (secret) {
      const timer = setTimeout(onDismiss, 5000);
      return () => clearTimeout(timer);
    }
  }, [secret, onDismiss]);

  if (!secret) return null;

  return (
    <div className="fixed bottom-8 left-8 z-30 animate-[glitchIn_0.3s_ease-out_forwards]">
      <div 
        className="bg-abyss/90 border-l-2 border-accent-cold p-3 backdrop-blur-md cursor-pointer hover:bg-deep transition-colors"
        onClick={onDismiss}
      >
        <p className="font-mono text-xs text-bright opacity-90 mb-1 tracking-wider uppercase">
          &gt; LOG_FRAGMENT: {secret.id}
        </p>
        <p className="font-mono text-xs text-ghost leading-relaxed max-w-xs">
          {secret.content}
        </p>
      </div>
    </div>
  );
}
