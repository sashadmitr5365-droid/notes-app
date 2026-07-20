"use client";

import { SHAPE_PRESETS } from "@/lib/shapes";
import type { GradientShape } from "@/db/schema";

interface ShapePickerProps {
  currentShapes: GradientShape[];
  onSelect: (shapes: GradientShape[], presetKey: string) => void;
  activePresetKey: string;
}

export default function ShapePicker({ onSelect, activePresetKey }: ShapePickerProps) {
  return (
    <div className="px-4 pb-3 animate-fade-in">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-muted mb-2">
        Фон приложения
      </p>
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {SHAPE_PRESETS.map((preset) => {
          const isActive = activePresetKey === preset.key;
          return (
            <button
              key={preset.key}
              onClick={() => onSelect(preset.shapes, preset.key)}
              className={`flex-shrink-0 flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
                isActive
                  ? "bg-accent-blue/10 ring-1 ring-accent-blue/30"
                  : "hover:bg-surface-3"
              }`}
              style={{ minWidth: 56 }}
            >
              <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-surface-0">
                {preset.shapes.map((s) => (
                  <div
                    key={s.id}
                    className="absolute"
                    style={{
                      left: `${(s.cx / 100) * 100}%`,
                      top: `${(s.cy / 100) * 100}%`,
                      width: `${(s.size / 100) * 80}%`,
                      height: `${(s.size / 100) * 80}%`,
                      transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
                      background: `radial-gradient(circle, ${s.colors[0]}, ${s.colors[1]})`,
                      borderRadius: s.borderRadius,
                      opacity: Math.min(s.opacity + 0.2, 0.95),
                      filter: `blur(${Math.max(s.blur / 5, 1.5)}px)`,
                      mixBlendMode: "screen" as const,
                    }}
                  />
                ))}
              </div>
              <span className="text-[9px] font-medium text-on-surface-muted leading-none truncate max-w-[52px]">
                {preset.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
