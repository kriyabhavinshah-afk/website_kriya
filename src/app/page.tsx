import Link from "next/link";
import { projects, siteConfig } from "@/content/projects";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import Hero from "@/components/Hero";
import AnimatedSection from "@/components/AnimatedSection";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Selected Work - carousel, 3 visible at a time (1 on mobile) */}
      <section
        className="relative z-10 py-24 sm:py-32 border-t border-border bg-background"
        aria-labelledby="selected-work"
      >
        <Container>
          <AnimatedSection>
            <SectionHeading id="selected-work" className="mb-16 sm:mb-20">
              Selected Work
            </SectionHeading>
          </AnimatedSection>
          <ProjectsCarousel projects={projects} />
        </Container>
      </section>

      {/* About preview */}
      <section
        className="relative z-10 py-24 sm:py-32 border-t border-white/10 bg-black"
        aria-labelledby="about-preview"
      >
        <Container>
          <AnimatedSection>
            <div className="max-w-xl">
              <SectionHeading id="about-preview" className="mb-10 text-white">
                About
              </SectionHeading>
              <p className="text-white/80 text-[15px] leading-[1.7] tracking-wide">
                {siteConfig.aboutPreview}
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 mt-8 text-xs tracking-wider uppercase text-white hover:text-accent transition-colors"
              >
                Read more
                <span className="inline-block transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
