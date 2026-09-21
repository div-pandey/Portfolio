// ============================================================
// OPEN SOURCE / NPM PACKAGES DATA
// ============================================================
// To add a new CLI or npm package in the future:
// 1. Simply add a new object to the NPM_PACKAGES array below.
// 2. All optional links (npmUrl, githubUrl, liveUrl, setupCmd, etc.)
//    are safely handled. If omitted, no error will occur.
// ============================================================

export interface PackageFeature {
  icon?: string;
  label: string;
  detail: string;
}

export interface TerminalLine {
  cmd: string;
  output?: string;
  comment?: string;
}

export interface NpmPackage {
  /** Package name on npm registry (e.g. '@kumar-div/lcr-cli') */
  name: string;
  /** Short acronym or branding name (e.g. 'LCR') */
  shortName: string;
  /** One-line punchy subtitle (e.g. 'Local Command Runner') */
  tagline: string;
  /** Concise description of what problem it solves */
  description: string;
  /** Primary install command (e.g. 'npm install -g @kumar-div/lcr-cli') */
  installCmd: string;
  /** Optional post-install setup command (e.g. 'lcr setup') */
  setupCmd?: string;
  /** Optional link to npm package page */
  npmUrl?: string;
  /** Optional link to GitHub repository */
  githubUrl?: string;
  /** Optional link to live demo or documentation site */
  liveUrl?: string;
  /** Current published version */
  version?: string;
  /** License type (e.g. 'MIT') */
  license?: string;
  /** Estimated or tracked downloads / stats */
  weeklyDownloads?: string;
  /** Accent color for this package (defaults to portfolio sage '#8fbc8b') */
  color?: string;
  /** Core features / capabilities */
  features?: PackageFeature[];
  /** Terminal demonstration lines showing CLI usage */
  terminalDemo?: {
    cwd?: string;
    lines: TerminalLine[];
  };
  /** Keywords or search tags */
  tags?: string[];
}

export const NPM_PACKAGES: NpmPackage[] = [
  {
    name: '@kumar-div/lcr-cli',
    shortName: 'LCR',
    tagline: 'Local Command Runner',
    description:
      'Zero-config project commands and Git shortcuts for your terminal. Run dev, build, test, and lint from anywhere — LCR inspects your project directory and resolves the right script automatically. Short, fast, zero runtime dependencies.',
    installCmd: 'npm install -g @kumar-div/lcr-cli',
    setupCmd: 'lcr setup',
    version: '1.0.4',
    license: 'MIT',
    weeklyDownloads: '25+',
    npmUrl: 'https://www.npmjs.com/package/@kumar-div/lcr-cli',
    githubUrl: 'https://github.com/kumar-div/local-command-runner',
    color: '#8fbc8b', // sage accent matching the portfolio theme
    features: [
      {
        icon: '⚡',
        label: 'Project Commands',
        detail:
          'Run dev, build, test, and lint anywhere. Auto-resolves package.json, Cargo.toml, or pyproject.toml.',
      },
      {
        icon: '🔀',
        label: 'Git Shortcuts',
        detail:
          'gs, ga, gc, gp, gpl, gb, gco with 100% argument forwarding and zero shell injection.',
      },
      {
        icon: '🚀',
        label: 'lcr git-setup',
        detail:
          'Guided 1-command flow: git init → README → first commit → branch rename → remote → push.',
      },
      {
        icon: '🛠️',
        label: 'Custom Workflows',
        detail:
          'Define multi-step pipelines like `lcr exec ci` (lint → test → build) stored in lcr.config.json.',
      },
      {
        icon: '🩺',
        label: 'lcr doctor',
        detail:
          'Environment diagnostic tool: checks Node, npm, Git versions, shim health, and resolves PowerShell conflicts.',
      },
    ],
    terminalDemo: {
      cwd: '~/my-app',
      lines: [
        { cmd: 'dev', comment: '→ npm run dev (or vite / next)' },
        { cmd: 'build', comment: '→ npm run build' },
        { cmd: 'test', comment: '→ npm test' },
        { cmd: 'gs', comment: '→ git status' },
        { cmd: 'ga .', comment: '→ git add .' },
        { cmd: 'gc -m "feat: ship cli"', comment: '→ git commit -m ...' },
        { cmd: 'gp', comment: '→ git push' },
      ],
    },
    tags: [
      'cli',
      'git-shortcuts',
      'developer-tools',
      'node',
      'zero-config',
      'productivity',
    ],
  },
  // ── FUTURE PACKAGES ──
  // Simply add your next package here as you publish! Example:
  /*
  {
    name: '@kumar-div/next-awesome-cli',
    shortName: 'NAC',
    tagline: 'Next Awesome CLI',
    description: 'Description of your next CLI tool...',
    installCmd: 'npm install -g @kumar-div/next-awesome-cli',
    npmUrl: 'https://www.npmjs.com/package/@kumar-div/next-awesome-cli',
    githubUrl: 'https://github.com/kumar-div/...',
    version: '1.0.0',
    license: 'MIT',
    color: '#8fbc8b',
    features: [...],
    tags: ['cli', 'typescript'],
  },
  */
];
