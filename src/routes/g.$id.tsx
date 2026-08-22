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
      <section className="relative h-80 overflow-hidden bg-iron sm:h-96">
        <img src={guide.image} alt={guide.title} className="film size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-iron via-iron/50 to-iron/20" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-8 sm:pb-14">
          <p className="text-kicker text-foam">
            {guide.id === "ahora" ? "En vivo" : "Guía viva"}
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-display leading-display tracking-display text-iron-fg">
            {guide.title}
          </h1>
        </div>
      </section>
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
        <p className="max-w-2xl text-lg leading-relaxed text-muted">{guide.dek}</p>
        <div className="mt-12 border-t border-line pt-12">
          <LiveCoastProvider value={live}>
            <View />
          </LiveCoastProvider>
        </div>
        <GuideFooter articleSlug={guide.articleSlug} />
      </div>
    </main>
  );
}
