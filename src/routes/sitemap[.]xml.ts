import { createFileRoute } from "@tanstack/react-router";
import { LIVE_GUIDES } from "@/data/live-guides";
import { SEO_LANDINGS } from "@/data/seo-landings";
import { SITE } from "@/lib/brand";
import { listArticles } from "@/lib/server/content";

const STATIC = [
  "/",
  "/que-ver",
  "/temas",
  "/guides",
  "/pulse",
  "/barrios",
  "/comer",
  "/agenda",
  "/recursos",
  "/sobre",
  "/redaccion",
  "/aporta",
  "/test",
  "/ai-disclosure",
  "/legal",
  "/privacy",
  "/feed.xml",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const articles = await listArticles();
        const now = new Date().toISOString();
        const urls = [
          ...STATIC.map((path) =>
            loc(path, now, path === "/" || path === "/que-ver" ? "1.0" : "0.8", undefined),
          ),
          ...SEO_LANDINGS.map((l) => loc(`/${l.slug}`, now, "0.9", l.image)),
          ...LIVE_GUIDES.map((g) => loc(`/g/${g.id}`, now, "0.9", g.image)),
          ...articles.map((a) => loc(`/p/${a.slug}`, a.publishedAt, a.featured ? "0.8" : "0.6", undefined)),
        ].join("");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

function loc(path: string, lastmod: string, priority: string, image?: string) {
  const href = path === "/" ? SITE.url : `${SITE.url}${path}`;
  const img = image
    ? `<image:image><image:loc>${SITE.url}${image}</image:loc></image:image>`
    : "";
  return `<url><loc>${href}</loc><lastmod>${lastmod}</lastmod><priority>${priority}</priority>${img}</url>\n`;
}
