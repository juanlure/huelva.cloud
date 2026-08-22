import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/wordmark";
import { SITE } from "@/lib/brand";

const PRIMARY = [
  { to: "/guides" as const, label: "Guías" },
  { to: "/mesa" as const, label: "Mesa" },
  { to: "/historia" as const, label: "Onuba" },
  { to: "/pulse" as const, label: "Ahora" },
  { to: "/que-ver" as const, label: "Qué ver" },
  { to: "/recursos" as const, label: "Fuentes" },
];

const HOUSE = [
  { to: "/sobre" as const, label: "Sobre" },
  { to: "/redaccion" as const, label: "Redacción" },
  { to: "/ai-disclosure" as const, label: "IA" },
  { to: "/legal" as const, label: "Aviso" },
  { to: "/privacy" as const, label: "Privacidad" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-iron text-iron-fg">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-lg">
            <Wordmark className="text-5xl sm:text-6xl" asLink={false} inverted />
            <p className="mt-6 text-base leading-relaxed text-iron-fg/70">
              La Costa de la Luz, bien escrita. Gamba de cristal, Doñana,
              Palos, Riotinto, Jabugo.
            </p>
          </div>
          <p className="font-display text-edition italic leading-tight text-tinto">
            Atlántico, en mayúscula.
            <br />
            Esta es.
          </p>
        </div>

        <nav className="mt-16 grid gap-10 border-t border-iron-fg/10 pt-10 sm:grid-cols-2">
          <div>
            <p className="text-kicker text-tinto">La provincia</p>
            <ul className="mt-5 flex flex-col gap-3">
              {PRIMARY.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-iron-fg/75 hover:text-iron-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-kicker text-tinto">La casa</p>
            <ul className="mt-5 flex flex-col gap-3">
              {HOUSE.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-iron-fg/75 hover:text-iron-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="/feed.xml" className="text-iron-fg/75 hover:text-iron-fg">
                  RSS
                </a>
              </li>
              <li>
                <a href={SITE.github} rel="noreferrer me" className="text-iron-fg/75 hover:text-iron-fg">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <p className="mt-16 text-kicker text-iron-fg/40">{SITE.host}</p>
      </div>
    </footer>
  );
}
