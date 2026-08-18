import React, { useState } from 'react';
import { 
  Cpu, Bot, Anchor, CheckCircle2, Shield, 
  ArrowRight, Workflow, Layers, Terminal, Sparkles, AlertTriangle
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const DualExpertise: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'industrial' | 'marine'>('all');

  return (
    <section id="expertise" className="py-20 md:py-28 bg-slate-950/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            The Unfair Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Industrial Engineers Build{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">
              Superior AI Workflows
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            In oil refineries and European shipyards, an unhandled exception causes plant shutdowns or safety hazards. I apply the same fail-safe rigor, loop calibration, and edge-case prevention to your digital AI pipelines.
          </p>
        </div>

        {/* Comparison Callout: Standard Freelancer vs Brijesh's Industrial AI Standard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Fragile Standard Freelancer */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-red-950/50 hover:border-red-900/60 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-red-950/40 text-red-400 border border-red-800/30">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-200">The Generic Freelancer Pattern</h3>
                <p className="text-xs text-slate-400">Fragile &amp; untested digital automations</p>
              </div>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>Workflows crash silently when API payloads change or rate limits hit.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>No fallback routing; leads or customer calls get lost in cyberspace.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>Poor technical documentation, leaving your team unable to maintain the system.</span>
              </li>
            </ul>
          </div>

          {/* Brijesh's Industrial AI Standard */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/20 via-slate-900/80 to-cyan-950/20 border border-amber-500/30 shadow-lg shadow-amber-500/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Brijesh's Industrial-Grade Standard</h3>
                <p className="text-xs text-amber-300/80">Refinery-tested engineering discipline</p>
              </div>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Fail-Safe Architecture:</strong> Automatic retry queues, error dead-letter alerts, and zero lost data.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Strict Schema Validation:</strong> JSON verification to eliminate LLM hallucinations on critical fields.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Turnkey Handover:</strong> Clear video walkthroughs, modular sub-workflows, and standard SOP documentation.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Detailed Domain Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => {
            return (
              <div 
                key={category.id}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 shadow-xl"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-slate-950 font-bold shadow-md`}>
                      {category.id === 'ai-automation' && <Bot className="w-6 h-6 text-white" />}
                      {category.id === 'industrial-automation' && <Cpu className="w-6 h-6 text-white" />}
                      {category.id === 'marine-electrical' && <Anchor className="w-6 h-6 text-white" />}
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                      {category.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {category.title}
                  </h3>

                  {/* Skills List */}
                  <div className="space-y-3.5 mt-5">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-200">{skill.name}</span>
                          <span className="text-[10px] font-mono text-amber-400">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-cyan-400"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight pt-0.5">
                          {skill.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Ready for Deployments</span>
                  <a 
                    href="#contact" 
                    className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1 group"
                  >
                    Consult on this
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
