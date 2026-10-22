import type { OpenNight, Weekday } from "@/content/site";

/** `day` is the weekday of the open night being referred to (its opening day). */
export type BarStatus =
  | { state: "open"; until: Date; day: Weekday }
  | { state: "closed"; opensAt: Date; day: Weekday }
  | { state: "none" };

type Parts = { y: number; m: number; d: number; h: number; min: number; s: number };

const formatters = new Map<string, Intl.DateTimeFormat>();

function formatter(timeZone: string) {
  let f = formatters.get(timeZone);
  if (!f) {
    f = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    formatters.set(timeZone, f);
  }
  return f;
}

/** Wall-clock parts of `instant` in `timeZone`. */
export function zonedParts(instant: Date, timeZone: string): Parts {
  const out: Record<string, number> = {};
  for (const p of formatter(timeZone).formatToParts(instant)) {
    if (p.type !== "literal") out[p.type] = Number(p.value);
  }
  return { y: out.year, m: out.month, d: out.day, h: out.hour % 24, min: out.minute, s: out.second };
}

function offsetMs(instant: number, timeZone: string) {
  const p = zonedParts(new Date(instant), timeZone);
  return Date.UTC(p.y, p.m - 1, p.d, p.h, p.min, p.s) - Math.floor(instant / 1000) * 1000;
}

/** The UTC instant at which the wall clock in `timeZone` reads the given local time. */
export function zonedToUtc(y: number, m: number, d: number, h: number, min: number, timeZone: string): Date {
  const guess = Date.UTC(y, m - 1, d, h, min);
  let t = guess - offsetMs(guess, timeZone);
  // Re-check once in case the guess straddled a DST transition.
  const corrected = guess - offsetMs(t, timeZone);
  if (corrected !== t) t = corrected;
  return new Date(t);
}

function parseTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return { h, m };
}

/** Whether the bar is open right now, and when it next opens or closes. */
export function getBarStatus(now: Date, nights: readonly OpenNight[], timeZone: string): BarStatus {
  if (nights.length === 0) return { state: "none" };

  const today = zonedParts(now, timeZone);
  const nowMs = now.getTime();
  let next: { opensAt: Date; day: Weekday } | null = null;

  // Start from yesterday so a night that runs past midnight still counts as "open".
  for (let offset = -1; offset <= 7; offset++) {
    const cal = new Date(Date.UTC(today.y, today.m - 1, today.d + offset));
    const weekday = cal.getUTCDay();
    for (const night of nights) {
      if (night.day !== weekday) continue;
      const o = parseTime(night.open);
      const c = parseTime(night.close);
      const overnight = c.h * 60 + c.m <= o.h * 60 + o.m;
      const y = cal.getUTCFullYear();
      const mo = cal.getUTCMonth() + 1;
      const d = cal.getUTCDate();
      const openAt = zonedToUtc(y, mo, d, o.h, o.m, timeZone);
      const closeCal = new Date(Date.UTC(y, mo - 1, d + (overnight ? 1 : 0)));
      const closeAt = zonedToUtc(closeCal.getUTCFullYear(), closeCal.getUTCMonth() + 1, closeCal.getUTCDate(), c.h, c.m, timeZone);

      if (nowMs >= openAt.getTime() && nowMs < closeAt.getTime()) {
        return { state: "open", until: closeAt, day: night.day };
      }
      if (openAt.getTime() > nowMs && (!next || openAt < next.opensAt)) {
        next = { opensAt: openAt, day: night.day };
      }
    }
  }

  return next ? { state: "closed", ...next } : { state: "none" };
}

/** Split a millisecond duration into days/hours/minutes/seconds. */
export function splitDuration(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
