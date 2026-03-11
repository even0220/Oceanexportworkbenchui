import { useNavigate } from "react-router";
import { ArrowLeft, AlertTriangle, Package } from "lucide-react";

interface DetailHeaderProps {
  onOpenDrawer: () => void;
}

const waybillTags = ["运单101", "运单102", "运单103"];

export function DetailHeader({ onOpenDrawer }: DetailHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 lg:px-10 py-4">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4 flex-wrap">
        {/* ── Left ────────────────────────────── */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-slate-900" style={{ fontSize: "1.2rem" }}>
            工单号: WO-2026-001
          </h2>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-300"
            style={{ fontSize: "0.75rem", fontWeight: 500 }}>
            MBL: COSU123456
          </span>
        </div>

        {/* ── Center ──────────────────────────── */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl">
            <Package className="w-4 h-4 text-slate-400" />
            <span className="text-slate-700" style={{ fontSize: "0.82rem" }}>
              总数:&nbsp;
              <span style={{ fontWeight: 600 }}>300</span>件 /&nbsp;
              <span style={{ fontWeight: 600 }}>5,000</span>kg /&nbsp;
              <span style={{ fontWeight: 600 }}>15</span>CBM
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {waybillTags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded bg-slate-200/70 text-slate-600"
                style={{ fontSize: "0.7rem", fontWeight: 500 }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right ───────────────────────────── */}
        <div className="flex items-center gap-2.5">
          <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
            style={{ fontSize: "0.82rem" }}>
            挂起单据
          </button>
          <button
            onClick={onOpenDrawer}
            className="relative flex items-center gap-1.5 px-4 py-2 border-2 border-red-400 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            style={{ fontSize: "0.82rem" }}
          >
            <AlertTriangle className="w-4 h-4" />
            异常监控
            {/* notification dot */}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
