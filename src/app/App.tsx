import { useState } from "react";
import { Header } from "./components/Header";
import { TabBar } from "./components/TabBar";
import { PlanNav } from "./components/PlanNav";
import { TruckingForm } from "./components/TruckingForm";
import { AnomalyDrawer } from "./components/AnomalyDrawer";

export default function App() {
  const [activeTab, setActiveTab] = useState("plan");
  const [activePlan, setActivePlan] = useState("trucking");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <Header onOpenDrawer={() => setDrawerOpen(true)} />

      {/* Tabs */}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === "plan" && (
          <div className="flex gap-6">
            <PlanNav activePlan={activePlan} onSelect={setActivePlan} />
            <TruckingForm />
          </div>
        )}

        {activeTab === "basic" && (
          <PlaceholderTab title="基础信息" desc="委托方、收发通信息、货物明细等基础数据" />
        )}
        {activeTab === "docs" && (
          <PlaceholderTab title="单证制单" desc="提单、箱单、发票等单证生成与管理" />
        )}
        {activeTab === "billing" && (
          <PlaceholderTab title="费用结算" desc="应收应付账单、费用审核与对账" />
        )}
      </div>

      {/* Anomaly Drawer */}
      <AnomalyDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}

function PlaceholderTab({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
      <h3 className="text-slate-400 mb-2">{title}</h3>
      <p className="text-slate-400" style={{ fontSize: '0.875rem' }}>{desc}</p>
    </div>
  );
}
