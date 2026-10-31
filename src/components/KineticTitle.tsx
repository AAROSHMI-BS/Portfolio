import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring, useMotionValue } from 'motion/react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { getPublicAssetPath } from '../utils/publicAsset';

interface KineticTitleProps {
  className?: string;
}

export function KineticTitle({ className = '' }: KineticTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Title text mode: default to 'AAROSHMI', switchable to 'PORTFOLIO'
  const [titleMode, setTitleMode] = useState<'PORTFOLIO' | 'AAROSHMI'>('AAROSHMI');
  const letters = titleMode.split('');

  // Mouse tracking with smooth spring physics for 60fps silky reactivity
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  // Calibrated spring: smooth damping, no oscillation, perfectly fluid at 60fps
  const springConfig = { damping: 34, stiffness: 170, mass: 0.18 };
  const smoothMouseX = useSpring(rawMouseX, springConfig);
  const smoothMouseY = useSpring(rawMouseY, springConfig);

  // Scroll velocity physics for dynamic kinetic skew
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 45, stiffness: 350 });

  // Calibrated subtle scroll velocity skew and parallax
  const skewY = useTransform(smoothVelocity, [-1800, 0, 1800], [-0.45, 0, 0.45]);
  const cardParallax = useTransform(scrollY, [0, 600], [0, 10]);

  // Dynamic parallax tilts derived from spring-eased mouse
  const portraitTiltX = useTransform(smoothMouseY, [-0.5, 0.5], [2.1, -2.1]);
  const portraitTiltY = useTransform(smoothMouseX, [-0.5, 0.5], [-2.4, 2.4]);
  const textShiftX = useTransform(smoothMouseX, [-0.5, 0.5], [-3.5, 3.5]);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Mouse move handler (normalizes coordinates to -0.5 ... +0.5)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || prefersReducedMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    rawMouseX.set(relX);
    rawMouseY.set(relY);
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ y: cardParallax, skewY }}
      className={`relative w-full max-w-5xl mx-auto rounded-[24px] sm:rounded-[36px] overflow-hidden bg-[#111113] dark:bg-[#0E0D11] [.palette-teal_&]:bg-[#062F3A] [.palette-teal.dark_&]:bg-[#031C23] border border-white/15 dark:border-white/10 shadow-[0_28px_80px_rgba(0,0,0,0.55)] select-none flex flex-col justify-between transition-colors duration-500 will-change-transform ${className}`}
    >
      {/* Layered Color Gradient behind the portrait */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(255,255,255,0.16)_0%,transparent_58%),linear-gradient(135deg,#2DD4BF22_0%,#6C2BD918_45%,#E11D8F20_100%)] [.palette-teal_&]:bg-[radial-gradient(ellipse_at_50%_42%,rgba(255,244,230,0.18)_0%,transparent_58%),linear-gradient(135deg,#5EEAD429_0%,#062F3A12_48%,#FFB4A229_100%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[560px] h-80 sm:h-[560px] rounded-full bg-gradient-to-tr from-[#6C2BD9]/25 via-[#E11D8F]/15 to-[#2DD4BF]/15 [.palette-teal_&]:from-[#5EEAD4]/28 [.palette-teal_&]:via-[#FFB4A2]/18 [.palette-teal_&]:to-[#FFF4E6]/12 blur-[90px] pointer-events-none" />

      {/* 1. TOP MICRO ROW: Role on Left & Sleek Long Arrow on Right */}
      <div className="relative z-30 w-full flex items-center justify-between text-xs sm:text-sm font-body text-[#EAE0D0] px-6 sm:px-10 pt-5 sm:pt-7">
        <div className="flex items-center gap-3">
          <span className="font-normal tracking-wide text-xs sm:text-[13px] text-[#EAE0D0]/90">
            Software Developer / AI-ML
          </span>
          {/* Subtle mode switcher badge */}
          <button
            type="button"
            onClick={() => setTitleMode((prev) => (prev === 'PORTFOLIO' ? 'AAROSHMI' : 'PORTFOLIO'))}
            title="Click to toggle headline between PORTFOLIO and AAROSHMI"
            className="hidden sm:inline-flex items-center text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[#EAE0D0]/70 hover:text-[#EAE0D0] transition-colors border border-white/10 cursor-pointer"
          >
            {titleMode === 'AAROSHMI' ? 'PORTFOLIO mode' : 'AAROSHMI mode'}
          </button>
        </div>

        {/* Minimal Extended Sleek Arrow Motif matching the Canva reference */}
        <div className="flex items-center opacity-85 hover:opacity-100 transition-opacity">
          <svg
            className="w-12 sm:w-16 h-3.5 stroke-[#EAE0D0]"
            viewBox="0 0 64 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 6H60M60 6L52 1.5M60 6L52 10.5"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* 2. CENTERPIECE: 3D Typographic Sandwich with Original-Color Profile Portrait */}
      <div className="relative z-10 w-full flex items-end justify-center min-h-[300px] sm:min-h-[380px] md:min-h-[420px] lg:min-h-[460px] overflow-hidden my-auto px-2">
        
        {/* Layer A (BEHIND Portrait): Solid Cream Letters */}
        <motion.div
          style={{ x: textShiftX }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none"
        >
          <div className="w-full flex items-center justify-center font-condensed font-bold text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[10.5rem] leading-[0.78] tracking-tighter uppercase text-[#EAE0D0]">
            {letters.map((char, i) => {
              const idleOffset = Math.sin((i + 1) * 0.75) * 1.4;
              return (
                <motion.span
                  key={`solid-${titleMode}-${i}`}
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          y: [0, idleOffset, 0],
                        }
                  }
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                    delay: i * 0.08,
                  }}
                  className="inline-block will-change-transform"
                >
                  {char}
                </motion.span>
              );
            })}
          </div>
        </motion.div>

        {/* Layer B (MIDDLE): Full Natural Color Portrait, Centered & Prominently Sized */}
        <motion.div
          style={{
            rotateX: portraitTiltX,
            rotateY: portraitTiltY,
            x: textShiftX,
            perspective: 1000,
          }}
          className="relative z-10 w-72 sm:w-88 md:w-96 lg:w-[460px] h-[320px] sm:h-[400px] md:h-[440px] lg:h-[480px] flex items-end justify-center pointer-events-none will-change-transform"
        >
          <img
            src={getPublicAssetPath('/profile.jpg')}
            alt="Aaroshmi B S - Portrait"
            className="w-full h-full object-contain object-bottom grayscale-0 contrast-105 brightness-102 saturate-[1.08] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes('hero-portrait-clean.png')) {
                target.src = getPublicAssetPath('/hero-portrait-clean.png');
              } else if (!target.src.includes('hero-portrait.png')) {
                target.src = getPublicAssetPath('/hero-portrait.png');
              }
            }}
          />

          {/* Gentle bottom edge gradient blend into card base */}
          <div className="absolute inset-x-0 bottom-0 h-14 sm:h-20 bg-gradient-to-t from-[#111113] [.palette-teal_&]:from-[#062F3A] via-[#111113]/50 to-transparent pointer-events-none transition-colors duration-500" />
        </motion.div>

        {/* Layer C (IN FRONT of Portrait): Stroke-only Outline Letters */}
        <motion.div
          style={{ x: textShiftX }}
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none"
        >
          <div
            className="w-full flex items-center justify-center font-condensed font-bold text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[10.5rem] leading-[0.78] tracking-tighter uppercase"
            style={{
              WebkitTextStroke: '1.5px #EAE0D0',
              color: 'transparent',
            }}
            aria-hidden="true"
          >
            {letters.map((char, i) => {
              const idleOffset = Math.sin((i + 1) * 0.75) * 1.4;
              return (
                <motion.span
                  key={`stroke-${titleMode}-${i}`}
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          y: [0, idleOffset, 0],
                        }
                  }
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                    delay: i * 0.08,
                  }}
                  className="inline-block will-change-transform"
                >
                  {char}
                </motion.span>
              );
            })}
          </div>
        </motion.div>

      </div>

      {/* 3. BOTTOM MICRO ROW: Name title card aligned to the portrait edge */}
      <div className="relative z-30 w-full shrink-0 flex items-center justify-between text-xs sm:text-sm font-body text-[#EAE0D0] px-6 sm:px-10 pb-5 sm:pb-7 pt-4 border-t border-white/10 bg-[#111113] [.palette-teal_&]:bg-[#062F3A] transition-colors duration-500">
        <span className="font-normal tracking-wide text-xs sm:text-[13px] text-[#EAE0D0]/90">
          Aaroshmi B S
        </span>

        <a
          href={`mailto:${PORTFOLIO_CONTENT.contact.email}`}
          className="text-[11px] sm:text-xs text-[#EAE0D0]/80 hover:text-white transition-colors tracking-wide hover:underline font-body"
        >
          aaroshmibs.dev
        </a>
      </div>
    </motion.div>
  );
}
