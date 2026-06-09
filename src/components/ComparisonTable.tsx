import { useState } from "react";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface InteractiveComparisonProps {
  isDark: boolean;
  plans: any[];
  riskLabel: string;      // "Low Risk", "Medium Risk", "High Risk"
  baseRoute: string;      // "/low-risk" | "/medium-risk" | "/high-risk"
}

const InteractiveComparison = ({
  isDark,
  plans,
  riskLabel,
  baseRoute,
}: InteractiveComparisonProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((p) => p !== id));
    } else if (selected.length < 2) {
      setSelected([...selected, id]);
    }
  };

  const selectedPlans = plans.filter((p) => selected.includes(p.id));

  return (
    <section className="mt-32">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="uppercase tracking-widest text-xs opacity-60 mb-3">
          Smart Comparison
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold">
          Compare Any Two Investment Plans
        </h2>
        <p className="mt-4 text-sm opacity-60">
          Select up to two tiers to view a detailed side-by-side comparison.
        </p>
      </div>

      {/* Plan Selector */}
      <div className="flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible">
        {plans.map((plan) => {
          const isSelected = selected.includes(plan.id);

          return (
            <button
              key={plan.id}
              onClick={() => toggleSelect(plan.id)}
              className={`min-w-[220px] lg:min-w-0 relative rounded-2xl p-6 text-left transition-all duration-300
                ${
                  isSelected
                    ? "border-[#08CB00] shadow-[0_0_20px_rgba(8,203,0,0.25)]"
                    : isDark
                    ? "border-white/10 hover:border-white/30"
                    : "border-neutral-200 hover:border-neutral-400"
                }
                ${isDark ? "bg-white/5" : "bg-white"}
                border
              `}
            >
              {/* Selected badge */}
              {isSelected && (
                <span className="absolute top-3 right-3 rounded-full bg-[#08CB00] p-1">
                  <Check size={14} className="text-black" />
                </span>
              )}

              <h3 className="text-lg font-semibold text-[#08CB00] mb-2">
                {plan.level}
              </h3>

              <p className="text-xs opacity-60">Monthly ROI</p>
              <p className="text-sm font-medium">{plan.profit}</p>
            </button>
          );
        })}
      </div>

      {/* Comparison Panel */}
      {selectedPlans.length === 2 && (
        <div
          className={`mt-24 rounded-[36px] p-12 transition-all
            ${
              isDark
                ? "bg-white/5 border border-white/10"
                : "bg-white border border-neutral-200 shadow-2xl"
            }
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-14">
            <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight">
              <span className="lg:hidden">Comparison</span>
              <span className="hidden lg:inline">Side-by-Side Comparison</span>
            </h3>

            <button
              onClick={() => setSelected([])}
              className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition"
            >
              <X size={18} />
              <span className="hidden lg:inline">Clear Selection</span>
            </button>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-14 lg:grid lg:grid-cols-2 lg:gap-10">
            {selectedPlans.map((plan) => (
              <div key={plan.id} className="flex flex-col">
                {/* Plan Card */}
                <div
                  className={`relative rounded-[28px] p-10 transition-all
                    ${
                      isDark
                        ? "bg-neutral-900/60 border border-white/10"
                        : "bg-neutral-50 border border-neutral-200"
                    }
                  `}
                >
                  <div className="mb-10">
                    <h4 className="text-2xl font-semibold text-[#08CB00]">
                      {plan.level} Plan
                    </h4>
                    <p className="text-sm opacity-60 mt-1">
                      {riskLabel} • Monthly Returns
                    </p>
                  </div>

                  <div className="space-y-8">
                    <CompareItem label="Investment Range" value={plan.investment} />
                    <CompareItem
                      label="Monthly ROI"
                      value={plan.profit}
                      highlight
                    />
                    <CompareItem
                      label="Profit Distribution"
                      value={plan.distribution}
                    />
                    <CompareItem
                      label="Minimum Commitment"
                      value={plan.duration}
                    />
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => navigate(`${baseRoute}/${plan.id}`)}
                  className={`mt-8 w-full py-3 rounded-3xl font-semibold transition-all duration-300
                    border-2 border-[#08CB00] text-[#08CB00]
                    ${
                      isDark
                        ? "hover:bg-[#08CB00] hover:text-black"
                        : "hover:bg-[#08CB00] hover:text-white"
                    }
                  `}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default InteractiveComparison;

/* ---------- Helper ---------- */
const CompareItem = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div>
    <p className="text-xs uppercase tracking-wider opacity-50 mb-2">{label}</p>
    <p className={`text-lg font-semibold ${highlight ? "text-[#08CB00]" : ""}`}>
      {value}
    </p>
  </div>
);
