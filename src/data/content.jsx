/* ============================================================
   Abhinay Marripelli — portfolio · shared content
   These are the STATIC DEFAULTS (sourced from the résumé). The admin
   (/admin) can override the editable slices, which are merged over
   `defaultContent` at runtime by the content provider.
   ============================================================ */

/* Bump when the shape/meaning of the editable content changes. Saved admin
   overrides from an older version are ignored until the admin saves again,
   so fresh defaults are never hidden behind stale data. */
export const CONTENT_VERSION = 3;

export const RESUME_URL = '/resume/Abhinay_Resume.pdf';
export const GAME_URL = 'https://games.abhinay.online'; // egg-catcher is deployed separately
export const GITHUB_URL = 'https://github.com/ABHINAY2025';
export const FISEC_URL = 'https://fisecglobal.net/';
export const EMAIL = 'abhinayabhi2025@gmail.com';
export const PHONE = '+91 8500851081';
export const LINKEDIN_URL = 'https://linkedin.com/in/abhinay-ma';

/* colour options offered in the admin colour pickers (project cover glow) */
export const PALETTE = [
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Violet', value: '#8b5cf6' },
  { label: 'Emerald', value: '#10b981' },
  { label: 'Amber', value: '#f59e0b' },
  { label: 'Rose', value: '#f43f5e' },
  { label: 'Cyan', value: '#06b6d4' },
  { label: 'Orange', value: '#f97316' },
  { label: 'Slate', value: '#94a3b8' },
];

const hero = {
  portrait: '', // empty → use the bundled black & white portrait
  status: 'Available for new opportunities',
  firstName: 'ABHINAY',
  lastName: 'MARRIPELLI',
  role: 'Full Stack & DevOps Engineer',
  tagline:
    'Building and operating banking-grade platforms end to end — Spring Boot microservices, ' +
    'React micro-frontends and the cloud chain that ships them.',
};

const about = {
  intro:
    'I build the pipelines that ship software and the monitoring that keeps it honest — CI/CD that takes ' +
    'every merge from commit to production, Kubernetes and AWS infrastructure that scales with the load, ' +
    'and logging and alerting that catch problems before users do. Underneath it all: microservices and ' +
    'front ends designed to stay fast and reliable at scale.',
  stats: [
    { value: '1.2+', label: 'Years in production engineering' },
    { value: '5', label: 'Environments in every release pipeline' },
    { value: '2', label: 'Live platforms monitored with ELK' },
    { value: '40+', label: 'Service APIs shipped' },
  ],
};

export const services = [
  {
    title: 'Full-Stack Development',
    desc: 'Features owned from domain model and API design through React UI, tests, release and production support.',
  },
  {
    title: 'Microservices & APIs',
    desc: 'Spring Boot services, RESTful APIs, Kafka event streams and SSE / WebSocket real-time delivery.',
  },
  {
    title: 'DevOps & Cloud',
    desc: 'AWS infrastructure, Kubernetes + Helm, Terraform, Ansible and Jenkins CI/CD pipelines that ship without drama.',
  },
  {
    title: 'Real-time Frontends',
    desc: 'Module-federated React micro-frontends, live operator dashboards and shared design-token theming.',
  },
];

