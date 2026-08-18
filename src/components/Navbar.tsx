import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Sparkles, Send, ShieldCheck, ArrowRight, 
  ExternalLink, MessageSquare, Zap, FileText, Sun, Moon 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenProposalModal: () => void;
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenProposalModal, onOpenChat }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Expertise', href: '#expertise' },
    { label: 'Projects', href: '#projects' },
    { label: 'Live Simulator', href: '#simulator' },
    { label: 'AI Audit & ROI', href: '#audit' },
    { label: 'Services & Gigs', href: '#services' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-cyan-500 p-[1.5px] shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400 text-lg">
                BR
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100 text-base tracking-tight group-hover:text-amber-400 transition-colors">
                  {PERSONAL_INFO.shortName}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
                  Available
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block">
                Industrial E&I + AI Automation
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-full transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn-desktop"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-400 transition-all flex items-center justify-center shadow-sm"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              )}
            </button>

            <button
              id="nav-instant-proposal-btn"
              onClick={onOpenProposalModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all hover:border-amber-500/60 hover:shadow-sm hover:shadow-amber-500/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              AI Proposal Generator
            </button>

            <a
              id="nav-hire-upwork-btn"
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <Zap className="w-3.5 h-3.5" />
              Hire Brijesh
            </a>
          </div>

          {/* Mobile Menu & Theme Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="theme-toggle-btn-mobile"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
            <button
              id="mobile-chat-btn"
              onClick={onOpenChat}
              aria-label="Open AI Assistant"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 hover:bg-slate-800 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-4 pb-6 mt-3 shadow-2xl space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={toggleTheme}
              className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-slate-900 text-slate-200 border border-slate-800 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
                Theme: <strong className="text-amber-400 capitalize">{theme} Mode</strong>
              </span>
              <span className="text-[11px] text-slate-400">Tap to switch</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProposalModal();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Generate AI Proposal
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 text-xs font-bold rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center gap-2 text-center"
            >
              <Send className="w-4 h-4" />
              Hire on Upwork / Fiverr
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

