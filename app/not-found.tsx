import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grain flex min-h-svh flex-col items-center justify-center gap-6 bg-walnut-950 px-4 text-center">
      <p className="font-display text-7xl text-varsity">Last Call</p>
      <p className="text-cream-200">This page already went home for the night.</p>
      <Link href="/" className="rounded-md border-2 border-brass-400 bg-oxblood-700 px-6 py-3 font-display tracking-widest text-cream-50">
        Back to the bar
      </Link>
    </main>
  );
}
