import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PlaceholderImage } from '../ui/PlaceholderImage';
import { CyanButton } from '../ui/CyanButton';
import { OutlineButton } from '../ui/OutlineButton';
import { useCart } from '../../context/CartContext';

/**
 * Slide-in mini cart that appears from the right when an item is added.
 * Shows a compact list of all items, the most recently added one gets a
 * subtle highlighted background.
 *
 * Closed by: X button, Escape key, click on backdrop.
 */
export function CartDrawer() {
  const { slug = '' } = useParams();
  const { items, drawerOpen, closeDrawer, remove, recentlyAddedId, count } = useCart();

  // Escape to close
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen, closeDrawer]);

  if (!drawerOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      {/* Backdrop — slightly lighter than the module panel overlay so the
          module detail remains visible through it while the drawer is open. */}
      <button
        aria-label="Warenkorb schließen"
        onClick={closeDrawer}
        className="overlay-enter absolute inset-0 cursor-default"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
        }}
      />

      {/* Drawer panel */}
      <aside
        className="panel-enter absolute right-0 top-0 flex h-full w-[92vw] max-w-[440px] flex-col border-l hairline bg-[#0a0a0a] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b hairline px-7 py-6">
          <div className="flex flex-col gap-1">
            <span
              className="text-[10px] uppercase"
              style={{
                letterSpacing: '0.28em',
                color: 'rgba(255,255,255,0.55)',
                fontWeight: 500,
              }}
            >
              Zum Anfragekorb
            </span>
            <h3
              id="cart-drawer-title"
              className="text-[20px]"
              style={{ fontWeight: 300, letterSpacing: '-0.01em' }}
            >
              hinzugefügt
            </h3>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Schließen"
            className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-[#1fb3da] hover:text-[#1fb3da]"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="px-7 py-12 text-center">
              <p
                className="text-[14px]"
                style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}
              >
                Ihr Anfragekorb ist noch leer.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col">
              {items.map((entry) => {
                const isHighlighted = entry.id === recentlyAddedId;
                return (
                  <li
                    key={entry.id}
                    className="relative border-b hairline transition-colors duration-500"
                    style={{
                      backgroundColor: isHighlighted
                        ? 'rgba(31, 179, 218, 0.14)'
                        : 'transparent',
                    }}
                  >
                    {/* Cyan accent stripe on the recently added item */}
                    {isHighlighted && (
                      <span
                        aria-hidden
                        className="absolute left-0 top-0 h-full w-[3px]"
                        style={{ backgroundColor: '#1fb3da' }}
                      />
                    )}
                    <div className="flex items-center gap-4 px-7 py-4">
                      <PlaceholderImage
                        src={entry.thumbnailUrl}
                        alt={entry.thumbnailAlt}
                        placeholderGradient={entry.thumbnailGradient}
                        className="h-[64px] w-[64px] shrink-0"
                      />
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <span
                          className="text-[10px] uppercase"
                          style={{
                            letterSpacing: '0.22em',
                            color: 'rgba(255,255,255,0.5)',
                            fontWeight: 500,
                          }}
                        >
                          {entry.areaName}
                        </span>
                        <span
                          className="truncate text-[15px]"
                          style={{ fontWeight: 300 }}
                        >
                          {entry.moduleName}
                        </span>
                        {entry.variantName && (
                          <span
                            className="mt-1 inline-flex w-max items-center border px-2 py-0.5 text-[10px] uppercase"
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
                        onClick={() => remove(entry.id)}
                        aria-label="Entfernen"
                        className="shrink-0 text-white/45 transition-colors hover:text-red-400"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            d="M1.5 1.5L12.5 12.5M12.5 1.5L1.5 12.5"
                            stroke="currentColor"
                            strokeWidth="1"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer CTAs */}
        {items.length > 0 && (
          <div className="flex flex-col gap-3 border-t hairline px-7 py-6">
            <div className="mb-1 flex items-center justify-between">
              <span
                className="text-[10px] uppercase"
                style={{
                  letterSpacing: '0.28em',
                  color: 'rgba(255,255,255,0.55)',
                  fontWeight: 500,
                }}
              >
                Module im Korb
              </span>
              <span
                className="text-[14px]"
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 400,
                }}
              >
                {count}
              </span>
            </div>
            <Link to={`/l/${slug}/anfrage`} onClick={closeDrawer}>
              <CyanButton fullWidth trailing="→">
                Anfrage stellen
              </CyanButton>
            </Link>
            <Link to={`/l/${slug}/warenkorb`} onClick={closeDrawer}>
              <OutlineButton className="w-full justify-center">
                Anfragekorb öffnen
              </OutlineButton>
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
