import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronRight,
  ChevronDown,
  Search,
  SlidersHorizontal,
  ArrowRight,
  Ship,
} from "lucide-react";

/* ── mock data ──────────────────────────────────────────── */
interface Waybill {
  id: string;
  customer: string;
  pieces: number;
  weight: number;
  cbm: number;
  customsStatus: "cleared" | "pending";
}

interface WorkOrder {
  id: string;
  mbl: string;
  vessel: string;
  origin: string;
  dest: string;
  totalPieces: number;
  totalWeight: number;
  totalCbm: number;
  waybillCount: number;
  waybills: Waybill[];
}

const workOrders: WorkOrder[] = [
  {
    id: "WO-2026-001",
    mbl: "COSU123456",
    vessel: "COSCO / 045E",
    origin: "SHA",
    dest: "RTM",
    totalPieces: 300,
    totalWeight: 5000,
    totalCbm: 15,
    waybillCount: 3,
    waybills: [
      { id: "WB-101", customer: "发货人A (上海精密机械)", pieces: 120, weight: 2200, cbm: 6.5, customsStatus: "cleared" },
      { id: "WB-102", customer: "发货人B (苏州电子科技)", pieces: 100, weight: 1600, cbm: 5.0, customsStatus: "cleared" },
      { id: "WB-103", customer: "发货人C (宁波纺织集团)", pieces: 80, weight: 1200, cbm: 3.5, customsStatus: "pending" },
    ],
  },
  {
    id: "WO-2026-002",
    mbl: "COSU789012",
    vessel: "EVERGREEN / 118W",
    origin: "NGB",
    dest: "HAM",
    totalPieces: 450,
    totalWeight: 8200,
    totalCbm: 22,
    waybillCount: 2,
    waybills: [
      { id: "WB-201", customer: "发货人D (杭州化工)", pieces: 250, weight: 5000, cbm: 14, customsStatus: "cleared" },
      { id: "WB-202", customer: "发货人E (温州鞋业)", pieces: 200, weight: 3200, cbm: 8, customsStatus: "pending" },
    ],
  },
  {
    id: "WO-2026-003",
    mbl: "MAEU345678",
    vessel: "MAERSK / 032S",
    origin: "SHA",
    dest: "FEL",
    totalPieces: 180,
    totalWeight: 3100,
    totalCbm: 9,
    waybillCount: 1,
    waybills: [
      { id: "WB-301", customer: "发货人F (深圳电子)", pieces: 180, weight: 3100, cbm: 9, customsStatus: "cleared" },
    ],
  },
];

