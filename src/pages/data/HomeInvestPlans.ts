import { lowRiskPlans } from "./LowRiskPlans";
import { mediumRiskPlans } from "./MedRiskPlans";
import { highRiskPlans } from "./HighRiskPlans";

export const homeInvestmentPlans = [
  {
    name: "Low Risk",
    route: "/low-risk-plan",
    description:
      "Capital-preserving strategies designed for steady, predictable monthly returns.",
    highlighted: false,
    plans: lowRiskPlans,

    highlights: [
      "ROI up to 9.5% monthly",
      "Lower drawdown exposure",
      "Ideal for first-time investors",
      "Capital protection focused",
    ],
  },

  {
    name: "Medium Risk",
    route: "/med-risk-plan",
    description:
      "Optimized balance between risk and reward using diversified trading models.",
    highlighted: true, 
    plans: mediumRiskPlans,

    highlights: [
      "Higher ROI than Low Risk",
      "Partial capital hedging",
      "Active trade management",
      "Best risk-to-reward ratio",
    ],
  },

  {
    name: "High Risk",
    route: "/high-risk-plan",
    description:
      "Aggressive market exposure built for investors targeting maximum growth.",
    highlighted: false,
    plans: highRiskPlans,

    highlights: [
      "ROI up to 16% monthly",
      "Advanced leverage strategies",
      "Professional-grade execution",
      "High volatility, high reward",
    ],
  },
];
