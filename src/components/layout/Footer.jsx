import React from 'react';
import Shell from '../ui/Shell.jsx';
import {
  IconGithub, IconTwitter, IconDiscord, IconLinkedin, IconYoutube,
} from '../ui/Icons.jsx';
import { defaultContent } from '../../data/content.jsx';

const wordColors = [
  'text-purple', 'text-yellow', 'text-coral', 'text-green', 'text-blue', 'text-coral', 'text-purple',
];
const wordLetters = ['A', 'B', 'H', 'I', 'N', 'A', 'Y_MA'];

const sbtn =
  'w-9 h-9 grid place-items-center border-[3px] border-cream text-cream transition ' +
  'hover:bg-cream hover:text-ink hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--color-purple)]';

const colLink = 'font-mono text-[13.5px] text-cream/85 hover:text-yellow hover:opacity-100 transition';

export default function Footer({ go, contact = defaultContent.contact }) {
  const tab = (id) => (e) => { e.preventDefault(); go(id); };

  return (
    <footer className="relative bg-ink text-cream pt-[70px] pb-[30px] border-t-[3px] border-ink">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,247,241,0.05) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />
      <Shell>
        <div className="relative z-[1] grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-11 max-[880px]:grid-cols-2">
          <div className="flex flex-col gap-4">
            <span className="font-pixel text-[22px] lowercase whitespace-nowrap" aria-label="ABHINAY_MA">
              {wordLetters.map((ch, i) => (
                <span key={i} className={wordColors[i]}>{ch}</span>
              ))}
            </span>
            <p className="font-mono text-sm text-mint max-w-[320px] leading-relaxed">
              Full-stack developer · AI enthusiast · microservices. Building human-centred
              products, one pixel and one endpoint at a time.
            </p>
            <div className="flex gap-2.5">
              <a className={sbtn} href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><IconGithub /></a>
              <a className={sbtn} href={`mailto:${contact.email}`} aria-label="Email"><IconTwitter /></a>
              <a className={sbtn} href="#" aria-label="Discord"><IconDiscord /></a>
              <a className={sbtn} href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><IconLinkedin /></a>
              <a className={sbtn} href="#" aria-label="YouTube"><IconYoutube /></a>
            </div>
          </div>

          <div>
            <h4 className="font-pixel text-[10px] tracking-[0.14em] text-yellow mb-4">EXPLORE</h4>
            <ul className="flex flex-col gap-2.5">
              <li><a className={colLink} href="#home" onClick={tab('home')}>Home</a></li>
              <li><a className={colLink} href="#about" onClick={tab('about')}>About</a></li>
              <li><a className={colLink} href="#work" onClick={tab('work')}>Work</a></li>
              <li><a className={colLink} href="#stack" onClick={tab('stack')}>Stack</a></li>
              <li><a className={colLink} href="#writing" onClick={tab('writing')}>Writing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-pixel text-[10px] tracking-[0.14em] text-yellow mb-4">PROJECTS</h4>
            <ul className="flex flex-col gap-2.5">
              <li><a className={colLink} href="#work" onClick={tab('work')}>AR Structure Viewer</a></li>
              <li><a className={colLink} href="#work" onClick={tab('work')}>Smart Invoice Maker</a></li>
              <li><a className={colLink} href="#work" onClick={tab('work')}>BOLT Run Tracker</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-pixel text-[10px] tracking-[0.14em] text-yellow mb-4">CONNECT</h4>
            <ul className="flex flex-col gap-2.5">
              <li><a className={colLink} href={`mailto:${contact.email}`}>Email me</a></li>
              <li><a className={colLink} href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a className={colLink} href={contact.fisec} target="_blank" rel="noopener noreferrer">FISEC Global</a></li>
              <li><a className={colLink} href="#resume" onClick={tab('resume')}>Resume</a></li>
              <li><a className={colLink} href="#contact" onClick={tab('contact')}>Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="relative z-[1] mt-12 pt-[22px] border-t-2 border-dashed border-cream/20 flex flex-wrap items-center justify-between gap-3.5 font-pixel text-[9px] tracking-[0.12em] text-mint">
          <span>© 2026 ABHINAY_MA — built with ♥ + pixels.</span>
          <span>v1.0 · Press ↑↑↓↓←→←→MA for cheats</span>
        </div>
      </Shell>
    </footer>
  );
}
