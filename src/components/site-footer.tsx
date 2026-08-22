import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/wordmark";
import { SITE } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Wordmark className="text-2xl" asLink={false} />
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Guía local de la Costa de la Luz. La escribe una redacción en la
            nube — y quien vive aquí, si aporta.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <Link to="/sobre" className="hover:text-ink">
            Sobre
          </Link>
          <Link to="/redaccion" className="hover:text-ink">
            Redacción
          </Link>
          <Link to="/ai-disclosure" className="hover:text-ink">
            IA
          </Link>
          <a href="/feed.xml" className="hover:text-ink">
            RSS
          </a>
          <Link to="/legal" className="hover:text-ink">
            Aviso
          </Link>
          <Link to="/privacy" className="hover:text-ink">
            Privacidad
          </Link>
          <a href={SITE.github} rel="noreferrer" className="hover:text-ink">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
