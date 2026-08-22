import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { type LiveGuideId } from "@/data/live-guides";
import { landingBySlug, SEO_LANDINGS } from "@/data/seo-landings";
import { breadcrumbJsonLd, faqJsonLd, seoHead } from "@/lib/seo";
import { SITE } from "@/lib/brand";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const page = landingBySlug(params.slug);
    if (!page) throw notFound();
    return page;
  },
  notFoundComponent: () => (
    <main className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="font-display text-3xl tracking-tight">Eso no está</h1>
      <Link to="/temas" className="mt-6 inline-block text-tide hover:underline">
        Ver los temas de Huelva
      </Link>
    </main>
  ),
  component: LandingPage,
  head: ({ loaderData: page }) =>
    seoHead({
      title: page?.title ?? "Huelva",
      description: page?.description ?? SITE.description,
      path: `/${page?.slug ?? ""}`,
      image: page ? `${SITE.url}${page.image}` : undefined,
      keywords: page?.keywords,
    }),
});

function LandingPage() {
  const page = Route.useLoaderData();
  const others = SEO_LANDINGS.filter((l) => l.slug !== page.slug).slice(0, 6);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(page.faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Huelva.cloud", path: "/" },
              { name: "Temas", path: "/temas" },
              { name: page.h1, path: `/${page.slug}` },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Article", "TouristGuide"],
            headline: page.h1,
            description: page.lede,
            image: `${SITE.url}${page.image}`,
            inLanguage: "es-ES",
            author: { "@type": "Organization", name: SITE.name, url: SITE.url },
            publisher: { "@type": "NewsMediaOrganization", name: SITE.name, url: SITE.url },
            mainEntityOfPage: `${SITE.url}/${page.slug}`,
            about: page.h1,
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".lede-ref", "h1"],
            },
          }),
        }}
      />

      <section className="relative h-80 overflow-hidden bg-iron sm:h-96">
        <img src={page.image} alt={page.imageAlt} className="film size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-iron via-iron/50 to-iron/20" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-8 sm:pb-14">
          <p className="text-kicker text-foam">{page.kicker}</p>
          <h1 className="mt-3 max-w-4xl font-display text-display leading-display tracking-display text-iron-fg">
            {page.h1}
          </h1>
        </div>
      </section>

      <article className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
        <p className="lede-ref max-w-2xl text-xl leading-relaxed text-ink">{page.lede}</p>

        <div className="mt-14 max-w-2xl space-y-12">
          {page.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-3xl tracking-tight">{s.h}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{s.p}</p>
            </section>
          ))}
        </div>

        <div className="mt-14">
          <Button asChild size="lg">
            <Link to="/g/$id" params={{ id: page.guideId as LiveGuideId }}>
              Abrir la guía viva
            </Link>
          </Button>
        </div>

        <section className="mt-20">
          <h2 className="font-display text-edition tracking-tight">Preguntas frecuentes</h2>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {page.faqs.map((item) => (
              <div key={item.q} className="grid gap-3 py-8 md:grid-cols-12">
                <dt className="font-display text-xl tracking-tight md:col-span-5">{item.q}</dt>
                <dd className="leading-relaxed text-muted md:col-span-7">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <nav className="mt-20" aria-label="Más de Huelva">
          <p className="text-kicker text-tinto">Sigue en Huelva.cloud</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {others.map((l) => (
              <li key={l.slug}>
                <Link to="/$slug" params={{ slug: l.slug }} className="block hover:text-tinto">
                  <span className="font-display text-2xl tracking-tight">{l.h1}</span>
                  <span className="mt-1 block text-sm text-muted">{l.kicker}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
    </main>
  );
}
