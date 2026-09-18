import React from 'react';
import { Container, SectionTitle, Reveal, ArrowUpRight } from '../ui/site.jsx';
import { services as defaultServices } from '../../data/content.jsx';

/* Big uppercase service rows. Hovering floods a row black from below and
   reveals its one-line description. */
export default function Services({ items = defaultServices, onContact }) {
  return (
    <section id="service" className="site bg-paper pb-[clamp(90px,12vw,160px)] pt-[clamp(40px,6vw,80px)]">
      <Container>
        <SectionTitle ghost="SERVICE" meta="What I do">SERVICE</SectionTitle>

        <ul className="border-t border-carbon/10">
          {items.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80} className="border-b border-carbon/10">
              <button
                type="button"
                onClick={onContact}
                className="group relative isolate flex w-full items-center gap-6 overflow-hidden px-2 py-[clamp(22px,3vw,34px)] text-left sm:px-5"
              >
                <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 rounded-[18px] bg-carbon transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-y-100" />
                <span className="w-10 shrink-0 self-start pt-2 text-[13px] text-smoke transition-colors group-hover:text-white/50 max-sm:hidden">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[clamp(26px,4.2vw,54px)] font-medium uppercase leading-[1.05] tracking-[-0.02em] text-carbon/80 transition-all duration-500 group-hover:translate-x-2 group-hover:text-white">
                    {s.title}
                  </span>
                  <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr]">
                    <span className="overflow-hidden">
                      <span className="block max-w-[560px] pt-3 text-[15px] leading-relaxed text-white/65 sm:translate-x-2">{s.desc}</span>
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="h-7 w-7 shrink-0 text-carbon/50 transition-all duration-500 group-hover:rotate-45 group-hover:text-white" />
              </button>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
