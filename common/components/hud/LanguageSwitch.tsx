"use client";
import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useUi } from "@/common/stores/ui";
import { cn } from "@/lib/utils";

/**
 * EN / ID switch. Keeps the current route, and carries the active section as
 * the hash so the visitor lands on the same section in the other language.
 */
export default function LanguageSwitch() {
  const t = useTranslations("hud.language");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const next = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  const onSwitch = () => {
    const section = useUi.getState().activeSection;
    const hash = section ? `#${section}` : window.location.hash;
    startTransition(() => {
      router.replace(`${pathname}${hash}`, { locale: next, scroll: false });
    });
  };

  return (
    <button
      type="button"
      onClick={onSwitch}
      disabled={pending}
      aria-label={`${routing.locales.join(" / ").toUpperCase()} — ${t("switchTo", { language: t(next) })}`}
      className="hud-chip pointer-events-auto gap-1.5 disabled:opacity-60"
    >
      {routing.locales.map((l, i) => (
        <span key={l} className="contents">
          {i > 0 && (
            <span aria-hidden className="text-muted">
              /
            </span>
          )}
          <span className={cn(l === locale ? "text-ink" : "text-muted")}>
            {l}
          </span>
        </span>
      ))}
    </button>
  );
}
