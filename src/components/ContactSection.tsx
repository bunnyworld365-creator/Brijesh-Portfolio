import React, { useState } from 'react';
import { 
  Mail, Send, CheckCircle2, MessageSquare, 
  ExternalLink, Download, Phone, Globe, ShieldCheck, 
  Sparkles, FileText, Copy, Check, Calendar, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  initialService?: string;
  onOpenProposalModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService, onOpenProposalModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: initialService || 'AI Workflow Automation (n8n / Vapi)',
    platform: 'Upwork',
    budget: '$500 - $1,500',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Send className="w-3.5 h-3.5" />
            Let's Collaborate
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Start Your Industrial or AI Automation Project
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Available for milestone contracts on Upwork &amp; Fiverr, European plant consulting, or custom enterprise workflow architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Platform Channels & Credentials */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                Direct Client Channels
              </h3>

              {/* Email Card with 1-Click Copy */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-mono">PRIMARY INBOX</div>
                  <a 
                    href={`mailto:${PERSONAL_INFO.email}`} 
                    className="text-xs font-bold text-amber-300 hover:underline"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>

                <button
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                </button>
              </div>

              {/* Upwork & Fiverr Quick Hire Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  id="upwork-direct-link"
                  href="https://www.upwork.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500/60 text-center transition-all group"
                >
                  <div className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">
                    Hire via
                  </div>
                  <div className="text-sm font-bold text-white flex items-center justify-center gap-1 mt-0.5 group-hover:text-emerald-300">
                    Upwork Pro
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </a>

                <a
                  id="fiverr-direct-link"
                  href="https://www.fiverr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-500/60 text-center transition-all group"
                >
                  <div className="text-[10px] font-mono text-cyan-400 font-semibold uppercase">
                    Hire via
                  </div>
                  <div className="text-sm font-bold text-white flex items-center justify-center gap-1 mt-0.5 group-hover:text-cyan-300">
                    Fiverr Gigs
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </a>
              </div>

              {/* View Verified CV Button */}
              <button
                id="view-cv-btn"
                onClick={() => setShowResumeModal(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                View &amp; Print Verified Executive CV
              </button>

            </div>

            {/* Response Time & Guarantee Note */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2 text-xs text-slate-300">
              <div className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                European &amp; International Availability
              </div>
              <p className="text-slate-400 leading-relaxed">
                Operating across European (CET) and Indian Standard Time (IST) zones with rapid 24-hour turnaround on project proposals and technical RFQs.
              </p>
            </div>

          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Message Dispatched Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Brijesh will review your requirements for <strong className="text-amber-400">{formData.projectType}</strong> and reply via <span className="text-white">{formData.email}</span> within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-white">
                    Send Project Inquiry / Request Quote
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400">● 24H SLA</span>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Name / Company *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Marcus Sterling"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. marcus@company.com"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Project Category & Platform Preference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Service Scope
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    >
                      <option>AI Workflow Automation (n8n / Make)</option>
                      <option>Vapi Conversational Voice AI Bot</option>
                      <option>Hermes Agent &amp; Autonomous AI Workflows</option>
                      <option>Industrial E&amp;I / DEF Plant Systems</option>
                      <option>HVAC &amp; Cleanroom BMS Automation</option>
                      <option>Marine Electrical Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Engagement Platform
                    </label>
                    <select
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    >
                      <option>Upwork (Fixed-Price or Hourly)</option>
                      <option>Fiverr Custom Gig</option>
                      <option>Direct Consulting / Retainer</option>
                    </select>
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Estimated Budget Range (USD)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['$250 – $500', '$500 – $1,500', '$1,500 – $3,500', '$3,500+'].map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: tier })}
                        className={`text-xs py-1.5 px-2 rounded-lg border text-center font-mono transition-all ${
                          formData.budget === tier
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Project Details / Goals *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe what you'd like automated or engineered (tools, timeline, current bottleneck)..."
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-500 custom-scrollbar"
                  />
                </div>

                {/* Submit Button */}
                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4 fill-slate-950" />
                  Submit Project Scope to Brijesh
                </button>
              </form>
            )}

          </div>

        </div>

      </div>

      {/* Resume Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar text-left">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Executive Engineering &amp; Automation CV
                </h3>
                <p className="text-xs text-amber-400 font-mono">
                  {PERSONAL_INFO.name} • 7+ Years International Experience
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Print / Save PDF
                </button>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* CV Content */}
            <div className="space-y-6 text-xs text-slate-300 leading-relaxed font-sans">
              
              {/* Summary */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="font-bold text-white text-sm mb-1">{PERSONAL_INFO.title}</div>
                <p className="text-slate-300">{PERSONAL_INFO.summary}</p>
                <div className="mt-2 text-slate-400 font-mono">
                  Email: {PERSONAL_INFO.email} | Locations: Europe (Rotterdam, BE) &amp; India
                </div>
              </div>

              {/* International Experience */}
              <div>
                <h4 className="font-bold text-amber-400 text-xs font-mono uppercase tracking-wider mb-2">
                  // Selected International Projects &amp; Work History
                </h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>Lead Electrical &amp; Automation Foreman — DEF Plant</span>
                      <span className="text-amber-400 font-mono">IOCL Gujarat Refinery</span>
                    </div>
                    <p className="text-slate-400 mt-1">
                      Full-cycle E&amp;I commissioning, hazardous zone panel wiring, pump VFD modulation, and 240+ I/O loop testing with zero safety incidents across 35,000+ man-hours.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>Senior Marine Electrical Specialist</span>
                      <span className="text-teal-400 font-mono">Rotterdam &amp; Antwerp Shipyards (NL / BE)</span>
                    </div>
                    <p className="text-slate-400 mt-1">
                      Managed 690V/400V marine main switchboard rebuilds, navigation power redundancy, generator synchronization, and IP67 bulkhead cable transits under strict B-VCA regulations.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>Lead AI Workflow Architect &amp; Hermes Agent Specialist</span>
                      <span className="text-cyan-400 font-mono">Freelance &amp; Enterprise Contracts</span>
                    </div>
                    <p className="text-slate-400 mt-1">
                      Designed 24/7 Vapi Voice AI agents, self-hosted n8n multimodal document parsers, and autonomous Hermes agentic pipelines saving clients 450+ hours monthly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="font-bold text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
                  // Verified Certifications &amp; Licenses
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                  <li className="p-2 rounded bg-slate-950 border border-slate-800">
                    <strong>B-VCA (Basisveiligheid VCA):</strong> European Safety Passport (SSVV NL &amp; BE)
                  </li>
                  <li className="p-2 rounded bg-slate-950 border border-slate-800">
                    <strong>IPAF (PAL) License:</strong> International Powered Access Operator
                  </li>
                  <li className="p-2 rounded bg-slate-950 border border-slate-800">
                    <strong>Project Management for Leaders:</strong> Schedule &amp; Cost Control
                  </li>
                  <li className="p-2 rounded bg-slate-950 border border-slate-800">
                    <strong>AI Foundations:</strong> Neural Networks &amp; Workflow Automation
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
