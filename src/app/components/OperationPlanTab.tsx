import { useState } from "react";
import {
  Ship,
  Package,
  FolderOpen,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ChevronRight,
  ChevronDown,
  Save,
  CheckCircle,
  Home,
} from "lucide-react";

/* ── Nav tree data ──────────────────────────────────────── */
interface TreeNode {
  id: string;
  label: string;
  icon: React.ElementType;
  status?: "completed" | "active" | "pending";
  children?: TreeNode[];
}

const navTree: TreeNode[] = [
  {
    id: "wo-ops",
    label: "工单级操作",
    icon: Home,
    children: [
      { id: "booking", label: "航运订舱计划", icon: Ship, status: "completed" },
      { id: "loading", label: "场站装箱计划", icon: Package, status: "pending" },
    ],
  },
  {
    id: "wb-101",
    label: "运单 101 (发货人A)",
    icon: FolderOpen,
    children: [
      { id: "wb101-pickup", label: "提货计划", icon: Truck, status: "active" },
      { id: "wb101-customs", label: "报关计划", icon: ShieldCheck, status: "pending" },
    ],
  },
  {
    id: "wb-102",
    label: "运单 102 (发货人B)",
    icon: FolderOpen,
    children: [
      { id: "wb102-pickup", label: "提货计划", icon: Truck, status: "pending" },
      { id: "wb102-customs", label: "报关计划", icon: ShieldCheck, status: "pending" },
    ],
  },
  {
    id: "wb-103",
    label: "运单 103 (发货人C)",
    icon: FolderOpen,
    children: [
      { id: "wb103-pickup", label: "提货计划", icon: Truck, status: "pending" },
      { id: "wb103-customs", label: "报关计划", icon: ShieldCheck, status: "pending" },
    ],
  },
];

const statusLabel: Record<string, { text: string; color: string }> = {
  completed: { text: "已完成", color: "text-emerald-500" },
  active: { text: "执行中", color: "text-blue-500" },
  pending: { text: "未开始", color: "text-slate-400" },
};

/* ── Component ──────────────────────────────────────────── */
export function OperationPlanTab() {
  const [selected, setSelected] = useState("wb101-pickup");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "wo-ops": true,
    "wb-101": true,
    "wb-102": false,
    "wb-103": false,
  });

  const toggleGroup = (id: string) =>
    setExpandedGroups((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div className="flex gap-6 min-h-[520px]">
      {/* ── Left Nav Tree ────────────────────── */}
      <div className="w-[260px] shrink-0 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 overflow-y-auto">
        <p className="text-slate-400 mb-3 px-1" style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          操作计划导航
        </p>

        <div className="flex flex-col gap-0.5">
          {navTree.map((group) => {
            const GroupIcon = group.icon;
            const isOpen = expandedGroups[group.id];
            return (
              <div key={group.id}>
                {/* Group header */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="flex items-center gap-2 w-full px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  {isOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <GroupIcon className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700 truncate" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                    {group.label}
                  </span>
                </button>

                {/* Children */}
                {isOpen && group.children && (
                  <div className="ml-5 pl-3 border-l border-slate-200 flex flex-col gap-0.5 mt-0.5 mb-1">
                    {group.children.map((child) => {
                      const ChildIcon = child.icon;
                      const isSelected = selected === child.id;
                      const st = child.status ? statusLabel[child.status] : null;
                      return (
                        <button
                          key={child.id}
                          onClick={() => setSelected(child.id)}
                          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${
                            isSelected
                              ? "bg-blue-50 border border-blue-200"
                              : "hover:bg-slate-50 border border-transparent"
                          }`}
                        >
                          <ChildIcon
                            className={`w-4 h-4 shrink-0 ${
                              isSelected ? "text-blue-600" : "text-slate-400"
                            }`}
                          />
                          <div className="min-w-0 flex-1">
                            <div
                              className={`truncate ${isSelected ? "text-blue-700" : "text-slate-600"}`}
                              style={{ fontSize: "0.8rem", fontWeight: 500 }}
                            >
                              {child.label}
                            </div>
                            {st && (
                              <div className={`${st.color}`} style={{ fontSize: "0.68rem" }}>
                                {child.status === "completed" && "✅ "}
                                {child.status === "active" && "🔄 "}
                                {child.status === "pending" && "⏸️ "}
                                {st.text}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Right Form ───────────────────────── */}
      <div className="flex-1 min-w-0">
        <PickupForm selectedId={selected} />
      </div>
    </div>
  );
}

/* ── Pickup Form ────────────────────────────────────────── */
function PickupForm({ selectedId }: { selectedId: string }) {
  const [form, setForm] = useState({
    carrier: "上海远洋物流有限公司",
    plateNumber: "沪A·88956",
    driverName: "张伟",
    estimatedArrival: "2026-03-12T08:30",
  });

  const handleChange = (field: string, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  // Derive label from selectedId
  const labels: Record<string, string> = {
    "wb101-pickup": "运单 101 的提货派车",
    "wb102-pickup": "运单 102 的提货派车",
    "wb103-pickup": "运单 103 的提货派车",
    booking: "航运订舱计划",
    loading: "场站装箱计划",
    "wb101-customs": "运单 101 的报关计划",
    "wb102-customs": "运单 102 的报关计划",
    "wb103-customs": "运单 103 的报关计划",
  };

  const currentLabel = labels[selectedId] ?? selectedId;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Card header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
          <Truck className="w-4.5 h-4.5 text-blue-600" />
        </div>
        <div>
          <p className="text-slate-500" style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.04em" }}>
            当前操作
          </p>
          <h3 className="text-slate-900" style={{ fontSize: "1rem" }}>
            {currentLabel}
          </h3>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400" style={{ fontSize: "0.72rem" }}>
            更新于 2026-03-11 14:30
          </span>
        </div>
      </div>

      {/* Form body */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="拖车行" value={form.carrier} onChange={(v) => handleChange("carrier", v)} />
          <Field label="车牌号" value={form.plateNumber} onChange={(v) => handleChange("plateNumber", v)} />
          <Field label="司机姓名" value={form.driverName} onChange={(v) => handleChange("driverName", v)} />
          <Field label="预计到厂时间" type="datetime-local" value={form.estimatedArrival} onChange={(v) => handleChange("estimatedArrival", v)} />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/30">
        <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
          style={{ fontSize: "0.85rem" }}>
          <Save className="w-4 h-4" />
          保存
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          style={{ fontSize: "0.85rem" }}>
          <CheckCircle className="w-4 h-4" />
          标记为已完成
        </button>
      </div>
    </div>
  );
}

/* ── Reusable field ─────────────────────────────────────── */
function Field({
  label,
  value,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  type?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-slate-600" style={{ fontSize: "0.78rem", fontWeight: 500 }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
        style={{ fontSize: "0.85rem" }}
      />
    </div>
  );
}
