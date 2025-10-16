"use client";

import type React from "react";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, CartContextValue, AddToCartInput } from "@/types/cart";

const STORAGE_KEY = "cart_v1";

const CartContext = createContext<CartContextValue | null>(null);

function load(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function save(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

function makeKey(id: string, size?: string | null) {
  return size ? `${id}__${size}` : id;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(load());
  }, []);

  useEffect(() => {
    save(items);
  }, [items]);

  const addItem = (input: AddToCartInput) => {
    setItems((prev) => {
      const key = makeKey(input.id, input.size);
      const idx = prev.findIndex((i) => i.key === key);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: Math.min(999, next[idx].quantity + input.quantity),
        };
        return next;
      }
      const item: CartItem = {
        key,
        id: input.id,
        name: input.name,
        image: input.image,
        type: input.type,
        category: input.category,
        unitPrice: Math.max(0, Math.round(input.unitPrice)),
        size: input.size || undefined,
        quantity: Math.max(1, Math.round(input.quantity)),
      };
      return [...prev, item];
    });
  };

  const updateQty = (key: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.key === key
            ? {
                ...i,
                quantity: Math.max(1, Math.min(999, Math.round(quantity))),
              }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  };

  const clear = () => setItems([]);

  const count = useMemo(
    () => items.reduce((acc, i) => acc + i.quantity, 0),
    [items]
  );
  const subtotal = useMemo(
    () => items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    addItem,
    updateQty,
    removeItem,
    clear,
    count,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
