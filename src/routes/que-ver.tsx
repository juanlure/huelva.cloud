import { createFileRoute, Link } from "@tanstack/react-router";
import { FilmHero } from "@/components/film-hero";
import { LIVE_GUIDES } from "@/data/live-guides";
import { FAQ_HUELVA } from "@/data/seo-topics";
import { breadcrumbJsonLd, faqJsonLd, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/que-ver")({
  component: QueVerPage,
  head: () =>
    seoHead({
      title: "Qué ver en Huelva: Costa de la Luz, Doñana y gamba blanca",
      description:
        "Qué ver en Huelva: Muelle del Tinto, playas de la Costa de la Luz, gamba blanca, Doñana, lugares colombinos, Riotinto y Jabugo.",
      path: "/que-ver",
      keywords: [
        "qué ver en Huelva",
        "qué hacer en Huelva",
        "Costa de la Luz",
        "Doñana",
        "gamba blanca de Huelva",
        "lugares colombinos",
        "Riotinto",
        "playas de Huelva",
      ],
    }),
});

const PILLARS = [
  {
    title: "La capital y la ría",
    body: "Plaza de las Monjas, Muelle de Riotinto, Barrio Reina Victoria, El Conquero. Huelva se entiende andando y se cierra al atardecer sobre el hierro.",
    to: "/g/$id" as const,
    id: "ocaso",
    image: "/media/muelle.jpg",
  },
  {
    title: "La Costa de la Luz",
    body: "Ciento veintidós kilómetros de Atlántico: Punta Umbría, El Portil, Mazagón, Matalascañas, Isla Cristina, Ayamonte. El viento decide la orilla.",
    to: "/g/$id" as const,
    id: "orilla",
    image: "/media/playa.jpg",
  },
  {
    title: "La mesa",
    body: "Gamba blanca a la plancha, choco de Punta, mojama de Isla, jamón de Jabugo, Condado frío. Costa, Condado y sierra.",
    to: "/mesa" as const,
    id: undefined,
    image: "/media/gamba.jpg",
  },
  {
    title: "Doñana y El Rocío",
    body: "El parque y la aldea. El Acebuche, la marisma, la arena en la calle. A su hora, por la senda.",
    to: "/g/$id" as const,
    id: "marisma",
    image: "/media/donana.jpg",
  },
  {
    title: "Lugares colombinos",
    body: "La Rábida, Palos de la Frontera, Moguer. El estuario desde el que zarparon las naves. Juan Ramón, de propina.",
    to: "/g/$id" as const,
    id: "rabida",
    image: "/media/rabida.jpg",
  },
  {
    title: "Riotinto y la sierra",
    body: "El río rojo, el tren minero, Bella Vista. Más al norte, Aracena, la Gruta y el jamón.",
    to: "/g/$id" as const,
    id: "cuenca",
    image: "/media/riotinto.jpg",
  },
];

function QueVerPage() {
  return (
    <main>
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

      <FilmHero
        image="/media/muelle.jpg"
        alt="Muelle de Riotinto, Huelva"
        kicker="El mapa"
        title="Qué ver en Huelva"
        tall
      >
        <p className="mt-5 max-w-xl text-lg text-iron-fg/80">
          Costa, marisma, sierra. Tres mil horas de sol. El mismo mapa.
        </p>
      </FilmHero>

      <ol className="grid md:grid-cols-2">
        {PILLARS.map((item) => (
          <li key={item.title} className="border-b border-line md:odd:border-r">
            <Link
              to={item.to}
              params={item.to === "/g/$id" && item.id ? { id: item.id } : undefined}
              className="group block"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  className="film h-72 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="px-6 py-8 sm:px-8">
                <span className="block font-display text-3xl tracking-tight group-hover:text-tinto">
                  {item.title}
                </span>
                <span className="mt-3 block max-w-md text-muted">{item.body}</span>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
        <h2 className="font-display text-edition tracking-tight">Preguntas de quien llega</h2>
        <dl className="mt-10 divide-y divide-line border-y border-line">
          {FAQ_HUELVA.map((item) => (
            <div key={item.q} className="grid gap-3 py-8 md:grid-cols-12">
              <dt className="font-display text-xl tracking-tight md:col-span-5">{item.q}</dt>
              <dd className="leading-relaxed text-muted md:col-span-7">{item.a}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LIVE_GUIDES.slice(0, 6).map((g) => (
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
