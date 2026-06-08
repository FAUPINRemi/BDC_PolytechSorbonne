import { getRecipes } from "@/lib/recipes";
import Link from "next/link";

export default async function AdminDashboard() {
  const recipes = await getRecipes();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="mt-1 text-sm text-gray-500">Bienvenue dans l&apos;espace admin du BDC.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-sm">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-3xl font-bold text-gray-900">{recipes.length}</p>
          <p className="mt-1 text-sm text-gray-500">Recettes</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href="/admin/recettes/nouvelle"
          className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
        >
          + Nouvelle recette
        </Link>
        <Link
          href="/admin/recettes"
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Gérer les recettes
        </Link>
      </div>
    </div>
  );
}
