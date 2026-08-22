import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AhoraGuide,
  AlmanaqueGuide,
  CafeGuide,
  CartaGuide,
  CuencaGuide,
  GuideFooter,
  KitGuide,
  MarismaGuide,
  MareaGuide,
  OcasoGuide,
  OrillaGuide,
  RabidaGuide,
} from "@/components/live-guide";
import { LIVE_GUIDES, type LiveGuideId } from "@/data/live-guides";
import { GUIDE_SEO } from "@/data/seo-topics";
import { SITE } from "@/lib/brand";
import { breadcrumbJsonLd, seoHead } from "@/lib/seo";
import { FilmHero } from "@/components/film-hero";
import { LiveCoastProvider } from "@/lib/live-coast";
import { getLiveCoast } from "@/lib/server/coast";

const VIEWS: Record<LiveGuideId, () => ReactNode> = {
  marea: () => <MareaGuide />,
  carta: () => <CartaGuide />,
  kit: () => <KitGuide />,
  rabida: () => <RabidaGuide />,
  orilla: () => <OrillaGuide />,
  marisma: () => <MarismaGuide />,
  cafe: () => <CafeGuide />,
  ocaso: () => <OcasoGuide />,
  cuenca: () => <CuencaGuide />,
  almanaque: () => <AlmanaqueGuide />,
  ahora: () => <AhoraGuide />,
};

export const Route = createFileRoute("/g/$id")({
  loader: async ({ params }) => {
    const guide = LIVE_GUIDES.find((g) => g.id === params.id);
    if (!guide) throw notFound();
    const live = await getLiveCoast();
    return { guide, live };
  },
  notFoundComponent: () => (
    <main className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="font-display text-3xl tracking-tight">Esa guía no está</h1>
      <Link to="/guides" className="mt-6 inline-block text-tide hover:underline">
        Ver las guías vivas
      </Link>
    </main>
  ),
  component: LiveGuidePage,
  head: ({ loaderData }) => {
    const g = loaderData?.guide;
    const extra = g ? GUIDE_SEO[g.id] : undefined;
    return seoHead({
      title: extra?.title ?? g?.title ?? "Guía",
      description: extra?.description ?? g?.dek ?? SITE.description,
      path: `/g/${g?.id ?? ""}`,
      image: g ? `${SITE.url}${g.image}` : undefined,
      keywords: extra?.keywords,
    });
  },
});

function LiveGuidePage() {
  const { guide, live } = Route.useLoaderData();
  const View = VIEWS[guide.id];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Huelva.cloud", path: "/" },
              { name: "Guías", path: "/guides" },
              { name: guide.title, path: `/g/${guide.id}` },
            ]),
          ),
        }}
      />
      <FilmHero
        image={guide.image}
        alt={guide.title}
        kicker={guide.id === "ahora" ? "En vivo" : "Guía viva"}
        title={guide.title}
        tall
      >
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-iron-fg/80">{guide.dek}</p>
      </FilmHero>
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
        <div className="border-t border-line pt-12">
          <LiveCoastProvider value={live}>
            <View />
          </LiveCoastProvider>
        </div>
        <GuideFooter articleSlug={guide.articleSlug} />
      </div>
    </main>
  );
}
