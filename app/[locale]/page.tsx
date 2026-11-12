import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "next-intl";
import Section from "@/common/components/section/Section";
import TheLine from "@/modules/line/components/TheLine";
import Now from "@/modules/now/components/Now";
import { getGithub } from "@/lib/data/github";
import { getSpotify } from "@/lib/data/spotify";
import type { SectionId } from "@/lib/sections";

/** Sections still waiting for their phase, with their placeholder surface. */
const PLACEHOLDERS: { id: Exclude<SectionId, "line">; surface: string }[] = [
  { id: "work", surface: "bg-paper text-ink" },
  { id: "about", surface: "bg-paper-2 text-ink" },
  { id: "stack", surface: "bg-paper text-ink" },
  { id: "cabinet", surface: "bg-paper-2 text-ink" },
  { id: "contact", surface: "bg-paper text-ink" },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const [github, spotify] = await Promise.all([getGithub(), getSpotify()]);

  return (
    <>
      <TheLine />
      <Now github={github} spotify={spotify} />
      {PLACEHOLDERS.map(({ id, surface }) => (
        <Section key={id} id={id} className={surface}>
          <div className="my-auto max-w-3xl">
            <h2 className="font-display text-[clamp(3.5rem,12vw,10rem)] leading-[0.88] font-extrabold tracking-display">
              {t(`${id}.nav`)}
            </h2>
            <p className="mt-6 font-mono text-sm leading-6 opacity-70">
              {t("common.placeholder")}
            </p>
          </div>
        </Section>
      ))}
    </>
  );
}
