"use client";

import { useRef, useState, useEffect } from "react";
import type { Project } from "@/content/projects";
import MoodBoard from "@/components/MoodBoard";

export default function RoyalVanLentMoodboardLayout({ project }: { project: Project }) {
  const moodBoardRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [rightOverlayVisible, setRightOverlayVisible] = useState(true);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el || !project.galleryOverlayRight) return;
    const observer = new IntersectionObserver(
      ([entry]) => setRightOverlayVisible(!entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [project.galleryOverlayRight]);

  const cover = project.gallery[0];
  const rest = project.gallery.slice(1);

  const heroImg = rest[0];
  const gridTiles = rest.filter((img) => img.group === "grid-tile");
  const packagesTiles = rest.filter((img) => img.group === "packages-tile");
  const bottomImages = rest.filter(
    (img) => !img.group && img !== heroImg
  );

  const note = project.galleryNotes?.[0];
  const rowTitles = project.galleryRowTitles ?? [];
  const selectedYachtTitle = rowTitles.find((t) => t.text.includes("Selected Yacht"))?.text;
  const packagesTitle = rowTitles.find((t) => t.text.includes("Packages"))?.text;

  return (
    <>
      {/* Left overlay */}
      {project.galleryOverlay && (
        <div
          className="pointer-events-none fixed left-8 sm:left-16 top-1/2 -translate-y-1/2 z-20 max-w-[14rem] sm:max-w-[16rem]"
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
          {project.galleryOverlayRight.line2 && (
            <p className="font-open-sans text-xs sm:text-sm text-foreground/80 leading-relaxed tracking-wide mt-1">
              {project.galleryOverlayRight.line2}
            </p>
          )}
        </div>
      )}

      {/* Cover */}
      <div className="pt-40 sm:pt-52 pb-40 sm:pb-52">
        <div className="max-w-xl mx-auto px-2 sm:px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover.src} alt={cover.alt} className="w-full h-auto" />
        </div>
      </div>

      {/* Mood Board */}
      <div ref={moodBoardRef} className="pb-40 sm:pb-52 w-full">
        <p className="font-open-sans text-sm sm:text-base text-foreground/70 tracking-[0.2em] uppercase font-light mb-3 text-center">
          Mood Board
        </p>
        <MoodBoard images={project.moodboard!} altPrefix="Royal Van Lent mood board" />
      </div>

      {/* Gallery content */}
      <div ref={galleryRef} className="flex flex-col items-center gap-72 sm:gap-[22.5rem]">
        {/* Hero image */}
        {heroImg && (
          <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImg.src} alt={heroImg.alt} className="w-full h-auto" loading="lazy" />
          </div>
        )}

        {/* Selected Yacht : Project 821 — 3-tile row */}
        {gridTiles.length > 0 && (
          <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
            {selectedYachtTitle && (
              <p className="font-open-sans text-xs sm:text-sm text-foreground/70 tracking-[0.2em] uppercase font-light text-center mb-6">
                {selectedYachtTitle}
              </p>
            )}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {gridTiles.map((img, i) => (
                <div key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} className="w-full h-auto" loading="lazy" />
                </div>
              ))}
            </div>
            {/* Note below tiles */}
            {note && (
              <p className="mt-4 font-open-sans text-xs sm:text-sm text-foreground/60 leading-relaxed text-center max-w-2xl mx-auto">
                {note.lines.join(" ")}
              </p>
            )}
          </div>
        )}

        {/* Packages Offered — 3-tile row with captions */}
        {packagesTiles.length > 0 && (
          <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
            {packagesTitle && (
              <p className="font-open-sans text-xs sm:text-sm text-foreground/70 tracking-[0.2em] uppercase font-light text-center mb-6">
                {packagesTitle}
              </p>
            )}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {packagesTiles.map((img, i) => (
                <div key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} className="w-full h-auto" loading="lazy" />
                  {img.caption && (
                    <p className="mt-2 font-open-sans text-[10px] sm:text-xs text-foreground/60 leading-relaxed text-justify">
                      <span className="font-semibold">{img.caption.split(":")[0]}:</span>
                      {img.caption.split(":").slice(1).join(":")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom images */}
        {bottomImages.map((img, i) => (
          <div key={i} className="w-full max-w-6xl mx-auto px-2 sm:px-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} className="w-full h-auto" loading="lazy" />
          </div>
        ))}
      </div>
    </>
  );
}
