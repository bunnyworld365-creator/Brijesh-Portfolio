import React, { useState } from 'react';
import { 
  Flame, Anchor, PhoneCall, FileSpreadsheet, Wind, 
  Microscope, ArrowUpRight, CheckCircle2, ShieldCheck, 
  Sparkles, X, ChevronRight, Cpu, Layers, ExternalLink
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';

export const ProjectShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => {
        if (selectedCategory === 'industrial') return p.category === 'industrial';
        if (selectedCategory === 'ai-automation') return p.category === 'ai-automation';
        if (selectedCategory === 'marine-ei') return p.category === 'marine-ei';
        if (selectedCategory === 'hvac-lab') return p.category === 'hvac-lab';
        return true;
      });

  const getProjectIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5 text-amber-400" />;
      case 'Anchor': return <Anchor className="w-5 h-5 text-teal-400" />;
      case 'PhoneCall': return <PhoneCall className="w-5 h-5 text-blue-400" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-5 h-5 text-cyan-400" />;
      case 'Wind': return <Wind className="w-5 h-5 text-indigo-400" />;
      case 'Microscope': return <Microscope className="w-5 h-5 text-emerald-400" />;
      default: return <Cpu className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="projects" className="py-20 md:py-28 bg-slate-950/80 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Industrial &amp; AI Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              From high-hazard European maritime docks and IOCL refinery plants to autonomous 24/7 AI workflow architectures.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'ai-automation', label: 'AI & Automation' },
              { id: 'industrial', label: 'Refinery & Plant' },
              { id: 'marine-ei', label: 'Marine (Rotterdam/BE)' },
              { id: 'hvac-lab', label: 'HVAC & Lab Tech' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ProjectCategory)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveModalProject(project)}
              className="group cursor-pointer rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-amber-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 backdrop-blur-sm"
            >
              <div>
                {/* Project Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-amber-500/30 transition-colors">
                    {getProjectIcon(project.featuredImagePlaceholderIcon)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {project.duration}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-amber-400 group-hover:bg-amber-500/10 transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-amber-400 font-semibold mb-1">
                  {project.clientLocation}
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-2.5 line-clamp-2">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                  {project.summary}
                </p>

                {/* Key Metrics Row */}
                <div className="grid grid-cols-3 gap-2 py-3 px-2 rounded-lg bg-slate-950/60 border border-slate-800/80 mb-4 text-center">
                  {project.metrics.map((m, i) => (
                    <div key={i}>
                      <div className="text-xs font-bold text-white font-mono">{m.value}</div>
                      <div className="text-[9px] text-slate-400 truncate">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Badges */}
              <div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-amber-400/90 font-medium mt-3 flex items-center gap-1 group-hover:underline">
                  <span>View Case Study Blueprint</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar text-left">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold mb-2">
              <span>{activeModalProject.clientLocation}</span>
              <span>•</span>
              <span>{activeModalProject.duration}</span>
              <span>•</span>
              <span className="text-cyan-400 font-bold">{activeModalProject.role}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 pr-8">
              {activeModalProject.title}
            </h3>

            {/* Summary */}
            <p className="text-sm text-slate-300 leading-relaxed mb-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {activeModalProject.summary}
            </p>

            {/* Key Metrics Banner */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {activeModalProject.metrics.map((metric, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-lg sm:text-xl font-mono font-extrabold text-amber-400">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2">
                  // The Engineering Challenge
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeModalProject.challenge}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  // Brijesh's Technical Solution
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeModalProject.solution}
                </p>
              </div>
            </div>

            {/* Execution Blueprint Steps */}
            {activeModalProject.blueprintSteps && (
              <div className="mb-6">
                <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-3">
                  Step-by-Step Implementation Protocol:
                </h4>
                <div className="space-y-2">
                  {activeModalProject.blueprintSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-xs text-slate-300 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60">
                      <span className="font-mono text-amber-400 font-bold">0{index + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantifiable Results */}
            <div className="mb-6">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                Key Project Deliverables &amp; Outcomes:
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeModalProject.results.map((res, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <div className="text-xs font-mono text-slate-400 mb-2">Technologies &amp; Protocols Applied:</div>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.technologies.map((tech) => (
                  <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom CTAs */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                Need a similar system built or audited?
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg"
                >
                  Close
                </button>
                <a
                  href="#contact"
                  onClick={() => setActiveModalProject(null)}
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-md transition-colors"
                >
                  Discuss This with Brijesh
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
