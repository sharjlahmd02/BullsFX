import { useState } from "react";
import { CalcStat } from "../ui/low-risk"; 

const formatPKR = (num: number) =>
  num.toLocaleString("en-PK", { maximumFractionDigits: 0 });

const ROICalculator = ({ plan, isDark }: any) => {
  const [amount, setAmount] = useState(plan.minInvestment);
  const [error, setError] = useState("");

  const avgROI = (plan.minROI + plan.maxROI) / 2;
  const monthlyProfit = (amount * avgROI) / 100;
  const sixMonthProfit = monthlyProfit * 6;

  const handleChange = (value: string) => {
    const num = Number(value.replace(/,/g, ""));

    if (isNaN(num)) return;

    if (num < plan.minInvestment || num > plan.maxInvestment) {
      setError(
        `Enter amount between ${formatPKR(
          plan.minInvestment
        )} and ${formatPKR(plan.maxInvestment)} PKR`
      );
    } else {
      setError("");
    }

    setAmount(num);
  };

  return (
    <div
      className={`rounded-3xl p-8 mt-10 transition-all
        ${
          isDark
            ? "bg-white/5 border border-white/10"
            : "bg-white border border-neutral-200"
        }
      `}
    >
      {/* Header */}
      <h3 className="text-2xl font-semibold mb-6">
        ROI Calculator
        <span className="text-[#08CB00]"> ({plan.level})</span>
      </h3>

      {/* Input */}
      <div className="mb-6">
        <label className="block mb-2 text-sm opacity-60">
          Enter Investment Amount (PKR)
        </label>
        <input
          type="text"
          value={amount.toLocaleString()}
          onChange={(e) => handleChange(e.target.value)}
          className={`w-full rounded-xl px-5 py-4 text-lg font-medium outline-none transition
            ${
              isDark
                ? "bg-neutral-900 border border-neutral-700 text-white focus:border-[#08CB00]"
                : "bg-neutral-50 border border-neutral-300 text-neutral-900 focus:border-[#08CB00]"
            }
          `}
        />
        {error && (
          <p className="text-sm mt-2 text-red-500">{error}</p>
        )}
      </div>

      {/* Results */}
      <div className="grid sm:grid-cols-3 gap-6 mt-8">
        <CalcStat
          label="Avg Monthly ROI"
          value={`${avgROI.toFixed(2)}%`}
        />
        <CalcStat
          label="Monthly Profit"
          value={`PKR ${formatPKR(monthlyProfit)}`}
          highlight
        />
        <CalcStat
          label="6 Month Estimate"
          value={`PKR ${formatPKR(sixMonthProfit)}`}
        />
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-xs opacity-50">
        * Returns are estimated based on historical strategy performance and
        market conditions. Capital is subject to risk.
      </p>
    </div>
  );
};

export default ROICalculator;
