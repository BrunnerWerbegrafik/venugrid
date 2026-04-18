import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

interface Props {
  locationName: string;
  locationSlug: string;
}

export function TopNav({ locationName, locationSlug }: Props) {
  const { count } = useCart();

  return (
    <header
      className="sticky top-0 z-30 border-b hairline"
      style={{
        backgroundColor: 'rgba(10, 10, 10, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center justify-between px-8 py-5 sm:px-12 md:px-16 lg:px-20 xl:px-24">
        <Link to={`/l/${locationSlug}`} className="flex items-baseline gap-4">
          <span
            className="inline-flex items-center text-[14px]"
            style={{ fontWeight: 500, letterSpacing: '0.28em' }}
          >
            <span>VENU</span>
            <span
              aria-hidden
              className="mx-[0.35em] inline-block h-[6px] w-[6px] rounded-full"
              style={{ backgroundColor: '#1fb3da' }}
            />
            <span>GRID</span>
          </span>
          <span
            aria-hidden
            className="hidden h-3 w-px bg-white/15 sm:inline-block"
          />
          <span
            className="hidden text-[11px] uppercase text-white/55 sm:inline"
            style={{ letterSpacing: '0.22em', fontWeight: 500 }}
          >
            {locationName}
          </span>
        </Link>

        <Link
          to={`/l/${locationSlug}/warenkorb`}
          className="group inline-flex items-center gap-3 border border-white/15 px-5 py-2.5 text-[11px] uppercase transition-colors duration-150 hover:border-[#1fb3da] hover:text-[#1fb3da]"
          style={{ letterSpacing: '0.22em', fontWeight: 500 }}
        >
          <span>Anfragekorb</span>
          {count > 0 && (
            <span
              className="inline-flex h-5 min-w-[20px] items-center justify-center px-1 text-[11px]"
              style={{
                backgroundColor: '#1fb3da',
                color: '#000',
                fontWeight: 600,
                letterSpacing: 0,
              }}
            >
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
