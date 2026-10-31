interface MonogramLogoProps {
  className?: string;
  size?: number;
  variant?: 'violet' | 'orchid' | 'ink' | 'white';
}

export function MonogramLogo({
  className = '',
  size = 36,
  variant = 'violet',
}: MonogramLogoProps) {
  const getColors = () => {
    switch (variant) {
      case 'orchid':
        return {
          bg: '#E11D8F',
          border: '#FF6B4A',
          fg: '#FFFFFF',
        };
      case 'ink':
        return {
          bg: 'var(--text-ink)',
          border: 'var(--hero-violet)',
          fg: 'var(--bg-paper)',
        };
      case 'white':
        return {
          bg: '#FFFFFF',
          border: '#6C2BD9',
          fg: '#12081F',
        };
      case 'violet':
      default:
        return {
          bg: '#6C2BD9',
          border: '#E11D8F',
          fg: '#FFFFFF',
        };
    }
  };

  const colors = getColors();

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full transition-transform hover:scale-105 select-none ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: colors.bg,
        border: `1.5px solid ${colors.border}`,
        boxShadow: '0 4px 12px rgba(108, 43, 217, 0.2)',
      }}
      aria-label="Aaroshmi B S Monogram"
    >
      <svg
        width={size * 0.72}
        height={size * 0.72}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Geometric Bauhaus / Swiss inspired custom 'AB' monogram */}
        {/* Letter A: bold triangle with crossbar */}
        <path
          d="M26 80 L50 20 L74 80"
          stroke={colors.fg}
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="36"
          y1="56"
          x2="64"
          y2="56"
          stroke={colors.fg}
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Letter B integration: sleek right side loop arc intersecting A */}
        <path
          d="M50 32 C65 32 75 42 75 52 C75 62 65 64 50 64"
          stroke={colors.fg}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M50 56 C68 56 80 66 80 78 C80 82 72 84 58 84"
          stroke={colors.fg}
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Central curiosity dot */}
        <circle cx="50" cy="46" r="4" fill={colors.fg} />
      </svg>
    </div>
  );
}
