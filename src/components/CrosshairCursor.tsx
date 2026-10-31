import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CrosshairCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchOrReduced, setIsTouchOrReduced] = useState(true);

  useEffect(() => {
    // Detect touch device or prefers-reduced-motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) {
      setIsTouchOrReduced(true);
      return;
    }
    setIsTouchOrReduced(false);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], [data-cursor-label], .interactive-card');
      if (interactive) {
        setIsHovered(true);
        const customLabel = interactive.getAttribute('data-cursor-label');
        if (customLabel) {
          setCursorText(customLabel);
        } else if (interactive.tagName === 'A') {
          setCursorText('VISIT');
        } else if (interactive.classList.contains('cursor-drag')) {
          setCursorText('DRAG');
        } else {
          setCursorText('VIEW');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouchOrReduced || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Central crisp dot */}
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-[#E11D8F] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovered ? 0.5 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />

      {/* Trailing follower ring with label */}
      <motion.div
        className="fixed rounded-full pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-colors"
        animate={{
          x: position.x,
          y: position.y,
          width: isHovered ? (cursorText ? 56 : 42) : 28,
          height: isHovered ? (cursorText ? 56 : 42) : 28,
          borderColor: isHovered ? '#6C2BD9' : 'rgba(108, 43, 217, 0.45)',
          backgroundColor: isHovered ? 'rgba(108, 43, 217, 0.12)' : 'transparent',
        }}
        style={{
          borderWidth: 1.5,
          borderStyle: isHovered ? 'solid' : 'dashed',
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 220, mass: 0.15 }}
      >
        {isHovered && cursorText && (
          <span className="text-[9px] font-mono-tech font-bold uppercase tracking-widest text-[#6C2BD9] dark:text-[#A78BFA] select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
}
