"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ListTodo, Type, Plus, X, Palette, Pin, Sparkles, Maximize } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import ShapePickerModal from "@/components/ShapePickerModal";
import { getPresetByShapes } from "@/lib/shapes";
import type { GradientShape } from "@/db/schema";

type Task = { id: string; text: string; done: boolean };
type Note = {
  id: string; title: string; content: string | null; color: string; style: string;
  shapes: GradientShape[]; tasks: Task[]; pinned: number; createdAt: string; updatedAt: string;
};

const colorOptions = [
  { key: "default", dot: "bg-on-surface-dim" }, { key: "blue", dot: "bg-accent-blue" },
  { key: "purple", dot: "bg-accent-purple" }, { key: "green", dot: "bg-accent-green" },
  { key: "orange", dot: "bg-accent-orange" }, { key: "red", dot: "bg-accent-red" },
  { key: "pink", dot: "bg-accent-pink" }, { key: "teal", dot: "bg-accent-teal" },
];

const colorBgMap: Record<string, string> = {
  default: "#1c1c1f", blue: "#0a2a4a", purple: "#2a1a3a", green: "#0a2a1a",
  orange: "#2a1f0a", red: "#2a0a0a", pink: "#2a0a1a", teal: "#0a2a2a",
};

const colorDotMap: Record<string, string> = {
  default: "bg-on-surface-dim", blue: "bg-accent-blue", purple: "bg-accent-purple", green: "bg-accent-green",
  orange: "bg-accent-orange", red: "bg-accent-red", pink: "bg-accent-pink", teal: "bg-accent-teal",
};

