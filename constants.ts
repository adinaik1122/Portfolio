import { RECENT_PROJECTS } from './constants/recentProjects';
import { Project, ExperienceItem, Skill } from './types';
import { SocialLink } from './types/components';
import { Mail, Phone, Video } from 'lucide-react';

export const HERO_DATA = {
  name: "Aditya Naik",
  title: "Video Editing · Branding & Packaging · VFX Compositing",
  tagline: "Stories in motion. Brands with character. Seamless visual effects.",
};

export const PROJECTS: Project[] = [
  ...RECENT_PROJECTS,
  // ── VFX & Compositing ─────────────────────────────────────────────────────
  {
    id: 'comp-1',
    title: 'VFX Compositing Showreel',
    discipline: 'vfx',
    year: 2024,
    brief: 'A selection of VFX compositing work. Individual shot credits and production details are available on request.',
    tools: ['Nuke', 'After Effects', 'Silhouette', 'Photoshop'],
    type: 'video',
    videoId: 'wWRJXqXTBLc',
    featured: true,
  },

  // ── Motion Graphics ────────────────────────────────────────────────────────
  {
    id: 'mg-1',
    title: 'Motion Graphics Reel',
    discipline: 'editing',
    year: 2024,
    client: 'Selected work',
    brief: 'Highlights from motion graphics projects including logo animations, title sequences, and animated brand assets.',
    tools: ['After Effects', 'Illustrator', 'Premiere Pro'],
    type: 'video',
    videoId: 'tg03Igge8qg',
    featured: true,
  },
  {
    id: 'mg-2',
    title: 'Christina Perri — Lullaby Album',
    discipline: 'editing',
    year: 2024,
    client: 'Christina Perri / Kingbee Animation',
    brief: 'Video editing and motion work for a Christina Perri lullaby album at Kingbee Animation Studio. Character and environment artwork were contributed by other artists.',
    tools: ['After Effects', 'Premiere Pro', 'Illustrator'],
    type: 'playlist',
    videoId: 'PLLpHUxGA-WgZlUoCAj8tVJxFy_n5OBwCl',
    process: [
      { step: 'Brief', text: 'Produce video content for a full lullaby album by Christina Perri, intended as a heartfelt birthday gift for her daughter. Each song required its own edited video with matching motion animation.' },
      { step: 'Approach', text: 'Edited 8–9 individual song videos from raw footage and assets, maintaining a consistent visual language across the album. Collaborated closely with other Kingbee artists handling character animation and environment design.' },
      { step: 'Tools', text: 'Premiere Pro for video editing and assembly; After Effects for motion animation, compositing, and transitions; Illustrator for supplementary graphic assets.' },
      { step: 'Output', text: 'A series of lullaby videos produced collaboratively at Kingbee Animation Studio.' },
    ],
  },

  // ── Video Editing ─────────────────────────────────────────────────────────
  {
    id: 'CC-1',
    title: 'Creator Edit — Vol. 1',
    discipline: 'editing',
    year: 2023,
    client: 'YouTube Creator',
    brief: 'High-energy edit for a lifestyle/content creator channel, paced to retain audience engagement through fast cuts and colour work.',
    tools: ['Premiere Pro', 'After Effects'],
    type: 'video',
    videoId: 'Q-rYX8z7NO4',
    process: [
      { step: 'Brief', text: 'Edit a fast-paced video for a content creator that maximises watch time and audience retention.' },
      { step: 'Approach', text: 'Used J/L cuts and music-synced transitions to maintain energy; colour grade matched the creator\'s established aesthetic.' },
      { step: 'Tools', text: 'Premiere Pro for the edit; After Effects for custom text animations and transitions.' },
      { step: 'Output', text: 'Edited video for a creator channel.' },
    ],
  },
  {
    id: 'CC-2',
    title: 'Creator Edit — Vol. 2',
    discipline: 'editing',
    year: 2023,
    client: 'YouTube Creator',
    brief: 'Second volume in a series of edits for the same creator — refined pacing and expanded use of motion graphics overlays.',
    tools: ['Premiere Pro', 'After Effects'],
    type: 'video',
    videoId: 'eowbM36d-Ao',
    process: [
      { step: 'Brief', text: 'Build on the style established in Vol. 1 with more graphic elements and a tighter narrative structure.' },
      { step: 'Approach', text: 'Introduced animated lower thirds and chapter markers to guide the viewer through longer sections.' },
      { step: 'Tools', text: 'Premiere Pro; After Effects for enhanced motion graphics.' },
      { step: 'Output', text: 'A second edited video in the creator series.' },
    ],
  },
  {
    id: 'CC-3',
    title: 'Creator Edit — Vol. 3',
    discipline: 'editing',
    year: 2023,
    client: 'YouTube Creator',
    brief: 'Cinematic edit with a focus on colour storytelling and sound design to elevate production quality.',
    tools: ['Premiere Pro', 'After Effects'],
    type: 'video',
    videoId: 'NzTN-DGg5w4',
    process: [
      { step: 'Brief', text: 'Elevate the visual quality to match the creator\'s growing audience expectations.' },
      { step: 'Approach', text: 'Applied a cinematic colour grade with teal/orange contrast and layered the mix with subtle ambient sound design.' },
      { step: 'Tools', text: 'Premiere Pro;  for grade; After Effects for title sequences.' },
      { step: 'Output', text: 'An edited video with colour and sound work.' },
    ],
  },
  {
    id: 'CC-4',
    title: 'Creator Edit — Vol. 4',
    discipline: 'editing',
    year: 2023,
    client: 'YouTube Creator',
    brief: 'Final volume in the series — most technically complex with multi-camera sync, screen recordings, and graphic overlays.',
    tools: ['Premiere Pro', 'After Effects'],
    type: 'video',
    videoId: 'cWrGCm306fQ',
    process: [
      { step: 'Brief', text: 'Handle a multi-source project with tutorial footage, screen recordings, and talking head camera.' },
      { step: 'Approach', text: 'Synced multi-cam angles and used PiP layouts to show screen recordings alongside presenter footage.' },
      { step: 'Tools', text: 'Premiere Pro multi-cam sequence; After Effects for screen highlight animations.' },
      { step: 'Output', text: 'An edited tutorial-style video.' },
    ],
  },

  // ── Just For Hearts (Editing / Motion) ────────────────────────────────────
  {
    id: 'jfh-1',
    title: 'Just For Hearts — I',
    discipline: 'editing',
    year: 2023,
    client: 'Just For Hearts',
    brief: 'Video editing work associated with Just For Hearts. The subject and production credit for this upload need confirmation.',
    tools: ['Premiere Pro', 'After Effects', 'Lumetri'],
    type: 'video',
    videoId: 'dP5PDsgDT84',
  },
  {
    id: 'jfh-2',
    title: 'Just For Hearts — II',
    discipline: 'editing',
    year: 2023,
    client: 'Just For Hearts',
    brief: 'Video editing work associated with Just For Hearts. The subject and production credit for this upload need confirmation.',
    tools: ['Premiere Pro', 'Lumetri'],
    type: 'video',
    videoId: 'DuieK8O7juQ',
  },
  {
    id: 'jfh-3',
    title: 'Just For Hearts — III',
    discipline: 'editing',
    year: 2023,
    client: 'Just For Hearts',
    brief: 'Video editing work associated with Just For Hearts. The subject and production credit for this upload need confirmation.',
    tools: ['Premiere Pro', 'After Effects', 'Lumetri'],
    type: 'video',
    videoId: 'cJwCx3DMxBc',
  },
  {
    id: 'jfh-4',
    title: 'Just For Hearts — IV',
    discipline: 'editing',
    year: 2023,
    client: 'Just For Hearts',
    brief: 'Video editing work associated with Just For Hearts. The subject and production credit for this upload need confirmation.',
    tools: ['Premiere Pro', 'Lumetri'],
    type: 'video',
    videoId: 'tAlqek44y3Q',
  },

  // ── Sheffield Sports Med ───────────────────────────────────────────────────
  {
    id: 'ssm-1',
    title: 'Sports Med Promo #1',
    discipline: 'editing',
    year: 2023,
    client: 'Sheffield Sports Medicine',
    brief: 'Brand promo for a sports medicine clinic — clean, clinical aesthetic with dynamic athlete footage.',
    tools: ['Premiere Pro', 'After Effects'],
    type: 'video',
    videoId: 'vHW50uv6H4E',
    process: [
      { step: 'Brief', text: 'Communicate the clinic\'s credibility and professionalism to attract professional athlete clients.' },
      { step: 'Approach', text: 'Intercut clinical/white-space shots with performance footage to balance authority with energy.' },
      { step: 'Tools', text: 'Premiere Pro for edit; After Effects for animated lower thirds and logo sting.' },
      { step: 'Output', text: 'A promotional edit for Sheffield Sports Medicine.' },
    ],
  },
  {
    id: 'ssm-2',
    title: 'Sports Med Promo #2',
    discipline: 'editing',
    year: 2023,
    client: 'Sheffield Sports Medicine',
    brief: 'Follow-up promo focusing on the recovery and rehabilitation side of the clinic\'s services.',
    tools: ['Premiere Pro', 'After Effects'],
    type: 'video',
    videoId: 'ouuUTSgHs78',
  },

  // ── Wedding Invitations (Motion) ───────────────────────────────────────────
  {
    id: 'wedding-1',
    title: 'Animated Wedding Invite — I',
    discipline: 'editing',
    year: 2023,
    client: 'Private Client',
    brief: 'Digital animated wedding invitation with elegant typography animation and floral motifs, delivered as a video for sharing via WhatsApp and social.',
    tools: ['After Effects', 'Illustrator'],
    type: 'video',
    videoId: 'B2ELn4C15_w',
    process: [
      { step: 'Brief', text: 'Design and animate a digital wedding invitation that feels luxurious and personal.' },
      { step: 'Approach', text: 'Illustrated custom floral frame in Illustrator, then animated each element on sequentially with a handwritten title reveal.' },
      { step: 'Tools', text: 'Illustrator for all artwork; After Effects for the full animation and audio.' },
      { step: 'Result', text: 'Delivered in 1080p and 9:16 format for both desktop sharing and mobile Stories.' },
    ],
  },
  {
    id: 'wedding-2',
    title: 'Animated Wedding Invite — II',
    discipline: 'editing',
    year: 2023,
    client: 'Private Client',
    brief: 'Second animated invitation with a different aesthetic — modern, minimal, and set to a classical piano track.',
    tools: ['After Effects', 'Illustrator'],
    type: 'video',
    videoId: 'HRBuXzK7nB0',
  },

  // ── Travel & Documentary ───────────────────────────────────────────────────
  {
    id: 'travel-1',
    title: 'Travel Documentary — I',
    discipline: 'editing',
    year: 2022,
    brief: 'Short-form travel documentary edit showcasing a location through a personal narrative and atmospheric visuals.',
    tools: ['Premiere Pro', 'Lumetri', 'After Effects'],
    type: 'video',
    videoId: 'qSUIoV-E32Y',
    process: [
      { step: 'Brief', text: 'Produce a cinematic short travel film from self-shot footage.' },
      { step: 'Approach', text: 'Structured around a 3-act journey arc — arrival, exploration, reflection — with voiceover-driven narration.' },
      { step: 'Tools', text: 'Premiere Pro for the edit;  for a desaturated, filmic look; After Effects for title cards.' },
      { step: 'Result', text: 'Personal project that sharpened my documentary storytelling and colour grading skills.' },
    ],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    company: 'Freelance',
    role: 'Motion Designer & Video Editor',
    period: 'Jan 2024 – Present',
    location: 'Remote',
    description: [
      'Delivered architectural visualisation projects for UK-based clients using Blender and Houdini.',
      'Collaborated with YouTube creators on long-form and short-form video production.',
      'Provided end-to-end video post-production from assembly cut to final delivery.',
    ],
  },
  {
    company: 'Kingbee Animation',
    role: 'Junior Motion Graphics Designer & Video Editor',
    period: 'Sep 2022 – Sep 2023',
    location: 'London, United Kingdom',
    description: [
      'Created 2D logo animations for Music Mind Matters.',
      'Composited 2D animations for an album by singer Christina Perri.',
      'Delivered projects using After Effects, Premiere Pro, and Nuke under studio deadlines.',
    ],
  },
  {
    company: 'StudioB',
    role: 'Compositing — Work Experience',
    period: 'Jan 2024 - Feb 2024',
    location: 'London, United Kingdom',
    description: [
      'One-month placement at a leading UK VFX studio.',
      'Executed compositing, roto, and paint tasks under tight broadcast deadlines.',
      'Gained hands-on experience with studio-grade Nuke pipelines.',
    ],
  },
  {
    company: 'Just For Hearts',
    role: 'YouTube Video Editor',
    period: '2020 – 2021',
    location: 'Pune',
    description: [
      'Edited long-form healthcare content from raw footage — assembly cut through final delivery.',
      'Handled audio cleanup, music selection, and colour correction for a consistent channel look.',
      'Designed motion graphics and lower thirds in After Effects to complement on-screen information.',
      'Cut short-form social media clips and reels from long-form episodes for multi-platform distribution.',
    ],
  },
];

