"use client";

import React, { useEffect, useRef } from "react";
import {
  BarChart3,
  ShieldCheck,
  TrendingUp,
  Lock,
  Cpu,
  Globe,
  Database,
  LineChart,
} from "lucide-react";

interface Props {
  isDark: boolean;
}

const systems = [
  { icon: TrendingUp, label: "Execution Engine" },
  { icon: ShieldCheck, label: "Risk Allocation" },
  { icon: BarChart3, label: "Market Analytics" },
  { icon: Cpu, label: "Trade Automation" },
  { icon: Database, label: "Capital Ledger" },
  { icon: Lock, label: "Secure Infrastructure" },
  { icon: Globe, label: "Global Liquidity" },
  { icon: LineChart, label: "Performance Metrics" },
];

const TradingInfrastructureRail = ({ isDark }: Props) => {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!railRef.current) return;

    let x = 0;
    const speed = window.innerWidth < 640 ? 0.25 : 0.45;

    const animate = () => {
      x -= speed;
      if (Math.abs(x) >= railRef.current!.scrollWidth / 2) {
        x = 0;
      }
      railRef.current!.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <section
      className={`relative py-24 overflow-hidden ${
        isDark ? "bg-neutral-950" : "bg-neutral-50"
      }`}
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#08CB00]/5 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div
            className={`h-0.5 w-14 mx-auto mb-8 ${
              isDark ? "bg-[#08CB00]" : "bg-neutral-900"
            }`}
          />
          <h2 className="text-4xl md:text-6xl font-light">
            Trading Infrastructure
          </h2>
          <p
            className={`mt-4 text-lg font-light max-w-2xl mx-auto ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Institutional-grade systems powering every Bulls FX portfolio
          </p>
        </div>

        {/* Rail Container */}
        <div
          className={`relative h-40 rounded-[32px] overflow-hidden border ${
            isDark
              ? "bg-neutral-900/60 border-white/10"
              : "bg-white border-neutral-200"
          } backdrop-blur-xl`}
        >
          {/* Moving Rail */}
          <div
            ref={railRef}
            className="absolute inset-y-0 left-0 flex items-center gap-8 px-10"
          >
            {[...systems, ...systems].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`
                    group flex items-center gap-4
                    px-6 py-4 rounded-2xl
                    border
                    ${
                      isDark
                        ? "bg-white/5 border-white/10"
                        : "bg-neutral-50 border-neutral-200"
                    }
                  `}
                >
                  {/* Icon */}
                  <div
                    className={`
                      w-11 h-11 rounded-xl flex items-center justify-center
                      ${
                        isDark
                          ? "bg-[#08CB00]/15 text-[#08CB00]"
                          : "bg-[#08CB00]/10 text-[#08CB00]"
                      }
                    `}
                  >
                    <Icon size={20} />
                  </div>

                  {/* Text */}
                  <span
                    className={`text-sm font-medium tracking-wide ${
                      isDark ? "text-neutral-300" : "text-neutral-700"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Signal Dot */}
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#08CB00] opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#08CB00]" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradingInfrastructureRail;
