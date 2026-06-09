"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../libs/Utils";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  /* ------------------ Animation Setup ------------------ */
  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const scrollerContent = Array.from(scrollerRef.current.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scrollerRef.current?.appendChild(duplicatedItem);
    });

    setDirection();
    setSpeed();
    setStart(true);
  }, []);

  /* ------------------ Auto Pause When Off-Screen ------------------ */
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!containerRef.current) return;
        containerRef.current.style.animationPlayState =
          entry.isIntersecting ? "running" : "paused";
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const setDirection = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  };

  const setSpeed = () => {
    if (!containerRef.current) return;

    let duration = "80s";
    if (speed === "fast") duration = "25s";
    if (speed === "normal") duration = "50s";
    if (speed === "slow")
      duration = window.innerWidth < 640 ? "120s" : "80s";

    containerRef.current.style.setProperty(
      "--animation-duration",
      duration
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-6",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            key={item.name}
            className="
              relative
              w-[280px] sm:w-[320px] md:w-[450px]
              shrink-0 rounded-2xl
              border border-zinc-200 dark:border-zinc-700
              px-6 py-5 sm:px-7 sm:py-6 md:px-8 md:py-6

              /* Base background */
              bg-[linear-gradient(180deg,#fafafa,#f5f5f5)]
              dark:bg-[linear-gradient(180deg,#27272a,#18181b)]

              /* Subtle Bulls FX green accent */
              before:absolute before:inset-0
              before:rounded-2xl
              before:bg-[linear-gradient(135deg,rgba(8,203,0,0.08),transparent_60%)]
              dark:before:bg-[linear-gradient(135deg,rgba(8,203,0,0.12),transparent_60%)]
              before:pointer-events-none
            "
          >
            <blockquote className="relative z-10">
              <span className="block text-sm sm:text-[15px] leading-[1.6] text-neutral-800 dark:text-gray-100">
                {item.quote}
              </span>

              <div className="mt-6">
                <p className="text-sm font-medium text-neutral-700 dark:text-gray-300">
                  {item.name}
                </p>
                <p className="text-xs text-neutral-500 dark:text-gray-400">
                  {item.title}
                </p>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
