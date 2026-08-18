import React, { useState, useEffect } from 'react';
import { 
  Play, RotateCcw, CheckCircle2, Bot, PhoneCall, 
  Activity, Mail, Database, Send, FileCode, Check, 
  Clock, Zap, ArrowRight, ShieldAlert, Sparkles, Terminal
} from 'lucide-react';
import { WORKFLOW_BLUEPRINTS } from '../data/portfolioData';
import { WorkflowBlueprint, WorkflowNode } from '../types';

export const WorkflowSimulator: React.FC = () => {
  const [selectedBlueprintIndex, setSelectedBlueprintIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const currentBlueprint: WorkflowBlueprint = WORKFLOW_BLUEPRINTS[selectedBlueprintIndex];

  const handleRunSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);
    setCompleted(false);
    setExecutionLogs([
      `[00:00.000] 🟢 Initializing workflow: ${currentBlueprint.title}`,
      `[00:00.120] ⚡ Webhook listener activated. Awaiting trigger event...`
    ]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < currentBlueprint.nodes.length) {
        setActiveStep(step);
        const node = currentBlueprint.nodes[step];
        setExecutionLogs(prev => [
          ...prev,
          `[00:0${step * 450}.000] ✅ Node "${node.title}" executed via ${node.tool}. Payload passed cleanly.`
        ]);
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setCompleted(true);
        setExecutionLogs(prev => [
          ...prev,
          `[00:0${step * 450 + 200}.000] 🎉 Workflow completed successfully with ZERO exceptions. Execution time: ${currentBlueprint.executionTime}`
        ]);
      }
    }, 1100);
  };

  const handleReset = () => {
    setIsRunning(false);
    setActiveStep(-1);
    setCompleted(false);
    setExecutionLogs([]);
  };

  const getNodeIcon = (iconName: string) => {
    switch (iconName) {
      case 'PhoneCall': return <PhoneCall className="w-5 h-5" />;
      case 'Bot': return <Bot className="w-5 h-5" />;
      case 'Calendar': return <Clock className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Send': return <Send className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'FileCode': return <FileCode className="w-5 h-5" />;
      case 'Mail': return <Mail className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <section id="simulator" className="py-20 md:py-28 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            Interactive Workflow Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Live Automation Pipeline Simulator
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Test how my custom event-driven pipelines execute in real time. Switch between blueprints, trigger live simulations, and inspect execution telemetry.
          </p>
        </div>

        {/* Blueprint Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {WORKFLOW_BLUEPRINTS.map((blueprint, index) => (
            <button
              key={blueprint.id}
              onClick={() => {
                setSelectedBlueprintIndex(index);
                handleReset();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                selectedBlueprintIndex === index
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700 hover:bg-slate-800'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${selectedBlueprintIndex === index ? 'text-slate-950' : 'text-amber-400'}`} />
              {blueprint.title.split('&')[0].slice(0, 32)}...
            </button>
          ))}
        </div>

        {/* Simulator Board */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 lg:p-8 shadow-2xl backdrop-blur-xl">
          
          {/* Top Control Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">
                  {currentBlueprint.title}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                  {currentBlueprint.industry}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                {currentBlueprint.description}
              </p>
            </div>

            {/* Run / Reset Controls */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                id="simulator-run-btn"
                onClick={handleRunSimulation}
                disabled={isRunning}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isRunning
                    ? 'bg-amber-500/40 text-slate-950 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-md shadow-emerald-500/20'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isRunning ? 'Executing Pipeline...' : 'Run Simulation'}
              </button>

              <button
                id="simulator-reset-btn"
                onClick={handleReset}
                aria-label="Reset simulation"
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Node Flow Graphic */}
          <div className="relative mb-10">
            
            {/* Connecting line behind nodes */}
            <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
              {currentBlueprint.nodes.map((node, index) => {
                const isActive = activeStep === index;
                const isPassed = activeStep > index || completed;

                return (
                  <div
                    key={node.id}
                    className={`rounded-xl p-4 transition-all duration-300 border flex flex-col justify-between ${
                      isActive
                        ? 'bg-amber-950/40 border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/20 transform -translate-y-1'
                        : isPassed
                        ? 'bg-slate-900 border-emerald-500/40 text-slate-200'
                        : 'bg-slate-950/70 border-slate-800/80 text-slate-400'
                    }`}
                  >
                    <div>
                      {/* Node Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isActive
                              ? 'bg-amber-500 text-slate-950'
                              : isPassed
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {getNodeIcon(node.icon)}
                        </div>

                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300">
                          0{index + 1}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-100 mb-1">
                        {node.title}
                      </h4>
                      <div className="text-[10px] font-mono text-cyan-400 mb-2 font-medium">
                        [{node.tool}]
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {node.description}
                      </p>
                    </div>

                    {/* Step Status Badge */}
                    <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                      <span className="font-mono">Status:</span>
                      {isActive ? (
                        <span className="text-amber-400 font-bold flex items-center gap-1 animate-pulse">
                          Processing...
                        </span>
                      ) : isPassed ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Validated
                        </span>
                      ) : (
                        <span className="text-slate-500">Standby</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Diagnostics & Live Logs Terminal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
            
            {/* Live Terminal Output */}
            <div className="lg:col-span-8 rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 space-y-1.5 h-44 overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  Execution Telemetry Stream
                </span>
                <span>Port 443 HTTPS / Webhook</span>
              </div>
              {executionLogs.length === 0 ? (
                <div className="text-slate-500 italic py-6 text-center">
                  Click "Run Simulation" above to execute this workflow pipeline live.
                </div>
              ) : (
                executionLogs.map((log, i) => (
                  <div key={i} className="leading-relaxed">
                    {log.includes('🟢') && <span className="text-cyan-400">{log}</span>}
                    {log.includes('✅') && <span className="text-emerald-400">{log}</span>}
                    {log.includes('🎉') && <span className="text-amber-300 font-bold">{log}</span>}
                    {log.includes('⚡') && <span className="text-slate-300">{log}</span>}
                  </div>
                ))
              )}
            </div>

            {/* ROI & Turnkey Summary Box */}
            <div className="lg:col-span-4 rounded-xl bg-slate-950/60 border border-slate-800 p-4 flex flex-col justify-between space-y-3">
              <div>
                <div className="text-xs font-semibold text-slate-300 mb-2">
                  Client Business Impact:
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Time Saved:</span>
                    <span className="font-bold text-amber-400">{currentBlueprint.estimatedHoursSavedPerWeek}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Avg Latency:</span>
                    <span className="font-bold text-cyan-400">{currentBlueprint.executionTime}</span>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="w-full py-2 px-3 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                Deploy this for my business
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
