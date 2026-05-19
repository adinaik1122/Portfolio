export type Discipline =
  | 'vfx'
  | 'motion'
  | 'editing'
  | 'branding'
  | 'design'
  | 'visualization';

export const DISCIPLINE_LABELS: Record<Discipline, string> = {
  vfx: 'VFX & Compositing',
  motion: 'Motion Graphics',
  editing: 'Video Editing',
  branding: 'Branding',
  design: 'Design',
  visualization: 'Arch Viz',
};

export interface ProcessStep {
  step: string;
  text: string;
}

export interface Project {
  id: string;
  title: string;
  discipline: Discipline;
  year: number;
  client?: string;
  brief: string;
  tools: string[];
  // Video projects
  type: 'video' | 'playlist' | 'image';
  videoId?: string;
  // Image/design projects
  images?: string[];
  palette?: string[];
  // Display
  featured?: boolean;
  // Case study
  process?: ProcessStep[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  url?: string;
}

export interface Skill {
  name: string;
  category?: 'compositing' | '3d' | 'design' | 'editing';
}

// Kept for any legacy references
export interface ProjectCategory {
  title: string;
  projects: Project[];
}
