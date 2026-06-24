import React from 'react';
import Shell from '../ui/Shell.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';
import Tick from '../ui/Tick.jsx';
import Button from '../ui/Button.jsx';
import WhoamiWindow from '../about/WhoamiWindow.jsx';
import { defaultContent } from '../../data/content.jsx';
import aboutIntroVideo from '../../../assets/about-intro.mp4';

const overlay = {
  background:
    'linear-gradient(to bottom, rgba(255,111,77,0.18) 0%, rgba(15,20,48,0.10) 45%, var(--color-navy) 100%)',
};

export default function About({ go, about = defaultContent.about }) {
  return (
    <section id="about" className="bg-navy text-cream">
      {/* full-bleed muted, looping, controls-free background video */}
      <div className="relative h-[clamp(220px,62vh,420px)] w-full overflow-hidden border-b-[3px] border-ink bg-navy">
        <video
          className="pointer-events-none absolute inset-0 block -rotate-2 scale-110 h-full w-full object-cover object-[center_82%]"
          src={aboutIntroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0" style={overlay} />
      </div>

      <Shell>
        <div className="grid grid-cols-[1fr_1.05fr] items-center gap-14 pb-[100px] pt-12 max-[880px]:grid-cols-1 max-[880px]:gap-9">
          <div>
            <Eyebrow className="text-coral-sunset">▸ WHO IS ABHINAY</Eyebrow>
            <h2 className="mb-[18px] mt-[18px] font-pixel text-[clamp(24px,3.2vw,36px)] leading-[1.18] text-cream">
              I build for <span className="text-coral-sunset">community</span> &amp; uncover stories in code.
            </h2>
            <p className="mb-[22px] font-mono text-base leading-[1.7] text-cream/80">
              {about.intro}
            </p>
            <ul className="mb-[26px] flex flex-col gap-3">
              {about.bullets.map((t) => (
                <li key={t} className="flex items-start gap-3 font-mono text-[14.5px] text-cream/80">
                  <Tick className="bg-coral-sunset" /> {t}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3.5">
              <Button href="#work" variant="purple" onClick={(e) => { e.preventDefault(); go('work'); }}>
                See projects
              </Button>
              <Button variant="ghost" onClick={(e) => { e.preventDefault(); go('resume'); }}>
                View resume
              </Button>
            </div>
          </div>

          <WhoamiWindow />
        </div>
      </Shell>
    </section>
  );
}
