"use client";

import Image from "next/image";
import { useState } from "react";

interface PlaceholderImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
}

/**
 * Image component that shows a placeholder when the image fails to load.
 * Used in ProjectCard and Gallery for graceful handling of missing images.
 */
export default function PlaceholderImage({
  src,
  alt,
  fill = true,
  className = "",
  sizes = "100vw",
}: PlaceholderImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-card border border-border ${fill ? "absolute inset-0" : ""} ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="text-sm text-muted">Image unavailable</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      onError={() => setHasError(true)}
    />
  );
}
