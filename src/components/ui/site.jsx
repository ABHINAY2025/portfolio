import React from 'react';
import { SKILL_NAMES, skillSrc } from '../../data/skills.js';

/* Shared building blocks for the editorial portfolio. */

/* Adds `is-in` to a `.reveal` element the first time it scrolls into view. */
export function useReveal() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('is-in'); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); } },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--d': `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}

/* Drifts an element horizontally as its section scrolls through the viewport. */
function useDrift(distance = 160) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight - r.top) / (window.innerHeight + r.height); // 0 → 1 across the viewport
      el.style.transform = `translate3d(${(0.5 - Math.min(1, Math.max(0, p))) * distance}px,0,0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [distance]);
  return ref;
}

/* "/SELECTED WORK" heading with a huge faded word drifting behind it. */
export function SectionTitle({ ghost, children, meta, dark = false, className = '' }) {
  const drift = useDrift();
  return (
    <header className={`relative mb-14 flex items-end justify-between gap-6 max-sm:mb-10 ${className}`}>
      <span
        ref={drift}
        aria-hidden="true"
        className={`pointer-events-none absolute -top-[0.62em] left-0 select-none whitespace-nowrap font-wide text-[clamp(64px,13vw,190px)] font-extrabold leading-none tracking-tight ${
          dark ? 'text-white/[0.035]' : 'text-carbon/[0.045]'
        }`}
      >
        {ghost}
      </span>
      <Reveal as="h2" className="relative text-[clamp(30px,4.4vw,56px)] font-medium uppercase">
        <span className={dark ? 'text-white/40' : 'text-carbon/35'}>/</span>
        {children}
      </Reveal>
      {meta && (
        <Reveal delay={120} className={`relative pb-2 text-sm ${dark ? 'text-white/60' : 'text-smoke'}`}>
          {meta}
        </Reveal>
      )}
    </header>
  );
}

/* Scales its text so it exactly fills the parent's width. */
export function FitLine({ className = '', style, children }) {
  const ref = React.useRef(null);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      const box = el.parentElement;
      if (!box || !box.clientWidth) return;
      const cs = getComputedStyle(box);
      const avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      el.style.fontSize = '100px';
      const w = el.scrollWidth;
      if (w) el.style.fontSize = `${Math.floor((avail / w) * 100 * 10) / 10}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [children]);
  return (
    <span ref={ref} className={`inline-block whitespace-nowrap ${className}`} style={style}>
      {children}
    </span>
  );
}

export function Container({ max = 'max-w-[1240px]', className = '', children }) {
  return <div className={`mx-auto w-full ${max} px-[clamp(16px,4vw,48px)] ${className}`}>{children}</div>;
}

export function ArrowUpRight({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

export function ArrowLeft({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M13 8H3M7 4 3 8l4 4" />
    </svg>
  );
}

/* Black / white pill button. Renders an <a> when given href. */
export function Pill({ href, onClick, variant = 'dark', size = 'md', icon = true, className = '', children, ...rest }) {
  const base =
    'group/pill inline-flex items-center gap-2 rounded-full font-medium transition-all duration-300 ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon active:scale-[0.97]';
  const sizes = { sm: 'px-3.5 py-1.5 text-[13px]', md: 'px-5 py-2.5 text-sm', lg: 'px-6 py-3.5 text-[15px]' };
  const variants = {
    dark: 'bg-carbon text-white hover:bg-black hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]',
    light: 'border border-carbon/10 bg-white text-carbon hover:border-carbon/30',
    invert: 'bg-white text-carbon hover:bg-paper',
  };
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const cursor = variant === 'dark' ? { 'data-cursor': 'cta' } : {};
  const inner = (
    <>
      {children}
      {icon && (
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/pill:-translate-y-0.5 group-hover/pill:translate-x-0.5" />
      )}
    </>
  );
  if (href) {
    const external = /^https?:|^mailto:|^tel:|\.pdf$/.test(href);
    return (
      <a href={href} className={cls} {...cursor} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {inner}
      </a>
    );
  }
  return <button type="button" onClick={onClick} className={cls} {...cursor} {...rest}>{inner}</button>;
}

export function StatusPill({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-carbon/10 bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-carbon shadow-[0_4px_18px_-8px_rgba(0,0,0,0.25)] ${className}`}>
      <span className="live-dot h-2 w-2 rounded-full bg-live" />
      {children}
    </span>
  );
}

export function Tag({ children, dark = false }) {
  return (
    <span className={`rounded-full border px-3 py-1 text-[12px] font-medium ${dark ? 'border-white/15 text-white/75' : 'border-carbon/10 bg-white text-carbon/80'}`}>
      {children}
    </span>
  );
}

/* A single tool logo in a soft rounded tile (tooltip = skill name). */
export function ToolIcon({ id, size = 40, className = '' }) {
  const name = SKILL_NAMES[id] || id;
  return (
    <span
      title={name}
      className={`grid shrink-0 place-items-center rounded-xl border border-carbon/[0.07] bg-white shadow-[0_4px_14px_-8px_rgba(0,0,0,0.25)] ${className}`}
      style={{ width: size, height: size }}
    >
      <img src={skillSrc(id)} alt={name} loading="lazy" className="h-[58%] w-[58%] object-contain" />
    </span>
  );
}
