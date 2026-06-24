import React from 'react';
import Eyebrow from '../ui/Eyebrow.jsx';
import Button from '../ui/Button.jsx';
import { defaultContent } from '../../data/content.jsx';

/* Renders a single writing. Body uses a tiny markdown-lite:
   blank-line-separated blocks, "## " heading, "> " quote, "- " bullets,
   and **bold** inline. */

const dottedBg = {
  background:
    'radial-gradient(rgba(26,21,48,0.05) 1px, transparent 1px) 0 0 / 18px 18px, var(--color-cream-2)',
};

function inline(text) {
  return String(text)
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) =>
      i % 2 === 1
        ? <strong key={i} className="text-coral-sunset">{part}</strong>
        : <React.Fragment key={i}>{part}</React.Fragment>,
    );
}

function renderBody(body) {
  const blocks = String(body || '').split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return blocks.map((block, i) => {
    if (block.startsWith('## ')) {
      return (
        <h2 key={i} className="mb-4 mt-12 border-l-[6px] border-blue pl-3.5 font-pixel text-[clamp(13px,2vw,16px)] leading-[1.5]">
          {inline(block.slice(3))}
        </h2>
      );
    }
    if (block.startsWith('> ')) {
      const text = block.split('\n').map((l) => l.replace(/^>\s?/, '')).join(' ');
      return (
        <blockquote key={i} className="my-7 border-[3px] border-ink bg-cream p-[18px_20px] font-mono text-base shadow-pixel">
          {inline(text)}
        </blockquote>
      );
    }
    const lines = block.split('\n');
    if (lines.every((l) => l.startsWith('- '))) {
      return (
        <ul key={i} className="mb-[18px] flex flex-col gap-3">
          {lines.map((l, j) => (
            <li key={j} className="flex items-start gap-3 font-mono text-[15.5px] leading-[1.6]">
              <span aria-hidden="true" className="font-bold text-coral-deep">▸</span> {inline(l.slice(2))}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="mb-[18px] font-mono text-base leading-[1.7] text-ink-soft">
        {inline(block)}
      </p>
    );
  });
}

export default function Article({ go, writing }) {
  const w = writing || defaultContent.writings[0];

  return (
    <article className="py-[clamp(40px,6vw,72px)]" style={dottedBg}>
      <div className="mx-auto w-full max-w-[760px] px-[clamp(20px,5vw,40px)]">
        <button
          type="button"
          onClick={() => go('writing')}
          className="mb-9 inline-flex items-center gap-2 border-2 border-ink bg-cream px-2.5 py-1.5 font-pixel text-[9px] tracking-[0.08em] text-ink shadow-pixel-sm transition hover:-translate-x-px hover:-translate-y-px hover:bg-yellow"
        >
          ← BACK TO WRITING
        </button>

        <Eyebrow className="text-coral-sunset">▸ FROM THE JOURNAL · {w.date}</Eyebrow>
        <h1 className="mb-[18px] mt-[18px] font-pixel text-[clamp(20px,3.6vw,30px)] leading-[1.4]">
          {w.title}
        </h1>

        <div className="mb-9 flex flex-wrap gap-2.5">
          <span className="border-[3px] border-ink bg-yellow px-2.5 py-2 font-pixel text-[9px] tracking-[0.06em] shadow-pixel-sm">
            ▸ {w.read}
          </span>
          {w.tag && (
            <span className="border-[3px] border-ink bg-cream px-2.5 py-2 font-pixel text-[9px] tracking-[0.06em] shadow-pixel-sm">
              {w.tag}
            </span>
          )}
        </div>

        {renderBody(w.body)}

        <hr className="my-12 border-0 border-t-[3px] border-dashed border-ink/25" />

        <div className="mt-2 flex flex-wrap gap-3.5">
          <Button variant="coral" onClick={() => go('writing')}>← Back to writing</Button>
          <Button variant="ghost" onClick={() => go('contact')}>Get in touch</Button>
        </div>
      </div>
    </article>
  );
}
