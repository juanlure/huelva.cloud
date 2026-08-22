import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/wordmark";
import { SITE } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-iron text-iron-fg">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-lg">
            <Wordmark className="text-5xl sm:text-6xl" asLink={false} inverted />
            <p className="mt-6 text-base leading-relaxed text-iron-fg/70">
              La Costa de la Luz, la ría y la sierra. Gamba, Doñana, Colón y
              un daemon que cuida la edición. Huelva, escrita en serio.
            </p>
          </div>
          <p className="font-display text-edition italic leading-tight text-tinto">
            Atlántico, en mayúscula.
            <br />
            Esta es.
          </p>
        </div>
        <div className="mt-16 flex flex-wrap gap-x-6 gap-y-3 border-t border-iron-fg/10 pt-8 text-kicker text-iron-fg/55">
          <Link to="/que-ver" className="hover:text-iron-fg">Qué ver</Link>
          <Link to="/temas" className="hover:text-iron-fg">Temas</Link>
          <Link to="/sobre" className="hover:text-iron-fg">Sobre</Link>
          <Link to="/recursos" className="hover:text-iron-fg">Recursos</Link>
          <Link to="/agenda" className="hover:text-iron-fg">Agenda</Link>
          <Link to="/test" className="hover:text-iron-fg">Test</Link>
          <Link to="/redaccion" className="hover:text-iron-fg">Redacción</Link>
          <Link to="/ai-disclosure" className="hover:text-iron-fg">IA</Link>
          <a href="/feed.xml" className="hover:text-iron-fg">RSS</a>
          <Link to="/legal" className="hover:text-iron-fg">Aviso</Link>
          <Link to="/privacy" className="hover:text-iron-fg">Privacidad</Link>
          <a href={SITE.github} rel="noreferrer" className="hover:text-iron-fg">GitHub</a>
          <Link to="/login" className="hover:text-iron-fg/80">Mesa</Link>
        </div>
      </div>
    </footer>
  );
}
