import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DashboardCardProps {
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    badge?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
    className?: string;
}

export default function DashboardCard({
    title,
    subtitle,
    icon,
    badge,
    footer,
    children,
    className,
}: DashboardCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{
                y: -4,
            }}
            className={cn(
                "group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900",
                className
            )}
        >
            <div className="mb-6 flex items-start justify-between">
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 transition group-hover:scale-105 dark:bg-zinc-800">
                            {icon}
                        </div>
                    )}

                    <div>
                        <h3 className="font-semibold tracking-tight">{title}</h3>

                        {subtitle && (
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>

                {badge}
            </div>

            <div>{children}</div>

            {footer && (
                <div className="mt-6 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                    {footer}
                </div>
            )}
        </motion.div>
    );
}