import type { ReactNode } from "react";

export function LegalDoc({
  kicker,
  title,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-kicker text-tinto">{kicker}</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-faint">Actualizado: {updated}</p>
      <div className="prose-legal mt-8 space-y-5 text-[15px] leading-relaxed text-muted [&_a]:text-tide [&_a]:underline [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:tracking-tight [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:font-medium [&_h3]:text-ink [&_li]:ml-4 [&_li]:list-disc [&_strong]:text-ink">
        {children}
      </div>
    </main>
  );
}
