import React from 'react';
import Shell from '../ui/Shell.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';
import Button from '../ui/Button.jsx';
import Tick from '../ui/Tick.jsx';
import { IconArrow } from '../ui/Icons.jsx';
import { defaultContent } from '../../data/content.jsx';

const inputCls =
  'w-full border-[3px] border-ink bg-cream p-[12px_14px] font-mono text-[15px] text-ink outline-none ' +
  'shadow-pixel-sm transition-[transform,box-shadow] duration-100 placeholder:text-ink-mute ' +
  'focus:-translate-x-px focus:-translate-y-px focus:shadow-[6px_6px_0_var(--color-purple)]';

const labelCls = 'font-pixel text-[9px] uppercase tracking-[0.14em] text-ink-soft';

const selectArrow = {
  appearance: 'none',
  backgroundImage:
    'linear-gradient(45deg, transparent 50%, var(--color-ink) 50%), linear-gradient(-45deg, transparent 50%, var(--color-ink) 50%)',
  backgroundPosition: 'calc(100% - 18px) 19px, calc(100% - 12px) 19px',
  backgroundSize: '6px 6px, 6px 6px',
  backgroundRepeat: 'no-repeat',
  paddingRight: '36px',
};

const statusCls = {
  success: 'bg-green',
  error: 'bg-coral',
  sending: 'bg-mint',
};

export default function Contact({ contact = defaultContent.contact }) {
  const [state, setState] = React.useState({
    name: '', email: '', company: '',
    projectType: 'Web app', timeline: '1 month', description: '',
  });
  const [status, setStatus] = React.useState('idle');
  const [message, setMessage] = React.useState('');

  const update = (k) => (e) => setState((s) => ({ ...s, [k]: e.target.value }));

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
      setMessage("Got it — I'll get back to you soon. ✨");
      setState({ name: '', email: '', company: '', projectType: 'Web app', timeline: '1 month', description: '' });
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'Could not send your message. Try again in a moment.');
    }
  };

  return (
    <section id="contact" className="border-y-[3px] border-ink bg-cream-2 py-[100px]">
      <Shell>
        <header className="mx-auto mb-14 flex max-w-[720px] flex-col items-center gap-[18px] text-center">
          <Eyebrow>▸ LET&rsquo;S TALK</Eyebrow>
          <h2 className="font-pixel text-[clamp(26px,3.6vw,40px)] leading-[1.18]">
            Have an idea or <span className="text-coral-deep">opportunity?</span>
          </h2>
          <p className="max-w-[580px] font-mono text-base leading-[1.65] text-ink-soft">
            Drop a message — collaboration, a role, or just to say hi. I read every one and reply fast.
          </p>
        </header>

        <form className="mx-auto max-w-[880px]" onSubmit={submit} noValidate>
          <div className="flex flex-col gap-[18px] rounded border-[3px] border-ink bg-cream p-[clamp(24px,4vw,40px)] shadow-pixel-xl">
            <div className="grid grid-cols-2 gap-[18px] max-[720px]:grid-cols-1">
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Your name *</span>
                <input type="text" className={inputCls} value={state.name} onChange={update('name')} placeholder="Jane Doe" required />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Email *</span>
                <input type="email" className={inputCls} value={state.email} onChange={update('email')} placeholder="you@email.com" required />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-[18px] max-[720px]:grid-cols-1">
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Company / project</span>
                <input type="text" className={inputCls} value={state.company} onChange={update('company')} placeholder="Optional" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Reason</span>
                <select className={`${inputCls} cursor-pointer`} style={selectArrow} value={state.projectType} onChange={update('projectType')}>
                  <option>Web app</option>
                  <option>Backend / API</option>
                  <option>AI / agents</option>
                  <option>Job opportunity</option>
                  <option>Just saying hi</option>
                </select>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-[18px] max-[720px]:grid-cols-1">
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Timeline</span>
                <select className={`${inputCls} cursor-pointer`} style={selectArrow} value={state.timeline} onChange={update('timeline')}>
                  <option>ASAP (within 2 weeks)</option>
                  <option>1 month</option>
                  <option>3 months</option>
                  <option>Flexible</option>
                </select>
              </label>
            </div>

            <label className="flex w-full flex-col gap-1.5">
              <span className={labelCls}>Your message *</span>
              <textarea
                className={`${inputCls} min-h-[130px] resize-y leading-[1.55]`}
                rows="5"
                value={state.description}
                onChange={update('description')}
                placeholder="A few lines is plenty — what's on your mind?"
                required
              />
            </label>

            <div className="mt-1.5 flex flex-wrap items-center justify-between gap-[18px]">
              <span className="inline-flex items-center gap-2.5 font-pixel text-[9px] tracking-[0.1em] text-ink-soft">
                <Tick /> Prefer email?{' '}
                <a href={`mailto:${contact.email}`} className="font-semibold text-purple-deep">{contact.email}</a>
              </span>
              <Button type="submit" variant="yellow" size="lg" pressed={status === 'sending'} disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'} <IconArrow />
              </Button>
            </div>

            {status !== 'idle' && (
              <div
                role="status"
                className={`mt-1 border-[3px] border-ink p-[12px_14px] font-pixel text-[10px] tracking-[0.06em] text-ink shadow-pixel-sm ${statusCls[status] || ''}`}
              >
                {status === 'success' && '★ '}{status === 'error' && '✕ '}{message}
              </div>
            )}
          </div>
        </form>
      </Shell>
    </section>
  );
}
