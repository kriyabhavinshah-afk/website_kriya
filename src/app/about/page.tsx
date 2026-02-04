"use client";

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import { siteConfig } from "@/content/projects";

const capabilities = {
  "Brand & Strategy": [
    "Brand Identity Development",
    "Campaign Strategy & Concepting",
    "Consumer & Cultural Insight Research",
    "Competitive & Market Analysis",
    "Brand Positioning Support",
    "User Experience Thinking",
    "Strategic Copywriting",
    "Creative Brief Development",
  ],
  "Creative & Design": [
    "Graphic Design",
    "Visual Communication",
    "Campaign Visual Development",
    "Art Direction Support",
    "Visual Storytelling",
    "Layout & Composition",
    "Brand Systems & Guidelines",
    "Logo Design",
    "Presentation Design & Storytelling",
    "Concept Pitching & Visual Narratives",
  ],
  Tools: [
    "Adobe Creative Suite (Illustrator, Photoshop, InDesign)",
    "Figma (Prototyping)",
    "Procreate",
    "ChatGPT (Creative Strategy Support, Brief Development, Ideation)",
    "Midjourney (Concept Visualization)",
  ],
};

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
          <div className="max-w-2xl space-y-12 mb-20 sm:mb-24">
          <p className="text-muted text-[17px] leading-relaxed">
            I work at the intersection of brand strategy and creative execution.
            My process starts with research and insight, then moves through
            concept development into visual systems that feel both considered
            and alive.
          </p>
          <p className="text-muted text-[17px] leading-relaxed">
            I am interested in brands that have something to say and audiences
            that want to listen. My work spans identity, campaigns, and
            experience design, with a focus on clarity, craft, and cultural
            resonance.
          </p>
          <p className="text-muted text-[17px] leading-relaxed">
            Currently pursuing a Master&apos;s in Luxury Brand Management
            (expected May 2026) with a background in Advertising & Branding. I
            am based in Atlanta and open to opportunities at ad agencies, brand
            teams, and luxury-adjacent companies.
          </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <section aria-labelledby="capabilities-heading">
          <SectionHeading id="capabilities-heading" className="mb-12">
            Capabilities
          </SectionHeading>
          <div className="space-y-12 max-w-2xl">
            {Object.entries(capabilities).map(([category, items]) => (
              <div key={category}>
                <h3 className="font-open-sans text-lg text-foreground mb-4">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="text-muted text-[15px] flex gap-3"
                    >
                      <span className="text-accent shrink-0" aria-hidden="true">
                        &bull;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="mt-16 sm:mt-20 pt-8 border-t border-border">
          <p className="text-sm text-muted">
            <strong className="text-foreground">Currently:</strong> Master&apos;s
            in Luxury Brand Management (Expected May 2026). Background in
            Advertising & Branding.
          </p>
          </div>
        </AnimatedSection>
      </Container>
    </article>
  );
}
