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
  const [isJumping, setIsJumping] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
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
    if (n <= 1) return;
    setIndex((i) => i + 1);
  }, [n]);

  const goPrev = useCallback(() => {
    if (n <= 1) return;
    setIndex((i) => i - 1);
  }, [n]);

  useEffect(() => {
    if (n <= 1 || isPaused) return;
    const intervalId = window.setInterval(goNext, 1500);
    return () => window.clearInterval(intervalId);
  }, [n, isPaused, goNext]);

  useEffect(() => {
    if (!initializedRef.current && n > 0) {
      setIsJumping(true);
      setIndex(n);
      initializedRef.current = true;
    }
  }, [n]);

  useEffect(() => {
    if (!isJumping) return;
    const id = requestAnimationFrame(() => setIsJumping(false));
    return () => cancelAnimationFrame(id);
  }, [isJumping]);

  if (n === 0) return null;

  const trackProjects = [...projects, ...projects, ...projects];
  const trackN = trackProjects.length;
  const gapPx = GAP_REM * 16;
  const cardWidthPx = stepPx > 0 ? stepPx - gapPx : 0;
  const translatePx = -index * stepPx;
  const trackWidthPx = trackN * cardWidthPx + (trackN - 1) * gapPx;

  const handleTransitionEnd = () => {
    if (n === 0) return;
    if (index >= n * 2) {
      setIsJumping(true);
      setIndex(index - n);
    } else if (index < n) {
      setIsJumping(true);
      setIndex(index + n);
    }
  };

  return (
    <div className={`mx-auto w-full max-w-6xl ${className}`}>
      <div className="relative w-full">
        <div
          ref={viewportRef}
          className="w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`flex ${isJumping ? "transition-none" : "transition-transform duration-500 ease-out"}`}
            onTransitionEnd={handleTransitionEnd}
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
        </div>

        {n > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute -left-10 top-1/2 z-10 -translate-y-1/2 p-1 text-foreground/70 transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              aria-label="Previous projects"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute -right-10 top-1/2 z-10 -translate-y-1/2 p-1 text-foreground/70 transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              aria-label="Next projects"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
