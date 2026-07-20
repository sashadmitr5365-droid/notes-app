"use client";

import type { GradientShape } from "@/db/schema";

export default function CardBackground({ shapes }: { shapes: GradientShape[] }) {
  if (!shapes || shapes.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {shapes.map((s) => (
        <div
          key={s.id}
          className="absolute"
          style={{
            left: `${s.cx - s.size / 2}%`,
            top: `${s.cy - s.size / 2}%`,
            width: `${s.size}%`,
            paddingBottom: `${s.size}%`,
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
