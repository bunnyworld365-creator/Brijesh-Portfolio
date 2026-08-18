import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set in environment.');
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_CONTEXT = `
You are the AI Technical & Client Acquisition Advisor for Brijesh Ranjan.
Brijesh is an Electrical & Automation Specialist and Industrial Systems Foreman with 7+ years of international project experience across Europe (Rotterdam, Antwerp/Belgium) and India (IOCL Gujarat Refinery).
He specializes in:
1. Industrial & Physical Systems: Electrical & Instrumentation (E&I), DEF (AdBlue) plant automation at IOCL Gujarat, Marine electrical refits in Rotterdam & Belgium shipyards, Hospital & Cleanroom HVAC automation, European laboratory precision equipment servicing, PLC/SCADA, panel wiring, B-VCA European safety passport, and IPAF (PAL) aerial lift licensing.
2. Digital & AI Workflow Automation: n8n (self-hosted and cloud), Make.com (Integromat), Zapier, Vapi Voice AI conversational agents, Hermes Agent (autonomous tool-calling, multi-step execution chains, API orchestration), LLM prompt chaining (OpenAI, Gemini), and webhook orchestration.
3. Freelance Platforms: Available on Upwork (Fixed-Price & Hourly), Fiverr (Custom Gigs), and direct contracts. Contact email: brijesh1291@outlook.com.

Tone: Professional, technically precise, direct, confidence-inspiring, and focused on delivering quantifiable ROI and rock-solid reliability.
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Proposal & Statement of Work Generator
  app.post('/api/generate-proposal', async (req, res) => {
    try {
      const { projectDescription, budget, targetPlatform, industry, toolsRequired } = req.body;

      if (!projectDescription) {
        return res.status(400).json({ error: 'projectDescription is required' });
      }

      const ai = getGenAI();
      if (!ai) {
        // Fallback structured proposal if API key is not yet configured
        return res.json({
          proposal: {
            title: `Custom Automation & Systems Architecture Proposal`,
            executiveSummary: `Based on your requirements for ${industry || 'your business'}, Brijesh Ranjan will implement a robust, fail-safe automation pipeline designed for high reliability and zero downtime.`,
            recommendedTechStack: toolsRequired?.length ? toolsRequired : ['n8n Workflow Engine', 'Make.com', 'Vapi Voice AI', 'Hermes Agent', 'Webhooks & REST APIs'],
            phases: [
              { name: 'Phase 1: Architecture & API Discovery', duration: '1-2 Days', deliverables: 'Schema mapping, authentication test, payload mockups' },
              { name: 'Phase 2: Core Workflow & Logic Build', duration: '2-4 Days', deliverables: 'Trigger setup, error handling routers, AI reasoning loops' },
              { name: 'Phase 3: Testing, Edge Cases & Deployment', duration: '1-2 Days', deliverables: 'Live sandbox testing, stress test, automated logging' },
              { name: 'Phase 4: Video SOP & Handover', duration: '1 Day', deliverables: 'Loom video walkthrough, SOP manual, 30-day post-launch warranty' },
            ],
            estimatedTurnaround: '4 – 7 Business Days',
            estimatedBudget: budget || '$450 – $1,200',
            clientWinningPitch: `Hi there! I reviewed your project regarding "${projectDescription.slice(0, 100)}...". With 7+ years bridging physical industrial automation (IOCL Refinery, Rotterdam Marine) and enterprise AI workflows (n8n, Vapi, Hermes Agent), I can deliver this system with complete error handling and full documentation. Let's connect on ${targetPlatform || 'Upwork'} to finalize the scope!`,
          },
        });
      }

      const prompt = `
Generate a comprehensive, high-converting freelance project proposal and Statement of Work (SOW) based on this client inquiry:
Client Requirement: "${projectDescription}"
Industry: "${industry || 'General Automation'}"
Budget Target: "${budget || 'Standard Market Rate'}"
Target Platform: "${targetPlatform || 'Upwork / Fiverr'}"
Preferred Tools: "${Array.isArray(toolsRequired) ? toolsRequired.join(', ') : 'n8n, Make, Vapi, Hermes Agent'}"

The proposal must reflect Brijesh Ranjan's technical mastery (7+ years international industrial & AI automation experience).
Format output in strict JSON according to schema.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_CONTEXT,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              executiveSummary: { type: Type.STRING },
              recommendedTechStack: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              phases: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    duration: { type: Type.STRING },
                    deliverables: { type: Type.STRING },
                  },
                  required: ['name', 'duration', 'deliverables'],
                },
              },
              estimatedTurnaround: { type: Type.STRING },
              estimatedBudget: { type: Type.STRING },
              clientWinningPitch: { type: Type.STRING },
              keyRisksMitigated: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ['title', 'executiveSummary', 'recommendedTechStack', 'phases', 'estimatedTurnaround', 'estimatedBudget', 'clientWinningPitch'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json({ proposal: parsed });
    } catch (error: any) {
      console.error('Error generating proposal:', error);
      res.status(500).json({ error: error.message || 'Failed to generate proposal' });
    }
  });

  // AI Workflow Audit & ROI Calculator
  app.post('/api/audit-workflow', async (req, res) => {
    try {
      const { manualWorkflow, teamSize, hoursSpentPerWeek, softwareStack } = req.body;

      if (!manualWorkflow) {
        return res.status(400).json({ error: 'manualWorkflow description is required' });
      }

      const ai = getGenAI();
      if (!ai) {
        // Fallback structured audit
        const hours = Number(hoursSpentPerWeek) || 15;
        const people = Number(teamSize) || 2;
        const annualHoursSaved = Math.round(hours * 0.85 * 50 * people);
        const estimatedSavings = annualHoursSaved * 35; // $35/hr base

        return res.json({
          audit: {
            bottleneckSummary: `Your current manual process creates latency, human transcription errors, and scales poorly with volume.`,
            recommendedSolution: `Deploy a centralized event-driven workflow in n8n/Make connecting your apps with automated error alerts.`,
            estimatedHoursSavedPerWeek: `${Math.round(hours * 0.85)} hrs/week`,
            annualCostSavingsUSD: `$${estimatedSavings.toLocaleString()}/yr`,
            roiPaybackPeriod: 'Under 14 Days',
            recommendedTools: ['n8n Workflow Engine', 'OpenAI/Gemini Extraction', 'Webhooks', 'Slack/Email Notifications'],
            implementationSteps: [
              'Map incoming payload & setup webhook trigger',
              'Implement automated schema sanitization & LLM extraction',
              'Configure fail-safe retry mechanism and duplicate check',
              'Deploy automated summary notifications and bi-directional CRM sync',
            ],
          },
        });
      }

      const prompt = `
