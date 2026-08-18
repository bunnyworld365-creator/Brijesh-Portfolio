import React, { useState } from 'react';
import { 
  Calculator, Bot, CheckCircle2, DollarSign, Clock, 
  ArrowRight, Sparkles, AlertCircle, Loader2, TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuditResult {
  bottleneckSummary: string;
  recommendedSolution: string;
  estimatedHoursSavedPerWeek: string;
  annualCostSavingsUSD: string;
  roiPaybackPeriod: string;
  recommendedTools: string[];
  implementationSteps: string[];
}

export const WorkflowAuditTool: React.FC = () => {
  const [manualWorkflow, setManualWorkflow] = useState('');
  const [teamSize, setTeamSize] = useState('2');
  const [hoursSpentPerWeek, setHoursSpentPerWeek] = useState('15');
  const [softwareStack, setSoftwareStack] = useState('Google Sheets, Email, HubSpot');

  const [loading, setLoading] = useState(false);
  const [audit, setAudit] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sampleWorkflows = [
    'We manually download customer PDFs from Gmail, re-type data into Excel, and email invoices to clients',
    'Our sales team manually copies Facebook/TikTok ad leads to Google Sheets and calls them 24 hours later',
    'Maintenance engineers manually write daily equipment logs on clipboards and type them into our maintenance database',
  ];

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualWorkflow.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/audit-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          manualWorkflow,
          teamSize,
          hoursSpentPerWeek,
          softwareStack,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to run audit');
      }

      const data = await res.json();
      if (data.audit) {
        setAudit(data.audit);
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 },
        });
      }
    } catch (err: any) {
      console.error(err);
      setError('Audit service temporary fallback triggered.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="audit" className="py-20 md:py-28 bg-slate-950/70 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            ROI &amp; Automation Diagnostics
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Workflow ROI Calculator &amp; Audit
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Quantify the exact dollar and time cost of your team's manual data entry or repetitive operations, and see how much an automated pipeline saves you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-7 shadow-xl backdrop-blur-xl space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-cyan-400" />
              Manual Process Inputs
            </h3>

            <form onSubmit={handleAudit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Describe Your Current Manual Bottleneck *
                </label>
                <textarea
                  id="audit-workflow-input"
                  value={manualWorkflow}
                  onChange={(e) => setManualWorkflow(e.target.value)}
                  placeholder="e.g. We copy incoming customer leads from email to spreadsheet, type invoices manually, and send WhatsApp messages by hand..."
                  rows={3}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition-colors custom-scrollbar"
                />
              </div>

              <div>
                <div className="text-[11px] text-slate-400 mb-1 font-medium">Quick examples:</div>
                <div className="space-y-1">
                  {sampleWorkflows.map((sample, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setManualWorkflow(sample)}
                      className="w-full text-left text-[11px] text-slate-300 bg-slate-950/60 hover:bg-slate-800 p-2 rounded-lg border border-slate-800/80 transition-colors line-clamp-1"
                    >
                      👉 {sample}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Team Members Involved
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Hours Spent/Week per Person
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={hoursSpentPerWeek}
                    onChange={(e) => setHoursSpentPerWeek(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Current Software Tools Used
                </label>
                <input
                  type="text"
                  value={softwareStack}
                  onChange={(e) => setSoftwareStack(e.target.value)}
                  placeholder="e.g. Gmail, Excel, HubSpot, WhatsApp"
                  className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                id="run-audit-btn"
                type="submit"
                disabled={loading || !manualWorkflow.trim()}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Calculating Automation ROI...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4" />
                    Calculate Savings &amp; Automation Roadmap
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Audit Results Output */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-7 shadow-xl backdrop-blur-xl min-h-[420px] flex flex-col justify-between">
            {audit ? (
              <div className="space-y-5 text-left">
                
                {/* Header Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-center">
                    <div className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                      Est. Annual Savings
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-1">
                      {audit.annualCostSavingsUSD}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-center">
                    <div className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider">
                      Hours Saved / Wk
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-1">
                      {audit.estimatedHoursSavedPerWeek}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 text-center">
                    <div className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                      Payback Period
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-1">
                      {audit.roiPaybackPeriod}
                    </div>
                  </div>
                </div>

                {/* Bottleneck & Solution */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
                    <strong className="text-amber-400 font-semibold">Bottleneck Identified:</strong> {audit.bottleneckSummary}
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
                    <strong className="text-cyan-400 font-semibold">Recommended AI Architecture:</strong> {audit.recommendedSolution}
                  </div>
                </div>

                {/* Implementation Steps */}
                <div>
                  <div className="text-xs font-bold text-slate-200 mb-2 font-mono uppercase tracking-wider">
                    // Step-by-Step Implementation Blueprint
                  </div>
                  <div className="space-y-2">
                    {audit.implementationSteps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 p-2 rounded-lg bg-slate-950/40 border border-slate-800/80">
                        <span className="font-mono text-cyan-400 font-bold">0{i + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Tech Stack Chips */}
                <div>
                  <div className="text-[11px] font-mono text-slate-400 mb-1.5">Recommended Pipeline Tools:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {audit.recommendedTools.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md text-center"
                >
                  Hire Brijesh to Implement This Savings Blueprint
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 shadow-inner">
                  <Calculator className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">
                    Simulate Your Team's Automation ROI
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm">
                    Enter your weekly manual hours on the left to see your estimated financial return and custom deployment steps.
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
