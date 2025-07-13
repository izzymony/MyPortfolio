// types/index.ts
export interface Skill {
  name: string;
  icon: string;
  level: number;
  category?: 'frontend' | 'backend' | 'design' | 'tooling';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
  logo?: string;
}