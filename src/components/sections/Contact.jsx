import React from 'react';
import { Container, Reveal, StatusPill, Pill, ArrowUpRight } from '../ui/site.jsx';
import { defaultContent } from '../../data/content.jsx';

const TYPES = ['Full-time role', 'Freelance project', 'DevOps / Cloud', 'Just saying hi'];
const TIMELINES = ['ASAP', '1 month', '1–3 months', 'Flexible'];

const inputCls =
  'w-full rounded-xl border border-carbon/10 bg-paper/60 px-4 py-3 text-[15px] text-carbon outline-none ' +
  'transition-[border-color,background-color,box-shadow] placeholder:text-carbon/30 ' +
  'focus:border-carbon/40 focus:bg-white focus:shadow-[0_0_0_4px_rgba(17,17,17,0.06)]';
const labelCls = 'text-[12.5px] font-medium text-carbon/70';

export const directLinks = (contact) =>
  [
    ['Email', contact.email, `mailto:${contact.email}`],
    ['Phone', contact.phone, contact.phone && `tel:${contact.phone.replace(/\s/g, '')}`],
    ['LinkedIn', contact.linkedin?.replace(/^https?:\/\/(www\.)?/, ''), contact.linkedin],
    ['GitHub', contact.github?.replace(/^https?:\/\/(www\.)?/, ''), contact.github],
  ].filter(([, v]) => v);

function Choice({ options, value, onChange, label }) {
  return (
    <fieldset>
      <legend className={`${labelCls} mb-2`}>{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            aria-pressed={value === o}
            className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all ${
              value === o ? 'border-carbon bg-carbon text-white' : 'border-carbon/15 text-carbon/70 hover:border-carbon/40'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/* The lead form (posts to /api/lead). Used by the contact page. */
export function ContactForm() {
  const empty = { name: '', email: '', company: '', projectType: TYPES[0], timeline: TIMELINES[1], description: '' };
  const [state, setState] = React.useState(empty);
  const [status, setStatus] = React.useState('idle');
  const [message, setMessage] = React.useState('');

  const update = (k) => (e) => setState((s) => ({ ...s, [k]: e.target ? e.target.value : e }));

  const submit = async (e) => {
    e.preventDefault();
    if (!state.name.trim() || !state.email.trim() || !state.description.trim()) {
      setStatus('error');
      setMessage('Name, email and a short message are required.');
      return;
    }
    setStatus('sending');
    setMessage('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }
      setStatus('success');
      setMessage('Got it — I’ll get back to you soon.');
      setState(empty);
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'Could not send your message. Try again in a moment.');
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Name *</span>
          <input className={inputCls} value={state.name} onChange={update('name')} placeholder="Jane Doe" autoComplete="name" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Email *</span>
          <input className={inputCls} type="email" value={state.email} onChange={update('email')} placeholder="jane@company.com" autoComplete="email" />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className={labelCls}>Company</span>
        <input className={inputCls} value={state.company} onChange={update('company')} placeholder="Optional" autoComplete="organization" />
      </label>
      <Choice label="What’s it about?" options={TYPES} value={state.projectType} onChange={update('projectType')} />
      <Choice label="Timeline" options={TIMELINES} value={state.timeline} onChange={update('timeline')} />
      <label className="flex flex-col gap-1.5">
        <span className={labelCls}>Message *</span>
        <textarea className={`${inputCls} min-h-[120px] resize-y`} value={state.description} onChange={update('description')} placeholder="Tell me a little about it…" />
      </label>

      <button
        type="submit"
        data-cursor="cta"
        disabled={status === 'sending'}
        className="group mt-1 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-carbon px-7 py-3.5 text-[15px] font-medium text-white transition-all hover:bg-black hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] active:scale-[0.98] disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>
      {message && (
        <p role="status" className={`text-center text-[14px] ${status === 'error' ? 'text-red-600' : 'text-green-700'}`}>{message}</p>
      )}
    </form>
  );
}

/* Home-page call to action — opens the dedicated contact page. */
export default function Contact({ contact = defaultContent.contact, status: availability, onOpen = () => {} }) {
  return (
    <section id="contact" className="site overflow-hidden bg-paper py-[clamp(90px,12vw,160px)]">
      <Container>
        <div className="flex flex-col items-center text-center">
          <Reveal><StatusPill>{availability}</StatusPill></Reveal>
          <Reveal as="h2" delay={100} className="mt-8 font-wide text-[clamp(40px,8.4vw,120px)] font-extrabold uppercase leading-[0.92] tracking-[-0.035em]">
            Have a project<br /><span className="text-outline">in mind?</span>
          </Reveal>
          <Reveal as="p" delay={200} className="mt-7 max-w-[520px] text-[16px] leading-relaxed text-smoke">
            A role, a build, or a pipeline that needs taming — drop a message. I read every one and reply fast.
          </Reveal>
          <Reveal delay={280} className="mt-10 flex flex-wrap justify-center gap-3">
            <Pill size="lg" onClick={onOpen}>Start a conversation</Pill>
            <Pill size="lg" variant="light" href={`mailto:${contact.email}`} icon={false}>{contact.email}</Pill>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
