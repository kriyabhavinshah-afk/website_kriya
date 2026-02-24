"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import ProjectVideo from "./ProjectVideo";
import AutoScrollCarousel from "./AutoScrollCarousel";
import SlideshowCarousel from "./SlideshowCarousel";

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
  tiny: "max-w-md",
};

export default function ProjectVideoPageSection({ project }: { project: Project }) {
  const cover = project.gallery[0];
  const restImages = project.gallery.slice(1);

  const [overlaysVisible, setOverlaysVisible] = useState(true);
  const [rightOverlayVisible, setRightOverlayVisible] = useState(true);
  const [awardVisible, setAwardVisible] = useState(true);
  const [carouselNoteVisible, setCarouselNoteVisible] = useState(false);
  const gallerySentinelRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const scrollHandlerRef = useRef<(() => void) | null>(null);

  const secondImgCallbackRef = useCallback((node: HTMLDivElement | null) => {
    if (scrollHandlerRef.current) {
      window.removeEventListener("scroll", scrollHandlerRef.current);
      scrollHandlerRef.current = null;
    }
    if (node) {
      const handleScroll = () => {
        const rect = node.getBoundingClientRect();
        setRightOverlayVisible(rect.bottom > window.innerHeight * 0.65);
      };
      scrollHandlerRef.current = handleScroll;
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const overlayObserver = new IntersectionObserver(
      ([entry]) => setOverlaysVisible(!entry.isIntersecting),
      { rootMargin: "0px 0px 200px 0px", threshold: 0 }
    );
    overlayObserver.observe(el);

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const entering = rect.top < window.innerHeight * 0.8;
      const pastBottom = rect.bottom < window.innerHeight * 0.3;
      setCarouselNoteVisible(entering && !pastBottom);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      overlayObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const el = coverRef.current;
    if (!el || !project.awardBadge) return;
    const observer = new IntersectionObserver(
      ([entry]) => setAwardVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [project.awardBadge]);

  return (
    <>
      {/* Cover */}
      <div className="pt-40 sm:pt-52 pb-40 sm:pb-52" ref={coverRef}>
        <div className="max-w-md sm:max-w-lg mx-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover.src} alt={cover.alt} className="w-full h-auto" />
        </div>
      </div>

      {/* Left overlay */}
      {project.galleryOverlay && (
        <div
          className={`pointer-events-none fixed top-1/2 -translate-y-1/2 z-20 max-w-[14rem] sm:max-w-[16rem] overflow-visible transition-opacity duration-500 ${overlaysVisible && rightOverlayVisible ? "opacity-100" : "opacity-0"} ${project.overlayLeftClass ?? "left-8 sm:left-16"}`}
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
          {project.awardBadge && (
            <div className="mt-4 overflow-visible">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.awardBadge} alt="Award" className="w-20 sm:w-24 h-auto object-contain" />
            </div>
          )}
        </div>
      )}

      {/* Right overlay */}
      {project.galleryOverlayRight?.line1 && (
        <div
          className={`pointer-events-none fixed right-16 sm:right-24 top-1/2 -translate-y-1/2 z-20 max-w-[13rem] sm:max-w-[15rem] text-right transition-opacity duration-500 ${
            overlaysVisible && rightOverlayVisible ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        >
          <p className="font-open-sans text-xs sm:text-sm text-foreground/80 leading-relaxed tracking-wide">
            {project.galleryOverlayRight.line1}
          </p>
        </div>
      )}

      {/* Carousel note overlay */}
      {project.carouselNote && (
        <div
          className={`pointer-events-none fixed right-16 sm:right-24 top-1/2 -translate-y-1/2 z-20 max-w-[13rem] sm:max-w-[15rem] text-right transition-opacity duration-500 ${
            carouselNoteVisible ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        >
          <p className="font-open-sans text-xs sm:text-sm text-foreground/80 leading-relaxed tracking-wide">
            {project.carouselNote}
          </p>
        </div>
      )}

      {/* Video (before images unless videoAfterGallery) */}
      {project.projectVideo && !project.videoAfterGallery && <ProjectVideo src={project.projectVideo} />}

      {/* Gallery images */}
      {restImages.length > 0 && (() => {
        const rows: { group?: string; images: typeof restImages }[] = [];
        restImages.forEach((img) => {
          if (img.group && rows.length > 0 && rows[rows.length - 1].group === img.group) {
            rows[rows.length - 1].images.push(img);
          } else {
            rows.push({ group: img.group, images: [img] });
          }
        });
        return (
          <div className="mt-40 flex flex-col items-center gap-72 sm:gap-[22.5rem]" ref={gallerySentinelRef}>
            {rows.map((row, ri) =>
              row.group ? (
                <div key={ri}>
                  <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
                    <div className={`grid gap-3 sm:gap-4`} style={{ gridTemplateColumns: `repeat(${row.images.length}, 1fr)` }}>
                      {row.images.map((img, i) => (
                        <div key={i}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img.src} alt={img.alt} className="w-full h-auto" loading="lazy" />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Note after this row */}
                  {project.galleryNotes?.filter((n) => n.forRow === ri + 1).map((note, ni) => (
                    <div key={ni} className="mt-36 sm:mt-44 mx-auto text-center max-w-md mb-40 sm:mb-52">
                      {note.header && (
                        <p className="font-open-sans text-xs sm:text-sm text-foreground/70 font-normal mb-6 tracking-widest uppercase">
                          {note.header}
                        </p>
                      )}
                      <div className="font-canela text-base sm:text-lg text-foreground/80 leading-relaxed space-y-3">
                        {note.lines.map((line, li) => (
                          <p key={li}>{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                  {/* Second video after note */}
                  {project.secondVideo && (
                    <div className="mt-16 sm:mt-20">
                      <ProjectVideo src={project.secondVideo} />
                    </div>
                  )}
                </div>
              ) : (
                <div key={ri} ref={ri === 0 ? secondImgCallbackRef : undefined} className={`w-full ${widthByDisplay[row.images[0].display ?? "large"] ?? "max-w-3xl"} mx-auto px-2 sm:px-4 ${ri === rows.length - 1 && project.videoAfterGallery ? "mb-72 sm:mb-80" : ""}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={row.images[0].src} alt={row.images[0].alt} className="w-full h-auto" loading="lazy" />
                </div>
              )
            )}
          </div>
        );
      })()}

      {/* Video (after images when videoAfterGallery) */}
      {project.projectVideo && project.videoAfterGallery && (
        <div className="mt-16 sm:mt-20">
          <ProjectVideo src={project.projectVideo} />
        </div>
      )}

      {/* Carousel */}
      {project.carouselImages && project.carouselImages.length > 0 && (
        <div className="mt-40 sm:mt-52 mb-16" ref={carouselRef}>
          {project.carouselStyle === "slideshow" ? (
            <SlideshowCarousel images={project.carouselImages} interval={1500} />
          ) : (
            <AutoScrollCarousel images={project.carouselImages} speed={2.5} />
          )}
        </div>
      )}
    </>
  );
}
