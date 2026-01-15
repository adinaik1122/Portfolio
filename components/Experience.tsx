import React from 'react';
import { EXPERIENCE_DATA } from '../constants';
import FadeIn from './FadeIn';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 md:py-24 bg-neutral-50 scroll-mt-22">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-16 md:mb-20">Professional Experience</h2>
        </FadeIn>

        <div className="relative">
          {/* Continuous Vertical Line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-neutral-200"></div>

          <div className="space-y-12 md:space-y-16">
            {EXPERIENCE_DATA.map((item, index) => (
              <div key={index} className="relative pl-8 md:pl-12">
                
                {/* Timeline Dot */}
                <div className="absolute left-0 top-1.5 w-4 h-4 bg-white border-[3px] border-neutral-900 rounded-full z-10 box-border shadow-[0_0_0_4px_rgba(250,250,250,1)]"></div>

                <FadeIn delay={index * 100} direction="up">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-x-4 mb-2">
                    <h3 className="text-xl font-bold text-neutral-900">{item.company}</h3>
                    <span className="text-sm font-mono text-neutral-500 bg-neutral-100 px-2 py-1 rounded mt-1 sm:mt-0 w-fit">{item.period}</span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-lg text-neutral-700 italic">{item.role}</p>
                    <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">{item.location}</p>
                  </div>

                  <ul className="text-neutral-600 leading-relaxed space-y-2 text-sm">
                    {item.description.map((desc, i) => (
                      <li key={i} className="flex gap-3">
                         <span className="block w-1.5 h-1.5 bg-neutral-300 rounded-full mt-2 shrink-0"></span>
                         <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;