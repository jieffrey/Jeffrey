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
        <section className="space-y-6">
            <div className="rounded-[2rem] border border-zinc-200/70 bg-zinc-50/80 p-6 shadow-[0_30px_120px_-60px_rgba(15,23,42,0.2)] backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/60">
                <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                    <DashboardHeader />
                    <RefreshButton
                        loading={isRefreshing}
                        lastUpdated={lastUpdated}
                        onRefresh={handleRefresh}
                    />
                </div>
            </div>

            <div className="rounded-[2rem] border border-zinc-200/70 bg-white/80 p-6 shadow-[0_30px_120px_-60px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/70">
                <DashboardGrid loading={isRefreshing} />
            </div>
        </section>
    );
}