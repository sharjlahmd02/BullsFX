import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

import Home from "./pages/Home";
import FAQPage from "./pages/FAQPage";
import LowRiskPlan from "./pages/low-risk-pages/LowRiskPlan";
import LowRiskPlanDetail from "./pages/low-risk-pages/LowRiskPlanDetails";
import HighRiskPlans from "./pages/high-risk-pages/HighRiskPlan";
import HighRiskPlanDetail from "./pages/high-risk-pages/HighRiskPlanDetails";
import MediumRiskPlanDetail from "./pages/med-risk-pages/MedRiskPlanDetails";
import MediumRiskPlans from "./pages/med-risk-pages/MedRiskPlan";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  //  Default DARK theme
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("isDark");
      return savedTheme !== null ? savedTheme === "true" : true;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem("isDark", isDark.toString());
  }, [isDark]);

  const sectionRefs = useRef<{ [key: string]: IntersectionObserverEntry }>({});

  useEffect(() => {
    const sections = ["home", "about", "projects", "plans", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionRefs.current[entry.target.id] = entry;
        });

        let mostVisibleSection = "home";
        let highestRatio = 0;

        sections.forEach((id) => {
          const entry = sectionRefs.current[id];
          if (entry && entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
            mostVisibleSection = id;
          }
        });

        setActiveSection(mostVisibleSection);
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <BrowserRouter>
     <ScrollToTop /> 
      <div
        className={`transition-colors duration-300 min-h-screen ${
          isDark
            ? "bg-neutral-950 text-white"
            : "bg-neutral-50 text-neutral-900"
        }`}
      >
        <Navigation
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isDark={isDark}
          setIsDark={setIsDark}
        />

        <Routes>
          <Route path="/" element={<Home isDark={isDark} />} />
          <Route path="/faqs" element={<FAQPage isDark={isDark} />} />
          <Route
            path="/low-risk-plan"
            element={<LowRiskPlan isDark={isDark} />}
          />
          <Route
            path="/low-risk/:level"
            element={<LowRiskPlanDetail isDark={isDark} />}
          />
          <Route
            path="/high-risk-plan"
            element={<HighRiskPlans isDark={isDark} />}
          />
          <Route
            path="/high-risk/:level"
            element={<HighRiskPlanDetail isDark={isDark} />}
          />
          <Route
            path="/med-risk-plan"
            element={<MediumRiskPlans isDark={isDark} />}
          />
          <Route
            path="/med-risk/:level"
            element={<MediumRiskPlanDetail isDark={isDark} />}
          />
        </Routes>
        

        <Footer isDark={isDark} />
        <FloatingWhatsApp isDark={isDark} />
      </div>
    </BrowserRouter>
  );
}

export default App;
