/**
 * Project content - edit this file to add or update projects.
 * Add images to /public/projects/[slug]/ and reference them as /projects/[slug]/filename.jpg
 */

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  display?: "hero" | "large" | "largePlus" | "medium" | "mediumNarrow" | "small" | "compact";
  group?: string;
}

export type GalleryLayout = "default" | "editorial";

export interface Project {
  slug: string;
  title: string;
  descriptor: string;
  year: string;
  tags: string[];
  role: string;
  context: string;
  insight: string;
  strategy: string[];
  creativeDirection: string[];
  deliverables: string[];
  impact: string[];
  gallery: GalleryImage[];
  galleryLayout?: GalleryLayout;
  galleryOverlay?: { line1: string; line2: string };
  galleryOverlayRight?: { line1: string; line2: string };
  galleryNotes?: {
    forRow: number;
    header: string;
    lines: string[];
    alignToImage?: boolean;
    fontOptima?: boolean;
    bigger?: boolean;
    blacker?: boolean;
    moreSpacing?: boolean;
    fontStyle?: "note-image" | "note-muted";
  }[];
  galleryRowTitle?: { forRow: number; text: string };
  /** Optional title for the 3-tile video row (e.g. World of Hyatt "OOH - Subway Activation") */
  videoRowTitle?: string;
  /** Optional note/caption below the 3-tile video row */
  videoRowNote?: string;
  /** Optional phone-frame carousel (e.g. Instagram slides); shown above gallery when set */
  phoneCarousel?: { images: { src: string; alt: string }[] };
  credits?: string;
  externalLinks?: { label: string; url: string }[];
}

export const siteConfig = {
  name: "Kriya Shah",
  title: "Junior Art Director | Brand & Creative Strategist",
  oneLiner:
    "I build brand-led campaigns and creative systems through research, concept development, and visual storytelling.",
  heroLine1: "Brand-led campaigns and creative systems.",
  heroLine2: "Research, concept, visual storytelling. Familiar but new.",
  email: "kriya@example.com",
  linkedin: "https://linkedin.com/in/kriyashah",
  location: "Atlanta, GA",
  aboutPreview:
    "I work at the intersection of brand strategy and creative execution. My process starts with research and insight, then moves through concept development into visual systems that feel both considered and alive.",
};