/* ── component ──────────────────────────────────────────── */
export function ListPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"order" | "waybill">("order");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ "WO-2026-001": true });
  const [searchVal, setSearchVal] = useState("");

  const toggle = (id: string) =>
    setExpanded((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Header ─────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 px-6 lg:px-10 py-5">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Ship className="w-6 h-6 text-blue-600" />
            <h1 className="text-slate-900" style={{ fontSize: "1.35rem" }}>
              海运出口操作台
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Segmented Control */}
            <div className="flex bg-slate-100 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode("order")}
                className={`px-4 py-1.5 rounded-md transition-all ${
                  viewMode === "order"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
                style={{ fontSize: "0.8rem", fontWeight: 500 }}
              >
                按工单查看 (主单)
              </button>
              <button
                onClick={() => setViewMode("waybill")}
                className={`px-4 py-1.5 rounded-md transition-all ${
                  viewMode === "waybill"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
                style={{ fontSize: "0.8rem", fontWeight: 500 }}
              >
                按运单查看
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="搜索工单号 / 主单号…"
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 w-56"
                style={{ fontSize: "0.8rem" }}
              />
            </div>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Data Grid ──────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[44px_1fr_1fr_1fr_1fr_1fr_140px_140px] gap-2 px-5 py-3 bg-slate-50 border-b border-slate-100"
            style={{ fontSize: "0.75rem", fontWeight: 500, color: "#64748b" }}>
            <span />
            <span>工单号</span>
            <span>主单号 (MBL)</span>
            <span>船名航次</span>
            <span>起运港 → 目的港</span>
            <span>总件毛体</span>
            <span>运单</span>
            <span />
          </div>

          {/* Rows */}
          {workOrders.map((wo) => {
            const isOpen = expanded[wo.id];
            return (
              <div key={wo.id}>
                {/* Parent row */}
                <div
                  className="grid grid-cols-[44px_1fr_1fr_1fr_1fr_1fr_140px_140px] gap-2 items-center px-5 py-3.5 border-b border-slate-100 hover:bg-blue-50/30 transition-colors cursor-pointer"
                  onClick={() => toggle(wo.id)}
                >
                  <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-400 transition-colors">
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  <span className="text-slate-900" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    {wo.id}
                  </span>
                  <span className="text-slate-600 font-mono" style={{ fontSize: "0.8rem" }}>
                    {wo.mbl}
                  </span>
                  <span className="text-slate-600" style={{ fontSize: "0.8rem" }}>
                    {wo.vessel}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-700" style={{ fontSize: "0.8rem" }}>
                    <span style={{ fontWeight: 600 }}>{wo.origin}</span>
                    <ArrowRight className="w-3 h-3 text-blue-400" />
                    <span style={{ fontWeight: 600 }}>{wo.dest}</span>
                  </span>
                  <span className="text-slate-500" style={{ fontSize: "0.78rem" }}>
                    {wo.totalPieces}件 / {wo.totalWeight}kg / {wo.totalCbm}CBM
                  </span>
                  <span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200"
                      style={{ fontSize: "0.7rem", fontWeight: 500 }}>
                      包含 {wo.waybillCount} 票运单
                    </span>
                  </span>
                  <span className="flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/detail/${wo.id}`);
                      }}
                      className="px-3.5 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                      style={{ fontSize: "0.78rem" }}
                    >
                      进入工作台
                    </button>
                  </span>
                </div>

                {/* Child rows */}
                {isOpen && (
                  <div>
                    {/* Child header */}
                    <div className="grid grid-cols-[44px_60px_1fr_1fr_1fr_1fr_140px_140px] gap-2 px-5 py-2 bg-slate-50/70 border-b border-slate-100"
                      style={{ fontSize: "0.7rem", fontWeight: 500, color: "#94a3b8" }}>
                      <span />
                      <span />
                      <span>运单号</span>
                      <span>客户名称</span>
                      <span>件毛体明细</span>
                      <span>报关状态</span>
                      <span />
                      <span />
                    </div>
                    {wo.waybills.map((wb) => (
                      <div
                        key={wb.id}
                        className="grid grid-cols-[44px_60px_1fr_1fr_1fr_1fr_140px_140px] gap-2 items-center px-5 py-3 bg-slate-50/50 border-b border-slate-100/80 hover:bg-slate-100/50 transition-colors"
                      >
                        <span />
                        <span className="flex justify-center">
                          <span className="w-px h-5 bg-slate-300 rounded-full" />
                        </span>
                        <span className="text-slate-700 font-mono" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                          {wb.id}
                        </span>
                        <span className="text-slate-600" style={{ fontSize: "0.8rem" }}>
                          {wb.customer}
                        </span>
                        <span className="text-slate-500" style={{ fontSize: "0.78rem" }}>
                          {wb.pieces}件 / {wb.weight}kg / {wb.cbm}CBM
                        </span>
                        <span>
                          {wb.customsStatus === "cleared" ? (
                            <span className="inline-flex items-center gap-1.5 text-emerald-600" style={{ fontSize: "0.78rem" }}>
                              <span className="w-2 h-2 rounded-full bg-emerald-500" />
                              已放行
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-slate-400" style={{ fontSize: "0.78rem" }}>
                              <span className="w-2 h-2 rounded-full bg-slate-300" />
                              待处理
                            </span>
                          )}
                        </span>
                        <span />
                        <span />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
