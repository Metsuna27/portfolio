import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Code2, Database, Github, Layers, Linkedin, Mail, Menu, Monitor, Server, Smartphone, X } from 'lucide-react';
import { profile, projects, skills, type Project } from './data';

const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '');

function ProfilePhoto() {
  const [failed, setFailed] = useState(false);
  return <div className="portrait-frame">
    {!failed ? <img src={asset(profile.photo)} alt="Portrait de Henintsoa Randrianandrasana" onError={() => setFailed(true)} /> :
      <div className="portrait-empty"><span>AH.</span><p>Ajoutez votre portrait dans<br /><code>public/images/profil.jpg</code></p></div>}
    <div className="portrait-corner top-left" /><div className="portrait-corner bottom-right" />
  </div>;
}

const icons = [<Server size={20} />, <Monitor size={20} />, <Smartphone size={20} />];
function ProjectCard({ project, i }: { project: Project; i: number }) {
  return <article className="work-card">
    <div className="work-top"><span className="work-number">{project.index} / PROJET</span><span className="work-icon">{icons[i] || <Code2 size={20} />}</span></div>
    <div className="work-heading"><div><span className="work-type">{project.category}</span><h3>{project.title}</h3></div><ArrowUpRight className="work-arrow" size={26} /></div>
    <p className="work-description">{project.description}</p>
    <div className="work-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
    <div className="work-insight"><strong>Mon rôle</strong><p>{project.contribution}</p><strong>Enjeu technique</strong><p>{project.challenge}</p></div>
  </article>;
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  async function copyEmail() { try { await navigator.clipboard.writeText(profile.email); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { window.location.href = `mailto:${profile.email}`; } }
  return <>
    <a href="#main" className="skip-link">Aller au contenu</a>
    <header className="site-header"><div className="wrap nav-row"><a href="#accueil" className="brand" aria-label="Accueil">AH<span>.</span><small>DEVELOPER / ARCHITECTURE</small></a>
      <nav className={menu ? 'nav-items opened' : 'nav-items'} aria-label="Navigation principale"><a onClick={() => setMenu(false)} href="#apropos">À propos</a><a onClick={() => setMenu(false)} href="#projets">Projets</a><a onClick={() => setMenu(false)} href="#competences">Expertise</a><a onClick={() => setMenu(false)} href="#parcours">Parcours</a><a onClick={() => setMenu(false)} href="#contact" className="nav-cta">Contact <ArrowUpRight size={15} /></a></nav>
      <button type="button" className="mobile-menu" onClick={() => setMenu(!menu)} aria-label={menu ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menu}>{menu ? <X /> : <Menu />}</button></div></header>
    <main id="main">
      <section className="hero-section" id="accueil"><div className="hero-grid-lines" aria-hidden="true" /><div className="wrap hero-layout">
        <div className="hero-copy"><div className="availability"><span className="availability-dot" /> Disponible pour une alternance</div><div className="hero-kicker"><span>PORTFOLIO / 2026</span><span>FULL STACK & SOFTWARE ARCHITECTURE</span></div>
          <h1>Construire des<br /><em>solutions</em><br />qui durent<span className="accent-dot">.</span></h1><p className="hero-lead">Je suis <strong>Henintsoa Randrianandrasana</strong>, développeur Full Stack et étudiant en architecture logicielle à l'ESGI. Je conçois des applications fiables, maintenables et centrées sur leurs utilisateurs.</p>
          <div className="hero-buttons"><a href="#projets" className="btn btn-primary">Découvrir mes projets <ArrowUpRight size={19} /></a><a href="#contact" className="btn btn-outline">Me contacter <ArrowRight size={18} /></a></div>
          <div className="hero-signature"><span><Code2 size={16} /> Développement web & API</span><span><Layers size={16} /> Architecture logicielle</span></div>
        </div>
        <div className="hero-right"><div className="portrait-label">01 / PRÉSENTATION</div><ProfilePhoto /><div className="portrait-caption"><span>ESGI / ÎLE-DE-FRANCE</span><span>DESIGN. CODE. STRUCTURE.</span></div><div className="hero-graphic" aria-hidden="true">ARCH<br />/ 01</div></div>
      </div><div className="wrap hero-bottom"><a href="#apropos">DÉCOUVRIR MON UNIVERS <ArrowDown size={15} /></a><span>01 — 05</span></div></section>
      <section id="apropos" className="section section-about"><div className="wrap two-column"><div><p className="section-eyebrow">01 / À PROPOS</p><h2>Penser le code.<br /><em>Concevoir l'ensemble.</em></h2></div><div className="about-body"><p>En troisième année de Bachelor Architecture Logicielle à l'ESGI, je développe des applications web et mobiles, des API REST et des solutions connectées à des bases de données relationnelles.</p><p>J'accorde autant d'importance à la structure d'une application qu'à son interface : séparation des responsabilités, qualité du code, performances et expérience utilisateur.</p><div className="about-stats"><div><strong>03</strong><span>Projets présentés</span></div><div><strong>2027</strong><span>Fin de formation</span></div><div><strong>360°</strong><span>Vision Full Stack</span></div></div></div></div></section>
      <section id="projets" className="section section-work"><div className="wrap"><div className="section-heading"><div><p className="section-eyebrow">02 / RÉALISATIONS</p><h2>Projets <em>sélectionnés.</em></h2></div><p>Des réalisations concrètes, de la conception des interfaces à l'architecture des services et des données.</p></div><div className="work-grid">{projects.map((p, i) => <ProjectCard project={p} i={i} key={p.id} />)}</div></div></section>
      <section id="competences" className="section section-skills"><div className="wrap"><div className="section-heading"><div><p className="section-eyebrow">03 / EXPERTISE</p><h2>Une approche <em>complète.</em></h2></div><p>Les outils que j'utilise pour transformer un besoin en application fonctionnelle.</p></div><div className="skills-layout">{skills.map((group, i) => <div className="skill-panel" key={group.label}><span className="skill-icon">{i === 0 ? <Code2 /> : i === 1 ? <Database /> : <Server />}</span><span className="skill-index">0{i + 1}</span><h3>{group.label}</h3><div className="skill-chips">{group.values.map(value => <span key={value}>{value}</span>)}</div></div>)}</div></div></section>
      <section id="parcours" className="section section-journey"><div className="wrap two-column"><div><p className="section-eyebrow">04 / PARCOURS</p><h2>Apprendre.<br />Créer.<br /><em>Évoluer.</em></h2></div><div className="journey-list"><div className="journey-item"><span>2024 — 2027</span><div><h3>Bachelor Architecture Logicielle</h3><p>ESGI — Conception, développement et architecture des systèmes.</p></div></div><div className="journey-item"><span>2025</span><div><h3>Support informatique — DESPII</h3><p>Support utilisateurs, résolution d'incidents, requêtes SQL et tests.</p></div></div><div className="journey-item"><span>2024</span><div><h3>Tuteur étudiant — Parkours</h3><p>Accompagnement pédagogique, transmission et communication.</p></div></div></div></div></section>
      <section id="contact" className="section section-contact"><div className="wrap"><p className="section-eyebrow">05 / CONTACT</p><h2>Construisons quelque<br /><em>chose ensemble.</em></h2><p>Je recherche une alternance en développement Full Stack, backend ou architecture logicielle.</p><div className="contact-buttons"><a className="btn btn-primary" href={`mailto:${profile.email}`}>Envoyer un email <Mail size={18} /></a><button className="btn btn-outline" onClick={copyEmail} type="button">{copied ? 'Adresse copiée' : 'Copier mon email'} {copied ? <Check size={18} /> : <Mail size={18} />}</button></div><div className="social-links"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={18} /> GitHub <ArrowUpRight size={14} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn <ArrowUpRight size={14} /></a></div></div></section>
    </main>
    <footer className="site-footer"><div className="wrap footer-row"><span className="brand">AH<span>.</span></span><p>© {new Date().getFullYear()} Henintsoa Randrianandrasana — React & TypeScript</p><a href="#accueil">Retour en haut <ArrowUpRight size={15} /></a></div></footer>
  </>;
}
