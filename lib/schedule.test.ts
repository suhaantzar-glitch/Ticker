import { describe, expect, it } from "vitest";
import { getBarStatus, splitDuration, zonedToUtc } from "./schedule";
import type { OpenNight } from "@/content/site";

const TZ = "America/New_York";
const nights: OpenNight[] = [
  { day: 4, open: "22:00", close: "02:00" },
  { day: 5, open: "22:00", close: "02:00" },
  { day: 6, open: "22:00", close: "02:00" },
];

describe("zonedToUtc", () => {
  it("handles EDT and EST offsets", () => {
    expect(zonedToUtc(2026, 7, 1, 22, 0, TZ).toISOString()).toBe("2026-07-02T02:00:00.000Z");
    expect(zonedToUtc(2026, 1, 15, 22, 0, TZ).toISOString()).toBe("2026-01-16T03:00:00.000Z");
  });
});

describe("getBarStatus", () => {
  it("counts down to Thursday night from a Wednesday", () => {
    // Wed 2026-10-21 12:00 EDT
    const s = getBarStatus(new Date("2026-10-21T16:00:00Z"), nights, TZ);
    expect(s).toEqual({ state: "closed", opensAt: new Date("2026-10-23T02:00:00Z"), day: 4 });
  });

  it("is open late Thursday night", () => {
    // Thu 2026-10-22 23:30 EDT
    const s = getBarStatus(new Date("2026-10-23T03:30:00Z"), nights, TZ);
    expect(s).toEqual({ state: "open", until: new Date("2026-10-23T06:00:00Z"), day: 4 });
  });

  it("is still open after midnight from the previous night", () => {
    // Sun 2026-01-18 01:15 EST, Saturday night still running
    const s = getBarStatus(new Date("2026-01-18T06:15:00Z"), nights, TZ);
    expect(s).toEqual({ state: "open", until: new Date("2026-01-18T07:00:00Z"), day: 6 });
  });

  it("rolls over to next Thursday after Saturday closes", () => {
    // Sun 2026-01-18 03:00 EST
    const s = getBarStatus(new Date("2026-01-18T08:00:00Z"), nights, TZ);
    expect(s).toEqual({ state: "closed", opensAt: new Date("2026-01-23T03:00:00Z"), day: 4 });
  });

  it("returns none with no schedule", () => {
    expect(getBarStatus(new Date(), [], TZ)).toEqual({ state: "none" });
  });
});

describe("splitDuration", () => {
  it("splits", () => {
    expect(splitDuration((2 * 86400 + 3 * 3600 + 4 * 60 + 5) * 1000)).toEqual({ days: 2, hours: 3, minutes: 4, seconds: 5 });
    expect(splitDuration(-5)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
});
