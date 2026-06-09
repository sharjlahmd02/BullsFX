import { useNavigate } from "react-router-dom";
import { mediumRiskPlans } from "../data/MedRiskPlans";
import ComparisonTable from "../../components/ComparisonTable";
import { Info, TrustPanel } from "../../components/ui/low-risk";
import InteractiveComparison from "../../components/ComparisonTable";

const MediumRiskPlans = ({ isDark }: { isDark: boolean }) => {
  const navigate = useNavigate();

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
              Medium-Risk
              <span className="text-[#08CB00]"> Growth Plans</span>
            </h1>
            <p className="mt-6 text-lg opacity-70 max-w-xl">
              Balanced trading strategies offering higher returns with moderate
              risk exposure.
            </p>
          </div>

          <TrustPanel isDark={isDark} />
        </div>

        {/* PLAN CARDS */}
        <div className="space-y-10">
          {mediumRiskPlans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.id}
                onClick={() => navigate(`/med-risk/${plan.id}`)}
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
          plans={mediumRiskPlans}
          riskLabel="Medium Risk"
          baseRoute="/medium-risk"
        />
      </div>
    </section>
  );
};

export default MediumRiskPlans;
