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
      className="group grid grid-cols-1 items-stretch md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]"
    >
      {/* Image column — inset from the row edges; fixed 16:10 aspect ratio with object-cover.
          Image gently zooms in when the card is hovered (triggered from the group scope). */}
      <div className="p-5 sm:p-6 md:py-7 md:pl-8 md:pr-6">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 10' }}>
          <PlaceholderImage
            src={area.image.url}
            alt={area.image.alt}
            placeholderGradient={area.image.placeholderGradient}
            fallbackLabel={`BEREICH ${num} – ${area.name.toUpperCase()}`}
            className="absolute inset-0 h-full w-full"
            imgClassName="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
          />
        </div>
      </div>

      {/* Text column */}
      <div className="flex flex-col justify-center gap-6 px-6 pb-10 pt-4 md:gap-7 md:px-14 md:py-10 lg:px-20 lg:pr-24">
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
            className="text-[28px] leading-tight sm:text-[34px] md:text-[40px] lg:text-[48px]"
            style={{ fontWeight: 300, letterSpacing: '-0.02em' }}
          >
            {area.name}
          </h3>
          <span
            aria-hidden
            className="mt-2 shrink-0 text-white/55 transition-all duration-300 ease-out group-hover:translate-x-3 group-hover:text-[#1fb3da]"
            style={{ fontSize: 28 }}
          >
            →
          </span>
        </div>

        <p
          className="max-w-[640px] pr-12 text-[14px] leading-relaxed sm:pr-16 sm:text-[15px] lg:text-[16px]"
          style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}
        >
          {area.description}
        </p>
      </div>
    </Link>
  );
}
