"use client"

import { overview } from "../data/mock";
import OverviewCard from "./OverviewCard";

export default function DashboardGrid() {
    return (
        <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2">
            {overview.map((item, index) => (
                <OverviewCard
                    key={item.title}
                    title={item.title}
                    value={item.value}
                    change={item.change}
                    index={index}
                />
            ))}
        </div>
    );
}