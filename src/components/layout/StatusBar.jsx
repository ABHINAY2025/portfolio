import React from 'react';

const items = [
  { label: '● ONLINE — ABHINAY_MA · portfolio v1.0', dot: 'bg-green-deep border-green' },
  { label: 'Currently building backends at FISEC Global', dot: 'bg-blue border-blue-deep' },
  { label: 'Full-stack developer ✦ AI enthusiast', dot: 'bg-coral border-coral-deep' },
  { label: 'Java · Microservices · React · Python', dot: 'bg-yellow border-yellow-deep' },
  { label: 'Open to interesting problems → say hi below', dot: 'bg-purple border-purple-deep' },
];

const BARS = { navy: 'bg-navy-deep', forest: 'bg-forest-deep' };

export default function StatusBar({ theme }) {
  const doubled = [...items, ...items];
  return (
    <div
      role="status"
      className={`relative z-30 overflow-hidden border-b-[3px] border-ink font-pixel text-[9px] tracking-[0.16em] text-cream py-[9px] ${
        BARS[theme] || 'bg-ink'
      }`}
    >
      <div className="flex w-max gap-[60px] whitespace-nowrap animate-marquee">
        {doubled.map((it, i) => (
          <span key={i} className="inline-flex items-center gap-2.5">
            <span className={`w-2 h-2 border animate-blink ${it.dot}`} />
            {it.label}
          </span>
        ))}
      </div>
    </div>
  );
}
