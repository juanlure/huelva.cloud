import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  asLink = true,
  inverted = false,
}: {
  className?: string;
  asLink?: boolean;
  inverted?: boolean;
}) {
  const inner = (
    <>
      Huelva
      <span className={inverted ? "italic text-foam" : "italic text-tinto"}>.cloud</span>
    </>
  );
  const cls = cn(
    "font-display font-medium tracking-display",
    inverted ? "text-iron-fg" : "text-ink",
    className,
  );
  if (!asLink) return <p className={cls}>{inner}</p>;
  return (
    <Link to="/" className={cn(cls, "inline-flex items-baseline")}>
      {inner}
    </Link>
  );
}
