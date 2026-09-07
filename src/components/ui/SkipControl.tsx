import { useState, useEffect, useRef, useCallback } from 'react';
import { useWorldState } from '../../state/useWorldState';

export function SkipControl() {
  const { sectionProgress, currentSection, bootCompleted, skipBoot } = useWorldState();
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const bootStarted = currentSection === 'boot' && sectionProgress > 0.1;
  const shouldRender = bootStarted && !bootCompleted;

  const handleActivity = useCallback(() => {
    setVisible(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(false), 3000);
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    handleActivity();
    window.addEventListener('mousemove', handleActivity, { passive: true });
    window.addEventListener('scroll', handleActivity, { passive: true });
    window.addEventListener('keydown', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [shouldRender, handleActivity]);

  if (!shouldRender) return null;

  return (
    <button
      onClick={skipBoot}
      className={`fixed bottom-8 right-8 z-50 font-mono text-xs tracking-widest px-4 py-2 text-ghost border border-slate bg-abyss/80 hover:text-bright hover:border-ghost transition-all duration-300 ${visible ? 'opacity-70 hover:opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-label="Skip boot sequence"
      tabIndex={visible ? 0 : -1}
    >
      SKIP
    </button>
  );
}
