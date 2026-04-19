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
      className="arrow-link group grid grid-cols-1 items-stretch transition-colors duration-200 hover:bg-white/[0.025] md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
    >
      {/* Image column — inset from the row edges; fixed 16:9 aspect ratio with object-cover */}
      <div className="p-4 sm:p-5 md:py-6 md:pl-6 md:pr-4">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
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
      <div className="flex flex-col justify-center gap-4 px-6 pb-8 pt-2 md:gap-5 md:px-10 md:py-8 lg:px-12">
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
            className="text-[26px] leading-tight sm:text-[30px] md:text-[34px] lg:text-[38px]"
            style={{ fontWeight: 300, letterSpacing: '-0.02em' }}
          >
            {area.name}
          </h3>
          <span
            aria-hidden
            className="arrow mt-2 shrink-0 text-white/55"
            style={{ fontSize: 22 }}
          >
            →
          </span>
        </div>

        <p
          className="max-w-[520px] text-[14px] leading-relaxed sm:text-[15px]"
          style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}
        >
          {area.description}
        </p>
      </div>
    </Link>
  );
}
