import React, { useState } from 'react';
import { Calendar, Clock, Trophy, Radio, Bell, Check } from 'lucide-react';
import { scheduleData } from '../data/streamData';

export const LiveSchedule: React.FC = () => {
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  const handleToggleReminder = (day: string) => {
    setReminders(prev => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <section id="schedule" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 border-b border-neutral-800 pb-5 sm:pb-6 gap-5">
        <div>
          <div className="inline-flex items-center gap-2 text-rose-500 font-bold text-xs tracking-widest uppercase mb-2 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-lg">
            <Calendar className="w-3.5 h-3.5" />
            <span>Weekly Timetable</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
            STREAMING <span className="text-rose-500">SCHEDULE</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-1">
            Starts at <span className="text-white font-bold">9:00 PM IST</span> • Mumbai Time
          </p>
        </div>

        <div className="hidden sm:flex bg-neutral-900/60 border border-neutral-800 rounded-2xl p-3.5 items-center gap-3 max-w-xs">
          <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-amber-500 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div className="text-sm">
            <div className="font-bold text-white">Viewer Custom Matchdays</div>
            <div className="text-xs text-neutral-400">Subs get priority in lobbies & events</div>
          </div>
        </div>
      </div>

      {/* RESPONSIVE SCHEDULE: 1-col cards on mobile, 2-col tablet, 3-col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {scheduleData.map((item) => {
          const isReminded = reminders[item.day];
          
          return (
            <div 
              key={item.day} 
              className={`schedule-card relative bg-neutral-900/40 border rounded-2xl p-5 flex flex-col justify-between transition-all active:scale-[0.985] sm:active:scale-100 ${
                item.isLive 
                  ? 'border-rose-500/60 bg-gradient-to-b from-neutral-900/80 to-rose-950/20' 
                  : 'border-neutral-800'
              }`}
            >
              <div>
                {/* Day + Time on same line - mobile friendly */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-heading text-2xl font-bold text-white tracking-wide">
                    {item.day}
                  </span>
                  
                  {item.isLive ? (
                    <div className="flex items-center gap-1 bg-rose-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full animate-pulse">
                      <Radio className="w-3 h-3" />
                      <span>TONIGHT</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-neutral-400 bg-neutral-950 border border-neutral-800 px-2.5 py-0.5 rounded-lg text-xs font-semibold">
                      <Clock className="w-3 h-3 text-rose-500" />
                      <span>{item.time}</span>
                    </div>
                  )}
                </div>

                {/* Game + Title */}
                <div className="mb-2 inline-flex items-center gap-1.5 bg-neutral-950 border border-neutral-800 px-3 py-1 rounded-lg text-xs font-extrabold text-amber-400">
                  <Trophy className="w-3 h-3" />
                  <span>{item.game}</span>
                </div>

                <h4 className="text-base font-bold text-neutral-100 leading-snug">
                  {item.title}
                </h4>
              </div>

              {/* Full-width action on mobile */}
              <div className="mt-5 pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-3 text-xs">
                <span className="text-neutral-400 font-medium shrink-0">IST</span>

                <button
                  onClick={() => handleToggleReminder(item.day)}
                  className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all min-h-[44px] shrink-0 ${
                    isReminded
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-neutral-800 active:bg-neutral-700 text-neutral-200 border border-neutral-700'
                  }`}
                >
                  {isReminded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Reminder Set</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-3.5 h-3.5" />
                      <span>Notify Me</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 sm:mt-10 p-5 sm:p-6 bg-neutral-900/40 border border-neutral-800 rounded-3xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div className="flex-1">
          <h4 className="text-white font-bold text-base">Want to suggest a game or challenge?</h4>
          <p className="text-neutral-400 text-sm mt-0.5">Join the Discord and post in #game-suggestions</p>
        </div>
        <a 
          href="https://discord.gg/fadekhelraha" 
          target="_blank" 
          rel="noreferrer"
          className="min-h-[48px] flex items-center px-7 py-3 bg-indigo-600 active:bg-indigo-500 text-white font-bold rounded-2xl text-sm shrink-0 w-full sm:w-auto justify-center"
        >
          Join Discord
        </a>
      </div>
    </section>
  );
};
