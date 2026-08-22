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
import { RECURSOS } from "@/data/recursos";
import { cn } from "@/lib/utils";

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

const ESSAY = [
  { src: "/media/muelle.jpg", cap: "01 · El muelle", alt: "Muelle de Riotinto al atardecer, Huelva" },
  { src: "/media/gamba.jpg", cap: "02 · La gamba", alt: "Gamba blanca de Huelva" },
  { src: "/media/donana.jpg", cap: "03 · La marisma", alt: "Caballos en las marismas de Doñana" },
  { src: "/media/mazagon.jpg", cap: "04 · La orilla", alt: "Playa de la Costa de la Luz, pinos y duna" },
  { src: "/media/rabida.jpg", cap: "05 · La Rábida", alt: "Monasterio de La Rábida, Palos de la Frontera" },
  { src: "/media/riotinto.jpg", cap: "06 · La cuenca", alt: "Corta minera de Riotinto" },
  { src: "/media/aracena.jpg", cap: "07 · La sierra", alt: "Castillo de Aracena y el pueblo blanco" },
  { src: "/media/rocio.jpg", cap: "08 · El Rocío", alt: "Ermita de El Rocío, Almonte" },
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
  head: () =>
    seoHead({
      title: "Huelva.cloud · Guía de Huelva, Costa de la Luz, gamba blanca y Doñana",
      description:
        "Guía de referencia de Huelva: qué ver, playas de la Costa de la Luz, gamba blanca, Doñana, lugares colombinos, Riotinto y Jabugo. En vivo: viento y ocaso.",
      path: "/",
    }),
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
          alt="Muelle del Tinto al atardecer"
          className="film absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-iron/50" />
        <p className="writing-vertical text-kicker absolute right-4 top-1/2 hidden -translate-y-1/2 text-foam/70 sm:right-8 lg:block">
          Costa de la Luz · Onuba · 2026
        </p>
        <div className="relative flex h-full flex-col justify-end px-4 pb-20 sm:px-8 sm:pb-24">
          <p className="text-kicker reveal text-tinto-fg/80">Hierro · sal · gamba</p>
          <h1 className="reveal-2 mt-5 max-w-[18ch] font-display text-display leading-display tracking-display text-iron-fg">
            Huelva
            <span className="italic text-tinto">.cloud</span>
          </h1>
          <p className="reveal-3 mt-6 max-w-md text-base leading-relaxed text-iron-fg/80 sm:text-lg">
            Tres mil horas de sol, ciento veintidós kilómetros de Atlántico y
            la mejor gamba blanca del mundo. La guía de Huelva, escrita con
            el pulso de la ría.
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

      {punta ? (
        <Link
          to="/g/$id"
          params={{ id: "ahora" }}
          className="block border-b border-line bg-iron px-4 py-4 text-iron-fg sm:px-8"
        >
          <span className="mx-auto flex max-w-7xl flex-wrap items-baseline justify-between gap-3">
            <span className="text-kicker text-tinto">En vivo</span>
            <span className="font-display text-xl tracking-tight sm:text-2xl">
              {punta.tempC != null ? `${punta.tempC}°` : "—"} {punta.regime}
              {punta.windKmh != null ? ` · ${punta.windKmh} km/h` : ""}
              {live.sun.past
                ? ` · sol puesto ${live.sun.sunset}`
                : ` · ocaso ${live.sun.sunset}`}
            </span>
            <span className="text-kicker text-foam">{live.advice.title}</span>
          </span>
        </Link>
      ) : null}

      <section className="border-b border-line bg-paper">
        <dl className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-line">
          <Stat k="Sol" v="3.000 h" />
          <Stat k="Costa" v="122 km" />
          <Stat k="Redacción" v="1 daemon" />
        </dl>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-8 lg:grid-cols-12 lg:py-28">
        <blockquote className="font-display text-edition leading-tight tracking-tight text-ink lg:col-span-7">
          Huelva es luz atlántica, gamba de cristal y un muelle de hierro
          sobre el Tinto. Una provincia entera —costa, marisma, sierra—
          cabida en el mismo mapa.
        </blockquote>
        <div className="flex flex-col justify-between gap-8 lg:col-span-5">
          <p className="text-base leading-relaxed text-muted">
            Para quien llega y para quien vive aquí. Dos días o una
            temporada. La redacción publica; tú eliges el ritmo.
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

      <section className="overflow-x-auto">
        <ul className="flex min-w-max gap-3 px-4 py-4 sm:px-8 lg:grid lg:min-w-0 lg:grid-cols-4 lg:gap-3">
          {ESSAY.map((shot, i) => (
            <li
              key={shot.cap}
              className={cn(
                "w-56 shrink-0 overflow-hidden lg:w-auto",
                i % 2 === 1 ? "lg:mt-10" : "lg:mb-10",
              )}
            >
              <img src={shot.src} alt={shot.alt} className="film h-80 w-full object-cover" />
              <p className="mt-3 text-kicker text-faint">{shot.cap}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-8">
        <SectionHead kicker="01 — Guías vivas" title="Once maneras de estar aquí." href="/guides" linkLabel="Todas" />
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

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="px-4 py-8 text-center sm:px-8 sm:py-10">
      <dt className="text-kicker text-faint">{k}</dt>
      <dd className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">{v}</dd>
    </div>
  );
}
