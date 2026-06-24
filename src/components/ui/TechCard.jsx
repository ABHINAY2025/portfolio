import React from 'react';
import { Icon } from '../../data/icons.jsx';

/* Project / stack card. tone='paper' (cream) or 'forest' (dark mossy). */
export default function TechCard({ data, kind = 'project', tone = 'paper' }) {
  const { num, color, title, icon, desc, chips, link } = data;
  const iconEl = typeof icon === 'string' ? <Icon name={icon} /> : icon;
  const Tag = link ? 'a' : 'article';
  const tagProps = link ? { href: link, target: '_blank', rel: 'noopener noreferrer' } : {};
  const label = kind === 'project' ? 'PROJ' : 'SET';
  const forest = tone === 'forest';

  const surface = forest ? 'bg-forest-card' : 'bg-cream';
  const numCls = forest ? 'text-leaf/70' : 'text-ink-mute';
  const titleCls = forest ? 'text-cream' : 'text-ink';
  const copyCls = forest ? 'text-cream/75' : 'text-ink-soft';
  const chipCls = forest ? 'bg-forest-deep text-cream' : 'bg-cream-2 text-ink';

  return (
    <Tag
      {...tagProps}
      className={`relative flex flex-col gap-3.5 overflow-hidden border-[3px] border-ink p-[26px] shadow-pixel transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pixel-lg ${surface}`}
    >
      <span
        className="absolute left-0 top-0 h-2 w-full border-b-[3px] border-ink"
        style={{ background: color }}
      />
      <div className="flex items-center gap-3 pt-1.5">
        <span
          className="grid h-[52px] w-[52px] place-items-center border-[3px] border-ink shadow-pixel-sm"
          style={{ background: color }}
        >
          {iconEl}
        </span>
        <div>
          <div className={`font-pixel text-[9px] tracking-[0.14em] ${numCls}`}>
            {label} / {num}
          </div>
          <h3 className={`font-pixel text-sm ${titleCls}`}>{title}</h3>
        </div>
      </div>

      <p className={`font-mono text-sm leading-relaxed ${copyCls}`}>{desc}</p>

      <div className="mt-auto flex flex-wrap gap-2 pt-3">
        {chips.map((c) => (
          <span
            key={c}
            className={`inline-flex items-center gap-1.5 border-2 border-ink px-2 pb-[5px] pt-1.5 font-pixel text-[8px] tracking-[0.06em] ${chipCls}`}
          >
            <span className="h-1.5 w-1.5" style={{ background: color }} />
            {c}
          </span>
        ))}
      </div>
    </Tag>
  );
}
