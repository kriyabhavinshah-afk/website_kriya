"use client";

import { useRef, useState } from "react";

export default function ProjectVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  return (
    <div
      className="mt-4 sm:mt-5 mb-40 sm:mb-52 max-w-6xl mx-auto w-full px-2 sm:px-4"
      onMouseOver={() => videoRef.current?.play()}
      onMouseOut={() => videoRef.current?.pause()}
      onClick={() => {
        if (videoRef.current) {
          videoRef.current.muted = false;
          setSoundOn(true);
        }
      }}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full rounded"
        loop
        playsInline
        muted
        autoPlay
        style={{ pointerEvents: "none" }}
      />
      {!soundOn && (
        <p className="text-center text-xs sm:text-sm text-foreground/60 mt-2">
          Click for sound
        </p>
      )}
    </div>
  );
}
