import DashboardCard from "./DashboardCard";
import { Github } from "lucide-react";
import { contributions } from "../data/mock";

export default function ContributionCard() {
    return (
        <DashboardCard
            title="Contribution Graph"
            subtitle="Last 365 days"
            icon={<Github size={20} />}
            className="col-span-2"
        >
            <div className="grid grid-cols-30 gap-1">

                {contributions.map((item) => (
                    <div
                        key={item.id}
                        className={`aspect-square rounded-sm
                                ${item.level === 0
                                ? "bg-zinc-200 dark:bg-zinc-800"
                                : item.level === 1
                                    ? "bg-emerald-200"
                                    : item.level === 2
                                        ? "bg-emerald-400"
                                        : "bg-emerald-600"
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