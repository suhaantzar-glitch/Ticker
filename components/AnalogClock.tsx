"use client";

import { site } from "@/content/site";
import { zonedParts } from "@/lib/schedule";
import { useNow } from "@/lib/useNow";

const hand = (deg: number): React.CSSProperties => ({
  transform: `rotate(${deg}deg)`,
  transformOrigin: "100px 100px",
  transformBox: "view-box",
});

/** A brass-rimmed pub clock that ticks in Canton time. */
export default function AnalogClock({ className = "" }: { className?: string }) {
  const now = useNow();
  // Classic 10:10 pose until the real time is known (also what SSR renders).
  const p = now === null ? { h: 10, min: 10, s: 0 } : zonedParts(new Date(now), site.timezone);
  const sec = p.s * 6;
  const min = p.min * 6 + p.s * 0.1;
  const hr = (p.h % 12) * 30 + p.min * 0.5;

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Clock showing the current time in Canton">
      <defs>
        <radialGradient id="face" cx="50%" cy="40%" r="65%">
          <stop offset="0" stopColor="#fbf6ea" />
          <stop offset="1" stopColor="#e6d6b5" />
        </radialGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0cf83" />
          <stop offset="0.5" stopColor="#b8862b" />
          <stop offset="1" stopColor="#f0cf83" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(#rim)" />
      <circle cx="100" cy="100" r="86" fill="#3a0a0a" />
      <circle cx="100" cy="100" r="80" fill="url(#face)" />
      {Array.from({ length: 60 }, (_, i) => {
        const major = i % 5 === 0;
        return (
          <line
            key={i}
            x1="100"
            y1={major ? 26 : 24}
            x2="100"
            y2={major ? 38 : 30}
            stroke={major ? "#3a0a0a" : "#7a1414"}
            strokeWidth={major ? 4 : 1.5}
            transform={`rotate(${i * 6} 100 100)`}
          />
        );
      })}
      <text x="100" y="72" textAnchor="middle" fontFamily="var(--font-graduate)" fontSize="11" fill="#7a1414">
        TICK TOCK
      </text>
      <text x="100" y="140" textAnchor="middle" fontFamily="var(--font-dm-sans)" fontSize="7" letterSpacing="2" fill="#5a361d">
        CANTON · NY
      </text>
      <g style={hand(hr)}>
        <line x1="100" y1="110" x2="100" y2="58" stroke="#1d110a" strokeWidth="6" strokeLinecap="round" />
      </g>
      <g style={hand(min)}>
        <line x1="100" y1="112" x2="100" y2="36" stroke="#1d110a" strokeWidth="4" strokeLinecap="round" />
      </g>
      <g
        style={{
          ...hand(sec),
          transition: now === null || p.s === 0 ? "none" : "transform 0.25s cubic-bezier(.4,2.3,.6,1)",
        }}
      >
        <line x1="100" y1="118" x2="100" y2="30" stroke="#951c1c" strokeWidth="1.8" />
        <circle cx="100" cy="30" r="3" fill="#951c1c" />
      </g>
      <circle cx="100" cy="100" r="5" fill="#d9a441" stroke="#1d110a" strokeWidth="1.5" />
    </svg>
  );
}
