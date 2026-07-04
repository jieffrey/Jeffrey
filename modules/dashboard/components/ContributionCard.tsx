import DashboardCard from "./DashboardCard";
import { Github } from "lucide-react";

export default function ContributionCard() {
    return (
        <DashboardCard
            title="Contribution Graph"
            subtitle="Last 365 days"
            icon={<Github size={20} />}
            className="col-span-2"
        >
            <div className="grid grid-cols-30 gap-1">

                {Array.from({ length: 210 }).map((_, i) => (
                    <div
                        key={i}
                        className={`aspect-square rounded-sm ${Math.random() > 0.6
                                ? "bg-emerald-500"
                                : Math.random() > 0.4
                                    ? "bg-emerald-300"
                                    : "bg-zinc-200 dark:bg-zinc-800"
                            }`}
                    />
                ))}

            </div>

            <p className="mt-5 text-sm text-zinc-500">
                1,243 contributions this year
            </p>

        </DashboardCard>
    );
}