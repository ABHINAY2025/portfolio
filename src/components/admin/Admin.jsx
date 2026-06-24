import React from 'react';
import {
  Panel, PreviewBox, ListEditor, TextField, TextArea, ChipsField,
  SelectField, ImageField, FileField, inputCls, labelCls,
} from './fields.jsx';
import { mergeContent } from '../../data/content-context.jsx';
import { PALETTE } from '../../data/content.jsx';
import { ICON_NAMES } from '../../data/icons.jsx';

import Hero from '../sections/Hero.jsx';
import About from '../sections/About.jsx';
import Experience from '../sections/Experience.jsx';
import Stack from '../sections/Stack.jsx';
import Projects from '../sections/Projects.jsx';
import Writing from '../sections/Writing.jsx';
import Footer from '../layout/Footer.jsx';

const noop = () => {};

/* stable keys for list rows so inputs keep their state across reorders */
let KID = 0;
const nk = () => ++KID;
const withKeys = (arr) => (Array.isArray(arr) ? arr.map((it) => ({ ...it, _k: nk() })) : arr);
const stripKeys = (arr) => (Array.isArray(arr) ? arr.map(({ _k, ...rest }) => rest) : arr);

function keyContent(c) {
  return {
    ...c,
    experience: withKeys(c.experience),
    stack: withKeys(c.stack),
    projects: withKeys(c.projects),
    writings: withKeys(c.writings),
  };
}
function cleanContent(c) {
  return {
    hero: c.hero,
    about: c.about,
    contact: c.contact,
    experience: stripKeys(c.experience),
    stack: stripKeys(c.stack),
    projects: stripKeys(c.projects),
    writings: stripKeys(c.writings),
  };
}

async function verifyKey(k) {
  try {
    const r = await fetch('/api/admin/verify', { method: 'POST', headers: { 'x-admin-key': k } });
    return r.ok;
  } catch {
    return false;
  }
}

/* ------------------------------ login ------------------------------ */
function Login({ value, setValue, onSubmit, status }) {
  return (
    <div className="grid min-h-screen place-items-center bg-cream-2 p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-[400px] border-[3px] border-ink bg-cream p-8 shadow-pixel-xl"
      >
        <h1 className="font-pixel text-[18px] text-ink">ADMIN</h1>
        <p className="mb-6 mt-2 font-mono text-[13px] text-ink-soft">
          Enter your passcode to edit the site content.
        </p>
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Passcode</span>
          <input
            type="password"
            autoFocus
            className={inputCls}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="••••••••"
          />
        </label>
        <button
          type="submit"
          className="mt-5 w-full border-[3px] border-ink bg-yellow px-4 py-3 font-pixel text-[11px] uppercase tracking-[0.08em] shadow-pixel transition hover:-translate-x-px hover:-translate-y-px active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
        >
          Unlock
        </button>
        {status && <p className="mt-4 font-mono text-[12px] text-coral-deep">{status}</p>}
        <a href="/" className="mt-5 inline-block font-mono text-[12px] text-purple-deep underline">← back to site</a>
      </form>
    </div>
  );
}

