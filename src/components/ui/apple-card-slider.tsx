"use client";

import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../libs/Utils"; // 
import { useOutsideClick } from "../../hooks/useOutsideCliclk"; 

/* ---------------- TYPES ---------------- */

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type CardType = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

/* ---------------- CONTEXT ---------------- */

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

/* ---------------- CAROUSEL ---------------- */

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollLeft = initialScroll;
    checkScrollability();
  }, [initialScroll]);

  const checkScrollability = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
  };

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  const handleCardClose = (index: number) => {
    if (!carouselRef.current) return;
    const cardWidth = window.innerWidth < 768 ? 230 : 384;
    const gap = window.innerWidth < 768 ? 16 : 32;
    carouselRef.current.scrollTo({
      left: (cardWidth + gap) * index,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          ref={carouselRef}
          onScroll={checkScrollability}
          className="flex w-full overflow-x-auto scroll-smooth py-12 md:py-20 [scrollbar-width:none]"
        >
          <div className="flex gap-6 pl-6 mx-auto max-w-7xl">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, ease: "easeOut" }}
                className="last:pr-[20vw]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-end gap-2 pr-6">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className="h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-800 disabled:opacity-40"
          >
            <IconArrowNarrowLeft className="mx-auto text-neutral-500" />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-800 disabled:opacity-40"
          >
            <IconArrowNarrowRight className="mx-auto text-neutral-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

/* ---------------- CARD ---------------- */

export const Card = ({
  card,
  index,
}: {
  card: CardType;
  index: number;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  useOutsideClick(ref, () => handleClose());

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50">
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              ref={ref}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative mx-auto mt-20 max-w-5xl rounded-3xl bg-white dark:bg-neutral-900 p-10 z-50"
            >
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 h-8 w-8 rounded-full bg-black dark:bg-white flex items-center justify-center"
              >
                <IconX className="text-white dark:text-black" />
              </button>

              <p className="text-sm text-neutral-500">{card.category}</p>
              <h3 className="mt-3 text-3xl md:text-5xl font-semibold">
                {card.title}
              </h3>

              <div className="mt-8">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Card Preview */}
      <button
        onClick={() => setOpen(true)}
        className="relative h-80 w-56 md:h-[40rem] md:w-96 rounded-3xl overflow-hidden bg-neutral-900"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent z-20" />
        <div className="relative z-30 p-8 text-left">
          <p className="text-sm text-white/80">{card.category}</p>
          <h3 className="mt-2 text-xl md:text-3xl font-semibold text-white">
            {card.title}
          </h3>
        </div>

        <BlurImage src={card.src} alt={card.title} />
      </button>
    </>
  );
};

/* ---------------- BLUR IMAGE ---------------- */

const BlurImage = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={cn(
        "absolute inset-0 h-full w-full object-cover transition duration-500",
        loaded ? "blur-0 scale-100" : "blur-lg scale-105",
      )}
    />
  );
};
