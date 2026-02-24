"use client";

import { useEffect, useRef, useState } from "react";

interface SlideshowCarouselProps {
  images: { src: string; alt: string }[];
  interval?: number;
}

export default function SlideshowCarousel({ images, interval = 3000 }: SlideshowCarouselProps) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setCurrent((prev) => (prev + 1) % images.length);
      }
    }, interval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [images.length, interval]);

  return (
    <div
      className="w-full max-w-2xl mx-auto px-2 sm:px-4 relative"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div className="relative w-full overflow-hidden">
        {images.map((img, i) => (
          <div
            key={i}
            className={`transition-opacity duration-700 ease-in-out ${i === current ? "opacity-100 relative" : "opacity-0 absolute inset-0"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} className="w-full h-auto" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
