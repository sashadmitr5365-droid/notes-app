"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Moon, Palette, Info, Trash2, Type, Calendar, Eye, EyeOff, Tag } from "lucide-react";

type FontSize = "small" | "normal" | "large" | "xlarge";
type DateFormat = "full" | "date" | "month-year" | "year";
type CardPosition = "top" | "center";

type Settings = {
  defaultColor: string;
  defaultShapes: string;
  fontSize: FontSize;
  dateFormat: DateFormat;
  showDate: boolean;
  showDateLabel: boolean;
  cardPosition: CardPosition;
};

const fontSizeMap: Record<FontSize, { label: string; scale: number; preview: string }> = {
  small: { label: "Мелкий", scale: 0.85, preview: "text-[13px]" },
  normal: { label: "Обычный", scale: 1, preview: "text-[15px]" },
  large: { label: "Крупный", scale: 1.15, preview: "text-[17px]" },
  xlarge: { label: "Очень крупный", scale: 1.3, preview: "text-[20px]" },
};

const dateFormatOptions: { key: DateFormat; label: string; example: string }[] = [
  { key: "full", label: "Полная", example: "18 июля 2026 г., 21:07" },
  { key: "date", label: "Дата", example: "18 июля 2026 г." },
  { key: "month-year", label: "Месяц и год", example: "июль 2026 г." },
  { key: "year", label: "Только год", example: "2026 г." },
];

const colorOptions = [
  { key: "default", dot: "bg-on-surface-dim" }, { key: "blue", dot: "bg-accent-blue" },
  { key: "purple", dot: "bg-accent-purple" }, { key: "green", dot: "bg-accent-green" },
  { key: "orange", dot: "bg-accent-orange" }, { key: "red", dot: "bg-accent-red" },
  { key: "pink", dot: "bg-accent-pink" }, { key: "teal", dot: "bg-accent-teal" },
];

