import React, { useEffect, useRef, useState } from 'react';
import { useSound } from './SoundProvider.jsx';
import './music-player.css';

/* ============================================
   90s pixel kid sprite (sunglasses + headphones)
   14 cols x 20 rows, 1 char = 1 pixel cell
   ============================================ */

const KID_GRID = [
  '...iiiiiiiii..',
  '..ippppppppi..',
  '.iPPPPpppppPi.',
  '.iPPPPPPpppPi.',
  '.iiiiiiiiiiii.',
  'iHsssssssssHi.',
  'ihHkkkkkkkkHhi',
  'ihHwkkkkkkwHhi',
  'ihHsssssssssHi',
  '.iSsssssssssSi',
  '.iSssrrrrssSi.',
  '..iSsssssssi..',
  '..iiiiiiiiii..',
  '.iyrryyyyyryi.',
  'iyyyrryryryyyi',
  'iyyyyyyyyyyyyi',
  'iyyyyyyyyyyyyi',
  'iyyyyiiiyyyyyi',
  '.iddi.i.iddi..',
  '.iddi...iddi..',
  '.ibbi...ibbi..',
];

const KID_COLORS = {
  i: '#1A1530',         // ink outline
  p: '#B9A5F1',         // cap purple
  P: '#9682D9',         // cap shadow
  s: '#FFD3B5',         // skin
  S: '#E8B59C',         // skin shadow
  k: '#1A1530',         // sunglasses
  w: '#FFF7F1',         // gleam
  h: '#FFB79D',         // headphone speaker
  H: '#FFD86B',         // headphone band
  y: '#FFD86B',         // shirt yellow
  r: '#FFB79D',         // shirt stripe coral
  d: '#5DB7E8',         // pants blue
  D: '#3D97C8',
  b: '#1A1530',         // shoes
};

