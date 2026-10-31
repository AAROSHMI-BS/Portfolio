import { motion } from 'motion/react';
import { PORTFOLIO_CONTENT } from '../../data/content';
import { CornerMarks } from '../CornerMarks';
import { Sparkles, Terminal, BookOpen, Compass } from 'lucide-react';

export function AboutSection() {
  const { about, stats } = PORTFOLIO_CONTENT;

  return (
    <section
      id="about"
      className="relative w-full py-24 px-4 sm:px-8 border-b border-[var(--grid-line)] bg-white/30 dark:bg-black/10"
    >
      <CornerMarks
        topLeft="01 / ABOUT"
        topRight="AAROSHMI B S"
        bottomLeft="STUDENT & DEVELOPER"
        bottomRight="INNOVATION"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header with Bolder Type Scale */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#6C2BD9] dark:text-[#A78BFA] [.palette-teal_&]:text-[#062F3A] [.palette-teal.dark_&]:text-[#5EEAD4] font-black">
                01. About The Developer
              </span>
              <span className="w-2 h-2 rounded-full bg-[#6C2BD9] [.palette-teal_&]:bg-[#5EEAD4]" />
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-[var(--text-ink)] leading-[0.95]">
              Building With Curiosity
            </h2>
          </div>
          <p className="font-serif-accent italic text-xl sm:text-2xl text-[var(--text-muted)] max-w-md leading-snug">
            "Continuous learning, collaborative spirit, and impactful code."
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Bio Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="p-7 sm:p-9 rounded-[32px] bg-white dark:bg-[#1B1238] [.palette-teal_&]:bg-white [.palette-teal.dark_&]:bg-[#0A3B49] border-2 border-slate-200/80 dark:border-white/10 [.palette-teal_&]:border-[#062F3A]/15 shadow-sm relative overflow-hidden">
              {/* Subtle ambient accent glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#6C2BD9]/10 via-[#E11D8F]/5 to-transparent [.palette-teal_&]:from-[#5EEAD4]/15 [.palette-teal_&]:via-[#FFB4A2]/10 blur-2xl pointer-events-none" />

              <p className="text-base sm:text-lg leading-relaxed text-[var(--text-ink)] font-body relative z-10">
                {about.bio}
              </p>
            </div>

            {/* Structured Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {about.highlights.map((h, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/80 dark:bg-[#1B1238]/80 [.palette-teal_&]:bg-white/90 [.palette-teal.dark_&]:bg-[#0A3B49]/80 border border-slate-200 dark:border-white/10 [.palette-teal_&]:border-[#062F3A]/15 shadow-xs"
                >
                  <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#6C2BD9] dark:text-[#A78BFA] [.palette-teal_&]:text-[#062F3A] font-black block mb-1">
                    {h.label}
                  </span>
                  <p className="text-xs font-semibold text-[var(--text-ink)] leading-snug">
                    {h.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Derived Stats & Core Tenets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Derived Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-[28px] bg-white dark:bg-[#1B1238] [.palette-teal_&]:bg-white [.palette-teal.dark_&]:bg-[#0A3B49] border-2 border-slate-200/80 dark:border-white/10 [.palette-teal_&]:border-[#062F3A]/15 shadow-xs flex flex-col justify-between"
                >
                  <span className="text-3xl sm:text-5xl font-display font-black text-[#6C2BD9] dark:text-[#A78BFA] [.palette-teal_&]:text-[#062F3A] [.palette-teal.dark_&]:text-[#5EEAD4] tabular-nums">
                    {s.number}
                  </span>
                  <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[var(--text-muted)] mt-2">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Principles Card */}
            <div className="p-7 rounded-[32px] bg-[#6C2BD9] [.palette-teal_&]:bg-[#062F3A] text-white shadow-lg relative overflow-hidden transition-colors duration-500">
              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-mono-tech tracking-wider uppercase text-purple-200 [.palette-teal_&]:text-[#5EEAD4] font-bold">
                  <Terminal className="w-4 h-4" />
                  <span>Engineering Tenet</span>
                </div>
                <h3 className="font-display font-extrabold text-xl leading-tight">
                  Applied Machine Learning & Reliable Systems
                </h3>
                <p className="text-xs sm:text-sm text-purple-100/90 [.palette-teal_&]:text-[#FFF4E6]/90 font-body leading-relaxed">
                  Focusing on practical implementations—combining Django web architectures with Scikit-learn data pipelines to build tools that solve genuine user problems.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
