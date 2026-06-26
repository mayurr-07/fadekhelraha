import React, { useState, useRef } from 'react';
import { MessageCircle, Radio, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { streamerProfile } from '../data/streamData';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'vods', label: 'Clips & Video' },
    { id: 'chat', label: 'Live Chat' },
    { id: 'gear', label: 'Setup' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  // GSAP drawer animation
  useGSAP(() => {
    if (!drawerRef.current) return;
    const links = drawerRef.current.querySelectorAll('.drawer-link');
    if (mobileMenuOpen) {
      gsap.fromTo(links,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, stagger: 0.05, duration: 0.4, ease: 'power2.out', delay: 0.1 }
      );
    }
  }, { scope: drawerRef, dependencies: [mobileMenuOpen] });

  // Close on Escape
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  // Prevent body scroll when drawer open
  React.useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 nav-glass">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }} className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-rose-500/40 shadow-lg shadow-rose-600/25 group-active:scale-95 transition-transform shrink-0">
                  <img src="/images/fade-logo.png" alt="FADE KHELRAHA" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center items-start">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-xl sm:text-2xl lg:text-[1.65rem] font-extrabold tracking-tight leading-none text-white whitespace-nowrap">
                      FADE <span className="text-rose-500">KHELRAHA</span>
                    </span>
                    {/* Live badge */}
                    <div className="hidden sm:flex items-center gap-1.5 bg-rose-950/50 border border-rose-500/25 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold text-rose-400 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                      <Radio className="w-3.5 h-3.5" />
                      <span className="hidden md:inline">LIVE AT 9 PM IST</span>
                      <span className="md:hidden">9PM</span>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-neutral-500 font-semibold tracking-widest uppercase hidden sm:block">
                    {streamerProfile.tagline}
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop nav (1024px+) */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeSection === link.id
                      ? 'text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-rose-500 to-amber-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Tablet compact nav (768-1023px) */}
            <div className="hidden md:flex lg:hidden items-center gap-1">
              {navLinks.slice(0, 4).map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activeSection === link.id ? 'bg-rose-600/20 text-rose-400' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-2">
                <a href={streamerProfile.socials.youtube} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-neutral-900/60 border border-neutral-800/60 text-neutral-400 hover:text-red-600 hover:bg-neutral-800/60 transition-all" title="YouTube">
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.53 12 3.53 12 3.53s-7.53 0-9.388.525A3.002 3.002 0 0 0 .5 6.163C0 8.019 0 12 0 12s0 3.981.5 5.837a3.003 3.003 0 0 0 2.11 2.108c1.858.525 9.388.525 9.388.525s7.53 0 9.388-.525a3.003 3.003 0 0 0 2.11-2.108C24 15.981 24 12 24 12s0-3.981-.5-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href={streamerProfile.socials.instagram} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-neutral-900/60 border border-neutral-800/60 text-neutral-400 hover:text-pink-500 hover:bg-neutral-800/60 transition-all" title="Instagram">
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href={streamerProfile.socials.discord} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-neutral-900/60 border border-neutral-800/60 text-neutral-400 hover:text-indigo-400 hover:bg-neutral-800/60 transition-all" title="Discord"><MessageCircle className="w-[18px] h-[18px]" /></a>
                <a href={streamerProfile.socials.twitch} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-neutral-900/60 border border-neutral-800/60 text-neutral-400 hover:text-[#9146FF] hover:bg-neutral-800/60 transition-all" title="Twitch">
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
                  </svg>
                </a>
              </div>

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-3 -mr-1 rounded-xl bg-neutral-900/60 border border-neutral-800/60 text-neutral-300 active:bg-neutral-800 touch-target" aria-label="Toggle menu">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div ref={drawerRef} className="absolute inset-0 bg-neutral-950/98 flex flex-col safe-top" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 h-16 border-b border-neutral-800/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-rose-500/40 shrink-0">
                  <img src="/images/fade-logo.png" alt="FADE KHELRAHA" className="w-full h-full object-cover" />
                </div>
                <span className="font-heading text-lg font-extrabold tracking-tight text-white">FADE KHELRAHA</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-3 -mr-2 text-neutral-400 active:text-white touch-target" aria-label="Close menu"><X className="w-6 h-6" /></button>
            </div>

            <div className="flex-1 px-5 py-5 overflow-y-auto">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`drawer-link mobile-touch w-full flex items-center justify-between px-5 rounded-2xl text-left text-lg font-semibold transition-all active:scale-[0.985] ${
                      activeSection === link.id ? 'bg-rose-600/15 text-rose-400' : 'text-neutral-200 active:bg-neutral-800/50'
                    }`}
                  >
                    <span>{link.label}</span>
                    {activeSection === link.id && <span className="w-2 h-2 rounded-full bg-rose-500" />}
                  </button>
                ))}
              </div>

              <div className="my-6 h-px bg-neutral-800/60" />

              <div className="px-1">
                <div className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase mb-3 px-3">CONNECT</div>
                <div className="grid grid-cols-2 gap-2.5">
                  <a href={streamerProfile.socials.youtube} target="_blank" rel="noreferrer" className="drawer-link flex items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/60 text-neutral-300 active:bg-neutral-800 touch-target">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-600" fill="currentColor">
                      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.53 12 3.53 12 3.53s-7.53 0-9.388.525A3.002 3.002 0 0 0 .5 6.163C0 8.019 0 12 0 12s0 3.981.5 5.837a3.003 3.003 0 0 0 2.11 2.108c1.858.525 9.388.525 9.388.525s7.53 0 9.388-.525a3.003 3.003 0 0 0 2.11-2.108C24 15.981 24 12 24 12s0-3.981-.5-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span className="font-semibold text-sm">YouTube</span>
                  </a>
                  <a href={streamerProfile.socials.instagram} target="_blank" rel="noreferrer" className="drawer-link flex items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/60 text-neutral-300 active:bg-neutral-800 touch-target">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                    <span className="font-semibold text-sm">Instagram</span>
                  </a>
                  <a href={streamerProfile.socials.discord} target="_blank" rel="noreferrer" className="drawer-link flex items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/60 text-neutral-300 active:bg-neutral-800 touch-target">
                    <MessageCircle className="w-5 h-5 text-indigo-400" /><span className="font-semibold text-sm">Discord</span>
                  </a>
                  <a href={streamerProfile.socials.twitch} target="_blank" rel="noreferrer" className="drawer-link flex items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/60 text-neutral-300 active:bg-neutral-800 touch-target">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#9146FF]" fill="currentColor">
                      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
                    </svg>
                    <span className="font-semibold text-sm">Twitch</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
