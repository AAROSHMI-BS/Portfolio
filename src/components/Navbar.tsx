import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { PaletteSwitcher } from './PaletteSwitcher';
import { MonogramLogo } from './MonogramLogo';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Moments', href: '#moments' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Scroll-spy
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'achievements', 'moments', 'activities', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between gap-8 px-5 py-2.5 rounded-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 dark:bg-[#1B1238]/85 backdrop-blur-md shadow-sm border border-slate-200/60 dark:border-white/10'
            : 'bg-white/30 dark:bg-black/20 backdrop-blur-xs border border-transparent'
        }`}
      >
        {/* Zone 1: Single text element wordmark + subtle monogram */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-3 text-base font-display font-extrabold tracking-tight text-[var(--text-ink)] whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C2BD9] rounded-lg"
          aria-label="Aaroshmi B S Homepage"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center">
            <MonogramLogo size={28} variant="violet" />
          </span>
          <span className="tracking-tight text-sm sm:text-base font-bold ml-1">
            Aaroshmi B S
          </span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav
          className="hidden md:flex items-center gap-7 text-xs font-mono-tech uppercase tracking-wider font-semibold text-[var(--text-muted)]"
          aria-label="Primary Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const sectionKey = item.href.replace('#', '');
            const isActive = activeSection === sectionKey;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 hover:text-[var(--text-ink)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6C2BD9] rounded ${
                  isActive ? 'text-[var(--hero-violet)] font-bold' : ''
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#6C2BD9] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + palette switcher + theme toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <PaletteSwitcher />
          <ThemeToggle />

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono-tech uppercase font-bold text-white bg-[#6C2BD9] hover:bg-[#5922B8] active:scale-95 transition-all duration-200 rounded-full shadow-xs whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C2BD9]"
          >
            <span>Say Hello</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[var(--text-ink)] hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C2BD9]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-sm bg-white dark:bg-[#1B1238] rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2 font-mono-tech text-xs uppercase font-semibold">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-[var(--text-ink)] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-200 dark:border-white/10">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#6C2BD9] text-white font-bold"
              >
                <span>Say Hello</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
