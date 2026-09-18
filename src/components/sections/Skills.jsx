import React from 'react';
import { Container, SectionTitle, Reveal } from '../ui/site.jsx';
import { skills, SKILL_GROUPS, skillSrc } from '../../data/skills.js';

/* Brand-logo wall of every skill on the résumé. Picking a category narrows
   the wall to that group; every logo shown stays full colour. */
export default function Skills() {
  const [group, setGroup] = React.useState('All');
  const counts = React.useMemo(
    () => Object.fromEntries(SKILL_GROUPS.map((g) => [g, skills.filter((s) => s.group === g).length])),
    [],
  );

  return (
    <section id="skills" className="site bg-white py-[clamp(90px,12vw,160px)]">
      <Container>
        <SectionTitle ghost="TOOLKIT" meta={`${skills.length} tools · from the résumé`}>SKILLS</SectionTitle>

        <Reveal className="-mx-[clamp(16px,4vw,48px)] mb-12 overflow-x-auto px-[clamp(16px,4vw,48px)] [scrollbar-width:none]">
          <div className="flex w-max gap-2" role="tablist" aria-label="Skill categories">
            {['All', ...SKILL_GROUPS].map((g) => {
              const on = g === group;
              return (
                <button
                  key={g}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setGroup(g)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-300 ${
                    on ? 'border-carbon bg-carbon text-white' : 'border-carbon/10 bg-white text-carbon/70 hover:border-carbon/30 hover:text-carbon'
                  }`}
                >
                  {g}
                  <span className={`ml-1.5 text-[11px] ${on ? 'text-white/50' : 'text-smoke'}`}>
                    {g === 'All' ? skills.length : counts[g]}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

      </Container>

      {/* full-bleed logo wall — spans the whole section width */}
      <ul key={group} className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-x-2 gap-y-2 px-[clamp(16px,3vw,48px)] max-sm:grid-cols-2">
        {skills.filter((s) => group === 'All' || s.group === group).map((s, i) => (
            <Reveal
              as="li"
              key={s.key || s.id}
              delay={Math.min(i, 16) * 30}
              className="relative hover:z-10"
            >
              <div className="group flex h-[104px] items-center justify-center gap-4 rounded-3xl px-4 transition-[scale,background-color,box-shadow] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[scale] hover:scale-[1.3] hover:bg-white hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.3)] max-sm:justify-start max-sm:hover:scale-[1.12]">
                <img
                  src={skillSrc(s.id)}
                  alt=""
                  loading="lazy"
                  className="h-12 w-12 shrink-0 object-contain transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6"
                />
                <span className="min-w-0">
                  <span className="block truncate text-[16px] font-bold tracking-[-0.01em]">{s.name}</span>
                  <span className="block truncate text-[11.5px] text-smoke">{s.group}</span>
                </span>
              </div>
            </Reveal>
        ))}
      </ul>
    </section>
  );
}
