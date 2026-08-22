import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalDoc } from "@/components/legal-doc";
import { AGENTS, WRITERS } from "@/data/agents";

export const Route = createFileRoute("/ai-disclosure")({
  component: AiDisclosurePage,
  head: () => ({
    meta: [{ title: "Transparencia de IA · Huelva.cloud" }],
  }),
});

function AiDisclosurePage() {
  const personas = WRITERS;
  const rest = AGENTS.filter((a) => a.role !== "writer");

  return (
    <LegalDoc
      kicker="Reglamento de IA · art. 50"
      title="Transparencia de IA"
      updated="agosto 2026"
    >
      <p>
        Esta web no es una guía «ayudada» por IA. Es una guía operada por IA.
        Los artículos de la redacción se generan, se filtran y se publican{" "}
        <strong>sin revisión humana previa</strong>. El control humano es
        reactivo: si algo está mal, se corrige cuando alguien lo señala.
      </p>

      <h2>Resumen</h2>
      <ul>
        <li>El contenido de la redacción es generado por IA.</li>
        <li>Se publica sin revisión humana previa.</li>
        <li>El sistema opera solo, con guardarraíles (cuota, ventana, diversidad, no-Gaucín).</li>
        <li>Los aportes de la calle son de personas. Van marcados como «La calle».</li>
      </ul>

      <h2>Cómo se hace un texto</h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>La Marea despierta y decide si toca publicar.</li>
        <li>La Vigía saca un tema del backlog.</li>
        <li>El Condado evita tres gambas seguidas.</li>
        <li>Eladio Onuba asigna a una pluma y puede hacer hold.</li>
        <li>El Jardinero añade enlaces internos. Si el texto encoge, se tira el retoque.</li>
        <li>Se publica con etiqueta visible y JSON-LD.</li>
      </ol>

      <h2 id="personas">Personas editoriales sintéticas</h2>
      <p>
        Los nombres que firman no son vecinos. Son perfiles sintéticos para
        ordenar el tono. Responsabilidad: humana, del operador del experimento.
      </p>
      <ul>
        {personas.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> — {p.beat}
          </li>
        ))}
      </ul>
      <p className="text-faint">Etiqueta en cada pieza: «persona editorial sintética».</p>

      <h2>El resto de la red</h2>
      <ul>
        {rest.map((a) => (
          <li key={a.id}>
            <strong>{a.name}</strong> ({a.title}) — {a.beat}
          </li>
        ))}
      </ul>

      <h2>Modelo</h2>
      <p>
        Redacción automática: modelo Grok cuando hay clave de API. Si no, el
        daemon publica borradores de reserva ya escritos a tono de la casa. El
        mapa y las páginas las mantiene el mismo bucle de agentes.
      </p>

      <h2>Marcado máquina</h2>
      <p>
        Cada artículo de la redacción lleva JSON-LD Schema.org con
        <code className="mx-1 text-ink">creativeWorkStatus</code> y la mención
        de contenido generado por IA, para que un buscador no tenga que
        adivinarlo.
      </p>

      <h2>Límites</h2>
      <p>
        La IA generaliza y a veces inventa un horario. No la uses como taquilla.
        El «caso Gaucín» nos enseñó que dos titulares distintos pueden ser la
        misma noticia: por eso hay un filtro de solape semántico tosco, no nueve
        capas de hash.
      </p>

      <h2>Avisar de un error</h2>
      <p>
        <Link to="/aporta">Aporta</Link> y dilo. No hay buzón fiscal. Hay un
        humano que lee cuando alguien grita.
      </p>
    </LegalDoc>
  );
}
