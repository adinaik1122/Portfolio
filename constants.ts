import { Project, ExperienceItem, Skill } from './types';
import { SocialLink } from './types/components';
import { Mail, Phone, Video } from 'lucide-react';

export const HERO_DATA = {
  name: "Aditya Naik",
  title: "Digital Artist · Motion Graphics · VFX",
  tagline: "Crafting visual stories through motion, compositing, and design.",
};

export const PROJECTS: Project[] = [
  // ── VFX & Compositing ─────────────────────────────────────────────────────
  {
    id: 'comp-1',
    title: 'VFX Compositing Showreel',
    discipline: 'vfx',
    year: 2024,
    client: 'Kingbee Animation',
    brief: 'A curated showreel of compositing work spanning 2D/3D integration, roto, paint, and visual effects produced during my time at Kingbee Animation.',
    tools: ['Nuke', 'After Effects', 'Silhouette', 'Photoshop'],
    type: 'video',
    videoId: 'wWRJXqXTBLc',
    featured: true,
    process: [
      { step: 'Brief', text: 'Compile a representative selection of compositing work from client projects into a single polished reel.' },
      { step: 'Approach', text: 'Sequenced shots by complexity — building from clean keying and roto work to full CG integration — to demonstrate range.' },
      { step: 'Tools', text: 'Primary compositing in Nuke; roto and paint in Silhouette; finishing and grade in After Effects.' },
      { step: 'Result', text: 'A 90-second reel showcasing work delivered for Kingbee Animation and StudioB clients.' },
    ],
  },

  // ── Motion Graphics ────────────────────────────────────────────────────────
  {
    id: 'mg-1',
    title: 'Motion Graphics Reel',
    discipline: 'motion',
    year: 2024,
    client: 'Various',
    brief: 'Highlights from motion graphics projects including logo animations, title sequences, and animated brand assets.',
    tools: ['After Effects', 'Illustrator', 'Premiere Pro'],
    type: 'video',
    videoId: 'tg03Igge8qg',
    featured: true,
    process: [
      { step: 'Brief', text: 'Showcase the breadth of motion graphics work across multiple clients and styles.' },
      { step: 'Approach', text: 'Mixed kinetic typography, logo animation, and 2D character motion to demonstrate versatility.' },
      { step: 'Tools', text: 'After Effects for all motion; Illustrator for vector assets; Premiere Pro for final edit and mix.' },
      { step: 'Result', text: 'A 60-second reel used for freelance pitches and job applications.' },
    ],
  },
  {
    id: 'mg-2',
    title: 'Christina Perri — Lullaby Album',
    discipline: 'motion',
    year: 2024,
    client: 'Christina Perri / Kingbee Animation',
    brief: 'Video editing and motion animation for a lullaby album created by singer Christina Perri as a gift for her daughter\'s first birthday. Edited 8–9 songs across the album; character design and environment artwork were contributed by other artists at Kingbee Animation.',
    tools: ['After Effects', 'Premiere Pro', 'Illustrator'],
    type: 'playlist',
    videoId: 'PLLpHUxGA-WgZlUoCAj8tVJxFy_n5OBwCl',
    process: [
      { step: 'Brief', text: 'Produce video content for a full lullaby album by Christina Perri, intended as a heartfelt birthday gift for her daughter. Each song required its own edited video with matching motion animation.' },
      { step: 'Approach', text: 'Edited 8–9 individual song videos from raw footage and assets, maintaining a consistent visual language across the album. Collaborated closely with other Kingbee artists handling character animation and environment design.' },
      { step: 'Tools', text: 'Premiere Pro for video editing and assembly; After Effects for motion animation, compositing, and transitions; Illustrator for supplementary graphic assets.' },
      { step: 'Result', text: 'A complete album of lullaby videos delivered through Kingbee Animation for Christina Perri — a personal project with a meaningful creative brief and a tight collaborative production pipeline.' },
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
      { step: 'Result', text: 'Delivered on a 48-hour turnaround; video achieved above-average retention for the channel.' },
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
      { step: 'Result', text: 'Consistent with the creator\'s brand identity, delivered within the agreed timeline.' },
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
      { step: 'Result', text: 'Noticeable uplift in comments referencing video quality.' },
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
      { step: 'Result', text: 'Clean, professional tutorial-style video delivered across all platforms.' },
    ],
  },

  // ── Just For Hearts (Editing / Motion) ────────────────────────────────────
  {
    id: 'jfh-1',
    title: 'Just For Hearts — I',
    discipline: 'editing',
    year: 2023,
    client: 'Just For Hearts',
    brief: 'Emotional wedding highlight film with cinematic colour and music-driven editing for a UK-based wedding videography brand.',
    tools: ['Premiere Pro', 'After Effects', ''],
    type: 'video',
    videoId: 'dP5PDsgDT84',
    process: [
      { step: 'Brief', text: 'Create a highlight film that captures the emotion of the day within a 3–5 minute deliverable.' },
      { step: 'Approach', text: 'Led with the ceremony audio — vows, reactions — and built the cut around the emotional arc of the music.' },
      { step: 'Tools', text: 'Premiere Pro for the edit;  for the warm, filmic grade.' },
      { step: 'Result', text: 'Delivered to the client within 2 weeks; used as a showcase piece by Just For Hearts.' },
    ],
  },
  {
    id: 'jfh-2',
    title: 'Just For Hearts — II',
    discipline: 'editing',
    year: 2023,
    client: 'Just For Hearts',
    brief: 'Second highlight film exploring a more documentary-style approach with natural audio and minimal music.',
    tools: ['Premiere Pro', ''],
    type: 'video',
    videoId: 'DuieK8O7juQ',
  },
  {
    id: 'jfh-3',
    title: 'Just For Hearts — III',
    discipline: 'editing',
    year: 2023,
    client: 'Just For Hearts',
    brief: 'Highlight film with extended reception coverage and first-dance choreography cut to music.',
    tools: ['Premiere Pro', 'After Effects', ''],
    type: 'video',
    videoId: 'cJwCx3DMxBc',
  },
  {
    id: 'jfh-4',
    title: 'Just For Hearts — IV',
    discipline: 'editing',
    year: 2023,
    client: 'Just For Hearts',
    brief: 'Destination wedding film with travel footage and venue establishing shots woven into the narrative.',
    tools: ['Premiere Pro', ''],
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
      { step: 'Result', text: 'Used across the clinic\'s social media and website.' },
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
    discipline: 'motion',
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
    discipline: 'motion',
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
    tools: ['Premiere Pro', '', 'After Effects'],
    type: 'video',
    videoId: 'qSUIoV-E32Y',
    process: [
      { step: 'Brief', text: 'Produce a cinematic short travel film from self-shot footage.' },
      { step: 'Approach', text: 'Structured around a 3-act journey arc — arrival, exploration, reflection — with voiceover-driven narration.' },
      { step: 'Tools', text: 'Premiere Pro for the edit;  for a desaturated, filmic look; After Effects for title cards.' },
      { step: 'Result', text: 'Personal project that sharpened my documentary storytelling and colour grading skills.' },
    ],
  },
  {
    id: 'travel-2',
    title: 'Travel Documentary — II',
    discipline: 'editing',
    year: 2022,
    brief: 'Second travel short with a focus on time-lapse sequences and ambient sound design.',
    tools: ['Premiere Pro', ''],
    type: 'video',
    videoId: '5GA_6uRFdIM',
  },

  // ── Personal ──────────────────────────────────────────────────────────────
  {
    id: 'personal-1',
    title: 'BELIEVER | Captain America Version',
    discipline: 'editing',
    year: 2022,
    brief: 'Personal passion project exploring experimental editing techniques — non-linear structure, jump cuts, and abstract visual metaphors.',
    tools: ['Premiere Pro', 'After Effects'],
    type: 'video',
    videoId: 'bxhsznQp8HQ',
    process: [
      { step: 'Brief', text: 'A self-directed project to experiment with non-conventional narrative structure.' },
      { step: 'Approach', text: 'Loosely structured around a central visual motif; used intentional jump cuts and colour contrast to create disorientation.' },
      { step: 'Tools', text: 'Premiere Pro; After Effects for glitch effects and texture overlays.' },
      { step: 'Result', text: 'A piece outside client work that pushed my creative boundaries.' },
    ],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    company: 'Freelance',
    role: 'Video Editor · Architectural Visualisation · Motion Graphics',
    period: 'Jan 2021 – Present',
    location: 'Remote',
    description: [
      'Delivered architectural visualisation projects for UK-based clients using Blender and Houdini.',
      'Collaborated with YouTube creators on long-form and short-form video production.',
      'Provided end-to-end video post-production from assembly cut to final delivery.',
    ],
  },
  {
    company: 'Kingbee Animation',
    role: 'Jr. Motion Graphics Designer · Compositor · Video Editor',
    period: 'Aug 2023 – Aug 2024',
    location: 'Elstree & Borehamwood, United Kingdom',
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
    period: 'Jan 2020 – Sep 2021',
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
