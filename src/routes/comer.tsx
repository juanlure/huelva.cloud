import { createFileRoute } from "@tanstack/react-router";
import { ArticleCard } from "@/components/article-card";
import { listArticles, listPlaces } from "@/lib/server/content";
import { Badge } from "@/components/ui/badge";
import { PLACE_KIND_LABEL } from "@/lib/types";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/comer")({
  loader: async () => {
    const [articles, places] = await Promise.all([listArticles(), listPlaces()]);
    return {
      articles: articles.filter((a) => a.category === "eat"),
      places: places.filter((p) => p.kind === "comer" || p.kind === "mercado"),
    };
  },
  component: ComerPage,
  head: () =>
    seoHead({
      title: "Dónde comer en Huelva: gamba blanca, choco y Condado",
      description:
        "Lonja, gamba blanca de Huelva, choco de Punta Umbría, jamón de Jabugo y vino del Condado. La mesa de la Costa de la Luz.",
      path: "/comer",
      keywords: ["dónde comer en Huelva", "gamba blanca", "choco Punta Umbría", "restaurantes Huelva"],
    }),
});

function ComerPage() {
  const { articles, places } = Route.useLoaderData();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-kicker text-tinto">
        Comer y beber
      </p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Gamba, choco, jamón</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Tres religiones. No las mezcles en el mismo plato. La costa por la mañana,
        la sierra cuando apriete el otoño.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} featured />
        ))}
      </div>

      <h2 className="mt-12 font-display text-2xl tracking-tight">Sitios de la calle</h2>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {places.map((place) => (
          <li key={place.id} className="rounded-xl bg-paper p-4 shadow-border">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg">{place.name}</h3>
              <Badge variant="muted">{PLACE_KIND_LABEL[place.kind]}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted">{place.blurb}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
