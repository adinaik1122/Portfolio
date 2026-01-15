export interface Project {
  id: string;
  title?: string;
  type: 'video' | 'playlist';
  videoId: string;
}

export interface ProjectCategory {
  title: string;
  projects: Project[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface Skill {
  name: string;
  category?: 'software' | 'language';
}