import Container from "@/components/Container";

export default function ResumePage() {
  return (
    <section className="py-16 sm:py-24 min-h-screen" aria-labelledby="resume-heading">
      <Container>
        <h1 id="resume-heading" className="sr-only">
          Resume
        </h1>
        {/* Mobile: inline PDF viewers are unreliable on iOS — show a direct link instead */}
        <div className="sm:hidden mb-8 flex flex-col items-center gap-4 text-center">
          <p className="text-muted text-sm">View or download the resume below.</p>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-open-sans text-base font-medium text-foreground bg-card border border-border hover:border-accent hover:text-accent transition-colors duration-200 px-6 py-4 rounded"
          >
            Open Resume PDF
          </a>
        </div>
        <div className="hidden sm:block w-full max-w-4xl mx-auto rounded-lg overflow-hidden border border-border bg-card shadow-sm bg-muted/30">
          <iframe
            src="/resume.pdf"
            title="Kriya Shah Resume"
            className="w-full border-0"
            style={{ height: "min(1800px, 200vh)" }}
          />
        </div>
      </Container>
    </section>
  );
}
