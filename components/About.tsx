import React from "react";
import { useParallax } from "../hooks/use3DEffect";
import { ANIMATION_DELAYS } from "../constants/animations";
import FadeIn from "./FadeIn";

/**
 * About Component with parallax scroll effects
 * Background image moves at different speed than content for depth
 */
const About: React.FC = () => {
  const parallaxOffset = useParallax(0.3); // Background moves slower

  return (
    <section
      id="about"
      className="relative py-12 md:py-32 bg-neutral-900 text-neutral-200 scroll-mt-22 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Background Image Layer with Parallax */}
      <div 
        className="absolute inset-0 z-0 select-none pointer-events-none" 
        aria-hidden="true"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <img
          src="/bg.jpeg"
          alt=""
          className="w-full h-full object-cover opacity-50"
          style={{ minHeight: '120%' }} // Extra height for parallax
        />
        {/* Darkened Overlay Effect */}
        <div className="absolute inset-0 bg-neutral-900/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/90 via-neutral-900/60 to-neutral-900"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-y-8 md:gap-y-0 gap-x-12 items-start md:items-center">
          {/* Heading: Order 1 on Mobile. Row 1 on Desktop (Right Side) */}
          <div className="order-1 md:col-span-3 md:col-start-3 md:row-start-1 md:self-end text-center md:text-left mb-2 md:mb-8">
            <FadeIn delay={ANIMATION_DELAYS.ABOUT_HEADING}>
              <h2 id="about-heading" className="font-serif text-3xl md:text-5xl text-white drop-shadow-lg">
                About Me
              </h2>
            </FadeIn>
          </div>

          {/* Artist Image: Order 2 on Mobile. Row 1-2 on Desktop (Left Side, Full) */}
          <div className="order-2 md:order-first md:col-span-2 md:row-span-2 md:row-start-1 flex justify-center md:justify-start">
            <FadeIn className="relative w-64 sm:w-72 md:w-full max-w-sm">
              <div 
                className="aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group bg-neutral-800"
                style={{
                  transform: 'perspective(1000px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  src="/profile.jpeg"
                  alt="Aditya Naik"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
                  style={{
                    transform: 'translateZ(20px)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
              </div>
            </FadeIn>
          </div>

          {/* Text Content: Order 3 on Mobile. Row 2 on Desktop (Right Side) */}
          <div className="order-3 md:col-span-3 md:col-start-3 md:row-start-2 md:self-start text-center md:text-left">
            <FadeIn delay={ANIMATION_DELAYS.ABOUT_CONTENT}>
              <div className="text-base md:text-lg font-light leading-relaxed text-white/90 space-y-6 drop-shadow-md">
                <p>
                  A creative digital professional with a strong foundation in
                  visual effects and a versatile skill set spanning motion
                  graphics design, graphic design, compositing, video editing,
                  and UI/UX design.
                </p>
                <p>
                  Graduated with a degree in Digital Effects from Bournemouth
                  University, gaining hands-on experience in visual effects
                  fundamentals and the full production pipeline. Proficient in
                  tools such as Nuke, Houdini, Figma, and the Adobe Suite, I
                  bring a strong blend of artistic and technical expertise to
                  every project.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);
