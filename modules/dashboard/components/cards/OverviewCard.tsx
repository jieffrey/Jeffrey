import StatCard from "../common/StatCard";

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
        <StatCard
            title={title}
            value={value}
            change={change}
            index={index}
        />
    );
}
