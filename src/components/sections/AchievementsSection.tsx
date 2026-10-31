import { motion } from 'motion/react';
import { PORTFOLIO_CONTENT, AchievementItem } from '../../data/content';
import { CornerMarks } from '../CornerMarks';
import { Trophy, Award, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';

interface AchievementsSectionProps {
  onSelectEventForGallery?: (eventId: string) => void;
}

export function AchievementsSection({ onSelectEventForGallery }: AchievementsSectionProps) {
  const { achievements } = PORTFOLIO_CONTENT;

  const handleViewPhotos = (eventId: string) => {
    if (onSelectEventForGallery) {
      onSelectEventForGallery(eventId);
    }
    const el = document.getElementById('moments');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="achievements"
      className="relative w-full py-24 px-4 sm:px-8 border-b border-[var(--grid-line)] bg-white/20 dark:bg-black/10"
    >
      <CornerMarks
        topLeft="05 / ACHIEVEMENTS"
        topRight="HACKATHONS & COMPETITIONS"
        bottomLeft="RECOGNITION"
        bottomRight="FIRST PRIZE WINNER"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header with Bolder Type Scale */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#6C2BD9] dark:text-[#A78BFA] [.palette-teal_&]:text-[#062F3A] [.palette-teal.dark_&]:text-[#5EEAD4] font-black">
                05. Honours & Accolades
              </span>
              <span className="w-2 h-2 rounded-full bg-[#6C2BD9] [.palette-teal_&]:bg-[#5EEAD4]" />
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-[var(--text-ink)] leading-[0.95]">
              Podiums & Milestones
            </h2>
          </div>
          <p className="font-serif-accent italic text-xl sm:text-2xl text-[var(--text-muted)] max-w-md leading-snug">
            Competing in high-intensity technical hackathons, national finals, and paper presentations.
          </p>
        </div>

        {/* Alternating Slide-In Cards with Tactile Sticker Badges */}
        <div className="space-y-6">
          {achievements.map((item, idx) => {
            const isFirst = item.isFirstPrize;
            const isNationalFinalist = item.badge.includes('National Finalist');
            const isTop5 = item.badge.includes('5th Prize');

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-[32px] p-7 sm:p-9 transition-all overflow-hidden ${
                  isFirst
                    ? 'bg-gradient-to-r from-purple-950 via-[#1B1238] to-[#12081F] [.palette-teal_&]:from-[#062F3A] [.palette-teal_&]:via-[#0A3B49] [.palette-teal_&]:to-[#062F3A] text-white border-2 border-[#FFD166]/60 shadow-[0_20px_50px_rgba(108,43,217,0.25)]'
                    : isNationalFinalist
                    ? 'bg-gradient-to-r from-pink-950/80 via-[#1B1238] to-[#12081F] [.palette-teal_&]:from-[#0A3B49] [.palette-teal_&]:via-[#08303C] [.palette-teal_&]:to-[#062F3A] text-white border-2 border-[#E11D8F]/50 [.palette-teal_&]:border-[#FFB4A2]/50 shadow-lg'
                    : 'bg-white dark:bg-[#1B1238] [.palette-teal_&]:bg-white [.palette-teal.dark_&]:bg-[#0A3B49] border-2 border-slate-200/80 dark:border-white/10 [.palette-teal_&]:border-[#062F3A]/15 shadow-sm hover:border-[#6C2BD9]/40 transition-colors'
                }`}
              >
                {/* Shimmer Highlight on First Prize Card */}
                {isFirst && (
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none"
                    style={{
                      animation: 'shimmer 4s infinite',
                    }}
                  />
                )}

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    {/* Tactile Sticker Badge & Meta */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      {isFirst ? (
                        <span className="inline-flex items-center gap-1.5 -rotate-2 bg-[#FFD166] text-[#12081F] text-xs font-mono-tech font-black px-3.5 py-1 rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.35)] uppercase border-2 border-black tracking-wider">
                          <Trophy className="w-3.5 h-3.5" />
                          ★ 1ST PRIZE WINNER
                        </span>
                      ) : isNationalFinalist ? (
                        <span className="inline-flex items-center gap-1.5 rotate-1 bg-[#E11D8F] [.palette-teal_&]:bg-[#FFB4A2] text-white [.palette-teal_&]:text-[#062F3A] text-xs font-mono-tech font-black px-3.5 py-1 rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.3)] uppercase border-2 border-black/80 tracking-wider">
                          ✦ NATIONAL FINALIST
                        </span>
                      ) : isTop5 ? (
                        <span className="inline-flex items-center gap-1.5 -rotate-1 bg-[#2DD4BF] [.palette-teal_&]:bg-[#5EEAD4] text-[#12081F] text-xs font-mono-tech font-black px-3 py-1 rounded-full shadow-xs uppercase border-2 border-black/80 tracking-wider">
                          ⚡ TOP 5 CODE SPRINT
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono-tech uppercase font-bold px-3 py-1 rounded-full bg-[#6C2BD9]/10 [.palette-teal_&]:bg-[#062F3A]/10 text-[#6C2BD9] dark:text-[#A78BFA] [.palette-teal_&]:text-[#062F3A] border border-[#6C2BD9]/20">
                          {item.badge}
                        </span>
                      )}

                      <span className="text-xs font-mono-tech text-[var(--text-muted)] dark:text-purple-200/70 font-semibold">
                        {item.date}
                      </span>
                    </div>

                    {/* Title with Bolder Type Scale */}
                    <h3
                      className={`font-display font-black text-2xl sm:text-3xl leading-tight mb-2 tracking-tight ${
                        isFirst || isNationalFinalist ? 'text-white' : 'text-[var(--text-ink)]'
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Organizer */}
                    <p
                      className={`text-xs font-mono-tech font-semibold mb-3 tracking-wide ${
                        isFirst || isNationalFinalist ? 'text-purple-200/90' : 'text-[var(--text-muted)]'
                      }`}
                    >
                      {item.organizer}
                    </p>

                    {/* Description */}
                    <p
                      className={`text-sm sm:text-base font-body leading-relaxed max-w-3xl ${
                        isFirst || isNationalFinalist
                          ? 'text-purple-100/90'
                          : 'text-[var(--text-muted)] dark:text-[#C5B8E3]'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Right Action: Button to filter moments gallery */}
                  <div className="shrink-0 flex items-center">
                    <button
                      type="button"
                      onClick={() => handleViewPhotos(item.eventId)}
                      className={`px-5 py-2.5 rounded-2xl text-xs font-mono-tech font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs active:scale-95 ${
                        isFirst
                          ? 'bg-[#FFD166] text-[#12081F] hover:bg-white border-2 border-black'
                          : isNationalFinalist
                          ? 'bg-[#E11D8F] [.palette-teal_&]:bg-[#FFB4A2] text-white [.palette-teal_&]:text-[#062F3A] hover:bg-white hover:text-black border-2 border-black/60'
                          : 'bg-slate-100 dark:bg-white/10 hover:bg-[#6C2BD9] hover:text-white text-[var(--text-ink)] border border-slate-300 dark:border-white/15'
                      }`}
                    >
                      <span>View in Moments</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
