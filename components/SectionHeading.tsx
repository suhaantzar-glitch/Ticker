type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

/** Felt-pennant eyebrow + varsity heading used at the top of each section. */
export default function SectionHeading({ eyebrow, title, intro, align = "center", tone = "light" }: Props) {
  const center = align === "center";
  return (
    <div data-reveal className={`mb-12 ${center ? "mx-auto max-w-2xl text-center" : "max-w-xl"}`}>
      <span className={`inline-flex items-center ${center ? "" : ""}`}>
        <span className="felt py-1 pl-4 pr-2 text-xs font-bold uppercase tracking-[0.3em] text-cream-50">{eyebrow}</span>
        <span aria-hidden className="felt pennant h-[26px] w-8" />
      </span>
      <h2
        className={`mt-4 font-display text-4xl leading-none sm:text-6xl ${
          tone === "light" ? "text-varsity" : "text-oxblood-800"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-lg ${tone === "light" ? "text-cream-200" : "text-walnut-700"}`}>{intro}</p>
      )}
    </div>
  );
}
