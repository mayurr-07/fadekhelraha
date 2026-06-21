import React from 'react';
import { Tv, Camera, MessageCircle, ArrowUp, Zap } from 'lucide-react';
import { streamerProfile } from '../data/streamData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 pt-12 sm:pt-16 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10 border-b border-neutral-800 pb-10">
        
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-amber-500 flex items-center justify-center font-heading font-black text-2xl text-white">
              F
            </div>
            <div>
              <span className="font-heading text-2xl font-black tracking-wider text-white">{streamerProfile.name}</span>
              <div className="text-[10px] text-neutral-400 tracking-widest font-semibold -mt-1">{streamerProfile.tagline}</div>
            </div>
          </div>
          <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
            India's leading Hinglish gaming creator. High octane streams from Mumbai, every night at 9 PM IST.
          </p>

          {/* Social icons - larger on mobile */}
          <div className="footer-socials flex items-center gap-3 mt-6">
            <a href={streamerProfile.socials.youtube} target="_blank" rel="noreferrer" className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-300 active:bg-neutral-800 touch-target">
              <Tv className="w-5 h-5" />
            </a>
            <a href={streamerProfile.socials.instagram} target="_blank" rel="noreferrer" className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-300 active:bg-neutral-800 touch-target">
              <Camera className="w-5 h-5" />
            </a>
            <a href={streamerProfile.socials.discord} target="_blank" rel="noreferrer" className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-300 active:bg-neutral-800 touch-target">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="sm:col-span-1 lg:col-span-3">
          <div className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-4">JUMP TO</div>
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-y-1.5 text-sm font-semibold text-neutral-300">
            {[
              ['Home', 'hero'], ['Schedule', 'schedule'], ['Clips', 'vods'],
              ['Live Chat', 'chat'], ['Setup', 'gear']
            ].map(([label, id]) => (
              <button key={id} onClick={() => onNavigate(id)} className="text-left py-2.5 active:text-rose-400 min-h-[44px] flex items-center">
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Support */}
        <div className="sm:col-span-1 lg:col-span-4">
          <div className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" /> COMMUNITY
          </div>
          <p className="text-sm text-neutral-400">Every like, share, and chat message keeps the grind alive. Join us on Discord.</p>
          
          <a 
            href="https://discord.gg/fadekhelraha" 
            target="_blank" 
            rel="noreferrer"
            className="mt-4 inline-flex items-center justify-center bg-neutral-800 active:bg-neutral-700 text-sm font-bold px-6 py-3 rounded-2xl border border-neutral-700 w-full sm:w-auto"
          >
            Join Discord Community
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto pt-6 text-[11px] text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>© {new Date().getFullYear()} FADE KHELRAHA — All Rights Reserved</div>
        <button 
          onClick={scrollToTop}
          className="flex items-center gap-1 text-neutral-400 active:text-rose-400 font-medium"
        >
          Back to top <ArrowUp className="w-3 h-3" />
        </button>
      </div>

      {/* Fixed Back to Top Button (Mobile) */}
      <button 
        onClick={scrollToTop}
        className="back-to-top md:hidden flex items-center justify-center bg-neutral-900 border border-neutral-800 active:bg-neutral-800 text-white rounded-full shadow-lg p-3"
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </footer>
  );
};
