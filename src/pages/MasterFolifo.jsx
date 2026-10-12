import { useEffect, useState } from 'react';
import JSZip from 'jszip';

const portrait = '/assets/naresh-magar.png';
const STORAGE_KEY = 'masterportfolio-naresh-v2';

const initialPortfolio = {
  brand: { name: 'Naresh Saru Magar', mark: 'NSM/' },
  assets: { heroImage: portrait, backgroundImage: portrait },
  hero: {
    eyebrow: 'Available for meaningful builds',
    kicker: 'FULL STACK DEVELOPER · NEPAL',
    title: 'Building clear systems for complex ideas.',
    intro: 'I blend frontend craft, backend logic, and network thinking into digital experiences that feel calm, fast, and useful.',
    primaryCta: 'Let’s connect',
    secondaryCta: 'Explore my stack',
  },
  about: {
    label: 'THE SIGNAL',
    title: 'Good software is more than a collection of features.',
    body: 'It’s a thoughtful route from a real problem to a reliable, human result.',
    aside: 'From interface to infrastructure',
  },
  skills: [
    { name: 'React', type: 'Frontend', level: 'Advanced', icon: '⚛' },
    { name: 'JavaScript', type: 'Frontend', level: 'Advanced', icon: 'JS' },
    { name: 'HTML / CSS', type: 'Frontend', level: 'Advanced', icon: '</>' },
    { name: 'Python', type: 'Backend', level: 'Working', icon: 'Py' },
    { name: 'Java', type: 'Backend', level: 'Working', icon: 'Jv' },
    { name: 'C# / C', type: 'Systems', level: 'Working', icon: 'C+' },
    { name: 'Network Programming', type: 'Systems', level: 'Working', icon: '↗' },
  ],
  contact: {
    title: 'Let’s make the next thing useful.',
    body: 'Have a product in mind, a system to untangle, or simply a good question? The best way to start is a direct line.',
    whatsapp: '9779800000000',
    phone: '+977 980 000 0000',
    email: 'naresh.dev@example.com',
  },
  popup: {
    enabled: true,
    title: 'Let’s talk about your idea.',
    body: 'Tell me what you are building and I will reply with a clear next step.',
    button: 'Send a message',
  },
  customSections: [
    { id: 'field-notes', label: '04 / FIELD NOTES', title: 'A builder who stays curious.', body: 'I keep learning across interfaces, APIs, systems, and the human details that make technology feel useful.', enabled: true, button: 'Keep exploring' },
  ],
  style: {
    accent: '#8ff7d5',
    background: '#060b18',
    panel: '#0d1525',
    text: '#f4f7fa',
    muted: '#9aa6b7',
    headingSize: 5.8,
    bodySize: 15,
    radius: 18,
    motion: 'Cinematic',
  },
};

const tabs = [
  { id: 'content', label: 'Content', icon: '✦' },
  { id: 'design', label: 'Design', icon: '◌' },
  { id: 'popup', label: 'Popup', icon: '□' },
];

const clone = (value) => JSON.parse(JSON.stringify(value));
const hydrate = (raw) => ({ ...clone(initialPortfolio), ...raw, brand: { ...initialPortfolio.brand, ...(raw?.brand || {}) }, assets: { ...initialPortfolio.assets, ...(raw?.assets || {}) }, hero: { ...initialPortfolio.hero, ...(raw?.hero || {}) }, about: { ...initialPortfolio.about, ...(raw?.about || {}) }, contact: { ...initialPortfolio.contact, ...(raw?.contact || {}) }, popup: { ...initialPortfolio.popup, ...(raw?.popup || {}) }, style: { ...initialPortfolio.style, ...(raw?.style || {}) }, skills: raw?.skills?.length ? raw.skills : clone(initialPortfolio.skills), customSections: raw?.customSections || clone(initialPortfolio.customSections) });

function Arrow() { return <span className="mp-arrow">↗</span>; }

