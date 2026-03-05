export type Recipe = {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  prepMinutes: number;
  cookMinutes: number;
  imageUrl?: string;
  ingredients: string[];
  steps: string[];
};

const mock: Recipe[] = [
  {
    title: "Carottes rôties au miel",
    slug: "carottes-roties-miel",
    description: "Une recette simple, rapide, et parfaite pour accompagner un plat.",
    tags: ["Facile", "Végétarien"],
    prepMinutes: 10,
    cookMinutes: 25,
    ingredients: ["Carottes", "Miel", "Huile d'olive", "Sel", "Poivre", "Thym"],
    steps: [
      "Préchauffer le four à 200°C.",
      "Couper les carottes en bâtonnets.",
      "Mélanger avec huile, miel, sel, poivre et thym.",
      "Enfourner 25 minutes en remuant à mi-cuisson.",
    ],
  },
  {
    title: "Crêpes moelleuses",
    slug: "crepes-moelleuses",
    description: "Base parfaite pour sucré ou salé, avec une texture légère.",
    tags: ["Dessert", "Classique"],
    prepMinutes: 10,
    cookMinutes: 20,
    ingredients: ["Farine", "Lait", "Oeufs", "Sucre", "Beurre", "Sel"],
    steps: [
      "Mélanger farine, sucre et sel.",
      "Ajouter oeufs puis lait progressivement.",
      "Laisser reposer 20 minutes.",
      "Cuire à la poêle bien chaude.",
    ],
  },
];

function apiBaseUrl() {
  return process.env.RECIPES_API_BASE_URL;
}

export async function getRecipes(): Promise<Recipe[]> {
  const base = apiBaseUrl();
  if (!base) return mock;

  const res = await fetch(`${base}/recipes`, {
    headers: process.env.RECIPES_API_KEY ? { Authorization: `Bearer ${process.env.RECIPES_API_KEY}` } : undefined,
    cache: "no-store",
  });

  if (!res.ok) return mock;
  return (await res.json()) as Recipe[];
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const base = apiBaseUrl();
  if (!base) return mock.find((r) => r.slug === slug) ?? null;

  const res = await fetch(`${base}/recipes/${encodeURIComponent(slug)}`, {
    headers: process.env.RECIPES_API_KEY ? { Authorization: `Bearer ${process.env.RECIPES_API_KEY}` } : undefined,
    cache: "no-store",
  });

  if (!res.ok) return mock.find((r) => r.slug === slug) ?? null;
  return (await res.json()) as Recipe;
}
