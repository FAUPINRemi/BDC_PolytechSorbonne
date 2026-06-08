import { getRecipes } from "@/lib/recipes";
import { deleteRecipeAction } from "@/app/admin/actions";
import Link from "next/link";

export default async function AdminRecipesPage() {
  const recipes = await getRecipes();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recettes</h1>
          <p className="mt-1 text-sm text-gray-500">{recipes.length} recette{recipes.length > 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/admin/recettes/nouvelle"
          className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
        >
          + Nouvelle recette
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">
          <p className="text-gray-500">Aucune recette pour l&apos;instant.</p>
          <Link
            href="/admin/recettes/nouvelle"
            className="mt-3 inline-block text-sm font-semibold text-orange-600 hover:underline"
          >
            Créer la première
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Titre</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Tags</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Temps</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recipes.map((r) => (
                <tr key={r.slug} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{r.title}</div>
                    <div className="text-xs text-gray-400">{r.slug}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {r.tags.map((t) => (
                        <span key={t} className="rounded-full bg-orange-50 px-2 py-0.5 text-xs text-orange-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {r.prepMinutes + r.cookMinutes} min
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/recettes/${r.slug}`}
                        className="rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-100"
                        target="_blank"
                      >
                        Voir
                      </Link>
                      <Link
                        href={`/admin/recettes/${r.slug}/modifier`}
                        className="rounded px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50"
                      >
                        Modifier
                      </Link>
                      <form action={deleteRecipeAction.bind(null, r.slug)}>
                        <button
                          type="submit"
                          className="rounded px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          Supprimer
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
