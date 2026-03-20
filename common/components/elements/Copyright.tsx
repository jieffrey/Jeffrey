"use client";
import { useTranslations } from "next-intl";

const Copyright = () => {
  const t = useTranslations("Footer");

  return (
    <div className="flex flex-wrap items-center justify-center gap-1 text-center text-sm text-neutral-600 dark:text-neutral-400">
      <span>{t("copyright")}</span>
      <span>{t("name")}.</span>
      <span>{t("rights")}</span>
    </div>
  );
};

export default Copyright;