import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';

const SoundCtx = createContext(null);

export function SoundProvider({ children }) {
  const clickPool = useRef([]);
  const powerUp = useRef(null);
  const initialized = useRef(false);

  // create a small pool of click <Audio> nodes so rapid presses overlap cleanly
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    clickPool.current = Array.from({ length: 4 }, () => {
      const a = new Audio('/audio/click.mp3');
      a.volume = 0.5;
      a.preload = 'auto';
      return a;
    });
    powerUp.current = new Audio('/audio/power-up.mp3');
    powerUp.current.volume = 0.6;
    powerUp.current.preload = 'auto';
  }, []);

  const playClick = useCallback(() => {
    const pool = clickPool.current;
    if (!pool.length) return;
    // pick the first node that is paused, else round-robin
    const node = pool.find((a) => a.paused || a.ended) ?? pool[0];
    try {
      node.currentTime = 0;
      node.play().catch(() => {});
    } catch {}
  }, []);

  const playPowerUp = useCallback(() => {
    const a = powerUp.current;
    if (!a) return;
    try {
      a.currentTime = 0;
      a.play().catch(() => {});
    } catch {}
  }, []);

  // delegated click sounds — every interactive element on the page
  useEffect(() => {
    const SELECTOR = [
      '.btn',
      '.nav a',
      '.feature-card__link',
      '.tcard',
      '.sbtn',
      '.fcol a',
      '.trustedby__logo',
      '[data-click]',
    ].join(',');

    const onPointer = (e) => {
      const target = e.target.closest?.(SELECTOR);
      if (!target) return;
      // skip if explicitly opted out (the music toggle uses power-up SFX instead)
      if (target.dataset.noClick === 'true') return;
      playClick();
    };

    document.addEventListener('pointerdown', onPointer, { passive: true });
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [playClick]);

  return (
    <SoundCtx.Provider value={{ playClick, playPowerUp }}>{children}</SoundCtx.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundCtx);
  if (!ctx) throw new Error('useSound must be used inside <SoundProvider>');
  return ctx;
}
