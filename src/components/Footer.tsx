import { ArrowUp, Heart } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { MonogramLogo } from './MonogramLogo';

interface FooterProps {
  onOpenAnalytics?: () => void;
}

export function Footer({ onOpenAnalytics }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full py-12 px-4 sm:px-8 bg-white/40 dark:bg-black/20 text-[var(--text-ink)] border-t border-[var(--grid-line)]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand Monogram & Copyright with discreet stealth telemetry trigger */}
        <div className="flex items-center gap-3">
          <MonogramLogo size={28} variant="violet" />
          <div className="text-xs font-mono-tech text-[var(--text-muted)] flex items-center flex-wrap gap-1">
            <span>© 2026 {PORTFOLIO_CONTENT.meta.author}.</span>{' '}
            <span className="hidden sm:inline">All rights reserved.</span>
            
            {/* Hidden / Discreet Telemetry Trigger Dot (Colloquial "bit hideous/hidden") */}
            <button
              type="button"
              onClick={onOpenAnalytics}
              className="inline-flex items-center justify-center w-5 h-5 ml-1 rounded-full opacity-25 hover:opacity-100 hover:bg-violet-500/10 transition-all cursor-pointer group"
              title="Discreet Visitor Telemetry (Ctrl+Shift+A)"
              aria-label="Discreet visitor analytics radar"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
            </button>
          </div>
        </div>

        {/* Center: Style attribution */}
        <div className="text-center">
          <p className="text-[11px] font-mono-tech uppercase tracking-widest text-[var(--text-muted)] opacity-80">
            Aurora Bloom · Editorial Kinetic Edition
          </p>
        </div>

        {/* Right: Back-to-Top Button */}
        <div>
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 dark:border-white/20 bg-white/70 dark:bg-slate-800/70 hover:bg-[#6C2BD9] hover:text-white dark:hover:bg-[#6C2BD9] text-xs font-mono-tech font-bold uppercase tracking-wider text-[var(--text-ink)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C2BD9]"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
