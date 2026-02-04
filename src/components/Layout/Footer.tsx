import Link from "next/link";
import { siteConfig } from "@/content/projects";

export default function Footer() {
  return (
    <footer
      className="relative z-10 border-t border-border mt-24 sm:mt-32 bg-background"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-content mx-auto px-6 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <div>
            <p className="font-open-sans text-lg text-foreground">{siteConfig.name}</p>
            <p className="text-sm text-muted mt-1">{siteConfig.title}</p>
          </div>

          <nav aria-label="Footer links">
            <ul className="flex flex-wrap gap-6 sm:gap-8">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <Link
                  href="/resume"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  Resume
                </Link>
              </li>
              <li>
                <Link
                  href="/reference"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  Reference
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="text-xs text-muted mt-8">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
