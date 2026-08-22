import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleCard } from "@/components/article-card";
import { Badge } from "@/components/ui/badge";
import { LIVE_GUIDES } from "@/data/live-guides";
import { listArticles } from "@/lib/server/content";

export const Route = createFileRoute("/guides")({
  loader: () => listArticles(),
  component: GuidesPage,
  head: () => ({
    meta: [{ title: "Guías · Huelva.cloud" }],
  }),
});

function GuidesPage() {
  const articles = Route.useLoaderData().filter(
    (a) => a.category === "guides" || a.featured,
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-widest text-tide">Guías vivas</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">No se leen. Se usan.</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Itinerario que se arma, carta que responde, playa según el viento.
        Malaga.is tiene textos honestos. Esto se tacha, se filtra y se recorre.
      </p>

      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {LIVE_GUIDES.map((guide) => (
          <li key={guide.id}>
            <Link
              to="/g/$id"
              params={{ id: guide.id }}
              className="group flex h-full flex-col overflow-hidden rounded-xl bg-paper shadow-border transition-shadow hover:ring-1 hover:ring-tide/40"
            >
              <img src={guide.image} alt="" className="aspect-video w-full object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  <Badge>Interactiva</Badge>
                  <span className="text-xs text-faint">{guide.minutes}</span>
                </div>
                <h2 className="mt-3 font-display text-2xl tracking-tight group-hover:text-tide">
                  {guide.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{guide.dek}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 font-display text-2xl tracking-tight">También en texto</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}
