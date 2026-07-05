"use client";

import { useState, useCallback } from "react";
import DashboardGrid from "./components/layout/DashboardGrid";
import DashboardHeader from "./components/layout/DashboardHeader";
import RefreshButton from "./components/common/RefreshButton";

export default function Dashboard() {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
            setLastUpdated(new Date());
        }, 1500);
    }, []);

    return (
        <section className="space-y-8">
            <div className="flex items-start justify-between gap-4">
                <DashboardHeader />
                <RefreshButton
                    loading={isRefreshing}
                    lastUpdated={lastUpdated}
                    onRefresh={handleRefresh}
                />
            </div>

            <DashboardGrid loading={isRefreshing} />
        </section>
    );
}