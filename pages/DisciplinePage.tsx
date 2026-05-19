import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Discipline, DISCIPLINE_LABELS, Project } from '../types';
import ProjectModal from '../components/ProjectModal';
import YTThumbnail from '../components/YTThumbnail';

// ── Discipline metadata ────────────────────────────────────────────────────────
const DISCIPLINE_META: Record<Discipline, {
  num: string;
  description: string;
  tools: string[];
  process: { step: string; text: string }[];
}> = {
  vfx: {
    num: '01',
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
    num: '03',
    description: "Editing is where story is made. Whether it's a 30-minute YouTube documentary or a 60-second social reel, I shape raw footage into something that holds attention from first frame to last.",
    tools: ['Premiere Pro', '', 'After Effects'],
    process: [
      { step: 'Assemble', text: 'Ingest raw footage, sync audio, and build a rough selects cut.' },
      { step: 'Structure', text: 'Shape narrative, pacing, and music to guide the viewer.' },
      { step: 'Finish', text: 'Colour grade, audio clean, and add motion graphics where needed.' },
      { step: 'Deliver', text: 'Export in required formats for YouTube, Instagram, or broadcast.' },
    ],
  },
  branding: {
    num: '04',
    description: 'Visual identity work covering logo design, type systems, and motion brand packages. Built to work across digital and print, static and animated.',
    tools: ['Illustrator', 'Photoshop', 'After Effects'],
    process: [
      { step: 'Discovery', text: 'Research the brand landscape and define tone, values, and visual direction.' },
      { step: 'Concept', text: 'Develop logo concepts and mark exploration across multiple directions.' },
      { step: 'Refine', text: 'Iterate on chosen direction and build the full identity system.' },
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

// ── Helpers ────────────────────────────────────────────────────────────────────
function getThumbnail(project: Project): string | null {
  if ((project.type === 'video' || project.type === 'playlist') && project.videoId)
    return `https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`;
  if (project.images?.[0]) return project.images[0];
  return null;
}

// ── Carousel card ─────────────────────────────────────────────────────────────
function WorkCard({ project, index, onClick }: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const thumb = getThumbnail(project);

  return (
    <motion.div
      data-card
      role="button"
      tabIndex={0}
      aria-label={`View project: ${project.title}`}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.06, 0.25) }}
      className="group relative flex-shrink-0 overflow-hidden bg-neutral-900 cursor-pointer"
      style={{ width: 'min(640px, 80vw)' }}
      onClick={onClick}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      <div className="w-full aspect-video">
        {(project.type === 'video' || project.type === 'playlist') && project.videoId ? (
          <YTThumbnail
            videoId={project.videoId}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : thumb ? (
          <img
            src={thumb}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-950" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

        {/* Meta — top */}
        <div className="absolute top-4 left-5 right-5 z-10 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
            {project.client ?? project.discipline}
          </span>
          <span className="font-mono text-[9px] text-white/30">{project.year}</span>
        </div>

        {/* Title — bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-12 z-10">
          <h3 className="font-serif text-white font-medium text-lg sm:text-xl leading-tight">
            {project.title}
          </h3>
          {project.brief && (
            <p className="text-white/55 text-xs mt-1.5 line-clamp-1 leading-relaxed">
              {project.brief}
            </p>
          )}
        </div>

        {/* Gold sweep */}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out z-20"
          style={{ background: '#C4922A' }}
        />

        {/* VIEW pill */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white border border-white/40 px-5 py-2 bg-black/30 backdrop-blur-sm">
            View
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DisciplinePage() {
  const { discipline, id } = useParams<{ discipline: string; id?: string }>();
  const navigate = useNavigate();

  const disc     = discipline as Discipline;
  const meta     = DISCIPLINE_META[disc];
  const projects = PROJECTS.filter(p => p.discipline === disc);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Modal uses local state — no route change on open/close (prevents white flash)
  const [modalProject, setModalProject] = useState<Project | null>(() =>
    id ? projects.find(p => p.id === id) ?? null : null
  );

  const openProject = useCallback((project: Project) => {
    setModalProject(project);
    window.history.replaceState(null, '', `/work/${disc}/${project.id}`);
  }, [disc]);

  const closeModal = useCallback(() => {
    setModalProject(null);
    window.history.replaceState(null, '', `/work/${disc}`);
  }, [disc]);

  useEffect(() => {
    if (!meta) navigate('/work', { replace: true });
  }, [meta, navigate]);

  if (!meta) return null;

  return (
    <div className="min-h-screen bg-neutral-950 pt-16">

      {/* Back */}
      <div className="px-8 md:px-12 lg:px-20 pt-8">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-600 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={11} />
          All Work
        </Link>
      </div>

      {/* Discipline hero */}
      <div className="px-8 md:px-12 lg:px-20 pt-8 pb-10 border-b border-neutral-800">
        <span className="font-mono text-[11px] block mb-3" style={{ color: '#C4922A' }}>
          {meta.num}
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white mb-5 leading-none">
          {DISCIPLINE_LABELS[disc]}
        </h1>
        <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-2xl mb-7">
          {meta.description}
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">Tools</span>
          <span className="w-4 h-px bg-neutral-800" />
          {meta.tools.map(t => (
            <span
              key={t}
              className="text-[10px] uppercase tracking-[0.12em] text-neutral-500 border border-neutral-800 px-2.5 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Projects carousel ────────────────────────────────────────────── */}
      <div className="py-10 md:py-12">

        <div className="px-8 md:px-12 lg:px-20 mb-6">
          <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-600">Projects</p>
        </div>

        {projects.length > 0 ? (
          <div className="relative">
            {/*
              Two-container pattern:
              outer = scroll viewport (overflow-x, no padding)
              inner = flex row with padding at natural (max-content) width
              This prevents the browser bug where padding on a flex overflow
              container collapses the scrollable area.
            */}
            <div
              ref={scrollRef}
              className="overflow-x-scroll scrollbar-hide"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              } as React.CSSProperties}
            >
              <div className="inline-flex gap-6 px-8 md:px-12 lg:px-20">
                {projects.map((project, i) => (
                  <WorkCard
                    key={project.id}
                    project={project}
                    index={i}
                    onClick={() => openProject(project)}
                  />
                ))}
                <div className="flex-shrink-0 w-4" aria-hidden />
              </div>
            </div>
            <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-neutral-950 to-transparent" />
          </div>
        ) : (
          <div className="px-8 md:px-12 lg:px-20 py-24 text-center text-neutral-700 text-sm uppercase tracking-widest">
            Projects coming soon
          </div>
        )}
      </div>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <div className="px-8 md:px-12 lg:px-20 py-10 md:py-14 border-t border-neutral-800">
        <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-600 mb-8">Process</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {meta.process.map((s, i) => (
            <div key={s.step}>
              <span className="font-mono text-[10px] block mb-2" style={{ color: '#C4922A' }}>
                0{i + 1}
              </span>
              <p className="text-white text-sm font-medium mb-2">{s.step}</p>
              <p className="text-neutral-600 text-xs leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalProject && (
          <ProjectModal project={modalProject} onClose={closeModal} onNavigate={setModalProject} />
        )}
      </AnimatePresence>
    </div>
  );
}
