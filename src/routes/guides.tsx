import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleCard } from "@/components/article-card";
import { FilmHero } from "@/components/film-hero";
import { LIVE_GUIDES } from "@/data/live-guides";
import { listArticles } from "@/lib/server/content";
import { seoHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/guides")({
  loader: () => listArticles(),
  component: GuidesPage,
  head: () =>
    seoHead({
      title: "Guías de Huelva: 48 horas, playas, gamba blanca, Doñana y Colón",
      description:
        "Guías vivas de Huelva: itinerario de 48 horas, carta de la lonja, playas según el viento, Doñana, lugares colombinos, Riotinto y el ocaso de hoy.",
      path: "/guides",
    }),
});

function GuidesPage() {
  const articles = Route.useLoaderData().filter(
    (a) => a.category === "guides" || a.featured,
  );
  const [first, ...rest] = LIVE_GUIDES;

  return (
    <main>
      <FilmHero
        image="/media/muelle.jpg"
        alt="Muelle de Riotinto, Huelva"
        kicker="Once maneras"
        title="Guías vivas"
        tall
      >
        <p className="mt-5 max-w-xl text-lg text-iron-fg/80">
          Itinerario que se arma. Carta que responde. Playa según el viento.
        </p>
      </FilmHero>

      {first ? (
        <Link
          to="/g/$id"
          params={{ id: first.id }}
          className="group grid border-b border-line md:grid-cols-2"
        >
          <div className="overflow-hidden">
            <img
              src={first.image}
              alt=""
              className="film h-80 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 md:h-full"
            />
          </div>
          <div className="flex flex-col justify-end px-6 py-10 sm:px-12">
            <p className="text-kicker text-tinto">01 · {first.minutes}</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight group-hover:text-tinto sm:text-5xl">
              {first.title}
            </h2>
            <p className="mt-4 max-w-md text-muted">{first.dek}</p>
          </div>
        </Link>
      ) : null}

      <ul className="grid md:grid-cols-2 lg:grid-cols-3">
        {rest.map((guide, i) => (
          <li
            key={guide.id}
            className={cn("border-b border-line", (i + 1) % 3 !== 0 && "lg:border-r", i % 2 === 0 && "md:border-r lg:border-r")}
          >
            <Link to="/g/$id" params={{ id: guide.id }} className="group block">
              <div className="overflow-hidden">
                <img
                  src={guide.image}
                  alt=""
                  className="film h-56 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="px-6 py-8">
                <p className="text-kicker text-tinto">
                  {String(i + 2).padStart(2, "0")} · {guide.minutes}
                </p>
                <h2 className="mt-2 font-display text-2xl tracking-tight group-hover:text-tinto">
                  {guide.title}
                </h2>
                <p className="mt-2 text-sm text-muted">{guide.dek}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {articles.length ? (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
          <h2 className="font-display text-edition tracking-tight">También en texto</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
