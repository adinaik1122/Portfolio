import React from 'react';
import { SKILLS_DATA, LANGUAGES_DATA } from '../constants';
import FadeIn from './FadeIn';

const CATEGORY_LABELS: Record<string, string> = {
  compositing: 'Compositing & VFX',
  '3d': '3D & Simulation',
  editing: 'Editing & Motion',
  design: 'Design',
};

const Skills: React.FC = () => {
  const byCategory = SKILLS_DATA.reduce<Record<string, typeof SKILLS_DATA>>((acc, s) => {
    const cat = s.category ?? 'design';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-14 sm:py-20 md:py-24 bg-white scroll-mt-20">
      <div className="px-8 md:px-12 lg:px-20">
        <FadeIn>
          <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 mb-8 sm:mb-10 border-b border-neutral-100 pb-4">
            Technical Proficiency
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 mb-12 sm:mb-16">
          {Object.entries(byCategory).map(([cat, skills], gi) => (
            <FadeIn key={cat} delay={gi * 80}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3">
                {CATEGORY_LABELS[cat] ?? cat}
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span
                    key={skill.name}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-neutral-50 border border-neutral-100
                               text-neutral-700 text-xs sm:text-sm font-medium
                               hover:border-[#C4922A] hover:text-[#C4922A] hover:bg-white
                               transition-all duration-300 cursor-default rounded-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Languages */}
        <FadeIn delay={200}>
          <div className="border-t border-neutral-100 pt-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">Languages</p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {LANGUAGES_DATA.map(lang => (
                <div key={lang} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C4922A' }} />
                  <span className="text-sm sm:text-base text-neutral-700 font-light">{lang}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default React.memo(Skills);
