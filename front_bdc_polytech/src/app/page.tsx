import Link from "next/link";
import { getRecipes } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";

export default async function HomePage() {
  const recipes = await getRecipes();
  const latest = recipes.slice(0, 3);

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-black/10 bg-[var(--panel)] p-8 shadow-sm">
        <div className="max-w-2xl">
          <p className="inline-flex items-center rounded-full bg-[var(--bg)] px-3 py-1 text-xs font-semibold text-black/70 ring-1 ring-black/10">
            Association de cuisine
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            BDC Polytech Sorbonne
          </h1>
          <p className="mt-3 text-base text-[var(--muted)]">
            Ateliers, recettes, et moments conviviaux autour d’une cuisine simple, accessible et soignée.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/recettes"
              className="rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-black shadow-sm ring-1 ring-black/10 hover:bg-[var(--brand-2)]"
            >
              Découvrir les recettes
            </Link>
            <Link
              href="/infos"
              className="rounded-full bg-black/5 px-5 py-3 text-sm font-semibold text-black/80 ring-1 ring-black/10 hover:bg-black/10"
            >
              À propos de l’asso
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Dernières recettes</h2>
          <Link
            href="/recettes"
            className="text-sm font-semibold text-black/70 hover:text-black underline-offset-4 hover:underline"
          >
            Voir tout
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {latest.map((r) => (
            <RecipeCard key={r.slug} r={r} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-black/10 bg-[var(--panel)] p-6 shadow-sm">
          <h3 className="text-base font-semibold">Ateliers</h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Des sessions courtes, orientées pratique, avec des recettes reproductibles.
          </p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-[var(--panel)] p-6 shadow-sm">
          <h3 className="text-base font-semibold">Recettes</h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Une base de recettes claire et maintenable, reliée à une BDD.
          </p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-[var(--panel)] p-6 shadow-sm">
          <h3 className="text-base font-semibold">Convivial</h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Un cadre simple et fun, sans se prendre au sérieux, mais avec une vraie exigence de qualité.
          </p>
        </div>
      </section>
    </div>
  );
}
