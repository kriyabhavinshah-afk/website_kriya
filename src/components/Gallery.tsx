"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { GalleryImage } from "@/content/projects";

interface GalleryProps {
  images: GalleryImage[];
  overlay?: { line1: string; line2: string };
  /** Override left position class for overlay (e.g. left-16 sm:left-24) */
  overlayLeftClass?: string;
  overlayHideAfterRow?: number;
  overlayRight?: { line1: string; line2: string };
  /** Show right overlay when first row is in view (default: second row) */
  overlayRightShowFromFirst?: boolean;
  /** Hide right overlay when this row index comes into view (e.g. 2 = hide after second image) */
  overlayRightHideAfterRow?: number;
  /** Optional external ref for show sentinel (e.g. mood board section); when set, used instead of firstRowRef */
  overlayRightShowRef?: React.RefObject<HTMLDivElement | null>;
  compactBottom?: boolean;
  /** Tighter padding and note margins across the gallery */
  compactSpacing?: boolean;
  notes?: {
    forRow: number;
    header: string;
    lines: string[];
    alignToImage?: boolean;
    fontOptima?: boolean;
    bigger?: boolean;
    blacker?: boolean;
    moreSpacing?: boolean;
    tinyTopSpacing?: boolean;
    extraSpacing?: boolean;
    noSpacingBelow?: boolean;
    looserSpacingAfterNote?: boolean;
    fontStyle?: "note-image" | "note-muted";
  }[];
  rowTitle?: { forRow: number; text: string };
  rowTitles?: { forRow: number; text: string }[];
  className?: string;
}

type DisplaySize = "heroXX" | "heroX" | "hero" | "largeX" | "large" | "largePlus" | "medium" | "mediumNarrow" | "small" | "compact";

