import React, { useState, useEffect, useRef } from 'react';
import type { ComponentProps, HTMLAttributes, VideoHTMLAttributes } from 'react';
import { Eye, Calendar, Film, X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { clipsData, Clip } from '../data/streamData';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

export type StoriesProps = ComponentProps<typeof Carousel>;

export const Stories = ({ className, ...props }: StoriesProps) => (
  <Carousel
    className={`w-full ${className || ''}`}
    {...props}
  />
);

export type StoriesContentProps = ComponentProps<typeof CarouselContent>;

export const StoriesContent = React.forwardRef<
  HTMLDivElement,
  StoriesContentProps
>(({ className, ...props }, ref) => (
  <CarouselContent ref={ref} className={`gap-4 py-4 px-1 ${className || ''}`} {...props} />
));

export type StoryProps = HTMLAttributes<HTMLDivElement>;

export const Story = ({ className, children, ...props }: StoryProps) => (
  <CarouselItem className="basis-auto !w-[220px]">
    <div
      className={`group relative rounded-2xl paper-card shining-border cursor-pointer h-[360px] w-full ${className || ''}`}
      role="button"
      tabIndex={0}
      {...props}
    >
      <div className="relative w-full h-full rounded-[inherit] overflow-hidden z-10">
        {children}
      </div>
    </div>
  </CarouselItem>
);

export type StoryVideoProps = VideoHTMLAttributes<HTMLVideoElement>;

const tRegex = /t=(\d+(?:\.\d+)?)/;

export const StoryVideo = ({ className, ...props }: StoryVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const initialTimeRef = useRef<number>(0);

  useEffect(() => {
    const src = (props.src ?? '') as string;
    let initialTime = 0;
    if (typeof src === 'string') {
      const hashIndex = src.indexOf('#');
      if (hashIndex !== -1) {
        const hash = src.slice(hashIndex + 1);
        const tMatch = hash.match(tRegex);
        if (tMatch) {
          initialTime = Number.parseFloat(tMatch[1]);
        }
      }
    }
    initialTimeRef.current = initialTime;
  }, [props.src]);

  const handleMouseOver = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseOut = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = initialTimeRef.current;
    }
  };

  const handleFocus = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleBlur = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = initialTimeRef.current;
    }
  };

  return (
    <video
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90 ${className || ''}`}
      loop
      muted
      onBlur={handleBlur}
      onFocus={handleFocus}
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
      preload="metadata"
      ref={videoRef}
      tabIndex={0}
      {...props}
    />
  );
};

export type StoryImageProps = ComponentProps<'img'> & {
  alt: string;
};

export const StoryImage = ({ className, alt, ...props }: StoryImageProps) => (
  <img
    alt={alt}
    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-90 ${className || ''}`}
    {...props}
  />
);

export type StoryAuthorProps = HTMLAttributes<HTMLDivElement>;

export const StoryAuthor = ({ className, children, ...props }: StoryAuthorProps) => (
  <div
    className={`absolute right-0 bottom-0 left-0 z-10 p-4 text-white ${className || ''}`}
    {...props}
  >
    <div className="flex flex-col gap-2">{children}</div>
  </div>
);

export type StoryAuthorImageProps = ComponentProps<typeof Avatar> & {
  src?: string;
  name?: string;
  fallback?: string;
};

export const StoryAuthorImage = ({ src, fallback, name, className, ...props }: StoryAuthorImageProps) => (
  <Avatar className={`w-7 h-7 border border-white/20 shadow-md ${className || ''}`} {...props}>
    {src && <AvatarImage alt={name} src={src} />}
    <AvatarFallback className="bg-white/10 text-white text-xs">
      {fallback || name?.charAt(0)?.toUpperCase()}
    </AvatarFallback>
  </Avatar>
);

export type StoryAuthorNameProps = HTMLAttributes<HTMLSpanElement>;

export const StoryAuthorName = ({ className, ...props }: StoryAuthorNameProps) => (
  <span className={`truncate font-bold text-xs text-neutral-300 ${className || ''}`} {...props} />
);

export type StoryTitleProps = HTMLAttributes<HTMLDivElement>;

export const StoryTitle = ({ className, ...props }: StoryTitleProps) => (
  <div
    className={`absolute top-0 right-0 left-0 z-10 p-4 text-white flex justify-between items-center ${className || ''}`}
    {...props}
  />
);

export type StoryOverlayProps = HTMLAttributes<HTMLDivElement> & {
  side?: 'top' | 'bottom';
};

export const StoryOverlay = ({ className, side = 'bottom', ...props }: StoryOverlayProps) => {
  const positionClasses =
    side === 'top' ? 'top-0 bg-gradient-to-b from-black/60 to-transparent' : 'bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent';

  return (
    <div
      className={`absolute right-0 left-0 h-28 pointer-events-none z-0 ${positionClasses} ${className || ''}`}
      {...props}
    />
  );
};

