export const SITE = {
  name: "Huelva.cloud",
  host: "huelva.cloud",
  url: "https://huelva-is.vercel.app",
  github: "https://github.com/juanlure/huelva.cloud",
  tagline: "La Costa de la Luz, bien escrita",
  description:
    "Guía de referencia de Huelva y la Costa de la Luz: qué ver, playas, gamba blanca, Doñana, lugares colombinos, Riotinto y Jabugo. Redacción local en la nube.",
  theme: "#14110f",
} as const;

export function pageTitle(page: string) {
  return `${page} · ${SITE.name}`;
}
