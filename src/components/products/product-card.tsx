"use client";

import Image from "next/image";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { QuantitySelector } from "./quantity-selector";
import { useCart } from "@/components/cart/cart-provider";
import { computeTenPercentOff } from "@/lib/pricing";

type Props = {
  image: string;
  type: "product" | "kit";
  category: string;
  price: number;
  name: string;
  size: string;
  onView: () => void;
  onAddToCart?: () => void;
};

export function ProductCard({
  image,
  type,
  category,
  size,
  price,
  name,
  onView,
  onAddToCart,
}: Props) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const display = computeTenPercentOff(price);

  const handleAddToCart = () => {
    // if (onAddToCart) return onAddToCart();
    addItem({
      id: (name + image).toString(),
      name,
      image: image || "/modern-tech-product.png",
      type,
      category,
      unitPrice: display.sale,
      quantity: qty,
    });
  };

  return (
    <article
      onClick={onView}
      className="cursor-pointer select-none rounded-lg border bg-card text-card-foreground 
                 overflow-hidden flex flex-col hover:shadow-md active:scale-[0.97] 
                 transition-all duration-150 w-full max-w-[260px]"
    >
      {/* 🖼️ Slightly larger image area */}
      <div className="relative w-full h-[200px] bg-muted flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-3"
            sizes="(max-width: 768px) 100vw, 20vw"
          />
        ) : (
          <img
            src="/placeholder.svg"
            alt="No image"
            className="w-full h-full object-contain p-3"
          />
        )}
      </div>

      {/* 🧾 Info section */}
      <div
        className="p-3 flex flex-col gap-1.5 text-[12px] sm:text-sm flex-1"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-medium line-clamp-1">{name}</h3>
        <div className="flex justify-between text-muted-foreground text-[11px]">
          <span className="capitalize">{type}</span>
          <span>{category}</span>
        </div>

        <div className="mt-1 flex items-end gap-1">
          <span className="line-through text-[11px] text-muted-foreground">
            ₹{display.original}
          </span>
          <span className="text-base font-semibold">₹{display.sale}</span>
          <span className="text-[11px] text-green-600 font-medium">
            {display.percentOff}% OFF
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <QuantitySelector
            value={qty}
            onChange={setQty}
            ariaLabel={`Quantity for ${name}`}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md border text-[11px] hover:bg-muted active:scale-95 transition"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
