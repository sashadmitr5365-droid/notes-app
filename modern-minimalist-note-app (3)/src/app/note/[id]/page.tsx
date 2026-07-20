"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Pin } from "lucide-react";
import type { GradientShape } from "@/db/schema";

type DateFormat = "full" | "date" | "month-year" | "year";

type Task = { id: string; text: string; done: boolean };
type Note = {
  id: string; title: string; content: string | null; color: string; style: string;
  shapes: GradientShape[]; tasks: Task[]; pinned: number; createdAt: string; updatedAt: string;
};

const colorCardMap: Record<string, string> = {
  default: "bg-surface-2", blue: "bg-card-blue", purple: "bg-card-purple", green: "bg-card-green",
  orange: "bg-card-orange", red: "bg-card-red", pink: "bg-card-pink", teal: "bg-card-teal",
};

const colorDotMap: Record<string, string> = {
  default: "bg-on-surface-dim", blue: "bg-accent-blue", purple: "bg-accent-purple", green: "bg-accent-green",
  orange: "bg-accent-orange", red: "bg-accent-red", pink: "bg-accent-pink", teal: "bg-accent-teal",
};

const colorCheckMap: Record<string, { fillHex: string; borderColor: string; bar: string }> = {
  default: { fillHex: "#ffffff", borderColor: "rgba(255,255,255,0.35)", bar: "bg-white" },
  blue: { fillHex: "#ffffff", borderColor: "rgba(255,255,255,0.35)", bar: "bg-white" },
  purple: { fillHex: "#ffffff", borderColor: "rgba(255,255,255,0.35)", bar: "bg-white" },
  green: { fillHex: "#ffffff", borderColor: "rgba(255,255,255,0.35)", bar: "bg-white" },
  orange: { fillHex: "#ffffff", borderColor: "rgba(255,255,255,0.35)", bar: "bg-white" },
  red: { fillHex: "#ffffff", borderColor: "rgba(255,255,255,0.35)", bar: "bg-white" },
  pink: { fillHex: "#ffffff", borderColor: "rgba(255,255,255,0.35)", bar: "bg-white" },
  teal: { fillHex: "#ffffff", borderColor: "rgba(255,255,255,0.35)", bar: "bg-white" },
};

const glassTintMap: Record<string, string> = {
  default: "", blue: "glass-tint-blue", purple: "glass-tint-purple", green: "glass-tint-green",
  orange: "glass-tint-orange", red: "glass-tint-red", pink: "glass-tint-pink", teal: "glass-tint-teal",
};

function hasContent(h: string | null) { return !!h && h.replace(/<[^>]*>/g, "").trim().length > 0; }

