import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

interface DetailShellProps {
  back: { href: string; label: string };
  /** Mono eyebrow parts, joined with " · ". */
  eyebrow: string[];
  title: string;
  lead: string;
  /** Hero artwork; fills a rounded 16:9 frame. */
  hero: ReactNode;
  /** DetailMeta items for the facts column. */
  meta: ReactNode;
  next?: { href: string; label: string; title: string };
  children: ReactNode;
}

/**
 * Shared layout of the detail pages (work case studies, achievements):
 * back link, eyebrow, big title, hero art, a facts column and content blocks
 * on the same 12-column grid and tokens as the home page.
 */
export default function DetailShell({
  back,
  eyebrow,
  title,
  lead,
  hero,
  meta,
  next,
  children,
}: DetailShellProps) {
  return (
    <article className="mx-auto max-w-[1320px] px-pad pt-28 pb-40">
      <Link
        href={back.href}
        className="hud-chip transition-colors hover:bg-ink hover:text-paper"
      >
        <span aria-hidden>←</span>
        {back.label}
      </Link>
      <p className="eyebrow mt-10">
        <b>{eyebrow[0]}</b>
        {eyebrow.slice(1).map((part) => (
          <span key={part}>{part}</span>
        ))}
      </p>
      <h1 className="mt-3 text-[clamp(48px,9vw,136px)] leading-[0.9] font-extrabold tracking-[-0.05em] text-balance">
        {title}
      </h1>
      <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">{lead}</p>

      <div className="relative mt-12 aspect-[16/9] max-h-[640px] w-full overflow-hidden rounded-3xl">
        {hero}
      </div>

      <div className="mt-16 grid grid-cols-12 gap-x-4 gap-y-12">
        <dl className="col-span-12 flex flex-col gap-6 text-sm leading-6 min-[961px]:col-span-3 min-[961px]:col-start-10 min-[961px]:row-start-1">
          {meta}
        </dl>
        <div className="col-span-12 flex flex-col gap-14 min-[961px]:col-span-8 min-[961px]:row-start-1">
          {children}
        </div>
      </div>

      {next && (
        <Link
          href={next.href}
          data-cursor="open"
          className="group mt-24 flex flex-col gap-2 border-t border-ink pt-6"
        >
          <span className="font-mono text-xs tracking-chip text-muted uppercase">
            {next.label}
          </span>
          <span className="text-[clamp(36px,6vw,88px)] leading-none font-extrabold tracking-display transition-transform duration-500 ease-expo-out group-hover:translate-x-3">
            {next.title} <span aria-hidden>→</span>
          </span>
        </Link>
      )}
    </article>
  );
}

export function DetailMeta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-ink pt-2">
      <dt className="mb-2 font-mono text-[11px] leading-4 font-medium tracking-hud text-muted uppercase">
        {label}
      </dt>
      <dd>{children}</dd>
    </div>
  );
}

export function DetailBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-[clamp(28px,3.4vw,44px)] leading-tight font-extrabold tracking-[-0.03em]">
        {title}
      </h2>
      <div className="mt-4 max-w-[62ch] text-lg leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}
