import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "next-intl";
import Section from "@/common/components/section/Section";
import { SECTIONS, type SectionId } from "@/lib/sections";

/** Surface per section until each one is built in its own phase. */
const SURFACES: Record<SectionId, string> = {
  line: "bg-paper text-ink",
  now: "bg-night text-paper-static",
  work: "bg-paper text-ink",
  about: "bg-paper-2 text-ink",
  stack: "bg-paper text-ink",
  cabinet: "bg-paper-2 text-ink",
  contact: "bg-paper text-ink",
};

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations();

  return (
    <>
      {SECTIONS.map(({ id }) => (
        <Section key={id} id={id} className={SURFACES[id]}>
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
