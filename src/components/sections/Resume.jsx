import React from 'react';
import Shell from '../ui/Shell.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';
import Button from '../ui/Button.jsx';
import { IconArrow } from '../ui/Icons.jsx';
import { defaultContent } from '../../data/content.jsx';

/* In-app résumé — same retro style as the rest of the site, sourced from
   Abhinay_Resume.pdf. A "Download PDF" button still serves the raw file. */

const summary =
  'Information Technology graduate with hands-on experience in Java, Spring Boot, Microservices, ' +
  'React, and mobile app development (React Native), skilled in building scalable, cloud-ready ' +
  'applications. Proficient in REST APIs, PostgreSQL, MongoDB, and Docker (CI/CD), with strong ' +
  'problem-solving and collaboration skills. Delivered AI-powered automation projects and ' +
  'award-winning innovations, eager to contribute to cloud and AI-driven solutions.';

const skills = [
  { label: 'Languages', items: ['Java', 'JavaScript'] },
  { label: 'Technologies', items: ['React', 'React Native', 'Tailwind CSS', 'Bootstrap', 'Microservices'] },
  { label: 'Databases', items: ['MongoDB', 'Firebase', 'PostgreSQL'] },
  { label: 'Frameworks', items: ['Spring', 'Spring Boot'] },
  { label: 'Tools', items: ['Kafka', 'Docker', 'Git', 'Postman'] },
];

const experience = [
  {
    title: 'SOFTWARE ENGINEER', org: 'Fisec · Hyderabad, India', date: 'JUL 2025 – PRESENT',
    points: [
      'Contributing to the development of Java Spring Boot microservices for financial applications.',
      'Implementing and testing REST APIs to ensure secure and reliable data exchange.',
      'Leveraged Git for version control and Docker-based deployment pipelines (CI/CD) for reliable, continuous delivery.',
      'Collaborating with cross-functional teams to design scalable and maintainable backend services.',
      'Debugging and optimizing application performance to improve response time and system efficiency.',
    ],
  },
  {
    title: 'FULL-STACK DEVELOPER', org: 'AgasthyaEnterprises · Remote', date: 'NOV 2024 – JAN 2025',
    points: [
      'Developed a feature-rich Invoice Maker application from scratch as a solo project for small businesses and freelancers.',
      'Ensured a responsive, user-friendly UI with Tailwind CSS and optimized the app for fast loading and seamless operation.',
    ],
  },
];

const projects = [
  {
    title: 'VIGNAN LIVE — Campus Event Booking App',
    points: [
      'Android app built with React Native for campus event booking and management.',
      'Role-based access and real-time booking with QR-based ticket validation.',
      'Firebase for authentication and database management.',
    ],
    stack: ['React Native', 'Firebase', 'QR Code'],
  },
  {
    title: 'AGASTHYAENTERPRISES — Invoice Maker',
    points: [
      'Full-stack Invoice Maker to generate, customize and manage invoices for small businesses and freelancers.',
      'Deployed in a CI/CD workflow using Git and containerized environments; worked independently with code reviews.',
    ],
    stack: ['React', 'Firebase', 'Tailwind CSS'],
  },
  {
    title: 'FIR INTELLIGENCE SYSTEM',
    points: [
      'AI-powered FIR automation integrating OCR, translation, sentiment analysis, summarization and speech synthesis.',
      'Bilingual support (English–Hindi), audio accessibility and rapid comprehension via intelligent summarization.',
    ],
    stack: ['Python', 'Flask', 'React', 'Hugging Face'],
  },
];

const achievements = [
  'DRDO’s Vigyan Vaibhav 2025 Project Expo — FIR Intelligence System selected for presentation.',
  'Collaborated with a team of four, integrating multiple modules and presenting the project.',
  'Best Project Award — recognized for the FIR Intelligence System at college.',
];

const education = [
  { school: 'Vignana Bharathi Institute of Technology', degree: 'B.Tech in Information Technology', extra: 'GPA 7.65 / 10', date: '2022 – 2025' },
  { school: 'Kshatriya College of Engineering', degree: 'Diploma in Civil Engineering', extra: 'GPA 7.48 / 10', date: '2019 – 2022' },
];

const certifications = [
  'J.P. Morgan Software Engineering Virtual Experience (Forage) — Jul 2024',
  'Introduction to MongoDB — Aug 2024',
  'Wipro TalentNext Java Full Stack — Sep 2024',
];

const chip =
  'inline-flex items-center border-2 border-ink bg-cream-2 px-2 pb-[5px] pt-1.5 font-pixel text-[8px] tracking-[0.06em] text-ink';

function Card({ color, title, children }) {
  return (
    <div className="relative overflow-hidden border-[3px] border-ink bg-cream p-[clamp(20px,3vw,28px)] shadow-pixel">
      <span className="absolute left-0 top-0 h-2 w-full border-b-[3px] border-ink" style={{ background: color }} />
      <h3 className="mb-5 mt-1.5 flex items-center gap-2.5 font-pixel text-[13px] tracking-[0.04em]">
        <span className="h-3.5 w-3.5 border-2 border-ink" style={{ background: color }} />
        {title}
      </h3>
      {children}
    </div>
  );
}

function Bullets({ points }) {
  return (
    <ul className="flex flex-col gap-2">
      {points.map((p) => (
        <li key={p} className="flex items-start gap-2.5 font-mono text-[13.5px] leading-[1.55] text-ink-soft">
          <span aria-hidden="true" className="font-bold text-coral-deep">▸</span> {p}
        </li>
      ))}
    </ul>
  );
}

