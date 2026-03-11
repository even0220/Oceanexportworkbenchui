interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { key: "basic", label: "基础信息" },
  { key: "plan", label: "操作计划" },
  { key: "docs", label: "单证制单" },
  { key: "billing", label: "费用结算" },
];

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="bg-white border-b border-slate-200 px-6">
      <div className="flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`relative px-5 py-3 transition-colors ${
              activeTab === tab.key
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
            style={{ fontSize: '0.9rem', fontWeight: activeTab === tab.key ? 500 : 400 }}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
