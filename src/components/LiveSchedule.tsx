import React, { useRef } from 'react';
import { Calendar, Clock, Trophy, Radio, Play } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { scheduleData } from '../data/streamData';

export const LiveSchedule: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.from('.schedule-reveal', {
      opacity: 0, y: 20, duration: 0.5, stagger: 0.05, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' }
    });

    gsap.from('.schedule-row-reveal', {
      opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.schedule-list', start: 'top 85%', toggleActions: 'play none none none' }
    });
  }, { scope: sectionRef });

  return (
    <section id="schedule" ref={sectionRef} className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 border-b border-neutral-800/60 pb-5 gap-5">
        <div>
          <div className="schedule-reveal inline-flex items-center gap-2 text-rose-500 font-bold text-xs tracking-widest uppercase mb-2 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-lg">
            <Calendar className="w-3.5 h-3.5" /><span>Weekly Timetable</span>
          </div>
          <h2 className="schedule-reveal font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            STREAM <span className="text-rose-500">SCHEDULE</span>
          </h2>
          <p className="schedule-reveal text-neutral-400 text-sm sm:text-base mt-1">
            Catch the action live. Streams usually start at <span className="text-white font-bold">9:00 PM IST</span>. Subs get priority in viewer custom matches!
          </p>
        </div>
      </div>

      {/* Schedule Tree / Timeline */}
      <div className="schedule-list relative max-w-3xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-6 sm:left-1/2 top-2 bottom-2 w-px bg-neutral-800/80 sm:-translate-x-1/2" />

        {scheduleData.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={item.day} className="schedule-row-reveal relative flex flex-col sm:flex-row items-start sm:items-center w-full mb-6 sm:mb-8 last:mb-0 group">
              
              {/* Center Node / Dot */}
              <div className="absolute left-6 sm:left-1/2 top-4 sm:top-1/2 w-3 h-3 rounded-full border-[2.5px] border-neutral-950 bg-neutral-700 -translate-x-1/2 sm:-translate-y-1/2 z-10 transition-all duration-300 group-hover:bg-rose-500 group-hover:border-rose-500/30 group-hover:scale-125" />
              {item.isLive && (
                <div className="absolute left-6 sm:left-1/2 top-4 sm:top-1/2 w-3 h-3 rounded-full bg-rose-500 -translate-x-1/2 sm:-translate-y-1/2 z-10 animate-ping" />
              )}
              {item.isLive && (
                <div className="absolute left-6 sm:left-1/2 top-4 sm:top-1/2 w-3 h-3 rounded-full bg-rose-500 border-[2.5px] border-neutral-950 -translate-x-1/2 sm:-translate-y-1/2 z-10" />
              )}

              {/* Box 1: Date & Time */}
              <div className={`w-full sm:w-1/2 pl-14 sm:pl-0 flex flex-col pt-1 sm:pt-0 ${
                isEven 
                  ? 'sm:pr-10 sm:text-right sm:items-end' 
                  : 'sm:pl-10 sm:order-last sm:text-left sm:items-start'
              }`}>
                 <span className={`font-heading text-xl sm:text-3xl font-extrabold tracking-tight transition-colors duration-300 ${item.isLive ? 'text-rose-400' : 'text-neutral-100 group-hover:text-white'}`}>
                   {item.day}
                 </span>
                 <div className="flex items-center gap-1.5 mt-1">
                   {item.isLive ? (
                      <span className="flex items-center gap-1 text-rose-500 text-[10px] sm:text-xs font-bold animate-pulse">
                        <Radio className="w-3 h-3" /> LIVE TONIGHT
                      </span>
                   ) : (
                      <span className="flex items-center gap-1 text-neutral-400 text-[10px] sm:text-xs font-medium">
                        <Clock className="w-3 h-3 text-rose-500/70" /> {item.time}
                      </span>
                   )}
                 </div>
              </div>

              {/* Box 2: Game & Title */}
              <div className={`w-full sm:w-1/2 pl-14 sm:pl-0 flex flex-col mt-2 sm:mt-0 ${
                isEven 
                  ? 'sm:pl-10 sm:text-left sm:items-start' 
                  : 'sm:pr-10 sm:text-right sm:items-end'
              }`}>
                <div className="inline-flex items-center gap-1 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-[10px] font-bold text-amber-400 mb-2 shadow-lg">
                  <Trophy className="w-2.5 h-2.5" /> {item.game}
                </div>
                <h4 className={`text-sm sm:text-lg font-bold leading-snug mb-2 transition-colors duration-300 ${item.isLive ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'text-neutral-300 group-hover:text-white'}`}>
                  {item.title}
                </h4>
                {item.isLive && (
                  <a href="https://youtube.com/@fadekhelraha" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-[10px] sm:text-xs font-bold bg-rose-600 hover:bg-rose-500 active:scale-95 text-white transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)]">
                    <Play className="w-3 h-3 fill-current" /> Watch Now
                  </a>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="schedule-reveal mt-10 sm:mt-12 p-4 sm:p-5 bg-neutral-900/30 border border-neutral-800/60 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left transition-all hover:bg-neutral-900/50">
        <div>
          <h4 className="text-white font-bold text-sm sm:text-base">Want to suggest a game or challenge?</h4>
          <p className="text-neutral-400 text-[10px] sm:text-xs mt-0.5">Join the Discord and post in the #game-suggestions channel.</p>
        </div>
        <a href="https://discord.com/invite/JgeNCaJeaM" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-5 py-2.5 bg-[#5865F2] hover:bg-[#4752C4] active:scale-95 text-white font-bold rounded-lg text-[11px] transition-all w-full sm:w-auto shadow-[0_0_15px_rgba(88,101,242,0.3)]">
          Join Discord
        </a>
      </div>

    </section>
  );
};
