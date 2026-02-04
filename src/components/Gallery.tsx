"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { GalleryImage } from "@/content/projects";

interface GalleryProps {
  images: GalleryImage[];
  overlay?: { line1: string; line2: string };
  overlayRight?: { line1: string; line2: string };
  notes?: {
    forRow: number;
    header: string;
    lines: string[];
    alignToImage?: boolean;
    fontOptima?: boolean;
    bigger?: boolean;
    blacker?: boolean;
    moreSpacing?: boolean;
    fontStyle?: "note-image" | "note-muted";
  }[];
  rowTitle?: { forRow: number; text: string };
  className?: string;
}

type DisplaySize = "hero" | "large" | "largePlus" | "medium" | "mediumNarrow" | "small" | "compact";

function GalleryItem({
  image,
  variant = "single",
  className = "",
  hoverScaleClass = "group-hover:scale-[1.04]",
  containerClass = "overflow-hidden",
}: {
  image: GalleryImage;
  variant?: "hero" | "single" | "grid";
  className?: string;
  hoverScaleClass?: string;
  containerClass?: string;
}) {
  const [hasError, setHasError] = useState(false);

  const imgClass = "object-contain";
  const bgClass = "bg-transparent";

  const aspectClass =
    variant === "hero"
      ? "aspect-[4/5] sm:aspect-[3/4]"
      : variant === "grid"
        ? "aspect-[4/5]"
        : "aspect-[4/5] sm:aspect-[3/4]";

  if (hasError) {
    return (
      <figure className={`space-y-3 ${className}`}>
        <div
          className={`relative ${aspectClass} ${bgClass} flex items-center justify-center`}
          aria-label={image.alt}
        >
          <span className="text-sm text-muted">Image unavailable</span>
        </div>
      </figure>
    );
  }

  return (
    <figure className={`space-y-3 group py-2 overflow-visible ${className}`}>
      <div
        className={`relative ${aspectClass} ${bgClass} ${containerClass} transition-transform duration-300 ease-out ${hoverScaleClass}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className={imgClass}
          sizes={
            variant === "grid"
              ? "(max-width: 640px) 100vw, 50vw"
              : "100vw"
          }
          unoptimized
          onError={() => setHasError(true)}
        />
      </div>
    </figure>
  );
}

const widthByDisplay: Record<DisplaySize, string> = {
  hero: "max-w-4xl mx-auto",
  large: "max-w-3xl mx-auto",
  largePlus: "max-w-[52rem] mx-auto",
  medium: "max-w-2xl mx-auto",
  mediumNarrow: "max-w-[40rem] mx-auto",
  small: "max-w-xl mx-auto",
  compact: "max-w-lg mx-auto",
};

const paddingByDisplay: Record<DisplaySize, string> = {
  hero: "py-8",
  large: "py-5",
  largePlus: "py-5",
  medium: "py-4",
  mediumNarrow: "py-4",
  small: "py-3",
  compact: "py-3",
};

const hoverScaleByDisplay: Record<DisplaySize, string> = {
  hero: "group-hover:scale-[1.45]",
  large: "group-hover:scale-[1.08]",
  largePlus: "group-hover:scale-[1.08]",
  medium: "group-hover:scale-[1.05]",
  mediumNarrow: "group-hover:scale-[1.045]",
  small: "group-hover:scale-[1.04]",
  compact: "group-hover:scale-[1.03]",
};

const containerByDisplay: Record<DisplaySize, string> = {
  hero: "overflow-visible origin-center",
  large: "overflow-hidden",
  largePlus: "overflow-hidden",
  medium: "overflow-hidden",
  mediumNarrow: "overflow-hidden",
  small: "overflow-hidden",
  compact: "overflow-hidden",
};

type GalleryRow =
  | { kind: "single"; image: GalleryImage }
  | { kind: "group"; id: string; images: GalleryImage[] };

export default function Gallery({
  images,
  overlay,
  overlayRight,
  notes,
  rowTitle,
  className = "",
}: GalleryProps) {
  const secondRowRef = useRef<HTMLDivElement | null>(null);
  const thirdRowRef = useRef<HTMLDivElement | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [overlayRightVisible, setOverlayRightVisible] = useState(false);

  useEffect(() => {
    if (!overlay || !thirdRowRef.current) return;
    const el = thirdRowRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOverlayVisible(false);
        } else {
          const { top } = entry.boundingClientRect;
          setOverlayVisible(top > 0);
        }
      },
      { threshold: 0.1, rootMargin: "-10% 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [overlay]);

  useEffect(() => {
    if (!overlayRight || !secondRowRef.current) return;
    const el = secondRowRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setOverlayRightVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [overlayRight]);

  const rows = useMemo<GalleryRow[]>(() => {
    const result: GalleryRow[] = [];
    let index = 0;
    while (index < images.length) {
      const current = images[index];
      if (current.group) {
        const groupId = current.group;
        const grouped: GalleryImage[] = [];
        while (index < images.length && images[index].group === groupId) {
          grouped.push(images[index]);
          index += 1;
        }
        result.push({ kind: "group", id: groupId, images: grouped });
      } else {
        result.push({ kind: "single", image: current });
        index += 1;
      }
    }
    return result;
  }, [images]);

  if (images.length === 0) return null;

  return (
    <div className={`relative ${className}`} role="list">
      {overlay && (
        <div
          className={`pointer-events-none fixed left-8 sm:left-16 top-1/2 -translate-y-1/2 z-20 transition-opacity duration-300 max-w-[14rem] sm:max-w-[16rem] ${
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
      {overlayRight && (
        <div
          className={`pointer-events-none fixed right-20 sm:right-32 bottom-[25%] z-20 transition-opacity duration-300 max-w-[12rem] sm:max-w-[14rem] text-right ${
            overlayRightVisible ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        >
          <p className="font-open-sans text-xs sm:text-sm text-foreground/95 tracking-wide leading-snug">
            {overlayRight.line1}
          </p>
          {overlayRight.line2 && (
            <p className="font-open-sans text-xs sm:text-sm text-foreground/95 tracking-wide leading-snug mt-2">
              {overlayRight.line2}
            </p>
          )}
        </div>
      )}
      {rows.map((row, rowIndex) => {
        const previousRow = rowIndex > 0 ? rows[rowIndex - 1] : undefined;
        const isLastRow = rowIndex === rows.length - 1;
        const baseSpacingClass =
          rowIndex === 0 ? "" : "mt-36 sm:mt-48";
        const extraGroupSpacingClass =
          previousRow?.kind === "group" && row.kind === "group"
            ? "mt-64 sm:mt-80"
            : "";
        let spacingClass =
          rowIndex === 0
            ? ""
            : extraGroupSpacingClass || baseSpacingClass;

        if (
          isLastRow &&
          row.kind === "single" &&
          previousRow?.kind === "single"
        ) {
          spacingClass = "mt-4 sm:mt-6";
        }

        if (row.kind === "group") {
          const rowNote = notes?.find((n) => n.forRow === rowIndex);
          const title = rowTitle?.forRow === rowIndex ? rowTitle.text : undefined;
          return (
            <div
              key={`group-${row.id}-${rowIndex}`}
              ref={rowIndex === 1 ? secondRowRef : rowIndex === 2 ? thirdRowRef : undefined}
              role="listitem"
              className={`max-w-5xl mx-auto w-full ${spacingClass} scroll-mt-20 sm:scroll-mt-24 snap-start`}
            >
              {title && (
                <p className="font-open-sans text-xs sm:text-sm text-foreground/70 tracking-[0.2em] uppercase font-light mb-8 text-center">
                  {title}
                </p>
              )}
              <div className="grid gap-6 sm:grid-cols-3">
                {row.images.map((image, imageIndex) => (
                  <GalleryItem
                    key={`${row.id}-${imageIndex}`}
                    image={image}
                    variant="grid"
                    className="space-y-2"
                    hoverScaleClass={hoverScaleByDisplay.small}
                  />
                ))}
              </div>
              {rowNote && (
                <div
                  className={`mx-auto text-center ${
                    rowNote.moreSpacing ? "mt-6 sm:mt-8" : "mt-0"
                  } mb-20 sm:mb-28 ${rowNote.alignToImage ? "max-w-5xl text-justify px-4" : "max-w-md"}`}
                >
                  {rowNote.header && (
                    <p
                      className={`mb-6 tracking-widest uppercase ${
                        rowNote.fontStyle === "note-image"
                          ? "font-open-sans text-xs sm:text-sm text-foreground/70 font-normal"
                          : rowNote.fontOptima && rowNote.bigger && rowNote.blacker
                            ? "font-optima text-base sm:text-lg text-foreground font-bold"
                            : "font-open-sans text-xs sm:text-sm text-foreground/70 font-light"
                      }`}
                    >
                      {rowNote.header}
                    </p>
                  )}
                  <div
                    className={`space-y-3 leading-relaxed ${
                      rowNote.fontStyle === "note-image"
                        ? "font-canela text-xl sm:text-2xl text-foreground font-semibold italic"
                        : rowNote.fontStyle === "note-muted"
                          ? "font-open-sans text-base sm:text-lg text-foreground/70 font-normal"
                        : rowNote.fontOptima
                          ? rowNote.bigger && rowNote.blacker
                            ? "font-optima text-xl sm:text-2xl text-foreground font-semibold"
                            : "font-optima text-lg sm:text-xl text-foreground/95"
                          : "font-canela text-lg sm:text-xl text-foreground/90 font-light"
                    }`}
                  >
                    {rowNote.lines.map((line, i) => (
                      <p key={i} className={rowNote.alignToImage ? "text-justify" : ""}>{line}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        }

        const display = (row.image.display ?? "large") as DisplaySize;
        const widthClass = widthByDisplay[display];
        const basePadding = paddingByDisplay[display];
        const paddingClass = rowIndex === 0 ? basePadding.replace("py-", "pt-0 pb-") : basePadding;
        const hoverClass = hoverScaleByDisplay[display];
        const containerClass = containerByDisplay[display];
        const variant = display === "hero" ? "hero" : "single";
        const rowNote = notes?.find((n) => n.forRow === rowIndex);
        const isFirstRowWithOverlay = overlay && rowIndex === 0;

        return (
          <div
            key={`single-${rowIndex}`}
            ref={rowIndex === 1 ? secondRowRef : rowIndex === 2 ? thirdRowRef : undefined}
            role="listitem"
            className={`${widthClass} ${paddingClass} ${spacingClass} scroll-mt-20 sm:scroll-mt-24 snap-start ${isFirstRowWithOverlay ? "min-h-screen flex items-center" : ""}`}
          >
            <GalleryItem
              image={row.image}
              variant={variant}
              hoverScaleClass={hoverClass}
              containerClass={containerClass}
            />
            {rowNote && (
              <div
                className={`mx-auto text-center ${
                  rowNote.moreSpacing ? "mt-6 sm:mt-8" : "mt-0"
                } mb-20 sm:mb-28 ${rowNote.alignToImage ? "max-w-5xl text-justify px-4" : "max-w-md"}`}
              >
                {rowNote.header && (
                  <p
                    className={`mb-6 tracking-widest uppercase ${
                      rowNote.fontStyle === "note-image"
                        ? "font-open-sans text-xs sm:text-sm text-foreground/70 font-normal"
                        : rowNote.fontOptima && rowNote.bigger && rowNote.blacker
                          ? "font-optima text-base sm:text-lg text-foreground font-bold"
                          : "font-open-sans text-xs sm:text-sm text-foreground/70 font-light"
                    }`}
                  >
                    {rowNote.header}
                  </p>
                )}
                <div
                  className={`space-y-3 leading-relaxed ${
                    rowNote.fontStyle === "note-image"
                      ? "font-canela text-xl sm:text-2xl text-foreground font-semibold italic"
                      : rowNote.fontStyle === "note-muted"
                        ? "font-open-sans text-base sm:text-lg text-foreground/70 font-normal"
                      : rowNote.fontOptima
                        ? rowNote.bigger && rowNote.blacker
                          ? "font-optima text-xl sm:text-2xl text-foreground font-semibold"
                          : "font-optima text-lg sm:text-xl text-foreground/95"
                        : "font-canela text-lg sm:text-xl text-foreground/90 font-light"
                  }`}
                >
                  {rowNote.lines.map((line, i) => (
                    <p key={i} className={rowNote.alignToImage ? "text-justify" : ""}>{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
      <div className="h-2 sm:h-4" aria-hidden="true" />
    </div>
  );
}
