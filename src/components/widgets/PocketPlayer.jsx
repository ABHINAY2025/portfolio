import React from 'react';

/* A small floating music player styled after a retro handheld (warm beige
   body, black LCD, orange-lit keys, grooved platters with brass rims).
   - LCD: "PRESS START" when idle; while playing, a scrolling title, a live
     stacked-line waveform (Web Audio analyser) and a seek bar.
   - Keys: LOOP · PLAY/PAUSE · MUTE.  Round buttons: −10s · START · +10s.
   - Left platter spins while playing; right platter is a volume dial
     (drag around it or scroll over it).
   - Always open. MODE restarts the track. Press M anywhere to mute / unmute.
   - Clicking the casing (not a control) flips the device round to its orange
     back and stops the music; clicking the back flips it forward and plays.
   - The page's custom cursor steps aside here: the native cursor is used.
   - On the first screen it's the full device (bottom-right). Scroll past the
     hero and it morphs into a small pill at the bottom centre (spinning CD +
     play/pause); scroll back up and it morphs back. The morph: the source fades,
     a body-coloured shell glides and reshapes between the two, the target fades in.
   Music starts by itself: playback is attempted on load, and if the browser
   blocks sound until the visitor interacts, it starts on their first click,
   tap or key press instead. Pausing is respected for the rest of the visit. */

const BODY = '#e6e0d6';
const BODY_EDGE = '#cfc7bb';
const KEY = '#d8d1c5';
const ORANGE = '#ff6a13';
const ORANGE_SOFT = '#ffb070';
const BRASS = '#c7a36a';
const DEVICE_W = 236; // px, width of the device
const DEPTH = 24; // px, thickness of the body
const KNOBS = 7; // px of knobs above the body
const CORNER = 18; // px, body corner radius
const REST_TILT = { x: -9, y: 16 }; // resting 3/4 view: shows the top and left edges
const EDGE_BG = 'linear-gradient(90deg, #c9c1b4, #ddd6cb 30%, #bfb6a9 50%, #ddd6cb 70%, #c9c1b4)';
const PIXEL = '"Press Start 2P", monospace';
const MONO = '"IBM Plex Mono", monospace';

/* The player publishes the music's energy as CSS variables on <html> so other
   parts of the page can move with the beat: --eq-0 … --eq-{EQ_BANDS-1} (one per
   frequency band, bass → treble, 0‥1) and --beat (overall bass punch, 0‥1). */
export const EQ_BANDS = 17;
const EQ_VARS = Array.from({ length: EQ_BANDS }, (_, i) => `--eq-${i}`);
function publishEq(levels, beat) {
  const st = document.documentElement.style;
  for (let i = 0; i < EQ_BANDS; i++) st.setProperty(EQ_VARS[i], levels[i].toFixed(3));
  st.setProperty('--beat', beat.toFixed(3));
}

const fmt = (s) => {
  if (!Number.isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
};

function Platter({ spinning, size, children, className = '', style }) {
  return (
    <span
      className={`relative grid shrink-0 place-items-center rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        padding: 3,
        background: `linear-gradient(145deg, #f3eee6, ${BODY_EDGE})`,
        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8), 0 2px 5px rgba(0,0,0,0.18)',
        ...style,
      }}
    >
      <span className="absolute inset-[3px] rounded-full" style={{ border: `1.5px solid ${BRASS}` }} />
      <span
        className="relative h-full w-full rounded-full"
        style={{
          background:
            'conic-gradient(from 20deg, rgba(255,255,255,0.14), transparent 18%, rgba(255,255,255,0.1) 40%, transparent 62%, rgba(255,255,255,0.14) 85%, rgba(255,255,255,0.14)), repeating-radial-gradient(circle at center, #2b2623 0 1px, #1b1715 1px 3px)',
          animation: 'ppSpin 2.4s linear infinite',
          animationPlayState: spinning ? 'running' : 'paused',
        }}
      >
        <span className="absolute left-1/2 top-1/2 h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#141110] ring-1 ring-white/10" />
        <span className="absolute left-1/2 top-[9%] h-[22%] w-[3px] -translate-x-1/2 rounded-full" style={{ background: ORANGE }} />
      </span>
      {children}
    </span>
  );
}