const contactChip =
  'inline-flex items-center gap-2 border-[3px] border-ink bg-cream px-3 py-2 font-pixel text-[9px] tracking-[0.06em] text-ink shadow-pixel-sm';

function Dot({ color }) {
  return <span aria-hidden="true" className="h-1.5 w-1.5 border border-ink" style={{ background: color }} />;
}

export default function Resume({ go, contact = defaultContent.contact }) {
  const { email, phone, linkedin, resumeUrl } = contact;
  const linkedinLabel = (linkedin || '').replace(/^https?:\/\/(www\.)?linkedin\.com\//i, '').replace(/\/+$/, '') || 'LinkedIn';
  return (
    <section id="resume" className="relative bg-cream py-[100px]">
      <Shell>
        {/* header */}
        <header className="mx-auto mb-12 flex max-w-[820px] flex-col items-center gap-[18px] text-center">
          <Eyebrow>▸ RÉSUMÉ / CV</Eyebrow>
          <h2 className="font-pixel text-[clamp(22px,4vw,40px)] leading-[1.2]">
            <span className="text-coral-deep">ABHINAY</span> <span className="text-blue-deep">MARRIPELLI</span>
          </h2>
          <p className="font-pixel text-[10px] tracking-[0.1em] text-ink-soft">
            SOFTWARE ENGINEER · FULL-STACK DEVELOPER
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className={contactChip}><Dot color="var(--color-coral)" /> Hyderabad</span>
            <a className={`${contactChip} hover:bg-yellow`} href={`mailto:${email}`}><Dot color="var(--color-blue)" /> {email}</a>
            {phone && (
              <a className={`${contactChip} hover:bg-yellow`} href={`tel:${phone.replace(/\s/g, '')}`}><Dot color="var(--color-green)" /> {phone}</a>
            )}
            {linkedin && (
              <a className={`${contactChip} hover:bg-yellow`} href={linkedin} target="_blank" rel="noopener noreferrer"><Dot color="var(--color-purple)" /> {linkedinLabel}</a>
            )}
          </div>
          <div className="mt-1.5 flex flex-wrap justify-center gap-3.5">
            {resumeUrl && (
              <Button href={resumeUrl} target="_blank" rel="noopener noreferrer" variant="yellow">
                Download PDF <IconArrow />
              </Button>
            )}
            <Button variant="ghost" onClick={() => go('contact')}>Get in touch</Button>
          </div>
        </header>

        {/* summary */}
        <div className="mx-auto mb-8 max-w-[1000px]">
          <Card color="var(--color-purple)" title="PROFESSIONAL SUMMARY">
            <p className="font-mono text-[14.5px] leading-[1.7] text-ink-soft">{summary}</p>
          </Card>
        </div>

        {/* two-column body */}
        <div className="mx-auto grid max-w-[1000px] grid-cols-[1.5fr_1fr] gap-6 max-[920px]:grid-cols-1">
          {/* main column */}
          <div className="flex flex-col gap-6">
            <Card color="var(--color-blue)" title="EXPERIENCE">
              <div className="flex flex-col gap-7">
                {experience.map((e) => (
                  <div key={e.title}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <h4 className="font-pixel text-[11px] text-ink">{e.title}</h4>
                      <span className="font-pixel text-[8px] tracking-[0.08em] text-ink-mute">{e.date}</span>
                    </div>
                    <div className="mb-3 mt-1.5 font-mono text-[13px] font-semibold text-purple-night">{e.org}</div>
                    <Bullets points={e.points} />
                  </div>
                ))}
              </div>
            </Card>

            <Card color="var(--color-green)" title="PROJECTS">
              <div className="flex flex-col gap-7">
                {projects.map((p) => (
                  <div key={p.title}>
                    <h4 className="mb-3 font-pixel text-[11px] leading-[1.5] text-ink">{p.title}</h4>
                    <Bullets points={p.points} />
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span key={s} className={chip}>{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* sidebar column */}
          <div className="flex flex-col gap-6">
            <Card color="var(--color-coral)" title="CORE SKILLS">
              <div className="flex flex-col gap-4">
                {skills.map((g) => (
                  <div key={g.label}>
                    <div className="mb-2 font-pixel text-[8px] uppercase tracking-[0.14em] text-ink-mute">{g.label}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {g.items.map((s) => (
                        <span key={s} className={chip}>{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card color="var(--color-yellow)" title="ACHIEVEMENTS">
              <Bullets points={achievements} />
            </Card>

            <Card color="var(--color-purple-deep)" title="EDUCATION">
              <div className="flex flex-col gap-5">
                {education.map((ed) => (
                  <div key={ed.school}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <h4 className="font-pixel text-[10px] leading-[1.5] text-ink">{ed.school}</h4>
                      <span className="font-pixel text-[8px] tracking-[0.08em] text-ink-mute">{ed.date}</span>
                    </div>
                    <div className="mt-1.5 font-mono text-[13px] text-ink-soft">{ed.degree}</div>
                    <div className="font-mono text-[12.5px] text-purple-night">{ed.extra}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card color="var(--color-blue-deep)" title="CERTIFICATIONS">
              <Bullets points={certifications} />
            </Card>
          </div>
        </div>
      </Shell>
    </section>
  );
}
