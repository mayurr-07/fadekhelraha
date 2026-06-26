import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutIntro } from './components/AboutIntro';
import { LiveSchedule } from './components/LiveSchedule';
import { VideoGrid } from './components/VideoGrid';
import { ChatSimulator } from './components/ChatSimulator';
import { GamingGear } from './components/GamingGear';
import { Footer } from './components/Footer';
import Preloader from './components/ui/Preloader';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [startAnim, setStartAnim] = useState<boolean>(false);
  const lenisRef = useRef<Lenis | null>(null);

  const heroConfig = {
    mediaType: 'video' as const,
    mediaSrc: '/videos/fade-intro.mp4',
    posterSrc: '/images/fade-poster.jpg',
    bgImageSrc: '/images/hero-bg.jpg',
    title: 'FADE KHELRAHA',
    date: 'Indian gamer • Hinglish streams',
    scrollToExpand: 'Scroll to enter',
    textBlend: false,
    children: <AboutIntro />
  };

  const handleExitStart = useCallback(() => {
    setStartAnim(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
    setStartAnim(true);
    (window as any).preloaderComplete = true;
    window.dispatchEvent(new Event('preloaderComplete'));
  }, []);

  // Force page to top on load + disable browser scroll restoration, then init Lenis
  useEffect(() => {
    // 1. Kill browser scroll restoration so it doesn't jump to a saved position
    window.history.scrollRestoration = 'manual';

    // 2. Immediately snap to top before anything renders/scrolls
    window.scrollTo(0, 0);

    // 3. Initialize Lenis after a tick so the DOM is settled at position 0
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const initLenis = () => {
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

      // Sync Lenis scroll events with ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Drive Lenis from GSAP's ticker so they stay perfectly in sync
      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    };

    // Delay two frames so the browser has fully laid out at scroll=0
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initLenis();
      });
    });

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced || !lenisRef.current) {
        const offset = 80;
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      } else {
        lenisRef.current.scrollTo(element, { offset: -80, duration: 1.2 });
      }
    }
  };

  // Scroll spy — only reads position, never triggers navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'schedule', 'vods', 'chat', 'gear'];
      const scrollPosition = window.scrollY + 180;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {showPreloader && (
        <Preloader
          onComplete={handlePreloaderComplete}
          onExitStart={handleExitStart}
        />
      )}
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-rose-500 selection:text-white">
        <Navbar onNavigate={handleNavigate} activeSection={activeSection} />
        <main className="flex-1 w-full">
          <Hero {...heroConfig} startAnimation={startAnim} />
          <LiveSchedule />
          <VideoGrid />
          <ChatSimulator />
          <GamingGear />
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>
    </>
  );
};

export default App;
