import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArticleBody } from "@/components/article-body";
import { ArticleCard } from "@/components/article-card";
import { Badge } from "@/components/ui/badge";
import { VoteButton } from "@/components/vote-button";
import { formatDate, formatRead } from "@/lib/format";
import { getArticleBySlug, listArticles, voteArticle } from "@/lib/server/content";
import { CATEGORY_LABEL } from "@/lib/types";
import { SITE } from "@/lib/brand";
import { BARRIOS } from "@/data/barrios";
import { liveGuideByArticle } from "@/data/live-guides";
import { coverFor } from "@/data/covers";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/p/$slug")({
  loader: async ({ params }) => {
    const article = await getArticleBySlug({ data: { slug: params.slug } });
    if (!article) throw notFound();
    const all = await listArticles();
    const related = all.filter((a) => a.slug !== article.slug).slice(0, 3);
    return { article, related };
  },
  notFoundComponent: () => (
    <main className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="font-display text-3xl tracking-tight">No está</h1>
      <p className="mt-3 text-muted">Ese texto no vive en Huelva.cloud. Prueba las guías.</p>
      <Link to="/guides" className="mt-6 inline-block text-tide hover:underline">
        Ir a las guías
      </Link>
    </main>
  ),
  component: ArticlePage,
  head: ({ loaderData }) => {
    const article = loaderData?.article;
    const cover = article ? coverFor(article) : undefined;
    return seoHead({
      title: article?.title ?? "Artículo",
      description: article?.dek ?? SITE.description,
      path: `/p/${article?.slug ?? ""}`,
      type: "article",
      published: article?.publishedAt,
      image: cover?.startsWith("http") ? cover : cover ? `${SITE.url}${cover}` : undefined,
    });
  },
});

function ArticlePage() {
  const { article, related } = Route.useLoaderData();
  const router = useRouter();
  const barrio = BARRIOS.find((b) => b.id === article.neighborhood);
  const live = liveGuideByArticle(article.slug);
  const cover = coverFor(article);
  const jsonLd =
    article.source === "community"
      ? null
      : {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: article.title,
          description: article.dek,
          image: `${SITE.url}${cover}`,
          datePublished: article.publishedAt,
          dateModified: article.publishedAt,
          isAccessibleForFree: true,
          creativeWorkStatus: "Published",
          inLanguage: "es",
          author: {
            "@type": "Person",
            name: article.author ?? "Redacción Huelva.cloud",
            description: "AI Editorial Persona · Synthetic profile",
          },
          publisher: { "@type": "Organization", name: "Huelva.cloud" },
          about: { "@type": "Thing", description: "AI-generated content" },
          usageInfo: `${SITE.url}/ai-disclosure`,
        };

  return (
    <main>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <figure className="relative h-72 overflow-hidden bg-iron sm:h-96">
        <img src={cover} alt={article.title} className="film size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-iron via-iron/20 to-transparent" />
      </figure>
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-8 sm:py-16">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <Badge>{CATEGORY_LABEL[article.category]}</Badge>
        {article.source === "community" ? <Badge variant="solid">La calle</Badge> : null}
        {article.source === "daemon" ? <Badge variant="solid">Redacción</Badge> : null}
        {article.author ? <span>{article.author}</span> : null}
        <span>{formatRead(article.readMinutes)}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
      </div>
      <h1 className="mt-6 font-display text-display leading-display tracking-display">
        {article.title}
      </h1>
      <p className="mt-6 text-xl leading-relaxed text-muted">{article.dek}</p>
      {live ? (
        <Link
          to="/g/$id"
          params={{ id: live.id }}
          className="mt-8 flex items-center justify-between gap-3 rounded-md bg-iron px-5 py-4 text-iron-fg"
        >
          <span>
            <span className="text-kicker block text-tinto">Guía viva</span>
            <span className="mt-1 block font-display text-xl tracking-tight">{live.title}</span>
          </span>
          <span className="text-kicker text-foam">Usar</span>
        </Link>
      ) : null}
      {article.source === "community" ? (
        <p className="mt-3 text-sm text-faint">Aporte de la calle. No lo ha escrito la redacción.</p>
      ) : (
        <p className="mt-3 text-sm text-faint">
          {article.author ? (
            <>
              {article.author} ·{" "}
              <Link to="/ai-disclosure" hash="personas" className="text-tide hover:underline">
                persona editorial sintética
              </Link>
              {" · "}
            </>
          ) : null}
          Contenido generado por IA, publicado sin revisión humana previa.{" "}
          <Link to="/ai-disclosure" className="text-tide hover:underline">
            Transparencia
          </Link>
        </p>
      )}
      {barrio ? (
        <p className="mt-3 text-sm text-muted">
          En{" "}
          <Link to="/barrios" className="text-tide hover:underline">
            {barrio.name}
          </Link>
        </p>
      ) : null}

      <div className="drop-cap mt-10">
        <ArticleBody markdown={article.body} />
      </div>

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
        <p className="text-sm text-muted">¿Te vale? Súbelo en el ranking de la calle.</p>
        <VoteButton
          votes={article.votes}
          onVote={async () => {
            await voteArticle({ data: { id: article.id } });
            await router.invalidate();
          }}
        />
      </div>

      {related.length ? (
        <section className="mt-14">
          <h2 className="font-display text-2xl tracking-tight">Sigue por aquí</h2>
          <div className="mt-4 grid gap-4">
            {related.map((item) => (
              <ArticleCard key={item.id} article={item} />
            ))}
          </div>
        </section>
      ) : null}
      </div>
    </main>
  );
}
