import React from 'react';
import { IconHeart, IconStar, IconDiamond } from '../components/ui/Icons.jsx';

/* ============================================================
   ABHINAY_MA — retro-pixel portfolio · shared content
   These are the STATIC DEFAULTS. The admin (/admin) can override
   the editable slices, which are merged over `defaultContent`
   at runtime by the content provider.
   ============================================================ */

export const RESUME_URL = '/resume/Abhinay_Resume.pdf';
export const GAME_URL = 'https://games.abhinay.online'; // egg-catcher is deployed separately
export const GITHUB_URL = 'https://github.com/ABHINAY2025';
export const FISEC_URL = 'https://fisecglobal.net/';
export const EMAIL = 'abhinayabhi2025@gmail.com';
export const PHONE = '+91 7989406762';
export const LINKEDIN_URL = 'https://linkedin.com/in/abhinay-ma';

export const TABS = [
  ['home', 'Home'],
  ['about', 'About'],
  ['work', 'Work'],
  ['stack', 'Stack'],
  ['game', 'Game'],
  ['writing', 'Writing'],
];

/* colour options offered in the admin colour pickers */
export const PALETTE = [
  { label: 'Blue', value: 'var(--color-blue)' },
  { label: 'Coral', value: 'var(--color-coral)' },
  { label: 'Green', value: 'var(--color-green)' },
  { label: 'Yellow', value: 'var(--color-yellow)' },
  { label: 'Purple', value: 'var(--color-purple)' },
  { label: 'Purple deep', value: 'var(--color-purple-deep)' },
  { label: 'Coral sunset', value: 'var(--color-coral-sunset)' },
  { label: 'Blue deep', value: 'var(--color-blue-deep)' },
];

const hero = {
  image: '', // empty → use the bundled default portrait
  badge: '★ FULL-STACK DEVELOPER ✦ AI ENTHUSIAST',
  titleLine1: 'ABHINAY',
  titleAccent: '_MA.',
  titleLine2: 'BUILD.',
  intro:
    'I build for community and uncover stories through code & design — from microservice ' +
    'backends to AR experiments and AI agents. Currently shipping backends at FISEC Global.',
};

const about = {
  intro:
    'Growing up surrounded by creativity fuelled my curiosity about how communities shape ' +
    'everyday experiences. From tech to design, filmmaking and psychology — every skill led ' +
    'me toward building meaningful, human-centred digital products.',
  bullets: [
    'Specialise in emerging tech & full-stack development',
    'Backend at FISEC Global — Java + microservices',
    'Obsessed with tools that feel effortless',
    'Creative problem solver, perpetual learner',
  ],
};

export const projects = [
  {
    num: '01', color: 'var(--color-blue)', title: 'AR STRUCTURE VIEWER', icon: 'IconAi',
    desc: 'View famous monuments like the Taj Mahal in your real surroundings using AI-driven AR. Place, scale and walk around 3D heritage models in the browser.',
    chips: ['AR', 'AI', '3D', 'WebXR', '2025'], link: GITHUB_URL,
  },
  {
    num: '02', color: 'var(--color-coral)', title: 'SMART INVOICE MAKER', icon: 'IconData',
    desc: 'Create professional invoices with auto-calculations, tax handling and one-click PDF export. A full-stack fintech tool built for small studios.',
    chips: ['FULL-STACK', 'FINTECH', 'PDF', '2024'], link: GITHUB_URL,
  },
  {
    num: '03', color: 'var(--color-green)', title: 'BOLT — RUN TRACKER', icon: 'IconMobile',
    desc: 'A Strava-style running tracker. Express + Firestore backend with JWT auth, live GPS routes, splits and a clean snake_case wire contract.',
    chips: ['EXPRESS', 'FIRESTORE', 'JWT', 'MAPS'], link: GITHUB_URL,
  },
];

export const stack = [
  {
    num: '01', color: 'var(--color-blue)', title: 'FRONTEND', icon: 'IconCode',
    desc: 'Pixel-precise, accessible interfaces with motion that feels alive.',
    chips: ['React', 'Vite', 'Tailwind', 'Framer Motion', 'GSAP'],
  },
  {
    num: '02', color: 'var(--color-green)', title: 'BACKEND', icon: 'IconServer',
    desc: 'Microservices, REST APIs and queue-driven workers that hold up under load.',
    chips: ['Java', 'Node.js', 'Express', 'FastAPI', 'Flask'],
  },
  {
    num: '03', color: 'var(--color-coral)', title: 'DATA', icon: 'IconData',
    desc: 'The right store for the job — relational, document or realtime.',
    chips: ['Postgres', 'MongoDB', 'Firestore', 'Redis'],
  },
  {
    num: '04', color: 'var(--color-yellow)', title: 'AI / ML', icon: 'IconAi',
    desc: 'Agents, RAG and LLM features wired into real products.',
    chips: ['Claude API', 'Groq', 'LangChain', 'pgvector'],
  },
  {
    num: '05', color: 'var(--color-purple)', title: 'CLOUD', icon: 'IconCloud',
    desc: 'Containerised, observable deploys that ship without drama.',
    chips: ['Docker', 'Vercel', 'Firebase', 'GitHub Actions'],
  },
  {
    num: '06', color: 'var(--color-purple-deep)', title: 'CRAFT', icon: 'IconDiamond',
    desc: 'The details — performance, DX and design systems that scale.',
    chips: ['TypeScript', 'Git', 'Figma', 'Testing'],
  },
];

