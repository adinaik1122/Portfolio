import React, { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ErrorBoundary from './components/ErrorBoundary';
import SkipToContent from './components/SkipToContent';
import CustomCursor from './components/CustomCursor';

// Lazy load components below the fold
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Skills = lazy(() => import('./components/Skills'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

// Loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20" role="status" aria-live="polite">
    <div className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin"></div>
    <span className="sr-only">Loading content...</span>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <SkipToContent />
      <CustomCursor />
      <div className="min-h-screen">
        <Navbar />
        <main id="main-content">
          <Hero />
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <Projects />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <Experience />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <Skills />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <About />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <Contact />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;