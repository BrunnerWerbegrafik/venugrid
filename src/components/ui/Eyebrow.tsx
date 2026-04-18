import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

/**
 * Uppercase eyebrow label with a horizontal line to the left — the
 * characteristic Celonis-style section marker. Rendered in a light gray
 * tone (no color accent) to keep cyan strictly reserved for buttons and
 * interactive states.
 */
export function Eyebrow({ children, className = '' }: Props) {
  return (
    <div
      className={`flex items-center gap-5 ${className}`}
      style={{ color: 'rgba(255,255,255,0.7)' }}
    >
      <span
        aria-hidden
        className="block h-px w-12"
        style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}
      />
      <span
        className="text-[11px] uppercase"
        style={{ letterSpacing: '0.28em', fontWeight: 500 }}
      >
        {children}
      </span>
    </div>
  );
}
