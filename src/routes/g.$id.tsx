import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  CartaGuide,
  GuideFooter,
  KitGuide,
  MarismaGuide,
  MareaGuide,
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
    <main className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-8 sm:py-20">
      <p className="text-kicker text-tinto">Guía viva</p>
      <h1 className="mt-4 max-w-4xl font-display text-display leading-display tracking-display">
        {guide.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{guide.dek}</p>
      <div className="mt-14 border-t border-line pt-12">
        <View />
      </div>
      <GuideFooter articleSlug={guide.articleSlug} />
    </main>
  );
}
