"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { GalleryImage } from "@/content/projects";

const ProjectVideo = dynamic(() => import("./ProjectVideo"));

interface ProjectVideoSectionProps {
  coverImage: GalleryImage;
  overlay?: { line1: string; line2: string };
  overlayLeftClass?: string;
  videoSrc: string;
}

/** Hero + left overlay (hides when sentinel after video is in view) + video. */
export default function ProjectVideoSection({
  coverImage,
  overlay,
  overlayLeftClass,
  videoSrc,
}: ProjectVideoSectionProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOverlayVisible(!entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "-10% 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="pt-12 sm:pt-16 pb-5 sm:pb-5 scroll-mt-20 sm:scroll-mt-24 snap-start">
        <figure className="space-y-3 group py-2 overflow-visible max-w-md sm:max-w-lg mx-auto">
          <div className="relative aspect-[4/5] sm:aspect-[3/4] bg-transparent overflow-hidden transition-transform duration-300 ease-out group-hover:scale-[1.08]">
            <Image
              src={coverImage.src}
              alt={coverImage.alt}
              fill
              className="object-contain"
              sizes="(max-width: 832px) 100vw, 32rem"
              unoptimized
            />
          </div>
        </figure>
      </div>
      {overlay && (
        <div
          className={`pointer-events-none fixed top-1/2 -translate-y-1/2 z-20 transition-opacity duration-300 max-w-[14rem] sm:max-w-[16rem] ${overlayLeftClass ?? "left-8 sm:left-16"} ${
            overlayVisible ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        >
          <p className="font-open-sans text-xl sm:text-2xl font-medium text-foreground/95 tracking-wide leading-snug">
            {overlay.line1}
          </p>
          {overlay.line2 && (
            <p className="font-open-sans text-sm sm:text-base text-foreground/75 tracking-[0.2em] uppercase mt-2">
              {overlay.line2}
            </p>
          )}
        </div>
      )}
      <ProjectVideo src={videoSrc} />
      <div ref={sentinelRef} className="h-px w-full" aria-hidden />
    </>
  );
}