export const projects: Project[] = [
  {
    slug: "thom-brown",
    title: "Thom Browne",
    descriptor: "Brand & Creative Concept",
    year: "2024",
    tags: ["Brand Strategy", "Creative Direction", "Visual Identity"],
    role: "Creative Strategist & Designer",
    context:
      "A brand and creative concept exploring the intersection of tradition and contemporary design. The project develops visual identity and campaign thinking for a distinctive aesthetic.",
    insight:
      "Modern luxury audiences seek brands that feel rooted in craft and heritage while speaking to the present moment. The opportunity lies in creating visual systems that feel both timeless and unexpected.",
    strategy: [
      "Establish a visual language that bridges classic and contemporary",
      "Develop brand pillars around craft, heritage, and bold simplicity",
      "Create imagery and layout systems that feel distinctive and memorable",
    ],
    creativeDirection: [
      "Use a restrained palette with moments of contrast and tension",
      "Develop typography and imagery that feels editorial and considered",
      "Design for flexibility across print, digital, and experiential touchpoints",
    ],
    deliverables: [
      "Brand concept and visual direction",
      "Process book and concept development",
      "Key visual assets and layout explorations",
    ],
    impact: [
      "Intended to demonstrate brand-building and creative concept development",
      "Shows ability to develop cohesive visual systems from insight to execution",
    ],
    galleryOverlay: {
      line1: "A Thom Browne Boutique",
      line2: "in Monaco",
    },
    galleryOverlayRight: {
      line1: "Situated in Monte Carlo's Carré d'Or, Monaco.",
      line2: "One of Europe's most concentrated luxury districts.",
    },
    galleryNotes: [
      {
        forRow: 2,
        header: "NOTE",
        lines: [
          "Designed for clarity and flow",
          "open sightlines guide movement",
          "balanced zones create calm…",
        ],
        fontStyle: "note-image",
      },
      {
        forRow: 3,
        header: "",
        lines: [
          "The interior design draws from Thom Browne's tailoring principles, using structure, proportion, and restraint as guiding elements. A neutral palette, architectural symmetry, and softened light create a space that feels composed, intentional, and quietly ceremonial.",
        ],
        alignToImage: true,
        fontStyle: "note-muted",
        moreSpacing: true,
      },
    ],
    galleryRowTitle: { forRow: 4, text: "Boutique Opening" },
    credits: "Kriya Shah | Komal Ganapathy | Aishwarya Goyal | Elizabeth Applewhite | Anvi Madan",
    gallery: [
      {
        src: "/projects/thom-brown/hero/thom-brown-hero.png",
        alt: "Thom Browne editorial collage hero",
        display: "small",
      },
      {
        src: "/projects/thom-brown/hero/thom-brown-hero-2.png",
        alt: "Thom Browne type-focused layout",
        display: "mediumNarrow",
      },
      {
        src: "/projects/thom-brown/hero/thom-brown-medium.png",
        alt: "Thom Browne bold typographic spread",
        display: "medium",
      },
      {
        src: "/projects/thom-brown/grids/thom-brown-grid-a-1.png",
        alt: "Thom Browne color story panel",
        display: "small",
        group: "grid-a",
      },
      {
        src: "/projects/thom-brown/grids/thom-brown-grid-a-2.png",
        alt: "Thom Browne layout detail",
        display: "small",
        group: "grid-a",
      },
      {
        src: "/projects/thom-brown/grids/thom-brown-grid-a-3.png",
        alt: "Thom Browne layered composition",
        display: "small",
        group: "grid-a",
      },
      {
        src: "/projects/thom-brown/grids/thom-brown-grid-b-1.png",
        alt: "Thom Browne narrative storyboard panel",
        display: "small",
        group: "grid-b",
      },
      {
        src: "/projects/thom-brown/grids/thom-brown-grid-b-2.png",
        alt: "Thom Browne photography-driven layout",
        display: "small",
        group: "grid-b",
      },
      {
        src: "/projects/thom-brown/grids/thom-brown-grid-b-3.png",
        alt: "Thom Browne palette exploration",
        display: "small",
        group: "grid-b",
      },
      {
        src: "/projects/thom-brown/process-book/thom-brown-process-book-1.jpg",
        alt: "Thom Browne process book spread 1",
        display: "largePlus",
      },
      {
        src: "/projects/thom-brown/process-book/thom-brown-process-book-2.jpg",
        alt: "Thom Browne process book spread 2",
        display: "largePlus",
      },
    ],
  },
  {
    slug: "world-of-hyatt",
    title: "World of Hyatt",
    descriptor: "Global Wellness Brand Concept",
    year: "2024",
    tags: ["Brand Strategy", "Identity", "Experience Design", "Research"],
    role: "Brand Strategist & Creative Lead",
    context:
      "Bond-sai is a global wellness brand concept positioned at the intersection of Eastern mindfulness and Western performance. The brief called for a brand that could scale across product, retail, and digital touchpoints while feeling cohesive and intentional.",
    insight:
      "Wellness consumers are fatigued by brands that promise transformation through products alone. The opportunity lies in brands that frame wellness as a practice and a community, not a transaction. Bond-sai reframes the category by emphasizing ritual, continuity, and quiet confidence rather than aspirational imagery.",
    strategy: [
      "Position Bond-sai as a practice-first wellness brand, not a product-first one",
      "Develop brand pillars around Ritual, Continuity, and Quiet Confidence",
      "Create a naming and verbal system that feels grounded and unhurried",
      "Design for touchpoints that span product packaging, retail environments, and digital experiences",
    ],
    creativeDirection: [
      "Establish a restrained visual language with a muted palette and generous whitespace",
      "Use typography as the primary identity anchor, with minimal graphic elements",
      "Develop a photography art direction that favors real moments over staged perfection",
      "Create a flexible grid system that adapts across formats without losing coherence",
    ],
    deliverables: [
      "Brand strategy deck and positioning framework",
      "Brand identity system (logo, color, typography, guidelines)",
      "Packaging concepts for core product line",
      "Retail environment concept and spatial guidelines",
      "Digital experience wireframes and key screen designs",
    ],
    impact: [
      "Intended as a concept piece to demonstrate brand-building from insight to execution",
      "Shows ability to develop end-to-end brand systems with a clear strategic thread",
      "Portfolio piece for wellness, lifestyle, and luxury-adjacent categories",
    ],
    galleryOverlay: {
      line1: "A World of Hyatt Experience",
      line2: "Find your JOMO.",
    },
    galleryOverlayRight: {
      line1: "Reimagining Hyatt's wellbeing experiences through the lens of JOMO.",
      line2: "",
    },
    galleryNotes: [
      {
        forRow: 2,
        header: "NOTE",
        lines: [
          "Grounded in research on Gen Z and Millennial travel behavior, the experience is designed for intentional rest, self-connection, and digital disconnection—responding to a growing shift toward JOMO-driven travel.",
        ],
        fontStyle: "note-image",
      },
      {
        forRow: 3,
        header: "",
        lines: [
          "The visual language draws from Bond-sai's pillars of Ritual, Continuity, and Quiet Confidence. A restrained palette, minimal graphic elements, and real moments over staged perfection create a brand that feels grounded, unhurried, and intentional.",
        ],
        alignToImage: true,
        fontStyle: "note-muted",
        moreSpacing: true,
      },
    ],
    galleryRowTitle: { forRow: 4, text: "Brand Identity" },
    videoRowTitle: "OOH - Subway Activation",
    videoRowNote:
      "Three signature wellbeing experiences anchor the campaign, offering distinct pathways to presence through movement, reflection, and connection.",
    credits: "Kriya Shah | Achal Agarwala | Zhiyin Lu | Chelsea Washington",
    phoneCarousel: {
      images: [
        { src: "/projects/world-of-hyatt/instagram/Instagram-01.png", alt: "World of Hyatt Instagram post 1" },
        { src: "/projects/world-of-hyatt/instagram/Instagram-02.png", alt: "World of Hyatt Instagram post 2" },
        { src: "/projects/world-of-hyatt/instagram/Instagram-03.png", alt: "World of Hyatt Instagram post 3" },
      ],
    },
    gallery: [
      {
        src: "/projects/world-of-hyatt/hero/posters.jpg",
        alt: "World of Hyatt posters",
        display: "largePlus",
      },
      {
        src: "/projects/world-of-hyatt/hero/bond-sai-hero-2.png",
        alt: "Bond-sai identity system",
        display: "mediumNarrow",
      },
      {
        src: "/projects/world-of-hyatt/grids/bond-sai-grid-b-1.jpg",
        alt: "Bond-sai retail concept",
        display: "small",
        group: "grid-b",
      },
      {
        src: "/projects/world-of-hyatt/grids/bond-sai-grid-b-2.jpg",
        alt: "Bond-sai digital experience",
        display: "small",
        group: "grid-b",
      },
      {
        src: "/projects/world-of-hyatt/grids/bond-sai-grid-b-3.jpg",
        alt: "Bond-sai product line",
        display: "small",
        group: "grid-b",
      },
      {
        src: "/projects/world-of-hyatt/process-book/bond-sai-process-book-1.jpg",
        alt: "Bond-sai process book spread 1",
        display: "largePlus",
      },
      {
        src: "/projects/world-of-hyatt/process-book/bond-sai-process-book-2.jpg",
        alt: "Bond-sai process book spread 2",
        display: "largePlus",
      },
    ],
  },
  {
    slug: "spill-the-chisme",
    title: "Spill the Chisme",
    descriptor: "Gen Z Campaign Concept",
    year: "2024",
    tags: [
      "Integrated Campaign",
      "Cultural Insight",
      "Social-First",
      "Activation",
    ],
    role: "Creative Strategist & Campaign Lead",
    context:
      "A campaign concept targeting Gen Z audiences around a beverage or lifestyle brand. The brief required cultural resonance, social-first thinking, and a clear path from insight to activation. Chisme (gossip) emerged as a cultural anchor that felt authentic and shareable.",
    insight:
      "Gen Z uses gossip as a social currency and a way to build belonging. The act of sharing news, rumors, and updates with friends is less about the content and more about the connection. Brands that can participate in these moments without feeling forced or performative can earn genuine attention.",
    strategy: [
      "Anchor the campaign in the cultural truth that sharing is bonding",
      "Position the brand as the facilitator of these moments, not the hero",
      "Design for shareability: formats, prompts, and experiences that invite participation",
      "Create a narrative arc from launch to sustained social presence",
    ],
    creativeDirection: [
      "Use a visual language that feels native to social: candid, textured, low-polish",
      "Develop a verbal system around phrases that Gen Z already uses and adapts",
      "Design activations that feel like events or moments, not ads",
      "Create flexible content buckets that can be iterated across platforms",
    ],
    deliverables: [
      "Campaign strategy and insight deck",
      "Creative concept and campaign narrative",
      "Social content framework and key asset concepts",
      "Activation concept (event, pop-up, or experience)",
      "Content calendar and launch timeline",
    ],
    impact: [
      "Intended to demonstrate cultural insight and integrated campaign thinking",
      "Shows ability to translate insight into social-first creative executions",
      "Portfolio piece for brands targeting younger demographics and social-led campaigns",
    ],
    gallery: [
      {
        src: "/placeholder.png",
        alt: "Spill the Chisme campaign hero",
        caption: "Campaign hero and key visual",
      },
      {
        src: "/placeholder.png",
        alt: "Spill the Chisme social content",
        caption: "Social content concepts and formats",
      },
    ],
  },
  {
    slug: "royal-van-lent-voyage",
    title: "Royal Van Lent Voyage",
    descriptor: "Luxury Experience Concept",
    year: "2024",
    tags: [
      "Luxury Brand DNA",
      "Curated Experience",
      "Guest Journey",
      "UHNW Audience",
    ],
    role: "Brand & Experience Strategist",
    context:
      "Royal Van Lent is a storied Dutch superyacht builder. This concept explores how to translate their heritage and craftsmanship into a curated guest journey and experience narrative. The audience is ultra-high-net-worth individuals who value discretion, quality, and meaningful experiences.",
    insight:
      "Luxury yacht ownership is often framed around the vessel. The shift is toward framing it around the life the vessel enables: the journeys, the moments, the freedom to move without compromise. Royal Van Lent's heritage of Dutch precision and quiet excellence is the foundation, but the story is about what happens when you step on board.",
    strategy: [
      "Reframe the brand narrative from product to experience and possibility",
      "Develop a guest journey that maps from first inquiry to ownership and beyond",
      "Create touchpoints that feel personal, not corporate",
      "Use language and imagery that communicates restraint and confidence",
    ],
    creativeDirection: [
      "Establish a visual language that reflects Dutch design: clean, precise, understated",
      "Use photography that captures atmosphere and detail over spectacle",
      "Develop materials that feel tactile and considered",
      "Design digital and physical touchpoints with consistent tone and restraint",
    ],
    deliverables: [
      "Brand narrative and positioning framework",
      "Guest journey map and key touchpoint strategy",
      "Experience concept for key moments (showroom, handover, at-sea)",
      "Brochure and collateral concept",
      "Digital experience concept for inquiry and discovery",
    ],
    impact: [
      "Intended to demonstrate luxury brand thinking and UHNW audience understanding",
      "Shows ability to work across physical and digital experience design",
      "Portfolio piece for luxury, marine, and high-end hospitality categories",
    ],
    gallery: [
      {
        src: "/placeholder.png",
        alt: "Royal Van Lent Voyage concept",
        caption: "Experience concept and key visual",
      },
      {
        src: "/placeholder.png",
        alt: "Guest journey and touchpoints",
        caption: "Guest journey and touchpoint mapping",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getNextProject(slug: string): Project | null {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1 || index === projects.length - 1) return null;
  return projects[index + 1];
}

export function getPrevProject(slug: string): Project | null {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index <= 0) return null;
  return projects[index - 1];
}
