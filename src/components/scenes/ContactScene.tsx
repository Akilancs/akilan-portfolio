import { useWorldState } from '../../state/useWorldState';
import { identity } from '../../data/identity';

export function ContactScene() {
  const { currentSection, sectionProgress } = useWorldState();

  const active = currentSection === 'contact' || currentSection === 'void';
  if (!active) return null;

  const p = currentSection === 'contact' ? sectionProgress : 1;
  const fadeIn = Math.min(p / 0.3, 1);
  const opacity = fadeIn;

  return (
    <section
      id="contact"
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ opacity, zIndex: 5 }}
    >
      <div className="absolute top-12 font-mono tracking-[0.5em] text-phantom text-xs">
        CONTACT
      </div>
      <nav
        aria-label="Contact links"
        className="flex flex-col md:flex-row gap-12 pointer-events-auto"
      >
        <a
          href={`mailto:${identity.email}`}
          className="font-mono text-sm text-ghost hover:text-bright transition-colors tracking-widest relative group"
        >
          <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent-cold">
            &gt;
          </span>
          EMAIL
        </a>
        <a
          href={identity.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-ghost hover:text-bright transition-colors tracking-widest relative group"
        >
          <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent-cold">
            &gt;
          </span>
          GITHUB
        </a>
        <a
          href={identity.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-ghost hover:text-bright transition-colors tracking-widest relative group"
        >
          <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent-cold">
            &gt;
          </span>
          LINKEDIN
        </a>
      </nav>
    </section>
  );
}
