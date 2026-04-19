import { Link } from 'react-router-dom';
import { PlaceholderImage } from '../ui/PlaceholderImage';
import type { Area } from '../../types';

interface Props {
  area: Area;
  index: number; // 1-based position, shown as "01", "02", ...
  locationSlug: string;
}

/**
 * Horizontal row-style card for an area: fixed-ratio image on the left,
 * textblock on the right. The image uses object-fit: cover with a
 * consistent aspect ratio so every area looks the same even when source
 * images have different proportions.
 */
export function AreaCard({ area, index, locationSlug }: Props) {
  const num = String(index).padStart(2, '0');

  return (
    <Link
      to={`/l/${locationSlug}/bereich/${area.id}`}
      className="arrow-link group grid grid-cols-1 items-stretch transition-colors duration-200 hover:bg-white/[0.025] md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
    >
      {/* Image column — fixed 16:10 aspect ratio, object-cover */}
      <div className="relative overflow-hidden">
        <div style={{ aspectRatio: '16 / 10' }} className="w-full">
          <PlaceholderImage
            src={area.image.url}
            alt={area.image.alt}
            placeholderGradient={area.image.placeholderGradient}
            fallbackLabel={`BEREICH ${num} – ${area.name.toUpperCase()}`}
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>

      {/* Text column */}
      <div className="flex flex-col justify-center gap-6 px-8 py-10 md:px-12 md:py-12 lg:px-16">
        {/* Chapter number */}
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
            className="h-px w-10"
            style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
          />
        </div>

        <div className="flex items-start justify-between gap-6">
          <h3
            className="text-[32px] leading-tight sm:text-[40px] md:text-[44px] lg:text-[52px]"
            style={{ fontWeight: 300, letterSpacing: '-0.02em' }}
          >
            {area.name}
          </h3>
          <span
            aria-hidden
            className="arrow mt-2 shrink-0 text-white/55"
            style={{ fontSize: 24 }}
          >
            →
          </span>
        </div>

        <p
          className="max-w-[520px] text-[14px] leading-relaxed sm:text-[15px] lg:text-[16px]"
          style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}
        >
          {area.description}
        </p>
      </div>
    </Link>
  );
}
