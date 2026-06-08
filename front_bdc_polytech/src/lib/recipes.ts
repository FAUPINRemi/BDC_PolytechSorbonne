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

type RecipeRow = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  prep_minutes: number;
  cook_minutes: number;
  image_url: string | null;
  ingredients: string[];
  steps: string[];
};

function rowToRecipe(row: RecipeRow): Recipe {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    tags: row.tags,
    prepMinutes: row.prep_minutes,
    cookMinutes: row.cook_minutes,
    imageUrl: row.image_url ?? undefined,
    ingredients: row.ingredients,
    steps: row.steps,
  };
}

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
];

export async function getRecipes(): Promise<Recipe[]> {
  if (!process.env.DATABASE_URL) return mock;
  try {
    const { sql } = await import("@/lib/db");
    const rows = (await sql`
      SELECT slug, title, description, tags, prep_minutes, cook_minutes, image_url, ingredients, steps
      FROM recipes
      ORDER BY created_at DESC
    `) as RecipeRow[];
    return rows.map(rowToRecipe);
  } catch {
    return mock;
  }
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  if (!process.env.DATABASE_URL) return mock.find((r) => r.slug === slug) ?? null;
  try {
    const { sql } = await import("@/lib/db");
    const rows = (await sql`
      SELECT slug, title, description, tags, prep_minutes, cook_minutes, image_url, ingredients, steps
      FROM recipes
      WHERE slug = ${slug}
      LIMIT 1
    `) as RecipeRow[];
    return rows[0] ? rowToRecipe(rows[0]) : null;
  } catch {
    return mock.find((r) => r.slug === slug) ?? null;
  }
}

export async function createRecipe(data: Recipe): Promise<void> {
  const { sql } = await import("@/lib/db");
  await sql`
    INSERT INTO recipes (slug, title, description, tags, prep_minutes, cook_minutes, image_url, ingredients, steps)
    VALUES (
      ${data.slug},
      ${data.title},
      ${data.description},
      ${sql.array(data.tags)},
      ${data.prepMinutes},
      ${data.cookMinutes},
      ${data.imageUrl ?? null},
      ${sql.array(data.ingredients)},
      ${sql.array(data.steps)}
    )
  `;
}

export async function updateRecipe(slug: string, data: Recipe): Promise<void> {
  const { sql } = await import("@/lib/db");
  await sql`
    UPDATE recipes SET
      title        = ${data.title},
      description  = ${data.description},
      tags         = ${sql.array(data.tags)},
      prep_minutes = ${data.prepMinutes},
      cook_minutes = ${data.cookMinutes},
      image_url    = ${data.imageUrl ?? null},
      ingredients  = ${sql.array(data.ingredients)},
      steps        = ${sql.array(data.steps)}
    WHERE slug = ${slug}
  `;
}

export async function deleteRecipe(slug: string): Promise<void> {
  const { sql } = await import("@/lib/db");
  await sql`DELETE FROM recipes WHERE slug = ${slug}`;
}
