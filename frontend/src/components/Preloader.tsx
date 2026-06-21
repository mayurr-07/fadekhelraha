import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Radio, ShieldCheck } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const statusMessages = [
    "BOOTING SYSTEM RIG...",
    "OVERCLOCKING INTEL I9-14900K...",
    "HEATING UP LIQUID-COOLED RTX 4090...",
    "CONNECTING TO MUMBAI SERVERS...",
    "CALIBRATING 360Hz DyAc+ ESPORTS MONITOR...",
    "TUNING SHURE SM7B VOICE COMPRESSOR...",
    "LOADING VALORANT CLUTCH RECORDINGS...",
    "SPAMMING 'FADE OP' IN THE DISCORD CHAT...",
    "ESTABLISHING SECURE CONNECTION...",
    "RIG CONFIGURED. WELCOME FADE."
  ];

  // Simulating progress bar
  useEffect(() => {
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      // Randomized increments to make it feel natural and dynamic
      const increment = Math.floor(Math.random() * 8) + 4; 
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(currentProgress);

      // Update status messages based on current progress
      const targetStatusIndex = Math.min(
        Math.floor((currentProgress / 100) * statusMessages.length),
        statusMessages.length - 1
      );
      setStatusIndex(targetStatusIndex);

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Add a slight delay at 100% for impact, then start fade out
        setTimeout(() => {
          setFadeOut(true);
          // Wait for CSS transition (600ms) before completing
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 800);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-neutral-950 flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ease-out-expo ${
        fadeOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Cyberpunk Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-scanlines z-10" />

      {/* Cyber Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />

      {/* Main Panel */}
      <div className="relative z-20 flex flex-col items-center max-w-lg w-full px-6 text-center select-none">
        
        {/* Animated Cyber HUD Circle */}
        <div className="relative w-36 h-36 mb-10 flex items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-rose-500/10 border-t-rose-500 border-b-rose-500 animate-spin" style={{ animationDuration: '4s' }} />
          
          {/* Middle Dash Ring */}
          <div className="absolute inset-2 rounded-full border border-dashed border-amber-500/30 border-r-amber-500 animate-spin-reverse" style={{ animationDuration: '6s' }} />
          
          {/* Inner Glowing Core */}
          <div className="w-24 h-24 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-lg shadow-rose-500/10">
            <span className="font-heading font-black text-5xl text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500 animate-pulse">
              F
            </span>
          </div>

          {/* Core HUD Dots */}
          <div className="absolute top-0 w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
          <div className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
        </div>

        {/* Title */}
        <div className="space-y-1 mb-2">
          <div className="inline-flex items-center gap-1.5 text-xs text-rose-500 font-extrabold tracking-[0.25em] uppercase">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>FADE KHELRAHA</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black tracking-[-1px] text-white">
            INITIALIZING <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500">RIG SYSTEM</span>
          </h1>
        </div>

        {/* Status Window */}
        <div className="w-full bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-4 mb-6 text-left font-mono text-[10px] sm:text-xs text-neutral-400 backdrop-blur-md shadow-inner relative overflow-hidden min-h-[76px] flex flex-col justify-center">
          <div className="absolute top-2 right-3 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[8px] text-emerald-500 uppercase font-bold tracking-wider">ONLINE</span>
          </div>
          <div className="flex items-start gap-2">
            <Terminal className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" />
            <div className="space-y-1 flex-1">
              <p className="text-neutral-500 font-bold">LOG_CHANNEL_01 // PROGRESS {progress}%</p>
              <p className="text-neutral-200 font-bold tracking-wide animate-pulse">
                {statusMessages[statusIndex]}
              </p>
            </div>
          </div>
        </div>

        {/* Futuristic Loading Bar */}
        <div className="w-full space-y-2">
          <div className="flex justify-between items-end text-xs font-bold font-mono">
            <span className="text-neutral-500 tracking-wider">SYSTEM LOAD</span>
            <span className="text-rose-500">{progress}%</span>
          </div>
          
          {/* Progress bar container */}
          <div className="h-2 w-full bg-neutral-900 border border-neutral-800 rounded-full p-0.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_rgba(244,63,94,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[9px] font-bold text-neutral-600 font-mono tracking-widest uppercase pt-1">
            <div className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-neutral-600" />
              <span>CORE_TEMP_42C</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-neutral-600" />
              <span>SECURE_BOOT</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
