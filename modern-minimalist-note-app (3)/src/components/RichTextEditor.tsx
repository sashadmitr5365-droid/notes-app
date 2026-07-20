"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Superscript,
  Subscript,
  Highlighter,
  Palette,
  Link,
  X,
} from "lucide-react";

interface RichTextEditorProps {
  initialContent?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
}

const textColors = [
  { color: "#ffffff", label: "Белый" },
  { color: "#e8e8ec", label: "Светлый" },
  { color: "#8e8e93", label: "Серый" },
  { color: "#5c5c60", label: "Тёмный" },
  { color: "#0a84ff", label: "Синий" },
  { color: "#5e5ce6", label: "Индиго" },
  { color: "#bf5af2", label: "Фиолетовый" },
  { color: "#30d158", label: "Зелёный" },
  { color: "#30b0c7", label: "Морская волна" },
  { color: "#64d2ff", label: "Голубой" },
  { color: "#0a84ff", label: "Ярко-синий" },
  { color: "#ff9f0a", label: "Оранжевый" },
  { color: "#ff453a", label: "Красный" },
  { color: "#ff375f", label: "Розовый" },
  { color: "#ffd60a", label: "Жёлтый" },
  { color: "#ff6b35", label: "Коралл" },
  { color: "#a855f7", label: "Лаванда" },
  { color: "#14b8a6", label: "Бирюза" },
];

const highlightColors = [
  { color: "rgba(255, 200, 50, 0.4)", label: "Жёлтый" },
  { color: "rgba(255, 159, 10, 0.4)", label: "Оранжевый" },
  { color: "rgba(255, 69, 58, 0.35)", label: "Красный" },
  { color: "rgba(255, 55, 95, 0.35)", label: "Розовый" },
  { color: "rgba(191, 90, 242, 0.35)", label: "Фиолетовый" },
  { color: "rgba(168, 85, 247, 0.35)", label: "Лаванда" },
  { color: "rgba(10, 132, 255, 0.35)", label: "Синий" },
  { color: "rgba(100, 210, 255, 0.35)", label: "Голубой" },
  { color: "rgba(48, 209, 88, 0.35)", label: "Зелёный" },
  { color: "rgba(20, 184, 166, 0.35)", label: "Бирюза" },
  { color: "rgba(255, 255, 255, 0.25)", label: "Белый" },
  { color: "transparent", label: "Сбросить" },
];

