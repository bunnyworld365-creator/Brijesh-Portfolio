import React from 'react';
import { 
  ShieldCheck, Award, FileCheck, CheckCircle2, 
  ExternalLink, Globe, Sparkles, Building2 
} from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-20 md:py-28 bg-slate-950/70 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Safety &amp; Engineering Credentials
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            International Certifications &amp; Licenses
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Holding recognized European safety passports (B-VCA), international aerial access licenses (IPAF), and advanced credentials in project leadership and neural network automation.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert) => {
            const isSafety = cert.badgeType === 'safety';
            const isAI = cert.badgeType === 'ai';
            const isManagement = cert.badgeType === 'management';

            return (
              <div
                key={cert.id}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl"
              >
                <div>
                  {/* Badge Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${
                        isSafety
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : isAI
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      <Award className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      {cert.region}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1.5">
                    {cert.name}
                  </h3>

                  <div className="text-xs font-mono text-amber-400 mb-3">
                    {cert.issuer}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {cert.description}
                  </p>
                </div>

                {/* Skills Chips */}
                <div className="pt-4 border-t border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-400 mb-2 uppercase">Verified Competencies:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800/80"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* European Standards Guarantee Bar */}
        <div className="mt-12 p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>European &amp; International Standards Compliance: <strong>NEN-EN, IEC 60092, ATEX Directive 2014/34/EU</strong></span>
          </div>
          <span className="text-amber-400 font-mono font-semibold">100% Audit Readiness</span>
        </div>

      </div>
    </section>
  );
};
