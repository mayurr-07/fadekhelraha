import React, { useState, useEffect } from 'react';
import { Play, Eye, Calendar, Film, X } from 'lucide-react';
import { clipsData, Clip } from '../data/streamData';

export const VideoGrid: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'vod' | 'clip'>('all');
  const [activeVideo, setActiveVideo] = useState<Clip | null>(null);

  const filteredClips = clipsData.filter(clip => {
    if (filter === 'all') return true;
    return clip.type === filter;
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeVideo) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [activeVideo]);

  const closeModal = () => setActiveVideo(null);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <section id="vods" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-neutral-800 pb-5 gap-5">
        <div>
          <div className="inline-flex items-center gap-2 text-rose-500 font-bold text-xs tracking-widest uppercase mb-2 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-lg">
            <Film className="w-3.5 h-3.5" />
            <span>Highlights & Shorts</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
            RECENT <span className="text-rose-500">CLIPS & VODS</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-1">Top clutches, funny moments & full recordings</p>
        </div>
      </div>

      {/* FILTER PILLS — Horizontal scroll on mobile */}
      <div className="mb-6">
        <div className="filter-scroll flex gap-2 pb-2 -mx-1 px-1">
          {[
            { label: 'All Videos', value: 'all' as const },
            { label: 'Full VODs', value: 'vod' as const },
            { label: 'Viral Shorts 🔥', value: 'clip' as const },
          ].map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border touch-target ${
                filter === btn.value
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-300 active:bg-neutral-800'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* RESPONSIVE GRID: 1 → 2 → 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredClips.map((clip) => (
          <div
            key={clip.id}
            onClick={() => setActiveVideo(clip)}
            className="group relative bg-neutral-900/40 border border-neutral-800 active:border-neutral-600 rounded-3xl overflow-hidden cursor-pointer transition-all flex flex-col"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
              <img
                src={clip.thumbnail}
                alt={clip.title}
                className="w-full h-full object-cover transition-transform duration-500 group-active:scale-[1.02]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/35">
                <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center pl-0.5 shadow-xl">
                  <Play className="w-5 h-5 fill-current" />
                </div>
              </div>

              <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                <span className="bg-neutral-950/90 text-[10px] px-2 py-0.5 rounded-lg font-bold border border-neutral-800">
                  {clip.game}
                </span>
                {clip.type === 'clip' && (
                  <span className="bg-amber-500 text-neutral-950 text-[10px] font-black px-2 py-0.5 rounded">SHORT</span>
                )}
              </div>
              <div className="absolute bottom-2.5 right-2.5 bg-neutral-950/90 text-[10px] px-2 py-0.5 rounded font-bold">
                {clip.duration}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <h4 className="text-base sm:text-[17px] font-bold text-white leading-snug line-clamp-2 group-active:text-rose-400">
                {clip.title}
              </h4>
              <div className="flex items-center justify-between pt-3 mt-auto text-xs text-neutral-400 font-semibold">
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-rose-500" />{clip.views}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{clip.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RESPONSIVE VIDEO MODAL — Mobile Full Viewport */}
      {activeVideo && (
        <div className="video-modal" onClick={closeModal}>
          <div 
            className="video-modal-content" 
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between p-4 sm:p-5 border-b border-neutral-800 bg-neutral-950">
              <div className="pr-3">
                <div className="text-xs font-bold text-rose-400 mb-0.5">{activeVideo.game}</div>
                <h3 className="font-bold text-white text-sm sm:text-lg leading-tight pr-6">{activeVideo.title}</h3>
              </div>
              <button 
                onClick={closeModal} 
                className="p-2.5 -mt-1 -mr-1 text-neutral-400 active:text-white bg-neutral-900 rounded-full touch-target"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Area */}
            <div className="bg-black relative aspect-video w-full">
              <video 
                autoPlay 
                controls 
                playsInline 
                className="w-full h-full object-contain" 
                src={activeVideo.videoUrl}
              />
            </div>

            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-neutral-950 text-sm">
              <div className="text-neutral-400 text-xs sm:text-sm">
                {activeVideo.views} views • {activeVideo.duration}
              </div>
              <a 
                href="https://youtube.com/@fadekhelraha" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs font-bold text-rose-400 active:text-rose-300"
              >
                Watch Full on YouTube →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
