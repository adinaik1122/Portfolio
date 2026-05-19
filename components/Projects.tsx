/**
 * Legacy carousel component — kept for reference.
 * The live implementation is now WorkPage + ProjectModal.
 */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import FadeIn from './FadeIn';

const TOTAL = PROJECTS.length;

function getThumbnail(project: Project): string | null {
  if ((project.type === 'video' || project.type === 'playlist') && project.videoId)
    return `https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`;
  if (project.images?.[0]) return project.images[0];
  return null;
}

function ProjectCard({ project }: { project: Project }) {
  const [playing, setPlaying] = useState(false);
  const thumbnail = getThumbnail(project);

  const embedSrc = project.type === 'playlist'
    ? `https://www.youtube-nocookie.com/embed/videoseries?list=${project.videoId?.trim()}&rel=0&modestbranding=1&autoplay=1`
    : `https://www.youtube-nocookie.com/embed/${project.videoId?.trim()}?rel=0&modestbranding=1&autoplay=1`;

  return (
    <div
      className="relative flex-shrink-0 overflow-hidden bg-neutral-900"
      style={{ width: 'min(90vw, 1200px)', height: 'min(72vh, 680px)', scrollSnapAlign: 'start', borderRadius: 6 }}
    >
      {playing ? (
        <>
          <iframe
            src={embedSrc}
            title={project.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button
            onClick={() => setPlaying(false)}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black flex items-center justify-center text-white transition-colors"
            aria-label="Close video"
          >
            <X size={16} />
          </button>
        </>
      ) : (
        <button
          className="absolute inset-0 w-full h-full text-left group"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${project.title}`}
          style={{ cursor: 'pointer' }}
        >
          {thumbnail ? (
            <img
              src={thumbnail}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
              draggable={false}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-950" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="flex items-center justify-center rounded-full border-2 border-white/40 bg-black/25 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300" style={{ width: 80, height: 80 }}>
              <Play size={28} className="text-white fill-white ml-1.5" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-7 py-7 z-10">
            <h3 className="font-serif text-white text-xl md:text-2xl font-medium">{project.title}</h3>
          </div>
        </button>
      )}
    </div>
  );
}

const Projects: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef  = useRef<{ startX: number; scrollLeft: number } | null>(null);
  const didDrag  = useRef(false);

  const scrollBy = useCallback((dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.flex-shrink-0');
    const step = (card?.offsetWidth ?? 800) + 16;
    el.scrollBy({ left: dir === 'right' ? step : -step, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const onWheel = (e: WheelEvent) => {
      const atStart = el.scrollLeft <= 0;
      const atEnd   = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
      if (atStart && e.deltaY < 0) return;
      if (atEnd   && e.deltaY > 0) return;
      e.preventDefault();
      const forward = e.deltaY > 0;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        const card = el.querySelector<HTMLElement>('.flex-shrink-0');
        const step = (card?.offsetWidth ?? 800) + 16;
        el.scrollBy({ left: forward ? step : -step, behavior: 'smooth' });
      }, 50);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => { el.removeEventListener('wheel', onWheel); if (timer) clearTimeout(timer); };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, scrollLeft: el.scrollLeft };
    didDrag.current = false;
    el.style.cursor = 'grabbing';
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 4) didDrag.current = true;
    trackRef.current!.scrollLeft = dragRef.current.scrollLeft - dx;
  };
  const onPointerUp = () => {
    dragRef.current = null;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (didDrag.current) { e.preventDefault(); didDrag.current = false; }
  };

  return (
    <section id="projects" className="py-16 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <FadeIn>
          <div className="flex items-end justify-between border-b border-neutral-200 pb-6">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900">Selected Works</h2>
              <p className="text-neutral-500 mt-1.5 text-sm">{TOTAL} projects</p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button onClick={() => scrollBy('left')} className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-neutral-900 hover:text-neutral-900 transition-all" aria-label="Previous"><ChevronLeft size={18} /></button>
              <button onClick={() => scrollBy('right')} className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-neutral-900 hover:text-neutral-900 transition-all" aria-label="Next"><ChevronRight size={18} /></button>
            </div>
          </div>
        </FadeIn>
      </div>
      <div
        ref={trackRef}
        style={{ display: 'flex', gap: 16, overflowX: 'scroll', scrollSnapType: 'x mandatory', paddingLeft: '5vw', paddingRight: '5vw', paddingBottom: 4, WebkitOverflowScrolling: 'touch', cursor: 'grab', userSelect: 'none' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
      >
        {PROJECTS.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default React.memo(Projects);
