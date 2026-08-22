import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleCard } from "@/components/article-card";
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
    <main className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-8 sm:py-20">
      <p className="text-kicker text-tinto">Índice</p>
      <h1 className="mt-4 max-w-3xl font-display text-display leading-display tracking-display">
        Guías
        <span className="italic text-tinto"> vivas</span>
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        Itinerario que se arma, carta que responde, playa según el viento.
        El texto es para el tren. Esto es para estar aquí.
      </p>

      <ol className="mt-16">
        {LIVE_GUIDES.map((guide, i) => (
          <li key={guide.id} className="border-t border-line">
            <Link
              to="/g/$id"
              params={{ id: guide.id }}
              className="group grid items-center gap-6 py-8 md:grid-cols-12 md:py-10"
            >
              <span className="text-kicker text-tinto md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="md:col-span-4">
                <img
                  src={guide.image}
                  alt=""
                  className="aspect-video w-full rounded-md object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </span>
              <span className="md:col-span-7">
                <span className="block font-display text-3xl tracking-tight group-hover:text-tinto sm:text-4xl">
                  {guide.title}
                </span>
                <span className="mt-2 block max-w-md text-muted">{guide.dek}</span>
                <span className="mt-3 block text-kicker text-faint">{guide.minutes}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <h2 className="mt-20 font-display text-edition tracking-tight">También en texto</h2>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}
