import React from 'react';
import { StatusPill, ArrowLeft, ArrowUpRight } from '../ui/site.jsx';
import { ContactForm, directLinks } from './Contact.jsx';
import { defaultContent } from '../../data/content.jsx';
import reef from '../../../assets/contact-reef.webp';

/* a few bubbles drifting up over the illustration (size px, left %, delay s, duration s) */
const BUBBLES = [
  [14, 12, 0, 9], [8, 22, 3, 11], [20, 38, 6, 13], [10, 55, 1.5, 10],
  [16, 68, 4.5, 12], [9, 80, 7, 9.5], [12, 90, 2.5, 11.5], [7, 46, 8.5, 10.5],
];

/* Dedicated contact page: illustration on one half, a calm form on the other. */
export default function ContactPage({ contact = defaultContent.contact, status, onBack }) {
  return (
    <div className="site grid min-h-[100svh] grid-cols-2 bg-white max-lg:grid-cols-1">
      {/* illustration */}
      <aside className="relative overflow-hidden bg-[#3fb6c4] lg:sticky lg:top-0 lg:h-[100svh] max-lg:h-[42svh]">
        <img
          src={reef}
          alt="Underwater meadow with a pineapple house"
          className="contact-drift absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {BUBBLES.map(([size, left, delay, dur], i) => (
            <span
              key={i}
              className="contact-bubble absolute bottom-[-40px] rounded-full border border-white/70 bg-white/15"
              style={{ width: size, height: size, left: `${left}%`, animationDelay: `${delay}s`, animationDuration: `${dur}s` }}
            />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/35 to-transparent p-[clamp(20px,3vw,36px)] pt-24 text-white">
          <p className="font-wide text-[clamp(18px,2vw,26px)] font-extrabold uppercase tracking-tight">Abhinay Marripelli</p>
          <p className="mt-1 text-[13.5px] text-white/85">Full Stack &amp; DevOps Engineer · Hyderabad, India</p>
        </div>
      </aside>

      {/* form */}
      <main className="flex flex-col px-[clamp(20px,5vw,72px)] py-[clamp(20px,3vw,32px)]">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full border border-carbon/10 bg-white px-3.5 py-1.5 text-[13px] font-medium transition hover:border-carbon"
          >
            <ArrowLeft /> Back
          </button>
          <StatusPill className="max-sm:hidden">{status}</StatusPill>
        </div>

        <div className="anim-fade-up mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center py-[clamp(36px,6vh,72px)]">
          <span className="font-wide text-[22px] font-extrabold tracking-tight">ABHINAY<span className="text-smoke">.</span></span>
          <h1 className="mt-8 text-[clamp(30px,3.4vw,40px)] font-semibold tracking-[-0.03em]">Let&rsquo;s talk</h1>
          <p className="mb-8 mt-2 text-[15px] leading-relaxed text-smoke">
            Tell me about the role, project or pipeline — I usually reply within a day.
          </p>

          <ContactForm />

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-carbon/10 pt-6">
            {directLinks(contact).map(([k, v, href]) => (
              <li key={k} className="min-w-0">
                <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
                  <span className="block text-[11.5px] uppercase tracking-[0.14em] text-smoke">{k}</span>
                  <span className="mt-0.5 flex items-center gap-1 truncate text-[13.5px] text-carbon/80 transition-colors group-hover:text-carbon">
                    <span className="truncate">{v}</span>
                    <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