function RetroKid({ playing, cell = 5 }) {
  const cols = KID_GRID[0].length;
  const rows = KID_GRID.length;
  return (
    <svg
      className={`kid ${playing ? 'kid--bobbing' : 'kid--idle'}`}
      width={cols * cell}
      height={rows * cell}
      viewBox={`0 0 ${cols * cell} ${rows * cell}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* head group — animated when bobbing */}
      <g className="kid__head">
        {KID_GRID.slice(0, 13).map((row, y) =>
          [...row].map((ch, x) => {
            const fill = KID_COLORS[ch];
            if (!fill) return null;
            return (
              <rect key={`h-${x}-${y}`} x={x * cell} y={y * cell} width={cell} height={cell} fill={fill} />
            );
          })
        )}
      </g>
      {/* body group — slight torso animation */}
      <g className="kid__body">
        {KID_GRID.slice(13).map((row, y) =>
          [...row].map((ch, x) => {
            const fill = KID_COLORS[ch];
            if (!fill) return null;
            return (
              <rect key={`b-${x}-${y}`} x={x * cell} y={(y + 13) * cell} width={cell} height={cell} fill={fill} />
            );
          })
        )}
      </g>
      {/* musical notes when playing */}
      {playing && (
        <g className="kid__notes" aria-hidden="true">
          <text x={cols * cell - 14} y={10} fontSize={12} fill="#9682D9" className="note note--1">♪</text>
          <text x={cols * cell - 6}  y={22} fontSize={10} fill="#FFB79D" className="note note--2">♫</text>
          <text x={cols * cell - 2}  y={34} fontSize={11} fill="#FFD86B" className="note note--3">♪</text>
        </g>
      )}
    </svg>
  );
}

/* ============================================
   chunky retro boombox / speaker
   ============================================ */

function Boombox({ playing }) {
  return (
    <svg
      className={`boombox ${playing ? 'boombox--on' : 'boombox--off'}`}
      width="92"
      height="76"
      viewBox="0 0 92 76"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* handle */}
      <rect x="32" y="3"  width="28" height="3" fill="#1A1530" />
      <rect x="29" y="6"  width="3"  height="6" fill="#1A1530" />
      <rect x="60" y="6"  width="3"  height="6" fill="#1A1530" />

      {/* body shadow */}
      <rect x="6" y="14" width="80" height="56" fill="#1A1530" />
      {/* body face */}
      <rect x="9" y="17" width="74" height="50" fill="#FFF7F1" />

      {/* top control strip */}
      <rect x="9"  y="17" width="74" height="9"  fill="#1A1530" />
      <rect x="14" y="20" width="6"  height="3"  fill="#FFD86B" />
      <rect x="22" y="20" width="6"  height="3"  fill="#B9A5F1" />
      <rect x="30" y="20" width="6"  height="3"  fill="#5DB7E8" />
      <rect x="56" y="20" width="22" height="3"  fill="#FFB79D" />

      {/* left speaker outer */}
      <circle cx="26" cy="46" r="14" fill="#1A1530" />
      <circle cx="26" cy="46" r="11" fill="#B9A5F1" />
      <circle cx="26" cy="46" r="7"  fill="#1A1530" />
      <circle cx="26" cy="46" r="4"  fill="#FFD86B" />
      <rect   x="24" y="44" width="4" height="4" fill="#1A1530" />

      {/* right speaker outer */}
      <circle cx="66" cy="46" r="14" fill="#1A1530" />
      <circle cx="66" cy="46" r="11" fill="#FFB79D" />
      <circle cx="66" cy="46" r="7"  fill="#1A1530" />
      <circle cx="66" cy="46" r="4"  fill="#FFD86B" />
      <rect   x="64" y="44" width="4" height="4" fill="#1A1530" />

      {/* center cassette / status display */}
      <rect x="42" y="32" width="8" height="22" fill="#1A1530" />
      <rect x="44" y="34" width="4" height="18" fill="#5DB7E8" className="bx-screen" />

      {/* sound waves (only when playing) */}
      <g className="bx-waves" pointerEvents="none">
        <path d="M 6 46 Q 0 40 0 46 Q 0 52 6 46" fill="none" stroke="#1A1530" strokeWidth="2" className="bx-wave bx-wave--l1" />
        <path d="M 4 46 Q -4 36 -4 46 Q -4 56 4 46" fill="none" stroke="#9682D9" strokeWidth="2" className="bx-wave bx-wave--l2" />
        <path d="M 86 46 Q 92 40 92 46 Q 92 52 86 46" fill="none" stroke="#1A1530" strokeWidth="2" className="bx-wave bx-wave--r1" />
        <path d="M 88 46 Q 96 36 96 46 Q 96 56 88 46" fill="none" stroke="#FF9573" strokeWidth="2" className="bx-wave bx-wave--r2" />
      </g>

      {/* OFF mute slash */}
      {!playing && (
        <g pointerEvents="none">
          <line x1="14" y1="68" x2="78" y2="14" stroke="#1A1530" strokeWidth="3" />
          <line x1="13" y1="69" x2="77" y2="13" stroke="#FFB79D" strokeWidth="1" />
        </g>
      )}
    </svg>
  );
}

/* ============================================
   top-level music player widget
   ============================================ */

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);
  const { playPowerUp } = useSound();

  useEffect(() => {
    const a = new Audio('/audio/time-lord.mp3');
    a.loop = true;
    a.volume = 0.42;
    a.preload = 'auto';
    audioRef.current = a;

    // try autoplay immediately
    let cancelled = false;
    const tryPlay = () =>
      a
        .play()
        .then(() => {
          if (!cancelled) setPlaying(true);
        })
        .catch(() => {
          /* autoplay blocked — wait for first user gesture */
        });
    tryPlay();

    // fallback: start music on the very first user interaction anywhere
    const onFirstGesture = () => {
      if (a.paused) {
        a.play()
          .then(() => setPlaying(true))
          .catch(() => {});
      }
      setHasInteracted(true);
    };
    window.addEventListener('pointerdown', onFirstGesture, { once: true, passive: true });
    window.addEventListener('keydown', onFirstGesture, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('pointerdown', onFirstGesture);
      window.removeEventListener('keydown', onFirstGesture);
      a.pause();
      a.src = '';
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    setHasInteracted(true);
    playPowerUp();
    if (a.paused) {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <div className={`music-player ${playing ? 'is-playing' : 'is-paused'}`} role="region" aria-label="Background music">
      <div className="music-player__inner">
        <RetroKid playing={playing} />

        <div className="music-player__main">
          <div className="music-player__meta">
            <span className="music-player__eyebrow">▸ NOW SPINNING</span>
            <span className="music-player__title">TIME LORD — TITLE</span>
            <div className="music-player__eq" aria-hidden="true">
              <span /><span /><span /><span /><span />
            </div>
          </div>

          <button
            className="music-player__toggle"
            onClick={toggle}
            data-no-click="true"
            aria-pressed={playing}
            aria-label={playing ? 'Pause music' : 'Play music'}
            title={playing ? 'Pause music' : 'Play music'}
          >
            <Boombox playing={playing} />
            <span className="music-player__toggle-label">
              {playing ? '◼ PAUSE' : '▶ PLAY'}
            </span>
          </button>
        </div>
      </div>

      {!hasInteracted && (
        <div className="music-player__hint" aria-hidden="true">
          ◂ press play
        </div>
      )}
    </div>
  );
}
