import React, { useEffect, useState, useRef } from 'react';
import { HERO_DATA } from '../constants';
import { ANIMATION_DELAYS } from '../constants/animations';
import { useMouseParallax } from '../hooks/use3DEffect';
import FadeIn from './FadeIn';

/**
 * Hero Component with enhanced 3D interactions
 * Main landing section with interactive cursor-following grid effect and mouse parallax
 * 
 * Features:
 * - Dynamic spotlight grid that follows mouse cursor
 * - Mouse parallax effect on name and subtitle
 * - Fade-in animations for content
 * - Responsive design with mobile optimizations
 */
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const mouseParallax = useMouseParallax(15); // Subtle parallax movement

  /**
   * Cursor tracking effect
   * Tracks mouse position relative to the hero section container
   * Used to create a dynamic spotlight effect on the background grid
   */
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate cursor position relative to container
        setCursor({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    
    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-neutral-50 selection:bg-neutral-900 selection:text-white pt-20"
      aria-label="Hero section"
    >
      
      {/* Background Layer Group - Decorative elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
        
        {/* Noise Texture - Adds subtle grain effect */}
        <div className="absolute inset-0 opacity-[0.3] mix-blend-soft-light" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />

        {/* Dynamic Spotlight Grid - Follows cursor with radial gradient mask */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px]"
          style={{
            // Creates two radial gradients: one following cursor, one centered
            maskImage: `radial-gradient(circle 400px at ${cursor.x}px ${cursor.y}px, black, transparent 80%), radial-gradient(circle at center, black 30%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 400px at ${cursor.x}px ${cursor.y}px, black, transparent 80%), radial-gradient(circle at center, black 30%, transparent 100%)`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center flex-1 flex flex-col justify-center pb-20">

        <div className="space-y-6 md:space-y-8 flex flex-col items-center">
            {/* Name - Large & Elegant with parallax */}
            <FadeIn delay={ANIMATION_DELAYS.HERO_NAME} className="w-full">
                <h1 
                  className="font-serif text-[12vw] sm:text-7xl md:text-8xl lg:text-9xl font-medium text-neutral-900 leading-none tracking-tight whitespace-nowrap text-center"
                  style={{
                    transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
                    transition: 'transform 0.3s ease-out',
                  }}
                >
                    {HERO_DATA.name}
                </h1>
            </FadeIn>

            {/* Subtitle - Specializations with parallax */}
            <FadeIn delay={ANIMATION_DELAYS.HERO_SUBTITLE}>
                <p 
                  className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-neutral-600 font-light text-lg md:text-xl px-4"
                  style={{
                    transform: `translate3d(${mouseParallax.x * 0.5}px, ${mouseParallax.y * 0.5}px, 0)`,
                    transition: 'transform 0.3s ease-out',
                  }}
                >
                    <span>Motion Graphics</span>
                    <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-neutral-300" aria-hidden="true"></span>
                    <span>Video Editing</span>
                    <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-neutral-300" aria-hidden="true"></span>
                    <span>Visual Effects</span>
                </p>
            </FadeIn>

            {/* Call to Action Button with 3D effect */}
            <FadeIn delay={ANIMATION_DELAYS.HERO_CTA} className="pt-8">
                 <button 
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-neutral-300 text-neutral-800 text-sm tracking-[0.1em] uppercase hover:bg-neutral-900 hover:border-neutral-900 hover:text-white transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
                    style={{
                      transform: 'perspective(1000px) translateZ(0)',
                      backfaceVisibility: 'hidden',
                    }}
                    aria-label="View selected projects section"
                >
                    <span>View Selected Projects</span>
                    <span className="w-1 h-4 bg-neutral-400 group-hover:bg-white transition-colors duration-300 animate-pulse" aria-hidden="true"></span>
                </button>
            </FadeIn>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-center items-end text-neutral-400 mix-blend-multiply pointer-events-none z-20" aria-hidden="true">
         <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] tracking-[0.3em] uppercase opacity-60">Scroll</span>
            <div className="h-12 w-[1px] bg-neutral-200 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-neutral-800 animate-scroll-down"></div>
            </div>
         </div>
      </div>

      {/* Bottom Fade - Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" aria-hidden="true" />

    </section>
  );
};

export default Hero;