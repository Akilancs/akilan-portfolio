import { useEffect } from 'react';
import { WorldStateProvider, useWorldState } from './state/useWorldState';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useDeviceCapability } from './hooks/useDeviceCapability';
import { useReturningVisitor } from './hooks/useReturningVisitor';
import { VoidWorld } from './components/world/VoidWorld';
import { CanvasRenderer } from './engine/CanvasRenderer';
import NavigationGlyph from './components/navigation/NavigationGlyph';
import VoidNavigation from './components/navigation/VoidNavigation';
import { ReducedMotionFallback } from './components/ui/ReducedMotionFallback';

function DeviceSync() {
  const { setPerformanceTier, setDeviceFlags, setReturningVisitor } = useWorldState();
  const { tier, isMobile, isTouch } = useDeviceCapability();
  const { isReturning, markVisited } = useReturningVisitor();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setPerformanceTier(tier);
  }, [tier, setPerformanceTier]);

  useEffect(() => {
    setDeviceFlags(isMobile, isTouch, reducedMotion);
  }, [isMobile, isTouch, reducedMotion, setDeviceFlags]);

  useEffect(() => {
    setReturningVisitor(isReturning);
    markVisited();
  }, [isReturning, markVisited, setReturningVisitor]);

  return null;
}

function AppContent() {
  const { isReducedMotion } = useWorldState();

  if (isReducedMotion) {
    return <ReducedMotionFallback />;
  }

  return (
    <>
      <CanvasRenderer />
      <VoidWorld />
      <NavigationGlyph />
      <VoidNavigation />
    </>
  );
}

function App() {
  return (
    <WorldStateProvider>
      <DeviceSync />
      <AppContent />
    </WorldStateProvider>
  );
}

export default App;
