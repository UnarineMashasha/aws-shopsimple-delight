import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { findProduct, type Product } from "@/data/products";

export type CartLine = { id: string; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  items: Array<{ product: Product; quantity: number; lineTotal: number }>;
  count: number;
  total: number;
  addItem: (id: string) => void;
  decrementItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CART_KEY = "shopsimple.cart";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      const parsed = raw ? (JSON.parse(raw) as CartLine[]) : [];
      if (Array.isArray(parsed)) setLines(parsed);
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addItem = useCallback((id: string) => {
    setLines((prev) => {
      const existing = prev.find((line) => line.id === id);
      if (existing) {
        return prev.map((line) =>
          line.id === id ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
  }, []);

  const decrementItem = useCallback((id: string) => {
    setLines((prev) =>
      prev
        .map((line) => (line.id === id ? { ...line, quantity: line.quantity - 1 } : line))
        .filter((line) => line.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setLines((prev) => prev.filter((line) => line.id !== id));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const items = lines.flatMap((line) => {
      const product = findProduct(line.id);
      if (!product) return [];
      return [{ product, quantity: line.quantity, lineTotal: product.price * line.quantity }];
    });
    return {
      lines,
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      total: items.reduce((sum, item) => sum + item.lineTotal, 0),
      addItem,
      decrementItem,
      removeItem,
      clearCart,
    };
  }, [lines, addItem, decrementItem, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
