import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutIntro } from './components/AboutIntro';
import { LiveSchedule } from './components/LiveSchedule';
import { VideoGrid } from './components/VideoGrid';
import { ChatSimulator } from './components/ChatSimulator';
import { GamingGear } from './components/GamingGear';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';

export const App: React.FC = () => {
  const [isPreloading, setIsPreloading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('hero');

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

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Scroll spy
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
      {isPreloading && <Preloader onComplete={() => setIsPreloading(false)} />}
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-rose-500 selection:text-white">
        <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

        <main className="flex-1 w-full">
          <Hero {...heroConfig} />
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
