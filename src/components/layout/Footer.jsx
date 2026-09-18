import React from 'react';
import { Container, ArrowUpRight, FitLine } from '../ui/site.jsx';
import { defaultContent, GAME_URL } from '../../data/content.jsx';
import batLogo from '../../../assets/batman-logo.webp';
import batTexture from '../../../assets/bat-texture.webp';

/* Full-screen closing section: near-black with a yellow accent, the name
   across the width and the bat emblem beneath it. */

const YELLOW = '#f5c518';

export default function Footer({ onNavigate = () => {}, links = [], contact = defaultContent.contact, name = 'ABHINAY MARRIPELLI' }) {
  const socials = [
    ['GitHub', contact.github],
    ['LinkedIn', contact.linkedin],
    ['Email', `mailto:${contact.email}`],
    ['Résumé', contact.resumeUrl],
    ['Arcade', GAME_URL],
  ].filter(([, h]) => h);

  return (
    <footer className="site relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#0c0c0d] text-white">
      <Container className="relative flex flex-1 flex-col pt-[clamp(100px,14vh,160px)]">
        <h2 className="max-w-[900px] font-wide text-[clamp(38px,6.4vw,96px)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em]">
          Let&rsquo;s build <span className="text-outline [--stroke:#f5c518]">what&rsquo;s next.</span>
        </h2>
        <a
          href={`mailto:${contact.email}`}
          className="group mt-8 inline-flex w-fit items-center gap-2 border-b border-white/25 pb-1 text-[clamp(16px,1.6vw,20px)] transition-colors hover:border-[#f5c518] hover:text-[#f5c518]"
        >
          {contact.email}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
        </a>

        <div className="mt-auto grid grid-cols-[1fr_1fr_auto] gap-10 pb-10 pt-16 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-8">
          <nav aria-label="Footer">
            <p className="mb-4 text-[12px] uppercase tracking-[0.18em]" style={{ color: YELLOW }}>Sitemap</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5">
              {links.map(([id, label]) => (
                <li key={id}>
                  <button type="button" onClick={() => onNavigate(id)} className="text-[15px] text-white/70 transition-colors hover:text-white">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mb-4 text-[12px] uppercase tracking-[0.18em]" style={{ color: YELLOW }}>Elsewhere</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5">
              {socials.map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-[15px] text-white/70 transition-colors hover:text-white">
                    {label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-end justify-end gap-3 text-[13px] text-white/45 max-md:col-span-2 max-md:flex-row max-md:justify-between max-sm:col-span-1">
            <button type="button" onClick={() => onNavigate('top')} className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
              Back to top <ArrowUpRight className="h-3 w-3 -rotate-45" />
            </button>
            <span>© {new Date().getFullYear()} Abhinay Marripelli · Hyderabad</span>
          </div>
        </div>
      </Container>

      {/* name across the full width, filled with the bat emblem's torn black-and-yellow texture */}
      <div aria-hidden="true" className="pointer-events-none select-none px-[clamp(16px,3vw,40px)] font-wide font-extrabold uppercase leading-[0.9] tracking-[-0.04em]">
        <FitLine className="bat-text" style={{ backgroundImage: `url(${batTexture})` }}>{name}</FitLine>
      </div>

      {/* bat emblem below the name */}
      <div className="flex flex-col items-center px-4 pb-[clamp(28px,4vw,56px)] pt-[clamp(28px,4vw,56px)]">
        <img
          src={batLogo}
          alt="Batman emblem"
          loading="lazy"
          className="w-[clamp(240px,34vw,520px)] select-none [filter:drop-shadow(0_0_1px_rgba(255,255,255,0.55))_drop-shadow(0_0_18px_rgba(245,197,24,0.18))]"
          draggable="false"
        />
      </div>
    </footer>
  );
}
