import { Menu, X, Sun, Moon, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (value: string) => void;
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

const Navigation = ({
  activeSection,
  setActiveSection,
  isDark,
  setIsDark,
}: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [plansOpen, setPlansOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home", type: "scroll" },
    { id: "about", label: "About", type: "scroll" },
    { id: "projects", label: "Projects", type: "scroll" },
    { id: "plans", label: "Plans", type: "plans" },
    { id: "contact", label: "Contact", type: "scroll" },
    { id: "faqs", label: "FAQs", type: "route" },
  ];

  const handleNavClick = (item: any) => {
    if (item.type === "scroll") {
      setActiveSection(item.id);

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document
            .getElementById(item.id)
            ?.scrollIntoView({ behavior: "smooth" });
        }, 120);
      } else {
        document
          .getElementById(item.id)
          ?.scrollIntoView({ behavior: "smooth" });
      }
    }

    if (item.type === "route") {
      setActiveSection("");
      navigate("/faqs");
    }

    setIsOpen(false);
    setPlansOpen(false);
  };

  const isItemActive = (item: any) => {
    if (location.pathname === "/") {
      return item.type === "scroll" && activeSection === item.id;
    }
    return item.type === "route" && location.pathname === "/faqs";
  };

  return (
    <>
      <div className="h-20" />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-colors
          ${
            isDark
              ? "bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-800 text-white"
              : "bg-white/90 text-neutral-900"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <button
              onClick={() => navigate("/")}
              className="text-2xl font-extrabold tracking-tight hover:text-[#08CB00]"
            >
              Bulls<span className="text-[#08CB00]">FX.</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = isItemActive(item);

                if (item.type === "plans") {
                  return (
                    <div key={item.id} className="relative group">
                      <button
                        onClick={() =>
                          handleNavClick({ id: "plans", type: "scroll" })
                        }
                        className={`px-4 py-2 rounded-xl font-medium flex items-center gap-1
                          ${
                            isActive
                              ? "text-[#08CB00]"
                              : isDark
                                ? "text-neutral-300 hover:text-[#08CB00]"
                                : "text-neutral-700 hover:text-[#08CB00]"
                          }
                        `}
                      >
                        Plans <ChevronDown size={16} className="mt-1" />
                      </button>

                      {/* Dropdown */}
                      <div
                        className={`absolute top-full left-0 mt-3 w-48 rounded-2xl shadow-xl
                          opacity-0 invisible group-hover:opacity-100 group-hover:visible
                          transition-all duration-200 backdrop-blur-xl
                          ${isDark ? "bg-neutral-900/95" : "bg-white"}
                        `}
                      >
                        <div
                          onClick={() => navigate("/low-risk-plan")}
                          className="px-5 py-3 text-sm text-neutral-400 hover:text-[#08CB00] cursor-pointer"
                        >
                          Low Risk
                        </div>

                        <div
                          onClick={() => navigate("/med-risk-plan")}
                          className="px-5 py-3 text-sm text-neutral-400 cursor-pointer hover:text-[#08CB00]"
                        >
                          Medium Risk
                        </div>

                        <div
                          onClick={() => navigate("/high-risk-plan")}
                          className="px-5 py-3 text-sm text-neutral-400 hover:text-[#08CB00] cursor-pointer"
                        >
                          High Risk
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`px-4 py-2 rounded-xl font-medium transition-colors
                      ${
                        isActive
                          ? "text-[#08CB00]"
                          : isDark
                            ? "text-neutral-300 hover:text-[#08CB00]"
                            : "text-neutral-700 hover:text-[#08CB00]"
                      }
                    `}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center
                  ${
                    isDark
                      ? "text-white hover:bg-neutral-900"
                      : "text-neutral-800 hover:bg-neutral-100"
                  }
                `}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                onClick={() => handleNavClick({ id: "plans", type: "scroll" })}
                className={`hidden md:flex px-5 h-11 rounded-full items-center
                  backdrop-blur-md border transition
                  ${
                    isDark
                      ? "bg-white/10 border-white/20 hover:bg-white/20"
                      : "bg-white/60 border-neutral-300 hover:bg-gray-100"
                  }
                `}
              >
                Get Started
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-[#08CB00]/20"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown */}
          {isOpen && (
            <div
              className={`md:hidden absolute top-full left-0 right-0 backdrop-blur-xl shadow-lg
                ${isDark ? "bg-neutral-900/95" : "bg-white/95"}
              `}
            >
              <div className="px-6 py-3 space-y-2">
                {navItems.map((item) => {
                  if (item.type === "plans") {
                    return (
                      <div key={item.id}>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() =>
                              handleNavClick({ id: "plans", type: "scroll" })
                            }
                            className="flex-1 text-left px-5 py-3 rounded-lg font-medium hover:bg-[#08CB00]/20"
                          >
                            Plans
                          </button>

                          <button
                            onClick={() => setPlansOpen(!plansOpen)}
                            className="p-3"
                          >
                            <ChevronRight
                              size={18}
                              className={`transition-transform ${
                                plansOpen ? "rotate-90" : ""
                              }`}
                            />
                          </button>
                        </div>

                        {plansOpen && (
                          <div className="ml-6 mt-1 space-y-1">
                            <div
                              className="px-5 py-2 text-sm text-neutral-400 hover:text-[#08CB00]"
                              onClick={() => {
                                navigate("/low-risk-plan");
                                setIsOpen(!isOpen);
                              }}
                            >
                              Low Risk
                            </div>

                            <div
                              className="px-5 py-2 text-sm text-neutral-400 hover:text-[#08CB00]"
                              onClick={() => {
                                navigate("/med-risk-plan");
                                setIsOpen(!isOpen);
                              }}
                            >
                              Medium Risk
                            </div>

                            <div
                              className="px-5 py-2 text-sm text-neutral-400 hover:text-[#08CB00]"
                              onClick={() => {
                                navigate("/high-risk-plan");
                                setIsOpen(!isOpen);
                              }}
                            >
                              High Risk
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  const isActive = isItemActive(item);

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      className={`block w-full text-left px-5 py-3 rounded-lg font-medium
                        ${
                          isActive
                            ? "bg-[#08CB00] text-black"
                            : "hover:bg-[#08CB00]/20"
                        }
                      `}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
