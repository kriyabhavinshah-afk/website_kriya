"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/content/projects";

const navLinks = [
  { href: "/work", label: "Work", shade: "bg-neutral-500" },
  { href: "/about", label: "About", shade: "bg-neutral-600" },
  { href: "/contact", label: "Contact", shade: "bg-neutral-700" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isProjectPage = pathname.startsWith("/work/");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${isProjectPage ? "bg-white" : "bg-black"}`}
      role="banner"
      aria-label="Site header"
    >
      {/* Brand name - centered on viewport like Creative Strategist */}
      <Link
        href="/"
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-open-sans text-2xl sm:text-3xl transition-colors ${
          isProjectPage ? "text-black hover:text-black/90" : "text-white hover:text-white/90"
        }`}
        aria-label="Kriya Shah - Home"
      >
        {siteConfig.name}
      </Link>

      <nav
        className="max-w-wide mx-auto px-6 py-5 sm:py-6 flex items-center justify-end"
        aria-label="Main navigation"
      >
        {/* Right nav */}
        <div className="flex items-center justify-end">
          <ul className="hidden sm:flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-label={link.label}
                  className={`group flex h-6 items-center overflow-hidden ${link.shade} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    isProjectPage
                      ? "focus-visible:ring-black/30 focus-visible:ring-offset-white"
                      : "focus-visible:ring-white/50 focus-visible:ring-offset-black"
                  } ${
                    pathname === link.href ? "ring-1 ring-inset " + (isProjectPage ? "ring-black/20" : "ring-white/20") : "hover:brightness-110"
                  }`}
                >
                  <span className="flex h-6 w-6 shrink-0" aria-hidden />
                  <span className="flex min-w-0 max-w-0 overflow-hidden transition-[max-width] duration-300 ease-out group-hover:max-w-max">
                    <span className={`whitespace-nowrap pl-2 pr-3 py-1.5 text-sm font-medium tracking-wide opacity-0 -translate-x-1 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 ${
                      isProjectPage ? "text-black" : "text-white"
                    }`}>
                      {link.label}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <button
          type="button"
          className={`sm:hidden p-2 -mr-2 transition-colors ${isProjectPage ? "text-black/80 hover:text-black" : "text-white/80 hover:text-white"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">{mobileMenuOpen ? "Close" : "Menu"}</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`sm:hidden fixed inset-0 top-0 z-40 bg-background transition-opacity duration-200 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav
          className="flex flex-col items-center justify-center min-h-screen px-6"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-open-sans text-2xl text-foreground hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
