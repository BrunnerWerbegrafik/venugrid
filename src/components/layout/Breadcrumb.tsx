import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbSegment {
  label: string;
  to?: string; // if missing, it's the current/last segment
}

interface Props {
  segments: BreadcrumbSegment[];
  className?: string;
}

export function Breadcrumb({ segments, className = '' }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase ${className}`}
      style={{ letterSpacing: '0.28em', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}
    >
      {segments.map((s, i) => (
        <Fragment key={`${s.label}-${i}`}>
          {s.to ? (
            <Link
              to={s.to}
              className="text-white/70 transition-colors hover:text-[#1fb3da]"
            >
              {s.label}
            </Link>
          ) : (
            <span className="text-white">{s.label}</span>
          )}
          {i < segments.length - 1 && <span aria-hidden>/</span>}
        </Fragment>
      ))}
    </nav>
  );
}
