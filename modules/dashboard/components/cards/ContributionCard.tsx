import { Github } from "lucide-react";
import DashboardCard from "../common/DashboardCard";
import { contributions } from "../../data/mock";

const levelColors = [
  "bg-zinc-200 dark:bg-zinc-800",
  "bg-emerald-200 dark:bg-emerald-300/30",
  "bg-emerald-400 dark:bg-emerald-400/40",
  "bg-emerald-600 dark:bg-emerald-500/50",
];

export default function ContributionCard() {
  return (
    <DashboardCard
      title="Github"
      description="Realtime Activity"
      status="live"
      accent="blue"
      icon={<Github size={20} />}
      className="col-span-2"
    >
      <div className="grid grid-cols-30 gap-1">
        {contributions.map((item) => (
          <div
            key={item.id}
            className={`aspect-square rounded-sm ${levelColors[item.level] ?? levelColors[0]}`}
          />
        ))}
      </div>

      <p className="mt-5 text-sm text-zinc-500 dark:text-zinc-400">
        1,243 contributions this year
      </p>
    </DashboardCard>
  );
}
