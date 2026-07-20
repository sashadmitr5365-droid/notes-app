"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ListTodo, Type, Plus, X, Palette, Sparkles } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import ShapePickerModal from "@/components/ShapePickerModal";
import type { GradientShape } from "@/db/schema";

type Task = { id: string; text: string; done: boolean };

const colorOptions = [
  { key: "default", label: "По умолчанию", dot: "bg-on-surface-dim" },
  { key: "blue", label: "Синий", dot: "bg-accent-blue" },
  { key: "purple", label: "Фиолетовый", dot: "bg-accent-purple" },
  { key: "green", label: "Зелёный", dot: "bg-accent-green" },
  { key: "orange", label: "Оранжевый", dot: "bg-accent-orange" },
  { key: "red", label: "Красный", dot: "bg-accent-red" },
  { key: "pink", label: "Розовый", dot: "bg-accent-pink" },
  { key: "teal", label: "Бирюзовый", dot: "bg-accent-teal" },
];

const colorCheckMap: Record<string, { borderColor: string }> = {
  default: { borderColor: "rgba(255,255,255,0.35)" },
  blue: { borderColor: "rgba(255,255,255,0.35)" },
  purple: { borderColor: "rgba(255,255,255,0.35)" },
  green: { borderColor: "rgba(255,255,255,0.35)" },
  orange: { borderColor: "rgba(255,255,255,0.35)" },
  red: { borderColor: "rgba(255,255,255,0.35)" },
  pink: { borderColor: "rgba(255,255,255,0.35)" },
  teal: { borderColor: "rgba(255,255,255,0.35)" },
};