export default function RichTextEditor({
  initialContent = "",
  onChange,
  placeholder = "Начните писать...",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [isEmpty, setIsEmpty] = useState(!initialContent || initialContent === "<br>");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlighter, setShowHighlighter] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const updateActiveFormats = useCallback(() => {
    const formats = new Set<string>();
    const checks = ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript", "justifyLeft", "justifyCenter", "justifyRight", "insertUnorderedList", "insertOrderedList"];
    checks.forEach((cmd) => { if (document.queryCommandState(cmd)) formats.add(cmd); });
    setActiveFormats(formats);
  }, []);

  const saveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
  }, []);

  const restoreAndExec = useCallback((command: string, value?: string) => {
    editorRef.current?.focus();
    if (savedRangeRef.current) {
      const sel = window.getSelection();
      if (sel) { sel.removeAllRanges(); sel.addRange(savedRangeRef.current); }
    }

    if (command === "formatBlock") {
      document.execCommand("formatBlock", false, value);
    } else if (command === "codeFormat") {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const code = document.createElement("code");
        code.style.background = "rgba(255,255,255,0.06)";
        code.style.padding = "2px 6px";
        code.style.borderRadius = "4px";
        code.style.fontSize = "13px";
        code.style.fontFamily = "monospace";
        code.style.color = "#ff9f0a";
        try { range.surroundContents(code); }
        catch { document.execCommand("insertHTML", false, `<code style="background:rgba(255,255,255,0.06);padding:2px 6px;border-radius:4px;font-size:13px;font-family:monospace;color:#ff9f0a">${sel.toString()}</code>`); }
      }
    } else if (command === "createLink") {
      if (linkUrl.trim()) { document.execCommand("createLink", false, linkUrl.trim()); setLinkUrl(""); setShowColorPicker(false); }
    } else {
      document.execCommand(command, false, value);
    }

    updateActiveFormats();
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      const text = editorRef.current.innerText.trim();
      setIsEmpty(!text);
      onChange?.(html);
    }
  }, [linkUrl, onChange, updateActiveFormats]);

  useEffect(() => {
    if (editorRef.current && initialContent) { editorRef.current.innerHTML = initialContent; }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    const text = editorRef.current.innerText.trim();
    setIsEmpty(!text);
    onChange?.(html);
    updateActiveFormats();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) savedRangeRef.current = sel.getRangeAt(0).cloneRange();
      switch (e.key.toLowerCase()) {
        case "b": e.preventDefault(); restoreAndExec("bold"); break;
        case "i": e.preventDefault(); restoreAndExec("italic"); break;
        case "u": e.preventDefault(); restoreAndExec("underline"); break;
      }
    }
    setTimeout(updateActiveFormats, 10);
  };

  const openColorPicker = () => { saveSelection(); setShowColorPicker(true); setShowHighlighter(false); };
  const openHighlighter = () => { saveSelection(); setShowHighlighter(true); setShowColorPicker(false); };
  const closePickers = () => { setShowColorPicker(false); setShowHighlighter(false); };

  const formatBtn = (cmd: string, icon: React.ReactNode, label: string, value?: string) => (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); saveSelection(); restoreAndExec(cmd, value); }}
      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
        activeFormats.has(cmd) ? "bg-accent-blue/15 text-accent-blue" : "text-on-surface-muted hover:bg-surface-3 hover:text-on-surface-dim"
      }`}
      title={label}
    >
      {icon}
    </button>
  );

  return (
    <div className="w-full relative">
      {/* Toolbar */}
      <div className="bg-surface-1 rounded-xl border border-white/[0.04] p-1.5 mb-2">
        <div className="flex items-center gap-0.5 flex-wrap">
          {formatBtn("bold", <Bold size={14} />, "Жирный")}
          {formatBtn("italic", <Italic size={14} />, "Курсив")}
          {formatBtn("underline", <Underline size={14} />, "Подчёркнутый")}
          {formatBtn("strikeThrough", <Strikethrough size={14} />, "Зачёркнутый")}

          <div className="w-px h-4 bg-white/[0.06] mx-0.5 flex-shrink-0" />

          {/* Text Color Button */}
          <button
            type="button"
            onClick={openColorPicker}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-muted hover:bg-surface-3 transition-all flex-shrink-0"
            title="Цвет текста"
          >
            <Palette size={14} />
          </button>

          {/* Highlighter Button */}
          <button
            type="button"
            onClick={openHighlighter}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-muted hover:bg-surface-3 transition-all flex-shrink-0"
            title="Выделение"
          >
            <Highlighter size={14} />
          </button>

          <div className="w-px h-4 bg-white/[0.06] mx-0.5 flex-shrink-0" />

          {formatBtn("justifyLeft", <AlignLeft size={14} />, "По левому")}
          {formatBtn("justifyCenter", <AlignCenter size={14} />, "По центру")}
          {formatBtn("justifyRight", <AlignRight size={14} />, "По правому")}

          <div className="w-px h-4 bg-white/[0.06] mx-0.5 flex-shrink-0" />

          {formatBtn("insertUnorderedList", <List size={14} />, "Маркированный")}
          {formatBtn("insertOrderedList", <ListOrdered size={14} />, "Нумерованный")}

          <div className="w-px h-4 bg-white/[0.06] mx-0.5 flex-shrink-0" />

          {formatBtn("formatBlock", <Quote size={14} />, "Цитата", "blockquote")}
          {formatBtn("codeFormat", <Code size={14} />, "Код")}
          {formatBtn("insertHorizontalRule", <Minus size={14} />, "Разделитель")}

          <div className="w-px h-4 bg-white/[0.06] mx-0.5 flex-shrink-0" />

          {/* Link */}
          <div className="relative">
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
              onClick={() => { closePickers(); }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-muted hover:bg-surface-3 transition-all flex-shrink-0"
              title="Ссылка"
            >
              <Link size={14} />
            </button>
            {activeFormats.has("createLink") && (
              <div className="absolute top-full right-0 mt-2 bg-surface-3 rounded-xl border border-white/[0.06] p-3 z-50 animate-scale-in shadow-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <input type="url" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://..."
                    className="flex-1 h-9 px-3 rounded-lg bg-surface-2 text-[13px] text-on-surface outline-none border border-white/[0.04] w-48" />
                  <button onClick={() => restoreAndExec("createLink")} className="h-9 px-3 rounded-lg bg-accent-blue/15 text-accent-blue text-[12px] font-medium">OK</button>
                </div>
              </div>
            )}
          </div>

          {formatBtn("superscript", <Superscript size={14} />, "Надстрочный")}
          {formatBtn("subscript", <Subscript size={14} />, "Подстрочный")}
        </div>
      </div>

      {/* Color Picker Modal */}
      {showColorPicker && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={closePickers}>
          <div className="bg-surface-2 rounded-2xl border border-white/[0.08] p-5 shadow-2xl animate-scale-in max-w-[90vw] w-[400px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-semibold text-on-surface">Цвет текста</h3>
              <button onClick={closePickers} className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-muted hover:bg-surface-3 hover:text-on-surface transition-all">
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2.5">
              {textColors.map((tc) => (
                <button
                  key={tc.color}
                  type="button"
                  onClick={() => { restoreAndExec("foreColor", tc.color); closePickers(); }}
                  className="w-11 h-11 rounded-xl border border-white/[0.06] transition-all hover:scale-110 shadow-lg"
                  style={{ backgroundColor: tc.color }}
                  title={tc.label}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Highlighter Picker Modal */}
      {showHighlighter && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={closePickers}>
          <div className="bg-surface-2 rounded-2xl border border-white/[0.08] p-5 shadow-2xl animate-scale-in max-w-[90vw] w-[400px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-semibold text-on-surface">Выделение текста</h3>
              <button onClick={closePickers} className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-muted hover:bg-surface-3 hover:text-on-surface transition-all">
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {highlightColors.map((hc) => (
                <button
                  key={hc.color}
                  type="button"
                  onClick={() => { restoreAndExec("hiliteColor", hc.color); closePickers(); }}
                  className="w-12 h-12 rounded-xl border transition-all hover:scale-110 shadow-lg"
                  style={hc.color === "transparent" ? { borderColor: "rgba(255,255,255,0.15)", background: "#1c1c1f" } : { backgroundColor: hc.color, borderColor: "rgba(255,255,255,0.08)" }}
                  title={hc.label}
                >
                  {hc.color === "transparent" && <span className="text-[14px] text-on-surface-muted">✕</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="relative">
        {isEmpty && (
          <div className="absolute top-0 left-0 pointer-events-none text-on-surface-muted/35 text-[15px] leading-relaxed">
            {placeholder}
          </div>
        )}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleChange}
          onKeyUp={updateActiveFormats}
          onMouseUp={() => { saveSelection(); updateActiveFormats(); }}
          onKeyDown={handleKeyDown}
          className="w-full text-[15px] text-on-surface-dim leading-relaxed outline-none focus:outline-none"
        />
      </div>
    </div>
  );
}
