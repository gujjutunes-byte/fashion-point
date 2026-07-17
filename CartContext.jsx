'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);
const STORAGE_KEY = 'fp_cart';

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCart(JSON.parse(saved));
    } catch (e) {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  function addToCart(product, size, silent = false) {
    setCart((prev) => {
      const key = (p) => `${p.id}_${p.size}`;
      const existing = prev.find((i) => key(i) === `${product.id}_${size}`);
      if (existing) {
        return prev.map((i) => (key(i) === key(existing) ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, size, qty: 1 }];
    });
    if (!silent) toast.success(`${product.name} added to bag`);
  }

  function removeFromCart(id, size) {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  }

  function changeQty(id, size, delta) {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id && i.size === size ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, changeQty, clearCart, subtotal, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
