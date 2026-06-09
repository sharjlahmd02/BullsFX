import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { lowRiskPlans } from "../data/LowRiskPlans";
import ComparisonTable from "../../components/ComparisonTable";
import { Info, TrustPanel } from "../../components/ui/low-risk";
import InteractiveComparison from "../../components/ComparisonTable";

const LowRiskPlans = ({ isDark }: { isDark: boolean }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(500000);

  return (
    <section
      className={`pt-16 pb-28 ${
        isDark ? "bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 space-y-28">
        {/* HEADER */}
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Low-Risk Capital
              <span className="text-[#08CB00]"> Growth Plans</span>
            </h1>
            <p className="mt-6 text-lg opacity-70 max-w-xl">
              Professionally managed trading strategies designed for consistent
              monthly returns with controlled exposure.
            </p>
          </div>

          <TrustPanel isDark={isDark} />
        </div>

        {/* PLAN CARDS */}
        <div className="space-y-10">
          {lowRiskPlans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.id}
                onClick={() => navigate(`/low-risk/${plan.id}`)}
                className={`group cursor-pointer rounded-[32px] transition-all duration-500
                  ${isDark ? "bg-white/5" : "bg-white"}
                  hover:-translate-y-1 hover:shadow-xl
                `}
              >
                <div className="grid lg:grid-cols-5 gap-8 p-10">
                  {/* ICON + LEVEL */}
                  <div className="lg:col-span-1 space-y-3">
                    <Icon className="w-10 h-10 text-[#08CB00]" />
                    <h3 className="text-3xl font-semibold">{plan.level}</h3>
                  </div>

                  {/* DETAILS */}
                  <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6 text-sm">
                    <Info label="Investment Range" value={plan.investment} />
                    <Info label="Monthly Profit" value={plan.profit} />
                    <Info label="Distribution" value={plan.distribution} />
                    <Info label="Minimum Period" value={plan.duration} />
                  </div>

                  {/* CTA */}
                  <div className="lg:col-span-1 flex items-center justify-end">
                    <span className="opacity-60 group-hover:opacity-100 transition">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* COMPARISON TABLE */}
        <InteractiveComparison
          isDark={isDark}
          plans={lowRiskPlans}
          riskLabel="Low Risk"
          baseRoute="/low-risk"
        />
      </div>
    </section>
  );
};

export default LowRiskPlans;
