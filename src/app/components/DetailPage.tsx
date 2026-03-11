import { useState } from "react";
import { DetailHeader } from "./DetailHeader";
import { DetailTabs } from "./DetailTabs";
import { OperationPlanTab } from "./OperationPlanTab";
import { DocumentTab } from "./DocumentTab";
import { AnomalyDrawer } from "./AnomalyDrawer";
import { FileText, Calculator } from "lucide-react";

export function DetailPage() {
  const [activeTab, setActiveTab] = useState("plan");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <DetailHeader onOpenDrawer={() => setDrawerOpen(true)} />
      <DetailTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6">
        {activeTab === "plan" && <OperationPlanTab />}
        {activeTab === "docs" && <DocumentTab />}
        {activeTab === "basic" && (
          <Placeholder
            icon={<FileText className="w-10 h-10 text-slate-300" />}
            title="基础信息"
            desc="委托方、收发通信息、货物明细等基础数据"
          />
        )}
        {activeTab === "billing" && (
          <Placeholder
            icon={<Calculator className="w-10 h-10 text-slate-300" />}
            title="费用结算"
            desc="应收应付账单、费用审核与对账"
          />
        )}
      </div>

      <AnomalyDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}

function Placeholder({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
      <div className="flex justify-center mb-3">{icon}</div>
      <h3 className="text-slate-400 mb-1">{title}</h3>
      <p className="text-slate-400" style={{ fontSize: "0.85rem" }}>
        {desc}
      </p>
    </div>
  );
}
