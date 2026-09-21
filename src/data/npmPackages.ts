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

export interface TerminalCommandItem {
  cmd: string;
  target: string;
  copyValue?: string;
}

export interface TerminalGroup {
  category: string;
  items: TerminalCommandItem[];
}

export interface PackageTerminal {
  promptCmd?: string;
  bannerTitle?: string;
  groups?: TerminalGroup[];
  rawOutput?: string;
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
  /** Terminal output / commands preview (e.g. lcr list dashboard) */
  terminal?: PackageTerminal;
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
    terminal: {
      promptCmd: 'lcr list',
      bannerTitle: 'LOCAL COMMAND RUNNER',
      groups: [
        {
          category: 'Project',
          items: [
            { cmd: 'dev', target: 'npm run dev' },
            { cmd: 'build', target: 'npm run build' },
            { cmd: 'test', target: 'npm test' },
            { cmd: 'lint', target: 'npm run lint' },
          ],
        },
        {
          category: 'Git shortcuts',
          items: [
            { cmd: 'gs', target: 'git status' },
            { cmd: 'ga', target: 'git add .' },
            { cmd: 'gc', target: 'git commit' },
            { cmd: 'gp', target: 'git push' },
            { cmd: 'gpl', target: 'git pull' },
            { cmd: 'gb', target: 'git branch' },
            { cmd: 'gco', target: 'git checkout' },
            { cmd: 'gm', target: 'git merge' },
            { cmd: 'gl', target: 'git log --oneline' },
            { cmd: 'gd', target: 'git diff' },
            { cmd: 'gst', target: 'git stash' },
          ],
        },
        {
          category: 'Git workflows',
          items: [
            {
              cmd: 'git-setup',
              target: 'Initialize Git, commit, connect to GitHub, and push',
              copyValue: 'lcr git-setup',
            },
          ],
        },
        {
          category: 'Workflows',
          items: [
            {
              cmd: 'ci',
              target: 'lint → test → build',
              copyValue: 'lcr exec ci',
            },
          ],
        },
        {
          category: 'Tools',
          items: [
            { cmd: 'node', target: 'v24.x.x', copyValue: 'node -v' },
            { cmd: 'npm', target: 'v11.x.x', copyValue: 'npm -v' },
            { cmd: 'git', target: 'v2.x.x', copyValue: 'git --version' },
          ],
        },
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
    terminal: { ... },
    features: [...],
    tags: ['cli', 'typescript'],
  },
  */
];
