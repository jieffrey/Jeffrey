"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { PiCertificate as CertIcon } from "react-icons/pi";
import { HiExternalLink } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { MdOutlineVerified } from "react-icons/md";
import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SubHeading";
import { cn } from "@/lib/utils";

type Certificate = {
  title: string;
  issuer: string;
  category: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
};

const CERTIFICATES: Certificate[] = [
  {
    title: "React - The Complete Guide",
    issuer: "Udemy",
    category: "Frontend",
    date: "Jan 2025",
    credentialUrl: "#",
    skills: ["React", "Hooks", "Redux", "Next.js"],
  },
  {
    title: "Node.js, Express, MongoDB & More",
    issuer: "Udemy",
    category: "Backend",
    date: "Mar 2025",
    credentialUrl: "#",
    skills: ["Node.js", "Express", "MongoDB", "REST API"],
  },
  {
    title: "TypeScript Masterclass",
    issuer: "Zero To Mastery",
    category: "Frontend",
    date: "Feb 2025",
    credentialUrl: "#",
    skills: ["TypeScript", "Generics", "OOP"],
  },
  {
    title: "Flutter & Dart - The Complete Guide",
    issuer: "Udemy",
    category: "Mobile",
    date: "Apr 2025",
    credentialUrl: "#",
    skills: ["Flutter", "Dart", "Firebase"],
  },
  {
    title: "SQL & PostgreSQL for Beginners",
    issuer: "Udemy",
    category: "Database",
    date: "Dec 2024",
    credentialUrl: "#",
    skills: ["PostgreSQL", "SQL", "Database Design"],
  },
  {
    title: "Docker & Kubernetes: The Practical Guide",
    issuer: "Udemy",
    category: "Tools",
    date: "May 2025",
    credentialUrl: "#",
    skills: ["Docker", "Kubernetes", "DevOps"],
  },
];

const CATEGORIES = ["All", "Frontend", "Backend", "Mobile", "Database", "Tools"];

const ISSUER_COLORS: Record<string, string> = {
  "Udemy": "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  "Zero To Mastery": "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  "Coursera": "bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400",
  "default": "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
};

const Achievements = () => {
  const t = useTranslations("AchievementsPage");
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = CERTIFICATES.filter((cert) => {
    const matchCategory = activeCategory === "All" || cert.category === activeCategory;
    const matchSearch =
      cert.title.toLowerCase().includes(search.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(search.toLowerCase()) ||
      cert.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const getCount = (cat: string) =>
    cat === "All"
      ? CERTIFICATES.length
      : CERTIFICATES.filter((c) => c.category === cat).length;

  const getIssuerColor = (issuer: string) =>
    ISSUER_COLORS[issuer] ?? ISSUER_COLORS["default"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <SectionHeading title={t("title")} icon={<CertIcon size={20} />} />
        <SectionSubHeading>
          <p>{t("subtitle")}</p>
        </SectionSubHeading>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <BsSearch
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            placeholder={t("search_placeholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-9 pr-4 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-all duration-200 focus:border-neutral-400 focus:ring-0 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder-neutral-600 dark:focus:border-neutral-600"
          />
        </div>
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
        {t("showing")} <span className="font-medium text-neutral-600 dark:text-neutral-400">{filtered.length}</span> {t("certificates")}
      </p>

      {/* Certificate grid */}
      <motion.div layout className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((cert, index) => (
              <motion.div
                key={cert.title}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ delay: 0.05 * index, duration: 0.25 }}
                className="group flex flex-col gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 transition-all duration-200 hover:border-neutral-300 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                      <MdOutlineVerified size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold leading-tight text-neutral-900 dark:text-neutral-100">
                        {cert.title}
                      </h3>
                      <span className={cn("mt-0.5 inline-block rounded-full px-2 py-0.5 text-xs font-medium", getIssuerColor(cert.issuer))}>
                        {cert.issuer}
                      </span>
                    </div>
                  </div>

                  {/* External link */}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-lg p-1.5 text-neutral-400 opacity-0 transition-all duration-200 hover:bg-neutral-200 hover:text-neutral-700 group-hover:opacity-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                    >
                      <HiExternalLink size={15} />
                    </a>
                  )}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-neutral-200 pt-2.5 dark:border-neutral-800">
                  <span className="text-xs text-neutral-400 dark:text-neutral-600">
                    {cert.date}
                  </span>
                  <span className="rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs text-neutral-500 dark:border-neutral-700 dark:text-neutral-500">
                    {cert.category}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-2 flex flex-col items-center justify-center gap-2 py-16 text-neutral-400 dark:text-neutral-600"
            >
              <CertIcon size={32} />
              <p className="text-sm">{t("empty")}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Achievements;