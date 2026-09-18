import React from 'react';
import { Reveal, ArrowUpRight } from '../ui/site.jsx';
import { defaultContent } from '../../data/content.jsx';
import { skillSrc, skills } from '../../data/skills.js';
import aboutPortrait from '../../../assets/abhinay-about.webp';

const slugOf = (p, i) => p.slug || String(p.title || `project-${i}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* Generated "product shot" cover: a dark stage, a colour glow and a mock
   app window with the project's tool logos. Uses `image` when provided. */
export function ProjectCover({ project, large = false }) {
  const color = project.color || '#8b5cf6';
  if (project.image) {
    return <img src={project.image} alt="" className="h-full w-full object-cover" loading="lazy" />;
  }
  const bars = [38, 62, 48, 80, 56, 92, 70, 84, 60, 96, 74, 88];
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0d0d0d]">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(60% 70% at 70% 20%, ${color}55 0%, transparent 60%), radial-gradient(50% 60% at 10% 100%, ${color}33 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
      {/* mock app window */}
      <div className={`absolute left-[9%] right-[9%] top-[16%] bottom-[-6%] rounded-t-2xl border border-white/10 bg-[#161616]/90 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur ${large ? 'p-[4%]' : 'p-[5%]'}`}>
        <div className="mb-[5%] flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="ml-auto h-2 w-16 rounded-full bg-white/10" />
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color }}>{project.kind || 'Project'}</div>
            <div className={`mt-2 line-clamp-2 font-wide font-bold uppercase leading-none tracking-tight text-white ${large ? 'text-[clamp(28px,4vw,56px)]' : 'text-[clamp(20px,2.4vw,32px)]'}`}>
              {String(project.title || '').split(/\s+[—-]\s+/)[0]}
            </div>
          </div>
          <div className="flex shrink-0 -space-x-2">
            {(project.tools || []).slice(0, 4).map((t) => (
              <span key={t} className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#161616] bg-white">
                <img src={skillSrc(t)} alt="" className="h-4 w-4 object-contain" />
              </span>
            ))}
          </div>
        </div>
        <div className="mt-[7%] flex h-[42%] items-end gap-[2.5%]">
          {bars.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-[3px]"
              style={{ height: `${h}%`, background: i % 3 === 2 ? color : `${color}${i % 2 ? '40' : '26'}` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Selected Work as a bento "portfolio card": a folder-tab profile card
   on the left, and project tiles on the right in the reference palette.
   --------------------------------------------------------------- */
const BENTO = {
  lilac: '#7c80d8', // profile card
  pink: '#f1b6f3', // disc behind the portrait
  teal: '#a6dcd9', // stat 1
  violet: '#9c83d6', // stat 2
  slate: '#5b5b5d', // project tile
  ink: '#0b0b0c', // sphere tile
  amber: '#fdc56b', // highlight tile
};

/* the little ⌝ mark in each tile's top-right corner; turns into an arrow on hover */
function Corner({ light = false }) {
  const c = light ? 'border-white/80' : 'border-carbon/70';
  return (
    <span aria-hidden="true" className="absolute right-4 top-4 h-3 w-3 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:scale-125">
      <span className={`absolute right-0 top-0 h-full w-full border-r-2 border-t-2 ${c}`} />
    </span>
  );
}

/* rotating "MY DEV PORTFOLIO · 2026" badge */
function SpinBadge() {
  return (
    <span className="relative grid h-[78px] w-[78px] place-items-center rounded-full bg-carbon ring-4 ring-white/15">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_14s_linear_infinite]" aria-hidden="true">
        <defs><path id="badge-ring" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1-72 0" /></defs>
        <text fill="#fff" fontSize="11.5" fontWeight="600" letterSpacing="2.2">
          <textPath href="#badge-ring">MY DEV PORTFOLIO · {new Date().getFullYear()} ·</textPath>
        </text>
      </svg>
      <span className="h-4 w-4 rounded-full bg-white" />
    </span>
  );
}

/* profile card with a folder tab */
function ProfileCard({ contact, onNavigate }) {
  return (
    <div className="relative flex h-full min-h-[560px] flex-col max-lg:min-h-0">
      {/* tab row: label on the left, the card's raised shoulder on the right */}
      <div className="relative flex h-11 items-end">
        <button type="button" onClick={() => onNavigate('about')} className="mb-2.5 ml-1 inline-flex items-center gap-2 text-[14px] font-semibold text-carbon">
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true"><path d="M8 1.5 9.6 6.4 14.5 8 9.6 9.6 8 14.5 6.4 9.6 1.5 8 6.4 6.4Z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
          About Me
        </button>
        <svg viewBox="0 0 300 44" preserveAspectRatio="none" className="absolute bottom-0 right-0 h-11 w-[62%]" aria-hidden="true">
          <path d="M0 44C22 44 26 0 52 0H278Q300 0 300 22V44Z" fill={BENTO.lilac} />
        </svg>
      </div>

      <div className="relative -mt-px flex flex-1 flex-col overflow-hidden rounded-[26px] rounded-tr-none px-7 pb-7 pt-4" style={{ background: BENTO.lilac }}>
        {/* portrait over a pink disc and a white ring */}
        <div data-cursor="hello" className="relative mx-auto mt-2 aspect-square w-[82%] max-w-[min(460px,30vh+140px)] max-lg:max-w-[280px]">
          <span className="absolute inset-[4%] rounded-full border-[5px] border-white/90" />
          <span className="absolute inset-[13%] rounded-full" style={{ background: BENTO.pink }} />
          <img
            src={aboutPortrait}
            alt="Abhinay Marripelli"
            loading="lazy"
            className="absolute bottom-[-4%] left-1/2 w-[92%] -translate-x-1/2 select-none grayscale transition-[filter] duration-700 hover:grayscale-0"
            draggable="false"
          />
        </div>

        <div className="mt-auto pt-6 text-white">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[clamp(36px,3.2vw,64px)] font-light leading-[1.02] tracking-[-0.03em]">I&rsquo;m,</p>
              <p className="text-[clamp(34px,3vw,60px)] font-semibold leading-[1.02] tracking-[-0.03em]">Abhinay</p>
              <p className="text-[clamp(30px,2.7vw,54px)] font-semibold leading-[1.05] tracking-[-0.03em]">Marripelli</p>
            </div>
            <span className="shrink-0 max-sm:hidden"><SpinBadge /></span>
          </div>
          <a
            href={`mailto:${contact.email}`}
            className="mt-5 inline-flex max-w-full items-center gap-2 border-b border-dashed border-white/70 pb-1 text-[13px] font-medium text-white/95 transition-colors hover:border-white"
          >
            <span className="truncate">{contact.email}</span>
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" aria-hidden="true"><path d="M2.5 4h11v8h-11V4Zm0 .5L8 8.5l5.5-4" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* pastel media tile for the lead project, with a round open button */
function MediaTile({ project, onOpen }) {
  const short = String(project.title || '').split(/\s+[—-]\s+/)[0];
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="open"
      aria-label={`Open ${project.title}`}
      className="group relative h-full min-h-[240px] overflow-hidden rounded-[22px] text-left"
      style={{ background: `linear-gradient(135deg, ${BENTO.teal} 0%, #c9b8f0 55%, ${BENTO.pink} 100%)` }}
    >
      {project.image ? (
        <img src={project.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-105">
          <span className="absolute -left-10 -top-12 h-48 w-48 rounded-full bg-white/35 blur-[2px]" />
          <span className="absolute -bottom-16 right-10 h-56 w-56 rounded-full" style={{ background: `${BENTO.lilac}55` }} />
          <span className="absolute right-[-30px] top-6 h-28 w-28 rotate-12 rounded-[28px] bg-white/30" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-carbon/60">{project.kind || 'Project'}</div>
            <div className="mt-1 font-wide text-[clamp(38px,5vw,110px)] font-extrabold uppercase leading-none tracking-tight text-carbon">{short}</div>
            <div className="mt-3 flex -space-x-2">
              {(project.tools || []).slice(0, 6).map((t) => (
                <span key={t} className="grid h-9 w-9 place-items-center rounded-full border-2 border-white/60 bg-white">
                  <img src={skillSrc(t)} alt="" className="h-5 w-5 object-contain" />
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* open button, like the play control in the reference */}
      <span className="absolute right-[14%] top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-carbon shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] backdrop-blur transition-all duration-500 group-hover:scale-110 group-hover:bg-white">
        <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
      </span>
      <Corner />
    </button>
  );
}

function StatTile({ value, label, bg, onClick }) {
  return (
    <button type="button" onClick={onClick} className="group relative flex flex-col justify-end p-5 text-left" style={{ background: bg }}>
      <span className="text-[clamp(30px,3vw,64px)] font-extrabold leading-none tracking-tight text-carbon">{value}</span>
      <span className="mt-1.5 text-[15px] font-medium text-carbon/80">{label}</span>
      <Corner />
    </button>
  );
}

/* grey tile: an emblem and the project name */
function SlateTile({ project, onOpen }) {
  const short = String(project.title || '').split(/\s+[—-]\s+/)[0];
  return (
    <button type="button" onClick={onOpen} data-cursor="open" className="group relative flex h-full min-h-[170px] flex-col items-center justify-center gap-3 rounded-[22px] text-white transition-colors duration-500 hover:brightness-110" style={{ background: BENTO.slate }}>
      <svg viewBox="0 0 32 32" className="h-10 w-10 transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
        <path d="M16 27.5S4 20.2 4 11.8A6.3 6.3 0 0 1 16 8.4a6.3 6.3 0 0 1 12 3.4c0 8.4-12 15.7-12 15.7Z" fill="#fff" />
      </svg>
      <span className="text-[17px] font-medium">{short}</span>
      <Corner light />
    </button>
  );
}

/* iridescent CSS sphere for the black tile */
function Sphere() {
  return (
    <span aria-hidden="true" className="relative block h-[clamp(86px,8vw,170px)] w-[clamp(86px,8vw,170px)] transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:rotate-[25deg] group-hover:scale-110">
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'repeating-linear-gradient(115deg, rgba(255,255,255,0.35) 0 3px, transparent 3px 9px), conic-gradient(from 200deg, #7dd3fc, #c4b5fd, #f9a8d4, #fcd34d, #86efac, #7dd3fc)',
          boxShadow: 'inset -14px -18px 30px rgba(0,0,0,0.55), inset 10px 12px 24px rgba(255,255,255,0.45)',
        }}
      />
      <span className="absolute left-[22%] top-[18%] h-[22%] w-[26%] rounded-full bg-white/70 blur-[6px]" />
    </span>
  );
}

export default function Projects({ items = defaultContent.projects, onOpen = () => {}, onNavigate = () => {}, contact = defaultContent.contact }) {
  const [lead, second, third, fourth] = items;
  const open = (p) => () => onOpen(slugOf(p, items.indexOf(p)));
  const rest = items.slice(4);
  const side = [['service', 'Service'], ['skills', 'Skills'], ['experience', 'Experience'], ['contact', 'Contact']];

  return (
    <section id="work" className="site flex flex-col bg-paper-2 p-[clamp(10px,1.2vw,22px)] lg:min-h-[100svh]">
        <Reveal className="relative flex flex-1 flex-col rounded-[34px] bg-[#f6f6f5] p-[clamp(14px,2vw,36px)] shadow-[0_40px_90px_-50px_rgba(0,0,0,0.45)] lg:pt-[clamp(70px,8vh,96px)]">
          <div className="grid flex-1 grid-cols-[44px_minmax(300px,0.95fr)_2fr] gap-[clamp(12px,1.4vw,26px)] max-lg:grid-cols-[minmax(0,1fr)]">
            {/* rotated side menu */}
            <nav aria-label="Sections" className="flex flex-col-reverse items-center justify-around py-8 max-lg:hidden">
              {side.map(([id, label]) => (
                <button key={id} type="button" onClick={() => onNavigate(id)} data-magnetic="off" className="-rotate-90 whitespace-nowrap text-[13.5px] font-semibold text-carbon/80 transition-colors hover:text-carbon">
                  {label}
                </button>
              ))}
            </nav>

            <ProfileCard contact={contact} onNavigate={onNavigate} />

            <div className="flex min-w-0 flex-col gap-[clamp(12px,1.4vw,26px)]">
              {/* big heading with its corner bracket */}
              <h2 className="inline-flex items-start gap-[0.06em] font-wide text-[clamp(52px,7.4vw,170px)] font-extrabold leading-[0.95] tracking-[-0.035em]">
                Studio
                <span aria-hidden="true" className="mt-[0.08em] h-[0.26em] w-[0.26em] shrink-0 border-r-[0.06em] border-t-[0.06em] border-carbon" />
              </h2>

              <div className="grid flex-[1.45] grid-cols-[2.6fr_1fr] gap-[clamp(12px,1.4vw,26px)] max-sm:grid-cols-1">
                {lead && <MediaTile project={lead} onOpen={open(lead)} />}
                <div className="grid grid-rows-2 overflow-hidden rounded-[22px] max-sm:grid-cols-2 max-sm:grid-rows-1">
                  <StatTile value={String(items.length).padStart(2, '0')} label="Projects" bg={BENTO.teal} onClick={() => onNavigate('work')} />
                  <StatTile value={String(new Set(skills.map((s) => s.name)).size)} label="Skills" bg={BENTO.violet} onClick={() => onNavigate('skills')} />
                </div>
              </div>

              <div className="grid flex-1 grid-cols-[1fr_1.85fr] gap-[clamp(12px,1.4vw,26px)] max-sm:grid-cols-1">
                {second && <SlateTile project={second} onOpen={open(second)} />}
                {(third || fourth) && (
                  <div className="grid min-h-[170px] grid-cols-[0.85fr_1fr] overflow-hidden rounded-[22px]" style={{ background: BENTO.ink }}>
                    {third && (
                      <button type="button" onClick={open(third)} data-cursor="open" aria-label={`Open ${third.title}`} className="group relative grid place-items-center" style={{ background: BENTO.ink }}>
                        <Sphere />
                        <span className="absolute bottom-3 left-4 text-[12px] font-medium text-white/0 transition-colors duration-500 group-hover:text-white/80">
                          {String(third.title).split(/\s+[—-]\s+/)[0]}
                        </span>
                        <Corner light />
                      </button>
                    )}
                    {fourth && (
                      <button type="button" onClick={open(fourth)} data-cursor="open" className="group relative flex flex-col justify-center rounded-[22px] p-5 text-left" style={{ background: BENTO.amber }}>
                        <span className="text-[clamp(28px,2.8vw,60px)] font-extrabold leading-none tracking-tight text-carbon">
                          {fourth.highlight?.value || String(fourth.title).split(/\s+[—-]\s+/)[0]}
                        </span>
                        <span className="mt-2 text-[14px] font-medium leading-snug text-carbon/80">
                          {fourth.highlight?.label || fourth.kind}
                        </span>
                        <span className="text-[15px] font-semibold text-carbon">{String(fourth.title).split(/\s+[—-]\s+/)[0]}.</span>
                        <Corner />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* anything beyond the four tiles (added in the admin) */}
          {rest.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2 border-t border-carbon/10 pt-5">
              <span className="mr-2 self-center text-[13px] text-smoke">More work</span>
              {rest.map((p) => (
                <button key={slugOf(p, items.indexOf(p))} type="button" onClick={open(p)} className="rounded-full border border-carbon/15 bg-white px-4 py-1.5 text-[13px] font-medium transition hover:border-carbon">
                  {p.title}
                </button>
              ))}
            </div>
          )}
        </Reveal>
    </section>
  );
}

export { slugOf };
