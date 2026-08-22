import { createFileRoute, Link } from "@tanstack/react-router";
import { LIVE_GUIDES } from "@/data/live-guides";
import { FAQ_HUELVA } from "@/data/seo-topics";
import { breadcrumbJsonLd, faqJsonLd, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/que-ver")({
  component: QueVerPage,
  head: () =>
    seoHead({
      title: "Qué ver en Huelva: guía de la Costa de la Luz, Doñana y gamba blanca",
      description:
        "Qué ver y qué hacer en Huelva: Muelle del Tinto, playas de la Costa de la Luz, gamba blanca, Doñana, lugares colombinos, Riotinto y Jabugo. Guía de referencia.",
      path: "/que-ver",
      keywords: [
        "qué ver en Huelva",
        "qué hacer en Huelva",
        "imprescindibles Huelva",
        "guía Huelva",
        "Costa de la Luz",
        "Doñana",
        "gamba blanca de Huelva",
        "lugares colombinos",
        "Riotinto",
        "playas de Huelva",
        "El Rocío",
        "Punta Umbría",
        "48 horas en Huelva",
      ],
    }),
});

const PILLARS = [
  {
    title: "La capital y la ría",
    body: "Plaza de las Monjas, Muelle de Riotinto, Barrio Reina Victoria, El Conquero. Huelva se entiende andando y se cierra al atardecer sobre el hierro.",
    to: "/g/$id" as const,
    id: "ocaso",
  },
  {
    title: "La Costa de la Luz",
    body: "Ciento veintidós kilómetros de Atlántico: Punta Umbría, El Portil, Mazagón, Matalascañas, Isla Cristina, Ayamonte. El viento decide la orilla.",
    to: "/g/$id" as const,
    id: "orilla",
  },
  {
    title: "La mesa",
    body: "Gamba blanca a la plancha, choco de Punta, jamón de Jabugo, Condado frío. Dos geografías, dos platos.",
    to: "/g/$id" as const,
    id: "carta",
  },
  {
    title: "Doñana y El Rocío",
    body: "El parque y la aldea. El Acebuche, la marisma, la arena en la calle. A su hora, por la senda.",
    to: "/g/$id" as const,
    id: "marisma",
  },
  {
    title: "Lugares colombinos",
    body: "La Rábida, Palos de la Frontera, Moguer. El estuario desde el que zarparon las naves. Juan Ramón, de propina.",
    to: "/g/$id" as const,
    id: "rabida",
  },
  {
    title: "Riotinto y la sierra",
    body: "El río rojo, el tren minero, Bella Vista. Más al norte, Aracena, la Gruta y el jamón.",
    to: "/g/$id" as const,
    id: "cuenca",
  },
];

function QueVerPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-8 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ_HUELVA)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Huelva.cloud", path: "/" },
              { name: "Qué ver en Huelva", path: "/que-ver" },
            ]),
          ),
        }}
      />

      <p className="text-kicker text-tinto">Guía de referencia</p>
      <h1 className="mt-4 max-w-4xl font-display text-display leading-display tracking-display">
        Qué ver en Huelva
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        La Costa de la Luz, Doñana, la gamba blanca, Palos y Moguer, Riotinto,
        Jabugo. Una provincia atlántica con tres mil horas de sol y mesa
        propia. Esto es el mapa.
      </p>

      <ol className="mt-16 divide-y divide-line border-y border-line">
        {PILLARS.map((item, i) => (
          <li key={item.title}>
            <Link
              to={item.to}
              params={{ id: item.id }}
              className="group grid gap-4 py-10 md:grid-cols-12"
            >
              <span className="text-kicker text-tinto md:col-span-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="md:col-span-10">
                <span className="block font-display text-3xl tracking-tight group-hover:text-tinto sm:text-4xl">
                  {item.title}
                </span>
                <span className="mt-3 block max-w-2xl text-muted">{item.body}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <section className="mt-20">
        <h2 className="font-display text-edition tracking-tight">Preguntas de quien llega</h2>
        <dl className="mt-10 divide-y divide-line border-y border-line">
          {FAQ_HUELVA.map((item) => (
            <div key={item.q} className="grid gap-3 py-8 md:grid-cols-12">
              <dt className="font-display text-xl tracking-tight md:col-span-5">{item.q}</dt>
              <dd className="text-muted leading-relaxed md:col-span-7">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-edition tracking-tight">Guías vivas</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {LIVE_GUIDES.map((g) => (
            <li key={g.id}>
              <Link to="/g/$id" params={{ id: g.id }} className="block hover:text-tinto">
                <span className="font-display text-2xl tracking-tight">{g.title}</span>
                <span className="mt-1 block text-sm text-muted">{g.dek}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
