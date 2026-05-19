import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import SkipToContent from './components/SkipToContent';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';

const HomePage          = lazy(() => import('./pages/HomePage'));
const DisciplinesPage   = lazy(() => import('./pages/DisciplinesPage'));
const DisciplinePage    = lazy(() => import('./pages/DisciplinePage'));

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white">
    <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
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
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <SkipToContent />
        <CustomCursor />
        <Navbar />
        <main id="main-content">
          <AnimatedRoutes />
        </main>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
