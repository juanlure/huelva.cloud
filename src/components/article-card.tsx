import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { coverFor } from "@/data/covers";
import { formatDate, formatRead } from "@/lib/format";
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
  return (
    <Link
      to="/p/$slug"
      params={{ slug: article.slug }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl bg-paper shadow-border transition-shadow duration-150 hover:ring-1 hover:ring-tide/40",
        featured && "md:flex-row",
      )}
    >
      <div className={cn("overflow-hidden", featured ? "md:w-2/5" : "aspect-video")}>
        <img
          src={cover}
          alt=""
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className={cn("flex flex-1 flex-col p-5", featured && "md:p-6")}>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <Badge variant={article.source === "community" ? "solid" : "default"}>
            {CATEGORY_LABEL[article.category]}
          </Badge>
          {article.source === "community" ? (
            <span>La calle</span>
          ) : article.author ? (
            <span>{article.author}</span>
          ) : (
            <span>{formatRead(article.readMinutes)}</span>
          )}
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </div>
        <h3
          className={cn(
            "mt-3 font-display tracking-tight text-ink group-hover:text-tide",
            featured ? "text-2xl leading-snug" : "text-xl leading-snug",
          )}
        >
          {article.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{article.dek}</p>
      </div>
    </Link>
  );
}
