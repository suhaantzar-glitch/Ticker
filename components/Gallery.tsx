import Image from "next/image";
import { site, instagramLabel } from "@/content/site";
import SectionHeading from "./SectionHeading";
import { InstagramIcon } from "./icons";

export default function Gallery() {
  return (
    <section id="gallery" tabIndex={-1} className="grain relative bg-walnut-950 py-24 outline-none sm:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Last Weekend" title="Gallery" intro={site.preview ? "Proof you were there. (Placeholder shots for now; real nights coming soon.)" : "Proof you were there. Tag us to get featured."} />
        <ul className="columns-2 gap-4 sm:gap-5 md:columns-3">
          {site.images.gallery.map((img, i) => (
            <li key={img.src} data-reveal className="mb-4 break-inside-avoid sm:mb-5">
              <figure
                className={`group relative overflow-hidden rounded-sm bg-cream-100 p-2 pb-8 shadow-xl shadow-black/60 transition-transform duration-300 hover:rotate-0 hover:scale-[1.02] ${
                  i % 3 === 0 ? "-rotate-1" : i % 3 === 1 ? "rotate-1" : "rotate-0"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="h-auto w-full"
                />
                <figcaption className="absolute inset-x-2 bottom-1.5 truncate font-chalk text-xs text-walnut-800 sm:text-sm">
                  {img.alt}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <div data-reveal className="mt-12 flex justify-center">
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-md border-2 border-brass-400 bg-oxblood-700 px-7 py-3 font-display text-lg tracking-widest text-cream-50 shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-0.5"
          >
            <InstagramIcon className="h-5 w-5" />
            More on {instagramLabel()}
          </a>
        </div>
      </div>
    </section>
  );
}
