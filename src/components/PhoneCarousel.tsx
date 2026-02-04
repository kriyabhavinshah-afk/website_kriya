"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export interface PhoneCarouselImage {
  src: string;
  alt: string;
}

interface PhoneCarouselProps {
  images: PhoneCarouselImage[];
  className?: string;
}

export default function PhoneCarousel({ images, className = "" }: PhoneCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const count = images.length;

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (count <= 1 || isPaused) return;
    const intervalId = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 750);
    return () => window.clearInterval(intervalId);
  }, [count, isPaused]);

  if (count === 0) return null;

  return (
    <div className={`flex flex-col items-center pt-0 pb-5 sm:pb-5 ${className}`}>
      {/* Single frame – only image size; no background box */}
      <div
        className="relative w-full max-w-[1000px] mx-auto overflow-hidden transition-transform duration-300 ease-out hover:scale-[1.12]"
        style={{ aspectRatio: "3125 / 2084" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-500 ease-in-out"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden={i !== index}
          >
            <Image
              src={img.src}
              alt={i === index ? img.alt : ""}
              fill
              className="object-contain"
              sizes="800px"
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Buttons removed; autoplay pauses on hover */}
    </div>
  );
}