function Key({ label, lit, onClick, ariaLabel, wide = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || label}
      aria-pressed={lit}
      data-magnetic="off"
      className={`relative overflow-hidden rounded-[5px] pb-1 pt-2 text-center transition-transform active:translate-y-px ${wide ? 'flex-[1.4]' : 'flex-1'}`}
      style={{ background: KEY, boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.15)' }}
    >
      <span className="absolute inset-x-0 top-0 h-[5px] transition-colors duration-300" style={{ background: lit ? ORANGE : ORANGE_SOFT, boxShadow: lit ? `0 0 0 0 ${ORANGE}` : 'none' }} />
      <span className="text-[7.5px] font-medium tracking-[0.04em] text-[#4a443d]" style={{ fontFamily: MONO }}>{label}</span>
    </button>
  );
}

function RoundBtn({ label, onClick, ariaLabel }) {
  return (
    <span className="flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel || label}
        data-magnetic="off"
        className="grid h-[22px] w-[22px] place-items-center rounded-full transition-transform active:scale-90"
        style={{ background: 'radial-gradient(circle at 35% 30%, #6b645c, #3b3632)', boxShadow: `0 0 0 2px ${BODY_EDGE}, 0 2px 3px rgba(0,0,0,0.3)` }}
      >
        <span className="h-[5px] w-[5px] rounded-full" style={{ background: ORANGE }} />
      </button>
      <span className="text-[6.5px] tracking-[0.06em] text-[#5b544c]" style={{ fontFamily: MONO }}>{label}</span>
    </span>
  );
}

