import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DualExpertise } from './components/DualExpertise';
import { WorkflowSimulator } from './components/WorkflowSimulator';
import { ProjectShowcase } from './components/ProjectShowcase';
import { AIProposalGenerator } from './components/AIProposalGenerator';
import { WorkflowAuditTool } from './components/WorkflowAuditTool';
import { ServicesPricing } from './components/ServicesPricing';
import { CertificationsSection } from './components/CertificationsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LiveConsultantBot } from './components/LiveConsultantBot';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedServiceForContact, setSelectedServiceForContact] = useState<string | undefined>(undefined);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceForContact(serviceTitle);
    handleScrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans relative overflow-x-hidden app-root transition-colors duration-200">
      
      {/* Top Fixed Navigation */}
      <Navbar 
        onOpenProposalModal={() => handleScrollToSection('proposal-generator')}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero 
          onOpenProposalModal={() => handleScrollToSection('proposal-generator')}
          onOpenAudit={() => handleScrollToSection('audit')}
        />

        {/* The Dual Advantage: Industrial Engineer + AI Workflows */}
        <DualExpertise />

        {/* Live Interactive Workflow Pipeline Simulator */}
        <WorkflowSimulator />

        {/* Filterable Portfolio Showcase (Refinery, Marine, AI, HVAC/Lab) */}
        <ProjectShowcase />

        {/* Instant AI Statement of Work & Proposal Generator (Gemini Powered) */}
        <AIProposalGenerator />

        {/* Automation ROI & Bottleneck Calculator */}
        <WorkflowAuditTool />

        {/* Upwork & Fiverr Freelance Gigs & Service Tiers */}
        <ServicesPricing onSelectService={handleSelectService} />

        {/* European & International Certifications (B-VCA, IPAF PAL, PM) */}
        <CertificationsSection />

        {/* Client Testimonials & Verifications */}
        <TestimonialsSection />

        {/* Contact & RFQ Submission + Verified CV Preview */}
        <ContactSection 
          initialService={selectedServiceForContact}
          onOpenProposalModal={() => handleScrollToSection('proposal-generator')}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Live AI Technical Consultation Assistant (Docked Floating Bot) */}
      <LiveConsultantBot 
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />

    </div>
  );
}
