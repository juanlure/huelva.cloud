import { useMemo, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BARRIOS,
  BARRIO_TAG_LABEL,
  type Barrio,
  type BarrioTag,
} from "@/data/barrios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/barrios")({
  component: BarriosPage,
  head: () =>
    seoHead({
      title: "Barrios y pueblos de Huelva: Conquero, Punta Umbría, Isla Cristina, Aracena",
      description:
        "Centro, El Conquero, Reina Victoria, Punta Umbría, Mazagón, Isla Cristina, Moguer, Palos y Sierra de Aracena. Dónde quedarse y qué pedir.",
      path: "/barrios",
      keywords: [
        "barrios de Huelva",
        "El Conquero",
        "Punta Umbría",
        "Isla Cristina",
        "Mazagón",
        "Aracena",
        "Moguer",
      ],
    }),
});

const TAGS = Object.keys(BARRIO_TAG_LABEL) as BarrioTag[];

function BarriosPage() {
  const [tag, setTag] = useState<BarrioTag | "all">("all");
  const [active, setActive] = useState<Barrio>(BARRIOS[0]!);

  const list = useMemo(
    () => (tag === "all" ? BARRIOS : BARRIOS.filter((b) => b.tags.includes(tag))),
    [tag],
  );

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-8 sm:py-20">
      <p className="text-kicker text-tinto">El mapa de onda</p>
      <h1 className="mt-4 font-display text-display leading-display tracking-display">
        Barrios
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Centro, Conquero, Reina Victoria, Punta, Mazagón, Isla Cristina… cada uno
        tiene su hora y su plato. Elige para qué vienes.
      </p>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        <FilterChip active={tag === "all"} onClick={() => setTag("all")}>
          Todos
        </FilterChip>
        {TAGS.map((item) => (
          <FilterChip key={item} active={tag === item} onClick={() => setTag(item)}>
            {BARRIO_TAG_LABEL[item]}
          </FilterChip>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {list.map((barrio) => (
            <li key={barrio.id}>
              <button
                type="button"
                onClick={() => setActive(barrio)}
                className={cn(
                  "w-full rounded-xl px-4 py-4 text-left shadow-border transition-colors duration-150",
                  active.id === barrio.id ? "bg-iron text-iron-fg" : "bg-paper text-ink hover:bg-foam",
                )}
              >
                <span className="block font-display text-lg tracking-tight">{barrio.name}</span>
                <span
                  className={cn(
                    "mt-1 block text-sm",
                    active.id === barrio.id ? "text-iron-fg/80" : "text-muted",
                  )}
                >
                  {barrio.area}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <article className="rounded-xl bg-paper p-6 shadow-border sm:p-8">
          <div className="flex flex-wrap gap-2">
            {active.tags.map((item) => (
              <Badge key={item}>{BARRIO_TAG_LABEL[item]}</Badge>
            ))}
          </div>
          <h2 className="mt-4 font-display text-3xl tracking-tight">{active.name}</h2>
          <p className="mt-4 leading-relaxed text-ink">{active.vibe}</p>
          <dl className="mt-6 space-y-4 text-sm leading-relaxed">
            <div>
              <dt className="font-medium text-tide">Dormir</dt>
              <dd className="mt-1 text-muted">{active.stay}</dd>
            </div>
            <div>
              <dt className="font-medium text-tide">Comer</dt>
              <dd className="mt-1 text-muted">{active.eat}</dd>
            </div>
            <div>
              <dt className="font-medium text-tide">El secreto</dt>
              <dd className="mt-1 text-muted">{active.secret}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/pulse">Ver en el pulso</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/guides">Guías</Link>
            </Button>
          </div>
        </article>
      </div>
    </main>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-3 py-2 text-sm transition-colors duration-150",
        active ? "bg-iron text-iron-fg" : "bg-paper text-muted shadow-border",
      )}
    >
      {children}
    </button>
  );
}
