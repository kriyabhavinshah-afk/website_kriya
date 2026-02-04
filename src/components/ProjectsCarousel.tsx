"use client";

import { useCallback, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/content/projects";

interface ProjectsCarouselProps {
  projects: Project[];
  className?: string;
}

export default function ProjectsCarousel({ projects, className = "" }: ProjectsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const n = projects.length;

  useEffect(() => {
    const updateVisible = () => {
      setVisibleCount(window.innerWidth >= 640 ? 3 : 1);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % n);
  }, [n]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + n) % n);
  }, [n]);

  useEffect(() => {
    if (n <= visibleCount || isPaused) return;
    const intervalId = window.setInterval(goNext, 4000);
    return () => window.clearInterval(intervalId);
  }, [n, visibleCount, isPaused, goNext]);

  if (n === 0) return null;

  // Duplicate projects so we can scroll from last back to first (infinite loop)
  const trackProjects = [...projects, ...projects];
  const trackN = trackProjects.length;
  const trackWidthPercent = (trackN / visibleCount) * 100;
  const cardWidthPercent = 100 / trackN;
  const translatePercent = -index * cardWidthPercent;

  return (
    <div
      className={`relative w-full overflow-hidden px-12 sm:px-14 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{
          width: `${trackWidthPercent}%`,
          transform: `translateX(${translatePercent}%)`,
        }}
      >
        {trackProjects.map((project, i) => (
          <div
            key={`${project.slug}-${i}`}
            className="flex-shrink-0 px-2 sm:px-3"
            style={{ width: `${cardWidthPercent}%` }}
          >
            <ProjectCard project={project} variant="home" index={i} />
          </div>
        ))}
      </div>

      {n > visibleCount && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/90 p-2 text-foreground shadow-md transition-colors hover:bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            aria-label="Previous projects"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/90 p-2 text-foreground shadow-md transition-colors hover:bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            aria-label="Next projects"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
