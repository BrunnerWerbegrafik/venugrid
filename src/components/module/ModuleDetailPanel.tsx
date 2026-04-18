import { useEffect, useRef, useState } from 'react';
import { PlaceholderImage } from '../ui/PlaceholderImage';
import { CyanButton } from '../ui/CyanButton';
import { VariantSelector } from './VariantSelector';
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
  const [addState, setAddState] = useState<AddState>('idle');
  const { add } = useCart();
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setActiveVariantId(module.variants[0]?.id ?? '');
    setAddState('idle');
  }, [module.id]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

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
  const mainImage = activeVariant.images[0];
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
          {/* LEFT — Large main image column */}
          <div className="relative h-[320px] overflow-hidden border-b hairline md:h-auto md:border-b-0 md:border-r">
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
                className="absolute left-6 top-6 inline-flex items-center border px-3.5 py-1.5 text-[11px] uppercase sm:left-10 sm:top-10"
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
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
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
    </div>
  );
}
