import { Globe } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";

interface VisitorsWidgetProps {
  index?: number;
}

interface CountryData {
  flag: string;
  name: string;
  percentage: number;
}

const visitorsData: {
  today: number;
  weekly: number;
  monthly: number;
  total: number;
  topCountries: CountryData[];
} = {
  today: 142,
  weekly: 1056,
  monthly: 4200,
  total: 18300,
  topCountries: [
    { flag: "🇮🇩", name: "Indonesia", percentage: 42 },
    { flag: "🇯🇵", name: "Japan", percentage: 18 },
    { flag: "🇸🇬", name: "Singapore", percentage: 12 },
    { flag: "🇺🇸", name: "United States", percentage: 9 },
    { flag: "🇩🇪", name: "Germany", percentage: 6 },
  ],
};

export default function VisitorsWidget({ index = 0 }: VisitorsWidgetProps) {
  const metrics: { label: string; value: string }[] = [
    { label: "Today", value: visitorsData.today.toLocaleString() },
    { label: "This Week", value: visitorsData.weekly.toLocaleString() },
    { label: "This Month", value: visitorsData.monthly.toLocaleString() },
    { label: "Total", value: visitorsData.total.toLocaleString() },
  ];

  return (
    <DashboardCard
      title="Visitors"
      subtitle="Analytics Overview"
      icon={<Globe size={20} />}
      status="mock"
      accent="blue"
      index={index}
      footer={
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Updated 5 minutes ago
        </p>
      }
    >
      <div className="mb-6 grid grid-cols-2 gap-4">
        {metrics.map(({ label, value }) => (
          <div key={label}>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
            <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Top Countries
        </p>
        <div className="space-y-3">
          {visitorsData.topCountries.map((country: CountryData) => (
            <div key={country.name} className="flex items-center gap-3">
              <span className="w-6 shrink-0 text-lg leading-none">
                {country.flag}
              </span>
              <span className="flex-1 truncate text-sm text-zinc-700 dark:text-zinc-300">
                {country.name}
              </span>
              <div className="h-2 w-24 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${country.percentage}%` }}
                />
              </div>
              <span className="w-8 shrink-0 text-right text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {country.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}
