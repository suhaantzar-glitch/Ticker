import { site, fullAddress } from "@/content/site";
import SectionHeading from "./SectionHeading";

const k = site.knowBeforeYouGo;

const items = [
  { label: "Hours", value: k.hours, icon: "🕙" },
  { label: "Cover", value: k.cover, icon: "🎟" },
  { label: "ID Policy", value: k.id, icon: "🪪", highlight: true },
  { label: "Address", value: fullAddress(), icon: "📍" },
  { label: "Parking & Rides", value: k.parking, icon: "🚗" },
  { label: "Dress Code", value: k.dress, icon: "🧢" },
];

export default function KnowBeforeYouGo() {
  return (
    <section id="know" tabIndex={-1} className="wood-floor grain relative py-24 outline-none sm:py-32">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="paper rounded-lg px-5 py-12 shadow-2xl shadow-black/60 sm:px-12">
          <SectionHeading eyebrow="The Rules" title="Know Before You Go" tone="dark" />
          <dl data-reveal-stagger className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <div
                key={it.label}
                className={`border-t-4 pt-4 ${it.highlight ? "border-oxblood-700" : "border-walnut-700/40"}`}
              >
                <dt className="flex items-center gap-2 font-display text-lg uppercase tracking-wider text-oxblood-800">
                  <span aria-hidden>{it.icon}</span>
                  {it.label}
                </dt>
                <dd className="mt-2 leading-relaxed text-walnut-900">{it.value}</dd>
              </div>
            ))}
          </dl>
          <p data-reveal className="mt-10 rounded bg-oxblood-700 px-4 py-3 text-center text-sm font-bold uppercase tracking-widest text-cream-50">
            21+ · Valid photo ID required every night · No exceptions
          </p>
        </div>
      </div>
    </section>
  );
}
