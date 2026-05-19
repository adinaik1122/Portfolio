import React, { useEffect, useRef, useState } from 'react';
import { EXPERIENCE_DATA } from '../constants';
import FadeIn from './FadeIn';

const Experience: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lineScale, setLineScale] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Progress: 0 when section top hits bottom of viewport, 1 when section bottom leaves top
      const total = rect.height + windowH;
      const consumed = windowH - rect.top;
      const progress = Math.min(1, Math.max(0, consumed / total));
      setLineScale(progress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // init
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="experience" className="py-14 sm:py-20 md:py-24 bg-neutral-50 scroll-mt-20" ref={sectionRef}>
      <div className="px-8 md:px-12 lg:px-20">
        <FadeIn>
          <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-16 md:mb-20">Professional Experience</h2>
        </FadeIn>

        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-neutral-100 overflow-hidden">
            <div
              ref={lineRef}
              className="w-full origin-top"
              style={{
                height: '100%',
                background: 'linear-gradient(to bottom, #C4922A, #C4922A80, #C4922A30)',
                transform: `scaleY(${lineScale})`,
                transition: 'transform 0.1s linear',
              }}
            />
          </div>

          <div className="space-y-12 md:space-y-16">
            {EXPERIENCE_DATA.map((item, index) => (
              <div key={index} className="relative pl-8 md:pl-12">

                {/* Timeline Dot */}
                <div
                  className="absolute left-0 top-1.5 w-4 h-4 bg-white border-[3px] rounded-full z-10 box-border shadow-[0_0_0_4px_#f5f5f5] transition-colors duration-300"
                  style={{ borderColor: '#C4922A' }}
                />

                <FadeIn delay={index * 100} direction="up">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-x-4 mb-2">
                    <h3 className="text-xl font-medium text-neutral-900">{item.company}</h3>
                    <span className="text-sm font-mono text-neutral-500 bg-neutral-100 px-2 py-1 rounded mt-1 sm:mt-0 w-fit">{item.period}</span>
                  </div>

                  <div className="mb-4">
                    <p className="text-lg text-neutral-700 italic">{item.role}</p>
                    <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">{item.location}</p>
                  </div>

                  <ul className="text-neutral-600 leading-relaxed space-y-2 text-sm">
                    {item.description.map((desc, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="block w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: '#C4922A', opacity: 0.5 }} />
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

export default React.memo(Experience);
