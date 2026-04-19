import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export interface CartEntry {
  id: string; // uid for the cart line (moduleId[:variantId])
  moduleId: string;
  moduleName: string;
  moduleSlug: string;
  areaId: string;
  areaName: string;
  variantId: string | null;
  variantName: string | null;
  thumbnailUrl: string;
  thumbnailGradient: string;
  thumbnailAlt: string;
  quantity: number;
  addedAt: string;
}

interface CartContextValue {
  items: CartEntry[];
  count: number;
  add: (entry: Omit<CartEntry, 'id' | 'addedAt' | 'quantity'>) => void;
  remove: (id: string) => void;
  clear: () => void;
  // UI state: mini-cart drawer
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  // id of the most recently added cart line — used to visually highlight it
  recentlyAddedId: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);

const storageKey = (slug: string) => `venugrid_cart_${slug}`;

interface ProviderProps {
  locationSlug: string;
  children: ReactNode;
}

export function CartProvider({ locationSlug, children }: ProviderProps) {
  const [items, setItems] = useState<CartEntry[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(storageKey(locationSlug));
      if (!raw) return [];
      const parsed = JSON.parse(raw) as CartEntry[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Reload items when slug changes
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey(locationSlug));
      setItems(raw ? (JSON.parse(raw) as CartEntry[]) : []);
    } catch {
      setItems([]);
    }
  }, [locationSlug]);

  // Persist on change
  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey(locationSlug), JSON.stringify(items));
    } catch {
      // ignore quota errors
    }
  }, [items, locationSlug]);

  const add = useCallback<CartContextValue['add']>((entry) => {
    const id = entry.variantId ? `${entry.moduleId}:${entry.variantId}` : entry.moduleId;
    setItems((prev) => {
      // Same module + variant already in the cart → do not duplicate the entry.
      // The UI has no quantity stepper in stage 1, so adding again is a no-op
      // (the drawer still opens and the highlight still re-triggers below).
      if (prev.some((p) => p.id === id)) return prev;
      return [
        ...prev,
        {
          ...entry,
          id,
          quantity: 1,
          addedAt: new Date().toISOString(),
        },
      ];
    });
    setRecentlyAddedId(id);
    setDrawerOpen(true);
  }, []);

  const remove = useCallback<CartContextValue['remove']>((id) => {
    setItems((prev) => prev.filter((e) => e.id !== id));
    setRecentlyAddedId((curr) => (curr === id ? null : curr));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setRecentlyAddedId(null);
  }, []);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  // Clear the "recently added" highlight when the drawer is closed, so the
  // highlight acts as a brief visual confirmation for this session's addition.
  useEffect(() => {
    if (!drawerOpen) setRecentlyAddedId(null);
  }, [drawerOpen]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      // Count = number of distinct cart lines. Stage 1 has no quantity stepper,
      // so this matches the visible list exactly.
      count: items.length,
      add,
      remove,
      clear,
      drawerOpen,
      openDrawer,
      closeDrawer,
      recentlyAddedId,
    }),
    [items, add, remove, clear, drawerOpen, openDrawer, closeDrawer, recentlyAddedId]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return ctx;
}
