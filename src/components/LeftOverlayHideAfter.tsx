"use client";

import { useEffect, useRef, useState } from "react";

interface LeftOverlayHideAfterProps {
  overlay: { line1: string; line2: string };
}

/** Renders the left overlay; hides when sentinel (after carousel) is in view. Reappears only when scrolled back up so sentinel is below viewport (not when past the note). */
export default function LeftOverlayHideAfter({ overlay }: LeftOverlayHideAfterProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(false);
        } else {
          const { top } = entry.boundingClientRect;
          // Only show when sentinel is below viewport (we're in top section). When past the note, sentinel is above (top < 0) so stay hidden.
          setVisible(top > (typeof window !== "undefined" ? window.innerHeight : 0));
        }
      },
      { threshold: 0.1, rootMargin: "-10% 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className={`pointer-events-none fixed left-8 sm:left-16 top-1/2 -translate-y-1/2 z-20 transition-opacity duration-300 max-w-[14rem] sm:max-w-[16rem] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      >
        <p className="font-open-sans text-xl sm:text-2xl font-medium text-foreground/95 tracking-wide leading-snug">
          {overlay.line1}
        </p>
        {overlay.line2 && (
          <p className="font-open-sans text-sm sm:text-base text-foreground/75 tracking-[0.2em] uppercase mt-2">
            {overlay.line2}
          </p>
        )}
      </div>
      <div ref={sentinelRef} className="h-px w-full shrink-0" aria-hidden />
    </>
  );
}
