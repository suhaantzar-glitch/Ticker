import { site, fullAddress, instagramLabel } from "@/content/site";
import { InstagramIcon } from "./icons";
import InstagramLink from "./InstagramLink";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain relative border-t-4 border-oxblood-700 bg-walnut-950 pb-10 pt-16">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-3xl text-varsity">{site.name}</p>
            <p className="mt-2 font-chalk text-lg text-brass-300">{site.tagline}</p>
          </div>
          <div className="space-y-2 text-cream-200">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-cream-300">Visit</h2>
            <p>{fullAddress()}</p>
            <p>{site.knowBeforeYouGo.hours}</p>
          </div>
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-cream-300">Follow</h2>
            <InstagramLink
              className="inline-flex items-center gap-2 text-lg text-cream-50 transition-colors hover:text-brass-300"
            >
              <InstagramIcon className="h-5 w-5" />
              {instagramLabel()}
            </InstagramLink>
          </div>
        </div>
        <div aria-hidden className="brass-rule my-10" />
        <div className="flex flex-col gap-3 text-sm text-cream-300 md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-cream-100">{site.legal.responsibly}</p>
          <p>
            © {year} {site.name}. All rights reserved.
            {site.preview && <span className="block text-xs text-cream-300/70 md:inline md:pl-2">Concept preview · sample events &amp; photos</span>}
          </p>
        </div>
      </div>
    </footer>
  );
}
