import React from 'react';
import { Container, SectionTitle, Reveal, ArrowUpRight } from '../ui/site.jsx';
import { defaultContent } from '../../data/content.jsx';

export default function Writing({ onOpen = () => {}, items = defaultContent.writings }) {
  if (!items?.length) return null;
  return (
    <section id="writing" className="site bg-paper py-[clamp(90px,12vw,160px)]">
      <Container>
        <SectionTitle ghost="JOURNAL" meta="Notes on building & craft">WRITING</SectionTitle>
        <ul className="border-t border-carbon/10">
          {items.map((w, i) => (
            <Reveal as="li" key={w.id ?? i} delay={i * 80} className="border-b border-carbon/10">
              <button type="button" onClick={() => onOpen(w)} data-cursor="open" className="group grid w-full grid-cols-[120px_1fr_auto] items-center gap-6 py-8 text-left max-md:grid-cols-1 max-md:gap-3">
                <span className="text-[13px] text-smoke">{w.date}</span>
                <span>
                  <span className="block text-[clamp(20px,2.4vw,30px)] font-medium leading-tight tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-2">
                    {w.title}
                  </span>
                  <span className="mt-2 block max-w-[680px] text-[14.5px] leading-relaxed text-smoke">{w.excerpt}</span>
                </span>
                <span className="flex items-center gap-3 text-[13px] text-smoke max-md:hidden">
                  {w.read}
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-carbon/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-carbon group-hover:bg-carbon group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
