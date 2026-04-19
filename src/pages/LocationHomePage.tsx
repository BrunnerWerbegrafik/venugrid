import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HeroSection } from '../components/location/HeroSection';
import { AreaCard } from '../components/location/AreaCard';
import { Eyebrow } from '../components/ui/Eyebrow';
import { locationService } from '../services/locationService';
import { areaService } from '../services/areaService';
import type { Area, Location } from '../types';

export function LocationHomePage() {
  const { slug = '' } = useParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    locationService.getBySlug(slug).then(async (loc) => {
      if (cancelled) return;
      setLocation(loc);
      if (loc) {
        const list = await areaService.getByLocationId(loc.id);
        if (!cancelled) setAreas(list);
      }
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return <div className="px-6 py-20 text-center text-white/40">Lade …</div>;
  }

  if (!location) {
    return (
      <div className="px-6 py-20 text-center text-white/60">
        Location nicht gefunden.
      </div>
    );
  }

  return (
    <>
      <HeroSection location={location} />

      {/* Areas section — single-column stack, everything left-aligned */}
      <section className="px-8 py-32 sm:px-12 md:px-16 md:py-44 lg:px-20 lg:py-52 xl:px-24">
        {/* Top row: eyebrow on the left, meta on the right */}
        <div className="flex flex-wrap items-center justify-between gap-y-4">
          <Eyebrow>Bereiche</Eyebrow>
          <span
            className="text-[11px] uppercase"
            style={{
              letterSpacing: '0.28em',
              color: 'rgba(255,255,255,0.5)',
              fontWeight: 500,
            }}
          >
            03 Abschnitte
          </span>
        </div>

        {/* Headline — left-aligned, spans wide */}
        <h2
          className="mt-14 max-w-[1180px] text-[40px] leading-[1.04] sm:text-[56px] md:text-[72px] lg:text-[84px]"
          style={{ fontWeight: 300, letterSpacing: '-0.02em' }}
        >
          Drei Bereiche, <span className="italic-accent">eine Bühne</span> für Ihre Marke
        </h2>

        {/* Intro paragraph — constrained width */}
        <p
          className="mt-10 max-w-[620px] text-[15px] leading-relaxed sm:text-[17px]"
          style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}
        >
          Wählen Sie einen Bereich, erkunden Sie die verfügbaren Branding-Module und stellen Sie
          daraus Ihre persönliche Anfrage zusammen.
        </p>

        {/* Rows — one area per row, image left, text right.
            - Desktop (md+): rows form a single block with hairlines closed on all sides;
              only bottom hairline between rows.
            - Mobile (< md): rows are visually separated with a small gap so the end of
              one card and the start of the next is easy to recognize. Each card gets
              its own full border. */}
        <div className="mt-24 flex flex-col gap-5 hairline md:mt-32 md:gap-0 md:border-x md:border-t">
          {areas.map((area, i) => (
            <div
              key={area.id}
              className="border hairline transition-colors duration-200 hover:bg-white/[0.05] md:border-x-0 md:border-t-0 md:border-b"
            >
              <AreaCard area={area} index={i + 1} locationSlug={location.slug} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
