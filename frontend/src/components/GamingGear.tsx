import React from 'react';
import { Cpu, Flame, Monitor, Headphones, Mic, Mouse } from 'lucide-react';
import { gearData } from '../data/streamData';

export const GamingGear: React.FC = () => {
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

  return (
    <section id="gear" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 border-b border-neutral-800 pb-5 sm:pb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-rose-500 font-bold text-xs tracking-widest uppercase mb-2 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-lg">
            <Cpu className="w-3.5 h-3.5" />
            <span>High-End Streaming Rig</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
            GAMING & STREAM <span className="text-rose-500">SETUP</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-1">Zero-lag, max FPS. All the gear powering the stream.</p>
        </div>
      </div>

      {/* RESPONSIVE GEAR LAYOUT: horizontal scroll on mobile, grid on larger screens */}
      <div className="gear-scroll-wrap relative">
        <div className="gear-scroll flex gap-4 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:pb-0 snap-x snap-mandatory">
        {gearData.map((item) => (
          <div 
            key={item.category}
            className="min-w-[82%] sm:min-w-0 sm:w-auto snap-start bg-neutral-900/40 border border-neutral-800 active:border-neutral-700 rounded-3xl p-5 sm:p-6 flex flex-col transition-all"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-2xl">
                {getIcon(item.icon)}
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 bg-neutral-950 px-3 py-1 rounded-xl border border-neutral-800">
                {item.category}
              </span>
            </div>

            <h4 className="font-bold text-white text-lg leading-tight mb-1.5">{item.name}</h4>
            <p className="text-sm text-neutral-300 flex-1">{item.spec}</p>

            <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-between items-center text-xs">
              <span className="text-neutral-400">Rating</span>
              <span className="font-bold text-rose-400">{item.rating}</span>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Partnership CTA */}
      <div className="mt-9 sm:mt-12 bg-neutral-900/40 border border-neutral-800 rounded-3xl p-7 sm:p-10 text-center">
        <h3 className="font-heading text-2xl sm:text-4xl font-bold text-white mb-3 tracking-tight">Looking for sponsorships or partnerships?</h3>
        <p className="text-neutral-300 text-sm max-w-md mx-auto mb-6">We work with peripherals, energy drinks, and tournament organizers.</p>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); alert('Inquiry sent to partner@fadekhelraha.gg. We’ll reply within 24 hours.'); }}
          className="inline-block px-8 py-3.5 bg-gradient-to-r from-rose-600 to-amber-500 active:from-rose-500 active:to-amber-400 text-neutral-950 font-extrabold rounded-2xl text-sm min-h-[48px] min-w-[210px]"
        >
          CONTACT MANAGEMENT
        </a>
      </div>
    </section>
  );
};
