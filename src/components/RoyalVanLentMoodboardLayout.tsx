"use client";

import { useRef } from "react";
import Image from "next/image";
import type { Project } from "@/content/projects";
import Gallery from "@/components/Gallery";
import MoodBoard from "@/components/MoodBoard";

interface RoyalVanLentMoodboardLayoutProps {
  project: Project;
}

export default function RoyalVanLentMoodboardLayout({ project }: RoyalVanLentMoodboardLayoutProps) {
  const moodBoardRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {/* Cover + Mood board – centered in viewport when scrolled to */}
      <div className="min-h-screen flex flex-col items-center justify-center py-12 sm:py-16 scroll-mt-20 sm:scroll-mt-24 snap-center">
        <div className="max-w-xl mx-auto w-full flex-shrink-0">
          <figure className="space-y-3 group py-2 overflow-visible">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] bg-transparent overflow-hidden transition-transform duration-300 ease-out group-hover:scale-[1.04]">
              <Image
                src={project.gallery[0].src}
                alt={project.gallery[0].alt}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 36rem"
                unoptimized
              />
            </div>
          </figure>
        </div>
        <div
          ref={moodBoardRef}
          className="mt-20 sm:mt-24 w-full flex-shrink-0"
        >
          <p className="font-open-sans text-sm sm:text-base text-foreground/70 tracking-[0.2em] uppercase font-light mb-4 text-center">
            Mood Board
          </p>
          <MoodBoard images={project.moodboard!} altPrefix="Royal Van Lent mood board" />
        </div>
      </div>
      <div className="-mt-12 sm:-mt-16">
        <Gallery
          images={project.gallery.slice(1)}
          overlay={project.galleryOverlay}
          overlayHideAfterRow={0}
          overlayRight={project.galleryOverlayRight}
          overlayRightShowFromFirst={project.overlayRightShowFromFirst}
          overlayRightHideAfterRow={project.overlayRightHideAfterRow}
          overlayRightShowRef={moodBoardRef}
          notes={project.galleryNotes?.map((n) => ({ ...n, forRow: n.forRow - 1 })).filter((n) => n.forRow >= 0)}
          rowTitle={project.galleryRowTitle ? { ...project.galleryRowTitle, forRow: project.galleryRowTitle.forRow - 1 } : undefined}
          rowTitles={project.galleryRowTitles}
          compactBottom={project.compactBottom}
        />
      </div>
    </>
  );
}
