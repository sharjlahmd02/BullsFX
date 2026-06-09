"use client";
import React from "react";
import { motion } from "motion/react";

type SpotlightProps = {
  isDark?: boolean;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
};

export const Spotlight = ({
  isDark = true,
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
}: SpotlightProps) => {
  const gradients = isDark
    ? {
        first:
          "radial-gradient(68% 68% at 55% 30%, rgba(8,203,0,0.12) 0%, rgba(8,203,0,0.05) 45%, transparent 75%)",
        second:
          "radial-gradient(50% 50% at 50% 50%, rgba(8,203,0,0.08) 0%, transparent 80%)",
        third:
          "radial-gradient(50% 50% at 50% 50%, rgba(8,203,0,0.05) 0%, transparent 85%)",
      }
    : {
        first:
          "radial-gradient(68% 68% at 55% 30%, rgba(8,203,0,0.18) 0%, rgba(8,203,0,0.08) 45%, transparent 75%)",
        second:
          "radial-gradient(50% 50% at 50% 50%, rgba(8,203,0,0.12) 0%, transparent 80%)",
        third:
          "radial-gradient(50% 50% at 50% 50%, rgba(8,203,0,0.08) 0%, transparent 85%)",
      };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {/* LEFT SWEEP */}
      <motion.div
        animate={{ x: [0, xOffset, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-screen h-screen z-40"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            background: gradients.first,
            width,
            height,
          }}
          className="absolute top-0 left-0"
        />

        <div
          style={{
            transform: "rotate(-45deg) translate(5%, -50%)",
            background: gradients.second,
            width: smallWidth,
            height,
          }}
          className="absolute top-0 left-0 origin-top-left"
        />

        <div
          style={{
            transform: "rotate(-45deg) translate(-180%, -70%)",
            background: gradients.third,
            width: smallWidth,
            height,
          }}
          className="absolute top-0 left-0 origin-top-left"
        />
      </motion.div>

      {/* RIGHT SWEEP */}
      <motion.div
        animate={{ x: [0, -xOffset, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-screen h-screen z-40"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(45deg)`,
            background: gradients.first,
            width,
            height,
          }}
          className="absolute top-0 right-0"
        />

        <div
          style={{
            transform: "rotate(45deg) translate(-5%, -50%)",
            background: gradients.second,
            width: smallWidth,
            height,
          }}
          className="absolute top-0 right-0 origin-top-right"
        />

        <div
          style={{
            transform: "rotate(45deg) translate(180%, -70%)",
            background: gradients.third,
            width: smallWidth,
            height,
          }}
          className="absolute top-0 right-0 origin-top-right"
        />
      </motion.div>
    </motion.div>
  );
};
