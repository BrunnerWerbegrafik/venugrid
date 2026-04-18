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
      const existingIdx = prev.findIndex((p) => p.id === id);
      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + 1,
        };
        return next;
      }
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
  }, []);

  const remove = useCallback<CartContextValue['remove']>((id) => {
    setItems((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      add,
      remove,
      clear,
    }),
    [items, add, remove, clear]
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
