// Generates moody, on-brand placeholder JPGs into public/images.
// Replace the output files with real photos (same filenames) whenever you have them.
// Usage: npm run images
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("public/images");

const palettes = {
  red: ["#1a0606", "#4a0d0d", "#7a1414", "#d9a441"],
  wood: ["#140b06", "#3b2213", "#6b3f22", "#e0b86a"],
  dance: ["#0b0507", "#3a0a1a", "#7a1414", "#f2c66d"],
};

const images = [
  ["hero", 2400, 1500, "red", "booths", "The Tick Tock · Interior"],
  ["space-booths", 1200, 1500, "red", "booths", "Red Booths"],
  ["space-front-bar", 1600, 1100, "wood", "bar", "Front Bar"],
  ["space-floor", 1600, 1100, "wood", "floor", "Wood Floors"],
  ["space-back-bar", 1200, 1500, "wood", "bar", "Back Bar"],
  ["space-dj", 2000, 1100, "dance", "dance", "Dance Floor + DJ"],
  ["gallery-01", 1000, 1300, "red", "booths", "Party Photo 01"],
  ["gallery-02", 1200, 800, "dance", "dance", "Party Photo 02"],
  ["gallery-03", 1000, 1000, "wood", "bar", "Party Photo 03"],
  ["gallery-04", 1000, 1400, "red", "dance", "Party Photo 04"],
  ["gallery-05", 1200, 900, "dance", "dance", "Party Photo 05"],
  ["gallery-06", 1000, 1250, "wood", "bar", "Party Photo 06"],
  ["gallery-07", 1200, 800, "dance", "dance", "Party Photo 07"],
  ["gallery-08", 1000, 1300, "red", "booths", "Party Photo 08"],
  ["gallery-09", 1200, 1000, "red", "floor", "Party Photo 09"],
  ["og", 1200, 630, "red", "booths", ""],
];

function rng(seed) {
  let s = 0;
  for (const c of seed) s = (s * 31 + c.charCodeAt(0)) >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

function svg(name, w, h, paletteKey, kind, label) {
  const [bg, mid, accent, glow] = palettes[paletteKey];
  const r = rng(name);
  const parts = [];

  // Wood floor planks
  if (kind === "floor" || kind === "bar" || kind === "dance") {
    const top = kind === "bar" ? h * 0.55 : h * 0.62;
    const plank = Math.max(24, h / 18);
    for (let y = top; y < h; y += plank) {
      const shade = 0.25 + r() * 0.35;
      parts.push(`<rect x="0" y="${y}" width="${w}" height="${plank - 2}" fill="#6b3f22" opacity="${shade}"/>`);
      for (let x = r() * 300; x < w; x += 200 + r() * 260) {
        parts.push(`<rect x="${x}" y="${y}" width="2" height="${plank - 2}" fill="#140b06" opacity="0.6"/>`);
      }
    }
  }

  // Booth silhouettes
  if (kind === "booths") {
    const n = 3 + Math.floor(r() * 3);
    for (let i = 0; i < n; i++) {
      const bw = w / n - 30;
      const x = i * (w / n) + 15;
      const y = h * (0.5 + r() * 0.08);
      parts.push(`<rect x="${x}" y="${y}" width="${bw}" height="${h - y}" rx="${bw * 0.12}" fill="${accent}" opacity="0.75"/>`);
      parts.push(`<rect x="${x + 12}" y="${y + 12}" width="${bw - 24}" height="${(h - y) * 0.5}" rx="${bw * 0.1}" fill="#a41f1f" opacity="0.5"/>`);
    }
  }

  // Bar counter
  if (kind === "bar") {
    parts.push(`<rect x="0" y="${h * 0.42}" width="${w}" height="${h * 0.14}" fill="#3b2213"/>`);
    parts.push(`<rect x="0" y="${h * 0.42}" width="${w}" height="8" fill="${glow}" opacity="0.7"/>`);
    for (let i = 0; i < 18; i++) {
      const x = r() * w;
      const bh = 40 + r() * 70;
      parts.push(`<rect x="${x}" y="${h * 0.42 - bh - 30}" width="${14 + r() * 10}" height="${bh}" rx="5" fill="${glow}" opacity="${0.15 + r() * 0.25}"/>`);
    }
  }

  // Dance floor light beams
  if (kind === "dance") {
    for (let i = 0; i < 6; i++) {
      const x = r() * w;
      const spread = 120 + r() * 260;
      parts.push(`<polygon points="${w / 2},0 ${x - spread},${h} ${x + spread},${h}" fill="${i % 2 ? glow : accent}" opacity="${0.06 + r() * 0.08}"/>`);
    }
  }

  // Bokeh lights
  for (let i = 0; i < 40; i++) {
    const cx = r() * w;
    const cy = r() * h * 0.6;
    const rad = 6 + r() * (w / 40);
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${r() > 0.3 ? glow : accent}" opacity="${0.05 + r() * 0.22}"/>`);
  }

  const fontSize = Math.round(Math.min(w, h) / 22);
  const text = label
    ? `<text x="${w / 2}" y="${h - fontSize * 1.6}" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-weight="700" letter-spacing="4" font-size="${fontSize}" fill="#f4ead5" opacity="0.55">${label.toUpperCase()}</text>
       <text x="${w / 2}" y="${h - fontSize * 0.6}" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" letter-spacing="3" font-size="${Math.round(fontSize * 0.5)}" fill="#f4ead5" opacity="0.4">PHOTO PLACEHOLDER</text>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="g" cx="${30 + r() * 40}%" cy="25%" r="90%">
      <stop offset="0" stop-color="${mid}"/>
      <stop offset="1" stop-color="${bg}"/>
    </radialGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="${Math.min(w, h) / 120}"/></filter>
    <radialGradient id="v" cx="50%" cy="50%" r="75%">
      <stop offset="0.55" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.7"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <g filter="url(#blur)">${parts.join("")}</g>
  <rect width="100%" height="100%" fill="url(#v)"/>
  ${text}
</svg>`;
}

await mkdir(OUT, { recursive: true });
for (const [name, w, h, palette, kind, label] of images) {
  const file = path.join(OUT, `${name}.jpg`);
  await sharp(Buffer.from(svg(name, w, h, palette, kind, label)))
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(file);
  console.log("wrote", path.relative(process.cwd(), file));
}
