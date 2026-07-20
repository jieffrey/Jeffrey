"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { BiCollection as ProjectIcon } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SubHeading";
import { PROJECTS, PROJECT_CATEGORIES } from "../data/project";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";

const Projects = () => {
  const t = useTranslations("ProjectsPage");
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = PROJECTS.filter((p) => {
    const matchCategory = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const getCount = (cat: string) =>
    cat === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <SectionHeading title={t("title")} icon={<ProjectIcon size={20} />} />
        <SectionSubHeading>
          <p>{t("subtitle")}</p>
        </SectionSubHeading>
      </div>

      <div className="relative">
        <BsSearch
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
        />
        <input
          type="text"
          placeholder={t("search_placeholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-9 pr-4 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-all duration-200 focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder-neutral-600 dark:focus:border-neutral-600"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {PROJECT_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "border border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-neutral-300 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-500 dark:hover:border-neutral-700 dark:hover:text-neutral-300"
              )}
            >
              {cat}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-xs",
                  isActive
                    ? "bg-white/20 text-white dark:bg-black/20 dark:text-neutral-900"
                    : "bg-neutral-200 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-500"
                )}
              >
                {getCount(cat)}
              </span>
            </motion.button>
          );
        })}
      </div>

      <p className="text-xs text-neutral-400 dark:text-neutral-600">
        {t("showing")}{" "}
        <span className="font-medium text-neutral-600 dark:text-neutral-400">
          {filtered.length}
        </span>{" "}
        {t("projects")}
      </p>

      <motion.div layout className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-2 flex flex-col items-center justify-center gap-2 py-16 text-neutral-400 dark:text-neutral-600"
            >
              <ProjectIcon size={32} />
              <p className="text-sm">{t("empty")}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Projects;