interface CornerMarksProps {
  topLeft?: string;
  topRight?: string;
  bottomLeft?: string;
  bottomRight?: string;
  showCrosshairs?: boolean;
  className?: string;
}

export function CornerMarks({
  topLeft = 'AAROSHMI B S',
  topRight = 'SOFTWARE DEVELOPER / AI-ML',
  bottomLeft = 'KANYAKUMARI, IN',
  bottomRight = '2026',
  showCrosshairs = true,
  className = '',
}: CornerMarksProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 p-3 sm:p-6 flex flex-col justify-between ${className}`}
      aria-hidden="true"
    >
      {/* Top row */}
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-2">
          {showCrosshairs && <span className="text-xs font-mono-tech opacity-40 select-none">+</span>}
          {topLeft && (
            <span className="text-[10px] sm:text-xs font-mono-tech tracking-widest text-[var(--text-muted)] opacity-70">
              {topLeft}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {topRight && (
            <span className="text-[10px] sm:text-xs font-mono-tech tracking-widest text-[var(--text-muted)] opacity-70 text-right">
              {topRight}
            </span>
          )}
          {showCrosshairs && <span className="text-xs font-mono-tech opacity-40 select-none">+</span>}
        </div>
      </div>

      {/* Edge triangles (as seen in the Swiss poster reference) */}
      <div className="flex items-center justify-between w-full px-1">
        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-[var(--text-ink)] opacity-30 select-none" />
        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-[var(--text-ink)] opacity-30 select-none" />
      </div>

      {/* Bottom row */}
      <div className="flex items-end justify-between w-full">
        <div className="flex items-center gap-2">
          {showCrosshairs && <span className="text-xs font-mono-tech opacity-40 select-none">+</span>}
          {bottomLeft && (
            <span className="text-[10px] sm:text-xs font-mono-tech tracking-widest text-[var(--text-muted)] opacity-70">
              {bottomLeft}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {bottomRight && (
            <span className="text-[10px] sm:text-xs font-mono-tech tracking-widest text-[var(--text-muted)] opacity-70 text-right">
              {bottomRight}
            </span>
          )}
          {showCrosshairs && <span className="text-xs font-mono-tech opacity-40 select-none">+</span>}
        </div>
      </div>
    </div>
  );
}

export function PlusCrosshair({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-block font-mono-tech text-xs opacity-35 select-none ${className}`}>
      +
    </span>
  );
}
