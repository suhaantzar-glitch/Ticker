import type { Metadata, Viewport } from "next";
import { DM_Sans, Graduate, Permanent_Marker } from "next/font/google";
import { site, fullAddress, DAY_NAMES } from "@/content/site";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const graduate = Graduate({ weight: "400", subsets: ["latin"], variable: "--font-graduate", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const marker = Permanent_Marker({ weight: "400", subsets: ["latin"], variable: "--font-marker", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#1d110a",
  colorScheme: "dark",
};

// Hide reveal targets before first paint only when JS runs and motion is allowed.
// The timeout is a safety net in case animations never initialise.
const motionScript = `(function(){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var r=document.documentElement;r.classList.add('js-motion');setTimeout(function(){if(!window.__ttMotion)r.classList.remove('js-motion')},4000)}}catch(e){}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarOrPub",
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}/images/og.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  openingHoursSpecification: site.openNights.map((n) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: DAY_NAMES[n.day],
    opens: n.open,
    closes: n.close,
  })),
  sameAs: [site.instagram.url],
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress())}`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${graduate.variable} ${dmSans.variable} ${marker.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-brass-400 focus:px-4 focus:py-2 focus:text-walnut-950"
        >
          Skip to content
        </a>
        <MotionProvider />
        {children}
      </body>
    </html>
  );
}
