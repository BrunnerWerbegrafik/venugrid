import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  trailing?: ReactNode; // usually an arrow or plus sign
  variant?: 'solid' | 'confirmed';
  fullWidth?: boolean;
}

/**
 * Primary cyan call-to-action button. The "confirmed" variant is used to
 * briefly indicate a successful add-to-request action.
 */
export function CyanButton({
  children,
  trailing,
  variant = 'solid',
  fullWidth = false,
  className = '',
  ...rest
}: Props) {
  const base =
    'group inline-flex items-center justify-between gap-4 px-7 py-4 text-[12px] uppercase transition-colors duration-150';
  const stylesByVariant =
    variant === 'solid'
      ? 'bg-[#1fb3da] text-black hover:bg-[#4cc3e3]'
      : 'bg-transparent text-[#1fb3da] border border-[#1fb3da]';

  return (
    <button
      {...rest}
      className={`${base} ${stylesByVariant} ${fullWidth ? 'w-full' : ''} ${className}`}
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
