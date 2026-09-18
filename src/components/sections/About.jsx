import React from 'react';
import { Container, Reveal } from '../ui/site.jsx';
import { defaultContent } from '../../data/content.jsx';

/* words shown bold in their own colour inside the statement (a colour string or a style object) */
const BRAND_WORDS = {
  Kubernetes: '#326ce5', // Kubernetes blue
  AWS: '#ff9900', // Amazon orange
  CICD: '#7c3aed', // CI/CD — purple (punctuation is stripped before lookup)
  monitoring: '#059669', // emerald — the "all systems healthy" green
  alerting: '#e11d48', // red
  designed: {
    backgroundImage: 'linear-gradient(90deg, #ef4444, #f59e0b, #eab308, #22c55e, #3b82f6, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  },
};

/* Statement paragraph whose words ink in as it scrolls through the viewport,
   followed by a row of headline numbers. */
export default function About({ about = defaultContent.about }) {
  const ref = React.useRef(null);
  const words = String(about.intro || '').split(/\s+/).filter(Boolean);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.setProperty('--p', '1'); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.85 - r.top) / (r.height + vh * 0.35);
      el.style.setProperty('--p', String(Math.min(1, Math.max(0, p))));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <section id="about" className="site bg-paper py-[clamp(90px,12vw,160px)]">
      <Container>
        <Reveal className="mb-8 text-[13px] font-medium uppercase tracking-[0.2em] text-smoke">( About )</Reveal>
        <p
          ref={ref}
          className="max-w-[1080px] text-[clamp(26px,3.6vw,48px)] font-medium leading-[1.18] tracking-[-0.02em]"
          style={{ '--p': 0 }}
        >
          {words.map((w, i) => {
            const brand = BRAND_WORDS[w.replace(/[^\w]/g, '')];
            return (
              <span
                key={i}
                className="transition-opacity duration-200"
                style={{
                  opacity: `clamp(0.14, calc(var(--p) * ${words.length * 1.15} - ${i}), 1)`,
                  ...(brand && { fontWeight: 700, ...(typeof brand === 'string' ? { color: brand } : brand) }),
                }}
              >
                {w}{' '}
              </span>
            );
          })}
        </p>

        {about.stats?.length > 0 && (
          <dl className="mt-[clamp(56px,8vw,96px)] grid grid-cols-4 border-t border-carbon/10 max-md:grid-cols-2">
            {about.stats.map((s, i) => (
              <Reveal
                key={i}
                delay={i * 90}
                className="flex flex-col gap-2 border-carbon/10 pt-7 pr-6 max-md:pb-6 [&:not(:first-child)]:md:border-l [&:not(:first-child)]:md:pl-6"
              >
                <dt className="order-2 text-[13.5px] leading-snug text-smoke">{s.label}</dt>
                <dd className="order-1 font-wide text-[clamp(40px,5vw,68px)] font-bold leading-none tracking-tight">{s.value}</dd>
              </Reveal>
            ))}
          </dl>
        )}
      </Container>
    </section>
  );
}
