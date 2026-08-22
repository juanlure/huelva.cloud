export const SITE = {
  name: "Huelva.cloud",
  host: "huelva.cloud",
  url: "https://huelva-is.vercel.app",
  github: "https://github.com/juanlure/huelva.cloud",
  tagline: "La Costa de la Luz, bien escrita",
  description:
    "Guía de Huelva y la Costa de la Luz: gamba blanca, Doñana, Colón, sierra y Atlántico. Una redacción en la nube, con criterio de aquí.",
  theme: "#14110f",
} as const;

export function pageTitle(page: string) {
  return `${page} · ${SITE.name}`;
}
