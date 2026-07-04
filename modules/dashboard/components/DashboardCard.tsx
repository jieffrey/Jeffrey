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
    index?: number;
}

export default function DashboardCard({
    title,
    subtitle,
    icon,
    badge,
    footer,
    children,
    className,
    index = 0,
}: DashboardCardProps) {
    return (
        <div
            data-aos="fade-up"
            data-aos-delay={index * 100}
            data-aos-duration="800"
            data-aos-easing="ease-out-cubic"
            className={cn(
                "group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900",
                className
            )}
        >
            <div className="mb-6 flex items-start justify-between">
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:bg-zinc-200 dark:bg-zinc-800 dark:group-hover:bg-zinc-700">
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
        </div>
    );
}