function Preview({ data, onOpenPopup, selectedSkill, setSelectedSkill, compact = false }) {
  const activeSkill = data.skills[selectedSkill] || data.skills[0];
  const contactBase = data.contact.whatsapp.replace(/\D/g, '');
  return (
    <div className={`portfolio-preview motion-${data.style.motion.toLowerCase()} ${compact ? 'is-compact' : ''}`} style={{ '--accent': data.style.accent, '--preview-bg': data.style.background, '--preview-panel': data.style.panel, '--preview-text': data.style.text, '--preview-muted': data.style.muted, '--heading-size': `${data.style.headingSize}rem`, '--body-size': `${data.style.bodySize}px`, '--radius': `${data.style.radius}px` }}>
      <div className="preview-background-image" style={{ backgroundImage: `url("${data.assets?.backgroundImage || portrait}")` }} />
      <div className="preview-aurora" />
      <div className="preview-nav"><div className="preview-brand"><span>{data.brand.mark}</span><strong>{data.brand.name}</strong></div><div className="preview-nav-links"><span>About</span><span>Stack</span><span>Contact</span></div></div>
      <section className="preview-hero">
        <div className="preview-hero-copy"><div className="preview-eyebrow"><i /> {data.hero.eyebrow}</div><div className="preview-kicker">{data.hero.kicker}</div><h1>{data.hero.title}</h1><p>{data.hero.intro}</p><div className="preview-actions"><button onClick={onOpenPopup}>{data.hero.primaryCta} <Arrow /></button><button className="preview-text-button" onClick={() => document.getElementById('preview-stack')?.scrollIntoView({ behavior: 'smooth' })}>{data.hero.secondaryCta} ↓</button></div></div>
        <div className="preview-photo-wrap"><div className="preview-orbit orbit-a" /><div className="preview-orbit orbit-b" /><img src={data.assets?.heroImage || portrait} alt={data.brand.name} /><div className="preview-photo-caption"><b>High altitude thinking.</b><small>Grounded in real-world details.</small></div></div>
      </section>
      <section className="preview-signal"><span className="preview-label">01 / {data.about.label}</span><p><strong>{data.about.title}</strong> {data.about.body}</p><small>{data.about.aside}</small></section>
      <section className="preview-stack" id="preview-stack"><div className="preview-section-heading"><div><span className="preview-label">02 / TOOLKIT</span><h2>Things I use<br /><em>to make things work.</em></h2></div><p>Curious by default. Practical by design. Comfortable between pixels, APIs, and systems.</p></div><div className="preview-skills"><div className="preview-skill-list">{data.skills.map((skill, index) => <button key={`${skill.name}-${index}`} className={activeSkill?.name === skill.name ? 'is-active' : ''} onClick={() => setSelectedSkill(index)}><small>0{index + 1}</small><span className="preview-skill-icon">{skill.icon}</span><b>{skill.name}</b><em>{skill.type}</em><Arrow /></button>)}</div><div className="preview-focus"><small>NOW EXPLORING</small><span>{activeSkill?.icon}</span><h3>{activeSkill?.name}</h3><p>A focused part of my toolkit for building thoughtful, reliable products from the first interface to the final interaction.</p><footer>Comfort level <b>{activeSkill?.level}</b></footer></div></div></section>
      {data.customSections.filter((section) => section.enabled).map((section) => <section className="preview-custom-section" key={section.id}><span className="preview-label">{section.label}</span><h2>{section.title}</h2><p>{section.body}</p>{section.button && <button>{section.button} <Arrow /></button>}</section>)}
      <section className="preview-contact"><span className="preview-label">03 / OPEN CHANNEL</span><h2>{data.contact.title}</h2><p>{data.contact.body}</p><div className="preview-contact-links"><a href={`https://wa.me/${contactBase}`} target="_blank" rel="noreferrer"><b>◌</b><span>WhatsApp<small>Start a conversation</small></span><Arrow /></a><a href={`tel:${data.contact.phone}`}><b>⌕</b><span>Phone<small>{data.contact.phone}</small></span><Arrow /></a><a href={`mailto:${data.contact.email}`}><b>@</b><span>Gmail<small>{data.contact.email}</small></span><Arrow /></a></div></section>
      <div className="preview-footer">© {new Date().getFullYear()} {data.brand.name}<span>Built with intent ✦</span></div>
    </div>
  );
}

function TextField({ label, value, onChange, multiline = false, hint }) {
  const Tag = multiline ? 'textarea' : 'input';
  return <label className="field"><span>{label}</span><Tag value={value} onChange={(event) => onChange(event.target.value)} rows={multiline ? 3 : undefined} /><small>{hint}</small></label>;
}

function ColorField({ label, value, onChange }) {
  return <label className="color-field"><span>{label}</span><input type="color" value={value} onChange={(event) => onChange(event.target.value)} /><code>{value}</code></label>;
}

