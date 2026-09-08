import { useWorldState } from '../../state/useWorldState';
import { identity } from '../../data/identity';
import { contactIconMap } from '../../data/iconMap';

export function ContactScene() {
  const { currentSection, sectionProgress } = useWorldState();

  const active = currentSection === 'contact' || currentSection === 'void';
  if (!active) return null;

  const p = currentSection === 'contact' ? sectionProgress : 1;
  const fadeIn = Math.min(p / 0.3, 1);
  const opacity = fadeIn;

  const links = [
    { label: 'EMAIL', href: `mailto:${identity.email}`, icon: contactIconMap.email },
    { label: 'GITHUB', href: identity.github, icon: contactIconMap.github, external: true },
    { label: 'LINKEDIN', href: identity.linkedin, icon: contactIconMap.linkedin, external: true },
  ];

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
        {links.map(link => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="font-mono text-sm text-ghost hover:text-bright transition-all duration-300 tracking-widest relative group flex items-center gap-3"
          >
            {link.icon && (
              <img
                src={link.icon}
                alt=""
                className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                style={{ filter: 'brightness(0.8) invert(0.7)' }}
              />
            )}
            <span className="relative">
              <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent-cold">
                &gt;
              </span>
              {link.label}
            </span>
          </a>
        ))}
      </nav>
    </section>
  );
}
