'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Code,
  Cpu,
  ExternalLink,
  Github,
  Layers,
  ShieldCheck,
  Terminal,
  Wallet,
  Star,
  Copy,
  Layers3,
  Flame,
  CheckCircle,
  Network,
} from 'lucide-react';
import { cn } from '@stellar-starter-kit/ui';

// Interactive code samples
const CODE_SAMPLES = {
  setup: {
    label: 'Quick Start',
    language: 'bash',
    filename: 'terminal',
    code: `# Clone and spin up Stellar node in 3 steps
git clone https://github.com/techAlhaji/stellar-starter-kit.git
cd stellar-starter-kit
pnpm install

# Start local Stellar node & dashboard dev environment
./scripts/setup-local-node.sh
pnpm run dev`,
  },
  wallet: {
    label: 'useWallet()',
    language: 'typescript',
    filename: 'WalletProvider.tsx',
    code: `import { useWallet } from '@stellar-starter-kit/wallets';

export function WalletConnector() {
  const { address, connected, connect, disconnect } = useWallet();

  return (
    <button onClick={connected ? disconnect : () => connect('freighter')}>
      {connected ? \`Connected: \${address.slice(0, 4)}...\` : 'Connect Freighter'}
    </button>
  );
}`,
  },
  sdk: {
    label: 'StellarClient',
    language: 'typescript',
    filename: 'StellarApi.ts',
    code: `import { StellarClient } from '@stellar-starter-kit/sdk';
import { formatStroopsToXlm } from '@stellar-starter-kit/utils';

// Read Horizon balance and parse units
const client = new StellarClient('https://horizon-testnet.stellar.org');
const account = await client.getServer().loadAccount(publicKey);
const stroopsBalance = account.balances[0].balance;
console.log('Balance in XLM:', formatStroopsToXlm(stroopsBalance));`,
  },
  ui: {
    label: 'Custom UI',
    language: 'typescript',
    filename: 'CosmicCard.tsx',
    code: `import { cn } from '@stellar-starter-kit/ui';

export function Card({ className, title, description }) {
  return (
    <div className={cn("glass glass-hover rounded-2xl p-6 transition-all", className)}>
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}`,
  },
};

