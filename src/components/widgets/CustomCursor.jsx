import React from 'react';

/* Two-layer cursor for pointer devices: a dot that tracks the mouse exactly and
   a thin ring that trails it with easing. The ring morphs by context:
     links / small buttons      → wider ring with ↗
     [data-cursor="open"]       → filled disc "OPEN ↗"   (project cards)
     [data-cursor="cta"]        → filled disc "→"        (primary buttons)
     [data-cursor="hello"]      → filled disc "HELLO ↗"  (portraits)
     inputs, [data-native-cursor] → hidden (the native cursor shows instead)
   Small controls are magnetic: they lean toward the pointer and pull the ring to
   their centre. Colours flip to white over dark backgrounds. Touch devices keep
   the native cursor. The layer is pointer-events: none throughout. */

const LABELS = { link: '↗', open: 'OPEN ↗', hello: 'HELLO ↗', cta: '→', normal: '', text: '' };
const FINE = '(hover: hover) and (pointer: fine)';
const MAGNET_MAX_W = 260;
const MAGNET_MAX_H = 90;

function luminanceOf(color) {
  const m = color.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b, a = 1] = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  if (a < 0.5) return null; // mostly transparent: keep looking further up
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/* is the first solid background behind this element dark? */
function isDarkBehind(el) {
  for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
    const l = luminanceOf(getComputedStyle(n).backgroundColor);
    if (l !== null) return l < 0.42;
  }
  return false;
}

function stateFor(el) {
  if (!el || el.nodeType !== 1) return { state: 'normal', magnet: null };
  // fields and [data-native-cursor] areas (the music player) use the system cursor
  if (el.closest('input, textarea, select, [contenteditable="true"], [data-native-cursor]')) return { state: 'text', magnet: null };
  const tagged = el.closest('[data-cursor]');
  const control = el.closest('a, button, [role="button"], [role="tab"], label[for]');
  // the innermost of the two decides: a small control inside a tagged card wins
  const owner = control && tagged && tagged.contains(control) && control !== tagged ? control : tagged || control;
  if (!owner) return { state: 'normal', magnet: null };
  const kind = owner.getAttribute('data-cursor');
  const state = LABELS[kind] !== undefined ? kind : owner === control ? 'link' : 'normal';
  const r = owner.getBoundingClientRect();
  const small = r.width <= MAGNET_MAX_W && r.height <= MAGNET_MAX_H && owner.dataset.magnetic !== 'off';
  return { state, magnet: small && state !== 'open' && state !== 'hello' ? owner : null };
}

export default function CustomCursor() {
  const [enabled, setEnabled] = React.useState(() => typeof window !== 'undefined' && window.matchMedia(FINE).matches);
  const root = React.useRef(null);
  const dotPos = React.useRef(null);
  const ringPos = React.useRef(null);
  const label = React.useRef(null);

  // follow pointer-capability changes (e.g. a tablet with a mouse attached)
  React.useEffect(() => {
    const mq = window.matchMedia(FINE);
    const on = () => setEnabled(mq.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);

  React.useEffect(() => {
    if (!enabled) return undefined;
    const html = document.documentElement;
    html.classList.add('cc-on');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mouse = { x: -100, y: -100 };
    const dot = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let state = 'normal';
    let magnet = null;
    let raf = 0;
    let seen = false;

    const setState = (s) => {
      if (s === state) return;
      state = s;
      root.current.dataset.state = s;
      label.current.textContent = LABELS[s] || '';
    };

    const releaseMagnet = () => {
      if (!magnet) return;
      const el = magnet;
      magnet = null;
      const from = el.style.transform;
      el.style.transform = '';
      if (from && !reduce) {
        el.animate([{ transform: from }, { transform: 'translate3d(0,0,0)' }], { duration: 380, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
      }
    };

    const evaluate = (target) => {
      const { state: s, magnet: m } = stateFor(target);
      setState(s);
      if (m !== magnet) { releaseMagnet(); magnet = m; }
      root.current.dataset.theme = target && isDarkBehind(target) ? 'dark' : 'light';
    };

    const tick = () => {
      // magnetic pull: the ring leans toward the control's centre, the control toward the pointer
      let tx = mouse.x;
      let ty = mouse.y;
      if (magnet && magnet.isConnected) {
        const r = magnet.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        tx = mouse.x + (cx - mouse.x) * 0.4;
        ty = mouse.y + (cy - mouse.y) * 0.4;
        if (!reduce) {
          const mx = Math.max(-10, Math.min(10, (mouse.x - cx) * 0.22));
          const my = Math.max(-8, Math.min(8, (mouse.y - cy) * 0.3));
          magnet.style.transform = `translate3d(${mx.toFixed(2)}px, ${my.toFixed(2)}px, 0)`;
        }
      }
      const kDot = reduce ? 1 : 0.55;
      const kRing = reduce ? 1 : 0.16;
      dot.x += (mouse.x - dot.x) * kDot;
      dot.y += (mouse.y - dot.y) * kDot;
      ring.x += (tx - ring.x) * kRing;
      ring.y += (ty - ring.y) * kRing;
      dotPos.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
      ringPos.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      const moving = Math.abs(tx - ring.x) > 0.1 || Math.abs(ty - ring.y) > 0.1 || Math.abs(mouse.x - dot.x) > 0.1;
      raf = moving || magnet ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!seen) {
        seen = true;
        dot.x = ring.x = mouse.x;
        dot.y = ring.y = mouse.y;
      }
      root.current.dataset.visible = 'true';
      kick();
    };
    const onOver = (e) => evaluate(e.target);
    const onDown = () => { root.current.dataset.down = 'true'; };
    const onUp = () => { root.current.dataset.down = 'false'; };
    const onLeaveWindow = (e) => {
      if (!e.relatedTarget) { root.current.dataset.visible = 'false'; releaseMagnet(); }
    };
    // content scrolls under a still pointer → re-check what's beneath it
    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf || !seen) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        evaluate(document.elementFromPoint(mouse.x, mouse.y));
        kick();
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('mouseout', onLeaveWindow);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
      releaseMagnet();
      html.classList.remove('cc-on');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseout', onLeaveWindow);
      window.removeEventListener('scroll', onScroll);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={root} className="cc-root" aria-hidden="true" data-state="normal" data-theme="light" data-visible="false" data-down="false">
      <div ref={ringPos} className="cc-pos">
        <div className="cc-ring"><span ref={label} className="cc-label" /></div>
      </div>
      <div ref={dotPos} className="cc-pos">
        <div className="cc-dot" />
      </div>
    </div>
  );
}
