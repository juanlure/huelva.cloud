import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  asLink = true,
}: {
  className?: string;
  asLink?: boolean;
}) {
  const inner = (
    <>
      Huelva
      <span className="text-tide">.cloud</span>
    </>
  );
  const cls = cn("font-display tracking-tight text-ink", className);
  if (!asLink) return <p className={cls}>{inner}</p>;
  return (
    <Link to="/" className={cn(cls, "inline-flex items-baseline gap-0")}>
      {inner}
    </Link>
  );
}
