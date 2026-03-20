import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  icon?: ReactNode;
}

const SectionHeading = ({ title, icon }: SectionHeadingProps) => {
  return (
    <div className="flex items-center gap-2">
      {icon && (
        <span className="text-neutral-500 dark:text-neutral-400">{icon}</span>
      )}
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;