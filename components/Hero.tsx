"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/content/site";
import Countdown from "./Countdown";
import AnalogClock from "./AnalogClock";
import { InstagramIcon } from "./icons";
import InstagramLink from "./InstagramLink";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["TICK", "TOCK"];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo("[data-hero-the]", { autoAlpha: 0, y: -20 }, { autoAlpha: 1, y: 0, duration: 0.6 })
        .fromTo(
          "[data-hero-letter]",
          { autoAlpha: 0, yPercent: 110, rotate: () => gsap.utils.random(-12, 12) },
          { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.05 },
          "-=0.3",
        )
        .fromTo("[data-hero-banner]", { autoAlpha: 0, scaleX: 0 }, { autoAlpha: 1, scaleX: 1, duration: 0.7 }, "-=0.5")
        .fromTo("[data-hero-fade]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.4")
        .fromTo("[data-hero-clock]", { autoAlpha: 0, rotate: -90, scale: 0.6 }, { autoAlpha: 1, rotate: 0, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.6)" }, "-=1");

      gsap.to("[data-hero-bg]", {
        yPercent: 18,
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      tabIndex={-1}
      aria-label="The Tick Tock Pub"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-walnut-950 pt-16 outline-none"
    >
      <div data-hero-bg className="absolute inset-0 -top-[10%] h-[120%] will-change-transform">
        <Image
          src={site.images.hero.src}
          alt={site.images.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-walnut-950/70 via-oxblood-950/50 to-walnut-950" />
      <div className="grain absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="text-center lg:text-left">
          <p data-hero-the className="font-display text-2xl tracking-[0.4em] text-brass-300 sm:text-3xl">
            THE
          </p>
          <h1 className="font-display leading-[0.85] text-varsity">
            <span className="sr-only">The Tick Tock Pub</span>
            {WORDS.map((word) => (
              <span key={word} aria-hidden className="block overflow-hidden whitespace-nowrap pb-2 text-[clamp(4rem,21vw,9.5rem)]">
                {word.split("").map((ch, i) => (
                  <span key={i} data-hero-letter className="inline-block">
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <div data-hero-banner className="mx-auto mt-2 inline-flex origin-left items-center lg:mx-0">
            <span className="felt px-6 py-2 font-display text-xl tracking-[0.3em] text-cream-50 shadow-lg shadow-black/50 sm:text-2xl">
              PUB
            </span>
            <span aria-hidden className="felt pennant h-11 w-10 sm:h-12" />
          </div>

          <p data-hero-fade className="mt-6 font-chalk text-2xl text-cream-100 sm:text-3xl">
            {site.tagline}
          </p>

          <div data-hero-fade className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#this-week"
              className="w-full rounded-md border-2 border-brass-400 bg-oxblood-700 px-7 py-3 text-center font-display text-lg tracking-widest text-cream-50 shadow-[4px_4px_0_0_#120a05] transition-transform hover:-translate-y-0.5 hover:bg-oxblood-600 sm:w-auto"
            >
              This Week
            </a>
            <InstagramLink
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border-2 border-cream-100/60 px-7 py-3 font-display text-lg tracking-widest text-cream-50 transition-colors hover:border-brass-300 hover:text-brass-300 sm:w-auto"
            >
              <InstagramIcon className="h-5 w-5" />
              Follow on Instagram
            </InstagramLink>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center gap-8 lg:flex-col">
          <div data-hero-clock className="relative">
            <div className="absolute inset-4 rounded-full bg-brass-400/20 blur-3xl" aria-hidden />
            <AnalogClock className="relative h-36 w-36 drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] sm:h-56 sm:w-56" />
          </div>
          <div data-hero-fade>
            <Countdown />
          </div>
        </div>
      </div>

      <a
        href="#this-week"
        aria-label="Scroll to this week"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-[0.3em] text-cream-300 sm:flex"
      >
        Scroll
        <span className="block h-8 w-px bg-gradient-to-b from-brass-300 to-transparent" />
      </a>
    </section>
  );
}
