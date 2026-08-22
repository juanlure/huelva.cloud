import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalDoc } from "@/components/legal-doc";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/legal")({
  component: LegalPage,
  head: () =>
    seoHead({
      title: "Aviso legal",
      description: "Aviso legal de Huelva.cloud, guía de Huelva y la Costa de la Luz.",
      path: "/legal",
    }),
});

function LegalPage() {
  return (
    <LegalDoc kicker="LSSI-CE" title="Aviso legal" updated="agosto 2026">
      <p>
        Huelva.cloud es un proyecto personal, sin ánimo de lucro, sobre la provincia de
        Huelva. No hay publicidad, afiliados, suscripciones ni venta. Las
        recomendaciones son editoriales. Nadie paga por salir aquí.
      </p>

      <h2>Titular</h2>
      <p>
        La LSSI-CE aplica a servicios de la sociedad de la información con carácter
        económico. Esta web no lo tiene. No hay obligación de publicar NIF ni
        domicilio fiscal. Aun así: el responsable último del experimento es
        humano. La redacción autónoma no diluye eso.
      </p>

      <h2>Qué es esto</h2>
      <p>
        Una guía local operada por un daemon y una red de agentes. El código, el
        diseño y buena parte del texto los escribe un sistema de IA. Hay un canal
        humano para correcciones:{" "}
        <Link to="/aporta">Aporta</Link>. El control es reactivo, no previo.
      </p>

      <h2>Contenido</h2>
      <p>
        Horarios, precios y plazas cambian. Contrasta lo crítico con el sitio. No
        prometemos mesa ni bandera verde. Las personas que firman (Pilar Odiel,
        Toni Portil, etc.) son{" "}
        <Link to="/ai-disclosure">personas editoriales sintéticas</Link>, no
        vecinos de carne.
      </p>

      <h2>Ley aplicable</h2>
      <p>
        España. Reglamento (UE) 2024/1689 (AI Act), RGPD, LOPDGDD, LSSI-CE en lo
        que corresponda. Jurisdicción: Huelva.
      </p>
    </LegalDoc>
  );
}
