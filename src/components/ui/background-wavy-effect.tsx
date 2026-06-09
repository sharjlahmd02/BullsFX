"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../libs/Utils";
import { createNoise3D } from "simplex-noise";

interface WavyBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  isDark?: boolean;
}

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth = 45,
  blur = 18,
  speed = "fast",
  waveOpacity = 0.45,
  isDark = false,
}: WavyBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noise = createNoise3D();

  let ctx: CanvasRenderingContext2D | null = null;
  let w = 0;
  let h = 0;
  let nt = 0;
  let animationId: number;

  const waveColors =
    colors ??
    (isDark
      ? [
          "#08CB00", // brand green
          "#22d3ee",
          "#818cf8",
          "#a855f7",
          "#14b8a6",
        ]
      : [
          "rgba(8,203,0,0.35)", // brand green soft
          "rgba(15,23,42,0.25)", // slate-900
          "rgba(59,130,246,0.28)", // blue
          "rgba(99,102,241,0.25)", // indigo
        ]);

  const getSpeed = () => (speed === "fast" ? 0.002 : 0.001);

  const resize = () => {
    if (!canvasRef.current) return;
    ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    w = canvasRef.current.width = window.innerWidth;
    h = canvasRef.current.height = window.innerHeight;
    ctx.filter = `blur(${isDark ? blur : blur - 6}px)`;
  };

  const drawWave = (count: number) => {
    if (!ctx) return;
    nt += getSpeed();

    for (let i = 0; i < count; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth;
      ctx.strokeStyle = waveColors[i % waveColors.length];

      ctx.shadowBlur = isDark ? 30 : 18;
      ctx.shadowColor = isDark
        ? waveColors[i % waveColors.length]
        : "rgba(0,0,0,0.15)";

      for (let x = 0; x < w; x += 6) {
        const y = noise(x / 1000, i * 0.4, nt) * 70;
        ctx.lineTo(x, y + h * 0.5);
      }

      ctx.stroke();
      ctx.closePath();
    }

    /*  Reset shadow for performance */
    ctx.shadowBlur = 0;
  };

  const render = () => {
    if (!ctx) return;

    /*  Background Handling */
    if (isDark) {
      ctx.globalAlpha = waveOpacity;
      ctx.fillStyle = "#020617"; // deep finance dark
      ctx.fillRect(0, 0, w, h);
    } else {
      ctx.clearRect(0, 0, w, h); // transparent in light mode
    }

    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [isDark]);

  /*  Safari Fix */
  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome"),
    );
  }, []);

  return (
    <div
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        containerClassName,
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={isSafari ? { filter: `blur(${blur}px)` } : undefined}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
