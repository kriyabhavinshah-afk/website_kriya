import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

const references = [
  {
    title: "LORE Home",
    href: "/reference/lore-home.html",
    description: "LORE Fragrances homepage design",
  },
  {
    title: "LORE Fragrances Collection",
    href: "/reference/lore-fragrances.html",
    description: "Product collection page layout and styling",
  },
];

export default function ReferencePage() {
  return (
    <article className="py-16 sm:py-24">
      <Container>
        <header className="mb-16">
          <SectionHeading>Design Reference</SectionHeading>
          <p className="text-muted mt-4 max-w-xl">
            Saved reference pages used for design inspiration. Opens in same tab.
          </p>
        </header>

        <ul className="space-y-6">
          {references.map((ref) => (
            <li key={ref.href}>
              <a
                href={ref.href}
                target="_self"
                rel="noopener noreferrer"
                className="group block"
              >
                <span className="font-open-sans text-lg text-foreground group-hover:text-accent transition-colors">
                  {ref.title}
                </span>
                <span className="block text-sm text-muted mt-1">
                  {ref.description}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="inline-block mt-12 text-sm text-muted hover:text-foreground transition-colors"
        >
          Back to home
        </Link>
      </Container>
    </article>
  );
}
