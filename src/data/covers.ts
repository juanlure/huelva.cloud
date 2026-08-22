import type { Article } from "@/lib/types";

export function coverFor(article: Pick<Article, "slug" | "category" | "neighborhood">) {
  const slug = article.slug;
  if (slug.includes("donana")) return "/media/donana.jpg";
  if (slug.includes("playa") || slug.includes("poniente") || article.neighborhood === "punta-umbria") {
    return "/media/playa.jpg";
  }
  if (slug.includes("aracena") || slug.includes("riotinto") || article.neighborhood === "aracena") {
    return "/media/aracena.jpg";
  }
  if (slug.includes("colon") || slug.includes("rocio") || slug.includes("cinta")) {
    return "/media/rocio.jpg";
  }
  if (article.category === "eat") return "/media/playa.jpg";
  if (article.category === "events") return "/media/rocio.jpg";
  return "/media/muelle.jpg";
}

export const HERO_IMAGE = "/media/muelle.jpg";
