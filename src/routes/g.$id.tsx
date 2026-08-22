import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
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
};

export const Route = createFileRoute("/g/$id")({
  loader: ({ params }) => {
    const guide = LIVE_GUIDES.find((g) => g.id === params.id);
    if (!guide) throw notFound();
    return guide;
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
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.title ?? "Guía"} · Huelva.cloud` }],
  }),
});

function LiveGuidePage() {
  const guide = Route.useLoaderData();
  const View = VIEWS[guide.id];

  return (
    <main>
      <section className="relative h-80 overflow-hidden bg-iron sm:h-96">
        <img src={guide.image} alt="" className="film size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-iron via-iron/50 to-iron/20" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-8 sm:pb-14">
          <p className="text-kicker text-foam">Guía viva</p>
          <h1 className="mt-3 max-w-4xl font-display text-display leading-display tracking-display text-iron-fg">
            {guide.title}
          </h1>
        </div>
      </section>
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
        <p className="max-w-2xl text-lg leading-relaxed text-muted">{guide.dek}</p>
        <div className="mt-12 border-t border-line pt-12">
          <View />
        </div>
        <GuideFooter articleSlug={guide.articleSlug} />
      </div>
    </main>
  );
}
