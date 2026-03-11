import { useState, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Scissors, Plus, FileText, GripVertical, Edit } from "lucide-react";

/* ── Types & Data ───────────────────────────────────────── */
interface WaybillCard {
  id: string;
  name: string;
  goods: string;
  pieces: number;
  weight: number;
  cbm: number;
}

interface HBLSlot {
  id: string;
  label: string;
  waybills: WaybillCard[];
}

const ITEM_TYPE = "WAYBILL";

const initialPool: WaybillCard[] = [
  { id: "WB-101", name: "运单101", goods: "精密仪器零部件", pieces: 120, weight: 2200, cbm: 6.5 },
  { id: "WB-102", name: "运单102", goods: "电子元器件", pieces: 100, weight: 1600, cbm: 5.0 },
  { id: "WB-103", name: "运单103", goods: "棉纺织品", pieces: 80, weight: 1200, cbm: 3.5 },
];

const initialSlots: HBLSlot[] = [
  {
    id: "HBL-A",
    label: "分单 A (HBL-A)",
    waybills: [],
  },
  {
    id: "HBL-B",
    label: "分单 B (HBL-B)",
    waybills: [],
  },
];

/* ── Main Component ─────────────────────────────────────── */
export function DocumentTab() {
  const [subTab, setSubTab] = useState<"mbl" | "hbl">("hbl");

  return (
    <div>
      {/* Sub-toggle */}
      <div className="flex items-center gap-2 mb-5">
        <div className="flex bg-slate-100 rounded-lg p-0.5">
          <button
            onClick={() => setSubTab("mbl")}
            className={`px-4 py-1.5 rounded-md transition-all ${
              subTab === "mbl"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
            style={{ fontSize: "0.8rem", fontWeight: 500 }}
          >
            主单 (MBL) 录入
          </button>
          <button
            onClick={() => setSubTab("hbl")}
            className={`px-4 py-1.5 rounded-md transition-all ${
              subTab === "hbl"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
            style={{ fontSize: "0.8rem", fontWeight: 500 }}
          >
            分单 (HBL) 签发与分配
          </button>
        </div>
      </div>

      {subTab === "mbl" && <MBLPlaceholder />}
      {subTab === "hbl" && (
        <DndProvider backend={HTML5Backend}>
          <HBLWorkspace />
        </DndProvider>
      )}
    </div>
  );
}

function MBLPlaceholder() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
      <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
      <h3 className="text-slate-400 mb-1">主单 (MBL) 录入</h3>
      <p className="text-slate-400" style={{ fontSize: "0.85rem" }}>
        填写船公司提单信息、签发日期等
      </p>
    </div>
  );
}

