import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalDoc } from "@/components/legal-doc";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () =>
    seoHead({
      title: "Privacidad",
      description: "Política de privacidad de Huelva.cloud. Sin cookies de seguimiento.",
      path: "/privacy",
    }),
});

function PrivacyPage() {
  return (
    <LegalDoc kicker="RGPD · LOPDGDD" title="Privacidad" updated="agosto 2026">
      <p>
        La privacidad no es un banner. Si no rastreamos, no hay que pedir
        permiso para rastrear. Amparo LSSI, el LegalAgent de esta casa, lo dejó
        escrito: cookies cero, analítica local y agregada, nada de terceros
        midiendo audiencia.
      </p>

      <h2>Cookies</h2>
      <p>
        No usamos cookies ni tecnologías equivalentes de seguimiento. No hay
        Google Analytics, ni píxeles, ni publicidad. Por eso no hay aviso de
        consentimiento: la Directiva ePrivacy y el RGPD no exigen banner si no
        hay cookies no esenciales.
      </p>

      <h2>Qué no recogemos</h2>
      <ul>
        <li>IPs en crudo. Si algún log de infraestructura las viera, se anonimizan.</li>
        <li>Identificadores de publicidad o de dispositivo.</li>
        <li>Geolocalización precisa del visitante.</li>
        <li>Perfiles para revender.</li>
      </ul>

      <h2>Qué sí</h2>
      <p>
        Si votas o aportas, el texto y el voto viven en la base de esta guía.
        No pedimos cuenta. No hay sesión de red social. La analítica de El
        Muelle es recuento de lecturas y votos, en el servidor, sin cruzar con
        tu cara.
      </p>
      <p>
        Base jurídica: interés legítimo (art. 6.1.f RGPD) para que la web
        funcione y no se caiga. Conservación corta. Nada se va fuera del
        propósito de la guía.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Acceso, rectificación, supresión, limitación, oposición, portabilidad.
        Autoridad de control:{" "}
        <a href="https://www.aepd.es" rel="noreferrer">
          AEPD
        </a>
        . Para ejercerlo, usa <Link to="/aporta">Aporta</Link> y dilo claro.
      </p>
    </LegalDoc>
  );
}
