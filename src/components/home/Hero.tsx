import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { WavyBackground } from "../ui/background-wavy-effect";
import { FlipWords } from "../ui/flip-word-effect";
import { Spotlight } from "../ui/spotlight-effect";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  isDark: boolean;
}

const Hero = ({ isDark }: HeroProps) => {
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const handleCTA = () => {};

  useEffect(() => {
    const tl = gsap.timeline();

    if (line1Ref.current) {
      tl.fromTo(
        line1Ref.current,
        { x: -100, opacity: 0, filter: "blur(10px)" },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        },
      );
    }

    if (highlightRef.current) {
      tl.fromTo(
        highlightRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5",
      );
    }

    if (line2Ref.current) {
      tl.fromTo(
        line2Ref.current,
        { x: 100, opacity: 0, filter: "blur(10px)" },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.8",
      );
    }

    if (buttonRef.current) {
      tl.fromTo(
        buttonRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.3)" },
        "-=0.3",
      );
    }
  }, []);

  return (
    <section
      id="home"
      className={`relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4 transition-colors
        ${
          isDark
            ? "bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 text-white"
            : "bg-gradient-to-br from-white via-gray-50 to-neutral-100 text-black"
        }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 opacity-40">
        {/* Mobile / Tablet */}
        <div className="block lg:hidden">
          <Spotlight isDark={isDark} />
        </div>

        {/* Desktop */}
        <div className="hidden lg:block">
          <WavyBackground />
        </div>
      </div>

      <div className="text-center relative z-10">
        {/* Heading */}
        <div className="relative mb-6">
          {/* First line stays static */}
          <h1
            ref={line1Ref}
            className={`roboto-condensed text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9]
      ${isDark ? "text-white" : "text-neutral-900"}`}
          >
            TURN OPPURTUNITIES
          </h1>

          {/* Second line uses FlipWords */}
          <h1
            ref={line2Ref}
            className={`roboto-condensed text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9]
      ${isDark ? "text-white" : "text-neutral-900"}`}
          >
            <FlipWords
              words={["INTO PROFITS", "INTO IMPACT", "INTO WEALTH"]}
              holdDuration={8000}
              duration={1.1}
            />
            {/* optional: keep a colored span if needed */}
            {/* <span className="text-[#08CB00]">INTO PROFITS</span> */}
          </h1>
        </div>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`text-lg md:text-xl max-w-3xl mx-auto mb-9 font-light tracking-wide
            ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
        >
          Helping investors grow their capital through data-driven trading
          strategies, risk-managed investments, and consistent market analysis
          across stocks, forex, crypto, and indices.
        </motion.p>

        {/* CTA */}
        <button
          ref={buttonRef}
          onClick={handleCTA}
          className={`group relative px-8 py-4 rounded-full font-medium tracking-wide overflow-hidden transform transition-all duration-300 hover:scale-105
            ${isDark ? "bg-white text-black" : "bg-neutral-900 text-white"}`}
        >
          <a
            href="https://wa.me/13136396453"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10"
          >
            Let's Clear Your Doubts
          </a>
          <div className="absolute inset-0 bg-[#08CB00] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
