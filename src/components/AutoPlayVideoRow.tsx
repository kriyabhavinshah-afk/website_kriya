"use client";

import { useEffect, useRef } from "react";

const DEFAULT_VIDEO_SOURCES = [
  "/projects/world-of-hyatt/videos/1.mp4",
  "/projects/world-of-hyatt/videos/2.mp4",
  "/projects/world-of-hyatt/videos/3.mp4",
];

/** Three videos that autoplay (muted) in view, pause when scrolled past. Sound only when hovering over that specific video. */
export default function AutoPlayVideoRow({
  sources = DEFAULT_VIDEO_SOURCES,
  skipTopMargin,
}: { sources?: string[]; skipTopMargin?: boolean } = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const playAll = () => {
      videoRefs.current.forEach((v) => {
        if (v && v.readyState >= 2) v.play().catch(() => {});
      });
    };

    const pauseAll = () => {
      videoRefs.current.forEach((v) => {
        if (v) v.pause();
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playAll();
        } else {
          pauseAll();
        }
      },
      { threshold: 0.25, rootMargin: "0px" }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const handleVideoMouseEnter = (index: number) => {
    const v = videoRefs.current[index];
    if (v) {
      v.muted = false;
      v.play().catch(() => {});
    }
  };

  const handleVideoMouseLeave = (index: number) => {
    const v = videoRefs.current[index];
    if (v) v.muted = true;
  };

  return (
    <div
      ref={containerRef}
      className={`max-w-5xl mx-auto w-full scroll-mt-20 sm:scroll-mt-24 snap-start relative ${skipTopMargin ? "" : "mt-36 sm:mt-48"}`}
    >
      <div className="grid gap-6 sm:grid-cols-3">
        {sources.map((src, i) => (
          <figure
            key={src}
            className="space-y-3 group py-2 overflow-visible"
            onMouseEnter={() => handleVideoMouseEnter(i)}
            onMouseLeave={() => handleVideoMouseLeave(i)}
          >
            <div className="relative aspect-[4/5] bg-transparent overflow-visible transition-transform duration-300 ease-out group-hover:scale-[1.25] origin-center">
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                muted
                loop
                playsInline
                autoPlay
                preload="auto"
                className="w-full h-full object-cover"
                onCanPlay={(e) => {
                  const v = e.currentTarget;
                  if (containerRef.current) {
                    const rect = containerRef.current.getBoundingClientRect();
                    const inView = rect.top < window.innerHeight && rect.bottom > 0;
                    if (inView) v.play().catch(() => {});
                  }
                }}
              >
                <source src={src} type="video/mp4" />
              </video>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
