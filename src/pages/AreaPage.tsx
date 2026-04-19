import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { Eyebrow } from '../components/ui/Eyebrow';
import { ModuleCard } from '../components/module/ModuleCard';
import { ModuleDetailPanel } from '../components/module/ModuleDetailPanel';
import { areaService } from '../services/areaService';
import { locationService } from '../services/locationService';
import { moduleService } from '../services/moduleService';
import type { Area, Location, Module } from '../types';

export function AreaPage() {
  const { slug = '', areaId = '' } = useParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [area, setArea] = useState<Area | null>(null);
  const [areas, setAreas] = useState<Area[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState<Module | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      const loc = await locationService.getBySlug(slug);
      if (cancelled) return;
      setLocation(loc);
      if (!loc) {
        setLoading(false);
        return;
      }
      const [allAreas, thisArea] = await Promise.all([
        areaService.getByLocationId(loc.id),
        areaService.getById(areaId),
      ]);
      if (cancelled) return;
      setAreas(allAreas);
      setArea(thisArea);
      if (thisArea) {
        const mods = await moduleService.getByAreaId(thisArea.id);
        if (!cancelled) setModules(mods);
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, areaId]);

  if (loading) {
    return <div className="px-6 py-20 text-center text-white/40">Lade …</div>;
  }

  if (!location || !area) {
    return (
      <div className="px-6 py-20 text-center text-white/60">
        Bereich nicht gefunden.
      </div>
    );
  }

  const areaIndex = areas.findIndex((a) => a.id === area.id) + 1;
  const indexLabel = String(areaIndex).padStart(2, '0');

  // Split area name: last half gets a subtle light-gray accent (e.g. "Außen" + "bereich")
  const splitIdx = Math.max(1, Math.floor(area.name.length / 2));
  const leadPart = area.name.slice(0, splitIdx);
  const accentPart = area.name.slice(splitIdx);

  return (
    <>
      <section className="px-8 pt-14 sm:px-12 md:px-16 lg:px-20 xl:px-24">
        <Breadcrumb
          segments={[
            { label: 'Kesselhaus', to: `/l/${location.slug}` },
            { label: area.name },
          ]}
        />
      </section>

      <section className="px-8 py-24 sm:px-12 md:px-16 md:py-36 lg:px-20 lg:py-44 xl:px-24">
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-y-4">
          <Eyebrow>Bereich {indexLabel}</Eyebrow>
          <span
            className="text-[11px] uppercase"
            style={{
              letterSpacing: '0.28em',
              color: 'rgba(255,255,255,0.5)',
              fontWeight: 500,
            }}
          >
            {modules.length.toString().padStart(2, '0')} Module
          </span>
        </div>

        {/* Headline */}
        <h2
          className="mt-14 max-w-[1180px] text-[40px] leading-[1.04] sm:text-[56px] md:text-[72px] lg:text-[84px]"
          style={{ fontWeight: 300, letterSpacing: '-0.02em' }}
        >
          {leadPart}
          <span className="italic-accent">{accentPart}</span>
        </h2>

        {/* Intro */}
        <p
          className="mt-10 max-w-[620px] text-[15px] leading-relaxed sm:text-[17px]"
          style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}
        >
          {area.description}
        </p>

        {/* Module grid — max 3 columns, wraps to new row beyond 3 items */}
        <div className="mt-24 grid grid-cols-1 border-t border-l hairline sm:grid-cols-2 md:mt-32 lg:grid-cols-3">
          {modules.map((m, i) => (
            <div key={m.id} className="border-b border-r hairline">
              <ModuleCard module={m} onOpen={setActiveModule} index={i + 1} />
            </div>
          ))}
        </div>
      </section>

      {activeModule && (
        <ModuleDetailPanel
          module={activeModule}
          area={area}
          areaIndex={areaIndex}
          open={Boolean(activeModule)}
          onClose={() => setActiveModule(null)}
        />
      )}
    </>
  );
}
