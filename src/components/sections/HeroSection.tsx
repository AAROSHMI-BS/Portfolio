import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Mail, Linkedin, ArrowDown, ExternalLink } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../../data/content';
import { KineticTitle } from '../KineticTitle';
import { CardFan } from '../CardFan';
import { RotatingTextRing } from '../RotatingTextRing';
import { CornerMarks } from '../CornerMarks';
import { MonogramLogo } from '../MonogramLogo';
import { MagneticButton } from '../MagneticButton';

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const rotatingWords = PORTFOLIO_CONTENT.hero.rotatingWords;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [rotatingWords.length]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isGitHubPlaceholder = PORTFOLIO_CONTENT.hero.githubUrl.includes('YOUR-USERNAME');

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-10 px-4 sm:px-8 overflow-hidden border-b border-[var(--grid-line)]"
    >
      {/* Editorial Corner Crosshairs & Labels */}
      <CornerMarks
        topLeft={PORTFOLIO_CONTENT.meta.author.toUpperCase()}
        topRight={PORTFOLIO_CONTENT.meta.roleLabel}
        bottomLeft={PORTFOLIO_CONTENT.meta.geoLabel}
        bottomRight={PORTFOLIO_CONTENT.meta.year}
      />

      {/* Top Micro-Row */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono-tech uppercase tracking-widest text-[var(--hero-violet)] font-black">
            {PORTFOLIO_CONTENT.hero.badgeTop}
          </span>
          <span className="w-2 h-2 rounded-full bg-[var(--hero-violet)]" />
        </div>

        <div className="flex items-center gap-2">
          <MonogramLogo size={32} variant="violet" />
        </div>
      </div>

      {/* Center Kinetic Headline & Rotating Word Subline */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center my-auto">
        <KineticTitle />

        {/* Dynamic Sub-line with rotating words */}
        <div className="mt-5 sm:mt-7 text-center max-w-2xl px-4">
          <p className="text-sm sm:text-base md:text-lg text-[var(--text-muted)] font-body leading-relaxed">
            {PORTFOLIO_CONTENT.hero.subLinePrefix}
            <span className="inline-block relative font-black text-[var(--hero-violet)] min-w-[105px] text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block border-b-2 border-[var(--brand-orchid)]"
                >
                  {rotatingWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            {PORTFOLIO_CONTENT.hero.subLineSuffix}
          </p>
        </div>

        {/* Card Fan with Rotating Ring underneath */}
        <div className="relative w-full mt-6 sm:mt-10 flex flex-col items-center justify-center">
          {/* Rotating Ring positioned behind the card fan */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-80 pointer-events-none">
            <RotatingTextRing size={420} />
          </div>

          {/* Interactive Card Fan */}
          <div className="relative z-10 w-full">
            <CardFan />
          </div>
        </div>
      </div>

      {/* Bottom Row: Location, Scroll Hint, CTAs & Social Links */}
      <div className="relative z-20 max-w-6xl mx-auto w-full pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[var(--grid-line)]">
        
        {/* Left: Location & Availability */}
        <div className="flex items-center gap-3 text-xs font-mono-tech text-[var(--text-muted)]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#2DD4BF]" />
          <span>{PORTFOLIO_CONTENT.meta.location}</span>
        </div>

        {/* Center: Scroll Hint */}
        <button
          type="button"
          onClick={() => scrollToSection('about')}
          className="group flex flex-col items-center gap-1.5 text-[11px] font-mono-tech uppercase tracking-widest text-[var(--text-muted)] hover:text-[#6C2BD9] transition-colors focus-visible:outline-none"
        >
          <span>SCROLL</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#6C2BD9]" />
        </button>

        {/* Right: CTAs and Social Icons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Resume Download */}
          <MagneticButton
            href={PORTFOLIO_CONTENT.hero.resumePath}
            download="Aaroshmi_B_S_Resume.pdf"
            className="px-4 py-2 rounded-full border border-slate-300 dark:border-white/20 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 text-xs font-mono-tech font-bold uppercase tracking-wider text-[var(--text-ink)] shadow-xs transition-all flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-[#6C2BD9]" />
            <span>Resume</span>
          </MagneticButton>

          {/* Contact Me CTA */}
          <MagneticButton
            onClick={() => scrollToSection('contact')}
            className="px-5 py-2 rounded-full bg-[#6C2BD9] hover:bg-[#5922B8] text-white text-xs font-mono-tech font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Me</span>
          </MagneticButton>

          {/* Social Icons */}
          <div className="flex items-center gap-2 pl-1 border-l border-slate-300 dark:border-white/20">
            <a
              href={PORTFOLIO_CONTENT.hero.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-full hover:bg-white dark:hover:bg-slate-800 text-[var(--text-muted)] hover:text-[#0077B5] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {!isGitHubPlaceholder && (
              <a
                href={PORTFOLIO_CONTENT.hero.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-full hover:bg-white dark:hover:bg-slate-800 text-[var(--text-muted)] hover:text-[var(--text-ink)] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
