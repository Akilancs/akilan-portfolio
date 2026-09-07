import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { WorldState, Section, PerformanceTier } from '../types/world';

export interface WorldStateContextValue extends WorldState {
  state: WorldState;
  setSection: (section: Section, progress: number) => void;
  setScrollState: (position: number, velocity: number, direction: 'up' | 'down', acceleration: number) => void;
  selectArtifact: (id: string | null) => void;
  deselectArtifact: () => void;
  toggleMenu: () => void;
  discoverSecret: (secretId: string) => void;
  skipBoot: () => void;
  completeBoot: () => void;
  triggerClimax: (active: boolean) => void;
  setPerformanceTier: (tier: PerformanceTier) => void;
  setTransitionProgress: (progress: number) => void;
}

const WorldStateContext = createContext<WorldStateContextValue | null>(null);

export const WorldStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState<Section>('boot');
  const [sectionProgress, setSectionProgress] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [scrollAcceleration, setScrollAcceleration] = useState(0);
  const [bootCompleted, setBootCompleted] = useState(false);
  const [bootSkipped, setBootSkipped] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedArtifact, setSelectedArtifact] = useState<string | null>(null);
  const [artifactHUDVisible, setArtifactHUDVisible] = useState(false);
  const [orbitalTime, setOrbitalTime] = useState(0);
  const [secretsDiscovered, setSecretsDiscovered] = useState<string[]>([]);
  const [performanceTier, setPerformanceTierState] = useState<PerformanceTier>('high');
  const [isReducedMotion, _setIsReducedMotion] = useState(false);
  const [isReturningVisitor, _setIsReturningVisitor] = useState(false);
  const [isMobile, _setIsMobile] = useState(false);
  const [climaxActive, setClimaxActive] = useState(false);
  const [transitionProgress, setTransitionProgressState] = useState(0);

  // Note: isReducedMotion, isReturningVisitor, isMobile could be initialized via useEffect reading matchMedia/localStorage

  const setSection = useCallback((section: Section, progress: number) => {
    setCurrentSection(section);
    setSectionProgress(progress);
  }, []);

  const setScrollState = useCallback((position: number, velocity: number, direction: 'up' | 'down', acceleration: number) => {
    setScrollPosition(position);
    setScrollVelocity(velocity);
    setScrollDirection(direction);
    setScrollAcceleration(acceleration);
    setOrbitalTime((prev) => prev + velocity * 0.01);
  }, []);

  const selectArtifact = useCallback((id: string | null) => {
    setSelectedArtifact(id);
    setArtifactHUDVisible(!!id);
  }, []);

  const deselectArtifact = useCallback(() => {
    setSelectedArtifact(null);
    setArtifactHUDVisible(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const discoverSecret = useCallback((secretId: string) => {
    setSecretsDiscovered((prev) => (prev.includes(secretId) ? prev : [...prev, secretId]));
  }, []);

  const skipBoot = useCallback(() => {
    setBootSkipped(true);
    setBootCompleted(true);
  }, []);

  const completeBoot = useCallback(() => {
    setBootCompleted(true);
  }, []);

  const triggerClimax = useCallback((active: boolean) => {
    setClimaxActive(active);
  }, []);

  const setPerformanceTier = useCallback((tier: PerformanceTier) => {
    setPerformanceTierState(tier);
  }, []);

  const setTransitionProgress = useCallback((progress: number) => {
    setTransitionProgressState(progress);
  }, []);

  // Build a `state` object for components that destructure { state, ...actions }
  const stateObj = useMemo(() => ({
    currentSection,
    sectionProgress,
    scrollPosition,
    scrollVelocity,
    scrollDirection: scrollDirection as 'up' | 'down' | 'idle',
    scrollAcceleration,
    bootCompleted,
    bootSkipped,
    menuOpen,
    selectedArtifact,
    artifactHUDVisible,
    orbitalTime,
    secretsDiscovered,
    performanceTier,
    isReducedMotion,
    isReturningVisitor,
    isMobile,
    climaxActive,
    transitionProgress,
  }), [
    currentSection, sectionProgress, scrollPosition, scrollVelocity, scrollDirection, scrollAcceleration,
    bootCompleted, bootSkipped, menuOpen, selectedArtifact, artifactHUDVisible, orbitalTime,
    secretsDiscovered, performanceTier, isReducedMotion, isReturningVisitor, isMobile, climaxActive, transitionProgress,
  ]);

  const value = useMemo(() => ({
    // Flat access: const { currentSection, toggleMenu } = useWorldState()
    ...stateObj,
    // Nested access: const { state, toggleMenu } = useWorldState()
    state: stateObj,
    // Actions
    setSection,
    setScrollState,
    selectArtifact,
    deselectArtifact,
    toggleMenu,
    discoverSecret,
    skipBoot,
    completeBoot,
    triggerClimax,
    setPerformanceTier,
    setTransitionProgress,
  }), [
    stateObj,
    setSection, setScrollState, selectArtifact, deselectArtifact, toggleMenu, discoverSecret,
    skipBoot, completeBoot, triggerClimax, setPerformanceTier, setTransitionProgress,
  ]);

  return <WorldStateContext.Provider value={value}>{children}</WorldStateContext.Provider>;
};

export const useWorldState = () => {
  const context = useContext(WorldStateContext);
  if (!context) {
    throw new Error('useWorldState must be used within a WorldStateProvider');
  }
  return context;
};
