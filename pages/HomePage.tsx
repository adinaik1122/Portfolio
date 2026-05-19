import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, X } from 'lucide-react';
import { HERO_DATA } from '../constants';
import { useMouseParallax } from '../hooks/use3DEffect';
import FadeIn from '../components/FadeIn';
import YTThumbnail from '../components/YTThumbnail';

const About      = lazy(() => import('../components/About'));
const Skills     = lazy(() => import('../components/Skills'));
const Contact    = lazy(() => import('../components/Contact'));
const Experience = lazy(() => import('../components/Experience'));

// ── Constants ────────────────────────────────────────────────────────────────

const SHOWREEL_VIDEO_ID = 'wWRJXqXTBLc';

const CLIENTS = [
  'Kingbee Animation',
  'StudioB London',
  'Christina Perri',
  'Just For Hearts',
  'Sheffield Sports Medicine',
];

// ── Hero (compact) ───────────────────────────────────────────────────────────
function Hero() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const mouseParallax = useMouseParallax(12);

  useEffect(() => {
    const update = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      setCursor({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    window.addEventListener('mousemove', update);
    return () => window.removeEventListener('mousemove', update);
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[82dvh] flex flex-col items-center justify-center overflow-hidden bg-neutral-50 pt-20"
      aria-label="Hero"
    >
      {/* Cursor-following grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.3] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px]"
          style={{
            maskImage: `radial-gradient(circle 400px at ${cursor.x}px ${cursor.y}px, black, transparent 80%), radial-gradient(circle at center, black 30%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 400px at ${cursor.x}px ${cursor.y}px, black, transparent 80%), radial-gradient(circle at center, black 30%, transparent 100%)`,
          }}
        />
      </div>

      <div className="relative z-10 w-full mx-auto px-8 md:px-12 lg:px-20 text-center flex flex-col items-center justify-center flex-1 pb-16">

        <FadeIn delay={60}>
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-neutral-400 mb-6 sm:mb-8">
            <span className="w-5 h-px bg-neutral-300" />
            Digital Artist
            <span className="w-5 h-px bg-neutral-300" />
          </span>
        </FadeIn>

        <FadeIn delay={160} className="w-full">
          <h1
            className="font-serif text-[13vw] sm:text-7xl md:text-[6rem] lg:text-[7.5rem] font-medium text-neutral-900 leading-none tracking-tight"
            style={{
              transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            {HERO_DATA.name}
          </h1>
        </FadeIn>

        <FadeIn delay={270}>
          <p
            className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-neutral-500 font-light text-base md:text-lg mt-5 sm:mt-6"
            style={{
              transform: `translate3d(${mouseParallax.x * 0.4}px, ${mouseParallax.y * 0.4}px, 0)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <span>Motion Graphics</span>
            <span className="hidden md:block w-1 h-1 rounded-full" style={{ background: '#C4922A' }} />
            <span>VFX & Compositing</span>
            <span className="hidden md:block w-1 h-1 rounded-full" style={{ background: '#C4922A' }} />
            <span>Video Editing</span>
          </p>
        </FadeIn>

        <FadeIn delay={380} className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/work"
            className="group inline-flex items-center gap-3 px-7 py-3.5 bg-neutral-900 text-white text-[11px] tracking-[0.12em] uppercase hover:bg-neutral-700 transition-all duration-300"
          >
            <span>View All Work</span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#contact"
            onClick={e => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[11px] text-neutral-400 hover:text-neutral-900 tracking-[0.12em] uppercase underline-offset-4 hover:underline transition-colors"
          >
            Hire me
          </a>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none z-20" aria-hidden>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 opacity-50">Scroll</span>
          <div className="h-10 w-px bg-neutral-200 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-neutral-400 animate-scroll-down" />
          </div>
        </div>
      </div>

    </section>
  );
}

// ── Showreel ─────────────────────────────────────────────────────────────────
function ShowreelSection() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Escape key closes modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="bg-neutral-950 pb-16 sm:pb-24" aria-label="Showreel">
      <div className="px-8 md:px-12 lg:px-20">

        {/* Label row */}
        <FadeIn>
          <div className="flex items-center justify-between pt-12 sm:pt-16 pb-6 sm:pb-8">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-neutral-500">
              Showreel
            </p>
            <p className="font-mono text-[10px] text-neutral-600">2024</p>
          </div>
        </FadeIn>

        {/* Frame */}
        <FadeIn delay={80}>
          <button
            onClick={() => setOpen(true)}
            className="group relative w-full overflow-hidden bg-neutral-900 rounded-sm aspect-video sm:aspect-[21/9] block"
            aria-label="Play showreel"
          >
            {/* Thumbnail */}
            <YTThumbnail
              videoId={SHOWREEL_VIDEO_ID}
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.04] transition-all duration-700 ease-out"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

            {/* Centered play button */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div
                className="flex items-center justify-center rounded-full border border-white/30 bg-black/30 backdrop-blur-sm group-hover:scale-110 group-hover:border-white/60 transition-all duration-500"
                style={{ width: 80, height: 80 }}
              >
                <Play size={26} className="text-white fill-white ml-1" />
              </div>
            </div>

            {/* Bottom meta */}
            <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 py-6 sm:py-8 z-10 flex items-end justify-between">
              <div>
                <p className="font-serif text-white text-xl sm:text-2xl md:text-3xl font-medium leading-tight">
                  VFX Compositing Showreel
                </p>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white/40 mt-1.5">
                  Compositing · Motion Graphics · Colour
                </p>
              </div>
              <span
                className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-white border border-white/30 px-4 py-2 group-hover:bg-white group-hover:text-neutral-900 transition-all duration-300 whitespace-nowrap"
              >
                Watch
              </span>
            </div>

            {/* Gold accent line at bottom */}
            <div
              className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out"
              style={{ background: '#C4922A' }}
            />
          </button>
        </FadeIn>

        {/* Sub-caption */}
        <FadeIn delay={160}>
          <p className="mt-4 text-[10px] text-neutral-600 tracking-[0.2em] uppercase text-right">
            Kingbee Animation · StudioB London · 2023–2024
          </p>
        </FadeIn>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl"
              onClick={e => e.stopPropagation()}
            >
              {/* 16:9 iframe */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${SHOWREEL_VIDEO_ID}?rel=0&modestbranding=1&autoplay=1`}
                  title="VFX Compositing Showreel"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-10 right-0 text-white/60 hover:text-white text-[11px] uppercase tracking-[0.2em] flex items-center gap-2 transition-colors"
                aria-label="Close showreel"
              >
                Close <X size={14} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ── Clients ──────────────────────────────────────────────────────────────────
function ClientsStrip() {
  return (
    <section className="bg-white py-14 sm:py-20" aria-label="Clients">
      <div className="px-8 md:px-12 lg:px-20">
        <FadeIn>
          <p className="text-center text-[10px] uppercase tracking-[0.4em] text-neutral-400 mb-8 sm:mb-10">
            Clients
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-10">
            {CLIENTS.map((client, i) => (
              <React.Fragment key={client}>
                <span className="text-sm sm:text-base font-light tracking-wide text-neutral-500 hover:text-neutral-900 transition-colors duration-300 whitespace-nowrap">
                  {client}
                </span>
                {i < CLIENTS.length - 1 && (
                  <span className="hidden sm:block w-px h-4 bg-neutral-200" aria-hidden />
                )}
              </React.Fragment>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const location = useLocation();

  // Handle hash scroll from cross-page navigation (e.g. /work → /#experience)
  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!scrollTo) return;
    let attempts = 0;
    const tryScroll = () => {
      const el = document.querySelector(scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (attempts < 15) {
        attempts++;
        setTimeout(tryScroll, 100);
      }
    };
    tryScroll();
  }, [location.state]);

  return (
    <>
      <Hero />
      <ShowreelSection />
      <ClientsStrip />
      <Suspense fallback={null}>
        <Experience />
        <About />
        <Skills />
        <Contact />
      </Suspense>
    </>
  );
}
