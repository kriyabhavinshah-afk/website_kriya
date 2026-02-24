"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import ProjectVideo from "./ProjectVideo";
import AutoScrollCarousel from "./AutoScrollCarousel";

const widthByDisplay: Record<string, string> = {
  heroXX: "max-w-7xl",
  heroX: "max-w-6xl",
  hero: "max-w-4xl",
  largeX: "max-w-[54rem]",
  large: "max-w-3xl",
  largePlus: "max-w-[52rem]",
  medium: "max-w-2xl",
  mediumNarrow: "max-w-[40rem]",
  small: "max-w-xl",
  compact: "max-w-lg",
};

export default function ProjectVideoPageSection({ project }: { project: Project }) {
  const cover = project.gallery[0];
  const restImages = project.gallery.slice(1);

  const [rightOverlayVisible, setRightOverlayVisible] = useState(true);
  const gallerySentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gallerySentinelRef.current;
    if (!el || !project.galleryOverlayRight) return;
    const observer = new IntersectionObserver(
      ([entry]) => setRightOverlayVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [project.galleryOverlayRight]);

  return (
    <>
      {/* Cover */}
      <div className="pt-40 sm:pt-52 pb-40 sm:pb-52">
        <div className="max-w-md sm:max-w-lg mx-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover.src} alt={cover.alt} className="w-full h-auto" />
        </div>
      </div>

      {/* Left overlay */}
      {project.galleryOverlay && (
        <div
          className={`pointer-events-none fixed top-1/2 -translate-y-1/2 z-20 max-w-[14rem] sm:max-w-[16rem] ${project.overlayLeftClass ?? "left-8 sm:left-16"}`}
          aria-hidden
        >
          <p className="font-open-sans text-xl sm:text-2xl font-medium text-foreground/95 tracking-wide leading-snug">
            {project.galleryOverlay.line1}
          </p>
          {project.galleryOverlay.line2 && (
            <p className="font-open-sans text-sm sm:text-base text-foreground/75 tracking-[0.2em] uppercase mt-2">
              {project.galleryOverlay.line2}
            </p>
          )}
        </div>
      )}

      {/* Right overlay */}
      {project.galleryOverlayRight?.line1 && (
        <div
          className={`pointer-events-none fixed right-16 sm:right-24 top-1/2 -translate-y-1/2 z-20 max-w-[13rem] sm:max-w-[15rem] text-right transition-opacity duration-500 ${
            rightOverlayVisible ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        >
          <p className="font-open-sans text-xs sm:text-sm text-foreground/80 leading-relaxed tracking-wide">
            {project.galleryOverlayRight.line1}
          </p>
        </div>
      )}

      {/* Video */}
      {project.projectVideo && <ProjectVideo src={project.projectVideo} />}

      {/* All images after video */}
      {restImages.length > 0 && (
        <div className="mt-40 flex flex-col items-center gap-72 sm:gap-[22.5rem]" ref={gallerySentinelRef}>
          {restImages.map((img, i) => (
            <div key={i} className={`w-full ${widthByDisplay[img.display ?? "large"] ?? "max-w-3xl"} mx-auto px-2 sm:px-4`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} className="w-full h-auto" loading="lazy" />
            </div>
          ))}
        </div>
      )}

      {/* Auto-scrolling photo carousel */}
      {project.carouselImages && project.carouselImages.length > 0 && (
        <div className="mt-40 sm:mt-52 mb-16">
          <AutoScrollCarousel images={project.carouselImages} speed={0.6} />
        </div>
      )}
    </>
  );
}
