import { useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StopMap } from "@/components/stop-map";
import { useChecked } from "@/lib/checked";
import { cn } from "@/lib/utils";
import {
  buildMarea,
  ALMANAQUE,
  CAFE_BREAD,
  CAFE_DRINKS,
  cafePhrase,
  cartaAdvice,
  CARTA_PLACES,
  CARTA_WANT,
  COLON_STOPS,
  CUENCA_STOPS,
  DESTINOS,
  DONANA_PATHS,
  DONANA_SEASONS,
  GAMBA_SPECIES,
  OCASO_SPOTS,
  PLAYAS,
  SLANG,
  type MareaDays,
  type MareaFlavor,
  type MareaPace,
  type PlanStop,
  type PlayaTag,
} from "@/data/live-guides";

function Chip({
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
        "min-h-11 border-b py-3 text-kicker transition-colors",
        active ? "border-tinto text-tinto" : "border-transparent text-muted hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function StopRow({
  stop,
  done,
  onToggle,
}: {
  stop: PlanStop;
  done: boolean;
  onToggle: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "flex w-full items-start gap-4 border-b border-line py-4 text-left transition-colors",
          done ? "opacity-50" : "hover:text-tinto",
        )}
      >
        <span
          className={cn(
            "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full",
            done ? "bg-tinto text-tinto-fg" : "bg-line text-faint",
          )}
        >
          <Check className="size-3.5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-2">
            <span className="font-display text-lg tracking-tight">{stop.title}</span>
            <span className="text-xs uppercase tracking-wide text-tide">{stop.slot}</span>
            <span className="text-xs text-faint">{stop.minutes} min</span>
            {stop.car ? <Badge variant="muted">Coche</Badge> : null}
          </span>
          <span className="mt-1 block text-sm leading-relaxed text-muted">{stop.note}</span>
        </span>
      </button>
    </li>
  );
}

export function MareaGuide() {
  const [days, setDays] = useState<MareaDays>(2);
  const [pace, setPace] = useState<MareaPace>("mixto");
  const [flavor, setFlavor] = useState<MareaFlavor>("ria");
  const plan = useMemo(() => buildMarea(days, pace, flavor), [days, pace, flavor]);
  const key = `marea-${days}-${pace}-${flavor}`;
  const checked = useChecked(key);
  const [dayIdx, setDayIdx] = useState(0);
  const day = plan[Math.min(dayIdx, plan.length - 1)]!;
  const stops = day.stops;
  const doneCount = stops.filter((s) => checked.has(s.id)).length;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div>
        <p className="text-kicker text-tinto">Días</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {([1, 2, 3] as const).map((n) => (
            <Chip key={n} active={days === n} onClick={() => { setDays(n); setDayIdx(0); }}>
              {n} {n === 1 ? "día" : "días"}
            </Chip>
          ))}
        </div>
        <p className="mt-6 text-kicker text-tinto">Ritmo</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Chip active={pace === "pie"} onClick={() => setPace("pie")}>A pie</Chip>
          <Chip active={pace === "mixto"} onClick={() => setPace("mixto")}>Mixto</Chip>
          <Chip active={pace === "coche"} onClick={() => setPace("coche")}>Coche</Chip>
        </div>
        <p className="mt-6 text-kicker text-tinto">Sabor</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Chip active={flavor === "ria"} onClick={() => setFlavor("ria")}>Ría y ciudad</Chip>
          <Chip active={flavor === "playa"} onClick={() => setFlavor("playa")}>Playa</Chip>
          <Chip active={flavor === "colon"} onClick={() => setFlavor("colon")}>Colón</Chip>
          <Chip active={flavor === "sierra"} onClick={() => setFlavor("sierra")}>Sierra</Chip>
        </div>
        {pace === "pie" && (flavor === "colon" || flavor === "sierra") ? (
          <p className="mt-4 text-sm text-warn">
            Colón y la sierra piden coche. Elige mixto y te abrimos la provincia.
          </p>
        ) : null}
      </div>
      <div>
        <div className="flex flex-wrap gap-2">
          {plan.map((d, i) => (
            <Chip key={d.label} active={dayIdx === i} onClick={() => setDayIdx(i)}>
              {d.label}
            </Chip>
          ))}
        </div>
        <p className="mt-3 text-sm text-faint">
          {doneCount}/{stops.length} paradas · toca para tachar
        </p>
        <div className="mt-3">
          <StopMap
            stops={stops.map((s) => ({ id: s.id, name: s.title, lat: s.lat, lng: s.lng, blurb: s.note }))}
          />
        </div>
        <ol className="mt-4 grid gap-2">
          {stops.map((stop) => (
            <StopRow
              key={stop.id}
              stop={stop}
              done={checked.has(stop.id)}
              onToggle={() => checked.toggle(stop.id)}
            />
          ))}
        </ol>
        <button type="button" onClick={checked.reset} className="mt-3 text-sm text-faint hover:text-ink">
          Empezar de cero
        </button>
      </div>
    </div>
  );
}