function formatDate(dateStr: string, fmt: DateFormat): string {
  const d = new Date(dateStr);
  switch (fmt) {
    case "full":
      return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
    case "date":
      return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
    case "month-year": {
      const month = d.toLocaleDateString("ru-RU", { month: "long" });
      const year = d.toLocaleDateString("ru-RU", { year: "numeric" });
      return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${year}`;
    }
    case "year":
      return d.toLocaleDateString("ru-RU", { year: "numeric" });
    default:
      return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  }
}

export default function NoteViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateFormat, setDateFormat] = useState<DateFormat>("full");
  const [showDate, setShowDate] = useState(true);
  const [showDateLabel, setShowDateLabel] = useState(true);

  const [cardPosition, setCardPosition] = useState<"top" | "center">("top");
  const [fontScale, setFontScale] = useState(1);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("notes-app-settings");
      if (raw) {
        const s = JSON.parse(raw);
        if (s.dateFormat) setDateFormat(s.dateFormat);
        if (s.showDate !== undefined) setShowDate(s.showDate);
        if (s.showDateLabel !== undefined) setShowDateLabel(s.showDateLabel);
        if (s.cardPosition) setCardPosition(s.cardPosition);
        if (s.fontSize) {
          const fontSizeMap: Record<string, number> = { small: 0.85, normal: 1, large: 1.15, xlarge: 1.3 };
          const scale = fontSizeMap[s.fontSize] || 1;
          setFontScale(scale);
          document.documentElement.style.setProperty("--font-scale", String(scale));
          if (scale !== 1) { document.body.setAttribute("data-font-scale", "true"); }
          else { document.body.removeAttribute("data-font-scale"); }
        }
      }
    } catch {}

    (async () => {
      try { const r = await fetch(`/api/notes/${id}`); if (r.ok) setNote(await r.json()); }
      catch (e) { console.error(e); } finally { setLoading(false); }
    })();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-surface-0 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-accent-blue border-t-transparent animate-spin" /></div>;
  if (!note) return <div className="min-h-screen bg-surface-0 flex flex-col items-center justify-center gap-4"><p className="text-on-surface-muted">Заметка не найдена</p><button onClick={() => router.push("/")} className="text-accent-blue text-sm">На главную</button></div>;

  const isGlass = note.style === "glass";
  const dotColor = colorDotMap[note.color] || colorDotMap.default;
  const checkStyle = colorCheckMap[note.color] || colorCheckMap.default;
  const hasTasks = note.tasks && note.tasks.length > 0;
  const hasText = hasContent(note.content);
  const total = hasTasks ? note.tasks.length : 0;
  const done = hasTasks ? note.tasks.filter((t) => t.done).length : 0;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const cardBg = colorCardMap[note.color] || colorCardMap.default;
  const hasShapes = note.shapes && note.shapes.length > 0;

  return (
    <div className="min-h-screen bg-surface-0 relative">
      {hasShapes && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
          {note.shapes.map((s) => (
            <div
              key={s.id}
              className="absolute"
              style={{
                left: `${s.cx - s.size / 2}vw`,
                top: `${s.cy - s.size / 2}vh`,
                width: `${s.size}vw`,
                height: `${s.size}vw`,
                background: `radial-gradient(circle, ${s.colors[0]}, ${s.colors[1]})`,
                borderRadius: s.borderRadius,
                opacity: s.opacity,
                transform: `rotate(${s.rotation}deg)`,
                filter: `blur(${s.blur}px)`,
                mixBlendMode: "screen" as const,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-surface-0/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 h-14">
            <button onClick={() => router.push("/")} className="w-10 h-10 rounded-xl flex items-center justify-center interactive text-on-surface-dim hover:text-on-surface"><ArrowLeft size={22} /></button>
            <div className="flex items-center gap-2">
              {note.pinned === 1 && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent-orange/10"><Pin size={12} className="text-accent-orange" /><span className="text-[11px] font-medium text-accent-orange">Закреплена</span></div>
              )}
              <button onClick={() => router.push(`/note/${id}/edit`)} className="h-9 px-4 rounded-xl bg-accent-blue/10 text-accent-blue text-[13px] font-semibold flex items-center gap-2 interactive"><Pencil size={14} />Редактировать</button>
            </div>
          </div>
        </header>

        <main className={`flex-1 flex ${cardPosition === "center" ? "items-center" : "items-start"} justify-center px-4 ${cardPosition === "center" ? "py-8" : "pt-16 pb-8"}`}>
          <div className="w-full max-w-lg animate-fade-in">
            <div className={`overflow-hidden rounded-[18px] ${
              isGlass
                ? `glass-surface ${glassTintMap[note.color] || ""}`
                : `${cardBg} border border-white/[0.04]`
            }`}>
              <div className="px-5 pt-5 pb-5">
                <h1 className="text-[22px] font-bold text-on-surface leading-tight mb-1" style={{ fontSize: `${22 * fontScale}px` }}>{note.title}</h1>

                {hasText && <div className="rich-content mt-3" style={{ fontSize: `${15 * fontScale}px` }} dangerouslySetInnerHTML={{ __html: note.content! }} />}

                {hasTasks && (
                  <div className="mt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1 h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                        <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[12px] font-medium text-on-surface-muted tabular-nums" style={{ fontSize: `${12 * fontScale}px` }}>{done}/{total}</span>
                    </div>
                    <div className="space-y-2.5">
                      {note.tasks.map((task) => (
                        <div key={task.id} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-[6px] flex items-center justify-center flex-shrink-0 transition-all duration-200"
                            style={task.done 
                              ? { backgroundColor: "transparent", border: "none" }
                              : { backgroundColor: "transparent", border: "1.5px solid rgba(255,255,255,0.35)" }
                            }
                          >
                            {task.done && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                          </div>
                          <span className={`text-[15px] leading-snug ${task.done ? "line-through text-on-surface-muted/50" : "text-on-surface-dim"}`} style={{ fontSize: `${15 * fontScale}px` }}>{task.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {showDate && (
              <div className="mt-4 px-1 animate-fade-in" style={{ animationDelay: "80ms" }}>
                <div className="flex items-center gap-2 text-[12px] text-on-surface-muted justify-end" style={{ fontSize: `${12 * fontScale}px` }}>
                  {showDateLabel && <span>Создана: </span>}
                  <span>{formatDate(note.createdAt, dateFormat)}</span>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
