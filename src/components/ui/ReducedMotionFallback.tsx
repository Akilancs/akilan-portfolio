import { identity } from '../../data/identity';
import { projects } from '../../data/projects';
import { skills, skillCategories } from '../../data/skills';
import { skillIconMap, contactIconMap } from '../../data/iconMap';

export function ReducedMotionFallback() {
  return (
    <div className="min-h-screen bg-void text-whisper font-sans selection:bg-accent-cold selection:text-white pb-20">
      <header className="sticky top-0 z-50 bg-void/90 border-b border-charcoal py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="font-mono text-xl font-bold tracking-widest">{identity.name}</div>
        <nav className="hidden md:flex gap-6">
          <a href="#about" className="text-sm hover:text-bright uppercase tracking-widest">About</a>
          <a href="#projects" className="text-sm hover:text-bright uppercase tracking-widest">Artifacts</a>
          <a href="#skills" className="text-sm hover:text-bright uppercase tracking-widest">Stack</a>
          <a href="#contact" className="text-sm hover:text-bright uppercase tracking-widest">Contact</a>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-6 md:px-12 pt-20 flex flex-col gap-32">
        <section id="home" className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-6xl font-bold text-bright">{identity.name}</h1>
          <p className="text-xl text-ghost max-w-2xl leading-relaxed">{identity.tagline}</p>
        </section>

        <section id="about" className="flex flex-col gap-8">
          <h2 className="text-2xl font-mono text-accent-cold border-b border-charcoal pb-4 uppercase tracking-widest">About</h2>
          <div className="prose prose-invert prose-p:text-ghost prose-p:leading-relaxed max-w-none">
            <p>I study systems by dismantling them.</p>
            <p>Currently building intrusion detection models, fuzzers, and diagnostic tools — each one an excuse to understand another layer of how things fail.</p>
            <p className="font-mono text-sm mt-4 text-ash">
              {identity.degree}<br />
              Expected Graduation {identity.expectedGraduation}
            </p>
          </div>
        </section>

        <section id="projects" className="flex flex-col gap-8">
          <h2 className="text-2xl font-mono text-accent-cold border-b border-charcoal pb-4 uppercase tracking-widest">Artifacts</h2>
          <div className="flex flex-col gap-16">
            {projects.map(project => (
              <div key={project.id} className="flex flex-col gap-4 border border-charcoal p-6 bg-abyss">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-bright">{project.name}</h3>
                  <span className="font-mono text-xs text-accent-signal px-2 py-1 bg-charcoal">{project.statusLabel}</span>
                </div>
                <p className="text-ghost leading-relaxed">{project.description}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-mono text-ash mb-2 uppercase tracking-wider">Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(tech => (
                      <span key={tech} className="text-xs bg-deep border border-slate px-2 py-1 text-phantom">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="flex flex-col gap-8">
          <h2 className="text-2xl font-mono text-accent-cold border-b border-charcoal pb-4 uppercase tracking-widest">Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map(category => (
              <div key={category.id} className="flex flex-col gap-4">
                <h3 className="text-sm font-mono text-ash uppercase tracking-wider">{category.label}</h3>
                <ul className="flex flex-wrap gap-2">
                  {skills.filter(s => s.category === category.id).map(skill => {
                    const icon = skillIconMap[skill.id];
                    return (
                      <li key={skill.id} className="text-sm text-whisper bg-charcoal px-3 py-1.5 rounded-sm flex items-center gap-1.5">
                        {icon && <img src={icon} alt="" className="w-3.5 h-3.5 opacity-60" />}
                        {skill.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="flex flex-col gap-8">
          <h2 className="text-2xl font-mono text-accent-cold border-b border-charcoal pb-4 uppercase tracking-widest">Contact</h2>
          <ul className="flex flex-col gap-4">
            <li>
              <a href={`mailto:${identity.email}`} className="text-bright hover:text-accent-cold hover:underline font-mono flex items-center gap-2">
                {contactIconMap.email && <img src={contactIconMap.email} alt="" className="w-4 h-4 opacity-60" />}
                Email -&gt; {identity.email}
              </a>
            </li>
            <li>
              <a href={identity.github} target="_blank" rel="noopener noreferrer" className="text-bright hover:text-accent-cold hover:underline font-mono flex items-center gap-2">
                {contactIconMap.github && <img src={contactIconMap.github} alt="" className="w-4 h-4 opacity-60" />}
                GitHub -&gt; {identity.github.replace('https://', '')}
              </a>
            </li>
            <li>
              <a href={identity.linkedin} target="_blank" rel="noopener noreferrer" className="text-bright hover:text-accent-cold hover:underline font-mono flex items-center gap-2">
                {contactIconMap.linkedin && <img src={contactIconMap.linkedin} alt="" className="w-4 h-4 opacity-60" />}
                LinkedIn -&gt; {identity.linkedin.replace('https://', '')}
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
