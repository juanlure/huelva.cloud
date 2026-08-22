import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md bg-paper px-3 text-base text-ink shadow-[0_0_0_1px_var(--color-line)] transition-shadow duration-150 placeholder:text-faint focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--color-tide)] disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
