import { useEffect } from 'react';
import { PlaceholderImage } from '../ui/PlaceholderImage';
import type { ImageAsset } from '../../types';

interface Props {
  images: ImageAsset[];
  activeIndex: number;
  open: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Full-screen lightbox for inspecting module images at their full size.
 * Supports:
 *  - Escape / overlay click / X button to close
 *  - ← → arrow keys to cycle through images (if more than one)
 */
export function ImageLightbox({
  images,
  activeIndex,
  open,
  onClose,
  onPrev,
  onNext,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft' && images.length > 1) onPrev();
      else if (e.key === 'ArrowRight' && images.length > 1) onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, onPrev, onNext, images.length]);

  if (!open) return null;

  const current = images[activeIndex];
  if (!current) return null;
  const hasMany = images.length > 1;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Bildvorschau"
    >
      {/* Backdrop */}
      <button
        aria-label="Vorschau schließen"
        onClick={onClose}
        className="overlay-enter absolute inset-0 cursor-default"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Schließen"
        className="absolute right-6 top-6 z-[71] inline-flex h-[38px] w-[38px] items-center justify-center border border-white/25 text-white/80 transition-colors hover:border-[#1fb3da] hover:text-[#1fb3da]"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M1.5 1.5L12.5 12.5M12.5 1.5L1.5 12.5"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </button>

      {/* Prev arrow */}
      {hasMany && (
        <button
          type="button"
          onClick={onPrev}
          aria-label="Vorheriges Bild"
          className="absolute left-6 top-1/2 z-[71] inline-flex h-[44px] w-[44px] -translate-y-1/2 items-center justify-center border border-white/25 text-white/80 transition-colors hover:border-[#1fb3da] hover:text-[#1fb3da]"
        >
          <span aria-hidden style={{ fontSize: 20 }}>
            ←
          </span>
        </button>
      )}

      {/* Image */}
      <div className="relative z-[70] flex h-full max-h-[90vh] w-full max-w-[90vw] items-center justify-center px-8">
        <PlaceholderImage
          src={current.url}
          alt={current.alt}
          placeholderGradient={current.placeholderGradient}
          className="h-full w-full"
          imgClassName="object-contain"
        />
      </div>

      {/* Next arrow */}
      {hasMany && (
        <button
          type="button"
          onClick={onNext}
          aria-label="Nächstes Bild"
          className="absolute right-6 top-1/2 z-[71] inline-flex h-[44px] w-[44px] -translate-y-1/2 items-center justify-center border border-white/25 text-white/80 transition-colors hover:border-[#1fb3da] hover:text-[#1fb3da]"
        >
          <span aria-hidden style={{ fontSize: 20 }}>
            →
          </span>
        </button>
      )}

      {/* Position indicator */}
      {hasMany && (
        <div
          className="absolute bottom-8 left-1/2 z-[71] -translate-x-1/2 text-[11px] uppercase"
          style={{
            letterSpacing: '0.28em',
            color: 'rgba(255,255,255,0.7)',
            fontWeight: 500,
          }}
        >
          {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </div>
      )}
    </div>
  );
}
