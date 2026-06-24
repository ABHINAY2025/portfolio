import React from 'react';
import Shell from '../ui/Shell.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';
import Button from '../ui/Button.jsx';
import { defaultContent } from '../../data/content.jsx';

const BARS = [
  'var(--color-coral)', 'var(--color-blue)', 'var(--color-green)',
  'var(--color-yellow)', 'var(--color-purple)',
];

export default function Writing({ go, onOpen, items = defaultContent.writings }) {
  return (
    <section id="writing" className="border-y-[3px] border-ink bg-cream-2 py-[100px]">
      <Shell>
        <header className="mx-auto mb-14 flex max-w-[720px] flex-col items-center gap-[18px] text-center">
          <Eyebrow>▸ FROM THE JOURNAL</Eyebrow>
          <h2 className="font-pixel text-[clamp(26px,3.6vw,40px)] leading-[1.18]">
            Notes on <span className="text-coral-deep">building</span> &amp;{' '}
            <span className="text-blue-deep">craft.</span>
          </h2>
          <p className="max-w-[580px] font-mono text-base leading-[1.65] text-ink-soft">
            Short essays on backend thinking, UI details and the things I learn shipping real products.
          </p>
        </header>

        <div className="grid grid-cols-3 gap-6 max-[1080px]:grid-cols-2 max-[880px]:grid-cols-1">
          {items.map((w, i) => (
            <article
              key={w.id ?? i}
              className="relative flex flex-col gap-3.5 overflow-hidden border-[3px] border-ink bg-cream p-[26px] shadow-pixel transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pixel-lg"
            >
              <span
                className="absolute left-0 top-0 h-2 w-full border-b-[3px] border-ink"
                style={{ background: BARS[i % BARS.length] }}
              />
              <div className="flex flex-wrap items-center gap-2 pt-1.5">
                <span className="border-2 border-ink bg-cream-2 px-2 pb-[5px] pt-1.5 font-pixel text-[8px] tracking-[0.06em]">
                  {w.date}
                </span>
                <span className="font-pixel text-[8px] tracking-[0.1em] text-ink-mute">{w.read}</span>
              </div>
              <h3 className="font-pixel text-sm leading-[1.5]">{w.title}</h3>
              <p className="font-mono text-sm leading-relaxed text-ink-soft">{w.excerpt}</p>
              <div className="mt-auto pt-3">
                <Button variant="coral" size="sm" onClick={() => onOpen?.(w)}>
                  Read more →
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Shell>
    </section>
  );
}
