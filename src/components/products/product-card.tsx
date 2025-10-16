"use client";

import Image from "next/image";
import { useState } from "react";
import { QuantitySelector } from "./quantity-selector";
import { useCart } from "@/components/cart/cart-provider";
import { computeTenPercentOff } from "@/lib/pricing";

type Props = {
  image: string;
  type: "product" | "kit";
  category: string;
  price: number;
  name: string;
  onView: () => void;
  onAddToCart?: () => void;
};

export function ProductCard({
  image,
  type,
  category,
  price,
  name,
  onView,
  onAddToCart,
}: Props) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const display = computeTenPercentOff(price);

  return (
    <article className="rounded-lg border bg-card text-card-foreground overflow-hidden flex flex-col hover:shadow-sm transition-shadow">
      <div className="aspect-square bg-muted relative">
        {image ? (
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <img
            src={
              "/placeholder.svg?height=600&width=600&query=no%20image%20available"
            }
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col gap-2">
        <h3 className="text-balance text-base font-semibold">{name}</h3>
        <div className="flex items-center justify-between text-sm opacity-80">
          <span className="capitalize">{type}</span>
          <span className="">{category}</span>
        </div>

        <div className="mt-1 flex items-end gap-2">
          <span className="text-muted-foreground line-through text-sm">
            ₹{display.original}
          </span>
          <span className="text-lg font-semibold">₹{display.sale}</span>
          <span className="text-xs font-medium text-green-600">
            {display.percentOff}% OFF
          </span>
        </div>

        <div className="mt-auto flex items-center gap-2">
          <button
            onClick={onView}
            className="px-3 py-2 rounded-md bg-primary text-primary-foreground"
            aria-label={`View ${name}`}
          >
            View
          </button>
          <QuantitySelector
            value={qty}
            onChange={setQty}
            ariaLabel={`Quantity for ${name}`}
          />
          <button
            onClick={() => {
              if (onAddToCart) return onAddToCart();
              addItem({
                id: (name + image).toString(), // will be overwritten by caller page props if needed
                // Note: page passes full data below; this fallback avoids crash if missing
                name,
                image: image || "/modern-tech-product.png",
                type: type,
                category,
                unitPrice: display.sale,
                quantity: qty,
              });
            }}
            className="px-3 py-2 rounded-md border"
            aria-label={`Add ${name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
