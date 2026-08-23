import { createFileRoute, Link } from "@tanstack/react-router";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/colabora")({
  component: ColaboraPage,
  head: () =>
    seoHead({
      title: "Colabora con Huelva.cloud",
      description:
        "Una mesa 14 días, una bodega 21 días. Aparece en La carta y en 48 horas. Local, seco, sin intermediarios.",
      path: "/colabora",
    }),
});

function ColaboraPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-kicker text-tinto">Colaboración local</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Una mesa en la guía</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Si tienes un local en Huelva o la costa, puedes aparecer en las guías vivas durante dos
        semanas. Esto es colaboración de la orilla, no red de anuncios.
      </p>

      <section className="mt-12 space-y-8">
        <div className="rounded-xl border-t-4 border-tinto bg-paper p-6 shadow-border">
          <h2 className="font-display text-2xl tracking-tight">Mesa 14 días</h2>
          <p className="mt-3 text-muted">
            Apareces en <Link to="/g/$id" params={{ id: "carta" }} className="text-tide hover:underline">La carta</Link>.
            Bloque «Esta mesa»: texto corto de Redacción (80 palabras), foto opcional,
            enlace web o WhatsApp. Sin banners, sin píxel.
          </p>
          <p className="mt-4 font-display text-3xl">80 € + IVA</p>
        </div>

        <div className="rounded-xl border-t-4 border-tinto bg-paper p-6 shadow-border">
          <h2 className="font-display text-2xl tracking-tight">Bodega 21 días</h2>
          <p className="mt-3 text-muted">
            Apareces en <Link to="/g/$id" params={{ id: "carta" }} className="text-tide hover:underline">La carta</Link> y{" "}
            <Link to="/g/$id" params={{ id: "marea" }} className="text-tide hover:underline">48 horas</Link>. 
            Mismo bloque, tres semanas de visibilidad. Bodega, taberna, tienda de producto
            local, mercado. Lo que tenga orilla.
          </p>
          <p className="mt-4 font-display text-3xl">150 € + IVA</p>
        </div>
      </section>

      <section className="mt-12 rounded-xl bg-iron p-8 text-iron-fg">
        <h2 className="font-display text-2xl tracking-tight">Cómo se hace</h2>
        <ol className="mt-4 space-y-3 text-iron-fg/80">
          <li>
            <strong className="text-iron-fg">1.</strong> Escríbenos: el nombre del local, qué
            servís, dónde estáis, un teléfono o email, y si es mesa (14 días) o bodega (21 días).
          </li>
          <li>
            <strong className="text-iron-fg">2.</strong> Te mandamos un borrador del texto para
            que revises. Si hay que cambiar algo, lo cambiamos.
          </li>
          <li>
            <strong className="text-iron-fg">3.</strong> Pasamos el pago: transferencia o Bizum.
            Te enviamos factura.
          </li>
          <li>
            <strong className="text-iron-fg">4.</strong> Activamos la mesa. Dos semanas de
            presencia en las guías más consultadas.
          </li>
        </ol>
      </section>

      <section className="mt-10 space-y-4 rounded-xl border border-line bg-paper p-6">
        <h3 className="font-display text-xl tracking-tight">Contacto</h3>
        <p className="text-muted">
          Mándanos un email a{" "}
          <a href="mailto:colabora@huelva.cloud" className="text-tide hover:underline">
            colabora@huelva.cloud
          </a>{" "}
          con el nombre del local, qué queréis destacar, y si preferís mesa o bodega.
        </p>
        <p className="text-sm text-faint">
          Respondemos en 24 horas. Sin gestores, sin agencia. De la redacción directamente.
        </p>
      </section>

      <section className="mt-12 space-y-3 text-sm text-muted">
        <p className="font-display text-base text-ink">Lo que no es esto</p>
        <ul className="space-y-2">
          <li>• No es un anuncio de red programática.</li>
          <li>• No hay píxel de seguimiento ni retargeting.</li>
          <li>• No vendemos datos de la calle.</li>
          <li>• No es un pack de «marketing digital» con promesas vacías.</li>
        </ul>
        <p className="mt-4">
          Esto es una mesa en una guía local. Dos semanas de presencia donde buscan los que
          vienen a comer gamba, beber Condado, o dormir cerca de Doñana. Si eso encaja con tu
          casa, <a href="mailto:colabora@huelva.cloud" className="text-tide hover:underline">escribe</a>.
        </p>
      </section>

      <p className="mt-12 text-center">
        <Link to="/" className="text-tide hover:underline">
          Volver a Huelva.cloud
        </Link>
      </p>
    </main>
  );
}
