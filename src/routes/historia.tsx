import { createFileRoute, Link } from "@tanstack/react-router";
import { HISTORIA, HISTORIA_LUGARES } from "@/data/atlas";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/historia")({
  component: HistoriaPage,
  head: () =>
    seoHead({
      title: "Historia de Huelva: Onuba, Tartessos, Colón, Riotinto y el Decano",
      description:
        "De Onuba fenicia a Palos de 1492, el muelle británico, el Recreativo de 1889 y Juan Ramón. Historia de Huelva, escrita con calma.",
      path: "/historia",
      keywords: [
        "historia de Huelva",
        "Onuba",
        "Tartessos Huelva",
        "lugares colombinos",
        "Riotinto historia",
        "Recreativo de Huelva",
        "Juan Ramón Jiménez Moguer",
        "Barrio Reina Victoria",
        "Muelle de Riotinto",
      ],
    }),
});

function HistoriaPage() {
  return (
    <main>
      <section className="relative h-80 overflow-hidden bg-iron sm:h-96">
        <img
          src="/media/rabida.jpg"
          alt="Monasterio de La Rábida, Palos de la Frontera"
          className="film size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-iron via-iron/50 to-iron/20" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-8 sm:pb-14">
          <p className="text-kicker text-foam">Onuba · 3.000 años</p>
          <h1 className="mt-3 font-display text-display leading-display tracking-display text-iron-fg">
            Historia
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
        <p className="max-w-2xl text-xl leading-relaxed">
          Huelva es Onuba: fenicia, tartesia, romana. Luego Palos, el hierro
          británico, el Decano y Juan Ramón. Una ría que no ha dejado de ser
          puerto.
        </p>

        <ol className="mt-16 divide-y divide-line border-y border-line">
          {HISTORIA.map((h) => (
            <li key={h.year} className="grid gap-4 py-10 md:grid-cols-12">
              <p className="text-kicker text-tinto md:col-span-3">{h.year}</p>
              <div className="md:col-span-9">
                <h2 className="font-display text-3xl tracking-tight">{h.title}</h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{h.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <section className="mt-20">
          <p className="text-kicker text-tinto">Piedra y hierro</p>
          <h2 className="mt-3 font-display text-edition tracking-tight">Dónde se lee</h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {HISTORIA_LUGARES.map((l) => (
              <li key={l.name} className="border-t border-line pt-5">
                <h3 className="font-display text-2xl tracking-tight">{l.name}</h3>
                <p className="mt-2 text-muted">{l.dek}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-16 flex flex-wrap gap-6">
          <Link to="/g/$id" params={{ id: "rabida" }} className="text-tide hover:underline">
            El camino de Colón →
          </Link>
          <Link to="/g/$id" params={{ id: "cuenca" }} className="text-tide hover:underline">
            La cuenca roja →
          </Link>
        </div>
      </div>
    </main>
  );
}
