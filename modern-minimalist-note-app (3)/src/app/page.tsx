"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Pin, StickyNote, Trash2, X, Settings } from "lucide-react";
import type { GradientShape } from "@/db/schema";

type Task = { id: string; text: string; done: boolean };

type Note = {
  id: string; title: string; content: string | null; color: string; style: string;
  shapes: GradientShape[]; tasks: Task[]; pinned: number; createdAt: string; updatedAt: string;
};

const colorMap: Record<string, { card: string; dot: string }> = {
  default: { card: "bg-surface-2", dot: "bg-accent-orange" },
  blue: { card: "bg-card-blue", dot: "bg-accent-blue" },
  purple: { card: "bg-card-purple", dot: "bg-accent-purple" },
  green: { card: "bg-card-green", dot: "bg-accent-green" },
  orange: { card: "bg-card-orange", dot: "bg-accent-orange" },
  red: { card: "bg-card-red", dot: "bg-accent-red" },
  pink: { card: "bg-card-pink", dot: "bg-accent-pink" },
  teal: { card: "bg-card-teal", dot: "bg-accent-teal" },
};

const glassTintMap: Record<string, string> = {
  default: "", blue: "glass-tint-blue", purple: "glass-tint-purple", green: "glass-tint-green",
  orange: "glass-tint-orange", red: "glass-tint-red", pink: "glass-tint-pink", teal: "glass-tint-teal",
};

function formatDate(d: string): string {
  const dt = new Date(d), now = new Date(), diff = now.getTime() - dt.getTime();
  const m = Math.floor(diff / 60000), h = Math.floor(diff / 3600000), dd = Math.floor(diff / 86400000);
  if (m < 1) return "только что"; if (m < 60) return `${m} мин назад`; if (h < 24) return `${h} ч назад`; if (dd < 7) return `${dd} дн назад`;
  return dt.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
}

