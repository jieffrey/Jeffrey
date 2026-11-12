import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { localize } from "@/lib/data/localized";
import { PROJECTS, getProject } from "@/lib/data/projects";
import DetailShell, { DetailBlock, DetailMeta } from "@/common/components/detail/DetailShell";
import CoverFace from "@/modules/line/components/CoverFace";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project || !hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "workDetail" });
  const title = t("metaTitle", { title: project.title });
  const description = localize(project.summary, locale);
  const path = `/work/${project.slug}`;

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

export default async function WorkDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project || !hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "workDetail" });
  const l = <T,>(value: Record<Locale, T>) => localize(value, locale);

  const next = PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length];
  const links = [
    { href: project.links.live, label: t("live") },
    { href: project.links.github, label: t("github") },
  ].filter((link): link is { href: string; label: string } => Boolean(link.href));

  return (
    <DetailShell
      back={{ href: "/#work", label: t("back") }}
      eyebrow={[t("eyebrow"), l(project.kind)]}
      title={project.title}
      lead={l(project.summary)}
      hero={<CoverFace face={project.face} title={project.shortTitle} />}
      meta={
        <>
          <DetailMeta label={t("role")}>{l(project.role)}</DetailMeta>
          <DetailMeta label={t("year")}>{project.year}</DetailMeta>
          <DetailMeta label={t("status")}>{t(`statuses.${project.status}`)}</DetailMeta>
          <DetailMeta label={t("stack")}>
            <ul className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-hair px-2.5 py-1 font-mono text-xs"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </DetailMeta>
        </>
      }
      next={{
        href: `/work/${next.slug}`,
        label: t("next"),
        title: next.title,
      }}
    >
      <DetailBlock title={t("problem")}>
        <p>{l(project.problem)}</p>
      </DetailBlock>
      <DetailBlock title={t("built")}>
        <p>{l(project.built)}</p>
      </DetailBlock>
      <DetailBlock title={t("screenshots")}>
        {project.screenshots.length ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {project.screenshots.map((src, i) => (
              <li key={src} className="overflow-hidden rounded-2xl border border-hair">
                <Image
                  src={src}
                  alt={t("screenshotAlt", { title: project.title, number: i + 1 })}
                  width={1200}
                  height={750}
                  className="h-auto w-full"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl border border-dashed border-ink/30 px-6 py-12 text-center font-mono text-xs tracking-chip text-muted uppercase">
            {t("screenshotsEmpty")}
          </p>
        )}
      </DetailBlock>
      <DetailBlock title={t("links")}>
        {links.length ? (
          <ul className="flex flex-wrap gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-[52px] items-center rounded-full bg-ink px-6 font-semibold text-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">{t("linksEmpty")}</p>
        )}
      </DetailBlock>
    </DetailShell>
  );
}
