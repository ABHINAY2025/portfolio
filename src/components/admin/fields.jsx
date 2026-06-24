import React from 'react';

/* Reusable retro-styled form primitives for the admin. */

export const inputCls =
  'w-full border-[3px] border-ink bg-cream p-[10px_12px] font-mono text-[14px] text-ink outline-none ' +
  'shadow-pixel-sm transition-[transform,box-shadow] duration-100 placeholder:text-ink-mute ' +
  'focus:-translate-x-px focus:-translate-y-px focus:shadow-[6px_6px_0_var(--color-purple)]';

export const labelCls = 'font-pixel text-[9px] uppercase tracking-[0.12em] text-ink-soft';

export function Field({ label, hint, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      {label && <span className={labelCls}>{label}</span>}
      {children}
      {hint && <span className="font-mono text-[11px] text-ink-mute">{hint}</span>}
    </label>
  );
}

export function TextField({ label, value, onChange, placeholder, hint }) {
  return (
    <Field label={label} hint={hint}>
      <input className={inputCls} value={value ?? ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

export function TextArea({ label, value, onChange, rows = 4, placeholder, hint }) {
  return (
    <Field label={label} hint={hint}>
      <textarea
        rows={rows}
        className={`${inputCls} resize-y leading-[1.55]`}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

export function SelectField({ label, value, onChange, options }) {
  return (
    <Field label={label}>
      <select className={`${inputCls} cursor-pointer`} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const v = typeof o === 'string' ? o : o.value;
          const l = typeof o === 'string' ? o : o.label;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </Field>
  );
}

/* chips edited as a comma-separated string, kept in local state to avoid
   cursor jumps; pushes a trimmed array to the parent. */
export function ChipsField({ label, value = [], onChange, hint = 'comma-separated' }) {
  const [text, setText] = React.useState(() => (value || []).join(', '));
  return (
    <Field label={label} hint={hint}>
      <input
        className={inputCls}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onChange(e.target.value.split(',').map((s) => s.trim()).filter(Boolean));
        }}
      />
    </Field>
  );
}

export function ImageField({ label, value, onChange, adminKey }) {
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState('');

  const onFile = async (file) => {
    if (!file) return;
    setBusy(true);
    setErr('');
    try {
      const dataUrl = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result);
        r.onerror = rej;
        r.readAsDataURL(file);
      });
      const resp = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ dataUrl }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data.error || 'upload failed');
      onChange(data.url);
    } catch (e) {
      setErr(e.message || 'upload failed');
    }
    setBusy(false);
  };

  return (
    <Field label={label} hint="upload a file, or paste an image URL">
      <div className="flex flex-col gap-2">
        <input
          className={inputCls}
          value={value ?? ''}
          placeholder="/api/uploads/… or https://…"
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="flex items-center gap-3">
          <label className="cursor-pointer border-[3px] border-ink bg-yellow px-3 py-2 font-pixel text-[9px] uppercase tracking-[0.08em] shadow-pixel-sm transition hover:-translate-x-px hover:-translate-y-px">
            {busy ? 'Uploading…' : 'Upload image'}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
          {value && <img src={value} alt="" className="h-12 w-12 border-2 border-ink object-cover" />}
          {value && (
            <button type="button" onClick={() => onChange('')} className="font-mono text-[11px] text-coral-deep underline">
              use default
            </button>
          )}
        </div>
        {err && <span className="font-mono text-[11px] text-coral-deep">⚠ {err}</span>}
      </div>
    </Field>
  );
}

/* upload any file (e.g. a résumé PDF) or paste a URL; shows an "open" link */
export function FileField({ label, value, onChange, adminKey, accept = '*/*', hint }) {
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState('');

  const onFile = async (file) => {
    if (!file) return;
    setBusy(true);
    setErr('');
    try {
      const dataUrl = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result);
        r.onerror = rej;
        r.readAsDataURL(file);
      });
      const resp = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ dataUrl }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data.error || 'upload failed');
      onChange(data.url);
    } catch (e) {
      setErr(e.message || 'upload failed');
    }
    setBusy(false);
  };

  return (
    <Field label={label} hint={hint || 'upload a file, or paste a URL'}>
      <div className="flex flex-col gap-2">
        <input
          className={inputCls}
          value={value ?? ''}
          placeholder="/api/uploads/… or https://…"
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="flex items-center gap-3">
          <label className="cursor-pointer border-[3px] border-ink bg-yellow px-3 py-2 font-pixel text-[9px] uppercase tracking-[0.08em] shadow-pixel-sm transition hover:-translate-x-px hover:-translate-y-px">
            {busy ? 'Uploading…' : 'Upload file'}
            <input type="file" accept={accept} className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
          {value && (
            <a href={value} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-purple-deep underline">
              open ↗
            </a>
          )}
        </div>
        {err && <span className="font-mono text-[11px] text-coral-deep">⚠ {err}</span>}
      </div>
    </Field>
  );
}

function MiniBtn({ children, onClick, danger }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`grid h-7 w-7 place-items-center border-2 border-ink font-pixel text-[10px] transition hover:-translate-y-px ${
        danger ? 'bg-coral hover:bg-coral-deep' : 'bg-cream hover:bg-yellow'
      }`}
    >
      {children}
    </button>
  );
}

/* generic add / remove / reorder list editor. `render(item, set, index)` */
export function ListEditor({ items = [], onChange, render, makeNew, addLabel = 'Add item' }) {
  const update = (i, next) => onChange(items.map((it, idx) => (idx === i ? next : it)));
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, makeNew()]);
  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const copy = items.slice();
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((it, i) => (
        <div key={it && it._k != null ? it._k : i} className="border-[3px] border-ink bg-cream-2 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-pixel text-[9px] tracking-[0.1em] text-ink-mute">#{i + 1}</span>
            <div className="flex gap-1.5">
              <MiniBtn onClick={() => move(i, -1)}>↑</MiniBtn>
              <MiniBtn onClick={() => move(i, 1)}>↓</MiniBtn>
              <MiniBtn danger onClick={() => remove(i)}>✕</MiniBtn>
            </div>
          </div>
          {render(it, (next) => update(i, next), i)}
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="self-start border-[3px] border-ink bg-green px-3.5 py-2 font-pixel text-[9px] uppercase tracking-[0.08em] shadow-pixel-sm transition hover:-translate-x-px hover:-translate-y-px"
      >
        + {addLabel}
      </button>
    </div>
  );
}

export function Panel({ title, desc, children }) {
  return (
    <section className="border-[3px] border-ink bg-cream p-[clamp(18px,3vw,28px)] shadow-pixel">
      <h2 className="font-pixel text-[15px] text-ink">{title}</h2>
      {desc && <p className="mb-5 mt-1.5 font-mono text-[13px] leading-[1.6] text-ink-soft">{desc}</p>}
      <div className={desc ? '' : 'mt-5'}>{children}</div>
    </section>
  );
}

/* scaled-down live render of a real site section */
export function PreviewBox({ children }) {
  return (
    <div className="mt-6">
      <div className="mb-2 inline-flex items-center gap-2 font-pixel text-[9px] tracking-[0.12em] text-ink-mute">
        ▸ LIVE PREVIEW
      </div>
      <div className="overflow-hidden rounded border-[3px] border-ink bg-cream-2">
        <div style={{ zoom: 0.6 }}>{children}</div>
      </div>
    </div>
  );
}
