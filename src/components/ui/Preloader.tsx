import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
  onExitStart?: () => void;
}



export default function Preloader({ onComplete, onExitStart }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"counting" | "reveal" | "exit">("counting");
  const [glitch, setGlitch] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const glitchRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  console.log("Preloader render: phase =", phase, "count =", count);

  // Lock scroll while preloading
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Glitch effect trigger
  useEffect(() => {
    const triggerGlitch = () => {
      setGlitch(true);
      glitchRef.current = setTimeout(() => setGlitch(false), 150);
    };
    const g1 = setTimeout(triggerGlitch, 600);
    const g2 = setTimeout(triggerGlitch, 1400);
    const g3 = setTimeout(triggerGlitch, 2200);
    return () => { clearTimeout(g1); clearTimeout(g2); clearTimeout(g3); };
  }, []);

  // Counter from 0 to 100
  useEffect(() => {
    let current = 0;
    intervalRef.current = setInterval(() => {
      // Ease out — slow near 100
      const remaining = 100 - current;
      const step = Math.max(1, Math.floor(remaining / 12));
      current = Math.min(100, current + step);
      setCount(current);
      if (current >= 100) {
        clearInterval(intervalRef.current!);
        // Pause at 100 then go to reveal phase
        setTimeout(() => setPhase("reveal"), 400);
      }
    }, 38);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  // After reveal, trigger exit
  useEffect(() => {
    if (phase === "reveal") {
      const t = setTimeout(() => setPhase("exit"), 1600);
      return () => clearTimeout(t);
    }
    if (phase === "exit") {
      onExitStart?.();
      const t = setTimeout(() => { onComplete?.(); }, 600);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete, onExitStart]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#050508] overflow-hidden"
        >
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-[0.035]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.6) 2px, rgba(255,255,255,0.6) 3px)",
            }}
          />

          {/* Noise grain */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-[0.06]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "128px 128px",
            }}
          />

          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose-600/[0.07] blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-rose-500/[0.05] blur-[60px]" />
          </div>

          {/* Corner decorations */}
          {[
            "top-6 left-6 border-t border-l",
            "top-6 right-6 border-t border-r",
            "bottom-6 left-6 border-b border-l",
            "bottom-6 right-6 border-b border-r",
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 + i * 0.05, duration: 0.5 } }}
              className={`absolute ${cls} w-8 h-8 border-rose-500/40`}
            />
          ))}

          {/* Main content */}
          <div className="relative z-20 flex flex-col items-center text-center px-6">

            {/* Top label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6 } }}
              className="flex items-center gap-2 mb-6 sm:mb-10"
            >
              <span className="w-1 h-1 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-neutral-500 font-mono">
                LOADING EXPERIENCE
              </span>
              <span className="w-1 h-1 rounded-full bg-rose-500 animate-pulse" />
            </motion.div>

            {/* Title container with gamepad in the background */}
            <div className="relative flex flex-col items-center justify-center w-full py-2 sm:py-4 mb-16 sm:mb-20 md:mb-28">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{
                  opacity: phase === "reveal" ? 0.14 : count > 20 ? 0.1 : 0,
                  scale: phase === "reveal" ? 1.05 : 1,
                  transition: { duration: 1.5, ease: "easeOut" },
                }}
                className="absolute z-0 pointer-events-none text-rose-500 select-none flex items-center justify-center w-56 h-56 xs:w-64 xs:h-64 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px]"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    // Blinks 3 times then settles to a solid glow
                    opacity: [0, 1, 0.2, 1, 0.1, 1, 0.8, 1],
                  }}
                  transition={{
                    duration: 1.2,
                    times: [0, 0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 1],
                    ease: "linear",
                    delay: 0.8
                  }}
                  style={{ filter: "drop-shadow(0 0 20px rgba(244, 63, 94, 0.85))" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <svg viewBox="0 0 120 80" className="w-full h-full fill-none stroke-current" xmlns="http://www.w3.org/2000/svg">
                    {/* Controller Body Silhouette */}
                    <path d="M25 15 C45 10, 75 10, 95 15 C105 18, 115 30, 112 50 C109 68, 100 78, 92 76 C85 74, 80 62, 75 58 C68 53, 52 53, 45 58 C40 62, 35 74, 28 76 C20 78, 11 68, 8 50 C5 30, 15 18, 25 15 Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Inner Body Glow Line */}
                    <path d="M28 18 C46 13, 74 13, 92 18 C101 21, 109 32, 107 49 C104 65, 96 73, 90 71 C84 69, 79 59, 75 55 C68 50, 52 50, 45 55 C41 59, 36 69, 30 71 C24 73, 16 65, 13 49 C11 32, 19 21, 28 18 Z" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />

                    {/* D-Pad (Left) - Corrected Symmetric Path */}
                    <path d="M26 34 v-6 h4 v6 h6 v4 h-6 v6 h-4 v-6 h-6 v-4 z" fill="currentColor" opacity="0.1" />
                    <path d="M26 34 v-6 h4 v6 h6 v4 h-6 v6 h-4 v-6 h-6 v-4 z" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Action Buttons Background (Right) */}
                    <circle cx="92" cy="36" r="14" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />

                    {/* Triangle (Top) */}
                    <circle cx="92" cy="26" r="3.5" strokeWidth="0.8" />
                    <path d="M92 24.5 L94 27.5 L90 27.5 Z" strokeWidth="0.6" fill="currentColor" opacity="0.6" />

                    {/* Square (Left) */}
                    <circle cx="82" cy="36" r="3.5" strokeWidth="0.8" />
                    <rect x="80.5" y="34.5" width="3" height="3" strokeWidth="0.6" fill="currentColor" opacity="0.6" />

                    {/* Circle (Right) */}
                    <circle cx="102" cy="36" r="3.5" strokeWidth="0.8" />
                    <circle cx="102" cy="36" r="1.5" strokeWidth="0.6" fill="currentColor" opacity="0.6" />

                    {/* Cross (Bottom) */}
                    <circle cx="92" cy="46" r="3.5" strokeWidth="0.8" />
                    <path d="M90.5 44.5 L93.5 47.5 M93.5 44.5 L90.5 47.5" strokeWidth="0.8" />

                    {/* Left Thumbstick */}
                    <circle cx="44" cy="46" r="8" strokeWidth="1" />
                    <circle cx="44" cy="46" r="6" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.6" />
                    <circle cx="44" cy="46" r="3" strokeWidth="0.8" fill="currentColor" opacity="0.3" />

                    {/* Right Thumbstick */}
                    <circle cx="76" cy="46" r="8" strokeWidth="1" />
                    <circle cx="76" cy="46" r="6" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.6" />
                    <circle cx="76" cy="46" r="3" strokeWidth="0.8" fill="currentColor" opacity="0.3" />

                    {/* Central Touchpad Panel */}
                    <path d="M46 18 h28 v12 C74 34, 46 34, 46 32 Z" strokeWidth="1" strokeLinecap="round" />
                    <path d="M50 22 h20 M50 26 h20" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />

                    {/* Top Neon LED Indicator Bar */}
                    <path d="M52 13 h16" strokeWidth="3" strokeLinecap="round" stroke="currentColor" opacity="0.8" />

                    {/* Start/Select Buttons */}
                    <path d="M38 28 L42 26 L42 30 Z" strokeWidth="0.5" fill="currentColor" opacity="0.5" />
                    <path d="M82 28 L78 26 L78 30 Z" strokeWidth="0.5" fill="currentColor" opacity="0.5" />
                  </svg>
                </motion.div>
              </motion.div>

              <div className="relative z-10 flex flex-col items-center">
                {/* FADE KHELRAHA — main title */}
                <div className="relative overflow-hidden mb-2">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={{
                      y: phase === "reveal" ? "0%" : count > 50 ? "0%" : "110%",
                      transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] },
                    }}
                    className={`font-heading font-extrabold tracking-tight text-white leading-none ${glitch ? "translate-x-[3px] opacity-90" : ""}`}
                    style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
                  >
                    FADE
                  </motion.h1>
                </div>

                <div className="relative overflow-hidden">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={{
                      y: phase === "reveal" ? "0%" : count > 65 ? "0%" : "110%",
                      transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: 0.08 },
                    }}
                    className={`font-heading font-extrabold tracking-tight leading-none ${glitch ? "-translate-x-[2px]" : ""}`}
                    style={{
                      fontSize: "clamp(2rem, 6vw, 5rem)",
                      background: "linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    KHELRAHA
                  </motion.h1>
                </div>
              </div>
            </div>

            {/* Removed horizontal divider as per user request */}

            {/* Progress bar */}
            <div className="w-48 xs:w-56 sm:w-72 mb-4 relative">
              <div className="h-[1px] w-full bg-neutral-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-full"
                  style={{ width: `${count}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.4 } }}
              className="font-mono text-xs tracking-[0.2em] text-neutral-600"
            >
              <span className="text-rose-500 font-bold">{String(count).padStart(3, "0")}</span>
            </motion.div>

            {/* Tagline — fades in at the end */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{
                opacity: phase === "reveal" ? 0.45 : 0,
                y: phase === "reveal" ? 0 : 6,
                transition: { duration: 0.6, delay: 0.3 },
              }}
              className="mt-6 text-[11px] tracking-[0.25em] uppercase text-neutral-500 font-mono"
            >
              Indian Gamer · Hinglish Streams
            </motion.p>
          </div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.5 } }}
            className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-between px-8 sm:px-12"
          >
            <span className="text-[9px] font-mono tracking-widest text-neutral-700 uppercase">Est. 2021</span>
            <span className="text-[9px] font-mono tracking-widest text-neutral-700 uppercase">Kolkata · India</span>
          </motion.div>

          {/* Exit curtain — two panels sliding up */}
          {phase === "exit" && (
            <>
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
                className="absolute inset-0 z-30 bg-rose-600"
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.08 } }}
                className="absolute inset-0 z-40 bg-[#050508]"
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
