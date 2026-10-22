import { site, DAY_NAMES, type WeekEvent } from "@/content/site";
import SectionHeading from "./SectionHeading";
import TonightBadge from "./TonightBadge";

function doorsFor(day: number) {
  const night = site.openNights.find((n) => n.day === day);
  if (!night) return null;
  const [h, m] = night.open.split(":").map(Number);
  const hour12 = ((h + 11) % 12) + 1;
  return `Doors ${hour12}${m ? `:${String(m).padStart(2, "0")}` : ""}${h >= 12 ? "pm" : "am"}`;
}

export default function ThisWeek() {
  return (
    <section id="this-week" tabIndex={-1} className="wood grain relative py-24 outline-none sm:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="On Tap"
          title="This Week"
          intro="Three nights, one tradition. Here's what's going down at the Tock."
        />
        <ul data-reveal-stagger className="grid gap-10 md:grid-cols-3 md:gap-8">
          {site.thisWeek.map((ev) => (
            <li key={`${ev.day}-${ev.title}`} className="flex">
              {ev.style === "chalkboard" ? <ChalkCard ev={ev} /> : <PennantCard ev={ev} />}
            </li>
          ))}
        </ul>
        <p data-reveal className="mt-12 text-center text-sm text-cream-300">
          Lineups and specials change. Check{" "}
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-brass-300 underline-offset-4 hover:underline">
            {site.instagram.handle}
          </a>{" "}
          for night-of updates.
        </p>
      </div>
    </section>
  );
}

function ChalkCard({ ev }: { ev: WeekEvent }) {
  return (
    <article className="relative flex w-full flex-col rounded-md border-[10px] border-oak-500 bg-walnut-700 p-1 shadow-2xl shadow-black/60 [border-style:ridge]">
      <div className="chalkboard flex flex-1 flex-col rounded-sm p-6 text-cream-50">
        <header className="flex items-start justify-between gap-3">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-brass-300">{DAY_NAMES[ev.day]}</p>
          <TonightBadge day={ev.day} />
        </header>
        <h3 className="mt-3 font-chalk text-3xl leading-tight">{ev.title}</h3>
        <p className="mt-2 font-chalk text-lg text-cream-200/90">{ev.tagline}</p>
        <div className="my-5 h-px bg-cream-50/20" />
        <ul className="space-y-2 font-chalk text-lg">
          {ev.specials.map((s) => (
            <li key={s} className="flex gap-3">
              <span aria-hidden className="text-brass-300">✱</span>
              {s}
            </li>
          ))}
        </ul>
        <footer className="mt-auto flex items-center justify-between pt-6 text-xs font-bold uppercase tracking-widest text-cream-300">
          <span>{doorsFor(ev.day)}</span>
          {ev.dj && <span>{ev.dj}</span>}
        </footer>
      </div>
      {/* chalk tray */}
      <div aria-hidden className="mx-6 mt-1 h-2 rounded-b bg-oak-400/60" />
    </article>
  );
}

function PennantCard({ ev }: { ev: WeekEvent }) {
  return (
    <article className="relative flex w-full flex-col drop-shadow-[0_25px_25px_rgba(0,0,0,0.55)]">
      {/* hanging rod */}
      <div aria-hidden className="mx-[-6px] h-3 rounded-full bg-gradient-to-b from-brass-300 to-brass-500" />
      <div className="felt pennant-card flex flex-1 flex-col items-center px-6 pb-20 pt-8 text-center text-cream-50">
        <div className="flex w-full items-start justify-between">
          <span className="w-16" />
          <p className="font-display text-sm uppercase tracking-[0.3em] text-brass-300">{DAY_NAMES[ev.day]}</p>
          <span className="flex w-16 justify-end">
            <TonightBadge day={ev.day} />
          </span>
        </div>
        <h3 className="mt-4 font-display text-3xl leading-none text-cream-50 [text-shadow:2px_2px_0_#3a0a0a]">{ev.title}</h3>
        <p className="mt-3 text-cream-100">{ev.tagline}</p>
        <div aria-hidden className="brass-rule my-5 w-3/4" />
        <ul className="space-y-2 text-sm font-semibold">
          {ev.specials.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="mt-6 text-xs font-bold uppercase tracking-widest text-cream-200">
          {doorsFor(ev.day)}
          {ev.dj ? ` · ${ev.dj}` : ""}
        </p>
      </div>
    </article>
  );
}
