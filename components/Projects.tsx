import React from 'react';
import { PROJECTS_DATA } from '../constants';
import { ANIMATION_DELAYS } from '../constants/animations';
import FadeIn from './FadeIn';
import ProjectCard from './ProjectCard';

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
          </div>
        </FadeIn>

        <div className="space-y-24">
          {PROJECTS_DATA.map((category, catIndex) => (
            <div key={catIndex}>
              <FadeIn delay={ANIMATION_DELAYS.PROJECTS_CATEGORY}>
                <h3 className="text-xl font-medium tracking-wide uppercase text-neutral-800 mb-8 pl-4 border-l-2 border-neutral-900">
                  {category.title}
                </h3>
              </FadeIn>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {category.projects.map((project, projIndex) => {
                  // Use YouTube nocookie domain for privacy and better embedding
                  const src = project.type === 'playlist'
                    ? `https://www.youtube-nocookie.com/embed/videoseries?list=${project.videoId.trim()}&rel=0&modestbranding=1`
                    : `https://www.youtube-nocookie.com/embed/${project.videoId.trim()}?rel=0&modestbranding=1`;

                  return (
                    <FadeIn key={project.id} delay={projIndex * ANIMATION_DELAYS.PROJECTS_VIDEO_BASE} className="w-full">
                      <ProjectCard 
                        src={src} 
                        title={`${category.title} - Project ${projIndex + 1}`}
                      />
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

export default React.memo(Projects);