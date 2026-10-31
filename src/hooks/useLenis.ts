import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect user's motion preference: disable smooth scroll if reduced motion requested
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.35, // Slightly slower, luxurious 60fps smooth scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky exponential deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Attach to window so components can trigger lenis.scrollTo if needed
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return lenisRef;
}

/**
 * Helper to smoothly scroll to any element by ID or selector
 */
export function scrollToElement(selectorOrId: string, offset = 0) {
  const globalLenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  const target = selectorOrId.startsWith('#') || selectorOrId.startsWith('.')
    ? selectorOrId
    : `#${selectorOrId}`;

  if (globalLenis) {
    globalLenis.scrollTo(target, { offset, duration: 1.35 });
  } else {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
