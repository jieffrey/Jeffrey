import { Users } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";

interface VisitorsWidgetProps {
  index?: number;
}

const visitorData = {
  total: 18300,
  today: 142,
  weekly: 1056,
  change: "+14%",
};

export default function VisitorsWidget({ index = 0 }: VisitorsWidgetProps) {
  const stats: { label: string; value: string | number }[] = [
    { label: "Total", value: visitorData.total.toLocaleString() },
    { label: "Today", value: visitorData.today },
    { label: "Weekly", value: visitorData.weekly },
    { label: "Change", value: visitorData.change },
  ];

  return (
    <DashboardCard
      title="Visitors"
      subtitle="Analytics Overview"
      icon={<Users size={20} />}
      status="mock"
      accent="blue"
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
