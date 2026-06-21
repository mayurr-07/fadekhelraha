import React from 'react';
import { MapPin, Globe, Sparkles, Flame, MessageSquare } from 'lucide-react';
import { streamerProfile } from '../data/streamData';

export const AboutIntro: React.FC = () => {
  return (
    <div id="about" className="mt-8 sm:mt-10 w-full max-w-5xl mx-auto bg-neutral-900/80 backdrop-blur-xl border border-neutral-800/80 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
      {/* Decorative glows */}
      <div className="absolute -right-16 -top-16 w-48 h-48 bg-rose-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-amber-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-center">
        
        {/* Left: Bio + Chips */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 rounded-full px-3 py-1 text-rose-400 text-[10px] sm:text-xs font-extrabold tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>OFFICIAL STREAMER HUB</span>
          </div>

          <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
            High-Octane <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-400">Hinglish Gaming</span>
          </h3>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-[65ch]">
            {streamerProfile.bio}
          </p>

          {/* Metadata Chips — Horizontal scroll on mobile */}
          <div className="flex flex-wrap gap-2.5 pt-1 text-xs text-neutral-400 font-medium">
            <div className="flex items-center gap-1.5 bg-neutral-950/60 px-3 py-1.5 rounded-xl border border-neutral-800">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>{streamerProfile.location}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-950/60 px-3 py-1.5 rounded-xl border border-neutral-800">
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">{streamerProfile.preferredLanguage}</span>
              <span className="sm:hidden">Hinglish</span>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-950/60 px-3 py-1.5 rounded-xl border border-neutral-800">
              <Flame className="w-3.5 h-3.5 text-red-500" />
              <span>Conqueror / Radiant</span>
            </div>
          </div>

          {/* CTAs - Stacked on mobile */}
          <div className="pt-1 flex flex-col sm:flex-row gap-3">
            <a 
              href="#schedule" 
              className="text-center px-6 py-3 bg-gradient-to-r from-rose-600 to-rose-700 active:from-rose-500 active:to-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-600/30 transition-all text-sm sm:text-base min-h-[48px] flex items-center justify-center"
            >
              Check Stream Schedule
            </a>
            <a 
              href="#chat" 
              className="text-center px-6 py-3 bg-neutral-800 active:bg-neutral-700 text-neutral-200 font-bold rounded-2xl border border-neutral-700 flex items-center justify-center gap-2 transition-all text-sm sm:text-base min-h-[48px]"
            >
              <MessageSquare className="w-4 h-4 text-rose-400" />
              Try Live Chat Simulator
            </a>
          </div>
        </div>

        {/* Right: Stats + Games */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5 lg:border-l lg:border-neutral-800 lg:pl-8">
          
          {/* Intro Video */}
          <div className="space-y-2.5">
            <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              INTRO VIDEO
            </h4>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl group/video transition-all duration-300 hover:border-rose-500/30">
              <video 
                controls
                playsInline
                className="w-full h-full object-cover"
                src="/videos/grok-imagine-video_b_i_am_a_home_page_lan_1.mp4"
              />
            </div>
          </div>

          {/* Games list */}
          <div className="bg-neutral-950/60 border border-neutral-800 rounded-2xl p-4 space-y-2.5">
            <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              PRIMARY GAMES
            </h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center bg-neutral-900/70 px-3 py-2 rounded-xl border border-neutral-800/70">
                <span className="font-bold text-white text-sm">Valorant</span>
                <span className="text-[10px] font-semibold text-rose-400 bg-rose-950/30 px-2 py-0.5 rounded">Radiant</span>
              </div>
              <div className="flex justify-between items-center bg-neutral-900/70 px-3 py-2 rounded-xl border border-neutral-800/70">
                <span className="font-bold text-white text-sm">BGMI / PUBG</span>
                <span className="text-[10px] font-semibold text-amber-400 bg-amber-950/30 px-2 py-0.5 rounded">Conqueror</span>
              </div>
              <div className="flex justify-between items-center bg-neutral-900/70 px-3 py-2 rounded-xl border border-neutral-800/70">
                <span className="font-bold text-white text-sm">GTA V RP</span>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded">Mumbai Mafia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