/* ── HBL Workspace ──────────────────────────────────────── */
function HBLWorkspace() {
  const [pool, setPool] = useState<WaybillCard[]>(initialPool);
  const [slots, setSlots] = useState<HBLSlot[]>(initialSlots);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDrop = useCallback(
    (slotId: string, item: WaybillCard) => {
      // Remove from pool
      setPool((prev) => prev.filter((w) => w.id !== item.id));
      // Remove from any other slot
      setSlots((prev) =>
        prev.map((s) => {
          if (s.id === slotId) {
            // Add here if not already present
            if (s.waybills.some((w) => w.id === item.id)) return s;
            return { ...s, waybills: [...s.waybills, item] };
          }
          return { ...s, waybills: s.waybills.filter((w) => w.id !== item.id) };
        })
      );
    },
    []
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* ── Left: Source Pool ──────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <h4 className="text-slate-700" style={{ fontSize: "0.92rem" }}>
            待分配的运单明细
          </h4>
          <p className="text-slate-400" style={{ fontSize: "0.72rem" }}>
            拖拽运单卡片至右侧分单中
          </p>
        </div>
        <div className="p-4 flex flex-col gap-3 min-h-[300px]">
          {pool.length === 0 && (
            <div className="flex-1 flex items-center justify-center text-slate-300" style={{ fontSize: "0.85rem" }}>
              所有运单已分配完毕
            </div>
          )}
          {pool.map((wb) => (
            <DraggableCard
              key={wb.id}
              waybill={wb}
              onDragStart={() => setDraggingId(wb.id)}
              onDragEnd={() => setDraggingId(null)}
            />
          ))}
        </div>
      </div>

      {/* ── Right: Target Slots ────────────── */}
      <div className="flex flex-col gap-4">
        <button className="flex items-center justify-center gap-2 px-5 py-3 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors"
          style={{ fontSize: "0.85rem", fontWeight: 500 }}>
          <Plus className="w-4 h-4" />
          新建分单 (HBL)
        </button>

        {slots.map((slot) => (
          <DroppableSlot
            key={slot.id}
            slot={slot}
            onDrop={handleDrop}
            isDragging={draggingId !== null}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Draggable Card ─────────────────────────────────────── */
function DraggableCard({
  waybill,
  onDragStart,
  onDragEnd,
  compact = false,
}: {
  waybill: WaybillCard;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  compact?: boolean;
}) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ITEM_TYPE,
      item: () => {
        onDragStart?.();
        return waybill;
      },
      end: () => onDragEnd?.(),
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [waybill]
  );

  if (compact) {
    return (
      <div
        ref={drag as unknown as React.Ref<HTMLDivElement>}
        className={`flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg cursor-grab active:cursor-grabbing ${
          isDragging ? "opacity-40" : ""
        }`}
      >
        <GripVertical className="w-3 h-3 text-blue-300" />
        <span className="text-blue-700" style={{ fontSize: "0.78rem", fontWeight: 500 }}>
          {waybill.name}
        </span>
        <span className="text-blue-400" style={{ fontSize: "0.68rem" }}>
          {waybill.pieces}件 / {waybill.weight}kg
        </span>
      </div>
    );
  }

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={`flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl cursor-grab active:cursor-grabbing hover:shadow-md transition-all ${
        isDragging ? "opacity-40 shadow-lg ring-2 ring-blue-300" : ""
      }`}
    >
      <GripVertical className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-slate-800 font-mono" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
            {waybill.id}
          </span>
          <button className="p-1 rounded hover:bg-slate-100 text-slate-400 transition-colors" title="拆分">
            <Scissors className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-slate-500 mb-1.5" style={{ fontSize: "0.78rem" }}>
          {waybill.goods}
        </p>
        <div className="flex gap-3">
          <DataChip label="件" value={waybill.pieces} />
          <DataChip label="kg" value={waybill.weight} />
          <DataChip label="CBM" value={waybill.cbm} />
        </div>
      </div>
    </div>
  );
}

function DataChip({ label, value }: { label: string; value: number }) {
  return (
    <span className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded text-slate-500"
      style={{ fontSize: "0.7rem" }}>
      <span style={{ fontWeight: 600 }}>{value}</span> {label}
    </span>
  );
}

/* ── Droppable Slot ─────────────────────────────────────── */
function DroppableSlot({
  slot,
  onDrop,
  isDragging,
}: {
  slot: HBLSlot;
  onDrop: (slotId: string, item: WaybillCard) => void;
  isDragging: boolean;
}) {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ITEM_TYPE,
      drop: (item: WaybillCard) => onDrop(slot.id, item),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [slot.id, onDrop]
  );

  const isEmpty = slot.waybills.length === 0;
  const totalPieces = slot.waybills.reduce((s, w) => s + w.pieces, 0);
  const totalWeight = slot.waybills.reduce((s, w) => s + w.weight, 0);
  const totalCbm = slot.waybills.reduce((s, w) => s + w.cbm, 0);

  const dropzoneActive = isOver && canDrop;
  const dropzoneReady = !isOver && canDrop && isDragging;

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`rounded-xl border-2 border-dashed transition-all min-h-[160px] p-4 ${
        dropzoneActive
          ? "border-blue-500 bg-blue-50/70 shadow-lg shadow-blue-100"
          : dropzoneReady
          ? "border-blue-300 bg-blue-50/30"
          : isEmpty
          ? "border-slate-200 bg-slate-50/50"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-700" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
          {slot.label}
        </span>
        {!isEmpty && (
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            style={{ fontSize: "0.75rem" }}>
            <Edit className="w-3 h-3" />
            编辑单证
          </button>
        )}
      </div>

      {isEmpty && !dropzoneActive && (
        <div className="flex flex-col items-center justify-center py-6 text-slate-300">
          <FileText className="w-8 h-8 mb-2" />
          <span style={{ fontSize: "0.8rem" }}>拖入运单卡片</span>
        </div>
      )}

      {dropzoneActive && isEmpty && (
        <div className="flex flex-col items-center justify-center py-6 text-blue-400">
          <div className="w-12 h-12 rounded-full border-2 border-blue-300 flex items-center justify-center mb-2 animate-pulse">
            <Plus className="w-5 h-5" />
          </div>
          <span style={{ fontSize: "0.8rem", fontWeight: 500 }}>释放以添加</span>
        </div>
      )}

      {slot.waybills.length > 0 && (
        <div className="flex flex-col gap-2">
          {slot.waybills.map((wb) => (
            <DraggableCard key={wb.id} waybill={wb} compact />
          ))}
          {/* Summary */}
          <div className="mt-2 pt-3 border-t border-slate-100 flex items-center gap-3">
            <span className="text-slate-400" style={{ fontSize: "0.72rem" }}>
              合计:
            </span>
            <DataChip label="件" value={totalPieces} />
            <DataChip label="kg" value={totalWeight} />
            <DataChip label="CBM" value={totalCbm} />
          </div>
        </div>
      )}
    </div>
  );
}
