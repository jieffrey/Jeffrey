"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiCodeAlt as SkillsIcon } from "react-icons/bi";
import { useTranslations } from "next-intl";
import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SubHeading";
import { STACKS, StackCategory } from "@/common/constants/stacks";
import { cn } from "@/lib/utils";

type FilterKey = "all" | StackCategory;

const FILTER_KEYS: { key: FilterKey; msgKey: string }[] = [
  { key: "all",      msgKey: "all"      },
  { key: "Utama",    msgKey: "main"     },
  { key: "Frontend", msgKey: "frontend" },
  { key: "Backend",  msgKey: "backend"  },
  { key: "Mobile",   msgKey: "mobile"   },
  { key: "Database", msgKey: "database" },
  { key: "Tools",    msgKey: "tools"    },
];

const SkillList = () => {
  const t = useTranslations("HomePage");
  const [active, setActive] = useState<FilterKey>("all");

  const filtered =
    active === "all"
      ? STACKS
      : STACKS.filter((s) => s.category.includes(active as StackCategory));

  const getCount = (key: FilterKey) =>
    key === "all"
      ? STACKS.length
      : STACKS.filter((s) => s.category.includes(key as StackCategory)).length;

  return (
    <section className="space-y-5">
      <div className="space-y-1.5">
        <SectionHeading title={t("skills.title")} icon={<SkillsIcon size={20} />} />
        <SectionSubHeading>
          <p>{t("skills.sub_title")}</p>
        </SectionSubHeading>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {FILTER_KEYS.map((f) => {
          const isActive = active === f.key;
          return (
            <motion.button
              key={f.key}
              onClick={() => setActive(f.key)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "border border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-neutral-300 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-500 dark:hover:border-neutral-700 dark:hover:text-neutral-300"
              )}
            >
              {t(`skills.filter.${f.msgKey}`)}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-xs",
                  isActive
                    ? "bg-white/20 text-white dark:bg-black/20 dark:text-neutral-900"
                    : "bg-neutral-200 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-500"
                )}
              >
                {getCount(f.key)}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Skill pills */}
      <motion.div layout className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((stack) => (
            <motion.div
              key={stack.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.18 }}
            >
              <div
                className={cn(
                  "flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-sm dark:border-neutral-800",
                  stack.background,
                )}
              >
                <span className={stack.color}>{stack.icon}</span>
                <span className="text-neutral-700 dark:text-neutral-300">
                  {stack.name}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default SkillList;