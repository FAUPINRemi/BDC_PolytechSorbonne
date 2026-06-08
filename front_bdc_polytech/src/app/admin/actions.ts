"use server";

import { auth } from "@/auth";
import { createRecipe, updateRecipe, deleteRecipe } from "@/lib/recipes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function requireAuth() {
  return auth().then((session) => {
    if (!session) throw new Error("Non autorisé");
  });
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function parseTags(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export async function createRecipeAction(formData: FormData) {
  await requireAuth();

  const title = String(formData.get("title") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const slug = rawSlug || slugify(title);

  await createRecipe({
    slug,
    title,
    description: String(formData.get("description") ?? "").trim(),
    tags: parseTags(formData.get("tags")),
    prepMinutes: Number(formData.get("prepMinutes") ?? 0),
    cookMinutes: Number(formData.get("cookMinutes") ?? 0),
    imageUrl: String(formData.get("imageUrl") ?? "").trim() || undefined,
    ingredients: parseLines(formData.get("ingredients")),
    steps: parseLines(formData.get("steps")),
  });

  revalidatePath("/recettes");
  revalidatePath("/admin/recettes");
  redirect("/admin/recettes");
}

export async function updateRecipeAction(slug: string, formData: FormData) {
  await requireAuth();

  await updateRecipe(slug, {
    slug,
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    tags: parseTags(formData.get("tags")),
    prepMinutes: Number(formData.get("prepMinutes") ?? 0),
    cookMinutes: Number(formData.get("cookMinutes") ?? 0),
    imageUrl: String(formData.get("imageUrl") ?? "").trim() || undefined,
    ingredients: parseLines(formData.get("ingredients")),
    steps: parseLines(formData.get("steps")),
  });

  revalidatePath("/recettes");
  revalidatePath(`/recettes/${slug}`);
  revalidatePath("/admin/recettes");
  redirect("/admin/recettes");
}

export async function deleteRecipeAction(slug: string) {
  await requireAuth();
  await deleteRecipe(slug);
  revalidatePath("/recettes");
  revalidatePath("/admin/recettes");
}
