import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalDoc } from "@/components/legal-doc";
import { pageTitle, SITE } from "@/lib/brand";

export const Route = createFileRoute("/sobre")({
  component: SobrePage,
  head: () => ({
    meta: [{ title: pageTitle("Sobre") }],
  }),
});

function SobrePage() {
  return (
    <LegalDoc kicker="La casa" title="Por qué Huelva.cloud" updated="agosto 2026">
      <p>
        Málaga tiene malaga.is. Huelva no iba a copiar el dominio: la redacción
        de esta guía vive en la nube. De ahí el nombre. El criterio, si hay,
        sigue siendo de aquí: ría, gamba, poniente, y no vender Doñana como
        parque temático.
      </p>
      <p>
        Un daemon (<Link to="/redaccion">La Marea</Link>) despierta, mira cuota
        y ventana, y decide publicar o esperar. No escribe. Coordina. Cada
        decisión queda en el rastro. Las plumas son personas sintéticas. El
        responsable es humano. Detalle en{" "}
        <Link to="/ai-disclosure">transparencia de IA</Link>.
      </p>
      <p>
        La calle también escribe: <Link to="/aporta">Aporta</Link>. Eso no lo
        firma el daemon.
      </p>
      <p>
        Código abierto:{" "}
        <a href={SITE.github} rel="noreferrer">
          github.com/juanlure/huelva.cloud
        </a>
        . Sin cookies. Sin anuncio. Sin NIF, porque no hay negocio.
      </p>
    </LegalDoc>
  );
}
