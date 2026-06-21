import React, { useState } from 'react';
import { Tv, Camera, MessageCircle, Radio, Menu, X, Share2 } from 'lucide-react';
import { streamerProfile } from '../data/streamData';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'schedule', label: 'Stream Schedule' },
    { id: 'vods', label: 'Recent Clips & VODs' },
    { id: 'chat', label: 'Interactive Chat' },
    { id: 'gear', label: 'Setup Specs' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  // Close drawer on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  // Prevent body scroll when drawer is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/95 backdrop-blur-lg border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo + Mobile LIVE */}
            <div className="flex items-center gap-3">
              <a 
                href="#hero" 
                onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }} 
                className="flex items-center gap-2 group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-rose-600 to-amber-500 flex items-center justify-center font-heading font-black text-xl sm:text-2xl text-white shadow-lg shadow-rose-600/30 group-active:scale-95 transition-transform">
                  F
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-xl sm:text-2xl lg:text-3xl font-black tracking-wider leading-none text-white">
                    {streamerProfile.name.split(' ')[0]} <span className="text-rose-500">{streamerProfile.name.split(' ')[1]}</span>
                  </span>
                  <span className="text-[10px] sm:text-xs text-neutral-400 font-semibold tracking-widest uppercase hidden sm:block">
                    {streamerProfile.tagline}
                  </span>
                </div>
              </a>

              {/* Live badge - hidden on very small screens, visible from tablet */}
              <div className="hidden sm:flex items-center gap-1.5 bg-rose-950/50 border border-rose-500/30 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-rose-400">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400" />
                <span className="hidden md:inline">LIVE AT 9 PM IST</span>
                <span className="md:hidden">LIVE 9PM</span>
              </div>
            </div>

            {/* Desktop / Tablet Navigation (1024px+) */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeSection === link.id
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Tablet (768-1023px): Compact links + socials */}
            <div className="hidden md:flex lg:hidden items-center gap-1">
              {navLinks.slice(0, 4).map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    activeSection === link.id
                      ? 'bg-rose-600 text-white'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {link.label.replace('Stream ', '').replace('Interactive ', '')}
                </button>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Desktop social + Share */}
              <div className="hidden lg:flex items-center gap-2">
                <a 
                  href={streamerProfile.socials.youtube} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-red-500 hover:bg-neutral-800 transition-all"
                  title="YouTube"
                >
                  <Tv className="w-4 h-4" />
                </a>
                <a 
                  href={streamerProfile.socials.instagram} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-pink-500 hover:bg-neutral-800 transition-all"
                  title="Instagram"
                >
                  <Camera className="w-4 h-4" />
                </a>
                <a 
                  href={streamerProfile.socials.discord} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-indigo-400 hover:bg-neutral-800 transition-all"
                  title="Discord"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-2 rounded-xl text-xs font-semibold transition-all border border-neutral-700"
                >
                  <Share2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>{copied ? 'Copied!' : 'Share'}</span>
                </button>
              </div>

              {/* Tablet: Just share button */}
              <button
                onClick={handleCopyLink}
                className="hidden md:flex lg:hidden items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-2.5 py-1.5 rounded-xl text-xs font-semibold border border-neutral-700"
              >
                <Share2 className="w-3.5 h-3.5 text-rose-500" />
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-3 -mr-1 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 active:bg-neutral-800 touch-target"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== FULL-SCREEN MOBILE DRAWER (320px - 767px) ===== */}
      {mobileMenuOpen && (
        <div 
          className="mobile-drawer md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="absolute inset-0 bg-neutral-950 flex flex-col safe-top"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-600 to-amber-500 flex items-center justify-center font-heading font-black text-lg text-white">
                  F
                </div>
                <span className="font-heading text-xl font-black tracking-wider text-white">FADE KHELRAHA</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="p-3 -mr-2 text-neutral-400 active:text-white touch-target"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links - Large Touch Targets */}
            <div className="flex-1 px-4 py-4 overflow-y-auto">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`mobile-touch w-full flex items-center justify-between px-5 rounded-2xl text-left text-lg font-semibold transition-all active:scale-[0.985] ${
                      activeSection === link.id
                        ? 'bg-rose-600 text-white'
                        : 'text-neutral-200 active:bg-neutral-800'
                    }`}
                  >
                    <span>{link.label}</span>
                    {activeSection === link.id && (
                      <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded">ACTIVE</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-neutral-800" />

              {/* Social Links in Drawer */}
              <div className="px-2">
                <div className="text-xs font-bold text-neutral-400 tracking-widest uppercase mb-3 px-3">CONNECT</div>
                <div className="flex gap-3">
                  <a 
                    href={streamerProfile.socials.youtube} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-300 active:bg-neutral-800 touch-target"
                  >
                    <Tv className="w-5 h-5" />
                    <span className="font-semibold text-sm">YouTube</span>
                  </a>
                  <a 
                    href={streamerProfile.socials.instagram} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-300 active:bg-neutral-800 touch-target"
                  >
                    <Camera className="w-5 h-5" />
                    <span className="font-semibold text-sm">Instagram</span>
                  </a>
                  <a 
                    href={streamerProfile.socials.discord} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-300 active:bg-neutral-800 touch-target"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-semibold text-sm">Discord</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-neutral-800 safe-bottom">
              <button
                onClick={handleCopyLink}
                className="mobile-touch w-full flex items-center justify-center gap-2 bg-neutral-800 active:bg-neutral-700 text-neutral-100 py-4 rounded-2xl font-bold border border-neutral-700 text-base"
              >
                <Share2 className="w-5 h-5 text-rose-500" />
                {copied ? 'Link Copied to Clipboard!' : 'Share Streamer Hub'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
