import { site } from "@/content/site";

/**
 * Absolute base URL for metadata, Open Graph images, robots and sitemap.
 * NEXT_PUBLIC_SITE_URL wins; otherwise Vercel's system env vars are used so
 * link previews work on any deployment without extra config.
 */
export function siteUrl(): string {
  const env = process.env;
  if (env.NEXT_PUBLIC_SITE_URL) return env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (env.VERCEL_ENV === "production" && env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return site.url;
}