function ImagePicker({ label, value, onChange, description }) {
  const readImage = (event) => { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => onChange(reader.result); reader.readAsDataURL(file); };
  return <div className="image-picker"><div className="image-picker-copy"><span>{label}</span><small>{description}</small></div><div className="image-picker-actions"><img src={value} alt="Selected upload" /><label className="upload-button">Choose image<input type="file" accept="image/*" onChange={readImage} /></label><button type="button" onClick={() => onChange(portrait)}>Reset</button></div></div>;
}

function Builder({ data, setData, activeTab, setActiveTab, onGenerate, saveStatus, onSave, selectedSkill, setSelectedSkill }) {
  const update = (group, key, value) => setData((current) => ({ ...current, [group]: { ...current[group], [key]: value } }));
  const updateSkill = (index, key, value) => setData((current) => ({ ...current, skills: current.skills.map((skill, skillIndex) => skillIndex === index ? { ...skill, [key]: value } : skill) }));
  const addSkill = () => setData((current) => ({ ...current, skills: [...current.skills, { name: 'New skill', type: 'Category', level: 'Working', icon: '✦' }] }));
  const deleteSkill = (index) => {
    setData((current) => current.skills.length <= 1 ? current : ({ ...current, skills: current.skills.filter((_, skillIndex) => skillIndex !== index) }));
    setSelectedSkill((current) => index < current ? current - 1 : current);
  };
  const addCustomSection = () => setData((current) => ({ ...current, customSections: [...current.customSections, { id: `custom-${Date.now()}`, label: `${String(current.customSections.length + 4).padStart(2, '0')} / NEW SECTION`, title: 'A new chapter of your story.', body: 'Add the detail you want visitors to know about your work, process, or experience.', enabled: true, button: 'Learn more' }] }));
  const updateCustomSection = (index, key, value) => setData((current) => ({ ...current, customSections: current.customSections.map((section, sectionIndex) => sectionIndex === index ? { ...section, [key]: value } : section) }));
  const deleteCustomSection = (index) => setData((current) => ({ ...current, customSections: current.customSections.filter((_, sectionIndex) => sectionIndex !== index) }));

  return <aside className="builder-sidebar">
    <div className="builder-sidebar-head"><div><span className="studio-label">MASTERPORTFOLIO / EDITOR</span><h2>Make it yours.</h2></div><span className="save-dot" title={saveStatus}>{saveStatus === 'Saved locally' ? '●' : '○'}</span></div>
    <div className="builder-tabs">{tabs.map((tab) => <button key={tab.id} className={activeTab === tab.id ? 'is-active' : ''} onClick={() => setActiveTab(tab.id)}><span>{tab.icon}</span>{tab.label}</button>)}</div>
    <div className="builder-scroll">
      {activeTab === 'content' && <>
        <div className="panel-intro"><span>01</span><div><b>Portfolio content</b><small>Change words, contact links, and skills. The preview updates as you type.</small></div></div>
        <div className="editor-group"><h3>Brand & hero</h3><TextField label="Your name" value={data.brand.name} onChange={(value) => update('brand', 'name', value)} /><TextField label="Small label" value={data.hero.eyebrow} onChange={(value) => update('hero', 'eyebrow', value)} /><TextField label="Kicker / role" value={data.hero.kicker} onChange={(value) => update('hero', 'kicker', value)} /><TextField label="Hero headline" value={data.hero.title} onChange={(value) => update('hero', 'title', value)} multiline /><TextField label="Intro paragraph" value={data.hero.intro} onChange={(value) => update('hero', 'intro', value)} multiline /><div className="two-fields"><TextField label="Primary button" value={data.hero.primaryCta} onChange={(value) => update('hero', 'primaryCta', value)} /><TextField label="Second button" value={data.hero.secondaryCta} onChange={(value) => update('hero', 'secondaryCta', value)} /></div></div>
        <div className="editor-group"><h3>About signal</h3><TextField label="Section label" value={data.about.label} onChange={(value) => update('about', 'label', value)} /><TextField label="About headline" value={data.about.title} onChange={(value) => update('about', 'title', value)} multiline /><TextField label="About detail" value={data.about.body} onChange={(value) => update('about', 'body', value)} multiline /><TextField label="Side note" value={data.about.aside} onChange={(value) => update('about', 'aside', value)} /></div>
        <div className="editor-group"><div className="group-heading"><h3>Skills</h3><button className="mini-action" onClick={addSkill}>+ Add</button></div>{data.skills.map((skill, index) => <div className="skill-editor" key={`${index}-${skill.name}`}><div className="skill-editor-title"><span>0{index + 1}</span><b>{skill.name}</b><button onClick={() => deleteSkill(index)} aria-label={`Delete ${skill.name}`}>×</button></div><div className="two-fields"><TextField label="Name" value={skill.name} onChange={(value) => updateSkill(index, 'name', value)} /><TextField label="Type" value={skill.type} onChange={(value) => updateSkill(index, 'type', value)} /></div><div className="two-fields"><TextField label="Level" value={skill.level} onChange={(value) => updateSkill(index, 'level', value)} /><TextField label="Icon" value={skill.icon} onChange={(value) => updateSkill(index, 'icon', value)} /></div></div>)}</div>
        <div className="editor-group"><div className="group-heading"><h3>Custom sections</h3><button className="mini-action" onClick={addCustomSection}>+ Add section</button></div><p className="editor-help">Create your own section for projects, education, services, testimonials, or anything else.</p>{data.customSections.map((section, index) => <div className="custom-editor" key={section.id}><div className="skill-editor-title"><span>0{index + 4}</span><b>{section.title}</b><button onClick={() => deleteCustomSection(index)} aria-label="Delete custom section">×</button></div><label className="toggle-field compact-toggle"><span><b>Show section</b></span><input type="checkbox" checked={section.enabled} onChange={(event) => updateCustomSection(index, 'enabled', event.target.checked)} /></label><TextField label="Label" value={section.label} onChange={(value) => updateCustomSection(index, 'label', value)} /><TextField label="Section title" value={section.title} onChange={(value) => updateCustomSection(index, 'title', value)} /><TextField label="Section detail" value={section.body} onChange={(value) => updateCustomSection(index, 'body', value)} multiline /><TextField label="Button text" value={section.button} onChange={(value) => updateCustomSection(index, 'button', value)} /></div>)}</div>
        <div className="editor-group"><h3>Contact links</h3><TextField label="WhatsApp number" value={data.contact.whatsapp} onChange={(value) => update('contact', 'whatsapp', value)} hint="Country code first, no spaces." /><TextField label="Phone display" value={data.contact.phone} onChange={(value) => update('contact', 'phone', value)} /><TextField label="Gmail address" value={data.contact.email} onChange={(value) => update('contact', 'email', value)} /></div>
      </>}
      {activeTab === 'design' && <><div className="panel-intro"><span>02</span><div><b>Visual direction</b><small>Pick photos, colors, scale, corner shape, and motion. No CSS knowledge needed.</small></div></div><div className="editor-group"><h3>Photo studio</h3><ImagePicker label="Hero photo" value={data.assets.heroImage} onChange={(value) => update('assets', 'heroImage', value)} description="The main portrait or image in your hero." /><ImagePicker label="Background photo" value={data.assets.backgroundImage} onChange={(value) => update('assets', 'backgroundImage', value)} description="The full-page image behind your glass panels." /></div><div className="editor-group"><h3>Color system</h3><ColorField label="Accent color" value={data.style.accent} onChange={(value) => update('style', 'accent', value)} /><ColorField label="Background" value={data.style.background} onChange={(value) => update('style', 'background', value)} /><ColorField label="Glass panel" value={data.style.panel} onChange={(value) => update('style', 'panel', value)} /><ColorField label="Main text" value={data.style.text} onChange={(value) => update('style', 'text', value)} /><ColorField label="Muted text" value={data.style.muted} onChange={(value) => update('style', 'muted', value)} /></div><div className="editor-group"><h3>Typography & shape</h3><label className="range-field"><span>Heading size <b>{data.style.headingSize}rem</b></span><input type="range" min="3.2" max="7" step="0.1" value={data.style.headingSize} onChange={(event) => update('style', 'headingSize', Number(event.target.value))} /></label><label className="range-field"><span>Body size <b>{data.style.bodySize}px</b></span><input type="range" min="12" max="21" step="1" value={data.style.bodySize} onChange={(event) => update('style', 'bodySize', Number(event.target.value))} /></label><label className="range-field"><span>Corner roundness <b>{data.style.radius}px</b></span><input type="range" min="0" max="36" step="1" value={data.style.radius} onChange={(event) => update('style', 'radius', Number(event.target.value))} /></label><label className="select-field"><span>Animation mood</span><select value={data.style.motion} onChange={(event) => update('style', 'motion', event.target.value)}><option>Cinematic</option><option>Subtle</option><option>Playful</option><option>Still</option></select></label></div><div className="design-preview"><span style={{ background: data.style.accent }} /><span style={{ background: data.style.background }} /><span style={{ background: data.style.panel }} /><span style={{ background: data.style.text }} /><b>{data.style.motion} motion</b></div></>}
      {activeTab === 'popup' && <><div className="panel-intro"><span>03</span><div><b>Popup & actions</b><small>Control the message that appears when visitors choose your main call-to-action.</small></div></div><div className="editor-group"><label className="toggle-field"><span><b>Enable contact popup</b><small>Show a friendly message before visitors choose a channel.</small></span><input type="checkbox" checked={data.popup.enabled} onChange={(event) => update('popup', 'enabled', event.target.checked)} /></label><TextField label="Popup heading" value={data.popup.title} onChange={(value) => update('popup', 'title', value)} /><TextField label="Popup message" value={data.popup.body} onChange={(value) => update('popup', 'body', value)} multiline /><TextField label="Popup button" value={data.popup.button} onChange={(value) => update('popup', 'button', value)} /></div><div className="popup-tip"><span>⌁</span><div><b>Live interaction</b><small>Click “Let’s connect” in the preview to test this popup.</small></div></div></>}
    </div>
    <div className="builder-actions"><button className="save-button" onClick={onSave}>↥ {saveStatus === 'Saving…' ? 'Saving' : 'Save portfolio'}</button><button className="generate-button" onClick={onGenerate}>Generate React code <Arrow /></button></div>
  </aside>;
}