export const VideoGrid: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'vod' | 'clip'>('all');
  const [activeVideo, setActiveVideo] = useState<Clip | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const filteredClips = clipsData.filter(clip => filter === 'all' || clip.type === filter);

  useEffect(() => {
    if (activeVideo) { document.body.classList.add('modal-open'); } else { document.body.classList.remove('modal-open'); }
    return () => document.body.classList.remove('modal-open');
  }, [activeVideo]);

  const closeModal = () => setActiveVideo(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    gsap.from('.vods-reveal', {
      opacity: 0, y: 30, duration: 0.6, stagger: 0.06, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none none' }
    });
  }, { scope: sectionRef });

  return (
    <section id="vods" ref={sectionRef} className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-neutral-800/60 pb-5 gap-5">
        <div>
          <div className="vods-reveal inline-flex items-center gap-2 text-rose-500 font-bold text-xs tracking-widest uppercase mb-2 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-lg">
            <Film className="w-3.5 h-3.5" /><span>Highlights & Shorts</span>
          </div>
          <h2 className="vods-reveal font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            RECENT <span className="text-rose-500">CLIPS & VIDEO</span>
          </h2>
          <p className="vods-reveal text-neutral-400 text-sm sm:text-base mt-1">Top clutches, funny moments & full recordings (Hover to preview)</p>
        </div>
      </div>

      <div className="vods-reveal mb-4">
        <div className="filter-scroll flex gap-2 pb-2 -mx-1 px-1">
          {[{ label: 'All Videos', value: 'all' as const }, { label: 'Full VODs', value: 'vod' as const }, { label: 'Viral Shorts 🔥', value: 'clip' as const }].map((btn) => (
            <button key={btn.value} onClick={() => setFilter(btn.value)} className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border touch-target ${filter === btn.value ? 'bg-rose-600 text-white border-rose-600' : 'bg-neutral-900/60 border-neutral-800/60 text-neutral-300 active:bg-neutral-800'}`}>
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stories Carousel */}
      <div className="vods-reveal relative w-full group/carousel">
        <Stories>
          <StoriesContent ref={scrollRef}>
            {filteredClips.map((clip) => (
              <Story key={clip.id} onClick={() => setActiveVideo(clip)}>
                  <StoryOverlay side="top" />
                  <StoryOverlay side="bottom" />
                  
                  {/* Plays video preview on mouse over */}
                  <StoryVideo src={clip.videoUrl} poster={clip.thumbnail} />
                  
                  {/* Header elements inside card */}
                  <StoryTitle>
                    <span className="bg-neutral-950/95 border border-neutral-800/80 text-[10px] px-2 py-0.5 rounded-lg font-bold tracking-wide">
                      {clip.game}
                    </span>
                    {clip.type === 'clip' ? (
                      <span className="bg-amber-500 text-neutral-950 text-[9px] font-black px-1.5 py-0.5 rounded tracking-wider">
                        SHORT
                      </span>
                    ) : (
                      <span className="bg-rose-600/90 text-white text-[9px] font-black px-1.5 py-0.5 rounded tracking-wider">
                        VOD
                      </span>
                    )}
                  </StoryTitle>

                  {/* Footer elements inside card */}
                  <StoryAuthor>
                    <div className="flex items-center gap-1.5">
                      <StoryAuthorImage src="/images/fade-logo.png" name="FADE" />
                      <StoryAuthorName>FADE KHELRAHA</StoryAuthorName>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug line-clamp-2 mt-0.5 drop-shadow-md">
                      {clip.title}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] text-neutral-300 mt-1 font-semibold">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-rose-500" />{clip.views}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{clip.date}</span>
                    </div>
                  </StoryAuthor>
                </Story>
            ))}
          </StoriesContent>
        </Stories>

        {/* Navigation Arrow Mover Buttons */}
        <button 
          onClick={scrollLeft} 
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-neutral-950/85 border border-neutral-800/80 hover:border-neutral-700/80 active:scale-95 text-neutral-400 hover:text-white flex items-center justify-center shadow-lg transition-all opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 touch-target cursor-pointer"
          title="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={scrollRight} 
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-neutral-950/85 border border-neutral-800/80 hover:border-neutral-700/80 active:scale-95 text-neutral-400 hover:text-white flex items-center justify-center shadow-lg transition-all opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 touch-target cursor-pointer"
          title="Scroll Right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="video-modal" onClick={closeModal}>
          <div className="video-modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between p-4 sm:p-5 border-b border-neutral-800/60 bg-neutral-950">
              <div className="pr-3">
                <div className="text-xs font-bold text-rose-400 mb-0.5">{activeVideo.game}</div>
                <h3 className="font-bold text-white text-sm sm:text-lg leading-tight pr-6">{activeVideo.title}</h3>
              </div>
              <button onClick={closeModal} className="p-2.5 -mt-1 -mr-1 text-neutral-400 active:text-white bg-neutral-900 rounded-full touch-target"><X className="w-5 h-5" /></button>
            </div>
            <div className="bg-black relative aspect-video w-full">
              <video autoPlay controls playsInline className="w-full h-full object-contain" src={activeVideo.videoUrl} />
            </div>
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-neutral-950 text-sm">
              <div className="text-neutral-400 text-xs sm:text-sm">{activeVideo.views} views · {activeVideo.duration}</div>
              <a href="https://youtube.com/@fadekhelraha" target="_blank" rel="noreferrer" className="text-xs font-bold text-rose-400 active:text-rose-300">Watch Full on YouTube →</a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
