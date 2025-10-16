"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const safeImages = images?.length ? images : ["/modern-tech-product.png"];
  const current = safeImages[Math.min(idx, safeImages.length - 1)];

  return (
    <div className="w-full">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted">
        <Image
          src={current || "/placeholder.svg"}
          alt={`Product image ${idx + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {safeImages.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {safeImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`relative aspect-square rounded-md overflow-hidden border ${
                i === idx ? "ring-2 ring-primary" : ""
              }`}
              aria-label={`Show image ${i + 1}`}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={`Thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="10vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