export default function NewNotePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [color, setColor] = useState("default");
  const [style, setStyle] = useState<"solid" | "glass">("solid");
  const [shapes, setShapes] = useState<GradientShape[]>([]);
  const [shapePresetKey, setShapePresetKey] = useState("none");
  const [showColor, setShowColor] = useState(false);
  const [showShapeModal, setShowShapeModal] = useState(false);
  const [mode, setMode] = useState<"note" | "task">("note");
  const [saving, setSaving] = useState(false);

  const addTask = () => {
    if (!newTaskText.trim()) return;
    setTasks([...tasks, { id: crypto.randomUUID(), text: newTaskText.trim(), done: false }]);
    setNewTaskText("");
  };

  const handleShapeSelect = (newShapes: GradientShape[], key: string) => {
    const rekeyed = newShapes.map((s, i) => ({ ...s, id: `ns-${Date.now()}-${i}` }));
    setShapes(rekeyed); setShapePresetKey(key); if (key !== "none") setStyle("glass");
  };

  const handleSave = async () => {
    if (!title.trim()) return; setSaving(true);
    try {
      const body: Record<string, unknown> = { title: title.trim(), color, style, shapes };
      body.content = mode === "note" ? (content || null) : null;
      body.tasks = mode === "task" || tasks.length > 0 ? tasks : [];
      const res = await fetch("/api/notes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) { router.push("/"); router.refresh(); }
    } catch (e) { console.error(e); } setSaving(false);
  };

  const canSave = title.trim().length > 0;
  const checkStyle = colorCheckMap[color] || colorCheckMap.default;

  return (
    <div className="min-h-screen bg-surface-0 flex flex-col overflow-hidden">
      <header className="sticky top-0 z-30 bg-surface-0/95 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="flex items-center justify-between px-3 h-14">
          <button onClick={() => router.push("/")} className="w-10 h-10 rounded-xl flex items-center justify-center interactive text-on-surface-dim hover:text-on-surface">
            <ArrowLeft size={22} />
          </button>

          <div className="flex items-center bg-surface-2 rounded-xl p-0.5">
            <button
              onClick={() => setMode("note")}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${mode === "note" ? "bg-surface-4 text-on-surface" : "text-on-surface-muted"}`}
            >
              <Type size={18} />
            </button>
            <button
              onClick={() => setMode("task")}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${mode === "task" ? "bg-surface-4 text-on-surface" : "text-on-surface-muted"}`}
            >
              <ListTodo size={18} />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button onClick={() => setShowShapeModal(true)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${shapes.length > 0 ? "text-accent-purple bg-accent-purple/10" : "text-on-surface-dim"}`}>
              <Sparkles size={18} />
            </button>
            <button onClick={() => { setShowColor(!showColor); }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-on-surface-dim hover:text-on-surface">
              <Palette size={18} />
            </button>
            <button onClick={handleSave} disabled={!canSave || saving}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${canSave && !saving ? "bg-accent-blue text-white interactive" : "bg-surface-2 text-on-surface-muted"}`}>
              {saving ? <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" /> : <Check size={20} strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {showColor && (
          <div className="px-3 pb-3 animate-fade-in">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-muted mb-2">Цвет карточки</p>
            <div className="flex items-center gap-2 flex-wrap">
              {colorOptions.map((opt) => (
                <button key={opt.key} onClick={() => { setColor(opt.key); setShowColor(false); }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${color === opt.key ? "bg-surface-4 ring-1 ring-white/[0.1]" : "bg-surface-1"}`}>
                  <div className={`w-4 h-4 rounded-full ${opt.dot}`} />
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <ShapePickerModal
        isOpen={showShapeModal}
        onClose={() => setShowShapeModal(false)}
        onSelect={handleShapeSelect}
        activePresetKey={shapePresetKey}
        currentStyle={style}
        onStyleSelect={setStyle}
      />

      <main className="flex-1 px-4 pt-4 pb-6 overflow-y-auto">
        <div className="animate-fade-in max-w-2xl mx-auto">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Заголовок"
            className="w-full bg-transparent text-[24px] font-bold text-on-surface placeholder:text-on-surface-muted/40 outline-none mb-4" />

          {mode === "note" && <RichTextEditor initialContent="" onChange={setContent} placeholder="Начните писать..." />}

          {mode === "task" && (
            <div className="space-y-4">
              <div className="bg-surface-1 rounded-2xl border border-white/[0.04] p-4">
                <p className="text-[12px] text-on-surface-muted mb-2">Описание (необязательно)</p>
                <RichTextEditor initialContent="" onChange={setContent} placeholder="Дополнительный текст..." />
              </div>

              <div className="space-y-1.5">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-2.5 group animate-scale-in">
                    <button onClick={() => setTasks(tasks.map((t) => t.id === task.id ? { ...t, done: !t.done } : t))}
                      className="w-[18px] h-[18px] rounded-[6px] flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={task.done 
                        ? { backgroundColor: "transparent", border: "none" }
                        : { backgroundColor: "transparent", border: "1.5px solid rgba(255,255,255,0.35)" }
                      }>
                      {task.done && <svg width="9" height="7" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </button>
                    <span className={`flex-1 text-[15px] leading-snug ${task.done ? "line-through text-on-surface-muted/60" : "text-on-surface-dim"}`}>{task.text}</span>
                    <button onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))} className="w-6 h-6 rounded-lg flex items-center justify-center text-on-surface-muted opacity-0 group-hover:opacity-100 hover:text-accent-red transition-all"><X size={14} /></button>
                  </div>
                ))}
                <div className="flex items-center gap-2.5 mt-2">
                  <div className="w-[18px] h-[18px] rounded-[6px] border border-accent-blue/30 flex items-center justify-center flex-shrink-0"><Plus size={11} className="text-accent-blue" /></div>
                  <input type="text" value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") addTask(); }}
                    placeholder="Новая задача..." className="flex-1 bg-transparent text-[15px] text-on-surface-dim placeholder:text-on-surface-muted/40 outline-none" />
                  {newTaskText.trim() && <button onClick={addTask} className="w-6 h-6 rounded-lg flex items-center justify-center bg-accent-blue/10 text-accent-blue interactive"><Plus size={14} /></button>}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
