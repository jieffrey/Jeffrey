"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BiBookOpen as Icon } from "react-icons/bi";
import { HiAcademicCap } from "react-icons/hi";
import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SubHeading";

type EducationItem = {
  school: string;
  level: string;
  location: string;
  period: string;
};

const EducationList = () => {
  const t = useTranslations("AboutPage");
  const items = t.raw("education.items") as EducationItem[];

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <SectionHeading title={t("education.title")} icon={<Icon size={20} />} />
        <SectionSubHeading>
          <p>{t("education.subtitle")}</p>
        </SectionSubHeading>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.35 }}
            className="group flex gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 transition-all duration-200 hover:border-neutral-300 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
          >
            {/* Icon */}
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
              <HiAcademicCap size={20} />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-0.5">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                {edu.school}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-500">
                {edu.level}
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-600">
                {edu.location}
              </p>
              <span className="mt-2 w-fit rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-500">
                {edu.period}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EducationList;