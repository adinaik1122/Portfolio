import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Discipline, DISCIPLINE_LABELS, Project } from '../types';
import ProjectModal from '../components/ProjectModal';
import YTThumbnail from '../components/YTThumbnail';

const FILTERS: { label: string; value: 'all' | Discipline }[] = [
  { label: 'All',              value: 'all' },
  { label: 'VFX & Compositing', value: 'vfx' },
  { label: 'Motion Graphics',  value: 'motion' },
  { label: 'Video Editing',    value: 'editing' },
  { label: 'Branding',         value: 'branding' },
  { label: 'Design',           value: 'design' },
  { label: 'Arch Viz',         value: 'visualization' },
];

function getThumbnail(project: Project): string | null {
  if ((project.type === 'video' || project.type === 'playlist') && project.videoId)
    return `https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`;
  if (project.images?.[0]) return project.images[0];
  return null;
}

// ── Card ─────────────────────────────────────────────────────────────────────
// Layout pattern (desktop 3-col):
//   index % 5 === 0  →  spans 2 cols, cinematic (21:9)
//   otherwise        →  spans 1 col,  standard  (16:9)
// On tablet (2-col) and mobile (1-col) every card is 16:9

interface WorkCardProps {
  project: Project;
  index: number;
  isFeatured: boolean;
  onClick: () => void;
}

function WorkCard({ project, index, isFeatured, onClick }: WorkCardProps) {
  const thumb = getThumbnail(project);

  return (
    <motion.div
      layout
      role="button"
      tabIndex={0}
      aria-label={`View project: ${project.title}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
      className={`group relative overflow-hidden bg-neutral-900 cursor-pointer rounded-sm ${
        isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''
      }`}
      onClick={onClick}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      {/* aspect-ratio container */}
      <div
        className={`w-full ${
          isFeatured
            ? 'aspect-video sm:aspect-[21/9]'
            : 'aspect-video'
        }`}
      >
        {/* Thumbnail */}
        {(project.type === 'video' || project.type === 'playlist') && project.videoId ? (
          <YTThumbnail
            videoId={project.videoId}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : thumb ? (
          <img
            src={thumb}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-950" />
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />

        {/* Discipline tag — top left */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-white/70 px-2 py-1 border border-white/20 bg-black/40 backdrop-blur-sm">
            {DISCIPLINE_LABELS[project.discipline]}
          </span>
        </div>

        {/* Year — top right */}
        <div className="absolute top-3 right-3 z-10">
          <span className="font-mono text-[9px] sm:text-[10px] text-white/40">{project.year}</span>
        </div>

        {/* Title + client — bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-4 sm:px-5 sm:py-5 z-10">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.12em] text-white/50 mb-0.5 truncate">
            {project.client ?? project.discipline}
          </p>
          <h3 className={`font-serif text-white font-medium leading-tight ${
            isFeatured ? 'text-base sm:text-xl lg:text-2xl' : 'text-sm sm:text-base lg:text-lg'
          }`}>
            {project.title}
          </h3>
        </div>

        {/* Hover: VIEW pill */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white
                           border border-white/50 px-4 py-2 bg-black/30 backdrop-blur-sm">
            View
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function WorkPage() {
  const { id }           = useParams<{ id?: string }>();
  const navigate         = useNavigate();
  const [searchParams]   = useSearchParams();
  const [active, setActive] = useState<'all' | Discipline>('all');

  // Honour ?filter=vfx from discipline tile links on landing page
  useEffect(() => {
    const f = searchParams.get('filter') as Discipline | null;
    const valid = f && Object.keys(DISCIPLINE_LABELS).includes(f);
    setActive(valid ? (f as Discipline) : 'all');
  }, [searchParams]);

  const filtered = active === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.discipline === active);

  const openProject = useCallback(
    (project: Project) => navigate(`/work/${project.id}`),
    [navigate]
  );
  const closeModal = useCallback(
    () => navigate('/work', { replace: true }),
    [navigate]
  );

  const modalProject = id ? PROJECTS.find(p => p.id === id) ?? null : null;

  return (
    <div className="min-h-screen bg-neutral-950 pt-16">

      {/* ── Header ── */}
      <div className="px-8 md:px-12 lg:px-20 pt-10 pb-6">
        <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-500 mb-3">
          Motion · VFX · Compositing
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-1">
          Selected Works
        </h1>
        <p className="text-neutral-600 text-sm">
          {PROJECTS.length} projects · {Object.keys(DISCIPLINE_LABELS).length} disciplines
        </p>
      </div>

      {/* ── Filter bar ── */}
      <div className="sticky top-16 z-30 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
        <div className="px-8 md:px-12 lg:px-20">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-3">
            {FILTERS.map(f => {
              const count = f.value === 'all'
                ? PROJECTS.length
                : PROJECTS.filter(p => p.discipline === f.value).length;
              return (
                <button
                  key={f.value}
                  onClick={() => setActive(f.value)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-[10px] sm:text-[11px]
                              uppercase tracking-[0.12em] transition-all duration-200 rounded-full border ${
                    active === f.value
                      ? 'bg-white text-neutral-900 border-white'
                      : 'text-neutral-500 border-neutral-700 hover:border-neutral-400 hover:text-white'
                  }`}
                >
                  {f.label}
                  <span className={`text-[9px] font-mono tabular-nums ${
                    active === f.value ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="px-8 md:px-12 lg:px-20 py-6 sm:py-8">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => {
                  const isFeatured = i % 5 === 0;
                  return (
                    <WorkCard
                      key={project.id}
                      project={project}
                      index={i}
                      isFeatured={isFeatured}
                      onClick={() => openProject(project)}
                    />
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-32 text-center text-neutral-600 text-sm uppercase tracking-widest"
            >
              No projects in this discipline yet — check back soon
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Project modal ── */}
      <AnimatePresence>
        {modalProject && (
          <ProjectModal project={modalProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
}
