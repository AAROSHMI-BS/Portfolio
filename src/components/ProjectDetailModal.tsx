import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Layers, Cpu, BookOpen, Lightbulb, UserCheck } from 'lucide-react';
import { ProjectItem } from '../data/content';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Keyboard navigation: Escape key closes modal & focus trap
  useEffect(() => {
    if (!project) return;

    // Preserve and restore keyboard focus when the dialog closes.
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocusedRef.current?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  const hasGithub = project.githubUrl && !project.githubUrl.includes('YOUR-USERNAME') && !project.githubUrl.includes('TODO');
  const hasLive = project.liveUrl && !project.liveUrl.includes('TODO');

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto backdrop-blur-md bg-black/60"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-white dark:bg-[#150F26] [.palette-teal_&]:bg-[#FFF4E6] [.palette-teal.dark_&]:bg-[#07252E] text-[var(--text-ink)] border-2 border-slate-200 dark:border-white/15 shadow-2xl p-6 sm:p-9 focus-visible:outline-none"
        >
          {/* Top Decorative Color Bar */}
          <div
            className="absolute top-0 left-8 right-8 h-2 rounded-b-full opacity-90"
            style={{ backgroundColor: project.accentColor }}
          />

          {/* Close Button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close project modal"
            className="absolute top-5 right-5 sm:top-7 sm:right-7 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-[var(--text-ink)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C2BD9]"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-2 mb-3 pr-12">
            {project.badge && (
              <span
                className="text-[11px] font-mono-tech font-black uppercase tracking-wider px-3 py-1 rounded-full border shadow-xs"
                style={{
                  backgroundColor: `${project.accentColor}20`,
                  borderColor: `${project.accentColor}50`,
                  color: project.accentColor,
                }}
              >
                ★ {project.badge}
              </span>
            )}
            {project.subtitle && (
              <span className="text-xs font-mono-tech text-[var(--text-muted)] font-semibold">
                {project.subtitle}
              </span>
            )}
          </div>

          <h2
            id="project-modal-title"
            className="text-2xl sm:text-4xl font-display font-black tracking-tight leading-tight mb-4"
          >
            {project.title}
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-muted)] font-body leading-relaxed mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
            {project.description}
          </p>

          {/* Structured Sections */}
          <div className="space-y-6">
            
            {/* 1. Problem Statement */}
            <section className="rounded-2xl p-4 sm:p-5 bg-slate-50 dark:bg-white/5 [.palette-teal_&]:bg-[#062F3A]/5 border border-slate-200/60 dark:border-white/5">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-[#E11D8F] dark:text-[#FF785A]">
                <AlertCircle className="w-4 h-4" />
                <span>Problem Statement</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-ink)] font-body leading-relaxed">
                {project.problem}
              </p>
            </section>

            {/* 2. My Role & Contributions */}
            <section className="rounded-2xl p-4 sm:p-5 bg-slate-50 dark:bg-white/5 [.palette-teal_&]:bg-[#062F3A]/5 border border-slate-200/60 dark:border-white/5">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-[#6C2BD9] dark:text-[#A78BFA] [.palette-teal_&]:text-[#5EEAD4]">
                <UserCheck className="w-4 h-4" />
                <span>My Role & Contributions</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-ink)] font-body leading-relaxed">
                {project.role}
              </p>
            </section>

            {/* 3. Architecture & Technical Design */}
            <section className="rounded-2xl p-4 sm:p-5 bg-slate-50 dark:bg-white/5 [.palette-teal_&]:bg-[#062F3A]/5 border border-slate-200/60 dark:border-white/5">
              <div className="flex items-center gap-2 mb-3 text-xs font-mono-tech font-bold uppercase tracking-wider text-[#2DD4BF]">
                <Layers className="w-4 h-4" />
                <span>System Architecture</span>
              </div>
              <ul className="space-y-2">
                {project.architecture.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-ink)] font-body">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#2DD4BF]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 4. Technologies Used */}
            <section>
              <div className="flex items-center gap-2 mb-2.5 text-xs font-mono-tech font-bold uppercase tracking-wider text-[var(--text-muted)]">
                <Cpu className="w-4 h-4" />
                <span>Tech Stack & Tools</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techUsed.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono-tech font-medium px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/10 [.palette-teal_&]:bg-[#062F3A]/10 text-[var(--text-ink)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* 5. Key Learnings & Challenges */}
            <section className="rounded-2xl p-4 sm:p-5 bg-[#6C2BD9]/5 dark:bg-[#6C2BD9]/15 border border-[#6C2BD9]/20">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-[#6C2BD9] dark:text-[#C4B5FD]">
                <BookOpen className="w-4 h-4" />
                <span>What I Learned</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-ink)] font-body leading-relaxed mb-3">
                {project.learnings}
              </p>
              {project.challenges && (
                <div className="pt-3 border-t border-[#6C2BD9]/15">
                  <span className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                    Key Engineering Challenge
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--text-ink)]/90 font-body leading-relaxed italic">
                    "{project.challenges}"
                  </p>
                </div>
              )}
            </section>

            {/* 6. Unknowns / Roadmap (Explicit TODO items) */}
            {project.unknowns && project.unknowns.length > 0 && (
              <section className="rounded-2xl p-4 sm:p-5 bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono-tech font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  <Lightbulb className="w-4 h-4" />
                  <span>Technical Roadmap & Pending Unknowns</span>
                </div>
                <ul className="space-y-1.5">
                  {project.unknowns.map((unknownItem, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs font-mono-tech text-amber-800 dark:text-amber-300">
                      <span className="font-bold shrink-0">·</span>
                      <span>{unknownItem}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </div>

          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono-tech text-[var(--text-muted)]">
              Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-[10px]">ESC</kbd> or click outside to dismiss
            </span>

            <div className="flex items-center gap-3">
              {hasGithub && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-xs font-mono-tech font-bold uppercase tracking-wider text-[var(--text-ink)] transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}

              {hasLive && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6C2BD9] hover:bg-[#5922B8] text-white text-xs font-mono-tech font-bold uppercase tracking-wider shadow-sm transition-all"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-white/15 dark:hover:bg-white/25 text-xs font-mono-tech font-bold uppercase tracking-wider transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
