import { getRecipeBySlug } from "@/lib/recipes";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = await getRecipeBySlug(slug);

  if (!r) return notFound();

  const totalTime = r.prepMinutes + r.cookMinutes;

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/recettes" className="hover:text-[var(--brand)]">Recettes</Link>
        <span>/</span>
        <span className="text-[var(--text)]">{r.title}</span>
      </nav>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {r.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-[var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[var(--brand)]"
            >
              {t}
            </span>
          ))}
        </div>

        <h1 className="font-display text-4xl font-black leading-tight text-[var(--text)] sm:text-5xl">
          {r.title}
        </h1>

        <p className="max-w-2xl text-lg text-[var(--muted)]">{r.description}</p>

        <div className="flex flex-wrap gap-4">
          {r.prepMinutes > 0 && (
            <div className="flex items-center gap-2 rounded-2xl bg-[var(--bg-2)] px-5 py-3">
              <span className="text-sm text-[var(--muted)]">Préparation</span>
              <span className="font-display font-bold text-[var(--text)]">{r.prepMinutes} min</span>
            </div>
          )}
          {r.cookMinutes > 0 && (
            <div className="flex items-center gap-2 rounded-2xl bg-[var(--bg-2)] px-5 py-3">
              <span className="text-sm text-[var(--muted)]">Cuisson</span>
              <span className="font-display font-bold text-[var(--text)]">{r.cookMinutes} min</span>
            </div>
          )}
          <div className="flex items-center gap-2 rounded-2xl bg-[var(--brand-soft)] px-5 py-3">
            <span className="text-sm text-[var(--muted)]">Total</span>
            <span className="font-display font-bold text-[var(--brand)]">{totalTime} min</span>
          </div>
        </div>
      </header>

      {/* Image */}
      {r.imageUrl && (
        <div className="overflow-hidden rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={r.imageUrl}
            alt={r.title}
            className="h-72 w-full object-cover sm:h-96"
          />
        </div>
      )}

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Ingrédients */}
        <section className="rounded-3xl bg-[var(--panel)] p-7 shadow-sm ring-1 ring-[var(--border)] lg:col-span-1">
          <h2 className="font-display text-xl font-bold text-[var(--text)]">Ingrédients</h2>
          <ul className="mt-4 space-y-2.5">
            {r.ingredients.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Étapes */}
        <section className="rounded-3xl bg-[var(--panel)] p-7 shadow-sm ring-1 ring-[var(--border)] lg:col-span-2">
          <h2 className="font-display text-xl font-bold text-[var(--text)]">Étapes</h2>
          <ol className="mt-4 space-y-5">
            {r.steps.map((step, idx) => (
              <li key={`${idx}-${step}`} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-bold text-white">
                  {idx + 1}
                </span>
                <p className="pt-1 text-sm leading-relaxed text-[var(--muted)]">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="pt-4">
        <Link
          href="/recettes"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold text-[var(--muted)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
        >
          ← Retour aux recettes
        </Link>
      </div>
    </div>
  );
}