export default function NoteEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [color, setColor] = useState("default");
  const [style, setStyle] = useState<"solid" | "glass">("solid");
  const [shapes, setShapes] = useState<GradientShape[]>([]);
  const [shapePresetKey, setShapePresetKey] = useState("none");
  const [pinned, setPinned] = useState(0);
  const [showColor, setShowColor] = useState(false);
  const [showShapeModal, setShowShapeModal] = useState(false);
  const [mode, setMode] = useState<"note" | "task">("note");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [editorKey, setEditorKey] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`/api/notes/${id}`);
        if (r.ok) {
          const d = await r.json();
          setNote(d); setTitle(d.title); setContent(d.content || ""); setTasks(d.tasks || []);
          setColor(d.color || "default"); setStyle((d.style as "solid" | "glass") || "solid");
          setShapes(d.shapes || []); setShapePresetKey(getPresetByShapes(d.shapes || []));
          setPinned(d.pinned || 0); setMode(d.tasks?.length > 0 && !d.content ? "task" : "note");
          setEditorKey((k) => k + 1);
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    })();
  }, [id]);

  useEffect(() => {
    if (!note) return;
    setHasChanges(
      title !== note.title || content !== (note.content || "") ||
      JSON.stringify(tasks) !== JSON.stringify(note.tasks || []) ||
      color !== (note.color || "default") || style !== (note.style || "solid") ||
      JSON.stringify(shapes) !== JSON.stringify(note.shapes || []) ||
      pinned !== (note.pinned || 0)
    );
  }, [title, content, tasks, color, style, shapes, pinned, note]);

  const addTask = () => { if (!newTaskText.trim()) return; setTasks([...tasks, { id: crypto.randomUUID(), text: newTaskText.trim(), done: false }]); setNewTaskText(""); };

  const handleShapeSelect = (newShapes: GradientShape[], key: string) => {
    const rekeyed = newShapes.map((s, i) => ({ ...s, id: `es-${Date.now()}-${i}` }));
    setShapes(rekeyed); setShapePresetKey(key); if (key !== "none") setStyle("glass");
  };

  const handleSave = async () => {
    if (!title.trim()) return; setSaving(true);
    try {
      const body: Record<string, unknown> = { title: title.trim(), color, style, shapes, pinned };
      body.content = content || null;
      body.tasks = mode === "task" || tasks.length > 0 ? tasks : undefined;
      const r = await fetch(`/api/notes/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (r.ok) { router.push(`/note/${id}`); router.refresh(); }
    } catch (e) { console.error(e); } setSaving(false);
  };

  if (loading) return <div className="min-h-screen bg-surface-0 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-accent-blue border-t-transparent animate-spin" /></div>;
  if (!note) return <div className="min-h-screen bg-surface-0 flex flex-col items-center justify-center gap-4"><p className="text-on-surface-muted">Заметка не найдена</p><button onClick={() => router.push("/")} className="text-accent-blue text-sm">На главную</button></div>;

  const isGlass = style === "glass";
  const dotColor = colorDotMap[color] || colorDotMap.default;
  const doneCount = tasks.filter((t) => t.done).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-surface-0 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-surface-0/95 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="flex items-center justify-between px-3 h-14">
          <button onClick={() => router.push(`/note/${id}`)} className="w-10 h-10 rounded-xl flex items-center justify-center interactive text-on-surface-dim hover:text-on-surface">
            <ArrowLeft size={22} />
          </button>

          {/* Center: Mode toggle - icons only */}
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

          {/* Right: Actions */}
          <div className="flex items-center gap-1">
            <button onClick={() => router.push(`/note/${id}/preview`)} className="w-10 h-10 rounded-xl flex items-center justify-center text-on-surface-dim hover:text-on-surface" title="Просмотр для скрина">
              <Maximize size={18} />
            </button>
            <button onClick={() => setPinned(pinned === 1 ? 0 : 1)} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${pinned === 1 ? "text-accent-orange bg-accent-orange/10" : "text-on-surface-dim"}`}>
              <Pin size={18} />
            </button>
            <button onClick={() => setShowShapeModal(true)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${shapes.length > 0 ? "text-accent-purple bg-accent-purple/10" : "text-on-surface-dim"}`}>
              <Sparkles size={18} />
            </button>
            <button onClick={() => { setShowColor(!showColor); }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-on-surface-dim hover:text-on-surface">
              <Palette size={18} />
            </button>
            <button onClick={handleSave} disabled={!hasChanges || saving}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${hasChanges && !saving ? "bg-accent-blue text-white interactive" : "bg-surface-2 text-on-surface-muted"}`}>
              {saving ? <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" /> : <Check size={20} strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {/* Color popover */}
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

      {/* Shape Picker Modal */}
      <ShapePickerModal
        isOpen={showShapeModal}
        onClose={() => setShowShapeModal(false)}
        onSelect={handleShapeSelect}
        activePresetKey={shapePresetKey}
        currentStyle={style}
        onStyleSelect={setStyle}
      />

      {/* Content */}
      <main className="flex-1 px-4 pt-4 pb-6 overflow-y-auto">
        <div className="animate-fade-in max-w-2xl mx-auto">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Заголовок"
            className="w-full bg-transparent text-[24px] font-bold text-on-surface placeholder:text-on-surface-muted/40 outline-none mb-4" />

          {mode === "note" && <RichTextEditor key={editorKey} initialContent={note!.content || ""} onChange={setContent} placeholder="Начните писать..." />}

          {mode === "task" && (
            <div className="space-y-4">
              <div className="bg-surface-1 rounded-2xl border border-white/[0.04] p-4">
                <p className="text-[12px] text-on-surface-muted mb-2">Описание (необязательно)</p>
                <RichTextEditor key={`task-${editorKey}`} initialContent={note!.content || ""} onChange={setContent} placeholder="Дополнительный текст..." />
              </div>

              <div className="space-y-1.5">
                {totalCount > 0 && (
                  <div className="flex items-center gap-2.5">
                    <div className="flex-1 h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                      <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0}%` }} />
                    </div>
                    <span className="text-[11px] font-medium text-on-surface-muted tabular-nums">{doneCount}/{totalCount}</span>
                  </div>
                )}
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
                    <input type="text" value={task.text} onChange={(e) => setTasks(tasks.map((t) => t.id === task.id ? { ...t, text: e.target.value } : t))}
                      className={`flex-1 bg-transparent text-[15px] outline-none ${task.done ? "line-through text-on-surface-muted/60" : "text-on-surface-dim"}`} />
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
