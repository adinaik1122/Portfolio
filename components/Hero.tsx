import React, { useEffect, useState, useRef } from 'react';
import { HERO_DATA } from '../constants';
import FadeIn from './FadeIn';

const Timecode: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');
  
  // Mock frame count for that video editor feel
  const [frames, setFrames] = useState(0);
  useEffect(() => {
    let frame = 0;
    const frameTimer = setInterval(() => {
        frame = (frame + 1) % 24; // 24fps
        setFrames(frame);
    }, 1000 / 24);
    return () => clearInterval(frameTimer);
  }, []);

  return (
    <div className="font-mono text-xs md:text-sm text-neutral-400 tracking-widest flex items-center gap-4 opacity-60">
      <div className="flex items-center gap-2 ">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <span>REC</span>
      </div>
      <span>
        {format(time.getHours())}:{format(time.getMinutes())}:{format(time.getSeconds())}:{format(frames)}
      </span>
    </div>
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
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
    >
      
      {/* Background Layer Group */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.3] mix-blend-soft-light" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />

        {/* Dynamic Spotlight Grid */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px]"
          style={{
            maskImage: `radial-gradient(circle 400px at ${cursor.x}px ${cursor.y}px, black, transparent 80%), radial-gradient(circle at center, black 30%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 400px at ${cursor.x}px ${cursor.y}px, black, transparent 80%), radial-gradient(circle at center, black 30%, transparent 100%)`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center flex-1 flex flex-col justify-center pb-20">
        
        {/* Top Meta Data - Positioned relative to section now for better mobile safety */}
        <div className="absolute top-4 md:top-12 left-0 right-0 flex justify-between items-center px-6 md:px-12 pointer-events-none max-w-7xl mx-auto w-full">
            <FadeIn delay={0}>
                <Timecode />
            </FadeIn>
            <FadeIn delay={100}>
                <div className="font-mono text-xs md:text-sm text-neutral-300 tracking-widest hidden xs:block">
                    ISO 800 — 35mm
                </div>
            </FadeIn>
        </div>

        <div className="space-y-6 md:space-y-8 flex flex-col items-center">
            {/* Name - Large & Elegant */}
            <FadeIn delay={200} className="w-full">
                <h1 className="font-serif text-[12vw] sm:text-7xl md:text-8xl lg:text-9xl font-medium text-neutral-900 leading-none tracking-tight whitespace-nowrap text-center">
                    {HERO_DATA.name}
                </h1>
            </FadeIn>

            {/* Subtitle */}
            <FadeIn delay={400}>
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-neutral-600 font-light text-lg md:text-xl px-4">
                    <span>Motion Graphics</span>
                    <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
                    <span>Video Editing</span>
                    <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
                    <span>Visual Effects</span>
                </div>
            </FadeIn>

            {/* Actions */}
            <FadeIn delay={600} className="pt-8">
                 <button 
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-neutral-300 text-neutral-800 text-sm tracking-[0.1em] uppercase hover:bg-neutral-900 hover:border-neutral-900 hover:text-white transition-all duration-500"
                >
                    <span>View Selected Projects</span>
                    <span className="w-1 h-4 bg-neutral-400 group-hover:bg-white transition-colors duration-300 animate-pulse"></span>
                </button>
            </FadeIn>
        </div>
      </div>

      {/* Footer Info / Scroll Indicator */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-center items-end text-neutral-400 mix-blend-multiply pointer-events-none z-20">
         <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] tracking-[0.3em] uppercase opacity-60">Scroll</span>
            <div className="h-12 w-[1px] bg-neutral-200 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-neutral-800 animate-scroll-down"></div>
            </div>
         </div>
      </div>

      {/* Bottom Fade to Merge with Projects */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

    </section>
  );
};

export default Hero;