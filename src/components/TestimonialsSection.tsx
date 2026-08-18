import React from 'react';
import { Star, Quote, ShieldCheck, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            Client Reviews &amp; References
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Shipyards, Refineries &amp; Modern Businesses
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Feedback from shipyard technical superintendents in Europe, industrial project managers in India, and international SaaS founders on Upwork &amp; Fiverr.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl relative"
            >
              <div>
                {/* Rating & Project Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800">
                    {t.projectType}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic mb-6">
                  "{t.feedback}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {t.clientName}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {t.role} • <span className="text-slate-300">{t.companyOrPlatform}</span>
                  </p>
                </div>
                <div className="text-[10px] font-mono text-slate-400 shrink-0">
                  📍 {t.location}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
