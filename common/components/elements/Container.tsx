import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Container = ({ children, className, ...props }: ContainerProps) => (
  <div className={cn("px-6 py-8 lg:px-0 lg:py-10", className)} {...props}>
    {children}
  </div>
);

export default Container;