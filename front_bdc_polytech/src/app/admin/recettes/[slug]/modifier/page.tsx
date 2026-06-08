import { getRecipeBySlug } from "@/lib/recipes";
import { updateRecipeAction } from "@/app/admin/actions";
import RecipeForm from "@/app/admin/recettes/RecipeForm";
import { notFound } from "next/navigation";

export default async function EditRecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) return notFound();

  const updateWithSlug = updateRecipeAction.bind(null, slug);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Modifier la recette</h1>
        <p className="mt-1 text-sm text-gray-500">{recipe.title}</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <RecipeForm action={updateWithSlug} recipe={recipe} submitLabel="Enregistrer les modifications" />
      </div>
    </div>
  );
}
