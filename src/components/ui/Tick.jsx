import React from 'react';

/* Pixel checkbox tick. */
export default function Tick({ className = 'bg-green' }) {
  return (
    <span className={`mt-0.5 grid h-[18px] w-[18px] flex-none place-items-center border-2 border-ink ${className}`}>
      <span className="block h-1 w-2 -translate-y-px rotate-[-45deg] border-b-2 border-l-2 border-ink" />
    </span>
  );
}
