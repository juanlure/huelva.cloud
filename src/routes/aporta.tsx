import { useState, type ReactNode } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { BARRIOS } from "@/data/barrios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  draftWithAi,
  publishArticle,
  publishEvent,
  publishPlace,
} from "@/lib/server/content";
import { CATEGORIES, CATEGORY_LABEL, PLACE_KINDS, PLACE_KIND_LABEL } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/aporta")({
  component: AportaPage,
  head: () => ({
    meta: [{ title: "Aporta · Huelva.cloud" }],
  }),
});

type Kind = "article" | "place" | "event";

function AportaPage() {
  const navigate = useNavigate();
  const [kind, setKind] = useState<Kind>("article");
  const [pending, setPending] = useState(false);
  const [aiPending, setAiPending] = useState(false);

  const [title, setTitle] = useState("");
  const [dek, setDek] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("community");
  const [neighborhood, setNeighborhood] = useState("centro");
  const [placeKind, setPlaceKind] = useState("comer");
  const [hours, setHours] = useState("");
  const [startsOn, setStartsOn] = useState("");
  const [venue, setVenue] = useState("");

  async function onPublish() {
    setPending(true);
    try {
      if (kind === "article") {
        const result = await publishArticle({
          data: { title, dek, body, category, neighborhood },
        });
        if (!result.ok) {
          toast.error(result.error);
          return;
        }
        toast.success("Publicado. Ya está en Lo último.");
        await navigate({
          to: "/p/$slug",
          params: { slug: result.slug },
          reloadDocument: true,
        });
        return;
      }
      if (kind === "place") {
        const result = await publishPlace({
          data: { name: title, kind: placeKind, blurb: body, neighborhood, hours },
        });
        if (!result.ok) {
          toast.error(result.error);
          return;
        }
        toast.success("El sitio ya está en el pulso.");
        await navigate({ to: "/pulse" });
        return;
      }
      const result = await publishEvent({
        data: { title, dek: body, startsOn, venue, neighborhood },
      });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Añadido a la agenda.");
      await navigate({ to: "/agenda" });
    } finally {
      setPending(false);
    }
  }

  async function onDraft() {
    setAiPending(true);
    try {
      const result = await draftWithAi({ data: { title, notes: body } });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setTitle(result.draft.title);
      setDek(result.draft.dek);
      setBody(result.draft.body);
      if (result.draft.category) setCategory(result.draft.category);
      if (result.draft.neighborhood) setNeighborhood(result.draft.neighborhood);
      toast.success("Borrador listo. Léelo y publica si te representa.");
    } finally {
      setAiPending(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
      <p className="text-kicker text-tinto">
        Autogestión
      </p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Aporta a Huelva.cloud</h1>
      <p className="mt-3 text-muted">
        Un sitio, un plato, una fiesta o una guía corta. Entra en el mapa y en Lo
        último. Sin cuentas. Sin comité. Si quieres, la redacción te lo deja en
        tono de la casa.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-2">
        {(
          [
            ["article", "Artículo"],
            ["place", "Sitio"],
            ["event", "Agenda"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setKind(id)}
            className={cn(
              "h-11 rounded-md text-sm font-medium",
              kind === id ? "bg-iron text-iron-fg" : "bg-paper text-muted shadow-border",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <form
        className="mt-8 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          void onPublish();
        }}
      >
        <Field label={kind === "place" ? "Nombre" : "Título"}>
          <Input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={140}
            placeholder={kind === "place" ? "Choco de la Ribera" : "Lo que hay que saber"}
          />
        </Field>

        {kind === "article" ? (
          <Field label="Entradilla">
            <Input
              value={dek}
              onChange={(e) => setDek(e.target.value)}
              maxLength={280}
              placeholder="Una frase que se pueda leer de pie."
            />
          </Field>
        ) : null}

        <Field
          label={
            kind === "article"
              ? "Texto"
              : kind === "place"
                ? "Por qué importa"
                : "Qué es"
          }
        >
          <Textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={8000}
            placeholder={
              kind === "article"
                ? "Cuenta el sitio, el plato, el truco. Sin adornos."
                : "Dos o tres frases honestas."
            }
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Zona">
            <select
              className="h-11 w-full rounded-md bg-paper px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            >
              {BARRIOS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </Field>

          {kind === "article" ? (
            <Field label="Sección">
              <select
                className="h-11 w-full rounded-md bg-paper px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {CATEGORY_LABEL[c]}
                  </option>
                ))}
              </select>
            </Field>
          ) : null}

          {kind === "place" ? (
            <Field label="Tipo">
              <select
                className="h-11 w-full rounded-md bg-paper px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]"
                value={placeKind}
                onChange={(e) => setPlaceKind(e.target.value)}
              >
                {PLACE_KINDS.map((k) => (
                  <option key={k} value={k}>
                    {PLACE_KIND_LABEL[k]}
                  </option>
                ))}
              </select>
            </Field>
          ) : null}

          {kind === "place" ? (
            <Field label="Horario (opcional)">
              <Input value={hours} onChange={(e) => setHours(e.target.value)} maxLength={80} />
            </Field>
          ) : null}

          {kind === "event" ? (
            <Field label="Fecha">
              <Input
                required
                type="date"
                value={startsOn}
                onChange={(e) => setStartsOn(e.target.value)}
              />
            </Field>
          ) : null}

          {kind === "event" ? (
            <Field label="Sitio">
              <Input
                required
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                maxLength={80}
              />
            </Field>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {kind === "article" ? (
            <Button type="button" variant="outline" disabled={aiPending} onClick={() => void onDraft()}>
              {aiPending ? "Redactando…" : "Redactar con IA"}
            </Button>
          ) : null}
          <Button type="submit" disabled={pending}>
            {pending ? "Publicando…" : "Publicar"}
          </Button>
        </div>
        <p className="text-xs text-faint">
          No hace falta nombre ni correo. El texto queda público en la guía.
        </p>
      </form>
    </main>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-2">
      <Label>{label}</Label>
      {children}
    </label>
  );
}
