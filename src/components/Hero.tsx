"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const setPlaybackRate = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 1.5;
    }
  }, []);

  if (reduceMotion) return null;

  return (
    <>
      {/* Full-viewport video - fixed, extends under header */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onLoadedMetadata={setPlaybackRate}
        className="fixed inset-0 w-full h-full object-cover z-0"
        aria-hidden
      >
        <source src="/hero-video.mov" type="video/quicktime" />
      </video>
      {/* Tagline always visible */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed inset-0 z-[5] flex items-center justify-center pointer-events-none"
      >
        <span className="font-open-sans text-2xl sm:text-3xl text-white">
          Creative Strategist.
        </span>
      </motion.div>
      {/* Spacer so content below has room to scroll */}
      <div className="relative z-10 h-screen" aria-hidden />
    </>
  );
}
