const ITEMS = ["Thu · Fri · Sat", "Doors 10pm", "21+ with valid ID", "Two bars", "One dance floor", "Canton, NY", "Drink responsibly"];

/** Scrolling felt ribbon between sections. Purely decorative. */
export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div aria-hidden className="felt relative overflow-hidden border-y-2 border-brass-500/60 py-3">
      <div className="flex w-max [animation:marquee_40s_linear_infinite] motion-reduce:[animation:none]">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {row.map((t, i) => (
              <span key={i} className="flex items-center whitespace-nowrap px-6 font-display text-lg tracking-widest text-cream-50">
                {t}
                <span className="ml-12 text-brass-300">★</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
