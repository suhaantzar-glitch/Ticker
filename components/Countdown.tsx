"use client";

import { site, DAY_NAMES } from "@/content/site";
import { pad2, splitDuration } from "@/lib/schedule";
import { useBarStatus } from "@/lib/useBarStatus";

function formatTime(d: Date) {
  return d
    .toLocaleTimeString("en-US", { timeZone: site.timezone, hour: "numeric", minute: "2-digit" })
    .replace(":00", "")
    .replace(/\s/g, "")
    .toLowerCase();
}

export default function Countdown() {
  const { now, status } = useBarStatus();

  const isOpen = status?.state === "open";
  const target = status?.state === "open" ? status.until : status?.state === "closed" ? status.opensAt : null;
  const t = now !== null && target ? splitDuration(target.getTime() - now) : null;

  const heading = status === null ? "Next open night" : isOpen ? "We're open" : "Doors in";
  const sub =
    status?.state === "open"
      ? `Closing at ${formatTime(status.until)} · get here`
      : status?.state === "closed"
        ? `${DAY_NAMES[status.day]} · doors at ${formatTime(status.opensAt)}`
        : site.knowBeforeYouGo.hours;

  const units = t
    ? [
        ...(t.days > 0 ? [{ label: t.days === 1 ? "Day" : "Days", value: String(t.days) }] : []),
        { label: "Hrs", value: pad2(t.hours) },
        { label: "Min", value: pad2(t.minutes) },
        { label: "Sec", value: pad2(t.seconds) },
      ]
    : [
        { label: "Hrs", value: "--" },
        { label: "Min", value: "--" },
        { label: "Sec", value: "--" },
      ];

  return (
    <div
      className={`relative inline-flex flex-col items-center gap-3 rounded-lg border-2 px-5 py-4 shadow-2xl shadow-black/60 sm:px-7 ${
        isOpen ? "border-brass-300 bg-oxblood-700/90" : "border-brass-500/70 bg-walnut-950/80"
      } backdrop-blur-sm`}
      role="timer"
      aria-live="off"
    >
      <p className="flex items-center gap-2 font-display text-sm uppercase tracking-[0.25em] text-brass-300">
        {isOpen && <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-brass-300 [animation:pulse-dot_1.4s_ease-in-out_infinite]" />}
        {heading}
        {isOpen && <span className="sr-only">, closes in</span>}
      </p>
      <div className="flex items-end gap-2 sm:gap-3" aria-hidden={t === null}>
        {units.map((u, i) => (
          <div key={u.label} className="flex items-end gap-2 sm:gap-3">
            {i > 0 && <span className="pb-6 font-display text-2xl text-brass-400/70 sm:text-3xl">:</span>}
            <div className="flex flex-col items-center">
              <span className="min-w-[2ch] rounded bg-black/40 px-2 py-1 text-center font-display text-3xl tabular-nums text-cream-50 sm:text-5xl">
                {u.value}
              </span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-cream-300">{u.label}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-cream-200">{sub}</p>
    </div>
  );
}
