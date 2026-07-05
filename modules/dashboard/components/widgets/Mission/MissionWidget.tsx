import { Target } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import { mission } from "../../../data/mission";

interface MissionWidgetProps {
  index?: number;
}

export default function MissionWidget({ index = 0 }: MissionWidgetProps) {
  return (
    <DashboardCard
      title="Mission"
      subtitle="Current Objective"
      icon={<Target size={20} />}
      status="live"
      accent="blue"
      index={index}
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Title</p>
          <p className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {mission.title}
          </p>
        </div>
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Description</p>
          <p className="text-zinc-700 dark:text-zinc-300">{mission.description}</p>
        </div>
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Focus</p>
          <p className="text-zinc-700 dark:text-zinc-300">{mission.currentFocus}</p>
        </div>
      </div>
    </DashboardCard>
  );
}