Analyze this business process for automation bottlenecks and calculate the ROI of an automated solution engineered by Brijesh:
Current Manual Process: "${manualWorkflow}"
Team Size Involved: ${teamSize || '1-3 people'}
Hours Spent Per Week: ${hoursSpentPerWeek || '15'} hours
Current Software Stack: "${softwareStack || 'Email, Spreadsheets, CRM'}"

Provide a crisp, mathematical breakdown of hours saved, dollar value saved, recommended tools, and step-by-step blueprint.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_CONTEXT,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              bottleneckSummary: { type: Type.STRING },
              recommendedSolution: { type: Type.STRING },
              estimatedHoursSavedPerWeek: { type: Type.STRING },
              annualCostSavingsUSD: { type: Type.STRING },
              roiPaybackPeriod: { type: Type.STRING },
              recommendedTools: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              implementationSteps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ['bottleneckSummary', 'recommendedSolution', 'estimatedHoursSavedPerWeek', 'annualCostSavingsUSD', 'roiPaybackPeriod', 'recommendedTools', 'implementationSteps'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json({ audit: parsed });
    } catch (error: any) {
      console.error('Error auditing workflow:', error);
      res.status(500).json({ error: error.message || 'Failed to analyze workflow' });
    }
  });

  // AI Consultation Chat Assistant
  app.post('/api/chat-assistant', async (req, res) => {
    try {
      const { message, chatHistory } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'message is required' });
      }

      const ai = getGenAI();
      if (!ai) {
        return res.json({
          reply: `Hello! I am Brijesh's AI technical assistant. Brijesh has 7+ years of international electrical and automation experience across Europe (Rotterdam & Belgium shipyards) and India (IOCL Gujarat Refinery), as well as advanced AI workflow engineering (n8n, Make, Vapi, Hermes Agent). He is currently open for Upwork and Fiverr freelance contracts! How can we assist with your automation or engineering project?`,
        });
      }

      const formattedHistory = Array.isArray(chatHistory)
        ? chatHistory.map((item: { role: string; content: string }) => `${item.role === 'user' ? 'User' : 'Assistant'}: ${item.content}`).join('\n')
        : '';

      const prompt = `
Conversation History:
${formattedHistory}

Current User Message: "${message}"

Answer the user professionally and helpfully on behalf of Brijesh. If they ask about hiring, rates, certifications (B-VCA, IPAF), or specific tools (n8n, Vapi, IOCL DEF plant, Rotterdam shipyards, Hermes Agent), provide accurate and engaging details. Invite them to request a proposal or connect directly via Upwork, Fiverr, or email (brijesh1291@outlook.com).
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_CONTEXT,
          temperature: 0.7,
        },
      });

      res.json({ reply: response.text || 'I am ready to help with your automation needs. Feel free to contact Brijesh directly!' });
    } catch (error: any) {
      console.error('Error in chat assistant:', error);
      res.status(500).json({ error: error.message || 'Chat assistant error' });
    }
  });

  // Vite Middleware & SPA Handling
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Brijesh Ranjan Portfolio Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
