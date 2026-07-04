import DashboardCard from "./DashboardCard";

interface OverviewCardProps {
    title: string;
    value: string | number;
    change?: string;
}

export default function OverviewCard({
    title,
    value,
    change,
}: OverviewCardProps) {
    return (
        <DashboardCard
            title={title}
            subtitle="Overview"
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