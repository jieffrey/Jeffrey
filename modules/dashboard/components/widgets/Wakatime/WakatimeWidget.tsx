import { Clock } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import { wakatime } from "../../../data/wakatime";

interface WakatimeWidgetProps {
  index?: number;
}

export default function WakatimeWidget({ index = 0 }: WakatimeWidgetProps) {
  return (
    <DashboardCard
      title="WakaTime"
      subtitle="Coding Activity"
      icon={<Clock size={20} />}
      status="mock"
      accent="green"
      index={index}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Hours</p>
            <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {wakatime.totalHours}
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Daily Avg</p>
            <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {wakatime.dailyAverage}
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Best Day</p>
            <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {wakatime.bestDay}
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Streak</p>
            <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {wakatime.currentStreak} days
            </p>
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">Languages</p>
          <div className="flex flex-wrap gap-2">
            {wakatime.languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
