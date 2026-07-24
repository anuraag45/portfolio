export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  status: string;
  deliveryDate?: string;
  auditStatus?: string;
  description: string;
  architectureDetails: string[];
  keyDecisions: string[];
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  circuitType: 'meridian' | 'aegis' | 'docflow' | 'inventory';
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  category: 'freelance' | 'internship';
  deliverables: string[];
  stack: string[];
}

export interface SkillCategory {
  title: string;
  subsystemCode: string;
  description: string;
  items: { name: string; level?: string; tag?: string }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  details: string;
}
