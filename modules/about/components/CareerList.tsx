"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BiBriefcase as Icon } from "react-icons/bi";
import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SubHeading";

type CareerItem = {
  role: string;
  company: string;
  type: string;
  period: string;
  description: string;
  tags: string[];
};

const CareerList = () => {
  const t = useTranslations("AboutPage");
  const items = t.raw("career.items") as CareerItem[];

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <SectionHeading title={t("career.title")} icon={<Icon size={20} />} />
        <SectionSubHeading>
          <p>{t("career.subtitle")}</p>
        </SectionSubHeading>
      </div>

      <div className="relative space-y-0">
        {/* Vertical timeline line */}
        <div className="absolute left-1.75 top-2 h-[calc(100%-16px)] w-px bg-neutral-200 dark:bg-neutral-800" />

        {items.map((career, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.35 }}
            className="relative pb-10 pl-8 last:pb-0"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center">
              <div className="h-2.5 w-2.5 rounded-full border-2 border-neutral-400 bg-white dark:border-neutral-600 dark:bg-neutral-900" />
            </div>

            {/* Card */}
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 transition-all duration-200 hover:border-neutral-300 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {career.role}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500">
                    {career.company}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                    {career.period}
                  </span>
                  <span className="rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs text-neutral-500 dark:border-neutral-700 dark:text-neutral-500">
                    {career.type}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {career.description}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {career.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CareerList;