const generatedApp = () => `import { useState } from 'react';
import portfolio from './portfolio.json';
import './styles.css';

const image = portfolio.assets.heroImage || '/assets/naresh-magar.png';

export default function App() {
  const [popupOpen, setPopupOpen] = useState(false);
  const wa = portfolio.contact.whatsapp.replace(/\\D/g, '');
  return <main className={'site motion-' + portfolio.style.motion.toLowerCase()} style={{ '--accent': portfolio.style.accent, '--background': portfolio.style.background, '--background-image': 'url(' + portfolio.assets.backgroundImage + ')', '--panel': portfolio.style.panel, '--text': portfolio.style.text, '--muted': portfolio.style.muted, '--body-size': portfolio.style.bodySize + 'px', '--heading-size': portfolio.style.headingSize + 'rem', '--radius': portfolio.style.radius + 'px' }}>
    <header><strong>{portfolio.brand.mark} {portfolio.brand.name}</strong><nav><a href="#about">About</a><a href="#stack">Stack</a><a href="#contact">Contact</a></nav></header>
    <section className="hero"><div><small>{portfolio.hero.eyebrow}</small><p className="kicker">{portfolio.hero.kicker}</p><h1>{portfolio.hero.title}</h1><p>{portfolio.hero.intro}</p><div className="hero-actions"><button onClick={() => setPopupOpen(true)}>{portfolio.hero.primaryCta} ↗</button><a className="secondary" href="#stack">{portfolio.hero.secondaryCta} ↓</a></div></div><img className="portrait" src={image} alt={portfolio.brand.name} /></section>
    <section id="about" className="signal"><small>{portfolio.about.label}</small><p><b>{portfolio.about.title}</b> {portfolio.about.body}</p></section>
    {portfolio.customSections.filter((section) => section.enabled).map((section) => <section className="custom" key={section.id}><small>{section.label}</small><h2>{section.title}</h2><p>{section.body}</p>{section.button && <a className="secondary" href="#contact">{section.button} ↗</a>}</section>)}
    <section id="stack"><small>02 / TOOLKIT</small><h2>Things I use<br /><em>to make things work.</em></h2><div className="skills">{portfolio.skills.map((skill) => <article key={skill.name}><span>{skill.icon}</span><b>{skill.name}</b><small>{skill.type} · {skill.level}</small></article>)}</div></section>
    <section id="contact" className="contact"><small>03 / OPEN CHANNEL</small><h2>{portfolio.contact.title}</h2><p>{portfolio.contact.body}</p><div className="links"><a href={'https://wa.me/' + wa}>WhatsApp</a><a href={'tel:' + portfolio.contact.phone}>Phone</a><a href={'mailto:' + portfolio.contact.email}>Gmail</a></div></section>
    {popupOpen && portfolio.popup.enabled && <div className="modal-backdrop" onClick={() => setPopupOpen(false)}><div className="modal" onClick={(event) => event.stopPropagation()}><button className="close" onClick={() => setPopupOpen(false)}>×</button><small>OPEN CHANNEL</small><h3>{portfolio.popup.title}</h3><p>{portfolio.popup.body}</p><a href={'mailto:' + portfolio.contact.email}>{portfolio.popup.button} ↗</a></div></div>}
  </main>;
}
`;

