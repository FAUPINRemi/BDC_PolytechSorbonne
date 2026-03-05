import Link from "next/link";
import type { Recipe } from "@/lib/recipes";

export default function RecipeCard({ r }: { r: Recipe }) {
  return (
    <Link
      href={`/recettes/${r.slug}`}
      className="group rounded-2xl border border-black/10 bg-[var(--panel)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight">{r.title}</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">{r.description}</p>
        </div>
        <div className="rounded-xl bg-black/5 px-3 py-2 text-xs text-black/70">
          {r.prepMinutes + r.cookMinutes} min
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {r.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-black/10 bg-[var(--bg)] px-3 py-1 text-xs font-medium text-black/70"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 text-sm font-semibold text-black/80 underline-offset-4 group-hover:underline">
        Voir la recette
      </div>
    </Link>
  );
}
