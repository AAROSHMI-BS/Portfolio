import { useState, useEffect } from 'react';
import { Sparkles, Palette } from 'lucide-react';

export function PaletteSwitcher({ className = '' }: { className?: string }) {
  const [palette, setPalette] = useState<'aurora' | 'teal'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('portfolio-palette');
      if (stored === 'teal') return 'teal';
    }
    return 'aurora';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (palette === 'teal') {
      root.classList.add('palette-teal');
      localStorage.setItem('portfolio-palette', 'teal');
    } else {
      root.classList.remove('palette-teal');
      localStorage.setItem('portfolio-palette', 'aurora');
    }
  }, [palette]);

  const togglePalette = () => {
    setPalette((prev) => (prev === 'aurora' ? 'teal' : 'aurora'));
  };

  return (
    <button
      type="button"
      onClick={togglePalette}
      title={`Current palette: ${palette === 'aurora' ? 'Aurora Bloom' : 'Deep Teal & Peach'}. Click to switch.`}
      aria-label="Switch color palette"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300/40 dark:border-white/20 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md text-[11px] font-mono-tech uppercase font-bold tracking-wider hover:scale-105 active:scale-95 transition-all ${className}`}
    >
      <Palette className="w-3.5 h-3.5 text-[var(--hero-violet)]" />
      <span className="hidden sm:inline">
        {palette === 'aurora' ? 'Aurora' : 'Teal & Peach'}
      </span>
      <span className="flex items-center gap-1">
        <span
          className="w-2 h-2 rounded-full inline-block"
          style={{
            backgroundColor: palette === 'aurora' ? '#6C2BD9' : '#062F3A',
          }}
        />
        <span
          className="w-2 h-2 rounded-full inline-block"
          style={{
            backgroundColor: palette === 'aurora' ? '#E11D8F' : '#FFB4A2',
          }}
        />
        <span
          className="w-2 h-2 rounded-full inline-block"
          style={{
            backgroundColor: palette === 'aurora' ? '#2DD4BF' : '#5EEAD4',
          }}
        />
      </span>
    </button>
  );
}
