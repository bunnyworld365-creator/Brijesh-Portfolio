import React from 'react';
import { 
  ShieldCheck, Mail, ArrowUp, ExternalLink, 
  Sparkles, Zap, Heart, Bot 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Summary */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-cyan-500 flex items-center justify-center font-black text-slate-950 text-sm">
                BR
              </div>
              <span className="font-bold text-white text-base">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Electrical &amp; Automation Specialist with 7+ years across European shipyards (Rotterdam, Belgium) and IOCL Gujarat Refinery. Building refinery-grade AI workflow automations with n8n, Make, Vapi, and Hermes Agent.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certified: B-VCA European Safety • IPAF (PAL) License</span>
            </div>
          </div>

          {/* Direct Freelance Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              Freelance Profiles
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.upwork.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Upwork Profile
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.fiverr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Fiverr Pro Gigs
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3 h-3 text-slate-400" />
                  Direct Email
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              Navigation
            </h4>
            <ul className="space-y-1.5">
              <li><a href="#expertise" className="hover:text-white transition-colors">Dual Expertise</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#simulator" className="hover:text-white transition-colors">Workflow Simulator</a></li>
              <li><a href="#proposal-generator" className="hover:text-white transition-colors">AI Proposal Engine</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Freelance Gigs</a></li>
              <li><a href="#certifications" className="hover:text-white transition-colors">Certifications</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-slate-300 transition-colors"
            >
              Back to Top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
