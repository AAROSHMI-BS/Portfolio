import { useState, useEffect } from 'react';
import { ScrollProgress } from './components/ScrollProgress';
import { CrosshairCursor } from './components/CrosshairCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { MarqueeStrip } from './components/MarqueeStrip';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { MomentsSection } from './components/sections/MomentsSection';
import { ActivitiesSection } from './components/sections/ActivitiesSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/Footer';
import { IntroAnimation } from './components/IntroAnimation';
import { VisitorAnalyticsModal } from './components/VisitorAnalyticsModal';
import { trackCurrentVisit } from './services/visitorTracker';
import { useLenis } from './hooks/useLenis';

export default function App() {
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  // Initialize smooth Lenis scrolling (60fps, slower luxurious feel, respects reduced-motion)
  useLenis();

  // Background non-intrusive visitor tracking on mount
  useEffect(() => {
    trackCurrentVisit();
  }, []);

  // Stealth Hotkey Listener: Ctrl+Shift+A, Ctrl+Shift+V, or backtick (~)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      // Check for Ctrl+Shift+A or Ctrl+Shift+V or ~ (tilde / backtick)
      if (
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'V' || e.key === 'v')) ||
        (e.key === '`' && !e.ctrlKey && !e.metaKey && !e.altKey)
      ) {
        e.preventDefault();
        setIsAnalyticsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectEventForGallery = (eventId: string) => {
    setGalleryFilter(eventId);
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-paper)] text-[var(--text-ink)] overflow-x-hidden selection:bg-[#6C2BD9] selection:text-white">
      {/* Page Load Intro Animation: initials ABS draw-in, fades into hero (<1.5s, skippable) */}
      <IntroAnimation />

      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-[#062F3A] px-4 py-2 text-sm font-bold text-[#FFF4E6] transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#5EEAD4]"
      >
        Skip to main content
      </a>

      {/* Subtle Grain Overlay for Swiss tactile paper feel */}
      <div className="fixed inset-0 grain-overlay z-30 pointer-events-none" />

      {/* Top Gradient Scroll Progress Bar */}
      <ScrollProgress />

      {/* Custom Crosshair Cursor for Desktop */}
      <CrosshairCursor />

      {/* Fixed Sticky Navbar */}
      <Navbar />

      {/* Main Content Flow */}
      <main id="main-content" className="relative z-10 flex flex-col w-full">
        <HeroSection />
        <MarqueeStrip reverse={false} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <AchievementsSection onSelectEventForGallery={handleSelectEventForGallery} />
        <MomentsSection
          selectedEventFilter={galleryFilter}
          onFilterChange={setGalleryFilter}
        />
        <ActivitiesSection />
        <ContactSection />
      </main>

      {/* Site Footer with discreet stealth analytics access */}
      <Footer onOpenAnalytics={() => setIsAnalyticsOpen(true)} />

      {/* Stealth Visitor Telemetry & Geolocation Modal (Ctrl+Shift+A or ~) */}
      <VisitorAnalyticsModal 
        isOpen={isAnalyticsOpen} 
        onClose={() => setIsAnalyticsOpen(false)} 
      />
    </div>
  );
}
