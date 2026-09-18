import React from 'react';
import { Pill, ArrowUpRight, FitLine } from '../ui/site.jsx';
import { defaultContent } from '../../data/content.jsx';
import portraitDefault from '../../../assets/abhinay-portrait.webp';

const EQ_BARS = 17;
const EQ_GRAPH = {
  backgroundImage: Array.from({ length: EQ_BARS }, (_, i) =>
    `linear-gradient(to top, #111 calc(var(--eq-${i}, 0) * 100%), transparent calc(var(--eq-${i}, 0) * 100%))`).join(', '),
  backgroundSize: Array.from({ length: EQ_BARS }, () => `calc(100% / ${EQ_BARS} - 3px) 100%`).join(', '),
  backgroundPosition: Array.from({ length: EQ_BARS }, (_, i) => `${((i / (EQ_BARS - 1)) * 100).toFixed(3)}% 100%`).join(', '),
};

const SOCIAL_ICONS = {
  GitHub: <path d="M8 1.5a6.5 6.5 0 0 0-2.05 12.67c.32.06.44-.14.44-.31v-1.1c-1.8.39-2.18-.87-2.18-.87-.3-.75-.72-.95-.72-.95-.59-.4.04-.4.04-.4.65.05 1 .67 1 .67.58 1 1.52.71 1.89.54.06-.42.23-.71.41-.87-1.44-.16-2.95-.72-2.95-3.2 0-.7.25-1.28.67-1.73-.07-.17-.29-.83.06-1.72 0 0 .55-.18 1.79.66a6.2 6.2 0 0 1 3.26 0c1.24-.84 1.79-.66 1.79-.66.35.9.13 1.55.06 1.72.42.45.67 1.03.67 1.73 0 2.49-1.52 3.04-2.96 3.2.23.2.44.6.44 1.2v1.78c0 .17.12.37.45.31A6.5 6.5 0 0 0 8 1.5Z" fill="currentColor" />,
  LinkedIn: <path d="M3.3 5.8h2v7h-2v-7Zm1-3.2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Zm2.4 3.2h1.9v1h.03c.27-.5.92-1.03 1.9-1.03 2.03 0 2.4 1.33 2.4 3.07v3.96h-2V9.3c0-.84-.02-1.92-1.17-1.92-1.17 0-1.35.91-1.35 1.86v3.56h-2v-7Z" fill="currentColor" />,
  Email: <path d="M2.5 4h11v8h-11V4Zm0 .5L8 8.5l5.5-4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" />,
  Résumé: <path d="M4 2h5.5L12 4.5V14H4V2Zm5 0v3h3M6 8h4M6 10.5h4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" />,
};

/* Portrait that is black & white at rest. Moving the cursor over it pours a
   liquid tail of colour along the pointer's path:
   - the head is stretched along the direction of travel, so its front bulges
     forward in a curve;
   - the tail keeps some of the pointer's momentum and waves sideways as it
     drifts, then shrinks and fades;
   - edges are ragged (noise-modulated outlines), droplets spray off the head
     and a fine grain breaks up the colour, so the flow has texture. */
const PW = 984;
const PH = 1031;
const TRAIL_LIFE = 950; // ms a point of the tail stays coloured
const TRAIL_HEAD = 0.08; // head radius as a fraction of the portrait width
const DROP_LIFE = 650;

let grainTile = null;
function grainPattern(ctx) {
  if (!grainTile) {
    grainTile = document.createElement('canvas');
    grainTile.width = grainTile.height = 96;
    const g = grainTile.getContext('2d');
    const d = g.createImageData(96, 96);
    for (let i = 0; i < d.data.length; i += 4) d.data[i + 3] = Math.random() < 0.34 ? 255 : 0;
    g.putImageData(d, 0, 0);
  }
  return ctx.createPattern(grainTile, 'repeat');
}

