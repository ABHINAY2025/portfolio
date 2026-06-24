import React from 'react';
import Shell from '../ui/Shell.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';
import { values } from '../../data/content.jsx';

export default function Values() {
  return (
    <section className="bg-navy py-[100px]">
      <Shell>
        <header className="mx-auto mb-14 flex max-w-[720px] flex-col items-center gap-[18px] text-center">
          <Eyebrow className="text-coral-sunset">▸ HOW I WORK</Eyebrow>
          <h2 className="font-pixel text-[clamp(26px,3.6vw,40px)] leading-[1.18] text-cream">
            Core <span className="text-coral-sunset">values.</span>
          </h2>
        </header>

        <div className="grid grid-cols-3 gap-7 max-[880px]:grid-cols-1">
          {values.map((v) => (
            <article
              key={v.title}
              className="relative flex flex-col gap-3.5 border-[3px] border-ink bg-navy-card p-[26px_24px] shadow-pixel"
            >
              <span className="grid h-16 w-16 place-items-center border-[3px] border-ink bg-coral-sunset text-navy shadow-pixel-sm">
                {v.icon}
              </span>
              <p className="font-mono text-[14.5px] leading-[1.65] text-cream/85">{v.copy}</p>
              <div className="mt-auto flex items-center gap-3 border-t-2 border-dashed border-cream/30 pt-3.5">
                <span className="grid h-[38px] w-[38px] place-items-center border-[3px] border-ink bg-coral-sunset font-pixel text-[10px] text-navy shadow-pixel-sm">
                  ★
                </span>
                <div>
                  <div className="font-pixel text-[10px] text-cream">{v.title}</div>
                  <div className="font-mono text-xs text-cream/70">A principle I build by</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Shell>
    </section>
  );
}
