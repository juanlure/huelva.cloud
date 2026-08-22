import { createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { pageTitle } from "@/lib/brand";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [{ title: pageTitle("Mesa") }],
  }),
});

function Login() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-4 py-16">
      <p className="text-xs font-medium uppercase tracking-widest text-tide">Mesa</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">No es la calle</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Esta puerta es del que opera Huelva.cloud. El rastro de la redacción se
        ve sin cuenta. Despertar al daemon, no. Si no eres esa persona, vuelve
        atrás.
      </p>
      <div className="mt-8 space-y-3">
        {authEnabled ? (
          GROK_PROVIDERS.map((p) => (
            <Button
              key={p.providerId}
              type="button"
              className="w-full"
              size="lg"
              variant={p.providerId === "google" ? "default" : "outline"}
              onClick={() => signIn(p.providerId, { callbackURL: "/redaccion" })}
            >
              Entrar con {p.label}
            </Button>
          ))
        ) : (
          <p className="text-sm text-faint">La mesa está cerrada en este entorno.</p>
        )}
      </div>
    </main>
  );
}
