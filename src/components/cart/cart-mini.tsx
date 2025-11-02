"use client";

import { useState } from "react";
import { useCart } from "./cart-provider";
import { QuantitySelector } from "@/components/products/quantity-selector";
import { ShoppingCart, X, Trash2 } from "lucide-react";

export function CartMini() {
  const { items, count, subtotal, updateQty, removeItem, clear } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* 🧺 Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center gap-2 px-3 py-2 rounded-md border hover:bg-gray-50 transition"
      >
        <ShoppingCart size={18} />
        <span className="ml-2 inline-flex items-center justify-center rounded-full bg-blue-600 text-white text-xs px-2 py-0.5">
          {count}
        </span>
      </button>

      {/* 🧾 Drawer / Side Panel */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          onClick={() => setIsOpen(false)}
        >
          {/* 🔲 Background overlay */}
          <div className="flex-1 bg-black/40 backdrop-blur-sm" />

          {/* 🧰 Drawer content */}
          <div
            className="w-[90vw] sm:w-[420px] bg-white shadow-lg h-full p-5 overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <ShoppingCart className="text-blue-600" size={20} />
                Your Cart
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="opacity-70 text-center mt-10">
                  Your cart is empty.
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((it) => (
                    <div
                      key={it.key}
                      className="flex items-start gap-3 border rounded-md p-3 hover:shadow-sm transition"
                    >
                      <img
                        src={
                          it.image ||
                          "/placeholder.svg?height=80&width=80&query=product%20thumbnail"
                        }
                        alt={it.name}
                        className="w-20 h-20 rounded object-cover bg-gray-100"
                      />
                      <div className="flex-1">
                        <div className="font-medium leading-tight">
                          {it.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          <span className="capitalize">{it.type}</span>
                          {it.size ? ` • ${it.size}` : ""} • {it.category}
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="text-sm font-semibold text-gray-800">
                            ₹{it.unitPrice}
                          </div>
                          <QuantitySelector
                            value={it.quantity}
                            onChange={(q) => updateQty(it.key, q)}
                            ariaLabel={`Quantity for ${it.name}`}
                          />
                        </div>
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <button
                            className="text-red-500 hover:text-red-700 flex items-center gap-1"
                            onClick={() => removeItem(it.key)}
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                          <div className="opacity-70">
                            Line total: ₹{it.unitPrice * it.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Subtotal & actions */}
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm opacity-80">Subtotal</div>
                <div className="text-lg font-semibold text-gray-900">
                  ₹{subtotal}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="px-4 py-3 rounded-md bg-blue-600 text-white flex-1 hover:bg-blue-700 transition"
                  disabled
                >
                  Checkout (demo)
                </button>
                <button
                  className="px-4 py-3 rounded-md border hover:bg-gray-50 transition"
                  onClick={clear}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
