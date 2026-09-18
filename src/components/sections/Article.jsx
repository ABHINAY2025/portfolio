import React from 'react';
import { Container, Pill, ArrowLeft } from '../ui/site.jsx';
import { defaultContent } from '../../data/content.jsx';

/* Renders a single writing. Body uses a tiny markdown-lite:
   blank-line-separated blocks, "## " heading, "> " quote, "- " bullets,
   and **bold** inline. */

function inline(text) {
  return String(text)
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) =>
      i % 2 === 1
        ? <strong key={i} className="font-semibold text-carbon">{part}</strong>
        : <React.Fragment key={i}>{part}</React.Fragment>,
    );
}

function renderBody(body) {
  const blocks = String(body || '').split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return blocks.map((block, i) => {
    if (block.startsWith('## ')) {
      return (
        <h2 key={i} className="mb-5 mt-14 text-[clamp(24px,2.6vw,32px)] font-semibold tracking-[-0.02em]">
          {inline(block.slice(3))}
        </h2>
      );
    }
    if (block.startsWith('> ')) {
      const text = block.split('\n').map((l) => l.replace(/^>\s?/, '')).join(' ');
      return (
        <blockquote key={i} className="my-10 border-l-2 border-carbon pl-6 text-[clamp(20px,2.2vw,26px)] font-medium leading-snug tracking-[-0.01em]">
          {inline(text)}
        </blockquote>
      );
    }
    const lines = block.split('\n');
    if (lines.every((l) => l.startsWith('- '))) {
      return (
        <ul key={i} className="mb-6 flex flex-col gap-3">
          {lines.map((l, j) => (
            <li key={j} className="flex items-start gap-3 text-[17px] leading-relaxed text-carbon/75">
              <span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-carbon" /> {inline(l.slice(2))}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="mb-6 text-[17px] leading-[1.8] text-carbon/75">
        {inline(block)}
      </p>
    );
  });
}

export default function Article({ writing, onBack }) {
  const w = writing || defaultContent.writings[0];
  return (
    <article className="site min-h-screen bg-white pb-28 pt-24">
      <Container max="max-w-[820px]">
        <div className="mb-14">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full border border-carbon/10 bg-white px-3.5 py-1.5 text-[13px] font-medium transition hover:border-carbon"
          >
            <ArrowLeft /> Back
          </button>
        </div>
        <div className="anim-fade-up">
          <div className="flex flex-wrap gap-3 text-[13px] text-smoke">
            <span>{w.date}</span><span>·</span><span>{w.read}</span><span>·</span><span>{w.tag}</span>
          </div>
          <h1 className="mb-12 mt-5 text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.035em]">{w.title}</h1>
          {renderBody(w.body)}
          <div className="mt-16 flex flex-wrap gap-3 border-t border-carbon/10 pt-10">
            <Pill onClick={onBack} icon={false}>More from the portfolio</Pill>
          </div>
        </div>
      </Container>
    </article>
  );
}
