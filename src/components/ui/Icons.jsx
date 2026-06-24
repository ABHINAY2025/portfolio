import React from 'react';

/* ------------ pixel-block icon helper ------------ */
/* renders a grid of <rect> blocks driven by an 8x8 string map.
   '.' = empty, anything else = filled with `color`              */
function PixelGrid({ map, color = 'var(--ink)', size = 32, cell }) {
  const rows = map.trim().split('\n').map((r) => r.trim());
  const cols = rows[0].length;
  const c = cell ?? size / cols;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${cols * c} ${rows.length * c}`}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {rows.map((row, y) =>
        [...row].map((ch, x) =>
          ch !== '.' ? (
            <rect key={`${x}-${y}`} x={x * c} y={y * c} width={c} height={c} fill={color} />
          ) : null
        )
      )}
    </svg>
  );
}

/* ------------ feature icons (pixel) ------------ */

export const IconHeart = ({ size = 34 }) => (
  <PixelGrid
    size={size}
    color="var(--ink)"
    map={`
.XX..XX.
XXXXXXXX
XXXXXXXX
XXXXXXXX
.XXXXXX.
..XXXX..
...XX...
........
`}
  />
);

export const IconStar = ({ size = 34 }) => (
  <PixelGrid
    size={size}
    color="var(--ink)"
    map={`
...XX...
...XX...
.XXXXXX.
XXXXXXXX
.XXXXXX.
.XX..XX.
XX....XX
........
`}
  />
);

export const IconDiamond = ({ size = 34 }) => (
  <PixelGrid
    size={size}
    color="var(--ink)"
    map={`
..XXXX..
.XXXXXX.
XXXXXXXX
XXXXXXXX
.XXXXXX.
..XXXX..
...XX...
........
`}
  />
);

/* ------------ services icons (pixel) ------------ */

export const IconCode = ({ size = 30 }) => (
  <PixelGrid
    size={size}
    color="var(--ink)"
    map={`
........
.XX..XX.
XX....XX
X......X
X......X
XX....XX
.XX..XX.
........
`}
  />
);

export const IconMobile = ({ size = 30 }) => (
  <PixelGrid
    size={size}
    color="var(--ink)"
    map={`
.XXXXXX.
.X....X.
.X.XX.X.
.X.XX.X.
.X....X.
.X.XX.X.
.XXXXXX.
...XX...
`}
  />
);

export const IconCloud = ({ size = 30 }) => (
  <PixelGrid
    size={size}
    color="var(--ink)"
    map={`
........
..XXXX..
.X....X.
XX....XX
X......X
XXXXXXXX
........
........
`}
  />
);

export const IconAi = ({ size = 30 }) => (
  <PixelGrid
    size={size}
    color="var(--ink)"
    map={`
.XXXXXX.
X......X
X.X..X.X
X......X
X.XXXX.X
X.X..X.X
X......X
.XXXXXX.
`}
  />
);

export const IconServer = ({ size = 30 }) => (
  <PixelGrid
    size={size}
    color="var(--ink)"
    map={`
XXXXXXXX
X.O....X
XXXXXXXX
X.O....X
XXXXXXXX
X.O....X
XXXXXXXX
........
`}
  />
);

export const IconData = ({ size = 30 }) => (
  <PixelGrid
    size={size}
    color="var(--ink)"
    map={`
.XXXXXX.
X......X
X......X
.XXXXXX.
X......X
X......X
.XXXXXX.
........
`}
  />
);

/* ------------ arrow ------------ */

export const IconArrow = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
    <path d="M0 0 L10 5 L0 10 Z" fill="currentColor" />
  </svg>
);

/* ------------ trusted-by logos (simplified marks) ------------ */

export const IconGithub = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2C6.48 2 2 6.58 2 12.21c0 4.5 2.87 8.31 6.84 9.66.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.36-3.37-1.36-.46-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.36-2.22-.26-4.55-1.13-4.55-5.03 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.29.1-2.69 0 0 .84-.27 2.75 1.04A9.4 9.4 0 0 1 12 6.84c.85.004 1.71.12 2.51.34 1.91-1.31 2.75-1.04 2.75-1.04.55 1.4.2 2.43.1 2.69.64.71 1.03 1.62 1.03 2.73 0 3.91-2.34 4.77-4.57 5.02.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.21C22 6.58 17.52 2 12 2Z"
      fill="currentColor"
    />
  </svg>
);

export const IconVercel = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2 L22 20 L2 20 Z" fill="currentColor" />
  </svg>
);

export const IconFirebase = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M5 18 L12 3 L13.5 7.2 L8 18 Z M5 18 L12 21 L19 18 L13.5 7.2 Z"
      fill="currentColor"
    />
  </svg>
);

export const IconDocker = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="3"  y="11" width="3" height="3" />
    <rect x="7"  y="11" width="3" height="3" />
    <rect x="11" y="11" width="3" height="3" />
    <rect x="7"  y="7"  width="3" height="3" />
    <rect x="11" y="7"  width="3" height="3" />
    <rect x="11" y="3"  width="3" height="3" />
    <path d="M2 14 H17 C20 14 22 16 22 18 H2 Z" />
  </svg>
);

export const IconLens = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="12" cy="12" r="3.5" fill="currentColor" />
  </svg>
);

/* ------------ social icons ------------ */

export const IconTwitter = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.844l-5.36-6.99L4.5 22H1.244l8.04-9.19L1 2h7.014l4.85 6.41L18.244 2Zm-1.2 18h1.86L7.04 4H5.06L17.044 20Z" />
  </svg>
);

export const IconDiscord = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.07.07 0 0 0-.073.035c-.21.375-.444.864-.608 1.247a18.27 18.27 0 0 0-5.487 0 12.5 12.5 0 0 0-.617-1.247.07.07 0 0 0-.073-.035 19.74 19.74 0 0 0-4.886 1.515.06.06 0 0 0-.03.025C.533 9.046-.32 13.58.099 18.057a.08.08 0 0 0 .031.055 19.9 19.9 0 0 0 5.993 3.03.08.08 0 0 0 .084-.026c.461-.63.873-1.295 1.226-1.994a.07.07 0 0 0-.041-.1 13.1 13.1 0 0 1-1.872-.892.07.07 0 0 1-.007-.118c.126-.094.252-.192.372-.292a.07.07 0 0 1 .073-.01c3.927 1.793 8.18 1.793 12.061 0a.07.07 0 0 1 .074.009c.12.1.246.198.372.292a.07.07 0 0 1-.005.118c-.598.349-1.22.645-1.873.892a.07.07 0 0 0-.04.1c.36.698.772 1.362 1.225 1.993a.08.08 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.08.08 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.026ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.42 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.335-.956 2.42-2.157 2.42Zm7.974 0c-1.184 0-2.157-1.085-2.157-2.42 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.335-.946 2.42-2.157 2.42Z" />
  </svg>
);

export const IconLinkedin = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.86 3.38-1.86 3.61 0 4.28 2.38 4.28 5.47v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

export const IconYoutube = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
  </svg>
);

/* ------------ floating decorative blob ------------ */
/* organic squiggle SVG, positioned absolutely by parent */

export const Blob = ({ className, color = 'var(--purple)' }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M52 6c14 0 32 8 38 22 7 14-2 30-14 38-12 9-29 16-42 8C19 65 6 53 6 38 6 22 25 6 52 6Z"
      fill={color}
      stroke="var(--ink)"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <ellipse cx="38" cy="34" rx="10" ry="6" fill="rgba(255,255,255,0.55)" />
  </svg>
);
