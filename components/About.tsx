import React from 'react';
import { useParallax } from '../hooks/use3DEffect';
import FadeIn from './FadeIn';

const About: React.FC = () => {
  const parallaxOffset = useParallax(0.3);

  return (
    <section
      id="about"
      className="relative py-20 md:py-32 bg-neutral-900 text-neutral-200 scroll-mt-20 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0 select-none pointer-events-none"
        aria-hidden
        style={{ transform: `translateY(${parallaxOffset}px)`, transition: 'transform 0.3s ease-out' }}
      >
        <img src="/bg.jpeg" alt="" className="w-full h-full object-cover opacity-40" style={{ minHeight: '120%' }} />
        <div className="absolute inset-0 bg-neutral-900/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/90 via-neutral-900/50 to-neutral-900" />
      </div>

      <div className="relative z-10 px-8 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start">

          {/* Photo */}
          <div className="md:col-span-2 flex justify-center md:justify-start">
            <FadeIn className="relative w-64 sm:w-72 md:w-full max-w-sm">
              <div
                className="aspect-[3/4] w-full overflow-hidden shadow-2xl border border-white/10 bg-neutral-800 group"
                style={{ transform: 'perspective(1000px)', transformStyle: 'preserve-3d' }}
              >
                <img
                  src="/profile.jpeg"
                  alt="Aditya Naik"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
                  style={{ transform: 'translateZ(20px)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
              </div>
            </FadeIn>
          </div>

          {/* Content */}
          <div className="md:col-span-3 flex flex-col gap-8">
            <FadeIn>
              <h2 id="about-heading" className="font-serif text-4xl md:text-5xl text-white">About Me</h2>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="text-base md:text-lg font-light leading-relaxed text-white/80 space-y-5">
                <p>
                  I'm a digital artist and motion designer specialising in VFX compositing,
                  motion graphics, and video post-production. I hold a degree in Digital Effects from
                  Bournemouth University, where I built a strong foundation in the full VFX pipeline.
                </p>
                <p>
                  I've worked in professional studio environments including Kingbee Animation (Elstree) and
                  StudioB (London), delivering work for broadcast clients and independent artists. On the
                  freelance side I've partnered with YouTube creators, wedding videographers, and brands
                  globally — handling everything from assembly cut to final colour grade.
                </p>
                <p>
                  My toolkit spans Nuke, Houdini, Blender, the full Adobe Suite, and Figma. I work
                  remotely with clients worldwide and I'm always looking to take on projects that push
                  what's possible.
                </p>
              </div>
            </FadeIn>

            {/* Education & quick facts */}
            <FadeIn delay={200}>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Education</p>
                  <p className="text-white font-medium text-sm">MA Digital Effects</p>
                  <p className="text-white/50 text-xs mt-0.5">Bournemouth University</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Work Style</p>
                  <p className="text-white font-medium text-sm">Remote First</p>
                  <p className="text-white/50 text-xs mt-0.5">Available worldwide</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Experience</p>
                  <p className="text-white font-medium text-sm">4+ years</p>
                  <p className="text-white/50 text-xs mt-0.5">Freelance & Studio</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Status</p>
                  <p className="text-white font-medium text-sm flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    Available
                  </p>
                  <p className="text-white/50 text-xs mt-0.5">Remote · Worldwide</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);
