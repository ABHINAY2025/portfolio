import React from 'react';
import { Container, Pill, Tag, ToolIcon, ArrowLeft, ArrowUpRight, Reveal } from '../ui/site.jsx';
import { ProjectCover, slugOf } from './Projects.jsx';

/* Case-study page for one project (reached from the Selected Work grid). */
export default function ProjectDetail({ project, projects, onBack, onOpen, onContact }) {
  const idx = projects.indexOf(project);
  const next = projects[(idx + 1) % projects.length];
  const meta = [
    ['Role', project.role],
    ['Timeline', project.timeline],
    ['Team', project.team],
  ].filter(([, v]) => v);

  return (
    <article className="site min-h-screen bg-white pb-24 pt-24">
      <Container>
        <div className="mb-14">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full border border-carbon/10 bg-white px-3.5 py-1.5 text-[13px] font-medium transition hover:border-carbon"
          >
            <ArrowLeft /> Back
          </button>
        </div>

        <div className="anim-fade-up grid grid-cols-[1fr_300px] gap-12 max-md:grid-cols-1">
          <div>
            <div className="flex flex-wrap gap-2">{(project.tags || []).map((t) => <Tag key={t}>{t}</Tag>)}</div>
            <h1 className="mt-6 text-[clamp(36px,5.4vw,72px)] font-semibold leading-[1] tracking-[-0.035em]">
              {project.title}{' '}
              <span className="align-middle text-[0.3em] font-normal tracking-normal text-smoke">/{project.kind || 'Project'}</span>
            </h1>
            <p className="mt-6 max-w-[560px] text-[16px] leading-relaxed text-smoke">{project.desc}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.link && <Pill href={project.link}>Live Preview</Pill>}
              <Pill variant="light" onClick={onContact} icon={false}>Contact Me</Pill>
            </div>
          </div>

          <dl className="flex flex-col gap-6 md:items-end md:text-right">
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[12px] text-smoke">{k}</dt>
                <dd className="mt-1 text-[16px] font-medium">{v}</dd>
              </div>
            ))}
            {project.tools?.length > 0 && (
              <div>
                <dt className="text-[12px] text-smoke">Tools</dt>
                <dd className="mt-2 flex max-w-[260px] flex-wrap gap-2 md:justify-end">
                  {project.tools.map((t) => <ToolIcon key={t} id={t} size={38} />)}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <Reveal className="mt-14 aspect-[16/9] overflow-hidden rounded-[28px] bg-carbon max-sm:aspect-[4/3]">
          <ProjectCover project={project} large />
        </Reveal>

        {project.overview && (
          <section className="mt-[clamp(64px,8vw,110px)] grid grid-cols-[300px_1fr] gap-12 max-md:grid-cols-1 max-md:gap-6">
            <Reveal as="h2" className="text-[clamp(26px,3vw,40px)] font-medium uppercase">
              <span className="text-carbon/35">/</span>OVERVIEW
            </Reveal>
            <Reveal as="p" delay={80} className="max-w-[720px] text-[clamp(18px,1.6vw,22px)] leading-[1.6] text-carbon/80">
              {project.overview}
            </Reveal>
          </section>
        )}

        {project.points?.length > 0 && (
          <section className="mt-[clamp(64px,8vw,110px)] grid grid-cols-[300px_1fr] gap-12 max-md:grid-cols-1 max-md:gap-6">
            <Reveal as="h2" className="text-[clamp(26px,3vw,40px)] font-medium uppercase">
              <span className="text-carbon/35">/</span>WHAT I DID
            </Reveal>
            <ol className="border-t border-carbon/10">
              {project.points.map((p, i) => (
                <Reveal as="li" key={i} delay={i * 60} className="flex gap-5 border-b border-carbon/10 py-5 text-[16px] leading-relaxed">
                  <span className="w-6 shrink-0 pt-0.5 text-[13px] text-smoke">{String(i + 1).padStart(2, '0')}</span>
                  {p}
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        {next && next !== project && (
          <button
            type="button"
            onClick={() => onOpen(slugOf(next, projects.indexOf(next)))}
            data-cursor="open"
            className="group mt-[clamp(80px,10vw,140px)] flex w-full items-end justify-between gap-6 border-t border-carbon/10 pt-10 text-left"
          >
            <span>
              <span className="block text-[13px] uppercase tracking-[0.2em] text-smoke">Next project</span>
              <span className="mt-3 block text-[clamp(28px,5vw,64px)] font-semibold leading-none tracking-[-0.035em] transition-transform duration-500 group-hover:translate-x-3">
                {next.title}
              </span>
            </span>
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-carbon text-white transition-transform duration-500 group-hover:rotate-45 max-sm:h-12 max-sm:w-12">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </button>
        )}
      </Container>
    </article>
  );
}
