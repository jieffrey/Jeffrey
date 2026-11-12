import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ACHIEVEMENTS, getAchievement } from "@/lib/data/achievements";
import { localize } from "@/lib/data/localized";
import DetailShell, { DetailBlock, DetailMeta } from "@/common/components/detail/DetailShell";
import AchievementObject from "@/modules/cabinet/components/AchievementObject";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return ACHIEVEMENTS.map((achievement) => ({ slug: achievement.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const achievement = getAchievement(slug);
  if (!achievement || !hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "achievementDetail" });
  const title = t("metaTitle", { title: localize(achievement.title, locale) });
  const description = localize(achievement.about, locale);
  const path = `/achievements/${achievement.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
        "x-default": `/${routing.defaultLocale}${path}`,
      },
    },
    openGraph: { title, description, url: `/${locale}${path}`, type: "article" },
  };
}

export default async function AchievementDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const achievement = getAchievement(slug);
  if (!achievement || !hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const title = localize(achievement.title, locale);
  const kind = t(`cabinet.kinds.${achievement.kind}`);
  const next =
    ACHIEVEMENTS[(ACHIEVEMENTS.indexOf(achievement) + 1) % ACHIEVEMENTS.length];

  return (
    <DetailShell
      back={{ href: "/#cabinet", label: t("achievementDetail.back") }}
      eyebrow={[kind, achievement.date]}
      title={title}
      lead={localize(achievement.about, locale)}
      hero={<AchievementObject kind={achievement.kind} size={160} className="size-full" />}
      meta={
        <>
          <DetailMeta label={t("achievementDetail.kind")}>{kind}</DetailMeta>
          <DetailMeta label={t("achievementDetail.issuer")}>
            {localize(achievement.issuer, locale)}
          </DetailMeta>
          <DetailMeta label={t("achievementDetail.date")}>{achievement.date}</DetailMeta>
          {achievement.credentialUrl && (
            <DetailMeta label={t("achievementDetail.credential")}>
              <a
                href={achievement.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                {t("achievementDetail.credentialLink")}
              </a>
            </DetailMeta>
          )}
        </>
      }
      next={{
        href: `/achievements/${next.slug}`,
        label: t("achievementDetail.next"),
        title: localize(next.title, locale),
      }}
    >
      <DetailBlock title={t("achievementDetail.about")}>
        <p>{localize(achievement.about, locale)}</p>
      </DetailBlock>
      <DetailBlock title={t("achievementDetail.built")}>
        <p>{localize(achievement.built, locale)}</p>
      </DetailBlock>
      <DetailBlock title={t("achievementDetail.proof")}>
        {achievement.image ? (
          <Image
            src={achievement.image}
            alt={t("achievementDetail.proofAlt", { title })}
            width={1200}
            height={850}
            className="h-auto w-full rounded-2xl border border-hair"
          />
        ) : (
          <p className="rounded-2xl border border-dashed border-ink/30 px-6 py-12 text-center font-mono text-xs tracking-chip text-muted uppercase">
            {t("achievementDetail.proofEmpty")}
          </p>
        )}
      </DetailBlock>
    </DetailShell>
  );
}
