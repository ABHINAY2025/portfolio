import React from 'react';

/* Pixel eyebrow label with the two-tone leading bar. */
export default function Eyebrow({ children, className = 'text-purple-night' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-pixel text-[10px] tracking-[0.18em] uppercase ${className}`}>
      <span
        aria-hidden="true"
        className="inline-block h-1.5 w-[18px]"
        style={{
          background:
            'linear-gradient(to right, var(--color-purple) 0 6px, transparent 6px 12px, var(--color-coral) 12px 18px)',
        }}
      />
      {children}
    </span>
  );
}
