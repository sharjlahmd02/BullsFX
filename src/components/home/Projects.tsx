"use client";

import React from "react";
import { Carousel, Card } from "../ui/apple-card-slider";

interface ProjectsProps {
  isDark: boolean;
}

const projects = [
  {
    category: "Trading Systems",
    title: "Automated Trading Dashboard",
    src: "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1200",
    content: (
      <div className="space-y-6">
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">
          A real-time trading dashboard designed for monitoring open positions,
          drawdowns, capital exposure, and monthly ROI with absolute precision.
        </p>

        <div className="flex flex-wrap gap-2">
          {["Real-Time Data", "Analytics", "Risk Metrics"].map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full border border-[#08CB00]/30 text-[#08CB00]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    category: "Risk Control",
    title: "Risk Management Engine",
    src: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1200",
    content: (
      <p className="text-neutral-600 dark:text-neutral-400 text-lg">
        Dynamic risk allocation system that controls exposure, applies stop-loss
        logic, and protects investor capital across all market conditions.
      </p>
    ),
  },
  {
    category: "Investor Experience",
    title: "Secure Investor Portal",
    src: "https://images.pexels.com/photos/6802061/pexels-photo-6802061.jpeg?auto=compress&cs=tinysrgb&w=1200",
    content: (
      <p className="text-neutral-600 dark:text-neutral-400 text-lg">
        A private portal allowing investors to track plans, performance,
        distributions, and account activity securely in one place.
      </p>
    ),
  },
  {
    category: "Tools",
    title: "ROI Projection Calculator",
    src: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1200",
    content: (
      <p className="text-neutral-600 dark:text-neutral-400 text-lg">
        Interactive ROI projections helping investors estimate returns based on
        capital, plan type, and duration.
      </p>
    ),
  },
];

const Projects = ({ isDark }: ProjectsProps) => {
  const cards = projects.map((project, index) => (
    <Card key={project.title} card={project} index={index} />
  ));

  return (
    <section
      id="projects"
      className={`py-28 transition-colors ${
        isDark ? "bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Center Header */}
        <div className="text-center mb-20">
          <div
            className={`h-0.5 w-14 mx-auto mb-8 ${
              isDark ? "bg-[#08CB00]" : "bg-neutral-900"
            }`}
          />
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            Platform Capabilities
          </h2>
          <p
            className={`max-w-2xl mx-auto text-xl font-light ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Core systems powering Bulls FX — engineered for performance,
            transparency, and capital protection.
          </p>
        </div>

        {/* Apple Cards Carousel */}
        <Carousel items={cards} />
      </div>
    </section>
  );
};

export default Projects;
