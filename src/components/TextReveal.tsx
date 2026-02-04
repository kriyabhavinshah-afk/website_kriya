"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em] overflow-hidden"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.05,
            ease: [0.33, 1, 0.68, 1],
          }}
        >
          <span className="inline-block">{word}</span>
        </motion.span>
      ))}
    </span>
  );
}
