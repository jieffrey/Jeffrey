import { useTranslations } from "next-intl";
import { PROJECTS } from "@/lib/data/projects";
import ColumnsOverlay from "@/common/components/section/ColumnsOverlay";
import GhostText from "@/common/components/section/GhostText";
import SectionHeader from "@/common/components/section/SectionHeader";
import ProjectCard from "./ProjectCard";

/**
 * 03 — Work. Hierarchical grid on 12 columns: one primary project
 * (cols 1–7, two rows) and two secondary ones (cols 8–12).
 */
export default function Work() {
  const t = useTranslations("work");

  return (
    <section
      id="work"
      data-section="work"
      aria-labelledby="work-title"
      className="relative overflow-x-clip bg-paper py-[104px] text-ink min-[721px]:py-[136px]"
    >
      <GhostText text={t("ghost")} className="top-10" />
      <div className="relative z-[1] mx-auto max-w-[1320px] px-pad">
        <ColumnsOverlay />
        <SectionHeader id="work" title={t.raw("title")} />
        <div className="mt-14 grid grid-cols-12 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              primary={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
