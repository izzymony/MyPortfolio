// types/index.ts
export interface Skill {
  name: string;
  icon?: string;
  level?: number;
  category?: 'frontend' | 'backend' | 'database' | 'tooling' | 'design';
}

export interface Experience {
  id?: string;
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  logo?: string;
}

export interface Project {
  id: string;
  title: string;
  category?: string;
  description: string;
  tech_stack: string[];
  image_url: string;
  live_url?: string;
  github_url?: string;
  features?: string[];
  featured?: boolean;
}
