import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VoteButton } from "@/components/vote-button";
import { formatDate } from "@/lib/format";
import { listArticles, listEvents, voteEvent } from "@/lib/server/content";
import { ArticleCard } from "@/components/article-card";

export const Route = createFileRoute("/agenda")({
  loader: async () => {
    const [events, articles] = await Promise.all([listEvents(), listArticles()]);
    return {
      events,
      articles: articles.filter((a) => a.category === "events"),
    };
  },
  component: AgendaPage,
  head: () => ({
    meta: [{ title: "Agenda · Huelva.cloud" }],
  }),
});

function AgendaPage() {
  const { events, articles } = Route.useLoaderData();
  const router = useRouter();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-kicker text-tinto">Agenda</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight">Lo que se celebra</h1>
          <p className="mt-3 max-w-xl text-muted">
            Colombinas, La Cinta, la gamba, el jamón. Y lo que cuelgue un vecino.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/aporta">Añadir fecha</Link>
        </Button>
      </div>

      <ul className="mt-8 grid gap-3">
        {events.map((event) => (
          <li
            key={event.id}
            className="flex flex-col gap-4 rounded-xl bg-paper p-5 shadow-border sm:flex-row sm:items-start sm:justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium text-tide">{formatDate(event.startsOn)}</p>
                {event.source === "community" ? <Badge variant="solid">La calle</Badge> : null}
              </div>
              <h2 className="mt-1 font-display text-2xl tracking-tight">{event.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{event.dek}</p>
              <p className="mt-2 text-xs text-faint">{event.venue}</p>
            </div>
            <VoteButton
              votes={event.votes}
              onVote={async () => {
                await voteEvent({ data: { id: event.id } });
                await router.invalidate();
              }}
            />
          </li>
        ))}
      </ul>

      {articles.length ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight">Crónicas</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
