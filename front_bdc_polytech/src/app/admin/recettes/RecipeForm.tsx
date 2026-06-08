import type { Recipe } from "@/lib/recipes";

interface RecipeFormProps {
  action: (formData: FormData) => Promise<void>;
  recipe?: Recipe;
  submitLabel: string;
}

export default function RecipeForm({ action, recipe, submitLabel }: RecipeFormProps) {
  return (
    <form action={action} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Titre *</label>
          <input
            name="title"
            type="text"
            required
            defaultValue={recipe?.title}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Slug <span className="text-gray-400">(laisser vide pour auto-générer)</span>
          </label>
          <input
            name="slug"
            type="text"
            defaultValue={recipe?.slug}
            pattern="[a-z0-9-]+"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows={2}
            defaultValue={recipe?.description}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags <span className="text-gray-400">(séparés par des virgules)</span>
          </label>
          <input
            name="tags"
            type="text"
            defaultValue={recipe?.tags.join(", ")}
            placeholder="Facile, Végétarien"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">URL de l&apos;image</label>
          <input
            name="imageUrl"
            type="url"
            defaultValue={recipe?.imageUrl}
            placeholder="https://..."
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Temps de préparation (min)</label>
          <input
            name="prepMinutes"
            type="number"
            min={0}
            defaultValue={recipe?.prepMinutes ?? 0}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Temps de cuisson (min)</label>
          <input
            name="cookMinutes"
            type="number"
            min={0}
            defaultValue={recipe?.cookMinutes ?? 0}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Ingrédients <span className="text-gray-400">(un par ligne)</span>
          </label>
          <textarea
            name="ingredients"
            rows={6}
            defaultValue={recipe?.ingredients.join("\n")}
            placeholder={"200g de farine\n3 œufs\n..."}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Étapes <span className="text-gray-400">(une par ligne)</span>
          </label>
          <textarea
            name="steps"
            rows={8}
            defaultValue={recipe?.steps.join("\n")}
            placeholder={"Préchauffer le four à 180°C.\nMélanger les ingrédients secs.\n..."}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="rounded-lg bg-orange-600 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-700"
        >
          {submitLabel}
        </button>
        <a
          href="/admin/recettes"
          className="rounded-lg border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Annuler
        </a>
      </div>
    </form>
  );
}
