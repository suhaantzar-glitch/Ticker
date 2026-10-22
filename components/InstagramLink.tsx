"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { site } from "@/content/site";

const APP_URL = `instagram://user?username=${site.instagram.username}`;
const FALLBACK_MS = 1500;

function isMobile() {
  const ua = navigator.userAgent;
  // iPadOS reports a desktop Mac user agent, so also check for touch.
  return /iPhone|iPad|iPod|Android/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}

/**
 * Link to the bar's Instagram profile.
 *
 * On phones, web links to instagram.com can open the Instagram app on the
 * viewer's own Activity tab instead of the profile, so we open the profile in
 * the app directly and fall back to the web page if the app doesn't take over.
 * Desktop gets a plain link in a new tab.
 */
export default function InstagramLink({ onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !isMobile()) return;
    e.preventDefault();

    let left = false;
    const markLeft = () => {
      left = true;
    };
    const onVisibility = () => document.hidden && markLeft();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", markLeft);
    window.addEventListener("blur", markLeft);

    window.location.href = APP_URL;

    window.setTimeout(() => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", markLeft);
      window.removeEventListener("blur", markLeft);
      if (!left && !document.hidden) window.location.href = site.instagram.url;
    }, FALLBACK_MS);
  };

  return <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" {...props} onClick={handleClick} />;
}
