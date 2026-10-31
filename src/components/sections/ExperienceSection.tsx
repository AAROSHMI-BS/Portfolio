import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PORTFOLIO_CONTENT } from '../../data/content';
import { CornerMarks } from '../CornerMarks';
import { Briefcase, GraduationCap, MapPin, Calendar, Award } from 'lucide-react';

export function ExperienceSection() {
  const { experience, education } = PORTFOLIO_CONTENT;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full py-24 px-4 sm:px-8 border-b border-[var(--grid-line)]"
    >
      <CornerMarks
        topLeft="02 / TIMELINE"
        topRight="EXPERIENCE & EDUCATION"
        bottomLeft="DEVELOPMENT PATH"
        bottomRight="2022 – 2028"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#6C2BD9] dark:text-[#A78BFA] font-bold">
                02. Experience & Education
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#6C2BD9]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[var(--text-ink)]">
              Milestones & Trajectory
            </h2>
          </div>
          <p className="font-serif-accent italic text-lg sm:text-xl text-[var(--text-muted)] max-w-md">
            Hands-on internships paired with solid computer science fundamentals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Work Experience Timeline */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2.5 mb-8">
              <div className="p-2 rounded-xl bg-[#6C2BD9] text-white">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-ink)]">
                Work Experience
              </h3>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l border-slate-300 dark:border-white/10 space-y-10">
              {experience.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative group"
                >
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-[#0F0A1E] border-2 border-[#6C2BD9] group-hover:scale-125 transition-transform" />

                  <div className="p-6 rounded-[24px] bg-white dark:bg-[#1B1238] border border-slate-200 dark:border-white/10 shadow-xs hover:border-[#6C2BD9]/40 transition-colors">
                    
                    {/* Role & Organization */}
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <h4 className="font-display font-bold text-lg text-[var(--text-ink)]">
                        {exp.role}
                      </h4>
                      <span className="text-xs font-mono-tech text-[#6C2BD9] dark:text-[#A78BFA] font-bold">
                        {exp.organization}
                      </span>
                    </div>

                    {/* Metadata line (unboxed with separators) */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tech text-[var(--text-muted)] mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                      <span>·</span>
                      <span>{exp.type}</span>
                    </div>

                    {/* Points list */}
                    <ul className="space-y-2 text-sm text-[var(--text-muted)] dark:text-[#D1C7E8] font-body">
                      {exp.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="text-[#6C2BD9] font-bold mt-1 text-xs">▸</span>
                          <span className="leading-relaxed">{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Certificate link placeholder if exists */}
                    {exp.certificateImage && (
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                        <a
                          href={exp.certificateImage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-bold text-[#6C2BD9] hover:underline"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>View Certificate of Internship</span>
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Education Timeline */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 mb-8">
              <div className="p-2 rounded-xl bg-[#E11D8F] text-white">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-ink)]">
                Education
              </h3>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l border-slate-300 dark:border-white/10 space-y-8">
              {education.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative group"
                >
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-[#0F0A1E] border-2 border-[#E11D8F] group-hover:scale-125 transition-transform" />

                  <div className="p-5 rounded-[24px] bg-white dark:bg-[#1B1238] border border-slate-200 dark:border-white/10 shadow-xs hover:border-[#E11D8F]/40 transition-colors">
                    <span className="text-[11px] font-mono-tech text-[#E11D8F] dark:text-[#F472B6] font-bold block mb-1">
                      {edu.period}
                    </span>
                    <h4 className="font-display font-bold text-base text-[var(--text-ink)]">
                      {edu.degree}
                    </h4>
                    <p className="text-xs font-medium text-[var(--text-muted)] mt-0.5">
                      {edu.institution}
                    </p>
                    {edu.details && (
                      <p className="text-xs text-[var(--text-muted)] dark:text-[#B8AAD9] font-body mt-2 leading-relaxed">
                        {edu.details}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
