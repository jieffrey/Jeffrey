import { cn } from "@/lib/utils";
import type { SectionTitleProps } from "../../types";

export default function SectionTitle({
  eyebrow,
  title,
  description,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-10", className)}>
      {eyebrow && (
        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {eyebrow}
        </span>
      )}

      <h1
        className={cn(
          "font-bold tracking-tight text-zinc-900 dark:text-zinc-100",
          eyebrow ? "mt-2" : "",
          description ? "text-4xl" : "text-2xl"
        )}
      >
        {title}
      </h1>

      {description && (
        <p className="mt-3 max-w-2xl text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
