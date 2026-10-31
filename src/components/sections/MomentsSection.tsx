import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_CONTENT, GalleryItem } from '../../data/content';
import { CornerMarks } from '../CornerMarks';
import { Lightbox } from '../Lightbox';
import { Camera, Sparkles, Image as ImageIcon, Award, Presentation } from 'lucide-react';
import { getPublicAssetPath } from '../../utils/publicAsset';

interface MomentsSectionProps {
  selectedEventFilter?: string;
  onFilterChange?: (filterId: string) => void;
}

export function MomentsSection({
  selectedEventFilter = 'all',
  onFilterChange,
}: MomentsSectionProps) {
  const [internalFilter, setInternalFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeFilter = onFilterChange ? selectedEventFilter : internalFilter;
  const setActiveFilter = (filterId: string) => {
    if (onFilterChange) onFilterChange(filterId);
    else setInternalFilter(filterId);
  };

  const { gallery, galleryCategories } = PORTFOLIO_CONTENT;

  // Rule: If an event folder is empty, hide its filter pill and tiles
  const visibleCategories = useMemo(() => {
    if (gallery.length === 0) return [];
    return galleryCategories.filter((cat) => {
      if (cat.id === 'all') return true;
      return gallery.some((item) => item.category === cat.id);
    });
  }, [gallery, galleryCategories]);

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return gallery;
    return gallery.filter((item) => item.category === activeFilter);
  }, [gallery, activeFilter]);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0));
  };

  return (
    <section
      id="moments"
      className="relative w-full py-24 px-4 sm:px-8 border-b border-[var(--grid-line)]"
    >
      <CornerMarks
        topLeft="06 / MOMENTS"
        topRight="PHOTO ARCHIVE"
        bottomLeft="EVENTS & STAGE"
        bottomRight="CERTIFICATES & PRIZES"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#6C2BD9] dark:text-[#A78BFA] font-bold">
                06. Moments
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#6C2BD9]" />
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black leading-[0.95] tracking-tight text-[var(--text-ink)]">
              Presenting, Competing & Celebrating
            </h2>
          </div>
          <p className="font-serif-accent italic text-lg sm:text-xl text-[var(--text-muted)] max-w-md">
            Visual proof from hackathons, paper presentations, and on-stage pitches.
          </p>
        </div>

        {/* Filter Pills (Shown only if items exist across categories) */}
        {visibleCategories.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 mb-10 border-y border-[var(--grid-line)] py-4">
            {visibleCategories.map((cat) => {
              const isActive = activeFilter === cat.id;
              const count = cat.id === 'all'
                ? gallery.length
                : gallery.filter((item) => item.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveFilter(cat.id)}
                  aria-pressed={isActive}
                  className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono-tech font-bold uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C2BD9] focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-[var(--hero-violet)] text-white shadow-[0_6px_18px_rgba(108,43,217,0.22)]'
                      : 'bg-white/70 dark:bg-[#1B1238] border border-slate-200 dark:border-white/10 text-[var(--text-muted)] hover:-translate-y-0.5 hover:text-[var(--text-ink)]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[9px] tabular-nums ${isActive ? 'text-white/70' : 'text-[var(--text-muted)]'}`}>
                    {count.toString().padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Gallery Grid or Editorial Empty State */}
        {filteredItems.length > 0 ? (
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-5"
          >
            <AnimatePresence>
              {filteredItems.map((item, idx) => {
                const frameClass = idx % 5 === 0
                  ? 'aspect-[4/5]'
                  : idx % 5 === 3
                    ? 'aspect-[16/10]'
                    : 'aspect-[4/3]';
                return (
                  <motion.button
                    type="button"
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.38, delay: Math.min(idx * 0.035, 0.2) }}
                    onClick={() => setLightboxIndex(idx)}
                    aria-label={`Open photo: ${item.caption}`}
                    aria-haspopup="dialog"
                    className="group relative block w-full break-inside-avoid mb-5 overflow-hidden rounded-[20px] border border-slate-200/80 dark:border-white/10 bg-slate-900 text-left shadow-[0_10px_30px_rgba(18,8,31,0.10)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--hero-violet)]/50 hover:shadow-[0_18px_40px_rgba(18,8,31,0.18)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hero-violet)]/35"
                  >
                    <div className={`relative w-full ${frameClass} overflow-hidden`}>
                      <img
                        src={getPublicAssetPath(item.src)}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/5 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                        <span className="inline-flex h-7 items-center rounded-full border border-white/20 bg-black/55 px-3 text-[9px] font-mono-tech font-black uppercase tracking-[0.12em] text-white backdrop-blur-md">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="inline-flex h-7 items-center rounded-full bg-[var(--brand-sunshine)] px-3 text-[9px] font-mono-tech font-black uppercase tracking-[0.12em] text-[#12081F] shadow-sm">
                          {item.type}
                        </span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5 translate-y-1 transition-transform duration-300 group-hover:translate-y-0">
                        <span className="mb-1 block text-[9px] font-mono-tech uppercase tracking-[0.16em] text-white/75">
                          {item.event}
                        </span>
                        <div className="flex items-end justify-between gap-4">
                          <p className="max-w-[80%] text-sm font-body font-semibold leading-snug text-white">
                            {item.caption}
                          </p>
                          <span className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-[-8deg] group-hover:bg-white group-hover:text-[#12081F]" aria-hidden="true">
                            ↗
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Graceful editorial empty state if user hasn't added gallery photos yet */
          <div className="rounded-[28px] p-8 sm:p-12 bg-white/70 dark:bg-[#1B1238]/70 border border-dashed border-slate-300 dark:border-white/15 text-center flex flex-col items-center justify-center max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#6C2BD9]/10 text-[#6C2BD9] flex items-center justify-center mb-4">
              <Camera className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-xl text-[var(--text-ink)] mb-2">
              Event Captures & Certificates Incoming
            </h3>
            <p className="text-sm font-body text-[var(--text-muted)] dark:text-[#B8AAD9] leading-relaxed mb-6">
              Organized folder structure created in <code className="text-xs font-mono-tech px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10">src/assets/events/</code> ready for your stage, prize, and certificate photos from Campus Arena 2026, Future 6.0, CodeSprint'26, CapExtreme, CapeStart, and Dream Kanniyakumari.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs font-mono-tech text-[var(--text-muted)]">
              <span className="px-3 py-1 rounded-full bg-white dark:bg-black/30 border border-slate-200 dark:border-white/10">
                📁 campus-arena-2026
              </span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-black/30 border border-slate-200 dark:border-white/10">
                📁 future-6-0-srtn-2026
              </span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-black/30 border border-slate-200 dark:border-white/10">
                📁 codesprint-26
              </span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-black/30 border border-slate-200 dark:border-white/10">
                📁 capestart-internship
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