function stripHtml(h: string) { return h.replace(/<[^>]*>/g, ""); }
function hasContent(h: string | null) { return !!h && stripHtml(h).trim().length > 0; }

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    try { const r = await fetch("/api/notes"); if (r.ok) setNotes(await r.json()); }
    catch (e) { console.error(e); } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchNotes(); }, [fetchNotes]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); setDeletingId(id);
    try { await fetch(`/api/notes/${id}`, { method: "DELETE" }); setNotes((p) => p.filter((n) => n.id !== id)); }
    catch (err) { console.error(err); } setDeletingId(null);
  };

  const filtered = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    (n.content && stripHtml(n.content).toLowerCase().includes(search.toLowerCase())) ||
    n.tasks.some((t) => t.text.toLowerCase().includes(search.toLowerCase()))
  );
  const pinnedNotes = filtered.filter((n) => n.pinned === 1);
  const regularNotes = filtered.filter((n) => n.pinned !== 1);

  // Collect all shapes from glass notes for page background
  const allShapes = notes.filter((n) => n.style === "glass" && n.shapes?.length > 0).flatMap((n) => n.shapes);

  return (
    <div className="min-h-screen bg-surface-0 flex flex-col relative">
      {/* Background gradient shapes for the entire page */}
      {allShapes.length > 0 && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
          {allShapes.map((s) => (
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
                opacity: s.opacity * 0.5,
                transform: `rotate(${s.rotation}deg)`,
                filter: `blur(${s.blur}px)`,
                mixBlendMode: "screen" as const,
              }}
            />
          ))}
        </div>
      )}

      <header className="sticky top-0 z-30 bg-surface-0/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="px-5 pt-4 pb-3">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-[26px] font-bold tracking-tight text-on-surface">Заметки</h1>
              <p className="text-[13px] text-on-surface-muted mt-0.5">
                {notes.length === 0 ? "Нет заметок" : `${notes.length} ${notes.length === 1 ? "заметка" : notes.length < 5 ? "заметки" : "заметок"}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => router.push("/settings")} className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center interactive"><Settings size={18} className="text-on-surface-dim" /></button>
              <button onClick={() => setSearchOpen(!searchOpen)} className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center interactive">
                {searchOpen ? <X size={18} className="text-on-surface-dim" /> : <Search size={18} className="text-on-surface-dim" />}
              </button>
            </div>
          </div>
          {searchOpen && (
            <div className="mt-3 animate-fade-in">
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-muted" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск..." autoFocus
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface-2 text-on-surface text-[15px] placeholder:text-on-surface-muted outline-none border border-white/[0.04] focus:border-accent-blue/30 transition-colors" />
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 px-4 pb-24 pt-3 relative z-10">
        {loading ? (
          <div className="flex items-center justify-center pt-32"><div className="w-8 h-8 rounded-full border-2 border-accent-blue border-t-transparent animate-spin" /></div>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-32 gap-4 animate-fade-in">
            <div className="w-20 h-20 rounded-3xl bg-surface-2 flex items-center justify-center"><StickyNote size={36} className="text-on-surface-muted" /></div>
            <div className="text-center"><p className="text-on-surface-dim text-lg font-medium">Пока пусто</p><p className="text-on-surface-muted text-sm mt-1">Создайте первую заметку</p></div>
          </div>
        ) : (
          <>
            {pinnedNotes.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3 px-1"><Pin size={13} className="text-on-surface-muted" /><span className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-muted">Закреплённые</span></div>
                <div className="flex flex-col gap-3">
                  {pinnedNotes.map((note, i) => <NoteCard key={note.id} note={note} index={i} onClick={() => router.push(`/note/${note.id}`)} onDelete={handleDelete} deletingId={deletingId} />)}
                </div>
              </div>
            )}
            {regularNotes.length > 0 && (
              <div>
                {pinnedNotes.length > 0 && <div className="flex items-center gap-2 mb-3 px-1"><span className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-muted">Другие</span></div>}
                <div className="flex flex-col gap-3">
                  {regularNotes.map((note, i) => <NoteCard key={note.id} note={note} index={pinnedNotes.length + i} onClick={() => router.push(`/note/${note.id}`)} onDelete={handleDelete} deletingId={deletingId} />)}
                </div>
              </div>
            )}
            {filtered.length === 0 && search && (
              <div className="flex flex-col items-center justify-center pt-20 gap-3 animate-fade-in"><Search size={32} className="text-on-surface-muted" /><p className="text-on-surface-muted text-sm">Ничего не найдено</p></div>
            )}
          </>
        )}
      </main>

      <div className="fixed bottom-7 right-5 z-40">
        <button onClick={() => router.push("/note/new")} className="w-14 h-14 rounded-2xl bg-accent-blue flex items-center justify-center shadow-lg shadow-accent-blue/25 interactive fab-pulse">
          <Plus size={26} className="text-white" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

function NoteCard({ note, index, onClick, onDelete, deletingId }: {
  note: Note; index: number; onClick: () => void; onDelete: (id: string, e: React.MouseEvent) => void; deletingId: string | null;
}) {
  const colors = colorMap[note.color] || colorMap.default;
  const isGlass = note.style === "glass";
  const hasTasks = note.tasks && note.tasks.length > 0;
  const hasText = hasContent(note.content);
  const total = hasTasks ? note.tasks.length : 0;
  const done = hasTasks ? note.tasks.filter((t) => t.done).length : 0;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div onClick={onClick} className="note-card interactive" style={{ animationDelay: `${index * 60}ms` }}>
      <div className={`overflow-hidden rounded-[14px] transition-all duration-200 ${
        isGlass
          ? `glass-surface ${glassTintMap[note.color] || ""}`
          : `${colors.card} border border-white/[0.04]`
      }`}>
        <div className="p-3.5">
          <div className="flex items-start gap-2.5">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                {note.pinned === 1 && <Pin size={11} className="text-accent-orange flex-shrink-0" />}
                <h3 className="text-[14px] font-semibold text-on-surface truncate">{note.title}</h3>
              </div>
              {hasText && <div className="rich-content rich-content-preview text-[13px] mt-1.5" dangerouslySetInnerHTML={{ __html: note.content! }} />}
              {hasTasks && (
                <div className="mt-2">
                  {total > 0 && (
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="flex-1 h-[2px] rounded-full bg-white/[0.06] overflow-hidden">
                        <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[10px] font-medium text-on-surface-muted tabular-nums">{done}/{total}</span>
                    </div>
                  )}
                  <div className="space-y-0.5">
                    {note.tasks.slice(0, 4).map((task) => (
                      <div key={task.id} className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-[4px] flex items-center justify-center flex-shrink-0 transition-all duration-200"
                          style={task.done 
                            ? { backgroundColor: "transparent", border: "none" }
                            : { backgroundColor: "transparent", border: "1.5px solid rgba(255,255,255,0.35)" }
                          }
                        >
                          {task.done && <svg width="7" height="6" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        </div>
                        <span className={`text-[12px] leading-snug ${task.done ? "line-through text-on-surface-muted/50" : "text-on-surface-dim"}`}>{task.text}</span>
                      </div>
                    ))}
                    {note.tasks.length > 4 && <span className="text-[10px] text-on-surface-muted pl-[22px]">+{note.tasks.length - 4}</span>}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-1.5 mt-2">
                <div className={`w-1 h-1 rounded-full ${colors.dot} opacity-60`} />
                <span className="text-[10px] text-on-surface-muted">{formatDate(note.updatedAt)}</span>
              </div>
            </div>
            <button onClick={(e) => onDelete(note.id, e)} className="w-7 h-7 rounded-lg flex items-center justify-center text-on-surface-muted/40 hover:text-accent-red hover:bg-accent-red/10 transition-colors flex-shrink-0">
              {deletingId === note.id ? <div className="w-3 h-3 rounded-full border-[1.5px] border-accent-red border-t-transparent animate-spin" /> : <Trash2 size={13} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
