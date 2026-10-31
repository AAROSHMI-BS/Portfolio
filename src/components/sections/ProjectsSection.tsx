import { useState } from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_CONTENT, ProjectItem } from '../../data/content';
import { CornerMarks } from '../CornerMarks';
import { ProjectDetailModal } from '../ProjectDetailModal';
import { Github, Folder, ArrowUpRight, BookOpen } from 'lucide-react';

function ProjectCard({
  project,
  index,
  onOpenDetails,
}: {
  project: ProjectItem;
  index: number;
  onOpenDetails: (project: ProjectItem) => void;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 6,
      y: (x / (rect.width / 2)) * 6,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenDetails(project);
    }
  };

  const hasGithub = project.githubUrl && !project.githubUrl.includes('YOUR-USERNAME') && !project.githubUrl.includes('TODO');
  const hasLive = project.liveUrl && !project.liveUrl.includes('TODO');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenDetails(project)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View full case study for ${project.title}`}
      aria-haspopup="dialog"
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      style={{ perspective: 1000 }}
      className="relative rounded-[32px] p-7 sm:p-8 bg-white dark:bg-[#1B1238] [.palette-teal_&]:bg-white [.palette-teal.dark_&]:bg-[#0A3B49] border-2 border-slate-200/80 dark:border-white/10 [.palette-teal_&]:border-[#062F3A]/15 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6C2BD9]"
    >
      {/* Dynamic atmospheric radial background glow matching project accent color */}
      <div
        className="absolute -top-24 -right-24 w-56 h-56 rounded-full opacity-10 group-hover:opacity-25 transition-opacity blur-3xl pointer-events-none"
        style={{ backgroundColor: project.accentColor }}
      />

      {/* Top accent bar */}
      <div
        className="absolute top-0 left-8 right-8 h-1.5 rounded-b-full opacity-80 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: project.accentColor }}
      />

      <div>
        {/* Top meta row with tactile badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-tech text-[var(--text-muted)] font-black">
              {`0${index + 1}`}
            </span>
            {project.badge && (
              <span
                className="text-[10px] font-mono-tech font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs border border-black/20 rotate-[-1deg]"
                style={{
                  backgroundColor: `${project.accentColor}25`,
                  color: project.accentColor,
                }}
              >
                ★ {project.badge}
              </span>
            )}
          </div>
          <Folder className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--hero-violet)] transition-colors" />
        </div>

        {/* Project Title with Bolder Type Scale */}
        <h3 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-ink)] group-hover:text-[var(--hero-violet)] transition-colors leading-tight mb-2 tracking-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-[var(--text-muted)] dark:text-[#C5B8E3] font-body leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      {/* Bottom Area: Tech Chips & Action Links */}
      <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex flex-col gap-4">
        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="text-[11px] font-mono-tech font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 [.palette-teal_&]:bg-[#062F3A]/5 text-[var(--text-muted)] dark:text-[#B8AAD9]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action row with explicit Case Study trigger & links */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-bold text-[var(--hero-violet)] group-hover:underline">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Case Study Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>

          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {hasGithub && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub source code for ${project.title}`}
                className="inline-flex items-center gap-1 text-xs font-mono-tech font-bold text-[var(--text-ink)] hover:text-[var(--hero-violet)] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            )}
            {hasLive && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo for ${project.title}`}
                className="inline-flex items-center gap-1 text-xs font-mono-tech font-bold text-[var(--hero-violet)] hover:underline"
              >
                <span>Live</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const { projects } = PORTFOLIO_CONTENT;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section
      id="projects"
      className="relative w-full py-24 px-4 sm:px-8 border-b border-[var(--grid-line)] bg-white/20 dark:bg-black/10"
    >
      <CornerMarks
        topLeft="03 / PROJECTS"
        topRight="PYTHON · DJANGO · AI"
        bottomLeft="DEVELOPED WORK"
        bottomRight="HACKATHON PODIUM"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header with Bolder Type Scale */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#6C2BD9] dark:text-[#A78BFA] [.palette-teal_&]:text-[#062F3A] [.palette-teal.dark_&]:text-[#5EEAD4] font-black">
                03. Selected Projects
              </span>
              <span className="w-2 h-2 rounded-full bg-[#6C2BD9] [.palette-teal_&]:bg-[#5EEAD4]" />
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-[var(--text-ink)] leading-[0.95]">
              Crafted With Code
            </h2>
          </div>
          <p className="font-serif-accent italic text-xl sm:text-2xl text-[var(--text-muted)] max-w-md leading-snug">
            From database CRUD architectures to assistive AI and NLP models. Click any project to view full case study.
          </p>
        </div>

        {/* 2x2 Clean Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onOpenDetails={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
