import { PlaceholderImage } from '../ui/PlaceholderImage';
import type { Module } from '../../types';

interface Props {
  module: Module;
  onOpen: (module: Module) => void;
  index?: number; // optional 1-based index for chapter label
}

export function ModuleCard({ module, onOpen, index }: Props) {
  const hasVariants = module.variants.length > 1;
  const previewVariant = module.variants[0];
  const previewImage = previewVariant?.images[0];
  const num =
    typeof index === 'number' ? String(index).padStart(2, '0') : null;

  return (
    <button
      type="button"
      onClick={() => onOpen(module)}
      className="arrow-link group flex h-full flex-col text-left transition-colors duration-200 hover:bg-white/[0.025]"
    >
      <div className="relative">
        <PlaceholderImage
          src={previewImage?.url ?? ''}
          alt={previewImage?.alt ?? module.name}
          placeholderGradient={
            previewImage?.placeholderGradient ??
            'linear-gradient(135deg, #1a2228 0%, #0a0e12 100%)'
          }
          fallbackLabel={module.name.toUpperCase()}
          className="h-[220px] w-full sm:h-[260px] lg:h-[300px]"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,0.05) 0%, rgba(10,10,10,0.55) 100%)',
          }}
        />
        {hasVariants && (
          <span
            className="absolute right-4 top-4 inline-flex items-center border px-2.5 py-1 text-[10px] uppercase"
            style={{
              borderColor: 'rgba(255,255,255,0.35)',
              color: 'rgba(255,255,255,0.85)',
              backgroundColor: 'rgba(10,10,10,0.65)',
              letterSpacing: '0.22em',
              fontWeight: 500,
              backdropFilter: 'blur(8px)',
            }}
          >
            {module.variants.length} Varianten
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-6 py-7">
        {num && (
          <div className="flex items-center gap-3">
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
              className="h-px w-6"
              style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
            />
          </div>
        )}

        <div className="flex items-start justify-between gap-4">
          <h3
            className="text-[18px] leading-tight sm:text-[20px]"
            style={{ fontWeight: 300, letterSpacing: '-0.015em' }}
          >
            {module.name}
          </h3>
          <span
            aria-hidden
            className="arrow shrink-0 text-white/55"
            style={{ fontSize: 18 }}
          >
            →
          </span>
        </div>

        <p
          className="mt-1 text-[10px] uppercase"
          style={{
            letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.5)',
            fontWeight: 500,
          }}
        >
          {hasVariants
            ? `${module.variants.length} Varianten verfügbar`
            : 'Einzelmodul'}
        </p>
      </div>
    </button>
  );
}
