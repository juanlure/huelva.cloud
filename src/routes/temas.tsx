import { createFileRoute, Link } from "@tanstack/react-router";
import { ESCUCHA, TOPIC_HUB } from "@/data/seo-topics";
import { SEO_LANDINGS } from "@/data/seo-landings";
import { DEFAULT_KEYWORDS, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/temas")({
  component: TemasPage,
  head: () =>
    seoHead({
      title: "Temas de Huelva: gamba blanca, Doñana, playas, Colón, Riotinto, Jabugo",
      description:
        "El índice de Huelva.cloud: gamba blanca, playas de la Costa de la Luz, Doñana, lugares colombinos, Riotinto, Jabugo, Colombinas y lo que se habla ahora.",
      path: "/temas",
      keywords: DEFAULT_KEYWORDS,
    }),
});

function TemasPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-8 sm:py-20">
      <p className="text-kicker text-tinto">Índice del medio</p>
      <h1 className="mt-4 max-w-4xl font-display text-display leading-display tracking-display">
        Temas
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        Las búsquedas reales de quien quiere Huelva, y la conversación pública
        de la provincia. De aquí salen las guías.
      </p>

      <ol className="mt-16 grid gap-10 md:grid-cols-2">
        {SEO_LANDINGS.map((l) => (
          <li key={l.slug} className="border-t border-line pt-6">
            <Link to="/$slug" params={{ slug: l.slug }} className="group block">
              <h2 className="font-display text-3xl tracking-tight group-hover:text-tinto">{l.h1}</h2>
              <p className="mt-3 text-muted">{l.lede}</p>
              <p className="mt-3 text-kicker text-faint">{l.keywords.slice(0, 4).join(" · ")}</p>
            </Link>
          </li>
        ))}
      </ol>

      <ol className="mt-16 grid gap-10 md:grid-cols-2">
        {TOPIC_HUB.map((topic) => (
          <li key={topic.slug} className="border-t border-line pt-6">
            {topic.href === "/g/$id" && topic.id ? (
              <Link to="/g/$id" params={{ id: topic.id }} className="group block">
                <h2 className="font-display text-3xl tracking-tight group-hover:text-tinto">
                  {topic.title}
                </h2>
                <p className="mt-3 text-muted">{topic.dek}</p>
                <p className="mt-3 text-kicker text-faint">{topic.keywords.join(" · ")}</p>
              </Link>
            ) : (
              <Link to={topic.href} className="group block">
                <h2 className="font-display text-3xl tracking-tight group-hover:text-tinto">
                  {topic.title}
                </h2>
                <p className="mt-3 text-muted">{topic.dek}</p>
                <p className="mt-3 text-kicker text-faint">{topic.keywords.join(" · ")}</p>
              </Link>
            )}
          </li>
        ))}
      </ol>

      <section className="mt-24">
        <p className="text-kicker text-tinto">Lo que se habla</p>
        <h2 className="mt-3 font-display text-edition tracking-tight">Foros, X, la prensa de casa</h2>
        <p className="mt-4 max-w-xl text-muted">
          Síntesis editorial de la conversación pública de hoy. No citamos
          cuentas: apuntamos el tema y te llevamos a la guía.
        </p>
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {ESCUCHA.map((item) => (
            <li key={item.id} className="py-8">
              {item.href === "/g/$id" && item.idGuide ? (
                <Link to="/g/$id" params={{ id: item.idGuide }} className="block hover:text-tinto">
                  <p className="text-kicker text-faint">{item.where}</p>
                  <p className="mt-2 font-display text-2xl tracking-tight">{item.title}</p>
                  <p className="mt-2 max-w-2xl text-muted">{item.dek}</p>
                </Link>
              ) : (
                <Link to="/barrios" className="block hover:text-tinto">
                  <p className="text-kicker text-faint">{item.where}</p>
                  <p className="mt-2 font-display text-2xl tracking-tight">{item.title}</p>
                  <p className="mt-2 max-w-2xl text-muted">{item.dek}</p>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
