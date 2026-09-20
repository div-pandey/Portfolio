export interface Project {
  num: string;
  name: string;
  category: string;
  desc: string;
  tech: string[];
  github: string;
  live: string;
  preview: string; // URL to embed in the iframe card
  forceImage?: boolean; // If true, skips iframe and uses static image screenshot
  year: string;
}

export const WORKS: Project[] = [ 
  {
    num: '01',
    name: 'Ardent',
    category: 'Career Intelligence · Platform',
    desc: 'Career Intelligence Platform that maps the invisible connections between your skills, professional goals, and career trajectories. Built to help users visualize and navigate their professional growth.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    github: 'https://github.com/div-pandey/Ardent',
    live: 'https://ardent-div-3cf2.vercel.app/',
    preview: 'https://ardent-div-3cf2.vercel.app/',
    forceImage: true,
    year: '2026',
  },
  {
    num: '02',
    name: 'Apnaa Khana',
    category: 'Full-Stack · Fintech',
    desc: 'Food ordering platform processing real payments for active users. Built for reliability with Next.js and Supabase, featuring real-time order tracking and live Razorpay payment integration.',
    tech: ['Next.js', 'Supabase', 'Razorpay', 'TypeScript'],
    github: 'https://github.com/div-pandey/Apnaa-Khana',
    live: 'https://apnaa-khana-live.vercel.app/',
    preview: 'https://apnaa-khana-live.vercel.app/',
    year: '2025',
  },
  {
    num: '03',
    name: 'InkFlow',
    category: 'Full-Stack · Blogging Platform',
    desc: 'Premium, full-stack blogging platform featuring a custom editorial aesthetic, a rich WYSIWYG editor with live HTML validation, robust JWT authentication, and a Turso cloud-hosted database.',
    tech: ['Next.js', 'TypeScript', 'Turso', 'libSQL'],
    github: 'https://github.com/div-pandey/Ink-Flow',
    live: 'https://ink-flow-live.vercel.app/',
    preview: 'https://ink-flow-live.vercel.app/',
    year: '2026',
  },
  {
    num: '04',
    name: 'TaskFlow',
    category: 'Full-Stack · Task Management',
    desc: 'Ultra-premium, full-stack Next.js application that brings real-time collaboration and distraction-free design to your daily workflow. Features fluid Framer Motion animations, NextAuth security, and a Turso cloud-native database.',
    tech: ['Next.js', 'Prisma', 'Turso', 'NextAuth'],
    github: 'https://github.com/div-pandey/TaskFlow',
    live: 'https://taskflow-beta-live.vercel.app/',
    preview: 'https://taskflow-beta-live.vercel.app/',
    year: '2026',
  },
  {
    num: '05',
    name: 'Tic Tac Toe',
    category: 'Game AI · Frontend Engineering',
    desc: 'Interactive product-level game featuring an unbeatable Minimax AI algorithm with alpha-beta pruning, real-time strategic hints, persistent game state, sound engine, and a polished responsive UI.',
    tech: ['JavaScript', 'Minimax AI', 'HTML5', 'CSS3'],
    github: 'https://github.com/div-pandey/tic-tac-toe',
    live: 'https://tic-tac-toe-beta-live.vercel.app/',
    preview: 'https://tic-tac-toe-beta-live.vercel.app/',
    year: '2025',
  },
  {
    num: '06',
    name: 'AI Resume Analyzer',
    category: 'AI · Local-first',
    desc: 'Privacy-first LLM tool that parses and scores resumes locally using Ollama. Achieves 95%+ keyword extraction accuracy against ATS standards with zero cloud dependency.',
    tech: ['Python', 'Ollama', 'NLP', 'PDF Parsing'],
    github: 'https://github.com/div-pandey',
    live: 'https://div-ai-resume-analyzer.vercel.app/',
    preview: 'https://div-ai-resume-analyzer.vercel.app/',
    year: '2025',
  },
  {
    num: '07',
    name: 'This Portfolio',
    category: 'Creative Dev · CSS Engineering',
    desc: 'Hand-crafted developer portfolio with glassmorphic design, typewriter effects, CSS film grain, responsive layouts across all devices, and interactive micro-animations — zero templates used.',
    tech: ['React', 'TypeScript', 'Vite', 'GSAP'],
    github: 'https://github.com/div-pandey/Portfolio',
    live: 'https://div-portfolio-live.vercel.app/',
    preview: 'https://div-portfolio-live.vercel.app/',
    year: '2026',
  },
];
