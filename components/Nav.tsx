"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { InstagramIcon } from "./icons";
import OpenBadge from "./OpenBadge";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-walnut-950/90 shadow-lg shadow-black/40 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-display text-lg text-cream-50">
          <ClockMark />
          <span>Tick Tock</span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-semibold uppercase tracking-widest text-cream-200 transition-colors hover:text-brass-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <OpenBadge className="hidden sm:inline-flex" />
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${site.instagram.handle}`}
            className="hidden rounded-full p-2 text-cream-100 transition-colors hover:text-brass-300 sm:block"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <button
            type="button"
            className="rounded p-2 text-cream-50 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-brass-500/30 lg:hidden">
        <ul className="flex flex-col px-4 py-4">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-display text-xl text-cream-50"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="mt-2 flex items-center justify-between border-t border-cream-50/10 pt-4">
            <OpenBadge />
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="text-brass-300">
              {site.instagram.handle}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

function ClockMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
      <circle cx="16" cy="16" r="14" fill="#7a1414" stroke="#d9a441" strokeWidth="2" />
      <path d="M16 8v8l5 3" stroke="#f4ead5" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
