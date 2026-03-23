"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { BiCollection as ProjectIcon } from "react-icons/bi";
import { BsSearch, BsGithub, BsGlobe } from "react-icons/bs";
import { HiArrowUpRight } from "react-icons/hi2";
import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SubHeading";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  description: string;
  category: string;
  status: "live" | "development" | "archived";
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  year: string;
};

const PROJECTS: Project[] = [
  {
    title: "Todo App with Auth",
    description: "Full-stack todo application with JWT authentication, CRUD operations, and persistent storage using PostgreSQL.",
    category: "Fullstack",
    status: "live",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Supabase"],
    githubUrl: "#",
    liveUrl: "#",
    year: "2025",
  },
  {
    title: "REST API Boilerplate",
    description: "A production-ready REST API boilerplate with Express.js, includes auth, validation, error handling, and Docker setup.",
    category: "Backend",
    status: "live",
    techStack: ["Node.js", "Express.js", "PostgreSQL", "Docker"],
    githubUrl: "#",
    year: "2025",
  },
  {
    title: "Weather App",
    description: "Mobile weather app built with React Native, fetches real-time data from OpenWeather API with location support.",
    category: "Mobile",
    status: "live",
    techStack: ["React Native", "TypeScript", "OpenWeather API"],
    githubUrl: "#",
    liveUrl: "#",
    year: "2024",
  },
  {
    title: "Chat App (WebSocket)",
    description: "Real-time chat application using WebSocket, supports multiple rooms and online presence tracking.",
    category: "Fullstack",
    status: "development",
    techStack: ["Next.js", "Node.js", "Socket.io", "Redis"],
    githubUrl: "#",
    year: "2025",
  },
  {
    title: "FastAPI CRUD",
    description: "Simple CRUD API built with FastAPI and Python. Includes Pydantic validation, SQLAlchemy ORM, and Alembic migrations.",
    category: "Backend",
    status: "live",
    techStack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy"],
    githubUrl: "#",
    year: "2025",
  },
  {
    title: "Portfolio v1",
    description: "First version of my personal portfolio website built with plain React and Tailwind CSS.",
    category: "Frontend",
    status: "archived",
    techStack: ["React", "TailwindCSS", "JavaScript"],
    githubUrl: "#",
    year: "2024",
  },
];

const CATEGORIES = ["All", "Fullstack", "Frontend", "Backend", "Mobile"];

const STATUS_CONFIG = {
  live:        { label: "Live",        className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400" },
  development: { label: "In Progress", className: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400" },
  archived:    { label: "Archived",    className: "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-500" },
};

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
      {/* Header */}
      <div className="space-y-1">
        <SectionHeading title={t("title")} icon={<ProjectIcon size={20} />} />
        <SectionSubHeading>
          <p>{t("subtitle")}</p>
        </SectionSubHeading>
      </div>

      {/* Search */}
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

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
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

      {/* Results count */}
      <p className="text-xs text-neutral-400 dark:text-neutral-600">
        {t("showing")}{" "}
        <span className="font-medium text-neutral-600 dark:text-neutral-400">
          {filtered.length}
        </span>{" "}
        {t("projects")}
      </p>

      {/* Project grid */}
      <motion.div layout className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ delay: 0.05 * index, duration: 0.25 }}
                className="group flex flex-col gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 transition-all duration-200 hover:border-neutral-300 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {project.title}
                      </h3>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                          STATUS_CONFIG[project.status].className
                        )}
                      >
                        {STATUS_CONFIG[project.status].label}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
                      {project.year} · {project.category}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex shrink-0 items-center gap-1 opacity-0 transition-all duration-200 group-hover:opacity-100">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                      >
                        <BsGithub size={14} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                      >
                        <HiArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer links */}
                <div className="flex items-center gap-3 border-t border-neutral-200 pt-2.5 dark:border-neutral-800">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
                    >
                      <BsGithub size={12} />
                      Source Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
                    >
                      <BsGlobe size={12} />
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
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