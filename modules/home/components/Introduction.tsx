"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineWork } from "react-icons/md";

const badge = (icon: React.ReactNode, text: string, delay: number) => (
  <motion.span
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.35 }}
    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
  >
    {icon}
    {text}
  </motion.span>
);

const Introduction = () => {
  const t = useTranslations("HomePage");

  return (
    <section className="space-y-6">
      {/* Greeting */}
      <div className="space-y-3">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 lg:text-3xl"
        >
          {t("intro")}
        </motion.h1>

        {/* Badges */}
        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {badge(<HiOutlineLocationMarker size={12} />, t("location"), 0.15)}
          {badge(<MdOutlineWork size={12} />, t("location_type"), 0.25)}
          {badge(<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />, t("status"), 0.35)}
        </motion.div>
      </div>

      {/* Divider */}
      <motion.div
        className="h-px w-full bg-gradient-to-r from-neutral-200 via-neutral-300 to-transparent dark:from-neutral-800 dark:via-neutral-700"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{ transformOrigin: "left" }}
      />

      {/* Bio paragraphs */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
      >
        <p className="text-justify leading-relaxed text-neutral-600 dark:text-neutral-300 lg:leading-loose">
          {t("resume_1")}
        </p>
        <p className="text-justify leading-relaxed text-neutral-600 dark:text-neutral-300 lg:leading-loose">
          {t("resume_2")}
        </p>
      </motion.div>
    </section>
  );
};

export default Introduction;