import { useEffect, useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getMesaAccess, getNewsroomStatus, runEditorialCycle } from "@/lib/server/newsroom";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/redaccion")({
  loader: () => getNewsroomStatus(),
  component: RedaccionPage,
  head: () =>
    seoHead({
      title: "Redacción Huelva.cloud: el daemon, las plumas, el rastro",
      description:
        "La redacción autónoma de Huelva.cloud. Un daemon decide, publica y deja rastro. El medio de la Costa de la Luz, por dentro.",
      path: "/redaccion",
    }),
});

function RedaccionPage() {
  const initial = Route.useLoaderData();
  const router = useRouter();
  const [status, setStatus] = useState(initial);
  const [pending, setPending] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    setStatus(initial);
  }, [initial]);

  useEffect(() => {
    if (!armed) return;
    const id = window.setInterval(() => {
      void wake();
    }, 8 * 60 * 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armed]);

  async function wake() {
    if (pending) return;
    setPending(true);
    try {
      const result = await runEditorialCycle();
      toast.message(result.decision);
      if (result.slug) {
        await router.invalidate();
        await router.navigate({
          to: "/p/$slug",
          params: { slug: result.slug },
        });
        return;
      }
      await router.invalidate();
      const next = await getNewsroomStatus();
      setStatus(next);
    } catch (err) {
      toast.message(err instanceof Error ? err.message : "La mesa no te reconoce.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-kicker text-tinto">
        El loop
      </p>
      <h1 className="mt-4 font-display text-display leading-display tracking-display">
        La redacción se ve. No se toca.
      </h1>
      <p className="mt-4 max-w-2xl text-muted leading-relaxed">
        Un daemon despierta, decide si publicar o esperar, respeta ventana y
        cuota. Tú ves el rastro. Operar la mesa no es de la calle.
      </p>

      {status.dbSource === "pglite" && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-950/20">
          <div className="flex items-start gap-3">
            <Badge className="mt-0.5 border-amber-300 bg-amber-100 text-amber-900 dark:border-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
              Base de datos en memoria
            </Badge>
            <p className="text-sm text-amber-900 dark:text-amber-100">
              La mesa no persiste. Las ideas, aportes y votos viven solo en esta instancia. 
              Falta Postgres real. La configuración va en Vercel, no en el repo.
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Stat kicker="Decisión" value={status.lastDecision} />
        <Stat kicker="Cuota de hoy" value={`${status.publishesToday} / ${status.quota}`} />
        <Stat
          kicker="Ventana 8:00–23:00"
          value={status.windowOpen ? `Abierta (${status.hour}:00)` : `Cerrada (${status.hour}:00)`}
        />
      </div>

      <SignedOut>
        <p className="mt-6 text-sm text-faint">
          {status.backlogOpen} ideas en cola. El daemon no se despierta con un
          clic de visitante.
        </p>
      </SignedOut>
      <SignedIn>
        <MesaControls
          pending={pending}
          armed={armed}
          backlog={status.backlogOpen}
          onWake={() => void wake()}
          onArm={() => {
            setArmed((v) => !v);
            toast.message(
              !armed
                ? "Daemon en marcha. Un ciclo cada 8 minutos, máximo 3 al día."
                : "Daemon en pausa.",
            );
          }}
        />
      </SignedIn>

      <section className="mt-12">
        <h2 className="font-display text-2xl tracking-tight">La red</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {status.agents.map((agent) => (
            <li key={agent.name} className="rounded-xl bg-paper p-4 shadow-border">
              <div className="flex items-center justify-between gap-2">
                <p className="font-display text-lg tracking-tight">{agent.name}</p>
                <Badge variant="muted">{agent.title}</Badge>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{agent.beat}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl tracking-tight">Rastro</h2>
        <ol className="mt-4 divide-y divide-line rounded-xl bg-paper shadow-border">
          {status.logs.map((entry) => (
            <li key={entry.id} className="px-4 py-3 sm:px-5">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-xs font-medium uppercase tracking-wide text-tide">
                  {entry.agent}
                </span>
                <span className="text-xs text-faint">{formatDate(entry.at)}</span>
                <Badge variant="muted">{entry.action}</Badge>
              </div>
              <p className="mt-1 text-sm text-ink">{entry.detail}</p>
              {entry.publishedSlug ? (
                <Link
                  to="/p/$slug"
                  params={{ slug: entry.publishedSlug }}
                  className="mt-1 inline-block text-sm text-tide hover:underline"
                >
                  Leer pieza
                </Link>
              ) : null}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

function MesaControls({
  pending,
  armed,
  backlog,
  onWake,
  onArm,
}: {
  pending: boolean;
  armed: boolean;
  backlog: number;
  onWake: () => void;
  onArm: () => void;
}) {
  const { user, isPending } = useCurrentUserState();
  const [access, setAccess] = useState<{ canOperate: boolean; vacant: boolean } | null>(null);

  useEffect(() => {
    if (!user) return;
    void getMesaAccess()
      .then(setAccess)
      .catch(() => setAccess({ canOperate: false, vacant: false }));
  }, [user]);

  if (isPending || !user) return <div className="mt-6 h-12 animate-pulse rounded-xl bg-paper" />;
  if (!access?.canOperate) {
    return (
      <p className="mt-6 text-sm text-faint">
        Sesión vista. La mesa ya tiene operador. Puedes leer el rastro.
      </p>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <Button size="lg" disabled={pending} onClick={onWake}>
        {pending ? "Despertando…" : access.vacant ? "Tomar la mesa y despertar" : "Despertar al daemon"}
      </Button>
      <Button size="lg" variant={armed ? "default" : "outline"} onClick={onArm}>
        {armed ? "En marcha" : "Dejar en marcha"}
      </Button>
      <p className="text-sm text-faint">{backlog} ideas en cola · solo la mesa</p>
    </div>
  );
}

function Stat({ kicker, value }: { kicker: string; value: string }) {
  return (
    <div className="rounded-xl bg-paper p-4 shadow-border">
      <p className="text-xs font-medium uppercase tracking-wide text-tide">{kicker}</p>
      <p className={cn("mt-2 text-sm leading-snug text-ink")}>{value}</p>
    </div>
  );
}
