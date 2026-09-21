import React from 'react';
import { Container, ArrowUpRight } from '../ui/site.jsx';
import { defaultContent, GAME_URL } from '../../data/content.jsx';
import footerPortrait from '../../../assets/abhinay-footer.webp';

/* Full-screen closing section. The background is the same studio grey as the
   portrait's backdrop (sampled from the photo), so the black-and-white portrait
   on the right melts into it; the text sits on the left. */

const INK = '#121212';
const BACKDROP = 'linear-gradient(180deg, #5d5d5d 0%, #6a6a6a 30%, #686868 60%, #626262 100%)';

export default function Footer({ onNavigate = () => {}, links = [], contact = defaultContent.contact }) {
  const socials = [
    ['GitHub', contact.github],
    ['LinkedIn', contact.linkedin],
    ['Email', `mailto:${contact.email}`],
    ['Résumé', contact.resumeUrl],
    ['Arcade', GAME_URL],
  ].filter(([, h]) => h);

  return (
    <footer className="site relative isolate flex min-h-[100svh] flex-col overflow-hidden" style={{ background: BACKDROP, color: INK }}>
      <img
        src={footerPortrait}
        alt="Abhinay Marripelli"
        loading="lazy"
        draggable="false"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 h-full w-auto max-w-[56%] select-none object-cover object-[40%_center] max-lg:max-w-[78%] max-lg:opacity-25"
      />

      <Container className="relative z-10 flex flex-1 flex-col pt-[clamp(100px,14vh,160px)]">
        <h2 className="max-w-[min(620px,52vw)] font-wide text-[clamp(38px,5.6vw,88px)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em] max-lg:max-w-none">
          Let&rsquo;s build <span className="text-outline [--stroke:#f7f7f7]">what&rsquo;s next.</span>
        </h2>
        <a
          href={`mailto:${contact.email}`}
          className="group mt-8 inline-flex w-fit items-center gap-2 border-b pb-1 text-[clamp(16px,1.6vw,20px)] transition-colors hover:border-white hover:text-white"
          style={{ borderColor: 'rgba(18,18,18,0.35)' }}
        >
          {contact.email}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
        </a>

        <div className="mt-auto grid max-w-[min(620px,54vw)] grid-cols-[1fr_1fr] gap-10 pb-8 pt-16 max-lg:max-w-none max-sm:grid-cols-1 max-sm:gap-8">
          <nav aria-label="Footer">
            <p className="mb-4 text-[12px] uppercase tracking-[0.18em] opacity-60">Sitemap</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5">
              {links.map(([id, label]) => (
                <li key={id}>
                  <button type="button" onClick={() => onNavigate(id)} className="text-[15px] opacity-80 transition-opacity hover:opacity-100">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mb-4 text-[12px] uppercase tracking-[0.18em] opacity-60">Elsewhere</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5">
              {socials.map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-[15px] opacity-80 transition-opacity hover:opacity-100">
                    {label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 flex flex-wrap items-center justify-between gap-4 border-t pt-5 text-[13px] opacity-60 max-sm:col-span-1" style={{ borderColor: 'rgba(18,18,18,0.18)' }}>
            <span>© {new Date().getFullYear()} Abhinay Marripelli · Hyderabad, India</span>
            <button type="button" onClick={() => onNavigate('top')} className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-100">
              Back to top <ArrowUpRight className="h-3 w-3 -rotate-45" />
            </button>
          </div>
        </div>
      </Container>

    </footer>
  );
}
