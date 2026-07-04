"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BiUser, BiBriefcase, BiBookOpen } from "react-icons/bi";
import Story from "./Story";
import CareerList from "./CareerList";
import EducationList from "./EducationList";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "story",     icon: <BiUser size={16} />,      labelKey: "story"     },
  { key: "career",    icon: <BiBriefcase size={16} />, labelKey: "career"    },
  { key: "education", icon: <BiBookOpen size={16} />,  labelKey: "education" },
];

const About = () => {
  const t = useTranslations("AboutPage");
  const [active, setActive] = useState("story");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (key: string) => {
    sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(key);
  };

  return (
    <div className="space-y-0">
      {/* Page header */}
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {t("title")}
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-500">
          {t("subtitle")}
        </p>
      </div>

      {/* Sticky tab bar */}
      <div className="sticky top-18 z-10 mb-8 rounded-xl border border-neutral-200 bg-neutral-50/90 p-1 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/90 lg:top-4">
        <div className="grid grid-cols-3 gap-1">
          {TABS.map((tab) => {
            const isActive = active === tab.key;
            return (
              <motion.button
                key={tab.key}
                onClick={() => scrollTo(tab.key)}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "relative flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-neutral-900 dark:text-neutral-100"
                    : "text-neutral-400 hover:text-neutral-700 dark:text-neutral-600 dark:hover:text-neutral-400"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-neutral-800"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.icon}
                  {t(`tabs.${tab.labelKey}`)}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-16">
        <section
          id="story"
          ref={(el) => { sectionRefs.current["story"] = el; }}
        >
          <Story />
        </section>

        <div className="h-px w-full bg-linear-to-r from-neutral-200 via-neutral-300 to-transparent dark:from-neutral-800 dark:via-neutral-700" />

        <section
          id="career"
          ref={(el) => { sectionRefs.current["career"] = el; }}
        >
          <CareerList />
        </section>

        <div className="h-px w-full bg-linear-to-r from-neutral-200 via-neutral-300 to-transparent dark:from-neutral-800 dark:via-neutral-700" />

        <section
          id="education"
          ref={(el) => { sectionRefs.current["education"] = el; }}
        >
          <EducationList />
        </section>
      </div>
    </div>
  );
};

export default About;