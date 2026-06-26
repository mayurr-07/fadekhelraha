import React, { useRef } from 'react';
import { MessageCircle, ArrowUp, Zap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { streamerProfile } from '../data/streamData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const footerRef = useRef<HTMLElement>(null);

  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.from('.footer-reveal', {
      opacity: 0, y: 25, duration: 0.6, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: footerRef.current, start: 'top 90%', toggleActions: 'play none none none' }
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="bg-neutral-950 border-t border-neutral-800/60 pt-12 sm:pt-16 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10 border-b border-neutral-800/60 pb-10">

        <div className="footer-reveal sm:col-span-2 lg:col-span-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-rose-500/40 shrink-0">
              <img src="/images/fade-logo.png" alt="FADE KHELRAHA" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-heading text-2xl font-extrabold tracking-tight text-white">{streamerProfile.name}</span>
              <div className="text-[10px] text-neutral-500 tracking-widest font-semibold -mt-1">{streamerProfile.tagline}</div>
            </div>
          </div>
          <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">India's leading Hinglish gaming creator. High octane streams from Kolkata, every night at 9 PM IST.</p>
          <div className="footer-socials flex items-center gap-3 mt-6">
            <a href={streamerProfile.socials.youtube} target="_blank" rel="noreferrer" className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/60 text-neutral-400 hover:text-red-600 hover:border-red-600/20 hover:bg-neutral-800/60 transition-all active:bg-neutral-800/60 touch-target" title="YouTube">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.53 12 3.53 12 3.53s-7.53 0-9.388.525A3.002 3.002 0 0 0 .5 6.163C0 8.019 0 12 0 12s0 3.981.5 5.837a3.003 3.003 0 0 0 2.11 2.108c1.858.525 9.388.525 9.388.525s7.53 0 9.388-.525a3.003 3.003 0 0 0 2.11-2.108C24 15.981 24 12 24 12s0-3.981-.5-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href={streamerProfile.socials.instagram} target="_blank" rel="noreferrer" className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/60 text-neutral-400 hover:text-pink-500 hover:border-pink-500/20 hover:bg-neutral-800/60 transition-all active:bg-neutral-800/60 touch-target" title="Instagram">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href={streamerProfile.socials.discord} target="_blank" rel="noreferrer" className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/60 text-neutral-400 hover:text-indigo-400 hover:border-indigo-500/20 hover:bg-neutral-800/60 transition-all active:bg-neutral-800/60 touch-target" title="Discord"><MessageCircle className="w-5 h-5" /></a>
            <a href={streamerProfile.socials.twitch} target="_blank" rel="noreferrer" className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/60 text-neutral-400 hover:text-[#9146FF] hover:border-[#9146FF]/20 hover:bg-neutral-800/60 transition-all active:bg-neutral-800/60 touch-target" title="Twitch">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-reveal sm:col-span-1 lg:col-span-3">
          <div className="text-[10px] font-bold tracking-widest uppercase text-neutral-500 mb-4">JUMP TO</div>
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-y-1.5 text-sm font-semibold text-neutral-300">
            {[['Home', 'hero'], ['Schedule', 'schedule'], ['Clips', 'vods'], ['Live Chat', 'chat'], ['Setup', 'gear']].map(([label, id]) => (
              <button key={id} onClick={() => onNavigate(id)} className="text-left py-2.5 active:text-rose-400 min-h-[44px] flex items-center">{label}</button>
            ))}
          </div>
        </div>

        <div className="footer-reveal sm:col-span-1 lg:col-span-4">
          <div className="text-[10px] font-bold tracking-widest uppercase text-neutral-500 mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" /> COMMUNITY
          </div>
          <p className="text-sm text-neutral-400">Every like, share, and chat message keeps the grind alive. Join us on Discord.</p>
          <a href="https://discord.com/invite/JgeNCaJeaM" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center justify-center bg-neutral-800/60 active:bg-neutral-700/60 text-sm font-bold px-6 py-3 rounded-2xl border border-neutral-700/60 w-full sm:w-auto">Join Discord Community</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 text-[11px] text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>© {new Date().getFullYear()} FADE KHELRAHA — All Rights Reserved</div>
        <button onClick={scrollToTop} className="flex items-center gap-1 text-neutral-400 active:text-rose-400 font-medium">Back to top <ArrowUp className="w-3 h-3" /></button>
      </div>

      <button onClick={scrollToTop} className="back-to-top md:hidden flex items-center justify-center bg-neutral-900/60 border border-neutral-800/60 active:bg-neutral-800/60 text-white rounded-full shadow-lg p-3" aria-label="Back to top">
        <ArrowUp className="w-4 h-4" />
      </button>
    </footer>
  );
};
