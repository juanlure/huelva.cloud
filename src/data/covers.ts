import type { Article } from "@/lib/types";

export const MEDIA = {
  muelle: "/media/muelle.jpg",
  donana: "/media/donana.jpg",
  playa: "/media/playa.jpg",
  mazagon: "/media/mazagon.jpg",
  punta: "/media/punta.jpg",
  aracena: "/media/aracena.jpg",
  rocio: "/media/rocio.jpg",
  gamba: "/media/gamba.jpg",
  rabida: "/media/rabida.jpg",
  riotinto: "/media/riotinto.jpg",
  tinto: "/media/tinto-rio.jpg",
  monjas: "/media/monjas.jpg",
  isla: "/media/isla.jpg",
  jabugo: "/media/jabugo.jpg",
} as const;

export function coverFor(article: Pick<Article, "slug" | "category" | "neighborhood">) {
  const slug = article.slug;
  if (slug.includes("gamba") || slug.includes("choco") || slug.includes("carta") || slug.includes("recetario") || slug.includes("bar-huelva") || article.category === "eat") {
    return MEDIA.gamba;
  }
  if (slug.includes("donana")) return MEDIA.donana;
  if (slug.includes("riotinto") || slug.includes("cuenca")) return MEDIA.riotinto;
  if (slug.includes("colon") || slug.includes("rabida")) return MEDIA.rabida;
  if (slug.includes("ocaso") || slug.includes("muelle")) return MEDIA.muelle;
  if (slug.includes("monjas") || slug.includes("cafe") || slug.includes("traductor")) return MEDIA.monjas;
  if (slug.includes("jabugo") || slug.includes("aracena") || article.neighborhood === "aracena") {
    return slug.includes("jabugo") ? MEDIA.jabugo : MEDIA.aracena;
  }
  if (slug.includes("playa") || slug.includes("poniente") || article.neighborhood === "punta-umbria") {
    return MEDIA.playa;
  }
  if (slug.includes("rocio") || slug.includes("cinta") || slug.includes("almanaque")) return MEDIA.rocio;
  if (article.category === "events") return MEDIA.rocio;
  return MEDIA.muelle;
}

export const HERO_IMAGE = MEDIA.muelle;
