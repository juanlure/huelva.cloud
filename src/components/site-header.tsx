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
  { to: "/pulse", label: "Pulso" },
  { to: "/comer", label: "Lonja" },
  { to: "/barrios", label: "Barrios" },
  { to: "/redaccion", label: "Redacción" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:h-20 sm:px-8">
        <Wordmark className="text-2xl sm:text-3xl" />

        <nav className="hidden items-center gap-7 xl:flex">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "text-kicker text-muted transition-colors duration-150 hover:text-ink",
                pathname === link.to && "text-tinto",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm">
            <Link to="/aporta">Aporta</Link>
          </Button>
          <AuthChip />
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="xl:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open ? (
        <nav className="border-t border-line bg-bg px-4 py-6 xl:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-3 font-display text-2xl tracking-tight text-muted hover:text-ink",
                  pathname === link.to && "text-tinto",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-4 w-full">
              <Link to="/aporta" onClick={() => setOpen(false)}>
                Aporta
              </Link>
            </Button>
            <div className="px-3 py-3">
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
