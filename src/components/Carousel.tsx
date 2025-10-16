"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

type Slide = {
  src: string;
  alt?: string;
  caption?: string;
  href: string;
};

export function AutoCarousel({
  intervalMs = 4000,
  className,
  "aria-label": ariaLabel = "Image carousel",
}: {
  intervalMs?: number;
  className?: string;
  "aria-label"?: string;
}) {
  const [slides, setSlides] = React.useState<Slide[]>([]);
  const [index, setIndex] = React.useState(0);

  // Fetch carousel images from API
  React.useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const res = await fetch("/api/home");
        const data = await res.json();
        const fetchedSlides = data?.data?.map((item: any) => ({
          src: item.img,
          href: item.href || "#",
        }));
        setSlides(fetchedSlides || []);
      } catch (error) {
        console.error("Failed to load carousel:", error);
      }
    };
    fetchCarousel();
  }, []);

  // Auto-advance
  React.useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [slides, intervalMs]);

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  if (!slides.length) {
    return (
      <div className="h-64 md:h-96 flex items-center justify-center text-muted-foreground border rounded-lg">
        Loading carousel...
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      aria-live="off"
      className={cn("relative w-full select-none", className)}
    >
      <div className="overflow-hidden rounded-lg border border-border">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={i}
              className="relative w-full shrink-0 grow-0 basis-full h-64 md:h-96 bg-muted"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}${
                s.caption ? `: ${s.caption}` : ""
              }`}
            >
              <Link
                href={s.href}
                className="block h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Image
                  src={s.src || "/placeholder.svg"}
                  alt={s.alt || `Slide ${i + 1}`}
                  className="h-full w-full object-contain"
                  draggable={false}
                  fill
                />
                {s.caption ? (
                  <div className="absolute inset-x-0 bottom-0 bg-background/70 text-foreground backdrop-blur-sm">
                    <p className="px-4 py-2 text-sm md:text-base">
                      {s.caption}
                    </p>
                  </div>
                ) : null}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-0 flex items-center justify-between p-2 md:p-4 pointer-events-none">
        <button
          type="button"
          onClick={prev}
          className="pointer-events-auto inline-flex items-center justify-center rounded-md bg-background/70 text-foreground backdrop-blur-sm hover:bg-background/90 px-2 py-2"
          aria-label="Previous slide"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="opacity-90"
          >
            <path
              fill="currentColor"
              d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          className="pointer-events-auto inline-flex items-center justify-center rounded-md bg-background/70 text-foreground backdrop-blur-sm hover:bg-background/90 px-2 py-2"
          aria-label="Next slide"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="opacity-90"
          >
            <path
              fill="currentColor"
              d="M8.59 16.59L10 18l6-6l-6-6l-1.41 1.41L13.17 12z"
            />
          </svg>
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute inset-x-0 bottom-2 md:bottom-4 flex items-center justify-center gap-2">
        {slides.map((_, i) => {
          const active = i === index;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={active ? "true" : "false"}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 w-2 rounded-full border border-border transition-colors",
                active ? "bg-primary" : "bg-muted"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
