import React, { useEffect, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { HERO_DATA, PROJECTS } from '../constants';
import { DISCIPLINE_LABELS } from '../types';
import YTThumbnail from '../components/YTThumbnail';
const About = lazy(() => import('../components/About'));
const Contact = lazy(() => import('../components/Contact'));
const selectedIds = ['ayurexim', 'mg-2', 'festive', 'comp-1'];
const selected = selectedIds.flatMap(id => PROJECTS.find(p => p.id === id) ?? []);

export default function HomePage() {
  const location = useLocation();
  useEffect(() => {
    const hash = (location.state as { scrollTo?: string } | null)?.scrollTo || location.hash;
    if (!hash) { window.scrollTo({ top: 0, behavior: 'instant' }); return; }
    let timer: ReturnType<typeof setTimeout>;
    let attempts = 0;
    const scroll = () => {
      const target = document.getElementById(hash.replace(/^#/, ''));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      else if (attempts++ < 20) timer = setTimeout(scroll, 100);
    };
    scroll();
    return () => clearTimeout(timer);
  }, [location.state, location.hash]);

  return (
    <>
      <section id="hero" className="bg-neutral-50 px-8 md:px-12 lg:px-20 pt-32 md:pt-40 pb-12 md:pb-16">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-5">Independent designer &amp; video editor</p>
        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-neutral-900">{HERO_DATA.name}</h1>
        <div className="mt-7 flex flex-col md:flex-row md:items-end justify-between gap-7">
          <p className="text-lg md:text-xl text-neutral-600 max-w-xl leading-relaxed">Video editing, branding &amp; packaging, and VFX compositing.<br className="hidden sm:block" /> From the first idea to the final frame.</p>
          <a href="#contact" className="inline-flex items-center gap-3 text-sm text-neutral-900 underline underline-offset-8">Discuss a project <ArrowRight size={16} /></a>
        </div>
      </section>
      <section className="bg-neutral-950 px-8 md:px-12 lg:px-20 py-12 md:py-16" aria-labelledby="selected-heading">
        <div className="flex items-baseline justify-between gap-4 mb-8">
          <h2 id="selected-heading" className="font-serif text-3xl md:text-4xl text-white">Selected work</h2>
          <Link to="/work" className="text-xs text-neutral-300 underline underline-offset-4">Explore all work</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-x-7 gap-y-10">
          {selected.map(project => (
            <Link key={project.id} to={`/work/${project.discipline}/${project.id}`} className="group block min-w-0">
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                {project.type === 'image' ? <img src={project.images?.[0]} alt={project.imageCaptions?.[0] ?? project.title} loading="lazy" className="w-full h-full object-contain bg-neutral-100 transition-transform duration-500 group-hover:scale-[1.02]" />
                  : project.type === 'video' && project.videoId ? <YTThumbnail videoId={project.videoId} className="w-full h-full object-cover" />
                  : <div className="h-full flex flex-col justify-center p-8 md:p-12 bg-[#292333]"><p className="text-xs tracking-[0.2em] uppercase text-neutral-300 mb-5">Editing &amp; motion · Album playlist</p><p className="font-serif text-4xl md:text-5xl text-white leading-tight">Christina Perri<br /><span className="text-[#d6bfaa]">Lullaby Album</span></p></div>}
                {project.type !== 'image' && <div className="absolute bottom-5 right-5 rounded-full bg-white text-neutral-900 p-4"><Play size={20} aria-hidden="true" /></div>}
              </div>
              <div className="flex items-start justify-between gap-4 mt-4"><div><p className="text-[11px] uppercase tracking-[0.15em] text-neutral-400 mb-2">{DISCIPLINE_LABELS[project.discipline]} · {project.year}</p><h3 className="font-serif text-2xl text-white group-hover:underline underline-offset-4">{project.title}</h3></div><ArrowRight size={18} className="text-neutral-400 mt-7 shrink-0" /></div>
            </Link>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-14 border-t border-neutral-700 pt-8" aria-label="Browse disciplines">
          {(['editing', 'branding', 'vfx'] as const).map(slug => <Link key={slug} to={`/work/${slug}`} className="flex justify-between items-center gap-4 text-neutral-200 py-3">{DISCIPLINE_LABELS[slug]}<ArrowRight size={16} /></Link>)}
        </div>
      </section>
      <Suspense fallback={null}><About /><Contact /></Suspense>
    </>
  );
}
