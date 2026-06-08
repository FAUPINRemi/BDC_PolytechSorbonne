import Link from "next/link";
import { getRecipes } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";

export default async function HomePage() {
  const recipes = await getRecipes();
  const latest = recipes.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--brand)] via-[#c94209] to-[#a33507] px-8 py-16 text-white shadow-2xl">
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-0 h-64 w-64 rounded-full bg-[var(--accent)]/25 blur-2xl" />
        <div className="pointer-events-none absolute top-1/2 right-16 h-32 w-32 -translate-y-1/2 rounded-full bg-white/5 blur-xl" />

        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm">
            Association de cuisine · Polytech Sorbonne
          </span>

          <h1 className="mt-5 font-display text-5xl font-black leading-tight tracking-tight sm:text-6xl">
            Cuisinons<br />ensemble.
          </h1>

          <p className="mt-5 max-w-xl text-lg text-white/80 leading-relaxed">
            Ateliers pratiques, recettes de saison, et bonne ambiance. Le BDC, c&apos;est la cuisine accessible à tous les étudiants de Polytech.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/recettes"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--brand)] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Découvrir les recettes
            </Link>
            <Link
              href="/infos"
              className="rounded-full border border-white/30 bg-white/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
            >
              L&apos;asso
            </Link>
          </div>
        </div>
      </section>

      {/* Dernières recettes */}
      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand)]">Fraîchement ajoutées</p>
            <h2 className="mt-1 font-display text-3xl font-bold text-[var(--text)]">Dernières recettes</h2>
          </div>
          <Link
            href="/recettes"
            className="shrink-0 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--muted)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
          >
            Tout voir
          </Link>
        </div>

        {latest.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((r) => (
              <RecipeCard key={r.slug} r={r} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--border)] py-16 text-center text-[var(--muted)]">
            Les recettes arrivent bientôt…
          </div>
        )}
      </section>

      {/* Features */}
      <section>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-[var(--brand-soft)] p-7">
            <div className="text-3xl">👨‍🍳</div>
            <h3 className="mt-4 font-display text-lg font-bold text-[var(--text)]">Ateliers</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Des sessions courtes et pratiques avec des recettes reproductibles chez soi.
            </p>
          </div>
          <div className="rounded-3xl bg-[var(--accent)]/20 p-7">
            <div className="text-3xl">📖</div>
            <h3 className="mt-4 font-display text-lg font-bold text-[var(--text)]">Recettes</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Une base de recettes claire, de la plus simple à la plus élaborée.
            </p>
          </div>
          <div className="rounded-3xl bg-[var(--bg-2)] p-7 ring-1 ring-[var(--border)]">
            <div className="text-3xl">🎉</div>
            <h3 className="mt-4 font-display text-lg font-bold text-[var(--text)]">Convivialité</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Un cadre fun et sans prise de tête, avec une vraie passion de la cuisine.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
