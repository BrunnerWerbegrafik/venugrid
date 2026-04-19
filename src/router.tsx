import { Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CartProvider } from './context/CartContext';
import { TopNav } from './components/layout/TopNav';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { LocationHomePage } from './pages/LocationHomePage';
import { AreaPage } from './pages/AreaPage';
import { CartPage } from './pages/CartPage';
import { RequestFormPage } from './pages/RequestFormPage';
import { RequestSuccessPage } from './pages/RequestSuccessPage';
import { locationService } from './services/locationService';
import type { Location } from './types';

const DEFAULT_LOCATION_SLUG = 'kesselhaus-kolbermoor';

/**
 * Layout for all /l/:slug/... routes. Loads location data once and wraps
 * everything in the per-location CartProvider.
 */
function LocationLayout() {
  const { slug = '' } = useParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    locationService.getBySlug(slug).then((loc) => {
      if (cancelled) return;
      setLocation(loc);
      setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!loaded) {
    return <div className="px-6 py-20 text-center text-white/40">Lade …</div>;
  }

  if (!location) {
    return (
      <div className="px-6 py-20 text-center text-white/60">
        Location nicht gefunden.
      </div>
    );
  }

  return (
    <CartProvider locationSlug={slug}>
      <div className="flex min-h-screen flex-col">
        <TopNav locationName={location.name} locationSlug={location.slug} />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <CartDrawer />
    </CartProvider>
  );
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/l/${DEFAULT_LOCATION_SLUG}`} replace />} />
      <Route path="/l/:slug" element={<LocationLayout />}>
        <Route index element={<LocationHomePage />} />
        <Route path="bereich/:areaId" element={<AreaPage />} />
        <Route path="warenkorb" element={<CartPage />} />
        <Route path="anfrage" element={<RequestFormPage />} />
        <Route path="anfrage/erfolg" element={<RequestSuccessPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
