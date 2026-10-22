import Image from "next/image";
import { site, type SiteImage } from "@/content/site";
import SectionHeading from "./SectionHeading";

export default function TheSpace() {
  const [booths, frontBar, floor, backBar, dj] = site.images.space;

  return (
    <section id="the-space" tabIndex={-1} className="grain relative overflow-hidden bg-oxblood-950 py-24 outline-none sm:py-32">
      {/* tuck-and-roll leather band */}
      <div aria-hidden className="leather absolute inset-x-0 top-0 h-3 opacity-80" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow="Inside the Pub" title={site.space.heading} align="left" />
            <div data-reveal className="space-y-5 text-lg leading-relaxed text-cream-200">
              {site.space.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl data-reveal-stagger className="mt-10 grid grid-cols-2 gap-4">
              {site.space.features.map((f) => (
                <div key={f.title} className="rounded-md border border-brass-500/30 bg-walnut-950/50 p-4">
                  <dt className="font-display text-lg text-brass-300">{f.title}</dt>
                  <dd className="mt-1 text-sm text-cream-200">{f.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            <Photo img={booths} className="row-span-2 aspect-[4/5] h-full" speed={0.12} />
            <Photo img={frontBar} className="aspect-[16/11]" speed={0.2} />
            <Photo img={floor} className="aspect-[16/11]" speed={0.16} />
            <Photo img={dj} className="col-span-2 aspect-[2/1]" speed={0.14} />
            <Photo img={backBar} className="col-span-2 aspect-[16/9] sm:col-span-1 sm:aspect-[4/5]" speed={0.2} />
            <div
              data-reveal
              className="paper col-span-2 flex flex-col justify-center rounded-md p-6 shadow-xl shadow-black/50 sm:col-span-1"
            >
              <p className="font-display text-2xl leading-tight text-oxblood-700">Front bar. Back bar. No excuses.</p>
              <p className="mt-3 text-sm text-walnut-700">
                Two bars means shorter lines and more time on the floor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Photo({ img, className = "", speed }: { img: SiteImage; className?: string; speed: number }) {
  return (
    <figure
      data-reveal
      className={`group relative overflow-hidden rounded-md border-4 border-walnut-800 shadow-xl shadow-black/60 ${className}`}
    >
      <div data-parallax={speed} className="absolute -inset-y-[12%] inset-x-0">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(min-width: 1024px) 30vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
    </figure>
  );
}
