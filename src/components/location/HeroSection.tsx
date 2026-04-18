import { PlaceholderImage } from '../ui/PlaceholderImage';
import { Eyebrow } from '../ui/Eyebrow';
import type { Location } from '../../types';

interface Props {
  location: Location;
}

/**
 * Split hero in the Celonis aesthetic:
 *  - Left half: text block (eyebrow, large light headline with accent,
 *    short intro). Immediately visible on page load.
 *  - Right half: the location's title image as a background.
 *  - Height slightly below viewport (calc(100vh - 200px)) so there is a
 *    visual hint of more content below.
 *
 * On mobile (< md) the layout collapses to a stacked column: text first,
 * then image below.
 */
export function HeroSection({ location }: Props) {
  const nameParts = location.name.split(' ');
  const accentWord = nameParts.pop() ?? '';
  const leadWords = nameParts.join(' ');

  return (
    <section className="border-b hairline">
      <div className="grid md:min-h-[clamp(460px,62vh,640px)] md:grid-cols-2">
        {/* LEFT — Textblock */}
        <div className="flex flex-col justify-center px-8 py-20 sm:px-12 md:px-16 md:py-24 lg:px-20 xl:px-24">
          <Eyebrow className="mb-8">Event Location · Kolbermoor</Eyebrow>
          <h1
            className="max-w-[720px] text-[44px] leading-[1.02] sm:text-[60px] md:text-[72px] lg:text-[88px] xl:text-[104px]"
            style={{ fontWeight: 300, letterSpacing: '-0.025em' }}
          >
            {leadWords ? `${leadWords} ` : ''}
            <span className="italic-accent">{accentWord}</span>
          </h1>
          <p
            className="mt-10 max-w-[520px] text-[15px] leading-relaxed sm:text-[16px]"
            style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}
          >
            {location.description}
          </p>
        </div>

        {/* RIGHT — Image */}
        <div className="relative h-[360px] overflow-hidden border-t hairline md:h-auto md:border-l md:border-t-0">
          <PlaceholderImage
            src={location.heroImage.url}
            alt={location.heroImage.alt}
            placeholderGradient={location.heroImage.placeholderGradient}
            fallbackLabel="TITELBILD"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
