/**
 * All editable site content lives here.
 *
 * Anything marked [CONFIRM] is a best guess that should be checked with
 * the bar before going live. Search this file for "CONFIRM" to find them.
 */

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday

export type OpenNight = {
  day: Weekday;
  /** 24h local time (America/New_York), e.g. "22:00" */
  open: string;
  /** 24h local time; if earlier than `open`, it closes the next morning */
  close: string;
};

export type WeekEvent = {
  day: Weekday;
  title: string;
  tagline: string;
  specials: string[];
  /** "chalkboard" or "pennant" card style */
  style: "chalkboard" | "pennant";
  dj?: string;
};

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const site = {
  name: "The Tick Tock Pub",
  shortName: "The Tick Tock",
  tagline: "Canton's late-night tradition",
  description:
    "The Tick Tock Pub is Canton, NY's late-night college bar and dance floor: red booths, two bars, a DJ, and the night everybody ends up at.",
  url: "https://ticktockpub.vercel.app", // [CONFIRM] swap for the real domain
  timezone: "America/New_York",

  address: {
    street: "11 Hodskin St", // [CONFIRM] listings show both 9 and 11 Hodskin St
    city: "Canton",
    region: "NY",
    postalCode: "13617",
    country: "US",
  },

  instagram: {
    handle: "@theticktockpub", // [CONFIRM] placeholder handle
    url: "https://www.instagram.com/theticktockpub/", // [CONFIRM]
  },

  /** Thursday–Saturday, 10pm–2am */
  openNights: [
    { day: 4, open: "22:00", close: "02:00" },
    { day: 5, open: "22:00", close: "02:00" },
    { day: 6, open: "22:00", close: "02:00" },
  ] satisfies OpenNight[] as OpenNight[],

  /** Placeholder events. Edit freely; one card renders per entry. */
  thisWeek: [
    {
      day: 4,
      title: "Throwback Thursday",
      tagline: "2000s & 2010s anthems, all night",
      specials: ["Pitcher specials till 11", "No cover before 10:30", "Request wall by the DJ booth"],
      style: "chalkboard",
      dj: "DJ Night Shift",
    },
    {
      day: 5,
      title: "Friday Night Lights",
      tagline: "Wear your jersey. Any team, any sport.",
      specials: ["Rail specials at the back bar", "Jersey = skip-the-line before 10:30", "Shot-clock countdown at midnight"],
      style: "pennant",
      dj: "DJ Night Shift",
    },
    {
      day: 6,
      title: "Saturday Main Event",
      tagline: "The big one. Dance floor's open till close.",
      specials: ["Both bars open all night", "Guest DJ on the floor", "Last-call countdown at 1:45"],
      style: "chalkboard",
      dj: "Guest DJ",
    },
  ] satisfies WeekEvent[] as WeekEvent[],

  knowBeforeYouGo: {
    hours: "Thu – Sat · 10pm – 2am",
    cover: "Cover varies by night, typically $5 – $10. Cash and card at the door.", // [CONFIRM]
    id: "21+ only. A valid, unexpired government-issued photo ID is required every night. No exceptions, no photocopies.",
    dress: "Come as you are. Jerseys encouraged on Fridays.",
    parking:
      "Street parking on Hodskin St and Main St, plus nearby municipal lots. Better yet: walk, carpool with a sober driver, or grab a ride home.", // [CONFIRM]
  },

  space: {
    heading: "The Space",
    body: [
      "Oxblood leather booths worn soft by a few thousand Thursdays. Wood floors that have seen every dance move since before you were born. Two bars, so the line is never as bad as it looks.",
      "Grab a booth up front, then follow the bass to the back, where the DJ runs the floor until last call.",
    ],
    features: [
      { title: "Red Booths", text: "Cherry leather seating, perfect for the pregame recap." },
      { title: "Two Bars", text: "Front bar for catching up, back bar for the dance floor." },
      { title: "Wood Floors", text: "Warm oak boards under every step." },
      { title: "Dance Floor + DJ", text: "Lights down, volume up, every open night." },
    ],
  },

  images: {
    hero: { src: "/images/hero.jpg", alt: "Low-lit interior of The Tick Tock Pub with red booths and the bar glowing", width: 2400, height: 1500 },
    space: [
      { src: "/images/space-booths.jpg", alt: "Row of deep red leather booths", width: 1200, height: 1500 },
      { src: "/images/space-front-bar.jpg", alt: "Wood-paneled front bar with brass rail", width: 1600, height: 1100 },
      { src: "/images/space-floor.jpg", alt: "Warm wooden floorboards under string lights", width: 1600, height: 1100 },
      { src: "/images/space-back-bar.jpg", alt: "Back bar beside the dance floor", width: 1200, height: 1500 },
      { src: "/images/space-dj.jpg", alt: "DJ booth lit up over a packed dance floor", width: 2000, height: 1100 },
    ],
    gallery: [
      { src: "/images/gallery-01.jpg", alt: "Friends crowding a red booth", width: 1000, height: 1300 },
      { src: "/images/gallery-02.jpg", alt: "Hands up on the dance floor", width: 1200, height: 800 },
      { src: "/images/gallery-03.jpg", alt: "Bartender pouring at the front bar", width: 1000, height: 1000 },
      { src: "/images/gallery-04.jpg", alt: "Group photo under the clock", width: 1000, height: 1400 },
      { src: "/images/gallery-05.jpg", alt: "DJ mid-set with lights flaring", width: 1200, height: 900 },
      { src: "/images/gallery-06.jpg", alt: "Late-night crowd at the back bar", width: 1000, height: 1250 },
      { src: "/images/gallery-07.jpg", alt: "Confetti over the dance floor at midnight", width: 1200, height: 800 },
      { src: "/images/gallery-08.jpg", alt: "Jersey night selfie", width: 1000, height: 1300 },
      { src: "/images/gallery-09.jpg", alt: "Neon glow over the booths", width: 1200, height: 1000 },
    ],
  } satisfies { hero: SiteImage; space: SiteImage[]; gallery: SiteImage[] },

  nav: [
    { href: "#this-week", label: "This Week" },
    { href: "#the-space", label: "The Space" },
    { href: "#know", label: "Know Before You Go" },
    { href: "#gallery", label: "Gallery" },
    { href: "#find-us", label: "Find Us" },
  ],

  legal: {
    responsibly: "Drink responsibly. 21+ with valid ID. Never drink and drive.",
  },
} as const;

export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

export function fullAddress() {
  const a = site.address;
  return `${a.street}, ${a.city}, ${a.region} ${a.postalCode}`;
}

export function mapsQuery() {
  return encodeURIComponent(`The Tick Tock Pub, ${fullAddress()}`);
}
