import { ReactNode } from "react";

interface SectionSubHeadingProps {
  children: ReactNode;
}

const SectionSubHeading = ({ children }: SectionSubHeadingProps) => {
  return (
    <div className="text-sm text-neutral-500 dark:text-neutral-400">
      {children}
    </div>
  );
};

export default SectionSubHeading;