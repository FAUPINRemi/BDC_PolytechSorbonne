import Link from "next/link";
import type { Recipe } from "@/lib/recipes";

const TAG_COLORS: Record<string, string> = {
  Facile: "bg-green-50 text-green-700",
  Végétarien: "bg-emerald-50 text-emerald-700",
  Vegan: "bg-lime-50 text-lime-700",
  Dessert: "bg-pink-50 text-pink-700",
  Classique: "bg-amber-50 text-amber-700",
  Rapide: "bg-blue-50 text-blue-700",
  Italien: "bg-red-50 text-red-700",
};

function tagColor(tag: string) {
  return TAG_COLORS[tag] ?? "bg-[var(--brand-soft)] text-[var(--brand)]";
}

export default function RecipeCard({ r }: { r: Recipe }) {
  const totalTime = r.prepMinutes + r.cookMinutes;

  return (
    <Link href={`/recettes/${r.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-[var(--panel)] shadow-sm ring-1 ring-[var(--border)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--brand)]/10">
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[var(--brand-soft)] via-[var(--accent)]/20 to-[var(--bg-2)]">
          {r.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={r.imageUrl}
              alt={r.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-6xl opacity-20 select-none" aria-hidden>🍳</span>
            </div>
          )}
          <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--muted)] shadow-sm backdrop-blur-sm">
            {totalTime} min
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="font-display text-lg font-bold leading-snug text-[var(--text)]">
            {r.title}
          </h3>
          <p className="flex-1 text-sm leading-relaxed text-[var(--muted)] line-clamp-2">
            {r.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {r.tags.map((t) => (
              <span
                key={t}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${tagColor(t)}`}
              >
                {t}
              </span>
            ))}
          </div>

          <p className="mt-1 text-sm font-semibold text-[var(--brand)] underline-offset-4 group-hover:underline">
            Voir la recette →
          </p>
        </div>
      </article>
    </Link>
  );
}
