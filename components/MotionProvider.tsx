"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_OFFSET = -72;

/**
 * Wires up Lenis smooth scrolling, keeps ScrollTrigger in sync with it,
 * and runs the site-wide scroll animations:
 *  - [data-reveal]          fade/slide in when scrolled into view
 *  - [data-reveal-stagger]  children reveal one after another
 *  - [data-parallax="0.2"]  drift vertically relative to scroll
 *
 * Everything is skipped when the visitor prefers reduced motion.
 */
export default function MotionProvider() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Anchor links: smooth with Lenis when available, native otherwise.
    let lenis: Lenis | null = null;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector<HTMLElement>(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: NAV_OFFSET });
      } else {
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + NAV_OFFSET });
      }
      history.replaceState(null, "", id);
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    if (reduced) {
      root.classList.remove("js-motion");
      return () => document.removeEventListener("click", onClick);
    }

    (window as Window & { __ttMotion?: boolean }).__ttMotion = true;
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
        gsap.fromTo(
          group.children,
          { autoAlpha: 0, y: 50, rotate: () => gsap.utils.random(-3, 3) },
          {
            autoAlpha: 1,
            y: 0,
            rotate: 0,
            duration: 0.8,
            ease: "back.out(1.4)",
            stagger: 0.12,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0.15;
        gsap.fromTo(
          el,
          { yPercent: -speed * 50 },
          {
            yPercent: speed * 50,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    // Images and fonts can shift layout after first paint.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