const FEATURES = [
  {
    icon: <Terminal className="h-6 w-6 text-purple-400" />,
    title: 'Monorepo Setup',
    description:
      'Powered by Turborepo and pnpm workspaces. Zero-overhead dependency links, build caching, and isolated code scopes.',
  },
  {
    icon: <Wallet className="h-6 w-6 text-cyan-400" />,
    title: 'Multi-Wallet Context',
    description:
      'Pre-configured support for Freighter, Albedo, Rabe, and Hana wallets. Connect, sign, and send transactions in a single unified hook.',
  },
  {
    icon: <Cpu className="h-6 w-6 text-pink-400" />,
    title: 'Soroban Bindings Sync',
    description:
      'Compile smart contracts and synchronize client-side TypeScript bindings instantly. Safe contract interface interaction.',
  },
  {
    icon: <Layers className="h-6 w-6 text-emerald-400" />,
    title: 'Next.js 15 App Router',
    description:
      'Built on React 19 and Next.js 15. Server action handlers, streaming layouts, and optimal initial bundle sizes.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-blue-400" />,
    title: 'Full CI/CD Pipelines',
    description:
      'Conventional Commits validation via Husky, ESLint checks, automated release pull requests, and package deployment using Changesets.',
  },
  {
    icon: <Layers3 className="h-6 w-6 text-amber-400" />,
    title: 'Custom UI Theme System',
    description:
      'Fully responsive glassmorphism utility classes, custom cosmic variable colors, dark-mode styling, and micro-animations.',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'Stellar Starter Kit cut our onboarding time to under 10 minutes. The pre-configured Freighter context is a lifesaver.',
    author: 'Alex Rivers',
    role: 'Lead Engineer, Galactic Swap',
    placeholder: true,
  },
  {
    quote:
      'The TypeScript client-to-contract generation pipelines are extremely clean. This monorepo is ready for any scale.',
    author: 'Sophia Chen',
    role: 'Smart Contract Architect, Nebula Labs',
    placeholder: true,
  },
  {
    quote:
      'Conventional commit validation, changesets release automation, and docker settings. It feels like an enterprise codebase out-of-the-box.',
    author: 'Marcus Vance',
    role: 'DevOps Lead, Stellar Bridge',
    placeholder: true,
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<keyof typeof CODE_SAMPLES>('setup');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SAMPLES[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07070e] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200">
      {/* BACKGROUND DECORATIONS */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="animate-pulse-slow absolute left-[-10%] top-[-10%] h-[60%] w-[60%] rounded-full bg-purple-900/10 blur-[150px]"></div>
        <div
          className="animate-pulse-slow absolute bottom-[-10%] right-[-10%] h-[60%] w-[60%] rounded-full bg-cyan-900/10 blur-[150px]"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* HEADER NAV */}
      <header className="sticky top-0 z-50 border-b border-slate-900/80 bg-[#07070e]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 text-lg font-black text-white">
              S
            </div>
            <span className="font-extrabold tracking-wider text-white">stellar-starter-kit</span>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
            <a href="#features" className="transition-colors hover:text-white">
              Features
            </a>
            <a href="#architecture" className="transition-colors hover:text-white">
              Architecture
            </a>
            <a href="#code" className="transition-colors hover:text-white">
              Developer API
            </a>
            <a href="#examples" className="transition-colors hover:text-white">
              Examples
            </a>
            <a
              href="file:///home/gamp/stellar-starter-kit/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-white"
            >
              Docs <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/techAlhaji/stellar-starter-kit"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/50 text-slate-300 transition-colors hover:bg-slate-900 hover:text-white"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#code"
              className="hidden h-9 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 px-4 text-xs font-semibold text-white shadow-md shadow-purple-500/10 transition-all duration-300 hover:brightness-110 sm:inline-flex"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 overflow-hidden pb-24 pt-20 md:pb-36 md:pt-32">
        <div className="mx-auto max-w-5xl px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-300 shadow-inner"
          >
            <Flame className="h-3.5 w-3.5 animate-pulse text-purple-400" />
            Now Live: Next.js 15 & Soroban Smart Contracts
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-5xl font-black leading-none tracking-tight text-transparent md:text-8xl"
          >
            Deploy Stellar Apps <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              in Seconds.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mb-12 max-w-3xl text-lg font-light leading-relaxed text-slate-400 md:text-xl"
          >
            An enterprise-ready, open-source monorepo boilerplate to develop, test, and deploy smart
            contract applications on the Stellar network. Supercharged with pnpm workspaces,
            Turborepo, and a beautiful cosmic design system.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#code"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-8 font-semibold text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-cyan-500/20 hover:brightness-110 sm:w-auto"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/techAlhaji/stellar-starter-kit"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/40 px-8 font-semibold text-slate-300 transition-all hover:bg-slate-900/50 hover:text-white sm:w-auto"
            >
              <Github className="h-5 w-5" /> View Github
            </a>
          </motion.div>
        </div>
      </section>

      {/* INTERACTIVE CODE PLAYGROUND */}
      <section
        id="code"
        className="relative z-10 border-y border-slate-900/50 bg-slate-950/20 py-16"
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Instant Developer Integration
            </h2>
            <p className="mt-2 text-slate-400">
              See how easy it is to setup, handle wallet connectors, and invoke Horizon nodes.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Sidebar Tabs */}
            <div className="flex gap-2 overflow-x-auto p-1 lg:col-span-4 lg:flex-col">
              {(Object.keys(CODE_SAMPLES) as Array<keyof typeof CODE_SAMPLES>).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={cn(
                    'flex w-full flex-shrink-0 items-center justify-start gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-all duration-200',
                    activeTab === key
                      ? 'border-purple-500/40 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 text-white shadow-md'
                      : 'border-transparent bg-transparent text-slate-400 hover:bg-slate-900/30 hover:text-slate-200',
                  )}
                >
                  <Code
                    className={cn(
                      'h-4 w-4',
                      activeTab === key ? 'text-purple-400' : 'text-slate-500',
                    )}
                  />
                  {CODE_SAMPLES[key].label}
                </button>
              ))}
            </div>

            {/* Code Window */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0c0c16] shadow-2xl lg:col-span-8">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-slate-900 bg-[#08080f] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80"></span>
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80"></span>
                  <span className="h-3 w-3 rounded-full bg-green-500/80"></span>
                  <span className="ml-2 font-mono text-xs text-slate-500">
                    {CODE_SAMPLES[activeTab].filename}
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-200"
                >
                  {copied ? (
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* Code Content */}
              <div className="overflow-x-auto p-6 font-mono text-sm leading-relaxed text-slate-300">
                <pre>
                  <code>{CODE_SAMPLES[activeTab].code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section id="features" className="relative z-10 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
              Everything You Need.
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Avoid configuring build steps, transpilation configs, or custom wallet libraries from
              scratch. We did the heavy lifting for you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feat, index) => (
              <div
                key={index}
                className="glass glass-hover flex flex-col justify-between rounded-2xl border border-slate-900/60 p-6 transition-all duration-300"
              >
                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-800 bg-slate-900">
                    {feat.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">{feat.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE OVERVIEW */}
      <section
        id="architecture"
        className="relative z-10 border-t border-slate-900/50 bg-[#08080f]/50 py-24"
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
              Clean Package Separation
            </h2>
            <p className="mt-4 text-slate-400">
              Strict modular architectures prevent circular compilation dependencies and make code
              sharing painless.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/40 p-8 shadow-2xl">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-cyan-500/5"></div>

            <div className="relative z-10 grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div>
                <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                  <Network className="h-5 w-5 text-purple-400" /> Monorepo Layout
                </h4>
                <p className="mb-6 text-sm leading-relaxed text-slate-400">
                  Unlike traditional setups where scripts are inside the frontend web directory,
                  `stellar-starter-kit` segregates logic:
                </p>
                <ul className="space-y-3.5 text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 text-cyan-400" />
                    <span>
                      <strong>apps/web</strong>: Interactive Next.js 15 UI and views.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 text-cyan-400" />
                    <span>
                      <strong>packages/wallets</strong>: Wallet connection hooks and contexts.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 text-cyan-400" />
                    <span>
                      <strong>packages/contracts</strong>: Type-safe bindings to Soroban smart
                      contracts.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 text-cyan-400" />
                    <span>
                      <strong>packages/sdk</strong>: Clean clients to coordinate api server
                      requests.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Graphical Structure */}
              <div className="rounded-2xl border border-slate-800 bg-[#0c0c16]/80 p-6 font-mono text-xs leading-relaxed text-slate-300 shadow-inner">
                <div className="text-slate-500"># Monorepo Structure</div>
                <div className="mt-2 text-white">stellar-starter-kit/</div>
                <div className="mt-1 border-l border-slate-800 pl-4">
                  <div>├── apps/</div>
                  <div className="pl-4 text-purple-300">
                    └── web/ <span className="text-slate-500"># Next.js UI</span>
                  </div>
                  <div>├── packages/</div>
                  <div className="pl-4 text-cyan-300">
                    <div>
                      ├── wallets/ <span className="text-slate-500"># Freighter support</span>
                    </div>
                    <div>
                      ├── contracts/ <span className="text-slate-500"># Bindings</span>
                    </div>
                    <div>
                      ├── sdk/ <span className="text-slate-500"># Client helpers</span>
                    </div>
                    <div>
                      └── ui/ <span className="text-slate-500"># Tailwind system</span>
                    </div>
                  </div>
                  <div>└── examples/</div>
                  <div className="pl-4 text-pink-300">
                    └── basic-payment/ <span className="text-slate-500"># Demo XLM Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WALLETS & ECOSYSTEM */}
      <section id="examples" className="relative z-10 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
              Stellar Ecosystem Integrations
            </h2>
            <p className="mt-4 text-slate-400">
              Complete, native compatibility with standard Stellar wallets and RPC interfaces.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {['Freighter', 'Albedo', 'Rabe', 'Hana'].map((wallet, index) => (
              <div
                key={index}
                className="glass flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-900/60 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 text-sm font-bold text-white">
                  {wallet[0]}
                </div>
                <span className="text-sm font-semibold text-white">{wallet} Wallet</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION (MOCK PLACES) */}
      <section className="relative z-10 border-t border-slate-900/50 bg-slate-950/20 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-400">
              Mock Feedback
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
              What Builders Say
            </h2>
            <p className="mt-2 text-slate-400">
              Placeholder feedback representing simulated community responses.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t, index) => (
              <div
                key={index}
                className="glass flex flex-col justify-between rounded-2xl border border-slate-900/60 p-6"
              >
                <p className="text-sm italic leading-relaxed text-slate-300">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 border-t border-slate-900 pt-4">
                  <div className="text-sm font-semibold text-white">{t.author}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-900 bg-[#04040a] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Branding */}
            <div className="md:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 text-sm font-black text-white">
                  S
                </div>
                <span className="font-extrabold tracking-wider text-white">
                  stellar-starter-kit
                </span>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-slate-400">
                The fastest open-source template to deploy modern, type-safe Stellar/Soroban dApps.
                Developed for high-performance builds.
              </p>
            </div>

            {/* Links 1 */}
            <div>
              <h5 className="mb-4 text-sm font-bold text-white">Resources</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a
                    href="https://stellar.org"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    Stellar Foundation
                  </a>
                </li>
                <li>
                  <a
                    href="https://soroban.stellar.org"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    Soroban Docs
                  </a>
                </li>
                <li>
                  <a
                    href="https://nextjs.org"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    Next.js Framework
                  </a>
                </li>
              </ul>
            </div>

            {/* Links 2 */}
            <div>
              <h5 className="mb-4 text-sm font-bold text-white">Developers</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a
                    href="https://github.com/techAlhaji/stellar-starter-kit"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a
                    href="file:///home/gamp/stellar-starter-kit/CONTRIBUTING.md"
                    className="transition-colors hover:text-white"
                  >
                    Contributing Guide
                  </a>
                </li>
                <li>
                  <a
                    href="file:///home/gamp/stellar-starter-kit/ARCHITECTURE.md"
                    className="transition-colors hover:text-white"
                  >
                    Architecture Map
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-900 pt-8 text-xs text-slate-500 md:flex-row">
            <div>
              &copy; {new Date().getFullYear()} Stellar Starter Kit. Open Source under the MIT
              License.
            </div>
            <div className="flex items-center gap-2">
              <span>Built by techAlhaji and the community</span>
              <Star className="h-3 w-3 fill-yellow-500/20 text-yellow-500/80" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
