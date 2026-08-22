import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/wordmark";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/guides", label: "Guías" },
  { to: "/mesa", label: "Mesa" },
  { to: "/historia", label: "Onuba" },
  { to: "/pulse", label: "Ahora" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const home = pathname === "/";
  const floating = home && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out",
        floating
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line/80 bg-bg/85 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:h-20 sm:px-8">
        <div className="flex items-baseline gap-4">
          <Wordmark className="text-2xl sm:text-3xl" inverted={floating} />
          <span
            className={cn(
              "hidden text-kicker sm:inline",
              floating ? "text-foam/70" : "text-faint",
            )}
          >
            Nº 01
          </span>
        </div>

        <nav className="hidden items-center gap-7 xl:flex">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "text-kicker transition-colors duration-150",
                floating
                  ? "text-iron-fg/90 hover:text-iron-fg"
                  : "text-muted hover:text-ink",
                pathname === link.to && (floating ? "text-tinto-fg" : "text-tinto"),
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            size="sm"
            variant={floating ? "outline" : "default"}
            className={floating ? "border-foam/40 text-iron-fg hover:bg-iron-fg/10" : undefined}
          >
            <Link to="/aporta">Aporta</Link>
          </Button>
          <AuthChip />
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className={cn("xl:hidden", floating && "text-iron-fg hover:bg-iron-fg/10")}
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
                  "rounded-sm px-3 py-3 font-display text-2xl tracking-tight text-muted hover:text-ink",
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
    {!home ? <div className="h-16 sm:h-20" aria-hidden="true" /> : null}
    </>
  );
}

function AuthChip() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <div className="h-8 w-8 animate-pulse rounded-full bg-line" />;
  if (!user) return null;
  return <UserButton />;
}
