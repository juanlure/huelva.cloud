import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { coverFor } from "@/data/covers";
import { formatDate } from "@/lib/format";
import { CATEGORY_LABEL, type Article } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  const cover = coverFor(article);
  if (featured) {
    return (
      <Link
        to="/p/$slug"
        params={{ slug: article.slug }}
        className="group relative block min-h-80 overflow-hidden rounded-lg"
      >
        <img
          src={cover}
          alt=""
          className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-iron/55 transition-colors duration-300 group-hover:bg-iron/40" />
        <div className="relative flex min-h-80 flex-col justify-end p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-kicker text-foam">
            <span>{CATEGORY_LABEL[article.category]}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          </div>
          <h3 className="mt-3 max-w-lg font-display text-3xl leading-tight tracking-tight text-iron-fg sm:text-4xl">
            {article.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-iron-fg/75">{article.dek}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/p/$slug"
      params={{ slug: article.slug }}
      className="group grid grid-cols-[7rem_minmax(0,1fr)] gap-4 sm:grid-cols-[9rem_minmax(0,1fr)]"
    >
      <div className="overflow-hidden rounded-md">
        <img
          src={cover}
          alt=""
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center py-1">
        <div className="flex flex-wrap items-center gap-2 text-kicker text-faint">
          <Badge variant="muted">{CATEGORY_LABEL[article.category]}</Badge>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </div>
        <h3 className="mt-2 font-display text-xl leading-snug tracking-tight text-ink group-hover:text-tinto">
          {article.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{article.dek}</p>
      </div>
    </Link>
  );
}
