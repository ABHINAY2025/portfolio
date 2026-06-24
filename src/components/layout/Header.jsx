import React from 'react';
import Shell from '../ui/Shell.jsx';
import Button from '../ui/Button.jsx';
import { IconArrow } from '../ui/Icons.jsx';
import { TABS } from '../../data/content.jsx';

const THEMES = {
  light: {
    bar: 'bg-cream',
    brand: 'text-ink hover:text-purple-deep',
    idle: 'text-ink-soft',
    active: 'text-ink',
    hover: 'hover:text-ink',
    under: 'after:bg-yellow after:border-ink',
  },
  navy: {
    bar: 'bg-navy',
    brand: 'text-cream hover:text-coral-sunset',
    idle: 'text-cream/70',
    active: 'text-cream',
    hover: 'hover:text-cream',
    under: 'after:bg-coral-sunset after:border-coral-sunset',
  },
  forest: {
    bar: 'bg-forest',
    brand: 'text-cream hover:text-leaf',
    idle: 'text-cream/70',
    active: 'text-cream',
    hover: 'hover:text-cream',
    under: 'after:bg-leaf after:border-leaf',
  },
};

export default function Header({ view, go, theme }) {
  const t = THEMES[theme] || THEMES.light;

  const linkBase =
    'relative font-pixel text-[10px] tracking-[0.08em] py-1.5 transition-colors ' +
    "after:content-[''] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-1 after:border-b-2 after:opacity-0 hover:after:opacity-100 " +
    `${t.under} ${t.hover}`;

  return (
    <header className={`sticky top-0 z-20 border-b-[3px] border-ink ${t.bar}`}>
      <Shell>
        <div className="flex items-center justify-between gap-6 pt-[18px] pb-4">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); go('home'); }}
            className={`font-pixel text-base tracking-[0.02em] whitespace-nowrap ${t.brand}`}
          >
            ABHINAY_MA
          </a>

          <nav className="hidden min-[881px]:flex items-center gap-7" aria-label="Primary">
            {TABS.map(([id, label]) => {
              const active = view === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); go(id); }}
                  className={`${linkBase} ${active ? `${t.active} after:opacity-100` : t.idle}`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <Button
              href="#contact"
              variant="green"
              size="sm"
              onClick={(e) => { e.preventDefault(); go('contact'); }}
            >
              Get in touch <IconArrow />
            </Button>
          </div>
        </div>
      </Shell>
    </header>
  );
}
