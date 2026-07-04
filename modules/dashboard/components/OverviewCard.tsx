import DashboardCard from "./DashboardCard";

interface OverviewCardProps {
    title: string;
    value: string | number;
    change?: string;
    index?: number;
}

export default function OverviewCard({
    title,
    value,
    change,
    index = 0,
}: OverviewCardProps) {
    return (
        <DashboardCard
            title={title}
            subtitle="Overview"
            index={index}
        >
            <div className="space-y-3">
                <h2 className="text-4xl font-bold tracking-tight">
                    {value}
                </h2>

                {change && (
                    <p className="text-sm text-emerald-500">
                        {change}
                    </p>
                )}
            </div>
        </DashboardCard>
    );
}