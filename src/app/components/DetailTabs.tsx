interface DetailTabsProps {
  activeTab: string;
  onTabChange: (t: string) => void;
}

const tabs = [
  { key: "basic", label: "基础信息" },
  { key: "plan", label: "操作计划" },
  { key: "docs", label: "单证制单" },
  { key: "billing", label: "费用结算" },
];

export function DetailTabs({ activeTab, onTabChange }: DetailTabsProps) {
  return (
    <div className="sticky top-[73px] z-20 bg-white border-b border-slate-200 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto flex gap-0.5">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => onTabChange(t.key)}
            className={`relative px-5 py-3 transition-colors ${
              activeTab === t.key
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
            style={{ fontSize: "0.88rem", fontWeight: activeTab === t.key ? 500 : 400 }}
          >
            {t.label}
            {activeTab === t.key && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
