import { Truck, Save, CheckCircle } from "lucide-react";
import { useState } from "react";

export function TruckingForm() {
  const [form, setForm] = useState({
    carrier: "上海远洋物流有限公司",
    plateNumber: "沪A·88956",
    driverName: "张伟",
    estimatedArrival: "2026-03-12T08:30",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Form Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
            <Truck className="w-4.5 h-4.5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-slate-900" style={{ fontSize: '1rem' }}>拖车计划</h3>
            <p className="text-slate-500" style={{ fontSize: '0.8rem' }}>
              状态：执行中 · 更新于 2026-03-11 14:30
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField label="拖车行" value={form.carrier} onChange={(v) => handleChange("carrier", v)} />
            <FormField label="车牌号" value={form.plateNumber} onChange={(v) => handleChange("plateNumber", v)} />
            <FormField label="司机姓名" value={form.driverName} onChange={(v) => handleChange("driverName", v)} />
            <FormField
              label="预计到厂时间"
              type="datetime-local"
              value={form.estimatedArrival}
              onChange={(v) => handleChange("estimatedArrival", v)}
            />
          </div>
        </div>

        {/* Form Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/30">
          <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
            style={{ fontSize: '0.875rem' }}>
            <Save className="w-4 h-4" />
            保存
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            style={{ fontSize: '0.875rem' }}>
            <CheckCircle className="w-4 h-4" />
            标记为已完成
          </button>
        </div>
      </div>
    </div>
  );
}

function FormField({
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
      <label className="text-slate-600" style={{ fontSize: '0.8rem', fontWeight: 500 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
        style={{ fontSize: '0.875rem' }}
      />
    </div>
  );
}
