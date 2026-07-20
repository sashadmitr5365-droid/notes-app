"use client";

import type { GradientShape } from "@/db/schema";

interface PageBackgroundProps {
  shapes: GradientShape[];
}

export default function PageBackground({ shapes }: PageBackgroundProps) {
  if (!shapes || shapes.length === 0) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {shapes.map((s) => (
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
  );
}
