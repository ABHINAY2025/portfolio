import React from 'react';
import { Container, SectionTitle, Reveal } from '../ui/site.jsx';
import { defaultContent, certifications as defaultCerts } from '../../data/content.jsx';
import { skillSrc } from '../../data/skills.js';

/* Dark timeline. On pointer devices a small card trails the cursor over the
   hovered row with its summary and tools; on touch the summary shows inline. */
export default function Experience({ items = defaultContent.experience, certifications = defaultCerts }) {
  const [hover, setHover] = React.useState(null);
  const card = React.useRef(null);
  const pos = React.useRef({ x: 0, y: 0 });

  const onMove = (e) => {
    pos.current = { x: e.clientX, y: e.clientY };
    if (card.current) card.current.style.transform = `translate3d(${e.clientX + 24}px, ${e.clientY - 60}px, 0)`;
  };

  const active = hover != null ? items[hover] : null;

  return (
    <section id="experience" className="site relative bg-graphite py-[clamp(90px,12vw,160px)] text-white">
      <Container>
        <SectionTitle ghost="EXPERIENCE" dark meta="1.2+ years of experience">EXPERIENCE</SectionTitle>

        <ul onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
          {items.map((it, i) => (
            <Reveal
              as="li"
              key={`${it.org}-${i}`}
              delay={i * 70}
              onMouseEnter={() => setHover(i)}
              className="group border-b border-white/10 first:border-t"
            >
              <div className="flex items-center justify-between gap-6 px-1 py-6 transition-[padding] duration-500 group-hover:px-4 max-sm:flex-col max-sm:items-start max-sm:gap-2">
                <div className="min-w-0">
                  <h3 className="text-[clamp(17px,1.6vw,21px)] font-semibold tracking-tight transition-colors">{it.org || it.title}</h3>
                  <p className="mt-1 text-[14px] text-white/50 transition-colors group-hover:text-white/70">{it.org ? it.title : ''}</p>
                  {it.copy && <p className="mt-2 max-w-[560px] text-[13.5px] leading-relaxed text-white/45 md:hidden">{it.copy}</p>}
                </div>
                <span className="shrink-0 text-[14px] tabular-nums text-white/55 transition-colors group-hover:text-white">
                  {it.period || ''}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>

        {certifications?.length > 0 && (
          <div className="mt-[clamp(64px,8vw,110px)]">
            <Reveal className="mb-6 text-[13px] font-medium uppercase tracking-[0.2em] text-white/45">( Certifications )</Reveal>
            <ul className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {certifications.map((c, i) => (
                <Reveal
                  as="li"
                  key={c.name}
                  delay={i * 80}
                  className="flex min-h-[132px] flex-col justify-between rounded-[20px] border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06]"
                >
                  <span className="text-[12px] uppercase tracking-[0.14em] text-white/40">{c.by}</span>
                  <span className="text-[16px] font-semibold leading-snug tracking-tight">{c.name}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        )}
      </Container>

      {/* cursor-trailing detail card (pointer devices only) */}
      <div
        ref={card}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 max-md:hidden"
        style={{ transform: `translate3d(${pos.current.x + 24}px, ${pos.current.y - 60}px, 0)` }}
      >
        <div
          className={`w-[300px] origin-top-left rounded-[20px] bg-white p-5 text-carbon shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] transition-all duration-300 ${
            active ? 'rotate-[-3deg] scale-100 opacity-100' : 'rotate-0 scale-75 opacity-0'
          }`}
        >
          {active && (
            <>
              <p className="text-[13.5px] leading-relaxed text-carbon/75">{active.copy}</p>
              {active.tools?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {active.tools.map((t) => (
                    <span key={t} className="grid h-9 w-9 place-items-center rounded-xl bg-paper">
                      <img src={skillSrc(t)} alt="" className="h-5 w-5 object-contain" />
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
