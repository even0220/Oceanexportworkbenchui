import { ArrowLeft, ChevronDown, AlertTriangle, Ship, ArrowRight } from "lucide-react";

interface HeaderProps {
  onOpenDrawer: () => void;
}

export function Header({ onOpenDrawer }: HeaderProps) {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-slate-900">EXP-20260311-001</h2>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
            style={{ fontSize: '0.8rem' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
            运输中
          </span>
        </div>

        {/* Center - Route info */}
        <div className="hidden md:flex items-center gap-3 px-5 py-2 bg-slate-50 rounded-xl">
          <Ship className="w-4 h-4 text-blue-600" />
          <span className="text-slate-700" style={{ fontSize: '0.875rem' }}>COSCO SHIPPING / 045E</span>
          <span className="mx-2 text-slate-300">|</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-900" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Shanghai</span>
            <div className="flex items-center gap-0.5 text-blue-500">
              <div className="w-6 h-px bg-blue-400" />
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <span className="text-slate-900" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Rotterdam</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
            style={{ fontSize: '0.875rem' }}>
            更多操作
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onOpenDrawer}
            className="flex items-center gap-1.5 px-4 py-2 border-2 border-red-400 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            style={{ fontSize: '0.875rem' }}
          >
            <AlertTriangle className="w-4 h-4" />
            异常监控
          </button>
        </div>
      </div>
    </div>
  );
}
