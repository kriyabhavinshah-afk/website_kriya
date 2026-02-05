import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getNextProject,
  getPrevProject,
  getProjectSlugs,
} from "@/content/projects";
import Image from "next/image";
import Container from "@/components/Container";
import Gallery from "@/components/Gallery";
import LeftOverlayHideAfter from "@/components/LeftOverlayHideAfter";
import NextPrevNav from "@/components/NextPrevNav";
import PhoneCarousel from "@/components/PhoneCarousel";
import AutoPlayVideoRow from "@/components/AutoPlayVideoRow";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | ${project.descriptor}`,
    description: project.context,
    openGraph: {
      title: project.title,
      description: project.descriptor,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const nextProject = getNextProject(slug);
  const prevProject = getPrevProject(slug);

  return (
    <article>
      {/* Gallery: when phoneCarousel set = first image (posters), then carousel, then rest; else full gallery */}
      {project.gallery.length > 0 || (project.phoneCarousel?.images.length ?? 0) > 0 ? (
        <section
          className={`relative z-10 pt-2 sm:pt-4 ${project.projectLayout === "hyatt" ? "pb-0" : "pb-16 sm:pb-24"}`}
          aria-labelledby="gallery-heading"
        >
          <Container>
            <h2 id="gallery-heading" className="sr-only">
              Gallery
            </h2>
            {project.phoneCarousel && project.phoneCarousel.images.length > 0 && project.gallery.length > 0 ? (
              <>
                {/* First image (e.g. posters.jpg) — centered, no top padding */}
                <div className="max-w-[52rem] mx-auto pt-0 pb-5 sm:pb-5 scroll-mt-20 sm:scroll-mt-24 snap-start">
                  <figure className="space-y-3 group py-2 overflow-visible">
                    <div className="relative aspect-[4/5] sm:aspect-[3/4] bg-transparent overflow-hidden transition-transform duration-300 ease-out group-hover:scale-[1.08]">
                      <Image
                        src={project.gallery[0].src}
                        alt={project.gallery[0].alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 832px) 100vw, 52rem"
                        unoptimized
                      />
                    </div>
                  </figure>
                </div>
                {/* Second: carousel (Instagram 1, 2, 3) — centered as before; right-side text absolutely positioned so carousel doesn't move */}
                <div className="mt-10 sm:mt-16 relative">
                  <div className="max-w-[1280px] mx-auto">
                    <PhoneCarousel images={project.phoneCarousel.images} />
                  </div>
                  {project.galleryOverlayRight?.line1 && (
                    <div className="absolute -right-32 sm:-right-24 top-[52%] -translate-y-1/2 w-[11rem] sm:w-[13rem] text-right pointer-events-none hidden lg:block pr-2">
                      <p className="font-open-sans text-xs sm:text-sm text-foreground/95 tracking-wide leading-snug">
                        {project.galleryOverlayRight.line1}
                      </p>
                    </div>
                  )}
                </div>
                {/* Left overlay (hyatt layout) — hides when this sentinel scrolls into view */}
                {project.galleryOverlay && (
                  <LeftOverlayHideAfter overlay={project.galleryOverlay} />
                )}
                {/* Note section right after carousel (first note was forRow 2 in full gallery) */}
                {project.galleryNotes?.find((n) => n.forRow === 2) && (() => {
                  const note = project.galleryNotes!.find((n) => n.forRow === 2)!;
                  return (
                    <div className="mt-20 sm:mt-28 mx-auto text-center max-w-md mb-52 sm:mb-80">
                      {note.header && (
                        <p className="font-open-sans text-xs sm:text-sm text-foreground/70 font-normal mb-6 tracking-widest uppercase">
                          {note.header}
                        </p>
                      )}
                      <div className="font-canela text-xl sm:text-2xl text-foreground font-semibold italic space-y-3 leading-relaxed">
                        {note.lines.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  );
                })()}
                {/* Three videos after note — autoplay (muted), loop while in view, pause when scrolled past */}
                {project.projectLayout === "hyatt" && project.videoRowSources && project.videoRowSources.length > 0 && (
                  <div className="mt-52 sm:mt-64">
                    {project.videoRowTitle && (
                      <p className="font-open-sans text-xs sm:text-sm text-foreground/70 tracking-[0.2em] uppercase font-light text-center">
                        {project.videoRowTitle}
                      </p>
                    )}
                    <AutoPlayVideoRow sources={project.videoRowSources} skipTopMargin={!!project.videoRowTitle} />
                    {project.videoRowNote && (
                      <p className="mt-16 sm:mt-20 mx-auto text-center max-w-xl font-canela text-lg sm:text-xl text-foreground/90 font-semibold italic leading-relaxed">
                        {project.videoRowNote}
                      </p>
                    )}
                    {/* Magazine image at end of hyatt layout */}
                    {project.magazineImage && (
                      <figure className="mt-4 sm:mt-6 mb-0 max-w-7xl mx-auto group">
                        <div className="relative aspect-[4/5] sm:aspect-[3/4] bg-transparent overflow-hidden transition-transform duration-300 ease-out group-hover:scale-[1.08]">
                          <Image
                            src={project.magazineImage.src}
                            alt={project.magazineImage.alt}
                            fill
                            className="object-contain"
                            sizes="(max-width: 1280px) 100vw, 80rem"
                            unoptimized
                          />
                        </div>
                      </figure>
                    )}
                  </div>
                )}
                {/* Rest of gallery — hidden for hyatt layout (3-tile row below videos removed) */}
                {project.gallery.length > 1 && project.projectLayout !== "hyatt" && (
                  <div className="mt-0">
                    <Gallery
                      images={project.gallery.slice(2)}
                      notes={project.galleryNotes?.filter((n) => n.forRow !== 2).map((n) => ({ ...n, forRow: n.forRow - 2 }))}
                      rowTitle={project.galleryRowTitle ? { ...project.galleryRowTitle, forRow: project.galleryRowTitle.forRow - 2 } : undefined}
                    />
                  </div>
                )}
              </>
            ) : (
              project.gallery.length > 0 && (
                <Gallery images={project.gallery} overlay={project.galleryOverlay} overlayHideAfterRow={project.overlayHideAfterRow} overlayRight={project.galleryOverlayRight} notes={project.galleryNotes} rowTitle={project.galleryRowTitle} />
              )
            )}
          </Container>
        </section>
      ) : null}

      {/* Project info and nav */}
      <section className="py-12 sm:py-16 bg-background border-t border-border">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
            <div>
              <h1 className="font-open-sans text-2xl sm:text-3xl text-foreground tracking-tight">
                {project.title}
              </h1>
              <p className="text-muted mt-2">{project.descriptor}</p>
              {project.credits && (
                <p className="font-open-sans text-sm text-foreground/60 mt-4">
                  {project.credits}
                </p>
              )}
            </div>
            <NextPrevNav next={nextProject} prev={prevProject} />
          </div>
        </Container>
      </section>
    </article>
  );
}
