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
      className="flex flex-col w-[250px] bg-white rounded-xl shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden transition-all duration-200"
    >
      {/* Image with category badge */}
      <div className="relative h-56 w-full bg-gray-100 flex items-center justify-center">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-contain p-3"
        />

        {/* Category badge top-right */}
        <span
          className={`absolute top-2 right-2 px-2 py-0.5 text-[10px] font-semibold rounded ${
            type === "product"
              ? "bg-emerald-600 text-white"
              : "bg-purple-600 text-white"
          }`}
        >
          {type.toUpperCase()}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-sm line-clamp-2">{name}</h3>

        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="line-through text-gray-400 text-xs mr-1">
              ₹{display.original}
            </span>
            <span className="font-semibold text-base">₹{display.sale}</span>
          </div>
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-medium">
            {display.percentOff}% OFF
          </span>
        </div>

        {/* Quantity + Add button */}
        <div className="mt-3 flex items-center gap-2">
          <QuantitySelector
            value={qty}
            onChange={setQty}
            ariaLabel={`Qty for ${name}`}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs font-medium py-1.5 rounded-lg flex items-center justify-center gap-1 hover:bg-blue-700 transition"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
