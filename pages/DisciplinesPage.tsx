import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Discipline, DISCIPLINE_LABELS } from '../types';

const DISCIPLINES: {
  slug: Discipline;
  num: string;
  description: string;
  tools: string[];
}[] = [
  {
    slug: 'vfx',
    num: '01',
    description: 'Node-based compositing, CG integration, roto and paint for broadcast and studio productions.',
    tools: ['Nuke', 'Silhouette', 'After Effects'],
  },
  {
    slug: 'motion',
    num: '02',
    description: 'Logo animations, title sequences, kinetic typography, and animated brand assets.',
    tools: ['After Effects', 'Illustrator', 'Premiere Pro'],
  },
  {
    slug: 'editing',
    num: '03',
    description: 'Long-form and short-form editing, colour grading, audio cleanup, and multi-platform delivery.',
    tools: ['Premiere Pro', '', 'After Effects'],
  },
  {
    slug: 'branding',
    num: '04',
    description: 'Visual identity systems, logo design, and brand motion packages.',
    tools: ['Illustrator', 'Photoshop', 'After Effects'],
  },
  {
    slug: 'design',
    num: '05',
    description: 'Graphic design, social media assets, and print-ready layouts for digital-first brands.',
    tools: ['Figma', 'Illustrator', 'Photoshop'],
  },
  {
    slug: 'visualization',
    num: '06',
    description: 'Architectural visualisation and 3D environment rendering for real estate and design clients.',
    tools: ['Blender', 'Houdini', 'Photoshop'],
  },
];

function getThumb(slug: Discipline): string | null {
  const project = PROJECTS.find(p => p.discipline === slug);
  if (!project) return null;
  if ((project.type === 'video' || project.type === 'playlist') && project.videoId)
    return `https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`;
  if (project.images?.[0]) return project.images[0];
  return null;
}

export default function DisciplinesPage() {
  const totalProjects = PROJECTS.length;

  return (
    <div className="min-h-screen bg-neutral-950 pt-16">

      {/* Header */}
      <div className="px-8 md:px-12 lg:px-20 pt-10 pb-12 border-b border-neutral-800">
        <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-500 mb-3">
          Selected Work
        </p>
        <div className="flex items-end justify-between gap-6">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white">
            Work
          </h1>
          <p className="text-neutral-600 text-sm hidden sm:block text-right leading-relaxed">
            {totalProjects} projects across<br />6 disciplines
          </p>
        </div>
      </div>

      {/* Discipline grid */}
      <div className="px-8 md:px-12 lg:px-20 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-800">
          {DISCIPLINES.map((d, i) => {
            const count = PROJECTS.filter(p => p.discipline === d.slug).length;
            const isEmpty = count === 0;
            const thumb = getThumb(d.slug);

            return (
              <motion.div
                key={d.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link
                  to={`/work/${d.slug}`}
                  className={`group block bg-neutral-950 p-8 md:p-10 h-full relative overflow-hidden transition-colors duration-300 ${
                    isEmpty ? 'pointer-events-none' : 'hover:bg-neutral-900/70'
                  }`}
                >
                  {/* Thumbnail background — very subtle */}
                  {thumb && (
                    <img
                      src={thumb}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-[0.07] group-hover:opacity-[0.14] transition-opacity duration-500 select-none pointer-events-none"
                      draggable={false}
                    />
                  )}

                  {/* Gold sweep on hover */}
                  {!isEmpty && (
                    <div
                      className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                      style={{ background: '#C4922A' }}
                    />
                  )}

                  <div className={`relative z-10 h-full flex flex-col ${isEmpty ? 'opacity-35' : ''}`}>
                    <div className="flex items-start justify-between mb-5">
                      <span className={`font-mono text-[11px] transition-colors duration-300 ${
                        isEmpty ? 'text-neutral-600' : 'text-neutral-600 group-hover:text-[#C4922A]'
                      }`}>
                        {d.num}
                      </span>
                      {!isEmpty && (
                        <ArrowRight
                          size={14}
                          className="text-neutral-700 group-hover:text-[#C4922A] -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        />
                      )}
                    </div>

                    <h2 className={`font-serif text-2xl sm:text-3xl leading-tight mb-4 transition-colors duration-300 ${
                      isEmpty ? 'text-neutral-600' : 'text-neutral-400 group-hover:text-white'
                    }`}>
                      {DISCIPLINE_LABELS[d.slug]}
                    </h2>

                    <p className={`text-sm leading-relaxed mb-6 transition-colors duration-300 ${
                      isEmpty ? 'text-neutral-700' : 'text-neutral-600 group-hover:text-neutral-400'
                    }`}>
                      {d.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {d.tools.map(t => (
                        <span
                          key={t}
                          className="text-[9px] uppercase tracking-[0.12em] text-neutral-700 border border-neutral-800 px-2 py-1"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <p className={`mt-auto text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                      isEmpty
                        ? 'text-neutral-700'
                        : 'text-neutral-700 group-hover:text-neutral-500'
                    }`}>
                      {isEmpty ? 'Coming soon' : `${count} project${count !== 1 ? 's' : ''}`}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
