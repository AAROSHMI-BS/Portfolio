import { motion } from 'motion/react';
import { PORTFOLIO_CONTENT } from '../../data/content';
import { CornerMarks } from '../CornerMarks';
import { Code2, Globe, Database, BrainCircuit, Wrench, HeartHandshake } from 'lucide-react';
import { MarqueeStrip } from '../MarqueeStrip';

const ICONS = [Code2, Globe, Database, BrainCircuit, Wrench, HeartHandshake];

export function SkillsSection() {
  const { skills } = PORTFOLIO_CONTENT;

  return (
    <section
      id="skills"
      className="relative w-full py-24 border-b border-[var(--grid-line)]"
    >
      <div className="px-4 sm:px-8 max-w-6xl mx-auto relative z-10 mb-16">
        <CornerMarks
          topLeft="04 / SKILLS"
          topRight="CAPABILITIES & STACK"
          bottomLeft="APPLIED KNOWLEDGE"
          bottomRight="TOOLSET"
        />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#6C2BD9] dark:text-[#A78BFA] font-bold">
                04. Capabilities
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#6C2BD9]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[var(--text-ink)]">
              Technical Arsenal
            </h2>
          </div>
          <p className="font-serif-accent italic text-lg sm:text-xl text-[var(--text-muted)] max-w-md">
            Grounded in core algorithms, systems design, and intelligent pipelines.
          </p>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.categories.map((category, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-[26px] bg-white dark:bg-[#1B1238] border border-slate-200 dark:border-white/10 shadow-xs hover:border-[#6C2BD9]/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono-tech text-[var(--text-muted)] font-semibold">
                      0{idx + 1}
                    </span>
                    <div
                      className="p-2 rounded-xl transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `${category.color}15`,
                        color: category.color,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-[var(--text-ink)] mb-4">
                    {category.name}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-mono-tech px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-[var(--text-ink)] hover:bg-[#6C2BD9]/10 hover:text-[#6C2BD9] transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Kinetic Marquee Ribbon below the skills cards */}
      <MarqueeStrip reverse={false} />
    </section>
  );
}
