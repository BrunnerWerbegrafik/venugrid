import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  trailing?: ReactNode;
}

/**
 * Subtle outline button with hairline border and cyan hover accent.
 */
export function OutlineButton({
  children,
  trailing,
  className = '',
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={`group inline-flex items-center gap-4 border border-white/20 px-7 py-4 text-[12px] uppercase transition-colors duration-150 hover:border-[#1fb3da] hover:text-[#1fb3da] ${className}`}
      style={{ letterSpacing: '0.28em', fontWeight: 500 }}
    >
      <span>{children}</span>
      {trailing ? (
        <span
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          {trailing}
        </span>
      ) : null}
    </button>
  );
}
