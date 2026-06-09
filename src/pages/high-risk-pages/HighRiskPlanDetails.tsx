import { useParams } from "react-router-dom";
import { highRiskPlans } from "../data/HighRiskPlans";
import ROICalculator from "../../components/low-risk/ROICalculator";

const HighRiskPlanDetail = ({ isDark }: { isDark: boolean }) => {
  const { level } = useParams();
  const plan = highRiskPlans.find((p) => p.id === level);

  if (!plan) return null;

  return (
    <section
      className={`pt-12 pb-28 ${
        isDark ? "bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <p className="uppercase tracking-widest text-sm opacity-50 mb-3">
            High Risk Investment Plan
          </p>
          <h1 className="text-5xl font-bold text-[#08CB00]">
            {plan.level} Tier
          </h1>
        </div>

        {/* Main Panel */}
        <div
          className={`rounded-[36px] p-12 mb-20 ${
            isDark
              ? "bg-white/5 border border-white/10"
              : "bg-white border border-neutral-200"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-10">
            <Detail label="Investment Range" value={plan.investment} />
            <Detail label="Expected Monthly Return" value={plan.profit} />
            <Detail label="Profit Distribution" value={plan.distribution} />
            <Detail label="Minimum Commitment" value={plan.duration} />
          </div>
        </div>

        {/* ROI Calculator */}
        <ROICalculator plan={plan} isDark={isDark} />

        {/* Risk Notes */}
        <div className="mt-16 max-w-3xl space-y-4 text-sm opacity-70">
          <p>• This is a high-risk, high-reward investment strategy.</p>
          <p>• 60% of trading losses are borne by the investor.</p>
          <p>• Early withdrawal incurs a 25% capital deduction.</p>
          <p>• Returns are market-dependent and not guaranteed.</p>
        </div>

        {/* CTA */}
        <div className="mt-20 flex flex-wrap gap-6">
          <a
            href="https://wa.me/13136396453"
            target="_blank"
            className="px-10 py-4 rounded-full border-2 border-[#08CB00]
              text-[#08CB00] font-medium transition
              hover:bg-[#08CB00] hover:text-black"
          >
            Apply via WhatsApp
          </a>

          <a
            href="https://drive.google.com/file/d/11uvmo2CS-eoDruPkMb7EQEUymqPC55ZU/view?usp=sharing"
            target="_blank"
            className={`px-10 py-4 rounded-full border transition cursor-pointer
              ${
                isDark
                  ? "border-white/20 hover:bg-white/10"
                  : "border-neutral-300 hover:bg-neutral-100"
              }
            `}
          >
            Download Agreement
          </a>
        </div>
      </div>
    </section>
  );
};

export default HighRiskPlanDetail;

/* Helper */
const Detail = ({ label, value }: any) => (
  <div>
    <p className="text-sm opacity-50 mb-2">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);