export const experience = [
  {
    n: '01', title: 'BACKEND DEVELOPER', org: 'FISEC Global · Current',
    copy: 'Java + microservices backend — scalable APIs, service-to-service communication and enterprise-grade reliability.',
  },
  {
    n: '02', title: 'PROJECT MANAGEMENT SIM', org: 'Accenture N.A. · Forage',
    copy: 'Ran a new brand launch as PM, mapping Plan-Driven, Agile, Scaled Agile and Hybrid methodologies across a portfolio.',
  },
  {
    n: '03', title: 'WEB DEVELOPMENT INTERN', org: 'Motion Cut',
    copy: 'Built responsive interfaces in HTML, CSS and JS with dynamic content updates and improved cross-device UI performance.',
  },
  {
    n: '04', title: 'SOFTWARE ENGINEERING VX', org: 'J.P. Morgan Chase · Forage',
    copy: 'Fixed repo files, set up a local dev environment and used JPMorgan’s Perspective library for live trader data viz.',
  },
  {
    n: '05', title: 'MODEL CONTEXT PROTOCOL', org: 'Anthropic · Certified',
    copy: 'Completed Anthropic’s “Introduction to Model Context Protocol” — connecting models to real tools, APIs and applications beyond prompts.',
  },
];

/* Writings are a list now (the admin can add more). `body` uses a tiny
   markdown-lite: blank-line blocks, "## " heading, "> " quote, "- " bullet,
   and **bold** inline. Rendered by the Article page. */
export const writings = [
  {
    id: 'ui-details',
    title: 'Why I care about small UI details as a backend dev.',
    date: 'Dec 2025',
    read: '5 min read',
    tag: '#backend #ux #craft',
    excerpt:
      'Most people assume backend developers don’t care about UI. But small UI details are the ' +
      'visible surface of good backend thinking — a button click is a backend contract.',
    body: [
      'Most people assume backend developers don’t care about UI. We live in logs, schemas and latency graphs — pixels are someone else’s job. I used to think that too. Then I shipped enough features to realise something uncomfortable: **nobody experiences my backend directly.** They experience the small UI details it produces.',
      '## A button click is a backend contract',
      'When a user taps a button, they’re not clicking a rectangle — they’re making a request and trusting a promise. Every disabled state, every loading spinner, every toast is the UI honouring a contract my API defined.',
      '> The spinner never stops and the button feels dead.',
      '> That’s a backend contract leaking through the UI. Fix the feedback, fix the trust.',
      '## Micro-interactions reveal system health',
      'A skeleton loader tells you the data is paginated. A retry toast tells you the network is flaky. A debounced search tells you someone respected the rate limit.',
      '- Empty states force me to design the “no data yet” path properly.',
      '- Error copy forces my API to return errors a human can act on.',
      '- Loading feedback forces me to think about perceived latency.',
      '## Caring about details makes my backend better',
      'To support an instant, optimistic UI I had to design idempotent writes. To show a precise progress bar I had to stream real status. Every detail the user feels traces back to a decision in the data layer — the frontend is just where the quality of those decisions becomes **undeniable.**',
    ].join('\n\n'),
  },
];

const contact = {
  email: EMAIL,
  phone: PHONE,
  github: GITHUB_URL,
  linkedin: LINKEDIN_URL,
  fisec: FISEC_URL,
  resumeUrl: RESUME_URL,
};

/* the full editable content tree (static defaults) */
export const defaultContent = {
  hero,
  about,
  experience,
  stack,
  projects,
  writings,
  contact,
};

/* values stay static (not exposed in the admin) */
export const values = [
  {
    icon: <IconStar />, title: 'Always stay learning.',
    copy: 'Every skill — tech, design, film, psychology — feeds the next build.',
    avatar: 'bg-yellow text-ink',
  },
  {
    icon: <IconHeart />, title: 'Build for people, not pixels.',
    copy: 'Empathise deeply. The product is the experience, not the codebase.',
    avatar: 'bg-coral text-ink',
  },
  {
    icon: <IconDiamond />, title: 'Move with intention.',
    copy: 'Navigate every day on purpose — small, deliberate, compounding work.',
    avatar: 'bg-purple text-ink',
  },
];
