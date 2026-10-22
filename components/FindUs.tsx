import { site, fullAddress, mapsQuery } from "@/content/site";
import SectionHeading from "./SectionHeading";
import { ArrowIcon, PinIcon } from "./icons";

export default function FindUs() {
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery()}`;
  const embed = `https://www.google.com/maps?q=${mapsQuery()}&z=16&output=embed`;

  return (
    <section id="find-us" tabIndex={-1} className="wood grain relative py-24 outline-none sm:py-32">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading eyebrow="Downtown Canton" title="Find Us" align="left" />
          <address data-reveal className="not-italic">
            <p className="flex items-start gap-3 text-xl text-cream-50">
              <PinIcon className="mt-1 h-6 w-6 shrink-0 text-brass-300" />
              <span>
                {site.name}
                <br />
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </span>
            </p>
            <p className="mt-4 text-cream-200">{site.knowBeforeYouGo.hours}</p>
          </address>
          <a
            data-reveal
            href={directions}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-md border-2 border-brass-400 bg-oxblood-700 px-6 py-3 font-display tracking-widest text-cream-50 shadow-[4px_4px_0_0_#120a05] transition-transform hover:-translate-y-0.5"
          >
            Get Directions
            <ArrowIcon className="h-5 w-5" />
          </a>
        </div>
        <div data-reveal className="relative overflow-hidden rounded-lg border-[6px] border-oak-500 shadow-2xl shadow-black/60">
          {/* Shows through while the map loads, or if it is blocked */}
          <div aria-hidden className="paper absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
            <PinIcon className="h-10 w-10 text-oxblood-700" />
            <p className="font-display text-xl text-oxblood-800">{site.address.street}</p>
            <p className="text-sm text-walnut-700">Loading map…</p>
          </div>
          <iframe
            title={`Map showing ${site.name} at ${fullAddress()}`}
            src={embed}
            className="relative block aspect-[4/3] w-full [filter:sepia(0.35)_saturate(0.9)_contrast(1.05)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
