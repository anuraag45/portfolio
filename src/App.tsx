import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import Lenis from '@studio-freight/lenis';
import { BootSequence } from './components/BootSequence';
import { TelemetryHeader } from './components/TelemetryHeader';
import { CommandPalette } from './components/CommandPalette';
import { TraceBackground } from './components/TraceBackground';
import { Hero } from './components/Hero';
import { ExperienceLog } from './components/ExperienceLog';
import { SubsystemMatrix } from './components/SubsystemMatrix';
import { EducationContact } from './components/EducationContact';
import { TelemetryFooter } from './components/TelemetryFooter';

const MeridianAuditEngine = lazy(() =>
  import('./components/MeridianAuditEngine').then((module) => ({ default: module.MeridianAuditEngine }))
);
const AegisRedesignInspector = lazy(() =>
  import('./components/AegisRedesignInspector').then((module) => ({ default: module.AegisRedesignInspector }))
);
const DocFlowPipeline = lazy(() =>
  import('./components/DocFlowPipeline').then((module) => ({ default: module.DocFlowPipeline }))
);
const CoreInventoryLedgerSpec = lazy(() =>
  import('./components/CoreInventoryLedgerSpec').then((module) => ({ default: module.CoreInventoryLedgerSpec }))
);

export const App: React.FC = () => {
  const [bootCompleted, setBootCompleted] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const handleBootComplete = useCallback(() => {
    setBootCompleted(true);
  }, []);

  // Lenis smooth scroll initialization gated behind prefers-reduced-motion check
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const resizeTimer = setTimeout(() => {
      lenis.resize();
    }, 600);

    return () => {
      clearTimeout(resizeTimer);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Track active section for navigation telemetry
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'experience', 'skills', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', position: 'relative' }}>
      {!bootCompleted && <BootSequence onComplete={handleBootComplete} />}

      <TelemetryHeader
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        activeSection={activeSection}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      <TraceBackground />

      <main>
        <Hero />

        <section id="projects" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 3.5rem 1.5rem' }}>
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }} className="register-tag">
                <span>0x01: ARCHITECTURAL ENGINE & FLAGSHIP CASE STUDIES</span>
              </div>
              <h2 style={{ fontSize: '2.5rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                Deployed AI & Full Stack Systems
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '720px' }}>
                Deep technical case studies detailing Meridian's active audit governance, AegisERP's Structured Navy redesign, DocFlow's async OCR pipeline, and CoreInventory's stock ledger.
              </p>
            </div>

            <Suspense
              fallback={
                <div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--phosphor-amber)' }}>
                  [INITIALIZING CASE STUDY SUBSYSTEM MODULES...]
                </div>
              }
            >
              <MeridianAuditEngine />
              <AegisRedesignInspector />
              <DocFlowPipeline />
              <CoreInventoryLedgerSpec />
            </Suspense>
          </div>
        </section>

        <ExperienceLog />
        <SubsystemMatrix />
        <EducationContact />
      </main>

      <TelemetryFooter />
    </div>
  );
};

export default App;
