import React from 'react';
import { 
  Zap, Check, Clock, ShieldCheck, ArrowRight, 
  ExternalLink, Bot, Cpu, Terminal, Sparkles 
} from 'lucide-react';
import { FREELANCE_SERVICES } from '../data/portfolioData';

interface ServicesPricingProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesPricing: React.FC<ServicesPricingProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 md:py-28 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            Upwork &amp; Fiverr Ready Packages
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Freelance Services &amp; Consulting Gigs
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Transparent pricing, fast milestone turnarounds, and rock-solid fail-safe engineering. Available for fixed-price gigs, hourly contracts, and retainer partnerships.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FREELANCE_SERVICES.map((service) => (
            <div
              key={service.id}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 relative ${
                service.popular
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/60 shadow-2xl shadow-amber-500/10'
                  : 'bg-slate-900/70 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                  ★ Most In-Demand Gig
                </div>
              )}

              <div>
                {/* Category & Price Row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase">
                      {service.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      {service.title}
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-lg sm:text-xl font-extrabold font-mono text-amber-400">
                      {service.priceEstimate}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center justify-end gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {service.deliveryTime}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {service.tagline}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2.5 mb-6">
                  <div className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                    Scope of Deliverables:
                  </div>
                  {service.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Recommended For */}
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 mb-6">
                  <strong className="text-slate-200">Recommended for:</strong> {service.recommendedFor}
                </div>
              </div>

              {/* Bottom Actions & Platforms */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span>Tools:</span>
                    <span className="text-slate-300 font-medium">{service.tools.slice(0, 4).join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-amber-400">
                    <span>Upwork • Fiverr</span>
                  </div>
                </div>

                <button
                  id={`book-service-${service.id}`}
                  onClick={() => onSelectService(service.title)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                    service.popular
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <span>Inquire / Book This Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Upwork & Fiverr Guarantee Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/20 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                100% Client Satisfaction &amp; Post-Launch Warranty
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Every project includes Loom video walkthroughs, comprehensive documentation, and 30 days of free bug-fix warranty.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold shrink-0 transition-colors"
          >
            Custom Enterprise Scope
          </a>
        </div>

      </div>
    </section>
  );
};
