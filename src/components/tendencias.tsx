import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { TENDENCIAS, TENDENCIAS_AS_OF, type Tendencia } from "@/data/tendencias";
import type { LiveGuideId } from "@/data/live-guides";

function TendenciaHref({ item, children, className }: { item: Tendencia; children: ReactNode; className?: string }) {
  const l = item.link;
  if (l.to === "/g/$id") {
    return (
      <Link to="/g/$id" params={{ id: l.id as LiveGuideId }} className={className}>
        {children}
      </Link>
    );
  }
  if (l.to === "/$slug") {
    return (
      <Link to="/$slug" params={{ slug: l.slug }} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <Link to={l.to} className={className}>
      {children}
    </Link>
  );
}

export function TendenciasRail({ limit = 6 }: { limit?: number }) {
  const items = TENDENCIAS.slice(0, limit);
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
        <p className="text-kicker text-tinto">Lo que se habla · {TENDENCIAS_AS_OF}</p>
        <h2 className="mt-3 font-display text-edition tracking-tight">X, foros, la prensa de casa</h2>
        <p className="mt-3 max-w-xl text-muted">
          Síntesis editorial. No copiamos cuentas: apuntamos el tema y te
          llevamos a la guía.
        </p>
        <ol className="mt-10 divide-y divide-line border-y border-line">
          {items.map((item, i) => (
            <li key={item.id}>
              <TendenciaHref
                item={item}
                className="group grid gap-2 py-7 sm:grid-cols-12 sm:items-baseline"
              >
                <span className="text-kicker text-tinto sm:col-span-2">
                  {String(i + 1).padStart(2, "0")} · {item.heat}
                </span>
                <span className="sm:col-span-10">
                  <span className="block font-display text-2xl tracking-tight group-hover:text-tinto sm:text-3xl">
                    {item.title}
                  </span>
                  <span className="mt-2 block max-w-2xl text-muted">{item.dek}</span>
                  <span className="mt-2 block text-kicker text-faint">{item.where}</span>
                </span>
              </TendenciaHref>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
