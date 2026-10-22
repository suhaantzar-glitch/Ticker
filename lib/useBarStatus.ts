"use client";

import { site } from "@/content/site";
import { getBarStatus } from "./schedule";
import { useNow } from "./useNow";

export function useBarStatus() {
  const now = useNow();
  if (now === null) return { now: null, status: null } as const;
  return { now, status: getBarStatus(new Date(now), site.openNights, site.timezone) } as const;
}
