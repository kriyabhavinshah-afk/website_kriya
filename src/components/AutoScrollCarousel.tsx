"use client";

import { useRef, useEffect } from "react";

interface AutoScrollCarouselProps {
  images: { src: string; alt: string }[];
  speed?: number;
}

export default function AutoScrollCarousel({ images, speed = 0.5 }: AutoScrollCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef(0);

  const doubled = [...images, ...images];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const halfWidth = track.scrollWidth / 2;

    const animate = () => {
      posRef.current += speed;
      if (posRef.current >= halfWidth) posRef.current = 0;
      track.style.transform = `translateX(-${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, images]);

  return (
    <div className="w-full overflow-hidden">
      <div ref={trackRef} className="flex gap-4 will-change-transform" style={{ width: "max-content" }}>
        {doubled.map((img, i) => (
          <div key={i} className="flex-shrink-0 h-64 sm:h-80 lg:h-96">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-auto object-cover rounded"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
