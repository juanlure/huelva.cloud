import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { Button } from "@/components/ui/button";
import { listArticles, listEvents } from "@/lib/server/content";
import { getLiveCoast } from "@/lib/server/coast";
import { getNewsroomStatus } from "@/lib/server/newsroom";
import { orgJsonLd, seoHead } from "@/lib/seo";
import { LIVE_GUIDES } from "@/data/live-guides";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [articles, events, newsroom, live] = await Promise.all([
      listArticles(),
      listEvents(),
      getNewsroomStatus(),
      getLiveCoast(),
    ]);
    
    // Filter events: only future events starting from today
    const today = new Date().toISOString().slice(0, 10);
    const upcomingEvents = events.filter((e) => e.startsOn >= today).slice(0, 6);
    
    // Filter articles: news category only, recent first
    const news = articles.filter((a) => a.category === "news").slice(0, 6);
    
    return { articles, events: upcomingEvents, news, newsroom, live };
  },
  head: () =>
    seoHead({
      title: "Huelva.cloud · Qué pasa hoy en Huelva: agenda, noticias y guías locales",
      description:
        "La agenda de Huelva esta semana, las noticias importantes de la provincia y las guías que necesitas. Huelva.cloud es la referencia local.",
      path: "/",
    }),
  component: Home,
});

function Home() {
  const { events, news, live } = Route.useLoaderData();
  const punta = live.stations.find((s) => s.id === "punta") ?? live.stations[0];
  const today = new Date();
  const dayName = today.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }}
      />

      {/* Compact header with live data */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium capitalize text-muted">{dayName}</p>
              <h1 className="mt-1 font-display text-3xl tracking-tight sm:text-4xl">
                Huelva<span className="italic text-tinto">.cloud</span>
              </h1>
            </div>
            {punta ? (
              <Link
                to="/g/$id"
                params={{ id: "ahora" }}
                className="text-sm text-muted hover:text-tide"
              >
                {punta.tempC != null ? `${punta.tempC}°` : "—"} · {punta.regime}
                {live.sun.past ? ` · sol puesto ${live.sun.sunset}` : ` · ocaso ${live.sun.sunset}`}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* THIS WEEK: Agenda first */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-kicker text-tinto">Esta semana</p>
            <h2 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
              Agenda
            </h2>
          </div>
          <Link
            to="/agenda"
            className="inline-flex items-center gap-2 text-kicker text-muted hover:text-tinto"
          >
            Ver todo
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {events.length > 0 ? (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <li key={event.id} className="rounded-lg bg-paper p-5 shadow-border">
                <p className="text-sm font-medium text-tide">{formatDate(event.startsOn)}</p>
                <h3 className="mt-2 font-display text-xl tracking-tight">{event.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{event.dek}</p>
                <p className="mt-2 text-xs text-faint">{event.venue}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-muted">No hay eventos próximos registrados. <Link to="/aporta" className="text-tide hover:underline">Añade uno</Link>.</p>
        )}
      </section>

      {/* NEWS: Important provincial news */}
      <section className="border-t border-line bg-foam/5">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
          <p className="text-kicker text-tinto">Noticias</p>
          <h2 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
            Lo que pasa en la provincia
          </h2>

          {news.length > 0 ? (
            <ul className="mt-8 grid gap-6 md:grid-cols-2">
              {news.map((article) => (
                <li key={article.id} className="border-t border-line pt-6">
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 text-muted">Actualizando la redacción.</p>
          )}
        </div>
      </section>

      {/* GUIDES: Utility below the fold */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
        <p className="text-kicker text-tinto">Guías</p>
        <h2 className="mt-2 font-display text-4xl tracking-tight">
          Cómo estar en Huelva
        </h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {LIVE_GUIDES.filter((g) => ["marea", "carta", "orilla"].includes(g.id)).map((guide) => (
            <li key={guide.id}>
              <Link to="/g/$id" params={{ id: guide.id }} className="group block">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={guide.image}
                    alt=""
                    className="film h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-display text-2xl tracking-tight group-hover:text-tinto">
                  {guide.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{guide.dek}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/guides" className="mt-8 inline-flex items-center gap-2 text-kicker text-muted hover:text-tinto">
          Todas las guías
          <ArrowRight className="size-3.5" />
        </Link>
      </section>
    </main>
  );
}
