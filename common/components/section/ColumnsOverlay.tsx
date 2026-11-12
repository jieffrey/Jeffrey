import { cn } from "@/lib/utils";

const COLUMNS = Array.from({ length: 12 }, (_, i) => i);

/**
 * 12-column overlay shown in grid mode. Place it inside the section's
 * max-width wrapper (which must be `relative` and use `px-pad`). The tint
 * comes from --gridline.
 */
export default function ColumnsOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-pad inset-y-0 z-[3] grid grid-cols-12 gap-4 opacity-0 transition-opacity duration-300 grid-on:opacity-100",
        className,
      )}
    >
      {COLUMNS.map((column) => (
        <i key={column} className="block bg-(--gridline)" />
      ))}
    </div>
  );
}
