import { useEffect, useRef, useState } from 'react';
import { PlaceholderImage } from '../ui/PlaceholderImage';
import { CyanButton } from '../ui/CyanButton';
import { VariantSelector } from './VariantSelector';
import { ImageLightbox } from './ImageLightbox';
import { useCart } from '../../context/CartContext';
import type { Area, Module } from '../../types';

interface Props {
  module: Module;
  area: Area;
  areaIndex: number; // 1-based
  open: boolean;
  onClose: () => void;
}

type AddState = 'idle' | 'added';

/**
 * Product-detail-style modal for a module.
 *  - Full-screen (minus small margin on desktop) with a 2-column layout:
 *    large hero image on the left, all details on the right.
 *  - On mobile it stacks: image on top, content below.
 *  - Variants are rendered as large, labelled tiles.
 */
export function ModuleDetailPanel({
  module,
  area,
  areaIndex,
  open,
  onClose,
}: Props) {
  const [activeVariantId, setActiveVariantId] = useState<string>(
    module.variants[0]?.id ?? ''
  );
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [addState, setAddState] = useState<AddState>('idle');
  const { add, drawerOpen } = useCart();
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setActiveVariantId(module.variants[0]?.id ?? '');
    setActiveImageIdx(0);
    setLightboxOpen(false);
    setAddState('idle');
  }, [module.id]);

  // Reset image index when variant changes
  useEffect(() => {
    setActiveImageIdx(0);
  }, [activeVariantId]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      // If the cart drawer or lightbox is on top, let them handle Escape first.
      if (drawerOpen || lightboxOpen) return;
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, drawerOpen, lightboxOpen]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  const activeVariant =
    module.variants.find((v) => v.id === activeVariantId) ?? module.variants[0];
  const variantImages = activeVariant.images;
  const safeImageIdx = Math.min(activeImageIdx, Math.max(0, variantImages.length - 1));
  const mainImage = variantImages[safeImageIdx] ?? variantImages[0];
  const hasManyImages = variantImages.length > 1;
  const hasVariants = module.variants.length > 1;
  const areaLabel = `Bereich ${String(areaIndex).padStart(2, '0')} · ${area.name}`;

  const handleAdd = () => {
    add({
      moduleId: module.id,
      moduleName: module.name,
      moduleSlug: module.slug,
      areaId: area.id,
      areaName: area.name,
      variantId: hasVariants ? activeVariant.id : null,
      variantName: hasVariants ? activeVariant.name : null,
      thumbnailUrl: mainImage?.url ?? '',
      thumbnailGradient:
        mainImage?.placeholderGradient ??
        'linear-gradient(135deg, #1a2228 0%, #0a0e12 100%)',
      thumbnailAlt: mainImage?.alt ?? module.name,
    });
    setAddState('added');
    window.setTimeout(() => setAddState('idle'), 1400);
  };

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="module-panel-title"
    >
      {/* Backdrop overlay — click to close */}
      <button
        aria-label="Panel schließen"
        onClick={onClose}
        className="overlay-enter absolute inset-0 cursor-default"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.82)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />

      {/* Panel container — small outer padding so the panel feels like a
          full-screen modal with breathing room on large monitors */}
      <div className="panel-enter absolute inset-0 flex p-0 md:p-6 lg:p-10">
        <div
          ref={panelRef}
          tabIndex={-1}
          className="relative flex h-full w-full flex-col overflow-hidden border hairline bg-[#0a0a0a] md:grid md:grid-cols-[1.1fr_520px] md:grid-rows-1 lg:grid-cols-[1.2fr_620px] xl:grid-cols-[1.3fr_720px]"
        >
          {/* LEFT — Image column: 4:3 main image with fullscreen button + optional thumbnails */}
          <div className="flex flex-col gap-6 overflow-y-auto border-b hairline p-6 sm:p-8 md:border-b-0 md:border-r md:p-10 lg:p-12">
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
              <PlaceholderImage
                src={mainImage?.url ?? ''}
                alt={mainImage?.alt ?? module.name}
                placeholderGradient={
                  mainImage?.placeholderGradient ??
                  'linear-gradient(135deg, #1a2228 0%, #0a0e12 100%)'
                }
                fallbackLabel={
                  hasVariants
                    ? `${module.name.toUpperCase()} – ${activeVariant.name.toUpperCase()}`
                    : module.name.toUpperCase()
                }
                className="absolute inset-0 h-full w-full"
              />
              {hasVariants && (
                <span
                  className="absolute left-4 top-4 inline-flex items-center border px-3 py-1.5 text-[10px] uppercase sm:left-5 sm:top-5 sm:text-[11px]"
                  style={{
                    borderColor: 'rgba(255,255,255,0.35)',
                    color: 'rgba(255,255,255,0.95)',
                    backgroundColor: 'rgba(10,10,10,0.7)',
                    letterSpacing: '0.28em',
                    fontWeight: 500,
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  {activeVariant.name}
                </span>
              )}
              {/* Fullscreen toggle */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label="Vollbild öffnen"
                className="absolute right-4 top-4 inline-flex h-[36px] w-[36px] items-center justify-center border text-white/85 transition-colors hover:border-[#1fb3da] hover:text-[#1fb3da] sm:right-5 sm:top-5"
                style={{
                  borderColor: 'rgba(255,255,255,0.3)',
                  backgroundColor: 'rgba(10,10,10,0.65)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M1 5V1H5M13 5V1H9M1 9V13H5M13 9V13H9"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="square"
                  />
                </svg>
              </button>
            </div>

            {/* Thumbnails — only shown when variant has more than one image */}
            {hasManyImages && (
              <div className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between">
                  <span
                    className="text-[10px] uppercase"
                    style={{
                      letterSpacing: '0.28em',
                      color: 'rgba(255,255,255,0.55)',
                      fontWeight: 500,
                    }}
                  >
                    Bilder
                  </span>
                  <span
                    className="text-[10px] uppercase"
                    style={{
                      letterSpacing: '0.28em',
                      color: 'rgba(255,255,255,0.45)',
                      fontWeight: 500,
                    }}
                  >
                    {String(safeImageIdx + 1).padStart(2, '0')} / {String(variantImages.length).padStart(2, '0')}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5">
                  {variantImages.map((img, i) => {
                    const active = i === safeImageIdx;
                    return (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => setActiveImageIdx(i)}
                        aria-label={`Bild ${i + 1} anzeigen`}
                        aria-pressed={active}
                        className="relative overflow-hidden"
                        style={{
                          aspectRatio: '4 / 3',
                          border: active
                            ? '1.5px solid #1fb3da'
                            : '1px solid rgba(255,255,255,0.14)',
                        }}
                      >
                        <PlaceholderImage
                          src={img.url}
                          alt={img.alt}
                          placeholderGradient={img.placeholderGradient}
                          className="h-full w-full"
                        />
                        {!active && (
                          <div
                            aria-hidden
                            className="absolute inset-0"
                            style={{ backgroundColor: 'rgba(10,10,10,0.3)' }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Content column */}
          <div className="flex flex-col md:h-full">
            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-8 py-10 sm:px-10 sm:py-12 md:px-12 md:py-14">
              {/* Header */}
              <div className="flex items-start justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <span
                    className="text-[11px] uppercase"
                    style={{
                      letterSpacing: '0.28em',
                      color: 'rgba(255,255,255,0.6)',
                      fontWeight: 500,
                    }}
                  >
                    {areaLabel}
                  </span>
                  <h3
                    id="module-panel-title"
                    className="text-[30px] leading-[1.04] sm:text-[36px] lg:text-[44px]"
                    style={{ fontWeight: 300, letterSpacing: '-0.02em' }}
                  >
                    {module.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Schließen"
                  className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center border border-white/25 text-white/70 transition-colors hover:border-[#1fb3da] hover:text-[#1fb3da]"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M1 1L11 11M11 1L1 11"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </button>
              </div>

              {/* Variants */}
              {hasVariants && (
                <div className="mt-12">
                  <VariantSelector
                    variants={module.variants}
                    activeVariantId={activeVariantId}
                    onSelect={setActiveVariantId}
                  />
                </div>
              )}

              {/* Description */}
              <p
                className="mt-12 text-[15px] leading-[1.7] sm:text-[16px]"
                style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}
              >
                {module.longDescription}
              </p>

              {/* Specs */}
              <div
                className="mt-12 grid grid-cols-3 gap-0 border-y hairline"
                style={{ borderColor: 'rgba(255,255,255,0.14)' }}
              >
                {module.specifications.map((spec) => (
                  <div key={spec.label} className="flex flex-col gap-2 py-6 pr-4">
                    <span
                      className="text-[10px] uppercase"
                      style={{
                        letterSpacing: '0.28em',
                        color: 'rgba(255,255,255,0.5)',
                        fontWeight: 500,
                      }}
                    >
                      {spec.label}
                    </span>
                    <span
                      className="text-[15px]"
                      style={{ fontWeight: 300 }}
                    >
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky footer CTA */}
            <div className="border-t hairline px-8 py-6 sm:px-10 md:px-12">
              <CyanButton
                onClick={handleAdd}
                fullWidth
                variant={addState === 'added' ? 'confirmed' : 'solid'}
                trailing={addState === 'added' ? '✓' : '+'}
              >
                {addState === 'added' ? 'Hinzugefügt' : 'Zur Anfrage hinzufügen'}
              </CyanButton>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen image lightbox */}
      <ImageLightbox
        images={variantImages}
        activeIndex={safeImageIdx}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setActiveImageIdx((i) =>
            (i - 1 + variantImages.length) % variantImages.length
          )
        }
        onNext={() =>
          setActiveImageIdx((i) => (i + 1) % variantImages.length)
        }
      />
    </div>
  );
}
