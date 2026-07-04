import clsx from "clsx";

interface BreaklineProps {
  className?: string;
}

const Breakline = ({ className = "" }: BreaklineProps) => (
  <div className={clsx("my-4 border-t border-neutral-300 dark:border-neutral-700", className)} />
);

export default Breakline;