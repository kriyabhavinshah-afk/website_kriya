const RESUME_URL = "https://drive.google.com/file/d/10JPLCRXHJLrUBsDBFy1iycYz65qFjli_";

export default function ResumePage() {
  return (
    <div className="flex flex-col bg-background" style={{ paddingTop: "4.5rem", height: "100dvh" }}>
      {/* Toolbar */}
      <div className="shrink-0 border-b border-border px-4 sm:px-6 flex items-center justify-between" style={{ height: "2.75rem" }}>
        <h1 className="font-open-sans text-xs tracking-[0.15em] uppercase text-foreground/60">
          Resume
        </h1>
        <a
          href={`${RESUME_URL}/view?usp=sharing`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-open-sans text-xs text-muted hover:text-foreground transition-colors inline-flex items-center gap-1.5"
        >
          Open in Google Drive
          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* Mobile: tap-to-open */}
      <div className="sm:hidden flex-1 flex flex-col items-center justify-center gap-5 px-4">
        <p className="font-open-sans text-sm text-muted text-center max-w-xs">
          Tap below to view the resume in Google Drive.
        </p>
        <a
          href={`${RESUME_URL}/view?usp=sharing`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-open-sans text-sm font-medium text-foreground bg-card border border-border hover:border-accent hover:text-accent transition-colors duration-200 px-6 py-3 rounded"
        >
          Open Resume →
        </a>
      </div>

      {/* Desktop: full-height iframe */}
      <div className="hidden sm:block flex-1 min-h-0">
        <iframe
          src={`${RESUME_URL}/preview`}
          title="Kriya Shah Resume"
          className="w-full h-full border-0 block"
          allow="autoplay"
        />
      </div>
    </div>
  );
}
