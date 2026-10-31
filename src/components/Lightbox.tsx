import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Award, Camera, Sparkles } from 'lucide-react';
import { GalleryItem } from '../data/content';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const isOpen = currentIndex !== null && items.length > 0;
  const currentItem = isOpen ? items[currentIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !currentItem) return null;

  const isCertificate = currentItem.type === 'Certificate';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Photo Lightbox"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Counter */}
        <div className="absolute top-6 left-6 z-50 text-xs font-mono-tech text-white/70 tracking-widest uppercase">
          <span>{currentIndex + 1}</span> / <span>{items.length}</span>
        </div>

        {/* Previous Button */}
        {items.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 sm:left-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {items.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 sm:right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Main Content Modal Container */}
        <motion.div
          key={currentItem.id}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
        >
          {/* Framed Image Container */}
          <div
            className={`relative rounded-2xl overflow-hidden max-h-[70vh] flex items-center justify-center ${
              isCertificate
                ? 'p-3 bg-white shadow-2xl border-4 border-amber-100'
                : 'bg-black/50 shadow-2xl'
            }`}
          >
            <img
              src={currentItem.src}
              alt={currentItem.alt}
              className={`max-h-[65vh] max-w-full rounded-lg ${
                isCertificate ? 'object-contain' : 'object-contain'
              }`}
            />
          </div>

          {/* Caption & Metadata bar */}
          <div className="mt-4 text-center max-w-xl px-4">
            <div className="inline-flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono-tech uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/15 text-white">
                {currentItem.type}
              </span>
              <span className="text-xs font-mono-tech text-white/60">
                {currentItem.event}
              </span>
            </div>
            <p className="text-sm font-body text-white/90 leading-relaxed">
              {currentItem.caption}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
