import { createFileRoute } from "@tanstack/react-router";
import { LIVE_GUIDES } from "@/data/live-guides";
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
        const urls = [
          ...STATIC.map((path) => loc(path, path === "/" || path === "/que-ver" ? "daily" : "weekly", path === "/" ? "1.0" : "0.8")),
          ...LIVE_GUIDES.map((g) => loc(`/g/${g.id}`, "hourly", "0.9")),
          ...articles.map((a) => loc(`/p/${a.slug}`, "weekly", a.featured ? "0.8" : "0.6")),
        ].join("");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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

function loc(path: string, changefreq: string, priority: string) {
  const href = path === "/" ? SITE.url : `${SITE.url}${path}`;
  return `<url><loc>${href}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>\n`;
}
