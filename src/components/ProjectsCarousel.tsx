"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/content/projects";

const GAP_REM = 1;
const VISIBLE = 3;

interface ProjectsCarouselProps {
  projects: Project[];
  className?: string;
}

export default function ProjectsCarousel({ projects, className = "" }: ProjectsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [stepPx, setStepPx] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const n = projects.length;

  // Measure viewport and compute one "step" (one card width + gap) so exactly 3 cards fit
  useEffect(() => {
    const updateStep = () => {
      const el = viewportRef.current;
      if (!el || n === 0) return;
      const gapPx = GAP_REM * 16;
      const viewportWidth = el.clientWidth;
      const cardWidth = (viewportWidth - (VISIBLE - 1) * gapPx) / VISIBLE;
      setStepPx(cardWidth + gapPx);
    };
    updateStep();
    const ro = new ResizeObserver(updateStep);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener("resize", updateStep);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateStep);
    };
  }, [n]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % n);
  }, [n]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + n) % n);
  }, [n]);

  useEffect(() => {
    if (n <= 1 || isPaused) return;
    const intervalId = window.setInterval(goNext, 4000);
    return () => window.clearInterval(intervalId);
  }, [n, isPaused, goNext]);

  if (n === 0) return null;

  const trackProjects = [...projects, ...projects];
  const trackN = trackProjects.length;
  const gapPx = GAP_REM * 16;
  const cardWidthPx = stepPx > 0 ? stepPx - gapPx : 0;
  const translatePx = -index * stepPx;
  const trackWidthPx = trackN * cardWidthPx + (trackN - 1) * gapPx;

  return (
    <div className={`mx-auto w-full max-w-6xl ${className}`}>
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            width: stepPx > 0 ? `${trackWidthPx}px` : "100%",
            gap: `${GAP_REM}rem`,
            transform: stepPx > 0 ? `translateX(${translatePx}px)` : undefined,
          }}
        >
          {trackProjects.map((project, i) => (
            <div
              key={`${project.slug}-${i}`}
              className="flex-shrink-0"
              style={{
                width: stepPx > 0 ? `${cardWidthPx}px` : undefined,
                minWidth: stepPx > 0 ? `${cardWidthPx}px` : undefined,
              }}
            >
              <ProjectCard project={project} variant="home" index={i} />
            </div>
          ))}
        </div>

        {n > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/95 p-2.5 text-foreground shadow-lg transition-colors hover:bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              aria-label="Previous projects"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/95 p-2.5 text-foreground shadow-lg transition-colors hover:bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              aria-label="Next projects"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
