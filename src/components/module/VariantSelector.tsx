import { PlaceholderImage } from '../ui/PlaceholderImage';
import type { ModuleVariant } from '../../types';

interface Props {
  variants: ModuleVariant[];
  activeVariantId: string;
  onSelect: (variantId: string) => void;
}

/**
 * Large, labelled variant tiles — like a product detail page's swatch
 * picker. Each tile shows the variant image plus its name as an
 * uppercase label below.
 */
export function VariantSelector({ variants, activeVariantId, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-baseline justify-between">
        <span
          className="text-[10px] uppercase"
          style={{
            letterSpacing: '0.28em',
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 500,
          }}
        >
          Varianten
        </span>
        <span
          className="text-[10px] uppercase"
          style={{
            letterSpacing: '0.28em',
            color: 'rgba(255,255,255,0.45)',
            fontWeight: 500,
          }}
        >
          {variants.length.toString().padStart(2, '0')} verfügbar
        </span>
      </div>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${Math.min(variants.length, 3)}, minmax(0, 1fr))`,
        }}
      >
        {variants.map((v) => {
          const img = v.images[0];
          const active = v.id === activeVariantId;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelect(v.id)}
              className="group flex flex-col gap-3 text-left transition-opacity duration-150"
              aria-label={`${v.name} auswählen`}
              aria-pressed={active}
            >
              <div
                className="relative h-[140px] overflow-hidden transition-[border-color,border-width] sm:h-[160px] lg:h-[180px]"
                style={{
                  border: active
                    ? '1.5px solid #1fb3da'
                    : '1px solid rgba(255,255,255,0.14)',
                }}
              >
                <PlaceholderImage
                  src={img?.url ?? ''}
                  alt={img?.alt ?? v.name}
                  placeholderGradient={
                    img?.placeholderGradient ??
                    'linear-gradient(135deg, #1a2228 0%, #0a0e12 100%)'
                  }
                  className="h-full w-full"
                />
                {!active && (
                  <div
                    aria-hidden
                    className="absolute inset-0 transition-colors duration-150 group-hover:bg-black/10"
                    style={{ backgroundColor: 'rgba(10,10,10,0.3)' }}
                  />
                )}
              </div>
              <span
                className="text-[10px] uppercase sm:text-[11px]"
                style={{
                  letterSpacing: '0.28em',
                  color: active
                    ? 'rgba(255,255,255,0.95)'
                    : 'rgba(255,255,255,0.5)',
                  fontWeight: 500,
                }}
              >
                {v.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
