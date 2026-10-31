import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, ExternalLink, Sparkles, X } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { getPublicAssetPath } from '../utils/publicAsset';

interface ProfileLinkedInRevealProps {
  className?: string;
  isFanned?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export function ProfileLinkedInReveal({
  className = '',
  isFanned = false,
  onOpenChange,
}: ProfileLinkedInRevealProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const updateOpenState = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  // Handle click outside for mobile/touch
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        updateOpenState(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  // Robust hover-intent logic with 320ms grace window
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    updateOpenState(true);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      updateOpenState(false);
      setTilt({ x: 0, y: 0 });
    }, 320);
  };

  // 3D parallax tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 9,
      y: (x / (rect.width / 2)) * 9,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      updateOpenState(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      updateOpenState(!isOpen);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive Profile Photo Container */}
      <motion.div
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        aria-label="Profile photo of Aaroshmi B S. Press Enter or click to view LinkedIn card."
        onKeyDown={handleKeyDown}
        onClick={() => updateOpenState(!isOpen)}
        onMouseMove={handleMouseMove}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          y: isFanned ? 0 : [0, -6, 0],
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { type: 'spring', stiffness: 300, damping: 20 },
          rotateY: { type: 'spring', stiffness: 300, damping: 20 },
        }}
        style={{ perspective: 1000 }}
        className="relative group cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6C2BD9] rounded-[24px] select-none"
      >
        {/* Animated Brand Gradient Ring */}
        <div className="absolute -inset-1 rounded-[26px] bg-gradient-to-r from-[#6C2BD9] via-[#E11D8F] to-[#FF6B4A] opacity-75 group-hover:opacity-100 blur-[2px] transition duration-500 animate-pulse" />

        {/* Card Body */}
        <div className="relative w-44 sm:w-52 h-60 sm:h-72 rounded-[24px] overflow-hidden bg-slate-900 border-2 border-white/20 shadow-xl flex flex-col justify-end">
          {/* Real Photo */}
          <img
            src={getPublicAssetPath(PORTFOLIO_CONTENT.hero.profileImage)}
            alt="Aaroshmi B S - Software Developer"
            className="absolute inset-0 w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
            loading="eager"
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes('dp_afd8bd01.png')) {
                target.src = getPublicAssetPath('/assets/aistudio/dp_afd8bd01.png');
              }
            }}
          />

          {/* Contrast Scrim at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

          {/* Micro Card Label */}
          <div className="relative z-10 p-3 sm:p-4 text-white">
            <div className="flex items-center justify-between text-[10px] font-mono-tech tracking-wider uppercase opacity-85">
              <span>01 / ME</span>
              <span className="flex items-center gap-1 text-[#2DD4BF]">
                <Sparkles className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '6s' }} />
                <span>ACTIVE</span>
              </span>
            </div>
            <h3 className="font-display font-bold text-sm sm:text-base leading-tight mt-0.5">
              Aaroshmi B S
            </h3>
            <p className="text-[10px] sm:text-xs text-white/80 font-body truncate">
              Computer Science & Engineering
            </p>
          </div>
        </div>
      </motion.div>

      {/* Signature LinkedIn Reveal Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -14, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute z-50 left-full ml-3 sm:ml-4 top-1/2 -translate-y-1/2 w-64 sm:w-72 p-4 rounded-2xl bg-white/95 dark:bg-[#1B1238]/95 backdrop-blur-xl border border-slate-200 dark:border-white/15 shadow-2xl text-[var(--text-ink)] pointer-events-auto before:absolute before:-left-6 before:top-0 before:bottom-0 before:w-8 before:content-['']"
            role="dialog"
            aria-label="LinkedIn profile preview"
          >
            {/* Popover Arrow */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-white/95 dark:border-r-[#1B1238]/95" />

            {/* Close button for keyboard / tap accessibility */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                updateOpenState(false);
              }}
              aria-label="Close LinkedIn preview"
              className="absolute top-2.5 right-2.5 p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-ink)] hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-start gap-3 pr-4">
              <div className="w-10 h-10 rounded-xl bg-[#0077B5] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Linkedin className="w-5 h-5 fill-current" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#0077B5] font-bold">
                    LinkedIn
                  </span>
                  <span className="text-[10px] font-mono-tech text-[var(--text-muted)]">Verified</span>
                </div>
                <h4 className="font-display font-bold text-sm text-[var(--text-ink)] truncate">
                  Aaroshmi B S
                </h4>
              </div>
            </div>

            <p className="mt-2.5 text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
              Pursuing BE (Hons) Computer Science and Engineering | Hackathon Enthusiast
            </p>

            <div className="mt-3.5 pt-3 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono-tech text-[var(--text-muted)]">
                Kanyakumari, IN
              </span>
              <a
                href={PORTFOLIO_CONTENT.hero.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0077B5] text-white hover:bg-[#006097] text-xs font-mono-tech font-bold uppercase transition-all transform active:scale-95 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B5]"
              >
                <span>View Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
