"use client";

import type { Weekday } from "@/content/site";
import { useBarStatus } from "@/lib/useBarStatus";

const DAY_MS = 24 * 3600 * 1000;

/** "Live" on the night that's open now, "Tonight" on the next night if it starts within 24h. */
export default function TonightBadge({ day }: { day: Weekday }) {
  const { now, status } = useBarStatus();
  if (now === null || !status || status.state === "none" || status.day !== day) return null;
  if (status.state === "closed" && status.opensAt.getTime() - now > DAY_MS) return null;

  return (
    <span className="rounded-sm bg-brass-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-walnut-950">
      {status.state === "open" ? "Live" : "Tonight"}
    </span>
  );
}
