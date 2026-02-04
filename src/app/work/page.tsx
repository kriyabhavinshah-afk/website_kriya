"use client";

import Link from "next/link";
import { projects } from "@/content/projects";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import AnimatedSection from "@/components/AnimatedSection";

export default function WorkPage() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="work-heading">
      <Container>
        <AnimatedSection>
          <SectionHeading id="work-heading" className="mb-12 sm:mb-16">
            Work
          </SectionHeading>
        </AnimatedSection>

        <div className="space-y-24 sm:space-y-32">
          {projects.map((project, i) => (
            <AnimatedSection key={project.slug} delay={i * 0.1}>
              <article
                className={`grid grid-cols-1 gap-8 lg:gap-12 ${
                  i % 2 === 1 ? "lg:grid-cols-12" : "lg:grid-cols-12"
                }`}
              >
                <div
                  className={`lg:col-span-7 ${
                    i % 2 === 1 ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <ProjectCard project={project} variant="work" index={i} />
                </div>
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    i % 2 === 1 ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Link href={`/work/${project.slug}`} className="group">
                    <h2 className="font-open-sans text-xl sm:text-2xl text-foreground group-hover:text-accent transition-colors">
                      {project.title}
                    </h2>
                  </Link>
                  <p className="text-muted mt-2">{project.descriptor}</p>
                  <p className="text-sm text-accent mt-2">{project.year}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-muted border border-border px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
