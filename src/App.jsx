import React from 'react';
import Nav from './components/layout/Nav.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import Projects, { slugOf } from './components/sections/Projects.jsx';
import ProjectDetail from './components/sections/ProjectDetail.jsx';
import Services from './components/sections/Services.jsx';
import Skills from './components/sections/Skills.jsx';
import Experience from './components/sections/Experience.jsx';
import Writing from './components/sections/Writing.jsx';
import Article from './components/sections/Article.jsx';
import Contact from './components/sections/Contact.jsx';
import ContactPage from './components/sections/ContactPage.jsx';
import { useContent } from './data/content-context.jsx';
import { services } from './data/content.jsx';
import { skills } from './data/skills.js';

/* Hash routes: ''  → the one-page portfolio
                '#/work/<slug>'   → project case study
                '#/writing/<id>'  → article
                '#/contact'       → contact page */
function parseHash() {
  if (/^#\/contact\/?$/.test(window.location.hash)) return { kind: 'contact' };
  const [, kind, id] = window.location.hash.match(/^#\/(work|writing)\/([^/?#]+)/) || [];
  return kind ? { kind, id: decodeURIComponent(id) } : { kind: 'home' };
}

export default function App() {
  const content = useContent();
  const [route, setRoute] = React.useState(parseHash);
  const pendingScroll = React.useRef(null);

  React.useEffect(() => {
    // hashchange and popstate can both fire for one navigation — only a real
    // change of route should re-run the scroll handling below
    const sync = () => {
      const next = parseHash();
      setRoute((r) => (r.kind === next.kind && r.id === next.id ? r : next));
    };
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  // new page → start at the top (or at the section a nav click asked for;
  // browser-back from a case study / article returns to its list)
  const prevKind = React.useRef(route.kind);
  React.useLayoutEffect(() => {
    const from = prevKind.current;
    prevKind.current = route.kind;
    const back = route.kind === 'home' && from !== 'home' ? from : null; // 'work' | 'writing' | 'contact' section ids
    const target = pendingScroll.current || back;
    pendingScroll.current = null;
    // 'instant' — the global scroll-behavior: smooth would otherwise animate a page swap
    if (target && target !== 'top') document.getElementById(target)?.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);

  const navigate = React.useCallback((id) => {
    if (id === 'contact') { window.location.hash = '#/contact'; return; }
    if (route.kind === 'home') {
      if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    pendingScroll.current = id;
    window.history.pushState(null, '', window.location.pathname + window.location.search);
    setRoute({ kind: 'home' });
  }, [route.kind]);

  const openProject = (slug) => { window.location.hash = `#/work/${encodeURIComponent(slug)}`; };
  const openWriting = (w) => { window.location.hash = `#/writing/${encodeURIComponent(w.id)}`; };
  const toContact = () => navigate('contact');
  const leaveContact = () => {
    pendingScroll.current = 'contact';
    window.history.pushState(null, '', window.location.pathname + window.location.search);
    setRoute({ kind: 'home' });
  };

  const status = content.hero.status;
  const links = [
    ['work', 'Work', content.projects.length],
    ['service', 'Service', services.length],
    ['skills', 'Skills', skills.length],
    ['experience', 'Experience', '1y+'],
    ['writing', 'Writing'],
    ['contact', 'Contact'],
  ];

  let page;
  if (route.kind === 'work') {
    const project = content.projects.find((p, i) => slugOf(p, i) === route.id);
    if (project) {
      page = (
        <ProjectDetail
          project={project}
          projects={content.projects}
          onBack={() => navigate('work')}
          onOpen={openProject}
          onContact={toContact}
        />
      );
    }
  } else if (route.kind === 'writing') {
    const writing = content.writings.find((w) => String(w.id) === route.id);
    if (writing) page = <Article writing={writing} onBack={() => navigate('writing')} />;
  }

  if (route.kind === 'contact') {
    return <ContactPage contact={content.contact} status={status} onBack={leaveContact} />;
  }

  return (
    <div className="site">
      <Nav links={links} onNavigate={navigate} status={status} />
      <main>
        {page || (
          <>
            <Hero hero={content.hero} contact={content.contact} onContact={toContact} />
            <About about={content.about} />
            <Projects items={content.projects} onOpen={openProject} onNavigate={navigate} contact={content.contact} />
            <Services onContact={toContact} />
            <Skills />
            <Experience items={content.experience} />
            <Writing items={content.writings} onOpen={openWriting} />
            <Contact contact={content.contact} status={status} onOpen={toContact} />
          </>
        )}
      </main>
      <Footer onNavigate={navigate} links={links} contact={content.contact} />
    </div>
  );
}
