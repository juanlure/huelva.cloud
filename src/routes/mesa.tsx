import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MESA_PRODUCTOS, MESA_TERRITORIOS, SELLOS } from "@/data/atlas";
import { seoHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mesa")({
  component: MesaPage,
  head: () =>
    seoHead({
      title: "Gastronomía de Huelva: gamba blanca, jamón de Jabugo, Condado y lonja",
      description:
        "Atlas de la mesa onubense: gamba blanca, choco, coquinas, mojama de Isla Cristina, vino del Condado, fresa, garbanzo de Escacena, jamón de Jabugo y gurumelo.",
      path: "/mesa",
      keywords: [
        "gastronomía Huelva",
        "gamba blanca de Huelva",
        "jamón de Jabugo",
        "Condado de Huelva",
        "choco Punta Umbría",
        "mojama Isla Cristina",
        "qué comer en Huelva",
        "gurumelo",
      ],
    }),
});

function MesaPage() {
  const [territorio, setTerritorio] = useState<"costa" | "condado" | "sierra" | "all">("all");
  const items =
    territorio === "all" ? MESA_PRODUCTOS : MESA_PRODUCTOS.filter((p) => p.territorio === territorio);
  const hero = MESA_TERRITORIOS.find((t) => t.id === territorio) ?? MESA_TERRITORIOS[0];

  return (
    <main>
      <section className="relative h-80 overflow-hidden bg-iron sm:h-96">
        <img src={hero.image} alt={hero.imageAlt} className="film size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-iron via-iron/50 to-iron/20" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-8 sm:pb-14">
          <p className="text-kicker text-foam">Costa · Condado · Sierra</p>
          <h1 className="mt-3 font-display text-display leading-display tracking-display text-iron-fg">
            La mesa
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
        <p className="max-w-2xl text-xl leading-relaxed">
          Huelva se come en tres geografías. El mar, la tierra llana, la dehesa.
          Seis sellos de calidad. Una sola provincia.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {(["all", ...MESA_TERRITORIOS.map((t) => t.id)] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setTerritorio(id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm",
                territorio === id ? "bg-iron text-iron-fg" : "bg-paper text-muted shadow-border",
              )}
            >
              {id === "all" ? "Toda la mesa" : MESA_TERRITORIOS.find((t) => t.id === id)?.name}
            </button>
          ))}
        </div>

        <ul className="mt-14 divide-y divide-line border-y border-line">
          {items.map((p) => (
            <li key={p.id} className="grid gap-4 py-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="text-kicker text-tinto">
                  {MESA_TERRITORIOS.find((t) => t.id === p.territorio)?.name}
                  {p.sello ? ` · ${p.sello}` : ""}
                </p>
                <h2 className="mt-2 font-display text-3xl tracking-tight">{p.name}</h2>
                {p.latin ? <p className="mt-1 text-sm italic text-faint">{p.latin}</p> : null}
              </div>
              <div className="space-y-3 text-muted md:col-span-8">
                <p>{p.note}</p>
                <p>
                  <span className="text-kicker text-tinto">Cuándo · </span>
                  {p.when}
                </p>
                <p>
                  <span className="text-kicker text-tinto">Cómo · </span>
                  {p.how}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <section className="mt-20">
          <p className="text-kicker text-tinto">Sellos reales</p>
          <h2 className="mt-3 font-display text-edition tracking-tight">Lo que está escrito</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SELLOS.map((s) => (
              <li key={s.name} className="border-t border-line pt-4">
                <p className="font-display text-xl tracking-tight">{s.name}</p>
                <p className="mt-2 text-sm text-muted">{s.what}</p>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-16">
          <Link to="/g/$id" params={{ id: "carta" }} className="text-tide hover:underline">
            Abrir la carta de la lonja →
          </Link>
        </p>
      </div>
    </main>
  );
}
