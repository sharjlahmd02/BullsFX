"use client";

import { InfiniteMovingCards } from "../ui/infinite-moving-card-effect";

interface TestimonialsProps {
  isDark: boolean;
}

const testimonials = [
  {
    quote:
      "Bulls FX has completely changed the way I invest. Their low-risk strategy gave me consistent monthly returns without stress.",
    name: "Ahmed R.",
    title: "Low Risk Investor",
  },
  {
    quote:
      "The medium risk plans are perfectly balanced. Transparent reporting and disciplined execution make Bulls FX stand out.",
    name: "Saad Khan",
    title: "Capital Growth Client",
  },
  {
    quote:
      "High-risk trading with Bulls FX is on another level. Professional execution, clear communication, and serious returns.",
    name: "Usman Ali",
    title: "High Risk Portfolio Holder",
  },
  {
    quote:
      "What I love most is trust. From onboarding to payouts, everything feels premium and well-managed.",
    name: "Hassan M.",
    title: "Long-Term Investor",
  },
];

const Testimonials = ({ isDark }: TestimonialsProps) => {
  return (
    <section
      id="testimonials"
      className={`py-24 transition-colors ${
        isDark ? "bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`h-0.5 w-14 mx-auto mb-8 ${
              isDark ? "bg-[#08CB00]" : "bg-neutral-900"
            }`}
          />
          <h2 className="text-4xl md:text-6xl font-light mb-6">
            Trusted by Investors
          </h2>
          <p
            className={`max-w-2xl mx-auto text-lg font-light ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Real experiences from clients investing across low, medium, and high
            risk portfolios.
          </p>
        </div>

        {/* Infinite Moving Cards */}
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="slow"
          pauseOnHover
          className={isDark ? "dark" : ""}
        />
      </div>
    </section>
  );
};

export default Testimonials;
