import Link from "next/link";
import type { Project } from "@/content/projects";

interface NextPrevNavProps {
  next: Project | null;
  prev: Project | null;
}

export default function NextPrevNav({ next, prev }: NextPrevNavProps) {
  return (
    <nav
      className="border-t border-border mt-16 sm:mt-24 pt-8 sm:pt-12"
      aria-label="Project navigation"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 items-center">
        <div className="order-2 sm:order-1">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group flex flex-col"
            >
              <span className="text-xs text-muted uppercase tracking-wider">
                Previous
              </span>
              <span className="font-open-sans text-lg text-foreground mt-1 group-hover:text-accent transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </div>

        <div className="order-1 sm:order-2 flex justify-center">
          <Link
            href="/work"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            All Work
          </Link>
        </div>

        <div className="order-3 sm:text-right">
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group flex flex-col sm:items-end"
            >
              <span className="text-xs text-muted uppercase tracking-wider">
                Next
              </span>
              <span className="font-open-sans text-lg text-foreground mt-1 group-hover:text-accent transition-colors">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </nav>
  );
}
