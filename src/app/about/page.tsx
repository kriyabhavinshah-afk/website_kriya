"use client";

import Link from "next/link";
import Container from "@/components/Container";
import AnimatedSection from "@/components/AnimatedSection";
import { siteConfig } from "@/content/projects";

export default function AboutPage() {
  return (
    <article className="py-16 sm:py-24">
      <Container>
        <AnimatedSection>
          <header className="mb-16 sm:mb-20 max-w-2xl">
            <h1 className="font-open-sans text-3xl sm:text-4xl text-foreground tracking-tight">
              {siteConfig.name}
            </h1>
            <p className="text-muted text-lg mt-4">{siteConfig.title}</p>
          </header>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="max-w-2xl space-y-10 mb-20 sm:mb-24">
            <p className="text-muted text-[17px] leading-relaxed">
              I am Kriya Shah, a multidisciplinary brand professional with a background in Advertising and Branding and hands-on experience across campaigns, graphic design, and digital content. I have completed a Master&apos;s in Luxury Brand Management, and I&apos;m drawn to work that blends strategy with taste, where storytelling and design come together with clarity and intention.
            </p>
            <div>
              <p className="text-muted text-[17px] leading-relaxed mb-4">
                I&apos;m now looking for opportunities in:
              </p>
              <ul className="space-y-2 text-muted text-[17px] leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-accent shrink-0" aria-hidden="true">•</span>
                  Brand strategy and positioning
                </li>
                <li className="flex gap-3">
                  <span className="text-accent shrink-0" aria-hidden="true">•</span>
                  Creative development and campaign concepts
                </li>
                <li className="flex gap-3">
                  <span className="text-accent shrink-0" aria-hidden="true">•</span>
                  Experience-led brand building across touchpoints (digital, content, and presentation)
                </li>
              </ul>
            </div>
            <p className="text-muted text-[17px] leading-relaxed">
              Outside of work, I&apos;m a visual person and a quiet observer. I love fashion and editorial imagery, finding new cafés and bookstores, building playlists, and saving things that catch my eye, like a great film still, a strong street-style moment, or a beautifully designed space.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mt-16 sm:mt-20 pt-8 border-t border-border max-w-2xl">
            <nav aria-label="About page links" className="flex flex-wrap gap-x-8 gap-y-2">
              <Link href="/work" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Work
              </Link>
              <Link href="/resume" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Resume
              </Link>
              <Link href="/contact" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </AnimatedSection>
      </Container>
    </article>
  );
}
