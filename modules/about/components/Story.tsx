"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BiUser as Icon } from "react-icons/bi";
import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SubHeading"

const Story = () => {
  const t = useTranslations("AboutPage");

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <SectionHeading title={t("story.title")} icon={<Icon size={20} />} />
        <SectionSubHeading>
          <p>{t("story.subtitle")}</p>
        </SectionSubHeading>
      </div>

      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {(t.raw("story.paragraphs") as string[]).map((para: string, i: number) => (
          <p
            key={i}
            className="text-justify leading-relaxed text-neutral-600 dark:text-neutral-300 lg:leading-loose"
          >
            {para}
          </p>
        ))}
      </motion.div>
    </div>
  );
};

export default Story;