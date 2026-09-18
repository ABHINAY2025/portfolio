import React from 'react';
import {
  Panel, PreviewBox, ListEditor, TextField, TextArea, ChipsField,
  SelectField, ImageField, FileField, inputCls, labelCls,
} from './fields.jsx';
import { mergeContent } from '../../data/content-context.jsx';
import { PALETTE, CONTENT_VERSION } from '../../data/content.jsx';
import { skills } from '../../data/skills.js';

import Hero from '../sections/Hero.jsx';
import About from '../sections/About.jsx';
import Experience from '../sections/Experience.jsx';
import Projects from '../sections/Projects.jsx';
import Writing from '../sections/Writing.jsx';
import Footer from '../layout/Footer.jsx';

const noop = () => {};

/* tool ids offered in the admin (the logos in /public/skills) */
const TOOL_HINT = `comma-separated logo ids — e.g. ${[...new Set(skills.map((s) => s.id))].slice(0, 12).join(', ')}…`;

/* stable keys for list rows so inputs keep their state across reorders */
let KID = 0;
const nk = () => ++KID;
const withKeys = (arr) => (Array.isArray(arr) ? arr.map((it) => ({ ...it, _k: nk() })) : arr);
const stripKeys = (arr) => (Array.isArray(arr) ? arr.map(({ _k, ...rest }) => rest) : arr);

