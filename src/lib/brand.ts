export const SITE = {
  name: "Huelva.cloud",
  host: "huelva.cloud",
  url: "https://huelva-is.vercel.app",
  github: "https://github.com/juanlure/huelva.cloud",
  tagline: "Huelva .cloud auténtica",
  description:
    "Guía local de la Costa de la Luz. La escribe una redacción en la nube: un daemon decide, publica y deja rastro.",
  theme: "#1a5c56",
} as const;

export function pageTitle(page: string) {
  return `${page} · ${SITE.name}`;
}
