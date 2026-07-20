"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import type { GradientShape } from "@/db/schema";

type Task = { id: string; text: string; done: boolean };
type Note = {
  id: string; title: string; content: string | null; color: string; style: string;
  shapes: GradientShape[]; tasks: Task[]; pinned: number; createdAt: string; updatedAt: string;
};

type CardPosition = "top" | "center";

const colorBgMap: Record<string, string> = {
  default: "#1c1c1f", blue: "#0a2a4a", purple: "#2a1a3a", green: "#0a2a1a",
  orange: "#2a1f0a", red: "#2a0a0a", pink: "#2a0a1a", teal: "#0a2a2a",
};

const fontSizeMap: Record<string, number> = { small: 0.85, normal: 1, large: 1.15, xlarge: 1.3 };

export default function NotePreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastTap, setLastTap] = useState(0);
  const [cardPosition, setCardPosition] = useState<CardPosition>("top");
  const [fontScale, setFontScale] = useState(1);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("notes-app-settings");
      if (raw) {
        const s = JSON.parse(raw);
        if (s.cardPosition) setCardPosition(s.cardPosition);
        if (s.fontSize && fontSizeMap[s.fontSize]) setFontScale(fontSizeMap[s.fontSize]);
      }
    } catch {}
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`/api/notes/${id}`);
        if (r.ok) {
          const d = await r.json();
          setNote(d);
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    })();
  }, [id]);

  // Double tap to exit
  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      router.push(`/note/${id}/edit`);
    }
    setLastTap(now);
  };

  if (loading) return <div className="min-h-screen bg-surface-0 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-accent-blue border-t-transparent animate-spin" /></div>;
  if (!note) return null;

  const isGlass = note.style === "glass";
  const hasTasks = note.tasks && note.tasks.length > 0;
  const hasContent = note.content && note.content.replace(/<[^>]*>/g, "").trim().length > 0;
  const doneCount = note.tasks.filter((t) => t.done).length;
  const totalCount = note.tasks.length;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const formatMonthYear = (dateStr: string) => {
    const d = new Date(dateStr);
    const month = d.toLocaleDateString("ru-RU", { month: "long" });
    const year = d.toLocaleDateString("ru-RU", { year: "numeric" });
    return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${year}`;
  };

  return (
    <div className="min-h-screen bg-surface-0 relative overflow-hidden" onClick={handleTap}>
      {/* Background shapes - exactly like regular view */}
      {note.shapes.length > 0 && (
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

      {/* Card - exactly like regular view with position setting */}
      <div className={`relative z-10 min-h-screen flex ${cardPosition === "center" ? "items-center" : "items-start"} justify-center px-4 ${cardPosition === "center" ? "py-8" : "pt-12 pb-8"}`}>
        <div className="w-full max-w-lg">
          <div
            className={`rounded-[18px] overflow-hidden ${
              isGlass
                ? "glass-surface"
                : ""
            }`}
            style={!isGlass ? { backgroundColor: colorBgMap[note.color], border: "1px solid rgba(255,255,255,0.04)" } : {}}
          >
            <div className="px-5 pt-5 pb-5">
              {/* Title with font scale */}
              <h1 className="text-[22px] font-bold text-on-surface leading-tight mb-1" style={{ fontSize: `${22 * fontScale}px` }}>{note.title}</h1>

              {/* Content with font scale */}
              {note.content && hasContent && (
                <div
                  className="rich-content mt-3"
                  style={{ fontSize: `${15 * fontScale}px`, lineHeight: 1.6 }}
                  dangerouslySetInnerHTML={{ __html: note.content }}
                />
              )}

              {/* Tasks with font scale */}
              {hasTasks && (
                <div className="mt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                      <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${(doneCount / totalCount) * 100}%` }} />
                    </div>
                    <span className="text-[12px] font-medium text-on-surface-muted tabular-nums" style={{ fontSize: `${12 * fontScale}px` }}>{doneCount}/{totalCount}</span>
                  </div>
                  <div className="space-y-2.5">
                    {note.tasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-[6px] flex items-center justify-center flex-shrink-0"
                          style={task.done 
                            ? { backgroundColor: "transparent", border: "none" }
                            : { backgroundColor: "transparent", border: "1.5px solid rgba(255,255,255,0.35)" }
                          }
                        >
                          {task.done && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-[15px] leading-snug ${task.done ? "line-through text-on-surface-muted/50" : "text-on-surface-dim"}`} style={{ fontSize: `${15 * fontScale}px` }}>{task.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Date at bottom right with font scale */}
          <div className="mt-4 flex justify-end animate-fade-in" style={{ animationDelay: "80ms" }}>
            <div className="text-[12px] text-on-surface-muted" style={{ fontSize: `${12 * fontScale}px` }}>
              {formatDate(note.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
