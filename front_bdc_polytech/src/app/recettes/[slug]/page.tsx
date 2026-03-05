import { getRecipeBySlug } from "@/lib/recipes";
import { notFound } from "next/navigation";

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = await getRecipeBySlug(slug);

  if (!r) return notFound();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold text-black/60">
          {r.prepMinutes + r.cookMinutes} min au total
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{r.title}</h1>
        <p className="text-[var(--muted)]">{r.description}</p>

        <div className="flex flex-wrap gap-2 pt-2">
          {r.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-black/10 bg-[var(--bg)] px-3 py-1 text-xs font-medium text-black/70"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-3xl border border-black/10 bg-[var(--panel)] p-6 shadow-sm lg:col-span-1">
          <h2 className="text-lg font-semibold">Ingrédients</h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            {r.ingredients.map((i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-black/10 bg-[var(--panel)] p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold">Étapes</h2>
          <ol className="mt-3 space-y-3 text-sm text-[var(--muted)]">
            {r.steps.map((s, idx) => (
              <li key={`${idx}-${s}`} className="flex gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--bg)] text-xs font-semibold text-black/70 ring-1 ring-black/10">
                  {idx + 1}
                </span>
                <span className="pt-1">{s}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
