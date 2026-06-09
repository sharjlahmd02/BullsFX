"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../libs/Utils";

interface FlipWordsProps {
  words: string[];
  duration?: number;      // animation duration
  holdDuration?: number;  // how long word stays visible
  className?: string;
}


export const FlipWords = ({
  words,
  duration = 700,
  holdDuration = 3000, //  word stays for 3s
  className,
}: FlipWordsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, holdDuration);

    return () => clearTimeout(timer);
  }, [currentIndex, holdDuration, words.length]);

  const word = words[currentIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={word}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration, ease: "easeInOut" }}
        className={cn("inline-block relative", className)}
      >
        {word.split(" ").map((w, wi) => (
          <motion.span key={wi} className="inline-block">
            {w.split("").map((letter, li) => (
              <motion.span
                key={li}
                className="inline-block text-[#08CB00]"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{
                  delay: li * 0.03,
                  duration: 0.35,
                  ease: "easeOut",
                }}
              >
                {letter}
              </motion.span>
            ))}
            <span>&nbsp;</span>
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