function Led({ on }) {
  return <span className="block h-[7px] w-[7px] rounded-full transition-colors duration-300" style={{ background: on ? ORANGE : '#e9b58c', boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.2)' }} />;
}

export default function PocketPlayer({
  src = '/audio/international-feel.mp3',
  title = 'International Feel',
  artist = 'Tame Impala',
}) {
  const audio = React.useRef(null);
  const canvas = React.useRef(null);
  const graph = React.useRef(null); // { ctx, analyser, data }
  const raf = React.useRef(0);
  const vol = React.useRef(null);

  const [playing, setPlaying] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(() => store.get('pp-volume', 0.7));
  const [muted, setMuted] = React.useState(false);
  const [loop, setLoop] = React.useState(true);
  const [flipped, setFlipped] = React.useState(false);
  const [tilt, setTilt] = React.useState(REST_TILT);
  const [bodyH, setBodyH] = React.useState(360);
  const frontRef = React.useRef(null);
  const lifter = React.useRef(null);
  const shadow = React.useRef(null);
  const reduceMotion = React.useRef(false);

  // measure the body so the 3D edges match it
  React.useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = frontRef.current;
    if (!el) return undefined;
    const fit = () => setBodyH(el.offsetHeight - KNOBS);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // lift toward the viewer mid-turn; the ground shadow shrinks and fades meanwhile
  const liftOnFlip = () => {
    if (reduceMotion.current) return;
    const ease = 'cubic-bezier(0.45, 0, 0.2, 1)';
    lifter.current?.animate(
      [{ transform: 'translateZ(0)' }, { transform: 'translateZ(90px)', offset: 0.45 }, { transform: 'translateZ(0)' }],
      { duration: 1000, easing: ease },
    );
    shadow.current?.animate(
      [{ transform: 'translateX(-50%) scale(1)', opacity: 1 }, { transform: 'translateX(-50%) scale(0.72)', opacity: 0.45, offset: 0.45 }, { transform: 'translateX(-50%) scale(1)', opacity: 1 }],
      { duration: 1000, easing: ease },
    );
  };

  // lean gently toward the pointer while hovering
  const onTiltMove = (e) => {
    if (reduceMotion.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: REST_TILT.x - py * 10, y: REST_TILT.y + px * 14 });
  };
  const onTiltLeave = () => setTilt(REST_TILT);

  // ---- device ⇄ pill morph ----
  const PILL_AT = () => window.scrollY > window.innerHeight * 0.55;
  const [view, setView] = React.useState(() => (PILL_AT() ? 'pill' : 'device')); // which one is visible
  const viewRef = React.useRef(view);
  const deviceBox = React.useRef(null);
  const pillBox = React.useRef(null);
  const shell = React.useRef(null);
  const morphing = React.useRef(false);

  const morphTo = React.useCallback(async (target) => {
    const src = target === 'pill' ? deviceBox.current : pillBox.current;
    const dst = target === 'pill' ? pillBox.current : deviceBox.current;
    const sh = shell.current;
    if (!src || !dst || !sh) return;
    morphing.current = true;
    const quick = reduceMotion.current;
    const a = src.getBoundingClientRect();
    const b = dst.getBoundingClientRect();
    const radius = (r, isPill) => `${isPill ? r.height / 2 : 16}px`;
    const box = (r, isPill) => ({ left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px`, borderRadius: radius(r, isPill) });
    const ease = 'cubic-bezier(0.65, 0, 0.35, 1)';

    // 1 · the source fades while a plain body-coloured shell takes its place
    Object.assign(sh.style, box(a, target === 'device'), { display: 'block', opacity: '0' });
    await Promise.all([
      src.animate([{ opacity: 1 }, { opacity: 0 }], { duration: quick ? 1 : 220, easing: 'ease-out' }).finished,
      sh.animate([{ opacity: 0 }, { opacity: 1 }], { duration: quick ? 1 : 220, easing: 'ease-out' }).finished,
    ]);
    sh.style.opacity = '1';
    src.style.opacity = '0';
    dst.style.opacity = '0'; // stays hidden until the shell arrives
    viewRef.current = target;
    setView(target);

    // 2 · the shell glides and reshapes into the target's footprint
    await sh.animate([box(a, target === 'device'), box(b, target === 'pill')], { duration: quick ? 1 : 620, easing: ease }).finished;
    Object.assign(sh.style, box(b, target === 'pill'));

    // 3 · the target fades in over the shell
    await Promise.all([
      dst.animate([{ opacity: 0 }, { opacity: 1 }], { duration: quick ? 1 : 240, easing: 'ease-out' }).finished,
      sh.animate([{ opacity: 1 }, { opacity: 0 }], { duration: quick ? 1 : 240, easing: 'ease-in' }).finished,
    ]);
    dst.style.opacity = '1';
    src.style.opacity = '1';
    sh.style.display = 'none';
    morphing.current = false;
    // the visitor may have scrolled again meanwhile
    const want = PILL_AT() ? 'pill' : 'device';
    if (want !== viewRef.current) morphTo(want);
  }, []);

  React.useEffect(() => {
    const onScroll = () => {
      if (morphing.current) return;
      const want = PILL_AT() ? 'pill' : 'device';
      if (want !== viewRef.current) morphTo(want);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [morphTo]);

  React.useEffect(() => { if (audio.current) audio.current.volume = volume; store.set('pp-volume', volume); }, [volume]);
  React.useEffect(() => { if (audio.current) audio.current.muted = muted; }, [muted]);
  React.useEffect(() => { if (audio.current) audio.current.loop = loop; }, [loop]);

  const ensureGraph = () => {
    if (graph.current || !window.AudioContext && !window.webkitAudioContext) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctx();
      const source = ctx.createMediaElementSource(audio.current);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      graph.current = { ctx, analyser, data: new Uint8Array(analyser.fftSize), freq: new Uint8Array(analyser.frequencyBinCount) };
    } catch { /* no analyser: the waveform just stays flat */ }
  };

  const userPaused = React.useRef(false);
  const toggle = async () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      userPaused.current = false;
      ensureGraph();
      try { await graph.current?.ctx.resume(); await a.play(); } catch { /* blocked or failed */ }
    } else {
      userPaused.current = true;
      a.pause();
    }
  };

  // autoplay: try right away; if the browser wants a gesture first, start on
  // the visitor's first click / tap / key press (unless they paused it themselves)
  React.useEffect(() => {
    const a = audio.current;
    if (!a) return undefined;
    const events = ['pointerdown', 'keydown', 'touchstart'];
    const onFirstGesture = async () => {
      events.forEach((ev) => window.removeEventListener(ev, onFirstGesture, true));
      ensureGraph(); // needs a gesture for the analyser to run
      try { await graph.current?.ctx.resume(); } catch { /* ignore */ }
      if (a.paused && !userPaused.current) a.play().catch(() => {});
    };
    events.forEach((ev) => window.addEventListener(ev, onFirstGesture, true));
    a.play().catch(() => { /* blocked until the first gesture */ });
    return () => events.forEach((ev) => window.removeEventListener(ev, onFirstGesture, true));
  }, []);

  // click the casing → flip to the back and stop; click the back → flip forward and play
  const onCasingClick = (e) => {
    if (e.target.closest('button, [role="slider"], a')) return; // controls do their own thing
    userPaused.current = true;
    audio.current?.pause();
    liftOnFlip();
    setFlipped(true);
  };
  const onBackClick = async () => {
    liftOnFlip();
    setFlipped(false);
    const a = audio.current;
    if (a && a.paused) await toggle();
  };

  // M mutes / unmutes (ignored while typing in a field)
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'm' && e.key !== 'M') return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      setMuted((v) => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const skip = (d) => { const a = audio.current; if (a) a.currentTime = Math.max(0, Math.min((a.duration || 0) - 0.1, a.currentTime + d)); };
  const seek = (e) => {
    const a = audio.current;
    if (!a || !a.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - r.left) / r.width) * a.duration;
  };

  // one loop per frame while playing: LCD waveform (stacked time-domain lines,
  // like the reference's wire mountains) + beat levels for the page
  const levels = React.useRef(new Array(EQ_BANDS).fill(0));
  const averages = React.useRef(new Array(EQ_BANDS).fill(0));
  React.useEffect(() => {
    const lv = levels.current;
    if (!playing) {
      // let the letters settle back to rest
      let rest = 0;
      const settle = () => {
        let any = false;
        for (let i = 0; i < EQ_BANDS; i++) { lv[i] *= 0.82; if (lv[i] > 0.002) any = true; else lv[i] = 0; }
        publishEq(lv, lv[0]);
        rest = any ? requestAnimationFrame(settle) : 0;
      };
      rest = requestAnimationFrame(settle);
      return () => cancelAnimationFrame(rest);
    }
    const avg = averages.current;
    const draw = () => {
      const cv = canvas.current;
      const g = graph.current;
      if (g) {
        // bands on a log scale across ~40 Hz – 12 kHz, each with fast attack / slow release
        g.analyser.getByteFrequencyData(g.freq);
        const n = g.freq.length;
        const lo = 1;
        const hi = Math.min(n - 1, Math.floor(n * 0.55));
        for (let i = 0; i < EQ_BANDS; i++) {
          const a = Math.floor(lo * Math.pow(hi / lo, i / EQ_BANDS));
          const b = Math.max(a + 1, Math.floor(lo * Math.pow(hi / lo, (i + 1) / EQ_BANDS)));
          let sum = 0;
          for (let k = a; k < b; k++) sum += g.freq[k];
          const raw = sum / (b - a) / 255;
          // live spectrum level (noise floor gated), plus a kick when the band jumps above
          // its own running average so hits read clearly; fast rise, smooth fall
          avg[i] = avg[i] * 0.94 + raw * 0.06;
          const level = Math.min(1, Math.max(0, (raw - 0.14) / 0.74)) ** 1.25;
          const kick = Math.min(1, Math.max(0, (raw - avg[i]) * 2.5));
          const v = Math.min(1, level * 0.85 + kick * 0.35);
          lv[i] = v > lv[i] ? lv[i] + (v - lv[i]) * 0.6 : lv[i] * 0.9;
        }
        publishEq(lv, (lv[0] + lv[1] + lv[2]) / 3);
      }
      if (cv && g) {
        const ctx = cv.getContext('2d');
        const W = (cv.width = cv.clientWidth * 2);
        const H = (cv.height = cv.clientHeight * 2);
        g.analyser.getByteTimeDomainData(g.data);
        ctx.clearRect(0, 0, W, H);
        const lines = 7;
        for (let l = 0; l < lines; l++) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${0.18 + (l / lines) * 0.6})`;
          ctx.lineWidth = 1.2;
          const base = H * (0.25 + (l / lines) * 0.6);
          const amp = H * (0.12 + l * 0.02);
          const step = Math.max(1, Math.floor(g.data.length / 64));
          for (let i = 0, x = 0; i < g.data.length; i += step, x += W / (g.data.length / step)) {
            const v = (g.data[(i + l * 9) % g.data.length] - 128) / 128;
            const y = base - v * amp * Math.sin((x / W) * Math.PI);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf.current);
  }, [playing]);

  // volume dial: drag around the platter or scroll over it
  const dialDrag = (e) => {
    const el = vol.current;
    if (!el) return;
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    let last = Math.atan2(e.clientY - cy, e.clientX - cx);
    const move = (ev) => {
      const ang = Math.atan2(ev.clientY - cy, ev.clientX - cx);
      let d = ang - last;
      if (d > Math.PI) d -= Math.PI * 2;
      if (d < -Math.PI) d += Math.PI * 2;
      last = ang;
      setVolume((v) => Math.max(0, Math.min(1, v + d / (Math.PI * 1.5))));
    };
    const up = () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
  };
  React.useEffect(() => {
    const el = vol.current;
    if (!el) return undefined;
    const onWheel = (e) => { e.preventDefault(); setVolume((v) => Math.max(0, Math.min(1, v - e.deltaY * 0.0015))); };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const pct = duration ? (time / duration) * 100 : 0;
  const trackLine = `${artist} — ${title}`.toUpperCase();

  return (
    <>
    <div
      ref={deviceBox}
      data-native-cursor
      aria-hidden={view !== 'device'}
      className={`site fixed bottom-4 right-4 z-[60] origin-bottom-right scale-[0.84] select-none max-sm:bottom-2 max-sm:right-2 max-sm:scale-[0.62] ${view === 'device' ? '' : 'invisible pointer-events-none'}`}
      style={{ perspective: 1100 }}
    >
      <audio
        ref={audio}
        src={src}
        preload="metadata"
        loop={loop}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setPlaying(false)}
      />

      {/* soft contact shadow on the "desk" under the device */}
      <span
        ref={shadow}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 left-1/2 h-8 w-[88%] rounded-[50%]"
        style={{ transform: 'translateX(-50%)', background: 'radial-gradient(closest-side, rgba(0,0,0,0.42), rgba(0,0,0,0.18) 55%, transparent)', filter: 'blur(6px)' }}
      />

      {/* 3D box: front (controls), back (orange panel) and four edges */}
      <div ref={lifter} style={{ transformStyle: 'preserve-3d' }} onPointerMove={onTiltMove} onPointerLeave={onTiltLeave}>
      <div
        className="relative transition-transform duration-[1000ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{
          width: DEVICE_W,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (flipped ? 180 : 0)}deg)`,
        }}
      >
        {/* edges (the body's thickness) */}
        {[
          { key: 'r', style: { top: KNOBS + CORNER / 2, height: bodyH - CORNER, width: DEPTH, left: (DEVICE_W - DEPTH) / 2, transform: `rotateY(90deg) translateZ(${DEVICE_W / 2}px)` } },
          { key: 'l', style: { top: KNOBS + CORNER / 2, height: bodyH - CORNER, width: DEPTH, left: (DEVICE_W - DEPTH) / 2, transform: `rotateY(-90deg) translateZ(${DEVICE_W / 2}px)` } },
          { key: 't', style: { top: KNOBS + (bodyH - DEPTH) / 2, height: DEPTH, width: DEVICE_W - CORNER, left: CORNER / 2, transform: `rotateX(90deg) translateZ(${bodyH / 2}px)` } },
          { key: 'b', style: { top: KNOBS + (bodyH - DEPTH) / 2, height: DEPTH, width: DEVICE_W - CORNER, left: CORNER / 2, transform: `rotateX(-90deg) translateZ(${bodyH / 2}px)` } },
        ].map(({ key, style }) => (
          <span
            key={key}
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              ...style,
              background: key === 't' || key === 'b' ? EDGE_BG.replace('90deg', '180deg') : EDGE_BG,
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)',
              filter: key === 'b' || key === 'r' ? 'brightness(0.86)' : 'none',
            }}
          />
        ))}

        {/* ---- front ---- */}
        <div ref={frontRef} className="relative pt-[7px] [backface-visibility:hidden]" style={{ transform: `translateZ(${DEPTH / 2}px)` }} onClick={onCasingClick} aria-hidden={flipped}>
          {/* top knobs */}
          <span className="absolute left-[26px] top-0 h-[9px] w-[26px] rounded-t-[3px]" style={{ background: 'linear-gradient(90deg,#a9a39a,#e9e4dc 45%,#9d978e)' }} />
          <span className="absolute left-[92px] top-0 h-[9px] w-[34px] rounded-t-[3px]" style={{ background: 'linear-gradient(90deg,#a9a39a,#e9e4dc 45%,#9d978e)' }} />
          <span className="absolute left-[158px] top-0 h-[9px] w-[22px] rounded-t-[3px]" style={{ background: 'linear-gradient(90deg,#a9a39a,#e9e4dc 45%,#9d978e)' }} />
          <span className="absolute -right-[3px] top-[40px] h-[26px] w-[4px] rounded-r-sm" style={{ background: ORANGE }} />

          <div
            className="relative rounded-[18px] px-3 pb-3 pt-2.5"
            style={{ background: BODY, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -3px 0 ${BODY_EDGE}` }}
          >
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-[0.18em] text-[#3d3833]" style={{ fontFamily: 'Georgia, serif' }}>ABHINAY</span>
              <span className="text-[6.5px] tracking-[0.1em] text-[#8a8278]" style={{ fontFamily: MONO }}>AM-01 · AUDIO</span>
            </div>

            {/* LCD */}
            <div className="relative h-[112px] overflow-hidden rounded-[6px] bg-[#0b0b0b] px-2.5 py-2 text-white shadow-[inset_0_0_0_2px_#1f1c19]">
              <div className="flex justify-between text-[6px] text-white/70" style={{ fontFamily: MONO }}>
                <span>01_INTERNATIONAL_FEEL.MP3</span>
                <span>{loop ? 'LOOP' : 'ONCE'}</span>
              </div>
              <div className="mt-1 flex gap-2 text-[6px] text-white/50" style={{ fontFamily: MONO }}>
                <span className="bg-white px-0.5 text-black">PLAY</span><span>VOL {Math.round(volume * 100)}</span><span>{muted ? 'MUTED' : 'OUT'}</span>
              </div>

              {playing || time > 0 ? (
                <>
                  <canvas ref={canvas} aria-hidden="true" className="absolute inset-x-2 top-[26px] h-[48px] w-[calc(100%-16px)]" />
                  <div className="absolute inset-x-2.5 bottom-[26px] overflow-hidden whitespace-nowrap text-[8px]" style={{ fontFamily: PIXEL }}>
                    <span className={`inline-block ${playing ? 'animate-[marquee_12s_linear_infinite]' : ''}`}>{trackLine}  ·  {trackLine}  ·  </span>
                  </div>
                  <div className="absolute inset-x-2.5 bottom-2 flex items-center gap-1.5 text-[6.5px] text-white/70" style={{ fontFamily: MONO }}>
                    <span>{fmt(time)}</span>
                    <button type="button" onClick={seek} aria-label="Seek" data-magnetic="off" className="relative h-[6px] flex-1 rounded-full bg-white/15">
                      <span className="absolute inset-y-0 left-0 rounded-full bg-white" style={{ width: `${pct}%` }} />
                    </button>
                    <span>{fmt(duration)}</span>
                  </div>
                </>
              ) : (
                <button type="button" onClick={toggle} aria-label="Play music" data-magnetic="off" className="absolute inset-x-0 bottom-3 top-[26px] grid place-items-center">
                  <span className="text-[17px] leading-[1.25] tracking-[0.06em]" style={{ fontFamily: PIXEL }}>
                    PRESS<br />START
                  </span>
                </button>
              )}
            </div>

            {/* keys */}
            <div className="mt-2.5 flex gap-1.5">
              <Key label="LOOP" lit={loop} onClick={() => setLoop((v) => !v)} ariaLabel="Toggle loop" />
              <Key label={playing ? 'PAUSE' : 'PLAY'} lit={playing} onClick={toggle} ariaLabel={playing ? 'Pause' : 'Play'} wide />
              <Key label="MUTE · M" lit={muted} onClick={() => setMuted((v) => !v)} ariaLabel="Toggle mute (M)" />
            </div>

            {/* round buttons + leds */}
            <div className="mt-2.5 flex items-start justify-between px-1">
              <RoundBtn label="−10s" onClick={() => skip(-10)} ariaLabel="Back 10 seconds" />
              <span className="mt-[8px]"><Led on={loop} /></span>
              <RoundBtn label={playing ? 'STOP' : 'START'} onClick={toggle} ariaLabel={playing ? 'Pause' : 'Play'} />
              <span className="mt-[7px]"><Led on={playing} /></span>
              <RoundBtn label="+10s" onClick={() => skip(10)} ariaLabel="Forward 10 seconds" />
            </div>

            {/* platters: disc + volume dial */}
            <div className="mt-2.5 flex items-center justify-between">
              <Platter spinning={playing} size={92} />
              <span
                ref={vol}
                role="slider"
                tabIndex={0}
                aria-label="Volume"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(volume * 100)}
                data-magnetic="off"
                onPointerDown={dialDrag}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp' || e.key === 'ArrowRight') setVolume((v) => Math.min(1, v + 0.05));
                  if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') setVolume((v) => Math.max(0, v - 0.05));
                }}
                className="relative touch-none rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6a13]"
              >
                <Platter spinning={false} size={92} />
                {/* volume pointer */}
                <span className="pointer-events-none absolute inset-0" style={{ transform: `rotate(${volume * 270 - 135}deg)` }}>
                  <span className="absolute left-1/2 top-[9px] h-[9px] w-[3px] -translate-x-1/2 rounded-full" style={{ background: ORANGE }} />
                </span>
              </span>
            </div>

            {/* bottom row */}
            <div className="mt-2 flex items-end justify-between px-1 text-[6.5px] tracking-[0.06em] text-[#5b544c]" style={{ fontFamily: MONO }}>
              <span>DISC</span>
              <span className="flex flex-col items-center gap-1">
                <span>MODE</span>
                <button
                  type="button"
                  onClick={() => { const el = audio.current; if (el) { el.currentTime = 0; if (el.paused) toggle(); } }}
                  aria-label="Restart track"
                  data-magnetic="off"
                  className="grid h-[20px] w-[20px] place-items-center rounded-full active:scale-90"
                  style={{ background: 'radial-gradient(circle at 35% 30%, #6b645c, #3b3632)', boxShadow: `0 0 0 2px ${BODY_EDGE}` }}
                >
                  <span className="h-[8px] w-[8px] rounded-full" style={{ background: ORANGE }} />
                </button>
              </span>
              <span>VOL</span>
            </div>
          </div>
        </div>

        {/* ---- back: the orange panel from the reference ---- */}
        <button
          type="button"
          onClick={onBackClick}
          aria-label="Flip the player over and play music"
          tabIndex={flipped ? 0 : -1}
          aria-hidden={!flipped}
          className="absolute inset-0 pt-[7px] text-left [backface-visibility:hidden]"
          style={{ transform: `rotateY(180deg) translateZ(${DEPTH / 2}px)` }}
        >
          <span className="absolute left-[56px] top-0 h-[9px] w-[22px] rounded-t-[3px]" style={{ background: 'linear-gradient(90deg,#a9a39a,#e9e4dc 45%,#9d978e)' }} />
          <span className="absolute left-[110px] top-0 h-[9px] w-[34px] rounded-t-[3px]" style={{ background: 'linear-gradient(90deg,#a9a39a,#e9e4dc 45%,#9d978e)' }} />
          <span className="absolute left-[184px] top-0 h-[9px] w-[26px] rounded-t-[3px]" style={{ background: 'linear-gradient(90deg,#a9a39a,#e9e4dc 45%,#9d978e)' }} />
          <span className="absolute -left-[3px] top-[40px] h-[26px] w-[4px] rounded-l-sm" style={{ background: ORANGE }} />
          <span
            className="relative block h-full rounded-[18px]"
            style={{ background: BODY, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -3px 0 ${BODY_EDGE}` }}
          >
            {/* side strip: jacks + fine print */}
            <span className="absolute left-[7px] top-[14px] h-[9px] w-[9px] rounded-full bg-[#1a1714] ring-2 ring-[#bdb5a9]" />
            <span className="absolute bottom-[14px] left-[7px] h-[9px] w-[9px] rounded-full bg-[#1a1714] ring-2 ring-[#bdb5a9]" />
            <span className="absolute left-[4px] top-1/2 -translate-y-1/2 text-[5.5px] tracking-[0.2em] text-[#8a8278] [writing-mode:vertical-rl]" style={{ fontFamily: MONO }}>
              AM-01 · DESIGNED IN HYDERABAD
            </span>
            {/* the orange panel */}
            <span
              className="absolute bottom-[8px] left-[24px] right-[6px] top-[8px] grid place-items-center rounded-[14px]"
              style={{
                background:
                  'radial-gradient(120% 80% at 30% 15%, rgba(255,255,255,0.10), transparent 60%), repeating-radial-gradient(circle at 20% 30%, rgba(0,0,0,0.05) 0 1px, transparent 1px 3px), #cf4a1a',
                boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.18), inset 0 -3px 6px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.6)',
              }}
            >
              <span className="flex flex-col items-center gap-2 text-[#9e3610]">
                <span className="grid h-10 w-10 place-items-center rounded-full" style={{ boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.18)' }}>
                  <svg viewBox="0 0 12 12" className="ml-0.5 h-4 w-4" aria-hidden="true"><path d="M3 2 10 6 3 10Z" fill="currentColor" /></svg>
                </span>
                <span className="text-[7px] tracking-[0.24em]" style={{ fontFamily: MONO }}>TAP TO PLAY</span>
              </span>
            </span>
          </span>
        </button>
      </div>
      </div>
    </div>

    {/* ---- the pill: spinning CD + play/pause, bottom centre ---- */}
    <div
      ref={pillBox}
      data-native-cursor
      aria-hidden={view !== 'pill'}
      className={`site fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 select-none items-center gap-3 rounded-full py-1.5 pl-1.5 pr-1.5 ${view === 'pill' ? '' : 'invisible pointer-events-none'}`}
      style={{ background: BODY, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -2px 0 ${BODY_EDGE}, 0 18px 36px -14px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.12)` }}
    >
      <Platter spinning={playing} size={46} />
      {/* live equalizer: dark bars driven by the player's --eq-N levels */}
      <span aria-hidden="true" className="flex h-7 items-center gap-[3px]">
        {[1, 4, 7, 10, 13].map((band) => (
          <span
            key={band}
            className="w-[3px] rounded-full transition-[height] duration-75 ease-linear"
            style={{ background: '#3b3632', height: `calc(18% + var(--eq-${band}, 0) * 82%)` }}
          />
        ))}
      </span>
      <button
        type="button"
        onClick={toggle}
        tabIndex={view === 'pill' ? 0 : -1}
        aria-label={playing ? 'Pause music' : 'Play music'}
        data-magnetic="off"
        className="grid h-[46px] w-[46px] place-items-center rounded-full transition-transform active:scale-90"
        style={{ background: 'radial-gradient(circle at 35% 30%, #6b645c, #3b3632)', boxShadow: `0 0 0 3px ${BODY_EDGE}, 0 3px 6px rgba(0,0,0,0.3)` }}
      >
        {playing ? (
          <svg viewBox="0 0 12 12" className="h-4 w-4" aria-hidden="true"><path d="M3 2h2v8H3zM7 2h2v8H7z" fill={ORANGE} /></svg>
        ) : (
          <svg viewBox="0 0 12 12" className="ml-0.5 h-4 w-4" aria-hidden="true"><path d="M3 2 10 6 3 10Z" fill={ORANGE} /></svg>
        )}
      </button>
    </div>

    {/* morph shell (only visible while transforming) */}
    <div ref={shell} aria-hidden="true" className="pointer-events-none fixed z-[61] hidden" style={{ background: BODY, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -2px 0 ${BODY_EDGE}, 0 18px 36px -14px rgba(0,0,0,0.45)` }} />
    </>
  );
}
