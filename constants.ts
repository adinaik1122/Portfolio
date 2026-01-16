import { ProjectCategory, ExperienceItem, Skill } from './types';
import { Mail, Linkedin, Globe, Video } from 'lucide-react';

export const HERO_DATA = {
  name: "Aditya Rahul Naik",
  title: "Digital Artist | Motion Graphics Designer | Video Editor",
  tagline: "Crafting visual stories through motion, compositing, and design."
};

export const PROJECTS_DATA: ProjectCategory[] = [
  {
    title: "Just For Hearts",
    projects: [
      { id: 'jfh-1', type: 'video', videoId: 'Nouxmk38iLc' },
      { id: 'jfh-2', type: 'video', videoId: 'DuieK8O7juQ' },
      { id: 'jfh-3', type: 'video', videoId: 'JSrF89UKFJU' }, // Removed timestamp
      { id: 'jfh-4', type: 'video', videoId: 'fVVjE-89XZI' }, // Removed timestamp
    ]
  },
  {
    title: "Sheffield Sports Med",
    projects: [
      { id: 'ssm-1', type: 'video', videoId: 'vHW50uv6H4E' },
      { id: 'ssm-2', type: 'video', videoId: 'ouuUTSgHs78' }, // Removed timestamp
    ]
  },
  {
    title: "Personal Editing",
    projects: [
      { id: 'pe-1', type: 'video', videoId: 'bxhsznQp8HQ' },
    ]
  },
  {
    title: "Motion Graphics",
    projects: [
      { id: 'mg-1', type: 'playlist', videoId: 'PLLpHUxGA-WgZlUoCAj8tVJxFy_n5OBwCl' },
    ]
  },
  {
    title: "Travel",
    projects: [
      { id: 'travel-1', type: 'video', videoId: 'qSUIoV-E32Y' },
    ]
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    company: "Kingbee Animation",
    role: "Jr. Motion Graphics Designer | Compositor | Video Editor",
    period: "Aug 2023 – Aug 2024",
    location: "Elstree & Borehamwood, United Kingdom",
    description: [
      "Created 2D logo animations for Music Mind Matters.",
      "Composited 2D animations for an album by singer Christina Perri.",
      "Worked with Adobe After Effects, Adobe Premiere Pro, and Nuke."
    ]
  },
  {
    company: "StudioB",
    role: "Compositing Work Experience",
    period: "Jan 2024 – Jan 2024",
    location: "London, United Kingdom",
    description: [
      "One-week work experience at a UK-based studio.",
      "Executed compositing tasks under tight deadlines.",
      "Applied compositing, roto, and paint techniques."
    ]
  },
  {
    company: "Freelance Artist",
    role: "Video Editor | Architectural Visualisation",
    period: "Jan 2021 – Present",
    location: "United Kingdom",
    description: [
      "Delivered architectural visualization projects for UK-based clients.",
      "Collaborated with YouTube creators.",
      "Enhanced visual storytelling through editing."
    ]
  }
];

export const SKILLS_DATA: Skill[] = [
  { name: "Foundry Nuke" },
  { name: "Houdini" },
  { name: "Adobe Photoshop" },
  { name: "Adobe Illustrator" },
  { name: "Adobe Premiere Pro" },
  { name: "Adobe After Effects" },
  { name: "Blender" },
  { name: "Figma" },
  { name: "Silhouette" },
];

export const LANGUAGES_DATA: string[] = [
  "Hindi", "English", "Spanish", "Marathi"
];

export const SOCIAL_LINKS = [
  { 
    label: "Email", 
    href: "mailto:adityanaik5736@gmail.com", 
    icon: Mail,
    value: "adityanaik5736@gmail.com" 
  },
  { 
    label: "LinkedIn", 
    href: "https://www.linkedin.com/in/aditya-naik11", // Assuming valid URL structure 
    icon: Linkedin,
    value: "aditya-naik11"
  },
  { 
    label: "Vimeo", 
    href: "https://vimeo.com/793647723", 
    icon: Video,
    value: "vimeo.com/793647723"
  },
];