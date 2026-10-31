import { useEffect, useState } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'motion/react';
import { PORTFOLIO_CONTENT } from '../data/content';

interface RotatingTextRingProps {
  className?: string;
  size?: number;
}

export function RotatingTextRing({ className = '', size = 320 }: RotatingTextRingProps) {
  const [rotation, setRotation] = useState(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 40, stiffness: 300 });

  // Map scroll velocity to rotation acceleration
  const velocityRotation = useTransform(smoothVelocity, [-1500, 0, 1500], [-30, 0, 30]);

  // Continuous background rotation (respects reduced-motion)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      setRotation((prev) => (prev + delta * 15) % 360);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const radius = size * 0.38;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  return (
    <div
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Dashed background circle */}
      <div
        className="absolute rounded-full border border-dashed border-[var(--card-border)] dark:border-white/15"
        style={{ width: size * 0.88, height: size * 0.88 }}
      />
      
      {/* Inner dashed ring */}
      <div
        className="absolute rounded-full border border-dashed border-[var(--card-border)] opacity-50 dark:border-white/10"
        style={{ width: size * 0.65, height: size * 0.65 }}
      />

      {/* Center ME Indicator */}
      <div className="absolute flex flex-col items-center justify-center gap-1 z-10">
        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-[#6C2BD9]" />
        <span className="text-[11px] font-mono-tech font-extrabold tracking-widest text-[var(--text-ink)] uppercase">
          ME
        </span>
      </div>

      {/* Rotating SVG with textPath */}
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 overflow-visible"
        style={{
          rotate: rotation,
        }}
      >
        <defs>
          <path
            id="textPathCircle"
            d={`M ${center}, ${center} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>

        <text
          className="fill-[var(--text-muted)] dark:fill-[#B8AAD9] text-[9.5px] font-mono-tech tracking-[0.25em] font-semibold uppercase"
        >
          <textPath
            href="#textPathCircle"
            startOffset="0%"
            textLength={circumference * 0.98}
            lengthAdjust="spacing"
          >
            {PORTFOLIO_CONTENT.hero.rotatingRingText}
          </textPath>
        </text>
      </motion.svg>
    </div>
  );
}
