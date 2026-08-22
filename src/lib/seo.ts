import { SITE } from "@/lib/brand";

export const OG_IMAGE = `${SITE.url}/media/muelle.jpg`;

export const DEFAULT_KEYWORDS = [
  "Huelva",
  "guía Huelva",
  "qué ver en Huelva",
  "qué hacer en Huelva",
  "Costa de la Luz",
  "playas de Huelva",
  "gamba blanca de Huelva",
  "Doñana",
  "Parque Nacional de Doñana",
  "El Rocío",
  "lugares colombinos",
  "La Rábida",
  "Palos de la Frontera",
  "Moguer",
  "Punta Umbría",
  "Mazagón",
  "Isla Cristina",
  "Matalascañas",
  "El Portil",
  "Riotinto",
  "minas de Riotinto",
  "jamón de Jabugo",
  "Sierra de Aracena",
  "Condado de Huelva",
  "Muelle del Tinto",
  "Onuba",
  "choco Punta Umbría",
  "Colombinas",
  "Fiestas de la Cinta",
  "Ayamonte",
  "Isla Canela",
  "Gruta de las Maravillas",
  "Juan Ramón Jiménez",
  "Barrio Reina Victoria",
  "El Conquero",
  "turismo Huelva",
  "48 horas en Huelva",
];

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  published?: string;
  index?: boolean;
};

export function seoHead({
  title,
  description,
  path,
  image = OG_IMAGE,
  type = "website",
  keywords = DEFAULT_KEYWORDS,
  published,
  index = true,
}: SeoInput) {
  const url = path === "/" ? SITE.url : `${SITE.url}${path}`;
  const fullTitle = title.includes(SITE.name) ? title : `${title} · ${SITE.name}`;
  const robots = index
    ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    : "noindex, nofollow";

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { name: "keywords", content: keywords.join(", ") },
      { name: "author", content: "Redacción Huelva.cloud" },
      { name: "creator", content: "Huelva.cloud" },
      { name: "publisher", content: SITE.name },
      { name: "robots", content: robots },
      { name: "googlebot", content: robots },
      { name: "language", content: "Spanish" },
      { name: "content-language", content: "es-ES" },
      { name: "geo.region", content: "ES-H" },
      { name: "geo.placename", content: "Huelva" },
      { name: "geo.position", content: "37.266;-6.950" },
      { name: "ICBM", content: "37.266, -6.950" },
      { name: "theme-color", content: SITE.theme },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: "es_ES" },
      { property: "og:type", content: type },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: fullTitle },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      ...(published
        ? [
            { property: "article:published_time", content: published },
            { property: "article:section", content: "Huelva" },
          ]
        : []),
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "es", href: url },
      { rel: "alternate", hrefLang: "es-ES", href: url },
    ],
  };
}

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["NewsMediaOrganization", "Organization"],
        "@id": `${SITE.url}/#org`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/favicon.svg`,
        description: SITE.description,
        foundingDate: "2026",
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Provincia de Huelva",
          containedInPlace: { "@type": "Country", name: "España" },
        },
        knowsAbout: DEFAULT_KEYWORDS,
        publishingPrinciples: `${SITE.url}/ai-disclosure`,
        ethicsPolicy: `${SITE.url}/ai-disclosure`,
        masthead: `${SITE.url}/redaccion`,
        sameAs: [SITE.github],
        inLanguage: "es-ES",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#site`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        publisher: { "@id": `${SITE.url}/#org` },
        inLanguage: "es-ES",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE.url}/temas`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "TouristDestination",
        "@id": `${SITE.url}/#huelva`,
        name: "Huelva",
        description:
          "Provincia atlántica de Andalucía: Costa de la Luz, Doñana, gamba blanca, lugares colombinos, Riotinto y Sierra de Aracena.",
        geo: {
          "@type": "GeoCoordinates",
          latitude: 37.266,
          longitude: -6.95,
        },
        containedInPlace: { "@type": "AdministrativeArea", name: "Andalucía" },
        touristType: ["gastronomía", "playa", "naturaleza", "cultura"],
        url: SITE.url,
      },
    ],
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path === "/" ? SITE.url : `${SITE.url}${item.path}`,
    })),
  };
}
