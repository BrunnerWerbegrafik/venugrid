import { useNavigate, useParams } from 'react-router-dom';
import { OutlineButton } from '../components/ui/OutlineButton';

export function RequestSuccessPage() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center px-8 py-32 text-center sm:px-12 md:px-16 md:py-40 lg:px-20 xl:px-24">
      <div
        className="flex h-[64px] w-[64px] items-center justify-center rounded-full"
        style={{ border: '1.5px solid #1fb3da' }}
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
          <path
            d="M5 13.5L10.5 19L21 7"
            stroke="#1fb3da"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2
        className="mt-12 text-[34px] sm:text-[44px] md:text-[56px]"
        style={{ fontWeight: 300, letterSpacing: '-0.02em' }}
      >
        Vielen <span className="italic-accent">Dank</span>
      </h2>
      <p
        className="mt-6 max-w-[460px] text-[15px] leading-relaxed sm:text-[16px]"
        style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}
      >
        Wir haben Ihre Anfrage erhalten und melden uns innerhalb weniger Werktage persönlich bei
        Ihnen.
      </p>

      <OutlineButton
        className="mt-14"
        onClick={() => navigate(`/l/${slug}`)}
        trailing="→"
      >
        Zurück zur Location
      </OutlineButton>
    </section>
  );
}
