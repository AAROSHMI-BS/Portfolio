import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroAnimationProps {
  onComplete?: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onComplete?.();
  };

  useEffect(() => {
    // Check reduced motion preference: if user prefers reduced motion, skip intro instantly
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      handleDismiss();
      return;
    }

    // Auto-dismiss within 1.25 seconds (strictly under the 1.5s limit)
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1250);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          onClick={handleDismiss}
          role="status"
          aria-label="Loading portfolio animation for Aaroshmi B S"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D071B] [.palette-teal_&]:bg-[#042028] text-white cursor-pointer select-none overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#6C2BD9]/30 via-[#E11D8F]/20 to-transparent [.palette-teal_&]:from-[#5EEAD4]/25 [.palette-teal_&]:via-[#FFB4A2]/20 blur-3xl pointer-events-none" />

          {/* Skip Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss();
            }}
            aria-label="Skip intro animation"
            className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-[11px] font-mono-tech tracking-wider uppercase text-white/75 hover:text-white transition-all backdrop-blur-sm z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C2BD9]"
          >
            SKIP <kbd className="text-[9px] opacity-70 ml-1">ESC</kbd>
          </button>

          {/* Center Monogram Initials "ABS" SVG Draw-in */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <svg
              width="240"
              height="110"
              viewBox="0 0 240 110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_8px_24px_rgba(108,43,217,0.5)]"
            >
              <defs>
                <linearGradient id="introStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6C2BD9" className="[.palette-teal_&]:stop-[#5EEAD4]" />
                  <stop offset="50%" stopColor="#E11D8F" className="[.palette-teal_&]:stop-[#FFB4A2]" />
                  <stop offset="100%" stopColor="#FFD166" className="[.palette-teal_&]:stop-[#5EEAD4]" />
                </linearGradient>
              </defs>

              {/* Letter 'A' Path */}
              <motion.path
                d="M 25 95 L 50 15 L 75 95 M 34 68 L 66 68"
                stroke="url(#introStrokeGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Letter 'B' Path */}
              <motion.path
                d="M 98 95 L 98 15 L 126 15 C 142 15 142 52 126 52 C 145 52 145 95 126 95 Z M 98 52 L 126 52"
                stroke="url(#introStrokeGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              />

              {/* Letter 'S' Path */}
              <motion.path
                d="M 215 32 C 215 15 178 12 178 35 C 178 68 215 54 215 80 C 215 102 176 100 176 82"
                stroke="url(#introStrokeGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              />
            </svg>

            {/* Subtitle that fades in quickly */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.4 }}
              className="mt-4 font-mono-tech text-xs tracking-[0.28em] text-white/80 uppercase font-semibold text-center"
            >
              Aaroshmi B S
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
