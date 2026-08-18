import React from 'react';
import { 
  Sparkles, ArrowRight, ShieldCheck, CheckCircle2, 
  Bot, Cpu, Anchor, Flame, ExternalLink, Zap, Terminal, Download, FileText
} from 'lucide-react';
import { PERSONAL_INFO, CORE_METRICS } from '../data/portfolioData';

interface HeroProps {
  onOpenProposalModal: () => void;
  onOpenAudit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenProposalModal, onOpenAudit }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-950">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-amber-500/10 via-cyan-500/10 to-blue-600/10 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 blur-[100px] pointer-events-none -z-10" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-medium backdrop-blur-md shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for Freelance on <strong className="text-white">Upwork</strong> & <strong className="text-white">Fiverr</strong></span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>B-VCA & IPAF Certified (Europe)</span>
          </div>
        </div>

        {/* Main Grid: Headline & Interactive Visual Terminal Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div>
              <div className="inline-block text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase mb-2">
                // Dual-Discipline Systems Specialist
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-extrabold text-white tracking-tight leading-[1.15]">
                Industrial Electrical Engineer meets{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
                  Next-Gen AI Workflow
                </span>{' '}
                Automation
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              I am <strong className="text-white font-semibold">{PERSONAL_INFO.name}</strong>, an Electrical Foreman and Automation Specialist with <span className="text-amber-300 font-medium">7+ years of international project leadership</span> across European shipyards (Rotterdam, Antwerp) and major refineries (IOCL Gujarat). I build rock-solid industrial electrical systems and deploy automated AI workflows with <strong className="text-cyan-300 font-semibold">n8n, Make, Vapi Voice AI, and Hermes Agent</strong>.
            </p>

            {/* Core Tech Stack Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { name: 'n8n Workflows', color: 'border-cyan-500/30 text-cyan-300 bg-cyan-950/30' },
                { name: 'Vapi Voice AI', color: 'border-blue-500/30 text-blue-300 bg-blue-950/30' },
                { name: 'Hermes Agent', color: 'border-emerald-500/30 text-emerald-300 bg-emerald-950/30' },
                { name: 'Make & Zapier', color: 'border-purple-500/30 text-purple-300 bg-purple-950/30' },
                { name: 'E&I Installations', color: 'border-amber-500/30 text-amber-300 bg-amber-950/30' },
                { name: 'IOCL DEF Automation', color: 'border-orange-500/30 text-orange-300 bg-orange-950/30' },
                { name: 'Marine Shipyards (Rotterdam)', color: 'border-teal-500/30 text-teal-300 bg-teal-950/30' },
              ].map((pill) => (
                <span 
                  key={pill.name}
                  className={`text-xs px-2.5 py-1 rounded-md border font-medium ${pill.color}`}
                >
                  {pill.name}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                id="hero-hire-cta"
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                Hire on Upwork / Fiverr
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                id="hero-ai-proposal-cta"
                onClick={onOpenProposalModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/40 text-sm font-semibold shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                Generate Instant Proposal
              </button>

              <button
                id="hero-ai-audit-cta"
                onClick={onOpenAudit}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-950/70 text-cyan-300 border border-cyan-500/30 text-sm font-medium transition-colors"
              >
                <Bot className="w-4 h-4 text-cyan-400" />
                Free Workflow ROI Audit
              </button>
            </div>

            {/* Contact Quick Info */}
            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono pt-1">
              <span>Direct: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-200 underline hover:text-amber-400">{PERSONAL_INFO.email}</a></span>
              <span>•</span>
              <span>Fast Turnaround (24h Response)</span>
            </div>
          </div>

          {/* Right Column: Interactive Live System Status Terminal */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-2xl shadow-black/80 backdrop-blur-xl">
              
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2">brijesh-automation-hub.sh</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  SYSTEM ONLINE
                </span>
              </div>

              {/* Terminal Body with Live Engineering Logs */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 text-slate-300 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-amber-400">
                    <span>⚡ INDUSTRIAL CREDENTIALS</span>
                    <span className="text-slate-500">7+ YRS EXP</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    &gt; IOCL Gujarat: DEF Plant Batching &amp; E&amp;I (240+ Loops Tested)<br />
                    &gt; Rotterdam &amp; Antwerp Docks: 690V Main Marine Switchboards<br />
                    &gt; Safety: B-VCA Certified (SSVV) | IPAF Powered Access License
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/80 border border-cyan-900/40 text-slate-300 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-cyan-400">
                    <span>🤖 AI WORKFLOW AUTOMATION</span>
                    <span className="text-slate-500">PRO LEVEL</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    &gt; n8n / Make: Multi-branch enterprise routing &amp; webhooks<br />
                    &gt; Vapi Voice AI: Real-time inbound call dispatch (550ms latency)<br />
                    &gt; Hermes Agent: Autonomous tool calling &amp; multi-agent reasoning chains
                  </p>
                </div>

                {/* Freelance Availability Card */}
                <div className="p-3 rounded-lg bg-gradient-to-r from-amber-950/30 to-slate-950 border border-amber-500/20 text-slate-300 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Freelance Contract Ready
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Upwork Top-Rated Standards • Fast delivery
                    </div>
                  </div>
                  <a
                    href="#contact"
                    className="px-2.5 py-1 text-[11px] font-semibold rounded bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors"
                  >
                    Connect
                  </a>
                </div>
              </div>

              {/* Subtle background glow */}
              <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Metrics Grid Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-slate-800/80">
          {CORE_METRICS.map((metric, i) => (
            <div 
              key={metric.label}
              className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:border-slate-700 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200">
                {metric.value}
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-1">
                {metric.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {metric.subtitle}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
