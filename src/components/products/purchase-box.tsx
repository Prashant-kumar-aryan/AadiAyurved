"use client";

import { useMemo, useState } from "react";
import type { ProductDetailResponse } from "@/types/product";
import { QuantitySelector } from "./quantity-selector";
import { useCart } from "@/components/cart/cart-provider";
import toast from "react-hot-toast";

export function PurchaseBox({ product }: { product: ProductDetailResponse }) {
  const { addItem } = useCart();
  const hasSizes = !!(product.sizePrices && product.sizePrices.length > 0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [qty, setQty] = useState(1);

  const { unitPrice, sizeLabel } = useMemo(() => {
    if (product.kitPrice)
      return {
        unitPrice: product.kitPrice.display.sale,
        sizeLabel: undefined as string | undefined,
      };
    if (hasSizes) {
      const sp =
        product.sizePrices![
          Math.min(selectedIndex, product.sizePrices!.length - 1)
        ];
      return { unitPrice: sp.display.sale, sizeLabel: sp.size || "Default" };
    }
    // fallback
    const first = product.sizePrices?.[0];
    return {
      unitPrice: first ? first.display.sale : 0,
      sizeLabel: first?.size,
    };
  }, [product, hasSizes, selectedIndex]);

  const list = product.sizePrices || [];

  return (
    <div className="rounded-lg border p-4 space-y-4">
      {product.kitPrice && (
        <div className="flex items-end gap-2">
          <span className="text-muted-foreground line-through">
            ₹{product.kitPrice.display.original}
          </span>
          <span className="text-xl font-semibold">
            ₹{product.kitPrice.display.sale}
          </span>
          <span className="text-xs font-medium text-green-600">
            {product.kitPrice.display.percentOff}% OFF
          </span>
        </div>
      )}

      {!product.kitPrice && list.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm opacity-80">Choose size</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {list.map((sp, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`rounded-md border p-3 text-left ${
                  i === selectedIndex ? "ring-2 ring-primary" : ""
                }`}
                aria-pressed={i === selectedIndex}
              >
                <div className="text-sm font-medium">
                  {sp.size || "Default"}
                </div>
                <div className="text-xs opacity-80">₹{sp.display.sale}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <QuantitySelector
          value={qty}
          onChange={setQty}
          ariaLabel="Product quantity"
        />
        <div className="text-lg font-semibold">₹{unitPrice}</div>
      </div>

      <button
        className="w-full px-4 py-3 rounded-md bg-primary text-primary-foreground"
        onClick={() => {
          addItem({
            id: product._id,
            name: product.name,
            image: product.images?.[0] || "/modern-tech-product.png",
            type: product.productType || "product",
            category: product.category || "",
            unitPrice,
            size: sizeLabel || null,
            quantity: qty,
          });
          toast.success("Added To Cart");
        }}
        aria-label={`Add ${product.name} to cart`}
      >
        Add to Cart
      </button>
    </div>
  );
}
