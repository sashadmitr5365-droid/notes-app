"use client";

import { useState } from "react";
import { X, Sparkles, Droplets, Palette } from "lucide-react";
import { SHAPE_PRESETS, getPresetsByCategory } from "@/lib/shapes";
import type { GradientShape } from "@/db/schema";

interface ShapePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (shapes: GradientShape[], presetKey: string) => void;
  activePresetKey: string;
  currentStyle: "solid" | "glass";
  onStyleSelect: (style: "solid" | "glass") => void;
}

type Tab = "main" | "colors" | "mystery" | "other";

export default function ShapePickerModal({
  isOpen,
  onClose,
  onSelect,
  activePresetKey,
  currentStyle,
  onStyleSelect,
}: ShapePickerModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("main");

  if (!isOpen) return null;

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "main", label: "Градиенты", icon: <Sparkles size={13} /> },
    { key: "colors", label: "Цвета", icon: <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-500 to-blue-500" /> },
    { key: "mystery", label: "Загадки", icon: <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-700 to-black" /> },
    { key: "other", label: "Арт", icon: <Palette size={13} /> },
  ];

  const presets = getPresetsByCategory(activeTab as "main" | "colors" | "mystery" | "other");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-surface-2 rounded-3xl border border-white/[0.08] shadow-2xl animate-scale-in max-w-[95vw] w-[700px] max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div>
            <h2 className="text-[18px] font-semibold text-on-surface">Фон приложения</h2>
            <p className="text-[12px] text-on-surface-muted mt-0.5">Выберите градиентный фон для карточки</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center text-on-surface-muted hover:bg-surface-3 hover:text-on-surface transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Style selector */}
        <div className="px-6 py-4 border-b border-white/[0.06]">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-muted mb-3">Стиль карточки</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onStyleSelect("solid")}
              className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl transition-all border ${
                currentStyle === "solid"
                  ? "bg-surface-4 border-white/[0.1] text-on-surface"
                  : "bg-surface-1 border-white/[0.04] text-on-surface-dim hover:bg-surface-3"
              }`}
            >
              <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 ${
                currentStyle === "solid" ? "border-accent-blue" : "border-on-surface-muted"
              }`}>
                {currentStyle === "solid" && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-[13px] font-medium">Стандарт</span>
            </button>
            <button
              onClick={() => onStyleSelect("glass")}
              className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl transition-all border ${
                currentStyle === "glass"
                  ? "bg-surface-4 border-white/[0.1] text-on-surface"
                  : "bg-surface-1 border-white/[0.04] text-on-surface-dim hover:bg-surface-3"
              }`}
            >
              <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 ${
                currentStyle === "glass" ? "border-accent-blue" : "border-on-surface-muted"
              }`}>
                {currentStyle === "glass" && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-[13px] font-medium">Стекло</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4">
          <div className="flex items-center gap-1 bg-surface-1 rounded-xl p-0.5 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? "bg-surface-4 text-on-surface"
                    : "text-on-surface-dim hover:bg-surface-3"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Presets grid */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {presets.map((preset) => {
              const isActive = activePresetKey === preset.key;
              return (
                <button
                  key={preset.key}
                  onClick={() => { onSelect(preset.shapes, preset.key); }}
                  className={`relative aspect-square rounded-2xl overflow-hidden transition-all group ${
                    isActive
                      ? "ring-2 ring-accent-blue ring-offset-2 ring-offset-surface-2"
                      : "hover:ring-2 hover:ring-white/[0.2] hover:ring-offset-2 hover:ring-offset-surface-2"
                  }`}
                >
                  {/* Preview */}
                  <div className="absolute inset-0 bg-surface-0">
                    {preset.shapes.map((s) => (
                      <div
                        key={s.id}
                        className="absolute"
                        style={{
                          left: `${s.cx}%`,
                          top: `${s.cy}%`,
                          width: `${s.size}%`,
                          height: `${s.size}%`,
                          transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
                          background: `radial-gradient(circle, ${s.colors[0]}, ${s.colors[1]})`,
                          borderRadius: s.borderRadius,
                          opacity: Math.min(s.opacity + 0.2, 0.95),
                          filter: `blur(${Math.max(s.blur / 5, 2)}px)`,
                          mixBlendMode: "screen" as const,
                        }}
                      />
                    ))}
                  </div>

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-[11px] font-medium text-white drop-shadow">
                      {preset.label}
                    </span>
                  </div>

                  {/* Active checkmark */}
                  {isActive && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent-blue flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.06]">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-surface-4 text-on-surface text-[14px] font-medium hover:bg-surface-3 transition-all"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
