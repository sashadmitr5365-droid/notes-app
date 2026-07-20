"use client";

import { useEffect } from "react";

const fontSizeMap: Record<string, number> = {
  small: 0.85,
  normal: 1,
  large: 1.15,
  xlarge: 1.3,
};

export function FontSizeInitializer() {
  useEffect(() => {
    try {
      const raw = localStorage.getItem("notes-app-settings");
      if (raw) {
        const s = JSON.parse(raw);
        const scale = fontSizeMap[s.fontSize] || 1;
        document.documentElement.style.setProperty("--font-scale", String(scale));
        if (scale !== 1) {
          document.body.setAttribute("data-font-scale", "true");
        }
      }
    } catch {}
  }, []);

  return null;
}
