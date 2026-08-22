import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Fish, MapPinned, Radio } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { Button } from "@/components/ui/button";
import { listArticles } from "@/lib/server/content";
import { getNewsroomStatus } from "@/lib/server/newsroom";
import { SITE } from "@/lib/brand";
import { HERO_IMAGE } from "@/data/covers";
import { LIVE_GUIDES } from "@/data/live-guides";
import { RECURSOS } from "@/data/recursos";

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
  const startHere = articles.filter((a) => a.featured).slice(0, 6);
  const latest = [...articles]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, 4);
  const trending = [...articles].sort((a, b) => b.votes - a.votes).slice(0, 8);

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
      <section className="relative overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Muelle del Tinto al atardecer"
          className="aspect-video w-full object-cover sm:h-96 sm:aspect-auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-8 sm:px-6 sm:pb-12">
          <p className="text-sm font-medium tracking-wide text-foam">Costa de la Luz</p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl leading-tight tracking-tight text-paper sm:text-6xl">
            Huelva <span className="italic text-foam">.cloud</span> auténtica
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6">
        <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Guía local para viajeros, vecinos y quien llega a la ría sin mapa de
          souvenir. La redacción vive en la nube. El criterio, si hay, es de
          aquí: gamba, choco, Colón sin placa.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/test">
              <Fish />
              ¿Onubense o guiri?
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/pulse">
              <MapPinned />
              Huelva Pulse
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/recursos">
              <BookOpen />
              Recursos
            </Link>
          </Button>
        </div>
        <Link
          to="/redaccion"
          className="mt-8 flex max-w-xl items-start gap-3 rounded-xl bg-paper p-4 text-sm shadow-border transition-colors hover:bg-foam"
        >
          <Radio className="mt-0.5 size-4 shrink-0 text-tide" />
          <span>
            <span className="font-medium text-ink">Daemon · {newsroom.lastDecision}</span>
            <span className="mt-1 block text-muted">
              Cuota {newsroom.publishesToday}/{newsroom.quota} ·{" "}
              {newsroom.windowOpen ? "ventana abierta" : "ventana cerrada"} · rastro público
            </span>
          </span>
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <SectionHead
          kicker="Guías vivas"
          title="Se arman, se tachan, se recorren. No son un PDF con alma."
          href="/guides"
          linkLabel="Abrir las seis"
        />
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LIVE_GUIDES.slice(0, 3).map((guide) => (
            <li key={guide.id}>
              <Link
                to="/g/$id"
                params={{ id: guide.id }}
                className="group flex h-full flex-col overflow-hidden rounded-xl bg-paper shadow-border hover:ring-1 hover:ring-tide/40"
              >
                <img src={guide.image} alt="" className="aspect-video w-full object-cover" />
                <div className="p-4">
                  <p className="font-display text-xl tracking-tight group-hover:text-tide">
                    {guide.title}
                  </p>
                  <p className="mt-1 text-sm text-muted">{guide.dek}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <SectionHead
          kicker="Empieza aquí"
          title="Si es la primera vez, o la quieres bien hecha."
          href="/guides"
          linkLabel="Todas las guías"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {startHere.map((article) => (
            <ArticleCard key={article.id} article={article} featured />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <SectionHead
          kicker="Lo último"
          title="Lo que acaba de entrar — también de la calle."
          href="/aporta"
          linkLabel="Aporta tú"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {latest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <SectionHead
          kicker="Fuentes"
          title="AEMET, DGT, Doñana, el 112. La guía no sustituye a la fuente."
          href="/recursos"
          linkLabel="Todos los recursos"
        />
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {RECURSOS.slice(0, 4).map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                rel="noreferrer"
                className="block h-full rounded-xl bg-paper p-4 shadow-border transition-colors hover:bg-foam"
              >
                <p className="font-display text-lg tracking-tight">{item.name}</p>
                <p className="mt-1 text-sm text-muted">{item.dek}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 pb-16 sm:px-6">
        <SectionHead
          kicker="Tendencia"
          title="Lo más leído y lo más votado esta semana."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-tide">
          {kicker}
        </p>
        <h2 className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
      </div>
      {href && linkLabel ? (
        <Link
          to={href}
          className="inline-flex items-center gap-1 text-sm font-medium text-tide hover:underline"
        >
          {linkLabel}
          <ArrowRight className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}
