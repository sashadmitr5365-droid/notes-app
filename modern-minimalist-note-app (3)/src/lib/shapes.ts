import type { GradientShape } from "@/db/schema";

export type ShapePreset = {
  key: string;
  label: string;
  shapes: GradientShape[];
  category: "main" | "colors" | "mystery" | "other";
};

let _id = 0;
function shape(
  cx: number,
  cy: number,
  size: number,
  colors: [string, string],
  opts: Partial<Omit<GradientShape, "id" | "cx" | "cy" | "size" | "colors">> = {}
): GradientShape {
  _id++;
  return {
    id: `s-${_id}`,
    cx, cy, size, colors,
    opacity: opts.opacity ?? 0.5,
    borderRadius: opts.borderRadius ?? "50%",
    rotation: opts.rotation ?? 0,
    blur: opts.blur ?? 40,
  };
}

export const SHAPE_PRESETS: ShapePreset[] = [
  // === MAIN TAB - Complex gradient shapes ===
  {
    key: "aurora",
    label: "Аврора",
    category: "main",
    shapes: [
      shape(15, 25, 55, ["#00ffaa", "#004466"], { borderRadius: "40% 60% 55% 45% / 55% 40% 60% 45%", blur: 70, opacity: 0.45, rotation: -15 }),
      shape(78, 65, 45, ["#00ccff", "#004488"], { borderRadius: "60% 40% 50% 50% / 45% 55% 45% 55%", blur: 60, opacity: 0.4, rotation: 30 }),
      shape(45, 82, 38, ["#22ddaa", "#006655"], { borderRadius: "50% 50% 40% 60% / 60% 40% 60% 40%", blur: 55, opacity: 0.35, rotation: -20 }),
    ],
  },
  {
    key: "aurora-deluxe",
    label: "Аврора Делюкс",
    category: "main",
    shapes: [
      shape(10, 20, 50, ["#00ffcc", "#006655"], { borderRadius: "40% 60% 50% 50% / 50% 50% 60% 40%", blur: 75, opacity: 0.4, rotation: -20 }),
      shape(50, 30, 55, ["#00ddff", "#005577"], { borderRadius: "50% 50% 40% 60% / 60% 40% 50% 50%", blur: 70, opacity: 0.35, rotation: 15 }),
      shape(85, 55, 45, ["#00bbff", "#004466"], { borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%", blur: 65, opacity: 0.35, rotation: 25 }),
      shape(30, 75, 40, ["#00ffaa", "#005544"], { borderRadius: "45% 55% 50% 50% / 50% 50% 45% 55%", blur: 60, opacity: 0.3, rotation: -10 }),
      shape(65, 85, 35, ["#00eecc", "#006655"], { borderRadius: "50%", blur: 55, opacity: 0.25, rotation: 0 }),
    ],
  },
  {
    key: "sunset",
    label: "Закат",
    category: "main",
    shapes: [
      shape(72, 18, 50, ["#ff6b35", "#ff2266"], { borderRadius: "45% 55% 60% 40% / 50% 50% 50% 50%", blur: 65, opacity: 0.45, rotation: 10 }),
      shape(12, 68, 45, ["#ff3399", "#9933ff"], { borderRadius: "55% 45% 40% 60% / 45% 55% 45% 55%", blur: 60, opacity: 0.4, rotation: -25 }),
      shape(52, 48, 35, ["#ffaa00", "#ff5500"], { borderRadius: "50%", blur: 50, opacity: 0.35, rotation: 0 }),
    ],
  },
  {
    key: "sunset-deluxe",
    label: "Закат Делюкс",
    category: "main",
    shapes: [
      shape(70, 15, 45, ["#ff5533", "#ff1155"], { borderRadius: "50%", blur: 70, opacity: 0.4, rotation: 0 }),
      shape(45, 35, 50, ["#ff7755", "#ff3366"], { borderRadius: "45% 55% 50% 50% / 50% 50% 55% 45%", blur: 65, opacity: 0.35, rotation: 15 }),
      shape(20, 55, 40, ["#ff9977", "#ff5577"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: -10 }),
      shape(80, 65, 35, ["#ffbb99", "#ff7788"], { borderRadius: "50%", blur: 55, opacity: 0.3, rotation: 5 }),
      shape(55, 80, 30, ["#ffddaa", "#ff9999"], { borderRadius: "50%", blur: 50, opacity: 0.25, rotation: 0 }),
    ],
  },
  {
    key: "cosmos",
    label: "Космос",
    category: "main",
    shapes: [
      shape(32, 28, 60, ["#6600cc", "#1a0044"], { borderRadius: "40% 60% 45% 55% / 55% 45% 55% 45%", blur: 70, opacity: 0.5, rotation: 20 }),
      shape(75, 15, 40, ["#3366ff", "#0044aa"], { borderRadius: "50% 50% 40% 60% / 60% 40% 50% 50%", blur: 55, opacity: 0.4, rotation: -10 }),
      shape(18, 78, 40, ["#cc00ff", "#6600aa"], { borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%", blur: 60, opacity: 0.45, rotation: 35 }),
    ],
  },
  {
    key: "cosmos-deluxe",
    label: "Космос Делюкс",
    category: "main",
    shapes: [
      shape(25, 25, 55, ["#5500aa", "#110033"], { borderRadius: "45% 55% 50% 50% / 50% 50% 45% 55%", blur: 75, opacity: 0.45, rotation: 10 }),
      shape(55, 35, 50, ["#7700cc", "#220055"], { borderRadius: "50%", blur: 70, opacity: 0.4, rotation: -15 }),
      shape(80, 50, 45, ["#9933ff", "#330077"], { borderRadius: "40% 60% 55% 45% / 55% 45% 60% 40%", blur: 65, opacity: 0.4, rotation: 20 }),
      shape(35, 65, 40, ["#aa55ff", "#440088"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: -10 }),
      shape(65, 80, 35, ["#bb77ff", "#550099"], { borderRadius: "55% 45% 45% 55% / 45% 55% 55% 45%", blur: 55, opacity: 0.3, rotation: 5 }),
      shape(45, 50, 30, ["#cc99ff", "#6600aa"], { borderRadius: "50%", blur: 50, opacity: 0.25, rotation: 0 }),
    ],
  },
  {
    key: "neon",
    label: "Неон",
    category: "main",
    shapes: [
      shape(22, 28, 50, ["#ff00ff", "#7700ff"], { borderRadius: "45% 55% 60% 40% / 50% 50% 50% 50%", blur: 60, opacity: 0.45, rotation: 15 }),
      shape(78, 68, 45, ["#00ffff", "#0066ff"], { borderRadius: "55% 45% 40% 60% / 60% 40% 55% 45%", blur: 55, opacity: 0.4, rotation: -20 }),
    ],
  },
  {
    key: "neon-dreams",
    label: "Неоновые мечты",
    category: "main",
    shapes: [
      shape(15, 25, 45, ["#ff00aa", "#5500ff"], { borderRadius: "50%", blur: 65, opacity: 0.45, rotation: 10 }),
      shape(50, 50, 50, ["#00ffff", "#0066ff"], { borderRadius: "50%", blur: 60, opacity: 0.4, rotation: 0 }),
      shape(85, 75, 40, ["#ff00ff", "#aa00ff"], { borderRadius: "50%", blur: 55, opacity: 0.35, rotation: -15 }),
    ],
  },
  {
    key: "ocean",
    label: "Океан",
    category: "main",
    shapes: [
      shape(28, 32, 60, ["#0055aa", "#002244"], { borderRadius: "40% 60% 50% 50% / 55% 45% 55% 45%", blur: 70, opacity: 0.45, rotation: -10 }),
      shape(72, 22, 40, ["#00aacc", "#006688"], { borderRadius: "50%", blur: 55, opacity: 0.3, rotation: 0 }),
      shape(18, 82, 35, ["#00ddaa", "#005544"], { borderRadius: "55% 45% 60% 40% / 45% 55% 40% 60%", blur: 50, opacity: 0.25, rotation: 25 }),
    ],
  },
  {
    key: "ocean-depths",
    label: "Глубины океана",
    category: "main",
    shapes: [
      shape(20, 30, 55, ["#003366", "#001122"], { borderRadius: "50%", blur: 70, opacity: 0.5, rotation: 0 }),
      shape(50, 55, 50, ["#006699", "#003355"], { borderRadius: "50%", blur: 65, opacity: 0.4, rotation: 10 }),
      shape(80, 75, 45, ["#0099cc", "#005577"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: -10 }),
    ],
  },
  {
    key: "lavender",
    label: "Лаванда",
    category: "main",
    shapes: [
      shape(38, 32, 55, ["#aa66ff", "#5500aa"], { borderRadius: "50% 50% 45% 55% / 45% 55% 50% 50%", blur: 65, opacity: 0.3, rotation: 5 }),
      shape(72, 72, 45, ["#ff77cc", "#aa3388"], { borderRadius: "55% 45% 50% 50% / 50% 50% 55% 45%", blur: 60, opacity: 0.25, rotation: -15 }),
    ],
  },
  {
    key: "lavender-fields",
    label: "Лавандовые поля",
    category: "main",
    shapes: [
      shape(25, 35, 50, ["#cc99ff", "#7733aa"], { borderRadius: "50%", blur: 65, opacity: 0.35, rotation: 5 }),
      shape(55, 55, 45, ["#aa66ff", "#5500aa"], { borderRadius: "50%", blur: 60, opacity: 0.3, rotation: -5 }),
      shape(75, 75, 40, ["#ff99cc", "#aa3388"], { borderRadius: "50%", blur: 55, opacity: 0.25, rotation: 10 }),
    ],
  },
  {
    key: "emerald",
    label: "Изумруд",
    category: "main",
    shapes: [
      shape(32, 38, 60, ["#00cc66", "#004422"], { borderRadius: "45% 55% 50% 50% / 50% 50% 45% 55%", blur: 65, opacity: 0.4, rotation: 10 }),
      shape(72, 18, 40, ["#00ffaa", "#008855"], { borderRadius: "50%", blur: 55, opacity: 0.3, rotation: 0 }),
      shape(22, 78, 35, ["#33ddaa", "#006644"], { borderRadius: "60% 40% 45% 55% / 45% 55% 55% 45%", blur: 50, opacity: 0.25, rotation: -20 }),
    ],
  },
  {
    key: "emerald-forest",
    label: "Изумрудный лес",
    category: "main",
    shapes: [
      shape(20, 30, 50, ["#00aa44", "#004422"], { borderRadius: "50%", blur: 65, opacity: 0.4, rotation: 5 }),
      shape(50, 55, 45, ["#00cc66", "#006633"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: -5 }),
      shape(75, 75, 40, ["#33ddaa", "#008855"], { borderRadius: "50%", blur: 55, opacity: 0.3, rotation: 10 }),
    ],
  },
  {
    key: "dawn",
    label: "Рассвет",
    category: "main",
    shapes: [
      shape(58, 18, 50, ["#ffcc00", "#ff6600"], { borderRadius: "50%", blur: 60, opacity: 0.4, rotation: 0 }),
      shape(18, 62, 45, ["#ff6699", "#cc3366"], { borderRadius: "45% 55% 55% 45% / 55% 45% 45% 55%", blur: 55, opacity: 0.3, rotation: 25 }),
      shape(78, 78, 35, ["#ff9944", "#cc5522"], { borderRadius: "55% 45% 50% 50% / 45% 55% 50% 50%", blur: 50, opacity: 0.25, rotation: -10 }),
    ],
  },
  {
    key: "golden-hour",
    label: "Золотой час",
    category: "main",
    shapes: [
      shape(30, 25, 50, ["#ffdd44", "#ff9933"], { borderRadius: "50%", blur: 65, opacity: 0.4, rotation: 0 }),
      shape(60, 50, 45, ["#ffaa55", "#ff7744"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: 10 }),
      shape(80, 75, 40, ["#ff8866", "#ff5544"], { borderRadius: "50%", blur: 55, opacity: 0.3, rotation: -5 }),
    ],
  },
  {
    key: "nebula",
    label: "Туманность",
    category: "main",
    shapes: [
      shape(22, 22, 55, ["#8800ff", "#220066"], { borderRadius: "40% 60% 55% 45% / 55% 45% 60% 40%", blur: 70, opacity: 0.45, rotation: 15 }),
      shape(68, 52, 50, ["#ff0088", "#880044"], { borderRadius: "55% 45% 40% 60% / 50% 50% 55% 45%", blur: 65, opacity: 0.35, rotation: -25 }),
      shape(38, 82, 40, ["#4400cc", "#110033"], { borderRadius: "50% 50% 45% 55% / 45% 55% 50% 50%", blur: 60, opacity: 0.3, rotation: 10 }),
      shape(82, 15, 30, ["#cc44ff", "#6600aa"], { borderRadius: "50%", blur: 50, opacity: 0.25, rotation: 0 }),
    ],
  },
  {
    key: "purple-haze",
    label: "Фиолетовая дымка",
    category: "main",
    shapes: [
      shape(25, 30, 50, ["#aa33ff", "#440088"], { borderRadius: "50%", blur: 65, opacity: 0.4, rotation: 10 }),
      shape(55, 55, 45, ["#8811ff", "#330066"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: -5 }),
      shape(75, 75, 40, ["#cc66ff", "#5500aa"], { borderRadius: "50%", blur: 55, opacity: 0.3, rotation: 15 }),
    ],
  },
  {
    key: "polar",
    label: "Полярный",
    category: "main",
    shapes: [
      shape(48, 42, 65, ["#88ccff", "#224466"], { borderRadius: "45% 55% 50% 50% / 50% 50% 45% 55%", blur: 75, opacity: 0.25, rotation: -5 }),
      shape(18, 22, 35, ["#ffffff", "#aaddff"], { borderRadius: "50%", blur: 55, opacity: 0.15, rotation: 0 }),
      shape(78, 78, 35, ["#aaeeff", "#4488aa"], { borderRadius: "55% 45% 45% 55% / 50% 50% 55% 45%", blur: 50, opacity: 0.2, rotation: 15 }),
    ],
  },
  {
    key: "ice-crystal",
    label: "Ледяной кристалл",
    category: "main",
    shapes: [
      shape(30, 35, 50, ["#cceeff", "#6699cc"], { borderRadius: "50%", blur: 65, opacity: 0.3, rotation: 0 }),
      shape(60, 60, 45, ["#aaddff", "#4477aa"], { borderRadius: "50%", blur: 60, opacity: 0.25, rotation: 15 }),
      shape(75, 30, 40, ["#eeffff", "#88aacc"], { borderRadius: "50%", blur: 55, opacity: 0.2, rotation: -10 }),
    ],
  },
  {
    key: "magma",
    label: "Магма",
    category: "main",
    shapes: [
      shape(32, 48, 60, ["#ff2200", "#440000"], { borderRadius: "40% 60% 55% 45% / 55% 40% 60% 45%", blur: 65, opacity: 0.45, rotation: 10 }),
      shape(72, 22, 40, ["#ff8800", "#aa2200"], { borderRadius: "50%", blur: 55, opacity: 0.35, rotation: 0 }),
      shape(22, 78, 35, ["#ffcc00", "#ff4400"], { borderRadius: "55% 45% 50% 50% / 45% 55% 45% 55%", blur: 50, opacity: 0.25, rotation: -15 }),
    ],
  },
  {
    key: "volcanic",
    label: "Вулканический",
    category: "main",
    shapes: [
      shape(25, 40, 55, ["#ff3300", "#550000"], { borderRadius: "50%", blur: 65, opacity: 0.45, rotation: 5 }),
      shape(55, 60, 45, ["#ff5500", "#771100"], { borderRadius: "50%", blur: 60, opacity: 0.4, rotation: -10 }),
      shape(75, 35, 40, ["#ff7700", "#992200"], { borderRadius: "50%", blur: 55, opacity: 0.35, rotation: 15 }),
    ],
  },
  {
    key: "cyber",
    label: "Кибер",
    category: "main",
    shapes: [
      shape(22, 28, 45, ["#00ff88", "#003311"], { borderRadius: "10% 10% 10% 10%", blur: 45, opacity: 0.4, rotation: 15 }),
      shape(72, 62, 45, ["#ff0066", "#330011"], { borderRadius: "8% 8% 8% 8%", blur: 45, opacity: 0.35, rotation: -20 }),
      shape(52, 15, 30, ["#ffff00", "#444400"], { borderRadius: "5% 5% 5% 5%", blur: 40, opacity: 0.2, rotation: 45 }),
    ],
  },
  {
    key: "digital-dream",
    label: "Цифровая мечта",
    category: "main",
    shapes: [
      shape(20, 25, 40, ["#00ffaa", "#004433"], { borderRadius: "15%", blur: 50, opacity: 0.4, rotation: 10 }),
      shape(50, 50, 35, ["#00aaff", "#003355"], { borderRadius: "10%", blur: 45, opacity: 0.35, rotation: -15 }),
      shape(80, 75, 30, ["#ff00aa", "#440033"], { borderRadius: "15%", blur: 40, opacity: 0.3, rotation: 20 }),
    ],
  },
  {
    key: "rose",
    label: "Роза",
    category: "main",
    shapes: [
      shape(38, 28, 55, ["#ff4488", "#660022"], { borderRadius: "50% 50% 40% 60% / 60% 40% 55% 45%", blur: 65, opacity: 0.35, rotation: 10 }),
      shape(68, 72, 45, ["#ff88aa", "#882244"], { borderRadius: "45% 55% 55% 45% / 50% 50% 45% 55%", blur: 60, opacity: 0.3, rotation: -20 }),
      shape(18, 62, 35, ["#ffaacc", "#993355"], { borderRadius: "50%", blur: 55, opacity: 0.2, rotation: 0 }),
    ],
  },
  {
    key: "cherry-blossom",
    label: "Вишнёвый цвет",
    category: "main",
    shapes: [
      shape(30, 35, 45, ["#ff99bb", "#aa4466"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: 5 }),
      shape(60, 60, 40, ["#ff7799", "#883355"], { borderRadius: "50%", blur: 55, opacity: 0.3, rotation: -10 }),
      shape(75, 30, 35, ["#ffbbdd", "#cc6688"], { borderRadius: "50%", blur: 50, opacity: 0.25, rotation: 15 }),
    ],
  },
  {
    key: "midnight",
    label: "Полночь",
    category: "main",
    shapes: [
      shape(52, 52, 75, ["#001144", "#000011"], { borderRadius: "45% 55% 50% 50% / 50% 50% 45% 55%", blur: 80, opacity: 0.5, rotation: 5 }),
      shape(28, 22, 35, ["#003388", "#001155"], { borderRadius: "50%", blur: 60, opacity: 0.25, rotation: 0 }),
      shape(78, 82, 30, ["#002266", "#000a33"], { borderRadius: "55% 45% 45% 55% / 45% 55% 50% 50%", blur: 55, opacity: 0.2, rotation: 15 }),
    ],
  },
  {
    key: "starry-night",
    label: "Звёздная ночь",
    category: "main",
    shapes: [
      shape(25, 30, 50, ["#001133", "#000011"], { borderRadius: "50%", blur: 70, opacity: 0.5, rotation: 0 }),
      shape(55, 55, 45, ["#002255", "#000022"], { borderRadius: "50%", blur: 65, opacity: 0.4, rotation: 10 }),
      shape(75, 25, 40, ["#003377", "#001133"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: -15 }),
    ],
  },
  {
    key: "jungle",
    label: "Джунгли",
    category: "main",
    shapes: [
      shape(32, 38, 60, ["#005522", "#001a0a"], { borderRadius: "40% 60% 50% 50% / 55% 45% 50% 50%", blur: 65, opacity: 0.45, rotation: 10 }),
      shape(72, 22, 40, ["#00aa44", "#004422"], { borderRadius: "50%", blur: 55, opacity: 0.3, rotation: 0 }),
      shape(18, 78, 35, ["#338833", "#1a331a"], { borderRadius: "60% 40% 55% 45% / 45% 55% 45% 55%", blur: 50, opacity: 0.25, rotation: -15 }),
      shape(62, 72, 30, ["#66cc33", "#335511"], { borderRadius: "50% 50% 40% 60% / 60% 40% 55% 45%", blur: 45, opacity: 0.2, rotation: 20 }),
    ],
  },
  {
    key: "rainforest",
    label: "Тропический лес",
    category: "main",
    shapes: [
      shape(25, 35, 50, ["#006633", "#002211"], { borderRadius: "50%", blur: 65, opacity: 0.4, rotation: 5 }),
      shape(55, 55, 45, ["#00aa44", "#004422"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: -10 }),
      shape(75, 75, 40, ["#33cc66", "#006633"], { borderRadius: "50%", blur: 55, opacity: 0.3, rotation: 15 }),
    ],
  },
  {
    key: "cherry",
    label: "Вишня",
    category: "main",
    shapes: [
      shape(28, 32, 55, ["#cc0033", "#440011"], { borderRadius: "50% 50% 45% 55% / 55% 45% 50% 50%", blur: 65, opacity: 0.4, rotation: 15 }),
      shape(72, 58, 45, ["#ff3366", "#880022"], { borderRadius: "45% 55% 50% 50% / 50% 50% 45% 55%", blur: 60, opacity: 0.3, rotation: -10 }),
      shape(42, 82, 30, ["#ff6688", "#aa1133"], { borderRadius: "50%", blur: 50, opacity: 0.2, rotation: 0 }),
    ],
  },
  {
    key: "berry-blast",
    label: "Ягодный взрыв",
    category: "main",
    shapes: [
      shape(30, 30, 50, ["#cc0055", "#550022"], { borderRadius: "50%", blur: 65, opacity: 0.4, rotation: 10 }),
      shape(60, 55, 45, ["#ff3377", "#880033"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: -5 }),
      shape(80, 75, 40, ["#ff6699", "#aa2255"], { borderRadius: "50%", blur: 55, opacity: 0.3, rotation: 15 }),
    ],
  },
  {
    key: "honey",
    label: "Мёд",
    category: "main",
    shapes: [
      shape(38, 28, 55, ["#ffaa00", "#664400"], { borderRadius: "45% 55% 50% 50% / 55% 45% 55% 45%", blur: 65, opacity: 0.35, rotation: 5 }),
      shape(72, 68, 45, ["#ff8800", "#553300"], { borderRadius: "50%", blur: 60, opacity: 0.3, rotation: -15 }),
      shape(22, 72, 35, ["#ffcc33", "#886600"], { borderRadius: "55% 45% 45% 55% / 45% 55% 50% 50%", blur: 55, opacity: 0.25, rotation: 10 }),
    ],
  },
  {
    key: "amber-glow",
    label: "Янтарное сияние",
    category: "main",
    shapes: [
      shape(35, 35, 50, ["#ffaa33", "#775500"], { borderRadius: "50%", blur: 65, opacity: 0.35, rotation: 5 }),
      shape(65, 60, 45, ["#ffcc55", "#997722"], { borderRadius: "50%", blur: 60, opacity: 0.3, rotation: -10 }),
      shape(80, 30, 40, ["#ffee77", "#bb9944"], { borderRadius: "50%", blur: 55, opacity: 0.25, rotation: 15 }),
    ],
  },
  {
    key: "frost",
    label: "Мороз",
    category: "main",
    shapes: [
      shape(48, 42, 65, ["#cceeff", "#445566"], { borderRadius: "45% 55% 50% 50% / 50% 50% 45% 55%", blur: 75, opacity: 0.2, rotation: 0 }),
      shape(18, 28, 40, ["#eeffff", "#667788"], { borderRadius: "50%", blur: 60, opacity: 0.15, rotation: 10 }),
      shape(78, 72, 35, ["#bbddff", "#334455"], { borderRadius: "55% 45% 45% 55% / 50% 50% 55% 45%", blur: 55, opacity: 0.15, rotation: -5 }),
      shape(62, 22, 25, ["#ffffff", "#8899aa"], { borderRadius: "50%", blur: 45, opacity: 0.1, rotation: 0 }),
    ],
  },
  {
    key: "winter-frost",
    label: "Зимний мороз",
    category: "main",
    shapes: [
      shape(30, 35, 50, ["#ddffee", "#668899"], { borderRadius: "50%", blur: 65, opacity: 0.25, rotation: 0 }),
      shape(60, 60, 45, ["#bbddff", "#446677"], { borderRadius: "50%", blur: 60, opacity: 0.2, rotation: 10 }),
      shape(80, 30, 40, ["#eeffff", "#7799aa"], { borderRadius: "50%", blur: 55, opacity: 0.15, rotation: -15 }),
    ],
  },
  {
    key: "abyss",
    label: "Бездна",
    category: "main",
    shapes: [
      shape(52, 52, 75, ["#110033", "#000011"], { borderRadius: "40% 60% 55% 45% / 55% 45% 60% 40%", blur: 80, opacity: 0.5, rotation: 0 }),
      shape(28, 28, 40, ["#330066", "#0a001a"], { borderRadius: "50%", blur: 65, opacity: 0.3, rotation: 20 }),
      shape(72, 72, 35, ["#220044", "#050010"], { borderRadius: "55% 45% 50% 50% / 50% 50% 55% 45%", blur: 60, opacity: 0.25, rotation: -15 }),
    ],
  },
  {
    key: "void",
    label: "Пустота",
    category: "main",
    shapes: [
      shape(35, 40, 60, ["#0a0022", "#000011"], { borderRadius: "50%", blur: 75, opacity: 0.5, rotation: 0 }),
      shape(65, 60, 50, ["#110033", "#000022"], { borderRadius: "50%", blur: 70, opacity: 0.4, rotation: 10 }),
      shape(50, 50, 45, ["#220044", "#0a001a"], { borderRadius: "50%", blur: 65, opacity: 0.35, rotation: -10 }),
    ],
  },
  {
    key: "coral",
    label: "Коралл",
    category: "main",
    shapes: [
      shape(32, 32, 55, ["#ff6644", "#882211"], { borderRadius: "45% 55% 55% 45% / 50% 50% 45% 55%", blur: 65, opacity: 0.35, rotation: 10 }),
      shape(68, 62, 45, ["#ff8866", "#993322"], { borderRadius: "50% 50% 45% 55% / 55% 45% 50% 50%", blur: 60, opacity: 0.3, rotation: -20 }),
      shape(22, 78, 35, ["#ffaa88", "#664433"], { borderRadius: "55% 45% 50% 50% / 45% 55% 55% 45%", blur: 55, opacity: 0.2, rotation: 5 }),
    ],
  },
  {
    key: "coral-reef",
    label: "Коралловый риф",
    category: "main",
    shapes: [
      shape(30, 35, 50, ["#ff7755", "#993322"], { borderRadius: "50%", blur: 65, opacity: 0.35, rotation: 5 }),
      shape(60, 60, 45, ["#ff9977", "#aa4433"], { borderRadius: "50%", blur: 60, opacity: 0.3, rotation: -10 }),
      shape(80, 75, 40, ["#ffbb99", "#cc6655"], { borderRadius: "50%", blur: 55, opacity: 0.25, rotation: 15 }),
    ],
  },
  {
    key: "glacier",
    label: "Ледник",
    category: "main",
    shapes: [
      shape(38, 28, 60, ["#88ccff", "#113355"], { borderRadius: "45% 55% 50% 50% / 55% 45% 55% 45%", blur: 70, opacity: 0.3, rotation: -5 }),
      shape(72, 62, 45, ["#aaddff", "#224466"], { borderRadius: "50%", blur: 60, opacity: 0.25, rotation: 10 }),
      shape(22, 72, 35, ["#cceeFF", "#335577"], { borderRadius: "55% 45% 45% 55% / 50% 50% 55% 45%", blur: 55, opacity: 0.2, rotation: -10 }),
    ],
  },
  {
    key: "arctic-ice",
    label: "Арктический лёд",
    category: "main",
    shapes: [
      shape(25, 35, 50, ["#bbddff", "#335577"], { borderRadius: "50%", blur: 65, opacity: 0.3, rotation: 0 }),
      shape(55, 55, 45, ["#99ccff", "#224466"], { borderRadius: "50%", blur: 60, opacity: 0.25, rotation: 10 }),
      shape(75, 25, 40, ["#ddeeff", "#446688"], { borderRadius: "50%", blur: 55, opacity: 0.2, rotation: -15 }),
    ],
  },
  {
    key: "plasma",
    label: "Плазма",
    category: "main",
    shapes: [
      shape(28, 22, 50, ["#ff00aa", "#440022"], { borderRadius: "40% 60% 55% 45% / 55% 45% 60% 40%", blur: 60, opacity: 0.45, rotation: 15 }),
      shape(68, 48, 55, ["#aa00ff", "#220044"], { borderRadius: "55% 45% 40% 60% / 45% 55% 50% 50%", blur: 65, opacity: 0.4, rotation: -10 }),
      shape(42, 78, 40, ["#ff4488", "#660033"], { borderRadius: "50% 50% 45% 55% / 55% 45% 50% 50%", blur: 55, opacity: 0.3, rotation: 25 }),
    ],
  },
  {
    key: "electric-purple",
    label: "Электрический фиолетовый",
    category: "main",
    shapes: [
      shape(25, 30, 45, ["#aa00ff", "#440088"], { borderRadius: "50%", blur: 60, opacity: 0.4, rotation: 10 }),
      shape(55, 55, 40, ["#cc33ff", "#6600aa"], { borderRadius: "50%", blur: 55, opacity: 0.35, rotation: -5 }),
      shape(75, 75, 35, ["#ee66ff", "#8822cc"], { borderRadius: "50%", blur: 50, opacity: 0.3, rotation: 15 }),
    ],
  },
  {
    key: "sandstorm",
    label: "Песчаная буря",
    category: "main",
    shapes: [
      shape(38, 32, 60, ["#cc9944", "#553300"], { borderRadius: "45% 55% 50% 50% / 55% 45% 50% 50%", blur: 70, opacity: 0.35, rotation: 10 }),
      shape(72, 62, 45, ["#aa7733", "#442200"], { borderRadius: "50%", blur: 60, opacity: 0.3, rotation: -5 }),
      shape(22, 72, 40, ["#ddaa55", "#664411"], { borderRadius: "55% 45% 45% 55% / 45% 55% 55% 45%", blur: 55, opacity: 0.25, rotation: 15 }),
    ],
  },
  {
    key: "desert-heat",
    label: "Пустынная жара",
    category: "main",
    shapes: [
      shape(30, 35, 50, ["#ddaa66", "#664411"], { borderRadius: "50%", blur: 65, opacity: 0.35, rotation: 5 }),
      shape(60, 60, 45, ["#cc9955", "#553300"], { borderRadius: "50%", blur: 60, opacity: 0.3, rotation: -10 }),
      shape(80, 30, 40, ["#eebb77", "#775522"], { borderRadius: "50%", blur: 55, opacity: 0.25, rotation: 15 }),
    ],
  },
  {
    key: "vaporwave",
    label: "Вейпорвейв",
    category: "main",
    shapes: [
      shape(22, 28, 50, ["#ff71ce", "#4a0044"], { borderRadius: "45% 55% 55% 45% / 55% 45% 45% 55%", blur: 60, opacity: 0.4, rotation: 10 }),
      shape(68, 58, 50, ["#01cdfe", "#003366"], { borderRadius: "55% 45% 40% 60% / 50% 50% 55% 45%", blur: 60, opacity: 0.35, rotation: -15 }),
      shape(48, 82, 35, ["#b967ff", "#330066"], { borderRadius: "50%", blur: 50, opacity: 0.25, rotation: 5 }),
      shape(82, 18, 30, ["#fffb96", "#666600"], { borderRadius: "50% 50% 40% 60% / 60% 40% 50% 50%", blur: 45, opacity: 0.15, rotation: -10 }),
    ],
  },
  {
    key: "retro-sunset",
    label: "Ретро закат",
    category: "main",
    shapes: [
      shape(30, 30, 45, ["#ff6699", "#662244"], { borderRadius: "50%", blur: 60, opacity: 0.4, rotation: 5 }),
      shape(60, 55, 40, ["#ff9966", "#883322"], { borderRadius: "50%", blur: 55, opacity: 0.35, rotation: -10 }),
      shape(80, 75, 35, ["#ffcc66", "#aa5511"], { borderRadius: "50%", blur: 50, opacity: 0.3, rotation: 15 }),
    ],
  },
  {
    key: "twilight",
    label: "Сумерки",
    category: "main",
    shapes: [
      shape(45, 35, 65, ["#5a3f7f", "#1a0f2f"], { borderRadius: "50% 50% 45% 55% / 55% 45% 50% 50%", blur: 75, opacity: 0.4, rotation: 0 }),
      shape(25, 65, 45, ["#7f5f3f", "#2f1f0f"], { borderRadius: "45% 55% 55% 45% / 50% 50% 45% 55%", blur: 60, opacity: 0.3, rotation: 15 }),
      shape(75, 75, 40, ["#3f5f7f", "#0f1f2f"], { borderRadius: "55% 45% 45% 55% / 45% 55% 55% 45%", blur: 55, opacity: 0.25, rotation: -10 }),
    ],
  },
  {
    key: "dusk-till-dawn",
    label: "От заката до рассвета",
    category: "main",
    shapes: [
      shape(25, 35, 50, ["#4a2f6f", "#1a0f3f"], { borderRadius: "50%", blur: 65, opacity: 0.4, rotation: 5 }),
      shape(55, 55, 45, ["#6a4f8f", "#2a1f4f"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: -10 }),
      shape(75, 25, 40, ["#8a6faf", "#3a2f5f"], { borderRadius: "50%", blur: 55, opacity: 0.3, rotation: 15 }),
    ],
  },
  {
    key: "mint",
    label: "Мята",
    category: "main",
    shapes: [
      shape(35, 35, 55, ["#66ffcc", "#226655"], { borderRadius: "50% 50% 45% 55% / 55% 45% 50% 50%", blur: 65, opacity: 0.35, rotation: 5 }),
      shape(70, 65, 45, ["#99ffdd", "#337766"], { borderRadius: "45% 55% 55% 45% / 50% 50% 45% 55%", blur: 55, opacity: 0.25, rotation: -15 }),
      shape(25, 75, 35, ["#ccffee", "#448877"], { borderRadius: "55% 45% 45% 55% / 45% 55% 55% 45%", blur: 50, opacity: 0.2, rotation: 10 }),
    ],
  },
  {
    key: "fresh-mint",
    label: "Свежая мята",
    category: "main",
    shapes: [
      shape(30, 35, 50, ["#77ffdd", "#337766"], { borderRadius: "50%", blur: 65, opacity: 0.35, rotation: 5 }),
      shape(60, 60, 45, ["#55eebb", "#226655"], { borderRadius: "50%", blur: 60, opacity: 0.3, rotation: -10 }),
      shape(80, 30, 40, ["#99ffee", "#448877"], { borderRadius: "50%", blur: 55, opacity: 0.25, rotation: 15 }),
    ],
  },
  {
    key: "berry",
    label: "Ягода",
    category: "main",
    shapes: [
      shape(30, 30, 55, ["#cc3377", "#440a22"], { borderRadius: "50% 50% 45% 55% / 55% 45% 50% 50%", blur: 65, opacity: 0.4, rotation: 10 }),
      shape(70, 60, 45, ["#ee5599", "#551133"], { borderRadius: "45% 55% 55% 45% / 50% 50% 45% 55%", blur: 55, opacity: 0.3, rotation: -15 }),
      shape(50, 80, 35, ["#ff77aa", "#662244"], { borderRadius: "55% 45% 45% 55% / 45% 55% 55% 45%", blur: 50, opacity: 0.25, rotation: 5 }),
    ],
  },
  {
    key: "wildberry",
    label: "Дикая ягода",
    category: "main",
    shapes: [
      shape(25, 35, 50, ["#bb2266", "#440a22"], { borderRadius: "50%", blur: 65, opacity: 0.4, rotation: 5 }),
      shape(55, 55, 45, ["#dd4488", "#551133"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: -10 }),
      shape(75, 75, 40, ["#ff66aa", "#662244"], { borderRadius: "50%", blur: 55, opacity: 0.3, rotation: 15 }),
    ],
  },

  // === COLORS TAB - Solid colors and gradients ===
  {
    key: "color-black",
    label: "Чёрный",
    category: "colors",
    shapes: [
      shape(50, 50, 150, ["#0a0a0b", "#0a0a0b"], { borderRadius: "50%", blur: 100, opacity: 1, rotation: 0 }),
    ],
  },
  {
    key: "color-dark-gray",
    label: "Тёмно-серый",
    category: "colors",
    shapes: [
      shape(50, 50, 150, ["#1c1c1f", "#1c1c1f"], { borderRadius: "50%", blur: 100, opacity: 1, rotation: 0 }),
    ],
  },
  {
    key: "color-gray",
    label: "Серый",
    category: "colors",
    shapes: [
      shape(50, 50, 150, ["#3a3a3f", "#3a3a3f"], { borderRadius: "50%", blur: 100, opacity: 1, rotation: 0 }),
    ],
  },
  {
    key: "gradient-gray-black",
    label: "Серый → Чёрный",
    category: "colors",
    shapes: [
      shape(30, 30, 100, ["#5c5c60", "#0a0a0b"], { borderRadius: "50%", blur: 100, opacity: 1, rotation: 0 }),
      shape(70, 70, 100, ["#0a0a0b", "#0a0a0b"], { borderRadius: "50%", blur: 100, opacity: 1, rotation: 0 }),
    ],
  },
  {
    key: "gradient-midnight",
    label: "Полночь",
    category: "colors",
    shapes: [
      shape(20, 20, 80, ["#1a1a2e", "#0a0a0b"], { borderRadius: "50%", blur: 100, opacity: 1, rotation: 0 }),
      shape(80, 80, 80, ["#0a0a0b", "#000000"], { borderRadius: "50%", blur: 100, opacity: 1, rotation: 0 }),
    ],
  },
  {
    key: "gradient-crimson",
    label: "Багровый",
    category: "colors",
    shapes: [
      shape(20, 20, 80, ["#4a0a0a", "#1a0000"], { borderRadius: "50%", blur: 100, opacity: 1, rotation: 0 }),
      shape(80, 80, 80, ["#2a0a0a", "#0a0000"], { borderRadius: "50%", blur: 100, opacity: 1, rotation: 0 }),
    ],
  },
  {
    key: "gradient-deep-sea",
    label: "Глубокое море",
    category: "colors",
    shapes: [
      shape(20, 20, 80, ["#0a1a2a", "#000a1a"], { borderRadius: "50%", blur: 100, opacity: 1, rotation: 0 }),
      shape(80, 80, 80, ["#0a2a3a", "#001a2a"], { borderRadius: "50%", blur: 100, opacity: 1, rotation: 0 }),
    ],
  },
  {
    key: "gradient-forest-night",
    label: "Ночной лес",
    category: "colors",
    shapes: [
      shape(20, 20, 80, ["#0a1a0a", "#000a00"], { borderRadius: "50%", blur: 100, opacity: 1, rotation: 0 }),
      shape(80, 80, 80, ["#0a2a0a", "#001a00"], { borderRadius: "50%", blur: 100, opacity: 1, rotation: 0 }),
    ],
  },
  {
    key: "gradient-royal",
    label: "Королевский",
    category: "colors",
    shapes: [
      shape(20, 20, 80, ["#2a0a2a", "#1a001a"], { borderRadius: "50%", blur: 100, opacity: 1, rotation: 0 }),
      shape(80, 80, 80, ["#3a0a3a", "#2a002a"], { borderRadius: "50%", blur: 100, opacity: 1, rotation: 0 }),
    ],
  },

  // === OTHER TAB - Abstract & artistic ===
  {
    key: "abstract-1",
    label: "Абстракция 1",
    category: "other",
    shapes: [
      shape(30, 30, 50, ["#ff0080", "#8000ff"], { borderRadius: "30% 70% 40% 60% / 60% 40% 60% 40%", blur: 60, opacity: 0.4, rotation: 45 }),
      shape(70, 70, 45, ["#00ffff", "#0080ff"], { borderRadius: "60% 40% 70% 30% / 40% 60% 30% 70%", blur: 55, opacity: 0.35, rotation: -30 }),
      shape(50, 50, 40, ["#ffff00", "#ff8000"], { borderRadius: "50%", blur: 50, opacity: 0.3, rotation: 0 }),
    ],
  },
  {
    key: "abstract-2",
    label: "Абстракция 2",
    category: "other",
    shapes: [
      shape(25, 40, 55, ["#ff6b6b", "#4ecdc4"], { borderRadius: "40% 60% 50% 50% / 50% 50% 50% 50%", blur: 65, opacity: 0.4, rotation: 20 }),
      shape(75, 40, 50, ["#45b7d1", "#96ceb4"], { borderRadius: "50% 50% 40% 60% / 60% 40% 50% 50%", blur: 60, opacity: 0.35, rotation: -15 }),
      shape(50, 75, 45, ["#ffeaa7", "#fdcb6e"], { borderRadius: "45% 55% 55% 45% / 55% 45% 45% 55%", blur: 55, opacity: 0.3, rotation: 10 }),
    ],
  },
  {
    key: "abstract-3",
    label: "Абстракция 3",
    category: "other",
    shapes: [
      shape(20, 30, 50, ["#a8e6cf", "#3d8b6e"], { borderRadius: "50%", blur: 65, opacity: 0.4, rotation: 10 }),
      shape(55, 55, 45, ["#ffd3b6", "#dc8a58"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: -5 }),
      shape(80, 75, 40, ["#ffaaa5", "#d96c5a"], { borderRadius: "50%", blur: 55, opacity: 0.3, rotation: 15 }),
    ],
  },
  {
    key: "abstract-4",
    label: "Абстракция 4",
    category: "other",
    shapes: [
      shape(25, 35, 45, ["#c7ceea", "#6a7bb8"], { borderRadius: "50%", blur: 60, opacity: 0.4, rotation: 5 }),
      shape(55, 55, 40, ["#e2f0cb", "#8ba86a"], { borderRadius: "50%", blur: 55, opacity: 0.35, rotation: -10 }),
      shape(75, 25, 35, ["#ffdac1", "#e89a6c"], { borderRadius: "50%", blur: 50, opacity: 0.3, rotation: 15 }),
    ],
  },
  {
    key: "dreamy",
    label: "Мечтательный",
    category: "other",
    shapes: [
      shape(35, 35, 60, ["#ffcce0", "#ff99cc"], { borderRadius: "50%", blur: 70, opacity: 0.35, rotation: 0 }),
      shape(65, 65, 50, ["#e6ccff", "#cc99ff"], { borderRadius: "50%", blur: 65, opacity: 0.3, rotation: 0 }),
      shape(50, 50, 45, ["#cce6ff", "#99ccff"], { borderRadius: "50%", blur: 60, opacity: 0.25, rotation: 0 }),
    ],
  },
  {
    key: "dreamy-pastel",
    label: "Мечтательная пастель",
    category: "other",
    shapes: [
      shape(30, 35, 50, ["#ffddcc", "#ffbb99"], { borderRadius: "50%", blur: 65, opacity: 0.35, rotation: 5 }),
      shape(60, 60, 45, ["#ddccff", "#bb99ff"], { borderRadius: "50%", blur: 60, opacity: 0.3, rotation: -10 }),
      shape(80, 30, 40, ["#ccffee", "#99ffdd"], { borderRadius: "50%", blur: 55, opacity: 0.25, rotation: 15 }),
    ],
  },
  {
    key: "energetic",
    label: "Энергичный",
    category: "other",
    shapes: [
      shape(30, 30, 50, ["#ff3366", "#ff6600"], { borderRadius: "45% 55% 45% 55% / 55% 45% 55% 45%", blur: 55, opacity: 0.45, rotation: 25 }),
      shape(70, 70, 45, ["#ffcc00", "#ff9933"], { borderRadius: "50%", blur: 50, opacity: 0.4, rotation: -20 }),
      shape(50, 50, 40, ["#ffff66", "#ffcc66"], { borderRadius: "50%", blur: 45, opacity: 0.35, rotation: 0 }),
    ],
  },
  {
    key: "energy-burst",
    label: "Всплеск энергии",
    category: "other",
    shapes: [
      shape(25, 30, 45, ["#ff5533", "#ff8800"], { borderRadius: "50%", blur: 60, opacity: 0.45, rotation: 10 }),
      shape(55, 55, 40, ["#ffaa00", "#ffcc33"], { borderRadius: "50%", blur: 55, opacity: 0.4, rotation: -5 }),
      shape(75, 75, 35, ["#ffdd55", "#ffee88"], { borderRadius: "50%", blur: 50, opacity: 0.35, rotation: 15 }),
    ],
  },
  {
    key: "calm",
    label: "Спокойный",
    category: "other",
    shapes: [
      shape(40, 40, 65, ["#a8d5e2", "#7fb3d5"], { borderRadius: "50%", blur: 75, opacity: 0.3, rotation: 0 }),
      shape(60, 60, 55, ["#a2d9a2", "#7bc97b"], { borderRadius: "50%", blur: 70, opacity: 0.25, rotation: 0 }),
    ],
  },
  {
    key: "calm-waters",
    label: "Спокойные воды",
    category: "other",
    shapes: [
      shape(35, 40, 55, ["#a8c8d8", "#6a98a8"], { borderRadius: "50%", blur: 65, opacity: 0.3, rotation: 5 }),
      shape(65, 65, 45, ["#b8d8c8", "#78a888"], { borderRadius: "50%", blur: 60, opacity: 0.25, rotation: -10 }),
    ],
  },
  {
    key: "mystic",
    label: "Мистический",
    category: "other",
    shapes: [
      shape(30, 35, 55, ["#663399", "#330066"], { borderRadius: "40% 60% 50% 50% / 50% 50% 50% 50%", blur: 65, opacity: 0.4, rotation: 15 }),
      shape(70, 65, 45, ["#9966cc", "#663399"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: -10 }),
      shape(50, 50, 40, ["#cc99ff", "#9966cc"], { borderRadius: "50%", blur: 55, opacity: 0.3, rotation: 0 }),
    ],
  },
  {
    key: "mystic-forest",
    label: "Мистический лес",
    category: "other",
    shapes: [
      shape(25, 35, 50, ["#4a6f4a", "#2a4f2a"], { borderRadius: "50%", blur: 65, opacity: 0.4, rotation: 5 }),
      shape(55, 55, 45, ["#5a7f5a", "#3a5f3a"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: -10 }),
      shape(75, 25, 40, ["#6a8f6a", "#4a6f4a"], { borderRadius: "50%", blur: 55, opacity: 0.3, rotation: 15 }),
    ],
  },
  {
    key: "cosmic-flow",
    label: "Космический поток",
    category: "other",
    shapes: [
      shape(25, 30, 50, ["#6633ff", "#330099"], { borderRadius: "50%", blur: 65, opacity: 0.4, rotation: 10 }),
      shape(55, 55, 45, ["#9933ff", "#5500aa"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: -5 }),
      shape(75, 75, 40, ["#cc66ff", "#7722cc"], { borderRadius: "50%", blur: 55, opacity: 0.3, rotation: 15 }),
    ],
  },
  {
    key: "aurora-borealis",
    label: "Северное сияние",
    category: "other",
    shapes: [
      shape(20, 35, 55, ["#00ff88", "#006644"], { borderRadius: "50%", blur: 70, opacity: 0.4, rotation: 5 }),
      shape(50, 55, 45, ["#00ffcc", "#008866"], { borderRadius: "50%", blur: 65, opacity: 0.35, rotation: -10 }),
      shape(80, 30, 40, ["#00aaff", "#006688"], { borderRadius: "50%", blur: 60, opacity: 0.3, rotation: 15 }),
    ],
  },
  {
    key: "pastel",
    label: "Пастель",
    category: "other",
    shapes: [
      shape(35, 35, 55, ["#ffb3ba", "#ff9eb5"], { borderRadius: "50%", blur: 65, opacity: 0.35, rotation: 0 }),
      shape(65, 65, 50, ["#baffc9", "#9effb3"], { borderRadius: "50%", blur: 60, opacity: 0.3, rotation: 0 }),
      shape(50, 50, 45, ["#bae1ff", "#9ecfff"], { borderRadius: "50%", blur: 55, opacity: 0.25, rotation: 0 }),
    ],
  },
  {
    key: "pastel-rainbow",
    label: "Пастельная радуга",
    category: "other",
    shapes: [
      shape(25, 35, 45, ["#ffb3ba", "#ff9eb5"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: 5 }),
      shape(50, 55, 40, ["#baffc9", "#9effb3"], { borderRadius: "50%", blur: 55, opacity: 0.3, rotation: -5 }),
      shape(75, 30, 35, ["#bae1ff", "#9ecfff"], { borderRadius: "50%", blur: 50, opacity: 0.25, rotation: 10 }),
    ],
  },

  // === MYSTERY TAB - Dark mysterious backgrounds ===
  {
    key: "dark-smoke",
    label: "Тёмный дым",
    category: "mystery",
    shapes: [
      shape(30, 40, 70, ["#1a1a1a", "#0a0a0a"], { borderRadius: "50%", blur: 80, opacity: 0.5, rotation: 10 }),
      shape(60, 60, 60, ["#2a2a2a", "#0a0a0a"], { borderRadius: "50%", blur: 75, opacity: 0.4, rotation: -15 }),
      shape(50, 30, 50, ["#3a3a3a", "#1a1a1a"], { borderRadius: "50%", blur: 70, opacity: 0.35, rotation: 20 }),
    ],
  },
  {
    key: "phantom",
    label: "Призрак",
    category: "mystery",
    shapes: [
      shape(25, 35, 60, ["#2a2a2a", "#0a0a0a"], { borderRadius: "50%", blur: 75, opacity: 0.4, rotation: 5 }),
      shape(55, 60, 55, ["#3a3a3a", "#1a1a1a"], { borderRadius: "50%", blur: 70, opacity: 0.35, rotation: -10 }),
      shape(75, 30, 45, ["#4a4a4a", "#2a2a2a"], { borderRadius: "50%", blur: 65, opacity: 0.3, rotation: 15 }),
    ],
  },
  {
    key: "shadow-dance",
    label: "Танец теней",
    category: "mystery",
    shapes: [
      shape(20, 30, 55, ["#1a1a1a", "#000000"], { borderRadius: "50%", blur: 70, opacity: 0.45, rotation: 10 }),
      shape(50, 55, 50, ["#2a2a2a", "#0a0a0a"], { borderRadius: "50%", blur: 65, opacity: 0.4, rotation: -5 }),
      shape(80, 75, 45, ["#3a3a3a", "#1a1a1a"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: 15 }),
    ],
  },
  {
    key: "dark-matter",
    label: "Тёмная материя",
    category: "mystery",
    shapes: [
      shape(35, 45, 65, ["#0a0a0a", "#000000"], { borderRadius: "50%", blur: 75, opacity: 0.5, rotation: 0 }),
      shape(65, 35, 55, ["#1a1a1a", "#0a0a0a"], { borderRadius: "50%", blur: 70, opacity: 0.45, rotation: 15 }),
      shape(50, 65, 50, ["#2a2a2a", "#1a1a1a"], { borderRadius: "50%", blur: 65, opacity: 0.4, rotation: -10 }),
    ],
  },
  {
    key: "void-walker",
    label: "Идущий в пустоте",
    category: "mystery",
    shapes: [
      shape(30, 40, 60, ["#0a0a0f", "#000005"], { borderRadius: "50%", blur: 75, opacity: 0.5, rotation: 5 }),
      shape(60, 60, 50, ["#0f0a0f", "#050005"], { borderRadius: "50%", blur: 70, opacity: 0.45, rotation: -10 }),
      shape(50, 30, 45, ["#1a1a1f", "#0a0a0f"], { borderRadius: "50%", blur: 65, opacity: 0.4, rotation: 15 }),
    ],
  },
  {
    key: "cryptic",
    label: "Загадочный",
    category: "mystery",
    shapes: [
      shape(25, 35, 55, ["#1a1a2e", "#0a0a1a"], { borderRadius: "50%", blur: 70, opacity: 0.45, rotation: 10 }),
      shape(55, 60, 50, ["#16213e", "#0a1a2e"], { borderRadius: "50%", blur: 65, opacity: 0.4, rotation: -5 }),
      shape(75, 30, 45, ["#0f3460", "#0a2a4e"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: 15 }),
    ],
  },
  {
    key: "eclipse",
    label: "Затмение",
    category: "mystery",
    shapes: [
      shape(40, 40, 70, ["#0a0a0a", "#000000"], { borderRadius: "50%", blur: 80, opacity: 0.5, rotation: 0 }),
      shape(70, 60, 50, ["#1a1a1a", "#0a0a0a"], { borderRadius: "50%", blur: 70, opacity: 0.4, rotation: 15 }),
      shape(30, 70, 40, ["#2a2a2a", "#1a1a1a"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: -10 }),
    ],
  },
  {
    key: "twilight-zone",
    label: "Сумеречная зона",
    category: "mystery",
    shapes: [
      shape(25, 35, 55, ["#2a1a2e", "#0a0a1a"], { borderRadius: "50%", blur: 70, opacity: 0.45, rotation: 5 }),
      shape(55, 60, 50, ["#3a2a3e", "#1a1a2a"], { borderRadius: "50%", blur: 65, opacity: 0.4, rotation: -10 }),
      shape(75, 30, 45, ["#4a3a4e", "#2a2a3a"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: 15 }),
    ],
  },
  {
    key: "forbidden",
    label: "Запретный",
    category: "mystery",
    shapes: [
      shape(30, 40, 60, ["#1a0a0a", "#0a0000"], { borderRadius: "50%", blur: 70, opacity: 0.45, rotation: 10 }),
      shape(60, 60, 50, ["#2a1a1a", "#1a0a0a"], { borderRadius: "50%", blur: 65, opacity: 0.4, rotation: -5 }),
      shape(50, 30, 45, ["#3a2a2a", "#2a1a1a"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: 15 }),
    ],
  },
  {
    key: "lost-soul",
    label: "Потерянная душа",
    category: "mystery",
    shapes: [
      shape(25, 35, 55, ["#1a2a1a", "#0a1a0a"], { borderRadius: "50%", blur: 70, opacity: 0.45, rotation: 5 }),
      shape(55, 60, 50, ["#2a3a2a", "#1a2a1a"], { borderRadius: "50%", blur: 65, opacity: 0.4, rotation: -10 }),
      shape(75, 30, 45, ["#3a4a3a", "#2a3a2a"], { borderRadius: "50%", blur: 60, opacity: 0.35, rotation: 15 }),
    ],
  },
];

export function getPreset(key: string): ShapePreset {
  return SHAPE_PRESETS.find((p) => p.key === key) || SHAPE_PRESETS[0];
}

export function getPresetByShapes(shapes: GradientShape[]): string {
  if (!shapes || shapes.length === 0) return "none";
  for (const preset of SHAPE_PRESETS) {
    if (preset.key === "none") continue;
    if (preset.shapes.length === shapes.length) {
      const match = preset.shapes.every(
        (ps, i) => Math.abs(ps.cx - shapes[i].cx) < 2 && Math.abs(ps.cy - shapes[i].cy) < 2
      );
      if (match) return preset.key;
    }
  }
  return "custom";
}

export function getPresetsByCategory(category: "main" | "colors" | "mystery" | "other"): ShapePreset[] {
  return SHAPE_PRESETS.filter((p) => p.category === category);
}
