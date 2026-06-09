import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { homeInvestmentPlans } from "../../pages/data/HomeInvestPlans";

interface InvestmentPlansProps {
  isDark: boolean;
}

const InvestmentPlans = ({ isDark }: InvestmentPlansProps) => {
  const navigate = useNavigate();

  return (
    <section
      id="plans"
      className={`py-24 transition-colors
        ${
          isDark
            ? "bg-neutral-950 text-white"
            : "bg-neutral-50 text-neutral-900"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div
            className={`h-0.5 w-14 mx-auto mb-8 ${
              isDark ? "bg-[#08CB00]" : "bg-neutral-900"
            }`}
          />
          <h2 className="text-4xl md:text-6xl font-light mb-6">
            Investment Plans
          </h2>
          <p
            className={`max-w-2xl mx-auto text-lg font-light
              ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
          >
            Choose a plan that matches your trading goals and risk appetite.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {homeInvestmentPlans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate(plan.route)}
              className={`relative cursor-pointer rounded-3xl p-8 border transition-all
                ${
                  plan.highlighted
                    ? isDark
                      ? "border-[#08CB00] shadow-[0_0_15px_rgba(8,203,0,0.25)]"
                      : "border-neutral-700 shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                    : isDark
                      ? "border-neutral-800"
                      : "border-neutral-200"
                }
                ${isDark ? "bg-neutral-900" : "bg-white"}`}
            >
              {/* Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#08CB00] text-white px-5 py-1 rounded-full text-sm font-semibold">
                  Recommended
                </div>
              )}

              <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>

              <p
                className={`mb-6 text-sm
                  ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
              >
                {plan.description}
              </p>

              {/* Dynamic summary from real data */}
              <ul className="space-y-3 mb-8">
                {plan.highlights.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-[#08CB00]" size={18} />
                    <span
                      className={`text-sm
          ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => navigate(plan.route)}
                className={`w-full py-3 rounded-full font-medium transition-all
                  ${
                    plan.highlighted
                      ? "bg-[#08CB00] text-white hover:bg-black"
                      : isDark
                        ? "bg-white text-black hover:bg-[#08CB00] hover:text-white"
                        : "bg-neutral-900 text-white hover:bg-[#08CB00]"
                  }`}
              >
                View Plans
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentPlans;
