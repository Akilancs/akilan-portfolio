import { WorldStateProvider } from './state/useWorldState';
import { useReducedMotion } from './hooks/useReducedMotion';
import { VoidWorld } from './components/world/VoidWorld';
import { CanvasRenderer } from './engine/CanvasRenderer';
import NavigationGlyph from './components/navigation/NavigationGlyph';
import VoidNavigation from './components/navigation/VoidNavigation';
import { ReducedMotionFallback } from './components/ui/ReducedMotionFallback';

function AppContent() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
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
      <AppContent />
    </WorldStateProvider>
  );
}

export default App;
