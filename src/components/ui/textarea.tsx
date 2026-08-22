import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-32 w-full rounded-lg bg-paper px-3 py-3 text-base text-ink shadow-[0_0_0_1px_var(--color-line)] transition-shadow duration-150 placeholder:text-faint focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--color-tide)] disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
