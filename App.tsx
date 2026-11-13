import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import SkipToContent from './components/SkipToContent';
import PageTransition from './components/PageTransition';

const HomePage          = lazy(() => import('./pages/HomePage'));
const DisciplinesPage   = lazy(() => import('./pages/DisciplinesPage'));
const DisciplinePage    = lazy(() => import('./pages/DisciplinePage'));

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-neutral-950">
    <div className="w-8 h-8 border-2 border-neutral-700 border-t-neutral-300 rounded-full animate-spin" />
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={'/' + location.pathname.split('/').slice(1, 3).join('/')}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/work"
          element={
            <PageTransition>
              <Suspense fallback={<Loader />}>
                <DisciplinesPage />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/work/:discipline"
          element={
            <PageTransition>
              <Suspense fallback={<Loader />}>
                <DisciplinePage />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/work/:discipline/:id"
          element={
            <PageTransition>
              <Suspense fallback={<Loader />}>
                <DisciplinePage />
              </Suspense>
            </PageTransition>
          }
        />
        <Route path="*" element={<Navigate to="/work" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <ErrorBoundary>
        <SkipToContent />
        <Navbar />
        <main id="main-content">
          <AnimatedRoutes />
        </main>
      </ErrorBoundary>
    </BrowserRouter>
    </MotionConfig>
  );
}
