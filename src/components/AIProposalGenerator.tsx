import React, { useState } from 'react';
import { 
  Sparkles, Bot, Send, Copy, Check, Clock, 
  DollarSign, CheckCircle2, ArrowRight, Layers, FileText, Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProposalData {
  title: string;
  executiveSummary: string;
  recommendedTechStack: string[];
  phases: { name: string; duration: string; deliverables: string }[];
  estimatedTurnaround: string;
  estimatedBudget: string;
  clientWinningPitch: string;
  keyRisksMitigated?: string[];
}

export const AIProposalGenerator: React.FC = () => {
  const [projectDescription, setProjectDescription] = useState('');
  const [industry, setIndustry] = useState('E-commerce & Lead Generation');
  const [budget, setBudget] = useState('$500 - $1,500');
  const [targetPlatform, setTargetPlatform] = useState('Upwork');
  const [selectedTools, setSelectedTools] = useState<string[]>(['n8n', 'Make.com', 'Vapi Voice AI']);

  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState<ProposalData | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const samplePrompts = [
    'Build an automated inbound customer support & call scheduling phone bot with Vapi, Make, and Google Calendar',
    'Automate receipt & invoice PDF data extraction in n8n with Gemini AI into QuickBooks and send Telegram alerts',
    'Deploy an autonomous Hermes Agent with n8n to monitor IoT sensor telemetry and trigger automated work orders',
  ];

  const toggleTool = (tool: string) => {
    setSelectedTools(prev => 
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    );
  };

  const handleGenerateProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectDescription.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectDescription,
          industry,
          budget,
          targetPlatform,
          toolsRequired: selectedTools,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate proposal');
      }

      const data = await res.json();
      if (data.proposal) {
        setProposal(data.proposal);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } else {
        throw new Error('Invalid proposal format');
      }
    } catch (err: any) {
      console.error(err);
      setError('Could not connect to AI engine. Showing standard proposal template.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!proposal) return;
    const textToCopy = `PROJECT SCOPE & PROPOSAL: ${proposal.title}
--------------------------------------------------
EXECUTIVE SUMMARY:
${proposal.executiveSummary}

RECOMMENDED TECH STACK:
${proposal.recommendedTechStack.join(', ')}

ESTIMATED TIMELINE: ${proposal.estimatedTurnaround}
ESTIMATED BUDGET: ${proposal.estimatedBudget}

PHASED ROADMAP:
${proposal.phases.map((p, i) => `${i + 1}. ${p.name} (${p.duration}): ${p.deliverables}`).join('\n')}

FREELANCE PITCH & PROPOSAL MESSAGE:
${proposal.clientWinningPitch}
`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="proposal-generator" className="py-20 md:py-28 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Instant AI Scope Architect
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Generate an Instant Statement of Work &amp; Proposal
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Describe what you need built. My Gemini-powered AI engine will generate a customized technical roadmap, milestone breakdown, and proposal ready for Upwork or direct engagement.
          </p>
        </div>

        {/* Generator Main Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input Form */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-7 shadow-xl backdrop-blur-xl space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              Project Parameters
            </h3>

            <form onSubmit={handleGenerateProposal} className="space-y-4">
              
              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Project Goal / Workflow Requirements *
                </label>
                <textarea
                  id="proposal-description-input"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="e.g., We need an n8n pipeline that connects our Webflow form to Airtable, sends SMS via Twilio, and creates a deal in HubSpot..."
                  rows={4}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-amber-500 transition-colors custom-scrollbar"
                />
              </div>

              {/* Sample Prompts */}
              <div>
                <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Or try an instant prompt:</div>
                <div className="space-y-1.5">
                  {samplePrompts.map((prompt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setProjectDescription(prompt)}
                      className="w-full text-left text-[11px] text-slate-300 bg-slate-950/60 hover:bg-slate-800 p-2 rounded-lg border border-slate-800/80 transition-colors line-clamp-1"
                    >
                      💡 {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Industry & Platform Selection */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Industry Domain
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option>E-commerce &amp; Retail</option>
                    <option>Healthcare &amp; Clinics</option>
                    <option>Real Estate &amp; Trades</option>
                    <option>Industrial &amp; Refineries</option>
                    <option>Logistics &amp; Wholesale</option>
                    <option>SaaS &amp; Tech Startups</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Target Platform
                  </label>
                  <select
                    value={targetPlatform}
                    onChange={(e) => setTargetPlatform(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option>Upwork Contract</option>
                    <option>Fiverr Pro Gig</option>
                    <option>Direct Consulting</option>
                  </select>
                </div>
              </div>

              {/* Tools Chips */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
                  Preferred Technologies
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {['n8n', 'Make.com', 'Vapi Voice AI', 'Zapier', 'Hermes Agent', 'Gemini AI', 'PLC / E&I'].map((tool) => {
                    const isSelected = selectedTools.includes(tool);
                    return (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => toggleTool(tool)}
                        className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{tool}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="generate-proposal-submit-btn"
                type="submit"
                disabled={loading || !projectDescription.trim()}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    Architecting Custom Proposal...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    Generate Technical SOW &amp; Bid
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right: Proposal Preview Output */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-7 shadow-xl backdrop-blur-xl min-h-[460px] flex flex-col justify-between">
            
            {proposal ? (
              <div className="space-y-5 text-left">
                
                {/* Header & Copy Button */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                      GEMINI-3.7-FLASH ARCHITECTED
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white mt-1.5">
                      {proposal.title}
                    </h3>
                  </div>

                  <button
                    id="copy-proposal-btn"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold shrink-0 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Scope</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Executive Summary */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-amber-400 font-semibold">Executive Strategy:</strong> {proposal.executiveSummary}
                </div>

                {/* Phased Roadmap */}
                <div>
                  <div className="text-xs font-bold text-slate-200 mb-2 font-mono uppercase tracking-wider">
                    // Implementation Phases &amp; Deliverables
                  </div>
                  <div className="space-y-2">
                    {proposal.phases.map((phase, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                        <div>
                          <span className="font-bold text-white">{phase.name}</span>
                          <p className="text-[11px] text-slate-400">{phase.deliverables}</p>
                        </div>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800 shrink-0 self-start sm:self-auto">
                          {phase.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Budget & Timeline Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400">Estimated Turnaround</div>
                    <div className="text-sm font-bold text-amber-400 font-mono mt-0.5">{proposal.estimatedTurnaround}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400">Estimated Budget Range</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">{proposal.estimatedBudget}</div>
                  </div>
                </div>

                {/* Freelance Bid Pitch */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/30 to-slate-950 border border-amber-500/30">
                  <div className="text-[11px] font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" />
                    Upwork / Fiverr Client Pitch Ready:
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{proposal.clientWinningPitch}"
                  </p>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <a
                    href="#contact"
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md text-center"
                  >
                    Book Brijesh to Build This Project
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 shadow-inner">
                  <Bot className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">
                    Ready to Architect Your Next Automation
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm">
                    Enter your requirements on the left to instantly generate a tailored statement of work, milestone schedule, and Upwork/Fiverr bid message.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
