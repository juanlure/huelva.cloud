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
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-widest text-tide">Guía viva</p>
      <h1 className="mt-2 max-w-3xl font-display text-4xl tracking-tight sm:text-5xl">
        {guide.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{guide.dek}</p>
      <div className="mt-10">
        <View />
      </div>
      <GuideFooter articleSlug={guide.articleSlug} />
    </main>
  );
}
