import { useEffect, useState } from 'react';

const portrait = '/manus-storage/naresh-magar_81ec892f.png';
const portraitFallback = '/assets/naresh-magar.png';

const skills = [
  { name: 'React', type: 'Frontend', level: 'Advanced', icon: '⚛' },
  { name: 'JavaScript', type: 'Frontend', level: 'Advanced', icon: 'JS' },
  { name: 'HTML / CSS', type: 'Frontend', level: 'Advanced', icon: '</>' },
  { name: 'Python', type: 'Backend', level: 'Working', icon: 'Py' },
  { name: 'Java', type: 'Backend', level: 'Working', icon: 'Jv' },
  { name: 'C# / C', type: 'Systems', level: 'Working', icon: 'C+' },
  { name: 'Network Programming', type: 'Systems', level: 'Working', icon: '↗' },
];

const contactLinks = [
  {
    label: 'WhatsApp',
    detail: 'Start a conversation',
    href: 'https://wa.me/9779761513273?text=Hello%20Naresh%2C%20I%20found%20your%20portfolio.',
    icon: '◌',
    external: true,
  },
  {
    label: 'Phone',
    detail: '+977 9761513273',
    href: 'tel:+9779761513273',
    icon: '⌕',
  },
  {
    label: 'Gmail',
    detail: 'nareshsarumagar63@gmail.com',
    href: 'mailto:nareshsarumagar63@gmail.com?subject=Hello%20Naresh&body=Hi%20Naresh%2C%20I%20found%20your%20portfolio.',
    icon: '@',
  },
  {
    label: 'Github',
    detail: 'github.com/nareshsarumagar',
    href: 'https://github.com/NareshSarumagar',
    icon: 'G',
  },
  {
    label: 'LinkedIn',
    detail: 'in/nareshsarumagar',
    href: 'https://www.linkedin.com/in/nareshsarumagar/',
    icon: 'L',
  },
];

function ArrowIcon() {
  return <span className="arrow-icon" aria-hidden="true">↗</span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState('React');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <main className="site-shell">
      <div className="background-orbit orbit-one" />
      <div className="background-orbit orbit-two" />
      <div className="grain" />

      <header className={`site-header ${scrollY > 30 ? 'is-scrolled' : ''}`}>
        <button className="wordmark" onClick={() => scrollTo('top')} aria-label="Go to top">
          <span className="wordmark-mark">NSM<span>/</span></span>
          <span className="wordmark-copy">Naresh Saru Magar</span>
        </button>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
          <button onClick={() => scrollTo('about')}>About</button>
          <button onClick={() => scrollTo('skills')}>Stack</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          <span /> <span />
        </button>
      </header>

      <section className="hero section-frame" id="top">
        <div className="hero-copy reveal-up">
          <div className="eyebrow"><span className="status-dot" /> Available for meaningful builds</div>
          <p className="hero-kicker">FULL STACK DEVELOPER <span>·</span> NEPAL</p>
          <h1>Building clear systems for <em>complex ideas.</em></h1>
          <p className="hero-intro">I’m Naresh — a developer who blends frontend craft, backend logic, and network thinking into digital experiences that feel calm, fast, and useful.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => scrollTo('contact')}>Let’s connect <ArrowIcon /></button>
            <button className="text-link" onClick={() => scrollTo('skills')}>Explore my stack <span>↓</span></button>
          </div>
          <div className="hero-meta">
            <span><b>01</b> DIGITAL CRAFT</span>
            <span><b>02</b> SYSTEMS THINKING</span>
          </div>
        </div>

        <div className="hero-visual reveal-up delay-one">
          <div className="visual-label label-top"><span>01°</span> FIELD NOTE</div>
          <div className="portrait-orbit">
            <div className="orbit-line orbit-line-one" />
            <div className="orbit-line orbit-line-two" />
            <div className="portrait-halo" />
            <div className="portrait-frame">
              <img src={portrait} alt="Naresh Saru Magar in the Himalayas" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = portraitFallback; }} />
              <div className="portrait-shine" />
            </div>
            <span className="orbit-node node-one" />
            <span className="orbit-node node-two" />
          </div>
          <div className="visual-label label-bottom"><span>27.7172° N</span><span>85.3240° E</span></div>
          <div className="portrait-caption glass-card"><span className="caption-line" /><div><strong>High altitude thinking.</strong><small>Grounded in real-world details.</small></div></div>
        </div>
      </section>

      <section className="signal-strip section-frame reveal-up" id="about">
        <div className="strip-label"><span className="tiny-index">01</span><span>THE SIGNAL</span></div>
        <div className="strip-body"><p>Good software is more than a collection of features. It’s a thoughtful route from a real problem to a reliable, human result.</p><span className="strip-accent">✦</span></div>
        <div className="strip-aside">From interface<br />to infrastructure</div>
      </section>

      <section className="skills-section section-frame" id="skills">
        <div className="section-heading reveal-up"><div><span className="section-index">02 / TOOLKIT</span><h2>Things I use<br /><em>to make things work.</em></h2></div><p>Curious by default. Practical by design. I move comfortably between pixels, APIs, and the systems underneath.</p></div>
        <div className="skill-layout">
          <div className="skill-list reveal-up delay-one">
            {skills.map((skill, index) => (
              <button className={`skill-row ${activeSkill === skill.name ? 'is-active' : ''}`} key={skill.name} onMouseEnter={() => setActiveSkill(skill.name)} onFocus={() => setActiveSkill(skill.name)} onClick={() => setActiveSkill(skill.name)}>
                <span className="skill-index">0{index + 1}</span><span className="skill-icon">{skill.icon}</span><span className="skill-name">{skill.name}</span><span className="skill-type">{skill.type}</span><span className="skill-arrow">↗</span>
              </button>
            ))}
          </div>
          <div className="skill-focus glass-card reveal-up delay-two">
            <div className="focus-top"><span className="focus-tag">NOW EXPLORING</span><span className="focus-symbol">{skills.find((skill) => skill.name === activeSkill)?.icon}</span></div>
            <h3>{activeSkill}</h3>
            <p>{activeSkill === 'Network Programming' ? 'Thinking in connections: protocols, data flow, and the quiet infrastructure that makes digital experiences feel instant.' : `A focused part of my toolkit for building thoughtful, reliable products from the first interface to the final interaction.`}</p>
            <div className="focus-footer"><span>Comfort level</span><strong>{skills.find((skill) => skill.name === activeSkill)?.level}</strong></div>
          </div>
        </div>
      </section>

      <section className="contact-section section-frame" id="contact">
        <div className="contact-card glass-card reveal-up"><div className="contact-top"><span className="section-index">03 / OPEN CHANNEL</span><span className="contact-ping"><span /> Online for the right idea</span></div><h2>Let’s make the<br /><em>next thing useful.</em></h2><p>Have a product in mind, a system to untangle, or simply a good question? The best way to start is a direct line.</p><div className="contact-links">{contactLinks.map((link) => <a className="contact-link" href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined} key={link.label}><span className="contact-icon">{link.icon}</span><span className="contact-copy"><strong>{link.label}</strong><small>{link.detail}</small></span><ArrowIcon /></a>)}</div><p className="contact-note">Direct contact details are ready to personalize in <code>Port Flio</code>.</p></div>
      </section>

      <footer className="site-footer section-frame"><span>© {new Date().getFullYear()} Naresh Saru Magar</span><span>Built with intent <i>✦</i></span><button onClick={() => scrollTo('top')}>Back to top ↑</button></footer>
    </main>
  );
}

export default App;
