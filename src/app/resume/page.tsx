import Container from "@/components/Container";

export default function ResumePage() {
  return (
    <section className="py-16 sm:py-24 min-h-screen" aria-labelledby="resume-heading">
      <Container>
        <h1 id="resume-heading" className="sr-only">
          Resume
        </h1>
        <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden border border-border bg-card shadow-sm bg-muted/30">
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
