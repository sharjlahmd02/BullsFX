interface FAQPageProps {
  isDark: boolean;
}

const FAQPage = ({ isDark }: FAQPageProps) => {
  return (
    <section className="min-h-screen pt-20 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Frequently Asked <span className="text-[#08CB00]">Questions</span>
        </h1>

        <p
          className={`mb-12 max-w-2xl ${
            isDark ? "text-neutral-400" : "text-neutral-600"
          }`}
        >
          Everything you need to know about BullsFX trading, investments, and
          risk management.
        </p>

        <div className="space-y-4">
          {[
            {
              q: "Is BullsFX suitable for beginners?",
              a: "Yes. Our strategies are designed for both beginners and experienced traders with proper risk control.",
            },
            {
              q: "Do you guarantee profits?",
              a: "No trading platform can guarantee profits. We focus on consistency, discipline, and risk management.",
            },
            {
              q: "What markets do you trade?",
              a: "We primarily trade Forex, indices, and high-liquidity instruments.",
            },
            {
              q: "How do I get started?",
              a: "Choose an investment plan and follow our guided onboarding process.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 border backdrop-blur-md transition
              ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-neutral-200"
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">{item.q}</h3>
              <p
                className={`${
                  isDark ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
