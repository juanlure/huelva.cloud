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
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.article.title ?? "Artículo"} · Huelva.cloud` }],
  }),
});

function ArticlePage() {
  const { article, related } = Route.useLoaderData();
  const router = useRouter();
  const barrio = BARRIOS.find((b) => b.id === article.neighborhood);
  const jsonLd =
    article.source === "community"
      ? null
      : {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          datePublished: article.publishedAt,
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
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <Badge>{CATEGORY_LABEL[article.category]}</Badge>
        {article.source === "community" ? <Badge variant="solid">La calle</Badge> : null}
        {article.source === "daemon" ? <Badge variant="solid">Redacción</Badge> : null}
        {article.author ? <span>{article.author}</span> : null}
        <span>{formatRead(article.readMinutes)}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
      </div>
      <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
        {article.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{article.dek}</p>
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

      <div className="mt-8">
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
    </main>
  );
}
