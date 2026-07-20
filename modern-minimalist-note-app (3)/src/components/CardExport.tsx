"use client";

import type { GradientShape } from "@/db/schema";

interface CardExportProps {
  title: string;
  content: string | null;
  tasks: { id: string; text: string; done: boolean }[];
  color: string;
  style: "solid" | "glass";
  shapes: GradientShape[];
  mode: "note" | "task";
}

const colorBgMap: Record<string, string> = {
  default: "#1c1c1f",
  blue: "#0a2a4a",
  purple: "#2a1a3a",
  green: "#0a2a1a",
  orange: "#2a1f0a",
  red: "#2a0a0a",
  pink: "#2a0a1a",
  teal: "#0a2a2a",
};

export default function CardExport({
  title,
  content,
  tasks,
  color,
  style,
  shapes,
  mode,
}: CardExportProps) {
  const hasTasks = tasks && tasks.length > 0;
  const hasContent = content && content.replace(/<[^>]*>/g, "").trim().length > 0;

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ aspectRatio: "9/16" }}>
      {/* Background shapes */}
      {shapes.length > 0 && (
        <div className="absolute inset-0">
          {shapes.map((s) => (
            <div
              key={s.id}
              className="absolute"
              style={{
                left: `${s.cx - s.size / 2}%`,
                top: `${s.cy - s.size / 2}%`,
                width: `${s.size}%`,
                height: `${s.size}%`,
                background: `radial-gradient(circle, ${s.colors[0]}, ${s.colors[1]})`,
                borderRadius: s.borderRadius,
                opacity: s.opacity,
                transform: `rotate(${s.rotation}deg)`,
                filter: `blur(${s.blur}px)`,
                mixBlendMode: "screen",
              }}
            />
          ))}
        </div>
      )}

      {/* Card */}
      <div className="absolute inset-4 flex flex-col">
        <div
          className={`flex-1 rounded-[24px] overflow-hidden ${
            style === "glass"
              ? "backdrop-blur-[40px] bg-white/[0.03] border border-white/[0.06]"
              : ""
          }`}
          style={style === "solid" ? { backgroundColor: colorBgMap[color] } : {}}
        >
          <div className="h-full p-6 flex flex-col">
            {/* Title */}
            <h1 className="text-[28px] font-bold text-white leading-tight mb-3">{title}</h1>

            {/* Content */}
            {mode === "note" && hasContent && (
              <div
                className="text-[16px] text-white/[70] leading-relaxed flex-1"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}

            {/* Tasks */}
            {mode === "task" && hasTasks && (
              <div className="flex-1 flex flex-col justify-center">
                {tasks.length > 0 && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-[4px] rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-white"
                        style={{ width: `${(tasks.filter((t) => t.done).length / tasks.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-[13px] font-medium text-white/[50]">
                      {tasks.filter((t) => t.done).length}/{tasks.length}
                    </span>
                  </div>
                )}
                <div className="space-y-3">
                  {tasks.slice(0, 6).map((task) => (
                    <div key={task.id} className="flex items-center gap-3">
                      <div
                        className={`w-[20px] h-[20px] rounded-[7px] flex items-center justify-center flex-shrink-0 ${
                          task.done ? "bg-white" : "border-2 border-white/[35]"
                        }`}
                      >
                        {task.done && (
                          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                            <path d="M1 4.5L4 7.5L10 1" stroke="#0a0a0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-[16px] leading-snug ${
                          task.done ? "line-through text-white/[40]" : "text-white/[70]"
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-auto pt-4 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${style === "glass" ? "bg-white/[40]" : `bg-${color === "default" ? "gray" : color}-400`}`} />
              <span className="text-[11px] text-white/[40]">Заметки</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