export function CartaGuide() {
  const [place, setPlace] = useState("capital");
  const [want, setWant] = useState("plancha");
  const [open, setOpen] = useState<string | null>("gamba");
  const advice = cartaAdvice(place, want);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <p className="text-kicker text-tinto">Estoy en</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {CARTA_PLACES.map((p) => (
            <Chip key={p.id} active={place === p.id} onClick={() => setPlace(p.id)}>
              {p.label}
            </Chip>
          ))}
        </div>
        <p className="mt-6 text-kicker text-tinto">Quiero</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {CARTA_WANT.map((w) => (
            <Chip key={w.id} active={want === w.id} onClick={() => setWant(w.id)}>
              {w.label}
            </Chip>
          ))}
        </div>
        <div className="mt-8 rounded-lg bg-iron px-6 py-8 text-iron-fg">
          <p className="text-kicker text-tinto">Dile esto</p>
          <p className="mt-3 font-display text-3xl leading-snug tracking-tight">{advice.say}</p>
          <p className="mt-5 text-sm text-iron-fg/70">{advice.where}</p>
          <p className="mt-2 text-sm text-iron-fg/70">Evita: {advice.skip}</p>
        </div>
      </div>
      <ul className="grid gap-2">
        {GAMBA_SPECIES.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => setOpen(open === s.id ? null : s.id)}
              className="w-full border-b border-line py-5 text-left"
            >
              <span className="font-display text-xl tracking-tight">{s.name}</span>
              {open === s.id ? (
                <span className="mt-2 block space-y-1 text-sm leading-relaxed text-muted">
                  <span className="block">{s.when}</span>
                  <span className="block text-ink">{s.order}</span>
                  <span className="block text-warn">{s.flag}</span>
                  <span className="block">{s.pair}</span>
                </span>
              ) : (
                <span className="mt-1 block text-sm text-faint">Abrir ficha</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function KitGuide() {
  const [dest, setDest] = useState<(typeof DESTINOS)[number]>(DESTINOS[0]!);
  const [word, setWord] = useState<string | null>(null);

  return (
    <div className="grid gap-10">
      <section>
        <h2 className="font-display text-2xl tracking-tight">¿Adónde vas?</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {DESTINOS.map((d) => (
            <Chip key={d.id} active={dest.id === d.id} onClick={() => setDest(d)}>
              {d.name}
            </Chip>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-paper p-5 shadow-border">
          <p className="text-kicker text-tinto">{dest.time}</p>
          <p className="mt-2 text-base leading-relaxed text-ink">{dest.how}</p>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-paper p-5 shadow-border">
          <p className="text-kicker text-tinto">Comida</p>
          <p className="mt-2 font-display text-3xl tracking-tight">14:00</p>
          <p className="mt-1 text-sm text-muted">No a las 13:00. El camarero no está listo y tú pareces de paso.</p>
        </div>
        <div className="rounded-xl bg-paper p-5 shadow-border">
          <p className="text-kicker text-tinto">Cena</p>
          <p className="mt-2 font-display text-3xl tracking-tight">21:30</p>
          <p className="mt-1 text-sm text-muted">Los chiringuitos se adelantan un poco. La ciudad, no.</p>
        </div>
        <div className="rounded-xl bg-paper p-5 shadow-border">
          <p className="text-kicker text-tinto">Domingo tarde</p>
          <p className="mt-2 font-display text-3xl tracking-tight">Apagada</p>
          <p className="mt-1 text-sm text-muted">La capital se cierra. La costa, no. Elige orilla.</p>
        </div>
      </section>
      <section>
        <h2 className="font-display text-2xl tracking-tight">Palabras</h2>
        <p className="mt-1 text-sm text-muted">Toca para el sentido. No las estrenes en el primer café.</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {SLANG.map((s) => (
            <li key={s.word}>
              <button
                type="button"
                onClick={() => setWord(word === s.word ? null : s.word)}
                className="w-full border-b border-line py-5 text-left"
              >
                <span className="font-display text-lg tracking-tight">{s.word}</span>
                {word === s.word ? (
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{s.sense}</span>
                ) : (
                  <span className="mt-1 block text-sm text-faint">Revelar</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function RabidaGuide() {
  const checked = useChecked("colon-camino");
  const active = COLON_STOPS.find((s) => !checked.has(s.id)) ?? COLON_STOPS.at(-1);
  const done = COLON_STOPS.filter((s) => checked.has(s.id)).length;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div>
        <p className="text-sm text-faint">
          {done}/{COLON_STOPS.length} · medio día con coche. Sin coche, quédate en el muelle.
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-line">
          <div
            className={cn(
              "h-full bg-tide transition-all",
              ["w-0", "w-1/5", "w-2/5", "w-3/5", "w-4/5", "w-full"][done] ?? "w-full",
            )}
          />
        </div>
        <ol className="mt-4 grid gap-2">
          {COLON_STOPS.map((stop) => (
            <StopRow
              key={stop.id}
              stop={stop}
              done={checked.has(stop.id)}
              onToggle={() => checked.toggle(stop.id)}
            />
          ))}
        </ol>
      </div>
      <div>
        <StopMap
          stops={COLON_STOPS.map((s) => ({
            id: s.id,
            name: s.title,
            lat: s.lat,
            lng: s.lng,
            blurb: s.note,
          }))}
          activeId={active?.id}
        />
        {active ? (
          <p className="mt-4 rounded-xl bg-paper p-4 text-sm leading-relaxed text-muted shadow-border">
            Ahora: <span className="font-medium text-ink">{active.title}.</span> {active.note}
          </p>
        ) : null}
      </div>
    </div>
  );
}

const PLAYA_FILTERS: { id: PlayaTag; label: string }[] = [
  { id: "familias", label: "Familias" },
  { id: "chiringuito", label: "Chiringuito" },
  { id: "duna", label: "Duna" },
  { id: "lonja", label: "Lonja" },
  { id: "quieta", label: "Quieta" },
];

export function OrillaGuide() {
  const [wind, setWind] = useState<"levante" | "poniente" | "calma">("calma");
  const [filters, setFilters] = useState<PlayaTag[]>([]);
  const list = PLAYAS.filter((p) => filters.every((f) => p.tags.includes(f)));
  const pick =
    wind === "levante"
      ? PLAYAS.find((p) => p.id === "mazagon")
      : wind === "poniente"
        ? PLAYAS.find((p) => p.id === "elportil")
        : list[0];

  return (
    <div>
      <p className="text-kicker text-tinto">El viento de hoy</p>
      <div className="mt-2 flex flex-wrap gap-2">
        <Chip active={wind === "calma"} onClick={() => setWind("calma")}>Calma / no sé</Chip>
        <Chip active={wind === "levante"} onClick={() => setWind("levante")}>Levante</Chip>
        <Chip active={wind === "poniente"} onClick={() => setWind("poniente")}>Poniente</Chip>
      </div>
      <p className="mt-6 text-kicker text-tinto">Filtros</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {PLAYA_FILTERS.map((f) => (
          <Chip
            key={f.id}
            active={filters.includes(f.id)}
            onClick={() =>
              setFilters((prev) =>
                prev.includes(f.id) ? prev.filter((x) => x !== f.id) : [...prev, f.id],
              )
            }
          >
            {f.label}
          </Chip>
        ))}
      </div>
      {pick ? (
        <p className="mt-6 rounded-lg bg-iron px-5 py-5 text-iron-fg">
          Hoy, con este viento: <span className="font-display text-2xl">{pick.name}.</span>{" "}
          {pick.wind}
        </p>
      ) : null}
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {list.map((p) => (
          <li key={p.id} className="overflow-hidden rounded-xl bg-paper shadow-border">
            <img src={p.image} alt="" className="aspect-video w-full object-cover" />
            <div className="p-5">
              <h2 className="font-display text-2xl tracking-tight">{p.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.dek}</p>
              <p className="mt-2 text-sm text-tide">{p.wind}</p>
            </div>
          </li>
        ))}
      </ul>
      {list.length === 0 ? (
        <p className="mt-6 text-muted">Esa combinación no existe en esta costa. Suelta un filtro.</p>
      ) : null}
      <div className="mt-6">
        <StopMap stops={list.map((p) => ({ id: p.id, name: p.name, lat: p.lat, lng: p.lng, blurb: p.dek }))} />
      </div>
    </div>
  );
}

export function MarismaGuide() {
  const [season, setSeason] = useState<(typeof DONANA_SEASONS)[number]>(DONANA_SEASONS[0]!);
  const checked = useChecked("donana-path");

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <p className="text-kicker text-tinto">Época</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {DONANA_SEASONS.map((s) => (
            <Chip key={s.id} active={season.id === s.id} onClick={() => setSeason(s)}>
              {s.label}
            </Chip>
          ))}
        </div>
        <p className="mt-4 rounded-xl bg-paper p-5 text-sm leading-relaxed text-muted shadow-border">
          {season.note}
        </p>
        <ul className="mt-6 space-y-2 text-sm text-ink">
          <li>Permanece en la senda. El parque se cuida así.</li>
          <li>Sin drones. La fauna manda.</li>
          <li>Agua, sombrero, madrugón en verano.</li>
          <li>El Rocío en romería es un país; un martes, otro. Elige el que buscas.</li>
        </ul>
      </div>
      <div>
        <StopMap stops={DONANA_PATHS.map((p) => ({ id: p.id, name: p.title, lat: p.lat, lng: p.lng, blurb: p.note }))} />
        <ol className="mt-4 grid gap-2">
          {DONANA_PATHS.map((p) => (
            <StopRow
              key={p.id}
              stop={{
                id: p.id,
                title: p.title,
                slot: "Ruta",
                minutes: 90,
                note: p.note,
                lat: p.lat,
                lng: p.lng,
                car: true,
              }}
              done={checked.has(p.id)}
              onToggle={() => checked.toggle(p.id)}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

export function CafeGuide() {
  const [drink, setDrink] = useState<(typeof CAFE_DRINKS)[number]["id"]>("leche");
  const [bread, setBread] = useState<(typeof CAFE_BREAD)[number]["id"]>("manteca");
  const phrase = cafePhrase(drink, bread);

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="text-kicker text-tinto">Bebida</p>
        <div className="mt-2 flex flex-wrap gap-x-4">
          {CAFE_DRINKS.map((d) => (
            <Chip key={d.id} active={drink === d.id} onClick={() => setDrink(d.id)}>
              {d.label}
            </Chip>
          ))}
        </div>
        <p className="mt-8 text-kicker text-tinto">Tostada</p>
        <div className="mt-2 flex flex-wrap gap-x-4">
          {CAFE_BREAD.map((b) => (
            <Chip key={b.id} active={bread === b.id} onClick={() => setBread(b.id)}>
              {b.label}
            </Chip>
          ))}
        </div>
      </div>
      <div className="bg-iron px-6 py-10 text-iron-fg sm:px-8 lg:col-span-7">
        <p className="text-kicker text-tinto">Dile esto</p>
        <p className="mt-3 font-display text-edition leading-tight tracking-tight">{phrase.say}</p>
        <p className="mt-6 max-w-md text-sm text-foam">{phrase.where}</p>
        <p className="mt-2 max-w-md text-sm text-foam">{phrase.note}</p>
      </div>
    </div>
  );
}

export function OcasoGuide() {
  const [tag, setTag] = useState<"all" | "capital" | "costa" | "frontera">("all");
  const list = tag === "all" ? OCASO_SPOTS : OCASO_SPOTS.filter((s) => s.tag === tag);
  const [active, setActive] = useState(OCASO_SPOTS[0]!.id);
  const spot = list.find((s) => s.id === active) ?? list[0] ?? OCASO_SPOTS[0]!;

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="flex flex-wrap gap-x-4">
          {(["all", "capital", "costa", "frontera"] as const).map((t) => (
            <Chip
              key={t}
              active={tag === t}
              onClick={() => {
                setTag(t);
                const next = t === "all" ? OCASO_SPOTS[0] : OCASO_SPOTS.find((s) => s.tag === t);
                if (next) setActive(next.id);
              }}
            >
              {t === "all" ? "Todos" : t === "capital" ? "Capital" : t === "costa" ? "Costa" : "Frontera"}
            </Chip>
          ))}
        </div>
        <ol className="mt-8">
          {list.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setActive(s.id)}
                className={cn(
                  "w-full border-b border-line py-5 text-left",
                  active === s.id && "text-tinto",
                )}
              >
                <span className="font-display text-xl tracking-tight">{s.title}</span>
                <span className="mt-1 block text-sm text-muted">{s.area}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="lg:col-span-7">
        <StopMap stops={[{ id: spot.id, name: spot.title, lat: spot.lat, lng: spot.lng, blurb: spot.note }]} />
        <p className="mt-6 text-kicker text-tinto">{spot.when}</p>
        <p className="mt-3 max-w-lg font-display text-edition leading-tight tracking-tight">{spot.note}</p>
      </div>
    </div>
  );
}

export function CuencaGuide() {
  const checked = useChecked("cuenca");
  const done = CUENCA_STOPS.filter((s) => checked.has(s.id)).length;
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="text-kicker text-tinto">
          {done} / {CUENCA_STOPS.length} · un día, sin playa
        </p>
        <ol className="mt-6">
          {CUENCA_STOPS.map((stop) => (
            <StopRow
              key={stop.id}
              stop={stop}
              done={checked.has(stop.id)}
              onToggle={() => checked.toggle(stop.id)}
            />
          ))}
        </ol>
      </div>
      <div className="lg:col-span-7">
        <StopMap
          stops={CUENCA_STOPS.map((s) => ({
            id: s.id,
            name: s.title,
            lat: s.lat,
            lng: s.lng,
            blurb: s.note,
          }))}
        />
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Coche. Agua. Calzado cerrado. El rojo mancha y merece la pena. No lo
          combines con baño el mismo día: son dos Huelvas.
        </p>
      </div>
    </div>
  );
}

export function AlmanaqueGuide() {
  const now = new Date().getMonth();
  const [open, setOpen] = useState(ALMANAQUE[now]?.id ?? "09");
  const month = ALMANAQUE.find((m) => m.id === open) ?? ALMANAQUE[8]!;

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <ol className="lg:col-span-4">
        {ALMANAQUE.map((m) => (
          <li key={m.id}>
            <button
              type="button"
              onClick={() => setOpen(m.id)}
              className={cn(
                "flex w-full items-baseline justify-between border-b border-line py-3 text-left",
                open === m.id ? "text-tinto" : "text-ink hover:text-tinto",
              )}
            >
              <span className="font-display text-xl tracking-tight">{m.month}</span>
              <span className="text-kicker text-faint">{m.id}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="lg:col-span-8">
        <p className="text-kicker text-tinto">Este mes</p>
        <h2 className="mt-3 font-display text-display leading-display tracking-display">{month.month}</h2>
        <dl className="mt-10 grid gap-8 sm:grid-cols-3">
          <div>
            <dt className="text-kicker text-faint">Mesa</dt>
            <dd className="mt-2 font-display text-2xl leading-snug tracking-tight">{month.table}</dd>
          </div>
          <div>
            <dt className="text-kicker text-faint">Luz</dt>
            <dd className="mt-2 font-display text-2xl leading-snug tracking-tight">{month.light}</dd>
          </div>
          <div>
            <dt className="text-kicker text-faint">Rito</dt>
            <dd className="mt-2 font-display text-2xl leading-snug tracking-tight">{month.rite}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export function GuideFooter({ articleSlug }: { articleSlug: string }) {
  return (
    <p className="mt-10 flex flex-wrap items-center gap-3 text-sm text-muted">
      <Navigation className="size-4 text-tide" />
      Si quieres la versión para leer en el tren:
      <Button asChild variant="outline" size="sm">
        <Link to="/p/$slug" params={{ slug: articleSlug }}>
          Abrir el texto
        </Link>
      </Button>
    </p>
  );
}
