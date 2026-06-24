import React from 'react';
import Button from '../ui/Button.jsx';
import { IconArrow } from '../ui/Icons.jsx';
import { defaultContent } from '../../data/content.jsx';
import heroPortrait from '../../../assets/abhinay-hero.png';

const panelBg = {
  background:
    'radial-gradient(circle at 22% 18%, rgba(255,255,255,0.16) 0%, transparent 55%), ' +
    'linear-gradient(135deg, #8d6cea 0%, #7857d8 45%, #5a3fbf 100%)',
};

const shape = 'absolute border-[3px] border-ink shadow-pixel-sm pointer-events-none';

/* pinboard decorations around the portrait */
function Pin({ className, color }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-30 grid h-7 w-7 place-items-center rounded-full border-[3px] border-ink shadow-pixel-sm ${className}`}
      style={{ background: `radial-gradient(circle at 34% 30%, #ffffff 0 16%, ${color} 56%)` }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-ink/55" />
    </span>
  );
}

function Tape({ className, color }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-20 h-7 w-24 border-x-2 border-ink/25 ${className}`}
      style={{
        background: `repeating-linear-gradient(90deg, ${color} 0 9px, rgba(255,255,255,0.22) 9px 12px)`,
        boxShadow: '0 1px 2px rgba(26,21,48,0.18)',
      }}
    />
  );
}

function PaperClip({ className }) {
  return (
    <svg aria-hidden="true" className={`absolute z-30 ${className}`} width="30" height="62" viewBox="0 0 30 62" fill="none">
      <path
        d="M9 8 V44 a6 6 0 0 0 12 0 V14 a4 4 0 0 0 -8 0 V46"
        stroke="#1a1530" strokeWidth="4" strokeLinecap="round"
        style={{ filter: 'drop-shadow(2px 2px 0 rgba(26,21,48,0.25))' }}
      />
    </svg>
  );
}

export default function Hero({ go, hero = defaultContent.hero }) {
  return (
    <section className="relative flex flex-1 items-stretch">
      <div className="flex w-full flex-1">
        <div
          className="relative grid flex-1 grid-cols-[1.05fr_1fr] items-center gap-10 overflow-hidden border-b-[3px] border-ink px-[clamp(20px,4vw,56px)] py-[clamp(32px,5vw,72px)] max-[880px]:grid-cols-1"
          style={panelBg}
        >
          {/* dot + scanline overlays */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)',
              backgroundSize: '14px 14px',
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'repeating-linear-gradient(to bottom, transparent 0 3px, rgba(0,0,0,0.04) 3px 4px)',
            }}
          />

          {/* decorative shapes */}
          <span aria-hidden="true" className={`${shape} left-7 top-7 h-14 w-14 rotate-[-8deg] bg-coral`} />
          <span aria-hidden="true" className={`${shape} right-9 top-8 h-16 w-16 rounded-full bg-yellow`} />
          <span aria-hidden="true" className={`${shape} bottom-10 left-20 h-11 w-11 rotate-45 bg-blue`} />
          <span aria-hidden="true" className={`${shape} bottom-11 right-9 h-7 w-20 rotate-[-12deg] rounded-[14px] bg-green`} />

          {/* copy */}
          <div className="relative z-[2] text-cream">
            <span className="mb-[22px] inline-flex items-center gap-2.5 border-[3px] border-ink bg-cream px-3 pb-1.5 pt-[7px] font-pixel text-[9px] tracking-[0.18em] text-ink shadow-pixel-sm">
              <span aria-hidden="true" className="h-2 w-2 border-2 border-ink bg-coral" />
              {hero.badge}
            </span>

            <h1
              className="m-0 mb-[22px] font-pixel text-[clamp(44px,7vw,92px)] leading-[1.04]"
              style={{ textShadow: '5px 5px 0 var(--color-ink)', WebkitTextStroke: '2px var(--color-ink)' }}
            >
              <span className="block whitespace-nowrap">
                <span className="text-coral">{hero.titleLine1}</span>
                <span className="text-yellow">{hero.titleAccent}</span>
              </span>
              <span className="block text-purple-night">{hero.titleLine2}</span>
            </h1>

            <p className="mb-7 max-w-[460px] font-mono text-[17px] leading-[1.65] text-cream/95">
              {hero.intro}
            </p>

            <div className="flex flex-wrap gap-3.5">
              <Button
                href="#work"
                variant="yellow"
                size="lg"
                onClick={(e) => { e.preventDefault(); go('work'); }}
              >
                View my work <IconArrow />
              </Button>
              <Button variant="ghost" size="lg" onClick={() => go('resume')}>
                Resume
              </Button>
            </div>
          </div>

          {/* portrait toy — pinned & taped to the board */}
          <div className="relative z-[2] flex h-full min-h-[360px] items-center justify-center max-[880px]:min-h-[280px]">
            <div className="relative w-full max-w-[380px] origin-bottom animate-wobble">
              {/* tape strips scattered around the edges at odd angles */}
              <Tape className="-top-3 left-8 -rotate-[24deg]" color="rgba(255,216,107,0.75)" />
              <Tape className="top-1/3 -right-7 rotate-[78deg]" color="rgba(184,220,160,0.78)" />
              <Tape className="-bottom-3 left-1/3 rotate-[12deg]" color="rgba(255,183,157,0.74)" />
              <Tape className="top-2/3 -left-8 rotate-[64deg]" color="rgba(185,165,241,0.7)" />

              {/* the framed photo */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[10px] border-4 border-ink bg-cream shadow-pixel-xl">
                <img src={hero.image || heroPortrait} alt="Abhinay" className="h-full w-full object-cover object-top" />
              </div>

              {/* push pins dotted around at random spots */}
              <Pin className="-top-3.5 left-7" color="#ff6f4d" />
              <Pin className="top-6 -right-3.5" color="#5db7e8" />
              <Pin className="-bottom-3.5 left-1/4" color="#ffd86b" />
              <Pin className="top-1/2 -left-3.5" color="#88b86c" />
              <Pin className="-top-3.5 right-1/4" color="#b9a5f1" />

              {/* paper clips clipped onto stray edges */}
              <PaperClip className="-top-5 right-16 rotate-[14deg]" />
              <PaperClip className="bottom-8 -right-3 rotate-[104deg]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
