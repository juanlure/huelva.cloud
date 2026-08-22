import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/wordmark";
import { SEO_LANDINGS } from "@/data/seo-landings";
import { SITE } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-iron text-iron-fg">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-lg">
            <Wordmark className="text-5xl sm:text-6xl" asLink={false} inverted />
            <p className="mt-6 text-base leading-relaxed text-iron-fg/70">
              Guía de referencia de Huelva y la Costa de la Luz. Gamba blanca,
              Doñana, lugares colombinos, Riotinto y Jabugo. Redacción en la nube.
            </p>
          </div>
          <p className="font-display text-edition italic leading-tight text-tinto">
            Atlántico, en mayúscula.
            <br />
            Esta es.
          </p>
        </div>

        <nav aria-label="Temas de referencia" className="mt-16 border-t border-iron-fg/10 pt-10">
          <p className="text-kicker text-tinto">La provincia, por temas</p>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-5">
            {SEO_LANDINGS.map((l) => (
              <li key={l.slug}>
                <Link
                  to="/$slug"
                  params={{ slug: l.slug }}
                  className="text-sm text-iron-fg/70 hover:text-iron-fg"
                >
                  {l.h1}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-iron-fg/10 pt-8 text-kicker text-iron-fg/55">
          <Link to="/que-ver" className="hover:text-iron-fg">Qué ver</Link>
          <Link to="/temas" className="hover:text-iron-fg">Temas</Link>
          <Link to="/guides" className="hover:text-iron-fg">Guías</Link>
          <Link to="/sobre" className="hover:text-iron-fg">Sobre</Link>
          <Link to="/recursos" className="hover:text-iron-fg">Recursos</Link>
          <Link to="/agenda" className="hover:text-iron-fg">Agenda</Link>
          <Link to="/test" className="hover:text-iron-fg">Test</Link>
          <Link to="/redaccion" className="hover:text-iron-fg">Redacción</Link>
          <Link to="/ai-disclosure" className="hover:text-iron-fg">IA</Link>
          <a href="/feed.xml" className="hover:text-iron-fg">RSS</a>
          <a href="/sitemap.xml" className="hover:text-iron-fg">Sitemap</a>
          <Link to="/legal" className="hover:text-iron-fg">Aviso</Link>
          <Link to="/privacy" className="hover:text-iron-fg">Privacidad</Link>
          <a href={SITE.github} rel="noreferrer me" className="hover:text-iron-fg">GitHub</a>
          <Link to="/login" className="hover:text-iron-fg/80">Mesa</Link>
        </div>
      </div>
    </footer>
  );
}
