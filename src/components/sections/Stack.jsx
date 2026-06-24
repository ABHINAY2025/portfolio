import React from 'react';
import Shell from '../ui/Shell.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';
import TechCard from '../ui/TechCard.jsx';
import { defaultContent } from '../../data/content.jsx';

export default function Stack({ items = defaultContent.stack }) {
  return (
    <section id="stack" className="relative bg-cream py-[100px]">
      <Shell>
        <header className="mx-auto mb-14 flex max-w-[720px] flex-col items-center gap-[18px] text-center">
          <Eyebrow>▸ TOOLKIT</Eyebrow>
          <h2 className="font-pixel text-[clamp(26px,3.6vw,40px)] leading-[1.18]">
            The <span className="text-yellow-deep">stack</span> behind the{' '}
            <span className="text-blue-deep">builds.</span>
          </h2>
          <p className="max-w-[580px] font-mono text-base leading-[1.65] text-ink-soft">
            From pixels to Postgres — the tools I reach for to take an idea from sketch to production.
          </p>
        </header>

        <div className="grid grid-cols-3 gap-6 max-[1080px]:grid-cols-2 max-[880px]:grid-cols-1">
          {items.map((t, i) => (
            <TechCard key={t.num ?? i} data={{ ...t, num: t.num ?? String(i + 1).padStart(2, '0') }} kind="stack" />
          ))}
        </div>
      </Shell>
    </section>
  );
}
