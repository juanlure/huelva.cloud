import { createFileRoute } from "@tanstack/react-router";
import { ArticleCard } from "@/components/article-card";
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
      <p className="text-xs font-medium uppercase tracking-widest text-tide">Guías</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Hechas para usarse</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Supervivencia, gamba, barrios y 48 horas. Sin folleto, sin «gran desconocida».
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} featured />
        ))}
      </div>
    </main>
  );
}
