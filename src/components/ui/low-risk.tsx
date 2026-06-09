const Info = ({ label, value }: any) => (
  <div>
    <p className="opacity-50 mb-1">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const CalcStat = ({ label, value, highlight }: any) => (
  <div>
    <p className="opacity-50 mb-1">{label}</p>
    <p className={`text-xl font-semibold ${highlight && "text-[#08CB00]"}`}>
      {value}
    </p>
  </div>
);

const TrustPanel = ({ isDark }: any) => (
  <div
    className={`rounded-3xl p-8 ${
      isDark
        ? "bg-white/5 border border-white/10"
        : "bg-white border border-neutral-200"
    }`}
  >
    <Stat label="Risk Level" value="Low / Managed" />
    <Stat label="Profit Cycle" value="Monthly" />
    <Stat label="Capital Safety" value="Strategy Controlled" />
    <Stat label="Withdrawal" value="After Minimum Period" />
  </div>
);

const Stat = ({ label, value }: any) => (
  <div className="flex justify-between py-3 border-b border-white/10 last:border-none">
    <span className="opacity-60">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export {TrustPanel, Info, CalcStat}