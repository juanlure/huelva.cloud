import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RECURSOS, RECURSO_KIND_LABEL, type RecursoKind } from "@/data/recursos";
import { cn } from "@/lib/utils";
import { seoHead } from "@/lib/seo";

const KINDS: Array<RecursoKind | "all"> = ["all", "mar", "sierra", "camino", "ciudad", "urgencia"];

export const Route = createFileRoute("/recursos")({
  component: RecursosPage,
  head: () =>
    seoHead({
      title: "Recursos oficiales de Huelva: AEMET, DGT, Doñana, 112",
      description:
        "Enlaces oficiales de Huelva: AEMET, DGT, Parque Nacional de Doñana, Puerto, 112. La guía no sustituye a la fuente.",
      path: "/recursos",
    }),
});

function RecursosPage() {
  const [kind, setKind] = useState<RecursoKind | "all">("all");
  const list = useMemo(
    () => (kind === "all" ? RECURSOS : RECURSOS.filter((r) => r.kind === kind)),
    [kind],
  );

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-8 sm:py-20">
      <p className="text-kicker text-tinto">La caja de herramientas</p>
      <h1 className="mt-4 font-display text-display leading-display tracking-display">
        Recursos
      </h1>
      <p className="mt-4 max-w-2xl text-muted leading-relaxed">
        Enlaces oficiales. El parte, el puerto, Doñana, el 112. Sin pixel, sin
        intermediario. Si el dato importa, ve a la fuente.
      </p>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
        {KINDS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setKind(item)}
            className={cn(
              "rounded-full px-4 py-2 text-sm transition-colors",
              kind === item ? "bg-iron text-iron-fg" : "bg-paper text-muted shadow-border hover:text-ink",
            )}
          >
            {item === "all" ? "Todo" : RECURSO_KIND_LABEL[item]}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-3 md:grid-cols-2">
        {list.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              rel="noreferrer"
              className="group flex h-full flex-col rounded-xl bg-paper p-5 shadow-border transition-shadow hover:ring-1 hover:ring-tide/40"
            >
              <div className="flex items-center gap-2">
                <Badge variant="muted">{RECURSO_KIND_LABEL[item.kind]}</Badge>
                {item.official ? <span className="text-xs text-faint">Oficial</span> : null}
              </div>
              <h2 className="mt-3 font-display text-xl tracking-tight group-hover:text-tide">
                {item.name}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.dek}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-tide">
                Abrir fuente
                <ExternalLink className="size-3.5" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