/* closed outline whose radius wobbles with layered sines → organic, ragged edge */
function blobPath(ctx, x, y, rx, ry, angle, seed, time) {
  const n = 22;
  const ca = Math.cos(angle);
  const sa = Math.sin(angle);
  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const th = (i / n) * Math.PI * 2;
    const wob =
      0.55 * Math.sin(3 * th + seed + time * 0.004) +
      0.3 * Math.sin(5 * th + seed * 2.1 - time * 0.006) +
      0.15 * Math.sin(11 * th + seed * 3.7);
    const f = 1 + 0.17 * wob;
    const lx = Math.cos(th) * rx * f;
    const ly = Math.sin(th) * ry * f;
    const px = x + lx * ca - ly * sa;
    const py = y + lx * sa + ly * ca;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function FlowPortrait({ src, className = '', style }) {
  const box = React.useRef(null);
  const canvas = React.useRef(null);
  const img = React.useRef(null);
  const pts = React.useRef([]);
  const drops = React.useRef([]);
  const last = React.useRef(null);
  const vel = React.useRef({ x: 0, y: 0, t: 0 });
  const frame = React.useRef(0);
  const raf = React.useRef(0);

  React.useEffect(() => {
    const im = new Image();
    im.src = src;
    img.current = im;
  }, [src]);

  React.useEffect(() => {
    const el = box.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(el.clientWidth * dpr);
      cv.height = Math.round(el.clientHeight * dpr);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => { ro.disconnect(); cancelAnimationFrame(raf.current); };
  }, []);

  const draw = React.useCallback((now) => {
    const cv = canvas.current;
    const ctx = cv?.getContext('2d');
    if (!ctx) { raf.current = 0; return; }
    const dt = Math.min(48, now - (frame.current || now));
    frame.current = now;
    const W = cv.width;
    const H = cv.height;
    const head = TRAIL_HEAD * W;
    const damp = Math.pow(0.9, dt / 16);

    // advance the liquid: momentum carries it forward, friction slows it
    pts.current = pts.current.filter((p) => now - p.t < TRAIL_LIFE);
    for (const p of pts.current) { p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= damp; p.vy *= damp; }
    drops.current = drops.current.filter((d) => now - d.t < DROP_LIFE);
    for (const d of drops.current) { d.x += d.vx * dt; d.y += d.vy * dt; d.vx *= damp; d.vy *= damp; }

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, W, H);

    // tail: oldest first, thinner and wavier as it ages
    for (const p of pts.current) {
      const age = now - p.t;
      const k = 1 - age / TRAIL_LIFE;
      const r = head * (0.28 + 0.72 * Math.sqrt(k)) * p.size;
      const sway = Math.sin(age * 0.011 + p.seed) * head * 0.35 * (1 - k); // sideways ripple
      const x = p.x * W + p.nx * sway;
      const y = p.y * H + p.ny * sway;
      ctx.fillStyle = `rgba(0,0,0,${0.35 + 0.65 * k})`;
      blobPath(ctx, x, y, r, r, 0, p.seed, now);
      ctx.fill();
    }

    // head: stretched along the motion, pushed forward → curved leading edge
    const v = vel.current;
    const newest = pts.current[pts.current.length - 1];
    if (now - v.t < 90 && newest) {
      const speed = Math.hypot(v.x * W, v.y * H); // px per ms
      const stretch = Math.min(0.9, speed * 0.35);
      const ang = Math.atan2(v.y * H, v.x * W);
      const hx = newest.x * W + Math.cos(ang) * head * stretch * 0.45;
      const hy = newest.y * H + Math.sin(ang) * head * stretch * 0.45;
      ctx.fillStyle = 'rgba(0,0,0,1)';
      blobPath(ctx, hx, hy, head * (1.05 + stretch), head * (1 - stretch * 0.22), ang, newest.seed, now);
      ctx.fill();
    }

    // droplets flung off the sides
    for (const d of drops.current) {
      const k = 1 - (now - d.t) / DROP_LIFE;
      ctx.fillStyle = `rgba(0,0,0,${k})`;
      ctx.beginPath();
      ctx.arc(d.x * W, d.y * H, d.size * W * (0.4 + 0.6 * k), 0, Math.PI * 2);
      ctx.fill();
    }

    if (pts.current.length || drops.current.length) {
      // grain: knock tiny holes in the mask so the colour looks painted, not flat
      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = grainPattern(ctx);
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
      // keep the colour photo only where the liquid is
      if (img.current?.complete) {
        ctx.globalCompositeOperation = 'source-in';
        ctx.drawImage(img.current, 0, 0, W, H);
      }
      raf.current = requestAnimationFrame(draw);
    } else {
      raf.current = 0;
      frame.current = 0;
    }
  }, []);

  const onMove = (e) => {
    const b = box.current.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width;
    const y = (e.clientY - b.top) / b.height;
    const now = performance.now();
    const prev = last.current;
    let vx = 0;
    let vy = 0;
    if (prev && now > prev.t) {
      const dtm = Math.max(8, now - prev.t);
      vx = (x - prev.x) / dtm;
      vy = (y - prev.y) / dtm;
      // smooth the velocity a little so the head doesn't jitter
      vel.current = { x: vel.current.x * 0.5 + vx * 0.5, y: vel.current.y * 0.5 + vy * 0.5, t: now };
    }
    const len = Math.hypot(vx * b.width, vy * b.height) || 1;
    const nx = (-vy * b.height) / len; // unit normal (screen space) for the sideways ripple
    const ny = (vx * b.width) / len;
    const add = (px, py, t) => pts.current.push({
      x: px, y: py, t, vx: vx * 0.28, vy: vy * 0.28, nx, ny,
      seed: Math.random() * 10, size: 0.85 + Math.random() * 0.3,
    });
    if (prev) {
      const steps = Math.min(24, Math.floor(Math.hypot((x - prev.x) * b.width, (y - prev.y) * b.height) / 6));
      for (let i = 1; i < steps; i++) {
        const f = i / steps;
        add(prev.x + (x - prev.x) * f, prev.y + (y - prev.y) * f, prev.t + (now - prev.t) * f);
      }
    }
    add(x, y, now);

    // spray a droplet from the head's sides when moving quickly
    const speed = Math.hypot(vx * b.width, vy * b.height); // px per ms
    if (speed > 0.4 && Math.random() < Math.min(0.9, speed * 0.5)) {
      const side = Math.random() < 0.5 ? -1 : 1;
      const off = TRAIL_HEAD * (0.9 + Math.random() * 0.6) * b.width; // px
      drops.current.push({
        x: x + (nx * side * off) / b.width,
        y: y + (ny * side * off) / b.height,
        vx: vx * 0.15 + (nx * side * 0.00012),
        vy: vy * 0.15 + (ny * side * 0.00012),
        t: now,
        size: 0.006 + Math.random() * 0.012,
      });
    }

    last.current = { x, y, t: now };
    if (!raf.current) raf.current = requestAnimationFrame(draw);
  };
  const onLeave = () => { last.current = null; };

  return (
    <div
      ref={box}
      data-cursor="hello"
      role="img"
      aria-label="Portrait of Abhinay Marripelli"
      className={`relative ${className}`}
      style={{ aspectRatio: `${PW} / ${PH}`, ...style }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <img src={src} alt="" className="absolute inset-0 h-full w-full select-none [filter:grayscale(1)_contrast(1.06)]" draggable="false" fetchpriority="high" />
      <canvas ref={canvas} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
    </div>
  );
}

export default function Hero({ hero = defaultContent.hero, contact = defaultContent.contact, onContact }) {
  const portrait = hero.portrait || portraitDefault;
  const socials = [
    ['GitHub', contact.github],
    ['LinkedIn', contact.linkedin],
    ['Email', `mailto:${contact.email}`],
    ['Résumé', contact.resumeUrl],
  ].filter(([, href]) => href);

  // the hollow first name holds a live equalizer: one bar per music band (--eq-N,
  // published by the player), clipped to the letter shapes; the letters never move
  const first = <span className="eq-graph text-outline" style={EQ_GRAPH}>{hero.firstName}</span>;
  const last = <span>{hero.lastName}</span>;

  return (
    <section id="top" className="site relative isolate overflow-hidden bg-white">
      <div className="mx-auto flex min-h-[max(680px,100svh)] w-full max-w-[1240px] flex-col px-[clamp(16px,4vw,48px)] pt-[92px] max-sm:min-h-0">
        {/* name */}
        <h1 className="relative z-0 font-wide font-extrabold uppercase leading-[0.9] tracking-[-0.03em]" aria-label={`${hero.firstName} ${hero.lastName}`}>
          <span className="anim-rise block max-sm:hidden" style={{ '--d': '150ms' }}>
            <FitLine>{first} {last}</FitLine>
          </span>
          <span className="hidden flex-col gap-1 max-sm:flex" aria-hidden="true">
            <span className="anim-rise block" style={{ '--d': '150ms' }}><FitLine>{first}</FitLine></span>
            <span className="anim-rise block" style={{ '--d': '260ms' }}><FitLine>{last}</FitLine></span>
          </span>
        </h1>

        {/* portrait — transparent cut-out resting on the section's bottom edge */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center max-sm:relative max-sm:mt-2">
          <FlowPortrait
            src={portrait}
            className="anim-fade-up pointer-events-auto block h-[min(82svh,760px)] w-auto max-w-none max-sm:h-[400px]"
            style={{ '--d': '350ms' }}
          />
        </div>

        {/* bottom row: role + CTA (left), socials (right) */}
        <div className="pointer-events-none relative z-20 mt-auto flex items-end justify-between gap-8 pb-[clamp(48px,21svh,200px)] max-sm:mt-6 max-sm:flex-col max-sm:items-stretch max-sm:gap-7 max-sm:pb-10">
          <div className="anim-fade-up pointer-events-auto max-w-[290px] max-sm:max-w-none" style={{ '--d': '600ms' }}>
            <h2 className="text-[clamp(20px,2vw,24px)] font-semibold tracking-tight">{hero.role}</h2>
            <p className="mb-5 mt-2.5 text-[14px] leading-relaxed text-smoke">{hero.tagline}</p>
            <Pill onClick={onContact}>Let&rsquo;s collaborate</Pill>
          </div>

          <ul className="anim-fade-up pointer-events-auto flex flex-col items-end gap-2.5 sm:mb-[200px] max-sm:grid max-sm:grid-cols-2" style={{ '--d': '750ms' }}>
            {socials.map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 max-sm:w-full max-sm:justify-center rounded-full border border-carbon/10 bg-white/90 px-3.5 py-1.5 text-[12.5px] font-medium text-carbon backdrop-blur transition-all hover:border-carbon hover:bg-carbon hover:text-white"
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">{SOCIAL_ICONS[label]}</svg>
                  {label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
