"use client";

import Container from "@/components/Container";
import AnimatedSection from "@/components/AnimatedSection";
import { siteConfig } from "@/content/projects";

export default function ContactPage() {
  return (
    <section
      className="relative z-10 py-24 sm:py-32 border-t border-border bg-background"
      aria-labelledby="contact-heading"
    >
      <Container>
        <AnimatedSection>
          <header className="mb-20 sm:mb-24">
            <h1
              id="contact-heading"
              className="font-open-sans text-3xl sm:text-4xl tracking-[0.08em] uppercase text-foreground"
            >
              Contact
            </h1>
            <p className="font-open-sans text-muted mt-4 text-base sm:text-lg">
              Let&apos;s connect.
            </p>
          </header>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="max-w-xl space-y-12">
            <div className="group">
              <p className="font-open-sans text-xs text-muted uppercase tracking-[0.2em] mb-3">
                Email
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-open-sans text-foreground text-lg hover:text-accent transition-colors duration-200"
              >
                {siteConfig.email}
              </a>
            </div>

            <div className="group">
              <p className="font-open-sans text-xs text-muted uppercase tracking-[0.2em] mb-3">
                LinkedIn
              </p>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-open-sans text-foreground text-lg hover:text-accent transition-colors duration-200"
              >
                linkedin.com/in/kriyashah
              </a>
            </div>

            <div>
              <p className="font-open-sans text-xs text-muted uppercase tracking-[0.2em] mb-3">
                Location
              </p>
              <p className="font-open-sans text-foreground text-lg">
                {siteConfig.location}
              </p>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