function keyContent(c) {
  return {
    ...c,
    experience: withKeys(c.experience),
    projects: withKeys(c.projects),
    writings: withKeys(c.writings),
  };
}
function cleanContent(c) {
  return {
    _v: CONTENT_VERSION,
    hero: c.hero,
    about: c.about,
    contact: c.contact,
    experience: stripKeys(c.experience),
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
        <Panel title="Hero" desc="The landing section — portrait, name, role and tagline.">
          <div className="grid grid-cols-2 gap-4 max-[760px]:grid-cols-1">
            <ImageField label="Portrait (black & white, white background)" value={content.hero.portrait} onChange={(v) => setHero('portrait', v)} adminKey={key} />
            <TextField label="Availability status" value={content.hero.status} onChange={(v) => setHero('status', v)} />
            <TextField label="First name (outlined)" value={content.hero.firstName} onChange={(v) => setHero('firstName', v)} />
            <TextField label="Last name (solid)" value={content.hero.lastName} onChange={(v) => setHero('lastName', v)} />
            <TextField label="Role" value={content.hero.role} onChange={(v) => setHero('role', v)} />
          </div>
          <div className="mt-4">
            <TextArea label="Tagline" value={content.hero.tagline} onChange={(v) => setHero('tagline', v)} rows={3} />
          </div>
          <PreviewBox>
            <Hero hero={content.hero} contact={content.contact} onContact={noop} />
          </PreviewBox>
        </Panel>

        {/* ABOUT */}
        <Panel title="About" desc="The statement paragraph and the headline numbers under it.">
          <TextArea label="Statement" value={content.about.intro} onChange={(v) => setAbout('intro', v)} rows={4} />
          <div className="mt-4">
            <span className={labelCls}>Stats</span>
            <div className="mt-1.5">
              <ListEditor
                items={content.about.stats || []}
                onChange={(v) => setAbout('stats', v)}
                makeNew={() => ({ value: '10+', label: 'Something worth counting' })}
                addLabel="Add stat"
                render={(it, setIt) => (
                  <div className="grid grid-cols-[120px_1fr] gap-3">
                    <TextField label="Value" value={it.value} onChange={(v) => setIt({ ...it, value: v })} />
                    <TextField label="Label" value={it.label} onChange={(v) => setIt({ ...it, label: v })} />
                  </div>
                )}
              />
            </div>
          </div>
          <PreviewBox><About about={content.about} /></PreviewBox>
        </Panel>

        {/* EXPERIENCE */}
        <Panel title="Experience" desc="Rows in the dark Experience section, newest first.">
          <ListEditor
            items={content.experience}
            onChange={(v) => set('experience', v)}
            makeNew={() => ({ _k: nk(), org: 'Company', title: 'Role', period: '2026 — Now', copy: 'What you did there.', tools: [] })}
            addLabel="Add experience"
            render={(it, setIt) => (
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-3 gap-3 max-[600px]:grid-cols-1">
                  <TextField label="Company / school" value={it.org} onChange={(v) => setIt({ ...it, org: v })} />
                  <TextField label="Role / degree" value={it.title} onChange={(v) => setIt({ ...it, title: v })} />
                  <TextField label="Period" value={it.period} onChange={(v) => setIt({ ...it, period: v })} />
                </div>
                <TextArea label="Summary (hover card)" value={it.copy} onChange={(v) => setIt({ ...it, copy: v })} rows={2} />
                <ChipsField label="Tools" value={it.tools} onChange={(v) => setIt({ ...it, tools: v })} hint={TOOL_HINT} />
              </div>
            )}
          />
          <PreviewBox><Experience items={content.experience} /></PreviewBox>
        </Panel>

        {/* PROJECTS */}
        <Panel title="Projects / Work" desc="Selected Work cards and their case-study pages.">
          <ListEditor
            items={content.projects}
            onChange={(v) => set('projects', v)}
            makeNew={() => ({ _k: nk(), slug: 'project-' + nk(), title: 'New Project', kind: 'Side Project', tags: ['Tag'], desc: 'What it does.', role: '', timeline: '2026', team: '', tools: [], points: [], color: PALETTE[0].value, image: '', link: '' })}
            addLabel="Add project"
            render={(it, setIt) => (
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
                  <TextField label="Title" value={it.title} onChange={(v) => setIt({ ...it, title: v })} />
                  <TextField label="URL slug" value={it.slug} onChange={(v) => setIt({ ...it, slug: v })} hint="used in the link: #/work/slug" />
                  <TextField label="Kind" value={it.kind} onChange={(v) => setIt({ ...it, kind: v })} placeholder="Real Project" />
                  <TextField label="Timeline" value={it.timeline} onChange={(v) => setIt({ ...it, timeline: v })} />
                  <TextField label="Role" value={it.role} onChange={(v) => setIt({ ...it, role: v })} />
                  <TextField label="Team" value={it.team} onChange={(v) => setIt({ ...it, team: v })} />
                </div>
                <TextArea label="Description" value={it.desc} onChange={(v) => setIt({ ...it, desc: v })} rows={2} />
                <ChipsField label="Tags" value={it.tags} onChange={(v) => setIt({ ...it, tags: v })} />
                <ChipsField label="Tools" value={it.tools} onChange={(v) => setIt({ ...it, tools: v })} hint={TOOL_HINT} />
                <span className={labelCls}>Responsibilities (case-study list)</span>
                <ListEditor
                  items={it.points || []}
                  onChange={(v) => setIt({ ...it, points: v })}
                  makeNew={() => 'What you did'}
                  addLabel="Add responsibility"
                  render={(pt, setPt) => <input className={inputCls} value={pt} onChange={(e) => setPt(e.target.value)} />}
                />
                <div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
                  <SelectField label="Cover glow colour" value={it.color} onChange={(v) => setIt({ ...it, color: v })} options={PALETTE} />
                  <TextField label="Link (URL)" value={it.link} onChange={(v) => setIt({ ...it, link: v })} placeholder="https://…" />
                </div>
                <ImageField label="Cover image (optional — replaces the generated cover)" value={it.image} onChange={(v) => setIt({ ...it, image: v })} adminKey={key} />
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
          <PreviewBox><Writing onOpen={noop} items={content.writings} /></PreviewBox>
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
          <PreviewBox><Footer contact={content.contact} /></PreviewBox>
        </Panel>
      </main>
    </div>
  );
}
