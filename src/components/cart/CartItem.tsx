import { PlaceholderImage } from '../ui/PlaceholderImage';
import type { CartEntry } from '../../context/CartContext';

interface Props {
  entry: CartEntry;
  onRemove: (id: string) => void;
}

export function CartItem({ entry, onRemove }: Props) {
  return (
    <div className="flex items-center gap-5 border-b hairline py-5">
      <PlaceholderImage
        src={entry.thumbnailUrl}
        alt={entry.thumbnailAlt}
        placeholderGradient={entry.thumbnailGradient}
        className="h-[68px] w-[68px] shrink-0"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span
          className="text-[10px] uppercase"
          style={{
            letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          {entry.areaName}
        </span>
        <h4
          className="truncate text-[17px]"
          style={{ fontWeight: 300 }}
        >
          {entry.moduleName}
        </h4>
        {entry.variantName && (
          <span
            className="mt-1 inline-flex w-max items-center border px-2 py-1 text-[10px] uppercase"
            style={{
              borderColor: 'rgba(255,255,255,0.3)',
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '0.22em',
              fontWeight: 500,
            }}
          >
            {entry.variantName}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => onRemove(entry.id)}
        className="shrink-0 text-[12px] uppercase text-white/50 transition-colors hover:text-red-400"
        style={{ letterSpacing: '0.18em' }}
      >
        Entfernen
      </button>
    </div>
  );
}
