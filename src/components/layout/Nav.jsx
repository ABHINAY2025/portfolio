import React from 'react';
import { Pill, StatusPill } from '../ui/site.jsx';

/* Floating top navigation. Transparent over the hero, condenses into a
   blurred pill once the page scrolls. */
export default function Nav({ links, onNavigate, status }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => { setOpen(false); onNavigate(id); };

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3">
      <nav
        className={`pointer-events-auto flex w-full max-w-[1240px] items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-500 ${
          scrolled || open
            ? 'border border-carbon/[0.06] bg-white/80 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.35)] backdrop-blur-xl'
            : 'border border-transparent'
        }`}
        aria-label="Primary"
      >
        <button type="button" onClick={() => go('top')} className="shrink-0 rounded-full" aria-label="Back to top">
          <StatusPill className="max-sm:hidden">{status}</StatusPill>
          <span className="font-wide text-[15px] font-extrabold tracking-tight sm:hidden">ABHINAY<span className="text-smoke">.</span></span>
        </button>

        <ul className="flex items-center gap-1 max-lg:hidden">
          {links.map(([id, label, count]) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => go(id)}
                className="group relative rounded-full px-4 py-2 text-[13.5px] font-medium text-carbon/80 transition-colors hover:bg-carbon/[0.05] hover:text-carbon"
              >
                {label}
                {count != null && <sup className="ml-0.5 text-[10px] text-smoke">({count})</sup>}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Pill onClick={() => go('contact')} size="sm">Let&rsquo;s Talk</Pill>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full bg-white text-carbon ring-1 ring-carbon/10 lg:hidden"
            aria-expanded={open}
            aria-label="Menu"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 h-[1.5px] w-4 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </nav>

      {/* mobile sheet */}
      <div
        className={`pointer-events-auto absolute inset-x-3 top-[64px] origin-top rounded-3xl border border-carbon/[0.06] bg-white/95 p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        {links.map(([id, label, count]) => (
          <button
            key={id}
            type="button"
            onClick={() => go(id)}
            className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-[22px] font-medium uppercase tracking-tight hover:bg-carbon/[0.04]"
          >
            {label}
            {count != null && <span className="text-sm text-smoke">({count})</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
