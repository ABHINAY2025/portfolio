import React from 'react';
import { values } from '../../data/content.jsx';
import aboutRide from '../../../assets/about-whoami.png';

/* macOS traffic-light button: zooms + reveals its label on hover. */
function MacDot({ color, glyph, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group/dot relative grid h-3.5 w-3.5 place-items-center rounded-full border border-black/30 ${color} transition-transform duration-150 hover:scale-[1.7]`}
    >
      <span className="font-pixel text-[7px] leading-none text-black/70 opacity-0 transition-opacity group-hover/dot:opacity-100">
        {glyph}
      </span>
      <span className="pointer-events-none absolute left-1/2 top-[180%] z-20 -translate-x-1/2 whitespace-nowrap border-2 border-ink bg-cream px-1.5 py-1 font-pixel text-[7px] tracking-[0.1em] text-ink opacity-0 shadow-pixel-sm transition-opacity group-hover/dot:opacity-100">
        {label}
      </span>
    </button>
  );
}

export default function WhoamiWindow() {
  // 'open' | 'min' (collapsed → reveal image) | 'max'
  const [mode, setMode] = React.useState('open');
  const [closed, setClosed] = React.useState(false);

  return (
    <div className="relative min-h-[440px] rounded-lg">
      {/* image behind the card — revealed when minimised or closed */}
      <img
        src={aboutRide}
        alt="Abhinay riding"
        className="absolute inset-0 z-0 h-full w-full rounded-lg border-[3px] border-ink object-cover shadow-pixel-lg"
      />

      {closed ? (
        <button
          type="button"
          onClick={() => { setClosed(false); setMode('open'); }}
          className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 border-[3px] border-ink bg-coral-sunset px-4 py-3 font-pixel text-[10px] tracking-[0.08em] text-navy shadow-pixel-sm active:translate-x-[-50%] active:translate-y-[-50%] active:shadow-none"
        >
          ▸ reopen whoami.json
        </button>
      ) : (
        <div
          className={`relative z-[2] flex flex-col overflow-hidden rounded-md border-[3px] border-ink bg-navy-card shadow-pixel-lg transition-transform duration-200 ${
            mode !== 'min' ? 'min-h-[440px]' : ''
          } ${mode === 'max' ? 'scale-[1.04]' : ''}`}
        >
          <div className="flex items-center gap-2 bg-navy-deep px-3 py-2.5 font-pixel text-[9px] tracking-[0.1em] text-cream">
            <MacDot color="bg-[#ff5f57]" glyph="×" label="Close" onClick={() => setClosed(true)} />
            <MacDot color="bg-[#febc2e]" glyph="–" label="Minimise" onClick={() => setMode((m) => (m === 'min' ? 'open' : 'min'))} />
            <MacDot color="bg-[#28c840]" glyph="+" label="Maximise" onClick={() => setMode((m) => (m === 'max' ? 'open' : 'max'))} />
            <span className="ml-3 opacity-70">~/abhinay / whoami.json</span>
          </div>

          {mode !== 'min' && (
            <div className="flex flex-1 flex-col gap-2.5 overflow-hidden p-[22px]">
              {values.map((v) => (
                <div key={v.title} className="flex items-center gap-3 border-[3px] border-ink bg-navy-deep p-3.5">
                  <span className="grid h-[38px] w-[38px] flex-none place-items-center border-[3px] border-ink bg-coral-sunset font-pixel text-[10px] text-navy shadow-pixel-sm">
                    ★
                  </span>
                  <div>
                    <div className="font-pixel text-[10px] text-cream">{v.title}</div>
                    <div className="font-mono text-xs text-cream/70">{v.copy}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