export const projects = [
  {
    slug: 'qdl',
    title: 'QDL — Quantum Data Leap',
    kind: 'Real Project',
    summary: 'AI decision intelligence for financial and operational data.',
    overview:
      'Quantum Data Leap is an AI-powered decision intelligence platform that turns complex financial and ' +
      'operational data into clear, actionable insight. I work across the whole stack: the Spring Boot ' +
      'microservices and React front ends, and the Kubernetes, Terraform and Jenkins delivery chain that ' +
      'carries every change from QA through UAT, E2E and Staging into Production, with ELK watching it all.',
    tags: ['Decision Intelligence', 'FISEC Global'],
    desc:
      'An AI-powered decision intelligence platform that helps organisations turn complex financial and ' +
      'operational data into clear, actionable insights.',
    role: 'Full-Stack & DevOps Engineer',
    timeline: '2025 — Now',
    team: '7 engineers',
    tools: ['java', 'spring', 'react', 'kubernetes', 'helm', 'terraform', 'aws', 'jenkins', 'claude'],
    points: [
      'Built and maintained Java / Spring Boot microservices and React front ends.',
      'Handled build and deployment across QA, UAT, E2E, Staging and Production.',
      'Created and maintained Helm charts for Kubernetes-based deployments.',
      'Managed CI/CD with Jenkins, Git, SonarQube, Maven and JFrog.',
      'Provisioned infrastructure with Terraform and configured it with Ansible.',
      'Centralised logging and production analysis with ELK / Kibana, plus RCA write-ups.',
      'Used Claude CLI to draft and refine Terraform and Helm configuration.',
    ],
    color: '#8b5cf6',
    link: '',
  },
  {
    slug: 'willingly',
    title: 'Willingly — Donation & NGO Fundraising',
    kind: 'Real Project',
    summary: 'Campaigns for NGOs, transparent giving for donors.',
    overview:
      'Willingly lets NGOs launch fundraising campaigns and lets donors give and follow where their money ' +
      'goes. As the DevOps engineer on a six-person team I owned the path to production: Java microservices ' +
      'on AWS EKS packaged with Helm, Jenkins pipelines gated by SonarQube, Ansible for the Windows servers ' +
      'that still run on-premises, and ELK dashboards to keep an eye on it all.',
    tags: ['Fundraising', 'FISEC Global'],
    desc:
      'A donation and NGO fundraising platform that lets NGOs run campaigns and donors contribute to and ' +
      'track their donations.',
    role: 'DevOps Engineer',
    timeline: '2025',
    team: '6 engineers',
    tools: ['kubernetes', 'helm', 'aws', 'ansible', 'jenkins', 'sonarqube', 'maven', 'elasticsearch'],
    points: [
      'Deployed Java microservices on AWS EKS with Kubernetes and Helm charts.',
      'Ran build and release across QA, UAT, Staging and Production.',
      'Automated Windows on-prem deployments and server config with Ansible playbooks.',
      'Monitored health, performance and logs with ELK and Kibana.',
      'Supported production incidents and documented RCAs for recurring issues.',
    ],
    color: '#10b981',
    link: '',
  },
  {
    slug: 'bolt',
    title: 'Bolt — Run Tracker',
    kind: 'Side Project',
    summary: 'Strava-style run tracking with live GPS routes.',
    overview:
      'Bolt is a Strava-style running tracker I built end to end. Runs are recorded as live GPS routes with ' +
      'splits, and an Express API backed by Firestore stores them behind JWT authentication. I kept the API ' +
      'contract strict and predictable, with snake_case on the wire everywhere, so the client never has to guess.',
    tags: ['Mobile', 'Full-Stack'],
    desc:
      'A Strava-style running tracker. Express + Firestore backend with JWT auth, live GPS routes, splits and a ' +
      'clean snake_case wire contract.',
    role: 'Solo build',
    timeline: '2025',
    team: '',
    tools: ['react', 'nodejs', 'express', 'firebase'],
    points: [
      'Express + Firestore API with JWT-based authentication.',
      'Live GPS route recording with per-split pacing.',
      'A consistent snake_case wire contract between client and API.',
      'React front end for logging runs and reviewing routes.',
    ],
    color: '#f97316',
    link: GITHUB_URL,
  },
  {
    slug: 'smart-invoice',
    title: 'Smart Invoice Maker',
    kind: 'Side Project',
    summary: 'Invoices with auto tax and one-click PDF export.',
    overview:
      'Smart Invoice Maker takes the busywork out of billing for small studios. Line items total themselves, ' +
      'tax is worked out automatically, and a finished invoice exports to a clean PDF in one click, all on a ' +
      'React front end backed by a Node.js API and MongoDB.',
    tags: ['Fintech', 'Full-Stack'],
    desc:
      'Professional invoices with auto-calculations, tax handling and one-click PDF export — a full-stack tool ' +
      'built for small studios.',
    role: 'Solo build',
    timeline: '2024',
    team: '',
    tools: ['react', 'nodejs', 'mongodb'],
    points: [
      'Automatic line-item and total calculations.',
      'Tax handling built into every invoice.',
      'One-click export to a print-ready PDF.',
      'React front end on a Node.js and MongoDB backend.',
    ],
    highlight: { value: '1-click', label: 'PDF invoices, auto tax.' },
    color: '#f59e0b',
    link: GITHUB_URL,
  },
];

export const experience = [
  {
    org: 'FISEC Global',
    title: 'Software Engineer — Full Stack & DevOps',
    period: 'Jul 2025 — Now',
    copy: 'CI/CD pipelines, Kubernetes and AWS infrastructure and ELK monitoring — plus the Spring Boot microservices and React micro-frontends they ship.',
    tools: ['java', 'spring', 'react', 'kafka', 'kubernetes', 'aws'],
  },
  {
    org: 'Vignana Bharathi Institute of Technology',
    title: 'B.Tech, Information Technology · CGPA 7.65',
    period: '2022 — 2025',
    copy: 'Undergraduate degree in IT, Hyderabad.',
    tools: ['java', 'python', 'javascript'],
  },
  {
    org: 'Motion Cut',
    title: 'Web Development Intern',
    period: 'Internship',
    copy: 'Responsive interfaces in HTML, CSS and JS with dynamic content updates and better cross-device performance.',
    tools: ['html5', 'css3', 'javascript'],
  },
  {
    org: 'J.P. Morgan Chase · Forage',
    title: 'Software Engineering Virtual Experience',
    period: 'Virtual',
    copy: 'Set up a local dev environment and used the Perspective library for live trader data visualisation.',
    tools: ['python', 'react'],
  },
  {
    org: 'Kshatriya College of Engineering',
    title: 'Diploma, Civil Engineering · GPA 7.48',
    period: '2019 — 2022',
    copy: 'Where the engineering habit started.',
    tools: [],
  },
];

export const certifications = [
  { name: 'Model Context Protocol (MCP)', by: 'Anthropic' },
  { name: 'Java Full Stack — TalentNext', by: 'Wipro' },
  { name: 'Software Engineering Virtual Experience', by: 'J.P. Morgan · Forage' },
  { name: 'Introduction to MongoDB', by: 'MongoDB University' },
];

/* Writings are a list (the admin can add more). `body` uses a tiny
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
  projects,
  writings,
  contact,
};
