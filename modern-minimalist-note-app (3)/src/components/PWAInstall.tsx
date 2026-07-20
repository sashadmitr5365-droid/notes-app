"use client";

import { useEffect, useState } from "react";

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show install prompt after 3 seconds if not installed
      setTimeout(() => {
        const installed = localStorage.getItem("pwa-installed");
        if (!installed) {
          setShowInstall(true);
        }
      }, 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      localStorage.setItem("pwa-installed", "true");
      setShowInstall(false);
    }

    setDeferredPrompt(null);
  };

  const dismiss = () => {
    localStorage.setItem("pwa-dismissed", Date.now().toString());
    setShowInstall(false);
  };

  if (!showInstall) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-[100] animate-fade-in">
      <div className="bg-surface-2 rounded-2xl border border-white/[0.08] p-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-blue/15 flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-accent-blue">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[14px] font-semibold text-on-surface mb-0.5">
              Установить приложение
            </h3>
            <p className="text-[12px] text-on-surface-muted leading-relaxed">
              Добавьте «Заметки» на главный экран для быстрого доступа
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={dismiss}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-on-surface-muted hover:bg-surface-3 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button
              onClick={handleInstall}
              className="px-3 py-1.5 rounded-lg bg-accent-blue text-white text-[12px] font-medium hover:bg-accent-blue/90 transition-all"
            >
              Установить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
