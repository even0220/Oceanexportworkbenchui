import { X, AlertTriangle, Clock, Ship, MapPin, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AnomalyDrawerProps {
  open: boolean;
  onClose: () => void;
}

const timelineEvents = [
  {
    id: 1,
    type: "error" as const,
    time: "2026-03-11 09:15",
    title: "ETA 延误预警",
    desc: "预计到港时间由 03-25 延至 03-28，延误约 3 天。受苏伊士运河拥堵影响。",
    icon: AlertTriangle,
  },
  {
    id: 2,
    type: "warning" as const,
    time: "2026-03-10 16:40",
    title: "中转港滞留风险",
    desc: "新加坡中转港船期调整，可能产生 24h 额外等待。",
    icon: Clock,
  },
  {
    id: 3,
    type: "info" as const,
    time: "2026-03-10 08:00",
    title: "船舶已离港",
    desc: "COSCO SHIPPING 已从上海洋山港离泊，航行正常。",
    icon: Ship,
  },
  {
    id: 4,
    type: "info" as const,
    time: "2026-03-09 14:20",
    title: "集装箱已上船",
    desc: "TCLU8842156 已完成装船，舱位确认 Bay 42。",
    icon: MapPin,
  },
  {
    id: 5,
    type: "info" as const,
    time: "2026-03-08 11:00",
    title: "报关放行",
    desc: "海关已放行，报关单号 2026310001254。",
    icon: Info,
  },
];

const typeStyles = {
  error: {
    dot: "bg-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
    iconColor: "text-red-500",
    titleColor: "text-red-700",
  },
  warning: {
    dot: "bg-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconColor: "text-amber-500",
    titleColor: "text-amber-700",
  },
  info: {
    dot: "bg-slate-300",
    bg: "bg-white",
    border: "border-slate-150",
    iconColor: "text-slate-400",
    titleColor: "text-slate-700",
  },
};

export function AnomalyDrawer({ open, onClose }: AnomalyDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] lg:w-[30%] min-w-[380px] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                <h3 className="text-slate-900" style={{ fontSize: '1rem' }}>单票异常监控</h3>
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600" style={{ fontSize: '0.7rem', fontWeight: 500 }}>
                  2 条预警
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Timeline */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[11px] top-3 bottom-3 w-px bg-slate-200" />

                <div className="flex flex-col gap-5">
                  {timelineEvents.map((event) => {
                    const style = typeStyles[event.type];
                    const Icon = event.icon;
                    return (
                      <div key={event.id} className="flex gap-4 relative">
                        {/* Dot */}
                        <div className={`w-[23px] h-[23px] rounded-full ${style.dot} flex items-center justify-center shrink-0 z-10 ring-4 ring-white`}>
                          <Icon className="w-3 h-3 text-white" />
                        </div>
                        {/* Content */}
                        <div className={`flex-1 p-3.5 rounded-xl border ${style.border} ${style.bg}`}>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <span className={`${style.titleColor}`} style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                              {event.title}
                            </span>
                            <span className="text-slate-400 whitespace-nowrap" style={{ fontSize: '0.7rem' }}>
                              {event.time}
                            </span>
                          </div>
                          <p className="text-slate-500" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                            {event.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
