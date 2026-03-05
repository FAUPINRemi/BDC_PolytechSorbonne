import { getRecipes } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";

export default async function RecipesPage() {
  const recipes = await getRecipes();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Recettes</h1>
        <p className="text-[var(--muted)]">
          Recettes de l’association. Simples à suivre, faciles à refaire.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {recipes.map((r) => (
          <RecipeCard key={r.slug} r={r} />
        ))}
      </section>
    </div>
  );
}