export const SKILLS_DATA: Skill[] = [
  { name: 'Foundry Nuke', category: 'compositing', primary: true },
  { name: 'Silhouette', category: 'compositing' },
  { name: 'Houdini', category: '3d', primary: true },
  { name: 'Blender', category: '3d' },
  { name: 'After Effects', category: 'editing', primary: true },
  { name: 'Premiere Pro', category: 'editing', primary: true },
  { name: 'Adobe Photoshop', category: 'design', primary: true },
  { name: 'Adobe Illustrator', category: 'design' },
  { name: 'Figma', category: 'design' },
];

export const LANGUAGES_DATA: string[] = ['Hindi', 'English', 'Spanish', 'Marathi'];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Email',
    href: 'mailto:adityanaik817@gmail.com',
    icon: Mail,
    value: 'adityanaik817@gmail.com',
  },
  {
    label: 'Phone',
    href: 'tel:+919762659846',
    icon: Phone,
    value: '+91 9762659846',
  },
  {
    label: 'Vimeo',
    href: 'https://vimeo.com/793647723',
    icon: Video,
    value: 'vimeo.com/793647723',
  },
];

// Legacy shape used by old components — kept so nothing breaks before migration
export const PROJECTS_DATA = PROJECTS.reduce<{ title: string; projects: Project[] }[]>(
  (acc, project) => {
    const existing = acc.find(c => c.title === project.discipline);
    if (existing) existing.projects.push(project);
    else acc.push({ title: project.discipline, projects: [project] });
    return acc;
  },
  []
);
