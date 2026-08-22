import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FilmHero({
  image,
  alt,
  kicker,
  title,
  children,
  tall = false,
}: {
  image: string;
  alt: string;
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
  tall?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-iron",
        tall ? "h-[78svh] min-h-[32rem]" : "h-[62svh] min-h-[26rem]",
      )}
    >
      <img
        src={image}
        alt={alt}
        className="hero-still film absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-iron via-iron/30 to-iron/10" />
      <div className="relative flex h-full flex-col justify-end px-4 pb-12 sm:px-8 sm:pb-16">
        <div className="mx-auto w-full max-w-7xl">
          <p className="text-kicker text-tinto">{kicker}</p>
          <h1 className="mt-3 max-w-[16ch] font-display text-display leading-display tracking-display text-iron-fg">
            {title}
          </h1>
          {children}
        </div>
      </div>
    </section>
  );
}
