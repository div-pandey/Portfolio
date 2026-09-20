// ============================================================
// CONTENT DATA — Divyansh's real portfolio content
// ============================================================

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  color: string;
}

export interface Skill {
  category: string;
  icon: string;
  items: string[];
  color: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  achievements: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

// ── Personal Info ──
export const personalInfo = {
  name: 'Divyansh',
  title: 'Full-Stack Developer',
  roles: ['Full-Stack Developer', 'B.Tech CS Student', 'Problem Solver', 'Builder'],
  email: 'div.pandey.css@gmail.com',
  location: 'India',
  university: 'AKTU',
  github: 'div-pandey',
  bio: [
    "B.Tech Computer Science student at AKTU, focused on building full-stack applications with real-world use cases. I don't just write code — I ship products that solve actual problems.",
    "From food ordering platforms with payment integration to AI-powered resume analysis tools, every project I build is production-grade with real users, real databases, and real deployments.",
    "I believe the best way to learn engineering is to build things people actually use. That philosophy drives every line of code I write.",
  ],
  stats: [
    { label: 'Projects Shipped', value: 5, suffix: '+' },
    { label: 'Technologies', value: 12, suffix: '+' },
    { label: 'Years Coding', value: 2, suffix: '+' },
  ],
};

// ── Projects ──
export const projects: Project[] = [
  {
    id: 'ardent',
    title: 'Ardent',
    description: 'Career Intelligence Platform that maps the invisible connections between your skills, professional goals, and career trajectories.',
    longDescription: 'A Career Intelligence Platform that maps the invisible connections between your skills, professional goals, and career trajectories. Built to help users visualize and navigate their professional growth.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    image: '/images/ardent.png',
    liveUrl: 'https://ardent-div-3cf2.vercel.app/',
    githubUrl: 'https://github.com/div-pandey/Ardent',
    featured: true,
    color: '#3b82f6',
  },
  {
    id: 'apnaa-khana',
    title: 'Apnaa Khana',
    description: 'Full-stack food ordering platform with real-time order tracking, Razorpay payment processing, admin dashboard, and automated email notifications.',
    longDescription: 'A production-grade food ordering platform built from the ground up. Features include real-time order tracking, secure Razorpay payment gateway integration, a full admin dashboard for restaurant management, automated email notifications via Resend, and responsive UI. Handles the complete order lifecycle from browsing to delivery confirmation.',
    tech: ['Next.js', 'Supabase', 'Razorpay', 'TypeScript', 'Resend'],
    image: '/images/apnaa-khana.webp',
    liveUrl: 'https://apnaa-khana-live.vercel.app/',
    githubUrl: 'https://github.com/div-pandey/Apnaa-Khana',
    featured: true,
    color: '#f97316',
  },
  {
    id: 'ink-flow',
    title: 'InkFlow',
    description: 'Premium, full-stack blogging platform featuring a custom editorial aesthetic, rich WYSIWYG editor with live HTML validation, JWT authentication, and Turso database.',
    longDescription: 'Premium, full-stack blogging platform featuring a custom editorial aesthetic, a rich WYSIWYG editor with live HTML validation, robust JWT authentication, and a Turso cloud-hosted database.',
    tech: ['Next.js', 'TypeScript', 'Turso', 'libSQL'],
    image: '/images/inkflow.png',
    liveUrl: 'https://ink-flow-live.vercel.app/',
    githubUrl: 'https://github.com/div-pandey/Ink-Flow',
    featured: true,
    color: '#10b981',
  },
  {
    id: 'taskflow',
    title: 'TaskFlow',
    description: 'Ultra-premium, full-stack Next.js application bringing real-time collaboration, fluid Framer Motion animations, and NextAuth security.',
    longDescription: 'Ultra-premium, full-stack Next.js application that brings real-time collaboration and distraction-free design to your daily workflow. Features fluid Framer Motion animations, NextAuth security, and a Turso cloud-native database.',
    tech: ['Next.js', 'Prisma', 'Turso', 'NextAuth'],
    image: '/images/taskflow.png',
    liveUrl: 'https://taskflow-beta-live.vercel.app/',
    githubUrl: 'https://github.com/div-pandey/TaskFlow',
    featured: true,
    color: '#6366f1',
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic Tac Toe',
    description: 'Product-level game with smart AI opponent, strategic hints, persistent game state, sound controls, and polished UI/UX.',
    longDescription: 'Not your average tic-tac-toe. Built as a product-level frontend experience with an unbeatable Minimax AI, real-time strategic hints, localStorage-persisted game state across sessions, configurable sound effects, and a carefully crafted UI with animations and transitions.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Minimax AI', 'LocalStorage'],
    image: '/images/tic-tac-toe.webp',
    liveUrl: 'https://tic-tac-toe-beta-live.vercel.app/',
    githubUrl: 'https://github.com/div-pandey/tic-tac-toe',
    featured: true,
    color: '#06b6d4',
  },
  {
    id: 'ai-resume-analyzer',
    title: 'AI Resume Analyzer',
    description: 'AI-powered tool that evaluates ATS compatibility, identifies keyword gaps, and generates optimized resume improvements using local LLM-based feedback.',
    longDescription: 'An intelligent resume analysis platform that leverages LLM technology (Ollama) to evaluate resumes against job descriptions. Features ATS compatibility scoring, semantic keyword matching, gap analysis, and actionable improvement suggestions. Runs entirely locally for privacy — no data leaves your machine.',
    tech: ['TypeScript', 'Ollama', 'LLM', 'NLP', 'React'],
    image: '/images/ai-resume.webp',
    githubUrl: 'https://github.com/div-pandey',
    featured: false,
    color: '#8b5cf6',
  },
];

