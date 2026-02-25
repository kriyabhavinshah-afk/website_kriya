"use client";

import { useState } from "react";
import Container from "@/components/Container";
import AnimatedSection from "@/components/AnimatedSection";
import { siteConfig } from "@/content/projects";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try emailing directly.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again or email directly.");
    }
  }

  return (
    <section
      className="relative z-10 py-24 sm:py-32 border-t border-border bg-background"
      aria-labelledby="contact-heading"
    >
      <Container>
        <AnimatedSection>
          <header className="mb-12 sm:mb-16">
            <h1
              id="contact-heading"
              className="font-open-sans text-3xl sm:text-4xl tracking-[0.08em] uppercase text-foreground"
            >
              Contact
            </h1>
            <p className="font-open-sans text-muted mt-4 text-base sm:text-lg max-w-xl">
              Let&apos;s connect. Reach out for collaborations, opportunities, or just to say hi.
            </p>
          </header>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="max-w-xl space-y-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="font-open-sans text-xs text-muted uppercase tracking-[0.2em]">
                Send a message
              </p>
              <div>
                <label htmlFor="contact-name" className="block font-open-sans text-sm text-foreground mb-2">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  disabled={status === "sending"}
                  className="w-full font-open-sans text-foreground bg-card border border-border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent disabled:opacity-60"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block font-open-sans text-sm text-foreground mb-2">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  disabled={status === "sending"}
                  className="w-full font-open-sans text-foreground bg-card border border-border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent disabled:opacity-60"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block font-open-sans text-sm text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  disabled={status === "sending"}
                  className="w-full font-open-sans text-foreground bg-card border border-border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent disabled:opacity-60 resize-y min-h-[120px]"
                  placeholder="Your message..."
                />
              </div>
              {status === "success" && (
                <p className="text-sm text-green-700 dark:text-green-400">
                  Thanks! Your message has been sent. I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-700 dark:text-red-400">
                  {errorMessage}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="font-open-sans text-base font-medium text-foreground bg-card border border-border hover:border-accent hover:text-accent transition-colors duration-200 px-6 py-4 rounded disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
            </form>

            <p className="font-open-sans text-xs text-muted uppercase tracking-[0.2em] pt-4">
              Or connect directly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center justify-center font-open-sans text-base font-medium text-foreground bg-card border border-border hover:border-accent hover:text-accent transition-colors duration-200 px-6 py-4 rounded"
              >
                Email me
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-open-sans text-base font-medium text-foreground bg-card border border-border hover:border-accent hover:text-accent transition-colors duration-200 px-6 py-4 rounded"
              >
                Message on LinkedIn
              </a>
            </div>
            <div className="pt-8 border-t border-border space-y-6">
              <div>
                <p className="font-open-sans text-xs text-muted uppercase tracking-[0.2em] mb-2">
                  Email
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-open-sans text-foreground hover:text-accent transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <p className="font-open-sans text-xs text-muted uppercase tracking-[0.2em] mb-2">
                  LinkedIn
                </p>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-open-sans text-foreground hover:text-accent transition-colors"
                >
                  linkedin.com/in/kriya-shah21
                </a>
              </div>
              <div>
                <p className="font-open-sans text-xs text-muted uppercase tracking-[0.2em] mb-2">
                  Location
                </p>
                <p className="font-open-sans text-foreground">
                  {siteConfig.location}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
