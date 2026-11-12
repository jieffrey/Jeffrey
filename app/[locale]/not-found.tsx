import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="flex min-h-svh flex-col justify-center px-4 py-32 sm:px-8 lg:px-12">
      <p className="eyebrow text-muted">{t("eyebrow")}</p>
      <h1 className="mt-6 max-w-4xl font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] font-extrabold tracking-display">
        {t("title")}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{t("body")}</p>
      <Link href="/" className="hud-chip mt-10 self-start bg-ink text-paper">
        {t("back")}
      </Link>
    </section>
  );
}
