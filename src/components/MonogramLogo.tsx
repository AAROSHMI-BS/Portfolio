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
        width={size * 0.68}
        height={size * 0.68}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M18 78 L42 22 L66 78 M27 58 H57"
          stroke={colors.fg}
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M58 24 H70 C80 24 84 32 84 38 C84 45 79 49 72 50 C82 51 88 57 88 66 C88 75 80 78 69 78 H58 V24 Z"
          stroke={colors.fg}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
