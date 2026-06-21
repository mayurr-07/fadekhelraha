import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc: string;
  bgImageSrc: string;
  title: string;
  date: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand = 'Scroll to enter',
  textBlend = false,
  children
}) => {
  // Cascading fallback: try user file → stock demo → static image
  const [sourceStage, setSourceStage] = useState<'user' | 'stock' | 'image'>('user');

  const stockVideoUrl = "/videos/7849771-uhd_4096_2160_25fps.mp4";
  const stockPoster = "https://images.pexels.com/photos/9072394/pexels-photo-9072394.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920";

  const handleVideoError = () => {
    setSourceStage(prev => prev === 'user' ? 'stock' : 'image');
  };

  // Determine active source
  const activeVideoSrc = sourceStage === 'user' ? mediaSrc : stockVideoUrl;
  const activePoster = posterSrc || stockPoster;

  return (
    <section id="hero" className="relative min-h-[100dvh] w-full flex flex-col justify-between pt-20 sm:pt-24 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-neutral-950">
      
      {/* Background Media Container */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Static image ONLY shown as final fallback — no ghost shadow when video plays */}
        {sourceStage === 'image' && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgImageSrc || stockPoster})`, filter: 'brightness(0.45) saturate(1.1)' }}
          />
        )}

        {/* Video layer — no opacity hack, fully opaque so no ghost leaks through */}
        {mediaType === 'video' && sourceStage !== 'image' && (
          <video
            key={activeVideoSrc}
            autoPlay
            muted
            loop
            playsInline
            poster={activePoster}
            onError={handleVideoError}
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.52] contrast-[1.08] saturate-[1.2]"
          >
            <source src={activeVideoSrc} type="video/mp4" />
          </video>
        )}

        {/* Gradient overlays — lighter on mobile so video reads better */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/55 via-neutral-950/30 to-neutral-950/50 sm:from-neutral-950/65 sm:via-neutral-950/40 sm:to-neutral-950/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/35 via-transparent to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col items-center justify-center text-center pt-8 sm:pt-10">
        
        {/* Title — stacked on mobile */}
        <h1 className={`font-heading responsive-title font-black tracking-[-2.5px] text-white select-none ${textBlend ? 'mix-blend-overlay opacity-90' : 'drop-shadow-[0_8px_25px_rgba(225,29,72,0.35)]'}`}>
          {title.split(' ')[0]}<br className="block sm:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500">{title.split(' ')[1]}</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-2 sm:mt-3 responsive-subtitle font-extrabold tracking-[1.5px] sm:tracking-[3px] uppercase text-neutral-300 max-w-[90%] sm:max-w-3xl mx-auto drop-shadow-md">
          {date}
        </p>

        {/* Children (AboutIntro) */}
        <div className="w-full mt-4 sm:mt-5">
          {children}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 hidden sm:flex w-full justify-center mt-8 pt-4 opacity-80">
        <a href="#schedule" className="flex flex-col items-center gap-1.5 group cursor-pointer">
          <span className="text-xs uppercase font-bold tracking-widest text-neutral-400 group-hover:text-rose-400 transition-colors">
            {scrollToExpand}
          </span>
          <div className="p-2 bg-neutral-900/70 border border-neutral-800 rounded-full group-hover:border-rose-500/40 group-hover:bg-neutral-900 transition-all">
            <ChevronDown className="w-4 h-4 text-rose-500" />
          </div>
        </a>
      </div>
    </section>
  );
};
