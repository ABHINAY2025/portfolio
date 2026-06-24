import React from 'react';
import StatusBar from './components/layout/StatusBar.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import Projects from './components/sections/Projects.jsx';
import Stack from './components/sections/Stack.jsx';
import About from './components/sections/About.jsx';
import Experience from './components/sections/Experience.jsx';
import Values from './components/sections/Values.jsx';
import Writing from './components/sections/Writing.jsx';
import Article from './components/sections/Article.jsx';
import Resume from './components/sections/Resume.jsx';
import Contact from './components/sections/Contact.jsx';
import Game from './components/widgets/Game.jsx';
import Konami from './components/widgets/Konami.jsx';
import { useContent } from './data/content-context.jsx';

export default function App() {
  const content = useContent();
  const [view, setView] = React.useState('home');
  const [activeWriting, setActiveWriting] = React.useState(null);

  // every view navigates instantly — no page transitions
  const go = React.useCallback((v) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  // open a specific writing in the Article view
  const openWriting = React.useCallback((w) => {
    setActiveWriting(w);
    go('article');
  }, [go]);

  // each themed view swaps the page chrome (statusbar + header) to match
  const theme = view === 'about' ? 'navy' : null;

  return (
    <>
      {view === 'home' ? (
        <div className="flex min-h-screen flex-col">
          <StatusBar />
          <Header view={view} go={go} />
          <Hero go={go} hero={content.hero} />
        </div>
      ) : (
        <>
          <StatusBar theme={theme} />
          <Header view={view} go={go} theme={theme} />
        </>
      )}

      <main className="relative z-[1]">
        {view === 'home' && <Projects items={content.projects} />}

        {view === 'about' && (
          <>
            <About go={go} about={content.about} />
            <Experience items={content.experience} />
            <Values />
          </>
        )}

        {view === 'work' && <Projects items={content.projects} />}
        {view === 'stack' && <Stack items={content.stack} />}
        {view === 'game' && <Game />}
        {view === 'writing' && <Writing go={go} onOpen={openWriting} items={content.writings} />}
        {view === 'article' && <Article go={go} writing={activeWriting} />}
        {view === 'resume' && <Resume go={go} contact={content.contact} />}
        {view === 'contact' && <Contact contact={content.contact} />}
      </main>

      <Footer go={go} contact={content.contact} />

      <Konami />
    </>
  );
}
