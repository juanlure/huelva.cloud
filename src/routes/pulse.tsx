import { useMemo, useState, type ReactNode } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { PulseMap } from "@/components/pulse-map";
import { Badge } from "@/components/ui/badge";
import { VoteButton } from "@/components/vote-button";
import { listEvents, listPlaces, votePlace } from "@/lib/server/content";
import { getLivePulse } from "@/lib/server/live";
import { seoHead } from "@/lib/seo";
import { PLACE_KIND_LABEL, PLACE_KINDS, type PlaceKind } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TendenciasRail } from "@/components/tendencias";

export const Route = createFileRoute("/pulse")({
  loader: async () => {
    const [places, events, live] = await Promise.all([
      listPlaces(),
      listEvents(),
      getLivePulse(),
    ]);
    return { places, events, live };
  },
  component: PulsePage,
  head: () =>
    seoHead({
      title: "Huelva en vivo: tiempo, playas, cámaras DGT y mapa",
      description:
        "Pulso de Huelva: temperatura, viento, ocaso, cámaras de la DGT y el mapa de la provincia. Lo que está pasando ahora.",
      path: "/pulse",
      keywords: ["tiempo Huelva", "cámaras DGT Huelva", "playas Huelva hoy", "mapa Huelva"],
    }),
});

function PulsePage() {
  const { places, events, live } = Route.useLoaderData();
  const router = useRouter();
  const [kind, setKind] = useState<PlaceKind | "all">("all");
  const now = new Date();
  const hour = now.getHours();

  const moment =
    hour < 11
      ? "Mañana de mercado y café. El centro anda; la playa todavía bosteza."
      : hour < 16
        ? "Hora de mesa. Si es agosto, busca sombra y gamba, no prisa."
        : hour < 20
          ? "La marea de la tarde: Muelle del Tinto, flecha del Portil, El Conquero."
          : "Noche de terraza. La costa sigue; la capital se sienta.";

  const visible = useMemo(
    () => (kind === "all" ? places : places.filter((p) => p.kind === kind)),
    [places, kind],
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-kicker text-tinto">
        Huelva Pulse
      </p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">El pulso de la provincia</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Parte del cielo, ocaso, cámaras DGT y lo que se habla ahora en X y en
        los foros. El pulso de la provincia.
      </p>
      {live.advice ? (
        <Link
          to="/g/$id"
          params={{ id: live.advice.guide }}
          className="mt-6 block bg-iron px-5 py-5 text-iron-fg"
        >
          <span className="text-kicker text-tinto">{live.advice.title}</span>
          <span className="mt-2 block font-display text-2xl tracking-tight">
            {live.sun.past ? `Sol puesto a las ${live.sun.sunset}` : `Ocaso ${live.sun.sunset}`}
            {live.weather[0]?.tempC != null ? ` · ${live.weather[0].tempC}°` : ""}
          </span>
          <span className="mt-2 block text-sm text-foam">{live.advice.dek}</span>
        </Link>
      ) : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {live.weather.map((w) => (
          <PulseNote
            key={w.place}
            title={w.place}
            body={
              w.tempC == null
                ? w.desc
                : `${w.tempC} °C, ${w.windKmh ?? "—"} km/h. ${w.desc}.`
            }
          />
        ))}
        <PulseNote title="Ahora en la calle" body={moment} />
      </div>

      <div className="mt-8 overflow-hidden rounded-xl shadow-border">
        <PulseMap places={places} activeKind={kind} />
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        <KindChip active={kind === "all"} onClick={() => setKind("all")}>
          Todo
        </KindChip>
        {PLACE_KINDS.map((item) => (
          <KindChip key={item} active={kind === item} onClick={() => setKind(item)}>
            {PLACE_KIND_LABEL[item]}
          </KindChip>
        ))}
      </div>

      <ul className="mt-6 grid gap-3 md:grid-cols-2">
        {visible.map((place) => (
          <li
            key={place.id}
            className="flex items-start justify-between gap-3 rounded-xl bg-paper p-4 shadow-border"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-lg tracking-tight">{place.name}</h2>
                <Badge variant="muted">{PLACE_KIND_LABEL[place.kind]}</Badge>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted">{place.blurb}</p>
              {place.hours ? (
                <p className="mt-2 text-xs text-faint">{place.hours}</p>
              ) : null}
            </div>
            <VoteButton
              votes={place.votes}
              onVote={async () => {
                await votePlace({ data: { id: place.id } });
                await router.invalidate();
              }}
            />
          </li>
        ))}
      </ul>

      <section className="mt-12">
        <h2 className="font-display text-2xl tracking-tight">Cámaras DGT</h2>
        <p className="mt-2 text-sm text-muted">
          Imagen pública de tráfico. Si un JPEG no llega, la DGT a veces corta el
          hotlink. El dato, cuando existe, es de ahora.
        </p>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {live.cameras.map((cam) => (
            <li key={cam.id} className="overflow-hidden rounded-xl bg-paper shadow-border">
              <img
                src={cam.src}
                alt={cam.name}
                className="aspect-video w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="px-3 py-2">
                <p className="text-xs font-medium uppercase tracking-wide text-tide">{cam.road}</p>
                <p className="text-sm text-ink">{cam.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="-mx-4 sm:-mx-6">
        <TendenciasRail limit={6} />
      </div>

      {events.length ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight">En el calendario</h2>
          <ul className="mt-4 grid gap-3">
            {events.map((event) => (
              <li
                key={event.id}
                className="rounded-xl bg-paper p-4 shadow-border"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-tide">
                  {event.startsOn}
                  {event.endsOn && event.endsOn !== event.startsOn ? ` → ${event.endsOn}` : ""}
                </p>
                <h3 className="mt-1 font-display text-xl">{event.title}</h3>
                <p className="mt-1 text-sm text-muted">{event.dek}</p>
                <p className="mt-2 text-xs text-faint">{event.venue}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}

function PulseNote({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl bg-paper p-4 shadow-border">
      <p className="text-xs font-medium uppercase tracking-wide text-tide">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink">{body}</p>
    </div>
  );
}

function KindChip({
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
        "shrink-0 rounded-full px-3 py-2 text-sm",
        active ? "bg-iron text-iron-fg" : "bg-paper text-muted shadow-border",
      )}
    >
      {children}
    </button>
  );
}
