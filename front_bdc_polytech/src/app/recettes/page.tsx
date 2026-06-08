import { getRecipes } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";

export const metadata = {
  title: "Recettes — BDC Polytech Sorbonne",
};

export default async function RecipesPage() {
  const recipes = await getRecipes();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand)]">
          {recipes.length} recette{recipes.length > 1 ? "s" : ""}
        </p>
        <h1 className="font-display text-4xl font-black text-[var(--text)]">Toutes les recettes</h1>
        <p className="text-[var(--muted)]">
          Simples à suivre, faciles à refaire chez soi.
        </p>
      </header>

      {recipes.length > 0 ? (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((r) => (
            <RecipeCard key={r.slug} r={r} />
          ))}
        </section>
      ) : (
        <div className="rounded-3xl border border-dashed border-[var(--border)] py-20 text-center text-[var(--muted)]">
          Aucune recette pour l&apos;instant. Revenez bientôt !
        </div>
      )}
    </div>
  );
}
