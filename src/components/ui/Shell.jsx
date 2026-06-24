import React from 'react';

/* Centered max-width container with responsive gutters. */
export default function Shell({ className = '', children }) {
  return (
    <div
      className={`relative z-[1] w-full max-w-[1240px] mx-auto px-[clamp(20px,4vw,56px)] ${className}`}
    >
      {children}
    </div>
  );
}
