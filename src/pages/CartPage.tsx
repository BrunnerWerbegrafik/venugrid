import { Link, useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { Eyebrow } from '../components/ui/Eyebrow';
import { CartItem } from '../components/cart/CartItem';
import { CyanButton } from '../components/ui/CyanButton';
import { useCart } from '../context/CartContext';

export function CartPage() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const { items, remove } = useCart();

  const isEmpty = items.length === 0;

  return (
    <section className="px-8 pb-36 pt-14 sm:px-12 md:px-16 md:pb-44 lg:px-20 xl:px-24">
      <Breadcrumb
        segments={[
          { label: 'Kesselhaus', to: `/l/${slug}` },
          { label: 'Anfragekorb' },
        ]}
      />

      <div className="mt-16">
        <Eyebrow className="mb-10">Anfrage</Eyebrow>
        <h2
          className="text-[40px] leading-[1.04] sm:text-[56px] md:text-[72px] lg:text-[84px]"
          style={{ fontWeight: 300, letterSpacing: '-0.02em' }}
        >
          Ihr <span className="italic-accent">Anfragekorb</span>
        </h2>
      </div>

      <div className="mt-14 max-w-[960px]">
        {isEmpty ? (
          <div className="border hairline px-10 py-20 text-center">
            <p
              className="text-[15px]"
              style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}
            >
              Ihr Anfragekorb ist aktuell leer.
            </p>
            <Link
              to={`/l/${slug}`}
              className="mt-6 inline-flex text-[12px] uppercase text-white/70 transition-colors hover:text-[#1fb3da]"
              style={{ letterSpacing: '0.28em', fontWeight: 500 }}
            >
              Zurück zur Location →
            </Link>
          </div>
        ) : (
          <>
            <div className="border-t hairline">
              {items.map((entry) => (
                <CartItem key={entry.id} entry={entry} onRemove={remove} />
              ))}
            </div>

            <div className="mt-12 flex justify-end">
              <CyanButton
                onClick={() => navigate(`/l/${slug}/anfrage`)}
                trailing="→"
              >
                Anfrage stellen
              </CyanButton>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
