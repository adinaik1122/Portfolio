import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Discipline, DISCIPLINE_LABELS, Project } from '../types';
import ProjectModal from '../components/ProjectModal';
import YTThumbnail from '../components/YTThumbnail';
import { usePageMeta } from '../hooks/usePageMeta';

const DISCIPLINE_META: Record<Discipline, {
  num: string;
  description: string;
  tools: string[];
  process: { step: string; text: string }[];
}> = {
  vfx: {
    num: '03',
    description: 'Trained in Nuke at Bournemouth University and refined through studio work at Kingbee Animation and StudioB. I handle the full compositing pipeline — prep, keying, roto, CG integration, and final grade — for broadcast and digital productions.',
    tools: ['Nuke', 'Silhouette', 'After Effects', 'Photoshop'],
    process: [
      { step: 'Prep', text: 'Break down the brief, analyse plates, and establish comp requirements.' },
      { step: 'Key & Roto', text: 'Frame-accurate roto and clean keying to isolate elements from background.' },
      { step: 'Composite', text: 'Integrate CG passes, colour-match to plate, and build final comp in Nuke.' },
      { step: 'Deliver', text: 'Grade, review with client, and export to broadcast specification.' },
    ],
  },
  motion: {
    num: '02',
    description: 'From logo reveals to full title sequences, I design and animate brand assets that move with intent. Every timing decision is deliberate; every keyframe has a purpose.',
    tools: ['After Effects', 'Illustrator', 'Premiere Pro'],
    process: [
      { step: 'Brief', text: 'Understand the brand tone, target audience, and delivery format.' },
      { step: 'Design', text: 'Create static frames and style boards to lock look before animating.' },
      { step: 'Animate', text: 'Build in After Effects with frame-accurate timing and easing.' },
      { step: 'Deliver', text: 'Export to required codec, resolution, and platform specification.' },
    ],
  },
  editing: {
    num: '01',
    description: "Editing is where story is made. Whether it's a 30-minute YouTube documentary or a 60-second social reel, I shape raw footage into something that holds attention from first frame to last.",
    tools: ['Premiere Pro', 'Lumetri', 'After Effects'],
    process: [
      { step: 'Assemble', text: 'Ingest raw footage, sync audio, and build a rough selects cut.' },
      { step: 'Structure', text: 'Shape narrative, pacing, and music to guide the viewer.' },
      { step: 'Finish', text: 'Colour grade, audio clean, and add motion graphics where needed.' },
      { step: 'Deliver', text: 'Export in required formats for YouTube, Instagram, or broadcast.' },
    ],
  },
  branding: {
    num: '02',
    description: 'Brand identities and packaging covering logo design, typography, colour systems, labels, and product presentation. Built to work across digital and print.',
    tools: ['CorelDRAW', 'Illustrator', 'Photoshop'],
    process: [
      { step: 'Discovery', text: 'Research the brand landscape and define tone, values, and visual direction.' },
      { step: 'Concept', text: 'Develop logo concepts and mark exploration across multiple directions.' },
      { step: 'Refine', text: 'Refine the identity and extend it across packaging layouts and mockups.' },
      { step: 'Deliver', text: 'Package all assets in print and digital formats for immediate use.' },
    ],
  },
  design: {
    num: '05',
    description: 'Graphic design for digital-first brands — social media assets, UI layouts, print, and visual systems that carry a consistent tone across every touchpoint.',
    tools: ['Figma', 'Illustrator', 'Photoshop'],
    process: [
      { step: 'Brief', text: 'Define the design goal, audience, and format requirements.' },
      { step: 'Concept', text: 'Explore visual language options and sketch directions.' },
      { step: 'Design', text: 'Develop chosen direction to full production quality.' },
      { step: 'Deliver', text: 'Export in all required formats — web, print, and social.' },
    ],
  },
  visualization: {
    num: '06',
    description: 'Photorealistic architectural visualisation using Blender and Houdini. I build, light, and render environments that help clients see a space before it exists.',
    tools: ['Blender', 'Houdini', 'Photoshop'],
    process: [
      { step: 'Model', text: 'Build or import architectural geometry and set up scene scale.' },
      { step: 'Light', text: 'Set up HDRI and area lighting to simulate real-world conditions.' },
      { step: 'Render', text: 'Path-trace render for photorealistic output.' },
      { step: 'Composite', text: 'Post-process in Photoshop to add atmosphere and fine details.' },
    ],
  },
};


function WorkCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label={`View project: ${project.title}`} className="group min-w-0 w-full text-left border border-neutral-800 bg-neutral-900">
      <div className={`relative overflow-hidden ${project.type === 'image' ? 'aspect-[4/3] bg-neutral-100' : 'aspect-video bg-neutral-800'}`}>
        {project.type === 'image' ? <img src={project.images?.[0]} alt={project.imageCaptions?.[0] ?? project.title} loading="lazy" className="w-full h-full object-contain" />
          : project.type === 'video' && project.videoId ? <YTThumbnail videoId={project.videoId} className="w-full h-full object-cover" />
          : <div className="h-full flex items-center justify-center p-8 bg-[#292333]"><p className="font-serif text-3xl text-white text-center">{project.title}</p></div>}
        {project.type !== 'image' && <span className="absolute bottom-4 right-4 p-3 bg-white text-neutral-900 rounded-full"><Play size={18} aria-hidden="true" /></span>}
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-[11px] uppercase tracking-[0.15em] text-neutral-400 mb-3">{project.client ?? DISCIPLINE_LABELS[project.discipline]} · {project.year}</p>
        <h2 className="font-serif text-2xl text-white group-hover:underline underline-offset-4">{project.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-400 line-clamp-2">{project.brief}</p>
        <p className="mt-5 text-xs text-neutral-300">{project.type === 'image' ? 'View project' : project.type === 'playlist' ? 'Watch playlist' : 'Watch video'} &rarr;</p>
      </div>
    </button>
  );
}

export default function DisciplinePage() {
  const { discipline, id } = useParams<{ discipline: string; id?: string }>();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const disc = discipline as Discipline;
  const meta = DISCIPLINE_META[disc];
  const projects = PROJECTS.filter(p => p.discipline === disc);
  const modalProject = projects.find(p => p.id === id);
  usePageMeta(
    `${modalProject?.title ?? DISCIPLINE_LABELS[disc] ?? 'Work'} | Aditya Naik`,
    modalProject?.brief ?? `Explore ${DISCIPLINE_LABELS[disc] ?? 'selected'} projects by Aditya Naik.`,
    id && modalProject ? `/work/${disc}/${id}` : `/work/${disc}`,
  );
  const visible = showAll ? projects : projects.slice(0, 6);
  useEffect(() => {
    if (disc === 'motion') navigate(`/work/editing${id ? '/' + id : ''}`, { replace: true });
    else if (!['editing', 'branding', 'vfx'].includes(disc)) navigate('/work', { replace: true });
  }, [disc, id, navigate]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [disc]);
  if (!meta) return null;
  const openProject = (project: Project) => navigate(`/work/${disc}/${project.id}`);
  return (
    <div className="min-h-screen bg-neutral-950 pt-24 text-white">
      <header className="px-8 md:px-12 lg:px-20 pt-5 pb-10 border-b border-neutral-800">
        <Link to="/work" className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white mb-8"><ArrowLeft size={14} />All work</Link>
        <p className="text-xs text-[#C4922A] mb-3">{meta.num}</p>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl mb-5">{DISCIPLINE_LABELS[disc]}</h1>
        <p className="text-neutral-300 text-base md:text-lg leading-relaxed max-w-2xl">{meta.description}</p>
      </header>
      <section className="px-8 md:px-12 lg:px-20 py-10 md:py-12" aria-label="Projects">
        <div className="flex justify-between gap-4 text-xs text-neutral-400 mb-7"><p>Projects</p><p>{projects.length} projects</p></div>
        {id && !modalProject && <p role="status" className="mb-6 text-neutral-300">This project could not be found. Browse the collection below.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visible.map(project => <WorkCard key={project.id} project={project} onClick={() => openProject(project)} />)}
        </div>
        {!projects.length && <p className="text-neutral-400 py-12">Projects coming soon.</p>}
        {projects.length > 6 && <button type="button" onClick={() => setShowAll(v => !v)} aria-expanded={showAll} className="mt-8 px-6 py-3 border border-neutral-600 text-sm hover:bg-neutral-800">{showAll ? 'Show fewer projects' : `View all ${projects.length} projects`}</button>}
      </section>
      <div className="px-8 md:px-12 lg:px-20 py-10 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-5">
        <p className="font-serif text-2xl">Have a project in mind?</p><Link to="/#contact" className="inline-flex items-center gap-3 text-sm text-neutral-300">Let's talk <ArrowRight size={16} /></Link>
      </div>
      <AnimatePresence>{modalProject && <ProjectModal project={modalProject} onClose={() => navigate(`/work/${disc}`, { replace: true })} onNavigate={project => navigate(`/work/${disc}/${project.id}`, { replace: true })} />}</AnimatePresence>
    </div>
  );
}
