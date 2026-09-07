import { useWorldState } from '../../state/useWorldState';

export default function NavigationGlyph() {
  const { state, toggleMenu } = useWorldState();
  const { bootCompleted, menuOpen } = state;

  if (!bootCompleted) return null;

  return (
    <button
      onClick={toggleMenu}
      aria-expanded={menuOpen}
      aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
      className="fixed top-6 right-6 z-50 flex flex-col items-center justify-center gap-1.5 p-2 bg-transparent border-none cursor-pointer group transition-all duration-700 ease-out opacity-0 animate-[fadeIn_2s_ease-out_forwards]"
    >
      <span
        className={`w-1.5 h-1.5 rounded-full bg-ghost transition-all duration-300 group-hover:bg-bright ${
          menuOpen ? 'translate-y-[6px] rotate-45 scale-x-150' : 'group-hover:-translate-y-0.5'
        }`}
      />
      <span
        className={`w-1.5 h-1.5 rounded-full bg-ghost transition-all duration-300 group-hover:bg-bright ${
          menuOpen ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span
        className={`w-1.5 h-1.5 rounded-full bg-ghost transition-all duration-300 group-hover:bg-bright ${
          menuOpen ? '-translate-y-[6px] -rotate-45 scale-x-150' : 'group-hover:translate-y-0.5'
        }`}
      />
    </button>
  );
}
