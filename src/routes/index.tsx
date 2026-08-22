import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { Button } from "@/components/ui/button";
import { listArticles } from "@/lib/server/content";
import { getNewsroomStatus } from "@/lib/server/newsroom";
import { SITE } from "@/lib/brand";
import { HERO_IMAGE } from "@/data/covers";
import { LIVE_GUIDES } from "@/data/live-guides";
import { RECURSOS } from "@/data/recursos";

const TICKER = [
  "Gamba blanca",
  "Choco",
  "Río Tinto",
  "Poniente",
  "La Rábida",
  "Doñana",
  "Jabugo",
  "Muelle",
  "Colombinas",
  "Onuba",
];

export const Route = createFileRoute("/")({
  loader: async () => {
    const [articles, newsroom] = await Promise.all([
      listArticles(),
      getNewsroomStatus(),
    ]);
    return { articles, newsroom };
  },
  component: Home,
});

function Home() {
  const { articles, newsroom } = Route.useLoaderData();
  const featured = articles.filter((a) => a.featured)[0];
  const latest = [...articles]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, 5);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE.name,
            url: SITE.url,
            description: SITE.description,
            inLanguage: "es-ES",
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE.url}/guides`,
            },
          }),
        }}
      />

      <section className="relative h-svh overflow-hidden bg-iron">
        <img
          src={HERO_IMAGE}
          alt="Muelle del Tinto al atardecer"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-iron/55" />
        <p className="writing-vertical text-kicker absolute right-4 top-1/2 hidden -translate-y-1/2 text-foam/80 sm:right-8 sm:block">
          Costa de la Luz · Onuba
        </p>
        <div className="relative flex h-full flex-col justify-end px-4 pb-16 sm:px-8 sm:pb-20">
          <p className="text-kicker reveal text-foam">Hierro y sal</p>
          <h1 className="reveal-2 mt-4 max-w-5xl font-display text-display leading-display tracking-display text-iron-fg">
            Huelva
            <span className="italic text-tinto">.cloud</span>
          </h1>
          <p className="reveal-3 mt-6 max-w-md text-base leading-relaxed text-iron-fg/80 sm:text-lg">
            La guía que no pide perdón por el Polo. Gamba, choco, Colón sin placa.
            La redacción vive en la nube. El criterio, si hay, es de aquí.
          </p>
        </div>
      </section>

      <div className="overflow-hidden border-y border-line bg-paper py-3">
        <div className="marquee-track flex w-max gap-10 pr-10 text-kicker text-faint">
          {[...TICKER, ...TICKER].map((word, i) => (
            <span key={`${word}-${i}`} className="flex items-center gap-10">
              {word}
              <span className="text-tinto">/</span>
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-8 lg:grid-cols-12 lg:py-28">
        <blockquote className="font-display text-edition leading-tight tracking-tight text-ink lg:col-span-7">
          Huelva huele, a veces, a industria. Está a la vista. Los onubenses
          lo tienen integrado en la biografía. No hace falta un discurso.
        </blockquote>
        <div className="flex flex-col justify-between gap-8 lg:col-span-5">
          <p className="text-base leading-relaxed text-muted">
            Viajeros, vecinos, quien llega a la ría sin mapa de souvenir. Dos
            días o una vida. El daemon publica; tú decides si te lo crees.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/g/$id" params={{ id: "marea" }}>
                Las 48 horas
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/g/$id" params={{ id: "carta" }}>
                La carta de la lonja
              </Link>
            </Button>
          </div>
          <Link to="/redaccion" className="text-sm text-muted transition-colors hover:text-tinto">
            <span className="text-kicker text-tinto">Daemon</span>
            <span className="mt-1 block">
              {newsroom.lastDecision} · cuota {newsroom.publishesToday}/{newsroom.quota}
            </span>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-8">
        <SectionHead kicker="01 — Guías vivas" title="Se usan. No se coleccionan." href="/guides" linkLabel="Las seis" />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-lg bg-line md:grid-cols-2">
          {LIVE_GUIDES.map((guide, i) => (
            <li key={guide.id} className={i === 0 ? "md:col-span-2" : ""}>
              <Link
                to="/g/$id"
                params={{ id: guide.id }}
                className={
                  i === 0
                    ? "group relative grid min-h-96 bg-paper md:grid-cols-2"
                    : "group flex min-h-40 items-end bg-paper p-6 transition-colors hover:bg-foam"
                }
              >
                {i === 0 ? (
                  <>
                    <div className="relative min-h-72 overflow-hidden">
                      <img
                        src={guide.image}
                        alt=""
                        className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-end p-8 sm:p-12">
                      <p className="text-kicker text-tinto">0{i + 1}</p>
                      <h3 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
                        {guide.title}
                      </h3>
                      <p className="mt-4 max-w-md text-muted">{guide.dek}</p>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-kicker text-tinto">0{i + 1}</p>
                    <h3 className="mt-2 font-display text-2xl tracking-tight group-hover:text-tinto">
                      {guide.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{guide.dek}</p>
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHead kicker="02 — Pieza" title="Lo que hay que leer primero." />
          {featured ? <div className="mt-8"><ArticleCard article={featured} featured /></div> : null}
        </div>
        <div className="lg:col-span-5">
          <SectionHead kicker="03 — Lo último" title="También la calle." href="/aporta" linkLabel="Aporta" />
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
        </div>
      </section>

      <section className="bg-tide text-tide-fg">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-24">
          <p className="text-kicker text-foam">04 — Fuentes</p>
          <h2 className="mt-4 max-w-2xl font-display text-edition tracking-tight">
            AEMET, DGT, Doñana, el 112. La guía no sustituye a la fuente.
          </h2>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {RECURSOS.slice(0, 4).map((item) => (
              <li key={item.id}>
                <a href={item.href} rel="noreferrer" className="group block">
                  <p className="font-display text-2xl tracking-tight group-hover:text-foam">
                    {item.name}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-tide-fg/70">{item.dek}</p>
                </a>
              </li>
            ))}
          </ul>
          <Link to="/recursos" className="mt-10 inline-flex items-center gap-2 text-kicker text-foam hover:text-tide-fg">
            Todas las fuentes
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function SectionHead({
  kicker,
  title,
  href,
  linkLabel,
}: {
  kicker: string;
  title: string;
  href?: "/guides" | "/aporta" | "/recursos";
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-kicker text-tinto">{kicker}</p>
        <h2 className="mt-3 max-w-xl font-display text-edition tracking-tight text-ink">
          {title}
        </h2>
      </div>
      {href && linkLabel ? (
        <Link
          to={href}
          className="inline-flex items-center gap-2 text-kicker text-muted hover:text-tinto"
        >
          {linkLabel}
          <ArrowRight className="size-3.5" />
        </Link>
      ) : null}
    </div>
  );
}
