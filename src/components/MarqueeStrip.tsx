import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PORTFOLIO_CONTENT } from '../data/content';

interface MarqueeStripProps {
  className?: string;
  reverse?: boolean;
}

export function MarqueeStrip({ className = '', reverse = false }: MarqueeStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const xTransform = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [-300, 300] : [0, -600]
  );

  const items = PORTFOLIO_CONTENT.skills.marqueeList;

  return (
    <div
      ref={containerRef}
      className={`relative w-full py-6 sm:py-8 overflow-hidden border-y border-[var(--grid-line)] bg-gradient-to-r from-[var(--bg-paper)] via-white/50 dark:via-white/5 to-[var(--bg-paper)] select-none ${className}`}
      aria-hidden="true"
    >
      {/* Background kinetic ambient tint */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-cyan-500/5 [.palette-teal_&]:from-[#5EEAD4]/5 [.palette-teal_&]:via-[#FFB4A2]/5 [.palette-teal_&]:to-[#062F3A]/5 pointer-events-none" />

      <motion.div
        style={{ x: xTransform }}
        className="flex whitespace-nowrap gap-10 items-center will-change-transform"
      >
        {/* Repeating text sets for continuous seamless scrolling */}
        {[...Array(5)].map((_, setIdx) => (
          <div key={setIdx} className="flex items-center gap-10 shrink-0">
            {items.map((word, i) => {
              const isOutlined = (setIdx + i) % 2 === 1;
              return (
                <div key={`${setIdx}-${i}`} className="flex items-center gap-10">
                  <span
                    className={`text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tighter transition-all ${
                      isOutlined
                        ? 'text-stroke-ink dark:text-stroke-white opacity-50 hover:opacity-100 hover:text-[var(--hero-violet)]'
                        : 'text-[var(--text-ink)] opacity-90 hover:text-[var(--hero-violet)]'
                    }`}
                  >
                    {word}
                  </span>

                  {/* Graphic Sticker Star separator */}
                  <span className="inline-flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[var(--hero-violet)] text-white text-xs sm:text-sm font-black shadow-xs rotate-12">
                    ✦
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
