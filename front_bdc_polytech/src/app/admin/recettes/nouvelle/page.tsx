import { createRecipeAction } from "@/app/admin/actions";
import RecipeForm from "@/app/admin/recettes/RecipeForm";

export default function NewRecipePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nouvelle recette</h1>
        <p className="mt-1 text-sm text-gray-500">Remplis le formulaire pour ajouter une recette.</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <RecipeForm action={createRecipeAction} submitLabel="Créer la recette" />
      </div>
    </div>
  );
}
