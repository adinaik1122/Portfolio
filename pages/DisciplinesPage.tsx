import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Play } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import YTThumbnail from '../components/YTThumbnail';
import { usePageMeta } from '../hooks/usePageMeta';

type Filter = 'all' | 'editing' | 'motion' | 'vfx' | 'branding';
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'editing', label: 'Video Editing' },
  { id: 'motion', label: 'Motion Graphics' },
  { id: 'vfx', label: 'VFX & Compositing' },
  { id: 'branding', label: 'Branding & Packaging' },
];
const motionIds = new Set(['mg-1', 'mg-2', 'wedding-1', 'wedding-2']);
const priorityIds = ['mg-1', 'ayurexim-reels', 'mg-2', 'comp-1', 'ayurexim', 'festive'];
const orderedProjects = [...PROJECTS].sort((a, b) => {
  const aIndex = priorityIds.indexOf(a.id);
  const bIndex = priorityIds.indexOf(b.id);
  if (aIndex !== -1 || bIndex !== -1) return (aIndex === -1 ? Infinity : aIndex) - (bIndex === -1 ? Infinity : bIndex);
  return b.year - a.year;
});

function belongsTo(project: Project, filter: Filter) {
  if (filter === 'all') return true;
  if (filter === 'motion') return motionIds.has(project.id);
  if (filter === 'editing') return project.discipline === 'editing' && !motionIds.has(project.id);
  return project.discipline === filter;
}

function ProjectCard({ project }: { project: Project }) {
  const category = motionIds.has(project.id) ? 'Motion Graphics' : project.discipline === 'vfx' ? 'VFX & Compositing' : project.discipline === 'branding' ? 'Branding & Packaging' : 'Video Editing';
  return (
    <Link to={`/work/${project.discipline}/${project.id}`} className="group block min-w-0 focus-visible:outline-offset-4">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-800">
        {project.type === 'video-collection' && project.videos?.[0] ? (
          <img src={project.videos[0].poster} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
        ) : project.type === 'image' && project.images?.[0] ? (
          <img src={project.images[0]} alt={project.imageCaptions?.[0] ?? project.title} loading="lazy" className="w-full h-full object-contain bg-neutral-100 transition-transform duration-300 group-hover:scale-[1.02]" />
        ) : project.type === 'video' && project.videoId ? (
          <YTThumbnail videoId={project.videoId} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-8 bg-[#292333]"><span className="font-serif text-3xl md:text-4xl text-center text-white">{project.title}</span></div>
        )}
        {project.type !== 'image' && <span className="absolute bottom-4 right-4 p-3 rounded-full bg-white text-neutral-900" aria-hidden="true"><Play size={18} /></span>}
      </div>
      <div className="pt-4">
        <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-400">{category} · {project.year}</p>
        <div className="mt-2 flex items-start justify-between gap-3"><h2 className="font-serif text-2xl md:text-3xl leading-tight text-white group-hover:underline underline-offset-4">{project.title}</h2><ArrowUpRight size={20} className="shrink-0 text-neutral-400" aria-hidden="true" /></div>
        <p className="mt-2 text-sm leading-relaxed text-neutral-400 line-clamp-2">{project.brief}</p>
        <p className="mt-3 text-xs text-neutral-300">View project <span aria-hidden="true">→</span></p>
      </div>
    </Link>
  );
}

export default function DisciplinesPage() {
  usePageMeta('Selected Work | Aditya Naik', 'Browse video editing, motion graphics, VFX compositing, branding, and packaging projects by Aditya Naik.', '/work');
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get('filter');
  const active: Filter = FILTERS.some(item => item.id === requested) ? requested as Filter : 'all';
  const visible = orderedProjects.filter(project => belongsTo(project, active));
  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-16">
      <header className="px-6 sm:px-8 md:px-12 lg:px-20 pt-12 md:pt-16 pb-10 border-b border-neutral-800">
        <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 mb-4">Selected work</p>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl">Work</h1>
        <p className="mt-5 max-w-xl text-neutral-400 leading-relaxed">Editing and motion lead the selection, followed by VFX, branding, and packaging.</p>
      </header>
      <section className="px-6 sm:px-8 md:px-12 lg:px-20 py-8 md:py-12" aria-label="Portfolio projects">
        <div className="flex flex-wrap gap-2 mb-8 md:mb-10" role="group" aria-label="Filter projects">
          {FILTERS.filter(item => orderedProjects.some(project => belongsTo(project, item.id))).map(item => (
            <button key={item.id} type="button" aria-pressed={active === item.id} aria-controls="project-grid"
              onClick={() => setSearchParams(item.id === 'all' ? {} : { filter: item.id })}
              className={`min-h-11 px-4 py-2 text-sm border transition-colors ${active === item.id ? 'bg-white text-neutral-950 border-white' : 'text-neutral-300 border-neutral-700 hover:border-neutral-300 hover:text-white'}`}>
              {item.label}
            </button>
          ))}
        </div>
        <p className="mb-6 text-xs uppercase tracking-[0.16em] text-neutral-400" aria-live="polite">{visible.length} {visible.length === 1 ? 'project' : 'projects'}</p>
        <div id="project-grid" className="grid gap-x-7 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">{visible.map(project => <ProjectCard key={project.id} project={project} />)}</div>
      </section>
    </div>
  );
}
