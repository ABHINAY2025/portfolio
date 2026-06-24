import React from 'react';

/* Pressable pixel button. Renders as <a> when `href` is given, else <button>. */

const VARIANTS = {
  yellow: 'bg-yellow text-ink',
  coral: 'bg-coral text-ink',
  blue: 'bg-blue text-ink',
  purple: 'bg-purple text-ink',
  green: 'bg-green text-ink',
  ghost: 'bg-cream text-ink',
  ink: 'bg-ink text-cream',
};

const SIZES = {
  sm: 'px-[14px] pt-[10px] pb-[9px] text-[9px] shadow-pixel-sm hover:shadow-pixel active:translate-x-[4px] active:translate-y-[4px]',
  md: 'px-[22px] pt-[14px] pb-[13px] text-[11px] shadow-pixel hover:shadow-pixel-lg active:translate-x-[6px] active:translate-y-[6px]',
  lg: 'px-[28px] pt-[18px] pb-[17px] text-[12px] shadow-pixel-lg hover:shadow-[9px_9px_0_var(--color-ink)] active:translate-x-[8px] active:translate-y-[8px]',
};

const BASE =
  'inline-flex items-center justify-center gap-2.5 font-pixel uppercase tracking-[0.06em] ' +
  'border-[3px] border-ink select-none whitespace-nowrap cursor-pointer ' +
  'transition-[transform,box-shadow,background] duration-100 ' +
  'hover:-translate-x-px hover:-translate-y-px active:shadow-none';

export default function Button({
  as,
  variant = 'ghost',
  size = 'md',
  pressed = false,
  className = '',
  children,
  ...props
}) {
  const Tag = as || (props.href ? 'a' : 'button');
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${
    pressed ? 'translate-x-[6px] translate-y-[6px] !shadow-none' : ''
  } ${className}`;
  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
