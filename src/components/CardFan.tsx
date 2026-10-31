import { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Mail, Trophy, FolderGit2, ArrowUpRight, Camera } from 'lucide-react';
import { ProfileLinkedInReveal } from './ProfileLinkedInReveal';
import { MonogramLogo } from './MonogramLogo';

interface CardFanProps {
  className?: string;
}

export function CardFan({ className = '' }: CardFanProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cardTilts, setCardTilts] = useState<{ [key: number]: { x: number; y: number } }>({});
  const { scrollY } = useScroll();

  // Fan spreads and rotates slightly as user scrolls down hero
  const fanRotate = useTransform(scrollY, [0, 400], [0, 6]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCardMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCardTilts((prev) => ({
      ...prev,
      [index]: {
        x: -(y / (rect.height / 2)) * 9,
        y: (x / (rect.width / 2)) * 9,
      },
    }));
  };

  const handleCardMouseEnter = (index: number) => {
    // If user is interacting with LinkedIn popover on card 0, don't allow sibling cards to snatch hover focus
    if (isProfileOpen && index !== 0) return;
    setHoveredCard(index);
  };

  const handleCardMouseLeave = (index: number) => {
    // Keep card 0 elevated if LinkedIn popover is open
    if (isProfileOpen && index === 0) return;
    setHoveredCard(null);
    setCardTilts((prev) => ({
      ...prev,
      [index]: { x: 0, y: 0 },
    }));
  };

  // 6 cards config
  const cards = [
    {
      id: 'card-me',
      title: 'ME',
      number: '01',
      sectionId: 'about',
      type: 'profile',
      baseRotate: -18,
      baseX: -160,
      baseY: 20,
      zIndex: 10,
    },
    {
      id: 'card-monogram',
      title: 'CREATIVE',
      number: '02',
      sectionId: 'about',
      type: 'monogram',
      baseRotate: -10,
      baseX: -95,
      baseY: 8,
      zIndex: 12,
    },
    {
      id: 'card-projects',
      title: 'PROJECTS',
      number: '03',
      sectionId: 'projects',
      type: 'projects',
      baseRotate: -2,
      baseX: -25,
      baseY: 0,
      zIndex: 14,
    },
    {
      id: 'card-achievements',
      title: 'AWARDS',
      number: '04',
      sectionId: 'achievements',
      type: 'achievements',
      baseRotate: 6,
      baseX: 45,
      baseY: 6,
      zIndex: 13,
    },
    {
      id: 'card-moments',
      title: 'MOMENTS',
      number: '05',
      sectionId: 'moments',
      type: 'moments',
      baseRotate: 14,
      baseX: 115,
      baseY: 16,
      zIndex: 11,
    },
    {
      id: 'card-contact',
      title: 'CONTACT',
      number: '06',
      sectionId: 'contact',
      type: 'contact',
      baseRotate: 21,
      baseX: 180,
      baseY: 28,
      zIndex: 9,
    },
  ];

  return (
    <div className={`relative w-full flex items-center justify-center min-h-[380px] sm:min-h-[440px] ${className}`}>
      
      {/* Desktop / Tablet: Kinetic Overlapping Fan */}
      <motion.div
        style={{ rotate: fanRotate }}
        className="hidden sm:flex relative items-center justify-center w-full max-w-4xl h-[340px]"
      >
        {cards.map((card, index) => {
          const isProfileCard = card.type === 'profile';
          const isHovered = hoveredCard === index || (isProfileCard && isProfileOpen);
          const isSibling = hoveredCard !== null && Math.abs(hoveredCard - index) === 1 && !isProfileOpen;
          const tilt = cardTilts[index] || { x: 0, y: 0 };

          // Adjust position when sibling is hovered
          let xOffset = card.baseX;
          if (hoveredCard !== null && !isProfileOpen) {
            if (index < hoveredCard) xOffset -= 28;
            if (index > hoveredCard) xOffset += 28;
          }

          return (
            <motion.div
              key={card.id}
              initial={{ y: 160, opacity: 0, rotate: 0 }}
              animate={{
                y: isHovered ? -38 : card.baseY,
                x: xOffset,
                rotate: isHovered ? 0 : card.baseRotate,
                rotateX: isHovered ? tilt.x : 0,
                rotateY: isHovered ? tilt.y : 0,
                scale: isHovered ? 1.09 : isSibling ? 0.98 : 1,
                zIndex: isProfileCard && isProfileOpen ? 50 : isHovered ? 35 : card.zIndex,
                opacity: 1,
              }}
              drag
              dragMomentum
              dragSnapToOrigin
              dragElastic={0.18}
              dragTransition={{
                bounceStiffness: 260,
                bounceDamping: 16,
                power: 0.38,
                min: 0,
                max: 1600,
              }}
              whileDrag={{ scale: 1.14, zIndex: 55, cursor: 'grabbing' }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 20,
                mass: 0.72,
              }}
              onMouseMove={(e) => handleCardMouseMove(index, e)}
              onMouseEnter={() => handleCardMouseEnter(index)}
              onMouseLeave={() => handleCardMouseLeave(index)}
              onClick={() => {
                if (card.type !== 'profile') {
                  scrollToSection(card.sectionId);
                }
              }}
              className="absolute cursor-grab active:cursor-grabbing select-none will-change-transform"
              style={{
                transformOrigin: 'bottom center',
                perspective: 1200,
              }}
            >
              {/* Card Rendering with Layered Overlap Shadows & Teal Palette Support */}
              {card.type === 'profile' ? (
                <div className="shadow-[-12px_24px_48px_rgba(0,0,0,0.32),_0_4px_12px_rgba(0,0,0,0.18)] dark:shadow-[-14px_28px_56px_rgba(0,0,0,0.7)] rounded-[26px]">
                  <ProfileLinkedInReveal isFanned={true} onOpenChange={setIsProfileOpen} />
                </div>
              ) : card.type === 'monogram' ? (
                /* Card 2: Original AB Monogram Card (Orchid in Aurora, Peach in Teal) */
                <div className="w-40 sm:w-48 h-56 sm:h-64 rounded-[28px] bg-[#E11D8F] [.palette-teal_&]:bg-[#FFB4A2] p-4 text-white [.palette-teal_&]:text-[#062F3A] shadow-[-12px_24px_44px_rgba(0,0,0,0.26),_0_4px_12px_rgba(0,0,0,0.16)] dark:shadow-[-14px_28px_52px_rgba(0,0,0,0.65)] border-2 border-white/25 [.palette-teal_&]:border-[#062F3A]/20 hover:border-white transition-all flex flex-col justify-between relative overflow-hidden group">
                  <div className="flex items-center justify-between text-[10px] font-mono-tech uppercase tracking-wider opacity-90 font-bold">
                    <span>{card.number} / CORE</span>
                    <span className="w-2 h-2 rounded-full bg-[#FFD166] [.palette-teal_&]:bg-[#062F3A]" />
                  </div>
                  <div className="flex flex-col items-center justify-center my-auto">
                    <MonogramLogo size={56} variant="white" />
                    <span className="font-display font-extrabold text-sm tracking-widest mt-2 uppercase">
                      BUILD & EXPLORE
                    </span>
                  </div>
                  <div className="text-[11px] font-mono-tech flex items-center justify-between opacity-90 font-bold">
                    <span>INNOVATION</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ) : card.type === 'projects' ? (
                /* Card 3: Projects visual card (CampusMate AI) */
                <div className="w-40 sm:w-48 h-56 sm:h-64 rounded-[28px] bg-white dark:bg-[#1B1238] [.palette-teal_&]:bg-[#FFFFFF] [.palette-teal.dark_&]:bg-[#0A3B49] p-4 text-[var(--text-ink)] shadow-[-12px_24px_44px_rgba(0,0,0,0.22),_0_4px_12px_rgba(0,0,0,0.14)] dark:shadow-[-14px_28px_52px_rgba(0,0,0,0.6)] border-2 border-[#6C2BD9]/30 [.palette-teal_&]:border-[#5EEAD4]/60 hover:border-[#6C2BD9] [.palette-teal_&]:hover:border-[#062F3A] transition-all flex flex-col justify-between group">
                  <div className="flex items-center justify-between text-[10px] font-mono-tech uppercase tracking-wider text-[var(--text-muted)]">
                    <span>{card.number} / WORK</span>
                    <FolderGit2 className="w-3.5 h-3.5 text-[#6C2BD9] [.palette-teal_&]:text-[#062F3A]" />
                  </div>
                  <div className="my-auto">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#6C2BD9]/10 [.palette-teal_&]:bg-[#062F3A]/10 text-[#6C2BD9] dark:text-[#A78BFA] [.palette-teal_&]:text-[#062F3A] text-[10px] font-mono-tech font-bold uppercase mb-1.5">
                      Python · AI
                    </span>
                    <h4 className="font-display font-bold text-sm sm:text-base leading-tight">
                      CampusMate AI
                    </h4>
                    <p className="text-[10px] text-[var(--text-muted)] font-body line-clamp-2 mt-1">
                      Campus assistant & mentor platform.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono-tech flex items-center justify-between text-[#6C2BD9] [.palette-teal_&]:text-[#062F3A] font-bold">
                    <span>VIEW PROJECTS</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ) : card.type === 'achievements' ? (
                /* Card 4: Achievements with tactile 1st Prize sticker badge */
                <div className="w-40 sm:w-48 h-56 sm:h-64 rounded-[28px] bg-[#12081F] [.palette-teal_&]:bg-[#062F3A] text-white p-4 shadow-[-12px_24px_48px_rgba(0,0,0,0.32),_0_4px_12px_rgba(0,0,0,0.18)] dark:shadow-[-14px_28px_56px_rgba(0,0,0,0.7)] border-2 border-white/20 [.palette-teal_&]:border-[#5EEAD4]/40 hover:border-[#FFD166] transition-all flex flex-col justify-between relative overflow-hidden group">
                  {/* 1st Prize Sticker Badge */}
                  <div className="absolute top-3 right-3 -rotate-12 bg-[#FFD166] text-[#12081F] text-[10px] font-mono-tech font-black px-2.5 py-0.5 rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.4)] uppercase border-2 border-black/80">
                    ★ 1ST PRIZE
                  </div>
                  <div className="text-[10px] font-mono-tech uppercase tracking-wider text-[#FFD166] flex items-center gap-1 font-bold">
                    <Trophy className="w-3 h-3" />
                    <span>{card.number} / HONOUR</span>
                  </div>
                  <div className="my-auto">
                    <h4 className="font-display font-bold text-sm sm:text-base leading-tight">
                      Campus Arena
                    </h4>
                    <p className="text-[10px] text-white/75 font-body line-clamp-2 mt-1">
                      Paper Presentation First Place Win.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono-tech flex items-center justify-between text-[#FFD166] font-bold">
                    <span>SEE AWARDS</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ) : card.type === 'moments' ? (
                /* Card 5: Moments gallery card (Coral in Aurora, Mint in Teal) */
                <div className="w-40 sm:w-48 h-56 sm:h-64 rounded-[28px] bg-[#FF6B4A] [.palette-teal_&]:bg-[#5EEAD4] p-4 text-[#12081F] shadow-[-12px_24px_44px_rgba(0,0,0,0.26),_0_4px_12px_rgba(0,0,0,0.16)] dark:shadow-[-14px_28px_52px_rgba(0,0,0,0.65)] border-2 border-white/30 [.palette-teal_&]:border-[#062F3A]/20 hover:border-white transition-all flex flex-col justify-between group">
                  <div className="flex items-center justify-between text-[10px] font-mono-tech uppercase tracking-wider font-bold">
                    <span>{card.number} / GALLERY</span>
                    <Camera className="w-3.5 h-3.5" />
                  </div>
                  <div className="my-auto">
                    <span className="text-2xl font-serif-accent italic block font-bold">
                      Moments
                    </span>
                    <p className="text-[10px] font-mono-tech mt-1 tracking-tight opacity-90 font-medium">
                      Presenting, competing & celebrating.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono-tech flex items-center justify-between font-bold">
                    <span>BROWSE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ) : (
                /* Card 6: Mint/Peach Contact card */
                <div className="w-40 sm:w-48 h-56 sm:h-64 rounded-[28px] bg-[#2DD4BF] [.palette-teal_&]:bg-[#E07A5F] p-4 text-[#12081F] [.palette-teal_&]:text-white shadow-[-12px_24px_44px_rgba(0,0,0,0.26),_0_4px_12px_rgba(0,0,0,0.16)] dark:shadow-[-14px_28px_52px_rgba(0,0,0,0.65)] border-2 border-white/30 hover:border-white transition-all flex flex-col justify-between group">
                  <div className="flex items-center justify-between text-[10px] font-mono-tech uppercase tracking-wider font-bold">
                    <span>{card.number} / SAY HELLO</span>
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="my-auto">
                    <h4 className="font-display font-bold text-sm sm:text-base leading-tight">
                      Let's Connect
                    </h4>
                    <p className="text-[10px] font-body mt-1 leading-snug opacity-90">
                      Open to internships & engineering collaborations.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono-tech flex items-center justify-between font-bold">
                    <span>GET IN TOUCH</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Mobile: Horizontal Swipeable Stack with 'ME' card first */}
      <div className="sm:hidden w-full overflow-x-auto pb-4 pt-2 px-4 no-scrollbar flex items-center gap-4 snap-x snap-mandatory">
        <div className="snap-center shrink-0">
          <ProfileLinkedInReveal />
        </div>
        <div
          onClick={() => scrollToSection('projects')}
          className="snap-center shrink-0 w-52 h-72 rounded-[24px] bg-white dark:bg-[#1B1238] p-5 shadow-lg border border-slate-200 dark:border-white/10 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-xs font-mono-tech text-[var(--text-muted)]">
            <span>02 / WORK</span>
            <FolderGit2 className="w-4 h-4 text-[#6C2BD9]" />
          </div>
          <div>
            <span className="text-[10px] font-mono-tech uppercase px-2 py-0.5 rounded bg-[#6C2BD9]/10 text-[#6C2BD9]">
              Featured Project
            </span>
            <h4 className="font-display font-bold text-base mt-2">CampusMate AI</h4>
            <p className="text-xs text-[var(--text-muted)] mt-1">Campus assistant & mentor platform.</p>
          </div>
          <span className="text-xs font-mono-tech font-bold text-[#6C2BD9] flex items-center gap-1">
            VIEW PROJECTS <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div
          onClick={() => scrollToSection('achievements')}
          className="snap-center shrink-0 w-52 h-72 rounded-[24px] bg-[#12081F] text-white p-5 shadow-lg border border-white/10 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-xs font-mono-tech text-[#FFD166]">
            <span>03 / HONOUR</span>
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono-tech uppercase px-2 py-0.5 rounded bg-[#FFD166] text-[#12081F] font-bold">
              1st Prize Winner
            </span>
            <h4 className="font-display font-bold text-base mt-2">Campus Arena 2026</h4>
            <p className="text-xs text-white/70 mt-1">Paper presentation competition first place.</p>
          </div>
          <span className="text-xs font-mono-tech font-bold text-[#FFD166] flex items-center gap-1">
            VIEW AWARDS <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div
          onClick={() => scrollToSection('contact')}
          className="snap-center shrink-0 w-52 h-72 rounded-[24px] bg-[#2DD4BF] text-[#12081F] p-5 shadow-lg flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-xs font-mono-tech font-bold">
            <span>04 / CONNECT</span>
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-display font-bold text-lg">Say Hello</h4>
            <p className="text-xs mt-1">Internship opportunities & software collaborations.</p>
          </div>
          <span className="text-xs font-mono-tech font-bold flex items-center gap-1">
            CONTACT ME <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
