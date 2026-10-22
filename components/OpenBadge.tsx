"use client";

import { useBarStatus } from "@/lib/useBarStatus";

/** Small "Open now" / "Closed" pill driven by the live schedule. */
export default function OpenBadge({ className = "" }: { className?: string }) {
  const { status } = useBarStatus();
  const isOpen = status?.state === "open";
  const label = status === null ? "Thu–Sat" : isOpen ? "Open now" : "Closed";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${
        isOpen ? "border-brass-400 bg-oxblood-700 text-cream-50" : "border-cream-50/20 text-cream-200"
      } ${className}`}
    >
      <span
        aria-hidden
        className={`h-2 w-2 rounded-full ${isOpen ? "bg-brass-300 [animation:pulse-dot_1.4s_ease-in-out_infinite]" : "bg-cream-300/50"}`}
      />
      {label}
    </span>
  );
}
