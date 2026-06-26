import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface HeroProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc: string;
  bgImageSrc: string;
  title: string;
  date: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: React.ReactNode;
  startAnimation?: boolean;
}

// Creative Split Text for Toxic Title (animated by parent Hero)
const ToxicTitle: React.FC = () => {
  const fadeChars = "FADE".split('');
  const khelrahaChars = "KHELRAHA".split('');

  return (
    <div className="flex flex-col items-center leading-[0.88]">
      {/* FADE - cleaner, slightly toxic pink */}
      <div className="toxic-title relative mb-[-0.08em]">
        <span className="block font-extrabold text-[2.15rem] sm:text-[2.95rem] lg:text-[3.35rem] tracking-[-0.065em] text-neutral-200">
          {fadeChars.map((char, i) => (
            <span key={i} className="toxic-char inline-block" style={{ willChange: 'transform, opacity' }}>
              {char}
            </span>
          ))}
        </span>
        <span className="toxic-glow" />
      </div>

      {/* KHELRAHA - Main Toxic Neon Light */}
      <div className="toxic-title relative -mt-1">
        <span className="toxic-khelraha block font-extrabold text-[2.75rem] sm:text-[3.65rem] lg:text-[4.15rem] tracking-[-0.07em] text-white">
          {khelrahaChars.map((char, i) => (
            <span key={i} className="toxic-char inline-block" style={{ willChange: 'transform, opacity' }}>
              {char}
            </span>
          ))}
        </span>
        <span className="toxic-glow" />
      </div>
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  date,
  scrollToExpand = 'Scroll to enter',
  textBlend = false,
  children,
  startAnimation = false
}) => {
  const [sourceStage, setSourceStage] = useState<'user' | 'stock' | 'image'>('user');
  const containerRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const stockVideoUrl = "https://videos.pexels.com/video-files/7849771/7849771-uhd_4096_2160_25fps.mp4";
  const stockPoster = "https://images.pexels.com/photos/9072394/pexels-photo-9072394.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920";

  const handleVideoError = () => {
    setSourceStage(prev => prev === 'user' ? 'stock' : 'image');
  };

  const activeVideoSrc = sourceStage === 'user' ? mediaSrc : stockVideoUrl;
  const activePoster = posterSrc || stockPoster;

  // GSAP entrance + scroll effects
  useGSAP(() => {
    if (!startAnimation) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Toxic Title entrance animation
      const chars = containerRef.current?.querySelectorAll('.toxic-char');
      if (chars) {
        gsap.fromTo(chars,
          { opacity: 0, y: 42, scale: 0.92 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            stagger: 0.022, 
            duration: 0.85, 
            ease: 'power3.out',
            delay: 0.3 
          }
        );
      }

      // Extra toxic pulse on KHELRAHA
      const khel = containerRef.current?.querySelector('.toxic-khelraha');
      if (khel) {
        gsap.to(khel, {
          textShadow: '0 0 10px #e11d48, 0 0 24px #e11d48, 0 0 48px #e11d48, 0 0 8px #22c55e',
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.15
        });
      }

      // Video entrance
      gsap.fromTo(videoContainerRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
      );

      // Subtitle
      gsap.fromTo('.hero-subtitle',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out', delay: 0.9 }
      );

      // Children (AboutIntro)
      gsap.fromTo('.hero-children',
        { opacity: 0, y: 38 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out', delay: 1.25 }
      );

      // Scroll indicator
      gsap.fromTo('.hero-scroll-indicator',
        { opacity: 0 },
        { opacity: 0.75, duration: 0.6, delay: 1.85 }
      );

      // Parallax on video
      gsap.to(videoContainerRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Fade content on scroll
      gsap.to('.hero-content', {
        opacity: 0,
        y: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: '55% top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, { dependencies: [startAnimation], scope: containerRef });

  return (
    <section id="hero" ref={containerRef} className="relative min-h-[100dvh] w-full flex flex-col justify-between pt-20 sm:pt-24 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-x-hidden bg-neutral-950">

      {/* Background Media */}
      <div ref={videoContainerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none hero-video-bg">
        {sourceStage === 'image' && (
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgImageSrc || stockPoster})`, filter: 'brightness(0.42) saturate(1.1)' }} />
        )}

        {mediaType === 'video' && sourceStage !== 'image' && (
          <video key={activeVideoSrc} autoPlay muted loop playsInline poster={activePoster} onError={handleVideoError} className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.52] contrast-[1.08] saturate-[1.2]">
            <source src={activeVideoSrc} type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/55 via-neutral-950/30 to-neutral-950/50 sm:from-neutral-950/65 sm:via-neutral-950/40 sm:to-neutral-950/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/35 via-transparent to-transparent" />
      </div>

      {/* Main Content */}
      <div className="hero-content relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col items-center justify-center text-center pt-8 sm:pt-10">

        {/* Creative Toxic Animated Title */}
        <div className={`relative ${textBlend ? 'mix-blend-overlay opacity-90' : ''}`}>
          <ToxicTitle />
        </div>

        {/* Subtitle */}
        <p className="hero-subtitle mt-3 sm:mt-4 text-sm sm:text-[15px] font-semibold tracking-[2.5px] sm:tracking-[3.5px] uppercase text-neutral-300 max-w-[92%] sm:max-w-2xl mx-auto">
          {date}
        </p>

        {/* Children */}
        <div className="hero-children w-full mt-3 sm:mt-4">
          {children}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator relative z-10 hidden sm:flex w-full justify-center mt-8 pt-4">
        <a href="#schedule" className="flex flex-col items-center gap-1.5 group cursor-pointer">
          <span className="text-xs uppercase font-bold tracking-widest text-neutral-500 group-hover:text-rose-400 transition-colors">
            {scrollToExpand}
          </span>
          <div className="p-2 bg-neutral-900/60 border border-neutral-800/60 rounded-full group-hover:border-rose-500/30 transition-all">
            <ChevronDown className="w-4 h-4 text-rose-500 animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};
