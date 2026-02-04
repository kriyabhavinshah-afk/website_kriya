"use client";

import Link from "next/link";
import PlaceholderImage from "./PlaceholderImage";
import type { Project } from "@/content/projects";

interface ProjectCardProps {
  project: Project;
  variant?: "home" | "work";
  index?: number;
}

export default function ProjectCard({ project, variant = "home", index = 0 }: ProjectCardProps) {
  const firstImage = project.gallery[0];
  const hasImage = firstImage?.src;
  const showInfoBelow = variant === "home";

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`View ${project.title} project`}
    >
      <article className={showInfoBelow ? "space-y-4" : ""}>
        {/* Image - LORE style: image-first, minimal frame */}
        <div
          className={`relative overflow-hidden bg-card ${
            showInfoBelow ? "aspect-[4/5]" : "aspect-[4/3]"
          }`}
        >
          {hasImage ? (
            <PlaceholderImage
              src={firstImage.src}
              alt={firstImage.alt || project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes={
                showInfoBelow
                  ? "(max-width: 768px) 100vw, 33vw"
                  : "(max-width: 1024px) 100vw, 58vw"
              }
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-card">
              <span className="text-muted text-sm">{project.title}</span>
            </div>
          )}
        </div>

        {/* Info below - LORE style (home only) */}
        {showInfoBelow && (
          <div>
            <h3 className="font-open-sans text-lg text-foreground group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-muted mt-0.5">{project.descriptor}</p>
            <p className="text-xs text-muted mt-1">{project.year}</p>
          </div>
        )}
      </article>
    </Link>
  );
}
