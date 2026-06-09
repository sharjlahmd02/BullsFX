"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../libs/Utils";

interface FAQProps {
  isDark: boolean;
}

const faqs = [
  {
    question: "How does Bulls FX trading work?",
    answer:
      "Bulls FX uses data-driven trading strategies focused on risk management and consistency. Our plans are designed to align with different investor goals and market conditions.",
  },
  {
    question: "Is my investment secure?",
    answer:
      "Yes. Capital protection and disciplined risk control are core priorities. We never expose accounts to unnecessary leverage or high-risk trades.",
  },
  {
    question: "What is the minimum investment amount?",
    answer:
      "The minimum investment depends on the selected plan. Each plan is structured to provide optimal performance within its capital range.",
  },
  {
    question: "Can I withdraw profits anytime?",
    answer:
      "Withdrawals are flexible and processed according to the selected plan's cycle. Transparency and accessibility are always maintained.",
  },
  {
    question: "Do you guarantee profits?",
    answer:
      "Trading involves risk. While no profits are guaranteed, our strategies aim for steady and controlled growth over time.",
  },
];

const FAQ = ({ isDark }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className={cn(
        "relative py-24 transition-colors duration-300",
        isDark ? "bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-900"
      )}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-[#08CB00] mb-3">
            Support
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p
            className={cn(
              "mt-4 text-sm md:text-base",
              isDark ? "text-neutral-400" : "text-neutral-600"
            )}
          >
            Everything you need to know about Bulls FX trading & investments.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={cn(
                  "rounded-2xl border backdrop-blur-md transition-all duration-300",
                  isDark
                    ? "bg-white/5 border-white/10 hover:border-[#08CB00]/40"
                    : "bg-white/70 border-neutral-200 hover:border-neutral-400 shadow-sm"
                )}
              >
                {/* Question */}
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-base md:text-lg">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={20}
                    className={cn(
                      "transition-transform duration-300",
                      isOpen && "rotate-180",
                      isDark ? "text-[#08CB00]" : "text-neutral-700"
                    )}
                  />
                </button>

                {/* Answer */}
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p
                      className={cn(
                        "px-6 pb-6 text-sm leading-relaxed",
                        isDark ? "text-neutral-400" : "text-neutral-600"
                      )}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div
          className={cn(
            "mt-14 text-center text-sm",
            isDark ? "text-neutral-400" : "text-neutral-600"
          )}
        >
          Still have questions?  
          <span className="text-[#08CB00] font-medium cursor-pointer ml-1 hover:underline">
            Contact our support team
          </span>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
