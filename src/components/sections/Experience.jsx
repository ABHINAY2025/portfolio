import React from 'react';
import Shell from '../ui/Shell.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';
import { defaultContent } from '../../data/content.jsx';

export default function Experience({ items = defaultContent.experience }) {
  return (
    <section id="experience" className="bg-navy py-[100px]">
      <Shell>
        <header className="mx-auto mb-14 flex max-w-[720px] flex-col items-center gap-[18px] text-center">
          <Eyebrow className="text-coral-sunset">▸ EXPERIENCE</Eyebrow>
          <h2 className="font-pixel text-[clamp(26px,3.6vw,40px)] leading-[1.18] text-cream">
            Building systems, products &amp;{' '}
            <span className="text-coral-sunset">real-world solutions.</span>
          </h2>
          <p className="max-w-[580px] font-mono text-base leading-[1.65] text-cream/80">
            From enterprise backends to job simulations with Accenture and J.P. Morgan — the path so far.
          </p>
        </header>

        <div className="grid grid-cols-5 gap-5 max-[1080px]:grid-cols-3 max-[720px]:grid-cols-1">
          {items.map((s, i) => {
            const pop = i === 0;
            const num = s.n ?? String(i + 1).padStart(2, '0');
            return (
              <article
                key={s.n ?? i}
                className={`relative flex flex-col gap-2 border-[3px] border-ink p-[24px_20px] ${
                  pop
                    ? 'z-[2] -translate-y-3.5 scale-[1.03] bg-coral-sunset shadow-pixel-lg'
                    : 'bg-navy-card shadow-pixel'
                }`}
              >
                <div
                  className={`mb-1.5 grid h-[38px] w-[38px] place-items-center border-[3px] border-ink font-pixel text-xs shadow-pixel-sm ${
                    pop ? 'bg-navy text-coral-sunset' : 'bg-coral-sunset text-navy'
                  }`}
                >
                  {num}
                </div>
                <h3 className={`font-pixel text-xs ${pop ? 'text-navy' : 'text-cream'}`}>{s.title}</h3>
                <p className={`font-mono text-[13.5px] leading-[1.55] ${pop ? 'text-navy' : 'text-cream/80'}`}>
                  <strong className={pop ? 'text-navy' : 'text-coral-sunset'}>{s.org}</strong>
                  <br />
                  {s.copy}
                </p>
              </article>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}
