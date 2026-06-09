"use client";
import { motion } from "framer-motion";
import AboutImage from '../assets/images/about-img.jpg'

interface AboutProps {
  isDark: boolean;
}

const About = ({ isDark }: AboutProps) => {
  const content = [
    {
      title: "Institutional-Grade Analysis",
      description:
        "Our trading app is built on institutional-style analysis, combining price action, liquidity zones, and volume profiling to identify high-probability trade setups with clarity and confidence.",
    },
    {
      title: "Advanced Risk Engine",
      description:
        "Every position is governed by a built-in risk framework that enforces position sizing, stop-loss discipline, and capital preservation — ensuring consistency across all market conditions.",
    },
    {
      title: "Real-Time Market Intelligence",
      description:
        "Stay ahead with real-time insights across forex, crypto, indices, and equities. Our system adapts dynamically to volatility, momentum shifts, and macro-driven movements.",
    },
    {
      title: "Performance-Driven Execution",
      description:
        "Designed for traders who value precision, the platform focuses on execution efficiency, trade tracking, and performance metrics rather than speculation or emotional decision-making.",
    },
    {
      title: "Long-Term Portfolio Growth",
      description:
        "This is not a signals app — it’s a professional trading environment built to compound capital steadily through disciplined strategy execution and continuous optimization.",
    },
  ];

  const stats = [
    { value: "6+", label: "Live Trading Strategies" },
    { value: "4+", label: "Market Segments" },
    { value: "98%", label: "Risk Discipline Score" },
  ];

  return (
    <section
      id="about"
      className={`mt-16 py-28 transition-colors ${
        isDark ? "bg-neutral-950 text-white" : "bg-white text-neutral-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-24">
          <h2 className="text-5xl md:text-6xl font-semibold mb-6">
            Trading With <span className="text-[#08CB00]">Precision</span>
          </h2>
          <p
            className={`text-lg ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            A disciplined investment approach focused on probability, risk
            control, and long-term capital growth.
          </p>
        </div>

        {/* Sticky Scroll Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Scroll Content */}
          <div className="space-y-24">
            {content.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-3xl font-light mb-4">{item.title}</h3>
                <p
                  className={`max-w-md ${
                    isDark ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right: Sticky Visual */}
          <div className="sticky top-28 hidden lg:block">
            <div
              className={`relative rounded-3xl overflow-hidden border ${
                isDark
                  ? "border-neutral-800 bg-neutral-900"
                  : "border-neutral-200 bg-neutral-100"
              }`}
            >
              <img
              src={AboutImage}
                alt="Trading Dashboard"
                className="w-full h-[420px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* Stats Section (Redesigned) */}
        <div
          className={`mt-32 rounded-3xl p-14 ${
            isDark ? "bg-black" : "bg-neutral-900"
          } text-white`}
        >
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="py-6 md:py-0">
                <div className="text-6xl font-a text-[#08CB00] mb-3">
                  {stat.value}
                </div>
                <p className="uppercase tracking-widest text-sm text-neutral-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