const STORAGE_KEY = "notes-app-settings";

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings>({
    defaultColor: "default",
    defaultShapes: "none",
    fontSize: "normal",
    dateFormat: "full",
    showDate: true,
    showDateLabel: true,
    cardPosition: "top",
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      const scale = fontSizeMap[settings.fontSize].scale;
      document.documentElement.style.setProperty("--font-scale", String(scale));
      if (scale !== 1) {
        document.body.setAttribute("data-font-scale", "true");
      } else {
        document.body.removeAttribute("data-font-scale");
      }
    }
  }, [settings, loaded]);

  const clearAll = async () => {
    if (!confirm("Удалить все заметки? Это необратимо.")) return;
    try {
      const r = await fetch("/api/notes");
      if (r.ok) {
        const notes = await r.json();
        await Promise.all(notes.map((n: { id: string }) => fetch(`/api/notes/${n.id}`, { method: "DELETE" })));
        router.push("/");
        router.refresh();
      }
    } catch (e) { console.error(e); }
  };

  if (!loaded) return <div className="min-h-screen bg-surface-0 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-accent-blue border-t-transparent animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-surface-0 flex flex-col">
      <header className="sticky top-0 z-30 bg-surface-0/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => router.push("/")} className="w-10 h-10 rounded-xl flex items-center justify-center interactive text-on-surface-dim hover:text-on-surface"><ArrowLeft size={22} /></button>
          <h1 className="text-[17px] font-semibold text-on-surface">Параметры</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="flex-1 px-4 pt-4 pb-8 max-w-lg mx-auto w-full space-y-4">
        {/* Font size */}
        <section className="bg-surface-2 rounded-2xl border border-white/[0.04] overflow-hidden animate-fade-in">
          <div className="flex items-center gap-3 px-4 pt-4 pb-2">
            <Type size={16} className="text-accent-teal" />
            <h2 className="text-[14px] font-semibold text-on-surface">Размер шрифта</h2>
          </div>
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 mb-3">
              {(Object.entries(fontSizeMap) as [FontSize, typeof fontSizeMap[FontSize]][]).map(([key, val]) => (
                <button key={key} onClick={() => setSettings({ ...settings, fontSize: key })}
                  className={`flex-1 py-2.5 rounded-xl text-[13px] font-medium transition-all ${settings.fontSize === key ? "bg-surface-4 text-on-surface" : "bg-surface-1 text-on-surface-dim"}`}>
                  {val.label}
                </button>
              ))}
            </div>
            <div className="bg-surface-1 rounded-xl p-3 border border-white/[0.03]">
              <p className={`font-medium text-on-surface mb-1 ${fontSizeMap[settings.fontSize].preview}`}>Заголовок заметки</p>
              <p className={`text-on-surface-dim ${fontSizeMap[settings.fontSize].preview}`} style={{ lineHeight: 1.5 }}>Пример текста заметки с выбранным размером.</p>
            </div>
          </div>
        </section>

        {/* Card position */}
        <section className="bg-surface-2 rounded-2xl border border-white/[0.04] overflow-hidden animate-fade-in" style={{ animationDelay: "30ms" }}>
          <div className="flex items-center gap-3 px-4 pt-4 pb-2">
            <div className="w-4 h-4 rounded-sm border border-on-surface-dim/50" />
            <h2 className="text-[14px] font-semibold text-on-surface">Позиция карточки</h2>
          </div>
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSettings({ ...settings, cardPosition: "top" })}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                  settings.cardPosition === "top"
                    ? "bg-surface-4 text-on-surface"
                    : "bg-surface-1 text-on-surface-dim hover:bg-surface-3"
                }`}
              >
                <div className="w-8 h-6 rounded bg-surface-3 border border-white/[0.06] relative">
                  <div className="absolute top-0.5 left-0.5 right-0.5 h-3 bg-accent-blue/30 rounded-sm" />
                </div>
                Сверху
              </button>
              <button
                onClick={() => setSettings({ ...settings, cardPosition: "center" })}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                  settings.cardPosition === "center"
                    ? "bg-surface-4 text-on-surface"
                    : "bg-surface-1 text-on-surface-dim hover:bg-surface-3"
                }`}
              >
                <div className="w-8 h-6 rounded bg-surface-3 border border-white/[0.06] relative">
                  <div className="absolute top-1/2 -translate-y-1/2 left-0.5 right-0.5 h-2.5 bg-accent-blue/30 rounded-sm" />
                </div>
                По центру
              </button>
            </div>
          </div>
        </section>

        {/* Date display */}
        <section className="bg-surface-2 rounded-2xl border border-white/[0.04] overflow-hidden animate-fade-in" style={{ animationDelay: "60ms" }}>
          <div className="flex items-center gap-3 px-4 pt-4 pb-2">
            <Calendar size={16} className="text-accent-orange" />
            <h2 className="text-[14px] font-semibold text-on-surface">Дата создания</h2>
          </div>
          <div className="px-4 pb-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {settings.showDate ? <Eye size={15} className="text-on-surface-dim" /> : <EyeOff size={15} className="text-on-surface-muted" />}
                <span className="text-[13px] text-on-surface-dim">Показывать дату</span>
              </div>
              <button
                onClick={() => setSettings({ ...settings, showDate: !settings.showDate })}
                className={`w-11 h-6 rounded-full transition-all duration-200 ${settings.showDate ? "bg-accent-blue" : "bg-surface-4"}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200 ${settings.showDate ? "translate-x-[22px]" : "translate-x-[2px]"}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag size={15} className="text-on-surface-dim" />
                <span className="text-[13px] text-on-surface-dim">Слово «Создана:»</span>
              </div>
              <button
                onClick={() => setSettings({ ...settings, showDateLabel: !settings.showDateLabel })}
                className={`w-11 h-6 rounded-full transition-all duration-200 ${settings.showDateLabel ? "bg-accent-blue" : "bg-surface-4"}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200 ${settings.showDateLabel ? "translate-x-[22px]" : "translate-x-[2px]"}`} />
              </button>
            </div>

            {settings.showDate && (
              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-muted mb-1">Формат</p>
                {dateFormatOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setSettings({ ...settings, dateFormat: opt.key })}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                      settings.dateFormat === opt.key
                        ? "bg-surface-4 text-on-surface"
                        : "bg-surface-1 text-on-surface-dim hover:bg-surface-3"
                    }`}
                  >
                    <span className="text-[13px] font-medium">{opt.label}</span>
                    <span className="text-[12px] opacity-60">{opt.example}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Default color */}
        <section className="bg-surface-2 rounded-2xl border border-white/[0.04] overflow-hidden animate-fade-in" style={{ animationDelay: "120ms" }}>
          <div className="flex items-center gap-3 px-4 pt-4 pb-2">
            <Palette size={16} className="text-accent-purple" />
            <h2 className="text-[14px] font-semibold text-on-surface">Цвет по умолчанию</h2>
          </div>
          <div className="px-4 pb-4 flex items-center gap-2 flex-wrap">
            {colorOptions.map((opt) => (
              <button key={opt.key} onClick={() => setSettings({ ...settings, defaultColor: opt.key })}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${settings.defaultColor === opt.key ? "bg-surface-4 ring-1 ring-white/[0.1]" : "bg-surface-1"}`}>
                <div className={`w-4 h-4 rounded-full ${opt.dot}`} />
              </button>
            ))}
          </div>
        </section>

        {/* Theme info */}
        <section className="bg-surface-2 rounded-2xl border border-white/[0.04] overflow-hidden animate-fade-in" style={{ animationDelay: "180ms" }}>
          <div className="flex items-center gap-3 px-4 pt-4 pb-2">
            <Moon size={16} className="text-accent-orange" />
            <h2 className="text-[14px] font-semibold text-on-surface">Оформление</h2>
          </div>
          <div className="px-4 pb-4">
            <p className="text-[13px] text-on-surface-dim leading-relaxed">
              Тёмная тема активна всегда. Глассморфизм отображается с размытием фона и градиентными фигурами, создавая эффект настоящего матового стекла.
            </p>
          </div>
        </section>

        {/* Danger zone */}
        <section className="animate-fade-in" style={{ animationDelay: "240ms" }}>
          <button onClick={clearAll} className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-accent-red/60 hover:text-accent-red hover:bg-accent-red/5 transition-all w-full">
            <Trash2 size={16} />
            <span className="text-[14px] font-medium">Удалить все заметки</span>
          </button>
        </section>

        {/* About */}
        <section className="bg-surface-2 rounded-2xl border border-white/[0.04] overflow-hidden animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center gap-3 px-4 pt-4 pb-2">
            <Info size={16} className="text-on-surface-muted" />
            <h2 className="text-[14px] font-semibold text-on-surface">О приложении</h2>
          </div>
          <div className="px-4 pb-4 space-y-1">
            <p className="text-[13px] text-on-surface-dim">Заметки v1.0</p>
            <p className="text-[12px] text-on-surface-muted">Минималистичное приложение для заметок и задач с глассморфизмом</p>
          </div>
        </section>
      </main>
    </div>
  );
}
