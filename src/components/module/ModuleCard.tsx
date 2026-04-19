import { PlaceholderImage } from '../ui/PlaceholderImage';
import type { Module } from '../../types';

interface Props {
  module: Module;
  onOpen: (module: Module) => void;
  index?: number; // optional 1-based index for chapter label
}

/**
 * Vertical card for a module — same visual rhythm as the original area
 * tiles (chapter number, title, arrow, spec bullets below). Image uses
 * a fixed 16:10 aspect ratio with object-cover so all tiles align.
 */
export function ModuleCard({ module, onOpen, index }: Props) {
  const hasVariants = module.variants.length > 1;
  const previewVariant = module.variants[0];
  const previewImage = previewVariant?.images[0];
  const num = typeof index === 'number' ? String(index).padStart(2, '0') : null;

  return (
    <button
      type="button"
      onClick={() => onOpen(module)}
      className="arrow-link group flex h-full flex-col text-left transition-colors duration-200 hover:bg-white/[0.025]"
    >
      {/* Image — fixed 16:10 aspect ratio */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 10' }}>
        <PlaceholderImage
          src={previewImage?.url ?? ''}
          alt={previewImage?.alt ?? module.name}
          placeholderGradient={
            previewImage?.placeholderGradient ??
            'linear-gradient(135deg, #1a2228 0%, #0a0e12 100%)'
          }
          fallbackLabel={module.name.toUpperCase()}
          className="absolute inset-0 h-full w-full"
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

      {/* Text block */}
      <div className="flex flex-1 flex-col gap-5 px-7 py-8">
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
              className="h-px w-8"
              style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
            />
          </div>
        )}

        <div className="flex items-start justify-between gap-4">
          <h3
            className="text-[22px] leading-tight sm:text-[24px]"
            style={{ fontWeight: 300, letterSpacing: '-0.015em' }}
          >
            {module.name}
          </h3>
          <span
            aria-hidden
            className="arrow mt-1 shrink-0 text-white/55"
            style={{ fontSize: 20 }}
          >
            →
          </span>
        </div>

        {/* Specifications as bullet list */}
        {module.specifications.length > 0 && (
          <ul className="mt-1 flex flex-col gap-2">
            {module.specifications.map((spec) => (
              <li
                key={spec.label}
                className="flex items-start gap-3 text-[13px] leading-relaxed sm:text-[14px]"
                style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}
              >
                <span
                  aria-hidden
                  className="mt-[9px] inline-block h-[3px] w-[3px] shrink-0 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
                />
                <span>
                  <span
                    className="text-[10px] uppercase"
                    style={{
                      letterSpacing: '0.22em',
                      color: 'rgba(255,255,255,0.45)',
                      fontWeight: 500,
                    }}
                  >
                    {spec.label}:
                  </span>{' '}
                  {spec.value}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </button>
  );
}
