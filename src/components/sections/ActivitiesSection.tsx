import { motion } from 'motion/react';
import { PORTFOLIO_CONTENT } from '../../data/content';
import { CornerMarks } from '../CornerMarks';
import { Users, Radio, Navigation, ShieldCheck } from 'lucide-react';

const ACTIVITY_ICONS = [ShieldCheck, Users, Radio, Navigation];

export function ActivitiesSection() {
  const { activities } = PORTFOLIO_CONTENT;

  return (
    <section
      id="activities"
      className="relative w-full py-24 px-4 sm:px-8 border-b border-[var(--grid-line)] bg-white/30 dark:bg-black/10"
    >
      <CornerMarks
        topLeft="07 / LEADERSHIP"
        topRight="COMMUNITY & CLUBS"
        bottomLeft="ACTIVE PARTICIPATION"
        bottomRight="INITIATIVE"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#6C2BD9] dark:text-[#A78BFA] [.palette-teal_&]:text-[#062F3A] [.palette-teal.dark_&]:text-[#5EEAD4] font-black">
                07. Activities & Leadership
              </span>
              <span className="w-2 h-2 rounded-full bg-[#6C2BD9] [.palette-teal_&]:bg-[#5EEAD4]" />
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-[var(--text-ink)] leading-[0.95]">
              Beyond The Screen
            </h2>
          </div>
          <p className="font-serif-accent italic text-xl sm:text-2xl text-[var(--text-muted)] max-w-md leading-snug">
            Leading teams, organizing technical workshops, and active community outreach.
          </p>
        </div>

        {/* 4 Cards Grid with Tactile Sticker Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((act, idx) => {
            const Icon = ACTIVITY_ICONS[idx % ACTIVITY_ICONS.length];
            const tilts = ['-rotate-2', 'rotate-2', '-rotate-1', 'rotate-3'];
            const stickerTilt = tilts[idx % tilts.length];

            return (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-7 rounded-[30px] bg-white dark:bg-[#1B1238] [.palette-teal_&]:bg-white [.palette-teal.dark_&]:bg-[#0A3B49] border-2 border-slate-200/80 dark:border-white/10 [.palette-teal_&]:border-[#062F3A]/15 shadow-sm hover:border-[#6C2BD9]/50 [.palette-teal_&]:hover:border-[#5EEAD4] hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono-tech text-[var(--text-muted)] font-black">
                      0{idx + 1}
                    </span>
                    <div className="p-2.5 rounded-xl bg-[#6C2BD9]/10 [.palette-teal_&]:bg-[#062F3A]/10 text-[#6C2BD9] dark:text-[#A78BFA] [.palette-teal_&]:text-[#062F3A] group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {act.badge && (
                    <div className="mb-3">
                      <span className={`inline-block text-[10px] font-mono-tech font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs border-2 border-black/80 ${stickerTilt} ${
                        idx === 3
                          ? 'bg-[#FFD166] text-[#12081F]'
                          : idx === 1
                          ? 'bg-[#E11D8F] [.palette-teal_&]:bg-[#FFB4A2] text-white [.palette-teal_&]:text-[#062F3A]'
                          : idx === 2
                          ? 'bg-[#2DD4BF] [.palette-teal_&]:bg-[#5EEAD4] text-[#12081F]'
                          : 'bg-slate-200 dark:bg-white/20 text-[var(--text-ink)]'
                      }`}>
                        ★ {act.badge}
                      </span>
                    </div>
                  )}

                  <h3 className="font-display font-extrabold text-lg text-[var(--text-ink)] mb-1 leading-snug">
                    {act.title}
                  </h3>

                  <p className="text-xs font-mono-tech text-[#6C2BD9] dark:text-[#A78BFA] [.palette-teal_&]:text-[#062F3A] font-bold mb-3">
                    {act.role}
                  </p>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] dark:text-[#B8AAD9] font-body leading-relaxed">
                    {act.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
