import { BarChart3 } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";

interface UmamiWidgetProps {
  index?: number;
}

const umamiData = {
  pageViews: 45200,
  visitors: 18300,
  bounceRate: "32%",
  avgDuration: "4m 32s",
};

export default function UmamiWidget({ index = 0 }: UmamiWidgetProps) {
  const stats: { label: string; value: string }[] = [
    { label: "Page Views", value: umamiData.pageViews.toLocaleString() },
    { label: "Visitors", value: umamiData.visitors.toLocaleString() },
    { label: "Bounce Rate", value: umamiData.bounceRate },
    { label: "Avg Duration", value: umamiData.avgDuration },
  ];

  return (
    <DashboardCard
      title="Umami"
      subtitle="Website Analytics"
      icon={<BarChart3 size={20} />}
      status="mock"
      accent="yellow"
      index={index}
    >
      <div className="grid grid-cols-2 gap-4">
        {stats.map(({ label, value }) => (
          <div key={label}>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
            <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {value}
            </p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
