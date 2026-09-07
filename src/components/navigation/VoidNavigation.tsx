import { useEffect, useRef, useCallback } from 'react';
import { useWorldState } from '../../state/useWorldState';
import type { Section } from '../../types/world';

const SECTIONS: Section[] = ['home', 'about', 'artifacts', 'stack', 'education', 'contact'];

export default function VoidNavigation() {
  const { state, toggleMenu, setSection } = useWorldState();
  const { menuOpen, currentSection } = state;
  const navRef = useRef<HTMLElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      toggleMenu();
    }
  }, [toggleMenu]);

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      const focusableElements = navRef.current?.querySelectorAll('button');
      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [menuOpen, handleKeyDown]);

  if (!menuOpen) return null;

  const handleSectionClick = (section: Section) => {
    setSection(section, 0);
    toggleMenu();
  };

  return (
    <nav
      ref={navRef}
      role="navigation"
      aria-label="Site navigation"
      className="fixed inset-0 z-40 bg-void/95 backdrop-blur-sm transition-opacity duration-500 animate-[fadeIn_0.5s_ease-out]"
      onClick={toggleMenu}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-void to-deep opacity-80" />
      
      <div 
        className="relative w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {SECTIONS.map((section, index) => {
          const top = `${20 + (index * 12) + (index % 2 === 0 ? 5 : -5)}%`;
          const left = `${20 + (index * 15) + (index % 3 === 0 ? 10 : -10)}%`;
          
          return (
            <button
              key={section}
              onClick={() => handleSectionClick(section)}
              className={`absolute font-sans text-2xl md:text-4xl tracking-[0.2em] transition-all duration-700 hover:text-bright hover:opacity-100 hover:scale-110 focus:outline-none focus:text-bright focus:scale-110
                ${currentSection === section ? 'text-accent-cold opacity-100 font-bold' : 'text-ash opacity-50'}
              `}
              style={{
                top,
                left,
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeUp 0.5s ease-out forwards',
                opacity: 0,
                transform: 'translateY(20px)'
              }}
            >
              {section.toUpperCase()}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
