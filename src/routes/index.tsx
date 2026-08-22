import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { Button } from "@/components/ui/button";
import { listArticles } from "@/lib/server/content";
import { getLiveCoast } from "@/lib/server/coast";
import { getNewsroomStatus } from "@/lib/server/newsroom";
import { FAQ_HUELVA } from "@/data/seo-topics";
import { faqJsonLd, orgJsonLd, seoHead } from "@/lib/seo";
import { HERO_IMAGE } from "@/data/covers";
import { LIVE_GUIDES } from "@/data/live-guides";

const ESSAY = [
  { src: "/media/gamba.jpg", cap: "La gamba", alt: "Gamba blanca de Huelva a la plancha" },
  { src: "/media/donana.jpg", cap: "La marisma", alt: "Dunas de Doñana hacia el Atlántico" },
  { src: "/media/rabida.jpg", cap: "La Rábida", alt: "Monasterio de La Rábida, Palos de la Frontera" },
  { src: "/media/riotinto.jpg", cap: "La cuenca", alt: "Corta minera de Riotinto" },
];

export const Route = createFileRoute("/")({
  loader: async () => {
    const [articles, newsroom, live] = await Promise.all([
      listArticles(),
      getNewsroomStatus(),
      getLiveCoast(),
    ]);
    return { articles, newsroom, live };
  },
  head: () => {
    const base = seoHead({
      title: "Huelva.cloud · Guía de Huelva, Costa de la Luz, gamba blanca y Doñana",
      description:
        "Huelva: tres mil horas de sol, gamba blanca, Doñana, lugares colombinos, Riotinto y Jabugo. La guía de la Costa de la Luz, en vivo.",
      path: "/",
    });
    return {
      ...base,
      links: [...base.links, { rel: "preload", as: "image", href: HERO_IMAGE }],
    };
  },
  component: Home,
});

function Home() {
  const { articles, newsroom, live } = Route.useLoaderData();
  const featured = articles.filter((a) => a.featured)[0];
  const latest = [...articles]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, 5);
  const punta = live.stations.find((s) => s.id === "punta") ?? live.stations[0];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ_HUELVA)) }}
      />

      <section className="relative h-svh overflow-hidden bg-iron">
        <img
          src={HERO_IMAGE}
          alt="Muelle de Riotinto sobre la ría de Huelva"
          className="hero-still film absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-iron via-iron/30 to-iron/10" />
        {punta ? (
          <Link
            to="/g/$id"
            params={{ id: "ahora" }}
            className="absolute left-4 top-24 z-10 text-kicker text-foam/80 hover:text-foam sm:left-8 sm:top-28"
          >
            {punta.tempC != null ? `${punta.tempC}°` : "—"} · {punta.regime}
            {live.sun.past ? ` · sol puesto ${live.sun.sunset}` : ` · ocaso ${live.sun.sunset}`}
          </Link>
        ) : null}
        <p className="writing-vertical text-kicker absolute right-4 top-1/2 hidden -translate-y-1/2 text-foam/55 sm:right-8 lg:block">
          Costa de la Luz · Onuba
        </p>
        <div className="relative flex h-full flex-col justify-end px-4 pb-16 sm:px-8 sm:pb-20">
          <p className="text-kicker reveal text-tinto">Atlántico · 3.000 horas de sol</p>
          <h1 className="reveal-2 mt-4 font-display text-display leading-display tracking-display text-iron-fg">
            Huelva
            <span className="italic text-tinto">.cloud</span>
          </h1>
          <p className="reveal-3 mt-6 max-w-md font-display text-xl italic leading-snug text-iron-fg/85 sm:text-2xl">
            Hierro sobre el Tinto. Gamba de cristal. Una provincia que mira al oeste.
          </p>
          <div className="reveal-3 mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/g/$id" params={{ id: "marea" }}>
                48 horas
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-foam/30 text-iron-fg hover:bg-iron-fg/10">
              <Link to="/g/$id" params={{ id: "carta" }}>
                La carta
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-8 lg:grid-cols-12 lg:py-28">
        <blockquote className="font-display text-edition leading-tight tracking-tight text-ink lg:col-span-8">
          Tres mil horas de sol. Ciento veintidós kilómetros de orilla.
          Doñana, Palos, Jabugo. El mismo mapa.
        </blockquote>
        <p className="self-end text-base leading-relaxed text-muted lg:col-span-4">
          Para quien llega y para quien vive aquí. La redacción publica;
          tú eliges el ritmo.
        </p>
      </section>

      <section className="grid gap-px bg-line md:grid-cols-2">
        {ESSAY.map((shot) => (
          <figure key={shot.cap} className="relative min-h-[55vh] overflow-hidden bg-iron">
            <img src={shot.src} alt={shot.alt} className="film size-full object-cover" />
            <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-iron/70 to-transparent p-6">
              <span className="text-kicker text-iron-fg">{shot.cap}</span>
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28">
        <p className="text-kicker text-tinto">Guías vivas</p>
        <h2 className="mt-3 max-w-xl font-display text-edition tracking-tight">
          Elige cómo estar aquí.
        </h2>
        <ul className="mt-12 grid gap-8 lg:grid-cols-3">
          {LIVE_GUIDES.filter((g) => ["marea", "carta", "orilla"].includes(g.id)).map((guide) => (
            <li key={guide.id}>
              <Link to="/g/$id" params={{ id: guide.id }} className="group block">
                <div className="overflow-hidden">
                  <img
                    src={guide.image}
                    alt=""
                    className="film h-72 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 font-display text-3xl tracking-tight group-hover:text-tinto">
                  {guide.title}
                </h3>
                <p className="mt-2 text-muted">{guide.dek}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/guides" className="mt-10 inline-flex items-center gap-2 text-kicker text-muted hover:text-tinto">
          Todas las guías
          <ArrowRight className="size-3.5" />
        </Link>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-24 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-kicker text-tinto">Pieza</p>
          <h2 className="mt-3 font-display text-edition tracking-tight">Lo primero.</h2>
          {featured ? (
            <div className="mt-8">
              <ArticleCard article={featured} featured />
            </div>
          ) : null}
        </div>
        <div className="lg:col-span-5">
          <p className="text-kicker text-tinto">También la calle</p>
          <ol className="mt-8 divide-y divide-line">
            {latest.map((article, i) => (
              <li key={article.id} className="py-5 first:pt-0">
                <Link to="/p/$slug" params={{ slug: article.slug }} className="group flex gap-4">
                  <span className="font-display text-2xl text-tinto tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-display text-xl leading-snug tracking-tight group-hover:text-tinto">
                      {article.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted">{article.dek}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-muted">
            {newsroom.lastDecision} · cuota {newsroom.publishesToday}/{newsroom.quota}
          </p>
        </div>
      </section>
    </main>
  );
}
