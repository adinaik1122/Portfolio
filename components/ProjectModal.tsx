import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { Project, DISCIPLINE_LABELS } from '../types';
import { PROJECTS } from '../constants';
import { useNavigate } from 'react-router-dom';

function MediaEmbed({ project }: { project: Project }) {
  if (project.type === 'playlist' && project.videoId) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/videoseries?list=${project.videoId.trim()}&rel=0&modestbranding=1&autoplay=1`}
        title={project.title}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  if (project.type === 'video' && project.videoId) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${project.videoId.trim()}?rel=0&modestbranding=1&autoplay=1`}
        title={project.title}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  if (project.images?.[0]) {
    return (
      <img
        src={project.images[0]}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }
  return (
    <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-500 text-sm">
      No media
    </div>
  );
}

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const navigate = useNavigate();
  const idx         = PROJECTS.findIndex(p => p.id === project.id);
  const prevProject = idx > 0 ? PROJECTS[idx - 1] : null;
  const nextProject = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null;

  const goTo = useCallback(
    (p: Project) => navigate(`/work/${p.id}`, { replace: true }),
    [navigate]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft'  && prevProject) goTo(prevProject);
      if (e.key === 'ArrowRight' && nextProject) goTo(nextProject);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, prevProject, nextProject, goTo]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    /* Backdrop */
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-8"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Sheet — slides up on mobile, scales in on desktop */}
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-white w-full sm:rounded-xl overflow-hidden shadow-2xl
                   max-h-[92dvh] sm:max-h-[90vh] flex flex-col
                   sm:max-w-2xl md:max-w-4xl lg:max-w-5xl sm:mx-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle (mobile) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-neutral-300" />
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 overscroll-contain">

          {/* Video / Image */}
          <div className="relative w-full bg-neutral-950 flex-shrink-0" style={{ paddingBottom: '56.25%' }}>
            <MediaEmbed project={project} />
            {/* Close — always visible */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50
                         hover:bg-black/80 flex items-center justify-center text-white
                         transition-colors"
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </div>

          {/* Meta + content */}
          <div className="flex flex-col md:flex-row">

            {/* Sidebar */}
            <div className="md:w-52 lg:w-60 flex-shrink-0 bg-neutral-50 border-b md:border-b-0 md:border-r border-neutral-100
                            px-5 py-5 flex flex-row flex-wrap md:flex-col gap-5 md:gap-6">
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-0.5">Discipline</p>
                <p className="text-sm font-medium text-neutral-900">{DISCIPLINE_LABELS[project.discipline]}</p>
              </div>
              {project.client && (
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-0.5">Client</p>
                  <p className="text-sm font-medium text-neutral-900">{project.client}</p>
                </div>
              )}
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-0.5">Year</p>
                <p className="text-sm font-medium text-neutral-900">{project.year}</p>
              </div>
              {project.tools.length > 0 && (
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-1.5">Tools</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tools.map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 bg-neutral-200 text-neutral-700 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main */}
            <div className="flex-1 px-5 py-5 sm:px-6 sm:py-6">
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900 mb-3">
                {project.title}
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
                {project.brief}
              </p>

              {project.process && project.process.length > 0 && (
                <div className="space-y-4">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 border-b border-neutral-100 pb-2">
                    Process
                  </p>
                  {project.process.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-neutral-900 text-white
                                      text-[9px] sm:text-[10px] flex items-center justify-center font-mono mt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.1em] text-neutral-500 mb-0.5">{step.step}</p>
                        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Prev / Next */}
          <div className="border-t border-neutral-100 grid grid-cols-2">
            {prevProject ? (
              <button
                onClick={() => goTo(prevProject)}
                className="flex items-center gap-2 sm:gap-3 p-4 sm:p-5 hover:bg-neutral-50
                           transition-colors text-left group"
              >
                <ArrowLeft size={14} className="text-neutral-400 group-hover:text-neutral-900 transition-colors flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-[0.12em] text-neutral-400">Prev</p>
                  <p className="text-xs sm:text-sm font-medium text-neutral-900 truncate">{prevProject.title}</p>
                </div>
              </button>
            ) : <div />}

            {nextProject ? (
              <button
                onClick={() => goTo(nextProject)}
                className="flex items-center gap-2 sm:gap-3 p-4 sm:p-5 hover:bg-neutral-50
                           transition-colors justify-end text-right group
                           border-l border-neutral-100"
              >
                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-[0.12em] text-neutral-400">Next</p>
                  <p className="text-xs sm:text-sm font-medium text-neutral-900 truncate">{nextProject.title}</p>
                </div>
                <ArrowRight size={14} className="text-neutral-400 group-hover:text-neutral-900 transition-colors flex-shrink-0" />
              </button>
            ) : <div />}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