const generatedStyles = `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Space+Grotesk:wght@400;500;600&display=swap');\n*{box-sizing:border-box}body{margin:0;background:var(--background);color:var(--text);font-family:'Space Grotesk',sans-serif}a{color:inherit;text-decoration:none}.site{min-height:100vh;padding:32px clamp(22px,6vw,84px);background-color:var(--background);background-image:linear-gradient(125deg,rgba(7,16,30,.58),rgba(3,8,16,.82)),radial-gradient(circle at 80% 10%,color-mix(in srgb,var(--accent),transparent 86%),transparent 28rem),var(--background-image);background-size:cover;background-attachment:fixed}header{display:flex;justify-content:space-between;align-items:center;max-width:1180px;margin:auto}header strong{font-family:'JetBrains Mono',monospace;color:var(--accent)}nav{display:flex;gap:28px;font:12px 'JetBrains Mono',monospace;color:var(--muted)}section{max-width:1180px;margin:0 auto;padding:120px 0}small{font:10px 'JetBrains Mono',monospace;color:var(--accent);letter-spacing:.14em;text-transform:uppercase}.hero{min-height:730px;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}.kicker{font:11px 'JetBrains Mono',monospace;color:var(--muted);letter-spacing:.12em}.hero h1{font-size:clamp(3.1rem,7vw,var(--heading-size,6.8rem));line-height:.93;letter-spacing:-.07em;max-width:700px}.hero h1,.hero h2{font-weight:500}.signal p,.contact p{font-size:var(--body-size,15px)}.hero p{color:var(--muted);font-size:var(--body-size,15px);line-height:1.7;max-width:520px}.hero-actions{display:flex;align-items:center;gap:18px;flex-wrap:wrap}.hero button,.modal a{border:0;border-radius:99px;background:var(--accent);color:var(--background);padding:15px 22px;font-weight:600;cursor:pointer}.hero .secondary{padding:9px 0;border-bottom:1px solid color-mix(in srgb,var(--text),transparent 70%);font-size:12px}.portrait{justify-self:center;width:min(100%,470px);aspect-ratio:1;object-fit:cover;border-radius:50%;border:1px solid var(--accent);box-shadow:0 0 90px color-mix(in srgb,var(--accent),transparent 78%);animation:genFloat 7s ease-in-out infinite}.motion-still *{animation:none!important;transition:none!important}.motion-subtle .portrait{animation-duration:18s}.motion-playful .portrait{animation-duration:4s}@keyframes genFloat{0%,100%{transform:rotate(0) translateY(0)}50%{transform:rotate(3deg) translateY(-10px)}}.signal{border-top:1px solid color-mix(in srgb,var(--text),transparent 82%);border-bottom:1px solid color-mix(in srgb,var(--text),transparent 82%);display:grid;grid-template-columns:180px 1fr;gap:34px}.signal p{font-size:clamp(1.2rem,3vw,calc(var(--body-size,15px) * 1.45));line-height:1.35}.signal b{font-weight:500}.skills{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-top:40px}.skills article,.contact,.modal{border:1px solid color-mix(in srgb,var(--text),transparent 80%);background:color-mix(in srgb,var(--panel),transparent 20%);padding:23px;border-radius:var(--radius,18px)}.skills article span{display:grid;place-items:center;width:35px;height:35px;border:1px solid var(--accent);border-radius:9px;color:var(--accent)}.skills article b,.skills article small{display:block;margin-top:22px}.skills article small{margin-top:7px;color:var(--muted)}.custom h2,.contact h2{font-size:clamp(2.7rem,6vw,calc(var(--heading-size,6rem) * .85));line-height:.96;max-width:700px}.contact p{color:var(--muted);max-width:500px;line-height:1.7}.custom{border-top:1px solid color-mix(in srgb,var(--text),transparent 82%);padding-top:86px}.custom h2{max-width:700px;line-height:.96;letter-spacing:-.06em;font-weight:500}.custom p{max-width:560px;color:var(--muted);font-size:var(--body-size,15px);line-height:1.7}.custom .secondary{display:inline-block;margin-top:12px;color:var(--accent);border-bottom:1px solid var(--accent);padding-bottom:5px}.links{display:flex;gap:12px;flex-wrap:wrap;margin-top:34px}.links a{padding:14px 20px;border:1px solid var(--accent);border-radius:99px;color:var(--accent)}.modal-backdrop{position:fixed;inset:0;display:grid;place-items:center;padding:24px;background:rgba(0,0,0,.68);backdrop-filter:blur(12px)}.modal{position:relative;max-width:460px}.modal h3{font-size:2.5rem;line-height:1;margin-top:28px}.modal p{color:var(--muted);line-height:1.7}.close{position:absolute;top:15px;right:15px;border:0;background:none;color:var(--text);font-size:25px;cursor:pointer}@media(max-width:700px){.hero{grid-template-columns:1fr;padding-top:90px}.portrait{width:75vw}nav{display:none}.signal{grid-template-columns:1fr;gap:12px}section{padding:80px 0}}`;

