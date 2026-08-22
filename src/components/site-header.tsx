import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/wordmark";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/guides", label: "Guías" },
  { to: "/barrios", label: "Barrios" },
  { to: "/pulse", label: "Pulso" },
  { to: "/comer", label: "Comer" },
  { to: "/agenda", label: "Agenda" },
  { to: "/recursos", label: "Recursos" },
  { to: "/redaccion", label: "Redacción" },
  { to: "/test", label: "Test" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Wordmark className="text-xl" />

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "rounded-md px-3 py-2 text-sm text-muted transition-colors duration-150 hover:text-ink",
                pathname === link.to && "text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-2">
            <Link to="/aporta">Aporta</Link>
          </Button>
          <AuthChip />
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open ? (
        <nav className="border-t border-line bg-bg px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-3 text-base text-muted hover:bg-paper hover:text-ink",
                  pathname === link.to && "text-ink",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-2 w-full">
              <Link to="/aporta" onClick={() => setOpen(false)}>
                Aporta
              </Link>
            </Button>
            <div className="px-3 py-2">
              <AuthChip />
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function AuthChip() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <div className="h-8 w-8 animate-pulse rounded-full bg-line" />;
  if (!user) return null;
  return <UserButton />;
}
