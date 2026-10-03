import React from 'react';
import { Container, SectionTitle, Reveal, Pill, ArrowUpRight } from '../ui/site.jsx';
import { defaultContent } from '../../data/content.jsx';
import { embedSrc, postHref } from '../../data/linkedin.js';

/* Latest from LinkedIn: each item is one of LinkedIn's own embedded posts, so
   the text, images and reactions are whatever the live post says — nothing is
   copied here. Add or remove posts in /admin; no deploy needed.
   The frames only load once they scroll into view. */

function Post({ item, delay }) {
  const box = React.useRef(null);
  const [near, setNear] = React.useState(false);
  const src = embedSrc(item.url);
  const href = postHref(item.url);

  React.useEffect(() => {
    const el = box.current;
    if (!el || near) return undefined;
    if (!('IntersectionObserver' in window)) { setNear(true); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: '300px' });
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  return (
    <Reveal delay={delay} className="flex flex-col">
      <div
        ref={box}
        className="relative overflow-hidden rounded-[20px] border border-carbon/10 bg-white"
        style={{ height: Number(item.height) || 560 }}
      >
        {src && near ? (
          <iframe
            src={src}
            title={item.note || 'LinkedIn post'}
            loading="lazy"
            frameBorder="0"
            allowFullScreen
            className="h-full w-full"
          />
        ) : (
          <div className="grid h-full place-items-center p-6 text-center text-[13.5px] text-smoke">
            {src ? 'Loading post…' : 'Add a LinkedIn post link in the admin to show it here.'}
          </div>
        )}
      </div>
      {(item.note || href) && (
        <div className="mt-3 flex items-start justify-between gap-4">
          <p className="text-[14px] leading-snug text-smoke">{item.note}</p>
          {href && (
            <a href={href} target="_blank" rel="noopener noreferrer" className="group inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-carbon/70 transition-colors hover:text-carbon">
              View <ArrowUpRight className="h-3 w-3 transition-transform group-hover:rotate-45" />
            </a>
          )}
        </div>
      )}
    </Reveal>
  );
}

export default function Updates({ items = defaultContent.updates, contact = defaultContent.contact }) {
  const list = (items || []).filter((i) => i && i.url);
  if (!list.length) return null;
  return (
    <section id="updates" className="site bg-white py-[clamp(90px,12vw,160px)]">
      <Container>
        <SectionTitle ghost="LINKEDIN" meta="Straight from my LinkedIn feed">UPDATES</SectionTitle>

        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {list.map((item, i) => (
            <Post key={item.url} item={item} delay={(i % 3) * 90} />
          ))}
        </div>

        {contact.linkedin && (
          <Reveal delay={150} className="mt-12 flex justify-center">
            <Pill href={contact.linkedin} variant="light">Follow on LinkedIn</Pill>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
