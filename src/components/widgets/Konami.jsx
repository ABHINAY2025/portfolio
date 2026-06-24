import React from 'react';
import { useSound } from './SoundProvider.jsx';

/* Easter egg: press ↑↑↓↓←→←→ M A to spray a burst of pixel sparkles
   (and a celebratory power-up SFX). The footer advertises the code. */

const SEQ = [
  'arrowup', 'arrowup', 'arrowdown', 'arrowdown',
  'arrowleft', 'arrowright', 'arrowleft', 'arrowright',
  'm', 'a',
];

const COLORS = [
  'var(--color-coral)', 'var(--color-yellow)', 'var(--color-blue)',
  'var(--color-green)', 'var(--color-purple)', 'var(--color-coral-sunset)',
  'var(--color-mint)',
];
const GLYPHS = ['★', '✦', '✧', '✶', '◆', '▪', '✺'];

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function Konami() {
  const { playPowerUp } = useSound();
  const [burst, setBurst] = React.useState(null);
  const bufRef = React.useRef([]);
  const timerRef = React.useRef(null);

  const fire = React.useCallback(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const count = reduce ? 26 : 96;
    const particles = Array.from({ length: count }, (_, i) => ({
      i,
      glyph: pick(GLYPHS),
      color: pick(COLORS),
      dx: `${rand(-48, 48).toFixed(1)}vw`,
      dy: `${rand(-80, -26).toFixed(1)}vh`,
      rot: `${Math.round(rand(-420, 420))}deg`,
      size: `${Math.round(rand(11, 24))}px`,
      dur: Math.round(rand(1400, 2200)),
      delay: Math.round(rand(0, 240)),
    }));
    setBurst({ id: Date.now(), particles });
    try { playPowerUp(); } catch {}
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setBurst(null), 2500);
  }, [playPowerUp]);

  React.useEffect(() => {
    const onKey = (e) => {
      const k = e.key?.toLowerCase();
      if (!k) return;
      bufRef.current = [...bufRef.current, k].slice(-SEQ.length);
      if (
        bufRef.current.length === SEQ.length &&
        bufRef.current.every((v, i) => v === SEQ[i])
      ) {
        bufRef.current = [];
        fire();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(timerRef.current);
    };
  }, [fire]);

  if (!burst) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {/* spray origin near the bottom-centre, like a party popper */}
      <div className="absolute bottom-[12%] left-1/2">
        {burst.particles.map((p) => (
          <span
            key={`${burst.id}-${p.i}`}
            className="absolute left-0 top-0 leading-none"
            style={{
              color: p.color,
              fontSize: p.size,
              textShadow: '2px 2px 0 var(--color-ink)',
              '--dx': p.dx,
              '--dy': p.dy,
              '--rot': p.rot,
              animation: `sparkleSpray ${p.dur}ms ${p.delay}ms cubic-bezier(.18,.7,.3,1) both`,
            }}
          >
            {p.glyph}
          </span>
        ))}
      </div>

      <div
        className="absolute left-1/2 top-1/2 border-[3px] border-ink bg-yellow px-5 py-3 font-pixel text-[12px] tracking-[0.1em] text-ink shadow-pixel-lg"
        style={{ animation: 'cheatToast 2500ms ease-out both' }}
      >
        ✦ CHEAT UNLOCKED ✦
      </div>
    </div>
  );
}