async function createZip(data) {
  const zip = new JSZip();
  zip.file('package.json', JSON.stringify({ name: 'naresh-portfolio-generated', private: true, version: '1.0.0', type: 'module', scripts: { dev: 'vite', build: 'vite build', preview: 'vite preview' }, dependencies: { '@vitejs/plugin-react': 'latest', vite: 'latest', react: 'latest', 'react-dom': 'latest' }, devDependencies: {} }, null, 2));
  zip.file('index.html', '<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Naresh Saru Magar</title></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>');
  zip.file('src/App.jsx', generatedApp());
  zip.file('src/main.jsx', "import { StrictMode } from 'react'; import { createRoot } from 'react-dom/client'; import App from './App.jsx'; import './styles.css'; createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);");
  zip.file('src/styles.css', generatedStyles);
  const exportData = clone(data);
  exportData.assets = { heroImage: '/assets/hero-photo.png', backgroundImage: '/assets/background-photo.png' };
  zip.file('src/portfolio.json', JSON.stringify(exportData, null, 2));
  zip.file('vite.config.js', "import { defineConfig } from 'vite'; import react from '@vitejs/plugin-react'; export default defineConfig({ plugins: [react()] });\n");
  zip.file('netlify.toml', '[build]\n  command = "npm run build"\n  publish = "dist"\n');
  zip.file('README.md', '# Generated Portfolio\n\nRun `npm install`, then `npm run dev`. To deploy on Netlify, connect this folder and use the included `netlify.toml`.\n');
  const addImage = async (source, target) => {
    try {
      if (typeof source === 'string' && source.startsWith('data:')) {
        const base64 = source.split(',')[1];
        const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
        zip.file(target, bytes);
      } else {
        const response = await fetch(source);
        if (!response.ok) throw new Error('image fetch failed');
        zip.file(target, await response.arrayBuffer());
      }
      return true;
    } catch { return false; }
  };
  const heroIncluded = await addImage(data.assets?.heroImage || portrait, 'public/assets/hero-photo.png');
  const backgroundIncluded = await addImage(data.assets?.backgroundImage || portrait, 'public/assets/background-photo.png');
  const fallbackIncluded = await addImage(portrait, 'public/assets/naresh-magar.png');
  if (!heroIncluded) exportData.assets.heroImage = '/assets/naresh-magar.png';
  if (!backgroundIncluded) exportData.assets.backgroundImage = '/assets/naresh-magar.png';
  zip.file('src/portfolio.json', JSON.stringify(exportData, null, 2));
  return { blob: await zip.generateAsync({ type: 'blob' }), imageIncluded: heroIncluded && backgroundIncluded && fallbackIncluded };
}

