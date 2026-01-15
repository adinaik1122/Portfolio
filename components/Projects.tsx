import React from 'react';
import { PROJECTS_DATA } from '../constants';
import FadeIn from './FadeIn';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="pb-24 pt-12 bg-white relative z-20 scroll-mt-22">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="mb-16 border-b border-neutral-200 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900">Selected Works</h2>
              <p className="text-neutral-500 mt-2">A curated collection of motion graphics and editing projects.</p>
            </div>
            {/* Optional: Add a subtle decoration or link here if needed */}
          </div>
        </FadeIn>

        <div className="space-y-24">
          {PROJECTS_DATA.map((category, catIndex) => (
            <div key={catIndex}>
              <FadeIn delay={100}>
                <h3 className="text-xl font-medium tracking-wide uppercase text-neutral-800 mb-8 pl-4 border-l-2 border-neutral-900">
                  {category.title}
                </h3>
              </FadeIn>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {category.projects.map((project, projIndex) => {
                  const src = project.type === 'playlist'
                    ? `https://www.youtube.com/embed/videoseries?list=${project.videoId.trim()}`
                    : `https://www.youtube.com/embed/${project.videoId.trim()}`;

                  return (
                    <FadeIn key={project.id} delay={projIndex * 150} className="w-full">
                      <div className="group relative w-full aspect-video bg-neutral-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                        <iframe
                          src={src}
                          title={`Project video ${projIndex + 1}`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          loading="lazy"
                        ></iframe>
                        {/* Overlay wrapper for potential extra info if needed, keeping it clean for now */}
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;