/* ------------------------------ admin ------------------------------ */
export default function Admin() {
  const [key, setKey] = React.useState(() => sessionStorage.getItem('admin-key') || '');
  const [authed, setAuthed] = React.useState(false);
  const [content, setContent] = React.useState(null);
  const [status, setStatus] = React.useState('');
  const [saving, setSaving] = React.useState(false);

  const load = React.useCallback(async () => {
    try {
      const r = await fetch('/api/content');
      const data = r.ok ? await r.json() : {};
      setContent(keyContent(mergeContent(data)));
    } catch {
      setContent(keyContent(mergeContent()));
    }
  }, []);

  // resume an existing session
  React.useEffect(() => {
    if (!key) return;
    (async () => {
      if (await verifyKey(key)) {
        await load();
        setAuthed(true);
      } else {
        sessionStorage.removeItem('admin-key');
        setKey('');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doLogin = async (e) => {
    e.preventDefault();
    setStatus('');
    if (!(await verifyKey(key))) {
      setStatus('Wrong passcode — try again.');
      return;
    }
    sessionStorage.setItem('admin-key', key);
    await load();
    setAuthed(true);
  };

  const save = async () => {
    setSaving(true);
    setStatus('');
    try {
      const r = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': key },
        body: JSON.stringify(cleanContent(content)),
      });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error(d.error || `save failed (${r.status})`);
      }
      setStatus('Saved ✓ — open / in a new tab (or refresh) to see it live.');
    } catch (e) {
      setStatus('Error: ' + (e.message || 'could not save'));
    }
    setSaving(false);
  };

  const logout = () => {
    sessionStorage.removeItem('admin-key');
    setKey('');
    setAuthed(false);
    setContent(null);
  };

  const resetDefaults = () => {
    if (window.confirm('Reset every field to the built-in defaults? (nothing is saved until you click Save changes)')) {
      setContent(keyContent(mergeContent()));
    }
  };

  if (!authed) return <Login value={key} setValue={setKey} onSubmit={doLogin} status={status} />;
  if (!content) return <div className="grid min-h-screen place-items-center bg-cream-2 font-pixel text-ink">Loading…</div>;

  // slice setters
  const set = (slice, val) => setContent((c) => ({ ...c, [slice]: val }));
  const setHero = (k, v) => set('hero', { ...content.hero, [k]: v });
  const setAbout = (k, v) => set('about', { ...content.about, [k]: v });
  const setContact = (k, v) => set('contact', { ...content.contact, [k]: v });

  return (
    <div className="min-h-screen bg-cream-2 pb-24 text-ink">
      {/* sticky action bar */}
      <header className="sticky top-0 z-30 border-b-[3px] border-ink bg-ink px-[clamp(16px,4vw,40px)] py-3.5">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-3">
          <span className="font-pixel text-[13px] text-cream">ABHINAY_MA · ADMIN</span>
          <div className="flex flex-wrap items-center gap-2.5">
            {status && <span className="mr-1 font-mono text-[12px] text-mint">{status}</span>}
            <a href="/" target="_blank" rel="noopener noreferrer" className="border-[3px] border-cream px-3 py-2 font-pixel text-[9px] uppercase tracking-[0.08em] text-cream transition hover:bg-cream hover:text-ink">View site ↗</a>
            <button onClick={resetDefaults} className="border-[3px] border-cream px-3 py-2 font-pixel text-[9px] uppercase tracking-[0.08em] text-cream transition hover:bg-cream hover:text-ink">Reset</button>
            <button onClick={logout} className="border-[3px] border-cream px-3 py-2 font-pixel text-[9px] uppercase tracking-[0.08em] text-cream transition hover:bg-cream hover:text-ink">Log out</button>
            <button
              onClick={save}
              disabled={saving}
              className="border-[3px] border-ink bg-yellow px-4 py-2 font-pixel text-[9px] uppercase tracking-[0.08em] shadow-pixel-sm transition hover:-translate-x-px hover:-translate-y-px disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-[1100px] flex-col gap-7 px-[clamp(16px,4vw,40px)] pt-7">
        {/* HERO */}
        <Panel title="Hero" desc="The landing section — portrait image, headline and intro.">
          <div className="grid grid-cols-2 gap-4 max-[760px]:grid-cols-1">
            <ImageField label="Portrait image" value={content.hero.image} onChange={(v) => setHero('image', v)} adminKey={key} />
            <TextField label="Badge" value={content.hero.badge} onChange={(v) => setHero('badge', v)} />
            <TextField label="Title — line 1" value={content.hero.titleLine1} onChange={(v) => setHero('titleLine1', v)} />
            <TextField label="Title — accent" value={content.hero.titleAccent} onChange={(v) => setHero('titleAccent', v)} />
            <TextField label="Title — line 2" value={content.hero.titleLine2} onChange={(v) => setHero('titleLine2', v)} />
          </div>
          <div className="mt-4">
            <TextArea label="Intro paragraph" value={content.hero.intro} onChange={(v) => setHero('intro', v)} rows={3} />
          </div>
          <PreviewBox>
            <div className="flex h-[560px] w-full flex-col">
              <Hero go={noop} hero={content.hero} />
            </div>
          </PreviewBox>
        </Panel>

        {/* ABOUT */}
        <Panel title="About" desc="Intro paragraph and the bullet points beside the whoami window.">
          <TextArea label="Intro paragraph" value={content.about.intro} onChange={(v) => setAbout('intro', v)} rows={4} />
          <div className="mt-4">
            <span className={labelCls}>Bullet points</span>
            <div className="mt-1.5">
              <ListEditor
                items={content.about.bullets}
                onChange={(v) => setAbout('bullets', v)}
                makeNew={() => 'New point'}
                addLabel="Add bullet"
                render={(it, setIt) => (
                  <input className={inputCls} value={it} onChange={(e) => setIt(e.target.value)} />
                )}
              />
            </div>
          </div>
          <PreviewBox><About go={noop} about={content.about} /></PreviewBox>
        </Panel>

        {/* EXPERIENCE */}
        <Panel title="Experience" desc="Cards shown on the About page. The first card is highlighted.">
          <ListEditor
            items={content.experience}
            onChange={(v) => set('experience', v)}
            makeNew={() => ({ _k: nk(), title: 'NEW ROLE', org: 'Company · Year', copy: 'What you did there.' })}
            addLabel="Add experience"
            render={(it, setIt) => (
              <div className="flex flex-col gap-3">
                <TextField label="Title" value={it.title} onChange={(v) => setIt({ ...it, title: v })} />
                <TextField label="Org · when" value={it.org} onChange={(v) => setIt({ ...it, org: v })} />
                <TextArea label="Copy" value={it.copy} onChange={(v) => setIt({ ...it, copy: v })} rows={2} />
              </div>
            )}
          />
          <PreviewBox><Experience items={content.experience} /></PreviewBox>
        </Panel>

        {/* STACK */}
        <Panel title="Stack" desc="Toolkit cards. Pick an icon and accent colour for each.">
          <ListEditor
            items={content.stack}
            onChange={(v) => set('stack', v)}
            makeNew={() => ({ _k: nk(), title: 'NEW SET', desc: 'Short description.', color: 'var(--color-blue)', icon: 'IconCode', chips: ['Tool'] })}
            addLabel="Add stack set"
            render={(it, setIt) => (
              <div className="flex flex-col gap-3">
                <TextField label="Title" value={it.title} onChange={(v) => setIt({ ...it, title: v })} />
                <TextArea label="Description" value={it.desc} onChange={(v) => setIt({ ...it, desc: v })} rows={2} />
                <div className="grid grid-cols-2 gap-3">
                  <SelectField label="Icon" value={it.icon} onChange={(v) => setIt({ ...it, icon: v })} options={ICON_NAMES} />
                  <SelectField label="Colour" value={it.color} onChange={(v) => setIt({ ...it, color: v })} options={PALETTE} />
                </div>
                <ChipsField label="Chips" value={it.chips} onChange={(v) => setIt({ ...it, chips: v })} />
              </div>
            )}
          />
          <PreviewBox><Stack items={content.stack} /></PreviewBox>
        </Panel>

        {/* PROJECTS */}
        <Panel title="Projects / Work" desc="The project cards shown on the Work page (and Home).">
          <ListEditor
            items={content.projects}
            onChange={(v) => set('projects', v)}
            makeNew={() => ({ _k: nk(), title: 'NEW PROJECT', desc: 'What it does.', color: 'var(--color-coral)', icon: 'IconAi', chips: ['Tag'], link: '' })}
            addLabel="Add project"
            render={(it, setIt) => (
              <div className="flex flex-col gap-3">
                <TextField label="Title" value={it.title} onChange={(v) => setIt({ ...it, title: v })} />
                <TextArea label="Description" value={it.desc} onChange={(v) => setIt({ ...it, desc: v })} rows={2} />
                <div className="grid grid-cols-2 gap-3">
                  <SelectField label="Icon" value={it.icon} onChange={(v) => setIt({ ...it, icon: v })} options={ICON_NAMES} />
                  <SelectField label="Colour" value={it.color} onChange={(v) => setIt({ ...it, color: v })} options={PALETTE} />
                </div>
                <TextField label="Link (URL)" value={it.link} onChange={(v) => setIt({ ...it, link: v })} placeholder="https://github.com/…" />
                <ChipsField label="Chips" value={it.chips} onChange={(v) => setIt({ ...it, chips: v })} />
              </div>
            )}
          />
          <PreviewBox><Projects items={content.projects} /></PreviewBox>
        </Panel>

        {/* WRITING */}
        <Panel title="Writing" desc="Journal posts. Body supports markdown-lite: ## heading, > quote, - bullet, **bold**.">
          <ListEditor
            items={content.writings}
            onChange={(v) => set('writings', v)}
            makeNew={() => ({ _k: nk(), id: 'post-' + nk(), title: 'New post', date: '2026', read: '3 min read', tag: '#notes', excerpt: 'Short summary shown on the card.', body: '## Heading\n\nWrite your post here. **Bold** works, > quotes too, and\n- bullet\n- points.' })}
            addLabel="Add writing"
            render={(it, setIt) => (
              <div className="flex flex-col gap-3">
                <TextField label="Title" value={it.title} onChange={(v) => setIt({ ...it, title: v })} />
                <div className="grid grid-cols-3 gap-3 max-[600px]:grid-cols-1">
                  <TextField label="Date" value={it.date} onChange={(v) => setIt({ ...it, date: v })} />
                  <TextField label="Read time" value={it.read} onChange={(v) => setIt({ ...it, read: v })} />
                  <TextField label="Tag" value={it.tag} onChange={(v) => setIt({ ...it, tag: v })} />
                </div>
                <TextArea label="Excerpt" value={it.excerpt} onChange={(v) => setIt({ ...it, excerpt: v })} rows={2} />
                <TextArea label="Body (markdown-lite)" value={it.body} onChange={(v) => setIt({ ...it, body: v })} rows={10} />
              </div>
            )}
          />
          <PreviewBox><Writing go={noop} onOpen={noop} items={content.writings} /></PreviewBox>
        </Panel>

        {/* CONTACT */}
        <Panel title="Contact & links" desc="Email and social links used across the footer, contact and résumé pages.">
          <div className="grid grid-cols-2 gap-4 max-[760px]:grid-cols-1">
            <TextField label="Email" value={content.contact.email} onChange={(v) => setContact('email', v)} />
            <TextField label="Phone" value={content.contact.phone} onChange={(v) => setContact('phone', v)} />
            <TextField label="GitHub URL" value={content.contact.github} onChange={(v) => setContact('github', v)} />
            <TextField label="LinkedIn URL" value={content.contact.linkedin} onChange={(v) => setContact('linkedin', v)} />
            <TextField label="FISEC / work URL" value={content.contact.fisec} onChange={(v) => setContact('fisec', v)} />
          </div>
          <div className="mt-4">
            <FileField
              label="Résumé PDF (Download button)"
              value={content.contact.resumeUrl}
              onChange={(v) => setContact('resumeUrl', v)}
              adminKey={key}
              accept="application/pdf"
              hint="upload a new résumé PDF, or paste a URL — powers the Download PDF button on the résumé page"
            />
          </div>
          <PreviewBox><Footer go={noop} contact={content.contact} /></PreviewBox>
        </Panel>
      </main>
    </div>
  );
}