function GalleryItem({
  image,
  variant = "single",
  className = "",
  hoverScaleClass = "group-hover:scale-[1.04]",
  containerClass = "overflow-hidden",
  autoAspect = false,
}: {
  image: GalleryImage;
  variant?: "hero" | "single" | "grid";
  className?: string;
  hoverScaleClass?: string;
  containerClass?: string;
  autoAspect?: boolean;
}) {
  const [hasError, setHasError] = useState(false);

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

  if (autoAspect && variant !== "grid") {
    return (
      <figure className={`group overflow-visible ${className}`}>
        <div className={`${bgClass} ${containerClass} transition-transform duration-300 ease-out ${hoverScaleClass}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto"
            loading="lazy"
          />
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
          className="object-contain"
          sizes={
            variant === "grid"
              ? "(max-width: 640px) 100vw, 50vw"
              : "100vw"
          }
          unoptimized
          onError={() => setHasError(true)}
        />
      </div>
      {variant === "grid" && image.caption && (
        <p
          className={`font-open-sans text-xs sm:text-sm text-foreground/70 ${
            image.captionJustify ? "text-justify" : "text-center"
          }`}
        >
          {image.caption.includes(": ") ? (
            <>
              <span className="font-semibold text-foreground/90">
                {image.caption.slice(0, image.caption.indexOf(": "))}
              </span>
              <span className="font-light">
                {": " + image.caption.slice(image.caption.indexOf(": ") + 2)}
              </span>
            </>
          ) : (
            <span className="font-light">{image.caption}</span>
          )}
        </p>
      )}
    </figure>
  );
}

const widthByDisplay: Record<DisplaySize, string> = {
  heroXX: "max-w-7xl mx-auto",
  heroX: "max-w-6xl mx-auto",
  hero: "max-w-4xl mx-auto",
  largeX: "max-w-[54rem] mx-auto",
  large: "max-w-3xl mx-auto",
  largePlus: "max-w-[52rem] mx-auto",
  medium: "max-w-2xl mx-auto",
  mediumNarrow: "max-w-[40rem] mx-auto",
  small: "max-w-xl mx-auto",
  compact: "max-w-lg mx-auto",
};

const paddingByDisplay: Record<DisplaySize, string> = {
  heroXX: "py-8",
  heroX: "py-8",
  hero: "py-8",
  largeX: "py-5",
  large: "py-5",
  largePlus: "py-5",
  medium: "py-4",
  mediumNarrow: "py-4",
  small: "py-3",
  compact: "py-3",
};

const hoverScaleByDisplay: Record<DisplaySize, string> = {
  heroXX: "group-hover:scale-[1.08]",
  heroX: "group-hover:scale-[1.08]",
  hero: "group-hover:scale-[1.45]",
  largeX: "group-hover:scale-[1.08]",
  large: "group-hover:scale-[1.08]",
  largePlus: "group-hover:scale-[1.08]",
  medium: "group-hover:scale-[1.05]",
  mediumNarrow: "group-hover:scale-[1.045]",
  small: "group-hover:scale-[1.04]",
  compact: "group-hover:scale-[1.03]",
};

const containerByDisplay: Record<DisplaySize, string> = {
  heroXX: "overflow-hidden",
  heroX: "overflow-hidden",
  hero: "overflow-visible origin-center",
  largeX: "overflow-hidden",
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
  overlayLeftClass,
  overlayHideAfterRow,
  overlayRight,
  overlayRightShowFromFirst,
  overlayRightHideAfterRow,
  overlayRightShowRef,
  notes,
  rowTitle,
  rowTitles,
  compactBottom,
  compactSpacing,
  className = "",
}: GalleryProps) {
  const secondRowRef = useRef<HTMLDivElement | null>(null);
  const firstRowRef = useRef<HTMLDivElement | null>(null);
  const overlayRightHideSentinelRef = useRef<HTMLDivElement | null>(null);
  const overlayHideSentinelRef = useRef<HTMLDivElement | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [overlayRightVisible, setOverlayRightVisible] = useState(false);

  useEffect(() => {
    const el = overlayHideSentinelRef.current;
    if (!overlay || !el) return;
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
    if (!overlayRight) return;
    const useFirstAndHide = overlayRightShowFromFirst && overlayRightHideAfterRow !== undefined;
    if (useFirstAndHide) {
      const first = overlayRightShowRef?.current ?? firstRowRef.current;
      const hideSentinel = overlayRightHideSentinelRef.current;
      if (!first || !hideSentinel) return;
      let firstInView = false;
      let hideInView = false;
      const updateVisibility = () => {
        setOverlayRightVisible(firstInView && !hideInView);
      };
      const observerFirst = new IntersectionObserver(
        ([entry]) => {
          firstInView = entry.isIntersecting;
          updateVisibility();
        },
        { threshold: 0.2 }
      );
      const observerHide = new IntersectionObserver(
        ([entry]) => {
          hideInView = entry.isIntersecting;
          updateVisibility();
        },
        { threshold: 0.1 }
      );
      observerFirst.observe(first);
      observerHide.observe(hideSentinel);
      return () => {
        observerFirst.disconnect();
        observerHide.disconnect();
      };
    }
    if (!secondRowRef.current) return;
    const el = secondRowRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setOverlayRightVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [overlayRight, overlayRightShowFromFirst, overlayRightHideAfterRow, overlayRightShowRef]);

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

  const overlayHideSentinelRowIndex = overlayHideAfterRow ?? (rows.length >= 4 ? 3 : 2);

  if (images.length === 0) return null;

  return (
    <div className={`relative ${className}`} role="list">
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
      {overlayRight && (
        <div
          className={`pointer-events-none fixed right-20 sm:right-32 top-1/2 -translate-y-1/2 z-20 transition-opacity duration-300 max-w-[14rem] sm:max-w-[18rem] text-right ${
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
        const prevRowNote = notes?.find((n) => n.forRow === rowIndex - 1);
        const prevRowHasNoSpacingBelow = prevRowNote?.noSpacingBelow === true;
        const isLastRow = rowIndex === rows.length - 1;
        const reduceTop = (row.kind === "single" && row.image.reduceTopSpacing) || (row.kind === "group" && row.images[0]?.reduceTopSpacing);
        const compactTop = (row.kind === "single" && row.image.compactTopSpacing) || (row.kind === "group" && row.images[0]?.compactTopSpacing);
        const minimalTop = (row.kind === "single" && row.image.minimalTopSpacing) || (row.kind === "group" && row.images[0]?.minimalTopSpacing);
        const tightTop = (row.kind === "single" && row.image.tightTopSpacing) || (row.kind === "group" && row.images[0]?.tightTopSpacing);
        const tighterTop = (row.kind === "single" && row.image.tighterTopSpacing) || (row.kind === "group" && row.images[0]?.tighterTopSpacing);
        const extraTop = row.kind === "single" && row.image.extraTopSpacing;
        const baseSpacingClass =
          rowIndex === 0
            ? ""
            : tighterTop
              ? "-mt-[28rem] sm:-mt-[36rem]"
              : tightTop
              ? "-mt-96 sm:-mt-[28rem]"
              : reduceTop
                ? "mt-24 sm:mt-32"
                : compactTop
                  ? "mt-12 sm:mt-16"
                    : minimalTop
                    ? compactSpacing
                      ? "mt-6 sm:mt-8"
                      : "mt-36 sm:mt-48"
                    : extraTop
                    ? "mt-48 sm:mt-64"
                    : compactSpacing
                      ? "mt-12 sm:mt-16"
                      : "mt-72 sm:mt-[22.5rem]";
        const extraGroupSpacingClass =
          previousRow?.kind === "group" && row.kind === "group"
            ? "mt-72 sm:mt-[22.5rem]"
            : "";
        const prevRowLooserSpacing = prevRowNote?.looserSpacingAfterNote === true;
        let spacingClass =
          rowIndex === 0
            ? ""
            : prevRowHasNoSpacingBelow
              ? prevRowLooserSpacing
                ? "-mt-32 sm:-mt-40"
                : "-mt-96 sm:-mt-[28rem]"
              : extraGroupSpacingClass || baseSpacingClass;

        if (
          isLastRow &&
          row.kind === "single" &&
          previousRow?.kind === "single"
        ) {
          spacingClass = row.image.tightTopSpacing || row.image.tighterTopSpacing
            ? "-mt-[28rem] sm:-mt-[32rem]"
            : minimalTop
              ? "mt-4 sm:mt-6"
              : reduceTop
                ? "mt-24 sm:mt-32"
                : compactTop
                  ? "mt-12 sm:mt-16"
                  : "mt-72 sm:mt-[22.5rem]";
        }

        if (row.kind === "group") {
          const rowNote = notes?.find((n) => n.forRow === rowIndex);
          const title = rowTitles?.find((t) => t.forRow === rowIndex)?.text ?? (rowTitle?.forRow === rowIndex ? rowTitle.text : undefined);
          return (
            <div
              key={`group-${row.id}-${rowIndex}`}
              ref={(el) => {
                if (rowIndex === 0 && overlayRightShowFromFirst) firstRowRef.current = el;
                if (rowIndex === 1 && !overlayRightShowFromFirst) secondRowRef.current = el;
                if (rowIndex === overlayRightHideAfterRow) overlayRightHideSentinelRef.current = el;
                if (rowIndex === overlayHideSentinelRowIndex) overlayHideSentinelRef.current = el;
              }}
              role="listitem"
              className={`max-w-5xl mx-auto w-full ${spacingClass} scroll-mt-20 sm:scroll-mt-24 snap-start`}
            >
              {title && (
                <p className={`font-open-sans text-xs sm:text-sm text-foreground/70 tracking-[0.2em] uppercase font-light text-center ${compactSpacing ? "mb-6" : "mb-8"}`}>
                  {title}
                </p>
              )}
              <div className={`grid sm:grid-cols-3 ${compactSpacing ? "gap-4" : "gap-6"}`}>
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
                    rowNote.extraSpacing ? "mt-32 sm:mt-44" : rowNote.moreSpacing ? "mt-6 sm:mt-8" : rowNote.tinyTopSpacing ? "mt-3 sm:mt-4" : "mt-0"
                  } ${rowNote.noSpacingBelow ? "mb-0" : compactSpacing ? "mb-12 sm:mb-16" : "mb-20 sm:mb-28"} ${rowNote.alignToImage ? "max-w-5xl text-justify px-4" : "max-w-md"}`}
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
        const basePadding =
          compactSpacing && (display === "heroXX" || display === "heroX" || display === "hero")
            ? "py-1"
            : compactSpacing && ["largeX", "large", "largePlus", "medium", "mediumNarrow", "small", "compact"].includes(display)
              ? "py-1"
              : paddingByDisplay[display];
        const isCoverImage = row.image.caption?.toLowerCase() === "cover";
        let paddingClass =
          rowIndex === 0
            ? `${basePadding.replace("py-", "pt-0 pb-")} ${isCoverImage ? "pt-40 sm:pt-52" : ""}`
            : prevRowHasNoSpacingBelow
              ? basePadding.replace("py-", "pt-0 pb-")
              : basePadding;
        if (isLastRow && compactBottom && row.kind === "single") {
          paddingClass = paddingClass.replace(/\bpb-\S+/g, "pb-0");
        }
        const hoverClass = hoverScaleByDisplay[display];
        const containerClass = containerByDisplay[display];
        const variant = display === "hero" || display === "heroX" || display === "heroXX" ? "hero" : "single";
        const rowNote = notes?.find((n) => n.forRow === rowIndex);
        const isFirstRowWithOverlay = overlay && rowIndex === 0;

        return (
          <div
            key={`single-${rowIndex}`}
            ref={(el) => {
              if (rowIndex === 0 && overlayRightShowFromFirst) firstRowRef.current = el;
              if (rowIndex === 1 && !overlayRightShowFromFirst) secondRowRef.current = el;
              if (rowIndex === overlayRightHideAfterRow) overlayRightHideSentinelRef.current = el;
              if (rowIndex === overlayHideSentinelRowIndex) overlayHideSentinelRef.current = el;
            }}
            role="listitem"
            className={`${widthClass} ${paddingClass} ${spacingClass} scroll-mt-20 sm:scroll-mt-24 snap-start ${isFirstRowWithOverlay && overlayHideAfterRow !== 0 ? "pt-[20vh]" : ""}`}
          >
            <GalleryItem
              image={row.image}
              variant={variant}
              hoverScaleClass={row.image.noHover ? "group-hover:scale-100" : hoverClass}
              containerClass={containerClass}
              autoAspect={!!compactSpacing}
            />
            {rowNote && (
              <div
                className={`mx-auto text-center ${
                  rowNote.extraSpacing ? "mt-32 sm:mt-44" : rowNote.moreSpacing ? "mt-6 sm:mt-8" : rowNote.tinyTopSpacing ? "mt-3 sm:mt-4" : "mt-0"
                } ${rowNote.noSpacingBelow ? "mb-0" : compactSpacing ? "mb-12 sm:mb-16" : "mb-20 sm:mb-28"} ${rowNote.alignToImage ? "max-w-5xl text-justify px-4" : "max-w-md"}`}
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
      <div className={compactBottom ? "h-0" : "h-2 sm:h-4"} aria-hidden="true" />
    </div>
  );
}
