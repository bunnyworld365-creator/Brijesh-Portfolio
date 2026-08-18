export type ProjectCategory = 'all' | 'industrial' | 'ai-automation' | 'marine-ei' | 'hvac-lab';

export interface Project {
  id: string;
  title: string;
  category: 'industrial' | 'ai-automation' | 'marine-ei' | 'hvac-lab';
  clientLocation: string;
  duration: string;
  role: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  metrics: { label: string; value: string }[];
  featuredImagePlaceholderIcon?: string;
  blueprintSteps?: string[];
  upworkRelevance?: string;
}

export interface FreelanceService {
  id: string;
  title: string;
  tagline: string;
  category: 'AI Workflow Automation' | 'Industrial & Electrical' | 'Agentic AI & Custom Automation' | 'Custom Scripting' | 'System Maintenance';
  priceEstimate: string;
  deliveryTime: string;
  platforms: ('Upwork' | 'Fiverr' | 'Direct Contract')[];
  popular?: boolean;
  deliverables: string[];
  recommendedFor: string;
  tools: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  region: string;
  validity: string;
  description: string;
  skills: string[];
  credentialId?: string;
  badgeType: 'safety' | 'engineering' | 'ai' | 'management';
}

export interface WorkflowNode {
  id: string;
  title: string;
  type: 'trigger' | 'ai-process' | 'action' | 'database' | 'notification';
  icon: string;
  description: string;
  tool: string;
  samplePayload?: Record<string, any>;
}

export interface WorkflowBlueprint {
  id: string;
  title: string;
  description: string;
  industry: string;
  estimatedHoursSavedPerWeek: string;
  nodes: WorkflowNode[];
  techStack: string[];
  executionTime: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  companyOrPlatform: string;
  location: string;
  feedback: string;
  projectType: string;
  rating: number;
}
