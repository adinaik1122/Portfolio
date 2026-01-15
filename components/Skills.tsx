import React from 'react';
import { SKILLS_DATA, LANGUAGES_DATA } from '../constants';
import FadeIn from './FadeIn';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 md:py-24 bg-white scroll-mt-22">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          
          {/* Tech Skills */}
          <div>
            <FadeIn>
              <h2 className="font-serif text-3xl text-neutral-900 mb-8 border-b border-neutral-100 pb-4">Technical Proficiency</h2>
            </FadeIn>
            <div className="flex flex-wrap gap-3">
              {SKILLS_DATA.map((skill, index) => (
                <FadeIn key={skill.name} delay={index * 50} className="inline-block">
                  <span className="inline-block px-4 py-2 bg-neutral-50 border border-neutral-100 text-neutral-700 text-sm font-medium hover:bg-neutral-900 hover:text-white transition-all duration-300 cursor-default rounded-sm">
                    {skill.name}
                  </span>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <FadeIn delay={200}>
              <h2 className="font-serif text-3xl text-neutral-900 mb-8 border-b border-neutral-100 pb-4">Languages</h2>
            </FadeIn>
            <div className="flex flex-wrap gap-6">
              {LANGUAGES_DATA.map((lang, index) => (
                <FadeIn key={lang} delay={200 + index * 50}>
                   <div className="flex items-center space-x-2">
                     <div className="w-2 h-2 bg-neutral-300 rounded-full"></div>
                     <span className="text-lg text-neutral-700 font-light">{lang}</span>
                   </div>
                </FadeIn>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;