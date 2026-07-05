import { Keyboard } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import { monkeytype } from "../../../data/monkeytype";

interface MonkeytypeWidgetProps {
  index?: number;
}

export default function MonkeytypeWidget({ index = 0 }: MonkeytypeWidgetProps) {
  return (
    <DashboardCard
      title="Monkeytype"
      subtitle="Typing Stats"
      icon={<Keyboard size={20} />}
      status="mock"
      accent="purple"
      index={index}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">WPM</p>
          <p className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {monkeytype.wpm}
          </p>
        </div>
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Accuracy</p>
          <p className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {monkeytype.accuracy}%
          </p>
        </div>
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Tests</p>
          <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {monkeytype.testsCompleted}
          </p>
        </div>
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Best WPM</p>
          <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {monkeytype.highestWpm}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Rank</p>
        <p className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {monkeytype.rank}
        </p>
      </div>
    </DashboardCard>
  );
}
