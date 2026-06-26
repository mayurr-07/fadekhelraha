import React, { useRef } from 'react';
import { Cpu, Flame, Monitor, Headphones, Mic, Mouse } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { gearData } from '../data/streamData';

export const GamingGear: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />;
      case 'Flame': return <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />;
      case 'Monitor': return <Monitor className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />;
      case 'Headphones': return <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />;
      case 'Mic': return <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400" />;
      case 'Mouse': return <Mouse className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />;
      default: return <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />;
    }
  };

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.from('.gear-reveal', {
      opacity: 0, y: 30, duration: 0.6, stagger: 0.06, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none none' }
    });
  }, { scope: sectionRef });

  return (
    <section id="gear" ref={sectionRef} className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">

      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 border-b border-neutral-800/60 pb-5 sm:pb-6 gap-4">
        <div>
          <div className="gear-reveal inline-flex items-center gap-2 text-rose-500 font-bold text-xs tracking-widest uppercase mb-2 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-lg">
            <Cpu className="w-3.5 h-3.5" /><span>High-End Streaming Rig</span>
          </div>
          <h2 className="gear-reveal font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            GAMING & STREAM <span className="text-rose-500">SETUP</span>
          </h2>
          <p className="gear-reveal text-neutral-400 text-sm sm:text-base mt-1">Zero-lag, max FPS. All the gear powering the stream.</p>
        </div>
      </div>

      <div className="gear-reveal relative w-full overflow-hidden py-4">
        {/* Left and Right fade gradients for smooth edge fading */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-neutral-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-neutral-950 to-transparent z-20 pointer-events-none" />

        <div className="animate-marquee-rtl flex gap-5 py-4 w-max">
          {Array(3).fill(gearData).flat().map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="w-[280px] shrink-0 group/gear-card relative rounded-3xl paper-card shining-border cursor-pointer h-[240px] transition-all"
            >
              {/* Inner wrapper to support correct shining border render depth */}
              <div className="relative w-full h-full rounded-[inherit] overflow-hidden z-10 p-5 sm:p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 bg-neutral-950 border border-neutral-800/60 group-hover/gear-card:border-rose-500/30 rounded-2xl transition-colors">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-500 bg-neutral-950 px-3 py-1 rounded-xl border border-neutral-800/60 group-hover/gear-card:border-rose-500/20 transition-colors">
                    {item.category}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-base leading-tight mb-1.5 group-hover/gear-card:text-rose-400 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 leading-relaxed">
                    {item.spec}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-neutral-800/60 flex justify-between items-center text-xs">
                  <span className="text-neutral-500">Rating</span>
                  <span className="font-bold text-rose-400">{item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gear-reveal mt-9 sm:mt-12 bg-neutral-900/40 border border-neutral-800/60 rounded-3xl p-7 sm:p-10 text-center">
        <h3 className="font-heading text-2xl sm:text-4xl font-bold text-white mb-3 tracking-tight">Looking for sponsorships or partnerships?</h3>
        <p className="text-neutral-300 text-sm max-w-md mx-auto mb-6">We work with peripherals, energy drinks, and tournament organizers.</p>
        <a href="#" onClick={(e) => { e.preventDefault(); alert('Inquiry sent to partner@fadekhelraha.gg. We\'ll reply within 24 hours.'); }} className="inline-block px-8 py-3.5 bg-gradient-to-r from-rose-600 to-amber-500 active:from-rose-500 active:to-amber-400 text-neutral-950 font-extrabold rounded-2xl text-sm min-h-[48px] min-w-[210px]">
          CONTACT MANAGEMENT
        </a>
      </div>
    </section>
  );
};