// ── Skills ──
export const skills: Skill[] = [
  {
    category: 'Frontend',
    icon: '◆',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Three.js', 'HTML5', 'CSS3', 'Tailwind'],
    color: '#8b5cf6',
  },
  {
    category: 'Backend',
    icon: '▲',
    items: ['Node.js', 'Express', 'Python', 'REST APIs', 'Supabase', 'Firebase'],
    color: '#06b6d4',
  },
  {
    category: 'Database & Cloud',
    icon: '●',
    items: ['PostgreSQL', 'MongoDB', 'Supabase', 'Firebase', 'Vercel', 'Razorpay'],
    color: '#14b8a6',
  },
  {
    category: 'Tools & AI',
    icon: '■',
    items: ['Git', 'GitHub', 'Docker', 'Ollama', 'LLMs', 'Figma', 'VS Code', 'Linux'],
    color: '#f59e0b',
  },
];

// ── Tech sphere labels ──
export const techSphereItems = [
  'React', 'Next.js', 'Node.js', 'TypeScript', 'Python',
  'Three.js', 'MongoDB', 'PostgreSQL', 'Supabase', 'Docker',
  'Git', 'Tailwind', 'JavaScript', 'Express', 'Razorpay',
  'Ollama', 'LLMs', 'Vercel', 'Figma', 'HTML5',
];

// ── Timeline ──
export const timeline: TimelineEntry[] = [
  {
    year: '2026',
    title: 'Full-Stack Developer',
    company: 'Shipping Production Apps',
    duration: 'Present',
    description: 'Building and deploying production-grade web applications with real payment systems and AI integrations.',
    achievements: [
      'Built Apnaa Khana — full food ordering platform with Razorpay payments',
      'Developed AI Resume Analyzer using local LLMs for privacy-first analysis',
      'Engineered 3D interactive portfolio with Three.js and React Three Fiber',
    ],
  },
  {
    year: '2025',
    title: 'Frontend & Full-Stack Learning',
    company: 'Self-Directed / B.Tech CS @ AKTU',
    duration: '2025',
    description: 'Deep-dived into modern web development frameworks and shipped first real projects.',
    achievements: [
      'Mastered React, Next.js, TypeScript ecosystem',
      'Built product-level Tic Tac Toe with Minimax AI',
      'Started contributing to open source and developer communities',
    ],
  },
  {
    year: '2024',
    title: 'Started Coding Journey',
    company: 'Self-Taught Developer',
    duration: '2024',
    description: 'Began the journey into software development with a focus on web technologies.',
    achievements: [
      'Learned HTML, CSS, JavaScript fundamentals from scratch',
      'Built first projects and understood web architecture',
      'Began studying Data Structures & Algorithms',
    ],
  },
];

// ── Social Links ──
export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/div-pandey', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/divyansh', icon: 'linkedin' },
  { name: 'Twitter', url: 'https://twitter.com/divyansh', icon: 'twitter' },
  { name: 'Instagram', url: 'https://instagram.com/divyansh', icon: 'instagram' },
];

// ── Navigation ──
export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];
