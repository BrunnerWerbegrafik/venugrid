import { Link } from 'react-router-dom';
import { PlaceholderImage } from '../ui/PlaceholderImage';
import type { Area } from '../../types';

interface Props {
  area: Area;
  index: number; // 1-based position, shown as "01", "02", ...
  locationSlug: string;
}

export function AreaCard({ area, index, locationSlug }: Props) {
  const num = String(index).padStart(2, '0');

  return (
    <Link
      to={`/l/${locationSlug}/bereich/${area.id}`}
      className="arrow-link group relative flex h-full flex-col transition-colors duration-200 hover:bg-white/[0.025]"
    >
      <div className="relative">
        <PlaceholderImage
          src={area.image.url}
          alt={area.image.alt}
          placeholderGradient={area.image.placeholderGradient}
          fallbackLabel={`BEREICH ${num} – ${area.name.toUpperCase()}`}
          className="h-[240px] w-full sm:h-[280px] lg:h-[320px]"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.75) 100%)',
          }}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 px-7 py-8">
        {/* Chapter number — prominent, as in Celonis chapter markers */}
        <div className="flex items-center gap-4">
          <span
            className="text-[11px]"
            style={{
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.28em',
              fontWeight: 500,
            }}
          >
            {num}
          </span>
          <span
            aria-hidden
            className="h-px w-8"
            style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
          />
        </div>

        <div className="flex items-start justify-between gap-4">
          <h3
            className="text-[22px] leading-tight sm:text-[26px]"
            style={{ fontWeight: 300, letterSpacing: '-0.015em' }}
          >
            {area.name}
          </h3>
          <span
            aria-hidden
            className="arrow mt-1 shrink-0 text-white/55"
            style={{ fontSize: 20 }}
          >
            →
          </span>
        </div>

        <p
          className="text-[13px] leading-relaxed sm:text-[14px]"
          style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}
        >
          {area.description}
        </p>
      </div>
    </Link>
  );
}
