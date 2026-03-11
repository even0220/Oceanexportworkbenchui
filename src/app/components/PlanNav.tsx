import { CheckCircle2, RefreshCw, PauseCircle } from "lucide-react";

export interface PlanItem {
  key: string;
  label: string;
  status: "completed" | "active" | "pending";
}

const plans: PlanItem[] = [
  { key: "booking", label: "订舱计划", status: "completed" },
  { key: "trucking", label: "拖车计划", status: "active" },
  { key: "loading", label: "装箱计划", status: "pending" },
  { key: "customs", label: "报关计划", status: "pending" },
];

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    label: "已完成",
  },
  active: {
    icon: RefreshCw,
    color: "text-blue-500",
    bg: "bg-blue-50",
    label: "执行中",
  },
  pending: {
    icon: PauseCircle,
    color: "text-slate-400",
    bg: "bg-slate-50",
    label: "未开始",
  },
};

interface PlanNavProps {
  activePlan: string;
  onSelect: (key: string) => void;
}

export function PlanNav({ activePlan, onSelect }: PlanNavProps) {
  return (
    <div className="w-56 shrink-0">
      <h4 className="text-slate-500 mb-3 px-2" style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.05em' }}>
        计划列表
      </h4>
      <div className="flex flex-col gap-1.5">
        {plans.map((plan) => {
          const config = statusConfig[plan.status];
          const Icon = config.icon;
          const isActive = activePlan === plan.key;
          return (
            <button
              key={plan.key}
              onClick={() => onSelect(plan.key)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all ${
                isActive
                  ? "bg-blue-50 border border-blue-200 shadow-sm"
                  : "hover:bg-slate-50 border border-transparent"
              }`}
            >
              <Icon className={`w-4.5 h-4.5 ${isActive && plan.status === "active" ? "text-blue-600" : config.color}`} />
              <div className="flex-1 min-w-0">
                <div className={`${isActive ? "text-blue-700" : "text-slate-700"}`} style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  {plan.label}
                </div>
                <div className={`${isActive && plan.status === "active" ? "text-blue-500" : config.color}`} style={{ fontSize: '0.75rem' }}>
                  {config.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
