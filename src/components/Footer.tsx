"use client";

const Footer = ({ isDark }: { isDark: boolean }) => {
  return (
    <footer
      className={`relative overflow-hidden border-t ${
        isDark
          ? "bg-neutral-950 border-neutral-800 text-neutral-400"
          : "bg-white border-neutral-200 text-neutral-600"
      }`}
    >
      {/* Subtle Accent Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute -top-32 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full blur-[120px] ${
            isDark ? "bg-[#08CB00]/10" : "bg-[#08CB00]/15"
          }`}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Top Grid */}
        <div className="grid gap-14 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3
              className={`text-2xl font-light tracking-wide mb-6 ${
                isDark ? "text-white" : "text-neutral-900"
              }`}
            >
              Bulls<span className="text-[#08CB00] font-normal">FX</span>
            </h3>
            <p className="text-sm leading-relaxed max-w-md">
              Institutional-grade trading strategies built on data, discipline,
              and professional risk management.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4
              className={`text-xs uppercase tracking-[0.2em] mb-6 ${
                isDark ? "text-neutral-300" : "text-neutral-700"
              }`}
            >
              Platform
            </h4>
            <ul className="space-y-4 text-sm">
              {["Home", "About", "Strategies", "Performance"].map((item) => (
                <li
                  key={item}
                  className={`cursor-pointer transition-colors duration-300 ${
                    isDark ? "hover:text-white" : "hover:text-neutral-900"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4
              className={`text-xs uppercase tracking-[0.2em] mb-6 ${
                isDark ? "text-neutral-300" : "text-neutral-700"
              }`}
            >
              Resources
            </h4>
            <ul className="space-y-4 text-sm">
              {[
                "Market Insights",
                "Risk Framework",
                "Transparency",
                "FAQs",
              ].map((item) => (
                <li
                  key={item}
                  className={`cursor-pointer transition-colors duration-300 ${
                    isDark ? "hover:text-white" : "hover:text-neutral-900"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className={`text-xs uppercase tracking-[0.2em] mb-6 ${
                isDark ? "text-neutral-300" : "text-neutral-700"
              }`}
            >
              Contact
            </h4>

            <ul className="space-y-5 text-sm">
              {/* Phone */}
              <li
                className={`flex items-center gap-3 transition-colors duration-300 cursor-pointer ${
                  isDark
                    ? "text-neutral-400 hover:text-white"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  className="w-4 h-4 shrink-0"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                  />
                </svg>
                <span>+1 (313) 639-6453</span>
              </li>

              {/* Email */}
              <li
                className={`flex items-center gap-3 transition-colors duration-300 cursor-pointer ${
                  isDark
                    ? "text-neutral-400 hover:text-white"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  className="w-4 h-4 shrink-0"
                  fill="currentColor"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414z" />
                  <path d="M0 4.697v7.104l5.803-3.558z" />
                  <path d="M6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586z" />
                  <path d="M9.239 8.83 16 11.801V4.697z" />
                </svg>
                <span>bullsforexx@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`my-14 h-px ${
            isDark
              ? "bg-gradient-to-r from-transparent via-neutral-800 to-transparent"
              : "bg-gradient-to-r from-transparent via-neutral-300 to-transparent"
          }`}
        />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} TradeX. All rights reserved.</p>

          <p className="max-w-xl text-center md:text-right leading-relaxed">
            Trading involves significant risk. Past performance does not
            guarantee future results. This platform is for informational
            purposes only and does not constitute financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
