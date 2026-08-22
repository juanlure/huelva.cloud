import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/brand";
import { listArticles } from "@/lib/server/content";

export const Route = createFileRoute("/feed.xml")({
  server: {
    handlers: {
      GET: async () => {
        const articles = await listArticles();
        const items = articles
          .slice()
          .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
          .slice(0, 30)
          .map((a) => {
            const link = `${SITE.url}/p/${a.slug}`;
            return [
              "<item>",
              `<title>${esc(a.title)}</title>`,
              `<link>${link}</link>`,
              `<guid>${link}</guid>`,
              `<pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>`,
              `<description>${esc(a.dek)}</description>`,
              "</item>",
            ].join("\n");
          })
          .join("\n");

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<rss version="2.0">`,
          `<channel>`,
          `<title>${SITE.name}</title>`,
          `<link>${SITE.url}</link>`,
          `<description>${esc(SITE.description)}</description>`,
          `<language>es-es</language>`,
          items,
          `</channel>`,
          `</rss>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=300",
          },
        });
      },
    },
  },
});

function esc(value: string) {
  return value
    .replaceAll("&", "\u0026amp;")
    .replaceAll("<", "\u0026lt;")
    .replaceAll(">", "\u0026gt;")
    .replaceAll('"', "\u0026quot;");
}
