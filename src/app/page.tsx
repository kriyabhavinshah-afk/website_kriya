import Link from "next/link";
import { projects, siteConfig } from "@/content/projects";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import Hero from "@/components/Hero";
import AnimatedSection from "@/components/AnimatedSection";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Selected Work - LORE-style clean grid */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
            {projects.map((project, i) => (
              <AnimatedSection key={project.slug} delay={i * 0.08}>
                <ProjectCard project={project} variant="home" index={i} />
              </AnimatedSection>
            ))}
          </div>
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