function MasterPortfolio() {
  const [data, setData] = useState(() => { try { return hydrate(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}); } catch { return clone(initialPortfolio); } });
  const [activeTab, setActiveTab] = useState('content');
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [generatedOpen, setGeneratedOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Saved locally');
  const [builderOpen, setBuilderOpen] = useState(true);
  const [assetWarning, setAssetWarning] = useState(false);

  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); setSaveStatus('Saved locally'); } catch { setSaveStatus('Browser storage blocked'); } }, [data]);
  useEffect(() => { setSelectedSkill((current) => Math.max(0, Math.min(current, Math.max(0, data.skills.length - 1)))); }, [data.skills.length]);
  useEffect(() => { let stored = ''; try { stored = localStorage.getItem(STORAGE_KEY) || ''; } catch {} if (stored && stored !== JSON.stringify(initialPortfolio)) return; fetch('/api/portfolio/naresh').then((response) => response.ok ? response.json() : null).then((remote) => remote && setData(hydrate(remote))).catch(() => {}); }, []);
  const savePortfolio = async () => {
    setSaveStatus('Saving…');
    try { const response = await fetch('/api/portfolio/naresh', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); if (!response.ok) throw new Error('API unavailable'); setSaveStatus('Saved to MySQL'); } catch { setSaveStatus('Saved locally'); }
  };

  const generate = async () => { setIsGenerating(true); const result = await createZip(data); const url = URL.createObjectURL(result.blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'naresh-portfolio-netlify.zip'; anchor.click(); URL.revokeObjectURL(url); setAssetWarning(!result.imageIncluded); setIsGenerating(false); setGeneratedOpen(true); };
  const reset = () => { if (window.confirm('Reset all editor changes to the starter portfolio?')) setData(clone(initialPortfolio)); };

  return <div className="master-app">
    <header className="master-header"><div className="master-brand"><span className="master-mark">MP<span>/</span></span><div><b>MasterPortfolio</b><small>Visual portfolio builder</small></div></div><div className="master-header-actions"><span className="autosave"><i /> {saveStatus}</span><button className="header-button" onClick={reset}>Reset</button><button className="header-button preview-button" onClick={() => setBuilderOpen(!builderOpen)}>{builderOpen ? 'Focus preview' : 'Open editor'}</button></div></header>
    <main className={`studio-layout ${builderOpen ? '' : 'preview-only'}`}>
      {builderOpen && <Builder data={data} setData={setData} activeTab={activeTab} setActiveTab={setActiveTab} onGenerate={generate} saveStatus={saveStatus} onSave={savePortfolio} selectedSkill={selectedSkill} setSelectedSkill={setSelectedSkill} />}
      <section className="preview-workspace"><div className="workspace-top"><div><span className="studio-label">LIVE CANVAS</span><h1>Preview your portfolio as visitors see it.</h1></div><div className="canvas-actions"><span className="device-pill">Desktop <b>◉</b> Mobile <b>▯</b></span><button onClick={() => setPopupOpen(true)}>Test popup ↗</button></div></div><div className="canvas-wrap"><Preview data={data} onOpenPopup={() => data.popup.enabled && setPopupOpen(true)} selectedSkill={selectedSkill} setSelectedSkill={setSelectedSkill} /></div></section>
    </main>
    {popupOpen && data.popup.enabled && <div className="master-modal-backdrop" onClick={() => setPopupOpen(false)}><div className="master-modal" onClick={(event) => event.stopPropagation()}><button className="master-close" onClick={() => setPopupOpen(false)}>×</button><span className="studio-label">OPEN CHANNEL</span><h2>{data.popup.title}</h2><p>{data.popup.body}</p><a href={`mailto:${data.contact.email}?subject=Hello%20Naresh`}>{data.popup.button} <Arrow /></a></div></div>}
    {generatedOpen && <div className="master-modal-backdrop" onClick={() => setGeneratedOpen(false)}><div className="master-modal success-modal" onClick={(event) => event.stopPropagation()}><button className="master-close" onClick={() => setGeneratedOpen(false)}>×</button><span className="success-icon">✓</span><span className="studio-label">CODE READY</span><h2>Your Netlify-ready ZIP is downloaded.</h2><p>It includes a clean React + Vite app, your saved content, the supplied photo, `netlify.toml`, and responsive styles. Run <code>npm install</code> then <code>npm run build</code>.{assetWarning ? ' The ZIP was created, but the portrait asset could not be fetched in this browser session.' : ''}</p><button className="generate-button" onClick={() => setGeneratedOpen(false)}>Keep editing</button></div></div>}
  </div>;
}

export default MasterPortfolio;
