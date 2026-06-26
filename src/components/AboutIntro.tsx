import React, { useRef, useState, useEffect } from 'react';
import { Users, Eye, Zap, MapPin, Globe, Sparkles, Flame, MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { streamerProfile } from '../data/streamData';

const parseStatValue = (val: string) => {
  const suffix = val.replace(/[0-9.]/g, '');
  const num = parseFloat(val.replace(/[^0-9.]/g, ''));
  return { num, suffix };
};

const useCounter = (target: string, start: boolean, duration: number = 450) => {
  const [display, setDisplay] = useState(() => {
    const { suffix } = parseStatValue(target);
    return `0${suffix}`;
  });

  useEffect(() => {
    if (!start) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplay(target);
      return;
    }

    const { num, suffix } = parseStatValue(target);
    const steps = 30;
    const intervalMs = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;
      const decimals = String(num).includes('.') ? 1 : 0;
      setDisplay(current.toFixed(decimals) + suffix);
      if (step >= steps) {
        clearInterval(timer);
        setDisplay(target);
      }
    }, intervalMs);
    return () => clearInterval(timer);
  }, [target, start, duration]);

  return display;
};

export const AboutIntro: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [preloaderDone, setPreloaderDone] = useState(() => !!(window as any).preloaderComplete);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (preloaderDone) return;
    const handleComplete = () => setPreloaderDone(true);
    window.addEventListener('preloaderComplete', handleComplete);
    return () => window.removeEventListener('preloaderComplete', handleComplete);
  }, [preloaderDone]);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const shouldAnimate = preloaderDone && isVisible;

  const subsDisplay = useCounter(streamerProfile.subscribers, shouldAnimate);
  const viewsDisplay = useCounter(streamerProfile.totalViews, shouldAnimate);
  const peakDisplay = useCounter(streamerProfile.peakViewers, shouldAnimate);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.from('.about-reveal', {
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 82%',
        toggleActions: 'play none none none',
      }
    });
  }, { scope: sectionRef });
  return (
    <div id="about" ref={sectionRef} className="mt-6 sm:mt-10 w-full max-w-5xl mx-auto card-glass border border-neutral-800/60 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-visible">
      <div className="absolute -right-16 -top-16 w-48 h-48 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-center">

        {/* Left */}
        <div className="lg:col-span-7 space-y-5">
          <div className="about-reveal inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/25 rounded-full px-3 py-1 text-rose-400 text-[10px] sm:text-xs font-bold tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>OFFICIAL STREAMER HUB</span>
          </div>

          <h3 className="about-reveal text-xl sm:text-3xl font-bold text-white tracking-tight" style={{ lineHeight: '1.6', overflow: 'visible' }}>
            High-Octane{' '}
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
                paddingBottom: '6px',
                marginBottom: '-6px',
              }}
            >
              Hinglish Gaming
            </span>
          </h3>

          <p className="about-reveal text-neutral-300 text-sm sm:text-base leading-relaxed max-w-[65ch]">
            {streamerProfile.bio}
          </p>

          <div className="about-reveal flex flex-wrap gap-2.5 pt-1 text-xs text-neutral-400 font-medium">
            <div className="flex items-center gap-1.5 bg-neutral-950/60 px-3 py-1.5 rounded-xl border border-neutral-800/60">
              <MapPin className="w-3.5 h-3.5 text-rose-500" /><span>{streamerProfile.location}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-950/60 px-3 py-1.5 rounded-xl border border-neutral-800/60">
              <Globe className="w-3.5 h-3.5 text-amber-500" /><span className="hidden sm:inline">{streamerProfile.preferredLanguage}</span><span className="sm:hidden">Hinglish</span>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-950/60 px-3 py-1.5 rounded-xl border border-neutral-800/60">
              <Flame className="w-3.5 h-3.5 text-red-500" /><span>Conqueror / Radiant</span>
            </div>
          </div>

          <div className="about-reveal pt-1 flex flex-col sm:flex-row gap-3">
            <a href="#schedule" className="text-center px-6 py-3 bg-gradient-to-r from-rose-600 to-rose-700 active:from-rose-500 active:to-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-600/25 transition-all text-sm sm:text-base min-h-[48px] flex items-center justify-center">
              Check Stream Schedule
            </a>
            <a href="#chat" className="text-center px-6 py-3 bg-neutral-800/60 active:bg-neutral-700/60 text-neutral-200 font-bold rounded-2xl border border-neutral-700/60 flex items-center justify-center gap-2 transition-all text-sm sm:text-base min-h-[48px]">
              <MessageSquare className="w-4 h-4 text-rose-400" />Try Live Chat Simulator
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5 lg:border-l lg:border-neutral-800/60 lg:pl-8">

          <div ref={statsRef} className="stats-grid gap-2.5 sm:gap-3">
            {[
              { icon: <Users className="w-5 h-5 text-rose-500" />, display: subsDisplay, label: 'Instagram Followers' },
              { icon: <Eye className="w-5 h-5 text-amber-500" />, display: viewsDisplay, label: 'Total Views' },
              { icon: <Zap className="w-5 h-5 text-emerald-500" />, display: peakDisplay, label: 'Peak Viewers' },
            ].map((stat) => (
              <div key={stat.label} className="about-reveal bg-neutral-950/80 border border-neutral-800/60 rounded-2xl p-3 sm:p-4 text-center">
                <div className="mx-auto mb-1.5">{stat.icon}</div>
                <div className="font-heading text-2xl sm:text-3xl font-extrabold text-white leading-none tabular-nums">{stat.display}</div>
                <div className="text-[10px] text-neutral-500 font-semibold uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="about-reveal bg-neutral-950/60 border border-neutral-800/60 rounded-2xl p-4 space-y-2.5">
            <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>PRIMARY GAMES
            </h4>
            {[
              { name: 'Rainbow Six Siege', badge: 'Champion', badgeClass: 'text-rose-400 bg-rose-950/30' },
              { name: 'Call of Duty', badge: 'Iridescent', badgeClass: 'text-amber-400 bg-amber-950/30' },
              { name: 'GTA V RP', badge: 'Mumbai Mafia', badgeClass: 'text-emerald-400 bg-emerald-950/30' },
            ].map((game) => (
              <div key={game.name} className="flex justify-between items-center bg-neutral-900/60 px-3 py-2 rounded-xl border border-neutral-800/50">
                <span className="font-bold text-white text-sm">{game.name}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${game.badgeClass}`}>{game.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
