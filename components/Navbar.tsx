import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MENU_ITEMS = [
  { num: '01', label: 'Work',       href: '/work' },
  { num: '02', label: 'Experience', href: '/#experience' },
  { num: '03', label: 'About',      href: '/#about' },
  { num: '04', label: 'Skills',     href: '/#skills' },
  { num: '05', label: 'Contact',    href: '/#contact' },
];

const SECTION_IDS = ['hero', 'experience', 'about', 'skills', 'contact'];

function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Navbar() {
  const [open, setOpen]           = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const location  = useLocation();
  const navigate  = useNavigate();
  const isWorkPage = location.pathname.startsWith('/work');

  // Close on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy
  useEffect(() => {
    if (isWorkPage) { setActiveHash(''); return; }
    const visible = new Map<string, number>();
    const observers: IntersectionObserver[] = [];

    const pick = () => {
      let best = '', bestRatio = 0;
      visible.forEach((r, id) => { if (r > bestRatio) { bestRatio = r; best = id; } });
      setActiveHash(best ? `#${best}` : '');
    };

    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { visible.set(id, e.isIntersecting ? e.intersectionRatio : 0); pick(); },
        { threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [isWorkPage, location.pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const hash = href.slice(1);
      if (location.pathname === '/') {
        scrollToHash(hash);
      } else {
        navigate('/', { state: { scrollTo: hash } });
      }
    }
    setOpen(false);
  };

  const isActive = (href: string) => {
    if (href === '/work') return isWorkPage;
    if (href.startsWith('/#')) return activeHash === href.slice(1);
    return false;
  };

  return (
    <>
      {/* ── Bar ──────────────────────────────────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled && !open
            ? 'bg-white/95 backdrop-blur-md border-b border-neutral-100 py-4'
            : open
            ? 'py-4'
            : 'bg-transparent py-5 md:py-6'
        }`}
      >
        <div className="px-8 md:px-12 lg:px-20 flex items-center justify-between">
          <Link
            to="/"
            className={`font-serif font-bold text-xl md:text-2xl tracking-tight z-50 transition-colors duration-300 ${
              open ? 'text-white' : 'text-neutral-900'
            }`}
            aria-label="Aditya Naik — home"
          >
            AN.
          </Link>

          {/* Hamburger button */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="z-50 flex flex-col justify-center items-end gap-[5px] w-8 h-8 focus:outline-none"
          >
            <span
              className={`block h-px transition-all duration-400 ${
                open
                  ? 'w-6 bg-white rotate-45 translate-y-[7px]'
                  : 'w-6 bg-neutral-900'
              }`}
              style={{ transitionDuration: '350ms' }}
            />
            <span
              className={`block h-px transition-all duration-400 ${
                open ? 'w-6 bg-white opacity-0' : 'w-4 bg-neutral-900'
              }`}
              style={{ transitionDuration: '350ms' }}
            />
            <span
              className={`block h-px transition-all duration-400 ${
                open
                  ? 'w-6 bg-white -rotate-45 -translate-y-[7px]'
                  : 'w-6 bg-neutral-900'
              }`}
              style={{ transitionDuration: '350ms' }}
            />
          </button>
        </div>
      </nav>

      {/* ── Full-screen overlay ───────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-neutral-950 flex flex-col"
          >
            {/* Nav items */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-20 lg:px-32">
              <nav className="space-y-1 md:space-y-2">
                {MENU_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={item.href}
                      onClick={e => handleClick(e, item.href)}
                      className={`group flex items-baseline gap-5 md:gap-8 py-3 border-b border-white/5 hover:border-white/20 transition-colors duration-300 ${
                        isActive(item.href) ? 'border-white/20' : ''
                      }`}
                    >
                      <span className="font-mono text-[11px] text-neutral-600 group-hover:text-[#C4922A] transition-colors duration-300 w-6 flex-shrink-0">
                        {item.num}
                      </span>
                      <span
                        className={`font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none transition-colors duration-300 ${
                          isActive(item.href)
                            ? 'text-white'
                            : 'text-neutral-500 group-hover:text-white'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span
                        className="ml-auto text-neutral-700 group-hover:text-[#C4922A] transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
                        aria-hidden
                      >
                        →
                      </span>
                    </a>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Bottom bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="px-8 md:px-20 lg:px-32 py-8 flex items-center justify-between border-t border-white/5"
            >
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Available for work
              </div>
              <a
                href="/#contact"
                onClick={e => handleClick(e, '/#contact')}
                className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 hover:text-[#C4922A] transition-colors duration-300"
              >
                Hire me →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
